import { FC } from 'react';
import '../../scss/profile.scss'

const Profile: FC = () => {
    return (
        <div className="profile">
            <span className="profile__setting"></span>
            <figure className="profile__profile">
                <div className="profile__profile__round">
                    <img src={require("../../../img/profile.jpg")} alt="" className="profile__profile__round__img" />
                </div>
                <figcaption className="profile__profile__name">Alison Hoper</figcaption>
            </figure>
            <span className="profile__exit"></span>
        </div>
    );
};

export default Profile;