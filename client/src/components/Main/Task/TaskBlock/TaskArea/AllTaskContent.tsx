import { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks/hook';
import { editTypeTask, getAllTask } from '../../../../../redux/slices/TaskSlice';
import { ITask } from '../../../../../types/ITask';

import HeaderTask from '../../HeaderTask/HeaderTask';
import TaskBlock from './TaskBlock';
import TaskColumn from './TaskColumn';

import '../../../../../scss/task/task.scss'

interface ITaskState {
    inprogress: ITask[];
    todo: ITask[];
    needreview: ITask[];
    done: ITask[];
};


interface ITaskCountState {
    inprogress: number;
    todo: number;
    needreview: number;
    done: number;
    [key: string]: number;
}


const AllTaskContent: FC = () => {
    const dispatch = useAppDispatch();

    const reduxTasks = useAppSelector(task => task.task.tasks);
    const project = useAppSelector(state => state.project.project);
    const [taskClass, setTaskClass] = useState('all');
    const [tasks, setTasks] = useState<ITask[]>([]);

    const [draggedItem, setDraggedItem] = useState<ITask | null>(null);
    const [activeColumn, setActiveColumn] = useState<string>('');

    const handleDrop = async () => {
        if (draggedItem) {
            if (draggedItem.type === activeColumn) {
                setActiveColumn('');
                return;
            }
            try {
                if (draggedItem._id) {
                    await dispatch(editTypeTask({ taskId: draggedItem._id, type: activeColumn }));
                }
                setActiveColumn('')
            } catch (error) {
                throw (error);
            }
        }
    };

    const [task, setTask] = useState<ITaskState>({
        inprogress: [],
        todo: [],
        needreview: [],
        done: [],
    });

    const [taskCount, setTaskCount] = useState<ITaskCountState>({
        inprogress: 0,
        todo: 0,
        needreview: 0,
        done: 0,
    });

    const deleteItem = (taskId: string) => {
        setTasks([...tasks.filter(tasks => tasks?._id !== taskId)]);
    };


    const toggleTaskClass = (task: string) => {
        setTaskClass(task);
    };

    const toggleTotalFilter = (taskClass: string, totalFilter: string): void => {
        totalFilter === taskClass ? toggleTaskClass('all') : toggleTaskClass(taskClass);
    };

    const distributeTasks = (tasks: ITask[]) => {
        const tempTasks: ITaskState = {
            inprogress: [],
            todo: [],
            needreview: [],
            done: [],
        };

        setTaskCount({
            inprogress: 0,
            todo: 0,
            needreview: 0,
            done: 0,
        });

        tasks.forEach(taskItem => {
            if (taskItem && taskItem.type && taskItem.type in tempTasks) {
                tempTasks[taskItem.type as keyof ITaskState].push(taskItem);
                setTaskCount(prevCount => ({
                    ...prevCount,
                    [taskItem.type!]: prevCount[taskItem.type!] + 1
                }));
            }
        });

        console.log('distributeTasks', tasks)
        setTask(tempTasks);
    };

    useEffect(() => {
        if (project) {
            dispatch(getAllTask({ projectId: project._id }));
        }
    }, [project, dispatch]);

    useEffect(() => {
        setTasks(reduxTasks);
    }, [reduxTasks])

    useEffect(() => {
        distributeTasks(tasks);

    }, [tasks]);

    useEffect(() => {
        console.log('draggedItem', draggedItem);
    }, [draggedItem]);

    return (
        <section className='task'>
            <TaskColumn
                TaskItem={<TaskBlock activeColumn={activeColumn} handleDrop={handleDrop} setActiveColumn={setActiveColumn} setDraggedItem={setDraggedItem} deleteItem={deleteItem} array={task['todo']} filter={'todo'} activeClass='activeClass' />}
                HeaderItems={<HeaderTask taskName="To Do" taskType="todo" toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
            <TaskColumn
                TaskItem={<TaskBlock activeColumn={activeColumn} handleDrop={handleDrop} setActiveColumn={setActiveColumn} setDraggedItem={setDraggedItem} deleteItem={deleteItem} array={task['inprogress']} filter={'inprogress'} activeClass='activeClass' />}
                HeaderItems={<HeaderTask taskName="In Progress" taskType="inprogress" toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
            <TaskColumn
                TaskItem={<TaskBlock activeColumn={activeColumn} handleDrop={handleDrop} setActiveColumn={setActiveColumn} setDraggedItem={setDraggedItem} deleteItem={deleteItem} array={task['needreview']} filter={'needreview'} activeClass='activeClass' />}
                HeaderItems={<HeaderTask taskName="Need Review" taskType="needreview" toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
            <TaskColumn
                TaskItem={<TaskBlock activeColumn={activeColumn} handleDrop={handleDrop} setActiveColumn={setActiveColumn} setDraggedItem={setDraggedItem} deleteItem={deleteItem} array={task['done']} filter={'done'} activeClass='activeClass' />}
                HeaderItems={<HeaderTask taskName="Done" taskType="done" toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
        </section>
    );
};

export default AllTaskContent;
