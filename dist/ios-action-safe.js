/*! IosActionSafe - v0.2.0 - 2023-07-25
* https://github.com/djpogo/ios-action-safe#readme
* Copyright (c) 2023 ; Licensed  */


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.IosActionSafe = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var viewportMeasureCss = 'display: block; width: 100vw; height: 100vh; visibility: hidden; position: absolute; top: -100vh; pointer-events: none; overflow: visible';
  var viewportDivCss = 'display: block; visibility: hidden; position: absolute; top: -100vh; pointer-events: none; overflow: visible';
  /**
   * IOS Action Safe
   * @description helper class to determine viewport height changings
   *  and provide custom css properties for you to adopt your UI.
   */

  var _default = /*#__PURE__*/function () {
    /**
     * constructor
     * @param {Object} customSettings
     */
    function _default() {
      var customSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, _default);

      this.settings = _objectSpread2({
        visibleHeight: '--visibleHeight',
        visibleWidth: '--visibleWidth',
        visiblePadding: '--visiblePadding',
        svw: '--svw',
        svh: '--svh',
        dvw: '--dvw',
        dvh: '--dvh',
        lvw: '--lvw',
        lvh: '--lvh',
        callback: undefined
      }, customSettings);
      this.bodyStyle = document.documentElement.style;
      this.addViewportMeasurement();
      this.resizeCallback(null);
      this.setupListener();
    }
    /**
     * callback for resize event handler
     * @param {ResizeEvent} event
     */


    _createClass(_default, [{
      key: "resizeCallback",
      value: function resizeCallback(event) {
        var visibleHeight = window.innerHeight;
        var visibleWidth = window.innerWidth;
        var boundingRect = this.viewportMeasure.getBoundingClientRect();
        var boundingRectS = this.viewportDivS.getBoundingClientRect();
        var boundingRectD = this.viewportDivD.getBoundingClientRect();
        var boundingRectL = this.viewportDivL.getBoundingClientRect();
        this.viewportHeight = boundingRect.height;
        this.viewportWidth = boundingRect.width;
        this.viewportHeightS = boundingRectS.height;
        this.viewportWidthS = boundingRectS.width;
        this.viewportHeightD = boundingRectD.height;
        this.viewportWidthD = boundingRectD.width;
        this.viewportHeightL = boundingRectL.height;
        this.viewportWidthL = boundingRectL.width;
        this.bodyStyle.setProperty(this.settings.visibleHeight, "".concat(visibleHeight, "px"));
        this.bodyStyle.setProperty(this.settings.visibleWidth, "".concat(visibleWidth, "px"));
        this.bodyStyle.setProperty(this.settings.visiblePadding, "".concat(this.viewportHeight - visibleHeight, "px"));
        this.bodyStyle.setProperty(this.settings.svw, "".concat(this.viewportWidthS, "px"));
        this.bodyStyle.setProperty(this.settings.svh, "".concat(this.viewportHeightS, "px"));
        this.bodyStyle.setProperty(this.settings.dvw, "".concat(this.viewportWidthD, "px"));
        this.bodyStyle.setProperty(this.settings.dvh, "".concat(this.viewportHeightD, "px"));
        this.bodyStyle.setProperty(this.settings.lvw, "".concat(this.viewportWidthL, "px"));
        this.bodyStyle.setProperty(this.settings.lvh, "".concat(this.viewportHeightL, "px"));

        if (this.settings.callback) {
          this.settings.callback(event, {
            viewportHeight: this.viewportHeight,
            viewportWidth: this.viewportWidth,
            visibleHeight: visibleHeight,
            visibleWidth: visibleWidth,
            visiblePadding: this.viewportHeight - visibleHeight,
            svw: this.viewportWidthS,
            svh: this.viewportHeightS,
            dvw: this.viewportWidthD,
            dvh: this.viewportHeightD,
            lvw: this.viewportWidthL,
            lvh: this.viewportHeightL
          });
        }
      }
      /**
       * setup resize eventlistener, but only once
       */

    }, {
      key: "setupListener",
      value: function setupListener() {
        var _this = this;

        if (this.listenerSetup) {
          return;
        }

        window.addEventListener('resize', function (event) {
          window.cancelAnimationFrame(_this.rafId);
          _this.rafId = window.requestAnimationFrame(function () {
            _this.resizeCallback(event);
          });
        });
        this.listenerSetup = true;
      }
      /**
       * calculate viewport dimensions
       */

    }, {
      key: "addViewportMeasurement",
      value: function addViewportMeasurement() {
        this.viewportMeasure = document.createElement('aside');
        this.viewportMeasure.setAttribute('style', viewportMeasureCss);
        this.viewportDivS = document.createElement('div');
        this.viewportDivS.setAttribute('style', "".concat(viewportDivCss, "; width: 100svw; height: 100svh;"));
        this.viewportDivD = document.createElement('div');
        this.viewportDivD.setAttribute('style', "".concat(viewportDivCss, "; width: 100dvw; height: 100dvh;"));
        this.viewportDivL = document.createElement('div');
        this.viewportDivL.setAttribute('style', "".concat(viewportDivCss, "; width: 100lvw; height: 100lvh;"));
        this.viewportMeasure.appendChild(this.viewportDivS);
        this.viewportMeasure.appendChild(this.viewportDivD);
        this.viewportMeasure.appendChild(this.viewportDivL);
        document.documentElement.appendChild(this.viewportMeasure);
        var boundingRect = this.viewportMeasure.getBoundingClientRect();
        this.viewportHeight = boundingRect.height;
        this.viewportWidth = boundingRect.width;
      }
    }]);

    return _default;
  }();

  return _default;

})));
