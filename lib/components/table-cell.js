import React from 'react'
import PropTypes from 'prop-types'
import { Subscriber } from 'react-broadcast'

export default class TableCell extends React.Component {
  stopSelection = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.context.setSelecting(false)
    window.removeEventListener('mouseup', this.stopSelection)
    window.addEventListener('mousedown', this.clearSelection)
  }

  clearSelection = (e) => {
    this.context.clearSelection()
    window.removeEventListener('mousedown', this.clearSelection)
  }

  onMouseDown = (e) => {
    this.context.setSelecting(true)
    window.addEventListener('mouseup', this.stopSelection)
  }

  onMouseMove = (e) => {
    const { key } = this.props.node
    this.context.setSelectionCell(key, 'focusCell')
  }

  onMouseLeave = (e) => {
    const { key } = this.props.node
    this.context.setSelectionCell(key, 'anchorCell')
  }

  render () {
    const { key, data } = this.props.node
    const {
      highlight,
      width
    } = this.context.getCellState(key)
    const colSpan = data.get('col_span')
    const rowSpan = data.get('row_span')

    const { attributes } = this.props
    return (
      <Subscriber channel={'table'}>
        {(table) => (
          <td
            colSpan={colSpan}
            rowSpan={rowSpan}
            style={{
              background: highlight ? 'yellow' : 'white',
              width
            }}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
            {...attributes}
          >
            {this.props.children}
          </td>
        )}
      </Subscriber>
    )
  }
}

TableCell.contextTypes = {
  clearSelection: PropTypes.func,
  getCellState: PropTypes.func,
  setCellState: PropTypes.func,
  setSelecting: PropTypes.func,
  setSelectionCell: PropTypes.func
}
