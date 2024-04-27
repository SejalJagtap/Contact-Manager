const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

//@desc Get contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }

    if (!phoneRegex.test(phone)) {
        res.status(400);
        throw new Error("Invalid phone format");
    }

    // Check if contact with same phone number already exists
    const existingContact = await Contact.findOne({ phone });
    if (existingContact) {
        res.status(400);
        throw new Error("Contact with the same phone number already exists");
    }

    // Create new contact
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User is not authorized to update");
    }

    const { name, email, phone } = req.body;

    if (email && !emailRegex.test(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }

    if (phone && !phoneRegex.test(phone)) {
        res.status(400);
        throw new Error("Invalid phone format");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
        name,
        email,
        phone
    }, { new: true });

    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User is not authorized to delete");
    }

    await contact.deleteOne();
    res.status(200).json({ message: "Contact deleted" });
});

module.exports = { getContact, getContacts, updateContact, deleteContact, createContact };
