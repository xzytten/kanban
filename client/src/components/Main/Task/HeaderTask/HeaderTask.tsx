import { FC } from 'react';

import { IHeaderTask } from '../interfaceTask/IHeaderTask';
import HeaderTaskItem from './HeaderTaskItem';

import '../../../../scss/task/header_task.scss'

interface IHeaderTaskProps  { 
    toggleTotalFilter:(taskClass: string, totalFilter: string) => void;
    taskType: string; 
    taskName: string;
    toggleTaskClass: (task: string, type: string) => void;
    count: Record<string, number>,
    totalFilter: string,
}

const HeaderTask: FC<IHeaderTaskProps> = ({ taskName, taskType, totalFilter, count, toggleTaskClass, toggleTotalFilter}) => {

     return (
        <div className='header__class'>
            <HeaderTaskItem  totalFilter={totalFilter} count={count} taskName={taskName} taskType={taskType} toggleTaskClass={toggleTotalFilter} />
        </div>
    );
};

export default HeaderTask;