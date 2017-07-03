'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _video_buttons = require('./video_buttons.js');

var _video_buttons2 = _interopRequireDefault(_video_buttons);

var _video_list_item = require('./video_list_item.js');

var _video_list_item2 = _interopRequireDefault(_video_list_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = document.querySelector('#root');

var FormApp = function (_React$Component) {
  _inherits(FormApp, _React$Component);

  function FormApp() {
    _classCallCheck(this, FormApp);

    var _this = _possibleConstructorReturn(this, (FormApp.__proto__ || Object.getPrototypeOf(FormApp)).call(this));

    _this.state = {
      inputValue: '',
      videoData: undefined,
      tokenData: undefined,
      itemStatus: false,
      id: undefined
    };

    _this.loadVideo = _this.loadVideo.bind(_this);
    _this.nextToken = _this.nextToken.bind(_this);
    _this.updateKeyword = _this.updateKeyword.bind(_this);
    _this.keyword = _this.keyword.bind(_this);
    return _this;
  }

  _createClass(FormApp, [{
    key: 'updateKeyword',
    value: function updateKeyword(e) {
      this.setState({
        inputValue: e.target.value
      });
    }
  }, {
    key: 'keyword',
    value: function keyword(e) {
      var _this2 = this;

      if (e.keyCode === 13 && this.state.inputValue !== '') {
        fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + this.state.inputValue + '&type=video&key=AIzaSyBSoKMX-NlPdtRGGal-_p8yxR2SrA66_ks').then(function (response) {
          return response.json();
        }).then(function (data) {
          _this2.setState({
            videoData: data,
            itemStatus: true,
            id: undefined
          });
        });
      }
    }
  }, {
    key: 'loadVideo',
    value: function loadVideo(e) {
      if (e.target.tagName === 'IMG' || e.target.className === 'title-description') {
        this.setState({
          id: parseFloat(e.currentTarget.id)
        });
      }
    }
  }, {
    key: 'nextToken',
    value: function nextToken(btn) {
      var _this3 = this;

      var resultToken = this.state.tokenData !== undefined && !this.state.itemStatus ? this.state.tokenData['' + btn] : this.state.videoData['' + btn];

      fetch('https://www.googleapis.com/youtube/v3/search?pageToken=' + resultToken + '&part=snippet&q=' + this.state.inputValue + '&type=video&key=AIzaSyBSoKMX-NlPdtRGGal-_p8yxR2SrA66_ks').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this3.setState({
          tokenData: data,
          itemStatus: false,
          id: undefined
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var listItem = null;
      var buttons = null;

      if (this.state.videoData !== undefined) {
        if (this.state.tokenData !== undefined && !this.state.itemStatus) {
          listItem = _react2.default.createElement(_video_list_item2.default, { idVideo: this.state.id, loadVideo: this.loadVideo, data: this.state.tokenData });
        } else {
          listItem = _react2.default.createElement(_video_list_item2.default, { idVideo: this.state.id, loadVideo: this.loadVideo, data: this.state.videoData });
        }

        buttons = _react2.default.createElement(_video_buttons2.default, { currentData: this.state.tokenData !== undefined && !this.state.itemStatus ? this.state.tokenData : false, nextToken: this.nextToken });
      }

      return _react2.default.createElement(
        'div',
        { className: 'wrapper-app' },
        _react2.default.createElement(
          'div',
          { className: 'react-app' },
          _react2.default.createElement(
            'div',
            { className: 'react-app__top' },
            _react2.default.createElement(
              'header',
              { className: 'react-app__header' },
              _react2.default.createElement(
                'h2',
                { className: 'react-app__title' },
                'Search ',
                _react2.default.createElement(
                  'span',
                  { className: 'text-color' },
                  'Videos'
                )
              )
            ),
            _react2.default.createElement('input', { value: this.state.inputValue, onChange: this.updateKeyword, onKeyDown: this.keyword, type: 'text', className: 'search', placeholder: 'Search YouTube' }),
            _react2.default.createElement(
              'div',
              { className: 'titles-box' },
              _react2.default.createElement(
                'p',
                { className: 'react-app_subtitle' },
                'Search amazing videos for free'
              ),
              _react2.default.createElement(
                'p',
                { className: 'react-app_subtitle' },
                'Search amazing videos for free'
              )
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'videos' },
            listItem,
            buttons
          )
        )
      );
    }
  }]);

  return FormApp;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(FormApp, null), app);