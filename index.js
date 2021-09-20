// Import config file
const config = require("./config.json");

// Required packages
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const os = require("os");
const os_utils = require("node-os-utils");

// Format seconds function
function format(seconds) {
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor(seconds % (60 * 60) / 60);

    return `${hours} hour(s) and ${minutes} minute(s)`;
}

// Creates the get_gif_url function
async function get_gif_url(query) {
    try {
        // Fetches the gif url
        const gif_response = await fetch(`https://g.tenor.com/v1/search?q=${query}&key=${config.TENOR_API_KEY}&limit=1&media_filter=minimal`);
        // Converts it to json
        const gif_data = await gif_response.json();
        // Returns the url
        return gif_data.results[0].media[0].gif.url;
    }
    catch { }
}

// Sets the user activity
client.on("ready", () => {
    const ACTIVITY = config.ACTIVITY || `${client.guilds.cache.size} servers with ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)} members!`;
    const ACTIVITY_TYPE = config.ACTIVITY_TYPE || "WATCHING";
    client.user.setActivity(ACTIVITY, { type: ACTIVITY_TYPE });
    console.log(`And we're up! I'm currently serving ${client.guilds.cache.size} servers with ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)} members!`);
});

// Executes when someone sends a message
client.on("message", async (message) => {
    // Makes sure the user isn't a bot
    if (message.author.bot) return;
    // Makes sure the message starts with the prefix
    if (!message.content.toLowerCase().startsWith("gif ")) return;

    // Gets the command and args from the sended message
    const commandBody = message.content.slice(4);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    // If the text is "help", it will show the help message
    if (command === "help") {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Hello!`)
        .setDescription(`
Thanks for using this bot, to use it, just type 'gif <gif you want to search>'. Easy as that!

PS: [You can upvote me on Top.GG!](https://top.gg/bot/867011965988503562)`)

        message.reply(embed);
    }
    // If the text is "stats", it will show the stats message
    else if (command === "stats") {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Stats:`)
        .setDescription(`
Version: 1.2
Invite: [click here](https://discord.com/api/oauth2/authorize?client_id=867011965988503562&permissions=2048&scope=bot)

Total servers: ${client.guilds.cache.size}
Total users: ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}

CPU usage: ${await os_utils.cpu.usage()}%
RAM usage: ${Math.round((os.totalmem() - os.freemem()) / 1000000)}MB

Process uptime: ${format(process.uptime())}
Server uptime: ${format(os.uptime())}
        `)
        message.reply(embed)
    }
    // If the command is not "help", it will fetch the gif and send it
    else {
        message.channel.send(await get_gif_url(commandBody));
    }
});

// Logs in
client.login(config.DISCORD_API_KEY);
