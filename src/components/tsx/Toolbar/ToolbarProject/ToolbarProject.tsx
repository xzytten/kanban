import { FC } from 'react';
import ToolbarProjectItem from './ToolbarProjectItem';
import '../../../scss/toolbar_project.scss'

const ToolbarProject: FC = () => {
    return (
        <div className='toolbar__project'>
            <h2 className='toolbar__project__title'>Projects</h2>
            <input type="text" className='toolbar__project__search' placeholder='Search'/>
            <ToolbarProjectItem/>
        </div>
    );
};

export default ToolbarProject;