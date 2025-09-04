const path = require("path");
const School = require("../models/schoolModel");

// Haversine formula for distance (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// serve html page
const getPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
};

// add a school
const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const school = await School.create({
            name,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        });

        res.status(201).json({ message: "School added successfully", school });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
};

// get schools sorted by proximity
const getSchool = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        const schools = await School.findAll();

        const sorted = schools
            .map((s) => ({
                id: s.id,
                name: s.name,
                address: s.address,
                latitude: s.latitude,
                longitude: s.longitude,
                distance: calculateDistance(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    s.latitude,
                    s.longitude
                ),
            }))
            .sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
};

module.exports = { getPage, addSchool, getSchool };
