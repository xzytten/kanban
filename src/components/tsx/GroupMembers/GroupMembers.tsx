import { FC } from 'react';

import GroupMembersItem from './GroupMembersItem';

import '../../scss/group_member.scss';
import MoreMembers from './MoreMembers';

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