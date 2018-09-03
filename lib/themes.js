const httpMethodsGray = {
  GET: {
    fill: '#999',
    stroke: ''
  },
  PUT: {
    fill: '#777',
    stroke: ''
  },
  DELETE: {
    fill: '#555',
    stroke: ''
  },
  POST: {
    fill: '#888',
    stroke: ''
  },
  PATCH: {
    fill: '#666',
    stroke: ''
  }
}

const httpMethodsColor = {
  GET: {
    fill: '#54d45c',
    stroke: '#54d45c'
  },
  PUT: {
    fill: '#E1CA96',
    stroke: '#E1CA96'
  },
  DELETE: {
    fill: '#A63446',
    stroke: '#A63446'
  },
  POST: {
    fill: '#6c9ce0',
    stroke: '#6c9ce0'
  },
  PATCH: {
    fill: 'violet',
    stroke: 'violet'
  }
}

exports['plain'] = {
  background: '#eee',
  foreground: '#24292e',
  parameterizedRoute: '#0055cc',
  nodeFill: '#eee',
  nodeStroke: '#6a717c',
  edgeStroke: '#6a717c',
  circle: {
    fill: '#222',
    stroke: '#6a717c',
    leaf: {
      fill: '#eee',
      stroke: '#6a717c'
    }
  },
  httpMethods: httpMethodsColor
}

exports['dark-gray'] = {
  background: '#222',
  foreground: '#999',
  parameterizedRoute: '#eee',
  nodeFill: '#444',
  nodeStroke: '#999',
  edgeStroke: '#444',
  circle: {
    fill: '#999',
    stroke: '#999',
    leaf: {
      fill: '#222',
      stroke: '#444'
    }
  },
  httpMethods: httpMethodsGray
}

exports['light-gray'] = {
  background: '#f7f7f7',
  foreground: '#666',
  parameterizedRoute: '#000',
  nodeFill: '#eee',
  nodeStroke: '#444',
  edgeStroke: '#444',
  circle: {
    fill: '#777',
    stroke: '#777',
    leaf: {
      fill: '#f7f7f7',
      stroke: '#444'
    }
  },
  httpMethods: httpMethodsGray
}

exports['dark-blue'] = {
  background: '#1d252c',
  foreground: '#c2c9d6',
  parameterizedRoute: '#67bbe4',
  nodeFill: '#1d252c',
  nodeStroke: '#c2c9d6',
  edgeStroke: '#444f63',
  circle: {
    fill: '#c2c9d6',
    stroke: '#c2c9d6',
    leaf: {
      fill: '#1d252c',
      stroke: '#444f63'
    }
  },
  httpMethods: httpMethodsGray
}

exports['burn'] = {
  background: '#3f3f3f',
  foreground: '#b4b4a8',
  parameterizedRoute: '#d19494',
  nodeFill: '#3f3f3f',
  nodeStroke: '#b4b4a8',
  edgeStroke: '#738d73',
  circle: {
    fill: '#b4b4a8',
    stroke: '#738d73',
    leaf: {
      fill: '#3f3f3f',
      stroke: '#738d73'
    }
  },
  httpMethods: httpMethodsGray
}
