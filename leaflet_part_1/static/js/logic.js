/* ------- gloabl variables and constants */

let earthQuakeLayer = L.layerGroup();

/* all earthquakes past 7 days */
const earthQuakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// /* all earthquakes past 30 days */
// const earthQuakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
// /* M4.5+ earthquakes past 30 days */
// const earthQuakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

const legendScale = [-10, 10, 30, 50, 70, 90];
const legendColors = [
  "#77DD77", // pastel green
  "#B0BF1A", // acid green
  "#FED8B1", //light orange
  "#FFA500", // orange
  "#FFCCCB", // light red
  "#FF0000" //red
];


/* ------- utility function determine color based on earthquake depth */ 
  function getColor(depth) { 
    if (depth > 90) return "#FF0000"; // red 
    if (depth > 70) return "#FFCCCB"; // light red 
    if (depth > 50) return "#FFA500"; // orange 
    if (depth > 30) return "#FED8B1"; //light orange 
    if (depth > 10) return "#B0BF1A"; // acid green 
    return "#77DD77"; // pastel green 
    }

/* ------- MAIN MAP CREATION FUNCTION */ 
function createMap() {

/* create the map object with options. used coordinates to center around a place i was at during the 1986 eartquake in san francisco 37.709157, -122.409178*/
let map = L.map("map-id", { 
  center: [37.709157, -122.409178], 
  zoom: 7, 
  layers: [earthQuakeLayer] });  
  
    /* create the tile layer that will be the background map
    Reference: https://leafletjs.com/examples/quick-start/ */
    let streetmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
    /* create a baseMaps object to hold the streetmap layer. */
    let baseMaps = {
      "Street Map": streetmap
    };        
  
    /* create an overlayMaps object to hold the earthQuakes layer. */
    let overlayMaps = {
      "Earthquakes": earthQuakeLayer
    };
    
    /* create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map. */
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  
    /* add legend */
  addLegend(map);}
  
/* ------- LEGEND CREATION FUNCTION */ 
function addLegend(map) { 
    const legend = L.control({ 
        position: "bottomleft" 
    }); 
    legend.onAdd = function() { 
        const div = L.DomUtil.create("div", "info legend");

/* Add title to the legend */
    div.innerHTML += '<div class="legend-title">Depth</div>';

/* loop through depth intervals to create legened labels */ 
for (let i = 0; i < legendScale.length; i++) {
    let depth = legendScale[i]; // depth value
    let nextDepth = legendScale[i + 1]; // next range value
    let color = getColor(depth + 1); // getColor function assigns correct color

    div.innerHTML +=
    `<i style="background:${color}; width: 20px; height: 20px; display: inline-block;"></i> ` +
    `${depth}km${nextDepth ? `–${nextDepth}km` : "+"}<br>`;
}
return div;
};
legend.addTo(map);
}

/* ------- MARKER CREATION FUNCTION */ 
function createMarkers(data) {
  
    /* added console.log to view the data in console */   
console.log("Data:",data);

data.features.forEach(feature => {
    /* get the coordinates and properties */
    let coordinates = feature.geometry.coordinates;
    let properties = feature.properties;
    let magnitude = feature.properties.mag; // magnitude for radius
    let depth = coordinates[2]; // depth for color
    let radius = Math.max(magnitude * 5, 5); // scale size by magnitude with minimum radius of 5

/* create a circle marker for each earthquake */
    let marker = L.circleMarker([coordinates[1], coordinates[0]], {
      radius: radius, // scale size by magnitude
      fillColor: getColor(depth), // color by depth
      color: "black",
      weight: 0.8,
      opacity: 0.3, 
      fillOpacity: 0.8
    }).bindPopup(
        `<h3>${properties.place}</h3>
            <hr>
            <p><strong>Depth:</strong> ${depth}km</p>
            <p><strong>Magnitude:</strong> ${magnitude}</p>
            <p><strong>Date and Time:</strong> ${new Date(properties.time).toLocaleString()}</p>`                              
  
  /* add the marker to the earthquakeLayer */
    ).addTo(earthQuakeLayer);
  });

    /* createMap */
    createMap();
}

/* ------- perform API call to get data. call createMarkers when it completes  */
d3.json(earthQuakeUrl).then(createMarkers);