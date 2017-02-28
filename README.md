This project uses JS MQTT Paho client for connecting the IOT broker.
The front pages and scripts can be found in WebContent folder.

index.html: Prompts device and Authentication to connect a simulated device to IOTF

NewSensor.html: Simulated room where appliances are connected to IOTF

PortalIndex.html: Prompts user Portal Id and authentication

UserPortal.html: Displays the portal to the user

PowerCompany.html:Displays the SCADA potal of a power company

To run this application

1) Simulate a connected House: http://sensorappliance.mybluemix.net/ 
Device: User1, Auth: PowerMeter1

2) Change the device status as you wish.

3) Access the portal: http://sensorappliance.mybluemix.net/Portalindex.html
user : Portal1, Auth:UserPortal1

4) Visualize the current status and remotely access the devices through portal

5)Power Company :http://sensorappliance.mybluemix.net/PowerCompany.html

6) Flow configurations can be found at http://smartpower.mybluemix.net/
