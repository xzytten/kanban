import { FC } from 'react';
import FilterItem from '../../Filter/FilterItem';

import '../../../scss/member/member_item.scss';
import { IMember } from '../../../types/IMember';

interface IMemberItem{
    member: IMember,
}

const MemberItem: FC<IMemberItem> = ({member}) => {
    return (
        <section className='main__members__item'>
            <figure className='main__members__item__profile'>
                <div className='main__members__item__profile__block'>
                    <div className='main__members__item__profile__block__round'>
                        <img src={require("../../../img/member1.png")} alt="" className='main__members__item__profile__block__round__img' />
                    </div>
                    <div className='main__members__item__profile__block__info'>
                        <figcaption className='main__members__item__profile__block__info__name'>{member.userName}</figcaption>
                        <FilterItem/>
                    </div>
                </div>
                <span className='main__members__item__profile__edit'></span>
            </figure>
            <div className='main__members__item__statisctic'>
                <p className='main__members__item__statisctic__info'>Solved: <span className='main__members__item__statisctic__info__solved'>{member.solved}</span></p>
                <p className='main__members__item__statisctic__info'>Not in time: <span className="main__members__item__statisctic__info__notime">{member.notInTime}</span></p>
            </div>
        </section>
        
    );  
};

export default MemberItem;