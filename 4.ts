function newValidity() {
  return {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
  }
}

let validity = newValidity()
let waitForNewline = false

function checkValidity() {
  return Object.values(validity).reduce((l, r) => l && r, true)
}

const keys = new RegExp(`^(${Object.keys(validity).join('|')}):.`)

const four = (await Deno.readTextFile('./4.input'))
  .split(/[\n\s]/)
  .reduce(
    (count, candidate) => {
      if (candidate === '') {
        waitForNewline = false
        validity = newValidity()
        return count
      }
      const [, key] = (candidate.match(keys) || []) as [never, keyof typeof validity]
      if (key) {
        validity[key] = true
      }
      if (!waitForNewline && checkValidity()) {
        waitForNewline = true
        return count + 1
      }
      return count
    },
    0
  )

console.log(four)
