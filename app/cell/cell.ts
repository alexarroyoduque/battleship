export class Cell {
  constructor(
    status: StatusType,
    hasShip: boolean,
    coordinates: {
      x: number,
      y: number
    }
  ) { }
}

type StatusType = 'empty' | 'water' | 'hit';
