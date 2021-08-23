# GifBot
A simple Discord bot to show GIF's from Tenor, made with Discord.js.

# Usage
- `gif help`: Shows help info.
- `gif <string>`: Gets the top result from Tenor with the string, for example, type: `gif this is a test` or `gif discord`, and the bot will respond with the url of the GIF, and the Discord client will then automatically embed it.

# Installation

## Using my self-hosted version

1. Go to https://discord.com/api/oauth2/authorize?client_id=867011965988503562&permissions=2048&scope=bot
2. Add the bot to a server you have admin permissions on.
3. Enjoy!

## Hosting it yourself

### Prerequisites
1. Node.js, only tested on v14.17.3
2. NPM, only tested on v6.14.13
3. A Discord application with a bot and its token, [you can use this amazing tutorial by DigitalOcean.](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js)
4. A API key from https://tenor.com/gifapi

### Actual installation
1. Clone this repository.
2. Fill in your Discord bot token and your Tenor API key in config.json, and optionally add a activity status.
3. Install the required packages with `npm i`.
4. Run the bot with `node .`.
5. Add the bot to your server.
6. You're done!

# License
This project is licensed under [the MIT license](https://en.wikipedia.org/wiki/MIT_License), so you can use it wherever you want, as long as you credit me.
