const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data', 'site-config.json');
try {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (data.images) {
    // Delete the old images object from the local fallback json
    delete data.images;
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully removed old images from data/site-config.json');
  } else {
    console.log('No images key found in data/site-config.json');
  }
} catch(e) {
  console.error(e);
}
