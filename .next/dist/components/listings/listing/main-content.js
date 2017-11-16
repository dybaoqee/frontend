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

var _listing_table = require('../listing_table');

var _listing_table2 = _interopRequireDefault(_listing_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/components/listings/listing/main-content.js';


var ListingMainContent = function (_React$Component) {
  (0, _inherits3.default)(ListingMainContent, _React$Component);

  function ListingMainContent() {
    (0, _classCallCheck3.default)(this, ListingMainContent);

    return (0, _possibleConstructorReturn3.default)(this, (ListingMainContent.__proto__ || (0, _getPrototypeOf2.default)(ListingMainContent)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListingMainContent, [{
    key: 'render',
    value: function render() {
      var listing = this.props.listing;

      return _react2.default.createElement('div', {
        className: 'jsx-3981567780' + ' ' + 'main-content',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, _react2.default.createElement('img', { src: 'https://s3-sa-east-1.amazonaws.com/emcasa/listings/original/' + listing.photo, alt: 'Listing Main Pic', className: 'jsx-3981567780',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }), _react2.default.createElement('div', {
        className: 'jsx-3981567780',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3981567780',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, listing.description), _react2.default.createElement(_listing_table2.default, { listing: listing, __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      })), _react2.default.createElement(_style2.default, {
        styleId: '3981567780',
        css: '.main-content.jsx-3981567780{-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-bottom:40px;margin-top:30px;}.main-content.jsx-3981567780>*.jsx-3981567780{float:left;}.main-content.jsx-3981567780>div.jsx-3981567780{width:393px;}.main-content.jsx-3981567780>div.jsx-3981567780>div.jsx-3981567780{margin:20px 20px 40px;}img.jsx-3981567780{width:787px;}@media (max-width:600px){.main-content.jsx-3981567780{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100vw;}.main-content.jsx-3981567780 img.jsx-3981567780{width:100vw;}.main-content.jsx-3981567780>div.jsx-3981567780{width:100vw;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9tYWluLWNvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0JvQixBQUdvQyxBQU9aLEFBSUMsQUFJVSxBQUlWLEFBS1ksQUFJVixBQUdFLFdBdkJsQixDQUlBLEFBUUEsQUFTRSxBQUdFLFVBaEJKLHdEQVNnQixZQUNkLG1CQXpCYSwwRUFDTSxtQkFDSCxnQkFDbEIiLCJmaWxlIjoiY29tcG9uZW50cy9saXN0aW5ncy9saXN0aW5nL21haW4tY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ3VzYWlhbmkvRG9jdW1lbnRzL2NvZGUvcmUtZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBMaXN0aW5nVGFibGUgZnJvbSAnLi4vbGlzdGluZ190YWJsZSdcblxuY2xhc3MgTGlzdGluZ01haW5Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGlzdGluZyB9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250ZW50XCI+XG4gICAgICAgIDxpbWcgc3JjPXtwcm9jZXNzLmVudi5SRUFDVF9BUFBfUzNfQkFTRV9VUkwgKyAnbGlzdGluZ3Mvb3JpZ2luYWwvJyArIGxpc3RpbmcucGhvdG99IGFsdD1cIkxpc3RpbmcgTWFpbiBQaWNcIi8+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2xpc3RpbmcuZGVzY3JpcHRpb259XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8TGlzdGluZ1RhYmxlIGxpc3Rpbmc9e2xpc3Rpbmd9Lz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5tYWluLWNvbnRlbnQge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm1haW4tY29udGVudCA+ICoge1xuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm1haW4tY29udGVudCA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogMzkzcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLm1haW4tY29udGVudCA+IGRpdiA+IGRpdiB7XG4gICAgICAgICAgICBtYXJnaW46IDIwcHggMjBweCA0MHB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGltZyB7XG4gICAgICAgICAgICB3aWR0aDogNzg3cHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgICAubWFpbi1jb250ZW50IHtcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1haW4tY29udGVudCBpbWcge1xuICAgICAgICAgICAgICB3aWR0aDogMTAwdnc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubWFpbi1jb250ZW50ICA+IGRpdiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdGluZ01haW5Db250ZW50XG4iXX0= */\n/*@ sourceURL=components/listings/listing/main-content.js */'
      }));
    }
  }]);

  return ListingMainContent;
}(_react2.default.Component);

exports.default = ListingMainContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9tYWluLWNvbnRlbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJMaXN0aW5nVGFibGUiLCJMaXN0aW5nTWFpbkNvbnRlbnQiLCJsaXN0aW5nIiwicHJvcHMiLCJwaG90byIsImRlc2NyaXB0aW9uIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBRVAsQUFBTyxBQUFrQjs7Ozs7Ozs7O0lBRW5CLEE7Ozs7Ozs7Ozs7OzZCQUNLO1VBQUEsQUFDQyxVQUFZLEtBRGIsQUFDa0IsTUFEbEIsQUFDQyxBQUVSOzs2QkFDRSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEseUNBQ08sS0FBSyxpRUFBMkQsUUFBckUsQUFBNkUsT0FBTyxLQUFwRixBQUF3RiwrQkFBeEY7O29CQUFBO3NCQURGLEFBQ0UsQUFFQTtBQUZBOzBCQUVBLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGlCQURGLEFBQ0UsQUFDVyxBQUdYLDhCQUFBLEFBQUMseUNBQWEsU0FBZCxBQUF1QjtvQkFBdkI7c0JBUkosQUFHRSxBQUtFO0FBQUE7O2lCQVJKO2FBREYsQUFDRSxBQW1ESDtBQW5ERzs7Ozs7RUFMMkIsZ0JBQU0sQSxBQTJEdkM7O2tCQUFBLEFBQWUiLCJmaWxlIjoibWFpbi1jb250ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ndXNhaWFuaS9Eb2N1bWVudHMvY29kZS9yZS1mcm9udCJ9