import { FC } from 'react';

import { IFilter } from '../../../types/IFilter';

import FilterItem from './FilterItem';
import AddFiltersButton from './AddFiltersButton';

import '../../../scss/filter/filter_block_for_task_info.scss'

interface IFilterBlockForTaskInfo {
    filters: IFilter[],
    setShowAllFilters?: React.Dispatch<React.SetStateAction<boolean>>,
}

const FilterBlockForTaskInfo: FC<IFilterBlockForTaskInfo> = ({ filters, setShowAllFilters }) => {

    return (
        <>
            {
                filters &&
                <ul className='filters__block'>
                    {filters.map(taskFilter => (
                        <li key={taskFilter._id} className='filter__block__li'>
                            <FilterItem filter={taskFilter} />
                        </li>
                    ))}
                    {
                        setShowAllFilters
                        &&
                        <AddFiltersButton setShowAllFilters={setShowAllFilters} />
                    }
                </ul>
            }
        </>
    );
};

export default FilterBlockForTaskInfo;