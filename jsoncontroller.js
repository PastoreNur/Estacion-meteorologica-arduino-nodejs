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
  console.log(params);

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
  retorno.tempertura = 0;
  retorno.presion = 0;
  retorno.luz = 0;
  retorno.viento = 0;

  fecha.forEach((element) => {
    console.log(element.humedad);

    retorno.humedad += element.humedad;
    retorno.tempertura += element.tempertura;
    retorno.presion += element.presion;
    retorno.luz += element.luz;
    retorno.viento += element.viento;
  });

  /*retorno.humedad = retorno.humedad / fecha.length;
  retorno.tempertura = retorno.tempertura / fecha.length;
  retorno.presion = retorno.presion / fecha.length;
  retorno.luz = retorno.luz / fecha.length;
  retorno.viento = retorno.viento / fecha.length;*/
  //Retorna un objeto con el promedio de las 5 propiedades en analisis
  console.log(retorno);

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
  var retorno;
  fecha.forEach((element) => {
    retorno.humedad += element.humedad;
    retorno.tempertura += element.tempertura;
    retorno.presion += element.presion;
    retorno.luz += element.luz;
    retorno.viento += element.viento;
  });
  retorno.humedad = retorno.humedad / fecha.length;
  retorno.tempertura = retorno.tempertura / fecha.length;
  retorno.presion = retorno.presion / fecha.length;
  retorno.luz = retorno.luz / fecha.length;
  retorno.viento = retorno.viento / fecha.length;
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
      element.time.Mes <= final.mes &&
      element.time.anio >= inicial.anio &&
      element.time.anio <= final.anio
    ) {
      porrango.push(element);
    }
  });
  //Retorna un arreglo de las concidencias almacenadas
  return porrango;
}

//Dos parametros de fecha deben ser objetos con las propiedades Dia,Mes,anio
function promediorango(inicial, final) {
  const fecha = buscarrango(inicial, final);
  var retorno;
  fecha.forEach((element) => {
    retorno.humedad += element.humedad;
    retorno.tempertura += element.tempertura;
    retorno.presion += element.presion;
    retorno.luz += element.luz;
    retorno.viento += element.viento;
  });
  retorno.humedad = retorno.humedad / fecha.length;
  retorno.tempertura = retorno.tempertura / fecha.length;
  retorno.presion = retorno.presion / fecha.length;
  retorno.luz = retorno.luz / fecha.length;
  retorno.viento = retorno.viento / fecha.length;
  //Retorna un objeto con el promedio de las 5 propiedades en analisis
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
};
