import React, { FC, useState } from 'react';
import { IHeaderTask } from '../interfaceTask/IHeaderTask';

import '../../../../scss/header_task_item.scss';


interface IHeaderTaskItemProps extends IHeaderTask {
    taskClass: string,
    name: string,
}

const HeaderTaskItem: FC<IHeaderTaskItemProps> = ({ totalFilter, toggleTaskClass, taskClass, name, count }) => {

    return (
        <section className='header__item'>
            <article className='task__class__header'>
                <div className={`task__class__header__item `} onClick={() => toggleTaskClass(taskClass)}>
                    <span className={`task__class__header__item__dot ${totalFilter === taskClass || totalFilter === 'all' ? taskClass : 'notActive'}`}></span>
                    <h3 className='task__class__header__item__name'>{name}</h3>
                    <p className='task__class__header__item__count'>{count[taskClass]}</p>

                </div>
                <img src={require('../../../../../img/plus.png')} alt="" className='header__item__plus' onClick={() => console.log(taskClass)} />
            </article>
        </section>

    );
};

export default HeaderTaskItem;