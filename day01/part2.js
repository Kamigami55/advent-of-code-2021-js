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
  if (numbers.length <= 3) return 0

  let ans = 0
  for (let i = 3; i < numbers.length; i++) {
    const prev = numbers[i - 3]
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
