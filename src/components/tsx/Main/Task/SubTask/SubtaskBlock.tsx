import { FC, useState } from 'react';

import { ISubtask } from '../../Task/interfaceTask/ISubtask';
// import AddButton from '../../Task/Utils/AddButton';
import AddSubtask from '../../Task/SubTask/AddSubtask';

import '../../../../scss/subtask_block.scss';
import SubtaskItemGroup from './SubtaskItemGroup';

const SubtaskBlock: FC = () => {

    const [subtasks, setSubtasks] = useState<ISubtask[]>([]);

    return (
        <article className='add__task__block__subtask'>
            <h3 className='add__task__block__subtask__title'>Subtasks</h3>
            {/* <AddButton name='Add subtask' setAddSubtask={setAddSubtask} /> */}
            {/* {addSubtask ? <AddSubtask setAddSubtask={setAddSubtask} setSubtasks={setSubtasks} subtasks={subtasks} /> : null} */}
            {subtasks ? <SubtaskItemGroup subtasks={subtasks} /> : null}
            <AddSubtask  setSubtasks={setSubtasks} subtasks={subtasks} />
        </article>
    );
};

export default SubtaskBlock;