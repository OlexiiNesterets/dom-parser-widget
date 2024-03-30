import React from "react";
import { createRoot } from "react-dom/client";
import { DomParserWidget } from './widget/DomParserWidget';
import './styles.css'

export const init = (id: string) => {

    if (!id) {
        throw Error('id is not provided dude');
    }

    const root = createRoot(document.getElementById(id) as HTMLElement);

    root.render(<DomParserWidget />);
};


// const root = createRoot(document.querySelector('body') as HTMLElement);

// root.render(<DomParserWidget />);