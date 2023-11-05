const mongoose = require("mongoose")
const schema = mongoose.Schema;

const ratingSchema = new mongoose.Schema(
    {
        gameId: {
            type:schema.Types.ObjectId,
            ref:"game",
            required: [true, "Please provide gameId"],
        },
        userId: {
            type:schema.Types.ObjectId,
            ref:"user",
            required: [true, "Please provide userId"],
        },
        gameRating:{
            type:Number
        }
    }
);


module.exports =  mongoose.model("Rating", ratingSchema, "rating");
