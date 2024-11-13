import { FC } from 'react';

import '../../../scss/filter/filter_item.scss';

interface IFilterItem {
    name: string,
    backgroundColor: string,
    textColor: string,
    type?: string,
}
const FilterItem: FC<IFilterItem> = ({ name, backgroundColor, textColor, type }) => {
    return (

        <article 
        className={`filter ${type === 'allfilter' && 'allfilter'}`}
        style={{ backgroundColor: backgroundColor }}
        >
            <p 
            className={`filter__name ${type === 'allfilter' && 'allfilter'}`} 
            style={{ color: textColor }}
            >{name}</p>
        </article>

    );
};

export default FilterItem;