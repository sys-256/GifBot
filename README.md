# GifBot
A simple Discord bot to show GIF's from Tenor, made with Discord.js.

# Usage
- `gif help`: Shows help info.
- `gif <string>`: Gets the top result from Tenor with the string, for example, type: `gif this is a test` or `gif discord`, and the bot will respond with the url of the GIF, and Discord will automatically embed it.

# Installation

## Using my self-hosted version

Go to https://discord.com/api/oauth2/authorize?client_id=867011965988503562&permissions=2048&scope=bot, and add the bot to a server you have the required permissions on.

**Important update: I have decided to take the bot offline considering it was used very little. Hosting the bot yourself is now the only option if you plan on using GifBot.**

## Hosting it yourself

### Prerequisites
1. Node.js
2. NPM
3. A Discord application with a bot and its token, [you can use this tutorial by DigitalOcean.](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js)
4. An API key from https://tenor.com/gifapi

### Actual installation
1. Clone this repository
2. Copy `config.example.json` to `config.json` and fill in your Discord bot token, your Tenor API key in config.json, and optionally add a activity status
3. Install the required packages with `npm i`
4. Run the bot with `node .`
5. Add the bot to your server

# License
This project is licensed under [the MIT license](https://en.wikipedia.org/wiki/MIT_License).
