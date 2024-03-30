import { v4 as uuidv4 } from 'uuid';
import { ITreeItem } from '../types';

export const getChildren = (elements: HTMLElement[], ignoreElement?: HTMLElement | null): ITreeItem[] => {
    return elements.reduce((accumulator, element) => {

        const id = uuidv4();

        if (ignoreElement === element) {
            return accumulator;
        }

        if (
            (ignoreElement?.parentElement === element) &&
            (element.children.length === 1)
        ) {
            return [...accumulator, { element, id }];
        }

        if (!element.children.length) {
            return [...accumulator, { element, id }];
        }

        return [...accumulator, {
            element,
            id,
            children: getChildren(
                Array.from(element.children) as HTMLElement[],
                ignoreElement
            )
        }]
    }, []);
};
