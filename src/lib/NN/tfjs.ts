import { Sequential, layers, Tensor as TFTensor, History } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import { WordProcesor } from './WordProcesor';
import { SETS, RATINGS_TYPE } from './DATASETS';
export class Tensor {

  /**
   * The tfjs Sequential model
   */
  public model: Sequential;
  public procesor: WordProcesor;

  public FITTED: boolean = false;

  private PREPARED: boolean = false;
  private COMPILED: boolean = false;

  private X_TENSOR!: TFTensor;
  private Y_TENSOR!: TFTensor;
  private FIT!: History;

  public constructor(name: string, public epoch: number = 5000) {
    this.model = new Sequential({ name: name });
    this.procesor = new WordProcesor(this, SETS);

    this._prepareModel();
    this._compile();
  }

  public async test(text: string): Promise<({ type: string; chance: number }[]) | null> {
    if (!this.FITTED) return null;
    const strArr: string[] = text.replace(/[?,.!]/g, '').split(/[ -]/g).map(i => i.toLowerCase());
    const tens: TFTensor = tf.tensor([this.procesor._parse(strArr)]);
    const data: Float32Array = await ((await this.model.predict(tens)) as TFTensor).toFloat().data<'float32'>();
    const arr: { type: string; chance: number }[] = [];
    arr.push({ type: 'positive', chance: data[0] });
    arr.push({ type: 'negative', chance: data[1] });
    arr.push({ type: 'neutral', chance: data[2] });
    arr.sort((a, b) => b.chance - a.chance);
    return arr;
  }

  public async fit(): Promise<History> {
    if (this.FITTED) return this.FIT;
    this.FIT = await this.model.fit(this.X_TENSOR, this.Y_TENSOR, {
      epochs: this.epoch,
      callbacks: {
        onEpochEnd: async (epoch: number, log: any) => {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`);
        }
      }
    });
    this.FITTED = true;
    return this.FIT;
  }

  private _prepareModel(): this {
    if (this.PREPARED || this.COMPILED) return this;
    const x = this._formX();
    const y = this._formY();
    this.model.add(layers.dense({ units: 256, activation: 'relu', inputShape: [x.arr[0].length] }));
    this.model.add(layers.dense({ units: 128, activation: 'relu' }));
    this.model.add(layers.dense({ units: y.arr[0].length, activation: 'softmax' }));
    this.PREPARED = true;
    return this;
  }

  private _compile(): this {
    if (!this.PREPARED) return this;
    if (this.COMPILED) return this;
    this.model.compile({ optimizer: 'sgd', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
    this.COMPILED = true;
    return this;
  }

  private _formX(): { arr: number[][]; tensor: TFTensor } {
    const x1: number[][] = this.procesor.PARSED_SETS[0].patterns;
    const x2: number[][] = this.procesor.PARSED_SETS[1].patterns;
    const x3: number[][] = this.procesor.PARSED_SETS[2].patterns;
    const arr: number[][] = [].concat(x1 as unknown as ConcatArray<never>).concat(x2 as unknown as ConcatArray<never>).concat(x3 as unknown as ConcatArray<never>);
    this.X_TENSOR = tf.tensor(arr);
    return { arr: arr, tensor: this.X_TENSOR };
  }

  private _formY(): { arr: number[][]; tensor: TFTensor } {
    const y1: RATINGS_TYPE[] = this.procesor.PARSED_SETS[0].ratings;
    const y2: RATINGS_TYPE[] = this.procesor.PARSED_SETS[1].ratings;
    const y3: RATINGS_TYPE[] = this.procesor.PARSED_SETS[2].ratings;
    const arr: RATINGS_TYPE[] = [].concat(y1 as unknown as ConcatArray<never>).concat(y2 as unknown as ConcatArray<never>).concat(y3 as unknown as ConcatArray<never>);
    this.Y_TENSOR = tf.tensor(arr);
    return { arr: arr, tensor: this.Y_TENSOR };
  }

}
