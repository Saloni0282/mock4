const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { FlightModel } = require("../models/flight.models");
require('dotenv').config();
const FlightRouter = express.Router();

FlightRouter.get("/api/flights", async (req, res) => { 
    try {
        const flights = await FlightModel.find()
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: error });
    }
    

})

FlightRouter.get("/api/flights/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const flight = await FlightModel.findById(id);
        
        if (!flight) { 
            return res.status(404).json({ message: "flight not found" });  
        }
        res.status(200).json(flight);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})


FlightRouter.post("/api/flights", async (req, res) => {
    try {
        
        const flight = await FlightModel.create(req.body);
        res.status(201).json(flight);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})

FlightRouter.patch("/api/flights/:id", async (req, res) => {
    try {

        const flight = await FlightModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).json(flight);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})
FlightRouter.delete("/api/flights/:id", async (req, res) => {
    try {
        await FlightModel.findByIdAndDelete(req.params.id);
        res.status(202).json({message: "Flights deleted successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
})

module.exports = {
    FlightRouter
}