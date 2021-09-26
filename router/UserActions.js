const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User=require('../modals/user');
const Tweet=require('../modals/tweets');
const {checkAuth}=require('../middlewares/Auth');
const { application } = require('express');
const tweets = require('../modals/tweets');



// don't forget to change the user following in this.
router.get('/all_users',checkAuth,async (req,res)=>{
    try 
    {
        const appuser=await User.find({email:req.user.email});
        const users=await User.find({});
        console.log(appuser[0].following);
        var users_list=users.map(function(user){
            var flag=false;
            if(appuser[0].following.indexOf(user._id)!=-1)
            {flag=true;}
            const new_obj={
              user_id:user._id,
              userName:user.userName,
              following:flag
            }
            return new_obj;
        })


        res.status(200).send({users:users_list})
    }
    catch(err)
    {
        res.status(500).send({message:'Internal Server Error'});
    }
})

router.get('/all_tweets',checkAuth,async (req,res)=>{
    try{
        const appuser=await User.find({email:req.user.email});
        const following=appuser[0].following;
        const tweets=await Tweet.find({user_id : {$in:following}});
        var tweets_list=tweets.map(function(tweet){
            const new_obj={
              userName:tweet.userName,
              time:tweet.time,
              content:tweet.tweet
            }
            return new_obj;
        })
        res.status(200).send({tweets_list:tweets_list})
    }catch(err)
    {
        res.status(500).send({message:'Internal Server Error'});
    }
})

router.get('/follow_request/:user_id',checkAuth,async (req,res)=>{
    try
    {
        const celeb_id=mongoose.Types.ObjectId(req.params.user_id)
        const celeb=await User.findById(celeb_id);
        const user=await User.find({email:req.user.email});
        user[0].following.push(celeb._id);
        user[0].save();
        res.status(200).send({message:"Action Successfull"});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({message:'Internal Server Error'});
    }
})

router.post('/post_tweet',checkAuth,async (req,res)=>{
    try
    {
        const tweet=req.body.tweet;
        const user=await User.find({email:req.user.email});
        const tweetDetails={tweet:tweet,user_id:user[0]._id,time:new Date().getTime(),userName:user[0].userName};
        const newTweet=new Tweet(tweetDetails)
        newTweet.save()
        .then(new_tweet=>{
            user[0].tweets.push(new_tweet);
            user[0].save();
            res.status(201).json({message:'Tweeted Successfully'});
        })
        .catch(err=>{
            res.status(422).json({message:'Internal Database Error'})
        })   
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({message:'Internal Server Error'});
    }
})
module.exports=router;
