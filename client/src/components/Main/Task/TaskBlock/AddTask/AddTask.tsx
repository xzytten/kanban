import { FC, useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks/hook';
import { ISubtask } from '../../interfaceTask/ISubtask';
import { addTask } from '../../../../../redux/slices/TaskSlice';

import DatePicker from 'react-datepicker';
import SubtaskBlock from '../../SubtaskBlock/SubtaskBlock';

import 'react-datepicker/dist/react-datepicker.css';
import '../../../../../scss/task/add_task.scss'

interface IAddTaskProps {
    taskType: string,
    setModal: (state: boolean) => void,
}


const AddTask: FC<IAddTaskProps> = ({ taskType, setModal }) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null); 
    const [showSubtasks, setShowSubtasks] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [subtasks, setSubtasks] = useState<ISubtask[]>([]);
    const [project, setProject] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const dispatch = useAppDispatch()

    const userId = useAppSelector(user => user.auth.user?._id)
    const projectId = useAppSelector(project => project.project.project?._id)

    useEffect(() => {
        if (projectId) {
            setProject(projectId);
        }

        if (userId) {
            setUser(userId);
        }
    }, [userId, projectId]);

    const submitAddTask = () => {
        const date = startDate || new Date();
        dispatch(addTask({ author: user, description, filters: [], project, title, date, subtasks, type: 'todo' }));
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; 
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
        }
    };

    const handleShowSubtasks = (): void => {
        setShowSubtasks(!showSubtasks)
    }

    return (
        <div className='add__task'>
            <section className='add__task__block'>
                <span className='add__task__block__exit' onClick={() => setModal(false)}></span>
                <article className='add__task__block__header'>
                    <div className='add__task__block__header__filters'>
                        {/* <FilterItem name={'frontEnd'} backgroundColor="" textColor='' /> */}
                        <button className='add__task__block__header__filters__add'>+</button>
                    </div>
                    <div className='add__task__block__header__date'>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            dateFormat="dd/MM"
                            className='add__task__block__header__date__info'
                            popperPlacement="bottom"
                        />
                        <span className='add__task__block__header__date__ico'></span>
                    </div>
                </article>
                <article className='add__task__block__form'>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Task name' className='add__task__block__form__title' />
                    <textarea
                        ref={textareaRef}
                        onChange={(e) => handleDescriptionChange(e)}
                        value={description}
                        className='add__task__block__form__description'
                        placeholder="Description"
                    />
                </article>
                <div className='add__task__block__show-subtasks'>
                    <input
                        id='showSubtasks'
                        className='add__task__block__show-subtasks__checkbox'
                        type='checkbox'
                        onChange={handleShowSubtasks}
                        checked={showSubtasks} />
                    <label
                        htmlFor="showSubtasks"
                        className='add__task__block__show-subtasks__text'
                    >
                        Subtasks
                    </label>
                </div>
                {
                    showSubtasks && <SubtaskBlock subtaskType='editModal' setSubtasks={setSubtasks} subtasks={subtasks} showCheckbox={false} />

                }
                <article className='add__task__block__files'></article>
                <button className='add__task__block__submit' onClick={submitAddTask}>Submit</button>
            </section>
        </div>
    );
};

export default AddTask;
