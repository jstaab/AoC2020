const sixteen = (await Deno.readTextFile('./16.input'))
  .split('\n')
;

const fields: Record<string, { actual?: number; range: Array<boolean> }> = {}

let line: string;

while ((line = sixteen.shift()!)) {
  const match = line.match(/([a-z\s]+):\s(\d+)\-(\d+)\sor\s(\d+)\-(\d+)/) || []
  const [, k] = match
  const [, , r0, r1, r2, r3] = match.map(Number)
  let i;
  fields[k] = {
    range: []
  }
  for (i = r0; i <= r1; i += 1) {
    fields[k].range[i] = true
  }
  for (i = r2; i <= r3; i += 1) {
    fields[k].range[i] = true
  }
}

const anyfields = Object.values(fields).reduce((l, r) => {
  r.range.map((n, i) => n != null ? i : n).filter(x => x != null).forEach(n => {
    l[n] = true
  })
  return l
}, [] as boolean[])

sixteen.shift() // your ticket:
let yourticket: number[] = []

while ((line = sixteen.shift()!)) {
  yourticket = line.split(',').map(Number)
}

sixteen.shift() // nearby tickets

const valids: number[][] = new Array(yourticket.length).fill(null).map(_ => [])

while ((line = sixteen.shift()!)) {
  const c = line.split(',').map(Number)
  const notfound = line.split(',').map(Number).filter(n => !anyfields[n])
  if (notfound.length === 0) {
    for (let i = 0; i < c.length; i += 1) {
      valids[i].push(c[i])
    }
  }
}

while (!Object.values(fields).every(x => x.actual != null)) {
  for (let i = 0; i < valids.length; i += 1) {
    const valid = valids[i];
    const pool = Object.entries(fields).filter(([, { actual }]) => actual == null)
    const entries = pool.filter(([k, { range }]) => {
      return valid.every(x => range[x] != null)
    }) || []
    if (entries.length === 1) {
      const [entry] = entries
      const [key] = entry
      fields[key].actual = i
    }
  }
}

const out = yourticket.map((n, i) => {
  const [fieldname] = Object.entries(fields).find(([, { actual }]) => i === actual)!
  return {
    fieldname,
    value: n
  }
}).filter(({ fieldname }) => fieldname.startsWith('departure'))

const nn = out.reduce((l, { value }) => l * value, 1)

console.log(nn)