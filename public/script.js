const API_BASE = "https://school-management-rvqa.onrender.com";

// Add School
document.getElementById("addSchoolForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        latitude: parseFloat(document.getElementById("latitude").value),
        longitude: parseFloat(document.getElementById("longitude").value),
    };

    try {
        const res = await axios.post(`${API_BASE}/addSchool`, data);
        alert(res.data.message || "School added successfully");
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to add school");
    }
});

// Get Schools
document.getElementById("getSchoolsForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const lat = document.getElementById("userLat").value;
    const lng = document.getElementById("userLng").value;

    try {
        const res = await axios.get(`${API_BASE}/getSchool`, {
            params: { latitude: lat, longitude: lng }
        });

        const schools = res.data;
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "<h3>Schools Near You:</h3>";

        if (schools.length === 0) {
            resultsDiv.innerHTML += "<p>No schools found.</p>";
        } else {
            schools.forEach(s => {
                resultsDiv.innerHTML += `
          <div class="school">
            <strong>${s.name}</strong><br/>
            ${s.address}<br/>
            Distance: ${s.distance.toFixed(2)} km
          </div>
        `;
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to fetch schools");
    }
});

// Use My Location
document.getElementById("getLocation").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            document.getElementById("userLat").value = pos.coords.latitude;
            document.getElementById("userLng").value = pos.coords.longitude;
        }, () => {
            alert("Unable to retrieve your location");
        });
    } else {
        alert("Geolocation is not supported by this browser");
    }
});
