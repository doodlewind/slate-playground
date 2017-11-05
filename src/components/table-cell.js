import React from 'react'

export default class TableCell extends React.Component {
  render () {
    return (
      <td {...this.props.attributes}>
        {this.props.children}
      </td>
    )
  }
}
