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
      viewHeight: '--viewHeight',
      ...customSettings,
    };
    this.bodyStyle = document.documentElement.style;
    this.resizeCallback();
    this.setupListener();
  }

  /**
   * callback for resize event handler
   */
  resizeCallback() {
    this.bodyStyle.setProperty(this.settings.viewHeight, window.innerHeight);
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
}
