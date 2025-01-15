import { FC, useEffect, useState, useRef } from 'react';

import { ITask } from '../../../../../types/ITask';
import { IFilter } from '../../../../../types/IFilter';

import DatePicker from 'react-datepicker';
import AllFilterModal from '../../../Filter/AllFilterModal';
import FilterBlockForTaskInfo from '../../../Filter/FilterBlockForTaskInfo';

import { useAppDispatch } from '../../../../../redux/hooks/hook';
import { editTask } from '../../../../../redux/slices/TaskSlice';

import '../../../../../scss/task/add_task.scss';
import AddFiltersButton from '../../../Filter/AddFiltersButton';
import SubtaskBlock from '../../SubtaskBlock/SubtaskBlock';
import { ISubtask } from '../../interfaceTask/ISubtask';

interface IEditTaskProps {
    task: ITask,
    setEditTaskModal: React.Dispatch<React.SetStateAction<boolean>>,
    setEditButton: React.Dispatch<React.SetStateAction<boolean>>,
}

const EditTask: FC<IEditTaskProps> = ({ task, setEditTaskModal, setEditButton }) => {

    const dispatch = useAppDispatch();

    const [submitButton, setSubmitButton] = useState<boolean>(false);
    const [taskFilters, setTaskFilters] = useState<IFilter[]>(task.filters);
    const [taskSubtasks, setTaskSubtasks] = useState<ISubtask[]>(task.subtasks)
    const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
    const [taskData, setTaskData] = useState<Partial<Omit<ITask, 'filters'> & { filters: string[] }>>({});

    const taskTitleRef = useRef<HTMLTextAreaElement | null>(null);
    const taskDescriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTaskDataChange = (field: keyof ITask, value: any) => {
        setTaskData((prev) => ({
            ...prev,
            [field]: field === 'filters' ? value.map((filter: IFilter) => filter._id) : value,
        }));
    };

    useEffect(() => {
        checkIfUpdated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskData, taskFilters, taskSubtasks]);

    const SubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (Object.keys(taskData).length > 0 && task._id) {
                await dispatch(editTask({ taskId: task._id, updates: taskData }));
                setEditTaskModal(false)
                setEditButton(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const areArrayEqual = <T extends IFilter | ISubtask>(array1: T[], array2: T[], ObjType: 'Filter' | 'Subtask'): boolean => {
        if (array1.length !== array2.length) return false;
        return array1.every((obj1, index) => {
            const obj2 = array2[index];
            if (ObjType === 'Subtask' && 'status' in obj1 && 'status' in obj2) {
                return (obj1.status === obj2.status && obj1._id === obj2._id);
            }
            if (ObjType === "Filter" && obj1._id === obj2._id) {
                return obj1._id === obj2._id;
            }
            return false;
        });
    };

    const checkIfUpdated = (): void => {
        const isTitleUpdated = taskData.title !== undefined && taskData.title !== task.title;
        const isDescriptionUpdated = taskData.description !== undefined && taskData.description !== task.description;
        const isDateUpdated = taskData.date !== undefined && taskData.date !== task.date;
        const areFiltersUpdated = !areArrayEqual(taskFilters, task.filters, 'Filter');
        const areSubtasksUpdated = !areArrayEqual(taskSubtasks, task.subtasks, 'Subtask');
        console.log(areSubtasksUpdated)
        if (isTitleUpdated || isDescriptionUpdated || isDateUpdated || areFiltersUpdated || areSubtasksUpdated) {
            setSubmitButton(true);
        } else {
            setSubmitButton(false);
        }
    };

    const updateFilters = (filters: IFilter[]): void => {
        setTaskFilters(filters)
        handleTaskDataChange('filters', filters)
    }

    const updateSubtasks = (subtasks: ISubtask[]): void => {
        setTaskSubtasks(subtasks);
        handleTaskDataChange('subtasks', [...subtasks.map(({ description, status }) => ({ status, description }))]);
    }

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

    return (
        <>
            {showAllFilters && (
                <AllFilterModal
                    taskFilters={taskFilters}
                    task={task}
                    setShowAllFilters={setShowAllFilters}
                    setTaskFilters={updateFilters}
                />
            )}
            <div className="add__task">
                <form className="add__task__block" onSubmit={SubmitEdit}>
                    <span className="add__task__block__exit" onClick={() => { setEditTaskModal(false); setEditButton(false) }}></span>
                    <article className="add__task__block__header">
                        <>
                            <FilterBlockForTaskInfo
                                filters={taskFilters}
                                AddButton={<AddFiltersButton setShowAllFilters={setShowAllFilters} />}
                            />
                        </>
                        <div className="add__task__block__header__date">
                            <DatePicker
                                selected={taskData.date !== undefined ? taskData.date : task.date}
                                onChange={(e) => handleTaskDataChange('date', formatDate(`${e}`))}
                                dateFormat="MMM dd"
                                className="add__task__block__header__date__info"
                                popperPlacement="bottom"
                            />
                            <span className="add__task__block__header__date__ico"></span>
                        </div>
                    </article>
                    <article className="add__task__block__form">
                        <textarea
                            placeholder="Title"
                            className="add__task__block__form__title"
                            value={taskData.title !== undefined ? taskData.title : task.title}
                            ref={taskTitleRef}
                            onChange={(e) => handleTextAndSize(e, 'title', handleTaskDataChange, taskTitleRef)}
                        />
                        <textarea
                            className="add__task__block__form__description"
                            placeholder="Description"
                            value={taskData.description !== undefined ? taskData.description : task.description}
                            ref={taskDescriptionRef}
                            onChange={(e) => handleTextAndSize(e, 'description', handleTaskDataChange, taskDescriptionRef)}
                        />
                    </article>
                    <SubtaskBlock subtaskType='editModal' subtasks={taskSubtasks} showCheckbox={true} setSubtasks={updateSubtasks} />
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
