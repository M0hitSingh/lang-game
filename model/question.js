const mongoose = require("mongoose")
const schema = mongoose.Schema;

const questionSchema = new mongoose.Schema(
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
            }
        },
        options:[{
            type :String
        }],
        question:{
            type:String,
            required : [true, "Please add question"],
        },
        answer :{
            type:String,
            trim :true,
            lowercase:true,
            required : [true,'Please Provide Answer']
        },
        questionRating:{
            type:Number
        }
    }
);


module.exports =  mongoose.model("Question", questionSchema, "question");
