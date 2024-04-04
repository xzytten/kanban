import { FC, useState } from 'react';

import { ISubtask } from '../../Task/interfaceTask/ISubtask';
import AddButton from '../../Task/Utils/AddButton';
import AddSubtask from '../../Task/SubTask/AddSubtask';

import '../../../../scss/subtask_block.scss';
import SubtaskItemGroup from './SubtaskItemGroup';

const SubtaskBlock: FC = () => {
    
    const [addSubtask, setAddSubtask] = useState<boolean>(false);
    const [subtasks, setSubtasks] = useState<ISubtask[]>([]);

    return (
        <article className='add__task__block__subtask'>
            {subtasks ? <SubtaskItemGroup subtasks={subtasks}/> : null}
            <h3 className='add__task__block__subtask__title'>Subtasks</h3>
            <AddButton name='Add subtask' setAddSubtask={setAddSubtask} />
            {addSubtask ? <AddSubtask setAddSubtask={setAddSubtask} setSubtasks={setSubtasks} subtasks={subtasks} /> : null}
        </article>
    );
};

export default SubtaskBlock;