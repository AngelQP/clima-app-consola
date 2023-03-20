require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");



const main = async () => {

  const busquedas = new Busquedas();
  let opt;

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
        const lugarSel = lugares.find(l => l.id === id);
        // console.log(lugarSel);

        // Clima
        if(lugarSel){
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
        }
        else {
          console.log('\nNo selecciono ningún lugar');
        }
        break;
    
      case 2:
        break;
    }
    
    if(opt !== 0) {
      await pausa();
    }



  } while (opt !== 0);

}

main();