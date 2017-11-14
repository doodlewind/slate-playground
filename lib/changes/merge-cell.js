import emitter from '../utils/emitter'
import { MERGE_CELL } from '../consts'

export function mergeCellNodes (opts, change, keys, upperLeftKey) {
  const { document } = change.value
  const tableNode = document.getClosest(
    upperLeftKey, node => node.type === opts.TABLE
  )
  keys.reverse().forEach(key => {
    if (key === upperLeftKey) return

    const cellNode = tableNode.getDescendant(key)
    cellNode.nodes.reverse().forEach(child => {
      change.insertNodeByKey(upperLeftKey, 0, child)
    })
  })
}

export function mergeCell () {
  emitter.emit(MERGE_CELL)
}
