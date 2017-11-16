'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/components/listings/listing/listing-footer.js';


var ListingFooter = function (_React$Component) {
  (0, _inherits3.default)(ListingFooter, _React$Component);

  function ListingFooter() {
    (0, _classCallCheck3.default)(this, ListingFooter);

    return (0, _possibleConstructorReturn3.default)(this, (ListingFooter.__proto__ || (0, _getPrototypeOf2.default)(ListingFooter)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListingFooter, [{
    key: 'render',
    value: function render() {
      var listing = this.props.listing;

      return _react2.default.createElement('footer', {
        className: 'jsx-3377435885',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3377435885',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, _react2.default.createElement('a', {
        className: 'jsx-3377435885',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, '\u2039 Ver Todos os Im\xF3veis')), _react2.default.createElement('a', { href: 'mailto:contato@emcasa.com', className: 'jsx-3377435885',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, 'contato@emcasa.com')), _react2.default.createElement('button', {
        className: 'jsx-3377435885' + ' ' + 'green',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, 'Marcar Visita'), _react2.default.createElement(_style2.default, {
        styleId: '3377435885',
        css: 'footer.jsx-3377435885{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-top:1px solid #eee;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin-top:30px;padding:20px 20px;}a.jsx-3377435885{color:#2c6e8e;font-size:12px;margin-right:30px;text-decoration:none;}@media (max-width:600px){footer.jsx-3377435885{width:calc(100vw - 40px);}div.jsx-3377435885{width:calc(100vw - 180px);}a.jsx-3377435885{display:none;float:left;}a.jsx-3377435885:first-of-type{display:block;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9saXN0aW5nLWZvb3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQm9CLEFBR2dDLEFBU0wsQUFRYSxBQUlDLEFBSWIsQUFLQyxhQUpILENBaEJFLEFBcUJmLFVBSkEsQ0FUQSxDQUlBLEdBWGtCLGtCQUNHLHFCQUN2Qix5QkFaNEIsMEJBQ2IsMEVBQ2lCLG1IQUNkLGdCQUNFLGtCQUNwQiIsImZpbGUiOiJjb21wb25lbnRzL2xpc3RpbmdzL2xpc3RpbmcvbGlzdGluZy1mb290ZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuXG5jbGFzcyBMaXN0aW5nRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGlzdGluZyB9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxmb290ZXI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgIDxhPuKAuSBWZXIgVG9kb3Mgb3MgSW3Ds3ZlaXM8L2E+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86Y29udGF0b0BlbWNhc2EuY29tXCI+Y29udGF0b0BlbWNhc2EuY29tPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJncmVlblwiPlxuICAgICAgICAgIE1hcmNhciBWaXNpdGFcbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIGZvb3RlciB7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMzBweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHggMjBweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhIHtcbiAgICAgICAgICAgIGNvbG9yOiAjMmM2ZThlO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAgICAgZm9vdGVyIHtcbiAgICAgICAgICAgICAgd2lkdGg6IGNhbGMoMTAwdncgLSA0MHB4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGl2IHtcbiAgICAgICAgICAgICAgd2lkdGg6IGNhbGMoMTAwdncgLSAxODBweCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGEge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYTpmaXJzdC1vZi10eXBlIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdGluZ0Zvb3RlclxuIl19 */\n/*@ sourceURL=components/listings/listing/listing-footer.js */'
      }));
    }
  }]);

  return ListingFooter;
}(_react2.default.Component);

exports.default = ListingFooter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9saXN0aW5nLWZvb3Rlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkxpbmsiLCJMaXN0aW5nRm9vdGVyIiwibGlzdGluZyIsInByb3BzIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7Ozs7Ozs7O0ksQUFFRDs7Ozs7Ozs7Ozs7NkJBQ0s7VUFBQSxBQUNDLFVBQVksS0FEYixBQUNrQixNQURsQixBQUNDLEFBRVI7OzZCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyxnQ0FBSyxNQUFOLEFBQVc7b0JBQVg7c0JBQUEsQUFDRTtBQURGO3lCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUZKLEFBQ0UsQUFDRSxBQUVGLG9EQUFBLGNBQUEsT0FBRyxNQUFILEFBQVEsd0NBQVI7O29CQUFBO3NCQUFBO0FBQUE7U0FMSixBQUNFLEFBSUUsQUFFRix3Q0FBQSxjQUFBOzRDQUFBLEFBQWtCOztvQkFBbEI7c0JBQUE7QUFBQTtBQUFBLFNBUEYsQUFPRTtpQkFQRjthQURGLEFBQ0UsQUFpREg7QUFqREc7Ozs7O0VBTHNCLGdCQUFNLEEsQUF5RGxDOztrQkFBQSxBQUFlIiwiZmlsZSI6Imxpc3RpbmctZm9vdGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ndXNhaWFuaS9Eb2N1bWVudHMvY29kZS9yZS1mcm9udCJ9