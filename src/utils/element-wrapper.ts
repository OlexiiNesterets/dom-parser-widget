export class ElementWrapper implements Wrapper {
    public wrap(element: HTMLElement): HTMLElement {
        if (element.parentElement?.dataset.parserWidget === 'true') {
            return element.parentElement;
        }
    
        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-parser-widget', 'true');
    
        element.insertAdjacentElement('beforebegin', wrapper);
        wrapper.appendChild(element);
    
        return wrapper;
    }

    public unwrap(element: HTMLElement): void {
        if (element.parentElement?.dataset.parserWidget !== 'true') {
            return;
        }
    
        const wrapper = element.parentElement;
    
        wrapper?.insertAdjacentElement('beforebegin', element);
        wrapper?.remove();
    }
}