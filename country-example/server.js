const fs = require('fs');
const yargs = require('yargs');

const capitales = require('./capitales.js');

const countryOptions = {
    describe: 'Nombre del pais',
    demand: true,
    alias: 'p'
};
const capitalOptions = {
    describe: 'Nombre de la capital',
    demand: true,
    alias: 'c'
};
const argv = yargs
                .command('agregar', 'Añadir un nuevo pais', {
                    countryName: countryOptions,
                    capitalName: capitalOptions
                })
                .command('listar', 'Listar todos los paises')
                .command('leer', 'Obtener informacion acerca de un pais', {
                    countryName: countryOptions,
                })
                .command('eliminar', 'Eliminar un pais', {
                    countryName: countryOptions
                })
                .help()
                .argv;

// Acá recibimos el comando
var command = argv._[0];

var nombrePais = argv.countryName;

if (command === 'agregar') {
    
    var nombreCapital = argv.capitalName;
    var pais = capitales.agregarPais(nombrePais, nombreCapital);

    if (pais) {
        console.log('Pais Creado');
        capitales.imprimir(pais);
    } else {
        console.log('El pais ya ha sido creado anteriormente');
    }

} else if (command === 'listar') {

    var allCountries = capitales.getAll();
    console.log(`Imprimiendo ${allCountries.length} pais(es).`);
    allCountries.forEach((pais) => capitales.imprimir(pais));

} else if (command === 'leer') {

    var pais = capitales.getCountry(nombrePais);

    if (pais) {
        console.log('Pais encontrado');
        capitales.imprimir(pais);
    } else {
        console.log('Pais no encontrado');
    }

} else if (command === 'eliminar') {

    var paisEliminado = capitales.eliminarPais(nombrePais);
    var message = paisEliminado ? 'El pais fue eliminado' : 'Pais no encontrado';
    console.log(message);

} else {

    console.log('Comando no reconocido');

}
