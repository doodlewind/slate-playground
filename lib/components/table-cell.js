import React from 'react'

export default class TableCell extends React.Component {
  onMouseDown = (e) => {
    console.log(this.props.node)
  }
  onMouseEnter = (e) => {

  }
  onMouseLeave = (e) => {

  }
  onMouseUp = (e) => {

  }

  render () {
    const { attributes } = this.props
    return (
      <td
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
        {...attributes}
      >
        {this.props.children}
      </td>
    )
  }
}
