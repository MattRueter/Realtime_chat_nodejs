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
loginRouter.get("/error", (req,res) =>{
    res.render("login",{
        errormessage:"You may have mistyped darling."
    })
});
loginRouter.post("/", 
    passport.authenticate("local", {failureRedirect: "/login/error"}),
    (req, res) =>{
        res.redirect("/chats")
    }
);

module.exports = loginRouter;