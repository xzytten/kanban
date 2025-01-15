import { FC } from 'react';
import { useAppDispatch } from '../../../../../redux/hooks/hook';
import { ISubtask } from '../../interfaceTask/ISubtask';
import { editSubtaskStatus } from '../../../../../redux/slices/TaskSlice';
import SubTaskItem from './SubtaskItem';

import '../../../../../scss/subtask/subtask_itemgroup.scss'

interface ISubtaskItemGroupProps {
    setSubtasks?: (subtasks: ISubtask[]) => void,
    subtasks: ISubtask[],
    showCheckbox: boolean,
    subtaskType: 'viewModal' | 'editModal',
    taskId?: string,
}

const SubtaskItemGroup: FC<ISubtaskItemGroupProps> = ({ taskId, subtaskType, subtasks, setSubtasks, showCheckbox }) => {
    const dispatch = useAppDispatch();

    const deleteSubtask = (subtask: ISubtask): void => {
        if (setSubtasks) {
            const updatedSubtasks = [...subtasks.filter(sub => sub._id !== subtask._id && sub)]

            setSubtasks(updatedSubtasks)
        }
    }

    const updateStatusInSubtask = (subtask: ISubtask, newStatus: boolean, setNewStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (setSubtasks) {
            setNewStatus(!newStatus);
            const updatedSubtasks = subtasks.map(sub => {
                if (sub._id === subtask._id) {
                    return { ...subtask, status: !subtask.status };
                }
                return sub;
            });
            setSubtasks(updatedSubtasks);
        }
    }

    const toggleStatus = (subtask: ISubtask, newStatus: boolean, setNewStatus: React.Dispatch<React.SetStateAction<boolean>>): void => {
        if (subtaskType === 'editModal') {
            updateStatusInSubtask(subtask, newStatus, setNewStatus);
        } else if (subtaskType === 'viewModal' && subtask._id && taskId) {
            dispatch(editSubtaskStatus({ subtaskId: subtask._id, taskId, status: !newStatus }))
            updateStatusInSubtask(subtask, newStatus, setNewStatus);
        }
    }

    return (
        <ul className='subtask__group'>
            {subtasks.map((subtask, index) => (
                <SubTaskItem subtaskType={subtaskType} toggleStatus={toggleStatus} deleteSubtask={deleteSubtask} subtask={subtask} key={`${subtask._id}-${index}`} showCheckbox={showCheckbox} />
            ))}
        </ul>
    );
};

export default SubtaskItemGroup;