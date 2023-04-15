import { FunctionComponent } from "react";
import { ExplorationResult } from "../../../browserlogic/naming-recommendations/exploration";
import { TreeView, TreeViewProps } from "./TreeView";
import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import React from "react";
import { TreeviewEntryProps } from "./TreeviewEntry";
import { getWellKnownIriSubPath } from "../../../browserlogic/naming-recommendations/IRIUtils";

interface LineageTreeviewProps {
    exploration: ExplorationResult;
}

const mapNodeChildrenToTreeViewPropsFactory = (highlight: string) => (node: StringifiedLineage): TreeViewProps<StringifiedLineage>[] => {
    const allChildren: StringifiedLineage[] = node.descendants;
    return allChildren.map((val) => {
        const treeViewProps: TreeViewProps<StringifiedLineage> = {
            mapNodeChildrenToTreeViewProps: mapNodeChildrenToTreeViewPropsFactory(highlight),
            mapNodeToTreeviewEntryProps: mapNodeToTreeviewEntryPropsFactory(highlight),
            node: val
        }
        return treeViewProps
    })
};
const mapNodeToTreeviewEntryPropsFactory = (highlight: string) => (node: StringifiedLineage): TreeviewEntryProps => {
    const formattedIRIs: string[] = node.iris.map(getWellKnownIriSubPath);
    const displayFullValue = formattedIRIs.length > 1 ? formattedIRIs.join(" / ") : formattedIRIs[0];
    return {
        displayFullValue,
        iri: node.iris[0],
        isHighlighted: highlight === node.iris[0],
    }
}

const mapExplorationToTreeViewProps = (exploration: ExplorationResult) => {
    const result: TreeViewProps<StringifiedLineage> = {
        node: exploration.lineage,
        mapNodeChildrenToTreeViewProps: mapNodeChildrenToTreeViewPropsFactory(exploration.lineageHighlightIRI),
        mapNodeToTreeviewEntryProps: mapNodeToTreeviewEntryPropsFactory(exploration.lineageHighlightIRI),
    }
    return result;
}

export const LineageTreeview: FunctionComponent<LineageTreeviewProps> = ({ exploration }) => {
    const treeviewProps = mapExplorationToTreeViewProps(exploration)
    return (<TreeView<StringifiedLineage> {...treeviewProps} topClass="topmost" />);
}