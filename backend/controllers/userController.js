import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async(req, res) => { 
    const { email, password } = req.body
    // console.log(email, password)

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid User details')
    }
})
const RegisterUser = asyncHandler(async(req, res) => { 
    const { name, email, password } = req.body
    console.log(name, email, password)

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error(`User already exists: ${email}`)
    }
    const user = await User.create({
        name, 
        email, 
        password
    })
    if(user){
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid User details')
    }
})
const LogoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwtToken', '', {
        httpOnly: true,
        expires: new Date(0)
    }) 
    res.status(200).json({
        message: 'User logged out'
    })
})
const getUserProfile = asyncHandler(async(req, res) => { 
    const userData = {
        _id: req.usero._id,
        name: req.usero.name,
        email: req.usero.email
    }
    res.status(200).json(userData);
})
const updateUserProfile = asyncHandler(async(req, res) => { 
    const user = await User.findOne(req.usero._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    }else{
        res.status(401);
        throw new Error('User Not Found')
    }


})

export { authUser, RegisterUser, LogoutUser, getUserProfile, updateUserProfile };
