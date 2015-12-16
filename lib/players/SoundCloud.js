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

var _react2 = _interopRequireDefault(_react);

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _props = require('../props');

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var SDK_URL = '//connect.soundcloud.com/sdk-2.0.0.js';
var SDK_GLOBAL = 'SC';
var RESOLVE_URL = '//api.soundcloud.com/resolve.json';
var MATCH_URL = /^https?:\/\/(soundcloud.com|snd.sc)\/([a-z0-9-]+\/[a-z0-9-]+)$/;

var SoundCloud = (function (_Base) {
  _inherits(SoundCloud, _Base);

  function SoundCloud() {
    var _this = this;

    _classCallCheck(this, SoundCloud);

    _get(Object.getPrototypeOf(SoundCloud.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      image: null
    };

    this.onStateChange = function (state) {
      if (state === 'playing') _this.props.onPlay();
      if (state === 'paused') _this.props.onPause();
      if (state === 'loading') _this.props.onBuffer();
      if (state === 'ended') _this.props.onEnded();
    };

    this.options = {
      onplay: this.props.onPlay,
      onpause: this.props.onPause,
      onbufferchange: function onbufferchange() {
        if (this.player.isBuffering) this.props.onBuffer();
      },
      onfinish: this.props.onFinish,
      ondataerror: this.props.onError
    };
  }

  _createClass(SoundCloud, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return _get(Object.getPrototypeOf(SoundCloud.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState) || this.state.image !== nextState.image;
    }
  }, {
    key: 'getSDK',
    value: function getSDK() {
      var _this2 = this;

      if (window[SDK_GLOBAL]) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        (0, _loadScript2['default'])(SDK_URL, function (err) {
          if (err) {
            reject(err);
          } else {
            window[SDK_GLOBAL].initialize({ client_id: _this2.props.soundcloudConfig.clientId });
            resolve(window[SDK_GLOBAL]);
          }
        });
      });
    }
  }, {
    key: 'getSongData',
    value: function getSongData(url) {
      return fetch(RESOLVE_URL + '?url=' + url + '&client_id=' + this.props.soundcloudConfig.clientId).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: 'play',
    value: function play(url) {
      var _this3 = this;

      if (!url && this.player) {
        this.player.play();
        return;
      }
      this.stop();
      this.getSDK().then(function (SC) {
        _this3.getSongData(url).then(function (data) {
          if (url !== _this3.props.url) return; // Abort if url changes during async requests
          var image = data.artwork_url || data.user.avatar_url;
          if (image) {
            _this3.setState({ image: image.replace('-large', '-t500x500') });
          }
          SC.stream(data.uri, _this3.options, function (player) {
            _this3.player = player;
            player._player.on('stateChange', _this3.onStateChange);
            _this3.onReady();
          });
        });
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.player) return;
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.player) return;
      this.player.stop();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(fraction) {
      if (!this.player) return;
      this.player.seek(this.player.getDuration() * fraction);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (!this.player) return;
      this.player.setVolume(fraction);
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (!this.player) return 0;
      return this.player.getCurrentPosition() / this.player.getDuration();
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (!this.player) return 0;
      return this.player.getLoadedPosition() / this.player.getDuration();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: this.props.url ? 'block' : 'none',
        height: '100%',
        backgroundImage: this.state.image ? 'url(' + this.state.image + ')' : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
      return _react2['default'].createElement('div', { style: style });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }, {
    key: 'propTypes',
    value: _props.propTypes,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _props.defaultProps,
    enumerable: true
  }]);

  return SoundCloud;
})(_Base3['default']);

exports['default'] = SoundCloud;
module.exports = exports['default'];