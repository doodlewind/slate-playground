import React from 'react'

export default class Table extends React.Component {
  onMouseDown = (e) => {

  }

  render () {
    const { attributes } = this.props

    return (
      <table {...attributes}>
        <tbody
          onMouseDown={this.onMouseDown}
        >
          {this.props.children}
        </tbody>
      </table>
    )
  }
}
