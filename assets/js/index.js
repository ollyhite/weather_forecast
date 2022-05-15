//show today's day
var today = moment();
var todayFomat = today.format("MM/DD/YYYY");
var todatEl =document.querySelector(".todayDate");
todatEl.textContent=todayFomat;
var todayUnix=moment().unix();
console.log("todayUnix",todayUnix);
var weekArray = []; 
var weekArrayUnit = [];
// var weekArrayUnit2 = [];


//show the day for weekly title
for(var i=1; i<6; i++){
    //make a weekly time format
    var new_date = moment().add(i, 'days').format("MM/DD/YYYY"); 
    //make a weekly time unix
    var new_date_unix = moment().add(i, 'days').unix();
    weekArray.push(new_date)
    weekArrayUnit.push(new_date_unix)
}

console.log("weekArray",weekArray);
console.log("weekArrayUnit",weekArrayUnit);

//print date title
for(var i=0; i<5; i++){
        var weekDtailEl = document.querySelector("#week-detail");
        var findH3=weekDtailEl.children[i].childNodes[1];
        // console.log(findH3);
        findH3.textContent=weekArray[i];
    }

//makk num left 2 and not change value
function formatDecimal(num){
    var newNum = num.toFixed(3).slice(0, -1); 
    console.log(newNum);
    return newNum;  	    
}

//defination the api request
var cityInput = document.querySelector("#city-input");
var cityApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?';
var lat = "";
var lon = "";
var dt ="dt="+todayUnix;
var api_key="ddea37d4c9d8f3a7f69b54f8f27c48a4";
var appid ="appid="+api_key;
var q = "q=Denver";

function getAweekData(event){
    event.preventDefault();
    const newArray = [todayUnix].concat(weekArrayUnit)
    console.log(newArray);
}

function searchWeather(event){
    event.preventDefault();
    q = "q="+ cityInput.value;
    locationApi();
}

var weatherIcons =
    {
    "Sunny":"./assets/icons/sunny.svg",
    "Clear":"./assets/icons/sunny.svg",
    "Rain":"./assets/icons/rain.svg",
    "Clouds":"./assets/icons/cloudy.svg",
    "Snow":"./assets/icons/snow.svg"
}

//load data when in page
locationApi();

//need to get lat,lon value first
function locationApi(event){
    //if have btn click to find val
    if(event){
        q = "q="+ event.target.value;
    }

    fetch(cityApiUrl+q+'&'+appid,{
        method: 'GET', 
        credentials: 'same-origin', 
        redirect: 'follow',
    })
    .then(function (response) {
        if(response.status === 200){
            console.log(response.clone().json());
            return response.clone().json();
        }else{
            alert("Get Data failed, Please inset another value!")
        }
    })
    .then(function (data) {
        console.log(data[0]);
        var cityName=document.querySelector(".place");
        cityName.textContent=data[0].name;
        lat = formatDecimal(data[0].lat);
        lon = formatDecimal(data[0].lon);
        newLat = "lat="+lat;
        newLon = "lon="+lon;
        getWeatherApi(newLat,newLon)
        });
}

//get weather data again
var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?';

function getWeatherApi(lat,lon){
    console.log(requestUrl+lat+'&'+lon+'&'+dt+'&'+appid);
    
    fetch(requestUrl+lat+'&'+lon+'&'+dt+'&'+appid,{
        method: 'GET', 
        credentials: 'same-origin', 
        redirect: 'follow', 
    })
    .then(function (response) {
        if(response.status === 200){
                console.log(response.clone().json());
                return response.clone().json();
            }
        })
    .then(function (data) {
        console.log(data);
        //today data
        var todayTemp=document.querySelector(".temp-0");
        todayTemp.textContent=data.current.temp;
        var todayWind=document.querySelector(".wind-0");
        todayWind.textContent=data.current.wind_deg;
        var todayHum=document.querySelector(".hum-0");
        todayHum.textContent=data.current.humidity;
        var todayUV=document.querySelector(".uv-0");
        todayUV.textContent=data.current.uvi;
        //show today weather icons
        var todayWeatherIconEl = document.querySelector("#today-weather-icon");
        // console.log(data.current.weather[0].main);
        var weatherIconMatch =Object.keys(weatherIcons).filter((key) => key.includes(data.current.weather[0].main))
        // console.log(weatherIcons[weatherIconMatch]);
        todayWeatherIconEl.src=weatherIcons[weatherIconMatch]
        //got five days data and print it
        for(var i=1;i<6;i++){
            console.log(data.daily[i]);
            var weekDateEl = document.querySelector("#week-detail").children[i-1];
            var weekTemp=weekDateEl.querySelector(".temp");
            weekTemp.textContent=data.daily[i].temp.day;
            var weekWind=weekDateEl.querySelector(".wind");
            weekWind.textContent=data.daily[i].wind_deg;
            var weekHum=weekDateEl.querySelector(".hum");
            weekHum.textContent=data.daily[i].humidity;
            //show the weekly weather icons
            weeklyWeatherIconEl = weekDateEl.querySelector(".weather-icon");
            console.log(weeklyWeatherIconEl);
            // console.log(data.daily[i].weather[0].main);
            weatherIconMatch =Object.keys(weatherIcons).filter((key) => key.includes(data.daily[i].weather[0].main))
            // console.log(weatherIcons[weatherIconMatch]);
            weeklyWeatherIconEl.src = weatherIcons[weatherIconMatch];
            
        }
    });
}

//search btn
var searchBtn = document.querySelector("#search")
searchBtn.addEventListener("click", locationApi)

var denverBtn = document.querySelector("#denver")
denverBtn.addEventListener("click", locationApi)

var tpeBtn = document.querySelector("#tpe")
tpeBtn.addEventListener("click", locationApi)

var londonBtn = document.querySelector("#london")
londonBtn.addEventListener("click", locationApi)

var nyBtn = document.querySelector("#ny")
nyBtn.addEventListener("click", locationApi)

var orlandoBtn = document.querySelector("#orlando")
orlandoBtn.addEventListener("click", locationApi)

var sfBtn = document.querySelector("#sf")
sfBtn.addEventListener("click", locationApi)

var seattleBtn = document.querySelector("#seattle")
seattleBtn.addEventListener("click", locationApi)

var austinBtn = document.querySelector("#austin")
austinBtn.addEventListener("click", locationApi)


