import React from 'react';
import { viewport } from './defaultValue';

const isIE = () => {
  let userAgent;
  try {
    userAgent = window.navigator.userAgent;
  } catch (e) {
    console.error(e);
    return undefined;
  }
  switch (true) {
    case userAgent.indexOf('MSIE') > 0: // IE 10 or older
    case userAgent.indexOf('Trident/') > 0: // IE 11
    case userAgent.indexOf('Edge/') > 0: // Edge (IE 12+)
      return true;
    default: // other browser
      return false;
  }
};

const withViewport = ComposedComponent => (
  class Viewport extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        viewport,
      };
    }

    componentDidMount() {
      this.setViewport();
      window.addEventListener('resize', this.handleWindowResize);
      window.addEventListener('orientationchange', this.handleWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowResize);
      window.removeEventListener('orientationchange', this.handleWindowResize);
    }

    setViewport = () => {
      const currentWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      const ieWidth = window.innerWidth - (window.outerWidth - window.innerWidth);
      this.setState({
        viewport: {
          width: isIE() ? ieWidth : currentWidth,
          isIE: isIE(),
        },
      });
    };

    handleWindowResize = () => {
      const { viewport } = this.state;
      if (viewport.width !== window.innerWidth) {
        this.setViewport();
      }
    };

    render() {
      return <ComposedComponent {...this.props} viewport={this.state.viewport} />;
    }
  }
);

export default withViewport;
