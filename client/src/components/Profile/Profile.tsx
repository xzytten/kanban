import { FC, useEffect } from 'react';
import { logout, checkIsAuth } from '../../redux/slices/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook';
import { useNavigate } from 'react-router-dom';
// import { IUser } from '../../../redux/types/IAuth';

import '../../scss/profile/profile.scss'

const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuth = useAppSelector(checkIsAuth)
    const userAuth = useAppSelector(state => state.auth.user)

    useEffect(() => {
        if (!isAuth && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            navigate('/login', { replace: true });
        }
    }, [navigate, isAuth])

    const handleLogout = () => {
        try {
            dispatch({ type: 'RESET' });
            window.localStorage.removeItem('token')
        } catch (error) {
            throw (error)
        }
    }

    return (
        <div className="profile">
            <span className="profile__setting"></span>
            <figure className="profile__profile">
                <div className="profile__profile__round">
                    <img src={require("../../img/profile.jpg")} alt="" className="profile__profile__round__img" />
                </div>
                <figcaption className="profile__profile__name">{userAuth?.name}</figcaption>
            </figure>
            <span className="profile__exit" onClick={handleLogout}></span>
        </div>
    );
};

export default Profile;