import React from 'react'
import PropTypes from 'prop-types'
import { Broadcast } from 'react-broadcast'

export default class Table extends React.Component {
  state = {
    table: {
      color: 'yellow'
    }
  }

  onMouseDown = (e) => {

  }

  getCellState = (key) => {
    console.log(key)
  }

  setCellState = (key, background) => {
    // const { value } = this.props.editor
    // const { onChange } = this.props.editor.props
    // // const table = value.document.getClosest(key, node => node.type === 'table')
    // const change = value.change()
    // change.setNodeByKey()
    // onChange(change)
    this.setState({ table: { color: 'red' } })
  }

  getChildContext () {
    return {
      getCellState: this.getCellState,
      setCellState: this.setCellState
    }
  }

  render () {
    const { attributes } = this.props

    return (
      <Broadcast channel={'table'} value={this.state.table}>
        <table {...attributes}>
          <tbody
            onMouseDown={this.onMouseDown}
          >
            {this.props.children}
          </tbody>
        </table>
      </Broadcast>
    )
  }
}

Table.childContextTypes = {
  getCellState: PropTypes.func,
  setCellState: PropTypes.func
}
