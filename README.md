# &lt;declarative-shadow-dom&gt;

> Custom Element to create Shadow DOM in a declarative manner

It's supposed to work closely with the proposal given at [w3c/webcomponents/proposals/Declarative-Shadow-DOM](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Shadow-DOM.md)

## Demo

[Check it live!](http://tomalec.github.io/declarative-shadow-dom)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install declarative-shadow-dom --save
```

Or [download as ZIP](https://github.com/tomalec/declarative-shadow-dom/archive/master.zip).

## Usage

1. Import custom elements builtin extends polyfill if needed

    ```html
    <script src="//unpkg.com/@ungap/custom-elements-builtin"></script>
    ```

2. Import custom element:

    ```js
    import 'declarative-shadow-dom';
    ```
    ```html
    <script src="node_modules/declarative-shadow-dom/declarative-shadow-dom.js"></script>
    ```

3. Start using it!

    ```html
    <anyelement>
        <template is="declarative-shadow-dom" mode="open">
            Shadow Content here
            <slot></slot>
        </template>
        Light DOM content here
    </anyelement>
    ```

## How it works:

When it's `connected` or `appendToParentsShadowRoot` is called it "stamps" - appends it create shadow root in its parent node and appends its content there, then removes itself from the parent node.

## How I would like it to work
- Ha! Work natively, without any JavaScript,
- to stamp only when created declaratively (parsing, `.innerHTML`),
- do nothing when created imperatively,
- to stamp when the element is created, not when connected - Unfortunately, CE does not allow us to get the reference to `.parentNode` in `constructor`.


## Speced behavior

See the [Declarative-Shadow-DOM spec proposal](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Shadow-DOM.md) and the [test suite of this element](https://tomalec.github.io/declarative-shadow-dom/test/)


## Options

Attribute     | Options         | Default      | Description
---           | ---             | ---          | ---
mode          | 'open','closed' | *required*   | mode of the shadow root to create

## Methods

Method                        | Parameters   | Returns     | Description
---                           | ---          | ---         | ---
`appendToParentsShadowRoot()` | None         | Nothing     | Appends content to parent element's shadow root.

## Events

Event                            | Description
---                              | ---
`declarative-shadow-dom-stamped` | Fired on a parent/host when Shadow DOM is stamped

## Caveats

With native customized builtins, the CE reactions may be called before template's `.content` is available.
In such cases, the element waits for `setTimeout(*, 0)` so your content would be stamped slightly asynchronously, or
for the next parent mutation. Therefore, if you would like to make sure your shadow DOM available synchronously, add any node after `<template is="declarative-shadow-dom">…</template><!-- -->`.

## [Contributing and Development](CONTRIBUTING.md)

## History

For a detailed changelog, check [Releases](https://github.com/tomalec/declarative-shadow-dom/releases).

## License

MIT
