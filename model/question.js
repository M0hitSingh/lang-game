const mongoose = require("mongoose")
const schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema(
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
        questionType:{
            type:String,
            enum :{
                values: ["Text", "MCQ"],
                message: "Please select Text or MCQ",
            },
            default:"Text"
        },
        options:[{
            type :String
        }],
        question:{
            type:String,
            require : [true, "Please add question"],
        },
        answer :{
            type:String,
            trim :true,
            lowercase:true,
            require : [true,'Please Provide Answer']
        },
        questionRating:{
            type:Number
        }
    },
    { timestamps: true }
);


module.exports =  mongoose.model("Score", scoreSchema, "score");
