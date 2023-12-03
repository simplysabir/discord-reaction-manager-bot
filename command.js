import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: 'clean-reactions',
    description: 'Cleans up reactions in a specific channel based on user roles',
    defaultPermission: false, // This command is restricted to certain roles
    options: [
      {
        type: 7, // Channel type
        name: 'channel',
        description: 'The channel to clean reactions from',
        required: true
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.AUTHORIZATION_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
