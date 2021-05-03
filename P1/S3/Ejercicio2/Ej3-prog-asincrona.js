const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  req.on('data', (cuerpo) => {
    console.log("MENSAJE B")
  });

  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

//--Se imprimen los mensajes E y F
//--Una vez lanzado el curl se imprimen A, D y C. 
//--El B no se imprime nunca si lanzo un curl sin cuerpo (curl 127.0.0.1:8080)

//--Si lanzo un curl con cuerpo (curl  -d "cuerpo" 127.0.0.1:8080),despues de 
//--probar lo anterior, se imprimen los mensajes A, D, B y C
//--E y F no se vuelven a imprimir ya que no dependen de las peticiones
//--que hagamos y no hemos vuelto a ejecutar el programa(ya estaba abierto)


