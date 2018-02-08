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
        const mode = this.getAttribute('mode');
        let shadowRoot = parentElement.shadowRoot;
        if(mode!=='open' && mode !=='closed'){
            return;
        }
        if(!parentElement){
            throw 'declarative-shadow-dom needs a perentElement to stamp to';
        }
        if(!shadowRoot){
            shadowRoot = parentElement.attachShadow({mode: mode});
            let fragment = document.importNode(this.content, true);
            this.stampedNodes = Array.prototype.slice.call(fragment.childNodes);
            shadowRoot.appendChild(fragment);
            // Support Shady CSS polyfill
            typeof ShadyCSS !== 'undefined' && ShadyCSS.styleElement(parentElement);
            parentElement.dispatchEvent(new CustomEvent('declarative-shadow-dom-stamped', {detail: {stampedNodes: this.stampedNodes}}));
        }
        this.parentNode.removeChild(this);
    }
}, {
    extends: 'template'
});
