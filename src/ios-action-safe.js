const viewportMeasureCss = 'display: block; width: 100vw; height: 100vh; visibility: hidden; position: absolute; top: -100vh; pointer-events: none; overflow: visible';
const viewportDivCss = 'display: block; visibility: hidden; position: absolute; top: -100vh; pointer-events: none; overflow: visible';
/**
 * IOS Action Safe
 * @description helper class to determine viewport height changings
 *  and provide custom css properties for you to adopt your UI.
 */
export default class {
  /**
   * constructor
   * @param {Object} customSettings
   */
  constructor(customSettings = {}) {
    this.settings = {
      visibleHeight: '--visibleHeight',
      visibleWidth: '--visibleWidth',
      visiblePadding: '--visiblePadding',
      svw: '--svw',
      svh: '--svh',
      dvw: '--dvw',
      dvh: '--dvh',
      lvw: '--lvw',
      lvh: '--lvh',
      callback: undefined,
      ...customSettings,
    };
    this.bodyStyle = document.documentElement.style;
    this.addViewportMeasurement();
    this.resizeCallback(null);
    this.setupListener();
  }

  /**
   * callback for resize event handler
   * @param {ResizeEvent} event
   */
  resizeCallback(event) {
    const visibleHeight = window.innerHeight;
    const visibleWidth = window.innerWidth;
    const boundingRect = this.viewportMeasure.getBoundingClientRect();
    const boundingRectS = this.viewportDivS.getBoundingClientRect();
    const boundingRectD = this.viewportDivD.getBoundingClientRect();
    const boundingRectL = this.viewportDivL.getBoundingClientRect();

    this.viewportHeight = boundingRect.height;
    this.viewportWidth = boundingRect.width;

    this.viewportHeightS = boundingRectS.height;
    this.viewportWidthS = boundingRectS.width;

    this.viewportHeightD = boundingRectD.height;
    this.viewportWidthD = boundingRectD.width;

    this.viewportHeightL = boundingRectL.height;
    this.viewportWidthL = boundingRectL.width;

    this.bodyStyle.setProperty(this.settings.visibleHeight, `${visibleHeight}px`);
    this.bodyStyle.setProperty(this.settings.visibleWidth, `${visibleWidth}px`);
    this.bodyStyle.setProperty(this.settings.visiblePadding, `${this.viewportHeight - visibleHeight}px`);
    this.bodyStyle.setProperty(this.settings.svw, `${this.viewportWidthS}px`);
    this.bodyStyle.setProperty(this.settings.svh, `${this.viewportHeightS}px`);
    this.bodyStyle.setProperty(this.settings.dvw, `${this.viewportWidthD}px`);
    this.bodyStyle.setProperty(this.settings.dvh, `${this.viewportHeightD}px`);
    this.bodyStyle.setProperty(this.settings.lvw, `${this.viewportWidthL}px`);
    this.bodyStyle.setProperty(this.settings.lvh, `${this.viewportHeightL}px`);

    if (this.settings.callback) {
      this.settings.callback(event, {
        viewportHeight: this.viewportHeight,
        viewportWidth: this.viewportWidth,
        visibleHeight,
        visibleWidth,
        visiblePadding: this.viewportHeight - visibleHeight,
        svw: this.viewportWidthS,
        svh: this.viewportHeightS,
        dvw: this.viewportWidthD,
        dvh: this.viewportHeightD,
        lvw: this.viewportWidthL,
        lvh: this.viewportHeightL,
      });
    }
  }

  /**
   * setup resize eventlistener, but only once
   */
  setupListener() {
    if (this.listenerSetup) {
      return;
    }
    window.addEventListener('resize', (event) => {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = window.requestAnimationFrame(() => {
        this.resizeCallback(event);
      });
    });
    this.listenerSetup = true;
  }

  /**
   * calculate viewport dimensions
   */
  addViewportMeasurement() {
    this.viewportMeasure = document.createElement('aside');
    this.viewportMeasure.setAttribute('style', viewportMeasureCss);
    this.viewportDivS = document.createElement('div');
    this.viewportDivS.setAttribute('style', `${viewportDivCss}; width: 100svw; height: 100svh;`);
    this.viewportDivD = document.createElement('div');
    this.viewportDivD.setAttribute('style', `${viewportDivCss}; width: 100dvw; height: 100dvh;`);
    this.viewportDivL = document.createElement('div');
    this.viewportDivL.setAttribute('style', `${viewportDivCss}; width: 100lvw; height: 100lvh;`);
    this.viewportMeasure.appendChild(this.viewportDivS);
    this.viewportMeasure.appendChild(this.viewportDivD);
    this.viewportMeasure.appendChild(this.viewportDivL);
    document.documentElement.appendChild(this.viewportMeasure);
    const boundingRect = this.viewportMeasure.getBoundingClientRect();
    this.viewportHeight = boundingRect.height;
    this.viewportWidth = boundingRect.width;
  }
}
