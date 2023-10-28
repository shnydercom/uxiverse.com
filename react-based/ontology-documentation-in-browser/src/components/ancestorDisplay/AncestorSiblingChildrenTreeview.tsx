"use client"
import { FunctionComponent } from "react";
import { RecursiveAncestorProps } from ".";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, TreeItemContentProps, useTreeItem } from '@mui/x-tree-view/TreeItem';
import { StringifiedLineage, getWellKnownIriSubPath } from "@uxiverse.com/jsonld-tools";
import { Link, Typography } from "@mui/material";

interface AncestorSiblingChildrenTreeviewProps extends RecursiveAncestorProps {
    linkFormatterFn?: (input: string) => string;
    isSelectedActiveLink?: boolean;
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

export const AncestorSiblingChildrenTreeview: FunctionComponent<AncestorSiblingChildrenTreeviewProps> = ({ lineage, stopAtTerm, linkFormatterFn, isSelectedActiveLink }) => {
    const strFormatter = linkFormatterFn ?? getWellKnownIriSubPath;
    const renderTree = (lineageNode: StringifiedLineage) => {
        const unjoined = lineageNode.iris.map(getWellKnownIriSubPath);
        const lineageNodeCombined = unjoined.join(", ");
        return (
            <TreeItem key={lineageNodeCombined} nodeId={lineageNodeCombined} label={unjoined}
                ContentComponent={({ label }) => {
                    const strArrLabel: string[] = Array.isArray(label) ? label : [];
                    const {
                        disabled,
                        expanded,
                        selected,
                        focused,
                        handleExpansion,
                        handleSelection,
                        preventSelection,
                    } = useTreeItem(lineageNodeCombined);
                    if (selected) {
                        if (isSelectedActiveLink) {
                            return <Link
                                sx={{ fontWeight: "bold" }}
                                href={getWellKnownIriSubPath(lineageNode.iris[0])}>{strArrLabel[0]}</Link>
                        }
                        return <Typography fontWeight={"bold"}>{strArrLabel[0]}</Typography>
                    }
                    return <>{lineageNode.iris.map(strFormatter).map(
                        (iri, idx) => {
                            const subLabel = strArrLabel[idx];
                            if (idx !== 0) {
                                return <>
                                    {", "}
                                    <Link key={idx} href={iri}>{subLabel}</Link>
                                </>
                            }
                            return <Link key={idx} href={iri}>{subLabel}</Link>
                        }

                    )}</>
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