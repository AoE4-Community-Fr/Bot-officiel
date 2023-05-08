const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.on("ready", () => {
    console.log("bot operatrionnel");  
})

client.login(config.token);