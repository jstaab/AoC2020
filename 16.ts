const sixteen = (await Deno.readTextFile('./16.input'))
  .split('\n')
;

const fields: Array<boolean> = []

let line: string;

while ((line = sixteen.shift()!)) {
  const match = line.match(/[a-z]+:\s(\d+)\-(\d+)\sor\s(\d+)\-(\d+)/) || []
  const [, r0, r1, r2, r3] = match.map(Number)
  let i;
  for (i = r0; i <= r1; i += 1) {
    fields[i] = true
  }
  for (i = r2; i <= r3; i += 1) {
    fields[i] = true
  }
}

sixteen.shift() // your ticket:

while ((line = sixteen.shift()!)) {
 // your ticket
}

sixteen.shift() // nearby tickets

const invalids: number[] = []

while ((line = sixteen.shift()!)) {
  const notfound = line.split(',').map(Number).filter(n => !fields[n])
  invalids.push(...notfound)
}
 
console.log(invalids.reduce((l, r) => l + r, 0))