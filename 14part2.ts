let mask2: string

const fourteenp2 = (await Deno.readTextFile('./14.input'))
  .split('\n')
  .reduce((l, r) => {
    if (r.indexOf('mem') === 0) {
      const [, address, value] = r.match(/mem\[(\d+)\]\s=\s(\d+)/) || []
      const numval = BigInt(value)

      const zz = mask2.split('').reverse().reduce((a, b, i) => {
        if (b === '1') {
          a = Object.entries(a).reduce((x, [k]) => {
            x[(BigInt(k) | 1n << BigInt(i)).toString()] = true
            return x
          }, {} as Record<string, boolean>)
        } else if (b === 'X') {
          a = Object.entries(a).reduce((x, [k]) => {
            x[(BigInt(k) & ~(1n << BigInt(i))).toString()] = true
            x[(BigInt(k) | 1n << BigInt(i)).toString()] = true
            return x
          }, {} as Record<string, boolean>)
        }
        return a
      }, { [address]: true })

      Object.keys(zz).map(Number).forEach(x => {
        l[x] = numval
      })
      
    } else if (r.indexOf('mask') === 0) {
      [, mask2 = ''] = r.match(/mask\s=\s([10X]+)/) || []
    }

    return l
  }, {} as Record<number, bigint>)
;

const a = Object.values(fourteenp2).reduce((l, r) => l + r, 0n)

console.log(a)
