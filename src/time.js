#!/usr/bin/node

console.log('time.js');

exports.ct = function () {
	var t = (new Date());
	var r = t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
	return r;
};

exports.ls = function() {
	return (new Date()).toLocaleString();	
};

exports.tl = () => {
	return (new Date()).toLocaleTimeString()+' '+(new Date()).toLocaleDateString();
}

const startServerTime = (new Date()).getTime()

//// get total seconds between the times
//delta = Math.abs(date_future - date_now) / 1000;
//
//// calculate (and subtract) whole days
//var days = Math.floor(delta / 86400);
//delta -= days * 86400;
//
//// calculate (and subtract) whole hours
//var hours = Math.floor(delta / 3600) % 24;
//delta -= hours * 3600;
//
//// calculate (and subtract) whole minutes
//var minutes = Math.floor(delta / 60) % 60;
//delta -= minutes * 60;
//
//// what's left is seconds
//var seconds = delta % 60;  // in theory the modulus is not required

