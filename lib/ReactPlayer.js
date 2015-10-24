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

require('array.prototype.find');

var _propTypes = require('./propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var MediaPlayer = (function (_Component) {
  _inherits(MediaPlayer, _Component);

  function MediaPlayer() {
    var _this = this;

    _classCallCheck(this, MediaPlayer);

    _get(Object.getPrototypeOf(MediaPlayer.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      Player: this.getPlayer(this.props.url)
    };

    this.seekTo = function (fraction) {
      var player = _this.refs.player;
      if (player) {
        player.seekTo(fraction);
      }
    };
  }

  _createClass(MediaPlayer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.url !== nextProps.url) {
        this.setState({
          Player: this.getPlayer(nextProps.url)
        });
      }
    }
  }, {
    key: 'getPlayer',
    value: function getPlayer(url) {
      return _players2['default'].find(function (Player) {
        return Player.canPlay(url);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var Player = this.state.Player;
      var style = {
        width: this.props.width,
        height: this.props.height
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        Player && _react2['default'].createElement(Player, _extends({ ref: 'player' }, this.props))
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
    key: 'propTypes',
    value: _propTypes2['default'],
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      volume: 0.8,
      width: 640,
      height: 360,
      onPlay: function onPlay() {}, // TODO: Empty func var in react?
      onPause: function onPause() {},
      onBuffer: function onBuffer() {},
      onEnded: function onEnded() {}
    },
    enumerable: true
  }]);

  return MediaPlayer;
})(_react.Component);

exports['default'] = MediaPlayer;
module.exports = exports['default'];