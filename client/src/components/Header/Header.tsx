import { FC } from 'react';

import Statistic from '../Statistic/Statistic';
import Profile from '../Profile/Profile';
import '../../scss/header/header.scss'

const Header: FC = () => {
    return (
        <div className='header'>
            <Statistic />
            <Profile />
        </div>
    );
};

export default Header;