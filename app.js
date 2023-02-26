const express = require('express');
const net     = require('net')

const app = express();
const PORT = 3000;

var client = new net.Socket();

client.connect(502,'192.168.1.60',function(){
    console.log('connected');
})

app.get('/', (req, res)=>{
    var string;
    client.on('data',function(data){
        string = data.toString()
        console.log('Received : '+string)
    })
    console.log('readed weight : ',string)
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Readed weight : "+string+"</h1>");
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
