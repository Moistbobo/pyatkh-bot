import action from './action';
import { Command } from '../../types/Command';

const CheckTotalResources: Command = {
  name: 'Check Total Resources',
  triggers: ['checkTotal', 'checkTotalResources', 'ct', 'ctr'],
  description: 'Check total resources for all players. Specify an hour value to only include values from people who have updated within the given hours.',
  usage: '.ct\n.ctr 80 - Calculates total resources of all people who have updated within 80 hours.',
  action,
};

export default CheckTotalResources;
