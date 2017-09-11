function assertHasAttribute(name, value) {
    // check presence
    if (arguments.length === 1) {
        const has = this._obj.hasAttribute(name);
        this.assert(
            has,
            "expected #{this} to have attribute #{exp}",
            "expected #{this} to not have attribute #{exp}",
            name
        );
    } else { // check value
        const act = this._obj.getAttribute(name);
        this.assert(
            act === value,
            "expected #{this} to have attribute " + name + "=#{exp} but got #{act}",
            "expected #{this} to not have attribute " + name + "=#{act}",
            value,
            act
        );
    }

    chai.util.flag(this, 'object', this._obj.getAttribute(name));
}

chai.Assertion.addMethod('HTMLAttribute', assertHasAttribute);


// TODO: cover negation
chai.Assertion.addMethod('stampedToParentsShadowDOM', function isStampedDSD(eventSpy) {
    const dsd = this._obj;
    // make sure we are working with a HTMLElement
    expect(dsd).to.be.instanceOf(HTMLElement);
    // make sure we are working with a dsd
    expect(dsd).to.be.instanceOf(HTMLTemplateElement);
    expect(dsd).to.have.HTMLAttribute('is', 'declarative-shadow-dom');
    // make sure it has parent
    expect(dsd).to.have.property('parentElement');
    // check if it stamped
    const host = dsd.parentElement;
    const negate = chai.util.flag(this, 'negate');
    if(!negate){

        expect(host).to.have.property('shadowRoot');
        expect(host.shadowRoot).to.be.not.null;
        expect(host.shadowRoot).to.be.an.instanceof(DocumentFragment);
        this.assert(
            host.shadowRoot.innerHTML === dsd.innerHTML,
            "expected #{this} content to equal parent's shadowRoot"
        );
        expect(dsd).to.have.HTMLAttribute('stamped');
        if(eventSpy){
            expect(eventSpy).to.be.calledOnce;
            expect(eventSpy.getCall(0).args[0]).to.be.have.property('detail');
            expect(eventSpy.getCall(0).args[0].detail).to.be.have.property('stampedNodes');

            expect(eventSpy.getCall(0).args[0].detail.stampedNodes).to.be.an.instanceof(Array);
        }
    } else {
        if(host.shadowRoot){
            this.assert(
                host.shadowRoot.innerHTML !== dsd.innerHTML,
                "expected #{this} content to not equal parent's shadowRoot"
            );
        }
        expect(dsd).not.to.have.HTMLAttribute('stamped');
        if(eventSpy){
            expect(eventSpy).not.to.be.called;
        }
    }

});
