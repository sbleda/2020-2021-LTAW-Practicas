//-- Importar el módulo FS
const fs = require('fs');

console.log("Lectura síncrona de un fichero");

//-- Realizar la lectura del fichero completo y la almacena en la variable data
const data = fs.readFileSync('fich1.txt','utf8'); //--sync porque es lectura sincrona

//-- Esta instrucción se ejecuta una vez terminada
//-- la lectura síncrona
console.log("Lectura completada...")

//-- Mostrar el contenido del fichero
console.log("Contenido del fichero: \n")
console.log(data); //--Imprimo el contenido del fichero