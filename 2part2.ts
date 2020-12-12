const twop2 = (await Deno.readTextFile('./2.input'))
  .split('\n')
  .reduce(
    (count, candidate) => {
      const [, low, high, char, password] = candidate.match(/^(\d+)\-(\d+)\s(\w):\s(\w+)$/) || []
      const first = password[Number(low) - 1]
      const second = password[Number(high) - 1]
      return (first === char && second !== char) || (first !== char && second === char) ? count + 1 : count
    },
    0
  )
;

console.log(twop2)
