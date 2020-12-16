const seven = (await Deno.readTextFile('./7.input'))
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

const dynamic: Record<string, boolean> = {}

function deepfind(lookfor: string, lookin: Record<string, number>): boolean {
  const lookinkeys = Object.keys(lookin)
  if (lookinkeys.includes('shiny gold') || lookinkeys.map(x => deepfind(x, seven.get(x)!)).reduce((l, r) => l || r, false)) {
    dynamic[lookfor] = true
    return true
  }

  return false
}

[...seven.entries()].forEach(([key, val]) => {
  deepfind(key, val)
})

console.log(Object.keys(dynamic).length)
/* 
{
  a: {
    b: 2,
    c: 5,
  },
  b: {
    d: 1
  },
  d: {}
}
*/