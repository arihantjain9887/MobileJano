const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors()); // Enable CORS for all routes

app.get('/api/gadget/device/:DeviceName', async (req, res) => {
  const deviceName = req.params.DeviceName;

  try {
    const response = await axios.post('https://data.mongodb-api.com/app/data-ktsmt/endpoint/data/v1/action/find', {
      dataSource: 'Cluster0',
      database: 'gadget',
      collection: 'device',
      filter: { 
        $or: [
          { DeviceName: { $regex: `^${deviceName}`, $options: 'i' } }, // Partial match with the beginning of the name
          { DeviceName: deviceName } // Exact match with the full name
        ]
      },
      projection: { 
        DeviceName: 1,
        NetworkTechnology: 1,
        Announced: 1,
        Status: 1,
        Dimensions: 1,
        Weight: 1,
        DisplayType: 1,
        DisplaySize: 1,
        OS: 1,
        Chipset: 1,
        CPU: 1,
        Camera: 1,
        Colors: 1
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'AXuOa2OeaICINdvvp6Nuy5ZfLoUU3pyXjAeTi5WkdvLhGV0R1ha0TLCq7N1mSYqh'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
