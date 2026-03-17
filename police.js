function findPoliceStations() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPoliceStations, showError);
    } else {
        document.getElementById("status").innerText = "Geolocation is not supported by your browser.";
    }
}

function showPoliceStations(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 14
    });

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
        {
            location: { lat, lng },
            radius: 5000,
            type: ["police"]
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.forEach((place) => {
                    new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name
                    });
                });
                document.getElementById("status").innerText = "Police stations located!";
            } else {
                document.getElementById("status").innerText = "No police stations found nearby.";
            }
        }
    );
}

function showError(error) {
    let message = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        default:
            message = "An unknown error occurred.";
            break;
    }
    document.getElementById("status").innerText = message;
}
s