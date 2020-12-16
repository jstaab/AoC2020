

let qsindex = 0
const qs: Array<Record<string, boolean>> = [{}]
let fill = true

const six = (await Deno.readTextFile('./6.input'))
  .split('\n')
  .forEach(fragment => {
    if (fragment === '') {
      qsindex += 1
      qs.push({})
      fill = true
      return
    }

    const existing = Object.keys(qs[qsindex])

    if (!fill) {
      existing.forEach(char => {
        if (fragment.indexOf(char) === -1) {
          delete qs[qsindex][char]
        }
      })      
    } else {
      fill = false
      fragment.split('').forEach(char => {
        qs[qsindex][char] = true
      })
    }
  })

  const output = qs.reduce((l, r) => {
    return l + Object.keys(r).length
  }, 0)

  console.log(output)
  