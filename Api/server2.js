const express = require('express');
const app = express();
const axios = require('axios');

app.get('/api/gadget/device/:id', async (req, res) => {
  try {
    const deviceId = req.params.id;

    const response = await axios.post('https://data.mongodb-api.com/app/data-ktsmt/endpoint/data/v1/action/find', {
      dataSource: 'Cluster0',
      database: 'gadget',
      collection: 'device',
      filter: { _id: deviceId }, // Use the device ID as a filter
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'AXuOa2OeaICINdvvp6Nuy5ZfLoUU3pyXjAeTi5WkdvLhGV0R1ha0TLCq7N1mSYqh'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data from MongoDB' });
  }
});

app.listen(3000, () => {
  console.log('API listening on port 3005');
});
