const two = (await Deno.readTextFile('./2.input'))
  .split('\n')
  .reduce(
    (count, candidate) => {
      const [, low, high, char, password] = candidate.match(/^(\d+)\-(\d+)\s(\w):\s(\w+)$/) || []
      const match = password.match(new RegExp(char, 'g')) || []
      return match.length >= Number(low) && match.length <= Number(high) ? count + 1 : count
    },
    0
  )
;

console.log(two)
