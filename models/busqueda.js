const axios = require('axios');


class Busquedas {

  historial= ['Tegucigalpa','Madrid','San Josè'];

  constructor() {
    // TODO: leer BD
  }

  get paramsMapbox() {
    return {
      'access_token' : process.env.MAPBOX_KEY,
      'limit' : 5,
      'language' : 'es'
    }
  }

  get paramsOpenWeather() {
    return {
      'appid': process.env.OPEN_WEATHER,
      'units': 'metric',
      'lang': 'es'
    }
  }

  async ciudad (lugar = '') {

    try {
      // peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
      });

      const resp = await instance.get();

      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }))      
      
    } catch (error) {      
      return [];
    }

  }

  async climaLugar( lat, lon ) {

    try {
      // instance de axios.create
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
        params: this.paramsOpenWeather,
      })
      // resp.data -> 
      const {data} = await instance.get();
      // retorno
      return {
        desc: data.weather[0].description,
        min: data.main.temp_min,
        max: data.main.temp_max,
        temp: data.main.temp
      }
      
    } catch (error) {
      // throw(error)
      // return {};
    }

  }

}


module.exports = Busquedas;