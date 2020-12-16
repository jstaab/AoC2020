(await Deno.readTextFile('./1.input'))
  .split('\n')
  .map(Number)
  .sort((a, b) => b - a)
  .reduce(
    (map, candidate) => {
      if (candidate >= 2020 / 2) {
        map.set(candidate, true)
      } else {
        const match = 2020 - candidate
        if (map.has(match)) {
          console.log(match * candidate)
          Deno.exit()
        }
      }

      return map
    },
    new Map<number, boolean>()
  )
;
