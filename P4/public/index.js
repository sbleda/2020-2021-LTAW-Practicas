const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const print = document.getElementById("print");
const msg_entry = document.getElementById("msg_entry");
//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.version;
info2.textContent = process.versions.electron;
info3.textContent = process.versions.chrome;

console.log(process.versions)


btn_test.onclick = () => {
  display.innerHTML += "boton test ";
  console.log("Botón apretado!");

  //-- Enviar mensaje al proceso principal
  electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    msg_entry.innerHTML += '<p style="color:blue">' + message + '</p>';
    msg_entry.onchange = () => {

        if (usuario.value){
      
          if (msg_entry.value)
            socket.send(usuario.value + " : " + msg_entry.value);
          
          //-- Borrar el mensaje actual
          msg_entry.value = "";
        }
      }


});

