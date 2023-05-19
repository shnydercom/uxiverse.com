import {
  PluginBridgeEvent,
  PluginSelectionChangedBridgeEvent,
  PluginEventTypes,
  PluginRenameBridgeEvent,
  PluginDeselectionBridgeEvent,
  PluginFetchBridgeEvent,
  PluginNotifyUserBridgeEvent,
  PluginChangeFindCompBridgeEvent,
} from '../communicationInterfaces'

export function isAPluginSelectionChangedBridgeEvent(
  message: PluginBridgeEvent
): message is PluginSelectionChangedBridgeEvent {
  if (!message) return false
  return message.type === PluginEventTypes.selectionByPlugin
}

export function isAPluginRenameBridgeEvent(
  message: PluginBridgeEvent
): message is PluginRenameBridgeEvent {
  if (!message) return false
  return message.type === PluginEventTypes.renameByPlugin
}

export function isAPluginDeselectionBridgeEvent(
  message: PluginBridgeEvent
): message is PluginDeselectionBridgeEvent {
  if (!message) return false
  return message.type === PluginEventTypes.deselectByPlugin
}

export function isAPluginFetchBridgeEvent(
  message: PluginBridgeEvent
): message is PluginFetchBridgeEvent {
  if (!message) return false
  return message.type === PluginEventTypes.fetchByPlugin
}

export function isAPluginNotifyUserBridgeEvent(
  message: PluginBridgeEvent
): message is PluginNotifyUserBridgeEvent {
  if (!message) return false
  return message.type === PluginEventTypes.notifyUserOutsidePlugin
}

export function isAPluginChangeFindCompBridgeEvent(
  message: PluginBridgeEvent
): message is PluginChangeFindCompBridgeEvent {
  if (!message) return false;
  return message.type === PluginEventTypes.changeFindCompByPlugin;
}