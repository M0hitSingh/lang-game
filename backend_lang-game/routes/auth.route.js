const express =  require("express");
const {
    loginUser,
    signup,
} = require("../controllers/auth.controller");

/**
 * Endpoint: /api/auth
 */
const router = express.Router();



// User
router.route("/signup").post(signup);
router.route("/login").post(loginUser);
    




module.exports = router;
