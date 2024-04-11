import {FC} from 'react';
import SubTaskItem from './SubTaskItem';

import { ISubtask } from '../interfaceTask/ISubtask';
import '../../../../scss/subtask_itemgroup.scss'

interface ISubtaskItemGroupProps {
     setSubtasks?: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
}

const SubtaskItemGroup:FC <ISubtaskItemGroupProps> = ({subtasks, setSubtasks}) => {



    return (
        <div className='subtask__group'>
            {subtasks.map(subtask=>(
                <SubTaskItem subtasks={subtasks} setSubtasks={setSubtasks} key={subtask.id} id={subtask.id} description={subtask.description} status={subtask.status}/>
            ))}
        </div>  
    );
};

export default SubtaskItemGroup;