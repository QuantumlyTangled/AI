import { Client, BOT_OPTIONS_CONSTANTS } from './index';

export const client: Client = new Client({
  prefix: 'q.'
});

client.login(BOT_OPTIONS_CONSTANTS.token);
