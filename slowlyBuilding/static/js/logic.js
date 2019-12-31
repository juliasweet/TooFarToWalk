var myMap;
var springs = new L.featureGroup();
var canyons = new L.featureGroup();

// Store our API endpoint inside queryUrl 
var springsURL = "https://raw.githubusercontent.com/juliasweet/TheThrilloftheChase/master/TreasureMap/convertcsv.geojson?token=ALYAINPOB5KHRY5NWL2M4GC5YIZWE";
var canyonsURL = "https://raw.githubusercontent.com/juliasweet/TheThrilloftheChase/master/TreasureMap/convertcsv3.geojson?token=ALYAINPOB5KHRY5NWL2M4GC5YIZWE";


var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openelevationmap.org/\">Openelevationmap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

var pirates = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openelevationmap.org/\">Openelevationmap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.pirates",
    accessToken: API_KEY
});

var terrain = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openelevationmap.org/\">Openelevationmap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.mapbox-terrain-v2",
    accessToken: API_KEY
});

var terrain_rgb = L.tileLayer("https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openelevationmap.org/\">Openelevationmap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.mapbox-terrain-rgb",
    accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
    // "Elevation Map": elevationmap,
    "Satellite": satellite,
    "Terrain": terrain,
    "Treasure": pirates,
    // "Shadow": terrain_rgb
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
    "Hot Springs": springs,
    "Canyons": canyons
};




// Create the map
function createMap() {
    myMap = L.map("map", {
        center: [
            44.2643, -109.7879
        ],
        zoom: 5,
        layers: [satellite, springs, canyons]
    });
}
createMap();


var style1 = function style(feature) {
    return {
        opacity: 0.5,
        radius: 5,
        weight: 1,
        color: "black",
        fillColor: "red",
        fillOpacity: 0.5
    }
}

var style2 = function style(feature) {
    return {
        opacity: 0.5,
        radius: 5,
        weight: 1,
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.5
    }
}



function createFeatures(springsURL, stylecallback, layer) {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup with name and state of spring
    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.SpringName +
            "<hr><p>" + feature.properties.State);
    }

    var springs = L.geoJSON(springsURL, {
        pointToLayer: function(_geometry, coordinates) {
            return L.circleMarker(coordinates);
        },
        onEachFeature: onEachFeature,
        style: stylecallback
    }).addTo(layer);

}



function createFeatures2(canyonsURL, style2, layer2) {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup with name and state of canyon
    console.log("x")

    function onEachCanyon(feature, layer) {

        layer.bindPopup(Feature.properties.Canyon +
            "<hr><p>" + Feature.properties.State);
    }

    // Create a GeoJSON layer containing the features array on the data objects
    // Run the onEachFeature function once for each piece of data in the array
    var canyons = d3.json(canyonsURL, {
        pointToLayer: function(_geometry, coordinates) {
            return L.circleMarker(coordinates);
        },
        onEachCanyon: onEachCanyon,
        style2: style2
    }).addTo(layer2);

}


// Create a layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: true,
    position: 'bottomright'
}).addTo(myMap);

d3.json(springsURL, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features, style1, springs);
});
// // Perform a GET request to the query URL
d3.json(canyonsURL, function(data) {
    // Once we get a response, send the data.features object to the createFeatures2 function
    createFeatures(data.features, style2, canyons);
    console.log(data.features)
});