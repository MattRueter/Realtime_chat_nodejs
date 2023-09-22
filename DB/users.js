const dotenv = require("dotenv").config()

const users = [
    {
        username:process.env.matt, 
        password:process.env.password1
    },
    {
        username:process.env.victoria, 
        password:process.env.password2
    }
]
module.exports = users;