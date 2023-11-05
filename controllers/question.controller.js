const { createCustomError } = require('../errors/customAPIError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse')
const asyncWrapper = require('../utils/asyncWrapper')
const Game = require('../model/game');
const Question = require('../model/question');
const APIFeatures = require('../utils/APIfeature');



const getQuestion = asyncWrapper(async (req, res, next)=>{
    try{
        const query =new APIFeatures(Question.find(),req.query)
        .filter()
        const data = await query.query;
        const response = sendSuccessApiResponse(data,200);
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

const addQuestion = asyncWrapper(async (req, res, next)=>{
    try{
        const {
            gameId ,questionType,options,
            question,answer,questionRating
        } = req.body;
        const isGame = await Game.findById(gameId);
        if(!isGame){
            const message = `No Game is present with Id : ${gameId}`;
            return next(createCustomError(message, 403));
        }
        const ques = await Question.create({
            gameId,
            userId: req.user.userId,
            questionType,
            options,
            question,
            answer,
            questionRating
        });
        const response = sendSuccessApiResponse(ques,201,"Question Added")
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

const deleteQuestion = asyncWrapper(async (req, res, next)=>{
    try{
        const id = req.params.id;
        const quest = await Question.findByIdAndDelete(id);
        if(!quest){
            if(!quest){
                const message = `No Question is present with Id : ${id}`;
                return next(createCustomError(message, 403));
            }
        }
        const response = sendSuccessApiResponse(quest,201,`Question with Id : ${id} deleted`)
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

module.exports = {
    addQuestion,
    getQuestion,
    deleteQuestion
};