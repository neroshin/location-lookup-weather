// myFunctions.js
export function calculateChanceOfRain(humidity, cloudCoverage, precipMm) {
     // Define the weights for each factor
     const humidityWeight = 0.4;
     const cloudWeight = 0.3;
     const precipWeight = 0.3;
   
     // Normalize the precipitation (assuming that 1mm or more strongly indicates rain)
     const precipFactor = Math.min(precipMm, 1) / 1;
   
     // Calculate the chance of rain
     const chanceOfRain = (
       (humidity / 100) * humidityWeight +
       (cloudCoverage / 100) * cloudWeight +
       precipFactor * precipWeight
     ) * 100; // Convert to percentage
   
     return chanceOfRain;
}


// myFunctions.js
export function formatTime(epochTime) {
    const date = new Date(epochTime * 1000); // Multiply by 1000 to convert to milliseconds
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }