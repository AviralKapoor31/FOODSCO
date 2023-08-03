const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/foodsco');

const priceSchema={
    product:String,
    price:String
}

const price = mongoose.model('price',priceSchema);


app.get('/',function(req,res){

        const userprice = price.find().then(function(err,prices){
            res.render('index',{
                pricelist:prices
            })
        })
    })


app.listen(4000,function(){
    console.log('server is running');
})