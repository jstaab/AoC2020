const ninep2 = (await Deno.readTextFile('./9.input'))
  .split('\n')
;

const buff = 25
const mem: number[][] = []

let i = 0

function combos(pad: number) {
  const next = new Array(pad).fill(null)
  const n = Number(ninep2[i])
  ninep2.slice(i + 1, i + buff).forEach(x => {
    next.push(n + Number(x))
  })
  mem.push(next)
}

for (; i < buff; i += 1) {
  combos(i)
}

for (; i < ninep2.length; i += 1) {
  let found = false
  const here = Number(ninep2[i])
  for (let j = 0; j < mem.length && !found; j += 1) {
    const group = mem[j].slice(j, buff - 1)
    if (group.includes(here)) {
      found = true
      mem.shift()
      mem.forEach(m => m.shift())
      combos(buff - 1)
    }
  }

  if (!found) {
    break
  }
}

const target = Number(ninep2[i])

const a = ninep2.reduce((l, r) => {
  const next = (l[l.length - 1] || 0) + Number(r)
  return [...l, next]
}, [] as number[])

for (i = 0; i < ninep2.length; i += 1) {
  const b = a[i]
  const c = a.map(x => x - b).indexOf(target)
  if (c > -1) {
    const d = ninep2.slice(i + 1, c + 1).map(Number).sort((a, b) => a - b)
    const min = Math.min(...d)
    const max = Math.max(...d)
    console.log(min + max)
    Deno.exit()
  }
}

