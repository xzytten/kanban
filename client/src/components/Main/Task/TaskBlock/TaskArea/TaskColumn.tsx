import { FC } from 'react';

import '../../../../../scss/task/task_column.scss'

interface ITaskColumn {
    HeaderItem?: React.ReactNode;
    TaskItem: React.ReactNode;
    HeaderItems?: React.ReactNode;
}

const TaskColumn: FC<ITaskColumn> = ({ TaskItem, HeaderItems }) => {
    return (
        <div className='task__column'>
            {HeaderItems}
            {TaskItem}
        </div>
    );
};

export default TaskColumn;