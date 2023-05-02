let latitude = 0;
let longitude = 0;

window.onload = function() { //When the window loads (When the page loads)
    const date = new Date();
    // Outputs out data in MM/DD/YYYY
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() +      '/' + date.getFullYear();
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
  let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]] //Nested array of predefined day/forecast pairs
  let forecastElements = document.getElementsByClassName("forecast"); // Setting forecastElements to an array of divs with the class 'forecast' (5 in this case)
  for (let i = 0; i < forecast.length; i++) { //For loop that goes from the 0th index to the length - 1 index
      forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00B0F"; //
    }
});