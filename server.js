// Require the necessary discord.js classes

const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { promotions } = require('./promotions');
const { buildMessage } = require('./generateMessage');
// import promotions from './promotions';

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
    allowedMentions: { parse: ['users', 'roles'] }
});

// Get the messages
const getMessages = () => {
    // Get the promotions
    promotions.forEach((promo, index) => {
        const guild = promo.guild_id;
        const discordChannel = promo.channel_id;
        const role = promo.role_id

        const unfilteredMessage = buildMessage(promo.name);
        console.log(unfilteredMessage);
    });
}

getMessages();
// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});


// Login to Discord with your client's token
client.login(token);