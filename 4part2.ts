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

function fieldValid(key: keyof typeof validity, value: string) {
  switch (key) {
    case 'byr': {
      const num = Number(value);
      return num >= 1920 && num <= 2002;
    }

    case 'iyr': {
      const num = Number(value)
      return num >= 2010 && num <= 2020
    }

    case 'eyr': {
      const num = Number(value)
      return num >= 2020 && num <= 2030
    }

    case 'hgt': {
      const [, mag, unit] = value.match(/(\d+)(cm|in)/) || []
      const num = Number(mag)
      if (unit === 'cm') {
        return num >= 150 && num <= 193
      } else if (unit === 'in') {
        return num >= 59 && num <= 76
      }
      return false
    }

    case 'hcl': {
      return (value.match(/^#[0-9a-f]{6}$/) || []).length > 0
    }

    case 'ecl': {
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    }

    case 'pid': {
      return (value.match(/^\d{9}$/) || []).length > 0
    }
  }
}

const regex = new RegExp(`^(${Object.keys(validity).join('|')}):(.+)`)

const four = (await Deno.readTextFile('./4.input'))
  .split(/[\n\s]/)
  .reduce(
    (count, candidate) => {
      if (candidate === '') {
        waitForNewline = false
        validity = newValidity()
        return count
      }
      const [, key, value] = (candidate.match(regex) || []) as [never, keyof typeof validity, string]
      if (key) {
        const isValid = fieldValid(key, value);
        if (!isValid) {
          waitForNewline = true;
        }
        validity[key] = isValid
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
