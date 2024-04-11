import React, { FC, useState } from 'react';
import { IHeaderTask } from '../interfaceTask/IHeaderTask';

import '../../../../scss/header_task_item.scss';
import AddTask from '../../AddTask';


interface IHeaderTaskItemProps extends IHeaderTask {
    taskClass: string,
    name: string,
}

const HeaderTaskItem: FC<IHeaderTaskItemProps> = ({ totalFilter, toggleTaskClass, taskClass, name, count, someArray, setSomeArray }) => {


    const [modal, setModal] = useState<boolean>(false);

    return (
        <section className='header__item'>
            <article className='task__class__header'>
                <div className={`task__class__header__item `} onClick={() => toggleTaskClass(taskClass)}>
                    <span className={`task__class__header__item__dot ${totalFilter === taskClass || totalFilter === 'all' ? taskClass : 'notActive'}`}></span>
                    <h3 className='task__class__header__item__name'>{name}</h3>
                    <p className='task__class__header__item__count'>{count[taskClass]}</p>

                </div>
                {taskClass === 'todo'
                    ?
                    <img src={require('../../../../../img/plus.png')} alt="" className='header__item__plus' onClick={() => setModal(true)} />
                    : null}
            </article>
            {modal && <AddTask setSomeArray={setSomeArray} someArray={someArray} taskClass={taskClass} setModal={setModal} />}
        </section>

    );
};

export default HeaderTaskItem;  