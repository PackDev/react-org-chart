const { createElement, PureComponent } = require('react')
const { init } = require('../chart')
const addEntitiesToTree = require('../chart/addEntitiesToTree')
const { differenceWith } = require('lodash')

class OrgChart extends PureComponent {
  render() {
    const { id } = this.props

    return createElement('div', {
      id,
    })
  }

  static defaultProps = {
    id: 'react-org-chart',
    downloadImageId: 'download-image',
    downloadPdfId: 'download-pdf',
    zoomInId: 'zoom-in',
    zoomOutId: 'zoom-out',
    zoomExtentId: 'zoom-extent',
  }

  componentDidMount() {
    const {
      id,
      downloadImageId,
      downloadPdfId,
      zoomInId,
      zoomOutId,
      zoomExtentId,
      tree,
      entities,
      ...options
    } = this.props

    const lookup = {}
    let dynamicTree
    if (!tree) {
      if (!entities || !entities.length)
        throw new Error('Either a tree or a list of entities must be provided to this component.')
      
      dynamicTree = addEntitiesToTree(lookup, ...entities)
    }

    init({
      id: `#${id}`,
      downloadImageId: `#${downloadImageId}`,
      downloadPdfId: `#${downloadPdfId}`,
      zoomInId: zoomInId,
      zoomOutId: zoomOutId,
      zoomExtentId: zoomExtentId,
      data: tree || dynamicTree,
      lookup,
      ...options,
    })
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     tree,
  //     loadConfig,
  //     entities,
  //   } = this.props

  //   if (tree || !entities) return

  //   console.log(entities === prevProps.entities)

  //   console.log('here')

  //   // Check if entities were updated
  //   if (!prevProps.entities || prevProps.entities.length === entities.length) return

  //   console.log('here too')

  //   // Diff prev entities and current
  //   const added = differenceWith(entities, prevProps.entities, (a, b) => a.id === b.id)
  //   console.log(added)

  //   // TODO: Add support for removing entities

  //   // Go through array and render each new node,
  //   // making sure to set the sourceNode as the parent of this node

  //   // const config = loadConfig()

  //   // config.render({
  //   //   ...config,
  //   //   treeData: tree,
  //   //   sourceNode: 
  //   // })
  // }
}

module.exports = OrgChart
