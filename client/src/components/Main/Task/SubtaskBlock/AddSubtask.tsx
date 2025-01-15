import { FC, useRef, useState } from 'react';

import { ISubtask } from '../interfaceTask/ISubtask';
import { v4 as uuidv4 } from 'uuid';

import '../../../../scss/subtask/add_subtask.scss'

interface IAddSubtaskProps {
    subtasks: ISubtask[],
    setSubtasks: (subtasks: ISubtask[]) => void;
}

const AddSubtask: FC<IAddSubtaskProps> = ({ setSubtasks, subtasks }) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [description, setDescription] = useState<string>('')

    const addSubtask = () => {
        console.log('click')
        if (description.trim() !== '') {
            try {
                setSubtasks([...subtasks, { _id: uuidv4(), description, status: false }])
                setDescription('')
            } catch (error) {
                throw (error)
            }
        }
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className='add__subtask__container'>
            <div className='add__subtask'>
                <div className="add__subtask__header">
                    <p className='add__subtask__header__title'>Task Description</p>
                    <button
                        className={`add__subtask__header__button ${description.trim().length ? 'add__subtask__header__button__enabled' : 'add__subtask__header__button__disabled'}`}
                        onClick={addSubtask}
                        type='button'
                        disabled={!description.trim().length}
                    >
                        Add
                    </button>
                </div>
                <textarea
                    ref={textareaRef}
                    onChange={(e) => handleDescriptionChange(e)}
                    value={description}
                    placeholder='Subtask description'
                    className='add__subtask__description'
                    maxLength={120}>
                </textarea>
            </div>
        </div>
    );
};

export default AddSubtask;