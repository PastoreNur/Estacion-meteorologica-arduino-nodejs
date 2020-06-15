const fs = require('fs')
const entradas = require('./entradas.json')
function escribir(params) {
    entradas.push(params)



    fs.writeFile('./entradas.json', JSON.stringify(entradas), (err) => {
            if (err) console.log('Error writing file:', err)
        })

    
}


module.exports= {
    escribir
}