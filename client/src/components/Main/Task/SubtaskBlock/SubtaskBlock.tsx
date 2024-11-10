import { FC } from 'react';
import { ISubtask } from '../../Task/interfaceTask/ISubtask';
import AddSubtask from './AddSubtask';
import SubtaskItemGroup from './SubtaskItem/SubtaskItemGroup';

import '../../../../scss/subtask/subtask_block.scss';

interface ISubtasksBlock {
    setSubtasks: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
    showCheckbox: boolean,
}

const SubtaskBlock: FC<ISubtasksBlock> = ({ setSubtasks, subtasks, showCheckbox}) => {
 
    return (
        <article className='add__task__block__subtask'>
            <h3 className='add__task__block__subtask__title'>Subtasks</h3>
            {subtasks ? <SubtaskItemGroup setSubtasks={setSubtasks} subtasks={subtasks} showCheckbox={showCheckbox}/> : null}
            <AddSubtask setSubtasks={setSubtasks} subtasks={subtasks} />
        </article>
    );
};

export default SubtaskBlock;