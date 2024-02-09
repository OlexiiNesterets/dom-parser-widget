import React, { useState } from "react";
import { ISubTree, ITreeItems } from "../types";
import { TreeItem } from "./TreeListItem";
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow.svg';

const SubTree = ({ shouldDisplay, subtreeRoot, subtreeContent }: ISubTree) => {

    const [isExpanded, setIsExpanded] = useState(true);

    const handleClick = () => {
        setIsExpanded(val => !val);
    }

    return (
        <>
            {shouldDisplay && (
                <div className="inline-flex">
                    <button onClick={handleClick} className="p-0 bg-transparent border-none w-6">
                        <ArrowSvg className="hover:fill-violet-500" width={16} height={20} transform={isExpanded ? 'rotate(90)' : ''} />
                    </button>
                    {subtreeRoot}
                </div>
            )}
            {(shouldDisplay && isExpanded) && (
                <>{subtreeContent}</>
            )}
        </>
    );
}

export const TreeList = ({ items, showNonVisible, displayOnTop }: ITreeItems) => {

    if (!items?.length) {
        return null;
    }

    return (
        <ul className="m-0 p-0 list-none">
            {items.map((item) => {

                const hasVisibleSize = Boolean(
                    (item.element.offsetHeight && item.element.offsetWidth) ||
                    (item.element.getBoundingClientRect().height && item.element.getBoundingClientRect().width)
                );

                const shouldDisplay = hasVisibleSize || !showNonVisible;

                if (item.children?.length) {
                    return (
                        <li className="flex flex-col items-start" key={item.id}>
                            <SubTree
                                shouldDisplay={shouldDisplay}
                                subtreeRoot={
                                    <TreeItem element={item.element} isVisible={hasVisibleSize} displayOnTop={displayOnTop} />
                                }
                                subtreeContent={
                                    <div className="pl-6">
                                        <TreeList items={item.children} showNonVisible={showNonVisible} displayOnTop={displayOnTop} />
                                    </div>
                                }
                            />

                        </li>
                    );
                }

                return (
                    <li className="flex items-start pl-6" key={item.id}>
                        {shouldDisplay && (
                            <TreeItem element={item.element} isVisible={hasVisibleSize} displayOnTop={displayOnTop} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
