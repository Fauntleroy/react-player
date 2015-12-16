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

var _ReactPlayer = require('./ReactPlayer');

var _ReactPlayer2 = _interopRequireDefault(_ReactPlayer);

var App = (function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _this = this;

    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      url: null,
      playing: false,
      volume: 0.8,
      played: 0,
      loaded: 0
    };

    this.load = function (url) {
      setTimeout(function () {
        return _this.setState({ url: url, playing: true });
      }, 3000);
    };

    this.playPause = function () {
      _this.setState({ playing: !_this.state.playing });
    };

    this.stop = function () {
      _this.setState({ url: null, playing: false });
    };

    this.setVolume = function (e) {
      _this.setState({ volume: parseFloat(e.target.value) });
    };

    this.onSeekMouseDown = function (e) {
      _this.setState({ seeking: true });
    };

    this.onSeekChange = function (e) {
      _this.setState({ played: parseFloat(e.target.value) });
    };

    this.onSeekMouseUp = function (e) {
      _this.setState({ seeking: false });
      _this.refs.player.seekTo(parseFloat(e.target.value));
    };

    this.onProgress = function (state) {
      // We only want to update time slider if we are not currently seeking
      if (!_this.state.seeking) {
        _this.setState(state);
      }
    };

    this.onConfigSubmit = function () {
      var config = undefined;
      try {
        config = JSON.parse(_this.refs.config.value);
      } catch (error) {
        config = {};
        console.error('Error setting config:', error);
      }
      _this.setState(config);
    };
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'rmp'
        ),
        _react2['default'].createElement(_ReactPlayer2['default'], {
          ref: 'player',
          url: this.state.url,
          playing: this.state.playing,
          volume: this.state.volume,
          onProgress: this.onProgress,
          soundcloudConfig: this.state.soundcloudConfig,
          vimeoConfig: this.state.vimeoConfig,
          youtubeConfig: { preload: true },
          onPlay: function () {
            return console.log('onPlay');
          },
          onPause: function () {
            return console.log('onPause');
          },
          onBuffer: function () {
            return console.log('onBuffer');
          },
          onEnded: function () {
            return console.log('onEnded');
          }
        }),
        _react2['default'].createElement(
          'button',
          { onClick: this.stop },
          'Stop'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.playPause },
          this.state.playing ? 'Pause' : 'Play'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.load.bind(this, 'https://www.youtube.com/watch?v=oUFJJNQGwhk') },
          'Youtube video'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.load.bind(this, 'https://soundcloud.com/miami-nights-1984/accelerated') },
          'Soundcloud song'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.load.bind(this, 'https://vimeo.com/90509568') },
          'Vimeo video'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.load.bind(this, 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4') },
          'MP4 video'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.load.bind(this, 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv') },
          'OGV video'
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.load.bind(this, 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm') },
          'WEBM video'
        ),
        _react2['default'].createElement('input', { ref: 'url', placeholder: 'url' }),
        _react2['default'].createElement(
          'button',
          { onClick: function () {
              _this2.load(_this2.refs.url.value);
            } },
          'Load URL'
        ),
        _react2['default'].createElement('hr', null),
        'seek: ',
        _react2['default'].createElement('input', {
          type: 'range', min: 0, max: 1, step: 'any',
          value: this.state.played,
          onMouseDown: this.onSeekMouseDown,
          onChange: this.onSeekChange,
          onMouseUp: this.onSeekMouseUp
        }),
        'played: ',
        _react2['default'].createElement('progress', { max: 1, value: this.state.played }),
        'loaded: ',
        _react2['default'].createElement('progress', { max: 1, value: this.state.loaded }),
        'volume: ',
        _react2['default'].createElement('input', {
          type: 'range', min: 0, max: 1, step: 'any',
          value: this.state.volume,
          onChange: this.setVolume
        }),
        _react2['default'].createElement('hr', null),
        _react2['default'].createElement('textarea', { ref: 'config', placeholder: 'Config JSON', style: { width: '200px', height: '200px' } }),
        _react2['default'].createElement(
          'button',
          { onClick: this.onConfigSubmit },
          'Update Config'
        )
      );
    }
  }]);

  return App;
})(_react.Component);

exports['default'] = App;
module.exports = exports['default'];