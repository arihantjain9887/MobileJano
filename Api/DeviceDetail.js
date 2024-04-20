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
      filter: { DeviceName: deviceName }, // Match exact device name
      projection: { _id: 4, 
        DeviceName: 1,
        NetworkTechnology: 1,
        Announced: 1,
        Status: 1,
        Dimensions: 1,
        Weight: 1,
        SIM: 1,
        DisplayType: 1,
        DisplaySize: 1,
        Resolution: 1,
        OS: 1,
        Chipset: 1,
        CPU: 1,
        WLAN: 1,
        Bluetooth: 1,
        GNSS: 1,
        Camera: 1,
        CardSlot: 1,
        InternalMemory: 1,
        NFC: 1,
        Radio: 1,
        USB: 1,
        Sensors: 1,
        BatteryType: 1,
        Colors: 1,
        display_size_1: 4,
        display_res_1: 1,
        ramsize_3: 1,
        chipset_3: 1,
        batsize_4: 1,
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

app.listen(3005, () => {
  console.log('API listening on port 3005');
});
