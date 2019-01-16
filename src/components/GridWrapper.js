import styled, { css } from 'styled-components';
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

export default GridWrapper;
