import { FC, useState } from 'react';
import AddProjectModal from '../../AddProject/AddProjectModal';

import '../../../../scss/add_button.scss'

interface IAddButtonProps {
    name: string,
}

const AddButton: FC<IAddButtonProps> = ({ name }) => {
    const [addModal, setAddModal] = useState<boolean>(false);

    const closeModal = (): void => {
        setAddModal(false);
    }

    return (
        <div className='add__container'>
            <div className='add' onClick={() => setAddModal(true)}>
                <img src={require('../../../../../img/border.jpg')} alt="" className=' add__border' />
                <span className='add__name'>+ {name}</span>
            </div>
            {addModal ? <AddProjectModal closeModal={closeModal} /> : null}
        </div>
    );
};

export default AddButton;