import React from 'react'
import { TreeviewEntry, TreeviewEntryProps } from "./TreeviewEntry"

export interface TreeViewProps<T extends {}> {
  node: T
  mapNodeChildrenToTreeViewProps: (node: T) => TreeViewProps<T>[];
  mapNodeToTreeviewEntryProps: (node: T) => TreeviewEntryProps
  topClass?: string;
}

export const TreeView: <T extends {}>(props: TreeViewProps<T>) => React.ReactElement = ({
  node, mapNodeChildrenToTreeViewProps, mapNodeToTreeviewEntryProps, topClass
}) => {
  const entryProps = mapNodeToTreeviewEntryProps(node);
  const childTreeViewProps = mapNodeChildrenToTreeViewProps(node);
  return <div className={`tree-view ${topClass ? topClass : ""}`}>
    {childTreeViewProps.map((val, idx) => <TreeView key={`tv-${idx}`} {...val} />)}
    <TreeviewEntry {...entryProps} />
  </div>
}
