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

var NO_OP = function NO_OP() {};

var ReactPlayer = (function (_Component) {
  _inherits(ReactPlayer, _Component);

  function ReactPlayer() {
    var _this = this;

    _classCallCheck(this, ReactPlayer);

    _get(Object.getPrototypeOf(ReactPlayer.prototype), 'constructor', this).apply(this, arguments);

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

  _createClass(ReactPlayer, [{
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
    key: 'renderPlayers',
    value: function renderPlayers() {
      var _this2 = this;

      return _players2['default'].map(function (Player) {
        var canPlay = Player.canPlay(_this2.props.url);
        var style = {
          display: canPlay ? 'block' : 'none'
        };
        return _react2['default'].createElement(
          'div',
          { style: style, key: Player.name },
          _react2['default'].createElement(Player, _extends({ ref: canPlay ? "player" : null }, _this2.props))
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var Player = this.state.Player;
      var style = {
        width: this.props.width,
        height: this.props.height,
        background: 'black'
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        this.renderPlayers()
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
      onPlay: NO_OP,
      onPause: NO_OP,
      onBuffer: NO_OP,
      onEnded: NO_OP
    },
    enumerable: true
  }]);

  return ReactPlayer;
})(_react.Component);

exports['default'] = ReactPlayer;
module.exports = exports['default'];