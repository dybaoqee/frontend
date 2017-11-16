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

var _reactNumberFormat = require('react-number-format');

var _reactNumberFormat2 = _interopRequireDefault(_reactNumberFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/components/listings/listing/header.js';


var ListingHeader = function (_React$Component) {
  (0, _inherits3.default)(ListingHeader, _React$Component);

  function ListingHeader() {
    (0, _classCallCheck3.default)(this, ListingHeader);

    return (0, _possibleConstructorReturn3.default)(this, (ListingHeader.__proto__ || (0, _getPrototypeOf2.default)(ListingHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListingHeader, [{
    key: 'switchPopup',
    value: function switchPopup() {
      console.log('Clicado em switchPopup');
    }
  }, {
    key: 'render',
    value: function render() {
      var listing = this.props.listing;

      return _react2.default.createElement('header', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement('h6', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, 'Apartamento'), _react2.default.createElement('p', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, listing.address.street), _react2.default.createElement('p', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, listing.address.neighborhood, ', ', listing.address.city)), _react2.default.createElement('div', {
        className: 'jsx-399663406',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, _react2.default.createElement(_reactNumberFormat2.default, { value: listing.price, displayType: 'text', thousandSeparator: '.', prefix: 'R$', decimalSeparator: ',', __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }))), _react2.default.createElement('button', { onClick: this.props.handleOpenPopup, className: 'jsx-399663406' + ' ' + 'green',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, 'Marcar Visita'), _react2.default.createElement(_style2.default, {
        styleId: '399663406',
        css: 'header.jsx-399663406{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:white;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding-left:0;padding-right:0;position:static;width:100%;}button.jsx-399663406{margin-right:20px;}header.jsx-399663406>div.jsx-399663406{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:768px;}h6.jsx-399663406{font-weight:normal;font-size:11px;margin:0;text-transform:uppercase;}p.jsx-399663406{margin:0;}p.jsx-399663406:first-of-type{font-size:18px;}p.jsx-399663406:last-of-type{font-size:11px;}@media (max-width:600px){header.jsx-399663406{-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:100vw;}header.jsx-399663406>div.jsx-399663406{-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;max-width:50vw;}header.jsx-399663406>div.jsx-399663406>div.jsx-399663406{margin-left:10px;}header.jsx-399663406>div.jsx-399663406>div.jsx-399663406:last-of-type{margin-top:10px;}header.jsx-399663406 button.jsx-399663406{margin-right:20px;margin-bottom:6px;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9oZWFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEJvQixBQUdnQyxBQVdELEFBSUMsQUFPQSxBQU9WLEFBSU0sQUFJQSxBQUtRLEFBTUUsQUFNTixBQUlELEFBSUUsU0FoQ3RCLE1BSUEsQUFJQSxDQXFCRSxDQUpBLENBM0NGLEFBbURzQixDQXhDTCxlQUNOLEVBd0NULE9BdkN5Qix5QkFDM0IseUJBekJtQixBQWVKLFFBMkJtQixRQU1SLENBL0NYLHlEQWVpQixpQkFkQSxHQStDYixlQUNqQixjQVBjLFlBQ2Qsc0RBM0JZLFlBQ2QsS0FmaUIsZUFDQyxnQkFDQSxnQkFDTCxXQUNiIiwiZmlsZSI6ImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE51bWJlckZvcm1hdCBmcm9tICdyZWFjdC1udW1iZXItZm9ybWF0J1xuXG5jbGFzcyBMaXN0aW5nSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3dpdGNoUG9wdXAoKSB7XG4gICAgY29uc29sZS5sb2coJ0NsaWNhZG8gZW0gc3dpdGNoUG9wdXAnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpc3RpbmcgfSA9IHRoaXMucHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8aGVhZGVyPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDY+QXBhcnRhbWVudG88L2g2PlxuICAgICAgICAgICAgPHA+e2xpc3RpbmcuYWRkcmVzcy5zdHJlZXR9PC9wPlxuICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgIHtsaXN0aW5nLmFkZHJlc3MubmVpZ2hib3Job29kfSwge2xpc3RpbmcuYWRkcmVzcy5jaXR5fVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8TnVtYmVyRm9ybWF0IHZhbHVlPXtsaXN0aW5nLnByaWNlfSBkaXNwbGF5VHlwZT17J3RleHQnfSB0aG91c2FuZFNlcGFyYXRvcj17Jy4nfSBwcmVmaXg9eydSJCd9IGRlY2ltYWxTZXBhcmF0b3I9eycsJ30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJncmVlblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMuaGFuZGxlT3BlblBvcHVwfT5cbiAgICAgICAgICBNYXJjYXIgVmlzaXRhXG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICBoZWFkZXIge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnV0dG9uIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBoZWFkZXIgPiBkaXYge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICB3aWR0aDogNzY4cHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaDYge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcCB7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcDpmaXJzdC1vZi10eXBlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwOmxhc3Qtb2YtdHlwZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgICBoZWFkZXIge1xuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWFkZXIgPiBkaXYge1xuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgbWF4LXdpZHRoOiA1MHZ3O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWFkZXIgPiBkaXYgPiBkaXYge1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZGVyID4gZGl2ID4gZGl2Omxhc3Qtb2YtdHlwZSB7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlYWRlciBidXR0b24ge1xuICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvaGVhZGVyPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0aW5nSGVhZGVyXG4iXX0= */\n/*@ sourceURL=components/listings/listing/header.js */'
      }));
    }
  }]);

  return ListingHeader;
}(_react2.default.Component);

exports.default = ListingHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9oZWFkZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJOdW1iZXJGb3JtYXQiLCJMaXN0aW5nSGVhZGVyIiwiY29uc29sZSIsImxvZyIsImxpc3RpbmciLCJwcm9wcyIsImFkZHJlc3MiLCJzdHJlZXQiLCJuZWlnaGJvcmhvb2QiLCJjaXR5IiwicHJpY2UiLCJoYW5kbGVPcGVuUG9wdXAiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7Ozs7Ozs7SSxBQUVEOzs7Ozs7Ozs7OztrQ0FDVSxBQUNaO2NBQUEsQUFBUSxJQUFSLEFBQVksQUFDYjs7Ozs2QkFFUTtVQUFBLEFBQ0MsVUFBWSxLQURiLEFBQ2tCLE1BRGxCLEFBQ0MsQUFFUjs7NkJBQ0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FERixBQUNFLEFBQ0EsZ0NBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFBSTtBQUFKO0FBQUEsaUJBQUksQUFBUSxRQUZkLEFBRUUsQUFBb0IsQUFDcEIseUJBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRztBQURIO0FBQUEsaUJBQ0csQUFBUSxRQURYLEFBQ21CLGNBQWdCLGNBQUEsQUFBUSxRQUwvQyxBQUNFLEFBR0UsQUFDbUQsQUFHckQsd0JBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyw2Q0FBYSxPQUFPLFFBQXJCLEFBQTZCLE9BQU8sYUFBcEMsQUFBaUQsUUFBUSxtQkFBekQsQUFBNEUsS0FBSyxRQUFqRixBQUF5RixNQUFNLGtCQUEvRixBQUFpSDtvQkFBakg7c0JBVk4sQUFDRSxBQVFFLEFBQ0UsQUFJSjtBQUpJOzRCQUlKLGNBQUEsWUFBMEIsU0FBUyxLQUFBLEFBQUssTUFBeEMsQUFBOEMsb0RBQTlDLEFBQWtCOztvQkFBbEI7c0JBQUE7QUFBQTtTQWRGLEFBY0U7aUJBZEY7YUFERixBQUNFLEFBeUZIO0FBekZHOzs7OztFQVRzQixnQkFBTSxBLEFBcUdsQzs7a0JBQUEsQUFBZSIsImZpbGUiOiJoZWFkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250In0=