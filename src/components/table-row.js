import React from 'react'

export default class TableRow extends React.Component {
  render () {
    return (
      <tr {...this.props.attributes}>
        {this.props.children}
      </tr>
    )
  }
}
