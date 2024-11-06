import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { addProjectInvite } from '../../../redux/slices/ProjectSlice';
import { IUser } from '../../../types/IAuth';
import '../../../scss/invite_page/inviteModal.scss'

interface IInviteModal {
    token?: string;
    user: IUser | null;
}

const InviteModal: FC<IInviteModal> = ({ token, user }) => {

    const dispatch = useAppDispatch();
    const { inviteProject } = useAppSelector(state => state.project)

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (token && token.trim().length > 0 && user !== null) {
                await (dispatch(addProjectInvite({ token: token, user })))

                // dispatch(pushProjectId(`${inviteProject?._id}`))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='invite'>
            <div className='invite__modal'>
                <p className='invite__modal__h'>Are you sure about adding this project?</p>
                <p className='invite__modal__project'>Project name: {inviteProject?.name}</p>
                <button className='invite__modal__submit' onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
};

export default InviteModal;