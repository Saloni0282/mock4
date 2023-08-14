const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { BookingModel } = require("../models/flight.models");
require('dotenv').config();
const BookingRouter = express.Router();

BookingRouter.post("/api/booking", async (req, res) => {
    try {
        const booking = await BookingModel.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({error: error});
    }


})

BookingRouter.get("/api/dashboard", async (req, res) => {
    try {
        const booking = await BookingModel.find().populate("User").populate('flight');
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})

BookingRouter.patch("/api/flights", async (req, res) => {
    try {
        const booking = await BookingModel.findByIdAndUpdate(req.params.id, req.body);
        
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})


BookingRouter.delete("/api/flights/:id", async (req, res) => {
    try {
        await BookingModel.findByIdAndDelete(req.params.id);
        res.status(202).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})

module.exports = {
    BookingRouter
}