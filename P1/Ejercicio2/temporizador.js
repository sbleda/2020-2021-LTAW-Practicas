//-- Ejemplo de uso de un temporizador

//-- Función a ejecutar tras un tiempo
//-- Función de retrollamada del temporizador
function tarea1() {
    console.log("Tarea 1 completada!");
}


//-- Llamada retardada mediante temporizador
//-- Cuando transcurran 1000 ms se llama a la función tarea 1
setTimeout(tarea1, 1000);

//-- Esta estructura también es muy típica: incluir la función 
//-- de retrollamada directamente en el parémtro, en vez de definirla
//-- fuera
setTimeout( () => {
    console.log("Tarea 2 completada!");
}, 2000);

//Se imprime lo primero porque no tiene que esperar un tiempo, esta fuera del temporizador
console.log("Esperando a que terminen las tareas");

//-- Esta función de retrollamada se invoca cada 200ms
//-- Se guarda su identificador en la variable id par
//-- poder quitar el temporizador con ClearInterval 
let id = setInterval( () => {
    console.log("Tic...");
}, 200 );

//-- Al cabo de 3 segundos se desactiva el temporizador
setTimeout( ()=> {
  clearInterval(id)
  console.log("Stop!");
}, 1000);

//-- Si desactivo el remporizador antes de que pasen 2 segundos 
//-- que es cuando se imprime "tarea 2 completada", este mensaje
//-- se imprime despues del stop ya que el stop acaba los tics