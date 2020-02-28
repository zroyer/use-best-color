# use-best-color 🎨‍

[![npm](https://img.shields.io/npm/v/use-best-color.svg)](https://www.npmjs.com/package/use-best-color)
[![npm bundle size](https://img.shields.io/bundlephobia/min/use-best-color.svg)](https://www.npmjs.com/package/use-best-color)
[![npm](https://img.shields.io/npm/dt/use-best-color.svg)](https://www.npmjs.com/package/use-best-color)
[![GitHub](https://img.shields.io/github/license/zroyer/use-best-color.svg)](https://github.com/zroyer/use-best-color/blob/master/LICENSE)
[![GitHub](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/zroyer/use-best-color/pulls)

A [React Hook](https://reactjs.org/docs/hooks-intro.html) to use the most [accessible](http://web-accessibility.carnegiemuseums.org/design/color/) text color. Compares a list of text color choices against an element's background color, and returns the color with the highest color contrast ratio.

> WCAG (Web Content Accessibility Guidelines) ensure that content is accessible by everyone, regardless of disability or user device. To meet these standards, text and interactive elements should have a color contrast ratio of at least 4.5:1. This ensures that viewers who cannot see the full color spectrum are able to read the text.


## Installation

```
$ npm i use-best-color
```

## Usage

The `useBestColor` hook returns a tuple with two values:
- A ref object to be passed to a DOM element
  - This element's background color will be used in the color contrast ratio calculation
- A `bestColor` object containing:
  - A `color` value, ready to be used in a style
  - A `score` value representing the color contrast ratio between the text color and the background color, computed using the [WCAG 2.0 guidelines for contrast accessibility](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)

- By default, `useBestColor` will choose between white `rgb(255, 255, 255)` and black `rgb(0, 0, 0)`

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

- Alternatively, you can pass `useBestColor` an array of custom colors to choose from
- Both RGB and Hex format are acceptable, and the `bestColor.color` value will be returned in the same format it was provided

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
