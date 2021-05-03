const fs = require('fs');

//-- Fichero a leer
const FICHERO = 'fich11.txt';

try {
  const data = fs.readFileSync(FICHERO, 'utf8');
  console.log("Lectura completada...")
  console.log("Contenido del fichero: \n")
  console.log(data);

} catch (err) {
  console.log("Error!!")
  console.log(err.message);
}

//--Imprime el mensaje cuando detecta un error
//--En este caso salta el mensaje ya que ese fichero no existe
//--si no hubiera error, se lee el fichero(de forma sincrona)
//-- y se imprime el contenido del mismo 
