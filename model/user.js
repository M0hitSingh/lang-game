const bcrypt =  require("bcryptjs");
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide name"],
            unique :[true,"username Aleady Exists"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide email"],
            match: [
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                "Please provide valid email",
            ],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
        }
    },
    {
        methods :{
            genrateJWT(){
                return jwt.sign({ userId: this._id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION,
                });
            }
        }
    }
);



module.exports =  mongoose.model("User", userSchema, "user");
