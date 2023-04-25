const express = require('express');
var net     = require('net')

const app = express();
const PORT = 3000;

app.set('view engine','ejs');

var client=[];

function measureweight(ip_address,tcp_port,res) {
    console.log("connecting....");
    
    client[ip_address] = net.connect({port: tcp_port, host: ip_address}, function() {
            res.render('index',{name : 'connected'});
    });  
    
    client[ip_address].on('end', function() {
        res.render('index',{name : 'connection terminated'});
    });

    client[ip_address].on('error', function(ex) {
        res.render('index',{name : 'cannot connect to IP'});
        console.log("connection failed"+ex);
    });
    
    client[ip_address].on('data', function(data)
    {
        var debug_data = data.toString();  
        res.render('index',{name : debug_data});
    });
}

app.get('/', (req, res)=>{
    console.log('new request received');
    res.render('index',{name : 'starting up'});
    measureweight('192.168.1.60',25,res);
});

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
