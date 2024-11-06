import { FC, useState } from 'react';
import { ISubtask } from '../../interfaceTask/ISubtask';

import '../../../../../scss/subtask/subtask_item.scss';


interface ISubtaskItemProps  {
    setSubtasks?: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
    subtask: ISubtask

}

const SubTaskItem: FC<ISubtaskItemProps> = ({ setSubtasks, subtask, subtasks }) => {

    const [newStatus, setNewStatus] = useState<boolean>(subtask.status);

    const toggleStatus = (): void => {
        setNewStatus(!newStatus);
        const updatedSubtasks = subtasks.map(sub => {
            if (sub?._id === subtask._id) {
                return { ...subtask, status: !newStatus };
            }
            return subtask;
        });
        if (setSubtasks) {
            setSubtasks(updatedSubtasks);
        }
    }


    const deleteSubtask = (taskId: string): void => {
        if (setSubtasks) {
            setSubtasks([...subtasks.filter(subtask => subtask._id !== taskId)]);
        }
    }


    return (
        <div className='subtask__item'>
            <span onClick={toggleStatus} className={newStatus ? `subtask__item__done` : 'subtask__item__unmade'} ></span>
            <p className='subtask__item__description'>{subtask.description}</p>
            {setSubtasks ? <span className="subtask__item__delete" onClick={() => subtask._id && deleteSubtask(subtask._id)}></span> : null}
        </div>
    );
};

export default SubTaskItem;