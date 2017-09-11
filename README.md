# &lt;declarative-shadow-dom&gt;

> A bare minimum custom element starter-kit using [VanillaJS](http://vanilla-js.com/).
>
> Looking for a working example? Check [hello-world-element](https://github.com/webcomponents/hello-world-element).

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

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`disabled`    | *Boolean*   | `false`      | if set to true, the element will not stamp itself
`stamped`     | *Boolean*   |              | attribute that reflects whether the element is stamped or not, you can change it to stamp or clear the Shadow DOM

## Methods

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
`appendToParentsShadowRoot()`   | None.        | Nothing.    | Appends content to parent element's shadow root, create one if needed.

## Events

Event                            | Description
---                              | ---
`declarative-shadow-dom-stamped` | Triggers when Shadow DOM is stamped


## [Contributing and Development](CONTRIBUTING.md)

## History

For detailed changelog, check [Releases](https://github.com/tomalec/declarative-shadow-dom/releases).

## License

MIT
