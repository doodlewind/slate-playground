import { Range } from 'immutable'
import { Block } from 'slate'

import createCell from './create-cell'

function createRow (columns) {
  const cellNodes = Range(0, columns)
    .map(createCell)
    .toList()

  return Block.create({
    type: 'table_row',
    nodes: cellNodes
  })
}

export default createRow
