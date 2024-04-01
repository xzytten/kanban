export interface IHeaderTask {
    toggleTaskClass: (task: string) => void;
    count: Record<string, number>,
    totalFilter: string
}