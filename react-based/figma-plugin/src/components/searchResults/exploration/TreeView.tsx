import React from 'react'
import { TreeviewEntry, TreeviewEntryProps } from "./TreeviewEntry"

export interface TreeViewProps<T extends {}> {
  node: T
  mapNodeChildrenToTreeViewProps: (node: T) => TreeViewProps<T>[];
  mapNodeToTreeviewEntryProps: (node: T) => TreeviewEntryProps
}

export const TreeView: <T extends {}>(props: TreeViewProps<T>) => React.ReactElement = ({
  node, mapNodeChildrenToTreeViewProps, mapNodeToTreeviewEntryProps
}) => {
  const entryProps = mapNodeToTreeviewEntryProps(node);
  const childTreeViewProps = mapNodeChildrenToTreeViewProps(node);
  return <div className='treeview'>
    {childTreeViewProps.map((val, idx) => <TreeView key={`tv-${idx}`} {...val} />)}
    <TreeviewEntry {...entryProps} />
  </div>
}
