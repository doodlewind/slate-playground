import React from 'react'

export default class TableRow extends React.Component {
  render () {
    const { attributes } = this.props

    return (
      <tr {...attributes}>
        {this.props.children}
      </tr>
    )
  }
}
