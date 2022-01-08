const lineByLine = require('n-readlines')

const inputFile = 'input.txt'
// const inputFile = 'sample-input.txt'

function prepareInput() {
  const liner = new lineByLine(inputFile)
  let line
  let lines = []
  while ((line = liner.next())) {
    lines.push(line.toString('utf8'))
  }
  return lines
}

/**
 * @param {Array} lines
 * @returns {Number} ans
 */
function solve(lines) {
  const matrix = lines.map((line) => line.split('').map((bit) => parseInt(bit)))
  const cntDigits = matrix[0].length

  // Solve oxygen generator rating (most common, 1 first if equal)
  let numbers = matrix
  for (let col = 0; col < cntDigits; ++col) {
    const oneCount = numbers.reduce((prevOneCount, num) => prevOneCount + num[col], 0)
    const bitToKeep = oneCount >= numbers.length / 2 ? 1 : 0
    numbers = numbers.filter((num) => num[col] === bitToKeep)
    if (numbers.length <= 1) break
  }
  if (numbers.length !== 1)
    throw new Error('Invalid count of left numbers, should left only one number')
  const oxygenGeneratorRating = parseInt(numbers[0].join(''), 2)

  // Solve CO2 scrubber rating (least common, 0 first if equal)
  numbers = matrix
  for (let col = 0; col < cntDigits; ++col) {
    const oneCount = numbers.reduce((prevOneCount, num) => prevOneCount + num[col], 0)
    const bitToKeep = oneCount >= numbers.length / 2 ? 0 : 1 // the only difference
    numbers = numbers.filter((num) => num[col] === bitToKeep)
    if (numbers.length <= 1) break
  }
  if (numbers.length !== 1)
    throw new Error('Invalid count of left numbers, should left only one number')
  const CO2ScrubberRating = parseInt(numbers[0].join(''), 2)

  const ans = oxygenGeneratorRating * CO2ScrubberRating
  return ans
}

function main() {
  const lines = prepareInput()
  const ans = solve(lines)
  console.log(ans)
}

main()
