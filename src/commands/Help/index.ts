import action from './action';
import { Command } from '../../types/Command';

const Help: Command = {
  name: 'Help',
  triggers: ['help', 'h'],
  description: 'Get usage instructions for a specific command',
  usage: '.help ct\n.help check total resources',
  action,
};

export default Help;
