import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { getProjectInvite } from '../../../redux/slices/ProjectSlice';
import Login from '../../Auth/Login';
import InviteModal from './InviteModal';

import '../../../scss/invite_page/invite__page.scss'

const InvitePage = () => {
    const { token } = useParams()

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [status, setAddProjectStatus] = useState<string>('')

    const { addProjectStatus } = useAppSelector(state => state.project)
    const { user } = useAppSelector(state => state.auth)
    const { reqStatus } = useAppSelector(state => state.project)
    const { message } = useAppSelector(state => state.project)

    useEffect(() => {
        setAddProjectStatus(addProjectStatus)
    }, [addProjectStatus])

    useEffect(() => {
        if (token) {
            if (token && user) {
                dispatch(getProjectInvite({ token, user }))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, dispatch])

    const renderContent = () => {
        if (reqStatus === "notAuth") {
            return <Login />;
        } else if (reqStatus === "alreadyExist") {
            return (
                <div className='invite__page__block'>
                    <p className='invite__page__block__info'>{message}</p>
                    <button className='invite__page__block__button' onClick={() => navigate('/')}>Go to main page</button>
                </div>
            );
        } else if (reqStatus === "ProjectNotFound") {
            return <div>ProjectNotFound</div>;
        } else if (reqStatus === "showProject") {
            return (
                status !== 'fulfilled' ? (
                    <InviteModal token={token} user={user} />
                ) : (
                    <div className='invite__page__block'>
                        <p className='invite__page__block__info'>Successful</p>
                        <button className='invite__page__block__button' onClick={() => navigate('/')}>Go to main page</button>
                    </div>
                )
            );
        } else {
            return null;
        }
    }

    return (
        <div className='invite__page' >
            {renderContent()}
        </div>
    );
};

export default InvitePage;