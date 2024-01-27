const express=require('express');
const Question=require('../../models/question.model');

async function  searchQuestion(req,res){

    try{
        
        const search_question=await Question.find(
            {
                '$or':[
                    {'question': { $regex: req.params.key ,$options: 'i' }}
                ]
            }
        )

        // console.log(search_question)
        res.json(search_question);

    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports=searchQuestion;