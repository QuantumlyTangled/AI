import { Client as KClient } from 'klasa';
import { Tensor } from '../NN/tfjs';

export default class Client extends KClient {

  // eslint-disable-next-line
  public tensor: Tensor = new Tensor('Test', this);

}
