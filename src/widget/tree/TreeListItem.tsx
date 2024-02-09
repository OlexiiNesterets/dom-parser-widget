import React, { useContext, useRef } from "react";
import { ITreeItem } from "../types";
import { WidgetContex } from "../context/WidgetContex";
import { ReactComponent as EyeSvg } from '../../assets/icons/eye.svg';


export const TreeItem = ({ element }: Omit<ITreeItem, 'id'>) => {

    const { displayNonVisible } = useContext(WidgetContex);

    const stylesRef = useRef(element.style.cssText);

    if (!document.contains(element)) {
        return null;
    }

    const hasSize = (element.offsetHeight && element.offsetWidth) ||
        (element.getBoundingClientRect().height && element.getBoundingClientRect().width);

    const handleClick = () => {

        if (!hasSize) {
            return;
        }

        const testOffset = element.getBoundingClientRect().top + window.scrollY;

        element.style.cssText += 'box-shadow: #d99000 0px 0px 15px !important';
        // element.style.cssText += 'outline: 2px solid #ff0040d3';

        window.scrollTo({
            // top: element.offsetTop - 100,
            top: testOffset - 100,
            behavior: 'smooth'
        });

        setTimeout(() => {
            element.style.cssText = stylesRef.current;
        }, 2000);
    }

    if (displayNonVisible && !hasSize) {
        return null;
    }

    const showDisabled = (!displayNonVisible && !hasSize) ? 'opacity-45' : '';

    const iconForHidden = showDisabled && (<EyeSvg height={15} width={15} />);

    return (
        <button onClick={handleClick} className={`bg-transparent border-none ${showDisabled}`}>
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
