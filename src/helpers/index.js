import { css } from 'styled-components';
import getValue from 'get-value';
import { media } from './breakpoints';
import { breakpoints, defaultGrid } from './defaultValue';

const isNaN = (value) => {
  const n = Number(value);
  const nSelf = n;
  return nSelf !== n;
};

const getHalfMeasure = (measure) => {
  if (!measure) {
    return '';
  }
  const match = measure.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  if (!match) {
    return '';
  }
  return Number(match[1]) === 0 ? '0' : `${match[1] / 2}${match[2]}`;
};

const percentage = (value) => {
  if (isNaN(value)) {
    return '';
  }
  return `${value * 100}%`;
};

const getGridSetting = (props) => {
  // custom grid setting
  let customGrid = {};
  Object.keys(defaultGrid).forEach(prop => {
    if (props[prop]) customGrid[prop] = props[prop];
  });
  // theme grid setting
  const themeGrid = getValue(props, 'theme.grid', { default: {} });
  // combine all grid settings
  return {...defaultGrid, ...themeGrid, ...customGrid};
};

const getCssStyle = (styles, gridSetting, breakpointKey) =>
  styles.map(style => {
    let isFunc = typeof style === 'function';
    if (!isFunc) return style;
    return style(gridSetting, breakpointKey);
  });

// get css style with different breakpoints
const getCssWithMedia = (props, styles) => {
  const gridSetting = getGridSetting(props);
  return Object.keys(breakpoints).map((breakpoint, key) => {
    const cssStyle = getCssStyle(styles, gridSetting, key);
    return css`
      /* desktop-first */
      ${breakpoint !== 'desktop' ? `${media[breakpoint]} {` : ''};
      ${cssStyle}
      ${breakpoint !== 'desktop' ? '}' : ''};
    `
  });
};

export { isNaN, getHalfMeasure, percentage, getCssWithMedia };
