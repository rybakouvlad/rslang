import { Word } from './book';

export interface IAggregatedWords {
  paginatedResults: Word[];
  totalCount: number;
}

export enum AggregatedWordsTypes {
  GET_AGGREGATED_WORDS = 'GET_AGGREGATED_WORDS',
  AGGREGATED_WORDS_ERROR = 'AGGREGATED_WORDS_ERROR',
}

interface GetAggregatedAction {
  type: AggregatedWordsTypes.GET_AGGREGATED_WORDS;
  payload: { paginatedResults: Word[]; totalCount: number };
}

interface aggregatedWordsErrorAcrtion {
  type: AggregatedWordsTypes.AGGREGATED_WORDS_ERROR;
}

export type AggregatedActions = GetAggregatedAction | aggregatedWordsErrorAcrtion;
