const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')
const Readline = SerialPort.parsers.Readline
const parser = new Readline()
const port = new SerialPort('COM5', {
    baudRate: 9600
  })
const parser2 = port.pipe(new Delimiter({ delimiter: '\r' }))

port.on('open', function(){
    console.log("Puerto abierto");
})

parser2.on('data', function(data){

    const datos = data.toString();
    const arreglodatos = datos.split(",");
    const entrada = {}
    for (let index = 0; index < arreglodatos.length; index++) {
        const element = arreglodatos[index];
        const dato = element.split(" ")

        switch (dato[0]) {
            case "Humedad:":
                entrada.humedad = dato[1]
                break;
            case "Temperatura:":
                entrada.temperatura = dato[1]
                break;
            case "Presion:":
                entrada.presion = dato[1]
                break;
            case "Luz:":
                entrada.luz = dato[1]
                break;
            case "Viento:":
                entrada.viento = dato[1]
                break;
            default:
                break;
        }

        
        
    }
    console.log(entrada);

})