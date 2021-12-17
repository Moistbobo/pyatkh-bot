import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

const AppConfig = {
  token: process.env.BOT_TOKEN,
  commandPrefix: process.env.BOT_PREFIX,
  rareMetalChannelId: process.env.RARE_METAL_CH_ID,
};

export default AppConfig;
