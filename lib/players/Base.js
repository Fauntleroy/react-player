'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _propTypes = require('../propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var UPDATE_FREQUENCY = 500;

var Base = (function (_Component) {
  _inherits(Base, _Component);

  function Base() {
    var _this = this;

    _classCallCheck(this, Base);

    _get(Object.getPrototypeOf(Base.prototype), 'constructor', this).apply(this, arguments);

    this.update = function () {
      var progress = {};
      var loaded = _this.getFractionLoaded();
      var played = _this.getFractionPlayed();
      if (!_this.prevLoaded || loaded !== _this.prevLoaded) {
        progress.loaded = _this.prevLoaded = loaded;
      }
      if (!_this.prevPlayed || played !== _this.prevPlayed) {
        progress.played = _this.prevPlayed = played;
      }
      if (progress.loaded || progress.played) {
        _this.props.onProgress(progress);
      }
      _this.updateTimeout = setTimeout(_this.update, UPDATE_FREQUENCY);
    };

    this.onReady = function () {
      _this.setVolume(_this.props.volume);
    };
  }

  _createClass(Base, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.play(this.props.url);
      this.update();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
      clearTimeout(this.updateTimeout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Invoke player methods based on incoming props
      if (this.props.url !== nextProps.url) {
        this.play(nextProps.url);
        this.props.onProgress({ played: 0, loaded: 0 });
      } else if (!this.props.playing && nextProps.playing) {
        this.play();
      } else if (this.props.playing && !nextProps.playing) {
        this.pause();
      } else if (this.props.volume !== nextProps.volume) {
        this.setVolume(nextProps.volume);
      }
    }
  }], [{
    key: 'propTypes',
    value: _propTypes2['default'],
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onProgress: function onProgress() {}
    },
    enumerable: true
  }]);

  return Base;
})(_react.Component);

exports['default'] = Base;
module.exports = exports['default'];