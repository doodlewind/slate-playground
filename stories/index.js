import React from 'react'
import { storiesOf } from '@storybook/react'

import BasicEditor from './basic'
import TableEditor from './table'

storiesOf('Editor', module)
  .add('Basic', () => (
    <BasicEditor />
  ))
  .add('Table', () => (
    <TableEditor />
  ))
