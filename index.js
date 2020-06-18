const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");
const jsoncon = require("./jsoncontroller.js");
const { dirname } = require("path");
const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);
const port = new SerialPort("COM5", {
  baudRate: 9600,
});

var fecha = new Date();
const parser2 = port.pipe(new Delimiter({ delimiter: "\r" }));

port.on("open", function () {
  console.log("Puerto abierto");
});

io.on("connection", function (socket) {
  console.log("Un nuevo socket conectado");
});

parser2.on("data", function (data) {
  const datos = data.toString();
  const arreglodatos = datos.split(",");
  const entrada = {};
  for (let index = 0; index < arreglodatos.length; index++) {
    const element = arreglodatos[index];
    const dato = element.split(" ");

    switch (dato[0]) {
      case "Humedad:":
        entrada.humedad = dato[1];
        break;
      case "Temperatura:":
        entrada.temperatura = dato[1];
        break;
      case "Presion:":
        entrada.presion = dato[1];
        break;
      case "Luz:":
        entrada.luz = dato[1];
        break;
      case "Viento:":
        entrada.viento = dato[1];
        break;
      default:
        break;
    }
  }

  entrada.time = {
    Dia: fecha.getDate(),
    Mes: fecha.getMonth() + 1,
    anio: fecha.getFullYear(),
    hora: fecha.getHours(),
    minutos: fecha.getMinutes(),
    segundos: fecha.getSeconds(),
  };
  console.log(entrada);
  io.emit("arduino:data", { value: entrada });
  jsoncon.escribir(entrada);
});

app.use(express.static(__dirname + "/server/recursos"));
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/server/index.html");
});

app.get("/temperatura.html", (req, res, next) => {
  res.sendFile(__dirname + "/server/temperatura.html");
});

app.get("/humedad.html", (req, res, next) => {
  res.sendFile(__dirname + "/server/humedad.html");
});

app.get("/presionatmosferica.html", (req, res, next) => {
  res.sendFile(__dirname + "/server/presionatmosferica.html");
});

app.get("/intensidadluminica.html", (req, res, next) => {
  res.sendFile(__dirname + "/server/intensidadluminica.html");
});

app.get("/viento.html", (req, res, next) => {
  res.sendFile(__dirname + "/server/viento.html");
});

server.listen(3000, () => {
  console.log("server on port", 3000);
});
