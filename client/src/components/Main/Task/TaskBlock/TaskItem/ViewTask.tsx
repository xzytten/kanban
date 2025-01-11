import { FC, useState } from 'react';
import { ITask } from '../../../../../types/ITask';

import AllSubtask from '../../SubtaskBlock/AllSubtask';
import AllFilterModal from '../../../Filter/AllFilterModal';
import FilterBlockForTaskInfo from '../../../Filter/FilterBlockForTaskInfo';

import '../../../../../scss/task/view_task.scss';

interface IViewTaskProps {
    task: ITask,
    toggleModal: () => void,
    setTaskInfo: React.Dispatch<React.SetStateAction<ITask>>,

}

const ViewTask: FC<IViewTaskProps> = ({ toggleModal, task, setTaskInfo }) => {

    const [showAllFilters, setShowAllFilters] = useState<boolean>(false)
    
    console.log(task)
    return (
        <>
            {showAllFilters && <AllFilterModal task={task} setTaskInfo={setTaskInfo} taskFilters={task.filters} setShowAllFilters={setShowAllFilters} />}
            <div className='view__task'>
                <section className='view__task__block'>
                    <article className='view__task__block__header'>
                        <FilterBlockForTaskInfo filters={task.filters} setShowAllFilters={setShowAllFilters} />
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