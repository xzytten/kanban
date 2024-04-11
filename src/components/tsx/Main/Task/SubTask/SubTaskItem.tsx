import { FC, useEffect, useState } from 'react';
import { ISubtask } from '../interfaceTask/ISubtask';

import '../../../../scss/subtask_item.scss';
 

interface ISubtaskItemProps extends ISubtask {
    setSubtasks?: (subtasks: ISubtask[]) => void,
        subtasks: ISubtask[],

}

const SubTaskItem: FC<ISubtaskItemProps> = ({ description, status, setSubtasks, id, subtasks}) => {

    const [newStatus, setNewStatus] = useState<boolean>(status);

    const toggleStatus = (): void => {
        setNewStatus(!newStatus)
        status = newStatus;
    }

    const deleteSubtask = (taskId: string): void => {
        if (setSubtasks) {
            console.log(taskId)
            setSubtasks([...subtasks.filter(subtask => subtask.id !== taskId)]);
            console.log(subtasks)
        }
    }
    

    return (
        <div className='subtask__item'>
            <span onClick={toggleStatus} className={newStatus ? `subtask__item__done` : 'subtask__item__unmade'} ></span>
            <p className='subtask__item__description'>{description}</p>
            <span className="subtask__item__delete" onClick={() => deleteSubtask(id)}></span>
        </div>
    );
};

export default SubTaskItem;