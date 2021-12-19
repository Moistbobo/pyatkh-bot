import action from './action';
import { Command } from '../../types/Command';

const CheckResources: Command = {
  name: 'Check Resources',
  triggers: ['checkResources', 'cr'],
  description: 'Check resources for yourself. Mention a user or username to check resources for a user.',
  usage: '.checkResources - Checks resource for yourself.\n.cr @Pyatkh - Check resources for mentioned user.',
  action,
};

export default CheckResources;
