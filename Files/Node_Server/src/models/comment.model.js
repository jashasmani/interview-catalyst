const mongoose = require('mongoose');
const Question=require('./question.model')
const Schema = mongoose.Schema;

// comments
const CommentsSchema = new mongoose.Schema({
    
    username:{
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    question_id:{
        type: Schema.Types.ObjectId, 
        ref: Question,
        required: true
    },
    like:{
        type: Boolean,
        require: true
    }
    
})
const Comments = mongoose.model('Comments', CommentsSchema);


module.exports = Comments;