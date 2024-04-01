import { FC } from 'react';

import '../../../../scss/subtask.scss';
import SubTaskItem from './SubTaskItem';

const SubTask: FC = () => {
    return (
        <div className='subtask'>
           <SubTaskItem/>
           <SubTaskItem/>
        </div>
    );
};

export default SubTask;