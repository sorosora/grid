import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import getValue from 'get-value';
import withViewport from '../helpers/withViewport';
import { getHalfMeasure, getCssWithMedia } from '../helpers';

const getMargin = (ie, viewport) => (ie && viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure('-100vw'));

const getWidth = (ie, viewport) => (ie && viewport.isIE ? `${viewport.width}px` : '100vw');

const components = {};

components.FullWidthWrapper = styled.div(
  css`
    position: relative;
  `,
  (props) => {
    const { viewport } = props;
    const styles = css`
      left: ${(gridSetting, breakpointKey) => gridSetting.enabled[breakpointKey] ? '50%' : 'auto'};
      right: ${(gridSetting, breakpointKey) => gridSetting.enabled[breakpointKey] ? '50%' : 'auto'};
      margin-left: ${(gridSetting, breakpointKey) => gridSetting.enabled[breakpointKey] ? getMargin(gridSetting.ie, viewport) : 0};
      margin-right: ${(gridSetting, breakpointKey) => gridSetting.enabled[breakpointKey] ? getMargin(gridSetting.ie, viewport) : 0};
      width: ${(gridSetting, breakpointKey) => gridSetting.enabled[breakpointKey] ? getWidth(gridSetting.ie, viewport) : '100%'};
    `;
    return getCssWithMedia(props, styles);
  }
);

const FullWidthWrapperWithViewport = withViewport(components.FullWidthWrapper);

const FullWidthWrapper = (props) => {
  const customGridIe = props.ie;
  const { theme, ...otherProps } = props;
  const themeGridIe = getValue(theme, 'grid.ie');
  if (customGridIe !== false && themeGridIe !== false && (customGridIe || themeGridIe)) {
    return <FullWidthWrapperWithViewport {...otherProps} />;
  }
  return <components.FullWidthWrapper {...otherProps} />;
};

FullWidthWrapper.propTypes = {
  enabled: PropTypes.arrayOf(PropTypes.bool),
  ie: PropTypes.bool,
};

export default styled(withTheme(FullWidthWrapper))``;
