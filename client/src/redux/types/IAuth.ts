import { IProject } from "./IProject";

export interface IUser{
    id: string,
    name: string, 
    img: string,
    project: IProject[],
}