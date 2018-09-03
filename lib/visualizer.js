const themes = require('./themes')
const template = require('./template')

module.exports = config => (req, res, next) => {
  if (!req) {
    if (!next) {
      throw new Error(
        'The express request (req) and next method were undefined.'
      )
    }
    return next(
      new Error(
        'The express request (req) object was undefined, check your middleware/routes configuration.'
      )
    )
  }

  if (!req.routesViewer) {
    return next(
      new Error(
        'req.routesViewer was undefined. Did you register the middleware before the visualizer?'
      )
    )
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
