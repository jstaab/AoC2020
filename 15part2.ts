const fifteen = (await Deno.readTextFile('./15.input'))
  .split(',')
;

const when = fifteen
  .reduce((l, r, i) => {
    l[Number(r)] = i + 1
    return l
  }, new Array(30000000))
;

let [last] = fifteen.reverse().map(Number);

delete when[last]

for (let i = fifteen.length + 1; i <= 30000000; i += 1) {
  if (when[last]) {
    const oldlast = last
    last = i - 1 - when[last]
    when[oldlast] = i - 1
  } else {
    when[last] = i - 1
    last = 0
  }
}

console.log(last)