import { FC } from 'react';
import '../../../../scss/subtask_item.scss';

const SubTaskItem: FC = () => {
    return (
        <div className='subtask__item'>
            <span className='subtask__item__done' ></span>
            <p className='subtask__item__description'>And, in our Business English classes, we’ll prepare you for success in all contexts, teaching you to communicate, present and negotiate with confidence.</p>
        </div>
    );
};

export default SubTaskItem;