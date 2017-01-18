var main = (function () {
"use strict";
return{
listGames: {},
listKills: {},
listKillsMeans: {},
listPlayer: [],
initGameLog: [],
gameCount: 0,
lastName: null,

init: function(parser){
	var a = document.getElementById("log").innerHTML;
	return this.start(this.listsLog(a));
},
listsLog:function(list){
	return list.split(/[\r\n]+/);
},
findGame: function(e){
	var p = new RegExp(/InitGame:/g);
	return {flag:p.test(e), hash: e.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return Math.abs(a&a)},0)};
},
addPlayer: function(e){
	var player, p = new RegExp(/ClientUserinfoChanged:/g);
	var re = /n\\[\s\S]+\\t\\0/g;
	var result = re.exec(e);

	if(p.test(e) && result){
		this.listKills[result[0].replace(/(n\\|\\0|\\t)/g,"")] = 0;
		this.listGames[this.lastName].kills = this.listKills;
		this.listGames[this.lastName].players.push(result[0].replace(/(n\\|\\0|\\t)/g,""));
		this.listGames[this.lastName].players = this.listGames[this.lastName].players.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
	}
},
addKills: function(e){
	var self = this, p = new RegExp(/Kill:/g), re = e.split("killed");
	if(p.test(e)){				
		Object.keys(this.listGames[this.lastName].kills).forEach(function(k) {
		//console.log(re[0] +" ##"+ k +"## "+self.lastName);
			if(re[0].indexOf(k) > -1) {
				self.listGames[self.lastName].kills[k]++;
			}else if(re[0].indexOf("<world>") > -1 && re[1].indexOf(k) > -1){
				 if(self.listGames[self.lastName].kills[k] < 1){
					self.listGames[self.lastName].kills[k] = 0;
				}else{
					self.listGames[self.lastName].kills[k]--;
				}
			}
		});
		this.listGames[this.lastName].total_kills++;
	}
},
addKillsMeans: function(e){
	var self = this, p = new RegExp(/Kill:/g), re = e.split("by");
	if(p.test(e)){
		if(!this.listKillsMeans[re[1].trim()]){
		this.listKillsMeans[re[1].trim()] = 0;
		this.listGames[this.lastName].kills_by_means = this.listKillsMeans;
		}
		this.listGames[this.lastName].kills_by_means[re[1].trim()]++;
	}
},
start: function(listLog){
	var self = this,  games = [];
	listLog.forEach(function(element, index, array){	
		var a = self.findGame(element);
		if(a.flag){
			if(self.gameCount>0 && self.listGames["Game_" + self.gameCount])
			games[self.gameCount] = {games: self.lastName, players: self.listGames["Game_" + self.gameCount].players, total_kills: self.listGames["Game_" + self.gameCount].total_kills, kills: self.listKills, killsMeans: self.listKillsMeans};
		
			self.listKills = {};
			self.listKillsMeans = {};
			self.listPlayers = {};			
			self.lastName = "Game_" + (self.gameCount+1);
			self.listGames[self.lastName] = { hash: a.hash, total_kills:0, players: [], kills: [], kills_by_means:[]};
			self.gameCount++;
		}
		
		self.addPlayer(element);
		self.addKills(element);
		self.addKillsMeans(element);
	});
	
	var str = JSON.stringify(self.listGames, undefined, 4);
	this.output(this.syntaxHighlight(str));
	
	//console.log(self.listGames);
	
	self.listKills = {};
	self.listKillsMeans = {};
	self.listPlayers = {};
	self.listGames = [];
	return games;	
},
output: function(inp) {
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
},

syntaxHighlight: function(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}}
}());