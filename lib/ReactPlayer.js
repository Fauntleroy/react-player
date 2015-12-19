'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('array.prototype.find');

var _props2 = require('./props');

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var PROGRESS_FREQUENCY = 500;

var ReactPlayer = (function (_Component) {
  _inherits(ReactPlayer, _Component);

  function ReactPlayer() {
    var _this = this;

    _classCallCheck(this, ReactPlayer);

    _get(Object.getPrototypeOf(ReactPlayer.prototype), 'constructor', this).apply(this, arguments);

    this.seekTo = function (fraction) {
      var player = _this.refs.player;
      if (player) {
        player.seekTo(fraction);
      }
    };

    this.progress = function () {
      if (_this.props.url && _this.refs.player) {
        var progress = {};
        var loaded = _this.refs.player.getFractionLoaded();
        var played = _this.refs.player.getFractionPlayed();
        if (!_this.prevLoaded || loaded !== _this.prevLoaded) {
          progress.loaded = _this.prevLoaded = loaded;
        }
        if (!_this.prevPlayed || played !== _this.prevPlayed) {
          progress.played = _this.prevPlayed = played;
        }
        if (progress.loaded || progress.played) {
          _this.props.onProgress(progress);
        }
      }
      _this.progressTimeout = setTimeout(_this.progress, PROGRESS_FREQUENCY);
    };

    this.renderPlayer = function (Player) {
      var active = Player.canPlay(_this.props.url);
      var _props = _this.props;
      var youtubeConfig = _props.youtubeConfig;
      var soundcloudConfig = _props.soundcloudConfig;
      var vimeoConfig = _props.vimeoConfig;

      var activeProps = _objectWithoutProperties(_props, ['youtubeConfig', 'soundcloudConfig', 'vimeoConfig']);

      var props = active ? _extends({}, activeProps, { ref: 'player' }) : {};
      return _react2['default'].createElement(Player, _extends({
        key: Player.name,
        youtubeConfig: youtubeConfig,
        soundcloudConfig: soundcloudConfig,
        vimeoConfig: vimeoConfig
      }, props));
    };
  }

  _createClass(ReactPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.progress();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.progressTimeout);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.url !== nextProps.url || this.props.playing !== nextProps.playing || this.props.volume !== nextProps.volume;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: this.props.width,
        height: this.props.height
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        _players2['default'].map(this.renderPlayer)
      );
    }
  }], [{
    key: 'canPlay',
    value: function canPlay(url) {
      return _players2['default'].some(function (player) {
        return player.canPlay(url);
      });
    }
  }, {
    key: 'displayName',
    value: 'ReactPlayer',
    enumerable: true
  }, {
    key: 'propTypes',
    value: _props2.propTypes,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: _props2.defaultProps,
    enumerable: true
  }]);

  return ReactPlayer;
})(_react.Component);

exports['default'] = ReactPlayer;
module.exports = exports['default'];