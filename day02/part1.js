const lineByLine = require('n-readlines')

const inputFile = 'input.txt'
// const inputFile = "sample-input.txt";

function prepareInput() {
  const liner = new lineByLine(inputFile)
  let line
  let actions = []
  while ((line = liner.next())) {
    const [direction, distance] = line.toString('utf8').split(' ')
    actions.push({ direction, distance: parseInt(distance) })
  }
  return actions
}

/**
 * @param {Array} actions
 * @returns {Number} ans
 */
function solve(actions) {
  let x = 0
  let y = 0
  for (let action of actions) {
    const { direction, distance } = action
    switch (direction) {
      case 'forward':
        x += distance
        break
      case 'up':
        y -= distance
        break
      case 'down':
        y += distance
        break
      default:
        break
    }
  }
  return x * y
}

function main() {
  const actions = prepareInput()
  const ans = solve(actions)
  console.log(ans)
}

main()
