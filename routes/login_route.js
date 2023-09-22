const express = require("express");
const passport = require("passport");
const usePassportStrategy = require("../auth/auth.js");
const loginRouter = express.Router();


//MIDDLEWARE----------------------------------
loginRouter.use(usePassportStrategy);


//ROUTES -------------------------------------
loginRouter.get("/", (req,res) =>{
    res.render("login")
});

loginRouter.post("/", 
    passport.authenticate("local", {failureRedirect: "/login"}),
    (req, res) =>{
        res.redirect("/chats")
    }
);

module.exports = loginRouter;