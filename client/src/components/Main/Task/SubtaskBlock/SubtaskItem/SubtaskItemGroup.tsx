import { FC } from 'react';
import SubTaskItem from './SubtaskItem';

import { ISubtask } from '../../interfaceTask/ISubtask';
import '../../../../../scss/subtask/subtask_itemgroup.scss'

interface ISubtaskItemGroupProps {
    setSubtasks?: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
    showCheckbox: boolean,
}

const SubtaskItemGroup: FC<ISubtaskItemGroupProps> = ({ subtasks, setSubtasks, showCheckbox }) => {

    return (
        <div className='subtask__group'>
            {subtasks.map(subtask => (
                <SubTaskItem subtasks={subtasks} subtask={subtask} setSubtasks={setSubtasks} key={subtask._id} showCheckbox={showCheckbox} />
            ))}
        </div>
    );
};

export default SubtaskItemGroup;