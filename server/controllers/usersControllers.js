const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        res.status(400);
        res.json({ message: "All fields are required" })
        return;
    }
    const checkAvailable = await User.findOne({ email });
    if (checkAvailable) {
        res.status(400);
        res.json({ message: "user already register" })
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
        username,
        password: hashedPassword,
        email
    })
    if (user) {
        res.status(201);
        res.json({ _id: user.id, email: user.email });
        return
    } else {
        res.status(400);
        throw new Error("user data not valid");
    }
    // console.log("user created", user)
    res.json({ message: "user succesfully created" });
});

const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )
        res.status(200);
        res.json({ accessToken })


    } else {
        res.status(400);
        throw new Error("email or password is not valid");
    }


    // res.json({ message: "login the user" });
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    loginUser,
    registerUser,
    currentUser
};
