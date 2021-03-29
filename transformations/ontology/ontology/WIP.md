# terms for frontend-ontology

# Boolean info
active
inactive

on
off

checked
unchecked

disabled
enabled

# Numeric info
min
max
currentValue

# Media info
isPlaying
image
audio
video

# Visual expression
color
font
italic
bold
underlined
background
highlight

# multi states
selected
unselected

activeTab

# User interaction state
hover
focus
pressed
dragging

# User action
action
detail
navigate
browse
favorite
save
drag
drop
click
keyDown
resize
changeOrientation
scroll
dismiss
confirm
swipe
point
delete
zoom
align
back


# User media action
upload
download
record
start
stop
pause

mark
annotate

# UI element state
fixed
loose

minified
expanded
maximized
floating

open
closed

sorted
unsorted

filtered
unfiltered

# UI element state (UI stack)
blank
loading
partial
error (semantic as well)
ideal

# UI element state transitions
opening
closing
skeleton

# Visual semantics
prominent
raised
dense
mini
primary
current
role
user
hierarchy
help
content
progress


overlay

result
output
status


hidden
modal

menu

# issue severity (Enumeration)
IssueSeverityType
- Default
- Alert
- Warning
- Error
- Incomplete
- Empty

issue
- priority
- importance

# UI elements (Atoms)
AtomUIElement
- Icon
- Label
- Title
- Subtitle
- Input
- Button
- Shape
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

# UI elements (molecules)
MoleculeUIElement
- NavigationBar
- Tooltip
- Searchbar
- Searchfield
- Thumbnail
- Dialog
- Step
- Divider
- Dropdown
- Pagination

# UI elements (organisms)
OrganismUIElement
- Header
- Footer
- Section
- Card

# UI elements (not Atoms, organizing samepage sub-elements)
ContainerUIElement
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
StructuralUIElement
- ABTest
- Form
- Template
- Page
- Placeholder
- Context
- Scope
- Constraint
- Autocomplete

# Non-visual relations
variation
- aVersion
- bVersion
triggers

# accessibilitz relations
a11y
- ariaLabel
- moreInfo
- valueText

# User to User Actions (schema.org/CommunicateAction)
CommunicateAction
- CommentAction
- ReplyAction
- ReactAction


TODO: add https://schema.org/PropertyValueSpecification values