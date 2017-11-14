import EventEmitter from 'events'

// Event emitter singleton. Events are triggered from toolbar and listened
// by react table instances.
const emitter = new EventEmitter()

export default emitter
