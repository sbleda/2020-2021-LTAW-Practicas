//--servidor

//-- Cargar el módulo de electron
const electron = require('electron');
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
console.log("Arrancando electron...");

const PUERTO = 8080;

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  win.setMenuBarVisibility(false)

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("public/index.html");

  //-- Esperar a que la página se cargue y se muestre
  //-- y luego enviar el mensaje al proceso de renderizado para que 
  //-- lo saque por la interfaz gráfica
  win.on('ready-to-show', () => {
    win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
  });
});


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
electron.ipcMain.handle('test', (event, msg) => {
  console.log("-> Mensaje: " + msg);
});


//--CHAT

const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/index.html">Test</a></p>');
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
  io.send("Nuevo usuario conectado")
  socket.send("Bienvenido")
  lista += 1; 

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('Usuario desconectado'.yellow);
    lista -= 1;
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    msg = msg.split(":");
    usuario = msg[0];
    mensaje = msg[1];
    console.log("Mensaje Recibido" + mensaje.blue);  
    mensaje = mensaje.trim()
   
    if(mensaje.charAt(0) == "/"){

      if (mensaje == "/help") {
        ayuda = "/help: Mostrará una lista con todos los comandos soportados" + "<br>" +
        "/list: Devolverá el número de usuarios conectados" + "<br>" + 
        "/hello: El servidor nos devolverá el saludo" + "<br>" +
        "/date: Nos devolverá la fecha "
        socket.send(ayuda);
      }
      else if (mensaje == "/list") {
        socket.send(lista);
      }
      else if (mensaje == "/hello") {
        socket.send("Hola");
      }
      else if (mensaje == "/date") {
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
          socket.send("Fecha: " + dia + "/" + mes + "/" + year + "<br>" +  "Hora: " + hora + ":" + min + ":" + seg);    
      }
      else {
        socket.send("Comando incorrecto");
      }
    }
    else{
      io.send(usuario + ":" + mensaje);
    }
  });
});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);
