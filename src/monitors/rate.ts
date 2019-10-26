import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import Client from '../lib/structures/Client';

export default class extends Monitor {

  public constructor(client: Client, store: MonitorStore, file: string[], directory: string) {
    super(client, store, file, directory, { ignoreOthers: false });
  }

  // @ts-ignore
  public async run(message: KlasaMessage): void {
    if (!this.client.tensor.FITTED) return null;
    const result1 = await this.client.tensor.test(message.content);
    const result = result1[0].type;
    if (result === 'neutral') return message.react('❓');
    if (result === 'positive') return message.react('👍');
    if (result === 'negative') return message.react('👎');
  }
}
