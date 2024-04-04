import React, { FC, useState } from 'react';

import FilterItem from '../Filter/FilterItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SubtaskBlock from './Task/SubTask/SubtaskBlock';

import '../../scss/add_task.scss';

interface IAddTaskProps {
    taskClass: string;
    setModal: (state: boolean) => void;
}


const AddTask: FC<IAddTaskProps> = ({ taskClass, setModal }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    
    return (
        <div className='add__task'>
            <section className='add__task__block'>
            <span className='add__task__block__exit' onClick={() => setModal(false)}></span>
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
                    <input type="text" placeholder='Task name' className='add__task__block__form__title' />
                    <textarea className='add__task__block__form__description' placeholder="Description" />
                </article>
                <SubtaskBlock/>
                <article className='add__task__block__files'></article>
            </section>
        </div>
    );
};

export default AddTask;
