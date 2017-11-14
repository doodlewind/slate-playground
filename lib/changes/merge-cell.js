import emitter from '../utils/emitter'
import { MERGE_CELL } from '../consts'

export default function mergeCell () {
  emitter.emit(MERGE_CELL)
}
