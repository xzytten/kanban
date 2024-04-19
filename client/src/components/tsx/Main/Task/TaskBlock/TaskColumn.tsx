import { FC } from 'react';

interface ITaskColumn {
    HeaderItem?: React.ReactNode;
    TaskItem: React.ReactNode;
    HeaderItems?: React.ReactNode;
}

const TaskColumn: FC<ITaskColumn> = ({ HeaderItem, TaskItem, HeaderItems }) => {
    return (
        <div >
            {!HeaderItem ? (<div style={{width:'1367px'}}>{HeaderItems}</div>) : HeaderItem}
            {TaskItem}
        </div>
    );
};

export default TaskColumn;