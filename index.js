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

      if(name){
        return colors.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()))
      } else if(hex) {
        return colors.filter((c) => c.hex.toUpperCase() === hex.toUpperCase())
      } else if(compName) {
        return colors.filter((c) => c.comp.find((comp) => comp.name.toLowerCase().includes(compName.toLowerCase())))
      } else if(compHex) {
        return colors.filter((c) => c.comp.find((comp) => comp.hex.toUpperCase() === compHex.toUpperCase()))
      } else {
        return colors
      }

    })
};

// Leave this here
export default fetchColors;
