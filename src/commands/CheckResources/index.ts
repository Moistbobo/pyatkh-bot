import action from './action';
import { Command } from '../../types/Command';

const CheckResources: Command = {
  name: 'Check Resources',
  triggers: ['check', 'checkResources', 'c', 'cs'],
  description: 'Check resources for yourself. Mention a user or username to check resources for a user.',
  usage: '.c\n.cs @Pyatkh',
  action,
};

export default CheckResources;
