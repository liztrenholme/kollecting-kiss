(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{150:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==i(e)&&"function"!==typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in e)if(Object.prototype.hasOwnProperty.call(e,c)){var a=n?Object.getOwnPropertyDescriptor(e,c):null;a&&(a.get||a.set)?Object.defineProperty(r,c,a):r[c]=e[c]}r.default=e,t&&t.set(e,r);return r}(r(0));function o(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach(function(t){y(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){return function(){var t,r=s(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=s(this).constructor;t=Reflect.construct(r,arguments,n)}else t=r.apply(this,arguments);return function(e,t){if(t&&("object"===i(t)||"function"===typeof t))return t;return p(e)}(this,t)}}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var b=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(c,n.Component);var t,r,o,i=f(c);function c(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return y(p(e=i.call.apply(i,[this].concat(r))),"mounted",!1),y(p(e),"state",{image:null}),y(p(e),"handleKeyPress",function(t){"Enter"!==t.key&&" "!==t.key||e.props.onClick()}),e}return t=c,(r=[{key:"componentDidMount",value:function(){this.mounted=!0,this.fetchImage(this.props)}},{key:"componentDidUpdate",value:function(e){var t=this.props,r=t.url,n=t.light;e.url===r&&e.light===n||this.fetchImage(this.props)}},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"fetchImage",value:function(e){var t=this,r=e.url,n=e.light;if("string"!==typeof n)return this.setState({image:null}),window.fetch("https://noembed.com/embed?url=".concat(r)).then(function(e){return e.json()}).then(function(e){if(e.thumbnail_url&&t.mounted){var r=e.thumbnail_url.replace("height=100","height=480");t.setState({image:r})}});this.setState({image:n})}},{key:"render",value:function(){var e=this.props,t=e.onClick,r=e.playIcon,o=this.state.image,i={display:"flex",alignItems:"center",justifyContent:"center"},c={preview:a({width:"100%",height:"100%",backgroundImage:o?"url(".concat(o,")"):void 0,backgroundSize:"cover",backgroundPosition:"center",cursor:"pointer"},i),shadow:a({background:"radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",borderRadius:"64px",width:"64px",height:"64px"},i),playIcon:{borderStyle:"solid",borderWidth:"16px 0 16px 26px",borderColor:"transparent transparent transparent white",marginLeft:"7px"}},u=n.default.createElement("div",{style:c.shadow,className:"react-player__shadow"},n.default.createElement("div",{style:c.playIcon,className:"react-player__play-icon"}));return n.default.createElement("div",{style:c.preview,className:"react-player__preview",onClick:t,tabIndex:0,onKeyPress:this.handleKeyPress},r||u)}}])&&u(t.prototype,r),o&&u(t,o),c}();t.default=b}}]);
//# sourceMappingURL=1.95b1a944.chunk.js.map