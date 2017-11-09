import { Block } from 'slate'

function createCell (opts) {
  return Block.create({
    type: opts.CELL
  })
}

export default createCell
