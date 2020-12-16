const elevenp2 = (await Deno.readTextFile('./11.input'))
  .split('\n')
  .map(x => x.split(''))
;

let diff
let b0 = elevenp2
let b1: typeof b0

function neighbors(x: number, y: number) {
  let [tl, t, tr, l, r, bl, b, br] = [] as string[]

  // left
  for (let i = x - 1; l == null && i >= 0; i -= 1) {
    const here = b0[i][y]
    if (['L', '#'].includes(here)) {
      l = here
    }
  }

  // right
  for (let i = x + 1; r == null && i < b0.length; i += 1) {
    const here = b0[i][y]
    if (['L', '#'].includes(here)) {
      r = here
    }
  }

  // top
  for (let i = y - 1; t == null && i >= 0; i -= 1) {
    const here = b0[x][i]
    if (['L', '#'].includes(here)) {
      t = here
    }
  }

  // bottom
  for (let i = y + 1; b == null && i < b0[0].length; i += 1) {
    const here = b0[x][i]
    if (['L', '#'].includes(here)) {
      b = here
    }
  }

  // top left
  for (let i = y - 1, j = x - 1; tl == null && i >= 0 && j >= 0; i -= 1, j -= 1) {
    const here = b0[j][i]
    if (['L', '#'].includes(here)) {
      tl = here
    }
  }

  // bottom right
  for (let i = y + 1, j = x + 1; br == null && i < b0[0].length && j < b0.length; i += 1, j += 1) {
    const here = b0[j][i]
    if (['L', '#'].includes(here)) {
      br = here
    }
  }

  // top right
  for (let i = y - 1, j = x + 1; tr == null && i >= 0 && j < b0.length; i -= 1, j += 1) {
    const here = b0[j][i]
    if (['L', '#'].includes(here)) {
      tr = here
    }
  }

  // bottom left
  for (let i = y + 1, j = x - 1; bl == null && i < b0[0].length && j >= 0; i += 1, j -= 1) {
    const here = b0[j][i]
    if (['L', '#'].includes(here)) {
      bl = here
    }
  }

  return [tl, t, tr, l, r, bl, b, br].filter(Boolean)
}

function applyRules(x: number, y: number) {
  const seat = b0[x][y]
  const adj = neighbors(x, y)

  if (seat === 'L' && !adj.includes('#')) {
    return '#'
  } else if (seat === '#' && adj.filter(x => x === '#').length >= 5) {
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
