const lineByLine = require('n-readlines')

const inputFile = 'input.txt'
// const inputFile = 'sample-input.txt'

function prepareInput() {
  const liner = new lineByLine(inputFile)
  let line
  let draws = liner
    .next()
    .toString()
    .split(',')
    .map((val) => parseInt(val))
  let boards = []
  liner.next() // skip blank line
  let board = []
  while ((line = liner.next())) {
    if (line.toString() === '') {
      boards.push(board)
      board = []
    } else {
      board.push(
        line
          .toString()
          .split(/\s+/)
          .map((val) => parseInt(val))
          .filter((val) => !isNaN(val))
      )
    }
  }
  boards.push(board)
  return { draws, boards }
}

/**
 * @param {Array} lines
 * @returns {Number} ans
 */
function solve(draws, boards) {
  let hashTable = new Map()
  draws.forEach((val, index) => {
    hashTable.set(val, index)
  })

  let winnerBoard = null
  let winnerRound = Number.MAX_SAFE_INTEGER
  boards.forEach((board) => {
    board.forEach((row) => {
      const roundCanWin = row.reduce(
        (max, val) => Math.max(max, hashTable.get(val) ?? Number.MAX_SAFE_INTEGER),
        0
      )
      if (roundCanWin < winnerRound) {
        winnerBoard = board
        winnerRound = roundCanWin
      }
    })
    for (let colIdx = 0; colIdx < board[0].length; ++colIdx) {
      const roundCanWin = board.reduce(
        (max, row) => Math.max(max, hashTable.get(row[colIdx]) ?? Number.MAX_SAFE_INTEGER),
        0
      )
      if (roundCanWin < winnerRound) {
        winnerBoard = board
        winnerRound = roundCanWin
      }
    }
  })

  let sum = 0
  winnerBoard.forEach((row) => {
    row.forEach((val) => {
      if (hashTable.has(val) && hashTable.get(val) > winnerRound) {
        sum += val
      }
    })
  })
  return sum * draws[winnerRound]
}

function main() {
  const { draws, boards } = prepareInput()
  const ans = solve(draws, boards)
  console.log(ans)
}

main()
