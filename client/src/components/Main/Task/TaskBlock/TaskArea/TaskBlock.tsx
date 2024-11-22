import React from 'react';

import TaskItem from '../TaskItem/TaskItem';
import { ITask } from '../../../../../types/ITask';
import DropArea from '../DropTask/DropArea';

import { IFilter } from '../../../../../types/IFilter';

import '../../../../../scss/task/task_class.scss';

interface ITaskBlockProps {
    activeClass: string,
    filter: string,
    activeColumn: string,
    array: ITask[],
    deleteItem: (taskId: string) => void,
    setActiveColumn: React.Dispatch<React.SetStateAction<string>>,
    setDraggedItem: React.Dispatch<React.SetStateAction<ITask | null>>,
    handleDrop: () => void,
}

const TaskBlock: React.FC<ITaskBlockProps> = React.memo(({ activeColumn, handleDrop, setActiveColumn, setDraggedItem, activeClass, filter, array, deleteItem }) => {

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setActiveColumn(filter);
        console.log('enter');
    };

    return (
        <article
            className={`${activeClass ? activeClass : 'task__class'} ${activeColumn === filter ? 'activeColumn' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}>
            <DropArea />
            {
                array.map(item => {
                    if (filter !== item.type) return null;

                    return (
                        <React.Fragment key={item._id}>
                            <TaskItem
                                filter={filter}
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
