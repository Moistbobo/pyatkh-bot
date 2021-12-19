import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CommandArgs } from '../../types/CommandArgs';
import AppConfig from '../../lib/AppConfig';

dayjs.extend(utc);

const action = async (args: CommandArgs) => {
  const { msg, msg: { content } } = args;

  const cleanedContent = content.split(' ').slice(1).join(' ').trim()
    .replace(AppConfig.commandPrefix as string, '');

  const [question, ...rest] = cleanedContent.trim().split(';');

  if (!question) {
    return msg.reply({
      allowedMentions: { parse: [] },
      content: 'A census needs a question.',
    });
  }

  if (rest.length < 2) {
    return msg.reply({
      allowedMentions: { parse: [] },
      content: 'A census needs more than 1 choice.',
    });
  }

  const pollResponse = await axios.post(
    'https://strawpoll.com/api/poll',
    {
      poll: {
        title: question,
        answers: rest,
        priv: false,
        deadline: dayjs().add(24, 'hours').utc(),
      },
    },
    {
      headers: {
        'API-KEY': AppConfig.strawpollAPIKey as string,
      },
    },
  );

  if (pollResponse.status === 200) {
    return msg.reply({
      allowedMentions: { parse: [] },
      content: `https://strawpoll.com/${pollResponse.data.content_id}`,
    });
  }
  return msg.reply({
    allowedMentions: { parse: [] },
    content: 'BETA intercepted the census space shuttle. (Error Creating poll)',
  });
};

export default action;
