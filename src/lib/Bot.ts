import Discord from 'discord.js';
import AppConfig from './AppConfig';
import Commands from '../commands';
import { Command } from '../types/Command';
import { CommandArgs } from '../types/CommandArgs';
import Mongodb from './Mongodb';

const runBot = (token: string|undefined) => {
  if (!token) {
    console.log('Bot Token is undefined');
    return;
  }

  const onMessage = (msg: Discord.Message) => {
    const { commandPrefix } = AppConfig;

    if (!commandPrefix) {
      console.error('Please enter a bot prefix in the .env file');
      return;
    }

    const userCommand = msg.content.split(' ')[0].toLowerCase().replace(commandPrefix, '').trim();

    const commandToRun:Command | undefined = Commands.find((command) => {
      if (command.name.toLowerCase() === userCommand
                || command.triggers.includes(userCommand)) {
        return command;
      }

      return null;
    });

    const commandArgs: CommandArgs = {
      msg,
    };

    if (commandToRun) {
      commandToRun.action(commandArgs);
    }
  };

  const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_TYPING', 'GUILD_MESSAGE_REACTIONS'] });

  client.on('message', onMessage);

  client.login(token)
    .then(() => {
      Mongodb.connect();
      console.log('Bot logged in');
      console.log('Commands: \n', Commands.map((command) => command.name));
    })
    .catch((err: Error) => {
      console.log('Failed to login\n', err.message);
    });
};

export default {
  runBot,
};
