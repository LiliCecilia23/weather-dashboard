

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


$('.card').css("display" , "none");

$('#searchBtn').click(function() {
    event.preventDefault();
    let cityName = $('#searchInput').val();
    var apiKey = "c16c7413aa437db7ca505d50166112cf"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    var temp;
    var forecastTemp;
    var forecastHumidity;
    
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
        } else if (iconCode === '01n'){
            weatherEmoji = '🌙';
        } else if (iconCode === '02d' || iconCode === '02n'){
            weatherEmoji = '🌤️';
        } else if (iconCode === '03d' || iconCode === '03n'){
            weatherEmoji = '☁';
        } else if (iconCode === '04d' || iconCode === '04n'){
            weatherEmoji = '☁️';
        } else if (iconCode === '09d' || iconCode === '09n'){
            weatherEmoji = '🌧️';
        } else if (iconCode === '10d' || iconCode === '10n'){
            weatherEmoji = '🌦️';
        } else if (iconCode === '11d' || iconCode === '11n'){
            weatherEmoji = '⛈️';
        } else if (iconCode === '13d' || iconCode === '12n'){
            weatherEmoji = '❄️';
        } else if (iconCode === '50d' || iconCode === '50n'){
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
            $('#uv').text("UV Index: ");
            $('#uvValue').text(uv);
            
            // if (uv < 3){
            //     $('#uvValue').addClass('bg-success');
            // } else if (uv > 2 && uv < 6){
            //     $('#uvValue').addClass('bg-warning');
            // }else if (uv > 5 && uv < 8){
            //     $('#uvValue').addClass('bg-warning');
            // } else {
            //     $('#uvValue').addClass('bg-danger');
            // }
            
        });

        $('.card').css("display" , "block");
        $('.card').addClass('bg-primary text-white');
        $('#forecastTitle').text("5 Day Forecast:");
        $('#date1').text(date1);
        $('#date2').text(date2);
        $('#date3').text(date3);
        $('#date4').text(date4);
        $('#date5').text(date5);

        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(result){
            console.log(result);
            var forecastCodes = [result.list[1].weather[0].icon, 
            result.list[2].weather[0].icon,
            result.list[3].weather[0].icon,
            result.list[4].weather[0].icon,
            result.list[5].weather[0].icon];

            var emojiDivs = [$('#emoji1'),
            $('#emoji2'),
            $('#emoji3'),
            $('#emoji4'),
            $('#emoji5')];

            for (var i = 0; i < forecastCodes.length; i++){
                if (forecastCodes[i] === '01d'){
                    emojiDivs[i].text('☀️');
                } else if (forecastCodes[i] === '01n'){
                    emojiDivs[i].text('🌙');
                }else if (forecastCodes[i] === '02d' || forecastCodes[i] === '02n'){
                    emojiDivs[i].text('🌤️');
                } else if (forecastCodes[i] === '03d' || forecastCodes[i] === '03n'){
                    emojiDivs[i].text('☁');
                } else if (forecastCodes[i] === '04d' || forecastCodes[i] === '04n'){
                    emojiDivs[i].text('☁️');
                } else if (forecastCodes[i] === '09d' || forecastCodes[i] === '09n'){
                    emojiDivs[i].text('🌧️');
                } else if (forecastCodes[i] === '10d' || forecastCodes[i] === '10n'){
                    emojiDivs[i].text('🌦️');
                } else if (forecastCodes[i] === '11d' || forecastCodes[i] === '11n'){
                    emojiDivs[i].text('⛈️');
                } else if (forecastCodes[i] === '13d' || forecastCodes[i] === '13n'){
                    emojiDivs[i].text('❄️');
                } else if (forecastCodes[i] === '50d' || forecastCodes[i] === '50n'){
                    emojiDivs[i].text('🌫️');
                } 
            }

            var tempDivs = [$('#temp1'),
            $('#temp2'),
            $('#temp3'),
            $('#temp4'),
            $('#temp5')];

            for (var i = 0; i < tempDivs.length; i++){
                forecastTemp = convertTemp(result.list[i + 1].main.temp);
                tempDivs[i].text("Temp: " + forecastTemp + fSymbol);
            }

            var humidityDivs = [$('#humidity1'),
            $('#humidity2'),
            $('#humidity3'),
            $('#humidity4'),
            $('#humidity5')]

            for (var i = 0; i < humidityDivs.length; i++){
                forecastHumidity = result.list[i + 1].main.humidity;
                humidityDivs[i].text("Humidity: " + forecastHumidity + "%");
            }
        });
    });

    function convertTemp (kelvin) {
        var temp = Math.floor((kelvin - 273.15) * 1.80 + 32);
        return temp;
    }
});

