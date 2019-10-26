import { ISetType, REPLACE_SETS, VOCABULARY, RATINGS_TYPE, IParsedSetType } from './DATASETS';
import { Tensor } from './tfjs';

export class WordProcesor {

  public tensor: Tensor;

  public PARSED_SETS: [IParsedSetType, IParsedSetType, IParsedSetType] | IParsedSetType[] = [];

  protected SETS: ISetType[];
  protected VOCABULARY: string[] = VOCABULARY;

  public constructor(tf: Tensor, sets: ISetType[]) {
    this.tensor = tf;
    this.SETS = sets;

    this._replaceWords();
    this._replaceDicts();
    this._parseSets();
  }

  public _parse(text: string[]): number[] {
    return this.VOCABULARY.map(w => text.reduce((a, b) => b === w ? ++a : a, 0));
  }

  private _parseSets(): void {
    for (const set of this.SETS) {
      const endPatterns: number[][] = [];
      const ratings: RATINGS_TYPE[] = [];
      const rating: RATINGS_TYPE = set.ratings;

      for (const pattern of set.patterns) {
        const splitExample: string[] = pattern.replace(/[?,.!]/g, '').split(' ').map(i => i.toLowerCase());
        ratings.push(rating);
        endPatterns.push(this._parse(splitExample));
      }
      this.PARSED_SETS.push({ rating: rating, patterns: endPatterns, ratings: ratings, textRating: set.classification });
    }
  }

  private _replaceWords(): void {
    const KEYS = [...REPLACE_SETS.keys()];
    this.SETS = this.SETS.map(item => {
      const endPatterns: string[] = [];
      for (const sets of REPLACE_SETS) {
        for (const set of sets[1]) {
          for (const pattern of item.patterns) {
            const preped = pattern.replace(sets[0], set);
            if (endPatterns.includes(preped)) continue;
            endPatterns.push(preped);
          }
        }
      }
      return { ...item, patterns: endPatterns.filter(i => !KEYS.some(key => i.includes(key))) };
    });
  }

  private _replaceDicts(): void {
    const endDict: string[] = this.VOCABULARY;
    for (const item of this.VOCABULARY) {
      for (const sets of REPLACE_SETS) {
        for (const set of sets[1]) {
          const preped = item.replace(sets[0], set);
          if (endDict.includes(preped)) continue;
          endDict.push(preped);
        }
      }
    }
    this.VOCABULARY = endDict.filter(i => ![...REPLACE_SETS.keys()].includes(i));
  }

}
