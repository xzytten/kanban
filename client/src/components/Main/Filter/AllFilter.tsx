import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks/hook';
import FilterItem from './FilterItem';
import AddFilterModal from './AddFilterModal';

import '../../../scss/filter/filter_all.scss';
import AddFilterButton from './AddFilterButton';


const AllFilter: FC = () => {
    const [showAddFilterModal, setShowAddFilterModal] = useState<boolean>(false)

    const filters = useAppSelector(filter => filter.filter.filters)

    useEffect(() => {
        console.log(filters)
    }, [filters])
    return (

        <div className="all-filter">

            <ul className='all-filter__block'>
                {
                    filters.map(filter => (
                        <li
                            key={filter._id} className='all-filter__block__item'
                        >
                            <FilterItem filter={filter} type='menu' />
                        </li>
                    ))
                }
                <AddFilterButton type={"menu"} setShowAddFilterModal={setShowAddFilterModal} />
                {showAddFilterModal && <AddFilterModal setShowAddFilterModal={setShowAddFilterModal} />}
            </ul>
        </div>




    );
};

export default AllFilter;
