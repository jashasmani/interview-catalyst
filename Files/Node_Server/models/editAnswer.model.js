const mongoose = require('mongoose');
const Question=require('./question.model')
const Comments=require('./comment.model')
const Schema = mongoose.Schema;

// EditAnswersSchema
const EditAnswersSchema = new mongoose.Schema({
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
    edit_answer:{
        type: String,
        required: true
    },
    grant:{
        type:String,
    },
    timestamp:{
        type:String,
        required: true
    }
})
const EditAnswers = mongoose.model('EditAnswers', EditAnswersSchema);


module.exports = EditAnswers;