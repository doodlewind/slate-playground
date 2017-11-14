
function getBound (anchorPos, focusPos) {
  return {
    minRow: Math.min(anchorPos.i, focusPos.i),
    maxRow: Math.max(anchorPos.i, focusPos.i),
    minCol: Math.min(anchorPos.j, focusPos.j),
    maxCol: Math.max(anchorPos.j, focusPos.j)
  }
}

function positionInBound ({ i, j }, { minRow, minCol, maxRow, maxCol }) {
  return (
    i >= minRow &&
    i <= maxRow &&
    j >= minCol &&
    j <= maxCol
  )
}

// Get table position by slate model key.
export function findPositionBykey (key, grid, tableNode) {
  let position = { i: -1, j: -1 }
  grid.forEach((row, i) => {
    const rowNode = tableNode.nodes.get(i)
    if (!rowNode) return

    row.forEach((cell, j) => {
      const colNode = rowNode.nodes.get(j)
      if (colNode.key === key) {
        position = { i, j }
      }
    })
  })

  if (position.i === -1 || position.j === -1) {
    throw Error(`Can't find node with key ${key}.`)
  }

  return position
}

// Determine if a cell needs highlight according to react state and slate model.
export function hasHighlight (key, state, tableNode) {
  const { anchorCell, focusCell, grid } = state
  if (!anchorCell || !focusCell) return false

  // TODO reduce redundant search.
  const currPos = findPositionBykey(key, grid, tableNode)
  const anchorPos = findPositionBykey(anchorCell, grid, tableNode)
  const focusPos = findPositionBykey(focusCell, grid, tableNode)

  const bound = getBound(anchorPos, focusPos)

  return positionInBound(currPos, bound)
}

// Find all highlighted cell keys.
export function findHighlightKeys (state, tableNode) {
  const { anchorCell, focusCell, grid } = state

  const anchorPos = findPositionBykey(anchorCell, grid, tableNode)
  const focusPos = findPositionBykey(focusCell, grid, tableNode)

  const bound = getBound(anchorPos, focusPos)

  const keys = []
  tableNode.nodes.forEach(rowNode => {
    rowNode.nodes.forEach(colNode => {
      const currPos = findPositionBykey(colNode.key, grid, tableNode)
      if (positionInBound(currPos, bound)) {
        keys.push(colNode.key)
      }
    })
  })
  return keys
}

export function findUpperLeftKey (state, tableNode) {
  const { anchorCell, focusCell, grid } = state
  const anchorPos = findPositionBykey(anchorCell, grid, tableNode)
  const focusPos = findPositionBykey(focusCell, grid, tableNode)

  const bound = getBound(anchorPos, focusPos)

  let i = 0
  while (i < tableNode.nodes.size) {
    const rowNode = tableNode.nodes.get(i)
    let j = 0
    while (j < rowNode.nodes.size) {
      const colNode = rowNode.nodes.get(j)
      const currPos = findPositionBykey(colNode.key, grid, tableNode)
      if (positionInBound(currPos, bound)) {
        return colNode.key
      }
      j += 1
    }
    i += 1
  }

  return ''
}
