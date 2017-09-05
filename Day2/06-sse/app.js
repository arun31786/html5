var express = require('express');
//var bodyParser   = require('body-parser');
var app = express();
var port = 8080;

var tickets = require('./tickets');
var ticketId = 0;
var ticketsLength = tickets.length;


	// parse application/x-www-form-urlencoded 
//	app.use(bodyParser.urlencoded({ extended: false }))
	// parse application/json 
//	app.use(bodyParser.json())
	app.use(express.static(__dirname + '/public'));


var clientId = 0;
var clients = {};  // <- Keep a map of attached clients

// Called once for each new client. Note, this response is left open!
app.get('/events/', function(req, res) {
	req.socket.setTimeout(10000);
    res.writeHead(200, {
    	'Content-Type': 'text/event-stream',  // <- Important headers
    	'Cache-Control': 'no-cache',
    	'Connection': 'keep-alive'
    });
    res.write('\n');
    (function(clientId) {
		// <- Add this client to those we consider "attached"
        clients[clientId] = res;  
		
		// <- Remove this client when he disconnects
        req.on("close", function(){delete clients[clientId]});  
    })(++clientId)
});

setInterval(function(){
	var ticket = getTicket();
	console.log("Clients: " + Object.keys(clients) + " <- " + ticket);
	for (clientId in clients) {
		// <- Push a id to a single attached client
		clients[clientId].write("id: "+ ticketId + "\n\n"); 
		// <- Push a message to a single attached client
		clients[clientId].write("data: "+ ticket + "\n\n"); 
	};
}, 2000);

function getTicket(){
	var ticket = {"ticketName":tickets[ticketId][0], "ticketPrice":tickets[ticketId][1]};
	ticketId++;
	if(ticketId>=ticketsLength){
		ticketId = 0;
	}
	return JSON.stringify(ticket);
}

app.listen(port, function(){
	console.log("Express server listening on port: ", port);
});
