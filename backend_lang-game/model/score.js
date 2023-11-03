const mongoose = require("mongoose")
const schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema(
    {
        gameId: {
            type: String,
            required: [true, "Please provide gameId"],
        },
        userId: {
            type: String,
            required: [true, "Please provide userId"],
        },
        score:{
            type:Number
        },
        time:{
            type:Number
        }
    },
    { timestamps: true }
);


module.exports =  mongoose.model("Score", scoreSchema, "score");
