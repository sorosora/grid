const defaultViewport = {
  width: 1920,
  height: 1080,
  isIE: false,
};

const withViewport = ComposedComponent => (
  class Viewport extends React.Component {
    static detectIE() {
      const ua = window.navigator.userAgent;

      const msie = ua.indexOf('MSIE');
      if (msie > 0) {
        // IE 10 or older
        return true;
      }

      const trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11
        return true;
      }

      const edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+)
        return true;
      }

      // other browser
      return false;
    }
    constructor(props) {
      super(props);
      this.setViewport = this.setViewport.bind(this);
      this.handleWindowResize = this.handleWindowResize.bind(this);
      this.state = {
        viewport: defaultViewport,
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

    setViewport() {
      const currentWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      const currentHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
      const ieWidth = window.innerWidth - (window.outerWidth - window.innerWidth);
      this.setState({
        viewport: {
          width: Viewport.detectIE() ? ieWidth : currentWidth,
          height: currentHeight,
          isIE: Viewport.detectIE(),
        },
      });
    }

    handleWindowResize() {
      const { viewport } = this.state;
      if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
        this.setViewport();
      }
    }

    render() {
      return <ComposedComponent {...this.props} viewport={this.state.viewport} />;
    }
  }
);

export default withViewport;
