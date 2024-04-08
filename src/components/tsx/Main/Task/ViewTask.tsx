import { FC } from 'react';

import FilterItem from '../../Filter/FilterItem'
import SubTask from './SubTask/SubTask';
import GroupMembers from '../../GroupMembers/GroupMembers';
import TaskItem from './TaskBlock/TaskItem';
import '../../../scss/view_task.scss';
import { ITaskItem } from './interfaceTask/ITaskInfo';

interface IViewTaskProps extends ITaskItem {
    toggleModal: () => void;

}
const ViewTask: FC<IViewTaskProps> = ({ toggleModal, description, filter, title }) => {
    return (
        <div className='view__task'>
            <section className='view__task__block'>
                <article className='view__task__block__header'>
                    <FilterItem />
                    <GroupMembers />
                </article>
                <span className='view__task__block__exit' onClick={toggleModal}></span>
                <h2 className='view__task__block__title'>{title}</h2>
                <article className='view__task__block__views'>
                    <img className='view__task__block__views__ico' src={require('../../../../img/view.jpg')} alt='' />
                    <p className='view__task__block__views__count'>2</p>
                </article>
                <p className='view__task__block__description'>{description}</p>
                <SubTask />
            </section>
        </div>
    );
};

export default ViewTask;