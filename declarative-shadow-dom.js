/*
    `declarative-shadow-dom` -
    Custom Element to create Shadow DOM in a declarative manner
    version: 0.1.0
*/
customElements.define('declarative-shadow-dom', class extends HTMLTemplateElement {
    static get observedAttributes() {
        return [];
    }

    constructor(self) {
        // assignment required by polyfill
        self = super(self);
    }
    connectedCallback(){
        if( !this.parentElement ){
            return;
        }
        // Append the content once available.
        if(this.content && this.content.childNodes.length){
            this.appendToParentsShadowRoot();
        } else {
            // Shim on tagEndCallback = connectedWithContentCallback.
            //  MO fires sooner than `setTimeout(*, 0)`,
            //  but will not fire if there is no node after this one.
            //  Microtask (`Promise.resolve`) is too soon.
            const timeout = new Promise(resolve => setTimeout(resolve, 0));
            const nextMutation = new Promise((resolve) => {
                const observer = new MutationObserver(() => {
                    resolve();
                    observer.disconnect();
                });
                observer.observe(this.parentElement, {childList: true, subtree: true});
                // Allow disconnecting observer after disconnection.
                this._observer = observer;
            });

            Promise.race([timeout, nextMutation]).then(()=> {
                this.appendToParentsShadowRoot()
            });
        }
    }
    disconectedCallback(){
        this._observer.disconnect();
    }
    appendToParentsShadowRoot(){
        if(this.content === null || this.isConnected === false){
            return;
        }
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
