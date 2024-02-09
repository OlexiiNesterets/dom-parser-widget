import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as EyeSvg } from '../assets/icons/eye.svg';
import { ReactComponent as CrossSvg } from '../assets/icons/cross.svg';
import { ReactComponent as ArrowSvg } from '../assets/icons/arrow.svg';
import { useIsMobile } from "../hooks/useIsMobileScreen";
import { TreeList } from "./tree/TreeList";
import { v4 as uuidv4 } from 'uuid';
import { ITreeItem } from "./types";
import Draggable from 'react-draggable';
import '../styles.css';

const getChildren = (elements: HTMLElement[], ignoreElement?: HTMLElement | null): ITreeItem[] => {
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

        const tree = getChildren([body], elementToIgnore);

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

    const panelBorderRadiusClass = (!hasDomTree || !isExpanded) ? 'rounded-full' : '';

    const list = (
        <>
            {isExpanded && (
                <div className="p-4 overflow-auto flex-1 bg-violet-300">
                    <TreeList items={domTree} showNonVisible={showOnlyVisible} displayOnTop={(displayOnTop && isMobile)} />
                </div>
            )}
        </>
    );

    const sharedControllButtons = (
        <>
            <button onClick={handleClick} className="h-7 bg-transparent border-none cursor-pointer hover:text-violet-800">
                <span className="font-bold">PARSE</span>
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

        const mobileClassses = (hasDomTree && isExpanded) ?
            `fixed z-[9999] bottom-0 flex flex-col w-full h-1/3 ${shouldDisplayOnTopClasses}`
            : "fixed z-[9999] bottom-5 min-[400px]:right-5 max-[400px]:w-full";


        content = (
            <div className={mobileClassses} ref={elementRef}>
                {!hasDomTree && (
                    <div className={
                        `flex items-center p-4 border-none bg-violet-600 text-white 
                        max-[400px]:px-0.5 max-[400px]:rounded-none ${panelBorderRadiusClass}`}>
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
                        <div className={
                            `flex items-center p-4 border-none bg-violet-600 text-white 
                            max-[400px]:px-0.5 max-[400px]:rounded-none ${panelBorderRadiusClass} ${displayOnTop ? 'order-1' : ''}`}>
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
                <div  ref={elementRef} className="inline-flex flex-col fixed z-[9999] top-5 right-5 max-w-md max-h-[50%] cursor-grab">
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