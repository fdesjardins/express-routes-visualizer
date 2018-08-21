exports.mapVsCodeTheme = theme => ({
  background: theme.colors['editor.background'],
  foreground: theme.colors['editor.foreground'],
  parameterizedRoute: theme.tokenColors.find(
    x => x.scope && x.scope[0].match(/parameter/)
  ).settings.foreground,
  nodeFill: theme.colors['list.activeSelectionBackground'],
  nodeStroke: theme.colors['list.activeSelectionForeground'],
  edgeStroke: theme.tokenColors.find(x => x.name === 'Comment').settings
    .foreground
})
