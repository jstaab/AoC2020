const three = (await Deno.readTextFile('./3.input'))
  .split('\n')
  .slice(1)
  .reduce(
    (count, candidate, i) => {
      const location = (3 * (i + 1)) % candidate.length
      return candidate[location] === '#' ? count + 1 : count
    },
    0
  )
;

console.log(three)
