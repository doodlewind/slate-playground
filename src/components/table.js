import React from 'react'

export default class Table extends React.Component {
  render () {
    return (
      <table {...this.props.attributes}>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    )
  }
}
