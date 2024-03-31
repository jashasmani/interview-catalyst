const nodemailer = require("nodemailer");
require("dotenv").config();

async function email(req, res, q_html, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "Welcome to Interview-Catalyst",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
      h3 {
        margin-top: 0;
        color: #333;
      }
      h5 {
        margin-bottom: 0;
        color: #666;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h3>Your Question Approved By Admin</h3>
      <h5>${q_html}</h5>
    </div>
    </body>
    </html>
    
                  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // res.status(200).json({ message: "Email Sent Successfully" });
    console.log("mail");
  } catch (error) {
    console.error("Email not sent:", error);
    // res.status(500).json({ message: "Email Not Sent Successfully" });
  }
}

module.exports = email;
