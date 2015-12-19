'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _queryString = require('query-string');

var _props = require('../props');

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var IFRAME_SRC = 'https://player.vimeo.com/video/';
var MATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
var MATCH_MESSAGE_ORIGIN = /^https?:\/\/player.vimeo.com/;
var BLANK_VIDEO_URL = 'https://vimeo.com/127250231';
var DEFAULT_IFRAME_PARAMS = {
  api: 1,
  autoplay: 0,
  badge: 0,
  byline: 0,
  portrait: 0,
  title: 0
};

var Vimeo = (function (_Base) {
  _inherits(Vimeo, _Base);

  function Vimeo() {
    var _this = this;

    _classCallCheck(this, Vimeo);

    _get(Object.getPrototypeOf(Vimeo.prototype), 'constructor', this).apply(this, arguments);

    this.onMessage = function (e) {
      if (!MATCH_MESSAGE_ORIGIN.test(e.origin)) return;
      _this.origin = _this.origin || e.origin;
      var data = JSON.parse(e.data);
      if (data.event === 'ready') {
        _this.postMessage('getDuration');
        _this.postMessage('addEventListener', 'playProgress');
        _this.postMessage('addEventListener', 'loadProgress');
        _this.postMessage('addEventListener', 'play');
        _this.postMessage('addEventListener', 'pause');
        _this.postMessage('addEventListener', 'finish');
      }
      if (data.event === 'ready') _this.onReady();
      if (data.event === 'playProgress') _this.fractionPlayed = data.data.percent;
      if (data.event === 'loadProgress') _this.fractionLoaded = data.data.percent;
      if (data.event === 'play') _this.props.onPlay();
      if (data.event === 'pause') _this.props.onPause();
      if (data.event === 'finish') _this.props.onEnded();
      if (data.method === 'getDuration') _this.duration = data.value; // Store for use in seekTo()
    };

    this.postMessage = function (method, value) {
      if (!_this.origin) return;
      var data = JSON.stringify({ method: method, value: value });
      return _this.iframe.contentWindow && _this.iframe.contentWindow.postMessage(data, _this.origin);
    };
  }

  _createClass(Vimeo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('message', this.onMessage, false);
      this.iframe = this.refs.iframe;

      if (!this.props.url && this.props.vimeoConfig.preload) {
        this.preloading = true;
        this.play(BLANK_VIDEO_URL);
      }
    }
  }, {
    key: 'play',
    value: function play(url) {
      if (url) {
        var id = url.match(MATCH_URL)[3];
        var iframeParams = _extends({}, DEFAULT_IFRAME_PARAMS, this.props.vimeoConfig.iframeParams);
        this.iframe.src = IFRAME_SRC + id + '?' + (0, _queryString.stringify)(iframeParams);
      } else {
        this.postMessage('play');
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.postMessage('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.iframe.src = '';
    }
  }, {
    key: 'seekTo',
    value: function seekTo(fraction) {
      this.postMessage('seekTo', this.duration * fraction);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.postMessage('setVolume', fraction);
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      return this.fractionPlayed || 0;
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      return this.fractionLoaded || 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: this.props.url ? 'block' : 'none',
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('iframe', { ref: 'iframe', frameBorder: '0', style: style });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }, {
    key: 'displayName',
    value: 'Vimeo',
    enumerable: true
  }, {
    key: 'propTypes',
    value: _props.propTypes,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _props.defaultProps,
    enumerable: true
  }]);

  return Vimeo;
})(_Base3['default']);

exports['default'] = Vimeo;
module.exports = exports['default'];