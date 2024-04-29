import { FC } from 'react';
import '../../../scss/toolbar/toolbar_member.scss'
import ToolbarMemberItem from './ToolbarMemberItem';

const ToolbarMembers: FC = () => {
    return (
        <div className='toolbar__member'>
            <h2 className='toolbar__member__title'>Members</h2>
            <input type="text" className='toolbar__member__search' placeholder='Search'/>
            <ToolbarMemberItem/>
        </div>
    );
};

export default ToolbarMembers;