/*
Tasks:

  - Add all the earthquake points to the map.

    - Add the corresponding size and color to the points.

  - Add the label ticks to the points.

NOTE: L is the global namespace used by the Leaflet library. It's essentially an object
containing all the classes, methods and functionality provided by Leaflet.
*/

// Define the API endpoint for earthquake data.
const queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Fetch earthquake data with a GET request to the API.
d3.json(queryUrl).then(function(data) {
  createMap(data.features);
});

// Helper function to be called when needing to determine the color of a point based on earthquake depth
function determineColor(depth) {
  if (depth < 10) {
    return "#74FA06";
  } else if (depth < 20) {
    return "#AEFA06";
  } else if (depth < 30) {
    return "#FAF606";
  } else if (depth < 70) {
    return "#FAC306";
  } else if (depth < 90) {
    return "#FA7E06";
  } else {
    return "#FA0606";
  }
}

// Helper function to be called within createMap
function onEachFeature(feature, layer) {
  layer.bindPopup(`<h4>${feature.properties.place}</h4><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
}

// Helper function to be called within createMap
function pointToLayer(feature, layer) {
  return L.circleMarker(layer, {
    radius: feature.properties.mag * 5,
    fillColor: determineColor(feature.geometry.coordinates[2]),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  });
}

// Function to generate the map itself, along with the earthquake points we add
function createMap(earthquakeData) {

  // The earthquakes, along with functions to add points to the map and determine what happens when someone clicks on one of the earthquakes
  const earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });

  // Create the base layers.
  const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: © OpenTopoMap (CC-BY-SA)'
  });

  // Create a baseMaps object.
  const baseMaps = {
    "Street Map": street,
    "Topo Map": topo
  };

  // Create an overlay object to hold our overlay.
  const overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load - here we need the `div` with the given id `map`
  const myMap = L.map("map", {
    center: [40.7128, -74.0060],
    zoom: 5,
    layers: [street, earthquakes, topo]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  let legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend'),
          grades = [-10, 10, 30, 50, 70, 90],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + determineColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);

}
