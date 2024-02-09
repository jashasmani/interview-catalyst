const mongoose = require('mongoose');
const Question=require('./question.model')
const Comments=require('./comment.model')
const Login=require('./login.model')
const Schema = mongoose.Schema;

// Like
const LikesSchema = new mongoose.Schema({
    
    cusername:{
        type: String,
        require: true
    },
    question_id:{
        type: Schema.Types.ObjectId, 
        ref: Question,
        required: true
    },
    comment_id:{
        type: Schema.Types.ObjectId, 
        ref: Comments,
        // required: true
    },
    like:{
        type: Boolean,
        require: true
    }
    
})
const Likes = mongoose.model('Likes', LikesSchema);


module.exports = Likes;