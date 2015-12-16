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

var _props = require('../props');

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm)$/;
var AUDIO_EXTENSIONS = /\.(mp3|wav)$/;

var FilePlayer = (function (_Base) {
  _inherits(FilePlayer, _Base);

  function FilePlayer() {
    _classCallCheck(this, FilePlayer);

    _get(Object.getPrototypeOf(FilePlayer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FilePlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.player = this.refs.player;
      this.player.oncanplay = this.onReady;
      this.player.onplay = this.props.onPlay;
      this.player.onpause = this.props.onPause;
      this.player.onended = this.props.onEnded;
      this.player.onerror = this.props.onError;
    }
  }, {
    key: 'play',
    value: function play(url) {
      this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      // No need to stop
    }
  }, {
    key: 'seekTo',
    value: function seekTo(fraction) {
      this.player.currentTime = this.player.duration * fraction;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.player.volume = fraction;
    }
  }, {
    key: 'getFractionPlayed',
    value: function getFractionPlayed() {
      if (this.player.readyState === 0) return 0;
      return this.player.currentTime / this.player.duration;
    }
  }, {
    key: 'getFractionLoaded',
    value: function getFractionLoaded() {
      if (this.player.readyState === 0) return 0;
      return this.player.buffered.end(0) / this.player.duration;
    }
  }, {
    key: 'render',
    value: function render() {
      var Media = AUDIO_EXTENSIONS.test(this.props.url) ? 'audio' : 'video';
      var style = { display: this.props.url ? 'block' : 'none' };
      return _react2['default'].createElement(Media, {
        ref: 'player',
        src: this.props.url,
        style: style,
        width: this.props.width,
        height: this.props.height
      });
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return VIDEO_EXTENSIONS.test(url) || AUDIO_EXTENSIONS.test(url);
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

  return FilePlayer;
})(_Base3['default']);

exports['default'] = FilePlayer;
module.exports = exports['default'];