'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _YouTube = require('./YouTube');

var _YouTube2 = _interopRequireDefault(_YouTube);

var _SoundCloud = require('./SoundCloud');

var _SoundCloud2 = _interopRequireDefault(_SoundCloud);

var _Vimeo = require('./Vimeo');

var _Vimeo2 = _interopRequireDefault(_Vimeo);

var _FilePlayer = require('./FilePlayer');

var _FilePlayer2 = _interopRequireDefault(_FilePlayer);

exports['default'] = [_YouTube2['default'], _SoundCloud2['default'], _Vimeo2['default'], _FilePlayer2['default']];
module.exports = exports['default'];