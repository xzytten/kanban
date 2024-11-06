import { FC } from 'react';

import GroupMembersItem from './GroupMembersItem';
import MoreMembers from './MoreMembers';

import '../../scss/member/group_member.scss';

const GroupMembers: FC = () => {
    return (
        <div className='group__members'>
            <GroupMembersItem />
            <GroupMembersItem />
            <GroupMembersItem />
            <MoreMembers />
        </div>
    );
};

export default GroupMembers;