import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';

import { getMember } from '../../../redux/slices/MemberSlice';
import MemberItem from './MemberItem';

import '../../../scss/member/member.scss';
import { IMember } from '../../../types/IMember';

const Member: FC = () => {
    const [members, setMembers] = useState<IMember[] | null>(null)
    const dispatch = useAppDispatch();

    const memberIds = useAppSelector(project => project.project.project?.member);
    const allMembers = useAppSelector(member => member.member?.member);

    useEffect(() => {
        if (memberIds) {
            dispatch(getMember({ memberIds }))
        }
    }, [dispatch, memberIds])

    useEffect(() => {
        if (allMembers) {
            setMembers(allMembers);
        }
    }, [allMembers]);

    return (
        <article className='main__members'>
            {members?.map(member => <MemberItem key={member._id} member={member}/>)}
        </article>
    );
};

export default Member;