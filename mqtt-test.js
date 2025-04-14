const mqtt = require('mqtt');

// Create a client with explicit clean session and clientId
const client = mqtt.connect('mqtt://test.mosquitto.org', {
  clientId: `mqtt_test_${Math.random().toString(16).substring(2, 10)}`,
  clean: true
});

const topic = '/seniorDesign/s2c';
const message = 'F0'; // Food command

console.log(`Attempting to connect to MQTT broker and publish to ${topic}...`);

client.on('connect', function () {
  console.log('Connected to MQTT broker');
  
  // First, clear any retained messages
  client.publish(topic, '', { qos: 1, retain: true }, function(err) {
    if (!err) {
      console.log('Cleared retained messages');
    }
    
    // Now publish our command
    client.publish(topic, message, { qos: 1, retain: false }, function(err) {
      if (err) {
        console.error('Failed to publish message:', err);
      } else {
        console.log(`Successfully published "${message}" to ${topic}`);
      }
      
      // Close the connection
      setTimeout(() => {
        client.end();
        console.log('Connection closed');
      }, 1000);
    });
  });
});

client.on('error', function(err) {
  console.error('MQTT Error:', err);
  client.end();
});

client.on('offline', function() {
  console.log('Client went offline');
});