import { buildings, microwaves, printers, vending_machines } from '../database/database.js';

var map = L.map('map').setView([43.816046, -111.783228], 15);
var building_markers = null;
const items = [microwaves, printers, vending_machines]
var buildings_with_items = [] // First slot is for microwaves, second is for printers, third is for vending machines
buildings_with_items[0] = hasItems(items[0])    // TO BE CHANGED, for now only checking for microwaves in buildings

var buildings_with_microwaves = [];
var i = 0;
buildings_with_items[0].forEach(element => { // Get the building IDs of all buildings with microwaves

    buildings.forEach(building => {
        if (building.building_id == element) {
            buildings_with_microwaves[i] = building;
            i++;
            console.log(building.building_name + " has a microwave(s)")     // DEBUG
        }
    })
})

console.log(buildings_with_microwaves)
/*items.forEach(element => {  // On loaded page, code for items of each item type
    hasItems(element)       //      and pulls the corresponding building IDs from each
});*/
displayZoomedOut(true);     // default zoom display on loaded page

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    maxNativeZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var floor1Image = L.tileLayer('https://mapwarper.net/maps/tile/107450/{z}/{x}/{y}.png', {
    minZoom: 18,  
    maxZoom: 21,  
    opacity: 0.85,
    attribution: '&copy; MapWarper'
});

var floor2Image = L.tileLayer('https://mapwarper.net/maps/tile/107398/{z}/{x}/{y}.png', {
    minZoom: 18,  
    maxZoom: 21,  
    opacity: 0.85,
    attribution: '&copy; MapWarper'
});

var floor3Image = L.tileLayer('https://mapwarper.net/maps/tile/107451/{z}/{x}/{y}.png', {
    minZoom: 18,  
    maxZoom: 21,  
    opacity: 0.85,
    attribution: '&copy; MapWarper'
});

var floor1Group = L.layerGroup([
    floor1Image, 
    L.marker([43.814467, -111.784851]).bindPopup("<b>STC Floor 1:</b> Microwave near the Crossroads")
]);

var floor2Group = L.layerGroup([
    floor2Image, 
    L.marker([43.814498, -111.784423]).bindPopup("<b>STC Floor 2:</b> Printer Lab")
]);

var floor3Group = L.layerGroup([
    floor3Image,
    L.marker([43.814769, -111.785001]).bindPopup("<b>STC Floor 3:</b> Vending Machine / Microwave")
]);

var floorLayers = {
    "Floor 3": floor3Group,
    "Floor 2": floor2Group,
    "Floor 1": floor1Group
};
L.control.layers(floorLayers, null, { collapsed: false }).addTo(map);

map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    console.log(currentZoom);
    
    if (currentZoom < 18 && currentZoom > 14) { 
        if (map.hasLayer(floor1Group)) map.removeLayer(floor1Group);
        if (map.hasLayer(floor2Group)) map.removeLayer(floor2Group);
        if (map.hasLayer(floor3Group)) map.removeLayer(floor3Group);
        displayZoomedOut(true);
        items.forEach(element => {
            hasItems(element)
        });
    } else {
        if (currentZoom >= 18) { 
            if (!map.hasLayer(floor1Group) && !map.hasLayer(floor2Group) && !map.hasLayer(floor3Group)) {
                floor1Group.addTo(map);

                var layerControlElement = document.querySelector('.leaflet-control-layers-selector[type="radio"]:last-child');
                if (layerControlElement) layerControlElement.checked = true;
            }
        }
        displayZoomedOut(false);
    }
});

function displayZoomedOut(load_it) {
    if (load_it) {
        if (building_markers && building_markers.length > 0) return;
        building_markers = [];
        for (const building of buildings) {

            const latlng = [building.latitude, building.longitude];
            const image = "<img class=icon src=\"icons/icon-microwave_32x32.ico\">"
            const name = "<h4>" + building.building_name + "</h4>";

            let content = "<div class=\"marker_content\">" + name + "</div>";

            buildings_with_microwaves.forEach(element => {
                if (element.building_id == building.building_id) {
                    content += image;
                }
            });
            

            const marker = L.marker(latlng).addTo(map).bindPopup(content);
            building_markers.push(marker);
        }
        //console.log(building_markers);
    }
    else {
        if (building_markers) {
            building_markers.forEach(marker => map.removeLayer(marker));
            building_markers = null;
        }
        //console.log("Should be empty");
        //console.log(building_markers);
    }
}

// Function that checks if a building has items (use buliding_id for each item type)
// Returns an array of the building_ids so the building can determine whether it has the item
function hasItems(item_array) {
    let id_list = [];
    let count = 0;

    for (const element of item_array) {
        id_list[count] = element.building_id;
        count++;
        //console.log("Item building ID: " + element.building_id);
    }
    //console.log("Returning Item Array: ")
    //console.log(id_list);
    let s = new Set(id_list);

    let returnList = [...s]

    return returnList;
}