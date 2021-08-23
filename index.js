const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require("./config.json");

// Creates the get_gif_url function
async function get_gif_url(url) {
    // Fetches the gif url
    const gif_response = await fetch(url);
    // Converts it to json
    const gif_data = await gif_response.json();
    // Gets the url out of the data
    const gif_url = gif_data.results[0].media[0].gif.url;
    // Returns the url
    return gif_url;
}

// Logs in
const client = new Discord.Client();
client.login(config.DISCORD_API_KEY);

// Sets the prefix
const prefix = "gif ";

// Sets the user activity
client.on("ready", () => {
    const ACTIVITY = config.ACTIVITY || client.guilds.cache.size + " servers!";
    const ACTIVITY_TYPE = config.ACTIVITY_TYPE || "WATCHING";
    client.user.setActivity(ACTIVITY, { type: ACTIVITY_TYPE })
});

// Executes when someone sends a message
client.on("message", async (message) => {
    // Makes sure the user isn't a bot
    if (message.author.bot) return;
    // Makes sure the message starts with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Gets the command and args from the sended message
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // If the text is "help", it will show the help message
    if (command == "help") {
        const embed = new Discord.MessageEmbed().setDescription(`Hi there!
Thanks for using this bot, to use it, just type 'gif <gif you want to search>'.
For example: 'gif this bot is the best!', and it will reply with the highest ranked gif about 'this bot is the best!' on Tenor.\n
Success!
PS: Type 'gif how-many-servers' to see in how many servers I am!
PSS: [You can upvote me on Top.GG!](https://top.gg/bot/867011965988503562)`)

        message.reply(embed);
    }
    // If the command is not "help", it will fetch the gif and execute it
    else {
        message.channel.send(
            await get_gif_url("https://g.tenor.com/v1/search?q=" + commandBody + "&key=" + config.TENOR_API_KEY + "&limit=1&media_filter=minimal")
        );
    }
});
