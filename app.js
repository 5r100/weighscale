const express = require('express');
const net     = require('net')

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    var string= "not readed any data";
    var server = net.createServer(function(socket) {
        // confirm socket connection from client
        console.log((new Date())+'A client connected to server...');
        socket.on('data', function(data) {
            string = data.toString();
            console.log(string)
        });
        // send info to client
        socket.pipe(socket);
        socket.end();
        console.log('The client has disconnected...\n');
    }).listen(502, '192.168.1.60');
    res.set('Content-Type','text/html');
    res.status(200).send("<h1> readed : "+string+"</h1>");
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
