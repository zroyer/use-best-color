import {useLayoutEffect, useRef, useState} from 'react';

const DEFAULT_WHITE = 'rgb(255, 255, 255)';
const DEFAULT_BLACK = 'rgb(0, 0, 0)';

export default function useBestColor(customChoices) {
  const ref = useRef();
  const [color, setColor] = useState({});

  useLayoutEffect(() => {
    const backgroundRgb = window.getComputedStyle(ref.current).getPropertyValue('background-color');
    const packagedChoices = packageChoices(customChoices);
    const bestColor = getBestColor(packagedChoices, backgroundRgb);
    setColor(bestColor);
  }, []);

  return [ref, color];
}

function getBestColor(packagedChoices, backgroundRgb) {
  let bestColor = {};
  const backgroundRL = relativeLuminance(rbgStringToArray(backgroundRgb));
  packagedChoices.forEach(choice => {

    const choiceRL = relativeLuminance(choice.rgbArray);
    const choiceScore = luminanceScore(choiceRL, backgroundRL);
    console.log(choice)
    console.log(choiceScore)
    if (!bestColor.hasOwnProperty('score') || choiceScore > bestColor.score) {
      bestColor = {
        color: choice.original,
        score: choiceScore
      };
    }
  });

  return bestColor;
}

function packageChoices(customChoices) {
  const choices = Array.isArray(customChoices) ? customChoices : [DEFAULT_WHITE, DEFAULT_BLACK];
  return choices.map(choice => {
    return {
      original: choice,
      rgbArray: choice.substring(0, 3) === 'rgb'
        ? rbgStringToArray(choice)
        : hexStrToRgbArray(choice)
    };
  });
}


function relativeLuminance(rgbArray) {
  const rsrgb = rgbArray[0] / 255;
  const gsrgb = rgbArray[1] / 255;
  const bsrgb = rgbArray[2] / 255;

  const r = rsrgb <= 0.03928 ? rsrgb / 12.92 : adjustGamma(rsrgb);
  const g = gsrgb <= 0.03928 ? gsrgb / 12.92 : adjustGamma(gsrgb);
  const b = bsrgb <= 0.03928 ? bsrgb / 12.92 : adjustGamma(bsrgb);

  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

function adjustGamma(value) {
  return Math.pow((value + 0.055) / 1.055, 2.4);
}

function luminanceScore(i, j) {
  return (Math.max(i, j) + 0.05) / (Math.min(i, j) + 0.05);
}

function rbgStringToArray(rgbString) {
  return rgbString.replace(/[^\d,]/g, '').split(',').map(value => parseInt(value, 10));
}

function hexStrToRgbArray(hexStr) {
  var hex = parseInt(hexStr.substring(1), 16);
  var r = (hex & 0xff0000) >> 16;
  var g = (hex & 0x00ff00) >> 8;
  var b = hex & 0x0000ff;
  return [r, g, b];
}
