const express = require('express');
var net     = require('net')

const app = express();
const PORT = 3000;

var client=[];

function tcp_connection(ip_address,tcp_port)
{
    console.log("connecting....");
    client[ip_address] = net.connect({port: tcp_port, host: ip_address}, function() {
      console.log('Connection established! '+ip_address);
    });  
    
    client[ip_address].on('end', function() {
      console.log('Disconnected :('+ ip_address);               
    });

    client[ip_address].on('error', function(ex) {
        console.log(ex);
    });
    
    client[ip_address].on('data', function(data)
    {
        var debug_data = data.toString();  
        console.log(debug_data);
    });
}

app.get('/', (req, res)=>{
    console.log('new request received');
    tcp_connection('192.168.1.60',25);
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
