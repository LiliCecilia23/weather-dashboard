

let searchInput = $('#searchInput'); //where the user will search for city
let searchHistory = $('#searchHistory'); //area where local storage city searches are stored (ul element)
let currentCity = $('#currentCity'); //where current searched city weather info is displayed
let forecastDiv = $('#forecastDiv'); //where 5 day forecast is displayed
let date = moment().format('L'); 
let date1 = moment().add(1, 'day').format('L');
let date2 = moment().add(2, 'day').format('L');
let date3 = moment().add(3, 'day').format('L');
let date4 = moment().add(4, 'day').format('L');
let date5 = moment().add(5, 'day').format('L');
const fSymbol = '\u2109'


$('#searchBtn').click(function() {
    event.preventDefault();
    let cityName = $('#searchInput').val();
    var apiKey = "c16c7413aa437db7ca505d50166112cf"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    var temp;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        temp = convertTemp(response.main.temp);
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        
        var iconCode = response.weather[0].icon;

        var weatherEmoji;
        if (iconCode === '01d'){
            weatherEmoji = '☀️';
        } else if (iconCode === '02d'){
            weatherEmoji = '🌤️';
        } else if (iconCode === '03d'){
            weatherEmoji = '☁';
        } else if (iconCode === '04d'){
            weatherEmoji = '☁️';
        } else if (iconCode === '09d'){
            weatherEmoji = '🌧️';
        } else if (iconCode === '10d'){
            weatherEmoji = '🌦️';
        } else if (iconCode === '11d'){
            weatherEmoji = '⛈️';
        } else if (iconCode === '13d'){
            weatherEmoji = '❄️';
        } else if (iconCode === '50d'){
            weatherEmoji = '🌫️';
        };
        
        $('#currentCity').addClass('border border-secondary"')
        $('#cityName').text(cityName + " (" + date + ") " + weatherEmoji);
 

        $('#temp').text("Temperature: " + temp + fSymbol);
        $('#humidity').text("Humidity: " + humidity + "%");
        $('#wind').text("Wind: " + wind + " MPH");
        

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(result) {
            var uv = result.value;
            $('#uv').text("UV Index: " + uv);
        });


        $('.card').addClass('bg-primary text-white');
        $('#forecastTitle').text("5 Day Forecast:");
        $('#date1').text(date1);
        $('#date2').text(date2);
        $('#date3').text(date3);
        $('#date4').text(date4);
        $('#date5').text(date5);

    })

    function convertTemp (kelvin) {
        var temp = Math.floor((kelvin - 273.15) * 1.80 + 32);
        return temp;
    }
});

