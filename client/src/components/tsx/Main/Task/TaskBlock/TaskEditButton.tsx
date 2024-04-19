import { FC, useState } from 'react';

import { ITaskItem } from '../interfaceTask/ITaskInfo';
import EditTask from './EditTask';

import '../../../../scss/task/task_edit_button.scss'
interface ITaskEditButton extends ITaskItem {
    deleteItem: (taskId: string) => void
}
const TaskEditButton: FC<ITaskEditButton> = ({ id, description, filter, subtask, title, deleteItem }) => {

    const [editTaskModal, setEdiTaskModal] = useState<boolean>(false);

    const toggleModal: React.MouseEventHandler<HTMLParagraphElement> = (): void => {
        setEdiTaskModal(!editTaskModal);
    }

    return (
        <div className='task__edit__butoton'>
            {editTaskModal ? <EditTask id={id} description={description} filter={filter} subtask={subtask} title={title} toggleModal={toggleModal} /> : null}
            <p className='task__edit__butoton__option' onClick={toggleModal}>Edit</p>
            <p className='task__edit__butoton__option task__edit__butoton__option__delete' onClick={() => deleteItem(id)}>Delete</p>
        </div>
    );
};

export default TaskEditButton;