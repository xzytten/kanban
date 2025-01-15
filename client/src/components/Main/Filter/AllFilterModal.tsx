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
    taskFilters: IFilter[],
    setTaskFilters?: (filters: IFilter[]) => void,
    setTaskInfo?: React.Dispatch<React.SetStateAction<ITask>>,
    task: ITask,
}

const AllFilterModal: FC<IAllFilterModal> = ({ setShowAllFilters, taskFilters, setTaskFilters, setTaskInfo, task }) => {

    const [showAddFilterModal, setShowAddFilterModal] = useState<boolean>(false)

    const filters = useAppSelector(filter => filter.filter.filters)

    const dispatch = useAppDispatch()

    const canAddFilter = (filter: IFilter): boolean => {
        return taskFilters.length < 5 && !taskFilters.some(existingFilter => existingFilter._id === filter._id);
    }

    const updateFilters = (filter: IFilter, action: 'add' | 'remove') => {
        try {
            if (!task._id || !filter._id) return;

            if (action === 'add' && canAddFilter(filter)) {
                if (setTaskInfo) {
                    dispatch(addFilterToTask({ filter, taskId: task._id }));
                    setTaskInfo({ ...task, filters: [...task.filters, filter] });
                } else if (setTaskFilters) {
                    setTaskFilters([...taskFilters, filter])
                }
            } else if (action === 'remove') {
                if (setTaskInfo) {
                    dispatch(removeFilterFromTask({ taskId: task._id, filterId: filter._id }))

                    setTaskInfo({ ...task, filters: [...task.filters.filter(f => f._id !== filter._id)] });
                } else if (setTaskFilters) {
                    setTaskFilters([...taskFilters.filter(f => f._id !== filter._id)])
                }
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
                            return (
                                <li
                                    className='all-filter-modal__filter'
                                    key={filter._id}
                                    onClick={() => updateFilters(filter, isFilterInTask ? 'remove' : 'add')}
                                >
                                    <FilterItem filter={filter} borderColor={isFilterInTask ? 'gold' : undefined} />
                                </li>
                            )
                        })
                    }
                    <AddFilterButton type={'modal'} setShowAddFilterModal={setShowAddFilterModal} />
                </ul>
            </div>
        </>

    );
};

export default AllFilterModal;