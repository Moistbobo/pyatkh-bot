import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

const AppConfig = {
  token: process.env.BOT_TOKEN,
  commandPrefix: process.env.BOT_PREFIX,
  rareMetalChannelId: (process.env.RARE_METAL_CH_ID as string).split(','),
  strawpollAPIKey: process.env.STRAWPOLL_API_KEY,
};

export default AppConfig;
