export enum HostEventTypes { selectionChanged = "selectionChanged" }

export interface PluginSelectionChanged {
	type: HostEventTypes;
	selection: FigmaSelectionList;
}

export type FigmaSelectionList = readonly SceneNode[]