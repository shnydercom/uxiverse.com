import React from 'react';
import { CategorizedEdges } from '@uxiverse.com/jsonld-tools';
import { getWellKnownIriSubPath } from '../../../browserlogic/naming-recommendations/IRIUtils';

interface Props {
    categorizedEdges: CategorizedEdges;
}

const CategorizedEdgesList: React.FC<Props> = ({ categorizedEdges }) => {
    return (
        <div>
            {categorizedEdges.straightLineage.map((category) => {
                const items = categorizedEdges.categories[category];
                const categoryTrimmed = getWellKnownIriSubPath(category)
                return (
                    <div key={category}>
                        <div data-ld={category}>{categoryTrimmed}</div>
                        <ul style={{ marginLeft: '2em' }}>
                            {items.map((item) => {
                                const itemTrimmed = getWellKnownIriSubPath(item);
                                return (
                                    <li key={itemTrimmed} data-ld={item}>{itemTrimmed}</li>
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