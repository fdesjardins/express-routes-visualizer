const fs = require('fs')
const path = require('path')
const template = fs
  .readFileSync(path.join(__dirname, 'template.html'))
  .toString()

module.exports = ({ title = 'Routes Visualizer', data, styles }) => {
  return format(template, {
    title,
    data,
    styles,
    'styles.colors.background': styles.colors.background,
    'styles.colors.nodeFill': styles.colors.nodeFill,
    'styles.colors.nodeStroke': styles.colors.nodeStroke,
    'styles.colors.edgeStroke': styles.colors.edgeStroke,
    'styles.colors.foreground': styles.colors.foreground
  })
}

const format = (template, args) => {
  Object.keys(args).map(key => {
    template = template.replace(
      new RegExp(`{{${key}}}`, 'g'),
      typeof args[key] === 'object' ? JSON.stringify(args[key]) : args[key]
    )
  })
  return template
}
