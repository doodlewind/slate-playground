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
    const { node } = props
    switch (node.type) {
      case 'table': return (
        <Table {...props} />
      )
      case 'table-row': return (
        <TableRow {...props} />
      )
      case 'table-cell': return (
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
