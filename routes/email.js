const express = require('express');
const nodeMailer = require('nodemailer');

const router = express.Router();

router.get('/email/send', (req, res, next) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.wp.pl',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    from: 'clothesshop1@wp.pl',
    to: 'radek199@gmail.com',
    subject: 'Potwierdzenie założenia konto w serwisie ClothesShop',
    text: 'Założyłeś konto w naszym serwisie gratulacje'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    const data = JSON.parse(req.query.data);
    res.status(201).json(data);
  });
});

module.exports = router;