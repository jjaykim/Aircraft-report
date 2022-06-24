import { gql } from '@apollo/client';

import { AircraftType } from '../types/aircraft.type';

import { AIRCRAFT_FRAGMENT } from './aircraft.fragment';

export interface MatchedModelsData {
  matchedModels: AircraftType[];
}

export interface MatchedModelsVariable {
  input: string;
}

/**
 * Query for matching ATCT Weight Class Data
 */
export const GET_MATCHEDMODELS = gql`
  query matchedModels ($input: String) {
    matchedModels (input: $input) {
      ${AIRCRAFT_FRAGMENT}
    }
  }
`;
