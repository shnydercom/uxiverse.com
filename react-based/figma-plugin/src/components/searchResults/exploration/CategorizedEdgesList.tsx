import React from 'react';
import { CategorizedEdges } from '@uxiverse.com/jsonld-tools';
import { getWellKnownIriSubPath } from '../../../browserlogic/naming-recommendations/IRIUtils';

interface Props {
    categorizedEdges: CategorizedEdges;
}

const CategorizedEdgesList: React.FC<Props> = ({ categorizedEdges }) => {
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
                                    <li key={itemTrimmed} className='edge' data-ld={item}>{itemTrimmed}</li>
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