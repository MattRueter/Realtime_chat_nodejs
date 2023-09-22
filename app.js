const express = require ("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const morgan = require("morgan");
const {createDate, formatDate } = require("./Utils/dateFunctions.js");
const chatRouter  = require("./routes/chats_routes.js");
const messages = require("./DB/messages.js");

const PORT = 3000;


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

//ROUTES
app.get("/", (req,res) => {
    res.render("index",{
        messages: messages,
    })
});
app.get("/login", (req,res) =>{
    res.render("login")
});
app.use("/chats", chatRouter);



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