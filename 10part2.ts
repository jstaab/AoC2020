const tenp2 = (await Deno.readTextFile('./10.input'))
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b)
;

tenp2.unshift(0)

const mem: Record<number, number> = {}

function finddepth(i: number): number {
  const curr = tenp2[i];

  if (mem[curr]) {
    return mem[curr]
  }

  const candidates = [i + 3, i + 2, i + 1].filter(x => {
    const diff = tenp2[x] - curr
    return diff <= 3
  })

  if (candidates.length === 0) {
    return 1
  }

  mem[curr] = candidates.map(finddepth).reduce((l, r) => l + r, 0)
  return mem[curr]
}

const outp = finddepth(0)
console.log(outp)