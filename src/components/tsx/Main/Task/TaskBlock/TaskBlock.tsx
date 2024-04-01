import { FC } from 'react';

import TaskItem from './TaskItem';
import '../../../../scss/task_class.scss'
import { ITaskItem } from '../interfaceTask/ITaskInfo';

interface ITaskBlockProps {
    activeClass?: string,
    filter: string,
    array: ITaskItem[],
}

const TaskBlock: FC<ITaskBlockProps> = ({ activeClass, filter, array }) => {
    return (
        <article className={`${activeClass ? activeClass : 'task__class'}`}>
            {
                array.map(item => (
                    filter === item.filter && <TaskItem key={item.id} id={item.id} description={item.description} filter={item.filter} title={item.title}/>
                ))
            }
        </article >
    );
};

export default TaskBlock;