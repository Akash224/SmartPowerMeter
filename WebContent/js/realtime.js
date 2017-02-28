var subscribeTopic = "iot-2/cmd/cid/fmt/json";
var subscribeOptions = {qos:0}
var Realtime = function(deviceId1,deviceToken1,authToken1,isdevice) {

	// update your credentials here
	var orgId = "laavqj"; // your org ID
	var deviceType = "Power"; // your device Type
	var authToken;
	//var deviceId = "11111"; // Your device ID

	//var deviceToken = "ItsMyCar"; // Your device Token
	var deviceToken = deviceToken1;
	var deviceId = deviceId1;
	if(isdevice == 1){
		var clientId = "d:" + orgId + ":" + deviceType + ":" +deviceId;
		console.log("device : clientId: " + clientId);
		authToken = "use-token-auth";
	}
	if(isdevice == 0){
		var clientId = "a:" + orgId + ":" +deviceId;
		console.log("app : clientId: " + clientId);
		authToken = authToken1;
	}
	var hostname = orgId+".messaging.internetofthings.ibmcloud.com";
	var client;
	
	this.initialize = function(){

		client = new Messaging.Client(hostname, 8883,clientId);

		client.onMessageArrived = function(msg) {
			var topic = msg.destinationName;
			console.log("msg:::"+topic);
			processMessage(msg);
		};
		
		

		client.onConnectionLost = function(e){
			console.log("Connection Lost at " + Date.now() + " : " + e.errorCode + " : " + e.errorMessage);
			this.connect(connectOptions);
		}

		var connectOptions = new Object();
		connectOptions.keepAliveInterval = 3600;
		connectOptions.useSSL = true;
		connectOptions.userName = "use-token-auth";
		connectOptions.password = deviceToken;

		connectOptions.onSuccess = function() {
			console.log("MQTT connected to host: "+client.host+" port : "+client.port+" at " + Date.now());
			afterConnect();
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
		//client.subscribe(subscribeTopic,null);

	}
	
	this.subscribe = function(topic){
		client.subscribe(topic,{qos:0});
	}

	this.initialize();
}