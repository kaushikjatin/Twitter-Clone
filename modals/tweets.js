const mongoose=require('mongoose');

const TweetSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    user_id:{type:mongoose.Schema.Types.ObjectId , required:true},
    userName:{type:String,required:true},
    tweet:{type:String , required:true},
    time:{type:Number ,required:true}
})

module.exports=mongoose.model('Tweet',TweetSchema);