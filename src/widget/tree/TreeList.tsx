import React, { useState } from 'react';
import { ITreeItem, ITreeItems, Strategies } from '../types';
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow.svg';
import { ReactComponent as EyeSvg } from '../../assets/icons/eye.svg';
import { ElementHighlighter } from '../../utils/element-highlighter';
import { ElementWrapper } from '../../utils/element-wrapper';

export const TreeList = ({ items, strategies }: ITreeItems) => {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="m-0 p-0 list-none">
      {items.map((item) => {
        if (!strategies.visibilityStrategy(item)) {
          return null;
        }

        if (item.children?.length) {
          return (
            <li className="flex flex-col items-start" key={item.id}>
              <ExpandableTreeItem item={item} strategies={strategies} />
            </li>
          );
        }

        return (
          <li className="flex items-start pl-6" key={item.id}>
            <TreeItem item={item} strategies={strategies} />
          </li>
        );
      })}
    </ul>
  );
};

function ExpandableTreeItem({
  item,
  strategies,
}: {
  item: ITreeItem;
  strategies: Strategies<ITreeItem>;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleClick = () => setIsExpanded((val) => !val);

  return (
    <>
      <div className="inline-flex">
        <button
          name="expand-button"
          onClick={handleClick}
          className="p-0 bg-transparent border-none w-6"
        >
          <ArrowSvg
            className="hover:fill-violet-500"
            width={16}
            height={20}
            transform={isExpanded ? 'rotate(90)' : ''}
          />
        </button>
        <TreeItem item={item} strategies={strategies} />
      </div>

      {isExpanded && (
        <div className="pl-6">
          <TreeList
            items={item.children as ITreeItem[]}
            strategies={strategies}
          />
        </div>
      )}
    </>
  );
}

function TreeItem({
  item,
  strategies,
}: {
  item: ITreeItem;
  strategies: Strategies<ITreeItem>;
}) {
  const elementHighlighter = new ElementHighlighter(new ElementWrapper());

  const handleClick = () => {
    strategies?.scrollStrategy(item);
    elementHighlighter.highlight(item.element);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!item.isVisible}
      className={`bg-transparent border-none hover:enabled:text-violet-500`}
    >
      <span className="inline-flex content-center">
        <span>{item.element.tagName.toLowerCase()}</span>
        {!item.isVisible && (
          <span className="ml-1">
            <EyeSvg height={15} width={15} opacity={0.2} />
          </span>
        )}
      </span>
    </button>
  );
}
