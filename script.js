
const tempratureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");

let target="Pokhara"


const fetchData= async (target)=>{
    try{
        const url=`https://api.weatherapi.com/v1/current.json?key=54e3292fd45c4c4f8aa235115230506&q=${target}`;

    const response=await fetch(url);
    const data=await response.json();

    console.log(data);

    const {current:{
        temp_c,condition:{
            text,icon
        }},location:{name,localtime}}=data;


    console.log(data.current.cloud);

     updateDOM(temp_c,name,localtime,icon,text);
    }
    catch(error)
    {
        alert("Location Not Found")
    }
    
};

function updateDOM(temprature,city,time,emoji,text){
    tempratureField.innerText=temprature;
    cityField.innerText=city;

    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    const exactDay=new Date(exactDate).getDay();

    dateField.innerHTML=`${exactTime}- ${getFullDay(exactDay)} ${exactDate}`
    
    emojiField.src=emoji;
    weatherField.innerText=text;

}

fetchData(target);


function getFullDay(num)
{
    switch(num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know"

    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
   target=searchField.value;
   fetchData(target);
})