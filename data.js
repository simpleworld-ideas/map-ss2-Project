const BASE_API_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3WfeeNgisFcTjMbN6cCGM2poEmhhzHC2EMhu56uOGaMo="

async function search(lat, lng, searchTerms,categories,opencheck,categorie2) {
    const response = await axios.get(`${BASE_API_URL}/places/search`, {
        params: {
            query: encodeURI(searchTerms), //encodeURI function to convert special characters to their encoded eqv so that query will be wellformed
            ll: lat + "," + lng,
            categories: categories,categorie2,
            // categories:"13033",  // enable use of categories
            open_now: opencheck,
            sort: "DISTANCE",
            radius: 5000,
            limit: 50

        },
        headers: {
            Accept: "application/json",
            // Provide the API key here
            Authorization: API_KEY
        }
    })
    return response.data;
}

async function getPhotoFromFourSquare(fsqId) {
    const response = await axios.get(`${BASE_API_URL}/places/${fsqId}/photos`, {
        headers: {
            Accept: "application/json",
            Authorization: API_KEY
        }
    });
    return response.data;
}