import { FC } from 'react';

import '../../../../scss/subtask/subtask.scss';
// import SubTaskItem from './SubTaskItem';
import { ISubtask } from '../interfaceTask/ISubtask';
import SubtaskItemGroup from './SubtaskItem/SubtaskItemGroup';

interface ISubtaskProps {
    subtask: ISubtask[]
}


const AllSubTask: FC<ISubtaskProps> = ({ subtask }) => {
    return (
        <div className='subtask'>
            <SubtaskItemGroup subtasks={subtask}/>
        </div>
    );
};

export default AllSubTask;