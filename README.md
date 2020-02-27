# use-best-color 🎨‍

A [React Hook](https://reactjs.org/docs/hooks-intro.html) to use the most accessible text color

## Installation

```
$ npm i use-best-color
```

## Usage

The `useBestColor` hook returns a tuple with two values:
- A ref to be passed to the relevant DOM element
- A `bestColor` object containing:
  - A `color` value, ready to be used in a style
  - A `score` value, computed using the [WCAG 2.0 guidelines for contrast accessibility](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)

By default, `useBestColor` will choose between white (#FFFFFF) and black (#000000)

```JavaScript
import React from 'react';
import useBestColor from 'use-best-color';

function SimpleExample() {
  const [ref, bestColor] = useBestColor();

  return (
    <div>
      <button ref={ref} style={{ color: bestColor.color }}>
        Click Me!
      </button>
    </div>
  );
}
```

Alternatively, you can pass `useBestColor` an array of custom colors to choose from
Both RGB and Hex format work, and the `bestColor.color` value will be returned in the same format it was provided

```JavaScript
import React from 'react';
import useBestColor from 'use-best-color';

function CustomExample() {
  const [ref, bestColor] = useBestColor(['#CCCCCC', '#8C8C8C','#4D4D4D']);

  return (
    <div>
      <button ref={ref} style={{ color: bestColor.color }}>
        Click Me!
      </button>
    </div>
  );
}
```
