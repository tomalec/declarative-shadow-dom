customElements.define('declarative-shadow-dom', class extends HTMLTemplateElement {
    static get observedAttributes() {
        return [];
    }

    constructor(self) {
        // assignment required by polyfill
        self = super(self);
    }
    connectedCallback(){
        this.appendToParentsShadowRoot();
    }
    appendToParentsShadowRoot(){
        const parentElement = this.parentElement;
        if(!parentElement){
            throw 'declarative-shadow-dom needs a perentElement to stamp to';
        }
        if(!parentElement.shadowRoot){
            parentElement.attachShadow({mode: 'open'});
        }
        let fragment = document.importNode(this.content, true);
        this.stampedNodes = Array.prototype.slice.call(fragment.childNodes);
        parentElement.shadowRoot.appendChild(fragment);
        // debugger
        ShadyCSS && ShadyCSS.styleElement(parentElement);
        parentElement.dispatchEvent(new CustomEvent('declarative-shadow-dom-stamped', {detail: {stampedNodes: this.stampedNodes}}));
        this.parentNode.removeChild(this);
    }
}, {
    extends: 'template'
});
