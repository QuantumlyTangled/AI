import { Collection } from 'discord.js';

export const RATINGS = Object.freeze({
  POSITIVE: [1, 0, 0],
  NEGATIVE: [0, 1, 0],
  NEUTRAL: [0, 0, 1]
});

export const SETS: [ ISetType, ISetType, ISetType ] = [
  {
    patterns:
    [
      '%GAME% is a great game', '%GAME% rocks', 'i love %GAME%', '%GAME% is the best', 'Its a good game and very well optimized', 'solid chill game',
      '%GAME% is smooth', 'smooth gameplay', 'i like %GAME%', 'i like it', 'its a nice game', '%GAME% is nice', 'new update is smoother',
      'new update is nice', 'i think %GAME% rocks', 'i think %GAME% is good but it could be better', '%GAME% is my favorite game',
      'the %GAME% update is great', 'i think the new %GAME% update is awesome', 'i think the new %GAME% update is good'
    ],
    classification: 'positive',
    ratings: RATINGS.POSITIVE as RATINGS_TYPE
  },
  {
    patterns:
    [
      'i hate the game', 'i hate %GAME%', '%GAME% is fucking terrible', '%GAME% sucks', 'fuck %GAME%', '%GAME% is dead', '%GAME% is bare',
      '%GAME% is a mess', '%GAME% is lagging', 'lag', 'the game is lagging', 'its slow', '%GAME% is running slow', '%GAME% is chunky',
      '%GAME% is crap', '%GAME% is shit', '%GAME% is fucked', '%GAME% is a fucking mess', '%GAME% should burn', '%GAME% is burning',
      '%GAME% is a crappy game', 'fuck this game', 'server is lagging', 'server lag', 'servers are lagging', 'new update sucks',
      'the new %GAME% update is utter crap', 'new update is lagging', 'new %GAME% update is lagging', '%GAME% sucks ass', 'i think %GAME% sucks ass',
      '%GAME% is as bad as a rats ass'
    ],
    classification: 'negative',
    ratings: RATINGS.NEGATIVE as RATINGS_TYPE
  },
  {
    patterns:
    [
      'how has your day been', 'how are you', 'im good', 'i am good', 'i feel great', 'the weather is good', 'the weather is decent',
      'are you feeling well', 'im nice', 'i am nice', 'i\'m nice', 'i like you', 'you are nice', 'i like vegetables theyre great',
      '%OTHERGAMES%', '%OTHERGAMES% is good', '%OTHERGAMES% is decent', '%OTHERGAMES% is crap',
      'i am great', 'i am terrible', 'i am better than %GAME%', 'i am shitty'
    ],
    classification: 'neutral',
    ratings: RATINGS.NEUTRAL as RATINGS_TYPE
  }
];

export const VOCABULARY: string[] = [
  'game', 'lag', 'lagging', '%GAME%', 'good', 'bad', 'terrible', 'slow', 'chunky', 'smooth', 'dead', 'terrible', 'mess', 'optimized', 'chill',
  'solid', 'great', 'like', 'best', 'love', 'sucks', 'fuck', 'fucking', 'hate', 'day', 'weather', 'feeling', 'going', 'so', 'far', 'been',
  'you', 'well', 'nice', 'crap', 'shit', 'fucked', 'mess', 'burn', 'should', 'crappy', '%SERVER%', 'i', 'pasta', 'vegetables', 'meat',
  'new', 'update', '%OTHERGAMES%', 'decent', 'awesome', 'cool', 'think', 'better', 'favorite', 'ass', 'rat'
];

export const REPLACE_SETS = new Collection<string, string[]>([
  ['%GAME%', ['vg', 'vainglory']],
  ['%OTHERGAMES%', ['fortnite', 'coc', 'clashofclans', 'csgo', 'cs:go', 'snake', 'minecraft', 'mc', 'roblox']],
  ['%SERVER%', ['server', 'servers']]
]);

export interface ISetType { patterns: string[]; classification: string; ratings: RATINGS_TYPE }
export interface IParsedSetType { patterns: number[][]; textRating: string; rating: RATINGS_TYPE; ratings: RATINGS_TYPE[] }
export type RATINGS_TYPE = ([0, 1, 0] | [1, 0, 0] | [0, 0, 1]);
