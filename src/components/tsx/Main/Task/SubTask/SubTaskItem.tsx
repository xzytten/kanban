import { FC } from 'react';
import { ISubtask } from '../interfaceTask/ISubtask'; 

import '../../../../scss/subtask_item.scss';

const SubTaskItem: FC<ISubtask> = ({description, status}) => {
    return (
        <div className='subtask__item'>
            <span className={status ? `subtask__item__done` : 'subtask__item__unmade'} ></span>
            <p className='subtask__item__description'>{description}</p>
        </div>
    );
};

export default SubTaskItem;