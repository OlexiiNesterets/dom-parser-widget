import { v4 as uuidv4 } from 'uuid';
import { ITreeItem } from '../types';

export const getChildren = (
  elements: HTMLElement[],
  ignoreElement?: HTMLElement | null
): ITreeItem[] => {
  return elements.reduce((accumulator: ITreeItem[], element) => {
    if (ignoreElement === element) {
      return accumulator;
    }

    const isVisible = checkVisibility(element);

    if (!element.children.length || isDedicatedWidgetContainer(element)) {
      return accumulator.concat({
        element,
        id: uuidv4(),
        isVisible,
      });
    }

    return accumulator.concat({
      element,
      id: uuidv4(),
      isVisible,
      children: getChildren(
        Array.from(element.children) as HTMLElement[],
        ignoreElement
      ),
    });
  }, []);

  function isDedicatedWidgetContainer(htmlElement: HTMLElement) {
    return (
      ignoreElement?.parentElement === htmlElement &&
      htmlElement.children.length === 1
    );
  }

  function checkVisibility(htmlElement: HTMLElement) {
    if (htmlElement.offsetHeight && htmlElement.offsetWidth) {
      return true;
    }

    if (
      htmlElement.getBoundingClientRect().height &&
      htmlElement.getBoundingClientRect().width
    ) {
      return true;
    }

    return false;
  }
};
