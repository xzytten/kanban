import { FC, useState } from 'react';
import { useAppSelector } from '../../redux/hooks/hook';
 

import MainContent from './MainContent';
import Menu from './Munu'

import '../../scss/main/main.scss'

const Main: FC = () => {

    const [activeMenu, setActiveMenu] = useState<string>('default')
    const activeProject = useAppSelector(state => state.project.project)

    return (
        <div className='main'>
            <Menu setActiveMenu={setActiveMenu} />

            {
                activeProject ? <MainContent activeMenu={activeMenu}/> : <div>Choose any project</div>   
            }
        </div>
    );
};




export default Main;