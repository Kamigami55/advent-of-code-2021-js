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
  /*
   * transposed:
   * [
   *  [0,1,0,0,1,...], // Every bit of the first digits
   *  [1,1,1,0,1,...], // Every bit of the second digits
   *  ...
   * ]
   */
  const transposed = transpose(matrix)
  const numBits = transposed[0].length
  // mostCommonBits: [1,0,0,1,...] // most common bits of every digit
  const mostCommonBits = transposed
    // For each digit
    .map((bitsOfDigit) =>
      bitsOfDigit
        // count how many 1's there are
        .reduce((prevOneCount, bit) => prevOneCount + bit, 0)
    )
    // and compare with numDigits to determine which bit is more (1 or 0)
    .map((oneCount) => (oneCount > numBits / 2 ? 1 : 0))
  const leastCommonBits = mostCommonBits.map((bit) => 1 - bit)

  const gammaRate = parseInt(mostCommonBits.join(''), 2) // binary to decimal
  const epsilonRate = parseInt(leastCommonBits.join(''), 2)
  const ans = gammaRate * epsilonRate
  return ans
}

// Transpose 2D matrix
// From: https://stackoverflow.com/a/46805290/6728679
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]))
}

function main() {
  const lines = prepareInput()
  const ans = solve(lines)
  console.log(ans)
}

main()
