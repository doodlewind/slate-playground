
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
  const { anchorCell, focusCell } = state
  if (!anchorCell || !focusCell) return false

  const currPos = findPositionBykey(key, state.grid, tableNode)
  const anchorPos = findPositionBykey(anchorCell, state.grid, tableNode)
  const focusPos = findPositionBykey(focusCell, state.grid, tableNode)

  const bound = {
    minRow: Math.min(anchorPos.i, focusPos.i),
    maxRow: Math.max(anchorPos.i, focusPos.i),
    minCol: Math.min(anchorPos.j, focusPos.j),
    maxCol: Math.max(anchorPos.j, focusPos.j)
  }

  return (
    currPos.i >= bound.minRow &&
    currPos.i <= bound.maxRow &&
    currPos.j >= bound.minCol &&
    currPos.j <= bound.maxCol
  )
}
