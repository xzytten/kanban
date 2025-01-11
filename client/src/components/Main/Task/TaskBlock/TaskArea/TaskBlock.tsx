import React from 'react';

import TaskItem from '../TaskItem/TaskItem';
import { ITask } from '../../../../../types/ITask';
import DropArea from '../DropTask/DropArea';

import '../../../../../scss/task/task_class.scss';

interface ITaskBlockProps {
    activeClass: string,
    taskType: string,
    activeColumn: string,
    array: ITask[],
    deleteItem: (taskId: string) => void,
    setActiveColumn: React.Dispatch<React.SetStateAction<string>>,
    setDraggedItem: React.Dispatch<React.SetStateAction<ITask | null>>,
    handleDrop: () => void,
}

const TaskBlock: React.FC<ITaskBlockProps> = React.memo(({ activeColumn, handleDrop, setActiveColumn, setDraggedItem, activeClass, taskType, array, deleteItem }) => {

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setActiveColumn(taskType);
    };

    return (
        <article
            className={`${activeClass ? activeClass : 'task__class'} ${activeColumn === taskType ? 'activeColumn' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}>
            <DropArea />
            {
                array.map(item => {
                    if (taskType !== item.type) return null;

                    return (
                        <React.Fragment key={item._id}>
                            <TaskItem
                                taskType={taskType}
                                setDraggedItem={setDraggedItem}
                                task={item}
                                deleteItem={deleteItem}
                            />
                            <DropArea />
                        </React.Fragment>
                    );
                })
            }
        </article>
    );
});

export default TaskBlock;
