/* 
	SMALL UTILS _ CLIENT
	
	*/

/*
	removes script	
*/

function stripstr(a) {
	var r = document.createElement("div");
	r.innerHTML = a;
	var f = r.textContent || r.innerText || "";
	return f;
}


/* find word in a string */

function findWordInString(needle, haystack) {
    var myRe = new RegExp("\\b" + needle + "\\b((?!\\W(?=\\w))|(?=\\s))", "gi"),
        myArray, myResult = [];
    while ((myArray = myRe.exec(haystack)) !== null) {
        myResult.push(myArray.index);
    }
    return myResult;
}


/* Check from client to server */

function ifServerOnline(ifOnline, ifOffline, src) {
	//var img = document.body.appendChild(document.createElement("img"));
	var img = new Image();
	img.onload = function () {
		ifOnline && ifOnline.constructor == Function && ifOnline();
	};
	img.onerror = function () {
		ifOffline && ifOffline.constructor == Function && ifOffline();
	};
	// src = "http://flaboy.com:3100/images/ping.gif";
	var url = src+'?dummy='+(new Date).getTime().toString();
	img.src = url;
}

function onlineStatus() {
	var img_path = 'images/ping.gif';
	var src = window.location.href+''+img_path;
	ifServerOnline(function() {
		//console.log('online -'+src);
		document.getElementById('online-check-b').style.background = 'white';
		document.getElementById('online-check-b').innerHTML = 'Connected';
		$('#messages').css('opacity',1)
	}, function() {
		//console.log('offline -'+src);
		document.getElementById('online-check-b').style.background = 'grey';	document.getElementById('online-check-b').innerHTML = '...disconnected';
		$('#messages').css('opacity',0.1)

	}, src)	
}

var onlineStatusInterval = setInterval(onlineStatus, 5000);





