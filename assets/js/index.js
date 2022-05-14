//show today's day
var today = moment();
var todayFomat = today.format("MM/DD/YYYY");
var todatEl =document.querySelector(".todayDate");
todatEl.textContent=todayFomat;
var todayUnix=moment().unix();
console.log(todayUnix);
var weekArray = [];
var weekArrayUnit = [];
console.log(weekArray);
console.log(weekArrayUnit);

//make a week time unix
for (var i=0; i<5; i++){
    console.log(i);
    var new_date_unix = moment().add(i, 'days').unix();
    console.log(new_date_unix);
    weekArrayUnit.push(new_date_unix)
    
    
}
console.log(weekArrayUnit);

// for(var i=0; i<5; i++){
//         var weekDtailEl = document.querySelector("#week-detail");
//         var findH3=weekDtailEl.children[i].childNodes[1]
//         console.log(findH3);
//         var date = new Date(weekArray[i]*1000);
//         var weeklyFormat=(date.getMonth("")+1)+"/"+(date.getDate()+1)+"/"+date.getFullYear();
//         findH3.textContent=weeklyFormat;
// }

//show the day for weekly title
for(var i=0; i<5; i++){
    console.log(i);
    var new_date = moment().add(i+1, 'days').format("MM/DD/YYYY");
    // console.log(new_date);
    weekArray.push(new_date)
}
// console.log(weekArray);

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

// var cityInput =document.querySelector("#city-input");
var cityInput = document.querySelector("#city-input");
var cityApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?';
var lat = "";
var lon = "";
var dt ="dt="+todayUnix;
var api_key="ddea37d4c9d8f3a7f69b54f8f27c48a4";
var appid ="appid="+api_key;


//   var new_date_unix = moment.unix(today).add(i+1, 'days');
//         console.log(new_date_unix);

function getAweekData(event){
    event.preventDefault();
    const newArray = [todayUnix].concat(weekArrayUnit)
    console.log(newArray);
}


//need to get lat,lon value first
function locationApi(event){
    event.preventDefault();
    var q = "q=";
    console.log(event.target.value);
    if(event.target.value===search){
        q = "q="+ cityInput.value;
    }else{
        q = "q="+ event.target.value;
    }
    // console.log(q);

    fetch(cityApiUrl+q+'&'+appid,{
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
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
        // console.log(data[0].lat);
        // console.log(data[0].lon);
        // console.log(lat);
        // console.log(lon);
        // console.log(newLat);
        // console.log(newLon);
        getWeatherApi(newLat,newLon)
        });
}

//get weather data again
var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?';

function getWeatherApi(lat,lon){
    console.log(requestUrl+lat+'&'+lon+'&'+dt+'&'+appid);
    
    fetch(requestUrl+lat+'&'+lon+'&'+dt+'&'+appid,{
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
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
    console.log(data);
    var todayTemp=document.querySelector(".temp-0");
    todayTemp.textContent=data.current.temp;
    var todayWind=document.querySelector(".wind-0");
    todayWind.textContent=data.current.wind_deg;
    var todayHum=document.querySelector(".hum-0");
    todayHum.textContent=data.current.humidity;
    var todayUV=document.querySelector(".uv-0");
    todayUV.textContent=data.current.uvi;
    });
}

//search btn
var searchBtn = document.querySelector("#search")
// searchBtn.addEventListener("click", getAweekData)
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


