import React from 'react'
import PropTypes from 'prop-types'
import { Broadcast } from 'react-broadcast'

const DEFAULT_CELL = {
  width: ''
}

export default class Table extends React.Component {
  state = {
    isSelecting: false,
    anchorCell: '',
    focusCell: '',
    // Nested array of cells, modeling after `DEFAULT_CELL`.
    grid: []
  }

  componentWillMount () {
    this.generateGrid()
  }

  // Get table position by slate model key.
  findPositionBykey = (key) => {
    const { node } = this.props
    let position = { i: -1, j: -1 }
    this.state.grid.forEach((row, i) => {
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

  // Get cell state from `state.grid` by slate model key, with selection state.
  getCellState = (key) => {
    const pos = this.findPositionBykey(key)
    if (pos) {
      return {
        ...this.state.grid[pos.i][pos.j],
        highlight: (
          key === this.state.anchorCell ||
          key === this.state.focusCell
        )
      }
    } else {
      console.warn(`Can't find node with key ${key}`)
      return null
    }
  }

  // Clear anchor and focus cell state.
  clearSelection = () => {
    this.setState({ anchorCell: '', focusCell: '' })
  }

  // Set cell state from `state.grid` by slate model key.
  setCellState = (key, field, data) => {
    const pos = this.findPositionBykey(key)

    if (pos) {
      // FIXME more elegant way to set nested array.
      const tmpGrid = JSON.parse(JSON.stringify(this.state.grid))
      tmpGrid[pos.i][pos.j][field] = data
      this.setState({ grid: tmpGrid })
    } else {
      console.warn(`Can't find node with key ${key}`)
    }
  }

  // Set focus and anchor cells, type is either 'focus' or 'anchor'.
  setSelectionCell = (key, type) => {
    if (!this.state.isSelecting) return

    if (type !== 'anchor' && type !== 'focus') return

    // When begin selecting, anchor cell is not set. Moving in this cell should
    // not set it as focus cell.
    if (!this.state.anchorCell && type === 'focus') return

    // If anchor cell has been set, don't update anchor cell.
    if (this.state.anchorCell && type === 'anchor') return

    const field = type + 'Cell'
    this.setState({ [field]: key })
  }

  // Set if table is in selecting state.
  setSelecting = (isSelecting) => {
    this.setState({ isSelecting })
  }

  // Generate `state.grid` from slate model.
  generateGrid = () => {
    const { node } = this.props
    const grid = []
    node.nodes.forEach(nodeRow => {
      const row = []
      nodeRow.nodes.forEach(nodeCol => {
        row.push(DEFAULT_CELL)
      })
      grid.push(row)
    })

    this.setState({ grid })
  }

  getChildContext () {
    return {
      clearSelection: this.clearSelection,
      getCellState: this.getCellState,
      setCellState: this.setCellState,
      setSelecting: this.setSelecting,
      setSelectionCell: this.setSelectionCell
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
  clearSelection: PropTypes.func,
  getCellState: PropTypes.func,
  setCellState: PropTypes.func,
  setSelecting: PropTypes.func,
  setSelectionCell: PropTypes.func
}
