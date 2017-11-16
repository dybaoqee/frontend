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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGmaps = require('react-gmaps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/components/map-container.js';


var params = { v: '3.exp', key: 'AIzaSyDmYQLTPwsDPtErGWTgiejz17QCw39MEVQ' };

var MapContainer = function (_React$Component) {
  (0, _inherits3.default)(MapContainer, _React$Component);

  function MapContainer() {
    (0, _classCallCheck3.default)(this, MapContainer);

    return (0, _possibleConstructorReturn3.default)(this, (MapContainer.__proto__ || (0, _getPrototypeOf2.default)(MapContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(MapContainer, [{
    key: 'onMapCreated',
    value: function onMapCreated(map) {
      map.setOptions({
        disableDefaultUI: true
      });
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      console.log('onClick', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          lat = _props.lat,
          lng = _props.lng,
          listings = _props.listings;

      return _react2.default.createElement(_reactGmaps.Gmaps, {
        width: width,
        height: height,
        lat: lat ? lat : '-22.9608099',
        lng: lng ? lng : '-43.2096142',
        zoom: 15,
        loadingMessage: ' ',
        params: params, __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, _react2.default.createElement(_reactGmaps.Marker, {
        lat: lat,
        lng: lng, __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }), listings && listings.map(function (listing, i) {
        return _react2.default.createElement(_reactGmaps.Marker, { key: i, lat: listing.address.lat, lng: listing.address.lng, __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        });
      }));
    }
  }]);

  return MapContainer;
}(_react2.default.Component);

exports.default = MapContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFwLWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkdtYXBzIiwiTWFya2VyIiwicGFyYW1zIiwidiIsImtleSIsIk1hcENvbnRhaW5lciIsIm1hcCIsInNldE9wdGlvbnMiLCJkaXNhYmxlRGVmYXVsdFVJIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsImhlaWdodCIsIndpZHRoIiwibGF0IiwibG5nIiwibGlzdGluZ3MiLCJsaXN0aW5nIiwiaSIsImFkZHJlc3MiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVEsQUFBTzs7Ozs7OztBQUVmLElBQU0sU0FBUyxFQUFDLEdBQUQsQUFBSSxTQUFTLEtBQTVCLEFBQWUsQUFBa0I7O0ksQUFFM0I7Ozs7Ozs7Ozs7O2lDQUNTLEEsS0FBSyxBQUNoQjtVQUFBLEFBQUk7MEJBQUosQUFBZSxBQUNLLEFBRXJCO0FBSGdCLEFBQ2I7Ozs7NEIsQUFJSSxHQUFHLEFBQ1Q7Y0FBQSxBQUFRLElBQVIsQUFBWSxXQUFaLEFBQXVCLEFBQ3hCOzs7OzZCQUVRO21CQUNxQyxLQURyQyxBQUMwQztVQUQxQyxBQUNBLGdCQURBLEFBQ0E7VUFEQSxBQUNRLGVBRFIsQUFDUTtVQURSLEFBQ2UsYUFEZixBQUNlO1VBRGYsQUFDb0IsYUFEcEIsQUFDb0I7VUFEcEIsQUFDeUIsa0JBRHpCLEFBQ3lCLEFBRWhDOzs2QkFDRSxBQUFDO2VBQUQsQUFDUyxBQUNQO2dCQUZGLEFBRVUsQUFDUjthQUFLLE1BQUEsQUFBTSxNQUhiLEFBR21CLEFBQ2pCO2FBQUssTUFBQSxBQUFNLE1BSmIsQUFJbUIsQUFDakI7Y0FMRixBQUtRLEFBQ047d0JBTkYsQUFNa0IsQUFDaEI7Z0JBUEYsQUFPVTtvQkFQVjtzQkFBQSxBQVFFO0FBUkY7QUFDRSxPQURGLGtCQVFFLEFBQUM7YUFBRCxBQUNPLEFBQ0w7YUFGRixBQUVPO29CQUZQO3NCQVJGLEFBUUUsQUFJQztBQUpEO0FBQ0UsK0JBR1csQUFBUyxJQUFJLFVBQUEsQUFBQyxTQUFELEFBQVUsR0FBTSxBQUN4QzsrQkFBTyxBQUFDLG9DQUFPLEtBQVIsQUFBYSxHQUFHLEtBQUssUUFBQSxBQUFRLFFBQTdCLEFBQXFDLEtBQUssS0FBSyxRQUFBLEFBQVEsUUFBdkQsQUFBK0Q7c0JBQS9EO3dCQUFQLEFBQU8sQUFDUjtBQURRO1NBQUE7QUFkYixBQUNFLEFBWWUsQUFNbEIsT0FOa0I7Ozs7O0VBM0JNLGdCQUFNLEEsQUFvQ2pDOztrQkFBQSxBQUFlIiwiZmlsZSI6Im1hcC1jb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250In0=