(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{157:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==c(e)&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=n?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(r,o,u):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(r(0)),o=r(39),u=r(69);function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function c(e){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){return function(){var t,r=y(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=y(this).constructor;t=Reflect.construct(r,arguments,n)}else t=r.apply(this,arguments);return function(e,t){if(t&&("object"===c(t)||"function"===typeof t))return t;return s(e)}(this,t)}}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var b=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(y,n.Component);var t,r,i,c=p(y);function y(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return d(s(e=c.call.apply(c,[this].concat(r))),"callPlayer",o.callPlayer),d(s(e),"duration",null),d(s(e),"currentTime",null),d(s(e),"secondsLoaded",null),d(s(e),"mute",function(){}),d(s(e),"unmute",function(){}),d(s(e),"ref",function(t){e.iframe=t}),e}return t=y,(r=[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e){var t=this;(0,o.getSDK)("https://widget.mixcloud.com/media/js/widgetApi.js","Mixcloud").then(function(e){t.player=e.PlayerWidget(t.iframe),t.player.ready.then(function(){t.player.events.play.on(t.props.onPlay),t.player.events.pause.on(t.props.onPause),t.player.events.ended.on(t.props.onEnded),t.player.events.error.on(t.props.error),t.player.events.progress.on(function(e,r){t.currentTime=e,t.duration=r}),t.props.onReady()})},this.props.onError)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){}},{key:"seekTo",value:function(e){this.callPlayer("seek",e)}},{key:"setVolume",value:function(e){}},{key:"getDuration",value:function(){return this.duration}},{key:"getCurrentTime",value:function(){return this.currentTime}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){var e=this.props,t=e.url,r=e.config,i=t.match(u.MATCH_URL_MIXCLOUD)[1],c=(0,o.queryString)(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){d(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},r.options,{feed:"/".concat(i,"/")}));return n.default.createElement("iframe",{key:i,ref:this.ref,style:{width:"100%",height:"100%"},src:"https://www.mixcloud.com/widget/iframe/?".concat(c),frameBorder:"0"})}}])&&l(t.prototype,r),i&&l(t,i),y}();t.default=b,d(b,"displayName","Mixcloud"),d(b,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerMixcloud.7069eb72.chunk.js.map