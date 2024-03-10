const express = require("express");
const Question = require("../../models/question.model");
const Admin = require("../../models/admin.model");

async function insertQuestion(req, res) {
  try {
    const { question, username, title } = req.body;
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
      console.log(admins);
      const currentAdminIndex =
        admins.findIndex((admin) => admin.status === "available") % numAdmins;
      console.log(currentAdminIndex);
      const currentAdmin = admins[currentAdminIndex];

      if (currentAdmin) {
        currentAdmin.status = "unavailable";
        await currentAdmin.save();

        const question_main = new Question({
          username: username,
          question: question,
          title: title,
          timestamp: currentTimeInIndia,
          admin: currentAdmin._id,
        });

        if (currentAdmin.adminId === 3) {
          await Admin.updateMany(
            { category },
            { $set: { status: "available" } }
          );
          // admins = await Admin.find({ category })
          //   .sort({ adminId: 1 })
          //   .limit(numAdmins);
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
}

module.exports = insertQuestion;
