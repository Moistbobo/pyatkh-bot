import Discord from 'discord.js';
import ResourceLog from '../db/ResourceLog';

// eslint-disable-next-line max-len
const createNewRmLogFromUser = (author: Discord.User) => new ResourceLog({ userId: author.id, discriminator: author.discriminator, username: author.username });

export default { createNewRmLogFromUser };
