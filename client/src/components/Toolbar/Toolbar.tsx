import { FC, useState } from 'react';
import ToolbarProject from './ToolbarProject/ToolbarProject';


import '../../scss/toolbar/toolbar.scss'

const Toolbar: FC = () => {
    const [toolbar, setToolbar] = useState<boolean>(false);
    
    const toggleToolbar: React.MouseEventHandler<HTMLButtonElement> = () => {
        setToolbar(!toolbar)
    }

    return (
        <div className={`toolbar ${toolbar ? 'toolbar__show' : 'toolbar__hide'}`} >
            {
                toolbar ?
                <button className='tooggle__modal__show' onClick={toggleToolbar}></button>
                :
                <button className='tooggle__modal__hide' onClick={toggleToolbar}></button>
            }
            <div className={`${toolbar ? 'showItem' : 'hideItem'}`}>
                <ToolbarProject />
            </div>
        </div>

    );
};

export default Toolbar;