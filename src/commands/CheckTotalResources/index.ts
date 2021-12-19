import action from './action';
import { Command } from '../../types/Command';

const CheckTotalResources: Command = {
  name: 'Check Total Resources',
  triggers: ['checkTotalResources', 'ctr'],
  description: 'Check total resources for all players. Specify an hour value to only include values from people who have updated within the given hours.',
  usage: '.checkTotalResources - Check total resources of all submitted resource logs.\n.ctr 80 - Calculates total resources of all logs that have been updated in the last 80 hours.',
  action,
};

export default CheckTotalResources;
