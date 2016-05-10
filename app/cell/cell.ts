export class Cell {
  constructor(
    status: StatusType,
    hasShip: boolean,
    coordinates: {
      x: XCoordinatesType,
      y: number
    }
  ) { }
}

type StatusType = 'empty' | 'water' | 'hit';
type XCoordinatesType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
