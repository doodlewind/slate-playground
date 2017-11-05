import { Value } from 'slate'
import { Editor } from 'slate-react'

import React from 'react'
import initialValue from './value.json'
import './style.css'

import TableComponents from '../../src/components'
const {
  Table, TableRow, TableCell
} = TableComponents

class TableEditor extends React.Component {
  state = {
    value: Value.fromJSON(initialValue)
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  renderNode = (props) => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'table': return (
        <Table attributes={attributes}>{children}</Table>
      )
      case 'table-row': return (
        <TableRow attributes={attributes}>{children}</TableRow>
      )
      case 'table-cell': return (
        <TableCell attributes={attributes}>{children}</TableCell>
      )
    }
  }

  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
    }
  }

  render () {
    return (
      <div className='editor'>
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    )
  }
}

export default TableEditor
