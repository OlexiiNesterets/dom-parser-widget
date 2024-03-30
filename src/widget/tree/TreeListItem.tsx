import React, { useRef } from "react";
import { ITreeItem } from "../types";
import { ReactComponent as EyeSvg } from '../../assets/icons/eye.svg';

const scrollToElement = (el: HTMLElement, displayOnTop: boolean): void => {

    if (!top) {
        return;
    }

    const offset = displayOnTop ?
        el.getBoundingClientRect().bottom + top.scrollY - top.innerHeight + 100 :
        el.getBoundingClientRect().top + top.scrollY - 100;

    top.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
};

const changeStyles = (el: HTMLElement, initialStyles: string): void => {
    el.style.cssText += 'box-shadow: #d99000 0px 0px 15px !important';
    el.style.cssText += 'outline: 3px solid #d99000';
    el.style.cssText += 'background: #d990008f';

    setTimeout(() => {
        el.style.cssText = initialStyles;
    }, 2000);
};


export const TreeItem = ({ element, isVisible, displayOnTop = false }: Omit<ITreeItem, 'id'>) => {


    const stylesRef = useRef(element.style.cssText);

    if (!top?.document.contains(element)) {
        return null;
    }

    const handleClick = () => {

        if (!isVisible) {
            return;
        }

        if (!top?.document.contains(element)) {
            return;
        }

        scrollToElement(element, displayOnTop);
        changeStyles(element, stylesRef.current);
    }

    const showDisabled = !isVisible ? 'opacity-45' : '';

    const iconForHidden = showDisabled && (<EyeSvg height={15} width={15} opacity={0.2} />);

    return (
        <button onClick={handleClick} disabled={!isVisible} className={`bg-transparent border-none hover:enabled:text-violet-500`}>
            <span className="inline-flex content-center">
                <span>
                    {element.tagName.toLowerCase()}
                </span>
                {iconForHidden && (
                    <span className="ml-1">{iconForHidden}</span>
                )}
            </span>
        </button>
    );
}
