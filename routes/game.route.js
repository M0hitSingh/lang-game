const express =  require("express");
const {
    getGame,
    addGame,
    deleteGame,
    createGame,
    submitGame
} = require("../controllers/game.controller");
const { authorization }= require('../middleware/authorization')
/**
 * Endpoint: /api/game
 */
const router = express.Router();

//Game
router.route("/get").get(getGame);

// Admin Access
router.route("/add").post(addGame);
router.route("/delete/:id").delete(deleteGame)

// game logic
router.route("/create/:id").get(authorization,createGame)
router.route("/submit/:id").put(authorization,submitGame)
    




module.exports = router;
