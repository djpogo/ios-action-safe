/*! IosActionSafe - v0.0.1 - 2019-12-01
* https://github.com/djpogo/ios-action-safe#readme
* Copyright (c) 2019 ; Licensed  */


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

  /**
   * IOS Action Safe
   * @description helper class to determine viewport height changings
   *  and provide custom css properties for you to adopt your UI.
   */
  var _default =
  /*#__PURE__*/
  function () {
    /**
     * constructor
     * @param {Object} customSettings
     */
    function _default() {
      var customSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, _default);

      this.settings = _objectSpread2({
        viewHeight: '--viewHeight'
      }, customSettings);
      this.bodyStyle = document.documentElement.style;
      this.resizeCallback();
      this.setupListener();
    }
    /**
     * callback for resize event handler
     */


    _createClass(_default, [{
      key: "resizeCallback",
      value: function resizeCallback() {
        this.bodyStyle.setProperty(this.settings.viewHeight, window.innerHeight);
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

        window.addEventListener('resize', function () {
          return _this.resizeCallback();
        });
        this.listenerSetup = true;
      }
    }]);

    return _default;
  }();

  return _default;

})));
