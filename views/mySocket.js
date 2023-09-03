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
        input.value = "";
        textArea.value = "";
    }
});
//this is formatting the message and adding to DOM
// On the server side we can format it (like before)
// Then push it to the mock DB
// Then do the DOM stuff as is.
socket.on("chat message", function(msg){
    const msgContainer = document.createElement("div");
    const pdate = document.createElement("p");
    const puser = document.createElement("p");
    const li = document.createElement("li");

    pdate.textContent = msg.date;
    puser.textContent = msg.user;
    li.textContent =msg.message;
    
    msgContainer.appendChild(pdate);
    msgContainer.appendChild(puser);
    msgContainer.appendChild(li);

    msgContainer.classList.add("message");
    
    chatbox.appendChild(msgContainer);

    window.scrollTo(0, document.body.scrollHeight);
});
