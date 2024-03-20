/**
 * Create a new Leaflet map
 * @param {string} mapContainerID ID of the element that will display the map
 * @param {Number} lat latitude
 * @param {Number} lng longitude
 * @returns An object that represents the Leaflet map
 */
function createMap(mapContainerID, lat, lng) {
    const map = L.map(mapContainerID);
    map.setView([lat, lng], 13);
    L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
   detectRetina: true,
   maxZoom: 19,
   minZoom: 11,
   /** DO NOT REMOVE the OneMap attribution below **/
   attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
}).addTo(map);
    return map;
}

/**
 * Add markers to a map
 * @param {[*]} searchResults Array of objects from FourSquare
 * @param {*} layer The Leaflet Layer to add to
 */
function addMarkersToMap(searchResults, layer, map) {
    // add markers:
    // Example of how to get lat lng from the FourSquare results: 
    // x.results[0].geocodes.main.latitude = lat
    // x.results[0].goecodes.main.longtitude = lng

    // remove all existing markers from the provided layer
    layer.clearLayers();

    const searchResultOutput = document.querySelector("#search-results");
    searchResultOutput.innerHTML = "";

    // take one location at a time from data.results
    for (let location of searchResults.results) {
        // PART A: create a marker for that location
        
        const lat = location.geocodes.main.latitude;
        const lng = location.geocodes.main.longitude;
        const address = location.location.formatted_address;
        const name = location.name;
        const postcode = location.postcode;
      
        var restauranticon = L.icon({
            iconUrl: 'images/rest.png', // Replace 'path/to/custom-icon.png' with the path to your custom icon
            iconSize: [32, 32], // Size of the icon
            iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
        });
        const marker = L.marker([lat, lng],{ icon: restauranticon });
        marker.bindPopup(function(){

            const divElement = document.createElement('div');
            divElement.innerHTML = `
                <h3>${location.name}</h3>
                <img src="#"/>
                <h4>${location.location.formatted_address}</h4>
                <button class="clickButton">Call</button>
            `;

            async function getPicture() {
                const photos = await getPhotoFromFourSquare(location.fsq_id);
                const firstPhoto = photos[0];
                const photoUrl = firstPhoto.prefix + '150x150' + firstPhoto.suffix;
                divElement.querySelector("img").src = photoUrl;
            }

            getPicture();

            divElement.querySelector(".clickButton").addEventListener("click", function(){
                alert("Call");
            });


            // whatver element or HTML the function returns will be inside popup
            return divElement;
        });

        // add the marker to the map
        marker.addTo(layer);

        // PART B: create and display the search result
        // 2. create a an element to display the result
        const divElement = document.createElement('div');

        // 3. add the element to the result element
        divElement.innerHTML = location.name;

        divElement.addEventListener("click", function () {
            // get lat lng of the search result
            const lat = location.geocodes.main.latitude;
            const lng = location.geocodes.main.longitude;
            map.flyTo([lat, lng], 16);
            marker.openPopup(); // simulate a click on marker
        })

        searchResultOutput.appendChild(divElement);

        // repeat until there are no location left in data.results
    }
}

function findCurrentLocation(map) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            

            var customIcon = L.icon({
                iconUrl: 'images/you.png', // Replace 'path/to/custom-icon.png' with the path to your custom icon
                iconSize: [32, 32], // Size of the icon
                iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
                popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
            });

            var currentLocationMarker = L.marker([lat, lng],{ icon: customIcon });
            currentLocationMarker.addTo(map)
                .bindPopup("You are here")
                .openPopup();
            map.setView([lat, lng], 15); // Set map view to current location
        }, function(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to find distance between current location and restaurant using ZipCodeStack API

// Example usage:
// Replace the latitude, longitude, and restaurant ZIP code with actual values
// var myLat = 1.3521; // Latitude of your current location
// var myLon = 103.8198; // Longitude of your current location
// var restaurantZipCode = "90210"; // ZIP code of the restaurant







