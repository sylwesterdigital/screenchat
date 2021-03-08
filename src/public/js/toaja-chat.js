
/*
	Toaja - simple nodejs/socket.io chat
	autor: Sylwester Mielniczuk
	original git repo: git@github.com:sylwesterdigital/tetris.git
	new repo: git@github.com:sylwesterdigital/tatachat.git
    server: https://xr.workwork.fun:3100/
    path: /root/projects/tatachat
*/

var socket = io();
//var socket = io.connect('https://localhost', {secure: true});

function create_UUID() {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

function updateInitWindow() {
	$('#messages-wrap').css('top',window.innerHeight-$('#messages').height()-$('#m').height()-10)
}


var paletteList = [  [
  [13,43,69],
  [32,60,86],
  [84,78,104],
  [141,105,122],
  [208,129,89],
  [255,170,94],
  [255,212,163],
  [255,236,214],
],
[
  [48,0,48],
  [96,40,120],
  [248,144,32],
  [248,240,136]
],
 [
    [38,48,95],
    [14,46,71],
    [37,32,48],
    [99,93,92],
   [72,130,134],
   [121, 142, 163],
   [90, 93, 107]
  ],
[[26, 28, 44], [93, 39, 93], [177, 62, 83], [239, 125, 87], [255, 205, 117], [167, 240, 112], [56, 183, 100], [37, 113, 121], [41, 54, 111], [59, 93, 201], [65, 166, 246], [115, 239, 247], [244, 244, 244], [148, 176, 194], [86, 108, 134], [51, 60, 87]], [[44, 33, 55], [118, 68, 98], [237, 180, 161], [169, 104, 104]], [[7, 5, 5], [33, 25, 25], [82, 58, 42], [138, 107, 62], [193, 156, 77], [234, 219, 116], [160, 179, 53], [83, 124, 68], [66, 60, 86], [89, 111, 175], [107, 185, 182], [251, 250, 249], [184, 170, 176], [121, 112, 126], [148, 91, 40]], [[140, 143, 174], [88, 69, 99], [62, 33, 55], [154, 99, 72], [215, 155, 125], [245, 237, 186], [192, 199, 65], [100, 125, 52], [228, 148, 58], [157, 48, 59], [210, 100, 113], [112, 55, 127], [126, 196, 193], [52, 133, 157], [23, 67, 75], [31, 14, 28]], [[94, 96, 110], [34, 52, 209], [12, 126, 69], [68, 170, 204], [138, 54, 34], [235, 138, 96], [0, 0, 0], [92, 46, 120], [226, 61, 105], [170, 92, 61], [255, 217, 63], [181, 181, 181], [255, 255, 255]], [[21, 25, 26], [138, 76, 88], [217, 98, 117], [230, 184, 193], [69, 107, 115], [75, 151, 166], [165, 189, 194], [255, 245, 247]]];
var currentPalette = 3;
var maxPalette = paletteList.length;

function addFilter() {

	var img = document.getElementById("preview-image");

		var c = Filters.getPixels(img);
        var a = Filters.getCanvas(256,256);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);		
		console.log("on load")


}

// function runFilter(id, filter, arg1, arg2, arg3) {
// 	var c = document.getElementById(id);
// 	var s = c.previousSibling.style;

// 	var b = c.parentNode.getElementsByTagName('button')[0];
// 	if (b.originalText == null) {
// 	  b.originalText = b.textContent;
// 	}
// 	if (s.display == 'none') {
// 	  s.display = 'inline';
// 	  c.style.display = 'none';
// 	  b.textContent = b.originalText;
// 	} else {
// 	  var idata = Filters.filterImage(filter, img, arg1, arg2, arg3);
// 	  c.width = idata.width;
// 	  c.height = idata.height;
// 	  var ctx = c.getContext('2d');
// 	  ctx.putImageData(idata, 0, 0);
// 	  s.display = 'none';
// 	  c.style.display = 'inline';
// 	  b.textContent = 'Restore original image';
// 	}
// }

