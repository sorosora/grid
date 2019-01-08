import React from 'react';
import styled, { css } from 'styled-components';
import { media } from '../helpers/breakpoints';
import withViewport from '../helpers/withViewport';
import { getHalfMeasure } from '../helpers';
import { fullWidth } from '../helpers/defaultValue';

const fullWidthWrapperStyle = css`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: ${({ ie, viewport }) => (ie && viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure(`-${fullWidth}`))};
  margin-right: ${({ ie, viewport }) => (ie && viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure(`-${fullWidth}`))};
  width: ${({ ie, viewport }) => (ie && viewport.isIE ? `${viewport.width}px` : fullWidth)};
  overflow: hidden;
`;

const fullWidthReset = css`
  left: auto;
  right: auto;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
`;

const checkReset = (desktop, tablet, phone) => {
  if (typeof tablet === 'undefined' && typeof phone === 'undefined') {
    return '';
  }
  if (typeof phone === 'undefined') {
    return desktop && !tablet ? fullWidthReset : '';
  }
  return (desktop || tablet) && !phone ? fullWidthReset : '';
};

const checkFull = (desktop, tablet, phone) => {
  if (typeof tablet === 'undefined' && typeof phone === 'undefined') {
    return '';
  }
  if (typeof phone === 'undefined') {
    return !desktop && tablet ? fullWidthWrapperStyle : '';
  }
  return (!desktop || !tablet) && phone ? fullWidthWrapperStyle : '';
};

const Component = styled.div`
  ${({ enabled: [desktop = true] = [] }) => (desktop ? fullWidthWrapperStyle : '')};
  
  ${media.tablet} {
    ${({ enabled: [desktop = true, tablet] = [] }) => checkReset(desktop, tablet)};
    ${({ enabled: [desktop = true, tablet] = [] }) => checkFull(desktop, tablet)};
  }
  
  ${media.phone} {
    ${({ enabled: [desktop = true, tablet, phone] = [] }) => checkReset(desktop, tablet, phone)};
    ${({ enabled: [desktop = true, tablet, phone] = [] }) => checkFull(desktop, tablet, phone)};
  }
`;

const FullWidthWrapper = styled((props) => {
  const { ie } = props;
  if (ie) {
    const WithViewport = withViewport(Component);
    return <WithViewport {...props} />;
  }
  return <Component {...props} />;
})``;

export default FullWidthWrapper;
