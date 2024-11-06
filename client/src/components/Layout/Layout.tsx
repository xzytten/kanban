import { FC } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';

import '../../scss/main/layout.scss'
import Toolbar from '../Toolbar/Toolbar';
const Layout: FC = () => {

    return (
        <div className="layout">
            <Header />
            <Toolbar />
            <Main />
        </div>
    );

};

export default Layout;