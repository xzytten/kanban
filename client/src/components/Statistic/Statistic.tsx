import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks/hook';
import '../../scss/statistic/statistic.scss'
import { ITask } from '../../types/ITask';
import { IProject } from '../../types/IProject';

const Statistic: FC = () => {
    const [progress, setProgress] = useState<number>(0)
    const [project, setProject] = useState<IProject>()

    const reduxProject = useAppSelector(state => state.project.project)
    const reduxTasks: ITask[] = useAppSelector(state => state.task.tasks)

    const changeProgress = (): void => {
        let doneTasks: number = 0;
        // if (reduxProject) {
        //     reduxTasks.forEach(item => {
        //         if (item.type === 'done') {
        //             doneTasks += 1;
        //         }
        //     })
        // }
        const progress: number = doneTasks !== 0 ? (doneTasks / reduxTasks.length) * 100 : 0;
        setProgress(parseFloat(progress.toFixed(1)))
    }

    useEffect(() => {
        if (reduxProject)
            setProject(reduxProject)
    }, [reduxProject])

    useEffect(() => {
        changeProgress()
    }, [reduxTasks])

    return (
        <div className="statistic">
            <div className='statistic__round'>
                <img src={require("../../img/project1.jpg")} className="statistic__round__img" alt="Piper Enterprise" />
            </div>
            <article className='statistic__progress'>
                <h2 className='statistic__progress__title'>{project?.name}</h2>
                <section className='statistic__progress__block'>
                    <div className='statistic__progress__block__view'>
                        <div className='statistic__progress__block__view__fill' style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className='statistic__progress__block__percent'>{progress}% complete</p>
                </section>
            </article>
        </div>
    );
};

export default Statistic;