import { FC } from 'react';

import FilterItem from '../../../../Filter/FilterItem'
import AllSubtask from '../../SubtaskBlock/AllSubtask';
import GroupMembers from '../../../../GroupMembers/GroupMembers';
import { ITask } from '../../../../../types/ITask';

import '../../../../../scss/task/view_task.scss';

interface IViewTaskProps {
    task: ITask,
    toggleModal: () => void;
}

const ViewTask: FC<IViewTaskProps> = ({ toggleModal, task }) => {
    return (
        <div className='view__task'>
            <section className='view__task__block'>
                <article className='view__task__block__header'>
                    <FilterItem />
                    <GroupMembers />
                </article>
                <span className='view__task__block__exit' onClick={toggleModal}></span>
                <h2 className='view__task__block__title'>{task.title}</h2>
                <article className='view__task__block__views'>
                    <img className='view__task__block__views__ico' src={require('../../../../../img/view.jpg')} alt='' />
                    <p className='view__task__block__views__count'>2</p>
                </article>
                <p className='view__task__block__description'>{task.description}</p>
                {task.subtasks && <AllSubtask subtask={task.subtasks} />}
            </section>
        </div>
    );
};

export default ViewTask;