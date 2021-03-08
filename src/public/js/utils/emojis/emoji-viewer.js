/*
 	by Sylwester Mielniczuk
	mailto: flaboy.com@gmail.com
 
 */

var _eP = {};
_eP.holder = document.getElementById('change-avatar')
_eP.dragging = false;
_eP.t_x = 0;
_eP.s_x = 0;
_eP.sw = 150;
_eP.sh = 110;
_eP.bank = 100;
_eP.sT = 0.12; 
_eP.tl = new TimelineLite({id:"animateAdd"});
_eP.cs = true;

_eP.nums = [];
_eP.numsTitle = [];
_eP.numsPos = [];


_eP.app = new PIXI.Application(_eP.sw, _eP.sh, {backgroundColor: 0xFFFFFF});

_eP.holder.appendChild(_eP.app.view);

_eP.emojiStyle = new PIXI.TextStyle({
    fontFamily: 'Apple Color Emoji',
    fontSize: 100,
	padding:35
});

_eP.app.renderer.plugins.interaction.autoPreventDefault = false;
_eP.app.view.style['touch-action'] = 'auto';        



function rotateEmojis(k) {
	if(k == -1) {
		// last element became first
		_eP.nums.unshift(_eP.nums.pop());
		_eP.numsTitle.unshift(_eP.numsTitle.pop());
		_eP.numsPos.unshift(_eP.numsPos.pop());
	}
	 if(k == 1) {     
		_eP.nums.push( _eP.nums.shift());
		_eP.numsTitle.push( _eP.numsTitle.shift());
		_eP.numsPos.push( _eP.numsPos.shift());
	}
	var z = parseInt((_eP.nums[0].name).substr(2,1))
	
	//console.log(_eP.numsPos[1]);
	
	//
	$('#in-name').val(_eP.numsTitle[1]);
	
	//
	
	
} 


function rotateEmojisTo(pos) {

	
	_eP.nums[0].x = -_eP.sw;
	_eP.nums[1].x = -_eP.sw;
	_eP.nums[2].x = -_eP.sw;	
	
	for(var i=0; i<=pos-2; i++) {
		rotateEmojis(1);
	}
	
	onButtonLRDown(1)
	onButtonLRDown(-1)
	
	
	
}




function emojiSetup() {
	
	//console.log('setup');
	
	// /*emojis.length
	for(var i=0; i < emojis.length; i++) {
		var nam = emojis.rand.get(i).name;
		var pos = emojis.rand.get(i).pos
		var snam = nam.replace(/\-/g,'');
		this[snam] = new PIXI.Text(emojis.rand.get(i).emoji, _eP.emojiStyle);
			//new PIXI.Sprite(resources[nam].texture);
		_eP.app.stage.addChild(this[snam]);
		this[snam].name = snam;
		this[snam].x = -_eP.sw + (i*_eP.sw);
		this[snam].y = 10;
		_eP.nums.push(this[snam]);
		_eP.numsTitle.push(nam);
		_eP.numsPos.push(pos);
		
	}
	
	/* swipe left right */
	_eP.app.stage.interactive = true;
	_eP.app.stage.on('pointerdown', pointerDown);
	_eP.app.stage.on('pointerup', pointerUp);
	_eP.app.stage.on('pointermove', pointerMove);

	_eP.nums[0].x = -_eP.sw;
	_eP.nums[1].x = 20;
	_eP.nums[2].x = _eP.sw;
	
	
	
	
}
	//swipe info
function pointerMove(event) {
	if (_eP.dragging) {
		_eP.t_x = event.data.global.x - _eP.s_x;
		_eP.nums[0].x = _eP.t_x-_eP.sw;
		_eP.nums[1].x = _eP.t_x;
		_eP.nums[2].x = _eP.t_x+_eP.sw;
		var abs = Math.abs(_eP.t_x/_eP.sw);
	}
}
//
function pointerDown(event) {
	console.log(_eP.app.renderer.plugins.interaction.autoPreventDefault);
	_eP.app.renderer.plugins.interaction.autoPreventDefault = false;                 
	_eP.dragging = true;
	_eP.s_x = event.data.global.x;
}

function pointerUp(event) {
	_eP.dragging = false;
	var pr = (_eP.nums[0].x+_eP.sw);
	console.log(pr)
	if(pr >= _eP.bank) {
		_eP.tl.to(_eP.nums[0],_eP.sT,{x:20});
		_eP.tl.to(_eP.nums[1],_eP.sT,{x:_eP.sw,onComplete:function() {
			 rotateEmojis(-1);
		console.log(_eP.nums[1].name)
		}},"-="+_eP.sT);
	}
	if(pr <= -_eP.bank) {
		_eP.tl.to(_eP.nums[1],_eP.sT,{x:-_eP.sw});
		_eP.tl.to(_eP.nums[2],_eP.sT,{x:20,onComplete:function() {
			 rotateEmojis(1);
		}},"-="+_eP.sT);
	} 
	if(pr > -_eP.bank && pr < _eP.bank ) {
		_eP.tl.to(_eP.nums[1],_eP.sT,{x:20},"-=0");
		_eP.tl.to(_eP.nums[0],_eP.sT,{x:-_eP.sw},"-="-_eP.sT);
		_eP.tl.to(_eP.nums[2],_eP.sT,{x:_eP.sw},"-="-_eP.sT);
	}
}

function enableEmojiButtons(s) {
	_eP.cs = s;
}

function onButtonLRDown(s) {
	//console.log('down',s);
	//app.renderer.plugins.interaction.autoPreventDefault = true;
	enableEmojiButtons(false);
	if(s == -1) {
		_eP.tl.to(_eP.nums[0],_eP.sT,{x:20});
		_eP.tl.to(_eP.nums[1],_eP.sT,{x:_eP.sw,onComplete:function() {
			 rotateEmojis(-1);
			_eP.nums[0].x = -_eP.sw;
			_eP.nums[1].x = 20;
			_eP.nums[2].x = _eP.sw;                          
			//console.log(_eP.nums[1].name)
			enableEmojiButtons(true);
		}},"-="+_eP.sT);                
	}
	if(s == 1) {
		_eP.tl.to(_eP.nums[1],_eP.sT,{x:-_eP.sw});
		_eP.tl.to(_eP.nums[2],_eP.sT,{x:20,onComplete:function() {
			 rotateEmojis(1);
			_eP.nums[0].x = -_eP.sw;
			_eP.nums[1].x = 20;
			_eP.nums[2].x = _eP.sw;
			enableEmojiButtons(true);
		}},"-="+_eP.sT);
	}
} 


$('#emoji-l').on('mousedown', function() {
	if(_eP.cs == true) {
		onButtonLRDown(-1)
	}
})

$('#emoji-r').on('mousedown', function() {
	if(_eP.cs == true) {	
		onButtonLRDown(1)
	}
})


emojiSetup();



