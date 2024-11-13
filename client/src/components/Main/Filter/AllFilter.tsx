import { FC, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks/hook';
import FilterItem from './FilterItem';
import AddFilter from './AddFilter';

import '../../../scss/filter/filter_all.scss';

const AllFilter: FC = () => {
    const [addFilter, setAddFilter] = useState<boolean>(false)

    const filters = useAppSelector(filter => filter.filter.filters)

    return (
        <div className="all-filter">

            <ul className='all-filter__block'>
                {
                    filters.map(filter => (
                        <li key={filter._id} className='all-filter__block__item'>
                            <FilterItem name={filter.name} backgroundColor={filter.backgroundColor} textColor={filter.textColor} type='allfilter' />
                        </li>
                    ))
                }
                <button
                    className='all-filter__add-button'
                    onClick={() => setAddFilter(!addFilter)}
                >
                    <p className='all-filter__add-button__pluse'>+</p>
                    <p className='all-filter__add-button__title'>Filter</p>
                </button>
                {addFilter && <AddFilter setAddFilter={setAddFilter}/>}
            </ul>


        </div>
    );
};

export default AllFilter;
