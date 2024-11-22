import React, { FC } from 'react';

import '../../../scss/filter/add_filter_button.scss'

interface IAddFilterButton {
    setShowAddFilterModal: React.Dispatch<React.SetStateAction<boolean>>,
    type: 'menu' | 'modal'
}


const AddFilterButton:FC <IAddFilterButton>= ({setShowAddFilterModal, type}) => {
    return (
        <button
            className={`filter-add-button ${type === 'menu' ? 'menu' : 'modal'}`}
            onClick={() => setShowAddFilterModal(true)}
        >
            <p className='all-filter__add-button__pluse'>+</p>
            <p className='all-filter__add-button__title'>Filter</p>
        </button>
    );
};

export default AddFilterButton;