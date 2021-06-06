const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddlewares');
const { check } = require('express-validator');
const { getProducts, getAddProduct, postAddProduct, getSingleProduct, getEditProduct, postEditProduct, deleteProduct } = require('../controllers/productControllers');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const router = Router();

router.get('/', getProducts);

router.get('/add', requireAuth, csrfProtection, getAddProduct);

router.post('/add', requireAuth, csrfProtection, [

    check('name').trim()
    .notEmpty().withMessage('Name cannot be blank')
    .not().isNumeric().withMessage('Name cannot be a number'),

    check('description').trim()
    .notEmpty().withMessage('Description cannot be blank')
    .not().isNumeric().withMessage('Description cannot be a number'),

    check('price').trim()
    .notEmpty().withMessage('price cannot be blank')
    .isNumeric().withMessage('price should be a valid number'),

    check('imgLink').trim()
    .notEmpty().withMessage('imgLink cannot be blank')
    .isURL().withMessage('imgLink should be a valid URL '),

] , postAddProduct);

router.get('/:id' , csrfProtection, getSingleProduct);

router.get('/:id/edit',requireAuth , csrfProtection, getEditProduct);

router.post('/:id/edit', requireAuth , csrfProtection, [
    check('name').trim()
    .notEmpty().withMessage('Name cannot be blank')
    .not().isNumeric().withMessage('Name cannot be a number'),

    check('description').trim()
    .notEmpty().withMessage('Description cannot be blank')
    .not().isNumeric().withMessage('Description cannot be a number'),

    check('price').trim()
    .notEmpty().withMessage('price cannot be blank')
    .isNumeric().withMessage('price should be a valid number'),

    check('imgLink').trim()
    .notEmpty().withMessage('imgLink cannot be blank')
    .isURL().withMessage('imgLink should be a valid URL '),

], postEditProduct);


router.post('/:id/delete', requireAuth, csrfProtection,  deleteProduct);

module.exports = router;