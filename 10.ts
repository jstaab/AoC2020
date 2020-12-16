const ten = (await Deno.readTextFile('./10.input'))
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b)
  .reduce((l, r) => {
    const diff = r - l.acc
    return {
      acc: r,
      ones: l.ones + (diff === 1 ? 1 : 0),
      threes: l.threes + (diff === 3 ? 1 : 0)
    }
  }, { acc: 0, ones: 0, threes: 1 })
;

console.log(ten.threes * ten.ones)
