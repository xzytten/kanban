import { FC, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks/hook';
import FilterItem from './FilterItem';
import AddFilterModal from './AddFilterModal';
import AddFilterButton from './AddFilterButton';

import '../../../scss/filter/all_filter_block.scss';

interface IAllFiltersBlock {
    type: "menu" | "modal",
}

const AllFiltersBlock: FC<IAllFiltersBlock> = ({ type }) => {

    const [showAddFilterModal, setShowAddFilterModal] = useState<boolean>(false)
    
    const filters = useAppSelector(filter => filter.filter.filters)
        
    return (
        <ul className='all-filter__block'>
            {
                filters.map(filter =>
                    <li key={filter._id} className='all-filter__block__item'>
                        <FilterItem filter={filter} type={type} />
                    </li>
                )
            }

            <AddFilterButton type={'menu'} setShowAddFilterModal={setShowAddFilterModal} />

            {showAddFilterModal && <AddFilterModal setShowAddFilterModal={setShowAddFilterModal} />}
        </ul>
    )
}

export default AllFiltersBlock;              