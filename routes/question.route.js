const express =  require("express");
const {
    addQuestion,
    getQuestion,
    deleteQuestion
} = require("../controllers/question.controller");
const { authorization } = require('../middleware/authorization')
/**
 * Endpoint: /api/question
 */
const router = express.Router();

//Question
router.route("/get").get(getQuestion);
router.route("/add").post(authorization,addQuestion);
router.route("/delete/:id").delete(deleteQuestion)
    




module.exports = router;
