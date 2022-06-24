import { AircraftType } from './aircraft.type';

export interface TableViewer {
  aircraft: AircraftType[];
  tableHeader: string[];
  tableFlex: number[];
}
