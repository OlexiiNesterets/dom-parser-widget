import React, { useState } from "react";
import { ITreeItems } from "../types";
import { TreeItem } from "./TreeListItem";
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow.svg';

export const TreeList = ({ items }: ITreeItems) => {

    // TODO: bug with expand? expand alot of
    const [isExpanded, setIsExpanded] = useState(true);

    if (!items?.length) {
        return null;
    }

    const handleClick = () => {
        setIsExpanded(e => !e);
    }

    return (
        <ul className="m-0 p-0 list-none">
            {items.map((item) => {
                if (item.children?.length) {
                    return (
                        <li className="flex flex-col items-start" key={item.id}>
                            <div className="inline-flex">
                                <button onClick={handleClick} className="p-0 bg-transparent border-none w-6">
                                    <ArrowSvg width={16} height={20} transform={isExpanded ? 'rotate(90)' : ''} />
                                </button>
                                <TreeItem element={item.element} />
                            </div>
                            {isExpanded && (
                                <div className="pl-6">
                                    {/* <div className="flex"> */}
                                    {/* <span className="p-px ml-10 mr-10 bg-black"></span> */}
                                    <TreeList items={item.children} />
                                </div>
                            )}
                        </li>
                    );
                }

                return (
                    <li className="flex items-start pl-6" key={item.id}>
                        {/* <span className="pr-10">|</span> */}
                        {/* <span className="p-px ml-2.5 mr-2.5 bg-black"></span> */}

                        <TreeItem element={item.element} />
                    </li>
                );
            })}
        </ul>
    );
};
