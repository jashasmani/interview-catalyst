const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/login.model");

async function getForgotPassword(req, res) {
  const { mail } = req.body;
  console.log(mail);
  try {
    const user = await User.findOne({ email: mail });

    // console.log("ok")
    if (!user) {
      return res.status(404).json({ resMesg: "User Not Found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN1, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asmanijash61@gmail.com",
        pass: "jgpj ntrp rgop llmb",
      },
    });

    const mailOptions = {
      from: "asmanijash61@gmail.com",
      to: mail,
      subject: "Welcome to Interview-Catalyst",
      html: `
                <div style="padding:10px;border-style: ridge">
                    <p>You have a new request.</p>
                    <h3>Confirm Password</h3>
                    <ul>
                    <li>Confirm Password: <a href="http://192.168.0.111:3000/confirm/${user._id}/${token}">Click here</a></li>
                    </ul>
                    </div>
                    `,
    };
    // <li>Confirm Password: <a href="http://localhost:3000/confirm/${user._id}/${token}">Click here</a></li>

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ message: "Email Not Sent Successfully" });
      } else {
        res.status(200).json({ message: "Email Sent Successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = getForgotPassword;
