import { FC } from 'react';

import '../../../../scss/subtask/subtask.scss';
// import SubTaskItem from './SubTaskItem';
import { ISubtask } from '../interfaceTask/ISubtask';
import SubtaskItemGroup from './SubtaskItem/SubtaskItemGroup';

interface ISubtaskProps {
    subtask: ISubtask[],
    showCheckbox: boolean,
}


const AllSubTask: FC<ISubtaskProps> = ({ subtask, showCheckbox}) => {
    return (
        <div className='subtask'>
            <SubtaskItemGroup subtasks={subtask} showCheckbox={showCheckbox}/>
        </div>
    );
};

export default AllSubTask;