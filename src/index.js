#!/usr/bin/node

var time = require('./time.js');
var utils = require('./utils.js');

var os = require('os');
var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

global.atob = require("atob");


var domain = "goralskieveto.org"
var servername = "mielniczuk.com";
var myhost = JSON.stringify(os.hostname());
var serverPort = 7654;

console.log('hostname: ',JSON.stringify(os.hostname()));
console.log('is local: ',os.hostname().indexOf("local"));

// gunicorn --certfile=/etc/letsencrypt/live/workwork.fun/fullchain.pem --keyfile=/etc/letsencrypt/live/workwork.fun/privkey.pem --bind 0.0.0.0:3456 wsgi:app

//var options = {
//	key: fs.readFileSync('/etc/letsencrypt/live/workwork.fun/privkey.pem'),
//	cert: fs.readFileSync('/etc/letsencrypt/live/workwork.fun/fullchain.pem')
//};

if (app.settings.env != "development") {
  var options_server = {
    key: fs.readFileSync('/etc/letsencrypt/live/'+domain+'privkey.pem')
    , cert: fs.readFileSync('/etc/letsencrypt/live/'+domain+'/fullchain.pem')
  };
  console.log('SSL options_server')
  options = options_server;
}
else {
  var options_local = {
	key: fs.readFileSync('./keys/privkey.pem'),
	cert: fs.readFileSync('./keys/fullchain.pem')
  };
  options = options_local;
  console.log('SSL options_local:')  
}



//console.log('options',options)

var server = https.createServer(options, app);
var io = require('socket.io')(server);

/* removing HTML tags */
var striptags_mode = 'off'
var striptags = require('striptags');
function strip(str) {
	if(striptags_mode == 'on') {
		return striptags(str);
	} else {
		return str;
	}
}


/* simple crypto */
//var SimpleCrypto = require("simple-crypto-js").default;
//var _secretKey = "some-unique-key";
//var simpleCrypto = new SimpleCrypto(_secretKey);
var CryptoJS = require("crypto-js");
const uuidv5 = require('uuid/v5');
var session = uuidv5('http://example.com/hello', uuidv5.URL)



app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

	socket.on('chat message', function (msg) {

		const address = socket.request.connection.remoteAddress;
		var ts = (new Date()).getTime();
		//var ts_str = JSON.stringify(socket.handshake.headers) + ': ';
		var ts_str = '('+time.ct()+') ';
		
		//time.ls() + ' :'
		
		// id, uid, msg
		var chat_data = JSON.parse(msg);
      
        console.log("chat message, chat data","["+chat_data.emoji+"]", chat_data.msg, "["+chat_data.bio+"]", "["+chat_data.nickname+"]")
		
		//chat_data.msg = simpleCrypto.encrypt(strip(chat_data.msg));
		//var ciphertext = CryptoJS.RC4.encrypt(strip(chat_data.msg), 'secret key 123').toString();
		var ciphertext = chat_data.msg;

		chat_data.msg = ciphertext;
		
		var msg = JSON.stringify(chat_data);

		io.emit('chat message', msg+''+session);
		
		fs.appendFileSync('messages-log.log', ts_str + chat_data.msg);


		var base64Data = chat_data.attachment.replace(/^data:image\/png;base64,/, "");
		var base64size = atob(base64Data.substr(22)).length;

		if(base64size > 0) {

			// image filename
			var iFile = chat_data.nickname+"__"+ts+"__"+address+"_"+chat_data.bio+"_"+base64size
			var repPairs = [[" ","_"],["-","_"],["(",""],[")",""],[":","_"],["'",""],["..","."],[".","_"],['"',""],['=',""],['+',""],['*',""],['&',""],["%",""],['^',""],['*',""],[',',"_"],['<',""],['>',""],['?',"_"]]
			for(var i=0; i<repPairs.length; i++) {
				let pair = repPairs[i];
				iFile = iFile.split(pair[0]).join(pair[1])
			}
			iFile += ".png";

			fs.writeFile("/var/www/workwork.fun/opart/images/"+iFile, base64Data, 'base64', function(err) {
			  console.log(err);
			});

		} else {
			console.log("empty Data from: "+address)
		}

		
	});
	
	socket.on('chat init',function(msg) {
		console.log('chat init', msg);
		io.emit('chat feedback', 'Hi '+msg);
	})
	
	//var address = socket.handshake.address;
	const address2 = socket.request.connection.remoteAddress;
    
	console.log('\nð¥----- '+time.ls()+' -------------------------------------\n  New con:' + JSON.stringify(socket.handshake.headers["user-agent"]) +' : '+ address2 +'\n-----------------------------------------------------------------------\n');
	
	
	toajaSays(utils.agent(socket.handshake.headers["user-agent"])+' joined');

});


server.listen(serverPort, function() {
        console.log('listening on *:' + serverPort);
        var cpu = os.cpus();
        var net = os.networkInterfaces();
        //var cpu_detail = JSON.parse(cpu);
        //console.log(cpu,net,os.homedir(),os.hostname());
        var cp = {};
        cp.data = cpu;
        console.log(cp.data);	
	
	
});


function toajaSays(m) {
	var chat_data = {};
	chat_data.id = 'Tatacha';
	chat_data.msg = CryptoJS.RC4.encrypt(m, 'secret key 123').toString();
	var msg = JSON.stringify(chat_data);
	io.emit('chat message', msg+''+session);
	console.log(chat_data.msg);	
}

const systemMessage = setInterval(() => {
	toajaSays("🕒: "+time.tl());
}, 1000*60*5);


console.log("It's time : "+time.tl());
