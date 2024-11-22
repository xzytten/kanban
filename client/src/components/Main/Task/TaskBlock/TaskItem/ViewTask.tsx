import { FC, useState } from 'react';

import FilterItem from '../../../Filter/FilterItem'
import AllSubtask from '../../SubtaskBlock/AllSubtask';
import { ITask } from '../../../../../types/ITask';
import { IFilter } from '../../../../../types/IFilter';

import '../../../../../scss/task/view_task.scss';
import AllFilterModal from '../../../Filter/AllFilterModal';

interface IViewTaskProps {
    task: ITask,
    toggleModal: () => void,
    setTaskInfo: React.Dispatch<React.SetStateAction<ITask>>,

}

const ViewTask: FC<IViewTaskProps> = ({ toggleModal, task, setTaskInfo }) => {

    const [showAllFilters, setShowAllFilters] = useState<boolean>(false)

    return (
        <>
            {showAllFilters && <AllFilterModal task={task} setTaskInfo={setTaskInfo} taskFilters={task.filters} setShowAllFilters={setShowAllFilters} taskId={task._id} />}
            <div className='view__task'>
                <section className='view__task__block'>
                    <article className='view__task__block__header'>
                        <ul className='view__task__block__header__filters'>
                            {task.filters.map(taskFilter => (
                                <li key={taskFilter._id} className='view__task__block__header__filters__item'>
                                    <FilterItem filter={taskFilter} />
                                </li>
                            ))}
                            <button
                                onClick={() => setShowAllFilters(true)}
                                className='view__task__block__header__filters__add-filter'
                            >
                                +
                            </button>
                        </ul>
                    </article>
                    <span className='view__task__block__exit' onClick={toggleModal}></span>
                    <h2 className='view__task__block__title'>{task.title}</h2>
                    <article className='view__task__block__views'>
                        <img className='view__task__block__views__ico' src={require('../../../../../img/view.jpg')} alt='' />
                        <p className='view__task__block__views__count'>2</p>
                    </article>
                    <p className='view__task__block__description'>{task.description}</p>
                    {task.subtasks && <AllSubtask subtask={task.subtasks} showCheckbox={true} />}
                </section>
            </div>
        </>

    );
};

export default ViewTask;