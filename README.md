# Tasks

The United States Geological Survey, or USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but lack a meaningful way to display it.

## Part 1: Create the Earthquake Visualization

The first task is to visualize an earthquake dataset.

1. Retrieve the dataset. To do so:

    - The USGS provides earthquake data in a number of different formats. Visit the USGS GeoJSON Feed page and select a dataset.

2. Import and visualize the data with the following:

    - Using Leaflet, create a map that plots all the earthquakes from your dataset based on longitude and latitude.

        - Data markers should reflect the magnitude by their size and depth by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

    - Include popups that provide additional information about the earthquake when the associated marker is clicked.

    - Create a legend that provides context for the map data.

## General Concepts

Leaflet is a JS library for mobile-friendly interactive maps.

1. Map Initialization: Leaflet begins by creating a map in a specified HTML element (typically a `div`).

2. Tile Layers: The map is made up of tiled images, which are requested from a server.

3. Markers, Circles, and Polygons: Leaflet allows you to add various types of objects to the map, like markers (for specific locations), circles (for indicating areas around a point), and polygons (to define shapes like city boundaries, parks, etc.).

4. Popups and Tooltips: Information can be displayed on the map using popups (which open when clicking on an object) and tooltips (which show information when hovering over an object).

5. Interactivity: Users can interact with the map through mouse or touch gestures.
