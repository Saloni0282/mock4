const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UserModel } = require("../models/user.models")

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decodedToken;
        const user = await UserModel.findOne({ _id: userId });
        next()
    } catch (error) {
        console.error(error);
        return res.status(401).json({msg:"Unauthorized"});
    }
}

module.exports = {
    authenticate
}