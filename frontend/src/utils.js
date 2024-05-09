function wc_hex_is_light(color) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 0 + 2), 16);
  const c_g = parseInt(hex.substring(2, 2 + 2), 16);
  const c_b = parseInt(hex.substring(4, 4 + 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}

function background(color) {
  const is_light = wc_hex_is_light(color);
  const text_color = is_light ? '#000000' : '#ffffff';
 
  return {
      backgroundColor: color,
      color: text_color
  }
}

export { background }