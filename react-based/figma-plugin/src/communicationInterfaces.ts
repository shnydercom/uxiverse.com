export enum HostEventTypes { selectionChanged = "selectionChanged" }
export enum PluginEventTypes {
	selectionByPlugin = "selection-by-plugin",
	renameByPlugin = "rename-by-plugin"
}

export interface HostSelectionChangedBridgeEvent {
	type: HostEventTypes;
	selection: HostAppElement[];
}

export interface PluginSelectionChangedBridgeEvent {
	type: PluginEventTypes;
	selectedNode: HostAppElement
}

export interface PluginRenameBridgeEvent {
	type: PluginEventTypes;
	selectedNode: HostAppElement;
	newName: string;
	pluginData: JSON | null;
}

export type PluginBridgeEvent = PluginSelectionChangedBridgeEvent | PluginRenameBridgeEvent;

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
	| "UNSUPPORTED"

/**
* this helps keep the array and the union type in sync, details: https://dev.to/shnydercom/string-literal-union-types-to-array-or-how-to-kick-pluto-out-of-the-list-of-planets-f21
*/
const TypeEquivalentsHelperObj: { [s in HostAppElementTypeEquivalents]: HostAppElementTypeEquivalents } = {
	'BOOLEAN_OPERATION': 'BOOLEAN_OPERATION'
	, 'CODE_BLOCK': 'CODE_BLOCK'
	, 'COMPONENT': 'COMPONENT'
	, 'COMPONENT_SET': 'COMPONENT_SET'
	, 'CONNECTOR': 'CONNECTOR'
	, 'DOCUMENT': 'DOCUMENT'
	, 'ELLIPSE': 'ELLIPSE'
	, 'EMBED': 'EMBED'
	, 'FRAME': 'FRAME'
	, 'GROUP': 'GROUP'
	, 'INSTANCE': 'INSTANCE'
	, 'LINE': 'LINE'
	, 'LINK_UNFURL': 'LINK_UNFURL'
	, 'MEDIA': 'MEDIA'
	, 'PAGE': 'PAGE'
	, 'POLYGON': 'POLYGON'
	, 'RECTANGLE': 'RECTANGLE'
	, 'SHAPE_WITH_TEXT': 'SHAPE_WITH_TEXT'
	, 'SLICE': 'SLICE'
	, 'STAMP': 'STAMP'
	, 'STAR': 'STAR'
	, 'STICKY': 'STICKY'
	, 'TEXT': 'TEXT'
	, 'VECTOR': 'VECTOR'
	, 'WIDGET': 'WIDGET',
	"UNSUPPORTED": "UNSUPPORTED"
}

export const TypeEquivalentsKeys: HostAppElementTypeEquivalents[] = Object.keys(TypeEquivalentsHelperObj) as HostAppElementTypeEquivalents[]

export interface HostAppElement {
	id: string
	name: string
	type: HostAppElementTypeEquivalents
}