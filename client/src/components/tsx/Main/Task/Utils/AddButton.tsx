import { FC } from 'react';
import '../../../../scss/add_button.scss'

interface IAddButtonProps {
    name: string,
    setAddSubtask: (state: boolean) => void;
}

const AddButton: FC<IAddButtonProps> = ({ name, setAddSubtask }) => {

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        setAddSubtask(true);
    };

    return (
        <div className='add' onClick={handleClick}>
            <img src={require('../../../../../img/border.jpg')} alt="" className=' add__border' />
            <span className='add__name'>+ {name}</span>
        </div>
    );
};

export default AddButton;