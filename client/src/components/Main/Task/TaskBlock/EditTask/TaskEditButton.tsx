import React, { FC, useState } from 'react';

import EditTask from './EditTask';
import { ITask } from '../../../../../types/ITask';

import '../../../../../scss/task/task_edit_button.scss'

interface ITaskEditButton {
    task: ITask,
    deleteItem: (taskId: string) => void,
    setEditButton: React.Dispatch<React.SetStateAction<boolean>>
}
const TaskEditButton: FC<ITaskEditButton> = ({ task, deleteItem, setEditButton }) => {

    const [editTaskModal, setEditTaskModal] = useState<boolean>(false);


    return (
        <div className='task__edit__butoton'>
            {editTaskModal && <EditTask task={task} setEditButton={setEditButton} setEditTaskModal={setEditTaskModal} />}
            <p className='task__edit__butoton__option' onClick={() => setEditTaskModal(true)}>Edit</p>
            <p className='task__edit__butoton__option task__edit__butoton__option__delete' onClick={() => task._id && deleteItem(task._id)}>Delete</p>
        </div>
    );
};

export default TaskEditButton;  