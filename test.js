/* global describe, it */

const assert = require('chai').assert
const { middleware, visualizer } = require('./index')

describe('express-routes-visualizer', () => {
  it('should exist', done => {
    assert(middleware !== undefined)
    assert(visualizer !== undefined)
    done()
  })
})
