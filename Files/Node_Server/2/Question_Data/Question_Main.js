const express=require('express');
const Question_Database=require('../Database/Question_Database');
const Insert_question=require('./Question_Insert/Question_Insert');
const Search_question=require('./Question_Fetch/Question_Fetch');

const cors=require('cors');

const app=express()
const port=8000;

app.use(express.json());
app.use(cors());

app.use(Insert_question);
app.use(Search_question);

Question_Database();


app.listen(port,()=>{
    console.log("Question database is start on",port);
})