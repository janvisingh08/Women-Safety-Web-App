console.log("✅ Script.js loaded!");  // Ensure script is loaded

// Function to find nearest police station
function findPoliceStation() {
    let location = document.getElementById("location").value;
    if (location === "") {
        alert("Please enter a location.");
        return;
    }
    let searchURL = `https://www.google.com/maps/search/police+station+near+${location}`;
    window.open(searchURL, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded");

    let panicButton = document.getElementById("panicButton");

    if (panicButton) {
        panicButton.addEventListener("click", function () {
            console.log("🚨 Panic Button Clicked!");

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        let latitude = position.coords.latitude;
                        let longitude = position.coords.longitude;
                        let googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

                        console.log("📍 Got location:", latitude, longitude);
                        console.log("📨 Sending email...");

                        fetch("http://127.0.0.1:5000/send_email", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: "janvisingh.gahrwal@gmail.com",
                                subject: "🚨 Emergency Alert!",
                                message: `This is an emergency! Please help.\n\nLocation: ${googleMapsLink}`
                            })
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Server error: " + response.status);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log("✅ Email sent!", data);
                            alert(data.message || "✅ Emergency email sent successfully!");
                        })
                        .catch(error => {
                            console.error("❌ Fetch error:", error);
                            alert("❌ Failed to send email. Please check the console for details.");
                        });
                    },
                    function (error) {
                        console.error("❌ Geolocation error:", error.message);
                        alert("❌ Failed to get location: " + error.message);
                    }
                );
            } else {
                console.error("❌ Geolocation not supported by browser");
                alert("❌ Your browser does not support geolocation.");
            }
        });
    } else {
        console.error("❌ Panic Button element not found in DOM!");
    }
});
