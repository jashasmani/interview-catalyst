const express = require("express");
const Question = require("../../models/question.model");
const Admin = require("../../models/admin.model");
let connectDB = require("../../DbConnection");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cheerio = require("cheerio");

const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { TaskType } = require("@google/generative-ai");
require("dotenv").config();
dotenv.config();

var questionsCollection = null;
var db = null;

async function help() {
  const dummy = await connectDB()
    .then(() => {
      db = mongoose.connection;
      questionsCollection = db.collection("questions");
      // console.log("inside");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

const embeddings = new GoogleGenerativeAIEmbeddings({
  modelName: "embedding-001", // 768 dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
});

async function insertQuestion(req, res) {
  await help().then(async () => {
    // console.log("**********************************************");
    // console.log("questionsCollection", questionsCollection);
    // console.log("*******************************************");

    try {
      const { question, username, title, grant } = req.body;
      const currentTimeInIndia = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });

      if (username != "") {
        const category = title.toLowerCase();
        const adminCategoryCount = await Admin.countDocuments({ category });
        const numAdmins = adminCategoryCount > 0 ? adminCategoryCount : 3;
        const admins = await Admin.find({ category })
          .sort({ adminId: 1 })
          .limit(numAdmins);
        const currentAdminIndex =
          admins.findIndex((admin) => admin.status === "available") % numAdmins;
        const currentAdmin = admins[currentAdminIndex];

        if (currentAdmin) {
          currentAdmin.status = "unavailable";
          await currentAdmin.save();

          const textData = await extractTextFromHTML(question);

          async function extractTextFromHTML(html) {
            const $ = cheerio.load(html);
            const text = $("body").text();
            return text;
          }
          console.log(textData);
          const res_embed = await embeddings.embedQuery(textData);

          const sim_que = await questionsCollection
            .aggregate([
              {
                $vectorSearch: {
                  index: "que_vec_index",
                  path: "embedding",
                  queryVector: res_embed,
                  numCandidates: 200,
                  limit: 3,
                },
              },
            ])
            .toArray();

          // db.embedded_movies.aggregate([
          //   {
          //     "$vectorSearch": {
          //       "index": "vector-search-tutorial",
          //       "path": "plot_embedding",
          //       "queryVector": [<array-of-numbers>],
          //       "numCandidates": <number-of-candidates>,
          //       "limit": <number-of-results>
          //     }
          //   }
          // ])

          // console.log("***************************************************");
          // console.log("sim_que", sim_que);
          // console.log("***********************************************");
          const question_main = new Question({
            username: username,
            question: textData,
            question_html: question,
            title: title,
            timestamp: currentTimeInIndia,
            admin: currentAdmin._id,
            grant: grant,
            embedding: res_embed,
            similar_questions: sim_que,
          });

          if (currentAdmin.adminId === 3) {
            await Admin.updateMany(
              { category },
              { $set: { status: "available" } }
            );
            console.log("check----------------------------------------");
          }
          await question_main.save();
          res
            .status(201)
            .json({ message: "Question add successful", question_main });
        } else {
          const newAdmins = [];

          for (let i = 0; i < 3; i++) {
            const status = i === 0 ? "unavailable" : "available";
            const newAdmin = new Admin({
              adminId: i + 1,
              name: `${title}${i + 1}`,
              password: `${title}${i + 1}`,
              category,
              status: status,
            });

            newAdmins.push(newAdmin);
          }

          await Admin.insertMany(newAdmins);

          const newAdmin = newAdmins[0];
          const question_main = new Question({
            username: username,
            question: question,
            title: title,
            timestamp: currentTimeInIndia,
            admin: newAdmin._id,
            grant: grant,
          });

          await question_main.save();
          res
            .status(201)
            .json({ message: "Question add successful", question_main });
        }
      }
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
      console.error("Question add Error:", e);
    }
  });
}

module.exports = insertQuestion;
