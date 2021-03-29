import { Word } from './book';

export interface IAggregatedWords {
  paginatedResults: Word[];
  totalCount: {
    count: number;
  };
}

export enum AggregatedWordsTypes {
  GET_AGGREGATED_WORDS = 'GET_AGGREGATED_WORDS',
}

interface GetAggregatedAction {
  type: AggregatedWordsTypes.GET_AGGREGATED_WORDS;
  payload: IAggregatedWords;
}

export type AggregatedActions = GetAggregatedAction;
