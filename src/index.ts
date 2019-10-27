
import '@tensorflow/tfjs-node';

import { OPTIONS_CONSTANTS } from './OPTIONS';
import { Tensor } from './lib/NN/tfjs';

const tensor = new Tensor('Test', OPTIONS_CONSTANTS.epoch);

tensor.fit().then(console.log.bind(this));
