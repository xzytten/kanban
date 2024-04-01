import { FC, useState } from 'react';
import '../../scss/menu.scss'

interface IMenuProps {
    setActiveMenu: (menuItem: string) => void
}

const Munu: FC<IMenuProps> = ({ setActiveMenu }) => {
    const [active, setActive] = useState<string>('');

    const toggleActiveItem = (item: string): void => {
        setActiveMenu(item);
        setActive(item);
    }
    return (
        <div className='main__menu'>
            <button className={`main__menu__item ${active === 'calendar' && 'main__menu__item__active'}`} onClick={() => toggleActiveItem('calendar')}>Calendar</button>
            <button className={`main__menu__item ${active === 'task' && 'main__menu__item__active'}`} onClick={() => toggleActiveItem('task')}>Tasks</button>
            <button className={`main__menu__item ${active === 'member' && 'main__menu__item__active'}`} onClick={() => toggleActiveItem('member')}>Members</button>
        </div>
    );
};

export default Munu;