import React from 'react';
import styled, { css, ThemeConsumer } from 'styled-components';
import PropTypes from 'prop-types';
import getValue from 'get-value';
import withViewport from '../helpers/withViewport';
import { getHalfMeasure, getCssWithMedia } from '../helpers';

const getMargin = (ie, viewport) => (ie && viewport.isIE ? `-${viewport.width / 2}px` : getHalfMeasure('-100vw'));

const getWidth = (ie, viewport) => (ie && viewport.isIE ? `${viewport.width}px` : '100vw');

const Component = styled.div(
  css`
    position: relative;
    overflow: hidden;
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

const FullWidthWrapper = styled((props) => {
  const customGridIe = props.ie;
  try {
    const isStyledComponentsV4 = !!ThemeConsumer;
    if (customGridIe === false && !isStyledComponentsV4) {
      throw `Disabling IE supporting for <FullWidthWrapper /> below styled-components v4 is not allowed`;
    }
    if (!isStyledComponentsV4) {
      throw '';
    }
  } catch (e) {
    if (e) {
      console.warn('@sorosora/grid:', e);
    }
    const WithViewport = withViewport(Component);
    return <WithViewport {...props} />;
  }
  return (
    <ThemeConsumer>
      {
        (theme) => {
          const themeGridIe = getValue(theme, 'grid.ie');
          if (customGridIe !== false && themeGridIe !== false && (customGridIe || themeGridIe)) {
            const WithViewport = withViewport(Component);
            return <WithViewport {...props} />;
          }
          return <Component {...props} />;
        }
      }
    </ThemeConsumer>
  )
})``;

FullWidthWrapper.propTypes = {
  enabled: PropTypes.arrayOf(PropTypes.bool),
  ie: PropTypes.bool,
};

export default FullWidthWrapper;
