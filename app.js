const express = require ("express");
const morgan = require("morgan");
const {createDate, formatDate } = require("./Utils/dateFunctions");

const app = express();
const PORT = 3000;

//DATA
const messages =[
    {user:"Matt", message: "hello", date:"September 2nd 14:30"},
    {user:"Mike", message: "hey", date:"September 2nd 14:32"},
    {user:"Matt", message: "I'm hungry", date:"September 2nd 14:35"},
]

//MIDDLEWARE and SETUP---------------------------------------------------------------------------------
//templates
app.set('view engine', 'pug');
//middleware
app.use(
    express.urlencoded({
        extended:true,
    }))
app.use(morgan("tiny"));
//------------------------------------------------------------------------------------------------------


//routes
app.get("/", (req,res) => {
    res.render("index",{
        messages: messages,
    })
});

app.post("/", (req,res) =>{
    const msg = req.body.message;
    const date = createDate();
    const user = "TEST"
    const newMessage ={ user:user, message:msg, date:date };
    messages.push(newMessage);
    
    res.render("index",{
        messages: messages
    })
    
});

//server
app.listen(PORT,() => {
    console.log(`Server listening on ${PORT}`)
});

