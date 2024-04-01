import { FC, useEffect, useState } from 'react';

import HeaderTask from './HeaderTask/HeaderTask';
import TaskBlock from './TaskBlock/TaskBlock';
import { ITaskItem } from './interfaceTask/ITaskInfo';

import '../../../scss/task.scss'

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

    const someArray: ITaskItem[] = [
        { id: 1, filter: 'todo', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 2, filter: 'todo', title: 'To do', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 3, filter: 'inprogress', title: 'Second', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 4, filter: 'inprogress', title: '493785348750943', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 5, filter: 'todo', title: 'First desing  ', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 6, filter: 'todo', title: 'First concept', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 7, filter: 'needreview', title: 'Opana', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 8, filter: 'inprogress', title: 'HUIHDUIHIJFDHIFHS', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 9, filter: 'inprogress', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 10, filter: 'done', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 11, filter: 'done', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...' },
        { id: 11, filter: 'inprogress', title: 'First desing concept', description: 'Create conceper based shos time of morning abu bylo ...' },
    ];

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

    const distributeTasks = () => {
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
        distributeTasks();
    }, []);

    const [taskClass, setTaskClass] = useState('all')

    const toggleTaskClass = (task: string) => {
        setTaskClass(task);
    }
    return (
        <section className='task'>
            <HeaderTask totalFilter={taskClass} count={taskCount} toggleTaskClass={toggleTaskClass} />
            {(() => {
                switch (taskClass) {
                    case 'todo':
                        return <TaskBlock array={task['todo']} filter={'todo'} activeClass='activeClass' />;
                    case 'inprogress':
                        return <TaskBlock array={task['inprogress']} filter={'inprogress'} activeClass='activeClass' />;
                    case 'needreview':
                        return <TaskBlock array={task['needreview']} filter={'needreview'} activeClass='activeClass' />;
                    case 'done':
                        return <TaskBlock array={task['done']} filter={'done'} activeClass='activeClass' />;
                    default:
                        return (
                            <>
                                <TaskBlock array={task['todo']} filter={'todo'} />
                                <TaskBlock array={task['inprogress']} filter={'inprogress'} />
                                <TaskBlock array={task['needreview']} filter={'needreview'} />
                                <TaskBlock array={task['done']} filter={'done'} />
                            </>
                        );
                }
            })()}
        </section>
    );
};

export default Task;
