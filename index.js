import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = ({ name, hex, compName, compHex }) => {
  return fetch(COLORS)
    .then((response) => response.json())
    .then(colors => {
      // Assuming only one argument is passed, just take the first one that's not undefined.
      if(name){
        // Using includes to filter color names that contains the value passed in.
        // Setting everything to lowercase to be case insensitive.
        return colors.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()))
      } else if(hex) {
        // Direct comparison for hex values, setting everything to upper case just to be safe.
        return colors.filter((c) => c.hex.toUpperCase() === hex.toUpperCase())
      } else if(compName) {
        // For each color's complements, just find the first one that matches the filter.
        return colors.filter((c) => c.comp.find((comp) => comp.name.toLowerCase().includes(compName.toLowerCase())))
      } else if(compHex) {
        return colors.filter((c) => c.comp.find((comp) => comp.hex.toUpperCase() === compHex.toUpperCase()))
      } else {
        // If no filters are passed in just return everything.
        return colors
      }

    })
};

// Leave this here
export default fetchColors;
