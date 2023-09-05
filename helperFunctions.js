const fs = require("fs");
const path = require("path");

function toBlob(filePath) {
  const imagePath = path.join(__dirname, filePath); // Replace with the actual path to your image file
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBlob = Buffer.from(imageBuffer);
  return imageBlob;
}

module.exports = { toBlob: toBlob };
