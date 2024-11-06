import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { addProject } from '../../../redux/slices/ProjectSlice';

import '../../../scss/add_project/modal_add_project.scss';

interface IAddprojectModal {
    closeModal: () => void;
}

const AddProjectModal: FC<IAddprojectModal> = ({ closeModal }) => {

    const [name, setName] = useState<string>('')
    const dispatch = useAppDispatch()

    const author = useAppSelector(state => state.auth.user);

    const submitAddProject = () => {
        dispatch(addProject({ author: `${author?._id}`, name: name }))
        closeModal()
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);

    }

    return (
        <div className='modal__add__project'>
            <div className='modal__add__project__container'>
                <span className='modal__add__project__container__close' onClick={closeModal}></span>
                <input type="text" className='modal__add__project__container__input' onChange={handleChange} />
                <button className='modal__add__project__container__button' onClick={submitAddProject}> Submit</button>
            </div>
        </div>
    );
};

export default AddProjectModal;