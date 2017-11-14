import insertRow from './changes/insert-row'
import { mergeCell, mergeCellNodes } from './changes/merge-cell'

import Table from './components/table'
import TableRow from './components/table-row'
import TableCell from './components/table-cell'

import { TABLE, ROW, CELL } from './consts'

export default function RichTable (opts = {}) {
  opts.TABLE = opts.TABLE || TABLE
  opts.ROW = opts.ROW || ROW
  opts.CELL = opts.CELL || CELL

  // Pass in default options to changes function.
  function bindOptions (fn) {
    return function (...args) {
      return fn(...[opts, ...args])
    }
  }

  return {
    components: {
      Table,
      TableRow,
      TableCell
    },
    changes: {
      insertRow: bindOptions(insertRow),
      mergeCell: mergeCell,
      mergeCellNodes: bindOptions(mergeCellNodes)
    }
  }
}
