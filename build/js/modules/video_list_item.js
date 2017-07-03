'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _video_embed = require('./video_embed.js');

var _video_embed2 = _interopRequireDefault(_video_embed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dataItem = this.props.data.items;

      return _react2.default.createElement(
        'div',
        { className: 'videos-list' },
        this.props.data.items.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            { className: 'video-item', id: index, key: index, onClick: function onClick(e) {
                return _this2.props.loadVideo(e);
              } },
            _react2.default.createElement(
              'div',
              { className: 'video-content' },
              _react2.default.createElement(
                'div',
                { className: 'yt-icon' },
                _react2.default.createElement('img', { src: dataItem[index].snippet.thumbnails.default.url })
              ),
              _react2.default.createElement(
                'div',
                { className: 'yt-description' },
                _react2.default.createElement(
                  'p',
                  { className: 'title-description' },
                  dataItem[index].snippet.title
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'channel-title' },
                  dataItem[index].snippet.channelTitle
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'video-description' },
                  dataItem[index].snippet.description
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'embed-video' },
              index === _this2.props.idVideo ? _react2.default.createElement(_video_embed2.default, { videoId: item.id.videoId }) : false
            )
          );
        })
      );
    }
  }]);

  return ListItem;
}(_react2.default.Component);

exports.default = ListItem;