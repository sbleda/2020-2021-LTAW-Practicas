var http = require('http');
var fs = require('fs');
var url = require('url');

const PUERTO = 9000;

http.createServer(function (req, res) {

    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);
    tipo= url.pathname.split('.')
    tipo2= url.pathname.split('/')
    console.log(tipo2)

    let file = 'tienda.html'
    let type = "text/html"
    
    if (tipo[1] == 'css'){
        type = "text/css" 
        file = tipo2[tipo2.length - 2] + '/' + tipo2[tipo2.length - 1]
        console.log("dentro de css")
        console.log('')
    } 

    else if (tipo[1] == 'png'){
        type = "image/png" 
        file =  tipo2[tipo2.length - 2] + '/' + tipo2[tipo2.length - 1]
        console.log(file)
        console.log("dentro de png")
        console.log('')
    } 
    else if (tipo[1] == 'jpeg'){
        type = "image/jpeg" 
        file = tipo2[tipo2.length - 2] + '/' + tipo2[tipo2.length - 1]
        console.log(file)
        console.log("dentro de jpeg")
        console.log('')
    } 

    else if (tipo[1] == 'jpg'){
        type = "image/jpg" 
        file = tipo2[tipo2.length - 2] + '/' + tipo2[tipo2.length - 1]
        console.log(file)
        console.log("dentro de jpg")
        console.log('')
    } 

    else if (tipo[1] == 'html'){
        type = "text/html" 
        file = tipo2[tipo2.length - 2] + '/' + tipo2[tipo2.length - 1]
        console.log(file)
        console.log("dentro de html")
        console.log('')
        if ( tipo2[tipo2.length - 1] == 'tienda.html'){
            file = 'tienda.html';
            console.log(file)
            console.log("dentro de html bhjbhjhj")
            console.log('')

        }

    }


    fs.readFile(file, function(err, data){

        if (err) {
            console.log("Error!!");
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write("Not Found")
            res.end();
            return;
        }
        else {

            res.writeHead(200, {'Content-Type': type});
            res.write(data);
            res.end();
        }

    });
  }).listen(PUERTO);
  
  console.log("Server listo!. Escuchando en puerto: " + PUERTO);


