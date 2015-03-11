var List = require('structs-list')
var foldl = List.foldl
var tail = List.tail

module.exports = composer(compose)

/**
 * Accumulate function compositions.
 * f . g . h ...
 *
 * @param {Function} fn
 */

function composer (fn) {
  return function () {
    return foldl(arguments[0], compose, tail(arguments))
  }
}

exports.composer = composer

/**
 * Compose `f` with `g`
 * f . g
 *
 * @param {Function} f
 * @param {Function} g
 */

function compose (f, g) {
  return function () {
    return f.call(this, g.apply(this, arguments))
  }
}
