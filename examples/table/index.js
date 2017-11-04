import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'

import React from 'react'

class TableEditor extends React.Component {
  state = {
    value: Plain.deserialize('Table editor todo...')
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  render () {
    return (
      <div className='editor'>
        <Editor
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default TableEditor
