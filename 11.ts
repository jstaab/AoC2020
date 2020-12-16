const eleven = (await Deno.readTextFile('./11.input'))
  .split('\n')
  .map(x => x.split(''))
;

let diff
let b0 = eleven
let b1: typeof b0

function neighbors(x: number, y: number) {
  const top = y - 1 >= 0
  const bottom = y + 1 < b0[0].length
  const left = x - 1 >= 0
  const right = x + 1 < b0.length

  const ns: string[] = []

  if (top) {
    ns.push(b0[x][y - 1])
    if (left) {
      ns.push(b0[x - 1][y - 1])
    }
    if (right) {
      ns.push(b0[x + 1][y - 1])
    }
  }

  if (bottom) {
    ns.push(b0[x][y + 1])
    if (left) {
      ns.push(b0[x - 1][y + 1])
    }
    if (right) {
      ns.push(b0[x + 1][y + 1])
    }
  }

  if (left) {
    ns.push(b0[x - 1][y])
  }

  if (right) {
    ns.push(b0[x + 1][y])
  }

  return ns;
}

function applyRules(x: number, y: number) {
  const seat = b0[x][y]
  const adj = neighbors(x, y)

  if (seat === 'L' && !adj.includes('#')) {
    return '#'
  } else if (seat === '#' && adj.filter(x => x === '#').length >= 4) {
    return 'L'
  }

  return seat
}

do {
  b1 = []
  diff = false
  for (let i = 0; i < b0.length; i += 1) {
    const row = b0[i]
    b1[i] = []
    for (let j = 0; j < row.length; j += 1) {
      b1[i][j] = applyRules(i, j)
      diff = diff || b1[i][j] !== b0[i][j]
    }
  }
  b0 = b1
} while (diff)

const count = b1.flat(1).filter(x => x === '#').length
console.log(count)
