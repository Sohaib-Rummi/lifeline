import React from "react";

const title = (string) => {
    if(string){
        if(string.includes(" ")){
            string = string.split(" ");
            for(let  i = 0; i < string.length; i++) {
                string[i] = string[i].charAt(0).toUpperCase()+string[i].slice(1);
            } 
            string = string.toString().replace(",", " ");
        }
        else{
            string =  string.charAt(0).toUpperCase()+string.slice(1);
        }
    
    }
   
    return string;
};


const getTodayDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
    
}

const getLastYear = () => {
    let date = new Date();
    let year = date.getFullYear();
    let last_year = year - 18;
    return `${last_year}-${12}-${31}`;

}


const getFormatedDate = (date = null, format) => {
    
    if(date === null){
        date = new Date();
    }

    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    let year = date.getFullYear();
    let month = date.getMonth();
    let month_date = date.getDate();
    let day_name = weekday[date.getDay()];
    let month_name = months[date.getMonth()];
  
    if(format === "YYYY-MM-DD"){
        return `${year}-${month < 10 ? '0' : ''}${month + 1}-${month_date < 10 ? '0' : ''}${month_date}`;
    }
    else if(format === "YYYY/MM/DD"){
        return `${year}/${month < 10 ? '0' : ''}${month + 1}/${month_date < 10 ? '0' : ''}${month_date}`;
    }
    else if(format === "DD/MM/YYYY"){
        return `${month_date < 10 ? '0' : ''}${month_date}/${month < 10 ? '0' : ''}${month + 1}/${year}`;
    }
    else if(format === "DD-MM-YYYY"){
        return `${month_date < 10 ? '0' : ''}${month_date}-${month < 10 ? '0' : ''}${month + 1}-${year}`;
    }
    else if(format === "WWW MMM DD YYYY"){
        return `${day_name}, ${month_name} ${month_date < 10 ? '0' : ''}${month_date}, ${year}`;
    }
    else if(format === "MMM DD YYYY"){
        return ` ${month_name} ${month_date < 10 ? '0' : ''}${month_date}, ${year}`;
    }
    else if(format === "WWW MMM DD"){
        return ` ${day_name}, ${month_name} ${month_date < 10 ? '0' : ''}${month_date}`;
    }
    
};

const getFormatedTime = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let apprend = hour >=12 ? "PM" : "AM";
    hour = (hour % 12) || 12;
    return `${hour}:${minute} ${apprend}`;
}

const trim = (text) => {
    if(text !== null){
        return text.trim();
    }
    return text;
}

const split = (address) => {
    if(address !== null){
        return address.split(",")[1];
    }
    return address;

}

const validateName = (name) => {
  var pattern = /^[A-Za-z\s]+$/;
  return pattern.test(name);
}

const validatePassword = (password) => {
    return password.length >= 8
}

const validatePhoneNumber = (number) => {
    var pattern = /^03\d{9}$/;
    return pattern.test(number);
}






export {
    title, 
    getFormatedDate, 
    getTodayDate, 
    getFormatedTime,
    getLastYear,
    trim,
    validateName,
    validatePassword,
    validatePhoneNumber,
    split
     
 
};

