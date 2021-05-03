const fs = require('fs');

//-- Fichero a leer
const FICHERO = 'fich11.txt';

fs.readFile(FICHERO, 'utf8', (err, data) => {

    if (err) {  //-- Ha ocurrido algun error
      console.log("Error!!")
      console.log(err.message);
    } 
    else {  //-- Lectura normal
        console.log("Lectura completada...")
        console.log("Contenido del fichero: \n")
        console.log(data);
    }
})

//--Imprime el mensaje cuando detecta un error
//--En este caso salta el mensaje ya que ese fichero no existe
//--si no hubiera error, se lee el fichero(de forma asincrona)
//-- y se imprime el contenido del mismo 
