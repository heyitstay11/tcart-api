const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User =  require('../models/user');
require('dotenv').config();

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createUser = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn : maxAge
    })
}

const getLogin = (req, res) => {
    res.render('login');
}


const postLogin = async (req, res) => {
    let { username, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const err = {};
        errors.array().forEach(error => err[error.param] = error.msg);
        return res.json({error: err});
    }
    
    try {
        const user =  await User.findOne({ name: username });
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if(auth){
                const token = createUser(user._id);
                res.cookie('jwt', token, { httpOnly : true, maxAge: maxAge * 1000, sameSite: 'lax' });
                return res.json({  user: user._id , auth});  
            }
            return res.json({error: { "password" : "Incorrect Password" }});
        }else{
            return res.json({error: { "username" : "No such user exists" }});
        }
    } catch (error) {
        console.log(error);
    }
};


const getSignup = (req, res) => {
    res.render('signup');
};


const postSignup = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const err = {};
        errors.array().forEach(error => err[error.param] = error.msg );
        return res.json({error: err});
    }
    let { username, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt); 

        const user = await User.create({ name: username, password: hashedPassword });
        const token = createUser(user._id);
        res.cookie('jwt', token, { httpOnly : true, maxAge: maxAge * 1000 });

        return res.status(201).json({user });  
    } catch (error) {
        if(error.code === 11000 ){
            return res.json({error: { "username" : "this username is already taken" }});
        }
        console.log(error);
    }
};

const getLogout = async (req, res) => {
    res.cookie('jwt', '', { httpOnly : true, maxAge: 1 });
    res.redirect('/');
}


module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getLogout,
};