import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { ReactComponent as EyeSvg } from '../assets/icons/eye.svg';
import { ReactComponent as CrossSvg } from '../assets/icons/cross.svg';
import { ReactComponent as ArrowSvg } from '../assets/icons/arrow.svg';
import { TreeList } from './tree/TreeList';
import Draggable from 'react-draggable';
import '../styles.css';
import { useControl } from './hooks/useControl.hook';

export const DomParserWidget = () => {
  const {
    domTree,
    isRemoved,
    isExpanded,
    isMobile,
    isTopPosition,
    onlyVisible,
    elementRef,
    handleParse,
    handleClose,
    handleExpand,
    handleModeChange,
    handlePositionChange,
  } = useControl();

  if (isRemoved) {
    return null;
  }

  const hasDomTree = domTree.length > 0;

  const list = (
    <>
      {hasDomTree && isExpanded && (
        <div className="p-4 overflow-auto flex-1 bg-violet-300">
          <TreeList
            items={domTree}
            showNonVisible={onlyVisible}
            displayOnTop={isTopPosition && isMobile}
          />
        </div>
      )}
    </>
  );

  const sharedControllButtons = (
    <>
      <button
        onClick={handleParse}
        className="h-7 bg-transparent border-none cursor-pointer hover:text-violet-800"
      >
        <span className="font-bold">PARSE</span>
      </button>
      <button
        onClick={handleModeChange}
        className="bg-transparent border-none cursor-pointer hover:fill-violet-800"
      >
        <EyeSvg
          width={28}
          height={28}
          fill={onlyVisible ? 'auto' : '#a78bfa'}
        />
      </button>
      <button
        onClick={handleExpand}
        disabled={!hasDomTree}
        className={`bg-transparent border-none cursor-pointer ${
          hasDomTree ? 'hover:fill-violet-800' : ''
        }`}
      >
        <ArrowSvg
          width={28}
          height={28}
          opacity={hasDomTree ? 1 : 0.2}
          transform={isExpanded ? 'rotate(90)' : ''}
        />
      </button>
    </>
  );

  if (isMobile) {
    return (
      <div
        className={getMobileClasses(isExpanded, isTopPosition)}
        ref={elementRef}
      >
        <CommonLayout
          onClose={handleClose}
          buttons={
            <>
              {sharedControllButtons}
              <button
                onClick={handlePositionChange}
                disabled={!isExpanded}
                className="h-7 bg-transparent border-none cursor-pointer hover:text-violet-800"
              >
                <span className="font-bold">CHANGE POSITION</span>
              </button>
            </>
          }
          classesOptions={{
            isExpanded,
            isTopPosition,
          }}
        >
          {list}
        </CommonLayout>
      </div>
    );
  }

  return (
    <Draggable nodeRef={elementRef}>
      <div
        ref={elementRef}
        className="inline-flex flex-col fixed z-[9999] top-5 right-5 max-w-md max-h-[50%] cursor-grab"
      >
        <CommonLayout
          classesOptions={{
            isExpanded,
          }}
          onClose={handleClose}
          buttons={sharedControllButtons}
        >
          {list}
        </CommonLayout>
      </div>
    </Draggable>
  );
};

function CommonLayout({
  buttons,
  children,
  onClose,
  classesOptions = { isExpanded: false, isTopPosition: false },
}: ILayout) {
  return (
    <>
      <ContentPanel classesOptions={classesOptions}>
        <div className="flex items-center mr-7 space-x-2">{buttons}</div>
        <CloseButton onClick={onClose} />
      </ContentPanel>
      {children}
    </>
  );
}

function ContentPanel({
  children,
  classesOptions = { isExpanded: false, isTopPosition: false },
}: IContentPanel) {
  let classes = `
        flex items-center p-4 border-none bg-violet-600 text-white 
        max-[400px]:px-0.5 
        max-[400px]:rounded-none`;

  if (!classesOptions.isExpanded) {
    classes += ' rounded-full';
  }

  if (classesOptions.isTopPosition) {
    classes += ' order-1';
  }

  return <div className={classes}>{children}</div>;
}

function CloseButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      name="close"
      className="ml-auto bg-transparent border-none cursor-pointer hover:fill-violet-800"
    >
      <CrossSvg width={28} height={28} />
    </button>
  );
}

function getMobileClasses(isExpanded: boolean, isTopPosition: boolean) {
  if (!isExpanded) {
    return 'fixed z-[9999] bottom-5 min-[400px]:right-5 max-[400px]:w-full';
  }

  let classes = 'fixed z-[9999] bottom-0 flex flex-col w-full h-1/3';

  if (isTopPosition) {
    classes += ' bottom-auto top-0';
  }

  return classes;
}

interface ILayout {
  classesOptions?: IStyleOptions;
  buttons: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

interface IContentPanel {
  children: ReactNode;
  classesOptions?: IStyleOptions;
}

interface IStyleOptions {
  isTopPosition?: boolean;
  isExpanded?: boolean;
}
