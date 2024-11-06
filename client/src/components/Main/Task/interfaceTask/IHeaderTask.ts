import { Dispatch, SetStateAction } from 'react';
import { ITask } from "../../../../types/ITask";

export interface IHeaderTask {
    toggleTaskClass: (task: string, type: string) => void;
    count: Record<string, number>,
    totalFilter: string,
    someArray: ITask[],
    setSomeArray: Dispatch<SetStateAction<ITask[]>>;
}