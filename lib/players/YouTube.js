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

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var SDK_URL = '//www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
var MATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var PLAYER_ID = 'youtube-player';
var BLANK_VIDEO_URL = 'https://www.youtube.com/watch?v=GlCmAC4MHek';
var DEFAULT_PLAYER_VARS = {
  autoplay: 0,
  controls: 0,
  showinfo: 0
};

var playerIdCount = 0;

var YouTube = (function (_Base) {
  _inherits(YouTube, _Base);

  function YouTube() {
    var _this = this;

    _classCallCheck(this, YouTube);

    _get(Object.getPrototypeOf(YouTube.prototype), 'constructor', this).apply(this, arguments);

    this.playerId = PLAYER_ID + '-' + playerIdCount++;

    this.onStateChange = function (_ref) {
      var data = _ref.data;
      var _window$SDK_GLOBAL$PlayerState = window[SDK_GLOBAL].PlayerState;
      var PLAYING = _window$SDK_GLOBAL$PlayerState.PLAYING;
      var PAUSED = _window$SDK_GLOBAL$PlayerState.PAUSED;
      var BUFFERING = _window$SDK_GLOBAL$PlayerState.BUFFERING;
      var ENDED = _window$SDK_GLOBAL$PlayerState.ENDED;

      if (data === PLAYING) _this.props.onPlay();
      if (data === PAUSED) _this.props.onPause();
      if (data === BUFFERING) _this.props.onBuffer();
      if (data === ENDED) _this.props.onEnded();
    };
  }

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.url && this.props.youtubeConfig.preload) {
        this.preloading = true;
        this.load(BLANK_VIDEO_URL);
      }
      _get(Object.getPrototypeOf(YouTube.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      var _this2 = this;

      if (window[SDK_GLOBAL]) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        var previousOnReady = window[SDK_GLOBAL_READY];
        window[SDK_GLOBAL_READY] = function () {
          if (previousOnReady) previousOnReady();
          resolve(window[SDK_GLOBAL]);
        };
        if (!_this2.loadingSDK) {
          (0, _loadScript2['default'])(SDK_URL, function (err) {
            if (err) reject(err);
          });
          _this2.loadingSDK = true;
        }
      });
    }
  }, {
    key: 'load',
    value: function load(url, playing) {
      var _this3 = this;

      var id = url && url.match(MATCH_URL)[1];
      if (this.isReady) {
        this.stop();
        if (playing) {
          this.player.loadVideoById(id);
        } else {
          this.player.cueVideoById(id);
        }
        return;
      }
      this.getSDK().then(function (YT) {
        _this3.player = new YT.Player(_this3.playerId, {
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({}, DEFAULT_PLAYER_VARS, _this3.props.youtubeConfig.playerVars),
          events: {
            onReady: function onReady() {
              // Only ready up if url hasn't changed
              if (url === _this3.props.url) _this3.onReady();
            },
            onStateChange: _this3.onStateChange,
            onError: _this3.props.onError
          }
        });
      });
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.isReady || !this.player.playVideo) return;
      this.player.playVideo();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isReady || this.player.pauseVideo) return;
      this.player.pauseVideo();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.isReady || !this.player.stopVideo) return;
      this.player.stopVideo();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(fraction) {
      if (!this.isReady || !this.player.seekTo) return;
      this.player.seekTo(this.player.getDuration() * fraction);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.isReady || !this.player.setVolume) return;
      this.player.setVolume(fraction * 100);
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.isReady || !this.player.getCurrentTime) return null;
      return this.player.getCurrentTime() / this.player.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (!this.isReady || !this.player.getVideoLoadedFraction) return null;
      return this.player.getVideoLoadedFraction();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = { display: this.props.url ? 'block' : 'none' };
      return _react2['default'].createElement('div', { id: this.playerId, style: style });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }, {
    key: 'displayName',
    value: 'YouTube',
    enumerable: true
  }]);

  return YouTube;
})(_Base3['default']);

exports['default'] = YouTube;
module.exports = exports['default'];