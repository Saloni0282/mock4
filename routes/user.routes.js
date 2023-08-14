const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/user.models");
require('dotenv').config();
const UserRouter = express.Router();

UserRouter.post("/api/register", async (req, res) => {
    try {


        const { name, email, password } = req.body;
        const isUser = await UserModel.findOne({ email });
        if (isUser) return res.status(201).json({ msg: "User already exists" });

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, email, password: hashedPass });
        await user.save();

        res.send(user)

        
        await user.save();

        res.status(201).json({ msg: "New user registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Error registering user" });
    }
});

UserRouter.post("/api/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).send({ msg: "User not found" });

        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) return res.status(400).send({ msg: "Wrong credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(201).json({ msg: "Login Successful", token });
    } catch (error) {
        console.log(error);
        res.send({ msg: "Error while logging in" });
    }
});

module.exports = {
    UserRouter
};
