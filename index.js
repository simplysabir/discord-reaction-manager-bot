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
    });
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    interaction.reply("Pong!");
  } else if (commandName === 'clean-reactions') {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to use this command.');
    }

    const channel = interaction.options.getChannel('channel');
    const messages = await channel.messages.fetch({ limit: 100 });

    for (const message of messages.values()) {
      for (const reaction of message.reactions.cache.values()) {
        await reaction.users.fetch();
        for (const user of reaction.users.cache.values()) {
          if (!user.bot) {
            const member = await reaction.message.guild.members.fetch(user.id);
            if (member.roles.cache.some(role => role.name === 'YourRoleName')) {
              await reaction.users.remove(user.id);
            }
          }
        }
      }
    }
    interaction.reply(`Reactions cleaned in ${channel.name}`);
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.channel.name === 'general') {
    const member = await reaction.message.guild.members.fetch(user.id);
    if (member.roles.cache.some(role => role.name === 'User')) {
      await reaction.users.remove(user.id);
    }
  }
});

