import { CommandArgs } from '../../types/CommandArgs';
import RegexUtils from '../../lib/RegexUtils';
import AmmoUsage from '../../db/AmmoUsage';

const a120mmRegex = /120mm:\s*\d+/;

const action = async (args: CommandArgs) => {
  const { msg, msg: { content } } = args;

  const userId = msg.author.id;

  const { username, discriminator } = msg.author;

  if (a120mmRegex.test(content)) {
    const extractedRmRegex = content.match(a120mmRegex);

    if (extractedRmRegex) {
      try {
        const [_value] = extractedRmRegex;

        const num120mm = RegexUtils.extractNumberFromRegexResult(_value);

        const ammoUsage = await AmmoUsage.findOne({ userId }) || new AmmoUsage({ userId });

        ammoUsage.a120mmCount += Number(num120mm);
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
