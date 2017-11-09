import createRow from '../utils/create-row'

export default function insertRow (change) {
  const newRow = createRow(4)
  const value = change.value
  const { startBlock, document } = value

  const table = document.getClosest(
    startBlock.key, (node) => node.type === 'table'
  )

  change.insertNodeByKey(
    table.key, 0, newRow
  )
}
