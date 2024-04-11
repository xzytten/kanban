import {FC} from 'react';

const TaskEditButton:FC = () => {
    return (
        <div className='task__edit__butoton'>
            <p className='task__edit__butoton'>Edit</p>
            <p className='task__edit__butoton'>Delete</p>
        </div>
    );
};

export default TaskEditButton;