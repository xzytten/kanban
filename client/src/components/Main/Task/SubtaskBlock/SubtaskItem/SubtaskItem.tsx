import { FC, useState } from 'react';
import { ISubtask } from '../../interfaceTask/ISubtask';

import '../../../../../scss/subtask/subtask_item.scss';

interface ISubtaskItemProps {
    subtask: ISubtask,
    showCheckbox: boolean,
    subtaskType: 'viewModal' | 'editModal',
    deleteSubtask?: (subtask: ISubtask) => void,
    toggleStatus: (
        subtask: ISubtask,
        newStatus: boolean,
        setNewStatus: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
}

const SubTaskItem: FC<ISubtaskItemProps> = ({ toggleStatus, subtaskType, subtask, showCheckbox, deleteSubtask }) => {

    const [newStatus, setNewStatus] = useState<boolean>(subtask.status);

    return (
        <li className='subtask__item'>
            {
                showCheckbox && <span onClick={() => toggleStatus(subtask, newStatus, setNewStatus)} className={newStatus ? `subtask__item__done` : 'subtask__item__unmade'} ></span>
            }
            <p className='subtask__item__description'>{subtask.description}</p>
            {subtaskType === 'editModal' && deleteSubtask ? <span className="subtask__item__delete" onClick={() => deleteSubtask(subtask)}></span> : null}
        </li>
    );
}

export default SubTaskItem;