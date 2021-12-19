import { MessageEmbed } from 'discord.js';
import { CommandArgs } from '../../types/CommandArgs';
import Commands from '../index';
import AppConfig from '../../lib/AppConfig';

const action = async (args: CommandArgs) => {
  const { msg, msg: { content } } = args;

  // Clean command from message content
  const cleanedContent = content.split(' ').slice(1).join(' ').trim()
    .replace(AppConfig.commandPrefix as string, '');

  if (!cleanedContent) return;

  const lowerCasedContent = cleanedContent.toLowerCase();

  const command = Commands.find((x) => (x.name === lowerCasedContent || x.triggers.includes(lowerCasedContent)));

  if (!command) return;

  const embed = new MessageEmbed()
    .setTitle(command.name)
    .setDescription(`**Description**\n${command.description}\n\n**Usage:**\n${command.usage}`);

  await msg.reply({
    allowedMentions: { parse: [] },
    embeds: [embed],
  });
};

export default action;
