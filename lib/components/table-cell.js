import React from 'react'
import PropTypes from 'prop-types'
import { Subscriber } from 'react-broadcast'

export default class TableCell extends React.Component {
  onMouseDown = (e) => {

  }
  onMouseEnter = (e) => {

  }
  onMouseLeave = (e) => {

  }
  onMouseUp = (e) => {
    const { key } = this.props.node
    this.context.setCellState(key, 'colSpan', 2)
  }

  render () {
    const { key } = this.props.node
    const {
      colSpan,
      rowSpan,
      width
    } = this.context.getCellState(key)

    const { attributes } = this.props
    return (
      <Subscriber channel={'table'}>
        {(table) => (
          <td
            colSpan={colSpan}
            rowSpan={rowSpan}
            style={{
              width
            }}
            onMouseDown={this.onMouseDown}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseUp={this.onMouseUp}
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
  getCellState: PropTypes.func,
  setCellState: PropTypes.func
}
