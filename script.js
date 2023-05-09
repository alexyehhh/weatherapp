let latitude = 0;
let longitude = 0;

window.onload = function() { //When the window loads (When the page loads)
    const date = new Date();
    // Outputs out data in MM/DD/YYYY
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    // Now, set the .date HTML text to our dateString
    document.getElementById('date').innerHTML = dateString;
    if ("geolocation" in navigator) { // If the browser supports location
		navigator.geolocation.getCurrentPosition(success); // Get position and call success function
	} else { // If location does not exist, or if we deny permission
	  console.log("Geolocation is not available in your browser."); 
	}
}

function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	// Print out the latitude and longitude to see if it works!
    console.log(latitude, longitude);
}
const btn = document.getElementById('getWeatherBtn');
btn.addEventListener("click", () => {
  // ------------------ CURRENT ------------------
  const xhr = new XMLHttpRequest(); //Defines the XMLHttp object
  xhr.open("GET", `localhost:3000/weather/${latitude}/${longitude}`); // opens a get request to the website
  xhr.send(); // sends the request

  xhr.onload = function() {
    //What’s wrong w/ this (Think about the format responseText is in and what format we need it in (stringify/parse)
	  const body = JSON.parse(xhr.responseText); // Set body to the response text
    let temperature = body.temperature; // Parse the temperature from the response
    let weatherStatus = body.weatherStatus; // Parse the weather status from the response
    document.getElementById("temperature").innerHTML = `Temperature: ${temperature}°F`;
    document.getElementById("weatherStatus").innerHTML = `Weather Status: ${weatherStatus}`;
  }
  // ------------------ 5-Day FORECAST ------------------
  const xhr2 = new XMLHttpRequest(); // Defines the XMLHttp object
  xhr2.open("GET", `localhost:3000/forecast/${latitude}/${longitude}`); // opens a get request to the website
  xhr2.send();
  
  xhr2.onload = function() {
    //What’s wrong w/ this (Think about the format responseText is in and what format we need it in (stringify/parse)
	  const body = JSON.parse(xhr2.responseText); // Set body to the response text
    let forecast = body.forecast;
    let forecastElements = document.getElementsByClassName("forecast");
    for(let i = 0; i < forecast.length; i++){
      forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`;
    }
  }


  let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]] //Nested array of predefined day/forecast pairs
  let forecastElements = document.getElementsByClassName("forecast"); // Setting forecastElements to an array of divs with the class 'forecast' (5 in this case)
  for (let i = 0; i < forecast.length; i++) { //For loop that goes from the 0th index to the length - 1 index
      forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00B0F"; //
    }
});