import {FC} from 'react';
import SubTaskItem from './SubTaskItem';

import { ISubtask } from '../interfaceTask/ISubtask';

interface ISubtaskItemGroupProps {
    subtasks: ISubtask[],
}

const SubtaskItemGroup:FC <ISubtaskItemGroupProps> = ({subtasks}) => {

    return (
        <div className='subtask__group'>
            {subtasks.map(subtask=>(
                <SubTaskItem key={Date.now()} id={Date.now()} description={subtask.description} status={subtask.status}/>
            ))}
        </div>  
    );
};

export default SubtaskItemGroup;