import { Value } from 'slate'
import { Editor } from 'slate-react'

import React from 'react'

import initialValue from './value'
import RichTable from '../../lib'
import './style.css'

const richTable = RichTable()

const { Table, TableRow, TableCell } = richTable.components
const { insertRow } = richTable.changes

class TableEditor extends React.Component {
  state = {
    value: Value.fromJSON(initialValue)
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  renderNode = (props) => {
    const { node } = props
    switch (node.type) {
      case 'table': return (
        <Table {...props} />
      )
      case 'table_row': return (
        <TableRow {...props} />
      )
      case 'table_cell': return (
        <TableCell {...props} />
      )
    }
  }

  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
    }
  }

  // FIXME sync react state with slate model.
  onInsertRow = (e) => {
    e.preventDefault()
    const change = this.state.value.change()
    insertRow(change)
    this.onChange(change)
  }

  onRemoveRow = (e) => {
    e.preventDefault()
  }

  render () {
    return (
      <div className='editor'>
        <div>
          <button onMouseDown={this.onInsertRow}>
            add row
          </button>
          <button onMouseDown={this.onRemoveRow}>
            remove row
          </button>
        </div>
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          richTable={richTable}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    )
  }
}

export default TableEditor
