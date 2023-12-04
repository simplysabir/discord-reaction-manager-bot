
# Discord Reaction Manager Bot

A Discord bot designed to manage message reactions based on user roles and specific channels.

## Description
The Discord Reaction Manager Bot is a specialized tool created to enhance moderation and control within Discord servers. It offers automated management of reactions on messages, tailored to specific roles and channels, providing a more organized and controlled environment. 

## Features
- **Reaction Removal:** Automatically removes reactions from users with specified roles in designated channels.
- **Customizable Channels and Roles:** Flexible configuration to target specific channels and roles.
- **Command for Cleaning Reactions:** An admin-exclusive `/clean-reactions` command to clear reactions from past messages based on current user roles.
- **Scalability:** Supports multiple channels and roles, easily adaptable to different server setups.

## Installation and Setup

### Prerequisites
- Node.js
- A Discord account and a server to deploy the bot
- Basic knowledge of JavaScript and Discord bot creation

### Setting Up the Bot
1. **Clone the Repository:**
   ```
   git clone https://github.com/simplysabir/discord-reaction-manager-bot.git
   cd discord-reaction-manager-bot
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Setting up Discord Bot:**
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Create a new application and note down the `CLIENT_ID`.
   - Under the Bot section, create a new bot and copy the `AUTHORIZATION_TOKEN`.

4. **Configure the `.env` File:**
   Create a `.env` file in the root directory of the project and add the following:
   ```
   # Your Discord Bot's Authorization Token
   AUTHORIZATION_TOKEN=PASTE_YOUR_TOKEN_HERE
   CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE
   ```

5. **Running the Bot:**
   ```
   node index.js
   ```

## Setting up Channels and Roles
To configure the bot for specific channels and roles, update the `CHANNELS` and `ROLES` arrays in the `index.js` file with the names of the desired channels and roles.

## Contributions
Contributions to this project are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

For more information about my other projects and contributions, visit [GitHub](https://github.com/simplysabir) or [Portfolio](https://simplysabir.live/).
