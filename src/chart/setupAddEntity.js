

const addEntity = (loadConfig) => {
  return (entity, parentId) => {
    const { tree, render } = loadConfig()

    // Get parent
    

    // Add child
  }
}

export default (config) => {
  const { loadConfig } = config

  // Add function to config
  config.addEntity = addEntity(loadConfig)
}