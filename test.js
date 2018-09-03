/* global describe, it */

const assert = require('chai').assert
const { middleware, visualizer } = require('./index')

describe('express-routes-visualizer', () => {
  const req = {
    app: {
      _router: {
        stack: [
          {
            name: '/',
            params: null,
            path: '/',
            route: {
              path: '/',
              stack: [],
              methods: {
                get: true
              }
            }
          },
          {
            name: '/utils/logs',
            params: null,
            path: '/utils/logs',
            route: {
              path: '/utils/logs',
              stack: [],
              methods: {
                get: true
              }
            }
          },
          {
            name: '/utils/tests',
            params: null,
            path: '/utils/tests'
          },
          {
            name: '/tests',
            params: null,
            path: '/tests',
            route: {
              path: '/tests',
              stack: [
                {
                  name: 'httpGet',
                  method: 'get'
                }
              ],
              methods: {
                get: true
              }
            }
          },
          {
            name: '/tests/nested',
            params: null,
            path: '/tests/nested',
            route: {
              path: '/tests/nested',
              stack: [
                {
                  name: 'httpGet',
                  method: 'get'
                }
              ],
              methods: {
                get: true
              }
            }
          },
          {
            name: '',
            params: null,
            path: '',
            route: {
              path: '',
              stack: [
                {
                  name: 'httpGet',
                  method: 'get'
                }
              ],
              methods: {
                get: true
              }
            }
          }
        ]
      }
    },
    get () {
      return ''
    }
  }
  const res = {
    send (data) {
      return data
    }
  }

  it('should exist', done => {
    assert(middleware !== undefined)
    assert(visualizer !== undefined)
    done()
  })

  it('should provide middleware default options', done => {
    middleware()(Object.assign({}, req), null, () => {
      done()
    })
  })

  it('should render httpMethods', done => {
    middleware({ httpMethods: true })(Object.assign({}, req), null, () =>
      done()
    )
  })

  it('should provide an informative error message if req and next are undefined', done => {
    try {
      visualizer()()
    } catch (err) {
      const message = err.toString()
      assert(message.match(/req/) && message.match(/next/))
      done()
    }
  })

  it('should provide an informative error message if req and is undefined', done => {
    visualizer()(null, null, err => {
      const message = err.toString()
      assert(message.match(/req/) && message.match(/undefined/))
      done()
    })
  })

  it('should provide an informative error message if routesViewer is undefined', done => {
    visualizer()(Object.assign({}, req), null, err => {
      const message = err.toString()
      assert(message.match(/routesViewer/) && message.match(/undefined/))
      done()
    })
  })

  it('should use a default theme', done => {
    const _req = Object.assign({}, req)
    middleware()(_req, res, (req, _, next) =>
      visualizer()(
        _req,
        {
          send: data => {
            assert(data.match(/body/) && data.match(/routes/))
            done()
          }
        },
        (err, data) => {
          done(err)
        }
      )
    )
  })

  it('should allow specifying alternative themes', done => {
    const _req = Object.assign({}, req)
    middleware()(_req, res, (req, _, next) =>
      visualizer({ theme: 'dark-gray' })(
        _req,
        {
          send: data => {
            assert(data.match(/body/) && data.match(/routes/))
            done()
          }
        },
        (err, data) => {
          done(err)
        }
      )
    )
  })
})
