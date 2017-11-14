import React from 'react'
import PropTypes from 'prop-types'
import { Broadcast } from 'react-broadcast'

import emitter from '../utils/emitter'
import {
  findHighlightKeys,
  findPositionBykey,
  findUpperLeftKey,
  hasHighlight
} from '../utils/grid'
import { MERGE_CELL } from '../consts'

const DEFAULT_CELL = {
  width: ''
}

export default class Table extends React.Component {
  state = {
    isSelecting: false,
    // Key of anchor and focus cells.
    anchorCell: '',
    focusCell: '',
    // Nested array of cells, modeling after `DEFAULT_CELL`.
    grid: []
  }

  componentWillMount () {
    this.generateGrid()
    emitter.on(MERGE_CELL, this.mergeCell)
  }

  // Get cell state from `state.grid` by slate model key, with selection state.
  getCellState = (key) => {
    const { grid } = this.state
    const { node } = this.props
    const pos = findPositionBykey(key, grid, node)

    return {
      ...grid[pos.i][pos.j],
      highlight: hasHighlight(key, this.state, node)
    }
  }

  // Clear anchor and focus cell state.
  clearSelection = () => {
    this.setState({ anchorCell: '', focusCell: '' })
  }

  // Set cell state from `state.grid` by slate model key.
  setCellState = (key, field, data) => {
    const pos = findPositionBykey(key, this.state.grid, this.props.node)
    // FIXME more elegant way to set nested array.
    const tmpGrid = JSON.parse(JSON.stringify(this.state.grid))
    tmpGrid[pos.i][pos.j][field] = data
    this.setState({ grid: tmpGrid })
  }

  // Set focus and anchor cells, type is either 'focus' or 'anchor'.
  setSelectionCell = (key, cellType) => {
    if (!this.state.isSelecting) return

    if (cellType !== 'anchorCell' && cellType !== 'focusCell') return

    // When begin selecting, anchor cell is not set. Moving in this cell should
    // not set it as focus cell.
    if (!this.state.anchorCell && cellType === 'focusCell') return

    // If anchor cell has been set, don't update anchor cell.
    if (this.state.anchorCell && cellType === 'anchorCell') return

    // PERF lazily update state.
    if (
      (cellType === 'anchorCell' && this.state.anchorCell === key) ||
      (cellType === 'focusCell' && this.state.focusCell === key)
    ) {
      return
    }

    this.setState({ [cellType]: key })
  }

  // Set if table is in selecting state.
  setSelecting = (isSelecting) => {
    this.setState({ isSelecting })
  }

  // Merge selected cells. Only works when table instance is being selected.
  mergeCell = () => {
    if (!this.state.anchorCell || !this.state.focusCell) return

    const { node, editor } = this.props
    const { mergeCellNodes } = editor.props.richTable.changes

    const keys = findHighlightKeys(this.state, node)
    const upperLeftKey = findUpperLeftKey(this.state, node)

    const change = this.props.editor.value.change()
    const { onChange } = this.props.editor.props

    mergeCellNodes(change, keys, upperLeftKey)
    onChange(change)
  }

  // Generate `state.grid` from slate model.
  generateGrid = () => {
    const { node } = this.props
    const grid = []
    node.nodes.forEach(rowNode => {
      const row = []
      rowNode.nodes.forEach(colNode => {
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
