# base terms for frontend-ontology
Element
Element/DataType
Element/DataTypeProperty
Element/UIElement
Element/Action
Element/State
Element/SemanticFlag
Element/SemanticProperty

# schema:PropertyValueSpecification
PropertyValueSpecification
- multipleValues
- valueName
- defaultValue
- valueRequired
- readonlyValue

# Boolean info properties
DataType/BooleanType
- isActive
- isInactive
- isOn
- isOff
- isChecked
- isUnchecked
- isDisabled
- isEnabled

# Color info properties
DataType/ColorCodeType

# Numeric info properties
DataTypeProperty/NumericTypeProperty
- min
- max
- currentValue
- stepValue

# Text info properties
DataTypeProperty/TextTypeProperty
- valuePattern
- valueMinLength
- valueMaxLength

# Media properties
DataType/MediaDataType
- image
- audio
- video
DataTypeProperty/MediaDataTypeProperty
- isPlaying

# Visual expression properties
VisualExpression
- color
- font
- italic
- bold
- underlined
- background
- highlight

# multi states
some
- selectedIndex
- activeTabIndex
- selectedSet
- unselectedSet

# User interaction state
State/UserActionState
- HoverState
- FocusState
- PressedState
- DraggingState

# User action
Action/UserAction
UserAction
- DetailAction
- NavigateAction
- BrowseAction
- FavoriteAction
- SaveAction
- DragAction
- DropAction
- ResizeAction
- ScrollAction
- DismissAction
- ConfirmAction
- DeleteAction
- ZoomAction
- AlignAction
- BackAction
- UndoAction
- RedoAction
UserAction/DeviceSpecificAction
- ClickAction
- TouchDownAction
- KeyDownAction
- ChangeOrientationAction
- SwipeAction
- PointAction

# User media action
UserAction/MediaAction
- UploadAction
- DownloadAction
- RecordAction
- StartAction
- StopAction
- PauseAction
UserAction/MediaPartAction
- MarkAction
- AnnotateAction

# UI element state
State/UIElementState
- FixedState
- LooseState

- MinifiedState
- ExpandedState
- MaximizedState
- MinimizedState
- FloatingState

- OpenState
- ClosedState

- SortedState
- UnsortedState

- FilteredState
- UnfilteredState

# UI element state (UI stack)
UIElementState/UIStack
- BlankState
- LoadingState
- PartialState
- ErrorState (semantic as well)
- IdealState

# UI element state transitions
UIElementState/UIElementTransitionState
- ClosingState
- OpeningState
- SkeletonState

# issue severity property (Enumeration)
IssueSeverity
- priority
- importance
IssueSeverityType
- Default
- Alert
- Warning
- Error
- Incomplete
- Empty

# UI elements (Atoms)
UIElement/AtomUIElement
- Icon
- Label
- Title
- Subtitle
- Input
- Button
- Heading
- Subheading
- Checkbox
- Radiobutton
- Datepicker
- Timepicker
- Switch
- Textfield
- Link
- Avatar
AtomUIElement/Shape
- Circle
- Triangle
- Rectangle
- Ellipsis
- Star

# UI elements (molecules)
UIElement/MoleculeUIElement
- NavigationBar
- Tooltip
- Searchbar
- Thumbnail
- Dialog
- Step
- Divider
- Dropdown
- Pagination

# UI elements (organisms)
UIElement/OrganismUIElement
- Header
- Footer
- Section
- Card

# UI elements (not Atoms, organizing samepage sub-elements)
UIElement/ContainerUIElement
- DirectoryStructure
- TreeView
- Tabs
- List
- Container
- Table
- Grid
- SingleSelection
- MultiSelection
- ColumnHeader

# Non-visual organization
Element/StructuralElement
- ABTest
- Form
- Template
- Page
- Placeholder
- Context
- Scope
- Constraint
- Autocomplete

# Non-visual properties
variation
- aVersion
- bVersion
triggers
slot
- unorderedSlots
- orderedSlots

# accessibility properties
a11y
- ariaLabel
- moreInfo
- valueText

# User to User Actions (schema.org/CommunicateAction)
UserAction/CommunicateAction
- CommentAction
- ReplyAction
- ReactAction

# Visual semantics
SemanticFlag/HierarchyFlag
- isProminent
- isRaised
- isDense
- isMini
- isPrimary
- isSecondary
- isTertiary
- isCurrent
- isOverlay
- isHidden
- isModal
SemanticFlag/DescriptionFlag
- isHelp
- isContent
- isProgress
SemanticProperty/OutcomeProperty
- result
- output
- status
SemanticProperty/NavigationProperty
- menu
- settings
SemanticProperty/ContextProperty
- role
- user
- group


//Funnel? Wizard?