const express = require ("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const morgan = require("morgan");
const {createDate, formatDate } = require("./Utils/dateFunctions");

const PORT = 3000;

//DATA
const messages =[
    {user:"Matt", message: "hello", date:"September 2nd 14:30"},
    {user:"Mike", message: "hey", date:"September 2nd 14:32"},
    {user:"Matt", message: "I'm hungry", date:"September 2nd 14:35"},
];

//MIDDLEWARE and SETUP---------------------------------------------------------------------------------
//templates
app.set('view engine', 'pug');

//middleware
app.use(
    express.urlencoded({
        extended:true,
    }))
app.use(express.static("/"))
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
    const user = req.body.name
    const newMessage ={ user:user, message:msg, date:date };
    messages.push(newMessage);
    
    res.render("index",{
        messages: messages
    })
    
});

//SOCKET connection.
io.on("connection", (socket) =>{
    console.log("a user has connected.");
    
    socket.on("disconnect", () =>{
        console.log("user disconnected")
    });

    socket.on("chat message", (msg) => {
        msg = caputreFormData(msg);
        io.emit("chat message", msg);
    })
});

function caputreFormData(msg){
    const message = msg[1];
    const date = createDate();
    const user = msg[0]
    const newMessage ={ user:user, message:message, date:date };
    messages.push(newMessage);    
    return newMessage;
}

//server
server.listen(PORT,() => {
    console.log(`Server listening on ${PORT}`)
});