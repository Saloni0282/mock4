const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/user.models");
require('dotenv').config();
const UserRouter = express.Router();

UserRouter.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new UserModel({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "New user registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Error registering user" });
    }
});

UserRouter.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: "Invalid username Or password" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (isPasswordMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            res.status(200).json({ token });
            
        } else {
            return res.status(201).json({ message: "Invalid username Or password" })
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    UserRouter
};
