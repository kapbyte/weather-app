const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null
  })
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  try {
    await fetch(api)
      .then(res => res.json())
      .then(data => {
        if (data.message == 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            icon: null,
            temp: null
          })
        }
        else {
          res.render('index', {
            city: data.name,
            des: data.weather[0].description,
            icon: data.weather[0].icon,
            temp: data.main.temp
          })
        }
      })
  } catch (error) {
    res.render('index', {
      city: 'Oops! something went wrong...',
      des: null,
      icon: null,
      temp: null
    })
  }
});

module.exports = router;