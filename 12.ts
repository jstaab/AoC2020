
enum Cardinality {
  North,
  East,
  South,
  West
}

const nav = [Cardinality.North, Cardinality.East, Cardinality.South, Cardinality.West]

const coords = {
  [Cardinality.North]: 0,
  [Cardinality.East]: 0,
}

let direction = Cardinality.East

function move([op, erand]: [string, number]) {
  switch (op) {
    case 'N': {
      coords[Cardinality.North] += erand
      break
    }
    case 'S': {
      coords[Cardinality.North] -= erand
      break
    }
    case 'E': {
      coords[Cardinality.East] += erand
      break
    }
    case 'W': {
      coords[Cardinality.East] -= erand
      break
    }
    case 'L': {
      direction = nav[(direction + nav.length - ((erand % 360) / 90)) % nav.length]
      break
    }
    case 'R': {
      direction = nav[(direction + ((erand % 360) / 90)) % nav.length]
      break
    }
    case 'F': {
      if (direction === Cardinality.West) {
        coords[Cardinality.East] -= erand
      } else if (direction === Cardinality.East) {
        coords[Cardinality.East] += erand
      } else if (direction === Cardinality.North) {
        coords[Cardinality.North] += erand
      } else if (direction === Cardinality.South) {
        coords[Cardinality.North] -= erand
      }
    }
  }
}

(await Deno.readTextFile('./12.input'))
  .split('\n')
  .map(x => {
    const [, op, erand] = x.match(/([A-Z]+)(\d+)/) || []
    return [op, Number(erand)] as [string, number]
  })
  .forEach(move)
;

const result = Object.values(coords).map(Math.abs).reduce((l, r) => l + r, 0)
console.log(result)
