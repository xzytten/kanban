import React, { FC } from 'react';
import { IFilter } from '../../../types/IFilter';
import FilterItem from './FilterItem';
import { deleteFilter } from '../../../redux/slices/FilterSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';

import '../../../scss/filter/delete_filter_info.scss'

interface IDeleteFitlerInfo {
    filter: IFilter,
    setShowDeleteFilterInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteFilterInfo: FC<IDeleteFitlerInfo> = ({ filter, setShowDeleteFilterInfo }) => {

    const dispatch = useAppDispatch();

    const deleteThisFilter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            if (filter.project && filter._id)
                await dispatch(deleteFilter({ projectId: filter.project, filterId: filter._id }))
                setShowDeleteFilterInfo(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div
                className='backdround-delete-filter-info'
                onClick={() => setShowDeleteFilterInfo(false)}
            ></div>
            <div className='delete-filter-info-modal'>
                <FilterItem filter={filter} />
                <p className='delete-filter-info-modal__message'>Are you sure you want to delete this filter?</p>
                <button
                    className='delete-filter-info-modal__delete'
                    onClick={(e) => deleteThisFilter(e)}>Delete</button>
            </div>
        </>

    );
};

export default DeleteFilterInfo;