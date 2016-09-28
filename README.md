# duet-document-title

Get or set `document.title` from a [duet](https://github.com/colingourlay/duet) app.

```
$ npm install duet-document-title
```

## Usage

```javascript
var duet     = require('duet');
var channel  = require('duet-document-title/channel');
var docTitle = require('duet-document-title');

duet([channel], function () {
    docTitle('The Title');
    docTitle(function (title) {
        console.log(title);
        // > 'The Title'
    });
});
```

## API

### `docTitle(callback: Function)`

Get the current value of `document.title`. The callback will be called with the title as the first argument.


### `docTitle(title: String [, callback: Function])`

Set `document.title`. The optional callback will be called once it has been set.
