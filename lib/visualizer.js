const path = require('path')
const fs = require('fs')

const themes = require('./themes')
const template = require('./template')

module.exports = config => (req, res, next) => {
  let theme = null
  if (config && config.theme) {
    theme = themes[config.theme]
  }

  if (req.routesViewer) {
    return res.send(
      template({
        data: req.routesViewer.data,
        styles: {
          colors: theme
        }
      })
    )
  }

  return next()
}
