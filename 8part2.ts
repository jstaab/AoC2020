const eightp2 = (await Deno.readTextFile('./8.input'))
  .split('\n')
;

function patch(pcnum: number) {
  pcnum -= 1
  if (eightp2[pcnum].startsWith('jmp')) {
    eightp2[pcnum] = eightp2[pcnum].replace('jmp', 'nop')
  } else {
    eightp2[pcnum] = eightp2[pcnum].replace('nop', 'jmp')
  }
}

function runprog() {
  let pc2 = 0
  let acc2 = 0
  const pchist2: Record<number, number> = {}
  const t0 = performance.now()
  
  while (performance.now() - t0 < 100) {
    if (eightp2[pc2] == null) {
      console.log(acc2)
      Deno.exit()
    }
    const [, op, erand] = eightp2[pc2].match(/(\w{3})\s([+-]\d+)/) || []
    pchist2[pc2 + 1] = (pchist2[pc2 + 1] || 0) + 1
    if (op === 'jmp') {
      pc2 += Number(erand)
      continue
    } else if (op === 'acc') {
      acc2 += Number(erand)
    }
  
    pc2 += 1
  }
}

for (let i = 1; i <= eightp2.length; i += 1) {
  patch(i)
  runprog()
  patch(i)
}
