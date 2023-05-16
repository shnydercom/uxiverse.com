export enum HostEventTypes {
  selectionChanged = 'selectionChanged',
  fetchSuccessful = 'fetchSuccessful',
}
export enum PluginEventTypes {
  deselectByPlugin = 'deselect-by-plugin',
  selectionByPlugin = 'selection-by-plugin',
  renameByPlugin = 'rename-by-plugin',
  fetchByPlugin = 'fetch-by-plugin',
  notifyUserOutsidePlugin = 'notify-user-toast'
}

export interface HostSelectionChangedBridgeEvent {
  type: HostEventTypes
  selection: HostAppElement[]
  /**
   * use case: page changes
   */
  isSelectionUnavailable: boolean
}

export interface HostFetchSuccessfulBridgeEvent {
  type: HostEventTypes.fetchSuccessful
  result: Record<string, any>
}

export interface PluginSelectionChangedBridgeEvent {
  type: PluginEventTypes.selectionByPlugin
  selectedNode: HostAppElement
}

export interface PluginDeselectionBridgeEvent {
  type: PluginEventTypes.deselectByPlugin
}

export interface PluginFetchBridgeEvent {
  type: PluginEventTypes.fetchByPlugin
  url: string
}

export interface PluginRenameBridgeEvent {
  type: PluginEventTypes.renameByPlugin
  selectedNode: HostAppElement
  newName: string
  pluginData: JSON | null
}

export interface PluginNotifyUserBridgeEvent {
  type: PluginEventTypes.notifyUserOutsidePlugin;
  messageText: string;
}

export type PluginBridgeEvent =
  | PluginSelectionChangedBridgeEvent
  | PluginDeselectionBridgeEvent
  | PluginRenameBridgeEvent
  | PluginFetchBridgeEvent
  | PluginNotifyUserBridgeEvent

/**
 * the plugin can't catch up with all the new types that will be added to the host app, this is a sort of "supported types"-list
 */
export type HostAppElementTypeEquivalents =
  | 'BOOLEAN_OPERATION'
  | 'CODE_BLOCK'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'CONNECTOR'
  | 'DOCUMENT'
  | 'ELLIPSE'
  | 'EMBED'
  | 'FRAME'
  | 'GROUP'
  | 'INSTANCE'
  | 'LINE'
  | 'LINK_UNFURL'
  | 'MEDIA'
  | 'PAGE'
  | 'POLYGON'
  | 'RECTANGLE'
  | 'SHAPE_WITH_TEXT'
  | 'SLICE'
  | 'STAMP'
  | 'STAR'
  | 'STICKY'
  | 'TEXT'
  | 'VECTOR'
  | 'WIDGET'
  // a catch-all for unsupported types
  | 'UNSUPPORTED'

/**
 * this helps keep the array and the union type in sync, details: https://dev.to/shnydercom/string-literal-union-types-to-array-or-how-to-kick-pluto-out-of-the-list-of-planets-f21
 */
const TypeEquivalentsHelperObj: {
  [s in HostAppElementTypeEquivalents]: HostAppElementTypeEquivalents
} = {
  BOOLEAN_OPERATION: 'BOOLEAN_OPERATION',
  CODE_BLOCK: 'CODE_BLOCK',
  COMPONENT: 'COMPONENT',
  COMPONENT_SET: 'COMPONENT_SET',
  CONNECTOR: 'CONNECTOR',
  DOCUMENT: 'DOCUMENT',
  ELLIPSE: 'ELLIPSE',
  EMBED: 'EMBED',
  FRAME: 'FRAME',
  GROUP: 'GROUP',
  INSTANCE: 'INSTANCE',
  LINE: 'LINE',
  LINK_UNFURL: 'LINK_UNFURL',
  MEDIA: 'MEDIA',
  PAGE: 'PAGE',
  POLYGON: 'POLYGON',
  RECTANGLE: 'RECTANGLE',
  SHAPE_WITH_TEXT: 'SHAPE_WITH_TEXT',
  SLICE: 'SLICE',
  STAMP: 'STAMP',
  STAR: 'STAR',
  STICKY: 'STICKY',
  TEXT: 'TEXT',
  VECTOR: 'VECTOR',
  WIDGET: 'WIDGET',
  UNSUPPORTED: 'UNSUPPORTED',
}

export const TypeEquivalentsKeys: HostAppElementTypeEquivalents[] = Object.keys(
  TypeEquivalentsHelperObj
) as HostAppElementTypeEquivalents[]

export interface HostAppElement {
  id: string
  name: string
  type: HostAppElementTypeEquivalents
  elementFigmaContext?: ElementFigmaContextProperties;
}

export interface ElementFigmaContextProperties {
  isComponentInVariant: boolean;
  isInstanceOfAVariant: boolean;
  isAComponentSet: boolean;
}