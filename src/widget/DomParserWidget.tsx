"use client";

import React, { useEffect, useRef, useState } from "react";
import { ITreeItem } from "./types";
import { ReactComponent as EyeSvg } from '../assets/icons/eye.svg';
import { ReactComponent as CrossSvg } from '../assets/icons/cross.svg';
import { ReactComponent as ArrowSvg } from '../assets/icons/arrow.svg';
import Draggable from 'react-draggable';

import '../output.css';
import { useIsMobile } from "../hooks/useIsMobileScreen";
import { WidgetContex } from "./context/WidgetContex";
import { TreeList } from "./tree/TreeList";

import { v4 as uuidv4 } from 'uuid';

// import '../styles.css';

const getChildren = (elements: HTMLElement[], ignoreChildrenFrom?: HTMLElement | null): ITreeItem[] => {
    return elements.map(element => {

        const id = uuidv4();

        const ignoreChildren = element === ignoreChildrenFrom;

        if (!element.children.length || ignoreChildren) {
            return { element, id };
        }

        return {
            element,
            id,
            children: getChildren(
                Array.from(element.children) as HTMLElement[],
                ignoreChildrenFrom)
        };
    })
};

export const DomParserWidget = () => {

    const [domTree, setDomTree] = useState<ITreeItem[]>([]);
    const [showOnlyVisible, setShowOnlyVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [elementToIgnore, setElementToIgnore] = useState<HTMLElement | null>(null);
    const [isRemoved, setIsRemoved] = useState(false);

    const [displayOnTop, setDisplayOnTop] = useState(false);

    const elementRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();

    const hasDomTree = domTree.length > 0;

    useEffect(() => {
        console.log('ref = ', elementRef.current?.parentElement);
        setElementToIgnore(elementRef.current || null);
    }, []);

    if (isRemoved) {
        return null;
    }

    const handleClick = () => {
        const body = document.querySelector('body');

        if (!body) {
            return;
        }

        const ignoreChildrenFrom = elementToIgnore?.parentElement || null;

        const tree = getChildren([body], ignoreChildrenFrom);

        setDomTree(tree);
        setIsExpanded(true);
    };

    const handleModeChangeClick = () => {
        setShowOnlyVisible(val => !val);
    }

    const handleExpandClick = () => {
        if (!hasDomTree) {
            return;
        }

        setIsExpanded(val => !val);
        setDisplayOnTop(false);
    };

    const handlePositionChangeClick = () => {
        setDisplayOnTop(val => !val)
    }

    const handleClose = () => {
        setIsRemoved(true);
    }

    const list = (

        // TODO: padding right when horizonatal scroll ????

        <>
            {isExpanded && (
                <div className="p-4 overflow-auto flex-1 bg-violet-300">
                    <WidgetContex.Provider value={{ displayNonVisible: showOnlyVisible, elementToIgnore: elementToIgnore }}>
                        <TreeList items={domTree} />
                    </WidgetContex.Provider>
                </div>
            )}
        </>
    );

    const panelBorderRadiusClass = (!hasDomTree || !isExpanded) ? 'rounded-full' : '';

    const sharedControllButtons = (
        <>
            <button onClick={handleClick} className="h-7 bg-transparent border-none cursor-pointer hover:text-violet-800">
                <span className="font-bold">PARSE55</span>
            </button>
            <button onClick={handleModeChangeClick} className="bg-transparent border-none cursor-pointer hover:fill-violet-800">
                <EyeSvg width={28} height={28} fill={showOnlyVisible ? 'auto' : '#a78bfa'} />
            </button>
            <button
                onClick={handleExpandClick}
                disabled={!hasDomTree}
                className={`bg-transparent border-none cursor-pointer ${hasDomTree ? 'hover:fill-violet-800' : ''}`}>
                <ArrowSvg width={28} height={28} opacity={hasDomTree ? 1 : 0.2}
                    transform={isExpanded ? 'rotate(90)' : ''}
                />
            </button>
        </>);

    let content = null;

    if (isMobile) {

        const shouldDisplayOnTopClasses = displayOnTop ? 'bottom-auto top-0' : '';

        const classses = (hasDomTree && isExpanded) ?
            `fixed bottom-0 flex flex-col w-full h-1/3 ${shouldDisplayOnTopClasses}`
            : "fixed bottom-5 right-5";


        content = (
            <div className={classses} ref={elementRef}>
                {!hasDomTree && (
                    <div className={`flex items-center p-4 border-none bg-violet-600 text-white ${panelBorderRadiusClass}`}>
                        <div className="flex items-center mr-7 space-x-2">
                            {sharedControllButtons}
                            <button
                                onClick={handlePositionChangeClick}
                                disabled={!(hasDomTree && isExpanded)}
                                className="h-7 bg-transparent border-none cursor-pointer hover:text-violet-800">
                                <span className="font-bold">CHANGE POSITION</span>
                            </button>
                        </div>
                        <button onClick={handleClose} className="ml-auto bg-transparent border-none cursor-pointer hover:fill-violet-800">
                            <CrossSvg width={28} height={28} />
                        </button>
                    </div>
                )}

                {hasDomTree && (
                    <>
                        <div className={`flex items-center p-4 border-none bg-violet-600 text-white ${panelBorderRadiusClass} ${displayOnTop ? 'order-1' : ''}`}>
                            <div className="flex items-center mr-7 space-x-2">
                                {sharedControllButtons}
                                <button
                                    onClick={handlePositionChangeClick}
                                    disabled={!(hasDomTree && isExpanded)}
                                    className="h-7 bg-transparent border-none cursor-pointer hover:text-violet-800">
                                    <span className="font-bold">CHANGE POSITION</span>
                                </button>

                            </div>
                            <button onClick={handleClose} className="ml-auto bg-transparent border-none cursor-pointer hover:fill-violet-800">
                                <CrossSvg width={28} height={28} />
                            </button>
                        </div>
                        {list}
                    </>
                )}
            </div>
        );
    } else {

        content = (
            <Draggable nodeRef={elementRef}>
                <div className="inline-flex flex-col fixed top-5 right-5 max-w-96 max-h-[50%] cursor-grab" ref={elementRef}>
                    <div className={`flex items-center p-4 border-none bg-violet-600 text-white ${panelBorderRadiusClass}`}>
                        <div className="flex items-center mr-7 space-x-2">
                            {sharedControllButtons}
                        </div>
                        <button onClick={handleClose} className="ml-auto bg-transparent border-none cursor-pointer hover:fill-violet-800">
                            <CrossSvg width={28} height={28} />
                        </button>
                    </div>
                    {hasDomTree && (list)}
                </div>
            </Draggable>
        );
    }

    return (content);
};