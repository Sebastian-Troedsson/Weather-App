const express = require('express');
const router = express.Router();
require('dotenv').config();
const fetchData = require('./helperFuncs');

router.get('/byCity/:city', async (req, res) => {
  const result = await fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&units=metric&APPID=${process.env.API_KEY}`);
  res.json(result);
});

router.get('/byCoordinates/:lat/:lon', async (req, res) => {
  const result = await fetchData(`http://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&units=metric&APPID=${process.env.API_KEY}`);
  res.json(result);
});


module.exports = router;