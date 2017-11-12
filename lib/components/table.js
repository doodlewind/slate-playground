import React from 'react'
import PropTypes from 'prop-types'
import { Broadcast } from 'react-broadcast'

export default class Table extends React.Component {
  state = {
    anchorCell: '',
    focusCell: '',
    // Cell: Map<colSpan, rowSpan, width>
    // Table: Array<Array<Cell>>
    table: []
  }

  componentWillMount () {
    this.generateTable()
  }

  // Get table position by slate model key.
  findPositionBykey = (key) => {
    const { node } = this.props
    let position = { i: -1, j: -1 }
    this.state.table.forEach((row, i) => {
      const nodeRow = node.nodes.get(i)
      if (!nodeRow) return

      row.forEach((cell, j) => {
        const nodeCol = nodeRow.nodes.get(j)
        if (nodeCol.key === key) {
          position = { i, j }
        }
      })
    })

    return position
  }

  // Get cell state from `state.table` by slate model key
  getCellState = (key) => {
    const { i, j } = this.findPositionBykey(key)
    if (i >= 0 && j >= 0) {
      return this.state.table[i][j]
    } else {
      console.warn(`Can't find node with key ${key}`)
      return { colSpan: 1, rowSpan: 1, width: '' }
    }
  }

  // Set cell state from `state.table` by slate model key.
  setCellState = (key, field, data) => {
    const { i, j } = this.findPositionBykey(key)

    if (i >= 0 && j >= 0) {
      // FIXME more elegant way to set nested array.
      const tmpTable = JSON.parse((JSON.stringify(this.state.table)))
      tmpTable[i][j][field] = data
      this.setState({ table: tmpTable })
    } else {
      console.warn(`Can't find node with key ${key}`)
    }
  }

  generateTable = () => {
    const { node } = this.props
    const table = []
    node.nodes.forEach(nodeRow => {
      const row = []
      nodeRow.nodes.forEach(nodeCol => {
        row.push({ colSpan: 1, rowSpan: 1, width: '' })
      })
      table.push(row)
    })

    this.setState({ table })
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
      <Broadcast channel={'table'} value={this.state}>
        <table {...attributes}>
          <tbody>
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
