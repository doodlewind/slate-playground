import { Range } from 'immutable'
import { Block } from 'slate'

import createCell from './create-cell'

function createRow (opts, columns) {
  const cellNodes = Range(0, columns)
    .map(() => createCell(opts))
    .toList()

  return Block.create({
    type: opts.ROW,
    nodes: cellNodes
  })
}

export default createRow
