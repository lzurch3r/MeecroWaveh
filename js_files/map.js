var map = L.map('map').setView([43.819046, -111.783228], 14);
var itemDetails = document.getElementById('item_details');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([43.819046, -111.783228]).addTo(map);

//DEBUG
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);

    itemDetails.innerHTML = "<p>You clicked the map at " + e.latlng.toString() + "</p>";
}

map.on('click', onMapClick);