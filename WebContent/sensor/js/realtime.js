var subscribeTopic = "";

var Realtime = function(deviceId1,deviceToken1,authMethod1,device) {

	// update your credentials here
	var orgId = "laavqj"; // your org ID
	var deviceType = "Power"; // your device Type
	
	//var deviceId = "11111"; // Your device ID

	//var deviceToken = "ItsMyCar"; // Your device Token
	var deviceToken = deviceToken1;
	var deviceId = deviceId1;
	var clientId = null;
	var authMethod = null;
	console.log(device);
	if(Number(device) == 1){
		clientId =	"d:" + orgId + ":" + deviceType + ":" +deviceId;
		authMethod = "use-token-auth";
		console.log("clientId: " + clientId);
	}
	if(Number(device) == 0){
		clientId = "a:" + orgId + ":" + deviceId;
		authMethod = authMethod1;
		console.log("clientId: " + clientId);
	}
	console.log("clientId: " + clientId);
	var hostname = orgId+".messaging.internetofthings.ibmcloud.com";
	var client;
	
	this.initialize = function(){

		client = new Messaging.Client(hostname, 8883,clientId);
		
		client.onMessageArrived = function(msg) {
			var topic = msg.destinationName;
			console.log("msg:::"+msg.payloadString);
			processmsg(msg);
		};

		client.onConnectionLost = function(e){
			console.log("Connection Lost at " + Date.now() + " : " + e.errorCode + " : " + e.errorMessage);
			this.connect(connectOptions);
		}

		var connectOptions = new Object();
		connectOptions.keepAliveInterval = 3600;
		connectOptions.useSSL = true;
		connectOptions.userName = authMethod;
		connectOptions.password = deviceToken;

		connectOptions.onSuccess = function() {
			console.log("MQTT connected to host: "+client.host+" port : "+client.port+" at " + Date.now());
			afterConnection();
		}

		connectOptions.onFailure = function(e) {
			console.log("MQTT connection failed at " + Date.now() + "\nerror: " + e.errorCode + " : " + e.errorMessage);
		}

		console.log("about to connect to " + client.host);
		client.connect(connectOptions);
		
	}

	this.publish = function(data, eventType) {

		var dataString = JSON.stringify(data);

		var publishTopic = "iot-2/evt/"+ eventType +"/fmt/json";

		console.log("about to publish to " + publishTopic);

		var message = new Messaging.Message(dataString);

		message.destinationName = publishTopic;

		console.log("Message :: " + dataString);

		client.send(message);
		
	}
	
	this.subscribe = function(topic){
		client.subscribe(topic,{qos:2});
	}

	this.initialize();
}