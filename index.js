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

// Add additional roles as needed
const ROLES = ['User']; 
// Add additional channels as needed
const CHANNELS = ['general']; 
client.login(process.env.AUTHORIZATION_TOKEN);

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    interaction.reply("Pong!");
  } else if (commandName === 'clean-reactions') {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('You do not have permission to use this command.');
    }

    await interaction.deferReply();

    const channel = interaction.options.getChannel('channel');
    if (!CHANNELS.includes(channel.name)) {
      return interaction.followUp(`This command is not enabled for the ${channel.name} channel.`);
    }

    const messages = await channel.messages.fetch({ limit: 100 });

    for (const message of messages.values()) {
      await message.fetch();
      for (const reaction of message.reactions.cache.values()) {
        await reaction.users.fetch();
        for (const user of reaction.users.cache.values()) {
          if (!user.bot) {
            const member = await message.guild.members.fetch(user.id);
            if (ROLES.some(roleName => member.roles.cache.some(role => role.name === roleName))) {
              await reaction.users.remove(user.id);
            }
          }
        }
      }
    }

    interaction.followUp(`Reactions cleaned in ${channel.name}`);
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (CHANNELS.includes(reaction.message.channel.name) && !user.bot) {
    const member = await reaction.message.guild.members.fetch(user.id);
    if (ROLES.some(roleName => member.roles.cache.some(role => role.name === roleName))) {
      await reaction.users.remove(user.id);
    }
  }
});
