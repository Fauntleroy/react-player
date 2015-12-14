'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

exports['default'] = {
  url: _react.PropTypes.string,
  playing: _react.PropTypes.bool,
  volume: _react.PropTypes.number,
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  soundcloudConfig: _react.PropTypes.shape({
    clientId: _react.PropTypes.string
  }),
  youtubeConfig: _react.PropTypes.shape({
    playerVars: _react.PropTypes.object
  }),
  vimeoConfig: _react.PropTypes.shape({
    iframeParams: _react.PropTypes.object
  }),
  onPlay: _react.PropTypes.func,
  onPause: _react.PropTypes.func,
  onBuffer: _react.PropTypes.func,
  onEnded: _react.PropTypes.func,
  onError: _react.PropTypes.func
};
module.exports = exports['default'];