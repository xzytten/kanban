import { FC } from 'react';
import '../../../scss/member.scss';
import MemberItem from './MemberItem';

const Member: FC = () => {
    return (
        <article className='main__members'>
            <MemberItem/>
            <MemberItem/>
            <MemberItem/>
            <MemberItem/>
            <MemberItem/>
        </article>
    );
};

export default Member;