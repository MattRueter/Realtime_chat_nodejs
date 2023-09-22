const express = require("express");
const { createDate } = require("../Utils/dateFunctions.js");
const messages = require("../DB/messages.js");
const chatRouter = express.Router();


chatRouter.get("/", (req,res) => {
    if(!req.isAuthenticated()){
        res.redirect("login/error")
    }else if(req.isAuthenticated()){
        const user = req.session.passport.user.username;
        res.render("index",{
            messages: messages,
            user: user
        })
    }
});

module.exports = chatRouter;