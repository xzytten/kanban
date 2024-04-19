import React from 'react'; // Додано імпорт React

import TaskItem from './TaskItem';
import { ITaskItem } from '../interfaceTask/ITaskInfo';

import '../../../../scss/task/task_class.scss'

interface ITaskBlockProps {
    activeClass?: string,
    filter: string,
    array: ITaskItem[],
    deleteItem: (taskId: string) => void
}

const TaskBlock: React.FC<ITaskBlockProps> = React.memo(({ activeClass, filter, array, deleteItem }) => {
    return (
        <article className={`${activeClass ? activeClass : 'task__class'}`}>
            {
                array.map(item => (
                    filter === item.filter && <TaskItem deleteItem={deleteItem} subtask={item.subtask} key={item.id} id={item.id} description={item.description} filter={item.filter} title={item.title} />
                ))
            }
        </article >
    );
});

export default TaskBlock;
