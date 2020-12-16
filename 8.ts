const eight = (await Deno.readTextFile('./8.input'))
  .split('\n')
;

let pc = 0
let acc = 0
const pchist: Record<number, number> = {}

while (pchist[pc] == null) {
  const [, op, erand] = eight[pc].match(/(\w{3})\s([+-]\d+)/) || []
  if (op === 'jmp') {
    pc += Number(erand)
    continue
  } else if (op === 'acc') {
    acc += Number(erand)
    pchist[pc] = acc
  }

  pc += 1
}

console.log(acc)
