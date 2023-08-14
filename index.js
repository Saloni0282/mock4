const express = require('express');
const cors= require('cors');
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes")
const { FlightRouter } = require("./routes/flight.routes")
const { BookingRouter }=require("./routes/booking.routes")

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , (req,res) => {
    res.status(400).send("Welcome to Air Ticket Booking!");
})

app.use(UserRouter)
// app.use(authenticate)
app.use(FlightRouter)
app.use(BookingRouter)



app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connection established")
    }
    catch (error){
        console.log("connection error: " + error)
    }
    console.log(`Server is running on ${process.env.PORT}`);
})
