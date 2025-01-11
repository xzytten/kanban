import { FC, useState, useEffect } from 'react';

import GroupMembers from '../../../../GroupMembers/GroupMembers';
import FilterItem from '../../../Filter/FilterItem';
import ViewTask from './ViewTask';
import TaskEditButton from '../EditTask/TaskEditButton';

import { ITask } from '../../../../../types/ITask';
import { deleteOneTask } from '../../../../../redux/slices/TaskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks/hook';

import '../../../../../scss/task/task_item.scss';

interface ITaskItemProps {
    task: ITask,
    taskType: string,
    deleteItem: (taskId: string) => void,
    setDraggedItem: (draggedItem: ITask) => void,
}


const TaskItem: FC<ITaskItemProps> = ({ setDraggedItem, task, taskType, deleteItem }) => {

    const dispatch = useAppDispatch();
    const [taskInfo, setTaskInfo] = useState<ITask>(task)
    const deleteStatus = useAppSelector(state => state.task.deleteStatus)
    const deletedTask = useAppSelector(state => state.task.deletedTask)
    const [viewTask, setViewTask] = useState<boolean>(false);
    const [editButton, setEditButton] = useState<boolean>(false);

    const options = { month: 'short', day: 'numeric' } as const;
    const formattedDate = new Date(task.date).toLocaleDateString('en-US', options);

    const handleDragStart = (task: ITask) => {
        if (task) {
            setDraggedItem(task);
        };
    }

    const toggleEditButton = () => {
        setEditButton(!editButton);
    }

    const toggleModal = () => {
        setViewTask(!viewTask);
    }

    const deleteOneItem = async (id?: string) => {
        if (id) {
            await dispatch(deleteOneTask({ taskId: id }))
        }
    }

    useEffect(() => {
        if (deletedTask && deleteStatus === "fulfilled") {
            deleteItem(deletedTask);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteStatus])

    useEffect(() => {
        setTaskInfo(task)
    }, [task])

    useEffect(() => {
        console.log("taskItem", task, "taskItem")
    }, [task])

    return (
        <article className='task__item' draggable onDragStart={() => handleDragStart(taskInfo)}>
            {editButton && <TaskEditButton task={taskInfo} deleteItem={() => deleteOneItem(taskInfo._id)} />}
            {viewTask && <ViewTask setTaskInfo={setTaskInfo} task={taskInfo} toggleModal={toggleModal} />}
            <div className='task__item__header'>
                <div className='task__item__header__block'>
                    <ul className='task__item__header__block__filters'>
                        {taskInfo.filters.length > 2
                            ?
                            (<>
                                <li key={taskInfo.filters[0]._id} className='task__item__header__block__filters__item'>
                                    <FilterItem filter={taskInfo.filters[0]} />
                                </li>
                                <li key={taskInfo.filters[1]._id} className='task__item__header__block__filters__item'>
                                    <FilterItem filter={taskInfo.filters[1]} />
                                </li>

                                <li className='task__item__header__block__filters__item'>
                                    <FilterItem filter={{ backgroundColor: "grey", name: `+${taskInfo.filters.length - 2}`, textColor: 'white' }} />
                                </li>
                            </>
                            )
                            :
                            (<>
                                {
                                    taskInfo.filters.map(filter => (
                                        <li key={filter._id} className='task__item__header__block__filters__item'>
                                            <FilterItem filter={filter} />
                                        </li>
                                    ))
                                }
                            </>)
                        }
                    </ul>
                    <span className='task__item__header__block__edit' onClick={toggleEditButton}></span>
                </div>
                <div className='task__item__block'>
                    <h3 className='task__item__block__name' onClick={toggleModal}>{taskInfo.title.length > 50 ? taskInfo.title.slice(0, 50) + "..." : taskInfo.title}</h3>
                    <p className='task__item__block__description'>{taskInfo.description.length > 50 ? task.description.slice(0, 50) + "..." : taskInfo.description}</p>
                </div>
            </div>
            <section className='task__item__date__sabtasks'>
                {taskInfo.subtasks && taskInfo.subtasks.length > 0 && (
                    <article className='task__item__date__sabtasks__done'>
                        <img src={require('../../../../../img/doneIco.jpg')} alt='done' className='task__item__date__sabtasks__done__ico' />
                        <p className='task__item__date__sabtasks__done__info'>{taskInfo.subtasks.filter(item => item.status === true).length}/{taskInfo.subtasks.length}</p>
                    </article>
                )}
                <article className='task__item__date__sabtasks__date'>
                    <img src={require('../../../../../img/dateIco.jpg')} alt='date' className='task__item__date__sabtasks__date__ico' />
                    <p className='task__item__date__sabtasks__date__info'>{formattedDate}</p>
                </article>
            </section>
            <div className='task__item__extra'>
                <GroupMembers />
                <section className='task__item__extra__attachment'>
                    <article className='task__item__extra__attachment__views'>
                        <img src={require('../../../../../img/view.jpg')} alt="views" className='task__item__extra__attachment__views__ico' />
                        <p className='task__item__extra__attachment__views__count'>2</p>
                    </article>
                    <article className='task__item__extra__attachment__files'>
                        <img src={require('../../../../../img/files.jpg')} alt='files' className='task__item__extra__attachment__files__ico' />
                        <p className='task__item__extra__attachment__files__count'>5</p>
                    </article>
                </section>
            </div>
        </article>
    );
};

export default TaskItem;