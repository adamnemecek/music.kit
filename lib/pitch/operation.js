var parse = require('./parse')
var build = require('./str')

/**
 * Decorate a function to work with parsed pitches
 *
 * @name pitch.operation
 * @function
 */
module.exports = function (fn) {
  return function (a, b) {
    var pa = parse(a)
    var pb = parse(b)
    if (!pa && !pb) return fn(a, b)
    var v = fn(pa || a, pb || b)
    return build(v) || v
  }
}