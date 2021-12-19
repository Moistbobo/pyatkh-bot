import dayjs from 'dayjs';
import { MessageEmbed } from 'discord.js';
import { CommandArgs } from '../../types/CommandArgs';
import ResourceLog from '../../db/ResourceLog';

const action = async (args: CommandArgs) => {
  const { msg, msg: { content } } = args;

  // Clean command from message content
  const cleanedContent = content.split(' ').slice(1).join(' ').trim();

  if (cleanedContent.split(' ').length > 2 || Number.isNaN(cleanedContent)) return;

  const searchTime = dayjs().subtract(Number(cleanedContent), 'hours').toISOString();

  const rmLogs = cleanedContent ? await ResourceLog.find({ updatedAt: { $gte: searchTime } }) : await ResourceLog.find({});

  if (rmLogs.length === 0) {
    await msg.reply({
      allowedMentions: { parse: [] },
      content: `There are no logs that have been updated within the last ${cleanedContent} hours.`,
    });
  } else {
    // @ts-ignore
    const totals = rmLogs.reduce((a, { scrapCount, rmCount }) => ({
      scrapCount: a.scrapCount + scrapCount,
      rmCount: a.rmCount + rmCount,
    }));

    const embed = new MessageEmbed()
      .setTitle('Sum of Resources')
      .setDescription(cleanedContent ? `Updated within the last ${cleanedContent} hours` : '')
      .addField(
        'Total Scrap Iron',
        totals.scrapCount.toString(),
        true,
      )
      .addField(
        'Total Rare Metals',
        totals.rmCount.toString(),
        true,
      );

    await msg.reply({
      allowedMentions: { parse: [] },
      embeds: [embed],
    });
  }
};

export default action;
