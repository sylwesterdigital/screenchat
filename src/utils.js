#!/usr/bin/node

console.log('utils.js');
 
/* find word in a string */

exports.finds = function(needle, haystack) {
    var myRe = new RegExp("\\b" + needle + "\\b((?!\\W(?=\\w))|(?=\\s))", "gi"),
        myArray, myResult = [];
    while ((myArray = myRe.exec(haystack)) !== null) {
        myResult.push(myArray.index);
    }
    return myResult;
}


exports.finds2 = function(needle, haystack) {
	return ((haystack).indexOf(needle) == -1)
}


exports.agent = function(agent) {
	
	var m = agent.split(';')[0].split('(')[1];
	return m;
}
