'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

require('isomorphic-unfetch');

var _reactForm = require('react-form');

var _mainLayout = require('../components/main-layout');

var _mainLayout2 = _interopRequireDefault(_mainLayout);

var _header = require('../components/listings/listing/header');

var _header2 = _interopRequireDefault(_header);

var _mainContent = require('../components/listings/listing/main-content');

var _mainContent2 = _interopRequireDefault(_mainContent);

var _listingFooter = require('../components/listings/listing/listing-footer');

var _listingFooter2 = _interopRequireDefault(_listingFooter);

var _mapContainer = require('../components/map-container');

var _mapContainer2 = _interopRequireDefault(_mapContainer);

var _popup = require('../components/popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/gusaiani/Documents/code/re-front/pages/listing.js?entry';


var Listing = function (_React$Component) {
  (0, _inherits3.default)(Listing, _React$Component);

  function Listing(props) {
    (0, _classCallCheck3.default)(this, Listing);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Listing.__proto__ || (0, _getPrototypeOf2.default)(Listing)).call(this, props));

    _this.openPopup = function () {
      _this.setState({ showPopup: true });
    };

    _this.closePopup = function () {
      _this.setState({ showPopup: false });
    };

    _this.closeSuccessPostPopup = function () {
      _this.setState({ showPostSuccessPopup: false });
    };

    _this.onChange = function (e) {
      var state = _this.state;
      state[e.target.name] = e.target.value;
      _this.setState(state);
    };

    _this.onSubmit = function (e) {
      e.preventDefault();

      var id = _this.props.listing.id;
      var _this$state = _this.state,
          name = _this$state.name,
          email = _this$state.email,
          phone = _this$state.phone;

      return fetch('http://localhost:4000/listings_users', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: (0, _stringify2.default)({
          user: {
            name: name,
            email: email,
            phone: phone
          },
          listing: {
            id: id
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        _this.setState({ showPopup: false, showPostSuccessPopup: true });
      });
    };

    _this.state = {
      name: '',
      email: '',
      phone: '',
      showPopup: false,
      showPostSuccessPopup: false
    };
    return _this;
  }

  (0, _createClass3.default)(Listing, [{
    key: 'render',
    value: function render() {
      var listing = this.props.listing;
      var _state = this.state,
          showPopup = _state.showPopup,
          showPostSuccessPopup = _state.showPostSuccessPopup,
          name = _state.name,
          email = _state.email,
          phone = _state.phone;

      var imgSrc = 'https://s3-sa-east-1.amazonaws.com/emcasa/listings/original/' + listing.photo;

      return _react2.default.createElement(_mainLayout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }, _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }, _react2.default.createElement('title', {
        className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }, 'EmCasa - Compre e venda im\xF3veis na Zona Sul do Rio de Janeiro'), _react2.default.createElement('meta', { property: 'og:description', content: listing.description, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }), _react2.default.createElement('meta', { property: 'og:image', content: imgSrc, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      })), _react2.default.createElement('div', {
        className: 'jsx-3586289263' + ' ' + 'listing',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, _react2.default.createElement(_header2.default, { listing: listing, handleOpenPopup: this.openPopup, __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }), _react2.default.createElement(_mainContent2.default, { listing: listing, __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }), _react2.default.createElement(_reactResponsive2.default, { query: '(max-width: 600px)', __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }, _react2.default.createElement(_mapContainer2.default, { lat: listing.address.lat,
        lng: listing.address.lng,
        width: '100vw',
        height: '300px', __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      })), _react2.default.createElement(_reactResponsive2.default, { query: '(min-width: 601px)', __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, _react2.default.createElement(_mapContainer2.default, { lat: listing.address.lat,
        lng: listing.address.lng,
        width: '786.66667px',
        height: '500px', __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      })), _react2.default.createElement(_listingFooter2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }), showPopup && _react2.default.createElement(_popup2.default, { handleClose: this.closePopup, __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, _react2.default.createElement('h1', {
        className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }, 'Marcar Visita'), _react2.default.createElement('p', {
        className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        }
      }, 'Insira seu nome, email e telefone com DDD e', _react2.default.createElement('br', {
        className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        }
      }), 'entraremos em contato em minutos.'), _react2.default.createElement('form', { onSubmit: this.onSubmit, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, _react2.default.createElement('input', { type: 'text', name: 'name', placeholder: 'Name', value: name, onChange: this.onChange, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }), _react2.default.createElement('input', { type: 'text', name: 'email', placeholder: 'Email', value: email, onChange: this.onChange, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }), _react2.default.createElement('input', { type: 'text', name: 'phone', placeholder: 'Telefone', value: phone, onChange: this.onChange, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }), _react2.default.createElement('button', { type: 'submit', className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }, 'Enviar'))), showPostSuccessPopup && _react2.default.createElement(_popup2.default, { handleClose: this.closeSuccessPostPopup, __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        }
      }, _react2.default.createElement('h1', {
        className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        }
      }, 'Agente EmCasa Notificado'), _react2.default.createElement('p', {
        className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      }, 'Entraremos em contato o mais r\xE1pido poss\xEDvel para agendarmos uma visita!'), _react2.default.createElement('button', { onClick: this.closeSuccessPostPopup, className: 'jsx-3586289263',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        }
      }, 'Fechar'))), _react2.default.createElement(_style2.default, {
        styleId: '3586289263',
        css: '.listing.jsx-3586289263{margin:0 auto;max-width:100vw;width:1180px;}input[type=text].jsx-3586289263{border:1px solid #ccc;clear:both;display:block;font-size:14px;margin:0 auto 10px;padding:10px;width:350px;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2xpc3RpbmcuanM/ZW50cnkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMElvQixBQUcyQixBQU1RLGNBTE4sUUFNTCxRQUxFLEdBTUMsVUFMaEIsSUFNaUIsZUFDSSxtQkFDTixhQUNELFlBQ2QiLCJmaWxlIjoicGFnZXMvbGlzdGluZy5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ3VzYWlhbmkvRG9jdW1lbnRzL2NvZGUvcmUtZnJvbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tICdyZWFjdC1yZXNwb25zaXZlJ1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCAnaXNvbW9ycGhpYy11bmZldGNoJ1xuXG5pbXBvcnQgeyBGb3JtLCBUZXh0LCBSYWRpbywgUmFkaW9Hcm91cCwgU2VsZWN0LCBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWZvcm0nXG5cbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9tYWluLWxheW91dCdcbmltcG9ydCBMaXN0aW5nSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9oZWFkZXInXG5pbXBvcnQgTGlzdGluZ01haW5Db250ZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdGluZ3MvbGlzdGluZy9tYWluLWNvbnRlbnQnXG5pbXBvcnQgTGlzdGluZ0Zvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2xpc3RpbmdzL2xpc3RpbmcvbGlzdGluZy1mb290ZXInXG5pbXBvcnQgTWFwQ29udGFpbmVyIGZyb20gXCIuLi9jb21wb25lbnRzL21hcC1jb250YWluZXJcIlxuaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL3BvcHVwXCJcblxuY2xhc3MgTGlzdGluZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgZW1haWw6ICcnLFxuICAgICAgcGhvbmU6ICcnLFxuICAgICAgc2hvd1BvcHVwOiBmYWxzZSxcbiAgICAgIHNob3dQb3N0U3VjY2Vzc1BvcHVwOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY29udGV4dCkge1xuICAgIGNvbnN0IHsgaWQsIHNob3dQb3B1cCB9ID0gY29udGV4dC5xdWVyeVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52LlJFQUNUX0FQUF9BUElfVVJMICsgJ2xpc3RpbmdzLycgKyBpZClcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzLmpzb24oKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpc3Rpbmc6IGpzb24uZGF0YVxuICAgIH1cbiAgfVxuXG4gIG9wZW5Qb3B1cCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93UG9wdXA6IHRydWV9KVxuICB9XG5cbiAgY2xvc2VQb3B1cCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93UG9wdXA6IGZhbHNlfSlcbiAgfVxuXG4gIGNsb3NlU3VjY2Vzc1Bvc3RQb3B1cCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93UG9zdFN1Y2Nlc3NQb3B1cDogZmFsc2V9KVxuICB9XG5cbiAgb25DaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZVxuICAgIHN0YXRlW2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQudmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKVxuICB9XG5cbiAgb25TdWJtaXQgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgY29uc3QgeyBpZCB9ID0gdGhpcy5wcm9wcy5saXN0aW5nXG4gICAgY29uc3QgeyBuYW1lLCBlbWFpbCwgcGhvbmUgfSA9IHRoaXMuc3RhdGVcblxuICAgIHJldHVybiBmZXRjaChwcm9jZXNzLmVudi5SRUFDVF9BUFBfQVBJX1VSTCArICdsaXN0aW5nc191c2VycycsIHtcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgcGhvbmU6IHBob25lXG4gICAgICAgIH0sXG4gICAgICAgIGxpc3Rpbmc6IHtcbiAgICAgICAgICBpZDogaWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7IHRoaXMuc2V0U3RhdGUoeyBzaG93UG9wdXA6IGZhbHNlLCBzaG93UG9zdFN1Y2Nlc3NQb3B1cDogdHJ1ZSB9KSB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGlzdGluZyB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgc2hvd1BvcHVwLCBzaG93UG9zdFN1Y2Nlc3NQb3B1cCwgbmFtZSwgZW1haWwsIHBob25lIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgaW1nU3JjID0gcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1MzX0JBU0VfVVJMICsgJ2xpc3RpbmdzL29yaWdpbmFsLycgKyBsaXN0aW5nLnBob3RvXG5cbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPHRpdGxlPkVtQ2FzYSAtIENvbXByZSBlIHZlbmRhIGltw7N2ZWlzIG5hIFpvbmEgU3VsIGRvIFJpbyBkZSBKYW5laXJvPC90aXRsZT5cbiAgICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD17bGlzdGluZy5kZXNjcmlwdGlvbn0vPlxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PXtpbWdTcmN9Lz5cbiAgICAgICAgPC9IZWFkPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZ1wiPlxuICAgICAgICAgIDxMaXN0aW5nSGVhZGVyIGxpc3Rpbmc9e2xpc3Rpbmd9IGhhbmRsZU9wZW5Qb3B1cD17dGhpcy5vcGVuUG9wdXB9Lz5cbiAgICAgICAgICA8TGlzdGluZ01haW5Db250ZW50IGxpc3Rpbmc9e2xpc3Rpbmd9Lz5cblxuICAgICAgICAgIDxNZWRpYVF1ZXJ5IHF1ZXJ5PVwiKG1heC13aWR0aDogNjAwcHgpXCI+XG4gICAgICAgICAgICA8TWFwQ29udGFpbmVyIGxhdD17bGlzdGluZy5hZGRyZXNzLmxhdH1cbiAgICAgICAgICAgICAgbG5nPXtsaXN0aW5nLmFkZHJlc3MubG5nfVxuICAgICAgICAgICAgICB3aWR0aD0nMTAwdncnXG4gICAgICAgICAgICAgIGhlaWdodD0nMzAwcHgnLz5cbiAgICAgICAgICA8L01lZGlhUXVlcnk+XG5cbiAgICAgICAgICA8TWVkaWFRdWVyeSBxdWVyeT1cIihtaW4td2lkdGg6IDYwMXB4KVwiPlxuICAgICAgICAgICAgPE1hcENvbnRhaW5lciBsYXQ9e2xpc3RpbmcuYWRkcmVzcy5sYXR9XG4gICAgICAgICAgICAgIGxuZz17bGlzdGluZy5hZGRyZXNzLmxuZ31cbiAgICAgICAgICAgICAgd2lkdGg9Jzc4Ni42NjY2N3B4J1xuICAgICAgICAgICAgICBoZWlnaHQ9JzUwMHB4Jy8+XG4gICAgICAgICAgPC9NZWRpYVF1ZXJ5PlxuXG4gICAgICAgICAgPExpc3RpbmdGb290ZXIgLz5cblxuICAgICAgICAgIHtzaG93UG9wdXAgJiZcbiAgICAgICAgICAgIDxQb3B1cCBoYW5kbGVDbG9zZT17dGhpcy5jbG9zZVBvcHVwfT5cbiAgICAgICAgICAgICAgPGgxPk1hcmNhciBWaXNpdGE8L2gxPlxuICAgICAgICAgICAgICA8cD5JbnNpcmEgc2V1IG5vbWUsIGVtYWlsIGUgdGVsZWZvbmUgY29tIERERCBlPGJyLz5lbnRyYXJlbW9zIGVtIGNvbnRhdG8gZW0gbWludXRvcy48L3A+XG5cbiAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwaG9uZVwiIHBsYWNlaG9sZGVyPVwiVGVsZWZvbmVcIiB2YWx1ZT17cGhvbmV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkVudmlhcjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICAgIDwvUG9wdXA+XG4gICAgICAgICAgfVxuXG4gICAgICAgIHtzaG93UG9zdFN1Y2Nlc3NQb3B1cCAmJlxuICAgICAgICAgIDxQb3B1cCBoYW5kbGVDbG9zZT17dGhpcy5jbG9zZVN1Y2Nlc3NQb3N0UG9wdXB9PlxuICAgICAgICAgICAgPGgxPkFnZW50ZSBFbUNhc2EgTm90aWZpY2FkbzwvaDE+XG4gICAgICAgICAgICA8cD5FbnRyYXJlbW9zIGVtIGNvbnRhdG8gbyBtYWlzIHLDoXBpZG8gcG9zc8OtdmVsIHBhcmEgYWdlbmRhcm1vcyB1bWEgdmlzaXRhITwvcD5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbG9zZVN1Y2Nlc3NQb3N0UG9wdXB9PkZlY2hhcjwvYnV0dG9uPlxuICAgICAgICAgIDwvUG9wdXA+XG4gICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5saXN0aW5nIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgIHdpZHRoOiAxMTgwcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW5wdXRbdHlwZT10ZXh0XSB7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvIDEwcHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDM1MHB4O1xuICAgICAgICAgIH1cblxuICAgICAgICBgfTwvc3R5bGU+XG5cbiAgICAgIDwvTGF5b3V0PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0aW5nXG4iXX0= */\n/*@ sourceURL=pages/listing.js?entry */'
      }));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context) {
        var _context$query, id, showPopup, res, json;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context$query = context.query, id = _context$query.id, showPopup = _context$query.showPopup;
                _context.next = 3;
                return fetch('http://localhost:4000/listings/' + id);

              case 3:
                res = _context.sent;
                _context.next = 6;
                return res.json();

              case 6:
                json = _context.sent;
                return _context.abrupt('return', {
                  listing: json.data
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Listing;
}(_react2.default.Component);

exports.default = Listing;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2xpc3RpbmcuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJNZWRpYVF1ZXJ5IiwiSGVhZCIsIlJvdXRlciIsIkZvcm0iLCJUZXh0IiwiUmFkaW8iLCJSYWRpb0dyb3VwIiwiU2VsZWN0IiwiQ2hlY2tib3giLCJMYXlvdXQiLCJMaXN0aW5nSGVhZGVyIiwiTGlzdGluZ01haW5Db250ZW50IiwiTGlzdGluZ0Zvb3RlciIsIk1hcENvbnRhaW5lciIsIlBvcHVwIiwiTGlzdGluZyIsInByb3BzIiwib3BlblBvcHVwIiwic2V0U3RhdGUiLCJzaG93UG9wdXAiLCJjbG9zZVBvcHVwIiwiY2xvc2VTdWNjZXNzUG9zdFBvcHVwIiwic2hvd1Bvc3RTdWNjZXNzUG9wdXAiLCJvbkNoYW5nZSIsImUiLCJzdGF0ZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsIm9uU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJpZCIsImxpc3RpbmciLCJlbWFpbCIsInBob25lIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInVzZXIiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiaW1nU3JjIiwicGhvdG8iLCJkZXNjcmlwdGlvbiIsImFkZHJlc3MiLCJsYXQiLCJsbmciLCJjb250ZXh0IiwicXVlcnkiLCJyZXMiLCJkYXRhIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1A7O0FBRUEsQUFBUyxBQUFNLEFBQU0sQUFBTyxBQUFZLEFBQVE7O0FBRWhELEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBd0I7Ozs7QUFDL0IsQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWtCOzs7O0FBQ3pCLEFBQU8sQUFBVzs7Ozs7Ozs7O0lBRVosQTttQ0FDSjs7bUJB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LFVBQVUsS0FBNUUsQUFBaUYscUJBQWpGOztvQkFBQTtzQkFGRixBQUVFLEFBQ0E7QUFEQTttREFDTyxNQUFQLEFBQVksUUFBTyxNQUFuQixBQUF3QixTQUFRLGFBQWhDLEFBQTRDLFlBQVcsT0FBdkQsQUFBOEQsT0FBTyxVQUFVLEtBQS9FLEFBQW9GLHFCQUFwRjs7b0JBQUE7c0JBSEYsQUFHRSxBQUNBO0FBREE7MEJBQ0EsY0FBQSxZQUFRLE1BQVIsQUFBYSxxQkFBYjs7b0JBQUE7c0JBQUE7QUFBQTtTQTdCUixBQXFCSSxBQUlFLEFBSUUsQUFNUCxxREFDQyxBQUFDLGlDQUFNLGFBQWEsS0FBcEIsQUFBeUI7b0JBQXpCO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLGNBQUE7bUJBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQURGLEFBQ0UsQUFDQSw2Q0FBQSxjQUFBO21CQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FGRixBQUVFLEFBQ0EsbUdBQUEsY0FBQSxZQUFRLFNBQVMsS0FBakIsQUFBc0Isa0NBQXRCOztvQkFBQTtzQkFBQTtBQUFBO1NBOUNOLEFBT0UsQUFvQ0UsQUFHRTtpQkE5Q047YUFERixBQUNFLEFBd0VIO0FBeEVHOzs7OzsyR0E1RHlCLEE7Ozs7Ozs7aUNBQ0QsUSxBQUFRLE8sQUFBMUIsb0IsQUFBQSxJQUFJLEEsMkJBQUEsQTs7dUJBQ00sTUFBTSxvQ0FBTixBLEFBQW9EOzttQkFBaEU7QTs7dUJBQ2EsSUFBQSxBQUFJLEE7O21CQUFqQjtBOzsyQkFHSyxLQURKLEFBQ1MsQTtBQURULEFBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFsQmdCLGdCQUFNLEEsQUFtSjVCOztrQkFBQSxBQUFlIiwiZmlsZSI6Imxpc3RpbmcuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL2d1c2FpYW5pL0RvY3VtZW50cy9jb2RlL3JlLWZyb250In0=