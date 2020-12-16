
enum Cardinality {
  North,
  East,
  South,
  West
}

const nav = [Cardinality.North, Cardinality.East, Cardinality.South, Cardinality.West]

const shipcoords = {
  [Cardinality.North]: 0,
  [Cardinality.East]: 0,
}

let waypointcoords = {
  [Cardinality.North]: 1,
  [Cardinality.East]: 10,
}

function move([op, erand]: [string, number]) {
  switch (op) {
    case 'N': {
      waypointcoords[Cardinality.North] += erand
      break
    }
    case 'S': {
      waypointcoords[Cardinality.North] -= erand
      break
    }
    case 'E': {
      waypointcoords[Cardinality.East] += erand
      break
    }
    case 'W': {
      waypointcoords[Cardinality.East] -= erand
      break
    }
    case 'R':
    case 'L': {
      const turns = (nav.length + (erand % 360) / 90) % nav.length
      if (turns === 1) {
        waypointcoords = {
          [Cardinality.North]: (op === 'L' ? 1 : -1) * waypointcoords[Cardinality.East],
          [Cardinality.East]: (op === 'L' ? -1 : 1) * waypointcoords[Cardinality.North]
        }
      } else if (turns === 2) {
        waypointcoords = {
          [Cardinality.North]: -waypointcoords[Cardinality.North],
          [Cardinality.East]: -waypointcoords[Cardinality.East]
        }
      } else if (turns === 3) {
        waypointcoords = {
          [Cardinality.North]: (op === 'L' ? -1 : 1) * waypointcoords[Cardinality.East],
          [Cardinality.East]: (op === 'L' ? 1 : -1) * waypointcoords[Cardinality.North]
        }
      }
      break
    }
    case 'F': {
      shipcoords[Cardinality.North] += erand * waypointcoords[Cardinality.North]
      shipcoords[Cardinality.East] += erand * waypointcoords[Cardinality.East]
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

const result = Object.values(shipcoords).map(Math.abs).reduce((l, r) => l + r, 0)
console.log(result)
