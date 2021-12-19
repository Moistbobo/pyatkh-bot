import { CommandArgs } from '../../types/CommandArgs';
import RegexUtils from '../../lib/RegexUtils';
import AmmoUsage from '../../db/AmmoUsage';

const a36mmRegex = /36mm:\s*\d+/;

const action = async (args: CommandArgs) => {
  const { msg, msg: { content } } = args;

  const userId = msg.author.id;

  const { username, discriminator } = msg.author;

  if (a36mmRegex.test(content)) {
    const extractedRmRegex = content.match(a36mmRegex);

    if (extractedRmRegex) {
      try {
        const [_value] = extractedRmRegex;

        const num36mm = RegexUtils.extractNumberFromRegexResult(_value);

        const ammoUsage = await AmmoUsage.findOne({ userId }) || new AmmoUsage({ userId });

        ammoUsage.a36mmCount += Number(num36mm);
        ammoUsage.username = username;
        ammoUsage.discriminator = discriminator;

        await ammoUsage.save();

        await msg.react('✅');
      } catch (err) {
        console.log(err);

        await msg.react('❌');
      }
    }
  }
};

export default action;
