import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hook';

import ToolbarProjectItem from './ToolbarProjectItem';
import AddButton from '../../Main/Task/Utils/AddButton';

import '../../../scss/toolbar/toolbar_project.scss'
import { IProject } from '../../../../redux/types/IProject';
import { getProjects } from '../../../../redux/slices/ProjectSlice';

const ToolbarProject: FC = () => {
    const [userProjects, setUserProjects] = useState<IProject[] | null>(null)
    const dispatch = useAppDispatch()

    const projectIds = useAppSelector(user => user.auth.user?.project)
    const projects = useAppSelector(project => project.project.projects);

    useEffect(() => {
        dispatch(getProjects({ projectIds }))
    }, [dispatch, projectIds]);

    useEffect(() => {
        setUserProjects(projects)
    }, [projects]);

    return (
        <div className='toolbar__project'>

            <h2 className='toolbar__project__title'>Projects</h2>
            <input type="text" className='toolbar__project__search' placeholder='Search' />

            <section className='toolbar__project__item-container'>
                {userProjects?.map(project => <ToolbarProjectItem key={project._id} name={project.name} />)}
            </section>
            <AddButton name='Add Project' />
        </div>
    );
};

export default ToolbarProject;