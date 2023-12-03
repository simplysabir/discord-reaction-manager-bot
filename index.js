import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.AUTHORIZATION_TOKEN);

client.on("messageCreate", message => {
    if(message.author.bot) return;
    message.reply({
        content: "Hi From Bot",
    })
})