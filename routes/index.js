const express = require("express");
const authRoute = require("./auth.route");
const questionRoute = require("./question.route");
const gameRoute = require('./game.route')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Lang-Game API server is running!!!");
});
// For Authentication 
router.use("/auth",authRoute);


//TODO Make Admin Ristricted
// For Question
router.use('/question',questionRoute);

//For Game
router.use('/game',gameRoute);

module.exports = router;
