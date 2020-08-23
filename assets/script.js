

let searchInput = $('#searchInput'); //where the user will search for city
let searchHistory = $('#searchHistory'); //area where local storage city searches are stored (ul element)
let currentCity = $('#currentCity'); //where current searched city weather info is displayed
let forecastDiv = $('#forecastDiv'); //where 5 day forecast is displayed


let date = moment().format('L'); 
console.log(cityName);


var apiKey = "c16c7413aa437db7ca505d50166112cf"
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

$('#searchBtn').click(function() {
    let cityName = $('#searchInput').val();
    $('#cityName').text(cityName + "(" + date + ")");
    console.log(cityName)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    })
});