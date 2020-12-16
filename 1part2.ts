const onep2 = (await Deno.readTextFile('./1.input'))
  .split('\n')
  .map(Number)
  .filter(Boolean)
  .sort((a, b) => b - a)
;

for (let i = 0; i < onep2.length; i += 1) {
  const first = onep2[i]
  for (let j = i + 1; j < onep2.length; j += 1) {
    const second = onep2[j]
    if (first + second >= 2020) {
      continue
    }
    for (let k = j + 1; k < onep2.length; k += 1) {
      const third = onep2[k]
      if (first + second + third === 2020) {
        console.log(first * second * third)
        Deno.exit()
      }
    }
  }
}
