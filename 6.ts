

let qsindex = 0
const qs: Array<Record<string, boolean>> = [{}]

const six = (await Deno.readTextFile('./6.input'))
  .split('\n')
  .forEach(fragment => {
    if (fragment === '') {
      qsindex += 1
      qs.push({})
      return
    }

    fragment.split('').forEach(char => {
      qs[qsindex][char] = true
    })
  })

  const output = qs.reduce((l, r) => {
    return l + Object.keys(r).length
  }, 0)

  console.log(output)
  