import { FC, useState } from 'react';

import Menu from './Munu'

import '../../scss/main.scss'
import Task from './Task/Task';
import Member from './Member/Member';

const Main: FC = () => {

    const [activeMenu, setActiveMenu] = useState<string>('default')

    return (
        <div className='main'>
            <Menu setActiveMenu={setActiveMenu} />

          
            {(() => {
                switch (activeMenu) {
                    case 'member':
                        return <>
                            <input type="text" className='main__search' placeholder='Search' />
                            <div className='main__border'></div>

                            <Member />
                        </>
                    case 'calendar':
                        return <></>
                    case 'task':
                        return <Task />
                    default:
                        return <Task />
                }
            })()}
            {/* <Task/> */}
            {/* <Member/> */}
        </div>
    );
};

export default Main;