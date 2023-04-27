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