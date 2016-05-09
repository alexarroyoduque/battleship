export class Cell {
  status: StatusType;
  hasShip: Boolean;
  coordinates: {
    x: XCoordinatesType
    y: Number
  };
}

type StatusType = 'empty' | 'water' | 'hit';
type XCoordinatesType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
