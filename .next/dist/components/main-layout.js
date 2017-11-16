'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/components/main-layout.js';


var Layout = function Layout(props) {
  return _react2.default.createElement('div', {
    className: 'jsx-2800934885',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, _react2.default.createElement(_header2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }), _react2.default.createElement('main', {
    className: 'jsx-2800934885',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, props.children), _react2.default.createElement(_style2.default, {
    styleId: '2800934885',
    css: 'html{font-size:100%;}body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:1rem;line-height:1.5;}main>div{padding-top:60px;}button,.btn{background-color:#2c6e8e;border:none;border-radius:4px;color:white;cursor:pointer;font-size:13px;outline:none;padding:3px 15px 5px;text-decoration:none;-webkit-transition:background-color 0.10s ease;transition:background-color 0.10s ease;-webkit-transform:0.25;-ms-transform:0.25;transform:0.25;}button:hover,.btn:hover{background-color:#265f7b;text-decoration:none;}button.green{background:#24a11e;}button.green:hover{background:#1f8c1a;}button:disabled{opacity:0.5;}@media (max-width:600px){h1{font-size:22px;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFpbi1sYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU3VCLEFBR3dCLEFBSU4sQUFRUSxBQUtRLEFBZUEsQUFLTixBQUlBLEFBSVAsQUFLSyxTQTdDUCxHQXlDWixHQTdDQSxBQWtERSxFQXRDRixFQVAwRixBQWdDMUYsQUFJQSxNQXhCYyxBQWVTLFlBZEgsU0FlcEIsU0FkYyxZQUNHLGVBQ0EsZUFDRixLQWhCRSxRQWlCTSxPQWhCTCxjQWlCSyxFQWhCdkIsbUJBaUJ5QyxzRkFDeEIseURBQ2pCIiwiZmlsZSI6ImNvbXBvbmVudHMvbWFpbi1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlcidcblxuY29uc3QgTGF5b3V0ID0gKHByb3BzKSA9PiAoXG4gIDxkaXY+XG4gICAgPEhlYWRlciAvPlxuICAgIDxtYWluPlxuICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgIDwvbWFpbj5cblxuICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICBodG1sIHtcbiAgICAgICAgZm9udC1zaXplOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICBib2R5IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgIH1cblxuICAgICAgbWFpbiA+IGRpdiB7XG4gICAgICAgIHBhZGRpbmctdG9wOiA2MHB4O1xuICAgICAgfVxuXG4gICAgICBidXR0b24sXG4gICAgICAuYnRuIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJjNmU4ZTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIHBhZGRpbmc6IDNweCAxNXB4IDVweDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMTBzIGVhc2U7XG4gICAgICAgIHRyYW5zZm9ybTogMC4yNTtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uOmhvdmVyLFxuICAgICAgLmJ0bjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyNjVmN2I7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uLmdyZWVuIHtcbiAgICAgICAgYmFja2dyb3VuZDogIzI0YTExZTtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uLmdyZWVuOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogIzFmOGMxYTtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uOmRpc2FibGVkIHtcbiAgICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgICAgaDEge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IExheW91dFxuIl19 */\n/*@ sourceURL=components/main-layout.js */'
  }));
};

exports.default = Layout;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFpbi1sYXlvdXQuanMiXSwibmFtZXMiOlsiSGVhZGVyIiwiTGF5b3V0IiwicHJvcHMiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVk7Ozs7Ozs7OztBQUVuQixJQUFNLFNBQVMsU0FBVCxBQUFTLE9BQUEsQUFBQyxPQUFEO3lCQUNiLGNBQUE7ZUFBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRSxBQUFDOztnQkFBRDtrQkFERixBQUNFLEFBQ0E7QUFEQTtBQUFBLHNCQUNBLGNBQUE7ZUFBQTs7Z0JBQUE7a0JBQUEsQUFDRztBQURIO0FBQUEsV0FGRixBQUVFLEFBQ1M7YUFIWDtTQURhLEFBQ2I7QUFBQTtBQURGLEFBa0VBOztrQkFBQSxBQUFlIiwiZmlsZSI6Im1haW4tbGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ndXNhaWFuaS9Eb2N1bWVudHMvY29kZS9yZS1mcm9udCJ9