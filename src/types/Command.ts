import { CommandArgs } from './CommandArgs';

export interface Command {
    name: string;
    triggers: string[];
    // eslint-disable-next-line no-unused-vars
    action: (_:CommandArgs) => any| void;
    description?: string;
    usage?: string;
}
