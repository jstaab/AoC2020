function locator([low, high]: number[], x: string) {
  const range = low + high
  if (x === 'F' || x === 'L') {
    return [low, Math.floor(range / 2)]
  } else if (x === 'B' || x === 'R') {
    return [Math.ceil(range / 2), high]
  }
  return [low, high]
}

const five = (await Deno.readTextFile('./5.input'))
  .split('\n')
  .reduce(
    (best, candidate) => {
      const rows = candidate.substring(0, 7).split('')
      const [row] = rows.reduce(locator, [0, 127])

      const cols = candidate.substring(7).split('')
      const [col] = cols.reduce(locator, [0, 7])
      
      const seatId = row * 8 + col

      return seatId > best ? seatId : best
    },
    0
  )
;

console.log(five)
