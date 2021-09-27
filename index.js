const express=require("express");
const cors= require('cors')
const bodyparser = require('body-parser');
const mongoose=require('mongoose');
const app=express(); 
const path = require('path');



// establishing connection with mongodb
if(process.env.NODE_ENV!='production') require('dotenv').config()
const url='mongodb+srv://Jatin:R070573k@cluster0.29mkz.mongodb.net/NewApp?retryWrites=true&w=majority'
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



app.use(cors())
app.use(bodyparser.json()) 
app.use(bodyparser.urlencoded({extended:true}))



app.use('/user',require('./router/UserActions'));
app.use('/user/auth',require('./router/Sign_Signup'));

if(process.env.NODE_ENV=='production')
{
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build/index.html'));
    })
}


const port = process.env.PORT || 8000
app.listen(port); 