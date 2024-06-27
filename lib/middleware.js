const path = require('path')
/**
 * Middleware for providing routes stack hierarchy information to routes
 */
module.exports = options => (req, res, next) => {
  const config = {
    includeHttpMethods: false,
    ...options
  }

  // Grab the app's route stack information
  const routeStack = req.app._router.stack
  .map(element => {
    return {
      name: element.name,
      params: element.params,
      path: element.path,
      route: element.route
    }
  })
  .filter(e => e.route)
  .sort((a, b) => a.route.path.length - b.route.path.length)

  /**
   * * FORK by Drozerah
   * https://github.com/drozerah
   *
   * feat: add express.Router() instances visualisation
   *
   */
  // Helpers
  // Extract a path from a regular expression turned into a string type
  const getPathFromRegexString = routerRegexp => {
    let routerPath = routerRegexp
      .toString()
      .split(`${path.sep}`)
      .filter(str => str != '/^')
      .filter(str => str != '/?(?=')
      .filter(str => str != '/|$)/i')
      if (!routerPath.length) {
        return `/`
      } else {
        routerPath = routerPath
          .map(str => str.replace(/\//g, ''))
          .reduce((acc, cur) => acc + '/' + cur, [])
        return routerPath
      }
  }

  // Objects factory
  const creatRouterElement = (name, params, path, route) => { return { name, params, path, route }}
  /**
   * Grab the app's route stack information from router
   */
  // Init results Array
  const routerRouteStack = []

  // Work with express.Router() instances members
  req.app._router.stack
    .forEach(routerStackElement => {
      if ( routerStackElement.name === 'router') {
        // Get parent path as prefix string
        const routePrefix = getPathFromRegexString(routerStackElement.regexp)
        return routerStackElement.handle.stack
        // Type 'bound dispatch' is a Router element
        .filter(routerElement => routerElement.name === 'bound dispatch')
        .forEach(routerElement => {
          const name   = routerElement.name
          const params = routerElement.params
          const path   = routerElement.path
          const route  = routerElement.route
          // Prevent path to be modifyed when middleware is reload
          if (!route.path.includes(routePrefix)) {
            // Construct paths with prefix
            if (route.path === '/') {
              // is an index
              route.path = routePrefix
            } else {
              // is a subpath
              route.path = routePrefix + route.path
            }
          }
          // Create router element
          const result = creatRouterElement(name, params, path, route)
          // Store result
          routerRouteStack.push(result)
          routerRouteStack.sort((a, b) => a.route.path.length - b.route.path.length)
        })
      }
    })

  const hierarchy = determineHierarchy([...routeStack, ...routerRouteStack], config.httpMethods)
  // const hierarchy = determineHierarchy(routeStack, config.httpMethods)

  // ** FORK END


  // Transform the hierarchy structure into a final
  // structure more suitable for graphing with D3
  const treeData = []
  Object.keys(hierarchy).map(key => {
    const children = getChildren(hierarchy[key])
    treeData.push({
      name: `/${key}`,
      children: children
    })
  })

  req.routesViewer = {
    data: sortChildren({
      name: `${req.get('host')}`,
      children: treeData
    })
  }
  return next()
}


/**
 * Determine if the given routePath has already been stored
 */
const hasPath = (routePath, transformed) => {
  let field = transformed
  const split = routePath.split('/')
  split.map((s, i) => {
    if (field && field[s]) {
      field = field[s]
    } else {
      field = null
    }
  })
  return field || false
}

/**
 * Determine the actual routes hierarchy and any relevant features
 */
const determineHierarchy = (routeStack, includeHttpMethods = true) => {
  const transformed = {}
  routeStack.map(element => {
    if (element.route) {
      const split = element.route.path.split('/').slice(1)
      if (split.length === 0) {
        return
      }
      // Handle the base routes
      if (split.length === 1) {
        transformed[split[0]] = {}
        if (includeHttpMethods) {
          Object.keys(element.route.methods).map(method => {
            transformed[split[0]][method.toUpperCase()] = {
              isHttpMethod: true,
              method: method.toUpperCase()
            }
          })
        }
        return
      }
      // Handle the nested routes
      for (const i in split) {
        const subpath = split.slice(0, split.length - i).join('/')
        const existingElement = hasPath(subpath, transformed)
        if (existingElement) {
          const key = split.slice(split.length - i).join('/')
          if (key !== '') {
            existingElement[key] = {
              ...existingElement[key]
            }
            if (element.route.methods) {
              if (includeHttpMethods) {
                Object.keys(element.route.methods).map(method => {
                  existingElement[key][method.toUpperCase()] = {
                    isHttpMethod: true,
                    method: method.toUpperCase()
                  }
                })
              }
            }
            return
          }
        }
      }
      transformed[split.join('/')] = {}
    }
  })
  return transformed
}

/**
 * Recursively find the children of the given route
 * @param {object} element An element from the hierarchy intermediate structure
 */
const getChildren = element => {
  const keys = Object.keys(element)
  if (!keys.length) {
    return []
  }
  return keys.map(k => {
    const nestedElement = element[k]

    if (nestedElement.isHttpMethod) {
      return {
        name: k,
        children: []
      }
    }
    return {
      name: `/${k}`,
      children: getChildren(nestedElement)
    }
  })
}

/**
 * Sort the element and its children recursively
 * @param {object} element An element from the final routes structure
 */
const sortChildren = (
  element,
  sorter = (a, b) => a.name.localeCompare(b.name)
) => {
  return {
    name: element.name,
    children:
      element.children && element.children.length
        ? element.children.sort(sorter).map(c => sortChildren(c))
        : null
  }
}
