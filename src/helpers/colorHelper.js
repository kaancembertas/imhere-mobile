/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
export const hexToRgba = (hex, opacity) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? 'rgba(' +
        parseInt(result[1], 16) +
        ',' +
        parseInt(result[2], 16) +
        ',' +
        parseInt(result[3], 16) +
        ',' +
        opacity +
        ')'
    : null;
};
