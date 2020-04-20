function hexToRgb(number){
    let hexNumber = parseInt(number.replace("#",""),16);
    let convertRgb = (hex) => hex & 255;
    return "rgb("+convertRgb(hexNumber >> 16)+","+convertRgb(hexNumber >> 8)+","+convertRgb(hexNumber)+")";
}

function rgbToHex(red,green,blue){
    let convertHex = (color) => color = color.toString(16).length == 1 ? "0" + color.toString(16) : color.toString(16);
    return "#"+convertHex(red)+""+convertHex(green)+""+convertHex(blue);
}