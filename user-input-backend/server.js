const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
    const { userInput } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New User Input',
        text: `User Input: ${userInput}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Email sending failed.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email successfully sent.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});