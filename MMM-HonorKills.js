Module.register("MMM-HonorKills",{

    defaults:{
        refreshIntrval:18000000, // Default 18000000 = 5 hours
    },


    start: function() {		
    Log.info("Starting module: " + this.name);
    this.hk = "";
    this.getHK();
    self = this;
        setInterval(function(){
            self.getHK();
        },18000000);
},        

getScripts: function() {
    return [];
},

getStyles: function() {
    return ["MMM-HonorKills.css"];
},

getHK: function(){  
    Log.info("Sending notif");
    this.sendSocketNotification("GET_HK",{config: this.config})
},

socketNotificationReceived: function(notification, payload) {
    if (notification === "HK") {
        this.hk = payload.img;
        this.updateDom(1000);
    }
},

notificationReceived: function(notification, payload, sender) {
},


getDom: function() {
    var self = this;
    var wrapper = document.createElement("div");
    wrapper.classname = "honorkills_wrapper"
    var textDiv = document.createElement("div");
    textDiv.className = "textDiv";
    textDiv.innerHTML += this.hk;
    wrapper.appendChild(textDiv);
    return wrapper;
},



 



});
