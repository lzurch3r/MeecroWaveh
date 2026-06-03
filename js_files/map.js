// 1. Initialize map on the MC
var map = L.map('map').setView([43.819046, -111.783228], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 2. LINK YOUR MAPWARPER URL HERE
// This pulls your exact warped floor plan straight from MapWarper
var floor1Image = L.tileLayer('https://mapwarper.net/maps/tile/107398/{z}/{x}/{y}.png', {
    minZoom: 19,  // HIDES the floor plan if they zoom out further than this!
    maxZoom: 21,  // Allows them to zoom in extra close to see rooms
    opacity: 0.85,
    attribution: '&copy; MapWarper'
});

// 3. Create your Floor Groups 
// Floor 1 now contains your MapWarper blueprint AND your markers
var floor1Group = L.layerGroup([
    floor1Image, 
    L.marker([43.819046, -111.783228]).bindPopup("<b>STC Floor 1:</b> Microwave near the Crossroads")
]);

var floor2Group = L.layerGroup(); // Empty until you warp Floor 2!
var floor3Group = L.layerGroup(); 

// 4. Show Floor 1 by default
floor1Group.addTo(map);

// 5. UI Layer Control
var floorLayers = {
    "Floor 3": floor3Group,
    "Floor 2": floor2Group,
    "Floor 1": floor1Group
};
L.control.layers(floorLayers, null, { collapsed: false }).addTo(map);

// DEBUG Coordinate Tool
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Clicked Coord: <code>[" + e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6) + "]</code>")
        .openOn(map);

    itemDetails.innerHTML = "<p>You clicked the map at " + e.latlng.toString() + "</p>";
}
map.on('click', onMapClick);