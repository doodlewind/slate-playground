import insertRow from './changes/insert-row'

import Table from './components/table'
import TableRow from './components/table-row'
import TableCell from './components/table-cell'

export default function RichTable () {
  return {
    components: {
      Table,
      TableRow,
      TableCell
    },
    changes: {
      insertRow
    }
  }
}
