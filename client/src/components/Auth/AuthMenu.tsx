import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import '../../scss/auth/auth_menu.scss';

interface IAuthMenu {
    activeItem: boolean,
}

const AuthMenu: FC<IAuthMenu> = ({ activeItem }) => {
    return (
        <div className='auth__menu__block'>
            <NavLink to={'/login'} className={`auth__menu__block__button ${activeItem ? 'auth__menu__block__button__active' : ''}`} >Sign in</NavLink>
            <NavLink to={'/register'} className={`auth__menu__block__button ${!activeItem ? 'auth__menu__block__button__active' : ''}`}>Register</NavLink>
        </div>
    );
};

export default AuthMenu;