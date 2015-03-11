var Assert = require('assert')
var compose = require('../lib')

/*eslint-env node, mocha */

describe('#compose()', function () {
  it('should compose two functions', function () {
    var times2plus1 = compose(plus1, times2)
    Assert.equal(times2plus1(3), 7)
  })

  it('should compose from right to left', function () {
    var times2plus1 = compose(plus1, times2)
    Assert.notEqual(times2plus1(3), 8)
    Assert.equal(times2plus1(3), 7)
  })

  it('should compose multiple functions', function () {
    var times2plus3 = compose(plus1, plus1, plus1, times2)
    Assert.equal(times2plus3(3), 9)
  })
})

function plus1 (x) {
  return x + 1
}

function times2 (x) {
  return x * 2
}
