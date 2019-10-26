declare module 'mimir' {
  export function tokenize(text: string): string[];
  export function dict(textArray: string[]): DictionaryReturn;
  export function bow(text: string, vocabulary: DictionaryReturn): number[];
  export function tfidf(word: string, text: string, textlist: string[]): number;

  export type DictionaryReturn = {
    words: string[];
    dict: DictionaryWords;
  };
  export type DictionaryWords = { [K: string]: number };
}
