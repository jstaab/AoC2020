let mask: Array<{
  op: 'or' | 'and'
  num: bigint
}> = []

const fourteen = (await Deno.readTextFile('./14.input'))
  .split('\n')
  .reduce((l, r) => {
    if (r.indexOf('mem') === 0) {
      const [, address, value] = r.match(/mem\[(\d+)\]\s=\s(\d+)/) || []
      l[Number(address)] = mask.reduce((a, b) => {
        if (b.op === 'or') {
          return a | b.num
        } else if (b.op === 'and') {
          return a & b.num
        }
        return a
      }, BigInt(value))
    } else if (r.indexOf('mask') === 0) {
      const [, m] = r.match(/mask\s=\s([10X]+)/) || []
      mask = m.split('').reverse().reduce((a, b, i) => {
        if (b === '1') {
          a.push({
            op: 'or',
            num: 1n << BigInt(i)
          })
        } else if (b === '0') {
          a.push({
            op: 'and',
            num: ~(1n << BigInt(i))
          })
        } 
        return a
      }, [] as typeof mask)
    }
    return l
  }, [] as bigint[]).reduce((l, r) => l + r, 0n)
;

console.log(fourteen)