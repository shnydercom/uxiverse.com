
import { PluginBridgeEvent, PluginSelectionChangedBridgeEvent, PluginEventTypes, PluginRenameBridgeEvent } from "../communicationInterfaces"

export function isAPluginSelectionChangedBridgeEvent(message: PluginBridgeEvent): message is PluginSelectionChangedBridgeEvent {
    if (!message) return false;
    return (message as PluginSelectionChangedBridgeEvent).type === PluginEventTypes.selectionByPlugin;
}

export function isAPluginRenameBridgeEvent(message: PluginBridgeEvent): message is PluginRenameBridgeEvent {
    if (!message) return false;
    return (message as PluginSelectionChangedBridgeEvent).type === PluginEventTypes.renameByPlugin;
}