import insertRow from './changes/insert-row'

import Table from './components/table'
import TableRow from './components/table-row'
import TableCell from './components/table-cell'

export default function RichTable (opts = {}) {
  opts.TABLE = opts.TABLE || 'table'
  opts.ROW = opts.ROW || 'table_row'
  opts.CELL = opts.CELL || 'table_cell'

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
      insertRow: bindOptions(insertRow)
    }
  }
}
