import React, { FC } from 'react';

import '../../../scss/filter/add_filters_button.scss' 

interface IAddFiltersButton {
    setShowAllFilters: (state: boolean) => void
}
const AddFiltersButton: FC<IAddFiltersButton> = ({setShowAllFilters}) => {
    return (

        <button
            onClick={() => setShowAllFilters(true)}
            className='add__filters__button'
        >
            +
        </button>

    );
};

export default AddFiltersButton;