//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const { Console } = require('console');

const PUERTO = 8080;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/chat.html">Test</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

let lista = 0;
//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  console.log('Nuevo usuario conectado'.yellow);
  lista += 1; 

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('Usuario desconectado'.yellow);
    lista = lista -1;
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    msg = msg.split(":");
    usuario = msg[0];
    mensaje = msg[1];
    console.log("Mensaje Recibido" + mensaje.blue);


    if (mensaje.trim() == "/help") {
      ayuda = "/help: Mostrará una lista con todos los comandos soportados" + "<br>" +
      "/list: Devolverá el número de usuarios conectados" + "<br>" + 
      "/hello: El servidor nos devolverá el saludo" + "<br>" +
      "/date: Nos devolverá la fecha "
      socket.send(ayuda);
    }
    else if (mensaje.trim() == "/list") {
      socket.send(lista);
    }
    else if (mensaje.trim() == "/hello") {
      socket.send("Hola");
    }
    else if (mensaje.trim() == "/date") {
        var date = new Date();  
        var hora = date.getHours();
        hour = (hora < 10 ? "0" : "") + hora; 
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var seg  = date.getSeconds();
        seg = (seg < 10 ? "0" : "") + seg;
        var year = date.getFullYear();  
        var mes = date.getMonth() + 1;
        mes = (mes < 10 ? "0" : "") + mes;
        var dia  = date.getDate();
        dia = (dia < 10 ? "0" : "") + dia;
        socket.send("Fecha: " + dia + "/" + mes + "/" + year + "<br>" +  "Hora: " + hora + ":" + min + ":" + seg);    }
    else{
      io.send(usuario + ":" + mensaje);
    }

    //-- Reenviarlo a todos los clientes conectados
  });

});




//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);