function imagedata_to_image(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

	




function removeColors() {

	var srcImg = document.getElementById("preview-image");
	
	var imgData = Filters.filterImage(Filters.grayscale, srcImg);


	var srcImgWidth = srcImg.naturalWidth;
	var srcImgHeight = srcImg.naturalHeight;

	var tc = document.getElementById("pixelitcanvas");
	tc.width  = srcImgWidth;
	tc.height = srcImgHeight;	
	
	tc.getContext("2d")
	.putImageData(imgData,0,0)

	//srcImg.style.display = "none";
	//tc.style.display = "block";

	srcImg.src = canvas.toDataURL("image/png");


}



function pixelate(v) {
    var size = (play ? v : blocks.value) * 0.01,
        w = canvas.width * size,
        h = canvas.height * size;
    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}

function makePixels(fromID,toID) {
	var pxCo = {
	  to : document.getElementById(toID),
	  from : document.getElementById(fromID),
	  palette : [[0,0,0],[2,2,2]],
	  maxHeight: 512,
	  maxWidth: 512,
	}
	const px = new pixelit(pxCo);
	// px.draw().pixelate().convertGrayscale().setScale(25);
	px.setScale(5).setPalette(paletteList[2]).draw().pixelate().convertGrayscale();
}


function previewFile() {

  const preview = document.getElementById("orig-image");
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();



  reader.addEventListener("load", function () {

    preview.src = reader.result;
	document.getElementById("file-reader-cont").style.display = "block";
	//makePixels();

	$("#orig-image").show();

	//preview.style.transform = 'scale('+$(window).height() / $("#preview-image").height()+')'

	setTimeout(function() {
		if($(window).height() / $("#orig-image").height() < 1) {
  			$("#orig-image").css("transform",'scale('+$(window).height() / $("#orig-image").height()+')')
  		}
  	},100);

	document.getElementById("preview-image").src = "";


  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }

}





function closeAtachment() {
  document.getElementById("preview-image").src = null;
  document.getElementById("file-reader-cont").style.display = "none";
}

function submitFormReader() {

	//makePixels();
    
    var b64 = document.getElementById("preview-image").src;//.replace(/.*base64,/, '');
    //const byteCharacters = atob(document.getElementById("preview-image").src);

	var base64str = b64.substr(22);
	var decoded = atob(base64str);

	//console.log("b64 FileSize: " + decoded.length);
	console.log("submitFormReader() b64 size: " + decoded.length);

	//var b64 = document.getElementById("pixelitcanvas").toDataURL('image/png',0.92)

    chat_data.attachment = b64;
	chat_data.msg = CryptoJS.RC4.encrypt("image",'secret key 123').toString();
	//if ($('#m').val().length > 1) {
      socket.emit('chat message', JSON.stringify(chat_data));
      $('#m').val('');
      $('#m').height(textarea_height)
      chat_data.attachment = '';
	//}
	$('#m').val('');
	$('#m').height(textarea_height);
    closeAtachment()
}

function submitForm() {
	console.log('submitForm()');
	chat_data.msg = CryptoJS.RC4.encrypt($('#m').val(),'secret key 123').toString();
	if ($('#m').val().length > 1) {
		socket.emit('chat message', JSON.stringify(chat_data));
		$('#m').val('');
		$('textarea').height(textarea_height)
	}
	$('#m').val('');
	$('textarea').height(textarea_height);
}

$('#form-b').on('fastclick', function(e) {
	e.preventDefault();
	submitForm();
});
$('#attachment-b').on('fastclick', function (e) {
	e.preventDefault();
    $("#file1").trigger('click');
});
$('#cancel-reader-b').on('fastclick', function (e) {
	e.preventDefault();
    closeAtachment();
});
$('#send-reader-b').on('fastclick', function (e) {
	e.preventDefault();
    submitFormReader()
});


/* Avatar / Profile */


$('#profile-b').on('fastclick', function (e) {
	e.preventDefault();
    document.getElementById("profile-c").style.display = "block";
    document.getElementById("profile-b").style.display = "none";
  
    $('#ta-nickname').height(53);
    $('#ta-bio').height(53);
   
});

$('#profile-save-b').on('fastclick', function (e) {
	e.preventDefault();
    chat_data.nickname = $('#ta-nickname').val().replace(/(\r\n|\n|\r)/gm, " ");
    chat_data.bio = $('#ta-bio').val().replace(/(\r\n|\n|\r)/gm, "");
    dataKeys.data(JSON.stringify(chat_data));
    //console.log(chat_data)
    //dataKeys.data(JSON.stringify(chat_data));
    document.getElementById("profile-c").style.display = "none";
    document.getElementById("profile-b").style.display = "block";
});

//document.getElementById("profile-c").style.display = "none";


$('#profile-avatar').on('fastclick', function (e) {
  e.preventDefault();
  var new_emoji = emojis.rand.give();
  chat_data.emoji = new_emoji.emoji;
  chat_data.bio = new_emoji.name;
  document.getElementById('profile-b').innerHTML = chat_data.emoji;
  document.getElementById('profile-avatar').innerHTML = chat_data.emoji;
  document.getElementById('ta-bio').innerHTML = chat_data.bio;
  chat_data.nickname = $('#ta-nickname').val();
  dataKeys.data(JSON.stringify(chat_data));
  document.getElementById('profile-b').innerHTML = chat_data.emoji;  
});


function runFilter(fromID, toID,  filter, arg1, arg2, arg3) {
	var sourceImage = document.getElementById(fromID);
	var destImage = document.getElementById(toID)
	var imgData = Filters.filterImage(filter, sourceImage, arg1, arg2, arg3);
	var filterCanvas = Filters.toCanvas(imgData);
	var tmpImage = new Image();
	tmpImage.src = filterCanvas.toDataURL();
	destImage.src = tmpImage.src;
}


$('#preview-image').on('fastclick', function (e) {
  //e.preventDefault();
  // var filter =  Filters.threshold()
  // var idata = Filters.filterImage(filter, img, arg1, arg2, arg3);


	var randomValue = 50 + Math.random()*150;
  console.log('randomly change filter, threshold',randomValue);

  
  runFilter("orig-image", "preview-image", Filters.threshold,randomValue)

});

$('#orig-image').on('fastclick', function (e) {
	runFilter("orig-image", "preview-image", Filters.threshold,142);
	$("#orig-image").hide();
});






/* Socket */

socket.on('chat message', function(msg) {
	var emsg = msg.substr(0, msg.length - 36);
	var msg_uid = msg.substring(msg.length - 36);
	var msg_data = JSON.parse(emsg);
  
    var chat_nickname = msg_data.nickname;
    var chat_bio = msg_data.bio;
  
  
    if(msg_data.attachment != undefined && msg_data.attachment.length > 0) {
      //var pref = data:image/png;base64,
      if(typeof msg_data.attachment === "string") {
        var img_str = '<img src="'+msg_data.attachment+'">'
        console.log(msg_data.attachment.length)
      } 
    } else {
      var img_str = "";
      console.log("1",typeof msg_data.attachment)
    }
  
	var p_str = "<p class='speech'><span class='punch'>";
  
	if (msg_data.uid != chat_data.uid) {
      p_str = "<p class='speech incoming'><span class='punch'>"+img_str
      sounds.ding1.play({ loop: false, singleInstance: true })    
	} else {
      p_str = "<p class='speech mine'><span class='blue'>"
      sounds.slide1.play({ loop: false, singleInstance: true })        
	}
  
	//console.log(CryptoJS.RC4.decrypt(msg_data.msg,'secret key 123').toString(CryptoJS.enc.Utf8));
    console.log('msg_data.id.',msg_data.id);
  
	var decrypted_msg = CryptoJS.RC4.decrypt(msg_data.msg,'secret key 123').toString(CryptoJS.enc.Utf8);
	var chat_nick = '';
  
	if (msg_data.id != undefined) {
		var chat_nick_a = msg_data.id.substr(0, 1);
		var chat_nick_b = msg_data.id.substr(5, 2);
		chat_nick = chat_nick_a +''+ chat_nick_b
	}
	if(msg_data.id == 'Tatacha') {
		p_str = "<p class='speech incoming toaja'><span class='punch'>"
	}
    if(msg_data.emoji == undefined) {
      msg_data.emoji = ''
      chat_nick = 'Tata says: '
      chat_nickname = chat_nick;
    }

  
	$('#messages').append($(p_str + ''+msg_data.emoji+' '+ chat_nickname + '</span>: ' + stripstr(decrypted_msg) + "</p>"));
  
	//$('#messages').append($(p_str + '' + chat_nick + '</span>: ' + stripstr(decrypted_msg) + "</p>"));
	//console.log(window.innerHeight,$('#messages').height())
	/* if window is smaller than messages window - allow scroll */
  
	if((window.innerHeight <= $('#messages').height()+$('#m').height()) && $('#messages').css('position') == 'absolute') {
		$('#messages').css('position', 'relative');
	}
  
	if($('#messages').css('position') == 'relative') {
		TweenMax.to($('#messages-wrap'), 1.5, { scrollTo: { x: 0, y: $('#messages').height()}, delay: 0.05, onComplete: function() {
				//console.log('s');
				if (window.innerHeight <= $('#messages').height()) {
					//$('#messages-wrap').css('top',0);
				}
			}
		});				
	}
	//updateInitWindow();
});

// automatically change text area height
var textarea_height = $('#m').height();

$('textarea').each(function() {
	this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function() {
	this.style.height = 'auto';
	this.style.height = (this.scrollHeight) + 'px';
});

// catch keyboard enter to enter the text
document.getElementById("m").addEventListener("keyup", function(e) {
	if (!e) {
		var e = window.event;
	}
	//e.preventDefault(); // sometimes useful
	// Enter is pressed
	if (e.keyCode == 13) {
		submitForm();
	}
}, false);
/*
	check if you have your identity, if not ask for your name
*/
var _navigator = {};
for (var i in navigator) {
	_navigator[i] = navigator[i];
}
delete _navigator.plugins;
delete _navigator.mimeTypes;
var localStorage = window.localStorage;
var dataKeys = {
	data: function(val) {
		return (typeof(val) === 'undefined' ? localStorage.chatData : localStorage.chatData = val);
	}
}


/* 
	if dataKeys empty, create record
*/
var chat_data = {};
if (!dataKeys.data()) {
  
	chat_data.id = 'Anon' + Math.random() * 1000;
    chat_data.emoji = emojis.rand.give().emoji;
	chat_data.uid = create_UUID();
    chat_data.nickname = 'Anon';
    chat_data.bio = "I'm nobody."
    chat_data.attachment = '';
	dataKeys.data(JSON.stringify(chat_data));
  
    document.getElementById('profile-b').innerHTML = chat_data.emoji;
    document.getElementById('profile-avatar').innerHTML = chat_data.emoji;
    document.getElementById('ta-nickname').innerHTML = chat_data.nickname;
    document.getElementById('ta-bio').innerHTML = chat_data.bio;  
} else {
	chat_data = JSON.parse(dataKeys.data());
	console.log('chat_id:', chat_data.id)
    document.getElementById('profile-b').innerHTML = chat_data.emoji;
    document.getElementById('profile-avatar').innerHTML = chat_data.emoji;
    document.getElementById('ta-nickname').innerHTML = chat_data.nickname;
    document.getElementById('ta-bio').innerHTML = chat_data.bio;  
}

socket.on('chat feedback', function(msg) {
	console.log('chat feedback:', msg)
})

function childfunction() {
	var dt = new Date();
	alert(window.theCallData +  dt  );
}

