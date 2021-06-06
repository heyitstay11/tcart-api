const { Router } = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async (req, res) => {
    let limit = req.query.limit ? Number(req.query.limit) : 10;
    try {
        let products = await  Product.find({}, {_id: 0}).limit(limit);
        res.json( { products } );
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let product = await Product.findOne({ id }, {_id: 0});
        res.json({ product });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;