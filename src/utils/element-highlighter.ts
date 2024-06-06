
export class ElementHighlighter {

    #timerId: ReturnType<typeof setTimeout>;
    #elementWrapper: Wrapper;

    constructor(elementWrapper: Wrapper) {
        this.#elementWrapper = elementWrapper;
    }

    public highlight(el: HTMLElement): void {
        clearTimeout(this.#timerId);

        const wrapper = this.#elementWrapper.wrap(el);

        wrapper.style.background = '#d990008f';
        wrapper.style.display = 'inline-block';
        wrapper.style.outline = '3px solid #d99000';
        wrapper.style.boxShadow = '#d99000 0px 0px 15px !important';

        this.#timerId = setTimeout(() => {
            this.#elementWrapper.unwrap(el);
        }, 2000);
    }
}
