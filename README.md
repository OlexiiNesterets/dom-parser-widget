# dom-parser-widget

A widget for React projects that allows you to get a visual representation of the elements of the DOM tree and navigate through them

## How to use

Install using npm

- `npm i dom-parser-widget`

Now you can use it in your React project by using import like this

```
import { DomParserWidget } from 'dom-parser-widget';
...
```
Now you can use it in your app.

You can see a representation of the visible DOM tree when you click on the "Parse" button (the widget itself will not be taken into account). When you click on a tree element in the widget, the corresponding element on the page will be temporarily highlighted and the page will be scrolled to it.

It is also possible to include elements that are not visually visible in the DOM tree. To do so, you need to press the key with the "eye" icon. Nothing happens on the page when you click on these elements.

When you press the close ("X") key, the widget will be removed from the DOM tree.

On devices with a screen width of more than 768px, the widget will look like a modal window that can be moved using the mouse.
On devices with a screen width smaller than 786px - the widget will look like a bottom sheet, the position of which can be changed from bottom to top using the corresponding button (only available on screens smaller than 786px)