import { FC } from 'react';

import '../../scss/member/more_member.scss';

const MoreMembers: FC = () => {
    return (
        <div className='more__member'>
            <p className='more__member__count'>+{5}</p>
        </div>
    );
};

export default MoreMembers;