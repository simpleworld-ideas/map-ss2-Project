


document.addEventListener("DOMContentLoaded", function () {
    const map = createMap('map', 1.3521, 103.8198);
    const searchLayer = L.layerGroup();
    searchLayer.addTo(map);

    document.querySelector("#searchBtn").addEventListener("click", async function () {
        // const searchTerms = "Hotel";
        
        // // find the lat lng of the center of the map
        // const centerPoint = map.getBounds().getCenter();
        // const data = await search(centerPoint.lat, centerPoint.lng, searchTerms);

        // // adding markers to the map for the search results
        // addMarkersToMap(data, searchLayer, map);
        console.log("HI welcome");

        const radioButtons = document.querySelector('input[name="Restuarent"]:checked');
        console.log(radioButtons);

        const openNowChecked = document.getElementById('openNow').checked;
            const halalChecked = document.getElementById('halal').checked;

            let opencheck ="false";
            if(openNowChecked){
                    opencheck = "true";
            }
            else{
                opencheck = "false";
            }

            let categorie2 =null;
            if(halalChecked){
                categorie2 = "13191";

            }else{
                categorie2=null;
            }
            

        let category= 0;
        // Add event listener to each radio button
        if (radioButtons) {
            // If a restaurant type is selected, call the display function with the selected value
            
            const searchTerms = radioButtons.value;
            if (searchTerms === 'Indian restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13199;
            }
           else if (searchTerms === 'Chinese restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13099;
            }
            else if (searchTerms === 'Malasian restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13299;
            }
            else if (searchTerms === 'Korean restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13289;
            }
            else if (searchTerms === 'Middle Eastern restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13309;
            } 
            else if (searchTerms === 'Australian restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13073;
            }
            else if (searchTerms === 'French restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13148;
            }
            else if (searchTerms === 'Italian restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13236;
            }
            else if (searchTerms === 'Asian restaurant') {
                // If search results are currently hidden, show them and change button text
                 category =13072;
            }else {
                
                // If search results are currently shown, hide them and change button text
                
            }
        const centerPoint = map.getBounds().getCenter();
        const data = await search(centerPoint.lat, centerPoint.lng, searchTerms, category,opencheck,categorie2);
        addMarkersToMap(data, searchLayer, map);
        } else {
            // If no restaurant type is selected, notify the user
            alert("Please select a restaurant type.");
        }

        

        // console.log(selectedColor);

        // let searchTerms = selectedColor;
        //  const centerPoint = map.getBounds().getCenter();
        // const data = await search(centerPoint.lat, centerPoint.lng, searchTerms);

        // // adding markers to the map for the search results
        // addMarkersToMap(data, searchLayer, map);



    });

    document.querySelector("#toggleSearchBtn").addEventListener("click", function(){
        
        const searchContainer = document.querySelector("#search-container");
        const style = window.getComputedStyle(searchContainer);
        // if the search container is already visible, we'll hide it
        if (style.display != "none") {
            searchContainer.style.display = "none";
        } else {
              // otherwise, show it
              searchContainer.style.display = 'block';
        }

      
    })


    let getLocationBtn = document.querySelector("#getLoc")
    getLocationBtn.addEventListener('click', function () {
        findCurrentLocation(map,searchLayer);
    })
    
    let minimize = document.querySelector("#minimizeButton")
    minimize.addEventListener('click',  function toggleSearchResults() {
        const searchResults = document.getElementById('search-results');
        const minimizeButton = document.getElementById('minimizeButton');
            
        if (searchResults.style.display === 'none') {
            // If search results are currently hidden, show them and change button text
            searchResults.style.display = 'block';
            minimizeButton.textContent = 'Minimize';
        } else {
            // If search results are currently shown, hide them and change button text
            searchResults.style.display = 'none';
            minimizeButton.textContent = 'Show Results';
        }
    }
    )

    
   
});

