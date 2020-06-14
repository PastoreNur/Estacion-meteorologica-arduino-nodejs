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
    
    console.log( data.toString() + " Nodejs ")

})
  
 