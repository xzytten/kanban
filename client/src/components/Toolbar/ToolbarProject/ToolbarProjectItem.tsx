import { FC, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { chooseProject } from '../../../redux/slices/ProjectSlice';
import { IProject } from '../../../types/IProject';

import '../../../scss/toolbar/toolbar_project_item.scss'

interface IToolbarProjectItem {
    project: IProject,
}

const ToolbarProjectItem: FC<IToolbarProjectItem> = ({ project }) => {
    const [editModal, setEditModal] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const handleEditProject = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setEditModal(!editModal)
    }

    const CopyInviteLink = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (project && navigator.clipboard) {
            navigator.clipboard.writeText(`http://localhost:3000/invite/${project.inviteUrl}`)
        }
        setEditModal(!editModal)
    }

    const takeProject = (project: IProject) => {
        if (project) {
            localStorage.setItem('chosenProject', JSON.stringify(project))
            dispatch(chooseProject(project))
        }
    }

    return (
        <div className="toolbar__project__item" onClick={() => takeProject(project)}>
            <div className='toolbar__project__item__block'>
                <div className="toolbar__project__item__block__round">
                    <img src={require("../../../img/project1.jpg")} alt="" className="toolbar__project__item__block__round__img" />
                </div>
                <p className="toolbar__project__item__block__title">{project.name}</p>
            </div>
            <span
                className="toolbar__project__item__edit"
                onClick={(e) => handleEditProject(e)}
            ></span>
            {editModal ?
                <nav className='toolbar__project__item__edit-modal'>
                    <ul className='toolbar__project__item__edit-modal__ul'>
                        <li className='toolbar__project__item__edit-modal__ul__li' onClick={e => CopyInviteLink(e)}>Copy Invite Link</li>
                    </ul>
                </nav>
                : null}
        </div>
    );
};

export default ToolbarProjectItem;