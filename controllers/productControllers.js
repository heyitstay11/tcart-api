const { validationResult } = require('express-validator');
const Product = require('../models/product');

const getProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/productsList', {products});   
    } catch (error) {
        console.log(error);
    }
}

const getAddProduct = (req, res) => {
    res.render('products/addProduct', { product: new Product(), csrfToken: req.csrfToken() });
}

const postAddProduct = async (req, res) => {
    const { name, imgLink, price, description } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = {};
        errors.array().forEach(error => err[error.param] = error.msg );
        return res.json({error: err});
    }

    try {
        let product = await Product.create({name,imgLink,price, description});
        return res.status(201).json({ product })
    } catch (error) {
        console.log(error);
    }
}

const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    try {
        let product = await Product.findOne({ id });
        if(res.locals.user){
            return res.render('products/singleProduct', { product: product , csrfToken: req.csrfToken() });
        }
        return res.render('products/singleProduct', { product: product });
    } catch (error) {
        console.log(error);
    }
}

const getEditProduct = async (req, res) => {
    const id = req.params.id;
    try {
        let product = await Product.findOne({ id });
        res.render('products/editProduct', { product, csrfToken: req.csrfToken() });
    } catch (error) {
        console.log(error);
    }
    
}

const postEditProduct = async (req, res) => {
    const { name, imgLink, price, description } = req.body;
    const errors = validationResult(req);
    const id = req.params.id;

    if(!errors.isEmpty()){
        const err = {};
        errors.array().forEach(error => err[error.param] = error.msg );
        return res.json({error: err});
    }
    let product = {name,imgLink,price,description}

    try {
    await Product.updateOne( { id }, product );
    res.json({product});
    } catch (error) {
    console.log(error)
    }
}

const deleteProduct =  async (req, res) => {
    const id = req.params.id;
    let product
    console.log(id);
    try {
        product = await Product.findOneAndDelete({ id });
        res.redirect('/products/');
    } catch (error) {
        console.log( {error, product} );
    }
}

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getSingleProduct,
    getEditProduct,
    postEditProduct,
    deleteProduct,
}