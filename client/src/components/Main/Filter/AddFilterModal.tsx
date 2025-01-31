import { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hook';
import { postFilter } from '../../../redux/slices/FilterSlice';
import { IFilter } from '../../../types/IFilter';
import FilterItem from './FilterItem';

import '../../../scss/filter/filter_add.scss'

interface IAddFilterModal {
    setShowAddFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddFilterModal: FC<IAddFilterModal> = ({ setShowAddFilterModal }) => {

    const { project } = useAppSelector(project => project.project)
    const [name, setName] = useState<string>('Filter Name');
    const [backgroundColor, setBackgroundColor] = useState<string>('grey');
    const [textColor, setTextColor] = useState<string>('white');

    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !backgroundColor || name.trim().length > 20) {
            return;
        }
        try {
            const filter: IFilter = { name, backgroundColor, textColor };

            if (project) {
                await dispatch(postFilter({ filter, projectId: project._id }));
            }

            setDefaultInputs();

            setShowAddFilterModal(false)
        } catch (error) {
            console.log(error)
        }
    };

    const closeAddFilterModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDefaultInputs();
        setShowAddFilterModal(false)
    }

    const setDefaultInputs = () => {
        setName('Filter Name');
        setBackgroundColor('grey');
        setTextColor('white')

    }

    return (
        <>
            <div
                className='modal-background'
                onClick={(e) => { closeAddFilterModal(e) }}>
            </div>
            <div className='addfilter'>
                <h3 className='addfilter__title'>New Filter</h3>
                <FilterItem filter={{ name, backgroundColor, textColor }} type={'modal'} />
                <form onSubmit={handleSubmit} className='addfilter__form'>
                    <label className='addfilter__form__name'>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Filter Name"
                            className='addfilter__form__input addfilter__form__name__input'
                            maxLength={20}
                        />
                    </label>
                    <label className='addfilter__form__color'>
                        <p className="addfilter__form__color__title">Background Color</p>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            placeholder="Background Color"
                            className=' addfilter__form__color__input'
                        />
                    </label>

                    <label className='addfilter__form__color'>
                        <p className="addfilter__form__color__title">Text Color</p>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            placeholder="Text Color"
                            className=' addfilter__form__color__input'
                        />
                    </label>
                    <button
                        type="submit"
                        className='addfilter__form__submit'
                    >
                        Add Filter
                    </button>
                </form>
            </div>
        </>





    );
};

export default AddFilterModal;