const express = require('express');
const net     = require('net')

const app = express();
const PORT = 3000;

var client = new net.Socket();

client.connect(502,'192.168.1.60',function(){
    console.log('connected');
})
	
client.on('data',function(data){
    console.log('Received : '+ data.toString());
})

client.on('error', function(){
    console.log('ERROR');
}

app.get('/', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Readed weight is on console</h1>");
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
