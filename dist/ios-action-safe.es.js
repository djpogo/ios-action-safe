/*! IosActionSafe - v0.0.1 - 2019-12-02
* https://github.com/djpogo/ios-action-safe#readme
* Copyright (c) 2019 ; Licensed  */


const viewportMeasreCss = 'display: block; width: 100vw; height: 100vh; visibility: hidden; position: absolute; top: -100vh; pointer-events: none';
/**
 * IOS Action Safe
 * @description helper class to determine viewport height changings
 *  and provide custom css properties for you to adopt your UI.
 */
class iosActionSafe {
  /**
   * constructor
   * @param {Object} customSettings
   */
  constructor(customSettings = {}) {
    this.settings = {
      visibleHeight: '--visibleHeight',
      visibleWidth: '--visibleWidth',
      visiblePadding: '--visiblePadding',
      callback: undefined,
      ...customSettings,
    };
    this.bodyStyle = document.documentElement.style;
    this.measureViewport();
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
    this.viewportHeight = boundingRect.height;
    this.viewportWidth = boundingRect.width;
    this.bodyStyle.setProperty(this.settings.visibleHeight, `${visibleHeight}px`);
    this.bodyStyle.setProperty(this.settings.visibleWidth, `${visibleWidth}px`);
    this.bodyStyle.setProperty(this.settings.visiblePadding, `${this.viewportHeight - visibleHeight}px`);

    if (this.settings.callback) {
      this.settings.callback(event, {
        viewportHeight: this.viewportHeight,
        viewportWidth: this.viewportWidth,
        visibleHeight,
        visibleWidth,
        visiblePadding: this.viewportHeight - visibleHeight,
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
    window.addEventListener('resize', () => this.resizeCallback());
    this.listenerSetup = true;
  }

  /**
   * calculate viewport dimensions
   */
  measureViewport() {
    this.viewportMeasure = document.createElement('div');
    this.viewportMeasure.style = viewportMeasreCss;
    const boundingRect = this.viewportMeasure.getBoundingClientRect();
    document.documentElement.appendChild(this.viewportMeasure);
    this.viewportHeight = boundingRect.height;
    this.viewportWidth = boundingRect.width;
  }
}

export default iosActionSafe;
