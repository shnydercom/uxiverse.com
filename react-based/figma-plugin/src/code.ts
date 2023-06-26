import {
  HostAppElement,
  HostAppElementTypeEquivalents,
  HostCompSearchDoneEvent,
  HostEventTypes,
  HostFetchSuccessfulBridgeEvent,
  HostSelectionChangedBridgeEvent,
  PluginBridgeEvent,
  TypeEquivalentsKeys,
} from './communicationInterfaces'
import {
  isAPluginChangeFindCompBridgeEvent,
  isAPluginDeselectionBridgeEvent,
  isAPluginFetchBridgeEvent,
  isAPluginNotifyUserBridgeEvent,
  isAPluginRenameBridgeEvent,
  isAPluginSelectionChangedBridgeEvent,
} from './figmalogic/pluginBridgeTypeguards'

const determineIsInstanceOfAVariant = (singleSelection: SceneNode): boolean => {
  if (singleSelection.type !== 'INSTANCE') {
    return false
  }
  if (singleSelection.componentProperties) {
    const object = singleSelection.componentProperties
    for (const key in singleSelection.componentProperties) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key]
        if (element.type === 'VARIANT') {
          return true
        }
      }
    }
  }
  return false
}

const determineIsComponentInVariant = (singleSelection: SceneNode): boolean => {
  if (singleSelection.type !== 'COMPONENT') {
    return false
  }
  if (
    singleSelection.parent?.type === 'COMPONENT_SET' &&
    singleSelection.parent?.componentPropertyDefinitions
  ) {
    return true
  }
  return false
}

const forwardFigmaSelectionToPlugin = (
  isSelectionUnavailable: boolean
) => (): void => {
  const { selection } = figma.currentPage
  if (!selection.length) {
    const selChangeObj: HostSelectionChangedBridgeEvent = {
      type: HostEventTypes.selectionChanged,
      selection: [],
      isSelectionUnavailable,
    }
    figma.ui.postMessage(selChangeObj)
    return
  }
  const selectionAsHostAppelements: HostAppElement[] = selection.map(
    singleElemInSelection => {
      const { id, name, type } = singleElemInSelection
      if (TypeEquivalentsKeys.some(val => type === val)) {
        return {
          id,
          name,
          type: type as HostAppElementTypeEquivalents,
          elementFigmaContext: {
            isComponentInVariant: determineIsComponentInVariant(
              singleElemInSelection
            ),
            isInstanceOfAVariant: determineIsInstanceOfAVariant(
              singleElemInSelection
            ),
            isAComponentSet: type === 'COMPONENT_SET' ? true : false,
          },
        }
      }
      return {
        id,
        name,
        type: 'UNSUPPORTED',
        elementFigmaContext: {
          isComponentInVariant: false,
          isInstanceOfAVariant: false,
          isAComponentSet: false,
        },
      }
    }
  )
  const selChangeObj: HostSelectionChangedBridgeEvent = {
    type: HostEventTypes.selectionChanged,
    selection: selectionAsHostAppelements,
    isSelectionUnavailable,
  }
  figma.ui.postMessage(selChangeObj)
}

const forwardFetchToPlugin = (returnObj: Record<string, any>) => {
  const fetchSuccessfulMsg: HostFetchSuccessfulBridgeEvent = {
    type: HostEventTypes.fetchSuccessful,
    result: returnObj,
  }
  figma.ui.postMessage(fetchSuccessfulMsg)
}

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, { width: 300, height: 376 })

  // use case: user has started plugin with a selection in the figma file
  forwardFigmaSelectionToPlugin(false)()
  // use case: user changes selection in figma file after plugin has been started
  figma.on('selectionchange', forwardFigmaSelectionToPlugin(false))
  figma.on('currentpagechange', forwardFigmaSelectionToPlugin(true))

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  let latestSearchText: string //unfortunately the search isn't async or can't be cancelled, so some statefulness here
  figma.ui.onmessage = (msg: PluginBridgeEvent) => {
    if (isAPluginChangeFindCompBridgeEvent(msg)) {
      latestSearchText = msg.searchText
      if (latestSearchText === '') {
        const msgDone: HostCompSearchDoneEvent = {
          type: HostEventTypes.compSearchDone,
        }
        figma.ui.postMessage(msgDone)
        figma.currentPage.selection = []
        return
      }
      const handleSearch = async (asyncSearchParam: string) => {
        const searchResultNodes = figma.currentPage.findAll(node =>
          node.name
            .toLowerCase()
            .includes(asyncSearchParam.trim().toLowerCase())
        )
        return { searchResultNodes, asyncSearchParam }
      }
      handleSearch(msg.searchText).then(searchResult => {
        if (searchResult.asyncSearchParam === latestSearchText) {
          const msgDone: HostCompSearchDoneEvent = {
            type: HostEventTypes.compSearchDone,
          }
          figma.ui.postMessage(msgDone)
          figma.currentPage.selection = searchResult.searchResultNodes
        }
      })
      return
    }
    if (isAPluginSelectionChangedBridgeEvent(msg)) {
      delete msg.selectedNode.elementFigmaContext
      figma.currentPage.selection = [msg.selectedNode as SceneNode]
      figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection)
    }
    if (isAPluginDeselectionBridgeEvent(msg)) {
      figma.currentPage.selection = []
    }
    if (isAPluginRenameBridgeEvent(msg)) {
      delete msg.selectedNode.elementFigmaContext
      figma.currentPage.selection = [msg.selectedNode as SceneNode]
      const nodeToBeChanged = figma.currentPage.selection[0]
      nodeToBeChanged.name = msg.newName
      if (msg.pluginData)
        nodeToBeChanged.setSharedPluginData('uxiverse', 'linkedData', '')
      else
        nodeToBeChanged.setSharedPluginData(
          'uxiverse',
          'linkedData',
          JSON.stringify(msg.pluginData)
        )
    }
    if (isAPluginFetchBridgeEvent(msg)) {
      const requestHeaders: HeadersInit = {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      }
      fetch(msg.url, {
        headers: requestHeaders,
      })
        .then(async res => {
          const fetchResult = await res.json()
          forwardFetchToPlugin(fetchResult)
        })
        .catch(console.error)
    }
    if (isAPluginNotifyUserBridgeEvent(msg)) {
      figma.notify(msg.messageText, { timeout: 1500 })
    }
    // anti-use case: plugin should be closed manually
    //figma.closePlugin()
  }
  // If the plugins isn't run in Figma, run this code
} else {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many shapes and connectors on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__)

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = msg => {
    if (isAPluginFetchBridgeEvent(msg)) {
      fetch(msg.url)
        .then(async res => {
          const fetchResult = await res.json()
          forwardFetchToPlugin(fetchResult)
        })
        .catch(console.error)
    }
  }
}
