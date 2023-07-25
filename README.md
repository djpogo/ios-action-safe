# IOS Action Safe

Utilize CSS Custom Properties to style your overlay components with binding to window.innerHeight.

With version `0.2.0` the "new" [relative length units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#relative_length_units) like `svh` and `dvh` etc. are also available as Custom Properties.

## How it works

It adds an `aside` element into the dom with `100vw` and `100vh` dimensions and read out its width and height in `px`.

On every resize event, the `window.innerWidth` and `window.innerHeight` are gathered and updated into your [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).

By using the Custom Properties in your overlay/flyout/modal css, your element will always fit in the viewport, without the ios bottom bar come in your way.

## Default Custom Properties

You can change any of this options to your needs, by providing a customOption Object in constructor call.

### --visibleHeight

stores always the value of `window.innerHeight`  suffixed with `px`. 

### --visibleWidth

stores always the value of `window.innerHeight` suffixed with `px`.

### --visiblePadding

stores the difference from  a `100vh` element and `window.innerHeight` suffixed with `px`.

### --svw

`Version 0.2.0`: The current value of `100svw`.

### --svh

`Version 0.2.0`: The current value of `100svh`.

### --dvw

`Version 0.2.0`: The current value of `100dvw`.

### --dvh

`Version 0.2.0`: The current value of `100dvh`.

### --lvw

`Version 0.2.0`: The current value of `100lvw`.

### --lvh

`Version 0.2.0`: The current value of `100lvh`.

## Setup

Grab your copy of this package:

`npm i ios-action-safe --save`

Import this package in your project:

**ES-6**
`import IosActionSafe from 'ios-action-safe';`
…
`new IosActionSafe(<{customOptions}>);`

**ES-5**
You'll find a minified and unminified version in the dist/-folder, to embed in your project:
`<script src="/vendor/ios-action-safe.min.js" defer></script>`

same way as with the ES-6 class:
`new IosActionSage(<{customOptions}>);`

## Configuration

For a working example have a look into the [index.html](./index.html) in this package.

The key configuration is, to add the following CSS to elements who needs to fit into the viewport:

```css
.modal,
.flyout,
.overlay,
.mobile-nav {
    …
    height: 100vh; /* ie11 */
    height: var(--visibleHeight);
    ..
    padding-bottom: 0; /* ie11 */
    padding-bottom: var(--visiblePadding);
}
```

You might want to setup only **height** or **padding-bottom**. In combination you will end up with a bottom bar height visible padding on your element.

### customise custom property names

By calling the constructor, you can provide an object with overrides for every custom property name:

```js
new IosActionSafe({
    visibleHeight: '--visibleHeight',
    visibleWidth: '--visibleWidth',
    visiblePadding: '--visiblePadding',
});
```

### callback

On every resize and measuring event, you can add a `callback` function too, which will give you all the numbers **without** `px`:

```json
{
    "viewportHeight": this.viewportHeight,
    "viewportWidth": this.viewportWidth,
    "visibleHeight": this.visibleHeight,
    "visibleWidth": this.visibleWidth,
    "visiblePadding": this.viewportHeight - visibleHeight
}
```

to add a callback, add the callback option to the constructor call:

```js
new IosActionsSafe({
    callback: (event, data) => { console.log(event, data); },
});
```

or

```js
new IosActionsSafe({
    visibleHeight: '--visibleHeight',
    visibleWidth: '--visibleWidth',
    visiblePadding: '--visiblePadding',
    callback: updateSizes
});
…
function updateSizes(event, data) {
    …
}
```

or in ES-6:
```js
new IosActionsSafe({
    visibleHeight: '--visibleHeight',
    visibleWidth: '--visibleWidth',
    visiblePadding: '--visiblePadding',
    callback: (event, data) => { this.updateSizes(event, data); }),
});

## side fx

this package will add an `<aside>` after your `<body>` element. Do not wonder about it, this is used to measure 100vh and 100vw.

## Package Name

In video editing you have three different viewports, the native resolution (for exmaple 1920x1080) but tv's cut parts of this resolution away, or parts of the signal where used for teletext, and so there is a **action safe** and **title safe** setting, you can enable in every video editing software, to keep your content visible to any recipient. That's where the name for this package comes from.
