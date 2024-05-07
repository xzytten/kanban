import { FC } from 'react';
import '../../../scss/toolbar/toolbar_project_item.scss'

interface IToolbarProjectItem{
    name: string
}

const ToolbarProjectItem: FC<IToolbarProjectItem> = ({name}) => {
    return (
        <div className="toolbar__project__item">
            <div className='toolbar__project__item__block'>
                <div className="toolbar__project__item__block__round">
                    <img src={require("../../../../img/project1.jpg")} alt="" className="toolbar__project__item__block__round__img" />
                </div>
                <p className="toolbar__project__item__block__title">{name}</p>
            </div>
            <span className="toolbar__project__item__edit"></span>
        </div>
    );
};

export default ToolbarProjectItem;