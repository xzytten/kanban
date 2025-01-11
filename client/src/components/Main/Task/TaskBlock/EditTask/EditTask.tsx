import { FC, useEffect, useState, useRef } from 'react';

import { ISubtask } from '../../interfaceTask/ISubtask';
import { ITask } from '../../../../../types/ITask';
import { IFilter } from '../../../../../types/IFilter';

import FilterItem from '../../../Filter/FilterItem';
import DatePicker from 'react-datepicker';
import AllFilterModal from '../../../Filter/AllFilterModal';
import AddFiltersButton from '../../../Filter/AddFiltersButton';
import FilterBlockForTaskInfo from '../../../Filter/FilterBlockForTaskInfo';

import { useAppDispatch } from '../../../../../redux/hooks/hook';
import { editTask } from '../../../../../redux/slices/TaskSlice';

import '../../../../../scss/task/add_task.scss';

interface IEditTaskProps {
    task: ITask;
    toggleModal: React.MouseEventHandler<HTMLParagraphElement>;
}

const EditTask: FC<IEditTaskProps> = ({ task, toggleModal }) => {

    const dispatch = useAppDispatch();

    const [submitButton, setSubmitButton] = useState<boolean>(false);
    const [taskFilters, setTaskFilters] = useState<IFilter[]>(task.filters);
    const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
    const [editedTask, setEditedTask] = useState<Partial<Omit<ITask, 'filters'> & { filters: string[] }>>({});

    const taskTitleRef = useRef<HTMLTextAreaElement | null>(null);
    const taskDescriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const [taskData, setTaskData] = useState<Partial<Omit<ITask, 'filters'> & { filters: string[] }>>({
        title: task.title,
        description: task.description,
        date: task.date,
        subtasks: task.subtasks,
        filters: taskFilters.map((filter) => filter._id || ''),
    });

    const handleTaskDataChange = (field: keyof ITask, value: any) => {
        setTaskData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setEditedTask((prev) => ({
            ...prev,
            [field]: value,
        }));
        setSubmitButton(true);
    };

    const SubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updatedTask();
        if (Object.keys(editedTask).length > 0 && task._id) {
            await dispatch(editTask({ taskId: task._id, updates: editedTask }));
        }
    };

    const handleTextAndSize = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        field: keyof ITask,
        handleTaskDataChange: (field: keyof ITask, value: any) => void,
        textAreaRef: React.RefObject<HTMLTextAreaElement>
    ) => {
        handleTaskDataChange(field, e.target.value);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    const formatDate = (date: Date | string): string => {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        return parsedDate.toISOString();
    };

    const areFiltersEqual = (filters1: IFilter[], filters2: IFilter[]): boolean => {
        if (filters1.length !== filters2.length) return false;

        return filters1.every((filter1, index) => {
            const filter2 = filters2[index];
            return (
                filter1._id === filter2._id
            );
        });
    };

    const checkIfUpdated = (): void => {
        if (
            taskData.title !== task.title ||
            taskData.description !== task.description ||
            taskData.date !== task.date ||
            !areFiltersEqual(taskFilters, task.filters)
        ) {
            setSubmitButton(true);
        } else {
            setSubmitButton(false);
        }
    };

    const updatedTask = (): void => {
        if (!areFiltersEqual(taskFilters, task.filters)) {
            setEditedTask({ ...editedTask, filters: [...taskFilters.map(filter => filter._id || '')] });
            console.log(editedTask)
        }

        if (taskData.title !== task.title) {
            setEditedTask((prev) => ({ ...prev, title: taskData.title }));
        }

        if (taskData.description !== task.description) {
            setEditedTask((prev) => ({ ...prev, description: taskData.description }));
        }

        checkIfUpdated();
    };

    useEffect(() => {
        if (!areFiltersEqual(taskFilters, task.filters)) {
            handleTaskDataChange('filters', taskFilters);
        }
        checkIfUpdated();
    }, [taskFilters]);

    return (
        <>
            {showAllFilters && (
                <AllFilterModal
                    taskFilters={taskFilters}
                    task={task}
                    setShowAllFilters={setShowAllFilters}
                    setTaskFilters={setTaskFilters}
                />
            )}
            <div className="add__task">
                <form className="add__task__block" onSubmit={SubmitEdit}>
                    <span className="add__task__block__exit" onClick={toggleModal}></span>
                    <article className="add__task__block__header">
                        <FilterBlockForTaskInfo
                            filters={taskFilters}
                            setShowAllFilters={setShowAllFilters}
                        />
                        <div className="add__task__block__header__date">
                            <DatePicker
                                selected={taskData.date}
                                onChange={(e) => handleTaskDataChange('date', formatDate(`${e}`))}
                                dateFormat="dd/MM"
                                className="add__task__block__header__date__info"
                                popperPlacement="bottom"
                            />
                            <span className="add__task__block__header__date__ico"></span>
                        </div>
                    </article>
                    <article className="add__task__block__form">
                        <textarea
                            placeholder="Task name"
                            className="add__task__block__form__title"
                            value={taskData.title}
                            ref={taskTitleRef}
                            onChange={(e) => handleTextAndSize(e, 'title', handleTaskDataChange, taskTitleRef)}
                        />
                        <textarea
                            className="add__task__block__form__description"
                            placeholder="Description"
                            value={taskData.description}
                            ref={taskDescriptionRef}
                            onChange={(e) => handleTextAndSize(e, 'description', handleTaskDataChange, taskDescriptionRef)}
                        />
                    </article>
                    <article className="add__task__block__files"></article>
                    {submitButton && (
                        <button className="add__task__block__submit" type="submit">
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default EditTask;
