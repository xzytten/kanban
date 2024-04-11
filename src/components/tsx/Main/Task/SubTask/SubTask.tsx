import { FC } from 'react';

import '../../../../scss/subtask.scss';
// import SubTaskItem from './SubTaskItem';
import { ISubtask } from '../interfaceTask/ISubtask';
import SubtaskItemGroup from './SubtaskItemGroup';

interface ISubtaskProps {
    subtask: ISubtask[]
}


const SubTask: FC<ISubtaskProps> = ({ subtask }) => {
    return (
        <div className='subtask'>
            <SubtaskItemGroup subtasks={subtask}/>
        </div>
    );
};

export default SubTask;