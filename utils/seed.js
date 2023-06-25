const connection = require('../config/connection');
const { ,  } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');


  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table();
  console.table();
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
