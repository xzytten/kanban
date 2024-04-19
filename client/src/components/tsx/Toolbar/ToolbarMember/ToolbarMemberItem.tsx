import { FC } from 'react';
import '../../../scss/toolbar/toolbar_member_item.scss'

const ToolbarMemberItem: FC = () => {
    return (
        <div className='toolbar__member__item'>
            <div className='toolbar__member__item__block'>
                <div className="toolbar__member__item__block__round">
                    <img src={require("../../../../img/member1.jpg")} alt="" className="toolbar__member__item__block__img" />
                </div>
                <p className="toolbar__member__item__block__title">Piper Enterprise</p>
            </div>
            <span className="toolbar__member__item__edit"></span>
        </div>
    );
};

export default ToolbarMemberItem;