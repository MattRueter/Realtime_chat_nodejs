const  express =require("express");
const passport = require("passport");
const Strategy  = require("passport-local");
const users = require("../DB/users.js");

const LocalStrategy = Strategy;


//SERIALIZATION ----------------------------------
passport.serializeUser((user, done) =>{
    done(null, {username:user.username})
});
passport.deserializeUser((user, done) =>{
    if(user){
        return done(null, user)
    }else{
        return done(err)
    }
});

//STRATEGY ---------------------------------------
function usePassportStrategy (req, res, next ){
    passport.use(
        new LocalStrategy( function(username, password, cb) {
            console.log(username, password)
            let user = users.filter((user) => user.username === username);

            //check if user exists
            if(user.length <= 0){
                return cb(null, false)
            }

            //If user exists, compare password.
            user = user[0];
            const db_password = user.password;
            if(password !== db_password){
                return cb(null, false)
            }
            //...and confirm login
            if(password === db_password){
                return cb(null, user)
            }
        })
    );
    next()
}
module.exports = usePassportStrategy;