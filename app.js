const express = require ("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const {createDate, formatDate } = require("./Utils/dateFunctions.js");
const chatRouter  = require("./routes/chats_routes.js");
const loginRouter = require("./routes/login_route.js");
const messages = require("./DB/messages.js");

const PORT = 3000;
const store = new session.MemoryStore();

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
//SESSION-----------------------------------------------------------------------------------------------
app.use(
    session({
        secret: "M1414QRS",
        resave:false,
        saveUninitialized:false,
        store,
    })
)
//PASSPORT MOUNTING -------------------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());



//ROUTES
app.get("/", (req,res) => {
    res.redirect("/login")
});
app.use("/login", loginRouter)
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