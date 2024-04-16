const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://google-news-api1.p.rapidapi.com/search',
  params: {language: 'EN'},
  headers: {
    'X-RapidAPI-Key': 'e0e8af7a0cmsh2f9386304a3c0b6p19f96bjsn4fd817aefa61',
    'X-RapidAPI-Host': 'google-news-api1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}