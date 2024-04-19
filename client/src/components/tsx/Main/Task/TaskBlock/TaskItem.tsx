import { FC, useState } from 'react';

import GroupMembers from '../../../GroupMembers/GroupMembers';
import FilterItem from '../../../Filter/FilterItem';
import { ITaskItem } from '../interfaceTask/ITaskInfo';
import ViewTask from './ViewTask';
import TaskEditButton from './TaskEditButton';

import '../../../../scss/task/task_item.scss';

interface ITaskItemProps extends ITaskItem{
    deleteItem: (taskId: string) => void
}

const TaskItem: FC<ITaskItemProps> = ({ description, filter, id, title, subtask, deleteItem }) => {

    const [viewTask, setViewTask] = useState<boolean>(false);
    const [editButton, setEditButton] = useState<boolean>(false);

    const toggleEditButton = () => {
        setEditButton(!editButton);
    }
    const toggleModal = () => {
        setViewTask(!viewTask);
    }

    return (
        <article className='task__item' >
            {editButton ? <TaskEditButton id={id} description={description} title={title} subtask={subtask} filter={filter} deleteItem={deleteItem}/> : null}
            {viewTask && <ViewTask subtask={subtask} description={description} filter={filter} title={title} id={id} toggleModal={toggleModal} />}
            <div className='task__item__header'>
                <FilterItem />
                <span className='task__item__header__edit' onClick={toggleEditButton}></span>
            </div>
            <div className='task__item__block'>
                <h3 className='task__item__block__name' onClick={toggleModal}>{title}</h3>
                <p className='task__item__block__description'>{description.length > 20 ? description.slice(0, 30) + "..." : description}</p>
                <section className='task__item__block__info'>
                    <article className='task__item__block__info__done'>
                        <img src={require('../../../../../img/doneIco.jpg')} alt='done' className='task__item__block__info__done__ico' />
                        <p className='task__item__block__info__done__info'>{subtask.filter(item => item.status === true).length}/{subtask.length}</p>
                    </article>
                    <article className='task__item__block__info__date'>
                        <img src={require('../../../../../img/dateIco.jpg')} alt='date' className='task__item__block__info__date__ico' />
                        <p className='task__item__block__info__date__info'>Mar. 20</p>
                    </article>
                </section>
            </div>
            <div className='task__item__extra'>
                <GroupMembers />
                <section className='task__item__extra__attachment'>
                    <article className='task__item__extra__attachment__views'>
                        <img src={require('../../../../../img/view.jpg')} alt="views" className='task__item__extra__attachment__views__ico' />
                        <p className='task__item__extra__attachment__views__count'>2</p>
                    </article>
                    <article className='task__item__extra__attachment__files'>
                        <img src={require('../../../../../img/files.jpg')} alt='files' className='task__item__extra__attachment__files__ico' />
                        <p className='task__item__extra__attachment__files__count'>5</p>
                    </article>
                </section>
            </div>
        </article>
    );
};

export default TaskItem;