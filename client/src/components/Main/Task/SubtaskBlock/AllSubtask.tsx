import { FC } from 'react';

import '../../../../scss/subtask/subtask.scss';
// import SubTaskItem from './SubTaskItem';
import { ISubtask } from '../interfaceTask/ISubtask';
import SubtaskItemGroup from './SubtaskItem/SubtaskItemGroup';

interface ISubtaskProps {
    subtask: ISubtask[],
    showCheckbox: boolean,
    subtaskType: 'viewModal' | 'editModal';
    taskId?: string,
    setSubtasks: React.Dispatch<React.SetStateAction<ISubtask[]>>
}


const AllSubTask: FC<ISubtaskProps> = ({ taskId, subtask, showCheckbox, setSubtasks, subtaskType }) => {
    return (
        <div className='subtask'>
            <SubtaskItemGroup taskId={taskId} subtasks={subtask} subtaskType={subtaskType} setSubtasks={setSubtasks} showCheckbox={showCheckbox} />
        </div>
    );
};

export default AllSubTask;