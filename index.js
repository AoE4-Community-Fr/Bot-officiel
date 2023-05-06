const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.on("ready", () => {
    console.log("bot operatrionnel");  
})

client.login("MTEwNDQxMTgyMjQxNDYzMDkzMg.GlaulK.sRZ3guK7IK_sTeOVV8b98yGntb0-NfgL6yGuXQ");