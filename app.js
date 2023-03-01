const express = require('express');
var net     = require('net')

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    console.log('new request received');
    client = net.connect({ port: 502, host: '192.168.1.60' }, function () {
        console.log('connected');
        res.set('Content-Type', 'text/html');
        res.status(200).send("<h1>connected</h1>");
    })
        
    client.on('data',function(data){
        console.log('Received : '+ data.toString());
        res.set('Content-Type', 'text/html');
        res.status(200).send("<h1>data : "+data.toString()+"</h1>");
    })
    
    client.on('error', function(ex){
        console.log(ex);
        res.set('Content-Type', 'text/html');
        res.status(200).send("<h1>ERROR</h1>");
    })
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);  
