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
    { timestamps: true }
);


module.exports =  mongoose.model("User", userSchema, "user");
