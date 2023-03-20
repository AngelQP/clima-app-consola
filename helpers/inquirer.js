const inquirer = require('inquirer');
require('colors');

const choices = [
  {
    value: 1,
    name: `${'1.'.green} Buscar ciudad`
  },
  {
    value: 2,
    name: `${'2.'.green} Historial`
  },
  {
    value: 0,
    name: `${'0.'.green} Salir`
  }
]

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Qué desea hacer',
    choices,
  }
];

const inquirerMenu = async() => {
  
  // console.clear();
  console.log('='.green.repeat(25));
  console.log('  Seleccione una opción'.white);
  console.log('='.green.repeat(25),'\n');

  const {opcion} = await inquirer.prompt(preguntas);

  return opcion;

}

const pausa = async() => {

  const question = [{
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar`
  }]
   
  console.log('\n');
  await inquirer.prompt(question);

}

const leerInput = async( message ) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ];

  const {desc} = await inquirer.prompt(question);

  return desc;
}

const listarLugares = async (lugares = []) => {

  const choices = lugares.map((lugar,i) => {

    const idx = `${i+1}.`.green;

    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar:',
      choices
    }
  ]

  const {id} = await inquirer.prompt(preguntas);
  // console.log({id});

  return id;

}

const confirm = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const {ok} = await inquirer.prompt(question);
  return ok;

}

const showListChecklist = async (tasks) => {

  const choices = tasks.map((task,i) => {

    const idx = `${i+1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: (task.completadoEn) ? true : false
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]

  const {ids} = await inquirer.prompt(pregunta);

  return ids;

}


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirm,
  showListChecklist
}
