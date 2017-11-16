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

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/components/listings/listing_table.js';


var ListingTable = function (_React$Component) {
  (0, _inherits3.default)(ListingTable, _React$Component);

  function ListingTable() {
    (0, _classCallCheck3.default)(this, ListingTable);

    return (0, _possibleConstructorReturn3.default)(this, (ListingTable.__proto__ || (0, _getPrototypeOf2.default)(ListingTable)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListingTable, [{
    key: 'render',
    value: function render() {
      var listing = this.props.listing;

      var price_per_square_meter = Math.floor(listing.price / listing.area);

      return _react2.default.createElement('table', { cellSpacing: '0', className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, _react2.default.createElement('tbody', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, _react2.default.createElement('tr', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, 'Quartos'), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, listing.rooms), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, 'Vagas Garagem'), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, listing.garage_spots)), _react2.default.createElement('tr', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, 'Banheiros'), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, listing.bathrooms), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, 'Andar'), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, listing.floor)), _react2.default.createElement('tr', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, '\xC1rea'), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, listing.area), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, 'Pre\xE7o/m\xB2'), _react2.default.createElement('td', {
        className: 'jsx-3863369480',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement(_reactNumberFormat2.default, { value: price_per_square_meter, displayType: 'text', thousandSeparator: '.', prefix: 'R$', decimalSeparator: ',', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      })))), _react2.default.createElement(_style2.default, {
        styleId: '2197214349',
        css: 'table.jsx-3863369480{border-bottom:1px solid #eee;font-size:13px;margin:20px 0 0;width:100%;}table.jsx-3863369480 tr.jsx-3863369480 td.jsx-3863369480{border-top:1px solid #eee;padding:4px 10px;}table.jsx-3863369480 tr.jsx-3863369480 td.jsx-3863369480:nth-of-type(2n){font-weight:bold;text-align:right;}table.jsx-3863369480 tr.jsx-3863369480 td.jsx-3863369480:nth-of-type(2n-1){color:#8c8c8c;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZ190YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQ2tCLEFBR3dDLEFBUTdCLEFBSWlCLEFBS0gsY0FDaEIsR0FMbUIsU0FMQSxHQVBGLEtBYWpCLFNBTEEsQ0FQa0IsZ0JBQ0wsV0FDYiIsImZpbGUiOiJjb21wb25lbnRzL2xpc3RpbmdzL2xpc3RpbmdfdGFibGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE51bWJlckZvcm1hdCBmcm9tICdyZWFjdC1udW1iZXItZm9ybWF0J1xuXG5jbGFzcyBMaXN0aW5nVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsaXN0aW5nIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgcHJpY2VfcGVyX3NxdWFyZV9tZXRlciA9IE1hdGguZmxvb3IobGlzdGluZy5wcmljZSAvIGxpc3RpbmcuYXJlYSlcblxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2VsbFNwYWNpbmc9XCIwXCI+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+UXVhcnRvczwvdGQ+XG4gICAgICAgICAgICA8dGQ+e2xpc3Rpbmcucm9vbXN9PC90ZD5cbiAgICAgICAgICAgIDx0ZD5WYWdhcyBHYXJhZ2VtPC90ZD5cbiAgICAgICAgICAgIDx0ZD57bGlzdGluZy5nYXJhZ2Vfc3BvdHN9PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD5CYW5oZWlyb3M8L3RkPlxuICAgICAgICAgICAgPHRkPntsaXN0aW5nLmJhdGhyb29tc308L3RkPlxuICAgICAgICAgICAgPHRkPkFuZGFyPC90ZD5cbiAgICAgICAgICAgIDx0ZD57bGlzdGluZy5mbG9vcn08L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPsOBcmVhPC90ZD5cbiAgICAgICAgICAgIDx0ZD57bGlzdGluZy5hcmVhfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+UHJlw6dvL23CsjwvdGQ+XG4gICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXQgdmFsdWU9e3ByaWNlX3Blcl9zcXVhcmVfbWV0ZXJ9IGRpc3BsYXlUeXBlPXsndGV4dCd9IHRob3VzYW5kU2VwYXJhdG9yPXsnLid9IHByZWZpeD17J1IkJ30gZGVjaW1hbFNlcGFyYXRvcj17JywnfSAvPlxuICAgICAgICAgICAgPC90ZD5cblxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIHRhYmxlIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcbiAgICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgICAgbWFyZ2luOiAyMHB4IDAgMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlIHRyIHRkIHtcbiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZVxuICAgICAgICAgIHBhZGRpbmc6IDRweCAxMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGUgdHIgdGQ6bnRoLW9mLXR5cGUoMm4pIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlIHRyIHRkOm50aC1vZi10eXBlKDJuLTEpIHtcbiAgICAgICAgICBjb2xvcjogIzhjOGM4YztcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgICAgICAubGlzdGluZ3MgdGFibGUge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgPC90YWJsZT5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdGluZ1RhYmxlXG5cblxuIl19 */\n/*@ sourceURL=components/listings/listing_table.js */'
      }), _react2.default.createElement(_style2.default, {
        styleId: '206132396',
        css: '@media (max-width:600px){.listings table{display:none;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZ190YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3RHlCLEFBSTBCLGFBQ2YiLCJmaWxlIjoiY29tcG9uZW50cy9saXN0aW5ncy9saXN0aW5nX3RhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ndXNhaWFuaS9Eb2N1bWVudHMvY29kZS9yZS1mcm9udCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBOdW1iZXJGb3JtYXQgZnJvbSAncmVhY3QtbnVtYmVyLWZvcm1hdCdcblxuY2xhc3MgTGlzdGluZ1RhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGlzdGluZyB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHByaWNlX3Blcl9zcXVhcmVfbWV0ZXIgPSBNYXRoLmZsb29yKGxpc3RpbmcucHJpY2UgLyBsaXN0aW5nLmFyZWEpXG5cbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGNlbGxTcGFjaW5nPVwiMFwiPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPlF1YXJ0b3M8L3RkPlxuICAgICAgICAgICAgPHRkPntsaXN0aW5nLnJvb21zfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+VmFnYXMgR2FyYWdlbTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e2xpc3RpbmcuZ2FyYWdlX3Nwb3RzfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+QmFuaGVpcm9zPC90ZD5cbiAgICAgICAgICAgIDx0ZD57bGlzdGluZy5iYXRocm9vbXN9PC90ZD5cbiAgICAgICAgICAgIDx0ZD5BbmRhcjwvdGQ+XG4gICAgICAgICAgICA8dGQ+e2xpc3RpbmcuZmxvb3J9PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD7DgXJlYTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e2xpc3RpbmcuYXJlYX08L3RkPlxuICAgICAgICAgICAgPHRkPlByZcOnby9twrI8L3RkPlxuICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICA8TnVtYmVyRm9ybWF0IHZhbHVlPXtwcmljZV9wZXJfc3F1YXJlX21ldGVyfSBkaXNwbGF5VHlwZT17J3RleHQnfSB0aG91c2FuZFNlcGFyYXRvcj17Jy4nfSBwcmVmaXg9eydSJCd9IGRlY2ltYWxTZXBhcmF0b3I9eycsJ30gLz5cbiAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICB0YWJsZSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XG4gICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICAgIG1hcmdpbjogMjBweCAwIDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZSB0ciB0ZCB7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWVcbiAgICAgICAgICBwYWRkaW5nOiA0cHggMTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlIHRyIHRkOm50aC1vZi10eXBlKDJuKSB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZSB0ciB0ZDpudGgtb2YtdHlwZSgybi0xKSB7XG4gICAgICAgICAgY29sb3I6ICM4YzhjOGM7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgLmxpc3RpbmdzIHRhYmxlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG5cbiAgICAgIDwvdGFibGU+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RpbmdUYWJsZVxuXG5cbiJdfQ== */\n/*@ sourceURL=components/listings/listing_table.js */'
      }));
    }
  }]);

  return ListingTable;
}(_react2.default.Component);

