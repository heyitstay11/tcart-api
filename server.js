const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { checkUser } = require('./middlewares/authMiddlewares');


// Connect to DB
const DBURL = process.env.MONGODB_URI;
try {
    mongoose.connect(DBURL, 
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true},
         () => console.log('Connected to MongoDB'));
}catch(error){
    console.log('Error Connecting to Database ',error);
}

app.use(express.urlencoded({ "extended": true })); 
app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(cookieParser());


app.use('*', checkUser);

app.get('/', (req, res) => {res.render('home') })

app.use(authRoutes);
app.use('/products', productRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));