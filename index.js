require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");



const main = async () => {

  const busquedas = new Busquedas();
  let opt;
  // console.log(busquedas.historial);

  do {
    
    opt = await inquirerMenu();
    
    switch (opt) {
      case 0: 

        break;
      case 1:
        // Mostrar mensaje
        const termino = await leerInput('Ciudad: ');
        
        // Buscar los lugares
        const lugares = await busquedas.ciudad( termino );
        
        // Seleccionar el lugar
        const id = await listarLugares(lugares);

        if( id === '0' ) continue;

        const lugarSel = lugares.find(l => l.id === id);

        // GUARDAR EN BD
        busquedas.agregarHistorial(lugarSel.nombre);

        // Clima
      
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        // Mostrar resultado
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre);
        console.log('Lat: ', lugarSel.lat);
        console.log('Lon: ', lugarSel.lng);
        console.log('Temperatura: ', clima.temp);
        console.log('Mínima: ', clima.min);
        console.log('Maxima: ', clima.max);
        console.log('¿Cómo está el clima?: ', clima.desc);

        break;
    
      case 2:

        busquedas.historialCapitalizado.forEach( (lugar,i) => {
          const idx = `${i+1}.`.green;
          console.log(`${idx} ${lugar}`)
        })

        break;
    }
    
    if(opt !== 0) {
      await pausa();
    }



  } while (opt !== 0);

}

main();