exports.default = ListingTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZ190YWJsZS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIk51bWJlckZvcm1hdCIsIkxpc3RpbmdUYWJsZSIsImxpc3RpbmciLCJwcm9wcyIsInByaWNlX3Blcl9zcXVhcmVfbWV0ZXIiLCJNYXRoIiwiZmxvb3IiLCJwcmljZSIsImFyZWEiLCJyb29tcyIsImdhcmFnZV9zcG90cyIsImJhdGhyb29tcyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7Ozs7OztJLEFBRUQ7Ozs7Ozs7Ozs7OzZCQUNLO1VBQUEsQUFDQyxVQUFZLEtBRGIsQUFDa0IsTUFEbEIsQUFDQyxBQUNSOztVQUFNLHlCQUF5QixLQUFBLEFBQUssTUFBTSxRQUFBLEFBQVEsUUFBUSxRQUExRCxBQUErQixBQUFtQyxBQUVsRTs7NkJBQ0UsY0FBQSxXQUFPLGFBQVAsQUFBbUIsZ0JBQW5COztvQkFBQTtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FERixBQUNFLEFBQ0EsNEJBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFBSztBQUFMO0FBQUEsaUJBRkYsQUFFRSxBQUFhLEFBQ2Isd0JBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBSEYsQUFHRSxBQUNBLGtDQUFBLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQUs7QUFBTDtBQUFBLGlCQUxKLEFBQ0UsQUFJRSxBQUFhLEFBRWYsZ0NBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBREYsQUFDRSxBQUNBLDhCQUFBLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQUs7QUFBTDtBQUFBLGlCQUZGLEFBRUUsQUFBYSxBQUNiLDRCQUFBLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUhGLEFBR0UsQUFDQSwwQkFBQSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUFLO0FBQUw7QUFBQSxpQkFYSixBQU9FLEFBSUUsQUFBYSxBQUVmLHlCQUFBLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQURGLEFBQ0UsQUFDQSw0QkFBQSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQSxBQUFLO0FBQUw7QUFBQSxpQkFGRixBQUVFLEFBQWEsQUFDYix1QkFBQSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FIRixBQUdFLEFBQ0EsbUNBQUEsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyw2Q0FBYSxPQUFkLEFBQXFCLHdCQUF3QixhQUE3QyxBQUEwRCxRQUFRLG1CQUFsRSxBQUFxRixLQUFLLFFBQTFGLEFBQWtHLE1BQU0sa0JBQXhHLEFBQTBIO29CQUExSDtzQkFuQlIsQUFDRSxBQWFFLEFBSUUsQUFDRTtBQUFBOztpQkFuQlI7YUFBQTtBQUFBO2lCQUFBO2FBREYsQUFDRSxBQXlESDtBQXpERzs7Ozs7RUFOcUIsZ0JBQU0sQSxBQWtFakM7O2tCQUFBLEFBQWUiLCJmaWxlIjoibGlzdGluZ190YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ3VzYWlhbmkvRG9jdW1lbnRzL2NvZGUvcmUtZnJvbnQifQ==