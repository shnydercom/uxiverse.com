"use client"
import { FunctionComponent } from "react";
import { RecursiveAncestorProps } from ".";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, useTreeItem } from '@mui/x-tree-view/TreeItem';
import { StringifiedLineage, getWellKnownIriSubPath } from "@uxiverse.com/jsonld-tools";
import { Link, Typography } from "@mui/material";

interface AncestorSiblingChildrenTreeviewProps extends RecursiveAncestorProps {

}

const getAllNodeIdsInTree = (lineage: StringifiedLineage): string[] => {
    const result: string[] = [];
    if (lineage.descendants.length === 0) {
        return [];
    }
    const subNodeResult = lineage.descendants.flatMap((descendant) => getAllNodeIdsInTree(descendant));
    const lineageNodeCombined = lineage.iris.map(getWellKnownIriSubPath).join(", ");
    result.push(lineageNodeCombined, ...subNodeResult)
    return result;
}

export const AncestorSiblingChildrenTreeview: FunctionComponent<AncestorSiblingChildrenTreeviewProps> = ({ lineage, stopAtTerm }) => {
    const renderTree = (lineageNode: StringifiedLineage) => {
        const lineageNodeCombined = lineageNode.iris.map(getWellKnownIriSubPath).join(", ");
        return (
            <TreeItem key={lineageNodeCombined} nodeId={lineageNodeCombined} label={lineageNodeCombined}
                ContentComponent={(props) => {
                    const {
                        disabled,
                        expanded,
                        selected,
                        focused,
                        handleExpansion,
                        handleSelection,
                        preventSelection,
                    } = useTreeItem(lineageNodeCombined);
                    if (selected) { return <Typography>{props.label}</Typography> }
                    return <>{lineageNode.iris.map(getWellKnownIriSubPath).map(
                        (iri, idx) => <Link key={idx} href={iri}>{props.label}</Link>)}</>
                }}>
                {
                    lineageNode.descendants.map((node) => {
                        return renderTree(node)
                    })
                }
            </TreeItem>
        )
    };

    const nodeIdsInTree = getAllNodeIdsInTree(lineage);
    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root", ...nodeIdsInTree]}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultSelected={getWellKnownIriSubPath(stopAtTerm)}
            sx={{ height: "fit-content", flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {renderTree(lineage)}
        </TreeView>
    );
}