const sevenp2 = (await Deno.readTextFile('./7.input'))
  .split('\n')
  .reduce(
    (l, r) => {
      const [, key, contents] = r.match(/^(.+)\sbags\scontain(.+)$/) || []
 
      const value = contents.split(',').reduce((acc, c) => {
        const [, subcount, subkey] = c.match(/\s(\d+)\s(.+)\sbags?\.?/) || []
        if (subkey) {
          return { ...acc, [subkey]: Number(subcount) }
        }
        return acc;
      }, {} as Record<string, number>)

      return l.set(key, value)
    },
    new Map<string, Record<string, number>>()
  )
;

function deepcount(lookin: Record<string, number>): number {
  const entries = Object.entries(lookin)
  if (entries.length === 0) {
    return 1;
  }

  return Object.entries(lookin).reduce((l, [key, value]) => {
    return l + (value * deepcount(sevenp2.get(key)!))
  }, 1)
}

const outp = deepcount(sevenp2.get('shiny gold')!) - 1
console.log(outp)
