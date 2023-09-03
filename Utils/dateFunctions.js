function createDate () {
    const date = new Date();
    let dayOfWeek = formatDate(date.getDay(), "dayOfWeek")
    let day = formatDate(date.getDate(), "days")
    let month = formatDate(date.getMonth(), "month")
    let time = date.getHours() +":"+ formatDate(date.getMinutes(), "time"); // e.g. 14:32

    let dateString = `${dayOfWeek}, ${month} ${day} at ${time}`;
    return dateString;    
}
function formatDate(number, dateType){
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days =["", "1st", "2nd","3rd"];

    if(dateType==="dayOfWeek"){
        number = daysOfWeek[Number(number)]
    }else if(dateType==="month"){
        number = months[Number(number)]
    }else if(dateType==="days" && number < 4){
        number = days[Number(number)]
    }else if(dateType ==="days" && number > 3){
        number += "th"
    }else if(dateType === "time" && number < 10){
        number = "0"+number;
    }
    return number
};

module.exports = {createDate, formatDate};