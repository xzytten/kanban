import { FC, useState } from 'react';
import { ISubtask } from '../../interfaceTask/ISubtask';

import '../../../../../scss/subtask/subtask_item.scss';


interface ISubtaskItemProps {
    setSubtasks?: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
    subtask: ISubtask
    showCheckbox: boolean;
}

const SubTaskItem: FC<ISubtaskItemProps> = ({ setSubtasks, subtask, subtasks, showCheckbox }) => {

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


    const deleteSubtask = (subtask: ISubtask): void => {
        const updatedSubtasks = subtasks.filter(sub => sub !== subtask)
        
        if(setSubtasks){
            setSubtasks(updatedSubtasks)
        }
   
    }


    return (
        <div className='subtask__item'>
            {
                showCheckbox && <span onClick={toggleStatus} className={newStatus ? `subtask__item__done` : 'subtask__item__unmade'} ></span>
            }
            <p className='subtask__item__description'>{subtask.description}</p>
            {setSubtasks ? <span className="subtask__item__delete" onClick={() => deleteSubtask(subtask)}></span> : null}
        </div>
    );
};

export default SubTaskItem;