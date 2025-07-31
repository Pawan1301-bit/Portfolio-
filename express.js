const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/messages');   //importing the schema
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();


//middleware
app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
//the browser sends the data to the server like this: name=Pawan&email=test%40gmail.com
// This is called URL-encoded data. It's like how query params look in a URL.


app.use(express.static(path.join(__dirname, 'public')));
// Serve index.html from public Load styles from public/css/ Load scripts from public/js/

// Because without this, Express will only respond to routes you define manually and it won't know how to send your HTML, CSS, or JS files to the browser.


const port = process.env.PORT || 5000;

const url = process.env.URL;

const my_email = process.env.EMAIL
const key = process.env.KEY

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: my_email,
        pass: key
    }
});

//making the connection
mongoose.connect(url).then(() => {
    console.log(`connnected to database successfully`);
}).catch((err) => {
    console.log(`connectioin with database failed : ${err}`);
})

//taking the data from the frontend and add to database
//this is the port where message will be send
app.post('/messages', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newmessage = new Message({ name, email, message });
        await newmessage.save();
        await transporter.sendMail({
            from: my_email,
            to: my_email,
            subject: `Portfolio Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });
        await transporter.sendMail({
            from: my_email,
            to: email,
            subject: "Thanks for reaching out! We've received your message",
            text: `Hi ${name},\nThank you for reaching out through my portfolio! I’ve received your message and will get back to you as soon as possible.\nHave a great day!\nIf your inquiry is urgent, feel free connect over call 7417527965.\nBest regards,\nPawan Bhatt\n`
        });
        res.status(200).send("Message saved successfully");
    } catch (error) {
        res.status(500).send("Error saving message to database");
    }
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.listen((port), () => {
    console.log("app started");
})