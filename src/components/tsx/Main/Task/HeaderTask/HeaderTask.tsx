import { FC } from 'react';

import { IHeaderTask } from '../interfaceTask/IHeaderTask';
import HeaderTaskItem from './HeaderTaskItem';
 

import '../../../../scss/header_task.scss'

interface IHeaderTaskProps extends IHeaderTask {}

const HeaderTask: FC<IHeaderTaskProps> = ({ totalFilter, count, toggleTaskClass }) => {

    const toggleTotalFilter = (taskClass: string): void => {
        totalFilter === taskClass ? toggleTaskClass('all') : toggleTaskClass(taskClass);
    }

    return (
        <div className='header__class'>
            <HeaderTaskItem totalFilter={totalFilter} count={count} name='To Do' taskClass='todo' toggleTaskClass={toggleTotalFilter}/>
            <HeaderTaskItem totalFilter={totalFilter} count={count} name='In Progress' taskClass='inprogress' toggleTaskClass={toggleTotalFilter} />
            <HeaderTaskItem totalFilter={totalFilter} count={count} name='Need Review' taskClass='needreview' toggleTaskClass={toggleTotalFilter} />
            <HeaderTaskItem totalFilter={totalFilter} count={count} name='Done' taskClass='done' toggleTaskClass={toggleTotalFilter} />
        </div>
    );
};

export default HeaderTask;