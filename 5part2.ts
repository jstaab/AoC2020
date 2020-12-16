function locator([low, high]: number[], x: string) {
  const range = low + high
  if (x === 'F' || x === 'L') {
    return [low, Math.floor(range / 2)]
  } else if (x === 'B' || x === 'R') {
    return [Math.ceil(range / 2), high]
  }
  return [low, high]
}

const fivep2 = (await Deno.readTextFile('./5.input'))
  .split('\n')
  .map(
    (candidate) => {
      const rows = candidate.substring(0, 7).split('')
      const [row] = rows.reduce(locator, [0, 127])

      const cols = candidate.substring(7).split('')
      const [col] = cols.reduce(locator, [0, 7])
      
      return row * 8 + col
    }
  )
  .sort((a, b) => a - b)
;

const [base] = fivep2
const padding = new Array(base).fill(null).map((_, i) => i)
padding.concat(fivep2).forEach((x, i) => {
  if (x !== i) {
    console.log(x)
    Deno.exit()
  }
})
