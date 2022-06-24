import { gql } from '@apollo/client';

import { AircraftType } from '../types/aircraft.type';

import { AIRCRAFT_FRAGMENT } from './aircraft.fragment';

export interface MatchedAtctWeightData {
  matchedAtctWeight: AircraftType[];
}

export interface MatchedAtctWeightVariable {
  weight: string;
}

/**
 * Query for matching model Data
 */
export const GET_ATCT_WEIGHT = gql`
  query matchedAtctWeight ($weight: String!) {
    matchedAtctWeight (weight: $weight) {
      ${AIRCRAFT_FRAGMENT}
    }
  }
`;
