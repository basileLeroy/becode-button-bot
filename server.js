// Require the necessary discord.js classes
const { Client, Intents, Guild } = require('discord.js');
const { token } = require('./config.json');
const { promotions } = require('./promotions');
const { buildMessage } = require('./generateMessage');
// import promotions from './promotions';

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
    allowedMentions: { parse: ['users', 'roles'] }
});
// Get the generateMessage
const composeMessage = (guilds) => {
    let thisGuild;
    let discordChannel;
    let role;

    guilds.map((guild, key) => {

        const channels = guild.channels.cache.map(channel => {
            promotions.forEach((promo, index) => {
                thisGuild = promo.guild_id;
                discordChannel = promo.channel_id;
                role = promo.role_id

                if (discordChannel === channel.id.toString()) {
                    const unfilteredMessage = buildMessage(role)
                    console.log(unfilteredMessage)
                }
            });
        })
    })
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log("READY!")
    const guilds = client.guilds.cache.map(guild => guild);
    console.log("------------------------")
    console.log("Start guild info")
    console.log("------------------------")
    composeMessage(guilds);
    console.log("------------------------")
    console.log("End Guild info")
    console.log("------------------------")

    const bruDateString = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Brussels"
    });
    const bruDate = new Date(bruDateString);
    const bruHours = bruDate.getHours() + ":" + bruDate.getMinutes();

    console.log(bruHours);
});

// Login to Discord with your client's token
client.login(token);