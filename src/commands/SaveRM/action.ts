import { CommandArgs } from '../../types/CommandArgs';
import ResourceLog from '../../db/ResourceLog';
import RegexUtils from '../../lib/RegexUtils';

const rmRegex = /rm:\s*\d+/;

const action = async (args: CommandArgs) => {
  const { msg, msg: { content } } = args;

  const userId = msg.author.id;

  const { username, discriminator } = msg.author;

  if (rmRegex.test(content)) {
    const extractedRmRegex = content.match(rmRegex);

    if (extractedRmRegex) {
      try {
        const [_value] = extractedRmRegex;

        const numRm = RegexUtils.extractNumberFromRegexResult(_value);

        const rmLog = await ResourceLog.findOne({ userId }) || new ResourceLog({ userId });

        rmLog.rmCount = Number(numRm);
        rmLog.username = username;
        rmLog.discriminator = discriminator;

        await rmLog.save();

        await msg.react('✅');
      } catch (err) {
        console.log(err);

        await msg.react('❌');
      }
    }
  }
};

export default action;
