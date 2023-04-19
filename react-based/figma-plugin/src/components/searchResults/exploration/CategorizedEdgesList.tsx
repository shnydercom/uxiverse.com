import React, { useContext } from 'react';
import { CategorizedEdges } from '@uxiverse.com/jsonld-tools';
import { getWellKnownIriSubPath } from '../../../browserlogic/naming-recommendations/IRIUtils';
import { ExploreIRI } from '../../../assets/explore-iri';
import { AddToReplaceValue } from '../../../assets/add-to-replacevalue';
import { PluginExplorationEvent, HoverDefinitionEnterEvent } from '../../../browserlogic/state/stateEvents';
import { GlobalStateContext } from '../../../browserlogic/state/globalStateProvider';

interface Props {
    categorizedEdges: CategorizedEdges;
}

const CategorizedEdgesList: React.FC<Props> = ({ categorizedEdges }) => {
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
    return (
        <div className='categorized-edges-view'>
            {categorizedEdges.straightLineage.map((category) => {
                const items = categorizedEdges.categories[category];
                const categoryTrimmed = getWellKnownIriSubPath(category)
                if (items.length === 0) return null;
                return (
                    <div key={category} className='category'>
                        <div className='cat-label' data-ld={category}>{categoryTrimmed}</div>
                        <ul className='edges'>
                            {items.map((item) => {
                                const itemTrimmed = getWellKnownIriSubPath(item);
                                return (
                                    <li key={itemTrimmed} className='edge' data-ld={item}>
                                        <button onClick={() => { exploreHandler(item) }}>
                                            <ExploreIRI className="button-icon" />
                                        </button>
                                        <button onMouseEnter={() => mouseEnterHandler(item)} onMouseLeave={mouseLeaveHandler}>
                                            <span>{itemTrimmed}</span>
                                            <AddToReplaceValue className="button-icon" />
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

export default CategorizedEdgesList;