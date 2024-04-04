import { FC, useEffect, useState } from 'react';

import '../../../../scss/add_subtask.scss'
import { ISubtask } from '../interfaceTask/ISubtask';
interface IAddSubtaskProps {
    setAddSubtask: (state: boolean) => void,
    subtasks: ISubtask[],
    setSubtasks: (subtasks: ISubtask[]) => void;
}

const AddSubtask: FC<IAddSubtaskProps> = ({ setAddSubtask, setSubtasks, subtasks }) => {

    const [description, setDescription] = useState<string>('')

    const addSubtask = () => {
        if (description.trim() !== '') {
            setSubtasks([...subtasks, { id: Date.now(), description, status: false }])
            console.log(subtasks)
            setAddSubtask(false)
        }
    }

    return (
        <div className='add__subtask__container'>
            <div className='add__subtask'>
                <span className="add__subtask__exit" onClick={() => setAddSubtask(false)}></span>
                <p className='add__subtask__title'>Task Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Description'
                    className='add__subtask__description'>
                </textarea>
                <button className="add__subtask__button" onClick={addSubtask}>Add</button>
            </div>
        </div>

    );
};

export default AddSubtask;