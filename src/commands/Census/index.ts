import action from './action';
import { Command } from '../../types/Command';

const Census: Command = {
  name: 'Census',
  triggers: ['census'],
  description: 'Create a census on strawpoll. Census expire in 24 hours.',
  usage: '.census Question;choice1;choice2;choice3',
  action,
};

export default Census;
