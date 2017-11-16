"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require("styled-jsx/style.js");

var _style2 = _interopRequireDefault(_style);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/gusaiani/Documents/code/re-front/components/popup.js";


var Popup = function (_React$Component) {
  (0, _inherits3.default)(Popup, _React$Component);

  function Popup() {
    (0, _classCallCheck3.default)(this, Popup);

    return (0, _possibleConstructorReturn3.default)(this, (Popup.__proto__ || (0, _getPrototypeOf2.default)(Popup)).apply(this, arguments));
  }

  (0, _createClass3.default)(Popup, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "jsx-3036976142" + " " + "popup",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        }
      }, _react2.default.createElement("div", {
        className: "jsx-3036976142",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, _react2.default.createElement("button", { onClick: this.props.handleClose, className: "jsx-3036976142" + " " + "close",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, "\xD7"), this.props.children), _react2.default.createElement(_style2.default, {
        styleId: "3036976142",
        css: ".popup.jsx-3036976142{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:rgba(0,0,0,0.7);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:fixed;height:100vh;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;left:0;position:absolute;top:0;width:100vw;z-index:10;}.popup.jsx-3036976142>div.jsx-3036976142{background-color:white;border-radius:6px;padding:20px;position:relative;text-align:center;width:500px;}button.close.jsx-3036976142{background-color:transparent;color:#8c8c8c;float:right;font-size:40px;font-weight:lighter;line-height:36px;padding:4px 12px 10px;position:absolute;right:0;top:0;}button.close.jsx-3036976142:hover{background-color:#f0f0f0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV29CLEFBR2dDLEFBYUksQUFTTSxBQWFKLHVCQXJCUCxFQXNCcEIsSUFiZ0IsWUFSRCxFQVNELFdBUk0sQ0FTSCxlQUNLLEVBVEYsa0JBQ04sQUFTSyxHQTFCZ0IsU0FrQm5DLEtBU3dCLG1CQTFCVCxHQTJCSyxrQkFDVixRQUNGLE1BQ1IsdUNBN0JpQixlQUNGLGFBQ1UsbUdBQ2hCLE9BQ1csa0JBQ1osTUFDTSxZQUNELFdBQ2IiLCJmaWxlIjoiY29tcG9uZW50cy9wb3B1cC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ3VzYWlhbmkvRG9jdW1lbnRzL2NvZGUvcmUtZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIFBvcHVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcHVwXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjbG9zZVwiIG9uQ2xpY2s9e3RoaXMucHJvcHMuaGFuZGxlQ2xvc2V9PsOXPC9idXR0b24+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAucG9wdXAge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC43KTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgICAgei1pbmRleDogMTA7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5wb3B1cCA+IGRpdiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB3aWR0aDogNTAwcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnV0dG9uLmNsb3NlIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgY29sb3I6ICM4YzhjOGM7XG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICBmb250LXNpemU6IDQwcHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgICAgICAgICAgcGFkZGluZzogNHB4IDEycHggMTBweDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1dHRvbi5jbG9zZTpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICAgICAgICAgIH1cblxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBcbiJdfQ== */\n/*@ sourceURL=components/popup.js */"
      }));
    }
  }]);

  return Popup;
}(_react2.default.Component);

exports.default = Popup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcG9wdXAuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQb3B1cCIsInByb3BzIiwiaGFuZGxlQ2xvc2UiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7Ozs7Ozs7O0ksQUFFRDs7Ozs7Ozs7Ozs7NkJBQ0ssQUFDUDs2QkFDRSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQSxZQUEwQixTQUFTLEtBQUEsQUFBSyxNQUF4QyxBQUE4QyxpREFBOUMsQUFBa0I7O29CQUFsQjtzQkFBQTtBQUFBO1NBREYsQUFDRSxBQUNDLGNBQUEsQUFBSyxNQUhWLEFBQ0UsQUFFYztpQkFIaEI7YUFERixBQUNFLEFBaURIO0FBakRHOzs7OztFQUhjLGdCQUFNLEEsQUF1RDFCOztrQkFBQSxBQUFlIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ndXNhaWFuaS9Eb2N1bWVudHMvY29kZS9yZS1mcm9udCJ9