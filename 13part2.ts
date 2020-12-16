const [, buslines2] = (await Deno.readTextFile('./13.input'))
  .split('\n')
;

const buses2 = buslines2.split(',').map(Number);
const [first2, ...rest] = buses2

const ojts = rest.reduce((l, f, i) => {
  let next = l
  if (!isNaN(f)) {
    const remain = f - ((i + 1) % f)

    while (next % f !== remain) {
      next += buses2.slice(0, i + 1).filter(x => !isNaN(x)).reduce((a, b) => a * b, 1)
    }
  }

  return next
}, first2)

console.log(ojts)
