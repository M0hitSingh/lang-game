const { createCustomError } = require('../errors/customAPIError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse')
const asyncWrapper = require('../utils/asyncWrapper')
const Game = require('../model/game');
const APIFeatures = require('../utils/APIfeature');
const Question = require('../model/question');
const Rating = require('../model/rating');



const getGame = asyncWrapper(async (req, res, next)=>{
    try{
        const SearchString = ["gameName"];
        const query =new APIFeatures(Game.find(),req.query)
        .filter()
        .search(SearchString);
        const data = await query.query;
        const response = sendSuccessApiResponse(data,200);
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

const addGame = asyncWrapper(async (req, res, next)=>{
    try{
        const {gameName, description} = req.body;
        const game =await Game.create({
            gameName,
            description
        })
        const response = sendSuccessApiResponse(game,201,"Game Added")
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})


const deleteGame = asyncWrapper(async (req, res, next)=>{
    try{
        const id = req.params.id;
        const isGame = await Game.findById(id);
        if(!isGame){
            if(!isGame){
                const message = `No Game is present with Id : ${id}`;
                return next(createCustomError(message, 403));
            }
        }
        await Game.findByIdAndDelete(id);
        const response = sendSuccessApiResponse(isGame,201,`Game with Id : ${id} deleted`)
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const createGame = asyncWrapper(async (req, res, next)=>{
    try{
        const gameId = req.params.id;
        const data = await Rating.findOne({userId:req.user.userId , gameId : gameId});
        let userRating = 500;
        if(!data){
            await Rating.create({
                gameId:gameId,
                userId :req.user.userId,
                gameRating : 500
            })
        }
        else userRating = data.gameRating;
        const limit = req.user.limit || 5;
        const isGame = await Game.findById(gameId);
        if(!isGame){
            if(!isGame){
                const message = `No Game is present with Id : ${id}`;
                return next(createCustomError(message, 403));
            }
        }
        const questions = await Question.find({
            questionRating: { $gte: userRating-200, $lte: userRating+200 },
        },{answer:0});

        const selectedQuestions = shuffleArray(questions).slice(0, limit);
        const response = sendSuccessApiResponse(selectedQuestions)
        res.json(response);
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

const submitGame = asyncWrapper(async (req, res, next)=>{
    try{
        const gameId = req.params.id;
        const result = req.body.result;
        const data = await Rating.findOne({userId:req.user.userId , gameId : gameId});
        const userRating = data.gameRating;

        for(let i = 0 ; i < result.length; i++){
            console.log(result[i].questionRating)
        }

        res.json('asdas');
    }
    catch(err){
        console.log(err);
        next(createCustomError(err,400));
    }
})

module.exports = {
    addGame,
    getGame,
    deleteGame,
    createGame,
    submitGame
};