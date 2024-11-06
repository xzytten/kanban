import { FC } from 'react';
import SubTaskItem from './SubtaskItem';

import { ISubtask } from '../../interfaceTask/ISubtask';
import '../../../../../scss/subtask/subtask_itemgroup.scss'

interface ISubtaskItemGroupProps {
    setSubtasks?: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
}

const SubtaskItemGroup: FC<ISubtaskItemGroupProps> = ({ subtasks, setSubtasks }) => {



    return (
        <div className='subtask__group'>
            {subtasks.map(subtask => (
                <SubTaskItem subtasks={subtasks} subtask={subtask} setSubtasks={setSubtasks} key={subtask._id} />
            ))}
        </div>
    );
};

export default SubtaskItemGroup;