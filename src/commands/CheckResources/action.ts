import Discord, { MessageEmbed } from 'discord.js';
import { CommandArgs } from '../../types/CommandArgs';
import ResourceLog from '../../db/ResourceLog';
import Factories from '../../lib/Factories';

const action = async (args: CommandArgs) => {
  const { msg, msg: { mentions, author } } = args;

  // Ignore @everyone and @here mentions
  if (mentions.everyone) return;

  // Ignore bot mentions
  if (mentions.users.first()?.bot) return;

  const resourceUser: Discord.User = mentions.users.first() || author;

  const rmLog = await ResourceLog.findOne({ userId: resourceUser.id }) || new ResourceLog(Factories.createNewRmLogFromUser(resourceUser));

  const message = new MessageEmbed()
    .setTitle(`Resources for ${resourceUser.username}`)
    .setThumbnail(resourceUser.avatarURL() || resourceUser.defaultAvatarURL)
    .addField('Scrap Iron', rmLog.scrapCount.toString(), true)
    .addField('Rare Metals', rmLog.rmCount.toString(), true);

  await rmLog.save();

  await msg.reply({
    allowedMentions: { parse: [] },
    embeds: [message],
  });
};

export default action;
