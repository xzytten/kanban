import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hook';

import { chooseProject } from '../../../../redux/slices/ProjectSlice';

import '../../../scss/toolbar/toolbar_project_item.scss'
import { IProject } from '../../../../redux/types/IProject';

interface IToolbarProjectItem{
    project: IProject,
}

const ToolbarProjectItem: FC<IToolbarProjectItem> = ({project}) => {
    const dispatch = useAppDispatch();

    const takeProject = (project:IProject) => {
        dispatch(chooseProject(project))
    }

    return (
        <div className="toolbar__project__item" onClick={() => takeProject(project)}>
            <div className='toolbar__project__item__block'>
                <div className="toolbar__project__item__block__round">
                    <img src={require("../../../../img/project1.jpg")} alt="" className="toolbar__project__item__block__round__img" />
                </div>
                <p className="toolbar__project__item__block__title">{project.name}</p>
            </div>
            <span className="toolbar__project__item__edit"></span>
        </div>
    );
};

export default ToolbarProjectItem;