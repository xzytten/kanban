import { FC, useEffect, useState } from 'react';

import FilterItem from '../../../Filter/FilterItem';
import DatePicker from 'react-datepicker';
import SubtaskBlock from '../SubtaskBlock/SubtaskBlock';
import { ITaskItem } from '../interfaceTask/ITaskInfo';
import { ISubtask } from '../interfaceTask/ISubtask';

import '../../../../scss/task/add_task.scss'

interface IEditTaskProps extends ITaskItem {
    toggleModal: React.MouseEventHandler<HTMLParagraphElement>;
}

const EditTask: FC<IEditTaskProps> = ({ filter, id, subtask, title, description, toggleModal }) => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [descriptionTask, setDescription] = useState<string>(description || '');
    const [nameTask, setName] = useState<string>(title || '');
    const [subtasks, setSubtasks] = useState<ISubtask[]>(subtask || [])
    const [submit, setSubmit] = useState<boolean>(false)

    const toggleSubmit = () => {
        if (nameTask !== title || descriptionTask !== description || subtasks.length !== subtask.length) {
            setSubmit(true);
        } else {
            setSubmit(false);
        }
    }


    useEffect(() => {
        toggleSubmit()
    }, [nameTask, descriptionTask, subtasks])

    return (
        <div className='add__task'>
            <section className='add__task__block'>
                <span className='add__task__block__exit' onClick={(toggleModal)}></span>
                <article className='add__task__block__header'>
                    <div className='add__task__block__header__filters'>
                        <FilterItem />
                        <FilterItem />
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
                    <input onChange={(e) => { setName(e.target.value); toggleSubmit() }} type="text" placeholder='Task name' className='add__task__block__form__title' value={nameTask} />
                    <textarea onChange={(e) => setDescription(e.target.value)} value={descriptionTask} className='add__task__block__form__description' placeholder="Description" />
                </article>
                <SubtaskBlock setSubtasks={setSubtasks} subtasks={subtasks} />
                <article className='add__task__block__files'></article>
                {
                    submit
                        ?
                        <button className='add__task__block__submit'>Submit</button>
                        :
                        null
                }
            </section>
        </div>
    );
};

export default EditTask;