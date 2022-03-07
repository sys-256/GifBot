// Import config file
import config from "./config.js";

// Required packages
import Discord from "discord.js";
const client = new Discord.Client({
    intents: [`GUILDS`, `GUILD_MESSAGES`,],
});
import fetch from "node-fetch"
import os from "os";
import os_utils from "node-os-utils";

// Format seconds function
function format(seconds) {
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor(seconds % (60 * 60) / 60);

    return `${hours} hour(s) and ${minutes} minute(s)`;
}

// Creates the get_gif_url function
async function get_gif_url(query) {
    // Fetches the gif url
    const gif_response = await fetch(`https://g.tenor.com/v1/search?q=${query}&key=${config.TENOR_API_KEY}&limit=1&media_filter=minimal`);
    // Converts it to json
    const gif_data = await gif_response.json();
    // Returns the url
    return gif_data.results[0].media[0].gif.url;
}

// Sets the user activity
client.on("ready", () => {
    const ACTIVITY = config.ACTIVITY || `${client.guilds.cache.size} servers with ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)} members!`;
    const ACTIVITY_TYPE = config.ACTIVITY_TYPE || "WATCHING";
    client.user.setActivity(ACTIVITY, { type: ACTIVITY_TYPE });
    console.log(`And we're up! I'm currently serving ${client.guilds.cache.size} servers with ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)} members!`);
});

// Executes when someone sends a message
client.on("messageCreate", async (message) => {
    // Make sure the user isn't a bot and that the message that's with the prefix
    if (message.author.bot || !message.content.toLowerCase().startsWith("gif ")) return;

    // Gets the command and args from the sent message
    const command = message.content.slice(4).split(" ")[0].toLowerCase();

    // If the text is "help", it will show the help message
    if (command === "help") {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Hello!`)
            .setDescription(`
Thanks for using this bot, to use it, just type 'gif <gif you want to search>'. Easy as that!

PS: [You can upvote me on Top.GG!](https://top.gg/bot/867011965988503562)`)

        message.reply({ embeds: [embed] });
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
        `);

        message.reply({ embeds: [embed] });
    }
    // Fetch the gif and send it
    else {
        message.channel.send(await get_gif_url(message.content.slice(4).split(" ")[0]));
    }
});

// Logs in
client.login(config.DISCORD_API_KEY);
