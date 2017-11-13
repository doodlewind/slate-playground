/** @jsx h */
import { createHyperscript } from 'slate-hyperscript'

const h = createHyperscript({
  blocks: {
    paragraph: 'paragraph',
    table: 'table',
    table_row: 'table_row',
    table_cell: 'table_cell'
  }
})

const value = (
  <value>
    <document>
      <paragraph>
        Table example.
      </paragraph>
      <table type='paragraph'>
        <table_row>
          <table_cell>
            0, 0
          </table_cell>
          <table_cell>
            0, 1
          </table_cell>
          <table_cell>
            0, 2
          </table_cell>
          <table_cell>
            0, 3
          </table_cell>
        </table_row>

        <table_row>
          <table_cell>
            1, 0
          </table_cell>
          <table_cell>
            1, 1
          </table_cell>
          <table_cell>
            1, 2
          </table_cell>
          <table_cell>
            1, 3
          </table_cell>
        </table_row>

        <table_row>
          <table_cell>
            2, 0
          </table_cell>
          <table_cell>
            2, 1
          </table_cell>
          <table_cell>
            2, 2
          </table_cell>
          <table_cell>
            2, 3
          </table_cell>
        </table_row>

        <table_row>
          <table_cell>
            3, 0
          </table_cell>
          <table_cell>
            3, 1
          </table_cell>
          <table_cell>
            3, 2
          </table_cell>
          <table_cell>
            3, 3
          </table_cell>
        </table_row>
      </table>
      <paragraph>
        Try editing table above!
      </paragraph>
    </document>
  </value>
)

export default value
