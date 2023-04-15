import { FunctionComponent } from "react";
import { ExplorationResult } from "../../../browserlogic/naming-recommendations/exploration";
import { TreeView, TreeViewProps } from "./TreeView";
import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import React from "react";
import { TreeviewEntryProps } from "./TreeviewEntry";
import { uxiverseRootIRI } from "../../../browserlogic/naming-recommendations/ontology-globals";

interface LineageTreeviewProps {
    exploration: ExplorationResult;
}


const mapNodeChildrenToTreeViewProps = (node: StringifiedLineage): TreeViewProps<StringifiedLineage>[] => {
    const allChildren: StringifiedLineage[] = node.descendants;
    return allChildren.map((val) => {
        const treeViewProps: TreeViewProps<StringifiedLineage> = {
            mapNodeChildrenToTreeViewProps,
            mapNodeToTreeviewEntryProps,
            node: val
        }
        return treeViewProps
    })
};
const mapNodeToTreeviewEntryProps = (node: StringifiedLineage): TreeviewEntryProps => {
    const formattedIRIs: string[] = node.iris.map((val) => val.substring(uxiverseRootIRI.length))
    return {
        displayFullValue: formattedIRIs.length > 1 ? formattedIRIs.join(" / ") : formattedIRIs[0],
        iri: node.iris[0],
    }
}

const mapExplorationToTreeViewProps = (exploration: ExplorationResult) => {
    const result: TreeViewProps<StringifiedLineage> = {
        node: exploration.lineage,
        mapNodeChildrenToTreeViewProps,
        mapNodeToTreeviewEntryProps,
    }
    return result;
}

export const LineageTreeview: FunctionComponent<LineageTreeviewProps> = ({ exploration }) => {
    const treeviewProps = mapExplorationToTreeViewProps(exploration)
    return (<TreeView<StringifiedLineage> {...treeviewProps} />);
}