import Discord from 'discord.js';
import AppConfig from './AppConfig';
import Commands from '../commands';
import { Command } from '../types/Command';
import { CommandArgs } from '../types/CommandArgs';
import Mongodb from './Mongodb';
import SaveRMAction from '../commands/SaveRM/action';
import SaveScrapAction from '../commands/SaveScrap/action';

const runBot = (token: string|undefined) => {
  if (!token) {
    console.log('Bot Token is undefined');
    return;
  }

  const onMessage = async (msg: Discord.Message) => {
    if (msg.author.bot) return;

    const { commandPrefix } = AppConfig;

    const commandArgs: CommandArgs = {
      msg,
    };

    if (msg.channelId === AppConfig.rareMetalChannelId) {
      await SaveRMAction(commandArgs);
      await SaveScrapAction(commandArgs);
      return;
    }

    if (!commandPrefix) {
      console.error('Please enter a bot prefix in the .env file');
      return;
    }

    const userCommand = msg.content.split(' ')[0].toLowerCase().replace(commandPrefix, '').trim();

    const commandToRun:Command | undefined = Commands.find((command: Command) => {
      if (command.name.toLowerCase() === userCommand
                || command.triggers.includes(userCommand)) {
        return command;
      }

      return null;
    });

    if (commandToRun) {
      (commandToRun as Command).action(commandArgs);
    }
  };

  const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_TYPING', 'GUILD_MESSAGE_REACTIONS'] });

  client.on('message', onMessage);

  client.login(token)
    .then(() => {
      Mongodb.connect();
      console.log('Bot logged in');
      console.log('Commands: \n', Commands.map((command: Command) => command.name));
    })
    .catch((err: Error) => {
      console.log('Failed to login\n', err.message);
    });
};

export default {
  runBot,
};
