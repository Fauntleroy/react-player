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

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _propTypes = require('../propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var SDK_URL = '//www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var MATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var PLAYER_ID = 'youtube-player';
var DEFAULT_PLAYER_VARS = {
  autoplay: 1,
  controls: 0,
  showinfo: 0
};

var YouTube = (function (_Base) {
  _inherits(YouTube, _Base);

  function YouTube() {
    var _this = this;

    _classCallCheck(this, YouTube);

    _get(Object.getPrototypeOf(YouTube.prototype), 'constructor', this).apply(this, arguments);

    this.onStateChange = function (state) {
      var YT = window[SDK_GLOBAL];
      if (state.data === YT.PlayerState.PLAYING) _this.props.onPlay();
      if (state.data === YT.PlayerState.PAUSED) _this.props.onPause();
      if (state.data === YT.PlayerState.BUFFERING) _this.props.onBuffer();
      if (state.data === YT.PlayerState.ENDED) _this.props.onEnded();
    };
  }

  _createClass(YouTube, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      if (window[SDK_GLOBAL]) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        window.onYouTubeIframeAPIReady = function () {
          resolve(window[SDK_GLOBAL]);
        };
        (0, _loadScript2['default'])(SDK_URL, function (err) {
          if (err) reject(err);
        });
      });
    }
  }, {
    key: 'play',
    value: function play(url) {
      var _this2 = this;

      var id = url && url.match(MATCH_URL)[1];
      if (this.player) {
        if (id) {
          this.player.loadVideoById(id);
        } else {
          this.player.playVideo();
        }
        return;
      }
      this.getSDK().then(function (YT) {
        _this2.player = new YT.Player(PLAYER_ID, {
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({}, DEFAULT_PLAYER_VARS, _this2.props.youtubeConfig.playerVars),
          events: {
            onReady: _this2.onReady,
            onStateChange: _this2.onStateChange,
            onError: _this2.props.onError
          }
        });
      });
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      _get(Object.getPrototypeOf(YouTube.prototype), 'onReady', this).call(this);
      this.player.playVideo();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.player) return;
      this.player.pauseVideo();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.player) return;
      this.player.stopVideo();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(fraction) {
      if (!this.player) return;
      this.player.seekTo(this.player.getDuration() * fraction);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.player) return;
      this.player.setVolume(fraction * 100);
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.player || !this.player.getCurrentTime) return 0;
      return this.player.getCurrentTime() / this.player.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (!this.player || !this.player.getVideoLoadedFraction) return 0;
      return this.player.getVideoLoadedFraction();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { id: PLAYER_ID });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }, {
    key: 'propTypes',
    value: _propTypes2['default'],
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      youtubeConfig: {}
    },
    enumerable: true
  }]);

  return YouTube;
})(_Base3['default']);

exports['default'] = YouTube;
module.exports = exports['default'];