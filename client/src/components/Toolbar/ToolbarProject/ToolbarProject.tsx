import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { chooseProject } from '../../../redux/slices/ProjectSlice';
import { IProject } from '../../../types/IProject';
import { getProjects } from '../../../redux/slices/ProjectSlice';
import ToolbarProjectItem from './ToolbarProjectItem';
import AddButton from '../../Main/Task/Utils/AddButton';

import '../../../scss/toolbar/toolbar_project.scss'

const ToolbarProject: FC = () => {
    const [userProjects, setUserProjects] = useState<IProject[]>([])
    const [searchProject, setSearchProject] = useState<string>('');
    
    const dispatch = useAppDispatch()

    const userId = useAppSelector(user => user.auth.user?._id)
    const projects = useAppSelector(project => project.project.projects);

    useEffect(() => {
        const project = localStorage.getItem('chosenProject');

        if (project) {
            dispatch(chooseProject(JSON.parse(project)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userId) {
            dispatch(getProjects(userId))
        }
    }, [userId, dispatch])

    useEffect(() => {
        const filteredProjects = projects?.filter(project =>
            project.name.toLowerCase().includes(searchProject.toLocaleLowerCase())
        );
        setUserProjects(filteredProjects)
    }, [projects, searchProject]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchProject(event.target.value);
    };

    return (
        <div className='toolbar__project'>

            <h2 className='toolbar__project__title'>Projects</h2>
            <input
                type="text"
                className='toolbar__project__search'
                value={searchProject}
                onChange={handleSearch}
                placeholder='Search project' />

            <section className='toolbar__project__item-container'>
                {userProjects?.map(project => <ToolbarProjectItem key={project._id} project={project} />)}
            </section>
            <AddButton name='Add Project' />
        </div>
    );
};

export default ToolbarProject;