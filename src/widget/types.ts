export interface ITreeItem {
    element: HTMLElement;
    id: string;
    isVisible?: boolean;
    children?: ITreeItem[]
}

export interface ITreeItems {
    items: ITreeItem[];
    strategies: Strategies<ITreeItem>;
}3

export interface Strategies<T> {
    scrollStrategy: (arg: T) => void,
    visibilityStrategy: (arg: T) => boolean;
}