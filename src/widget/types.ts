export interface ITreeItem {
    element: HTMLElement;
    id: string;
    children?: ITreeItem[]
}

export interface ITreeItems {
    items: ITreeItem [];
}

export interface IWidgetContex {
    displayNonVisible: boolean;
    elementToIgnore: HTMLElement;
}