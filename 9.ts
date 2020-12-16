const nine = (await Deno.readTextFile('./9.input'))
  .split('\n')
;

const buff = 25
const mem: number[][] = []

let i = 0

function combos(pad: number) {
  const next = new Array(pad).fill(null)
  const n = Number(nine[i])
  nine.slice(i + 1, i + buff).forEach(x => {
    next.push(n + Number(x))
  })
  mem.push(next)
}

for (; i < buff; i += 1) {
  combos(i)
}

for (; i < nine.length; i += 1) {
  let found = false
  const here = Number(nine[i])
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
    console.log(here)
    Deno.exit()
  }
}
