import { FC, useState } from 'react';

import FilterInfo from './FilterInfo';
import { IFilter } from '../../../types/IFilter';

import '../../../scss/filter/filter_item.scss';

interface IFilterItem {
    filter: IFilter,
    type?: 'menu' | 'modal',
    borderColor?: string,
}

const FilterItem: FC<IFilterItem> = ({ filter, type, borderColor }) => {
    const [showFilterInfo, setShowFilterInfo] = useState<boolean>(false)
    return (
        <>
            <article
                className={`filter ${type === 'menu' && 'menu'}`}
                style={{
                    backgroundColor: filter.backgroundColor,
                    border: borderColor && `3px solid ${borderColor}`,
                }}
                {...type === 'menu' && { onClick: () => setShowFilterInfo(true) }}
            >
                <p
                    className={`filter__name ${type === 'menu' && 'menu'}`}
                    style={{ color: filter.textColor }}
                >{filter.name}</p>
            </article >

            {showFilterInfo && <FilterInfo setShowFilterInfo={setShowFilterInfo} filter={filter} />}
        </>

    );
};

export default FilterItem;