import { FC, useEffect, useState } from 'react';

import HeaderTask from '../HeaderTask/HeaderTask';
import TaskBlock from './TaskBlock';
import HeaderTaskItem from '../HeaderTask/HeaderTaskItem';
import { ITaskItem } from '../interfaceTask/ITaskInfo';
import { v4 as uuidv4 } from 'uuid';

import '../../../../scss/task/task.scss'
import TaskColumn from './TaskColumn';

interface ITaskState {
    inprogress: ITaskItem[];
    todo: ITaskItem[];
    needreview: ITaskItem[];
    done: ITaskItem[];
};


interface ITaskCountState {
    inprogress: number;
    todo: number;
    needreview: number;
    done: number;
    [key: string]: number;
}


const Task: FC = () => {
    const idSubtask = uuidv4();

    const [someArray, setSomeArray] = useState<ITaskItem[]>([
        { id: '1', filter: 'todo', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '2', filter: 'inprogress', title: 'Second', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '3', filter: 'inprogress', title: '493785348750943', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '4', filter: 'todo', title: 'First desing  ', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '5', filter: 'todo', title: 'To do', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: true }] },
        { id: '6', filter: 'needreview', title: 'First concept', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '7', filter: 'needreview', title: 'Opana', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '8', filter: 'inprogress', title: 'HUIHDUIHIJFDHIFHS', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '9', filter: 'inprogress', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '12', filter: 'done', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '10', filter: 'done', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
        { id: '11', filter: 'inprogress', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...', subtask: [{ id: idSubtask, description: 'mnas', status: false }] },
    ])

    const [task, setTask] = useState<ITaskState>({
        inprogress: [],
        todo: [],
        needreview: [],
        done: [],
    })
    const [taskCount, setTaskCount] = useState<ITaskCountState>({
        inprogress: 0,
        todo: 0,
        needreview: 0,
        done: 0,
    })


    const deleteItem = (taskId: string) => {
        setSomeArray([...someArray.filter(someArray => someArray.id !== taskId)]);
    }

    const toggleTotalFilter = (taskClass: string, totalFilter: string): void => {
        totalFilter === taskClass ? toggleTaskClass('all') : toggleTaskClass(taskClass);
    }


    const distributeTasks = (someArray: ITaskItem[]) => {
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

        someArray.forEach(taskItem => {
            if (taskItem.filter in tempTasks) {
                tempTasks[taskItem.filter as keyof ITaskState].push(taskItem);
                setTaskCount(prevCount => ({
                    ...prevCount,
                    [taskItem.filter]: prevCount[taskItem.filter] + 1
                }));
            }
        });

        setTask(tempTasks);
    };


    useEffect(() => {
        distributeTasks(someArray);
    }, [someArray]);

    const [taskClass, setTaskClass] = useState('all')

    const toggleTaskClass = (task: string) => {
        setTaskClass(task);
    }

    return (
        <section className='task'>
            {(() => {
                switch (taskClass) {
                    case 'todo':
                        return <TaskColumn
                            TaskItem={<TaskBlock deleteItem={deleteItem} array={task['todo']} filter={'todo'} activeClass='activeClass' />}
                            HeaderItems={<HeaderTask someArray={someArray} setSomeArray={setSomeArray} toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
                    case 'inprogress':
                        return <TaskColumn
                            TaskItem={<TaskBlock deleteItem={deleteItem} array={task['inprogress']} filter={'inprogress'} activeClass='activeClass' />}
                            HeaderItems={<HeaderTask someArray={someArray} setSomeArray={setSomeArray} toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
                    case 'needreview':
                        return <TaskColumn
                            TaskItem={<TaskBlock deleteItem={deleteItem} array={task['needreview']} filter={'needreview'} activeClass='activeClass' />}
                            HeaderItems={<HeaderTask someArray={someArray} setSomeArray={setSomeArray} toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
                    case 'done':
                        return <TaskColumn
                            TaskItem={<TaskBlock deleteItem={deleteItem} array={task['done']} filter={'done'} activeClass='activeClass' />}
                            HeaderItems={<HeaderTask someArray={someArray} setSomeArray={setSomeArray} toggleTotalFilter={toggleTotalFilter} totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />} />
                    default:
                        return (
                            <>
                                <TaskColumn
                                    TaskItem={<TaskBlock deleteItem={deleteItem} array={task['todo']} filter={'todo'} />}
                                    HeaderItem={<HeaderTaskItem setSomeArray={setSomeArray} someArray={someArray} totalFilter={taskClass} count={taskCount} name='To Do' taskClass='todo' toggleTaskClass={toggleTotalFilter} />} />
                                <TaskColumn
                                    TaskItem={<TaskBlock deleteItem={deleteItem} array={task['inprogress']} filter={'inprogress'} />}
                                    HeaderItem={<HeaderTaskItem setSomeArray={setSomeArray} someArray={someArray} totalFilter={taskClass} count={taskCount} name='In Progress' taskClass='inprogress' toggleTaskClass={toggleTotalFilter} />} />
                                <TaskColumn
                                    TaskItem={<TaskBlock deleteItem={deleteItem} array={task['needreview']} filter={'needreview'} />}
                                    HeaderItem={<HeaderTaskItem setSomeArray={setSomeArray} someArray={someArray} totalFilter={taskClass} count={taskCount} name='Need Review' taskClass='needreview' toggleTaskClass={toggleTotalFilter} />} />
                                <TaskColumn
                                    TaskItem={<TaskBlock deleteItem={deleteItem} array={task['done']} filter={'done'} />}
                                    HeaderItem={<HeaderTaskItem setSomeArray={setSomeArray} someArray={someArray} totalFilter={taskClass} count={taskCount} name='Done' taskClass='done' toggleTaskClass={toggleTotalFilter} />} />
                            </>
                        );
                }
            })()}
        </section>
    );
};

export default Task;
