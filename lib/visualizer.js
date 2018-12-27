const themes = require('./themes')
const template = require('./template')

const errors = {
  reqNextUndefined: new Error(
    'The express request (req) and next method were undefined.'
  ),
  reqUndefined: new Error(
    'The express request (req) object was undefined, check your middleware/routes configuration.'
  ),
  routesViewerUndefined: new Error(
    'req.routesViewer was undefined. Did you register the middleware before the visualizer?'
  )
}

module.exports = config => (req, res, next) => {
  if (!req && !next) {
    throw errors.reqNextUndefined
  }
  if (!req && next) {
    return next(errors.reqUndefined)
  }
  if (!req.routesViewer) {
    return next(errors.routesViewerUndefined)
  }

  const theme = config && config.theme ? themes[config.theme] : themes.plain

  return res.send(
    template({
      data: req.routesViewer.data,
      styles: {
        colors: theme
      }
    })
  )
}
