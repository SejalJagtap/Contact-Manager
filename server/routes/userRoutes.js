const express = require("express");
const validateToken = require("../middleware/validateTokenHandler")
const {
    loginUser,
    registerUser,
    currentUser
} = require("../controllers/usersControllers");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;

