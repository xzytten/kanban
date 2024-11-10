import { FC } from 'react';
import '../../scss/filter/filter_item.scss';

interface IFilterItem {
    filter: string,
}
const FilterItem: FC<IFilterItem> = ({ filter }) => {
    return (

        <article className='role'>
            <p className='role__name'>{filter}</p>
        </article>

    );
};

export default FilterItem;