const express = require('express');
const Question = require('../../models/question.model');


 async function findQuestion(req,res){

    try{
    const question = await Question.find({});


    console.log(question);
    res.json({question})
    }

    catch(error)
    {
        res.json({message:"Error"})
    }
}

module.exports=findQuestion;