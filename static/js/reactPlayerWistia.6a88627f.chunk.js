(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{154:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=r?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(0)),o=n(39),u=n(69);function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function a(e){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach(function(t){d(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){return function(){var t,n=b(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=b(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return function(e,t){if(t&&("object"===a(t)||"function"===typeof t))return t;return y(e)}(this,t)}}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(l,r.Component);var t,n,i,a=f(l);function l(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return d(y(e=a.call.apply(a,[this].concat(n))),"callPlayer",o.callPlayer),d(y(e),"onPlay",function(){var t;return(t=e.props).onPlay.apply(t,arguments)}),d(y(e),"onPause",function(){var t;return(t=e.props).onPause.apply(t,arguments)}),d(y(e),"onSeek",function(){var t;return(t=e.props).onSeek.apply(t,arguments)}),d(y(e),"onEnded",function(){var t;return(t=e.props).onEnded.apply(t,arguments)}),d(y(e),"mute",function(){e.callPlayer("mute")}),d(y(e),"unmute",function(){e.callPlayer("unmute")}),e}return t=l,(n=[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"getID",value:function(e){return e&&e.match(u.MATCH_URL_WISTIA)[1]}},{key:"load",value:function(e){var t=this,n=this.props,r=n.playing,u=n.muted,i=n.controls,a=n.onReady,l=n.config,s=n.onError;(0,o.getSDK)("https://fast.wistia.com/assets/external/E-v1.js","Wistia").then(function(){window._wq=window._wq||[],window._wq.push({id:t.getID(e),options:c({autoPlay:r,silentAutoPlay:"allow",muted:u,controlsVisibleOnLoad:i},l.options),onReady:function(e){t.player=e,t.unbind(),t.player.bind("play",t.onPlay),t.player.bind("pause",t.onPause),t.player.bind("seek",t.onSeek),t.player.bind("end",t.onEnded),a()}})},s)}},{key:"unbind",value:function(){this.player.unbind("play",this.onPlay),this.player.unbind("pause",this.onPause),this.player.unbind("seek",this.onSeek),this.player.unbind("end",this.onEnded)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){this.unbind(),this.callPlayer("remove")}},{key:"seekTo",value:function(e){this.callPlayer("time",e)}},{key:"setVolume",value:function(e){this.callPlayer("volume",e)}},{key:"setPlaybackRate",value:function(e){this.callPlayer("playbackRate",e)}},{key:"getDuration",value:function(){return this.callPlayer("duration")}},{key:"getCurrentTime",value:function(){return this.callPlayer("time")}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){var e=this.getID(this.props.url),t="wistia_embed wistia_async_".concat(e);return r.default.createElement("div",{key:e,className:t,style:{width:"100%",height:"100%"}})}}])&&s(t.prototype,n),i&&s(t,i),l}();t.default=h,d(h,"displayName","Wistia"),d(h,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerWistia.6a88627f.chunk.js.map