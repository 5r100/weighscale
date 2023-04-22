const express = require('express');
var net     = require('net')

const app = express();
const PORT = 3000;

var client=[];

function tcp_connection(ip_address)
{
    console.log("connecting....");
    client[ip_address] = net.connect({port: 502, host: ip_address}, function() {
      console.log('Connection established! '+ip_address);
    });  
    
    client[ip_address].on('end', function() {
      console.log('Disconnected :('+ ip_address);               
    });

    client[ip_address].on('error', function(ex) {
        console.log(ex);
        res.set('Content-Type', 'text/html');
        res.status(200).send("<h1>ERROR</h1>");
    });
    
    client[ip_address].on('data', function(data)
    {
        var debug_data = data.toString();  
        console.log(debug_data);
        res.set('Content-Type', 'text/html');
        res.status(200).send("<h1>data : "+data.toString()+"</h1>");
    });
}

app.get('/', (req, res)=>{
    console.log('new request received');
    tcp_connection("192.168.1.60");
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);  
