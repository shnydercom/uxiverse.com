export enum HostEventTypes { selectionChanged = "selectionChanged" }

export interface PluginSelectionChanged {
	type: HostEventTypes;
}