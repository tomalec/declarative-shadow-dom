# &lt;declarative-shadow-dom&gt;

> Custom Element to create Shadow DOM in a declarative manner

It's supposed to work closely to proposal given at https://github.com/whatwg/dom/issues/510

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
    ```

3. Start using it!

    ```html
    <anyelement>
        <template is="declarative-shadow-dom">
            Shadow Content here
            <slot></slot>
        </template>
        Light DOM content here
    </anyelement>
    ```

## How it works:

When it's `connected` or `appendToParentsShadowRoot` is called it "stamps" - appends it's content to the parents Shadow Root (creates one if needed), then removes itself from the parentNode.

## How we would like it to work

To "stamp" only when created within a parent already (parsing, `.innerHTML = "<template is="declarative-shadow-dom">...`). Then do nothing or even throw an error if it's being added imperatively somewhere.

Unfortunately, autonomous built-ins & CE polyfill does not allow us to get the reference to `.parentNode` in `constructor`.


## Options

Attribute     | Options         | Default      | Description
---           | ---             | ---          | ---
mode          | 'open','closed' | *required*   | mode of the shadow root to create

## Methods

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
`appendToParentsShadowRoot()`   | None.        | Nothing.    | Appends content to parent element's shadow root, create one if needed.

## Events

Event                            | Description
---                              | ---
`declarative-shadow-dom-stamped` | Fired on a parent/host when Shadow DOM is stamped


## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/tomalec/declarative-shadow-dom/releases).

## License

MIT
