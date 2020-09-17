const createEntity = (entity, parent = null) => {
  return {
    id: entity.id,
    person: {
      id: entity.id,
      department: '',
      name: entity.name,
      title: parent ? parent.person.name : 'Entity',
      totalReports: 0,
    },
    hasChild: false,
    hasParent: !!parent,
    isHighlight: !parent, // TODO: Make this configurable by state
    children: [],
  }
}

const addChildren = (parent, ...children) => {
  if (!children.length) return
  parent.person.totalReports += children.length
  parent.hasChild = true
  const parentChildren = parent.children ? parent.children : parent._children ? parent._children : []
  parentChildren.push(...children)
  parent.children = parentChildren
}

const addEntity = (lookup, entity, config) => {
  // Check if tree is new
  if (!Object.keys(lookup).length) {
    // If entity has a parentId then it's not the root
    if (entity.parentId) return false

    const created = createEntity(entity)

    lookup[entity.id] = created
    lookup.root = created

    return true
  }

  if (!lookup[entity.parentId]) return false

  // Create entity from parent
  const created = createEntity(entity, lookup[entity.parentId])

  // Append child to parent's children array
  addChildren(lookup[entity.parentId], created)

  // Add entity to lookup table by id
  lookup[entity.id] = created

  // Check if given config, if so call render for this new entity
  if (Object.keys(config).length) {
    config.render({
      ...config,
      treeData: lookup.root,
      sourceNode: lookup[entity.parentId],
    })
  }

  return true
}

// TODO: Optimize how they are added, arrange passed array based on parentIDs
const addEntitiesToTree = (lookup, config = {}, ...entities) => {
  const startedWith = entities.length
  let tries = 0
  while (entities.length) {
    if (tries > startedWith + 1) {
      console.log(`Tries: ${tries}`)
      throw new Error('Too many retries. Check tree structure')
    }
    
    // We iterate over each entity in the array and try to add it to the tree
    entities.slice().forEach(entity => {
      const success = addEntity(lookup, entity, config)
      // TODO: Figure out how to do this more efficiently in a consistent manner
      if (success) entities.splice(entities.indexOf(entity), 1)
    })

    // We increment tries to keep track of how many iterations we've gone through the array
    tries += 1
  }

  return lookup.root
}

module.exports = addEntitiesToTree
