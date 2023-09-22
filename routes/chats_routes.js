const express = require("express");
const { createDate } = require("../Utils/dateFunctions.js");
const messages = require("../DB/messages.js");
const chatRouter = express.Router();


chatRouter.get("/", (req,res) => {
    res.render("index",{
        messages: messages,
    })
});


chatRouter.post("/", (req,res) =>{
    const msg = req.body.message;
    const date = createDate();
    const user = req.body.name
    const newMessage ={ user:user, message:msg, date:date };
    messages.push(newMessage);
    
    res.render("index",{
        messages: messages
    })
    
});

module.exports = chatRouter;