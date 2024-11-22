import { FC, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { changeFilter } from '../../../redux/slices/FilterSlice';
import { IFilter } from '../../../types/IFilter';
import FilterItem from './FilterItem';

import '../../../scss/filter/filter_info.scss'
import DeleteFilterInfo from './DeleteFilterInfo';

interface IFilterInfo {
    setShowFilterInfo: React.Dispatch<React.SetStateAction<boolean>>,
    filter: IFilter,
}

const FilterInfo: FC<IFilterInfo> = ({ setShowFilterInfo, filter }) => {

    const [name, setName] = useState<string>(filter.name);
    const [backgroundColor, setBackgroundColor] = useState<string>(filter.backgroundColor);
    const [textColor, setTextColor] = useState<string>(filter.textColor);
    const [showDeleteFilterInfo, setShowDeleteFilterInfo] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!name || !backgroundColor) {
                return;
            }

            let changedFilter: { [key: string]: string } = {};

            if (filter.name !== name) {
                changedFilter.name = name
            }

            if (filter.textColor !== textColor) {
                changedFilter.textColor = textColor
            }

            if (filter.backgroundColor !== backgroundColor) {
                changedFilter.backgroundColor = backgroundColor
            }

            dispatch(changeFilter({ changedFilter, _id: filter._id }))

            setShowFilterInfo(false)
        } catch (error) {
            console.log(error)
        }
    };

    const closeAddFilterModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowFilterInfo(false)
    }


    return (
        <>
            <div
                className='backdround-filter-info'
                onClick={(e) => { closeAddFilterModal(e) }}>
            </div>
            {showDeleteFilterInfo && <DeleteFilterInfo filter={filter} setShowDeleteFilterInfo={setShowDeleteFilterInfo} />}
            <div className='filter-info-block'>
                <h3 className='filter-info-block__title'>{filter.name}</h3>
                <FilterItem filter={{ _id: filter._id, backgroundColor, name, textColor }} />
                <form onSubmit={(e) => handleSubmit(e)} className='filter-info-block__form'>
                    <label className='filter-info-block__form__name'>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Filter Name"
                            className='filter-info-block__form__input filter-info-block__form__name__input'
                        />
                    </label>
                    <label className='filter-info-block__form__color'>
                        <p className="filter-info-block__form__color__title">Background Color</p>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            placeholder="Background Color"
                            className=' filter-info-block__form__color__input'
                        />
                    </label>

                    <label className='filter-info-block__form__color'>
                        <p className="filter-info-block__form__color__title">Text Color</p>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            placeholder="Text Color"
                            className=' filter-info-block__form__color__input'
                        />
                    </label>
                    <div className='filter-info-block__form__button-block'>
                        <button
                            type="submit"
                            className='filter-info-block__form__button-block__submit'
                        >
                            Submit Changes
                        </button>

                        <button
                            type="button"
                            className='filter-info-block__form__button-block__delete'
                            onClick={() => setShowDeleteFilterInfo(true)}
                        >
                            Delete
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
};

export default FilterInfo;