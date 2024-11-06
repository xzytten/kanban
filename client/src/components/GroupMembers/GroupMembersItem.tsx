import {FC} from 'react';

import '../../scss/member/group_member_item.scss';

const GroupMembersItem: FC = () => {
    return (
        <div className='group__member__item'>
            <img src={require('../../img/member1.png')} alt="" className='group__member__item__img'/>
        </div>
    );
};

export default GroupMembersItem;