const fs = require('fs')

const axios = require('axios');

class Busquedas {

  historial= [];
  dbPath= './db/database.json'

  constructor() {
    // TODO: leer BD
    this.leerDB();
  }

  get historialCapitalizado() {

    // Capitalizar cada palabra
    return this.historial.map( element => {

      const newArray = element.split(' ');
      const arrayFinal = newArray.map(word => {
        return word[0].toUpperCase()+ word.slice(1-word.length) ;
      });  
      return arrayFinal.join(' ');

    })
    
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
      console.log(error);
    }

  }

  agregarHistorial(lugar = '') {

    // TODO prevenir duplicado

    if(this.historial.includes( lugar.toLocaleLowerCase() ) ) {
      return;
    }

    this.historial.unshift( lugar.toLocaleLowerCase() );

    // GRABAR EN BD

    this.guardarDB();

  }

  guardarDB() {

    const payload = {
      historial : this.historial
    }

    fs.writeFileSync(this.dbPath, JSON.stringify( payload ));

  }

  leerDB() {

    // No existe la base de datos
    if(!fs.existsSync(this.dbPath)){
      return;
    }

    // Si existe la base de datos
    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})

    const data = JSON.parse(info);

    this.historial = data.historial;

  }

}

module.exports = Busquedas;