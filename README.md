# &lt;declarative-shadow-dom&gt;

> Custom Element to create Shadow DOM in a declarative manner

It's supposed to work closely to proposal given at [w3c/webcomponents/proposals/Declarative-Shadow-DOM](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Shadow-DOM.md)

## Demo

[Check it live!](http://tomalec.github.io/declarative-shadow-dom)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install declarative-shadow-dom --save
```

Or [download as ZIP](https://github.com/tomalec/declarative-shadow-dom/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/declarative-shadow-dom/declarative-shadow-dom.html">
    <!-- or if you are not using HTML Imports -->
    <script src="bower_components/declarative-shadow-dom/declarative-shadow-dom.html"></script>
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
- to stamp when element is created, not when connected - Unfortunately, CE does not allow us to get the reference to `.parentNode` in `constructor`.


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


## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/tomalec/declarative-shadow-dom/releases).

## License

MIT
