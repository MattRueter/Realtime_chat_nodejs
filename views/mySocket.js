const socket = io();

const chatbox = document.getElementById("chatbox");
const form = document.getElementById("msgform");
const input = document.getElementById("nameinput");
const textArea = document.getElementById("msgtextarea");

//This has taken over the form submission:
form.addEventListener("submit", function(e){
    e.preventDefault();
    if(textArea.value){
        const msg=[input.value, textArea.value];
        socket.emit("chat message", msg);
        textArea.value = "";
    }
});
// This is formatting the message and adding to DOM
// On the server side we can format it (like before)
// Then push it to the mock DB
// Then do the DOM stuff as is.
socket.on("chat message", function(msg){
    const msgContainer = document.createElement("li");
    const pdate = document.createElement("p");
    const puser = document.createElement("p");
    const pmsg = document.createElement("p");

    pdate.textContent = msg.date;
    puser.textContent = msg.user;
    pmsg.textContent =msg.message;
    
    
    msgContainer.appendChild(pdate);
    msgContainer.appendChild(puser);
    msgContainer.appendChild(pmsg);

    msgContainer.classList.add("messageContainer");
    pdate.classList.add("msgStamp");
    puser.classList.add("msgStamp");
    pmsg.classList.add("messageContent")  

    chatbox.appendChild(msgContainer);

    window.scrollTo(0, document.body.scrollHeight);
});
