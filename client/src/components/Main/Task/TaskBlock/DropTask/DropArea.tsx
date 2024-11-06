import { FC, useEffect, useState } from 'react';

import '../../../../../scss/task/drop_area.scss'

const DropArea: FC = () => {
    const [showArea, setShowArea] = useState<boolean>(false)
    
    useEffect(() => {
        console.log('-----------------showArea', showArea)
    },[showArea])
    
    return (
        <section
            onDragEnter={() => setShowArea(true)}  
            onDragLeave={() => setShowArea(false)}
            onDrop={() => setShowArea(false)}
            className={showArea ? 'drop__area' : 'drop__hide'}
        >
            Drop here
        </section>
    );
};

export default DropArea;