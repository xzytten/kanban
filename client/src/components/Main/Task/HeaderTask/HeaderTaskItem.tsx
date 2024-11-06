import { FC, useState } from 'react';
import AddTask from '../TaskBlock/AddTask/AddTask';
import '../../../../scss/task/header_task_item.scss'


interface IHeaderTaskItemProps {
    taskType: string,
    taskName: string,
    toggleTaskClass: (task: string, type: string) => void;
    count: Record<string, number>,
    totalFilter: string,
}

const HeaderTaskItem: FC<IHeaderTaskItemProps> = ({ totalFilter, toggleTaskClass, taskType, taskName, count }) => {


    const [modal, setModal] = useState<boolean>(false);
    return (
        <section className='header__item'>
            <article className='task__class__header'>
                <div className={`task__class__header__item `} onClick={() => toggleTaskClass(taskType, totalFilter)}>
                    <span className={`task__class__header__item__dot ${totalFilter === taskType || totalFilter === 'all' ? taskType : 'notActive'}`}></span>
                    <h3 className='task__class__header__item__name'>{taskName}</h3>
                    <p className='task__class__header__item__count'>{count[taskType]}</p>
                </div>
                {taskType === 'todo'
                    ?
                    <img src={require('../../../../img/plus.png')} alt="" className='header__item__plus' onClick={() => setModal(true)} />
                    : null}
            </article>
            {modal && <AddTask   taskType={taskType} setModal={setModal} />}
        </section>

    );
};

export default HeaderTaskItem;  