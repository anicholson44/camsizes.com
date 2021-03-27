const shadowId = "shadow";
const height = 5000;
const width = 1200;
const paddingX = 0;
const paddingY = 20;

// suffix numbers to distinguish numbers that are in pixels from numbers in millimeters
const maxX_mm = 220;

const millimetersToPixels = width / maxX_mm;

const tickDistance_mm = 10;
const numXTicks = maxX_mm / tickDistance_mm;
const tickDistance_pixels = millimetersToPixels * tickDistance_mm;

const maxY_kn = 1875;
const kilonewtonsToPixels = height / maxY_kn;

const maxY_g = 15000;
const gramsToPixels = height / maxY_g;

export default {
  height,
  width,
  paddingX,
  paddingY,
  maxX_mm,
  millimetersToPixels,
  kilonewtonsToPixels,
  gramsToPixels,
  tickDistance_mm,
  numXTicks,
  tickDistance_pixels,
  shadowId
};
