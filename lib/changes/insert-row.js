import createRow from '../utils/create-row'

export default function insertRow (opts, change) {
  const newRow = createRow(opts, 4)
  const value = change.value
  const { startBlock, document } = value

  const table = document.getClosest(
    startBlock.key, (node) => node.type === opts.TABLE
  )

  if (!table) return

  change.insertNodeByKey(
    table.key, 0, newRow
  )
}
