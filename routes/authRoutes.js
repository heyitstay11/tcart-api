const { Router } = require('express');
const { getLogin, getSignup, postLogin, postSignup, getLogout} = require('../controllers/authControllers');
const { check } = require('express-validator');
const { requireAuth } = require('../middlewares/authMiddlewares');
const router = Router();


router.get('/login', getLogin);

router.post('/login',[
    check('username').trim()
    .notEmpty().withMessage('Username cannot be empty')
    .isLength( { min: 6 }).withMessage('Username should be atleast 6 characters')
    .not().isNumeric().withMessage('Username should not be a number'),

    check('password').trim()
    .notEmpty().withMessage('Password should not be empty')
    .isLength( { min: 8 }).withMessage('Password should be atleast 8 characters')

], postLogin);

router.get('/signup', getSignup);


router.post('/signup', [
    check('username').trim()
    .notEmpty().withMessage('Username cannot be empty')
    .isLength( { min : 6 }).withMessage('Username should be atleast 6 characters')
    .not().isNumeric().withMessage('Username should not be a number'),

    check('key').trim()
    .equals(process.env.SECRET_KEY).withMessage('Key does not matches, try again'),

    check('password').trim()
    .notEmpty().withMessage('Password should not be empty')
    .isLength( { min: 8 }).withMessage('Password should be atleast 8 characters'),

    check('confirmPassword').trim()
    .notEmpty().withMessage('Password should not be empty')
    .isLength( { min: 8 }).withMessage('Password should be atleast 8 characters')
    .custom((value, { req }) => {
        if(value !== req.body.password){
            throw new Error('Not matches password field');
        }else{
            return value;
        }}),

], postSignup);

router.get('/logout', getLogout);

module.exports = router;