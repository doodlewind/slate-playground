import { Block } from 'slate'

function createCell () {
  return Block.create({
    type: 'table_cell'
  })
}

export default createCell
