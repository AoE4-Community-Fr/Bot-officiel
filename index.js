const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.on("ready", () => {
    console.log("bot operatrionnel");  
})



client.on('threadCreate', post => {
    
    const ForumBO_Id = "1105065775703785623";
    if (post.parentId === ForumBO_Id && post.type === ChannelType.PublicThread)
    {
        const AnnounceChannel = client.channels.cache.get('1084514373038522428');
        AnnounceChannel.send("<@" + post.ownerId + "> vient de publier le build order : \n" + post.name + " dans <#" + post.parentId + ">");
    }
})

client.login(config.token);