import { FC, useState } from 'react';

import { useAppSelector } from '../../../redux/hooks/hook';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { addFilterToTask, removeFilterFromTask } from '../../../redux/slices/TaskSlice';

import FilterItem from './FilterItem';
import { ITask } from '../../../types/ITask';
import { IFilter } from '../../../types/IFilter';

import AddFilterButton from './AddFilterButton';
import AddFilterModal from './AddFilterModal';

import '../../../scss/filter/all_filter_modal.scss'

interface IAllFilterModal {
    setShowAllFilters: React.Dispatch<React.SetStateAction<boolean>>,
    taskId?: string,
    taskFilters: IFilter[],
    setTaskInfo: React.Dispatch<React.SetStateAction<ITask>>,
    task: ITask,
}

const AllFilterModal: FC<IAllFilterModal> = ({ setShowAllFilters, taskId, taskFilters, setTaskInfo, task }) => {


    const [showAddFilterModal, setShowAddFilterModal] = useState<boolean>(false)

    const filters = useAppSelector(filter => filter.filter.filters)

    const dispatch = useAppDispatch()


    const addFilterInTask = (filter: IFilter) => {
        if (task.filters.length < 5) {
            try {
                const isFilterExists = taskFilters.some(existingFilter => existingFilter._id === filter._id);

                if (!isFilterExists && filter._id && task._id) {
                    dispatch(addFilterToTask({ filter, taskId: task._id }));
                    setTaskInfo({ ...task, filters: [...task.filters, filter] });
                }
                // setShowAllFilters(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const removeFilterFromTheTask = (filter: IFilter): void => {
        try {
            if (task._id && filter._id) {
                dispatch(removeFilterFromTask({ taskId: task._id, filterId: filter._id }))
                setTaskInfo({ ...task, filters: [...task.filters.filter(f => f._id !== filter._id)] });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                showAddFilterModal && <AddFilterModal setShowAddFilterModal={setShowAddFilterModal} />
            }
            <div
                className='background-modal-filter'
                onClick={() => setShowAllFilters(false)}
            >

                <ul
                    className='all-filter-modal'
                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        filters.map(filter => {
                            const isFilterInTask = taskFilters.some(taskFilter => taskFilter._id === filter._id);
                            return !isFilterInTask ? (
                                <li
                                    className='all-filter-modal__filter'
                                    key={filter._id}
                                    onClick={() => addFilterInTask(filter)}
                                >
                                    <FilterItem filter={filter}/>
                                </li>
                            ) : (
                                <li
                                    className='all-filter-modal__filter'
                                    key={filter._id}
                                    onClick={() => removeFilterFromTheTask(filter)}
                                >
                                    <FilterItem filter={filter} borderColor='gold'/>
                                </li>
                            );
                        })
                    }
                    <AddFilterButton type={'modal'} setShowAddFilterModal={setShowAddFilterModal} />
                </ul>
            </div>
        </>

    );
};

export default AllFilterModal;