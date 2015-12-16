'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _props = require('../props');

var Base = (function (_Component) {
  _inherits(Base, _Component);

  function Base() {
    var _this = this;

    _classCallCheck(this, Base);

    _get(Object.getPrototypeOf(Base.prototype), 'constructor', this).apply(this, arguments);

    this.onReady = function () {
      _this.setVolume(_this.props.volume);
      if (_this.props.playing || _this.preloading) {
        _this.preloading = false;
        _this.play();
      }
    };
  }

  _createClass(Base, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Invoke player methods based on incoming props
      if (this.props.url !== nextProps.url) {
        if (nextProps.url) {
          this.play(nextProps.url);
          this.props.onProgress({ played: 0, loaded: 0 });
        } else {
          this.stop();
          clearTimeout(this.updateTimeout);
        }
      } else if (!this.props.playing && nextProps.playing) {
        this.play();
      } else if (this.props.playing && !nextProps.playing) {
        this.pause();
      } else if (this.props.volume !== nextProps.volume) {
        this.setVolume(nextProps.volume);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.url !== nextProps.url;
    }
  }], [{
    key: 'propTypes',
    value: _props.propTypes,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _props.defaultProps,
    enumerable: true
  }]);

  return Base;
})(_react.Component);

exports['default'] = Base;
module.exports = exports['default'];