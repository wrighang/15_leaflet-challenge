# 15_leaflet-challenge

# Deliverable(s)
[index.html]<br/>
[style.css]<br/>
[logic.js]<br/>


## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

[USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

## Requirements
### Map
- TileLayer loads without error
- Connects to geojson API using D3 without error
- Markers with size corresponding to earthquake magnitude
- A legend showing the depth and their corresponding color

### Data Points
- Data points scale with magnitude level
- Data points colors change with depth level
- Each point has a tooltip with the Magnitude, the location, and depth
- All data points load in the correct locations

## Steps to Run the HTML file

1. **Download the Repository**  
   - Clone or download the repository to your local machine.
2. **Open in Visual Studio Code**  
   - Launch **Visual Studio Code**.  
   - Open the project folder **15_leaflet-challenge**.
3. **Install Live Server Extension**  
   - Go to the **Extensions** tab in Visual Studio Code.  
   - Search for **Live Server** and install it.
4. **Open the HTML File**  
   - Locate and open the **index.html** file.
5. **Start the Live Server**  
   - On the bottom-right of **Visual Studio Code**, click **"Go Live"**.  
   - This will open a **Chrome** browser displaying the output from all linked files.
6. **View the Output**  
   - The map and earthquake data will now be displayed in the browser.

   ====================================================================
## CODING_PROCESS

- Frequently referred to the activities throughout the challenge to ensure I was on track.

- Encountered an issue where the legend failed to display label colors as expected. Researched solutions and referred to [Leaflet's Custom Legend Control example](https://leafletjs.com/examples/choropleth/#custom-legend-control) and assistance from Xpert Learning Assistant. Determined that the issue stemmed from an improperly configured `style.css` file. Updating the CSS resolved the issue.

- Issues with scaling to magnitude level, the circles were all the same size. Asked Xpert Learning Assistant for guidance to correct my code. 

- After drafting the initial .js code, consulted ChatGPT for best practices to improve structure and functionality. The original code produced a blank browser window. Restructuring the code ensured better uniformity and functionality, with all functions and objects properly defined before being called.