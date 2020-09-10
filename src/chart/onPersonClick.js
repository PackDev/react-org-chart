const d3 = require('d3')

module.exports = onPersonClick

function onPersonClick(configOnClick) {
  const { loadConfig } = configOnClick

  return datum => {
    if (d3.event.defaultPrevented) return
    const config = loadConfig()
    const { onPersonClick } = config
    event.preventDefault()

    if (onPersonClick) {
      const result = onPersonClick(datum, d3.event)

      // If the `onPersonClick` handler returns `false`
      // Cancel the rest of this click handler
      if (typeof result === 'boolean' && !result) {
        return
      }
    }
  }
}