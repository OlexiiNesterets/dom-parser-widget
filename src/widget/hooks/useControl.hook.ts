import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobileScreen';
import { ITreeItem } from '../types';
import { getDocumentBody } from '../../utils/getDocumentBody';
import { getChildren } from '../helpers/get-children.helper';

export const useControl = () => {
  const [domTree, setDomTree] = useState<ITreeItem[]>([]);
  const [onlyVisible, setOnlyVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [elementToIgnore, setElementToIgnore] = useState<HTMLElement | null>(
    null
  );
  const [isRemoved, setIsRemoved] = useState(false);
  const [isTopPosition, setIsTopPosition] = useState(false);

  const isMobile = useIsMobile();

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setElementToIgnore(elementRef.current || null);
  }, []);

  const handleParse = () => {
    const body = getDocumentBody();

    if (!body) {
      return;
    }

    const tree = getChildren([body], elementToIgnore);

    setDomTree(tree);
    setIsExpanded(true);
  };

  const handleModeChange = () => {
    setOnlyVisible((val) => !val);
  };

  const handleExpand = () => {
    if (domTree.length <= 0) {
      return;
    }

    setIsExpanded((val) => !val);
    setIsTopPosition(false);
  };

  const handlePositionChange = () => {
    setIsTopPosition((val) => !val);
  };

  const handleClose = () => {
    setIsRemoved(true);
  };

  const scrollStrategy =
    (isTopPosition: boolean) =>
    ({ element, isVisible }: ITreeItem) => {
      if (!isVisible) {
        return;
      }

      if (!window.top?.document.contains(element)) {
        return;
      }

      scrollToElement(element, isTopPosition);
    };

  const visibilityStrategy = ({ isVisible }: ITreeItem) => {
    if (isVisible) {
      return true;
    }

    if (!onlyVisible) {
      return true;
    }

    return false;
  };

  return {
    domTree,
    isExpanded,
    isRemoved,
    isTopPosition,
    isMobile,
    onlyVisible,
    elementRef,
    handleParse,
    handleModeChange,
    handleExpand,
    handlePositionChange,
    handleClose,
    scrollStrategy: scrollStrategy(isTopPosition),
    visibilityStrategy,
  };
};

function scrollToElement(el: HTMLElement, displayOnTop: boolean): void {
  if (!window.top) {
    return;
  }

  const offset = displayOnTop
    ? el.getBoundingClientRect().bottom +
      window.top.scrollY -
      window.top.innerHeight +
      100
    : el.getBoundingClientRect().top + window.top.scrollY - 100;

  window.top.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
}

