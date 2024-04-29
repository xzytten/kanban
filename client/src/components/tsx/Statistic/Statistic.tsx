import { FC, useState } from 'react';

import '../../scss/statistic.scss'

const Statistic: FC = () => {
    const [progress, setProgress] = useState<number>(20)

    return (
        <div className="statistic">
            <div className='statistic__round'>
                <img src={require("../../../img/project1.jpg")} className="statistic__round__img" alt="Piper Enterprise" />
            </div>
            <article className='statistic__progress'>
                <h2 className='statistic__progress__title'>Piper Enterprise</h2>
                <section className='statistic__progress__block'>
                    <div className='statistic__progress__block__view'>
                        <div className='statistic__progress__block__view__fill' style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className='statistic__progress__block__percent'>{progress}% complete</p>
                </section>
            </article>
        </div>
    );
};

export default Statistic;