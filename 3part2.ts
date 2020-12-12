const threep2 = (await Deno.readTextFile('./3.input'))
  .split('\n')

function runSim([right, down]: [number, number]) {
  let acc = 0
  let location = 0

  for (let i = down; i < threep2.length; i += down) {
    const candidate = threep2[i]
    location = (location + right) % candidate.length
    if (candidate[location] === '#') {
      acc += 1
    }
  }

  return acc
}  

const a: Array<[number, number]> = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

const output = a.map(runSim).reduce((l, r) => l * r, 1)
console.log(output)
