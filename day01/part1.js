const lineByLine = require('n-readlines')

const inputFile = 'input.txt'
// const inputFile = 'sample-input.txt'

function prepareInput() {
  const liner = new lineByLine(inputFile)
  let line
  let input = []
  while ((line = liner.next())) {
    input.push(parseInt(line.toString('utf8')))
  }
  return input
}

/**
 * @param {Array} numbers
 * @returns {Number} ans
 */
function solve(numbers) {
  let ans = 0
  for (let i = 1; i < numbers.length; i++) {
    const prev = numbers[i - 1]
    const current = numbers[i]
    if (current > prev) {
      ++ans
    }
  }
  return ans
}

function main() {
  const numbers = prepareInput()
  const ans = solve(numbers)
  console.log(ans)
}

main()
