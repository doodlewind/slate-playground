import React from 'react'
import { storiesOf } from '@storybook/react'

import BasicEditor from '../examples/basic'
import TableEditor from '../examples/table'

storiesOf('Editor', module)
  .add('Basic', () => (
    <BasicEditor />
  ))
  .add('Table', () => (
    <TableEditor />
  ))
