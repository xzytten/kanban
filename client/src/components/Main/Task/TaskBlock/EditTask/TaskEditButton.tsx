import { FC, useState } from 'react';

import { ITaskItem } from '../../interfaceTask/ITaskInfo';
import EditTask from './EditTask';
import { ITask } from '../../../../../types/ITask';

import '../../../../../scss/task/task_edit_button.scss'

interface ITaskEditButton {
    task: ITask,
    deleteItem: (taskId: string) => void
}
const TaskEditButton: FC<ITaskEditButton> = ({ task, deleteItem }) => {

    const [editTaskModal, setEdiTaskModal] = useState<boolean>(false);

    const toggleModal: React.MouseEventHandler<HTMLParagraphElement> = (): void => {
        setEdiTaskModal(!editTaskModal);
    }

    return (
        <div className='task__edit__butoton'>
            {editTaskModal ? <EditTask task={task} toggleModal={toggleModal} /> : null}
            <p className='task__edit__butoton__option' onClick={toggleModal}>Edit</p>
            <p className='task__edit__butoton__option task__edit__butoton__option__delete' onClick={() => task._id && deleteItem(task._id)}>Delete</p>
        </div>
    );
};

export default TaskEditButton;