import React, { useContext } from 'react';
import { CategorizedEdges } from '@uxiverse.com/jsonld-tools';
import { getWellKnownIriSubPath } from '../../../browserlogic/naming-recommendations/IRIUtils';
import { ExploreIRI } from '../../../assets/explore-iri';
import { AddToReplaceValue } from '../../../assets/add-to-replacevalue';
import { PluginExplorationEvent, HoverDefinitionEnterEvent } from '../../../browserlogic/state/stateEvents';
import { GlobalStateContext } from '../../../browserlogic/state/globalStateProvider';
import { CopyIcon } from '../../../assets/copy-icon';
import { copyTextToClipboard } from '../../../browserlogic/copyTextToClipboard';

export interface CategorizedEdgesListProps {
    categorizedEdges: CategorizedEdges;
    wrapCategoryFn?: (propName: string) => string
}

export const CategorizedEdgesList: React.FC<CategorizedEdgesListProps> = ({ categorizedEdges, wrapCategoryFn }) => {
    const globalServices = useContext(GlobalStateContext)
    const { send } = globalServices.mainService
    const exploreHandler = (iri: string) => {
        send({ type: 'CHANGE_EXPLORATION', explorationValue: iri, changePropClassSearch: true } as PluginExplorationEvent)
    }
    const mouseEnterHandler = (hoveredIri: string) => {
        send({
            type: 'HOVER_DEFINITION_ENTER',
            focusedDefinition: hoveredIri,
        } as HoverDefinitionEnterEvent)
    }
    const mouseLeaveHandler = () => {
        send('HOVER_DEFINITION_EXIT')
    }
    const copyButtonHandler = (itemTrimmed: string) => {
        copyTextToClipboard(itemTrimmed);
    }
    return (
        <div className='categorized-edges-view'>
            {categorizedEdges.straightLineage.map((category) => {
                const items = categorizedEdges.categories[category];
                let categoryTrimmed = getWellKnownIriSubPath(category)
                if (wrapCategoryFn) {
                    categoryTrimmed = wrapCategoryFn(categoryTrimmed);
                }
                if (items.length === 0) return null;
                return (
                    <div key={category} className='category'>
                        <div className='cat-label' data-ld={category}>{categoryTrimmed}</div>
                        <ul className='edges'>
                            {items.map((item) => {
                                const itemTrimmed = getWellKnownIriSubPath(item);
                                return (
                                    <li key={itemTrimmed} className='edge' data-ld={item}
                                        onMouseEnter={() => mouseEnterHandler(item)}
                                        onMouseLeave={mouseLeaveHandler}>
                                        <button>
                                            <span className="full-value">{itemTrimmed}</span>
                                            <AddToReplaceValue className="button-icon" />
                                        </button>
                                        <button onClick={() => { exploreHandler(item) }}>
                                            <ExploreIRI className="button-icon explore-icon" />
                                        </button>
                                        <button className='reordered-button' onClick={() => copyButtonHandler(itemTrimmed)}>
                                            <CopyIcon className="button-icon copy-icon" />
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    );
};