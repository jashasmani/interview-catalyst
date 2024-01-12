const nodemailer = require('nodemailer');


const connectMailer = async (req,resp) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'asmanijash61@gmail.com',
            pass: 'jgpj ntrp rgop llmb'
        }
    })



    const mailOptions = {
        from: 'asmanijash61@gmail.com',
        to: req.body.email,
        subject: 'Welcome to NodeJS App',
        text: 'This is an email using nodemail in interview-catalist',
    }


    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          resp.json({status: true, respMesg: 'Email Sent Successfully'})
        } 
        else
        {
          resp.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
}



module.exports = {
    connectMailer:connectMailer,
};
