
interface IDistance {
  distance: number;
}

interface IPosition {
  x: number,
  y: number,
  z: number
}

type withPosition<T> = T & IPosition;

let instance: withPosition<IDistance> = {
  distance: 0, x: 0, y: 0, z: 0
}

