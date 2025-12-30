
// Define the study period
var startyear = 2000; 
var endyear = 2023;
var startmonth = 1; 
var endmonth = 12; 

// Compute beginning & end of study period + sequence of months & years
var start_date = ee.Date.fromYMD(startyear, startmonth, 1);
var end_date = ee.Date.fromYMD(endyear, endmonth, 30);

//----------------------------------------------------------------------------------
var aoi = ee.FeatureCollection('projects/gee-trial2/assets/Shapfile/WMH_Distric')
                                            .filter(ee.Filter.eq('dt_code', 521));
Map.centerObject(aoi);

// Load NDVI data (e.g., MODIS NDVI)
var ndvi = ee.ImageCollection('MODIS/006/MOD13A2')
                     .select('NDVI')
                     .filterDate(start_date, end_date)
                     .mean();

var precipitation = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                          .filterDate(start_date, end_date)
                          .sum();

var soilMoisture = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                          .filterDate(start_date, end_date)
                          .select('soil')
                          .mean();

var temperature = ee.ImageCollection('MODIS/006/MOD11A2')
                       .select('LST_Day_1km')
                       .filterDate(start_date, end_date)
                       .mean();

// Convert temperature from Kelvin to Celsius
var temperatureCelsius = temperature.multiply(0.02).subtract(273.15);

// Define thresholds for NDVI and precipitation
var ndviThreshold = 0.2;
var precipitationThreshold = 400;
var soilMoistureThreshold = 0.2;
var temperatureThreshold = 35;

// Calculate binary thresholds (1 = stress, 0 = no stress)
var ndviStress = ndvi.lt(ndviThreshold);
var precipitationStress = precipitation.lt(precipitationThreshold);
var soilMoistureStress = soilMoisture.lt(soilMoistureThreshold);
var temperatureStress = temperatureCelsius.gt(temperatureThreshold);

// Combine the stress indices
var vegDRI = ndviStress.add(precipitationStress)
                       .add(soilMoistureStress)
                       .add(temperatureStress)
                       .divide(4);

// ==============================
// VegDRI Visualization (5 Classes)
// ==============================
var vegDRIVis = {
  min: 0,
  max: 1,
  palette: [
    '#1a9850', // Very Low (Dark Green)
    '#91cf60', // Low (Light Green)
    '#ffffbf', // Moderate (Yellow)
    '#fc8d59', // High (Orange)
    '#d73027'  // Very High (Red)
  ]
};

Map.addLayer(vegDRI.clip(aoi), vegDRIVis, 'VegDRI (5 Classes)');
print('VegDRI:', vegDRI);

// ==============================
// VegDRI Legend (5 Classes)
// ==============================

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Title
legend.add(ui.Label({
  value: 'VegDRI (Vegetation Drought Risk Index)',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 8px 0'
  }
}));

// Function to create legend rows
var makeRow = function(color, label) {
  return ui.Panel({
    widgets: [
      ui.Label({
        style: {
          backgroundColor: color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      }),
      ui.Label({
        value: label,
        style: { margin: '0 0 4px 6px' }
      })
    ],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

// Add legend classes
legend.add(makeRow('#1a9850', 'Very Low (0.00 – 0.20)'));
legend.add(makeRow('#91cf60', 'Low (0.21 – 0.40)'));
legend.add(makeRow('#ffffbf', 'Moderate (0.41 – 0.60)'));
legend.add(makeRow('#fc8d59', 'High (0.61 – 0.80)'));
legend.add(makeRow('#d73027', 'Very High (0.81 – 1.00)'));

// Add legend to map
Map.add(legend);
