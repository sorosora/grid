const fullWidth = '100vw';
const wrapperGridWidth = '1200px';
const gridGutter = '32px';
const gridVerticalGutter = '0';
const wrapperPadding = '16px';
const breakpoints = {
  desktop: '1200px',
  tablet: '768px',
  phone: '0px',
};
const viewport = {
  width: 1920,
  isIE: false,
};
const defaultGrid = {
  padding: [wrapperPadding],
  gutter: [gridGutter],
  verticalGutter: [gridVerticalGutter],
  gridWidth: [wrapperGridWidth],
};

export { fullWidth, wrapperGridWidth, gridGutter, wrapperPadding, breakpoints, viewport, defaultGrid };
