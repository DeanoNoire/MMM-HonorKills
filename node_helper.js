var request = require('request');
var NodeHelper = require("node_helper");
var cheerio = require("cheerio");

module.exports = NodeHelper.create({
	
	start: function() {
		console.log("Starting node helper: " + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
        var self = this;
		if(notification === "GET_HK") {
			
			var url = 'http://armory.twinstar.cz/character-statistics.xml?r=Apollo&n=Lafoq&c=128';
			
			request(url, function (error, response, body) {
                var $ = cheerio.load(body);
                
				var src = $(".zebra").text();
				var src2 = src.replace("Total kills that grant experience or honor","")
				var src3 = parseInt(src2,10)
				nfObject = new Intl.NumberFormat('en-US'); 
            	src4 = nfObject.format(src3); 
				console.log(src4);

				self.sendSocketNotification("HK", {
					img : src4
				});
			});
			return;
		}
	},
});