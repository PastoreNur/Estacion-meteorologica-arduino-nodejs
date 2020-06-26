const fs = require("fs");
const entradas = require("./entradas.json");
const { time } = require("console");
function escribir(params) {
  entradas.push(params);

  fs.writeFile("./entradas.json", JSON.stringify(entradas), (err) => {
    if (err) console.log("Error writing file:", err);
  });
}
//Parametro debe ser un objeto con las propiedades Dia,Mes,anio
function buscarfecha(params) {
  const porfecha = [];
  entradas.forEach((element) => {
    if (
      element.time.Dia == params.Dia &&
      element.time.Mes == params.Mes &&
      element.time.anio == params.anio
    ) {
      porfecha.push(element);
    }
  });

  //Retorna un arreglo de las concidencias almacenadas
  return porfecha;
}

//Parametro debe ser un objeto con las propiedades Dia,Mes,anio
function promediofecha(params) {
  const fecha = buscarfecha(params);
  var retorno = {};
  retorno.humedad = 0;
  retorno.temperatura = 0;
  retorno.presion = 0;
  retorno.luz = 0;
  retorno.viento = 0;

  fecha.forEach((element) => {
    retorno.humedad += parseFloat(element.humedad);
    retorno.temperatura += parseFloat(element.temperatura);
    retorno.presion += parseFloat(element.presion);
    retorno.luz += parseFloat(element.luz);
    retorno.viento += parseFloat(element.viento);
    retorno.time = params;
  });
  retorno.humedad = parseFloat(parseFloat(retorno.humedad) / fecha.length);
  retorno.temperatura = parseFloat(
    parseFloat(retorno.temperatura) / fecha.length
  );
  retorno.presion = parseFloat(parseFloat(retorno.presion) / fecha.length);
  retorno.luz = parseFloat(parseFloat(retorno.luz) / fecha.length);
  retorno.viento = parseFloat(parseFloat(retorno.viento) / fecha.length);
  retorno.humedad = parseFloat(retorno.humedad);
  retorno.temperatura = parseFloat(retorno.temperatura);
  retorno.presion = parseFloat(retorno.presion);
  retorno.luz = parseFloat(retorno.luz);
  retorno.viento = parseFloat(retorno.viento);
  retorno.time = params;
  //Retorna un objeto con el promedio de las 5 propiedades en analisis

  return retorno;
}
//Parametro debe ser un objeto con las propiedades Dia,Mes,anio,hora
function buscarhora(params) {
  const porhora = [];
  entradas.forEach((element) => {
    if (
      element.time.Dia == params.Dia &&
      element.time.Mes == params.Mes &&
      element.time.anio == params.anio &&
      element.time.hora == params.hora
    ) {
      porhora.push(element);
    }
  });
  //Retorna un arreglo de las concidencias almacenadas
  return porhora;
}

//Parametro debe ser un objeto con las propiedades Dia,Mes,anio,hora
function promediohora(params) {
  const fecha = buscarhora(params);
  var retorno = {};
  retorno.humedad = 0;
  retorno.temperatura = 0;
  retorno.presion = 0;
  retorno.luz = 0;
  retorno.viento = 0;

  fecha.forEach((element) => {
    retorno.humedad += parseFloat(element.humedad);
    retorno.temperatura += parseFloat(element.temperatura);
    retorno.presion += parseFloat(element.presion);
    retorno.luz += parseFloat(element.luz);
    retorno.viento += parseFloat(element.viento);
    retorno.time = params;
  });
  retorno.humedad = parseFloat(parseFloat(retorno.humedad) / fecha.length);
  retorno.temperatura = parseFloat(
    parseFloat(retorno.temperatura) / fecha.length
  );
  retorno.presion = parseFloat(parseFloat(retorno.presion) / fecha.length);
  retorno.luz = parseFloat(parseFloat(retorno.luz) / fecha.length);
  retorno.viento = parseFloat(parseFloat(retorno.viento) / fecha.length);
  retorno.humedad = parseFloat(retorno.humedad);
  retorno.temperatura = parseFloat(retorno.temperatura);
  retorno.presion = parseFloat(retorno.presion);
  retorno.luz = parseFloat(retorno.luz);
  retorno.viento = parseFloat(retorno.viento);
  retorno.time = params;

  //Retorna un objeto con el promedio de las 5 propiedades en analisis
  return retorno;
}
//Dos parametros de fecha deben ser objetos con las propiedades Dia,Mes,anio
function buscarrango(inicial, final) {
  const porrango = [];

  entradas.forEach((element) => {
    if (
      element.time.Dia >= inicial.Dia &&
      element.time.Dia <= final.Dia &&
      element.time.Mes >= inicial.Mes &&
      element.time.Mes <= final.Mes &&
      element.time.anio >= inicial.anio &&
      element.time.anio <= final.anio
    ) {
      console.log(element);

      porrango.push(element);
    }
  });
  //Retorna un arreglo de las concidencias almacenadas
  return porrango;
}

function registro() {
  var fecha = new Date();
  var param = {
    Dia: fecha.getDate(),
    Mes: fecha.getMonth() + 1,
    anio: fecha.getFullYear(),
  };
  var retorno = [];
  for (let index = 0; index < 5; index++) {
    retorno.push(promediofecha(param));

    param.Dia--;
  }

  return retorno;
}

function registrohora() {
  var fecha = new Date();
  var param = {
    Dia: fecha.getDate(),
    Mes: fecha.getMonth() + 1,
    anio: fecha.getFullYear(),
    hora: fecha.getHours(),
  };
  var retorno = [];
  for (let index = 0; index < 12; index++) {
    retorno.push(promediohora(param));

    param.hora--;
  }

  return retorno;
}

//Dos parametros de fecha deben ser objetos con las propiedades Dia,Mes,anio
function promediorango(rango) {
  var inicial = {};
  inicial.Dia = rango.Mesi;
  inicial.Mes = rango.Diai;
  inicial.anio = rango.anioi;

  var final = {};
  final.Dia = rango.Mesf;
  final.Mes = rango.Diaf;
  final.anio = rango.aniof;
  let fechai = new Date(inicial.anio, inicial.Mes, inicial.Dia);
  let fechaf = new Date(final.anio, final.Mes, final.Dia);
  let fecha = fechai;
  const diffTime = Math.abs(fechai - fechaf);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays);

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  var retorno = [];
  for (let index = 0; index < diffDays; index++) {
    let it = {};
    it.Dia = fecha.addDays(index).getDate();
    it.Mes = fecha.addDays(index).getMonth();
    it.anio = fecha.addDays(index).getFullYear();
    retorno.push(promediofecha(it));
  }

  return retorno;
}

module.exports = {
  escribir,
  buscarfecha,
  promediofecha,
  buscarhora,
  promediohora,
  buscarrango,
  promediorango,
  registro,
  registrohora,
};
