const [mytime, buslines] = (await Deno.readTextFile('./13.input'))
  .split('\n')
;

let leastbus = Number.POSITIVE_INFINITY
let leasttime = Number.POSITIVE_INFINITY
const time = Number(mytime)
const buses = buslines.split(',').filter(x => x !== 'x').forEach(b => {
  let line = Number(b)
  while (line < time) {
    line += Number(b)
  }
  if (line < leasttime) {
    leastbus = Number(b)
    leasttime = line
  }
})

const a = leasttime - time
console.log(a * leastbus)
