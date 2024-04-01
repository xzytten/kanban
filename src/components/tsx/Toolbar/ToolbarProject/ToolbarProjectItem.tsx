import { FC } from 'react';
import '../../../scss/toolbar_project_item.scss'

const ToolbarProjectItem: FC = () => {
    return (
        <div className="toolbar__project__item">
            <div className='toolbar__project__item__block'>
                <div className="toolbar__project__item__block__round">
                    <img src={require("../../../../img/project1.jpg")} alt="" className="toolbar__project__item__block__round__img" />
                </div>
                <p className="toolbar__project__item__block__title">Piper Enterprise</p>
            </div>
            <span className="toolbar__project__item__edit"></span>
        </div>
    );
};

export default ToolbarProjectItem;