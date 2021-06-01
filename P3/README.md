 # Práctica 3
Aplicación Web de Chat, en el que múltiples usuarios puedan hablar entre sí a través del Navegador.

## Servidor
Servidor hecho en node.js: server.js

Módulos usados: socket.io, http, express, colors. Salvo http, deben instalarse previamente. 

Cada mensaje enviado por uno de los participantes será visible para el resto, exceptuando los comandos especiales (/help, /list, /hello, /date), cuya respuesta solo verá el usuario que escribió el comando. /help proporciona información del resto de comandos especiales, /hello responde con hola, /list me dice el número de usuarios conectados en ese momento, y /dat eme devuelve fecha y hora. Si escribe un mensaje con / pero diferente a los anteriores, el  seridor nos dirá qu ees un comando incorrecto.Si escribes los comandos especiales en mayusculas tambien los contará como incorrectos. 

Cada vez que se conecte o desconecte un usuario, le llegara un mensaje informando al resto de participantes. 

## Puesa en marcha:
terminal: node server.js

navegador: http://localhost:8080/chat.html

Una vez en el chat, debes escribir un nombre de usuario para poder enviar mensajes. 
