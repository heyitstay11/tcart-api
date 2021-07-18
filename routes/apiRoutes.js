const { Router } = require('express');
const Product = require('../models/product');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); 

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100,
    message: "Too many requests, try after 5 minutes"
});

const router = Router();

router.use(apiLimiter);

router.get('/', cors() ,async (req, res) => {
    let limit = req.query.limit ? Number(req.query.limit) : 10;
    try {
        let products = await  Product.find({}, {_id: 0}).limit(limit);
        res.json( { products } );
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', cors(), async (req, res) => {
    const id = req.params.id;
    try {
        let product = await Product.findOne({ id }, {_id: 0});
        res.json({ product });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;