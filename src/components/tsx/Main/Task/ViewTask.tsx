import { FC } from 'react';

import FilterItem from '../../Filter/FilterItem'
import SubTask from './SubTask/SubTask';
import GroupMembers from '../../GroupMembers/GroupMembers';

import '../../../scss/view_task.scss';

interface IViewTaskProps {
    toggleModal: () => void;
}
const ViewTask: FC<IViewTaskProps> = ({ toggleModal }) => {
    return (
        <div className='view__task'>
            <section className='view__task__block'>
                <article className='view__task__block__header'>
                    <FilterItem />
                    <GroupMembers />
                </article>
                <span className='view__task__block__exit' onClick={toggleModal}></span>
                <h2 className='view__task__block__title'>First Design Concept</h2>
                <article className='view__task__block__views'>
                    <img className='view__task__block__views__ico' src={require('../../../../img/view.jpg')} alt='' />
                    <p className='view__task__block__views__count'>2</p>
                </article>
                <p className='view__task__block__description'>Through our rotation of international teachers, you’ll be exposed to a wide variety of accents, expressions and cultures. This means you’ll always learn the most up-to-date words and phrases used by English speakers worldwide.
                    And, in our Business English classes, we’ll prepare you for success in all contexts, teaching you to communicate, present and negotiate with confidence.</p>
                <SubTask/>
            </section>
        </div>
    );
};

export default ViewTask;