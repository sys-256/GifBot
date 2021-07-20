//required packages
const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require("./config.json");

//makes the get_gif_url function
async function get_gif_url(url)
{
    //fetches the gif url
    var gif_response = await fetch(url);
    //converts it to json
    var gif_data = await gif_response.json();
    //gets the url out of the data
    var gif_url = gif_data.results[0].media[0].gif.url;
    //returns the url
    return gif_url;
}

//logs in
const client = new Discord.Client();
client.login(config.DISCORD_API_KEY);

//sets the prefix
const prefix = "gif ";

//executes when someone sends a message
client.on("message", async function(message)
{
    //makes sure the user isn't a bot
    if (message.author.bot)
    {
        return;
    }
    //makes sure the message starts with the prefix
    if (!message.content.startsWith(prefix))
    {
        return;
    }

    //gets the command and args from the sended message
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //if the text is "help", it will show the help message
    if (command == "help")
    {
        message.reply("Hi there!\nThanks for using this bot, to use it, just type 'gif <gif you want to search>'.\nFor example: 'gif this bot is the best!', and it will reply with the highest ranked gif about 'this bot is the best!' on Tenor.\n\nSuccess!");
    }
    //if the command is not "help", it will fetch the gif and execute it
    else
    {
        message.channel.send(await get_gif_url("https://g.tenor.com/v1/search?q=" + commandBody + "&key=" + config.TENOR_API_KEY + "&limit=1&media_filter=minimal"));
    }
});