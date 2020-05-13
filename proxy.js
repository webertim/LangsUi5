var cors_proxy = require('cors-anywhere');

// Listen on a specific IP Address
var host = "webidetesting3710595-p2002338359trial.dispatcher.hanatrial.ondemand.com";

// Listen on a specific port, adjust if necessary
var port = 442;

cors_proxy.createServer({
	originWhitelist: [], // Allow all origins
	requireHeader: ['origin', 'x-requested-with'],
	removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function(e) {
	print();
});