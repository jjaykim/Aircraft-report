import { gql } from '@apollo/client';

import { AircraftType } from '../types/aircraft.type';

import { AIRCRAFT_FRAGMENT } from './aircraft.fragment';

export interface AircraftQueryData {
  allAircraft: AircraftType[];
}

/**
 * Query for All Aircraft Data
 */
export const GET_AIRCRAFT = gql`
  query allAircraft {
    allAircraft {
      ${AIRCRAFT_FRAGMENT}
    }
  }
`;
