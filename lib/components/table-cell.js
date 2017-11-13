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
    this.context.setSelectionCell(key, 'focus')
  }

  onMouseLeave = (e) => {
    const { key } = this.props.node
    this.context.setSelectionCell(key, 'anchor')
  }

  render () {
    const { key } = this.props.node
    const {
      highlight,
      width
    } = this.context.getCellState(key)

    const { attributes } = this.props
    return (
      <Subscriber channel={'table'}>
        {(table) => (
          <td
            colSpan={1}
            rowSpan={1}
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
