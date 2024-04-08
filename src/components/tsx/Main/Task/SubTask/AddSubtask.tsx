import { FC, useEffect, useState } from 'react';

import '../../../../scss/add_subtask.scss'
import { ISubtask } from '../interfaceTask/ISubtask';
interface IAddSubtaskProps {
    subtasks: ISubtask[],
    setSubtasks: (subtasks: ISubtask[]) => void;
}

const AddSubtask: FC<IAddSubtaskProps> = ({ setSubtasks, subtasks }) => {

    const [description, setDescription] = useState<string>('')

    const addSubtask = () => {
        if (description.trim() !== '') {
            setSubtasks([...subtasks, { id: Date.now(), description, status: false }])
            console.log(subtasks)

        }
    }

    return (
        <div className='add__subtask__container'>
            <div className='add__subtask'>
                <div className="add__subtask__header">
                    <p className='add__subtask__header__title'>Task Description</p>
                    <button className="add__subtask__header__button" onClick={addSubtask}>Add</button>
                </div>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Subtask description'
                    className='add__subtask__description'>
                </textarea>
            </div>
        </div>

    );
};

export default AddSubtask;