const fs = require('fs');

var obtenerPaises = () => {
    try {
        var paisString = fs.readFileSync('paises-data.json');
        return JSON.parse(paisString);
    } catch (e) {
        return [];
    }
};

var guardarPais = (paises) => {
    fs.writeFileSync('paises-data.json', JSON.stringify(paises));
};

var agregarPais = (nameCountry, nameCapital) => {
    var paises = obtenerPaises();
    var newCountry = {
        nameCountry,
        nameCapital
    };
    var paisDuplicados = paises.filter((country) => country.nameCountry === nameCountry);

    if (paisDuplicados.length === 0) {
        paises.push(newCountry);
        guardarPais(paises);
        return newCountry;
    }
};

var getAll = () => {
    return obtenerPaises();
};

var getCountry = (nameCountry) => {
    var paises = obtenerPaises();
    var paisFiltrados = paises.filter((country) => country.nameCountry === nameCountry);
    return paisFiltrados[0];
};

var eliminarPais = (nameCountry) => {
    var paises = obtenerPaises();
    var paisFiltrados = paises.filter((note) => note.nameCountry !== nameCountry);
    guardarPais(paisFiltrados);

    return paises.length !== paisFiltrados.length;
};

var imprimir = (country) => {
    console.log('--');
    console.log(`nameCountry: ${country.nameCountry}`);
    console.log(`nameCapital: ${country.nameCapital}`);
};

module.exports = {
    agregarPais,
    getAll,
    getCountry,
    eliminarPais,
    imprimir
};
