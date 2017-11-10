import React from 'react'
import PropTypes from 'prop-types'
import { Subscriber } from 'react-broadcast'

export default class TableCell extends React.Component {
  onMouseDown = (e) => {
    const { key } = this.props.node
    this.context.getCellState(key)
  }
  onMouseEnter = (e) => {

  }
  onMouseLeave = (e) => {

  }
  onMouseUp = (e) => {
    this.context.setCellState()
  }

  render () {
    const { attributes } = this.props
    return (
      <Subscriber channel={'table'}>
        {(table) => (
          <td
            onMouseDown={this.onMouseDown}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseUp={this.onMouseUp}
            {...attributes}
            style={{ background: table.color }}
          >
            {this.props.children}
          </td>
        )}
      </Subscriber>
    )
  }
}

TableCell.contextTypes = {
  getCellState: PropTypes.func,
  setCellState: PropTypes.func
}
