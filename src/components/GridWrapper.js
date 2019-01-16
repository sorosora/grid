import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { getCssWithMedia } from '../helpers';

const GridWrapper = styled.div(
  css`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  `,
  (props) => {
    const styles = css`
      padding-left: ${(gridSetting, breakpointKey) => gridSetting.padding[breakpointKey]};
      padding-right: ${(gridSetting, breakpointKey) => gridSetting.padding[breakpointKey]};
      max-width: ${(gridSetting, breakpointKey) => gridSetting.gridWidth[breakpointKey]};
    `;
    return getCssWithMedia(props, styles);
  }
);

GridWrapper.propTypes = {
  padding: PropTypes.arrayOf(PropTypes.string),
  gridWidth: PropTypes.arrayOf(PropTypes.string),
};

export default GridWrapper;
