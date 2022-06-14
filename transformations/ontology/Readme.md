# uxiverse.com's ontology readme

## ease of use
- you can tag elements in the ontology. To add the developer- and designer-tags for example, you can use: `"inTagList":  ["uxi:Developer-Tag", "uxi:Designer-Tag"]`

## notes
- the generated content in the folder cli-gen has been added, because schema.org changes, uxiverse changes and concatenating them would need versioning which we don't yet have

## known issues/technical decisions for compatibility:
- context for uxi:Button etc. doesn't yet work, full URL is needed at the moment
- `"@id": "uxi:Element",
			"@type": "Class",
			"subClassOf": [
				{
					"@id": "rdfs:Class"
				},
				{
					"@id": "schema:Thing" // this needs to be included to make `WithContext` work
				}`
- `{
			"@id": "uxi:isProminent",
			"@type": "Property",
			"subPropertyOf": {
				"@id": "uxi:HierarchyFlag" //this should inherit the "canBeOfType", but doesn't
			},
			"canExistOnType": {
				"@id": "uxi:UIElement"
			},
			"canBeOfType": {
				"@id": "schema:Boolean" //so we set it here manually
			},`