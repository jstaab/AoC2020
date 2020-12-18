
const seed = (await Deno.readTextFile('./17.input'))
  .split('\n')
  .map(line => line.split(''))
;

const iterations = 6
const seedwidth = seed[0].length
const seedheight = seed.length
const boarddepth = iterations + 3
const boardwidth = seedwidth + 2 * (iterations + 1)
const boardheight = seedheight + 2 * (iterations + 1)

const y = new Array<string>(boardheight).fill('.')
const x = new Array<string[]>(boardwidth).fill(y).map(_ => [..._])
const z = new Array<string[][]>(boarddepth).fill(x).map(_ => [..._.map(__ => [...__])])

function neighbors(zi: number, xi: number, yi: number) {
  let count = 0
  for (let a = -1; a < 2; a += 1) {
    for (let b = -1; b < 2; b += 1) {
      for (let c = -1; c < 2; c += 1) {
        if (z[c + zi][a + xi][b + yi] === '#') {
          count += 1
          if (zi === 1 && [-1, 1].includes(c)) {
            count += 1
          }
        }
      }
    }
  }
  const bias = z[zi][xi][yi] === '#' ? 1 : 0
  return count - bias
}

const cx = Math.floor(x.length / 2)
const cy = Math.floor(y.length / 2)
const bx = cx - Math.floor(seedwidth / 2)
const by = cy - Math.floor(seedheight / 2)

const evenxbias = seedwidth % 2 === 0 ? 1 : 0
const evenybias = seedheight % 2 === 0 ? 1 : 0

for (let i = 0; i < seedwidth; i += 1) {
  for (let j = 0; j < seedheight; j += 1) {
    z[1][bx + i][by + j] = seed[i][j]
  }
}

for (let c = 0; c < iterations; c += 1) {
  const tochange: Array<[number, number, number, string]> = []
  for (let k = 1; k <= c + 2; k += 1) {
    for (let i = bx - c - evenxbias; i < bx + seedwidth + c + 1; i += 1) {
      for (let j = by - c - evenybias; j < bx + seedheight + c + 1; j += 1) {
        const count = neighbors(k, i, j)
        const current = z[k][i][j]
        if (current === '#' && ![2, 3].includes(count)) {
          tochange.push([k, i, j, '.'])
        } else if (current === '.' && count === 3) {
          tochange.push([k, i, j, '#'])
        }
      }
    }
  }
  tochange.forEach(([k, i, j, str]) => {
    z[k][i][j] = str
  })
}

const seventeen = z.reduce(
  (lll, rrr, i) => lll + rrr.reduce(
    (ll, rr) => ll + rr.reduce(
      (l, r) => {
        if (r === '#') {
          return l + (i !== 1 ? 2 : 1)
        }
        return l
      }, 0)
    , 0)
  , 0)

console.log(seventeen)