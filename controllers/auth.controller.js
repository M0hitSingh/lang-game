const { createCustomError } = require('../errors/customAPIError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse')
const User = require('../model/user');
const asyncWrapper = require('../utils/asyncWrapper')
const bcrypt = require('bcryptjs')
const signup =  asyncWrapper(async (req,res,next)=>{
    try{
        const {email ,username , password} = req.body;
        const isUser = await User.findOne({ username : username});
        console.log(isUser)
        if (isUser) {
            const message = "username is already taken";
            return next(createCustomError(message, 406));
        }
        const hashpass = await bcrypt.hash(password,10);
        const user = await User.create({
            email:email,
            username:username,
            password:hashpass
        });
        const response = sendSuccessApiResponse(user)
        res.json(response);
    }
    catch(err){
        return createCustomError(err,400);
    }
});

const loginUser = asyncWrapper(async (req, res, next) => {
    try{
        const { username, password } = req.body;
        console.log("login");
        const emailExists = await User.findOne({username},
            "username email password"
        );
        if (!emailExists) {
            const message = "User Not Found";
            return next(createCustomError(message, 404));
        }   
        const isPasswordRight = await bcrypt.compare(password, emailExists.password);
        if (!isPasswordRight) {
            const message = "Invalid credentials";
            return next(createCustomError(message, 401));
        }
        const data = {
            username: emailExists.username,
            token: generateJWT(emailExists),
        };
        res.status(200).json(sendSuccessApiResponse(data));
    }
    catch(err){
        return createCustomError(err,400);
    }
});


module.exports = {
    signup,
    loginUser,
};