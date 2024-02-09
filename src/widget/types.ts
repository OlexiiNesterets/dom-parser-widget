import { ReactNode } from "react";

export interface ITreeItem {
    element: HTMLElement;
    id: string;
    isVisible?: boolean;
    displayOnTop?: boolean;
    children?: ITreeItem[]
}

export interface ITreeItems {
    items: ITreeItem [];
    showNonVisible: boolean;
    displayOnTop?: boolean;
}

export interface ISubTree {
    subtreeRoot: ReactNode;
    shouldDisplay: boolean;
    subtreeContent: ReactNode;
}
