const mongoose = require("mongoose")
const schema = mongoose.Schema;

const gameSchema = new mongoose.Schema(
    {
        gameName: {
            type: String,
            required: [true, "Please provide gameName"],
        },
        description:{
            type:String,
        },
        icon:{
            type:String
        }
    },
);


module.exports =  mongoose.model("Game", gameSchema, "game");
