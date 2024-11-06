import React, { FC } from 'react';
import Member from './Member/Member';
import AllTaskContent from './Task/TaskBlock/TaskArea/AllTaskContent';

interface IMainContent {
    activeMenu: string
}

const MainContent: FC<IMainContent> = ({ activeMenu }) => {
    return (
        <div>
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
                        return <AllTaskContent />
                    default:
                        return <AllTaskContent />
                }
            })()}
        </div>
    );
};

export default MainContent;