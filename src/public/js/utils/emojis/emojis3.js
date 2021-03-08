/*
	by Sylwester Mielniczuk
	flaboy.com@gmail.com
*/
console.log('loaded file: emojis3.js');

var emojis = ['🙈 See-No-Evil Monkey','🙉 Hear-No-Evil Monkey','🙊 Speak-No-Evil Monkey','💥 Collision','💫 Dizzy','💦 Sweat Droplets','💨 Dashing Away','🐵 Monkey Face','🐒 Monkey','🦍 Gorilla','🐶 Dog Face','🐕 Dog','🐩 Poodle','🐺 Wolf Face','🦊 Fox Face','🐱 Cat Face','🐈 Cat','🦁 Lion Face','🐯 Tiger Face','🐅 Tiger','🐆 Leopard','🐴 Horse Face','🐎 Horse','🦄 Unicorn Face','🦓 Zebra','🐮 Cow Face','🐂 Ox','🐃 Water Buffalo','🐄 Cow','🐷 Pig Face','🐖 Pig','🐗 Boar','🐽 Pig Nose','🐏 Ram','🐑 Ewe','🐐 Goat','🐪 Camel','🐫 Two-Hump Camel','🦒 Giraffe','🐘 Elephant','🦏 Rhinoceros','🐭 Mouse Face','🐁 Mouse','🐀 Rat','🐹 Hamster Face','🐰 Rabbit Face','🐇 Rabbit','🐿 Chipmunk','🦔 Hedgehog','🦇 Bat','🐻 Bear Face','🐨 Koala','🐼 Panda Face','🐾 Paw Prints','🦃 Turkey','🐔 Chicken','🐓 Rooster','🐣 Hatching Chick','🐤 Baby Chick','🐥 Front-Facing Baby Chick','🐦 Bird','🐧 Penguin','🕊 Dove','🦅 Eagle','🦆 Duck','🦉 Owl','🐸 Frog Face','🐊 Crocodile','🐢 Turtle','🦎 Lizard','🐍 Snake','🐲 Dragon Face','🐉 Dragon','🦕 Sauropod','🦖 T-Rex','🐳 Spouting Whale','🐋 Whale','🐬 Dolphin','🐟 Fish','🐠 Tropical Fish','🐡 Blowfish','🦈 Shark','🐙 Octopus','🐚 Spiral Shell','🐌 Snail','🦋 Butterfly','🐛 Bug','🐜 Ant','🐝 Honeybee','🐞 Lady Beetle','🦗 Cricket','🕷 Spider','🕸 Spider Web','🦂 Scorpion','💐 Bouquet','🌸 Cherry Blossom','💮 White Flower','🏵 Rosette','🌹 Rose','🥀 Wilted Flower','🌺 Hibiscus','🌻 Sunflower','🌼 Blossom','🌷 Tulip','🌱 Seedling','🌲 Evergreen Tree','🌳 Deciduous Tree','🌴 Palm Tree','🌵 Cactus','🌾 Sheaf of Rice','🌿 Herb','☘ Shamrock','🍀 Four Leaf Clover','🍁 Maple Leaf','🍂 Fallen Leaf','🍃 Leaf Fluttering in Wind','🍄 Mushroom','🌰 Chestnut','🦀 Crab','🦐 Shrimp','🦑 Squid','🌍 Globe Showing Europe-Africa','🌎 Globe Showing Americas','🌏 Globe Showing Asia-Australia','🌑 New Moon','🌒 Waxing Crescent Moon','🌓 First Quarter Moon','🌔 Waxing Gibbous Moon','🌕 Full Moon','🌖 Waning Gibbous Moon','🌗 Last Quarter Moon','🌘 Waning Crescent Moon','🌙 Crescent Moon','🌚 New Moon Face','🌛 First Quarter Moon Face','🌜 Last Quarter Moon Face','☀ Sun','🌝 Full Moon Face','🌞 Sun With Face','⭐ Star','🌟 Glowing Star','🌠 Shooting Star','☁ Cloud','⛅ Sun Behind Cloud','⛈ Cloud With Lightning and Rain','🌤 Sun Behind Small Cloud','🌥 Sun Behind Large Cloud','🌦 Sun Behind Rain Cloud','🌧 Cloud With Rain','🌨 Cloud With Snow','🌩 Cloud With Lightning','🌪 Tornado','🌫 Fog','🌬 Wind Face','🌈 Rainbow','☂ Umbrella','☔ Umbrella With Rain Drops','⚡ High Voltage','❄ Snowflake','☃ Snowman','⛄ Snowman Without Snow','☄ Comet','🔥 Fire','💧 Droplet','🌊 Water Wave','🎄 Christmas Tree','✨ Sparkles','🎋 Tanabata Tree','🎍 Pine Decoration'];

emojis.rand = {
	give: function() {
		var rs = Math.floor(Math.random()*emojis.length-1);
		var em = emojis[rs];
		var emoji = em.split(' ')[0];
		var name = em.substr(2,em.length);
		return {emoji:emoji,name:name,pos:rs};
	},
	get: function(num) {
		var em = emojis[num];
		var emoji = em.split(' ')[0];
		var name = em.substr(2,em.length);
		return {emoji:emoji,name:name,pos:num};		
	}
	
}


