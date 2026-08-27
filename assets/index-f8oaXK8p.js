var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return te(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function oe(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function T(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,T(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+oe(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),T(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+oe(a,u),c+=T(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+oe(a,u++),c+=T(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return T(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return T(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function E(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var D=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},O={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=O,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:E}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,D)}catch(e){D(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,re());else{var t=n(l);t!==null&&oe(x,t.startTime-e)}}}var S=!1,C=-1,w=5,ee=-1;function te(){return g?!0:!(e.unstable_now()-ee<w)}function ne(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&oe(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?re():S=!1}}}var re;if(typeof y==`function`)re=function(){y(ne)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=ne,re=function(){ae.postMessage(null)}}else re=function(){_(ne,0)};function oe(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,oe(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,re()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),te=Symbol.for(`react.suspense_list`),ne=Symbol.for(`react.memo`),re=Symbol.for(`react.lazy`),ie=Symbol.for(`react.activity`),ae=Symbol.for(`react.memo_cache_sentinel`),oe=Symbol.iterator;function se(e){return typeof e!=`object`||!e?null:(e=oe&&e[oe]||e[`@@iterator`],typeof e==`function`?e:null)}var T=Symbol.for(`react.client.reference`);function ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===T?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case te:return`SuspenseList`;case ie:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ne:return t=e.displayName||null,t===null?ce(e.type)||`Memo`:t;case re:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var E=Array.isArray,D=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},ue=[],de=-1;function fe(e){return{current:e}}function pe(e){0>de||(e.current=ue[de],ue[de]=null,de--)}function k(e,t){de++,ue[de]=e.current,e.current=t}var me=fe(null),he=fe(null),A=fe(null),ge=fe(null);function _e(e,t){switch(k(A,t),k(he,e),k(me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}pe(me),k(me,e)}function ve(){pe(me),pe(he),pe(A)}function ye(e){e.memoizedState!==null&&k(ge,e);var t=me.current,n=Hd(t,e.type);t!==n&&(k(he,e),k(me,n))}function be(e){he.current===e&&(pe(me),pe(he)),ge.current===e&&(pe(ge),Qf._currentValue=le)}var xe,Se;function Ce(e){if(xe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);xe=t&&t[1]||``,Se=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+xe+e+Se}var we=!1;function Te(e,t){if(!e||we)return``;we=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{we=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ce(n):``}function Ee(e,t){switch(e.tag){case 26:case 27:case 5:return Ce(e.type);case 16:return Ce(`Lazy`);case 13:return e.child!==t&&t!==null?Ce(`Suspense Fallback`):Ce(`Suspense`);case 19:return Ce(`SuspenseList`);case 0:case 15:return Te(e.type,!1);case 11:return Te(e.type.render,!1);case 1:return Te(e.type,!0);case 31:return Ce(`Activity`);default:return``}}function De(e){try{var t=``,n=null;do t+=Ee(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Oe=Object.prototype.hasOwnProperty,ke=t.unstable_scheduleCallback,Ae=t.unstable_cancelCallback,je=t.unstable_shouldYield,Me=t.unstable_requestPaint,Ne=t.unstable_now,Pe=t.unstable_getCurrentPriorityLevel,Fe=t.unstable_ImmediatePriority,Ie=t.unstable_UserBlockingPriority,Le=t.unstable_NormalPriority,Re=t.unstable_LowPriority,ze=t.unstable_IdlePriority,Be=t.log,Ve=t.unstable_setDisableYieldValue,He=null,Ue=null;function We(e){if(typeof Be==`function`&&Ve(e),Ue&&typeof Ue.setStrictMode==`function`)try{Ue.setStrictMode(He,e)}catch{}}var Ge=Math.clz32?Math.clz32:qe,Ke=Math.log,j=Math.LN2;function qe(e){return e>>>=0,e===0?32:31-(Ke(e)/j|0)|0}var Je=256,Ye=262144,Xe=4194304;function Ze(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ze(n))):i=Ze(o):i=Ze(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ze(n))):i=Ze(o)):i=Ze(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function $e(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function et(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tt(){var e=Xe;return Xe<<=1,!(Xe&62914560)&&(Xe=4194304),e}function nt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function rt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function it(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ge(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&at(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function at(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ge(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ot(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ge(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function st(e,t){var n=t&-t;return n=n&42?1:ct(n),(n&(e.suspendedLanes|t))===0?n:0}function ct(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function lt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ut(){var e=O.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function dt(e,t){var n=O.p;try{return O.p=e,t()}finally{O.p=n}}var ft=Math.random().toString(36).slice(2),pt=`__reactFiber$`+ft,mt=`__reactProps$`+ft,ht=`__reactContainer$`+ft,gt=`__reactEvents$`+ft,_t=`__reactListeners$`+ft,vt=`__reactHandles$`+ft,yt=`__reactResources$`+ft,bt=`__reactMarker$`+ft;function xt(e){delete e[pt],delete e[mt],delete e[gt],delete e[_t],delete e[vt]}function St(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ht]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[pt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[pt]||e[ht]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Tt(e){var t=e[yt];return t||=e[yt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[bt]=!0}var Dt=new Set,Ot={};function kt(e,t){At(e,t),At(e+`Capture`,t)}function At(e,t){for(Ot[e]=t,e=0;e<t.length;e++)Dt.add(t[e])}var jt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Mt={},Nt={};function Pt(e){return Oe.call(Nt,e)?!0:Oe.call(Mt,e)?!1:jt.test(e)?Nt[e]=!0:(Mt[e]=!0,!1)}function Ft(e,t,n){if(Pt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function It(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Lt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Rt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vt(e){if(!e._valueTracker){var t=zt(e)?`checked`:`value`;e._valueTracker=Bt(e,t,``+e[t])}}function Ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Ut(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Wt=/[\n"\\]/g;function Gt(e){return e.replace(Wt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Kt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Rt(t)):e.value!==``+Rt(t)&&(e.value=``+Rt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Jt(e,o,Rt(n)):Jt(e,o,Rt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Rt(s):e.removeAttribute(`name`)}function qt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Vt(e);return}n=n==null?``:``+Rt(n),t=t==null?n:``+Rt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Vt(e)}function Jt(e,t,n){t===`number`&&Ut(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Yt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Xt(e,t,n){if(t!=null&&(t=``+Rt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Rt(n)}function Zt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(E(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Rt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Vt(e)}function Qt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $t=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function en(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||$t.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function tn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&en(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&en(e,o,t[o])}function nn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var rn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),an=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function on(e){return an.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function sn(){}var cn=null;function ln(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var un=null,dn=null;function fn(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[mt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Kt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Gt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[mt]||null;if(!a)throw Error(i(90));Kt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ht(r)}break a;case`textarea`:Xt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Yt(e,!!n.multiple,t,!1)}}}var pn=!1;function mn(e,t,n){if(pn)return e(t,n);pn=!0;try{return e(t)}finally{if(pn=!1,(un!==null||dn!==null)&&(Su(),un&&(t=un,e=dn,dn=un=null,fn(t),e)))for(t=0;t<e.length;t++)fn(e[t])}}function hn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[mt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var gn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),_n=!1;if(gn)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){_n=!0}}),window.addEventListener(`test`,vn,vn),window.removeEventListener(`test`,vn,vn)}catch{_n=!1}var yn=null,bn=null,xn=null;function Sn(){if(xn)return xn;var e,t=bn,n=t.length,r,i=`value`in yn?yn.value:yn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return xn=i.slice(e,1<r?1-r:void 0)}function Cn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function wn(){return!0}function Tn(){return!1}function En(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?wn:Tn,this.isPropagationStopped=Tn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=wn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=wn)},persist:function(){},isPersistent:wn}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},On=En(Dn),kn=h({},Dn,{view:0,detail:0}),An=En(kn),jn,Mn,Nn,Pn=h({},kn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Nn&&(Nn&&e.type===`mousemove`?(jn=e.screenX-Nn.screenX,Mn=e.screenY-Nn.screenY):Mn=jn=0,Nn=e),jn)},movementY:function(e){return`movementY`in e?e.movementY:Mn}}),Fn=En(Pn),In=En(h({},Pn,{dataTransfer:0})),Ln=En(h({},kn,{relatedTarget:0})),Rn=En(h({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0})),zn=En(h({},Dn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Bn=En(h({},Dn,{data:0})),Vn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Hn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Un={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Wn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Un[e])?!!t[e]:!1}function Gn(){return Wn}var Kn=En(h({},kn,{key:function(e){if(e.key){var t=Vn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Cn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Hn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gn,charCode:function(e){return e.type===`keypress`?Cn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Cn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),M=En(h({},Pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),qn=En(h({},kn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gn})),Jn=En(h({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Yn=En(h({},Pn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Xn=En(h({},Dn,{newState:0,oldState:0})),Zn=[9,13,27,32],Qn=gn&&`CompositionEvent`in window,$n=null;gn&&`documentMode`in document&&($n=document.documentMode);var er=gn&&`TextEvent`in window&&!$n,tr=gn&&(!Qn||$n&&8<$n&&11>=$n),nr=` `,rr=!1;function ir(e,t){switch(e){case`keyup`:return Zn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function ar(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var or=!1;function sr(e,t){switch(e){case`compositionend`:return ar(t);case`keypress`:return t.which===32?(rr=!0,nr):null;case`textInput`:return e=t.data,e===nr&&rr?null:e;default:return null}}function N(e,t){if(or)return e===`compositionend`||!Qn&&ir(e,t)?(e=Sn(),xn=bn=yn=null,or=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return tr&&t.locale!==`ko`?null:t.data;default:return null}}var cr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!cr[e.type]:t===`textarea`}function ur(e,t,n,r){un?dn?dn.push(r):dn=[r]:un=r,t=Ed(t,`onChange`),0<t.length&&(n=new On(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var dr=null,fr=null;function pr(e){yd(e,0)}function mr(e){if(Ht(wt(e)))return e}function hr(e,t){if(e===`change`)return t}var gr=!1;if(gn){var _r;if(gn){var vr=`oninput`in document;if(!vr){var yr=document.createElement(`div`);yr.setAttribute(`oninput`,`return;`),vr=typeof yr.oninput==`function`}_r=vr}else _r=!1;gr=_r&&(!document.documentMode||9<document.documentMode)}function br(){dr&&(dr.detachEvent(`onpropertychange`,xr),fr=dr=null)}function xr(e){if(e.propertyName===`value`&&mr(fr)){var t=[];ur(t,fr,e,ln(e)),mn(pr,t)}}function Sr(e,t,n){e===`focusin`?(br(),dr=t,fr=n,dr.attachEvent(`onpropertychange`,xr)):e===`focusout`&&br()}function Cr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return mr(fr)}function wr(e,t){if(e===`click`)return mr(t)}function Tr(e,t){if(e===`input`||e===`change`)return mr(t)}function Er(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Dr=typeof Object.is==`function`?Object.is:Er;function Or(e,t){if(Dr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Oe.call(t,i)||!Dr(e[i],t[i]))return!1}return!0}function kr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ar(e,t){var n=kr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=kr(n)}}function jr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?jr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ut(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ut(e.document)}return t}function Nr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Pr=gn&&`documentMode`in document&&11>=document.documentMode,Fr=null,Ir=null,Lr=null,Rr=!1;function zr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Rr||Fr==null||Fr!==Ut(r)||(r=Fr,`selectionStart`in r&&Nr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&Or(Lr,r)||(Lr=r,r=Ed(Ir,`onSelect`),0<r.length&&(t=new On(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Fr)))}function Br(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Vr={animationend:Br(`Animation`,`AnimationEnd`),animationiteration:Br(`Animation`,`AnimationIteration`),animationstart:Br(`Animation`,`AnimationStart`),transitionrun:Br(`Transition`,`TransitionRun`),transitionstart:Br(`Transition`,`TransitionStart`),transitioncancel:Br(`Transition`,`TransitionCancel`),transitionend:Br(`Transition`,`TransitionEnd`)},Hr={},Ur={};gn&&(Ur=document.createElement(`div`).style,`AnimationEvent`in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),`TransitionEvent`in window||delete Vr.transitionend.transition);function Wr(e){if(Hr[e])return Hr[e];if(!Vr[e])return e;var t=Vr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ur)return Hr[e]=t[n];return e}var Gr=Wr(`animationend`),Kr=Wr(`animationiteration`),qr=Wr(`animationstart`),Jr=Wr(`transitionrun`),Yr=Wr(`transitionstart`),Xr=Wr(`transitioncancel`),Zr=Wr(`transitionend`),Qr=new Map,$r=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);$r.push(`scrollEnd`);function ei(e,t){Qr.set(e,t),kt(t,[e])}var ti=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ni=[],ri=0,ii=0;function ai(){for(var e=ri,t=ii=ri=0;t<e;){var n=ni[t];ni[t++]=null;var r=ni[t];ni[t++]=null;var i=ni[t];ni[t++]=null;var a=ni[t];if(ni[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&li(n,i,a)}}function oi(e,t,n,r){ni[ri++]=e,ni[ri++]=t,ni[ri++]=n,ni[ri++]=r,ii|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function si(e,t,n,r){return oi(e,t,n,r),ui(e)}function ci(e,t){return oi(e,null,null,t),ui(e)}function li(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ge(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ui(e){if(50<pu)throw pu=0,mu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var di={};function fi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pi(e,t,n,r){return new fi(e,t,n,r)}function mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hi(e,t){var n=e.alternate;return n===null?(n=pi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function gi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function _i(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)mi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ie:return e=pi(31,n,t,a),e.elementType=ie,e.lanes=o,e;case y:return vi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=pi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=pi(13,n,t,a),e.elementType=ee,e.lanes=o,e;case te:return e=pi(19,n,t,a),e.elementType=te,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case ne:s=14;break a;case re:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=pi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function vi(e,t,n,r){return e=pi(7,e,r,t),e.lanes=n,e}function yi(e,t,n){return e=pi(6,e,null,t),e.lanes=n,e}function bi(e){var t=pi(18,null,null,0);return t.stateNode=e,t}function xi(e,t,n){return t=pi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Si=new WeakMap;function Ci(e,t){if(typeof e==`object`&&e){var n=Si.get(e);return n===void 0?(t={value:e,source:t,stack:De(t)},Si.set(e,t),t):n}return{value:e,source:t,stack:De(t)}}var wi=[],Ti=0,Ei=null,Di=0,Oi=[],ki=0,Ai=null,ji=1,Mi=``;function Ni(e,t){wi[Ti++]=Di,wi[Ti++]=Ei,Ei=e,Di=t}function Pi(e,t,n){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,Ai=e;var r=ji;e=Mi;var i=32-Ge(r)-1;r&=~(1<<i),n+=1;var a=32-Ge(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ji=1<<32-Ge(t)+i|n<<i|r,Mi=a+e}else ji=1<<a|n<<i|r,Mi=e}function Fi(e){e.return!==null&&(Ni(e,1),Pi(e,1,0))}function Ii(e){for(;e===Ei;)Ei=wi[--Ti],wi[Ti]=null,Di=wi[--Ti],wi[Ti]=null;for(;e===Ai;)Ai=Oi[--ki],Oi[ki]=null,Mi=Oi[--ki],Oi[ki]=null,ji=Oi[--ki],Oi[ki]=null}function Li(e,t){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,ji=t.id,Mi=t.overflow,Ai=e}var Ri=null,P=null,F=!1,zi=null,Bi=!1,Vi=Error(i(519));function Hi(e){throw Ji(Ci(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Vi}function Ui(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[pt]=e,t[mt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Zt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=sn),t=!0):t=!1,t||Hi(e,!0)}function Wi(e){for(Ri=e.return;Ri;)switch(Ri.tag){case 5:case 31:case 13:Bi=!1;return;case 27:case 3:Bi=!0;return;default:Ri=Ri.return}}function Gi(e){if(e!==Ri)return!1;if(!F)return Wi(e),F=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&P&&Hi(e),Wi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));P=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));P=uf(e)}else t===27?(t=P,Zd(e.type)?(e=lf,lf=null,P=e):P=t):P=Ri?cf(e.stateNode.nextSibling):null;return!0}function Ki(){P=Ri=null,F=!1}function qi(){var e=zi;return e!==null&&($l===null?$l=e:$l.push.apply($l,e),zi=null),e}function Ji(e){zi===null?zi=[e]:zi.push(e)}var Yi=fe(null),Xi=null,Zi=null;function Qi(e,t,n){k(Yi,t._currentValue),t._currentValue=n}function $i(e){e._currentValue=Yi.current,pe(Yi)}function ea(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ta(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ea(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ea(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function na(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Dr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ge.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&ta(t,e,n,r),t.flags|=262144}function ra(e){for(e=e.firstContext;e!==null;){if(!Dr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ia(e){Xi=e,Zi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function aa(e){return sa(Xi,e)}function oa(e,t){return Xi===null&&ia(e),sa(e,t)}function sa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Zi===null){if(e===null)throw Error(i(308));Zi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Zi=Zi.next=t;return n}var ca=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},la=t.unstable_scheduleCallback,ua=t.unstable_NormalPriority,da={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function fa(){return{controller:new ca,data:new Map,refCount:0}}function pa(e){e.refCount--,e.refCount===0&&la(ua,function(){e.controller.abort()})}var ma=null,ha=0,ga=0,_a=null;function va(e,t){if(ma===null){var n=ma=[];ha=0,ga=dd(),_a={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ha++,t.then(ya,ya),t}function ya(){if(--ha===0&&ma!==null){_a!==null&&(_a.status=`fulfilled`);var e=ma;ma=null,ga=0,_a=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ba(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var xa=D.S;D.S=function(e,t){nu=Ne(),typeof t==`object`&&t&&typeof t.then==`function`&&va(e,t),xa!==null&&xa(e,t)};var Sa=fe(null);function Ca(){var e=Sa.current;return e===null?W.pooledCache:e}function wa(e,t){t===null?k(Sa,Sa.current):k(Sa,t.pool)}function Ta(){var e=Ca();return e===null?null:{parent:da._currentValue,pool:e}}var Ea=Error(i(460)),Da=Error(i(474)),Oa=Error(i(542)),ka={then:function(){}};function Aa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ja(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(sn,sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Fa(e),e;default:if(typeof t.status==`string`)t.then(sn,sn);else{if(e=W,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Fa(e),e}throw Na=t,Ea}}function Ma(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Na=e,Ea):e}}var Na=null;function Pa(){if(Na===null)throw Error(i(459));var e=Na;return Na=null,e}function Fa(e){if(e===Ea||e===Oa)throw Error(i(483))}var Ia=null,La=0;function Ra(e){var t=La;return La+=1,Ia===null&&(Ia=[]),ja(Ia,e,t)}function za(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ba(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Va(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=hi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=yi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===re&&Ma(i)===t.type)?(t=a(t,n.props),za(t,n),t.return=e,t):(t=_i(n.type,n.key,n.props,null,e.mode,r),za(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=xi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=vi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=yi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=_i(t.type,t.key,t.props,null,e.mode,n),za(n,t),n.return=e,n;case v:return t=xi(t,e.mode,n),t.return=e,t;case re:return t=Ma(t),f(e,t,n)}if(E(t)||se(t))return t=vi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ra(t),n);if(t.$$typeof===C)return f(e,oa(e,t),n);Ba(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case re:return n=Ma(n),p(e,t,n,r)}if(E(n)||se(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ra(n),r);if(n.$$typeof===C)return p(e,t,oa(e,n),r);Ba(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case re:return r=Ma(r),m(e,t,n,r,i)}if(E(r)||se(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ra(r),i);if(r.$$typeof===C)return m(e,t,n,oa(t,r),i);Ba(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),F&&Ni(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return F&&Ni(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),F&&Ni(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),F&&Ni(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return F&&Ni(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),F&&Ni(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===re&&Ma(l)===r.type){n(e,r.sibling),c=a(r,o.props),za(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=vi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=_i(o.type,o.key,o.props,null,e.mode,c),za(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=xi(o,e.mode,c),c.return=e,e=c}return s(e);case re:return o=Ma(o),b(e,r,o,c)}if(E(o))return h(e,r,o,c);if(se(o)){if(l=se(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ra(o),c);if(o.$$typeof===C)return b(e,r,oa(e,o),c);Ba(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=yi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{La=0;var i=b(e,t,n,r);return Ia=null,i}catch(t){if(t===Ea||t===Oa)throw t;var a=pi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ha=Va(!0),Ua=Va(!1),Wa=!1;function Ga(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ka(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function I(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function qa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,U&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ui(e),li(e,null,n),t}return oi(e,r,t,n),ui(e)}function Ja(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}function Ya(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Xa=!1;function Za(){if(Xa){var e=_a;if(e!==null)throw e}}function Qa(e,t,n,r){Xa=!1;var i=e.updateQueue;Wa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(K&f)===f:(r&f)===f){f!==0&&f===ga&&(Xa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Wa=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),ql|=o,e.lanes=o,e.memoizedState=d}}function $a(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function eo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)$a(n[e],t)}var to=fe(null),no=fe(0);function ro(e,t){e=Kl,k(no,e),k(to,t),Kl=e|t.baseLanes}function io(){k(no,Kl),k(to,to.current)}function ao(){Kl=no.current,pe(to),pe(no)}var oo=fe(null),so=null;function co(e){var t=e.alternate;k(mo,mo.current&1),k(oo,e),so===null&&(t===null||to.current!==null||t.memoizedState!==null)&&(so=e)}function lo(e){k(mo,mo.current),k(oo,e),so===null&&(so=e)}function uo(e){e.tag===22?(k(mo,mo.current),k(oo,e),so===null&&(so=e)):fo(e)}function fo(){k(mo,mo.current),k(oo,oo.current)}function po(e){pe(oo),so===e&&(so=null),pe(mo)}var mo=fe(0);function ho(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var go=0,L=null,R=null,_o=null,vo=!1,yo=!1,bo=!1,xo=0,So=0,Co=null,wo=0;function z(){throw Error(i(321))}function To(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dr(e[n],t[n]))return!1;return!0}function Eo(e,t,n,r,i,a){return go=a,L=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,D.H=e===null||e.memoizedState===null?Hs:Us,bo=!1,a=n(r,i),bo=!1,yo&&(a=Oo(t,n,r,i)),Do(e),a}function Do(e){D.H=Vs;var t=R!==null&&R.next!==null;if(go=0,_o=R=L=null,vo=!1,So=0,Co=null,t)throw Error(i(300));e===null||oc||(e=e.dependencies,e!==null&&ra(e)&&(oc=!0))}function Oo(e,t,n,r){L=e;var a=0;do{if(yo&&(Co=null),So=0,yo=!1,25<=a)throw Error(i(301));if(a+=1,_o=R=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}D.H=Ws,o=t(n,r)}while(yo);return o}function ko(){var e=D.H,t=e.useState()[0];return t=typeof t.then==`function`?Fo(t):t,e=e.useState()[0],(R===null?null:R.memoizedState)!==e&&(L.flags|=1024),t}function Ao(){var e=xo!==0;return xo=0,e}function jo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mo(e){if(vo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}vo=!1}go=0,_o=R=L=null,yo=!1,So=xo=0,Co=null}function No(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _o===null?L.memoizedState=_o=e:_o=_o.next=e,_o}function B(){if(R===null){var e=L.alternate;e=e===null?null:e.memoizedState}else e=R.next;var t=_o===null?L.memoizedState:_o.next;if(t!==null)_o=t,R=e;else{if(e===null)throw L.alternate===null?Error(i(467)):Error(i(310));R=e,e={memoizedState:R.memoizedState,baseState:R.baseState,baseQueue:R.baseQueue,queue:R.queue,next:null},_o===null?L.memoizedState=_o=e:_o=_o.next=e}return _o}function Po(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fo(e){var t=So;return So+=1,Co===null&&(Co=[]),e=ja(Co,e,t),t=L,(_o===null?t.memoizedState:_o.next)===null&&(t=t.alternate,D.H=t===null||t.memoizedState===null?Hs:Us),e}function Io(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Fo(e);if(e.$$typeof===C)return aa(e)}throw Error(i(438,String(e)))}function Lo(e){var t=null,n=L.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=L.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Po(),L.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ae;return t.index++,n}function Ro(e,t){return typeof t==`function`?t(e):t}function zo(e){return Bo(B(),R,e)}function Bo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(go&f)===f:(K&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ga&&(d=!0);else if((go&p)===p){u=u.next,p===ga&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,L.lanes|=p,ql|=p;f=u.action,bo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,L.lanes|=f,ql|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Dr(o,e.memoizedState)&&(oc=!0,d&&(n=_a,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Vo(e){var t=B(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Dr(o,t.memoizedState)||(oc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ho(e,t,n){var r=L,a=B(),o=F;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Dr((R||a).memoizedState,n);if(s&&(a.memoizedState=n,oc=!0),a=a.queue,ps(Go.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||_o!==null&&_o.memoizedState.tag&1){if(r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,a,n,t),null),W===null)throw Error(i(349));o||go&127||Uo(r,t,n)}return n}function Uo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=L.updateQueue,t===null?(t=Po(),L.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wo(e,t,n,r){t.value=n,t.getSnapshot=r,Ko(t)&&qo(e)}function Go(e,t,n){return n(function(){Ko(t)&&qo(e)})}function Ko(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dr(e,n)}catch{return!0}}function qo(e){var t=ci(e,2);t!==null&&_u(t,e,2)}function Jo(e){var t=No();if(typeof e==`function`){var n=e;if(e=n(),bo){We(!0);try{n()}finally{We(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:e},t}function Yo(e,t,n,r){return e.baseState=n,Bo(e,R,typeof r==`function`?r:Ro)}function Xo(e,t,n,r,a){if(Rs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};D.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Zo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Zo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=D.T,o={};D.T=o;try{var s=n(i,r),c=D.S;c!==null&&c(o,s),Qo(e,t,s)}catch(n){es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),D.T=a}}else try{a=n(i,r),Qo(e,t,a)}catch(n){es(e,t,n)}}function Qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){$o(e,t,n)},function(n){return es(e,t,n)}):$o(e,t,n)}function $o(e,t,n){t.status=`fulfilled`,t.value=n,ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Zo(e,n)))}function es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ts(t),t=t.next;while(t!==r)}e.action=null}function ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ns(e,t){return t}function rs(e,t){if(F){var n=W.formState;if(n!==null){a:{var r=L;if(F){if(P){b:{for(var i=P,a=Bi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){P=cf(i.nextSibling),r=i.data===`F!`;break a}}Hi(r)}r=!1}r&&(t=n[0])}}return n=No(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:t},n.queue=r,n=Fs.bind(null,L,r),r.dispatch=n,r=Jo(!1),a=Ls.bind(null,L,!1,r.queue),r=No(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Xo.bind(null,L,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function is(e){return as(B(),R,e)}function as(e,t,n){if(t=Bo(e,t,ns)[0],e=zo(Ro)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Fo(t)}catch(e){throw e===Ea?Oa:e}else r=t;t=B();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(L.flags|=2048,cs(9,{destroy:void 0},os.bind(null,i,n),null)),[r,a,e]}function os(e,t){e.action=t}function ss(e){var t=B(),n=R;if(n!==null)return as(t,n,e);B(),t=t.memoizedState,n=B();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function cs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=L.updateQueue,t===null&&(t=Po(),L.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ls(){return B().memoizedState}function us(e,t,n,r){var i=No();L.flags|=e,i.memoizedState=cs(1|t,{destroy:void 0},n,r===void 0?null:r)}function ds(e,t,n,r){var i=B();r=r===void 0?null:r;var a=i.memoizedState.inst;R!==null&&r!==null&&To(r,R.memoizedState.deps)?i.memoizedState=cs(t,a,n,r):(L.flags|=e,i.memoizedState=cs(1|t,a,n,r))}function fs(e,t){us(8390656,8,e,t)}function ps(e,t){ds(2048,8,e,t)}function ms(e){L.flags|=4;var t=L.updateQueue;if(t===null)t=Po(),L.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function hs(e){var t=B().memoizedState;return ms({ref:t,nextImpl:e}),function(){if(U&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function gs(e,t){return ds(4,2,e,t)}function _s(e,t){return ds(4,4,e,t)}function vs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ys(e,t,n){n=n==null?null:n.concat([e]),ds(4,4,vs.bind(null,t,e),n)}function bs(){}function xs(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&To(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ss(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&To(t,r[1]))return r[0];if(r=e(),bo){We(!0);try{e()}finally{We(!1)}}return n.memoizedState=[r,t],r}function Cs(e,t,n){return n===void 0||go&1073741824&&!(K&261930)?e.memoizedState=t:(e.memoizedState=n,e=gu(),L.lanes|=e,ql|=e,n)}function ws(e,t,n,r){return Dr(n,t)?n:to.current===null?!(go&42)||go&1073741824&&!(K&261930)?(oc=!0,e.memoizedState=n):(e=gu(),L.lanes|=e,ql|=e,t):(e=Cs(e,n,r),Dr(e,t)||(oc=!0),e)}function Ts(e,t,n,r,i){var a=O.p;O.p=a!==0&&8>a?a:8;var o=D.T,s={};D.T=s,Ls(e,!1,t,n);try{var c=i(),l=D.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Is(e,t,ba(c,r),hu(e)):Is(e,t,r,hu(e))}catch(n){Is(e,t,{then:function(){},status:`rejected`,reason:n},hu())}finally{O.p=a,o!==null&&s.types!==null&&(o.types=s.types),D.T=o}}function Es(){}function Ds(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Os(e).queue;Ts(e,a,t,le,n===null?Es:function(){return ks(e),n(r)})}function Os(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:le},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ks(e){var t=Os(e);t.next===null&&(t=e.alternate.memoizedState),Is(e,t.next.queue,{},hu())}function As(){return aa(Qf)}function js(){return B().memoizedState}function Ms(){return B().memoizedState}function Ns(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=hu();e=I(n);var r=qa(t,e,n);r!==null&&(_u(r,t,n),Ja(r,t,n)),t={cache:fa()},e.payload=t;return}t=t.return}}function Ps(e,t,n){var r=hu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Rs(e)?zs(t,n):(n=si(e,t,n,r),n!==null&&(_u(n,e,r),Bs(n,t,r)))}function Fs(e,t,n){Is(e,t,n,hu())}function Is(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rs(e))zs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Dr(s,o))return oi(e,t,i,0),W===null&&ai(),!1}catch{}if(n=si(e,t,i,r),n!==null)return _u(n,e,r),Bs(n,t,r),!0}return!1}function Ls(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Rs(e)){if(t)throw Error(i(479))}else t=si(e,n,r,2),t!==null&&_u(t,e,2)}function Rs(e){var t=e.alternate;return e===L||t!==null&&t===L}function zs(e,t){yo=vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}var Vs={readContext:aa,use:Io,useCallback:z,useContext:z,useEffect:z,useImperativeHandle:z,useLayoutEffect:z,useInsertionEffect:z,useMemo:z,useReducer:z,useRef:z,useState:z,useDebugValue:z,useDeferredValue:z,useTransition:z,useSyncExternalStore:z,useId:z,useHostTransitionStatus:z,useFormState:z,useActionState:z,useOptimistic:z,useMemoCache:z,useCacheRefresh:z};Vs.useEffectEvent=z;var Hs={readContext:aa,use:Io,useCallback:function(e,t){return No().memoizedState=[e,t===void 0?null:t],e},useContext:aa,useEffect:fs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),us(4194308,4,vs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){us(4,2,e,t)},useMemo:function(e,t){var n=No();t=t===void 0?null:t;var r=e();if(bo){We(!0);try{e()}finally{We(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=No();if(n!==void 0){var i=n(t);if(bo){We(!0);try{n(t)}finally{We(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ps.bind(null,L,e),[r.memoizedState,e]},useRef:function(e){var t=No();return e={current:e},t.memoizedState=e},useState:function(e){e=Jo(e);var t=e.queue,n=Fs.bind(null,L,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bs,useDeferredValue:function(e,t){return Cs(No(),e,t)},useTransition:function(){var e=Jo(!1);return e=Ts.bind(null,L,e.queue,!0,!1),No().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=L,a=No();if(F){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),W===null)throw Error(i(349));K&127||Uo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,fs(Go.bind(null,r,o,e),[e]),r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,o,n,t),null),n},useId:function(){var e=No(),t=W.identifierPrefix;if(F){var n=Mi,r=ji;n=(r&~(1<<32-Ge(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=xo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=wo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:As,useFormState:rs,useActionState:rs,useOptimistic:function(e){var t=No();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ls.bind(null,L,!0,n),n.dispatch=t,[e,t]},useMemoCache:Lo,useCacheRefresh:function(){return No().memoizedState=Ns.bind(null,L)},useEffectEvent:function(e){var t=No(),n={impl:e};return t.memoizedState=n,function(){if(U&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Us={readContext:aa,use:Io,useCallback:xs,useContext:aa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:zo,useRef:ls,useState:function(){return zo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){return ws(B(),R.memoizedState,e,t)},useTransition:function(){var e=zo(Ro)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:is,useActionState:is,useOptimistic:function(e,t){return Yo(B(),R,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Us.useEffectEvent=hs;var Ws={readContext:aa,use:Io,useCallback:xs,useContext:aa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:Vo,useRef:ls,useState:function(){return Vo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){var n=B();return R===null?Cs(n,e,t):ws(n,R.memoizedState,e,t)},useTransition:function(){var e=Vo(Ro)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:ss,useActionState:ss,useOptimistic:function(e,t){var n=B();return R===null?(n.baseState=e,[e,n.queue.dispatch]):Yo(n,R,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Ws.useEffectEvent=hs;function Gs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ks={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=hu(),i=I(r);i.payload=t,n!=null&&(i.callback=n),t=qa(e,i,r),t!==null&&(_u(t,e,r),Ja(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=hu(),i=I(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=qa(e,i,r),t!==null&&(_u(t,e,r),Ja(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=hu(),r=I(n);r.tag=2,t!=null&&(r.callback=t),t=qa(e,r,n),t!==null&&(_u(t,e,n),Ja(t,e,n))}};function qs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Or(n,r)||!Or(i,a):!0}function Js(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ks.enqueueReplaceState(t,t.state,null)}function Ys(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Xs(e){ti(e)}function Zs(e){console.error(e)}function Qs(e){ti(e)}function $s(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){return n=I(n),n.tag=3,n.payload={element:null},n.callback=function(){$s(e,t)},n}function nc(e){return e=I(e),e.tag=3,e}function rc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){ec(t,n,r),typeof i!=`function`&&(au===null?au=new Set([this]):au.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ic(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&na(t,n,a,!0),n=oo.current,n!==null){switch(n.tag){case 31:case 13:return so===null?Ou():n.alternate===null&&J===0&&(J=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ka?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===ka?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Ou(),!1}if(F)return t=oo.current,t===null?(r!==Vi&&(t=Error(i(423),{cause:r}),Ji(Ci(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ci(r,n),a=tc(e.stateNode,r,a),Ya(e,a),J!==4&&(J=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Vi&&(e=Error(i(422),{cause:r}),Ji(Ci(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ci(o,n),Ql===null?Ql=[o]:Ql.push(o),J!==4&&(J=2),t===null)return!0;r=Ci(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=tc(n.stateNode,r,e),Ya(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(au===null||!au.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=nc(a),rc(a,e,n,r),Ya(n,a),!1}n=n.return}while(n!==null);return!1}var ac=Error(i(461)),oc=!1;function sc(e,t,n,r){t.child=e===null?Ua(t,null,n,r):Ha(t,e.child,n,r)}function cc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ia(t),r=Eo(e,t,n,o,a,i),s=Ao(),e!==null&&!oc?(jo(e,t,i),Mc(e,t,i)):(F&&s&&Fi(t),t.flags|=1,sc(e,t,r,i),t.child)}function lc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,uc(e,t,a,r,i)):(e=_i(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Nc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Or:n,n(o,r)&&e.ref===t.ref)return Mc(e,t,i)}return t.flags|=1,e=hi(a,r),e.ref=t.ref,e.return=t,t.child=e}function uc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Or(a,r)&&e.ref===t.ref){if(oc=!1,t.pendingProps=r=a,Nc(e,i))e.flags&131072&&(oc=!0);else return t.lanes=e.lanes,Mc(e,t,i)}}return vc(e,t,n,r,i)}function dc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return pc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&wa(t,a===null?null:a.cachePool),a===null?io():ro(t,a),uo(t);else return r=t.lanes=536870912,pc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&wa(t,null),io(),fo(t)):(wa(t,a.cachePool),ro(t,a),fo(t),t.memoizedState=null);return sc(e,t,i,n),t.child}function fc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function pc(e,t,n,r,i){var a=Ca();return a=a===null?null:{parent:da._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&wa(t,null),io(),uo(t),e!==null&&na(e,t,r,!0),t.childLanes=i,null}function mc(e,t){return t=Dc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function hc(e,t,n){return Ha(t,e.child,null,n),e=mc(t,t.pendingProps),e.flags|=2,po(t),t.memoizedState=null,e}function gc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(F){if(r.mode===`hidden`)return e=mc(t,r),t.lanes=536870912,fc(null,e);if(lo(t),(e=P)?(e=rf(e,Bi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,Ri=t,P=null)):e=null,e===null)throw Hi(t);return t.lanes=536870912,null}return mc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(lo(t),a){if(t.flags&256)t.flags&=-257,t=hc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(oc||na(e,t,n,!1),a=(n&e.childLanes)!==0,oc||a){if(r=W,r!==null&&(s=st(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ci(e,s),_u(r,e,s),ac;Ou(),t=hc(e,t,n)}else e=o.treeContext,P=cf(s.nextSibling),Ri=t,F=!0,zi=null,Bi=!1,e!==null&&Li(t,e),t=mc(t,r),t.flags|=4096;return t}return e=hi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function _c(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function vc(e,t,n,r,i){return ia(t),n=Eo(e,t,n,r,void 0,i),r=Ao(),e!==null&&!oc?(jo(e,t,i),Mc(e,t,i)):(F&&r&&Fi(t),t.flags|=1,sc(e,t,n,i),t.child)}function yc(e,t,n,r,i,a){return ia(t),t.updateQueue=null,n=Oo(t,r,n,i),Do(e),r=Ao(),e!==null&&!oc?(jo(e,t,a),Mc(e,t,a)):(F&&r&&Fi(t),t.flags|=1,sc(e,t,n,a),t.child)}function bc(e,t,n,r,i){if(ia(t),t.stateNode===null){var a=di,o=n.contextType;typeof o==`object`&&o&&(a=aa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ks,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ga(t),o=n.contextType,a.context=typeof o==`object`&&o?aa(o):di,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Gs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ks.enqueueReplaceState(a,a.state,null),Qa(t,r,a,i),Za(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ys(n,s);a.props=c;var l=a.context,u=n.contextType;o=di,typeof u==`object`&&u&&(o=aa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Js(t,a,r,o),Wa=!1;var f=t.memoizedState;a.state=f,Qa(t,r,a,i),Za(),l=t.memoizedState,s||f!==l||Wa?(typeof d==`function`&&(Gs(t,n,d,r),l=t.memoizedState),(c=Wa||qs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ka(e,t),o=t.memoizedProps,u=Ys(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=di,typeof l==`object`&&l&&(c=aa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Js(t,a,r,c),Wa=!1,f=t.memoizedState,a.state=f,Qa(t,r,a,i),Za();var p=t.memoizedState;o!==d||f!==p||Wa||e!==null&&e.dependencies!==null&&ra(e.dependencies)?(typeof s==`function`&&(Gs(t,n,s,r),p=t.memoizedState),(u=Wa||qs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ra(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,_c(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ha(t,e.child,null,i),t.child=Ha(t,null,n,i)):sc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Mc(e,t,i),e}function xc(e,t,n,r){return Ki(),t.flags|=256,sc(e,t,n,r),t.child}var Sc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cc(e){return{baseLanes:e,cachePool:Ta()}}function wc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Xl),e}function Tc(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(mo.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(F){if(a?co(t):fo(t),(e=P)?(e=rf(e,Bi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,Ri=t,P=null)):e=null,e===null)throw Hi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(fo(t),a=t.mode,c=Dc({mode:`hidden`,children:c},a),r=vi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,s,n),t.memoizedState=Sc,fc(null,r)):(co(t),Ec(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(co(t),t.flags&=-257,t=Oc(e,t,n)):t.memoizedState===null?(fo(t),c=r.fallback,a=t.mode,r=Dc({mode:`visible`,children:r.children},a),c=vi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ha(t,e.child,null,n),r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,s,n),t.memoizedState=Sc,t=fc(null,r)):(fo(t),t.child=e.child,t.flags|=128,t=null);else if(co(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ji({value:r,source:null,stack:null}),t=Oc(e,t,n)}else if(oc||na(e,t,n,!1),s=(n&e.childLanes)!==0,oc||s){if(s=W,s!==null&&(r=st(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ci(e,r),_u(s,e,r),ac;af(c)||Ou(),t=Oc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,P=cf(c.nextSibling),Ri=t,F=!0,zi=null,Bi=!1,e!==null&&Li(t,e),t=Ec(t,r.children),t.flags|=4096);return t}return a?(fo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=hi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=vi(c,a,n,null),c.flags|=2):c=hi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,fc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Cc(n):(a=c.cachePool,a===null?a=Ta():(l=da._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=wc(e,s,n),t.memoizedState=Sc,fc(e.child,r)):(co(t),n=e.child,e=n.sibling,n=hi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Ec(e,t){return t=Dc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Dc(e,t){return e=pi(22,e,null,t),e.lanes=0,e}function Oc(e,t,n){return Ha(t,e.child,null,n),e=Ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ea(e.return,t,n)}function Ac(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function jc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=mo.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,k(mo,o),sc(e,t,r,n),r=F?Di:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kc(e,n,t);else if(e.tag===19)kc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ho(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ac(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ho(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ac(t,!0,n,null,a,r);break;case`together`:Ac(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Mc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ql|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(na(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=hi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Nc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ra(e)))}function Pc(e,t,n){switch(t.tag){case 3:_e(t,t.stateNode.containerInfo),Qi(t,da,e.memoizedState.cache),Ki();break;case 27:case 5:ye(t);break;case 4:_e(t,t.stateNode.containerInfo);break;case 10:Qi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,lo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(co(t),e=Mc(e,t,n),e===null?null:e.sibling):Tc(e,t,n):(co(t),t.flags|=128,null);co(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(na(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return jc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(mo,mo.current),r)break;return null;case 22:return t.lanes=0,dc(e,t,n,t.pendingProps);case 24:Qi(t,da,e.memoizedState.cache)}return Mc(e,t,n)}function Fc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)oc=!0;else{if(!Nc(e,n)&&!(t.flags&128))return oc=!1,Pc(e,t,n);oc=!!(e.flags&131072)}}else oc=!1,F&&t.flags&1048576&&Pi(t,Di,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ma(t.elementType),t.type=e,typeof e==`function`)mi(e)?(r=Ys(e,r),t.tag=1,t=bc(null,t,e,r,n)):(t.tag=0,t=vc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=cc(null,t,e,r,n);break a}if(a===ne){t.tag=14,t=lc(null,t,e,r,n);break a}}throw t=ce(e)||e,Error(i(306,t,``))}}return t;case 0:return vc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ys(r,t.pendingProps),bc(e,t,r,a,n);case 3:a:{if(_e(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ka(e,t),Qa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Qi(t,da,r),r!==o.cache&&ta(t,[da],n,!0),Za(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=xc(e,t,r,n);break a}if(r!==a){a=Ci(Error(i(424)),t),Ji(a),t=xc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(P=cf(e.firstChild),Ri=t,F=!0,zi=null,Bi=!0,n=Ua(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ki(),r===a){t=Mc(e,t,n);break a}sc(e,t,r,n)}t=t.child}return t;case 26:return _c(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:F||(n=t.type,e=t.pendingProps,r=Bd(A.current).createElement(n),r[pt]=t,r[mt]=e,Pd(r,n,e),Et(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ye(t),e===null&&F&&(r=t.stateNode=ff(t.type,t.pendingProps,A.current),Ri=t,Bi=!0,a=P,Zd(t.type)?(lf=a,P=cf(r.firstChild)):P=a),sc(e,t,t.pendingProps.children,n),_c(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&F&&((a=r=P)&&(r=tf(r,t.type,t.pendingProps,Bi),r===null?a=!1:(t.stateNode=r,Ri=t,P=cf(r.firstChild),Bi=!1,a=!0)),a||Hi(t)),ye(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Eo(e,t,ko,null,null,n),Qf._currentValue=a),_c(e,t),sc(e,t,r,n),t.child;case 6:return e===null&&F&&((e=n=P)&&(n=nf(n,t.pendingProps,Bi),n===null?e=!1:(t.stateNode=n,Ri=t,P=null,e=!0)),e||Hi(t)),null;case 13:return Tc(e,t,n);case 4:return _e(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ha(t,null,r,n):sc(e,t,r,n),t.child;case 11:return cc(e,t,t.type,t.pendingProps,n);case 7:return sc(e,t,t.pendingProps,n),t.child;case 8:return sc(e,t,t.pendingProps.children,n),t.child;case 12:return sc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Qi(t,t.type,r.value),sc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,ia(t),a=aa(a),r=r(a),t.flags|=1,sc(e,t,r,n),t.child;case 14:return lc(e,t,t.type,t.pendingProps,n);case 15:return uc(e,t,t.type,t.pendingProps,n);case 19:return jc(e,t,n);case 31:return gc(e,t,n);case 22:return dc(e,t,n,t.pendingProps);case 24:return ia(t),r=aa(da),e===null?(a=Ca(),a===null&&(a=W,o=fa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ga(t),Qi(t,da,a)):((e.lanes&n)!==0&&(Ka(e,t),Qa(t,null,null,n),Za()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Qi(t,da,r),r!==a.cache&&ta(t,[da],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Qi(t,da,r))),sc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Ic(e){e.flags|=4}function Lc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Eu())e.flags|=8192;else throw Na=ka,Da}}else e.flags&=-16777217}function Rc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Eu())e.flags|=8192;else throw Na=ka,Da}}function zc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:tt(),e.lanes|=t,Zl|=t)}function Bc(e,t){if(!F)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vc(e,t,n){var r=t.pendingProps;switch(Ii(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),$i(da),ve(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Gi(t)?Ic(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,qi())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Ic(t),o===null?(V(t),Lc(t,a,null,r,n)):(V(t),Rc(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(Ic(t),V(t),Rc(t,o)):(e=e.memoizedProps,e!==r&&Ic(t),V(t),Lc(t,a,e,r,n)),null;case 27:if(be(t),n=A.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),null}e=me.current,Gi(t)?Ui(t,e):(e=ff(a,r,n),t.stateNode=e,Ic(t))}return V(t),null;case 5:if(be(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),null}if(o=me.current,Gi(t))Ui(t,o);else{var s=Bd(A.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[pt]=t,o[mt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Ic(t)}}return V(t),Lc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=A.current,Gi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ri,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[pt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Hi(t,!0)}else e=Bd(e).createTextNode(r),e[pt]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Gi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[pt]=t}else Ki(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(po(t),t):(po(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Gi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[pt]=t}else Ki(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(po(t),t):(po(t),null)}return po(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),zc(t,t.updateQueue),V(t),null);case 4:return ve(),e===null&&Sd(t.stateNode.containerInfo),V(t),null;case 10:return $i(t.type),V(t),null;case 19:if(pe(mo),r=t.memoizedState,r===null)return V(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Bc(r,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ho(e),o!==null){for(t.flags|=128,Bc(r,!1),e=o.updateQueue,t.updateQueue=e,zc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)gi(n,e),n=n.sibling;return k(mo,mo.current&1|2),F&&Ni(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ne()>ru&&(t.flags|=128,a=!0,Bc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=ho(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,zc(t,e),Bc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!F)return V(t),null}else 2*Ne()-r.renderingStartTime>ru&&n!==536870912&&(t.flags|=128,a=!0,Bc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(V(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ne(),e.sibling=null,n=mo.current,k(mo,a?n&1|2:n&1),F&&Ni(t,r.treeForkCount),e);case 22:case 23:return po(t),ao(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&zc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&pe(Sa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),$i(da),V(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Hc(e,t){switch(Ii(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return $i(da),ve(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return be(t),null;case 31:if(t.memoizedState!==null){if(po(t),t.alternate===null)throw Error(i(340));Ki()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(po(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ki()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(mo),null;case 4:return ve(),null;case 10:return $i(t.type),null;case 22:case 23:return po(t),ao(),e!==null&&pe(Sa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return $i(da),null;case 25:return null;default:return null}}function Uc(e,t){switch(Ii(t),t.tag){case 3:$i(da),ve();break;case 26:case 27:case 5:be(t);break;case 4:ve();break;case 31:t.memoizedState!==null&&po(t);break;case 13:po(t);break;case 19:pe(mo);break;case 10:$i(t.type);break;case 22:case 23:po(t),ao(),e!==null&&pe(Sa);break;case 24:$i(da)}}function Wc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Gc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Kc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{eo(t,n)}catch(t){Z(e,e.return,t)}}}function qc(e,t,n){n.props=Ys(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Jc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Yc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Xc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Zc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[mt]=t}catch(t){Z(e,e.return,t)}}function Qc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function $c(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=sn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[pt]=e,t[mt]=n}catch(t){Z(e,e.return,t)}}var rl=!1,il=!1,al=!1,ol=typeof WeakSet==`function`?WeakSet:Set,sl=null;function cl(e,t){if(e=e.containerInfo,Rd=sp,e=Mr(e),Nr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,sl=t;sl!==null;)if(t=sl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,sl=e;else for(;sl!==null;){switch(t=sl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ys(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,sl=e;break}sl=t.return}}function ll(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Cl(e,n),r&4&&Wc(5,n);break;case 1:if(Cl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ys(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Kc(n),r&512&&Jc(n,n.return);break;case 3:if(Cl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{eo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&nl(n);case 26:case 5:Cl(e,n),t===null&&r&4&&Xc(n),r&512&&Jc(n,n.return);break;case 12:Cl(e,n);break;case 31:Cl(e,n),r&4&&ml(e,n);break;case 13:Cl(e,n),r&4&&hl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||rl,!r){t=t!==null&&t.memoizedState!==null||il,i=rl;var a=il;rl=r,(il=t)&&!a?Tl(e,n,!!(n.subtreeFlags&8772)):Cl(e,n),rl=i,il=a}break;case 30:break;default:Cl(e,n)}}function ul(e){var t=e.alternate;t!==null&&(e.alternate=null,ul(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var H=null,dl=!1;function fl(e,t,n){for(n=n.child;n!==null;)pl(e,t,n),n=n.sibling}function pl(e,t,n){if(Ue&&typeof Ue.onCommitFiberUnmount==`function`)try{Ue.onCommitFiberUnmount(He,n)}catch{}switch(n.tag){case 26:il||Yc(n,t),fl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:il||Yc(n,t);var r=H,i=dl;Zd(n.type)&&(H=n.stateNode,dl=!1),fl(e,t,n),pf(n.stateNode),H=r,dl=i;break;case 5:il||Yc(n,t);case 6:if(r=H,i=dl,H=null,fl(e,t,n),H=r,dl=i,H!==null){if(dl)try{(H.nodeType===9?H.body:H.nodeName===`HTML`?H.ownerDocument.body:H).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{H.removeChild(n.stateNode)}catch(e){Z(n,t,e)}}break;case 18:H!==null&&(dl?(e=H,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(H,n.stateNode));break;case 4:r=H,i=dl,H=n.stateNode.containerInfo,dl=!0,fl(e,t,n),H=r,dl=i;break;case 0:case 11:case 14:case 15:Gc(2,n,t),il||Gc(4,n,t),fl(e,t,n);break;case 1:il||(Yc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&qc(n,t,r)),fl(e,t,n);break;case 21:fl(e,t,n);break;case 22:il=(r=il)||n.memoizedState!==null,fl(e,t,n),il=r;break;default:fl(e,t,n)}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function hl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function gl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ol),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ol),t;default:throw Error(i(435,e.tag))}}function _l(e,t){var n=gl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function vl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){H=c.stateNode,dl=!1;break a}break;case 5:H=c.stateNode,dl=!1;break a;case 3:case 4:H=c.stateNode.containerInfo,dl=!0;break a}c=c.return}if(H===null)throw Error(i(160));pl(o,s,a),H=null,dl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)bl(t,e),t=t.sibling}var yl=null;function bl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:vl(t,e),xl(e),r&4&&(Gc(3,e,e.return),Wc(3,e),Gc(5,e,e.return));break;case 1:vl(t,e),xl(e),r&512&&(il||n===null||Yc(n,n.return)),r&64&&rl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=yl;if(vl(t,e),xl(e),r&512&&(il||n===null||Yc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[bt]||o[pt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[pt]=e,Et(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[pt]=e,Et(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Zc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:vl(t,e),xl(e),r&512&&(il||n===null||Yc(n,n.return)),n!==null&&r&4&&Zc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(vl(t,e),xl(e),r&512&&(il||n===null||Yc(n,n.return)),e.flags&32){a=e.stateNode;try{Qt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Zc(e,a,n===null?a:n.memoizedProps)),r&1024&&(al=!0);break;case 6:if(vl(t,e),xl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=yl,yl=gf(t.containerInfo),vl(t,e),yl=a,xl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}al&&(al=!1,Sl(e));break;case 4:r=yl,yl=gf(e.stateNode.containerInfo),vl(t,e),xl(e),yl=r;break;case 12:vl(t,e),xl(e);break;case 31:vl(t,e),xl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,_l(e,r)));break;case 13:vl(t,e),xl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(tu=Ne()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,_l(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=rl,d=il;if(rl=u||a,il=d||l,vl(t,e),il=d,rl=u,xl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||rl||il||wl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,_l(e,n))));break;case 19:vl(t,e),xl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,_l(e,r)));break;case 30:break;case 21:break;default:vl(t,e),xl(e)}}function xl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Qc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;tl(e,$c(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Qt(o,``),n.flags&=-33),tl(e,$c(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;el(e,$c(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Sl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Cl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ll(e,t.alternate,t),t=t.sibling}function wl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Gc(4,t,t.return),wl(t);break;case 1:Yc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&qc(t,t.return,n),wl(t);break;case 27:pf(t.stateNode);case 26:case 5:Yc(t,t.return),wl(t);break;case 22:t.memoizedState===null&&wl(t);break;case 30:wl(t);break;default:wl(t)}e=e.sibling}}function Tl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Tl(i,a,n),Wc(4,a);break;case 1:if(Tl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)$a(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Kc(a),Jc(a,a.return);break;case 27:nl(a);case 26:case 5:Tl(i,a,n),n&&r===null&&o&4&&Xc(a),Jc(a,a.return);break;case 12:Tl(i,a,n);break;case 31:Tl(i,a,n),n&&o&4&&ml(i,a);break;case 13:Tl(i,a,n),n&&o&4&&hl(i,a);break;case 22:a.memoizedState===null&&Tl(i,a,n),Jc(a,a.return);break;case 30:break;default:Tl(i,a,n)}t=t.sibling}}function El(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&pa(n))}function Dl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pa(e))}function Ol(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)kl(e,t,n,r),t=t.sibling}function kl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Ol(e,t,n,r),i&2048&&Wc(9,t);break;case 1:Ol(e,t,n,r);break;case 3:Ol(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pa(e)));break;case 12:if(i&2048){Ol(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Ol(e,t,n,r);break;case 31:Ol(e,t,n,r);break;case 13:Ol(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Ol(e,t,n,r):(a._visibility|=2,Al(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Ol(e,t,n,r):jl(e,t),i&2048&&El(o,t);break;case 24:Ol(e,t,n,r),i&2048&&Dl(t.alternate,t);break;default:Ol(e,t,n,r)}}function Al(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Al(a,o,s,c,i),Wc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Al(a,o,s,c,i)):u._visibility&2?Al(a,o,s,c,i):jl(a,o),i&&l&2048&&El(o.alternate,o);break;case 24:Al(a,o,s,c,i),i&&l&2048&&Dl(o.alternate,o);break;default:Al(a,o,s,c,i)}t=t.sibling}}function jl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:jl(n,r),i&2048&&El(r.alternate,r);break;case 24:jl(n,r),i&2048&&Dl(r.alternate,r);break;default:jl(n,r)}t=t.sibling}}var Ml=8192;function Nl(e,t,n){if(e.subtreeFlags&Ml)for(e=e.child;e!==null;)Pl(e,t,n),e=e.sibling}function Pl(e,t,n){switch(e.tag){case 26:Nl(e,t,n),e.flags&Ml&&e.memoizedState!==null&&Gf(n,yl,e.memoizedState,e.memoizedProps);break;case 5:Nl(e,t,n);break;case 3:case 4:var r=yl;yl=gf(e.stateNode.containerInfo),Nl(e,t,n),yl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ml,Ml=16777216,Nl(e,t,n),Ml=r):Nl(e,t,n));break;default:Nl(e,t,n)}}function Fl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Il(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];sl=r,zl(r,e)}Fl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ll(e),e=e.sibling}function Ll(e){switch(e.tag){case 0:case 11:case 15:Il(e),e.flags&2048&&Gc(9,e,e.return);break;case 3:Il(e);break;case 12:Il(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Rl(e)):Il(e);break;default:Il(e)}}function Rl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];sl=r,zl(r,e)}Fl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Gc(8,t,t.return),Rl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Rl(t));break;default:Rl(t)}e=e.sibling}}function zl(e,t){for(;sl!==null;){var n=sl;switch(n.tag){case 0:case 11:case 15:Gc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:pa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,sl=r;else a:for(n=e;sl!==null;){r=sl;var i=r.sibling,a=r.return;if(ul(r),r===n){sl=null;break a}if(i!==null){i.return=a,sl=i;break a}sl=a}}}var Bl={getCacheForType:function(e){var t=aa(da),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return aa(da).controller.signal}},Vl=typeof WeakMap==`function`?WeakMap:Map,U=0,W=null,G=null,K=0,q=0,Hl=null,Ul=!1,Wl=!1,Gl=!1,Kl=0,J=0,ql=0,Jl=0,Yl=0,Xl=0,Zl=0,Ql=null,$l=null,eu=!1,tu=0,nu=0,ru=1/0,iu=null,au=null,ou=0,su=null,cu=null,lu=0,uu=0,du=null,fu=null,pu=0,mu=null;function hu(){return U&2&&K!==0?K&-K:D.T===null?ut():dd()}function gu(){if(Xl===0){if(!(K&536870912)||F){var e=Ye;Ye<<=1,!(Ye&3932160)&&(Ye=262144),Xl=e}else Xl=536870912}return e=oo.current,e!==null&&(e.flags|=32),Xl}function _u(e,t,n){(e===W&&(q===2||q===9)||e.cancelPendingCommit!==null)&&(wu(e,0),xu(e,K,Xl,!1)),rt(e,n),(!(U&2)||e!==W)&&(e===W&&(!(U&2)&&(Jl|=n),J===4&&xu(e,K,Xl,!1)),rd(e))}function vu(e,t,n){if(U&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||$e(e,t),a=r?ju(e,t):ku(e,t,!0),o=r;do{if(a===0){Wl&&!r&&xu(e,t,0,!1);break}if(n=e.current.alternate,o&&!bu(n)){a=ku(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Ql;var l=c.current.memoizedState.isDehydrated;if(l&&(wu(c,s).flags|=256),s=ku(c,s,!1),s!==2){if(Gl&&!l){c.errorRecoveryDisabledLanes|=o,Jl|=o,a=4;break a}o=$l,$l=a,o!==null&&($l===null?$l=o:$l.push.apply($l,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){wu(e,0),xu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:xu(r,t,Xl,!Ul);break a;case 2:$l=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=tu+300-Ne(),10<a)){if(xu(r,t,Xl,!Ul),Qe(r,0,!0)!==0)break a;lu=t,r.timeoutHandle=Kd(yu.bind(null,r,n,$l,iu,eu,t,Xl,Jl,Zl,Ul,o,`Throttled`,-0,0),a);break a}yu(r,n,$l,iu,eu,t,Xl,Jl,Zl,Ul,o,null,-0,0)}break}while(1);rd(e)}function yu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sn},Pl(t,a,d);var m=(a&62914560)===a?tu-Ne():(a&4194048)===a?nu-Ne():0;if(m=qf(d,m),m!==null){lu=a,e.cancelPendingCommit=m(Ru.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),xu(e,a,o,!l);return}}Ru(e,t,a,n,r,i,o,s,c)}function bu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Dr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function xu(e,t,n,r){t&=~Yl,t&=~Jl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ge(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&at(e,n,t)}function Su(){return U&6?!0:(id(0,!1),!1)}function Cu(){if(G!==null){if(q===0)var e=G.return;else e=G,Zi=Xi=null,Mo(e),Ia=null,La=0,e=G;for(;e!==null;)Uc(e.alternate,e),e=e.return;G=null}}function wu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),lu=0,Cu(),W=e,G=n=hi(e.current,null),K=t,q=0,Hl=null,Ul=!1,Wl=$e(e,t),Gl=!1,Zl=Xl=Yl=Jl=ql=J=0,$l=Ql=null,eu=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ge(r),a=1<<i;t|=e[i],r&=~a}return Kl=t,ai(),n}function Tu(e,t){L=null,D.H=Vs,t===Ea||t===Oa?(t=Pa(),q=3):t===Da?(t=Pa(),q=4):q=t===ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Hl=t,G===null&&(J=1,$s(e,Ci(t,e.current)))}function Eu(){var e=oo.current;return e===null?!0:(K&4194048)===K?so===null:(K&62914560)===K||K&536870912?e===so:!1}function Du(){var e=D.H;return D.H=Vs,e===null?Vs:e}function Y(){var e=D.A;return D.A=Bl,e}function Ou(){J=4,Ul||(K&4194048)!==K&&oo.current!==null||(Wl=!0),!(ql&134217727)&&!(Jl&134217727)||W===null||xu(W,K,Xl,!1)}function ku(e,t,n){var r=U;U|=2;var i=Du(),a=Y();(W!==e||K!==t)&&(iu=null,wu(e,t)),t=!1;var o=J;a:do try{if(q!==0&&G!==null){var s=G,c=Hl;switch(q){case 8:Cu(),o=6;break a;case 3:case 2:case 9:case 6:oo.current===null&&(t=!0);var l=q;if(q=0,Hl=null,Fu(e,s,c,l),n&&Wl){o=0;break a}break;default:l=q,q=0,Hl=null,Fu(e,s,c,l)}}Au(),o=J;break}catch(t){Tu(e,t)}while(1);return t&&e.shellSuspendCounter++,Zi=Xi=null,U=r,D.H=i,D.A=a,G===null&&(W=null,K=0,ai()),o}function Au(){for(;G!==null;)Nu(G)}function ju(e,t){var n=U;U|=2;var r=Du(),a=Y();W!==e||K!==t?(iu=null,ru=Ne()+500,wu(e,t)):Wl=$e(e,t);a:do try{if(q!==0&&G!==null){t=G;var o=Hl;b:switch(q){case 1:q=0,Hl=null,Fu(e,t,o,1);break;case 2:case 9:if(Aa(o)){q=0,Hl=null,Pu(t);break}t=function(){q!==2&&q!==9||W!==e||(q=7),rd(e)},o.then(t,t);break a;case 3:q=7;break a;case 4:q=5;break a;case 7:Aa(o)?(q=0,Hl=null,Pu(t)):(q=0,Hl=null,Fu(e,t,o,7));break;case 5:var s=null;switch(G.tag){case 26:s=G.memoizedState;case 5:case 27:var c=G;if(s?Wf(s):c.stateNode.complete){q=0,Hl=null;var l=c.sibling;if(l!==null)G=l;else{var u=c.return;u===null?G=null:(G=u,Iu(u))}break b}}q=0,Hl=null,Fu(e,t,o,5);break;case 6:q=0,Hl=null,Fu(e,t,o,6);break;case 8:Cu(),J=6;break a;default:throw Error(i(462))}}Mu();break}catch(t){Tu(e,t)}while(1);return Zi=Xi=null,D.H=r,D.A=a,U=n,G===null?(W=null,K=0,ai(),J):0}function Mu(){for(;G!==null&&!je();)Nu(G)}function Nu(e){var t=Fc(e.alternate,e,Kl);e.memoizedProps=e.pendingProps,t===null?Iu(e):G=t}function Pu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=yc(n,t,t.pendingProps,t.type,void 0,K);break;case 11:t=yc(n,t,t.pendingProps,t.type.render,t.ref,K);break;case 5:Mo(t);default:Uc(n,t),t=G=gi(t,Kl),t=Fc(n,t,Kl)}e.memoizedProps=e.pendingProps,t===null?Iu(e):G=t}function Fu(e,t,n,r){Zi=Xi=null,Mo(t),Ia=null,La=0;var i=t.return;try{if(ic(e,i,t,n,K)){J=1,$s(e,Ci(n,e.current)),G=null;return}}catch(t){if(i!==null)throw G=i,t;J=1,$s(e,Ci(n,e.current)),G=null;return}t.flags&32768?(F||r===1?e=!0:Wl||K&536870912?e=!1:(Ul=e=!0,(r===2||r===9||r===3||r===6)&&(r=oo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Lu(t,e)):Iu(t)}function Iu(e){var t=e;do{if(t.flags&32768){Lu(t,Ul);return}e=t.return;var n=Vc(t.alternate,t,Kl);if(n!==null){G=n;return}if(t=t.sibling,t!==null){G=t;return}G=t=e}while(t!==null);J===0&&(J=5)}function Lu(e,t){do{var n=Hc(e.alternate,e);if(n!==null){n.flags&=32767,G=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){G=e;return}G=e=n}while(e!==null);J=6,G=null}function Ru(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Uu();while(ou!==0);if(U&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ii,it(e,n,o,s,c,l),e===W&&(G=W=null,K=0),cu=t,su=e,lu=n,uu=o,du=a,fu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Le,function(){return X(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=D.T,D.T=null,a=O.p,O.p=2,s=U,U|=4;try{cl(e,t,n)}finally{U=s,O.p=a,D.T=r}}ou=1,zu(),Bu(),Vu()}}function zu(){if(ou===1){ou=0;var e=su,t=cu,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=D.T,D.T=null;var r=O.p;O.p=2;var i=U;U|=4;try{bl(t,e);var a=zd,o=Mr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&jr(s.ownerDocument.documentElement,s)){if(c!==null&&Nr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Ar(s,h),v=Ar(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{U=i,O.p=r,D.T=n}}e.current=t,ou=2}}function Bu(){if(ou===2){ou=0;var e=su,t=cu,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=D.T,D.T=null;var r=O.p;O.p=2;var i=U;U|=4;try{ll(e,t.alternate,t)}finally{U=i,O.p=r,D.T=n}}ou=3}}function Vu(){if(ou===4||ou===3){ou=0,Me();var e=su,t=cu,n=lu,r=fu;t.subtreeFlags&10256||t.flags&10256?ou=5:(ou=0,cu=su=null,Hu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(au=null),lt(n),t=t.stateNode,Ue&&typeof Ue.onCommitFiberRoot==`function`)try{Ue.onCommitFiberRoot(He,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=D.T,i=O.p,O.p=2,D.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{D.T=t,O.p=i}}lu&3&&Uu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===mu?pu++:(pu=0,mu=e):pu=0,id(0,!1)}}function Hu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,pa(t)))}function Uu(){return zu(),Bu(),Vu(),X()}function X(){if(ou!==5)return!1;var e=su,t=uu;uu=0;var n=lt(lu),r=D.T,a=O.p;try{O.p=32>n?32:n,D.T=null,n=du,du=null;var o=su,s=lu;if(ou=0,cu=su=null,lu=0,U&6)throw Error(i(331));var c=U;if(U|=4,Ll(o.current),kl(o,o.current,s,n),U=c,id(0,!1),Ue&&typeof Ue.onPostCommitFiberRoot==`function`)try{Ue.onPostCommitFiberRoot(He,o)}catch{}return!0}finally{O.p=a,D.T=r,Hu(e,t)}}function Wu(e,t,n){t=Ci(n,t),t=tc(e.stateNode,t,2),e=qa(e,t,2),e!==null&&(rt(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(au===null||!au.has(r))){e=Ci(n,e),n=nc(2),r=qa(t,n,2),r!==null&&(rc(n,r,t,e),rt(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Vl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Gl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,W===e&&(K&n)===n&&(J===4||J===3&&(K&62914560)===K&&300>Ne()-tu?!(U&2)&&wu(e,0):Yl|=n,Zl===K&&(Zl=0)),rd(e)}function qu(e,t){t===0&&(t=tt()),e=ci(e,t),e!==null&&(rt(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return ke(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ge(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=K,a=Qe(r,r===W?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||$e(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Ne(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}ou!==0&&ou!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ge(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=et(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=W,n=K,n=Qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(q===2||q===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ae(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||$e(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ae(r),lt(n)){case 2:case 8:n=Ie;break;case 32:n=Le;break;case 268435456:n=ze;break;default:n=Le}return r=cd.bind(null,e),n=ke(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ae(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(ou!==0&&ou!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Uu()&&e.callbackNode!==n)return null;var r=K;return r=Qe(e,e===W?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(vu(e,r,t),sd(e,Ne()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Uu())return null;vu(e,t,!0)}function ud(){Yd(function(){U&6?ke(Fe,ad):od()})}function dd(){if(nd===0){var e=ga;e===0&&(e=Je,Je<<=1,!(Je&261888)&&(Je=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:on(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[mt]||null).action),o=r.submitter;o&&(t=(t=o[mt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new On(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ds(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ds(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<$r.length;hd++){var gd=$r[hd];ei(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ei(Gr,`onAnimationEnd`),ei(Kr,`onAnimationIteration`),ei(qr,`onAnimationStart`),ei(`dblclick`,`onDoubleClick`),ei(`focusin`,`onFocus`),ei(`focusout`,`onBlur`),ei(Jr,`onTransitionRun`),ei(Yr,`onTransitionStart`),ei(Xr,`onTransitionCancel`),ei(Zr,`onTransitionEnd`),At(`onMouseEnter`,[`mouseout`,`mouseover`]),At(`onMouseLeave`,[`mouseout`,`mouseover`]),At(`onPointerEnter`,[`pointerout`,`pointerover`]),At(`onPointerLeave`,[`pointerout`,`pointerover`]),kt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),kt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),kt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),kt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ti(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ti(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[gt];n===void 0&&(n=t[gt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Dt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!_n||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=St(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}mn(function(){var r=a,i=ln(n),s=[];a:{var c=Qr.get(e);if(c!==void 0){var l=On,u=e;switch(e){case`keypress`:if(Cn(n)===0)break a;case`keydown`:case`keyup`:l=Kn;break;case`focusin`:u=`focus`,l=Ln;break;case`focusout`:u=`blur`,l=Ln;break;case`beforeblur`:case`afterblur`:l=Ln;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Fn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=In;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=qn;break;case Gr:case Kr:case qr:l=Rn;break;case Zr:l=Jn;break;case`scroll`:case`scrollend`:l=An;break;case`wheel`:l=Yn;break;case`copy`:case`cut`:case`paste`:l=zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=M;break;case`toggle`:case`beforetoggle`:l=Xn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=hn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==cn&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[ht]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?St(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Fn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=M,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:wt(l),h=u==null?c:wt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=hr;else if(lr(c)){if(gr)v=Tr;else{v=Cr;var y=Sr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&nn(r.elementType)&&(v=hr):v=wr;if(v&&=v(e,r)){ur(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Jt(c,`number`,c.value)}switch(y=r?wt(r):window,e){case`focusin`:(lr(y)||y.contentEditable===`true`)&&(Fr=y,Ir=r,Lr=null);break;case`focusout`:Lr=Ir=Fr=null;break;case`mousedown`:Rr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Rr=!1,zr(s,n,i);break;case`selectionchange`:if(Pr)break;case`keydown`:case`keyup`:zr(s,n,i)}var b;if(Qn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else or?ir(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(tr&&n.locale!==`ko`&&(or||x!==`onCompositionStart`?x===`onCompositionEnd`&&or&&(b=Sn()):(yn=i,bn=`value`in yn?yn.value:yn.textContent,or=!0)),y=Ed(r,x),0<y.length&&(x=new Bn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=ar(n),b!==null&&(x.data=b)))),(b=er?sr(e,n):N(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Bn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=hn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=hn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=hn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=hn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Qt(e,``+r);break;case`className`:It(e,`class`,r);break;case`tabIndex`:It(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:It(e,n,r);break;case`style`:tn(e,r,o);break;case`data`:if(t!==`object`){It(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=on(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ft(e,`popover`,r);break;case`xlinkActuate`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ft(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=rn.get(n)||n,Ft(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:tn(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Qt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ot.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[mt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ft(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}qt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Yt(e,!!r,n,!0):Yt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Zt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(nn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Kt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Yt(e,!!n,n?[]:``,!1):Yt(e,!!n,t,!0)):Yt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Xt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(nn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[bt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[bt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=O.d;O.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=Su();return e||t}function yf(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?ks(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Gt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Gt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Gt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Gt(n.imageSizes)+`"]`)):i+=`[href="`+Gt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Gt(r)+`"][href="`+Gt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Tt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Et(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=A.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Tt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Tt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Tt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Gt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Et(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Gt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Gt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Et(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Et(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Et(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Et(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[bt]||a[pt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nt(0),this.hiddenUpdates=nt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=pi(3,null,null,t),e.current=a,a.stateNode=e,t=fa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ga(a),e}function tp(e){return e?(e=di,e):di}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=I(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=qa(e,r,t),n!==null&&(_u(n,e,t),Ja(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ci(e,67108864);t!==null&&_u(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=hu();t=ct(t);var n=ci(e,t);n!==null&&_u(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=D.T;D.T=null;var a=O.p;try{O.p=2,up(e,t,n,r)}finally{O.p=a,D.T=i}}function lp(e,t,n,r){var i=D.T;D.T=null;var a=O.p;try{O.p=8,up(e,t,n,r)}finally{O.p=a,D.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ze(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ge(o);s.entanglements[1]|=c,o&=~c}rd(a),!(U&6)&&(ru=Ne()+500,id(0,!1))}}break;case 31:case 13:s=ci(a,2),s!==null&&_u(s,a,2),Su(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=ln(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=St(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Pe()){case Fe:return 2;case Ie:return 8;case Le:case Re:return 32;case ze:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=St(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);cn=r,n.target.dispatchEvent(r),cn=null}else return t=Ct(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Ds(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[mt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[mt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,hu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),Su(),t[ht]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ut();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));O.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:D,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{He=zp.inject(Rp),Ue=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Xs,s=Zs,c=Qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ht]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`-ms-`,v=`-moz-`,y=`-webkit-`,b=`comm`,x=`rule`,S=`decl`,C=`@import`,w=`@namespace`,ee=`@keyframes`,te=`@layer`,ne=Math.abs,re=String.fromCharCode,ie=Object.assign;function ae(e,t){return E(e,0)^45?(((t<<2^E(e,0))<<2^E(e,1))<<2^E(e,2))<<2^E(e,3):0}function oe(e){return e.trim()}function se(e,t){return(e=t.exec(e))?e[0]:e}function T(e,t,n){return e.replace(t,n)}function ce(e,t,n){return e.indexOf(t,n)}function E(e,t){return e.charCodeAt(t)|0}function D(e,t,n){return e.slice(t,n)}function O(e){return e.length}function le(e){return e.length}function ue(e,t){return t.push(e),e}function de(e,t){return e.map(t).join(``)}function fe(e,t){return e.filter(function(e){return!se(e,t)})}var pe=1,k=1,me=0,he=0,A=0,ge=``;function _e(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:pe,column:k,length:o,return:``,siblings:s}}function ve(e,t){return ie(_e(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function ye(e){for(;e.root;)e=ve(e.root,{children:[e]});ue(e,e.siblings)}function be(){return A}function xe(){return A=he>0?E(ge,--he):0,k--,A===10&&(k=1,pe--),A}function Se(){return A=he<me?E(ge,he++):0,k++,A===10&&(k=1,pe++),A}function Ce(){return E(ge,he)}function we(){return he}function Te(e,t){return D(ge,e,t)}function Ee(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function De(e){return pe=k=1,me=O(ge=e),he=0,[]}function Oe(e){return ge=``,e}function ke(e){return oe(Te(he-1,Me(e===91?e+2:e===40?e+1:e)))}function Ae(e){for(;(A=Ce())&&A<33;)Se();return Ee(e)>2||Ee(A)>3?``:` `}function je(e,t){for(;--t&&Se()&&!(A<48||A>102||A>57&&A<65||A>70&&A<97););return Te(e,we()+(t<6&&Ce()==32&&Se()==32))}function Me(e){for(;Se();)switch(A){case e:return he;case 34:case 39:e!==34&&e!==39&&Me(A);break;case 40:e===41&&Me(e);break;case 92:Se();break}return he}function Ne(e,t){for(;Se()&&e+A!==57&&(e+A!==84||Ce()!==47););return`/*`+Te(t,he-1)+`*`+re(e===47?e:Se())}function Pe(e){for(;!Ee(Ce());)Se();return Te(e,he)}function Fe(e){return Oe(Ie(``,null,null,null,[``],e=De(e),0,[0],e))}function Ie(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Se()){case 40:if(m!=108&&E(C,d-1)==58){ce(C+=T(ke(v),`&`,`&\f`),`&\f`,ne(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=ke(v);break;case 9:case 10:case 13:case 32:C+=Ae(m);break;case 92:C+=je(we()-1,7);continue;case 47:switch(Ce()){case 42:case 47:ue(Re(Ne(Se(),we()),t,n,c),c),(Ee(m||1)==5||Ee(Ce()||1)==5)&&O(C)&&D(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=O(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=T(C,/\f/g,``)),p>0&&(O(C)-d||h===0&&m===47)&&ue(p>32?ze(C+`;`,r,n,d-1,c):ze(T(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(ue(S=Le(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)Ie(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(E(C,3)===110)break;case 108:if(E(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Ie(e,S,S,r&&ue(Le(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Ie(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+O(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&xe()==125)continue}switch(C+=re(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(O(C)-1)*_,_=1;break;case 64:Ce()===45&&(C+=ke(Se())),f=Ce(),u=d=O(y=C+=Pe(we())),v++;break;case 45:m===45&&O(C)==2&&(h=0)}}return a}function Le(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=le(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=D(e,f+1,f=ne(g=o[h])),b=e;v<m;++v)(b=oe(g>0?p[v]+` `+y:T(y,/&\f/g,p[v])))&&(c[_++]=b);return _e(e,t,n,i===0?x:s,c,l,u,d)}function Re(e,t,n,r){return _e(e,t,n,b,re(be()),D(e,2,-2),0,r)}function ze(e,t,n,r,i){return _e(e,t,n,S,D(e,0,r),D(e,r+1,-1),r,i)}function Be(e,t,n){switch(ae(e,t)){case 5103:return y+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return y+e+e;case 4855:return y+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return v+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return y+e+v+e+_+e+e;case 5936:switch(E(e,t+11)){case 114:return y+e+_+T(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return y+e+_+T(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return y+e+_+T(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return y+e+_+e+e;case 6165:return y+e+_+`flex-`+e+e;case 5187:return y+e+T(e,/(\w+).+(:[^]+)/,y+`box-$1$2`+_+`flex-$1$2`)+e;case 5443:return y+e+_+`flex-item-`+T(e,/flex-|-self/g,``)+(se(e,/flex-|baseline/)?``:_+`grid-row-`+T(e,/flex-|-self/g,``))+e;case 4675:return y+e+_+`flex-line-pack`+T(e,/align-content|flex-|-self/g,``)+e;case 5548:return y+e+_+T(e,`shrink`,`negative`)+e;case 5292:return y+e+_+T(e,`basis`,`preferred-size`)+e;case 6060:return y+`box-`+T(e,`-grow`,``)+y+e+_+T(e,`grow`,`positive`)+e;case 4554:return y+T(e,/([^-])(transform)/g,`$1`+y+`$2`)+e;case 6187:return T(T(T(e,/(zoom-|grab)/,y+`$1`),/(image-set)/,y+`$1`),e,``)+e;case 5495:case 3959:return T(e,/(image-set\([^]*)/,y+"$1$`$1");case 4968:return T(T(e,/(.+:)(flex-)?(.*)/,y+`box-pack:$3`+_+`flex-pack:$3`),/space-between/,`justify`)+y+e+e;case 4200:if(!se(e,/flex-|baseline/))return _+`grid-column-align`+D(e,t)+e;break;case 2592:case 3360:return _+T(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,se(e.props,/grid-\w+-end/)})?~ce(e+(n=n[t].value),`span`,0)?e:_+T(e,`-start`,``)+e+_+`grid-row-span:`+(~ce(n,`span`,0)?se(n,/\d+/):se(n,/\d+/)-+se(e,/\d+/))+`;`:_+T(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return se(e.props,/grid-\w+-start/)})?e:_+T(T(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return T(e,/(.+)-inline(.+)/,y+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(O(e)-1-t>6)switch(E(e,t+1)){case 109:if(E(e,t+4)!==45)break;case 102:return T(e,/(.+:)(.+)-([^]+)/,`$1`+y+`$2-$3$1`+v+(E(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~ce(e,`stretch`,0)?Be(T(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return T(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return _+n+`:`+r+s+(i?_+n+`-span:`+(a?o:o-+r)+s:``)+e});case 4949:if(E(e,t+6)===121)return T(e,`:`,`:`+y)+e;break;case 6444:switch(E(e,E(e,14)===45?18:11)){case 120:return T(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+y+(E(e,14)===45?`inline-`:``)+`box$3$1`+y+`$2$3$1`+_+`$2box$3`)+e;case 100:return T(e,`:`,`:`+_)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return T(e,`scroll-`,`scroll-snap-`)+e}return e}function Ve(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function He(e,t,n,r){switch(e.type){case te:if(e.children.length)break;case C:case w:case S:return e.return=e.return||e.value;case b:return``;case ee:return e.return=e.value+`{`+Ve(e.children,r)+`}`;case x:if(!O(e.value=e.props.join(`,`)))return``}return O(n=Ve(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Ue(e){var t=le(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function We(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ge(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case S:e.return=Be(e.value,e.length,n);return;case ee:return Ve([ve(e,{value:T(e.value,`@`,`@`+y)})],r);case x:if(e.length)return de(n=e.props,function(t){switch(se(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:ye(ve(e,{props:[T(t,/:(read-\w+)/,`:`+v+`$1`)]})),ye(ve(e,{props:[t]})),ie(e,{props:fe(n,r)});break;case`::placeholder`:ye(ve(e,{props:[T(t,/:(plac\w+)/,`:`+y+`input-$1`)]})),ye(ve(e,{props:[T(t,/:(plac\w+)/,`:`+v+`$1`)]})),ye(ve(e,{props:[T(t,/:(plac\w+)/,_+`input-$1`)]})),ye(ve(e,{props:[t]})),ie(e,{props:fe(n,r)})}return``})}}var Ke=g(),j=c(u()),qe=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Je=`active`,Ye=`data-styled-version`,Xe=`6.5.3`,Ze=`/*!sc*/
`,Qe=typeof window<`u`&&typeof document<`u`;function $e(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var et=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:$e(`REACT_APP_SC_DISABLE_SPEEDY`)??$e(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),tt=`sc-keyframes-`,nt={};function rt(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var it=new Map,at=new Map,ot=1,st=e=>{if(it.has(e))return it.get(e);for(;at.has(ot);)ot++;let t=ot++;return it.set(e,t),at.set(t,e),t},ct=e=>at.get(e),lt=(e,t)=>{ot=t+1,it.set(e,t),at.set(t,e)},ut=Object.freeze([]),dt=Object.freeze({});function ft(e,t,n=dt){return e.theme!==n.theme&&e.theme||t||n.theme}var pt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,mt=/(^-|-$)/g;function ht(e){return e.replace(pt,`-`).replace(mt,``)}var gt=/(a)(d)/gi,_t=e=>String.fromCharCode(e+(e>25?39:97));function vt(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=_t(t%52)+n;return(_t(t%52)+n).replace(gt,`$1-$2`)}var yt=5381,bt=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},xt=e=>bt(yt,e);function St(e){return vt(xt(e)>>>0)}function Ct(e){return e.displayName||e.name||`Component`}function wt(e){return typeof e==`string`&&!0}function Tt(e){return wt(e)?`styled.${e}`:`Styled(${Ct(e)})`}var Et=Symbol.for(`react.memo`),Dt=Symbol.for(`react.forward_ref`),Ot={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},kt={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},At={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},jt={[Dt]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Et]:At};function Mt(e){return(`type`in(t=e)&&t.type.$$typeof)===Et?At:`$$typeof`in e?jt[e.$$typeof]:Ot;var t}var Nt=Object.defineProperty,Pt=Object.getOwnPropertyNames,Ft=Object.getOwnPropertySymbols,It=Object.getOwnPropertyDescriptor,Lt=Object.getPrototypeOf,Rt=Object.prototype;function zt(e,t,n){if(typeof t!=`string`){let r=Lt(t);r&&r!==Rt&&zt(e,r,n);let i=Pt(t).concat(Ft(t)),a=Mt(e),o=Mt(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in kt||n&&n[s]||o&&s in o||a&&s in a)){let n=It(t,s);try{Nt(e,s,n)}catch{}}}}return e}function Bt(e){return typeof e==`function`}var Vt=Symbol.for(`react.forward_ref`);function Ht(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Vt&&`styledComponentId`in e}function Ut(e,t){return e&&t?e+` `+t:e||t||``}function Wt(e,t){return e.join(t||``)}function Gt(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Kt(e,t,n=!1){if(!n&&!Gt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Kt(e[n],t[n]);else if(Gt(t))for(let n in t)e[n]=Kt(e[n],t[n]);return e}function qt(e,t){Object.defineProperty(e,"toString",{value:t})}var Jt=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw rt(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Ze;return t}},Yt=`style[${qe}][${Ye}="${Xe}"]`,Xt=RegExp(`^${qe}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Zt=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Qt=e=>{if(!e)return document;if(Zt(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Zt(t))return t}return document},$t=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},en=(e,t)=>{let n=(t.textContent??``).split(Ze),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Xt);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(lt(n,t),$t(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},tn=e=>{let t=Qt(e.options.target).querySelectorAll(Yt);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(qe)!==Je&&(en(e,r),r.parentNode&&r.parentNode.removeChild(r))}},nn=!1;function rn(){if(!1!==nn)return nn;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return nn=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return nn=t.getAttribute(`content`)||void 0}return nn=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var an=(e,t)=>{let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${qe}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(qe,Je),i.setAttribute(Ye,Xe);let s=t||rn();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},on=class{constructor(e,t){this.element=an(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw rt(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},sn=class{constructor(e,t){this.element=an(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},cn=Qe,ln={isServer:!Qe,useCSSOMInjection:!et},un=class e{static registerId(e){return st(e)}constructor(e=dt,t={},n){this.options=Object.assign(Object.assign({},ln),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Qe&&cn&&(cn=!1,tn(this)),qt(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=ct(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=qe+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Qe&&tn(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Qe&&t.target!==this.options.target&&Qt(this.options.target)!==Qt(t.target)&&tn(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new on(t,n):new sn(t,n))(this.options),new Jt(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){st(e),e.startsWith(tt)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(st(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(st(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},dn=new WeakSet,fn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function pn(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in fn||e.startsWith(`--`)?String(t).trim():t+`px`}var mn=47;function hn(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var gn=Symbol.for(`sc-keyframes`);function _n(e){return typeof e==`object`&&!!e&&gn in e}function vn(e){return Bt(e)&&!(e.prototype&&e.prototype.isReactComponent)}var yn=e=>e==null||!1===e||e===``,bn=Symbol.for(`react.client.reference`);function xn(e){return e.$$typeof===bn}function Sn(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!yn(r)&&(Array.isArray(r)&&dn.has(r)||Bt(r)?t.push(hn(n)+`:`,r,`;`):Gt(r)?(t.push(n+` {`),Sn(r,t),t.push(`}`)):t.push(hn(n)+`: `+pn(n,r)+`;`))}}function Cn(e,t,n,r,i=[]){if(yn(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return xn(e)?i:vn(e)&&t?Cn(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Cn(e[a],t,n,r,i);return i}return Ht(e)?(i.push(`.${e.styledComponentId}`),i):_n(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):xn(e)?i:Gt(e)&&e.toString===Object.prototype.toString?(Sn(e,i),i):(i.push(e.toString()),i)}var wn=xt(Xe),Tn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=bt(wn,t),this.baseStyle=n,un.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(vn(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Wt(Cn(r,e,t,n)))}else i+=Wt(Cn(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=vt(bt(bt(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=Ut(r,a)}}return r}},En=/&/g;function Dn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function On(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==mn||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===mn&&(o=!1,c++);else if(l!==34&&l!==39||Dn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function kn(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&kn(a.children,t)}return e}function An({options:e=dt,plugins:t=ut}=dt){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(En,r).replace(i,a))}),e.prefix&&o.push(Ge),o.push(He);let s=[],c=Ue(o.concat(We(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return On(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Dn(e,o)){if(s===0){if(t===mn&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==mn);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===mn)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===mn&&o+1<r&&e.charCodeAt(o+1)===mn){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:On(i)):l===0?e:On(e)}(t),d=Fe(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=kn(d,e.namespace)),s=[],Ve(d,c),s},u=e,d=yt;for(let e=0;e<t.length;e++)t[e].name||rt(15),d=bt(d,t[e].name);return u!=null&&u.namespace&&(d=bt(d,u.namespace)),u!=null&&u.prefix&&(d=bt(d,`p`)),l.hash=d===yt?``:d.toString(),l}var jn=new un,Mn=An(),Nn=j.createContext({shouldForwardProp:void 0,styleSheet:jn,stylis:Mn,stylisPlugins:void 0});Nn.Consumer;function Pn(){return j.useContext(Nn)}var Fn=j.createContext(void 0);Fn.Consumer;function In(e){let t=j.useContext(Fn),n=j.useMemo(()=>function(e,t){if(!e)throw rt(14);if(Bt(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw rt(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?j.createElement(Fn.Provider,{value:n},e.children):null}var Ln=Object.prototype.hasOwnProperty,Rn={};function zn(e,t){let n=typeof e==`string`?ht(e):`sc`;Rn[n]=(Rn[n]||0)+1;let r=n+`-`+St(Xe+n+Rn[n]);return t?t+`-`+r:r}function Bn(e,t,n){let r=Ht(e),i=e,a=!wt(e),{attrs:o=ut,componentId:s=zn(t.displayName,t.parentComponentId),displayName:c=Tt(e)}=t,l=t.displayName&&t.componentId?ht(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Tn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=j.useContext(Fn),u=Pn(),d=e.shouldForwardProp||u.shouldForwardProp,f=ft(t,l,a)||dt,p,m;{let e=j.useRef(null),n=e.current;if(n!==null&&n[1]===f&&n[2]===u.styleSheet&&n[3]===u.stylis&&n[7]===i&&function(e,t,n){let r=e,i=t,a=0;for(let e in i)if(Ln.call(i,e)&&(a++,r[e]!==i[e]))return!1;return a===n}(n[0],t,n[4]))p=n[5],m=n[6];else{p=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=e.length>1;for(let n=0;n<e.length;n++){let a=e[n],o=Bt(a)?a(i?Object.assign({},r):r):a;for(let e in o)e===`className`?r.className=Ut(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):e in t&&t[e]===void 0||(r[e]=o[e])}return`className`in t&&typeof t.className==`string`&&(r.className=Ut(r.className,t.className)),r}(r,t,f),m=i.generateAndInjectStyles(p,u.styleSheet,u.stylis);let n=0;for(let e in t)Ln.call(t,e)&&n++;e.current=[t,f,u.styleSheet,u.stylis,n,p,m,i]}}let h=p.as||c,g=function(e,t,n,r){let i={};for(let a in e)e[a]===void 0||a[0]===`$`||a===`as`||a===`theme`&&e.theme===n||(a===`forwardedAs`?i.as=e.forwardedAs:r&&!r(a,t)||(i[a]=e[a]));return i}(p,h,f,d),_=Ut(o,s);return m&&(_+=` `+m),p.className&&(_+=` `+p.className),g[wt(h)&&h.includes(`-`)?`class`:`className`]=_,n&&(g.ref=n),(0,j.createElement)(h,g)}(m,e,t)}p.displayName=c;let m=j.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?Ut(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Kt(e,n,!0);return e}({},i.defaultProps,e):e}}),qt(m,()=>`.${m.styledComponentId}`),a&&zt(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Vn=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Hn(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Un=e=>(dn.add(e),e);function Wn(e,...t){if(Bt(e)||Gt(e))return Un(Cn(Hn(ut,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Cn(n):Un(Cn(Hn(n,t)))}function Gn(e,t,n=dt){if(!t)throw rt(1,t);let r=(r,...i)=>e(t,n,Wn(r,...i));return r.attrs=r=>Gn(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Gn(e,t,Object.assign(Object.assign({},n),r)),r}var Kn=e=>Gn(Bn,e),M=Kn;Vn.forEach(e=>{M[e]=Kn(e)});var qn=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(Bt(n)&&!Ht(n))return!1}return!0}(e),un.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Wt(Cn(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function Jn(e,...t){let n=Wn(e,...t),r=`sc-global-${St(JSON.stringify(n))}`,i=new qn(n,r),a=e=>{let t=Pn(),n=j.useContext(Fn),a;{let e=j.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=j.useRef(i);j.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),j.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,nt,n,o);else{let s=Object.assign(Object.assign({},t),{theme:ft(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return j.memo(a)}var Yn,Xn=class{constructor(e,t){this[Yn]=!0,this.inject=(e,t=Mn)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=tt+e,this.rules=t,st(this.id),qt(this,()=>{throw rt(12,String(this.name))})}getName(e=Mn){return e.hash?this.name+vt(e.hash>>>0):this.name}};function Zn(e,...t){let n=Wt(Wn(e,...t));return new Xn(St(n),n)}Yn=gn,`${qe}`,`${qe}`,`${qe}`;var Qn=`modulepreload`,$n=function(e){return`/regal-affluence-community/`+e},er={},tr=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=$n(t,n),t=s(t),t in er)return;er[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Qn,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},nr=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,rr=/^[\\/]{2}/;function ir(e,t){return t+e.replace(/\\/g,`/`)}var ar=`popstate`;function or(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function sr(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return dr(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:fr(t)}return mr(t,n,null,e)}function N(e,t){if(e===!1||e==null)throw Error(t)}function cr(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function lr(){return Math.random().toString(36).substring(2,10)}function ur(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function dr(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?pr(t):t,state:n,key:t&&t.key||r||lr(),mask:i}}function fr({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function pr(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function mr(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=or(e)?e:dr(h.location,e,t);n&&n(r,e),l=u()+1;let d=ur(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=or(e)?e:dr(h.location,e,t);n&&n(r,e),l=u();let i=ur(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return hr(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(ar,d),c=e,()=>{i.removeEventListener(ar,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function hr(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),N(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:fr(t);return i=i.replace(/ $/,`%20`),!n&&rr.test(i)&&(i=r+i),new URL(i,r)}function gr(e,t,n=`/`){return _r(e,t,n,!1)}function _r(e,t,n,r,i){let a=Ir((typeof t==`string`?pr(t):t).pathname||`/`,n);if(a==null)return null;let o=i??vr(e),s=null,c=Fr(a);for(let e=0;s==null&&e<o.length;++e)s=jr(o[e],c,r);return s}function vr(e){let t=yr(e);return xr(t),t}function yr(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;N(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Wr([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(N(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),yr(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:kr(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=Pr(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of br(e.path))a(e,t,!0,n)}),t}function br(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=br(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function xr(e){e.sort((e,t)=>e.score===t.score?Ar(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var Sr=/^:[\w-]+$/,Cr=3,wr=2,Tr=1,Er=10,Dr=-2,Or=e=>e===`*`;function kr(e,t){let n=e.split(`/`),r=n.length;return n.some(Or)&&(r+=Dr),t&&(r+=wr),n.filter(e=>!Or(e)).reduce((e,t)=>e+(Sr.test(t)?Cr:t===``?Tr:Er),r)}function Ar(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function jr(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?Nr(u,l,s.matcher,s.compiledParams):Mr(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=Mr({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:Wr([a,d.pathname]),pathnameBase:Kr(Wr([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=Wr([a,d.pathnameBase]))}return o}function Mr(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Pr(e.path,e.caseSensitive,e.end);return Nr(e,t,n,r)}function Nr(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return e[t]=n&&!i?void 0:(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Pr(e,t=!1,n=!0){cr(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Fr(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return cr(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ir(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Lr(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?pr(e):e,a;return n?(n=Ur(n),a=n.startsWith(`/`)?Rr(n.substring(1),`/`):Rr(n,t)):a=t,{pathname:a,search:qr(r),hash:Jr(i)}}function Rr(e,t){let n=Gr(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function zr(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Br(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Vr(e){let t=Br(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Hr(e,t,n,r=!1){let i;typeof e==`string`?i=pr(e):(i={...e},N(!i.pathname||!i.pathname.includes(`?`),zr(`?`,`pathname`,`search`,i)),N(!i.pathname||!i.pathname.includes(`#`),zr(`#`,`pathname`,`hash`,i)),N(!i.search||!i.search.includes(`#`),zr(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Lr(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Ur=e=>e.replace(/[\\/]{2,}/g,`/`),Wr=e=>Ur(e.join(`/`)),Gr=e=>e.replace(/\/+$/,``),Kr=e=>Gr(e).replace(/^\/*/,`/`),qr=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Jr=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Yr=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Xr(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Zr(e){return Wr(e.map(e=>e.route.path).filter(Boolean))||`/`}var Qr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function $r(e,t){let n=e;if(typeof n!=`string`||!nr.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Qr)try{let e=new URL(window.location.href),r=rr.test(n)?new URL(ir(n,e.protocol)):new URL(n),a=Ir(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{cr(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var ei=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(ei);var ti=[`GET`,...ei];new Set(ti);var ni=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function ri(e){try{return ni.includes(new URL(e).protocol)}catch{return!1}}var ii=j.createContext(null);ii.displayName=`DataRouter`;var ai=j.createContext(null);ai.displayName=`DataRouterState`;var oi=j.createContext(!1);function si(){return j.useContext(oi)}var ci=j.createContext({isTransitioning:!1});ci.displayName=`ViewTransition`;var li=j.createContext(new Map);li.displayName=`Fetchers`;var ui=j.createContext(null);ui.displayName=`Await`;var di=j.createContext(null);di.displayName=`Navigation`;var fi=j.createContext(null);fi.displayName=`Location`;var pi=j.createContext({outlet:null,matches:[],isDataRoute:!1});pi.displayName=`Route`;var mi=j.createContext(null);mi.displayName=`RouteError`;var hi=`REACT_ROUTER_ERROR`,gi=`REDIRECT`,_i=`ROUTE_ERROR_RESPONSE`;function vi(e){if(e.startsWith(`${hi}:${gi}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function yi(e){if(e.startsWith(`${hi}:${_i}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Yr(t.status,t.statusText,t.data)}catch{}}function bi(e,{relative:t}={}){N(xi(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=j.useContext(di),{hash:i,pathname:a,search:o}=Di(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Wr([n,a])),r.createHref({pathname:s,search:o,hash:i})}function xi(){return j.useContext(fi)!=null}function Si(){return N(xi(),`useLocation() may be used only in the context of a <Router> component.`),j.useContext(fi).location}var Ci=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function wi(e){j.useContext(di).static||j.useLayoutEffect(e)}function Ti(){let{isDataRoute:e}=j.useContext(pi);return e?Hi():Ei()}function Ei(){N(xi(),`useNavigate() may be used only in the context of a <Router> component.`);let e=j.useContext(ii),{basename:t,navigator:n}=j.useContext(di),{matches:r}=j.useContext(pi),{pathname:i}=Si(),a=JSON.stringify(Vr(r)),o=j.useRef(!1);return wi(()=>{o.current=!0}),j.useCallback((r,s={})=>{if(cr(o.current,Ci),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Hr(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Wr([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}j.createContext(null);function Di(e,{relative:t}={}){let{matches:n}=j.useContext(pi),{pathname:r}=Si(),i=JSON.stringify(Vr(n));return j.useMemo(()=>Hr(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function Oi(e,t){return ki(e,t)}function ki(e,t,n){N(xi(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=j.useContext(di),{matches:i}=j.useContext(pi),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Wi(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=Si(),d;if(t){let e=typeof t==`string`?pr(t):t;N(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):gr(e,{pathname:p});cr(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),cr(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Ii(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Wr([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Wr([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?j.createElement(fi.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function Ai(){let e=Vi(),t=Xr(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=j.createElement(j.Fragment,null,j.createElement(`p`,null,`💿 Hey developer 👋`),j.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,j.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,j.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),j.createElement(j.Fragment,null,j.createElement(`h2`,null,`Unexpected Application Error!`),j.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?j.createElement(`pre`,{style:i},n):null,o)}var ji=j.createElement(Ai,null),Mi=class extends j.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=yi(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:j.createElement(pi.Provider,{value:this.props.routeContext},j.createElement(mi.Provider,{value:e,children:this.props.component}));return this.context?j.createElement(Pi,{error:e},t):t}};Mi.contextType=oi;var Ni=new WeakMap;function Pi({children:e,error:t}){let{basename:n}=j.useContext(di);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=vi(t.digest);if(e){let r=Ni.get(t);if(r)throw r;let i=$r(e.location,n),a=i.absoluteURL||i.to;if(ri(a))throw Error(`Invalid redirect location`);if(Qr&&!Ni.get(t)){if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw Ni.set(t,n),n}}return j.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Fi({routeContext:e,match:t,children:n}){let r=j.useContext(ii);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),j.createElement(pi.Provider,{value:e},n)}function Ii(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);N(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Zr(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||ji,o&&(s<0&&c===0?(Wi(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?j.createElement(n.route.Component,null):n.route.element?n.route.element:e,j.createElement(Fi,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?j.createElement(Mi,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Li(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ri(e){let t=j.useContext(ii);return N(t,Li(e)),t}function P(e){let t=j.useContext(ai);return N(t,Li(e)),t}function F(e){let t=j.useContext(pi);return N(t,Li(e)),t}function zi(e){let t=F(e),n=t.matches[t.matches.length-1];return N(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Bi(){return zi(`useRouteId`)}function Vi(){let e=j.useContext(mi),t=P(`useRouteError`),n=zi(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Hi(){let{router:e}=Ri(`useNavigate`),t=zi(`useNavigate`),n=j.useRef(!1);return wi(()=>{n.current=!0}),j.useCallback(async(r,i={})=>{cr(n.current,Ci),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Ui={};function Wi(e,t,n){!t&&!Ui[e]&&(Ui[e]=!0,cr(!1,n))}j.memo(Gi);function Gi({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return ki(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Ki(e){N(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function qi({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){N(!xi(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=j.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=pr(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=j.useMemo(()=>{let e=Ir(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return cr(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:j.createElement(di.Provider,{value:c},j.createElement(fi.Provider,{children:t,value:h}))}function Ji({children:e,location:t}){return Oi(Yi(e),t)}j.Component;function Yi(e,t=[]){let n=[];return j.Children.forEach(e,(e,r)=>{if(!j.isValidElement(e))return;let i=[...t,r];if(e.type===j.Fragment){n.push.apply(n,Yi(e.props.children,i));return}N(e.type===Ki,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),N(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Yi(e.props.children,i)),n.push(a)}),n}var Xi=`get`,Zi=`application/x-www-form-urlencoded`;function Qi(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function $i(e){return Qi(e)&&e.tagName.toLowerCase()===`button`}function ea(e){return Qi(e)&&e.tagName.toLowerCase()===`form`}function ta(e){return Qi(e)&&e.tagName.toLowerCase()===`input`}function na(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ra(e,t){return e.button===0&&(!t||t===`_self`)&&!na(e)}var ia=null;function aa(){if(ia===null)try{new FormData(document.createElement(`form`),0),ia=!1}catch{ia=!0}return ia}var oa=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function sa(e){return e!=null&&!oa.has(e)?(cr(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zi}"`),null):e}function ca(e,t){let n,r,i,a,o;if(ea(e)){let o=e.getAttribute(`action`);r=o?Ir(o,t):null,n=e.getAttribute(`method`)||Xi,i=sa(e.getAttribute(`enctype`))||Zi,a=new FormData(e)}else if($i(e)||ta(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?Ir(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Xi,i=sa(e.getAttribute(`formenctype`))||sa(o.getAttribute(`enctype`))||Zi,a=new FormData(o,e),!aa()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Qi(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Xi,r=null,i=Zi,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);function la(e,t){if(e===!1||e==null)throw Error(t)}function ua(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return i.pathname=n?i.pathname.endsWith(`/`)?`${i.pathname}_.${r}`:`${i.pathname}.${r}`:i.pathname===`/`?`_root.${r}`:t&&Ir(i.pathname,t)===`/`?`${Gr(t)}/_root.${r}`:`${Gr(i.pathname)}.${r}`,i}async function da(e,t){if(e.id in t)return t[e.id];try{let n=await tr(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function fa(e){return e!=null&&typeof e.page==`string`}function pa(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function ma(e,t,n){return ya((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await da(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(pa).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function ha(e,t,n,r,i,a){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function ga(e,t,{includeHydrateFallback:n}={}){return _a(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function _a(e){return[...new Set(e)]}function va(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function ya(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!fa(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(va(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function ba(){let e=j.useContext(ii);return la(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function xa(){let e=j.useContext(ai);return la(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var Sa=j.createContext(void 0);Sa.displayName=`FrameworkContext`;function Ca(){let e=j.useContext(Sa);return la(e,`You must render this element inside a <HydratedRouter> element`),e}function wa(e,t){let n=j.useContext(Sa),[r,i]=j.useState(!1),[a,o]=j.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=j.useRef(null);j.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),j.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:Ta(s,p),onBlur:Ta(c,m),onMouseEnter:Ta(l,p),onMouseLeave:Ta(u,m),onTouchStart:Ta(d,p)}]:[a,f,{}]:[!1,f,{}]}function Ta(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Ea({page:e,...t}){let n=si(),{nonce:r}=Ca(),{router:i}=ba(),a=j.useMemo(()=>gr(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?j.createElement(Oa,{page:e,matches:a,...t}):j.createElement(ka,{page:e,matches:a,...t})):null}function Da(e){let{manifest:t,routeModules:n}=Ca(),[r,i]=j.useState([]);return j.useEffect(()=>{let r=!1;return ma(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Oa({page:e,matches:t,...n}){let r=Si(),{future:i}=Ca(),{basename:a}=ba(),o=j.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=ua(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return j.createElement(j.Fragment,null,o.map(e=>j.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function ka({page:e,matches:t,...n}){let r=Si(),{future:i,manifest:a,routeModules:o}=Ca(),{basename:s}=ba(),{loaderData:c,matches:l}=xa(),u=j.useMemo(()=>ha(e,t,l,a,r,`data`),[e,t,l,a,r]),d=j.useMemo(()=>ha(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=j.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=ua(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=j.useMemo(()=>ga(d,a),[d,a]),m=Da(d);return j.createElement(j.Fragment,null,f.map(e=>j.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>j.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>j.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Aa(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}j.Component;var ja=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{ja&&(window.__reactRouterVersion=`7.18.2`)}catch{}function Ma({basename:e,children:t,useTransitions:n,window:r}){let i=j.useRef();i.current??=sr({window:r,v5Compat:!0});let a=i.current,[o,s]=j.useState({action:a.action,location:a.location}),c=j.useCallback(e=>{n===!1?s(e):j.startTransition(()=>s(e))},[n]);return j.useLayoutEffect(()=>a.listen(c),[a,c]),j.createElement(qi,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}var Na=j.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=j.useContext(di),v=typeof l==`string`&&nr.test(l),y=$r(l,h);l=y.to;let b=bi(l,{relative:r}),x=Si(),S=null;if(o){let e=Hr(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Wr([h,e.pathname])),S=g.createHref(e)}let[C,w,ee]=wa(n,p),te=Ra(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function ne(t){e&&e(t),t.defaultPrevented||te(t)}let re=!(y.isExternal||i),ie=j.createElement(`a`,{...p,...ee,href:(re?S:void 0)||y.absoluteURL||b,onClick:re?ne:e,ref:Aa(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?j.createElement(j.Fragment,null,ie,j.createElement(Ea,{page:b})):ie});Na.displayName=`Link`;var Pa=j.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=Di(a,{relative:c.relative}),d=Si(),f=j.useContext(ai),{navigator:p,basename:m}=j.useContext(di),h=f!=null&&Ua(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=Ir(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let ee=typeof i==`function`?i(S):i;return j.createElement(Na,{...c,"aria-current":C,className:w,ref:l,style:ee,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Pa.displayName=`NavLink`;var Fa=j.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Xi,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=j.useContext(di),g=Va(),_=Ha(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&nr.test(s);return j.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?j.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Fa.displayName=`Form`;function Ia(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function La(e){let t=j.useContext(ii);return N(t,Ia(e)),t}function Ra(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=Ti(),d=Si(),f=Di(e,{relative:o});return j.useCallback(p=>{if(ra(p,t)){p.preventDefault();let t=n===void 0?fr(d)===fr(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?j.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var za=0,Ba=()=>`__${String(++za)}__`;function Va(){let{router:e}=La(`useSubmit`),{basename:t}=j.useContext(di),n=Bi(),r=e.fetch,i=e.navigate;return j.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=ca(e,t);if(a.navigate===!1){let e=a.fetcherKey||Ba();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Ha(e,{relative:t}={}){let{basename:n}=j.useContext(di),r=j.useContext(pi);N(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...Di(e||`.`,{relative:t})},o=Si();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Wr([n,a.pathname])),fr(a)}function Ua(e,{relative:t}={}){let n=j.useContext(ci);N(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=La(`useViewTransitionState`),i=Di(e,{relative:t});if(!n.isTransitioning)return!1;let a=Ir(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ir(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Mr(i.pathname,o)!=null||Mr(i.pathname,a)!=null}var Wa=Jn`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

  /* ========================================
     ROOT
  ======================================== */

  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  /* ========================================
     RESET
  ======================================== */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 84px;
  }

  body {
    margin: 0;
    padding: 0;

    min-width: 320px;

    background: ${({theme:e})=>e.colors.ivory};
    color: ${({theme:e})=>e.colors.text};

    font-family: ${({theme:e})=>e.fonts.body};
    font-size: 16px;
    line-height: 1.6;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow-x: hidden;
  }

  /* ========================================
     TYPOGRAPHY
  ======================================== */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;

    font-family: ${({theme:e})=>e.fonts.display};
    font-weight: 600;
    line-height: 1.1;

    color: ${({theme:e})=>e.colors.text};
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* ========================================
     FORM ELEMENTS
  ======================================== */

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    margin: 0;
    padding: 0;

    border: 0;

    background: transparent;

    cursor: pointer;
  }

  input,
  textarea,
  select {
    margin: 0;
  }

  textarea {
    resize: vertical;
  }

  /* ========================================
     MEDIA
  ======================================== */

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  img {
    height: auto;
  }

  /* ========================================
     LISTS
  ======================================== */

  ul,
  ol {
    margin: 0;
    padding: 0;

    list-style: none;
  }

  /* ========================================
     ACCESSIBILITY
  ======================================== */

  :focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.champagne};
    outline-offset: 3px;
  }

  ::selection {
    background: ${({theme:e})=>e.colors.purple};
    color: ${({theme:e})=>e.colors.white};
  }

  /* ========================================
     MOBILE
  ======================================== */

  @media (max-width: 768px) {
    html {
      scroll-padding-top: 72px;
    }

    body {
      font-size: 15px;
    }
  }

  /* ========================================
     REDUCED MOTION
  ======================================== */

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`,Ga={colors:{purple:`#5B21B6`,purpleDark:`#32105F`,purpleDeep:`#1E0A3C`,purpleSoft:`#7C3AED`,champagne:`#C9A96E`,champagneLight:`#E4D2A8`,ivory:`#FAF8F3`,cream:`#F3EDE2`,white:`#FFFFFF`,black:`#17151A`,text:`#262229`,textMuted:`#706B73`,textLight:`#A09AA3`,border:`rgba(23, 21, 26, 0.10)`,borderLight:`rgba(23, 21, 26, 0.06)`,overlay:`rgba(23, 21, 26, 0.45)`,success:`#198754`,error:`#C0392B`},fonts:{display:`'Playfair Display', serif`,body:`'Inter', sans-serif`},fontSizes:{xs:`0.75rem`,sm:`0.875rem`,md:`1rem`,lg:`1.125rem`,xl:`1.25rem`,"2xl":`1.5rem`,"3xl":`2rem`,"4xl":`2.75rem`,"5xl":`3.5rem`,"6xl":`4.5rem`},spacing:{xs:`0.5rem`,sm:`0.75rem`,md:`1rem`,lg:`1.5rem`,xl:`2rem`,"2xl":`3rem`,"3xl":`4rem`,"4xl":`6rem`,"5xl":`8rem`},radius:{sm:`8px`,md:`14px`,lg:`24px`,xl:`32px`,pill:`999px`},shadows:{none:`none`,soft:`0 10px 40px rgba(23, 21, 26, 0.08)`,medium:`0 20px 60px rgba(23, 21, 26, 0.12)`,strong:`0 24px 80px rgba(23, 21, 26, 0.16)`},container:{maxWidth:`1320px`,padding:`24px`,paddingMobile:`16px`},transitions:{fast:`0.2s ease`,normal:`0.3s ease`,slow:`0.5s ease`},breakpoints:{mobile:`480px`,tablet:`768px`,laptop:`1024px`,desktop:`1280px`,wide:`1440px`}},Ka=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),I=o(((e,t)=>{t.exports=Ka()}))(),qa=`/regal-affluence-community/`.endsWith(`/`)?`/regal-affluence-community/`:`/regal-affluence-community//`,Ja=qa.replace(/\/$/,``),Ya=[{label:`About`,href:`#about`,id:`about`,type:`hash`},{label:`Community`,href:`#community`,id:`community`,type:`hash`},{label:`How It Works`,href:`how-it-works`,id:`how-it-works`,type:`route`}],Xa=900,Za=82,Qa=72,$a=qa,eo=`${qa}join`,to=`${qa}how-it-works`,no=()=>{let e=window.location.pathname;return e===Ja||e===`${Ja}/`},ro=Zn`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`,io=Zn`
  0% {
    transform:
      translateX(-140%)
      skewX(-18deg);
  }

  100% {
    transform:
      translateX(220%)
      skewX(-18deg);
  }
`,ao=Zn`
  from {
    opacity: 0;
    transform:
      translateY(10px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
  }
`,oo=()=>{let[e,t]=(0,j.useState)(!1),[n,r]=(0,j.useState)(!1),[i,a]=(0,j.useState)(``),o=(0,j.useRef)(null),s=(0,j.useRef)(null),c=(0,j.useRef)(``),l=(0,j.useCallback)(()=>{r(!1)},[]);(0,j.useEffect)(()=>{let e=!1,n=()=>{let n=window.scrollY;if(t(n>24),!no()){a(``),e=!1;return}let r=Ya.filter(e=>e.type===`hash`).map(e=>document.getElementById(e.id)).filter(e=>e instanceof HTMLElement);if(n<70||r.length===0){a(``),e=!1;return}let i=window.innerHeight*.28,o=``;for(let e of r)if(e.getBoundingClientRect().top<=i)o=e.id;else break;a(o),e=!1},r=()=>{e||(e=!0,window.requestAnimationFrame(n))};return n(),window.addEventListener(`scroll`,r,{passive:!0}),window.addEventListener(`resize`,r,{passive:!0}),()=>{window.removeEventListener(`scroll`,r),window.removeEventListener(`resize`,r)}},[]),(0,j.useEffect)(()=>{if(!n){document.body.style.overflow=c.current;return}c.current=document.body.style.overflow,document.body.style.overflow=`hidden`;let e=window.setTimeout(()=>{s.current?.focus()},120),t=e=>{e.key===`Escape`&&(l(),window.setTimeout(()=>{o.current?.focus()},50))},r=()=>{window.innerWidth>=Xa&&l()};return window.addEventListener(`keydown`,t),window.addEventListener(`resize`,r),()=>{window.clearTimeout(e),document.body.style.overflow=c.current,window.removeEventListener(`keydown`,t),window.removeEventListener(`resize`,r)}},[n,l]);let u=(0,j.useCallback)((e,t=`smooth`)=>{let n=document.getElementById(e);if(!n)return;let r=window.innerWidth<=768?Qa:Za,i=n.getBoundingClientRect().top+window.scrollY-r;window.scrollTo({top:Math.max(0,i),behavior:t}),a(e)},[]);(0,j.useEffect)(()=>{if(!no())return;let e=window.location.hash.replace(/^#/,``);if(!e)return;let t=window.setTimeout(()=>{u(e,`auto`)},150);return()=>{window.clearTimeout(t)}},[u]);let d=(e,t)=>{if(l(),t.type===`route`)return;let n=document.getElementById(t.id);if(!no()||!n)return;e.preventDefault();let r=window.innerWidth<=768?Qa:Za,i=n.getBoundingClientRect().top+window.scrollY-r,o=`${qa}#${t.id}`;window.history.pushState(null,``,o),window.scrollTo({top:Math.max(0,i),behavior:`smooth`}),a(t.id)};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(so,{$scrolled:e,$menuOpen:n,children:(0,I.jsxs)(co,{children:[(0,I.jsx)(lo,{href:$a,"aria-label":`Regal Affluence home`,onClick:e=>{l(),no()&&(e.preventDefault(),window.history.replaceState(null,``,$a),window.scrollTo({top:0,behavior:`smooth`}),a(``))},children:(0,I.jsx)(uo,{src:`${qa}images/regal-affluence-logo.png`,alt:`Regal Affluence`,draggable:!1})}),(0,I.jsx)(fo,{"aria-label":`Primary navigation`,children:Ya.map(e=>{let t=e.type===`hash`&&i===e.id,n=e.type===`route`?to:`${qa}${e.href}`;return(0,I.jsxs)(po,{href:n,$active:t,"aria-current":t?`location`:void 0,onClick:t=>d(t,e),children:[(0,I.jsx)(`span`,{className:`nav-text`,children:e.label}),(0,I.jsx)(`span`,{className:`nav-indicator`,"aria-hidden":`true`})]},e.id)})}),(0,I.jsxs)(mo,{href:eo,"aria-label":`Join the Regal Affluence community`,children:[(0,I.jsx)(`span`,{className:`button-shine`,"aria-hidden":`true`}),(0,I.jsxs)(`span`,{className:`button-content`,children:[(0,I.jsx)(`span`,{children:`Join Community`}),(0,I.jsx)(`span`,{className:`button-arrow`,"aria-hidden":`true`,children:`↗`})]})]}),(0,I.jsxs)(ho,{ref:o,type:`button`,$open:n,"aria-label":n?`Close navigation menu`:`Open navigation menu`,"aria-expanded":n,"aria-controls":`mobile-navigation`,onClick:()=>r(e=>!e),children:[(0,I.jsx)(`span`,{className:`menu-text`,children:n?`Close`:`Menu`}),(0,I.jsxs)(`span`,{className:`menu-icon`,"aria-hidden":`true`,children:[(0,I.jsx)(`span`,{className:n?`line line-one open`:`line line-one`}),(0,I.jsx)(`span`,{className:n?`line line-two open`:`line line-two`})]})]})]})}),(0,I.jsx)(go,{$open:n,"aria-hidden":`true`,onClick:l}),(0,I.jsxs)(L,{id:`mobile-navigation`,$open:n,"aria-hidden":!n,children:[(0,I.jsx)(`div`,{className:`menu-glow`}),(0,I.jsxs)(`div`,{className:`menu-inner`,children:[(0,I.jsxs)(`div`,{className:`mobile-intro`,children:[(0,I.jsx)(`span`,{className:`intro-line`}),(0,I.jsx)(`span`,{className:`intro-label`,children:`REGAL AFFLUENCE`}),(0,I.jsx)(`span`,{className:`intro-mark`,children:`✦`})]}),(0,I.jsxs)(`div`,{className:`mobile-heading`,children:[(0,I.jsx)(`span`,{children:`Explore.`}),(0,I.jsx)(`span`,{className:`heading-muted`,children:`Connect.`})]}),(0,I.jsx)(R,{"aria-label":`Mobile navigation`,children:Ya.map((e,t)=>{let n=e.type===`hash`&&i===e.id,r=e.type===`route`?to:`${qa}${e.href}`;return(0,I.jsxs)(_o,{ref:t===0?s:void 0,href:r,$active:n,style:{animationDelay:`${t*70}ms`},onClick:t=>d(t,e),children:[(0,I.jsx)(`span`,{className:`number`,children:String(t+1).padStart(2,`0`)}),(0,I.jsx)(`span`,{className:`label`,children:e.label}),(0,I.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:`↗`})]},e.id)})}),(0,I.jsxs)(vo,{href:eo,onClick:l,children:[(0,I.jsx)(`span`,{className:`mobile-cta-main`,children:`Join Community`}),(0,I.jsxs)(`span`,{className:`mobile-cta-meta`,children:[`It's Free`,(0,I.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]}),(0,I.jsxs)(`div`,{className:`mobile-footer`,children:[(0,I.jsx)(`span`,{children:`BUILD. CONNECT. ELEVATE.`}),(0,I.jsx)(`span`,{children:`REGAL AFFLUENCE GROUP`})]})]})]})]})},so=M.header`
  position: fixed;

  top: 0;
  left: 0;

  z-index: 1000;

  width: 100%;

  padding: 13px 0;

  background:
    linear-gradient(
      110deg,
      rgba(
        243,
        237,
        255,
        0.96
      ),
      rgba(
        250,
        248,
        243,
        0.97
      ),
      rgba(
        238,
        231,
        250,
        0.96
      )
    );

  background-size:
    180% 180%;

  backdrop-filter:
    blur(18px)
    saturate(125%);

  -webkit-backdrop-filter:
    blur(18px)
    saturate(125%);

  border-bottom:
    1px solid
    ${({theme:e})=>e.colors.border};

  box-shadow:
    ${({$scrolled:e})=>e?`0 10px 35px rgba(48, 28, 72, 0.10)`:`0 4px 18px rgba(48, 28, 72, 0.04)`};

  transition:
    box-shadow 0.35s ease,
    background 0.35s ease;

  animation:
    ${ro}
    18s ease infinite;

  @media (max-width: 900px) {
    padding: 10px 0;

    background:
      linear-gradient(
        120deg,
        rgba(
          243,
          237,
          255,
          0.98
        ),
        rgba(
          250,
          248,
          243,
          0.98
        ),
        rgba(
          238,
          231,
          250,
          0.98
        )
      );
  }

  @media (
    prefers-reduced-motion:
      reduce
  ) {
    animation: none;

    transition: none;
  }
`,co=M.div`
  width:
    min(
      calc(100% - 64px),
      1360px
    );

  min-height: 56px;

  margin: 0 auto;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 30px;

  @media (max-width: 1180px) {
    width:
      min(
        calc(100% - 48px),
        1360px
      );
  }

  @media (max-width: 900px) {
    min-height: 52px;

    width:
      min(
        calc(100% - 36px),
        1360px
      );
  }

  @media (max-width: 480px) {
    min-height: 52px;

    width:
      min(
        calc(100% - 28px),
        1360px
      );
  }
`,lo=M.a`
  display: inline-flex;

  align-items: center;

  flex-shrink: 0;

  text-decoration: none;

  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    transform:
      translateY(-1px);
  }

  &:focus-visible {
    outline:
      2px solid
      ${({theme:e})=>e.colors.purple};

    outline-offset: 6px;

    border-radius: 6px;
  }

  @media (
    prefers-reduced-motion:
      reduce
  ) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`,uo=M.img`
  display: block;

  width: 175px;

  height: auto;

  object-fit: contain;

  user-select: none;

  @media (max-width: 900px) {
    width: 155px;
  }

  @media (max-width: 480px) {
    width: 140px;
  }
`,fo=M.nav`
  display: flex;

  align-items: center;

  gap: 6px;

  margin-left: auto;

  margin-right: 10px;

  @media (max-width: 900px) {
    display: none;
  }
`,po=M.a`
  position: relative;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 42px;

  padding:
    0 17px;

  color:
    ${({$active:e,theme:t})=>e?t.colors.purple:t.colors.text};

  font-size: 11px;

  font-weight: 700;

  letter-spacing:
    0.055em;

  text-decoration: none;

  white-space: nowrap;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  .nav-text {
    position: relative;

    z-index: 2;
  }

  .nav-indicator {
    position: absolute;

    left: 16px;
    right: 16px;

    bottom: 5px;

    height: 2px;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        ${({theme:e})=>e.colors.purple},
        ${({theme:e})=>e.colors.champagne}
      );

    transform:
      scaleX(
        ${({$active:e})=>+!!e}
      );

    transform-origin:
      center;

    opacity:
      ${({$active:e})=>+!!e};

    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  &:hover {
    color:
      ${({theme:e})=>e.colors.purple};

    transform:
      translateY(-1px);
  }

  &:hover .nav-indicator {
    transform:
      scaleX(1);

    opacity: 1;
  }

  &:focus-visible {
    outline:
      2px solid
      ${({theme:e})=>e.colors.purple};

    outline-offset: 4px;

    border-radius: 6px;
  }

  @media (
    prefers-reduced-motion:
      reduce
  ) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`,mo=M.a`
    position: relative;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 46px;

    padding:
      0 21px;

    overflow: hidden;

    flex-shrink: 0;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.12
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({theme:e})=>e.colors.purple},
        #7652a8
      );

    color:
      ${({theme:e})=>e.colors.white};

    font-size: 10px;

    font-weight: 800;

    letter-spacing:
      0.085em;

    text-decoration: none;

    text-transform:
      uppercase;

    box-shadow:
      0
      9px
      26px
      rgba(
        91,
        33,
        182,
        0.17
      );

    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    .button-shine {
      position: absolute;

      top: -30%;
      left: -110%;

      width: 55%;
      height: 160%;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(
            255,
            255,
            255,
            0.4
          ),
          transparent
        );

      transform:
        skewX(-18deg);

      pointer-events:
        none;
    }

    .button-content {
      position: relative;

      z-index: 2;

      display: inline-flex;

      align-items: center;

      gap: 10px;
    }

    .button-arrow {
      font-size: 15px;

      line-height: 1;

      transition:
        transform 0.3s ease;
    }

    &:hover {
      transform:
        translateY(-2px);

      box-shadow:
        0
        14px
        32px
        rgba(
          91,
          33,
          182,
          0.25
        );
    }

    &:hover .button-shine {
      animation:
        ${io}
        0.8s
        ease
        forwards;
    }

    &:hover .button-arrow {
      transform:
        translate(
          2px,
          -2px
        );
    }

    &:active {
      transform:
        translateY(0)
        scale(0.99);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.champagne};

      outline-offset: 5px;
    }

    @media (max-width: 900px) {
      display: none;
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;

      &:hover,
      &:active {
        transform: none;
      }

      &:hover .button-shine {
        animation: none;
      }

      &:hover .button-arrow {
        transform: none;
      }
    }
  `,ho=M.button`
    display: none;

    align-items: center;

    justify-content: center;

    gap: 9px;

    width: 82px;

    height: 42px;

    padding: 0;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.14
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      rgba(
        255,
        255,
        255,
        0.42
      );

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    cursor: pointer;

    backdrop-filter:
      blur(10px);

    -webkit-backdrop-filter:
      blur(10px);

    transition:
      transform 0.25s ease,
      background 0.25s ease;

    .menu-text {
      font-size: 9px;

      font-weight: 800;

      letter-spacing:
        0.13em;

      text-transform:
        uppercase;
    }

    .menu-icon {
      display: flex;

      flex-direction:
        column;

      justify-content:
        center;

      gap: 4px;
    }

    .line {
      display: block;

      width: 16px;
      height: 1px;

      background:
        currentColor;

      transform-origin:
        center;

      transition:
        transform 0.3s ease;
    }

    .line-one.open {
      transform:
        translateY(2.5px)
        rotate(45deg);
    }

    .line-two.open {
      transform:
        translateY(-2.5px)
        rotate(-45deg);
    }

    &:hover {
      transform:
        translateY(-1px);

      background:
        rgba(
          255,
          255,
          255,
          0.62
        );
    }

    &:active {
      transform:
        scale(0.97);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.purple};

      outline-offset: 4px;
    }

    @media (max-width: 900px) {
      display: flex;
    }

    @media (max-width: 480px) {
      width: 76px;
      height: 40px;
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;

      .line {
        transition: none;
      }

      &:hover,
      &:active {
        transform: none;
      }
    }
  `,go=M.div`
    position: fixed;

    inset: 0;

    z-index: 998;

    background:
      rgba(
        32,
        18,
        50,
        0.48
      );

    backdrop-filter:
      blur(7px);

    -webkit-backdrop-filter:
      blur(7px);

    opacity:
      ${({$open:e})=>+!!e};

    visibility:
      ${({$open:e})=>e?`visible`:`hidden`};

    pointer-events:
      ${({$open:e})=>e?`auto`:`none`};

    transition:
      opacity 0.35s ease,
      visibility 0.35s ease;

    @media (min-width: 901px) {
      display: none;
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;
    }
  `,L=M.div`
    position: fixed;

    top: 84px;

    left: 12px;
    right: 12px;

    z-index: 999;

    max-height:
      calc(
        100vh - 98px
      );

    overflow-y: auto;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.12
      );

    border-radius: 24px;

    background:
      linear-gradient(
        145deg,
        rgba(
          246,
          241,
          255,
          0.98
        ),
        rgba(
          250,
          248,
          243,
          0.98
        ),
        rgba(
          239,
          232,
          251,
          0.98
        )
      );

    box-shadow:
      0
      28px
      80px
      rgba(
        38,
        22,
        57,
        0.2
      );

    opacity:
      ${({$open:e})=>+!!e};

    visibility:
      ${({$open:e})=>e?`visible`:`hidden`};

    pointer-events:
      ${({$open:e})=>e?`auto`:`none`};

    transform:
      ${({$open:e})=>e?`translateY(0) scale(1)`:`translateY(-10px) scale(.98)`};

    transition:
      opacity 0.3s ease,
      transform 0.4s
        cubic-bezier(
          0.16,
          1,
          0.3,
          1
        ),
      visibility 0.3s ease;

    .menu-glow {
      position: absolute;

      top: -90px;
      right: -80px;

      width: 230px;
      height: 230px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(
            123,
            84,
            181,
            0.16
          ),
          transparent 68%
        );

      filter:
        blur(30px);

      pointer-events:
        none;
    }

    .menu-inner {
      position: relative;

      z-index: 1;

      padding:
        28px
        24px
        22px;
    }

    .mobile-intro {
      display: flex;

      align-items: center;

      gap: 9px;

      margin-bottom: 15px;

      color:
        ${({theme:e})=>e.colors.purple};

      font-size: 8px;

      font-weight: 800;

      letter-spacing:
        0.18em;
    }

    .intro-line {
      width: 24px;

      height: 1px;

      background:
        ${({theme:e})=>e.colors.champagne};
    }

    .intro-mark {
      margin-left: auto;

      color:
        ${({theme:e})=>e.colors.champagne};

      font-size: 11px;
    }

    .mobile-heading {
      display: flex;

      flex-direction:
        column;

      margin-bottom: 24px;

      color:
        ${({theme:e})=>e.colors.purpleDeep};

      font-family:
        ${({theme:e})=>e.fonts.display};

      font-size: 38px;

      font-weight: 500;

      line-height: 0.94;

      letter-spacing:
        -0.045em;
    }

    .heading-muted {
      color:
        ${({theme:e})=>e.colors.textMuted};
    }

    .mobile-footer {
      display: flex;

      align-items: center;

      justify-content:
        space-between;

      gap: 12px;

      margin-top: 20px;

      padding-top: 17px;

      border-top:
        1px solid
        ${({theme:e})=>e.colors.border};

      color:
        ${({theme:e})=>e.colors.textMuted};

      font-size: 7px;

      font-weight: 800;

      letter-spacing:
        0.09em;
    }

    @media (max-width: 768px) {
      top: 78px;
    }

    @media (max-width: 480px) {
      top: 76px;

      left: 8px;
      right: 8px;

      max-height:
        calc(
          100vh - 86px
        );

      border-radius: 21px;

      .menu-inner {
        padding:
          24px
          20px
          18px;
      }

      .mobile-heading {
        font-size: 34px;
      }
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;

      transform: none;
    }
  `,R=M.nav`
    display: flex;

    flex-direction: column;

    border-top:
      1px solid
      ${({theme:e})=>e.colors.border};
  `,_o=M.a`
    position: relative;

    display: grid;

    grid-template-columns:
      30px
      1fr
      24px;

    align-items: center;

    min-height: 66px;

    gap: 8px;

    padding: 0 3px;

    border-bottom:
      1px solid
      ${({theme:e})=>e.colors.border};

    color:
      ${({$active:e,theme:t})=>e?t.colors.purple:t.colors.text};

    text-decoration: none;

    animation:
      ${ao}
      0.45s
      ease
      both;

    .number {
      color:
        ${({$active:e,theme:t})=>e?t.colors.champagne:t.colors.textMuted};

      font-size: 8px;

      font-weight: 800;

      letter-spacing:
        0.08em;
    }

    .label {
      font-family:
        ${({theme:e})=>e.fonts.display};

      font-size: 23px;

      font-weight: 500;

      letter-spacing:
        -0.025em;

      transition:
        transform 0.25s ease;
    }

    .arrow {
      justify-self: end;

      color:
        ${({theme:e})=>e.colors.champagne};

      font-size: 16px;

      opacity:
        ${({$active:e})=>e?1:.35};

      transition:
        opacity 0.25s ease,
        transform 0.25s ease;
    }

    &::before {
      content: "";

      position: absolute;

      left: -12px;

      top: 50%;

      width: 3px;
      height: 0;

      border-radius: 999px;

      background:
        ${({theme:e})=>e.colors.purple};

      transform:
        translateY(-50%);

      transition:
        height 0.3s ease;
    }

    &:hover {
      color:
        ${({theme:e})=>e.colors.purple};

      .label {
        transform:
          translateX(3px);
      }

      .arrow {
        opacity: 1;

        transform:
          translate(
            2px,
            -2px
          );
      }

      &::before {
        height: 28px;
      }
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.purple};

      outline-offset: 3px;

      border-radius: 5px;
    }

    @media (max-width: 480px) {
      min-height: 62px;

      .label {
        font-size: 21px;
      }
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      animation: none;

      .label,
      .arrow {
        transition: none;
      }

      &:hover .label {
        transform: none;
      }

      &::before {
        transition: none;
      }
    }
  `,vo=M.a`
    display: flex;

    align-items: center;

    justify-content:
      space-between;

    gap: 16px;

    min-height: 62px;

    margin-top: 20px;

    padding:
      0 20px;

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({theme:e})=>e.colors.purple},
        #7551a7
      );

    color:
      ${({theme:e})=>e.colors.white};

    text-decoration: none;

    box-shadow:
      0
      14px
      32px
      rgba(
        91,
        33,
        182,
        0.19
      );

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;

    .mobile-cta-main {
      font-size: 10px;

      font-weight: 800;

      letter-spacing:
        0.075em;

      text-transform:
        uppercase;
    }

    .mobile-cta-meta {
      display: inline-flex;

      align-items: center;

      gap: 6px;

      color:
        ${({theme:e})=>e.colors.champagneLight};

      font-size: 9px;

      font-weight: 700;

      letter-spacing:
        0.06em;
    }

    &:hover {
      transform:
        translateY(-2px);

      box-shadow:
        0
        18px
        36px
        rgba(
          91,
          33,
          182,
          0.26
        );
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.champagne};

      outline-offset: 5px;
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;

      &:hover {
        transform: none;
      }
    }
  `,yo=Zn`
  from {
    opacity: 0;
    transform: translate3d(0, 36px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,bo=Zn`
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,xo=Zn`
  from {
    opacity: 0;
    transform: scale(1.08);
  }

  to {
    opacity: 1;
    transform: scale(1.035);
  }
`,So=Zn`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(0, -22px, 0)
      scale(1.04);
  }
`,Co=Zn`
  0%,
  100% {
    opacity: 0.35;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.08);
  }
`,wo=Zn`
  0% {
    transform:
      translateX(-120%)
      skewX(-18deg);
  }

  100% {
    transform:
      translateX(220%)
      skewX(-18deg);
  }
`,z=Zn`
  0%,
  100% {
    box-shadow:
      0 0 0 0
      rgba(
        232,
        207,
        159,
        0.4
      );
  }

  50% {
    box-shadow:
      0 0 0 7px
      rgba(
        232,
        207,
        159,
        0
      );
  }
`,To=Zn`
  0% {
    transform: translateY(-6px);
    opacity: 0;
  }

  35% {
    opacity: 1;
  }

  100% {
    transform: translateY(18px);
    opacity: 0;
  }
`,Eo=()=>(0,I.jsxs)(Do,{children:[(0,I.jsx)(Oo,{"aria-hidden":`true`}),(0,I.jsx)(ko,{"aria-hidden":`true`}),(0,I.jsx)(Ao,{"aria-hidden":`true`}),(0,I.jsx)(jo,{$position:`top`,"aria-hidden":`true`}),(0,I.jsx)(jo,{$position:`right`,"aria-hidden":`true`}),(0,I.jsx)(jo,{$position:`bottom`,"aria-hidden":`true`}),(0,I.jsx)(Mo,{$size:`small`,$position:`one`,"aria-hidden":`true`}),(0,I.jsx)(Mo,{$size:`large`,$position:`two`,"aria-hidden":`true`}),(0,I.jsx)(No,{children:(0,I.jsxs)(B,{children:[(0,I.jsxs)(Po,{children:[(0,I.jsx)(Fo,{"aria-hidden":`true`}),(0,I.jsx)(Io,{children:`The Regal Affluence Group`})]}),(0,I.jsx)(Lo,{children:`A community built for the ambitious`}),(0,I.jsxs)(Ro,{children:[`Build your`,(0,I.jsx)(`br`,{}),`network.`,(0,I.jsx)(`br`,{}),`Build your`,` `,(0,I.jsx)(`span`,{children:`wealth.`})]}),(0,I.jsx)(zo,{children:`A growing community of ambitious people building meaningful relationships, accessing opportunities, and creating long-term wealth through real estate.`}),(0,I.jsxs)(Bo,{children:[(0,I.jsxs)(Vo,{href:`/regal-affluence-community/join`,children:[(0,I.jsx)(`span`,{children:`Join the community`}),(0,I.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:`→`})]}),(0,I.jsxs)(Ho,{href:`#about`,children:[(0,I.jsx)(`span`,{children:`Discover Regal Affluence`}),(0,I.jsx)(`span`,{className:`secondaryArrow`,"aria-hidden":`true`,children:`↓`})]})]}),(0,I.jsxs)(Uo,{children:[(0,I.jsxs)(Wo,{children:[(0,I.jsx)(Go,{children:`01`}),(0,I.jsx)(Ko,{children:`Community`})]}),(0,I.jsxs)(Wo,{children:[(0,I.jsx)(Go,{children:`∞`}),(0,I.jsx)(Ko,{children:`Possibilities`})]}),(0,I.jsxs)(Wo,{children:[(0,I.jsx)(Go,{children:`Global`}),(0,I.jsx)(Ko,{children:`Mindset`})]})]})]})}),(0,I.jsxs)(qo,{href:`#about`,"aria-label":`Scroll to discover more`,children:[(0,I.jsx)(Jo,{children:`Explore`}),(0,I.jsx)(Yo,{"aria-hidden":`true`,children:(0,I.jsx)(`span`,{})})]}),(0,I.jsxs)(Xo,{children:[(0,I.jsx)(`span`,{"aria-hidden":`true`}),`Open to ambitious minds worldwide`,(0,I.jsx)(`span`,{"aria-hidden":`true`})]})]}),Do=M.section`
  position: relative;

  width: 100%;

  min-height: 100svh;

  display: flex;

  align-items: center;

  overflow: hidden;

  isolation: isolate;

  background:
    radial-gradient(
      circle at 75% 35%,
      rgba(
        108,
        54,
        164,
        0.18
      ),
      transparent 30%
    ),
    ${({theme:e})=>e.colors.purpleDeep};

  color:
    ${({theme:e})=>e.colors.white};

  &::before {
    content: "";

    position: absolute;

    inset: 0;

    z-index: 0;

    pointer-events: none;

    background-image:
      linear-gradient(
        rgba(
          255,
          255,
          255,
          0.018
        ) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(
          255,
          255,
          255,
          0.018
        ) 1px,
        transparent 1px
      );

    background-size:
      80px
      80px;

    mask-image:
      linear-gradient(
        to bottom,
        rgba(
          0,
          0,
          0,
          0.35
        ),
        transparent 70%
      );

    opacity: 0.35;
  }

  @media (max-width: 768px) {
    min-height: 760px;
  }

  @media (prefers-reduced-motion: reduce) {
    & *,
    & *::before,
    & *::after {
      animation-duration:
        0.01ms !important;

      animation-iteration-count:
        1 !important;

      transition-duration:
        0.01ms !important;

      scroll-behavior:
        auto !important;
    }
  }
`,Oo=M.div`
    position: absolute;

    inset: 0;

    z-index: -3;

    width: 100%;
    height: 100%;

    background-image:
      url(
        "/regal-affluence-community/images/hero-community.jpeg"
      );

    background-repeat: no-repeat;

    background-size: cover;

    background-position:
      center center;

    transform:
      scale(1.035);

    pointer-events: none;

    user-select: none;

    animation:
      ${xo}
      1.8s
      ease-out
      both;

    @media (max-width: 1200px) {
      background-position:
        58% center;
    }

    @media (max-width: 1024px) {
      background-position:
        60% center;
    }

    @media (max-width: 768px) {
      background-position:
        63% center;

      transform:
        scale(1.06);
    }

    @media (max-width: 480px) {
      background-position:
        64% center;

      transform:
        scale(1.08);
    }
  `,ko=M.div`
    position: absolute;

    inset: 0;

    z-index: -2;

    pointer-events: none;

    background:
      linear-gradient(
        90deg,
        rgba(
          23,
          7,
          48,
          0.98
        ) 0%,
        rgba(
          27,
          8,
          53,
          0.95
        ) 20%,
        rgba(
          32,
          10,
          62,
          0.86
        ) 38%,
        rgba(
          39,
          13,
          73,
          0.62
        ) 57%,
        rgba(
          41,
          13,
          77,
          0.32
        ) 78%,
        rgba(
          25,
          7,
          46,
          0.18
        ) 100%
      ),
      linear-gradient(
        180deg,
        rgba(
          19,
          5,
          39,
          0.28
        ) 0%,
        rgba(
          26,
          7,
          51,
          0.08
        ) 40%,
        rgba(
          18,
          5,
          37,
          0.78
        ) 100%
      );

    @media (max-width: 768px) {
      background:
        linear-gradient(
          180deg,
          rgba(
            24,
            7,
            49,
            0.74
          ) 0%,
          rgba(
            28,
            8,
            56,
            0.82
          ) 32%,
          rgba(
            29,
            8,
            57,
            0.93
          ) 65%,
          rgba(
            18,
            5,
            37,
            0.99
          ) 100%
        );
    }
  `,Ao=M.div`
    position: absolute;

    inset: 0;

    z-index: -1;

    pointer-events: none;

    background:
      radial-gradient(
        ellipse at center,
        transparent 30%,
        rgba(
          10,
          3,
          23,
          0.2
        ) 65%,
        rgba(
          10,
          3,
          23,
          0.72
        ) 100%
      );
  `,jo=M.div`
    position: absolute;

    z-index: -1;

    width:
      ${({$position:e})=>e===`right`?`460px`:`360px`};

    height:
      ${({$position:e})=>e===`right`?`460px`:`360px`};

    border-radius: 50%;

    pointer-events: none;

    filter: blur(80px);

    background:
      rgba(
        111,
        54,
        170,
        0.2
      );

    animation:
      ${Co}
      8s
      ease-in-out
      infinite;

    ${({$position:e})=>{switch(e){case`top`:return`
            top: -180px;
            left: 15%;
          `;case`right`:return`
            right: -180px;
            top: 18%;
          `;case`bottom`:return`
            bottom: -240px;
            left: 35%;
            opacity: 0.18;
          `;default:return``}}}
  `,Mo=M.div`
    position: absolute;

    z-index: -1;

    width:
      ${({$size:e})=>e===`large`?`280px`:`120px`};

    height:
      ${({$size:e})=>e===`large`?`280px`:`120px`};

    border:
      1px solid
      rgba(
        232,
        207,
        159,
        0.1
      );

    border-radius: 50%;

    background:
      radial-gradient(
        circle at 35% 30%,
        rgba(
          232,
          207,
          159,
          0.1
        ),
        transparent 55%
      );

    box-shadow:
      inset
      0
      0
      60px
      rgba(
        232,
        207,
        159,
        0.035
      ),
      0
      0
      80px
      rgba(
        99,
        44,
        151,
        0.1
      );

    pointer-events: none;

    animation:
      ${So}
      9s
      ease-in-out
      infinite;

    ${({$position:e})=>e===`one`?`
          right: 8%;
          top: 22%;
          animation-delay: -2s;
        `:`
        right: 18%;
        bottom: 8%;
        opacity: 0.4;
        animation-duration: 13s;
      `}

    @media (max-width: 768px) {
      display: none;
    }
  `,No=M.div`
    position: relative;

    z-index: 2;

    width:
      min(
        100% - 64px,
        1360px
      );

    min-height: 100svh;

    margin: 0 auto;

    padding-top: 110px;

    padding-bottom: 100px;

    display: flex;

    align-items: center;

    @media (max-width: 768px) {
      width:
        min(
          100% - 36px,
          1360px
        );

      min-height: 760px;

      padding-top: 120px;

      padding-bottom: 100px;
    }

    @media (max-width: 480px) {
      width:
        min(
          100% - 28px,
          1360px
        );

      padding-top: 112px;

      padding-bottom: 92px;
    }
  `,B=M.div`
    position: relative;

    width:
      min(
        750px,
        100%
      );

    animation:
      ${yo}
      1s
      0.15s
      ease
      both;

    @media (max-width: 768px) {
      width:
        min(
          650px,
          100%
        );
    }
  `,Po=M.div`
    display: inline-flex;

    align-items: center;

    gap: 10px;

    width: fit-content;

    margin-bottom: 18px;

    padding:
      9px
      14px;

    border:
      1px solid
      rgba(
        232,
        207,
        159,
        0.18
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      rgba(
        255,
        255,
        255,
        0.045
      );

    box-shadow:
      inset
      0
      1px
      0
      rgba(
        255,
        255,
        255,
        0.07
      ),
      0
      10px
      30px
      rgba(
        0,
        0,
        0,
        0.12
      );

    backdrop-filter:
      blur(14px);

    -webkit-backdrop-filter:
      blur(14px);

    animation:
      ${bo}
      0.8s
      0.25s
      ease
      both;
  `,Fo=M.span`
    width: 7px;

    height: 7px;

    flex-shrink: 0;

    border-radius: 50%;

    background:
      ${({theme:e})=>e.colors.champagneLight};

    animation:
      ${z}
      2.4s
      ease-in-out
      infinite;
  `,Io=M.span`
    color:
      rgba(
        255,
        255,
        255,
        0.76
      );

    font-size: 9px;

    font-weight: 700;

    letter-spacing: 0.18em;

    line-height: 1;

    text-transform: uppercase;
  `,Lo=M.p`
    display: flex;

    align-items: center;

    gap: 10px;

    margin:
      0
      0
      20px;

    color:
      ${({theme:e})=>e.colors.champagneLight};

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 0.2em;

    line-height: 1.4;

    text-transform: uppercase;

    &::before {
      content: "";

      width: 30px;

      height: 1px;

      flex-shrink: 0;

      background:
        currentColor;

      box-shadow:
        0
        0
        12px
        rgba(
          232,
          207,
          159,
          0.45
        );
    }

    @media (max-width: 768px) {
      margin-bottom: 17px;

      font-size: 9px;

      letter-spacing: 0.16em;
    }
  `,Ro=M.h1`
    position: relative;

    max-width: 820px;

    margin: 0;

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        3.9rem,
        7.1vw,
        7.4rem
      );

    font-weight: 500;

    line-height: 0.88;

    letter-spacing: -0.052em;

    color:
      ${({theme:e})=>e.colors.white};

    text-wrap: balance;

    text-shadow:
      0
      8px
      35px
      rgba(
        0,
        0,
        0,
        0.18
      );

    span {
      position: relative;

      color:
        ${({theme:e})=>e.colors.champagneLight};

      background:
        linear-gradient(
          120deg,
          ${({theme:e})=>e.colors.champagneLight},
          ${({theme:e})=>e.colors.champagne},
          #f4e3b7
        );

      -webkit-background-clip:
        text;

      background-clip:
        text;

      -webkit-text-fill-color:
        transparent;

      &::after {
        content: "";

        position: absolute;

        left: 4%;

        right: 2%;

        bottom: -7px;

        height: 1px;

        background:
          linear-gradient(
            90deg,
            transparent,
            rgba(
              232,
              207,
              159,
              0.75
            ),
            transparent
          );

        opacity: 0.65;
      }
    }

    @media (max-width: 768px) {
      font-size:
        clamp(
          3.3rem,
          15vw,
          5.4rem
        );

      line-height: 0.91;

      letter-spacing:
        -0.045em;
    }

    @media (max-width: 480px) {
      font-size:
        clamp(
          2.9rem,
          14.5vw,
          4.4rem
        );
    }
  `,zo=M.p`
    max-width: 590px;

    margin:
      30px
      0
      0;

    color:
      rgba(
        255,
        255,
        255,
        0.74
      );

    font-size: 16px;

    font-weight: 400;

    line-height: 1.75;

    letter-spacing:
      -0.005em;

    text-wrap: pretty;

    @media (max-width: 768px) {
      max-width: 550px;

      margin-top: 23px;

      font-size: 15px;

      line-height: 1.68;
    }

    @media (max-width: 480px) {
      margin-top: 20px;

      font-size: 14px;

      line-height: 1.65;
    }
  `,Bo=M.div`
    display: flex;

    align-items: center;

    gap: 12px;

    margin-top: 35px;

    @media (max-width: 520px) {
      flex-direction: column;

      align-items: stretch;

      gap: 10px;

      margin-top: 29px;
    }
  `,Vo=M.a`
    position: relative;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 14px;

    min-height: 56px;

    padding:
      0
      25px;

    overflow: hidden;

    border:
      1px solid
      rgba(
        255,
        245,
        218,
        0.4
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({theme:e})=>e.colors.champagneLight},
        ${({theme:e})=>e.colors.champagne}
      );

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-size: 11px;

    font-weight: 800;

    letter-spacing: 0.095em;

    text-transform: uppercase;

    text-decoration: none;

    box-shadow:
      0
      12px
      35px
      rgba(
        201,
        169,
        110,
        0.18
      ),
      inset
      0
      1px
      0
      rgba(
        255,
        255,
        255,
        0.5
      );

    transition:
      transform 0.3s
        cubic-bezier(
          0.2,
          0.8,
          0.2,
          1
        ),
      box-shadow 0.3s ease,
      filter 0.3s ease;

    &::before {
      content: "";

      position: absolute;

      top: -40%;
      left: 0;

      width: 38%;
      height: 180%;

      background:
        rgba(
          255,
          255,
          255,
          0.35
        );

      filter: blur(10px);

      transform:
        translateX(-140%)
        skewX(-18deg);

      pointer-events: none;
    }

    .arrow {
      display: inline-flex;

      align-items: center;

      justify-content: center;

      width: 25px;
      height: 25px;

      border-radius: 50%;

      background:
        rgba(
          30,
          10,
          60,
          0.1
        );

      font-size: 16px;

      line-height: 1;

      transition:
        transform 0.3s ease,
        background 0.3s ease;
    }

    &:hover {
      transform:
        translateY(-4px);

      filter:
        brightness(1.04);

      box-shadow:
        0
        20px
        45px
        rgba(
          201,
          169,
          110,
          0.28
        ),
        0
        0
        35px
        rgba(
          201,
          169,
          110,
          0.08
        );

      &::before {
        animation:
          ${wo}
          0.75s
          ease;
      }

      .arrow {
        transform:
          translateX(3px);

        background:
          rgba(
            30,
            10,
            60,
            0.16
          );
      }
    }

    &:active {
      transform:
        translateY(-1px);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.champagneLight};

      outline-offset: 4px;
    }

    @media (max-width: 520px) {
      width: 100%;
    }
  `,Ho=M.a`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 12px;

    min-height: 56px;

    padding:
      0
      23px;

    border:
      1px solid
      rgba(
        255,
        255,
        255,
        0.23
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      rgba(
        255,
        255,
        255,
        0.025
      );

    color:
      ${({theme:e})=>e.colors.white};

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 0.085em;

    text-transform: uppercase;

    text-decoration: none;

    backdrop-filter:
      blur(12px);

    -webkit-backdrop-filter:
      blur(12px);

    transition:
      transform 0.3s ease,
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;

    .secondaryArrow {
      display: inline-flex;

      align-items: center;

      justify-content: center;

      width: 23px;
      height: 23px;

      border:
        1px solid
        rgba(
          255,
          255,
          255,
          0.18
        );

      border-radius: 50%;

      font-size: 13px;

      transition:
        transform 0.3s ease;
    }

    &:hover {
      transform:
        translateY(-3px);

      background:
        rgba(
          255,
          255,
          255,
          0.08
        );

      border-color:
        rgba(
          232,
          207,
          159,
          0.4
        );

      box-shadow:
        0
        14px
        35px
        rgba(
          0,
          0,
          0,
          0.14
        );

      .secondaryArrow {
        transform:
          translateY(3px);

        border-color:
          rgba(
            232,
            207,
            159,
            0.4
          );
      }
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.champagneLight};

      outline-offset: 4px;
    }

    @media (max-width: 520px) {
      width: 100%;
    }
  `,Uo=M.div`
    display: flex;

    align-items: center;

    width: fit-content;

    margin-top: 43px;

    padding:
      14px
      0;

    border-top:
      1px solid
      rgba(
        255,
        255,
        255,
        0.1
      );

    border-bottom:
      1px solid
      rgba(
        255,
        255,
        255,
        0.1
      );

    @media (max-width: 600px) {
      width: 100%;

      margin-top: 34px;
    }
  `,Wo=M.div`
    min-width: 105px;

    padding:
      0
      20px;

    &:first-child {
      padding-left: 0;
    }

    & + & {
      border-left:
        1px solid
        rgba(
          255,
          255,
          255,
          0.11
        );
    }

    @media (max-width: 600px) {
      min-width: 0;

      flex: 1;

      padding:
        0
        13px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  `,Go=M.strong`
    display: block;

    color:
      ${({theme:e})=>e.colors.champagneLight};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size: 20px;

    font-weight: 500;

    line-height: 1;
  `,Ko=M.span`
    display: block;

    margin-top: 5px;

    color:
      rgba(
        255,
        255,
        255,
        0.47
      );

    font-size: 8px;

    font-weight: 700;

    letter-spacing: 0.12em;

    text-transform: uppercase;

    @media (max-width: 480px) {
      font-size: 7px;

      letter-spacing: 0.08em;
    }
  `,qo=M.a`
    position: absolute;

    right: 38px;

    bottom: 58px;

    z-index: 5;

    display: flex;

    align-items: center;

    gap: 11px;

    color:
      rgba(
        255,
        255,
        255,
        0.52
      );

    text-decoration: none;

    transition:
      color 0.25s ease,
      transform 0.25s ease;

    &:hover {
      color:
        ${({theme:e})=>e.colors.champagneLight};

      transform:
        translateY(-2px);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.champagneLight};

      outline-offset: 6px;
    }

    @media (max-width: 768px) {
      display: none;
    }
  `,Jo=M.span`
    font-size: 8px;

    font-weight: 700;

    letter-spacing: 0.18em;

    text-transform: uppercase;

    writing-mode:
      vertical-rl;

    transform:
      rotate(180deg);
  `,Yo=M.span`
    position: relative;

    display: block;

    width: 1px;

    height: 55px;

    overflow: hidden;

    background:
      rgba(
        255,
        255,
        255,
        0.16
      );

    span {
      position: absolute;

      top: 0;
      left: 0;

      width: 1px;

      height: 22px;

      background:
        ${({theme:e})=>e.colors.champagneLight};

      animation:
        ${To}
        2.1s
        ease-in-out
        infinite;
    }
  `,Xo=M.p`
    position: absolute;

    left: 50%;

    bottom: 27px;

    z-index: 5;

    transform:
      translateX(-50%);

    display: flex;

    align-items: center;

    gap: 12px;

    margin: 0;

    color:
      rgba(
        255,
        255,
        255,
        0.46
      );

    font-size: 8px;

    font-weight: 700;

    letter-spacing: 0.18em;

    line-height: 1.4;

    text-transform: uppercase;

    white-space: nowrap;

    pointer-events: none;

    span {
      width: 26px;

      height: 1px;

      flex-shrink: 0;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(
            255,
            255,
            255,
            0.25
          )
        );
    }

    span:last-child {
      background:
        linear-gradient(
          90deg,
          rgba(
            255,
            255,
            255,
            0.25
          ),
          transparent
        );
    }

    @media (max-width: 520px) {
      bottom: 19px;

      gap: 7px;

      font-size: 7px;

      letter-spacing: 0.1em;

      span {
        width: 14px;
      }
    }
  `,Zo=Zn`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);

    opacity: 0.35;
  }

  50% {
    transform:
      translate3d(0, -25px, 0)
      scale(1.08);

    opacity: 0.55;
  }
`,Qo=Zn`
  from {
    transform: scaleX(0);
    transform-origin: left;
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    transform-origin: left;
    opacity: 1;
  }
`,$o=()=>(0,I.jsxs)(es,{id:`about`,children:[(0,I.jsx)(ts,{$position:`left`,"aria-hidden":`true`}),(0,I.jsx)(ts,{$position:`right`,"aria-hidden":`true`}),(0,I.jsx)(ns,{"aria-hidden":`true`}),(0,I.jsxs)(rs,{children:[(0,I.jsxs)(is,{children:[(0,I.jsx)(as,{"aria-hidden":`true`}),(0,I.jsx)(os,{children:`About Regal Affluence`}),(0,I.jsxs)(ss,{children:[`More than real estate.`,(0,I.jsx)(`br`,{}),(0,I.jsx)(cs,{children:`A community built for growth.`})]}),(0,I.jsx)(ls,{children:`Regal Affluence is a real estate company and growing professional community built around property, wealth creation, and excellence.`}),(0,I.jsx)(ls,{children:`We help individuals discover valuable real estate opportunities, make informed property decisions, and build long-term wealth through strategic property investment, sales, and advisory services.`})]}),(0,I.jsxs)(us,{children:[(0,I.jsxs)(ds,{children:[(0,I.jsxs)(fs,{children:[(0,I.jsx)(ps,{children:`01`}),(0,I.jsx)(ms,{children:`COMMUNITY`})]}),(0,I.jsx)(hs,{children:`Regal Affluence Group`}),(0,I.jsx)(gs,{children:`A growing community of ambitious, knowledgeable, ethical, and high-performing real estate professionals.`}),(0,I.jsx)(_s,{}),(0,I.jsx)(gs,{children:`We create a platform where people can learn, build relationships, access opportunities, and grow alongside other like-minded professionals.`}),(0,I.jsx)(vs,{children:(0,I.jsxs)(ys,{href:`/#community`,children:[`Explore the community`,(0,I.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})})]}),(0,I.jsxs)(ds,{children:[(0,I.jsxs)(fs,{children:[(0,I.jsx)(ps,{children:`02`}),(0,I.jsx)(ms,{children:`REAL ESTATE`})]}),(0,I.jsx)(hs,{children:`Regal Affluence Realty`}),(0,I.jsx)(gs,{children:`A real estate platform connecting clients with quality property opportunities and providing professional real estate solutions.`}),(0,I.jsx)(_s,{}),(0,I.jsx)(gs,{children:`Through strategic property investment, sales, and advisory services, we help turn opportunity into real results.`}),(0,I.jsx)(vs,{children:(0,I.jsxs)(ys,{href:`https://regalaffluencerealty.com`,target:`_blank`,rel:`noopener noreferrer`,children:[`Explore our realty`,(0,I.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})})]})]}),(0,I.jsxs)(bs,{children:[(0,I.jsx)(`span`,{children:`People.`}),(0,I.jsx)(`span`,{children:`Opportunities.`}),(0,I.jsx)(`span`,{children:`Wealth.`})]})]})]}),es=M.section`
  position: relative;

  width: 100%;

  padding: 140px 0;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      ${({theme:e})=>e.colors.ivory}
        0%,
      ${({theme:e})=>e.colors.cream}
        100%
    );

  color:
    ${({theme:e})=>e.colors.text};

  isolation: isolate;

  @media (max-width: 768px) {
    padding: 100px 0;
  }

  @media (max-width: 480px) {
    padding: 78px 0;
  }

  @media (prefers-reduced-motion: reduce) {
    & *,
    & *::before,
    & *::after {
      animation-duration:
        0.01ms !important;

      animation-iteration-count:
        1 !important;

      transition-duration:
        0.01ms !important;
    }
  }
`,ts=M.div`
    position: absolute;

    z-index: -1;

    width: 420px;
    height: 420px;

    border-radius: 50%;

    pointer-events: none;

    filter: blur(90px);

    background:
      rgba(
        99,
        43,
        151,
        0.08
      );

    animation:
      ${Zo}
      10s
      ease-in-out
      infinite;

    ${({$position:e})=>e===`left`?`
          left: -240px;
          top: 8%;
        `:`
          right: -240px;
          bottom: 4%;
          animation-delay: -4s;
        `}

    @media (max-width: 768px) {
      width: 280px;
      height: 280px;

      filter: blur(70px);
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `,ns=M.div`
    position: absolute;

    inset: 0;

    z-index: -1;

    pointer-events: none;

    opacity: 0.28;

    background-image:
      linear-gradient(
        rgba(
          72,
          35,
          111,
          0.035
        ) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(
          72,
          35,
          111,
          0.035
        ) 1px,
        transparent 1px
      );

    background-size:
      80px
      80px;

    mask-image:
      linear-gradient(
        to bottom,
        transparent,
        black 15%,
        black 85%,
        transparent
      );
  `,rs=M.div`
    position: relative;

    width:
      min(
        calc(100% - 64px),
        1320px
      );

    margin: 0 auto;

    @media (max-width: 768px) {
      width:
        min(
          calc(100% - 36px),
          1320px
        );
    }

    @media (max-width: 480px) {
      width:
        min(
          calc(100% - 28px),
          1320px
        );
    }
  `,is=M.div`
  position: relative;

  max-width: 940px;

  margin-bottom: 92px;

  @media (max-width: 768px) {
    margin-bottom: 64px;
  }

  @media (max-width: 480px) {
    margin-bottom: 52px;
  }
`,as=M.span`
    position: absolute;

    top: 2px;
    left: -46px;

    width: 1px;
    height: 86px;

    background:
      linear-gradient(
        to bottom,
        ${({theme:e})=>e.colors.champagne},
        transparent
      );

    animation:
      ${Qo}
      1s
      cubic-bezier(
        0.2,
        0.8,
        0.2,
        1
      )
      both;

    @media (max-width: 1400px) {
      display: none;
    }
  `,os=M.p`
  display: inline-flex;

  align-items: center;

  gap: 11px;

  margin:
    0
    0
    25px;

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.21em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background:
      linear-gradient(
        90deg,
        ${({theme:e})=>e.colors.champagne},
        ${({theme:e})=>e.colors.purple}
      );
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 9px;

    letter-spacing: 0.16em;
  }
`,ss=M.h2`
  max-width: 930px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.text};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      3.2rem,
      6vw,
      6rem
    );

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.052em;

  text-wrap: balance;

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.8rem,
        11vw,
        4.7rem
      );

    line-height: 0.97;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.45rem,
        12vw,
        3.8rem
      );

    letter-spacing: -0.045em;
  }
`,cs=M.span`
    position: relative;

    color:
      ${({theme:e})=>e.colors.purple};

    font-style: italic;

    &::after {
      content: "";

      position: absolute;

      left: 2%;
      right: 8%;
      bottom: -9px;

      height: 2px;

      border-radius: 999px;

      background:
        linear-gradient(
          90deg,
          transparent,
          ${({theme:e})=>e.colors.champagne},
          transparent
        );

      opacity: 0.65;
    }
  `,ls=M.p`
  max-width: 720px;

  margin:
    27px
    0
    0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 16px;

  line-height: 1.8;

  &:first-of-type {
    max-width: 780px;

    margin-top: 38px;

    color:
      ${({theme:e})=>e.colors.text};

    font-size: 18px;

    line-height: 1.72;
  }

  @media (max-width: 768px) {
    margin-top: 21px;

    font-size: 15px;

    line-height: 1.72;

    &:first-of-type {
      margin-top: 28px;

      font-size: 17px;
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;

    line-height: 1.68;

    &:first-of-type {
      font-size: 16px;
    }
  }
`,us=M.div`
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 1px;

  overflow: hidden;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.11
    );

  border-radius: 24px;

  background:
    rgba(
      69,
      35,
      105,
      0.12
    );

  box-shadow:
    0
    30px
    80px
    rgba(
      39,
      17,
      61,
      0.08
    );

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    border-radius: 20px;
  }
`,ds=M.article`
  position: relative;

  min-height: 470px;

  padding: 50px;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      rgba(
        255,
        255,
        255,
        0.96
      ),
      rgba(
        255,
        255,
        255,
        0.82
      )
    );

  transition:
    transform 0.45s
      cubic-bezier(
        0.2,
        0.8,
        0.2,
        1
      ),
    background 0.45s ease,
    box-shadow 0.45s ease;

  &::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 2px;

    background:
      linear-gradient(
        90deg,
        transparent 0%,
        ${({theme:e})=>e.colors.champagne}
          25%,
        ${({theme:e})=>e.colors.purple}
          75%,
        transparent 100%
      );

    opacity: 0;

    transform: scaleX(0.5);

    transition:
      opacity 0.4s ease,
      transform 0.5s ease;
  }

  &::after {
    content: "";

    position: absolute;

    width: 260px;
    height: 260px;

    right: -130px;
    bottom: -150px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(
          99,
          43,
          151,
          0.1
        ),
        transparent 68%
      );

    opacity: 0;

    transition:
      opacity 0.5s ease;
  }

  &:hover {
    z-index: 2;

    transform:
      translateY(-5px);

    background:
      linear-gradient(
        145deg,
        rgba(
          255,
          255,
          255,
          1
        ),
        rgba(
          249,
          245,
          238,
          0.96
        )
      );

    box-shadow:
      0
      28px
      70px
      rgba(
        39,
        17,
        61,
        0.12
      );

    &::before {
      opacity: 1;

      transform:
        scaleX(1);
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    min-height: 430px;

    padding: 42px;
  }

  @media (max-width: 768px) {
    min-height: auto;

    padding:
      38px
      30px;
  }

  @media (max-width: 480px) {
    padding:
      32px
      24px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`,fs=M.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 30px;
`,ps=M.span`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 42px;
    height: 42px;

    border:
      1px solid
      rgba(
        201,
        169,
        110,
        0.32
      );

    border-radius: 50%;

    background:
      rgba(
        201,
        169,
        110,
        0.06
      );

    color:
      ${({theme:e})=>e.colors.champagne};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size: 15px;

    font-weight: 600;

    letter-spacing: 0.03em;
  `,ms=M.span`
    color:
      rgba(
        53,
        26,
        80,
        0.42
      );

    font-size: 8px;

    font-weight: 800;

    letter-spacing: 0.18em;

    text-transform: uppercase;
  `,hs=M.h3`
    max-width: 430px;

    margin:
      0
      0
      19px;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        1.9rem,
        3vw,
        2.7rem
      );

    font-weight: 600;

    line-height: 1.05;

    letter-spacing: -0.032em;
  `,gs=M.p`
    max-width: 510px;

    margin: 0;

    color:
      ${({theme:e})=>e.colors.textMuted};

    font-size: 15px;

    line-height: 1.78;

    &:nth-of-type(2) {
      color:
        rgba(
          65,
          57,
          71,
          0.68
        );
    }

    @media (max-width: 480px) {
      font-size: 14px;

      line-height: 1.7;
    }
  `,_s=M.div`
  width: 52px;

  height: 1px;

  margin:
    29px
    0;

  background:
    linear-gradient(
      90deg,
      ${({theme:e})=>e.colors.champagne},
      rgba(
        201,
        169,
        110,
        0.12
      )
    );
`,vs=M.div`
    position: absolute;

    left: 50px;
    right: 50px;
    bottom: 38px;

    padding-top: 18px;

    border-top:
      1px solid
      rgba(
        69,
        35,
        105,
        0.09
      );

    @media (max-width: 900px) {
      left: 42px;
      right: 42px;
    }

    @media (max-width: 768px) {
      position: static;

      margin-top: 34px;

      padding-top: 17px;
    }

    @media (max-width: 480px) {
      margin-top: 28px;
    }
  `,ys=M.a`
  display: inline-flex;

  align-items: center;

  gap: 9px;

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  text-decoration: none;

  transition:
    color 0.25s ease,
    gap 0.25s ease;

  span {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    font-size: 15px;

    line-height: 1;

    transition:
      transform 0.25s ease;
  }

  &:hover {
    color:
      ${({theme:e})=>e.colors.purpleDeep};

    gap: 12px;

    span {
      transform:
        translate(
          2px,
          -2px
        );
    }
  }

  &:focus-visible {
    outline:
      2px solid
      ${({theme:e})=>e.colors.purple};

    outline-offset: 5px;

    border-radius: 3px;
  }
`,bs=M.div`
    display: flex;

    align-items: center;

    justify-content: center;

    gap: 25px;

    margin-top: 82px;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        1.6rem,
        3vw,
        2.5rem
      );

    font-weight: 500;

    letter-spacing: -0.025em;

    span {
      display: inline-flex;

      align-items: center;

      &:not(:last-child)::after {
        content: "";

        width: 5px;
        height: 5px;

        margin-left: 25px;

        border-radius: 50%;

        background:
          ${({theme:e})=>e.colors.champagne};

        box-shadow:
          0
          0
          12px
          rgba(
            201,
            169,
            110,
            0.35
          );
      }
    }

    @media (max-width: 768px) {
      flex-wrap: wrap;

      gap: 7px;

      margin-top: 55px;

      font-size: 1.75rem;

      span:not(:last-child)::after {
        display: none;
      }
    }

    @media (max-width: 480px) {
      margin-top: 45px;

      font-size: 1.5rem;
    }
  `,xs=[{number:`01`,icon:`◎`,title:`Networking`,description:`Build meaningful relationships with ambitious people and professionals who share a commitment to growth and excellence.`},{number:`02`,icon:`◇`,title:`Mentorship`,description:`Learn from experienced professionals and gain guidance that supports your personal, professional, and real estate growth.`},{number:`03`,icon:`◈`,title:`Investment Opportunities`,description:`Gain access to valuable real estate and investment opportunities while becoming better equipped to make informed decisions.`},{number:`04`,icon:`∞`,title:`Partnerships`,description:`Create relationships that can develop into meaningful collaborations, partnerships, and long-term professional opportunities.`}],Ss=[{number:`01`,title:`WhatsApp Groups`,description:`Stay connected with the community, conversations, opportunities, and updates.`},{number:`02`,title:`Online Events`,description:`Learn, connect, and participate in community activities from wherever you are.`},{number:`03`,title:`Physical Meetings`,description:`Build stronger relationships through in-person meetings, networking, and community experiences.`}],Cs=()=>(0,I.jsxs)(Es,{id:`community`,children:[(0,I.jsx)(Ds,{$position:`top`,"aria-hidden":`true`}),(0,I.jsx)(Ds,{$position:`bottom`,"aria-hidden":`true`}),(0,I.jsx)(Os,{"aria-hidden":`true`}),(0,I.jsxs)(ks,{children:[(0,I.jsxs)(As,{children:[(0,I.jsxs)(js,{children:[(0,I.jsx)(Ms,{children:`The Regal Affluence Community`}),(0,I.jsxs)(Ns,{children:[`Where ambitious people`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`connect and grow.`})]})]}),(0,I.jsxs)(Ps,{"aria-hidden":`true`,children:[(0,I.jsx)(Fs,{children:`RA`}),(0,I.jsxs)(Is,{children:[`PEOPLE`,(0,I.jsx)(`br`,{}),`POWERED`]})]}),(0,I.jsx)(Ls,{children:`Regal Affluence is built around people, relationships, opportunities, and growth. Our community gives ambitious individuals a platform to learn, connect, collaborate, and create meaningful opportunities together.`})]}),(0,I.jsxs)(Rs,{children:[(0,I.jsxs)(zs,{children:[(0,I.jsx)(Bs,{children:`What happens here`}),(0,I.jsxs)(Vs,{children:[`More than a network.`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`A place to grow.`})]}),(0,I.jsx)(Hs,{children:`Members become part of a growing professional community where knowledge is shared, relationships are built, opportunities are discovered, and people are encouraged to become better versions of themselves.`}),(0,I.jsx)(Us,{"aria-hidden":`true`})]}),(0,I.jsx)(Ws,{children:xs.map(e=>(0,I.jsxs)(Gs,{children:[(0,I.jsxs)(Ks,{children:[(0,I.jsx)(qs,{children:e.number}),(0,I.jsx)(Js,{"aria-hidden":`true`,children:e.icon})]}),(0,I.jsx)(Ys,{children:e.title}),(0,I.jsx)(Xs,{children:e.description}),(0,I.jsx)(Zs,{"aria-hidden":`true`,children:`↗`})]},e.number))})]}),(0,I.jsxs)(Qs,{children:[(0,I.jsxs)($s,{children:[(0,I.jsxs)(ec,{children:[(0,I.jsx)(Ms,{children:`How Members Participate`}),(0,I.jsxs)(tc,{children:[`Stay connected.`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`Stay involved.`})]})]}),(0,I.jsx)(nc,{children:`Community participation currently happens through a combination of digital and physical experiences, making it easier for members to stay connected and engaged.`})]}),(0,I.jsx)(rc,{children:Ss.map(e=>(0,I.jsxs)(ic,{children:[(0,I.jsx)(ac,{children:e.number}),(0,I.jsxs)(oc,{children:[(0,I.jsx)(`strong`,{children:e.title}),(0,I.jsx)(`p`,{children:e.description})]}),(0,I.jsx)(sc,{"aria-hidden":`true`,children:`→`})]},e.number))})]}),(0,I.jsxs)(cc,{children:[(0,I.jsx)(lc,{"aria-hidden":`true`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`span`,{children:`Connect.`}),(0,I.jsx)(`span`,{children:`Learn.`}),(0,I.jsx)(`span`,{children:`Collaborate.`}),(0,I.jsx)(`span`,{children:`Grow.`})]}),(0,I.jsx)(lc,{"aria-hidden":`true`})]})]})]}),ws=Zn`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(0, -22px, 0)
      scale(1.06);
  }
`,Ts=Zn`
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(120%);
  }
`,Es=M.section`
  position: relative;

  width: 100%;

  padding: 140px 0 130px;

  overflow: hidden;

  isolation: isolate;

  background:
    linear-gradient(
      180deg,
      ${({theme:e})=>e.colors.cream} 0%,
      ${({theme:e})=>e.colors.ivory} 48%,
      ${({theme:e})=>e.colors.cream} 100%
    );

  color:
    ${({theme:e})=>e.colors.text};

  @media (max-width: 768px) {
    padding: 100px 0 90px;
  }

  @media (max-width: 480px) {
    padding: 76px 0 72px;
  }

  @media (prefers-reduced-motion: reduce) {
    & *,
    & *::before,
    & *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`,Ds=M.div`
    position: absolute;

    z-index: -1;

    width: 520px;
    height: 520px;

    border-radius: 50%;

    pointer-events: none;

    filter: blur(110px);

    background:
      radial-gradient(
        circle,
        rgba(91, 33, 182, 0.1) 0%,
        rgba(91, 33, 182, 0.035) 42%,
        transparent 72%
      );

    animation:
      ${ws}
      12s
      ease-in-out
      infinite;

    ${({$position:e})=>e===`top`?`
          top: -280px;
          right: -180px;
        `:`
          bottom: -300px;
          left: -200px;
          animation-delay: -5s;
        `}

    @media (max-width: 768px) {
      width: 340px;
      height: 340px;

      filter: blur(80px);
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `,Os=M.div`
  position: absolute;

  inset: 0;

  z-index: -1;

  pointer-events: none;

  opacity: 0.22;

  background-image:
    linear-gradient(
      rgba(91, 33, 182, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(91, 33, 182, 0.035) 1px,
      transparent 1px
    );

  background-size: 90px 90px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent 0%,
      black 14%,
      black 86%,
      transparent 100%
    );
`,ks=M.div`
  position: relative;

  width:
    min(
      100% - 64px,
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        100% - 36px,
        1320px
      );
  }

  @media (max-width: 480px) {
    width:
      min(
        100% - 28px,
        1320px
      );
  }
`,As=M.header`
  position: relative;

  display: grid;

  grid-template-columns:
    minmax(0, 1.3fr)
    minmax(80px, 0.2fr)
    minmax(280px, 0.65fr);

  column-gap: 50px;

  align-items: end;

  margin-bottom: 94px;

  @media (max-width: 1100px) {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(280px, 0.55fr);

    gap: 35px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

    margin-bottom: 64px;
  }
`,js=M.div`
  position: relative;
`,Ms=M.p`
  display: inline-flex;

  align-items: center;

  gap: 11px;

  margin:
    0 0
    24px;

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background:
      linear-gradient(
        90deg,
        ${({theme:e})=>e.colors.champagne},
        ${({theme:e})=>e.colors.purple}
      );
  }

  @media (max-width: 768px) {
    margin-bottom: 19px;

    font-size: 9px;

    letter-spacing: 0.16em;
  }
`,Ns=M.h2`
  max-width: 920px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.text};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      3.3rem,
      6vw,
      6.1rem
    );

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.052em;

  text-wrap: balance;

  span {
    position: relative;

    color:
      ${({theme:e})=>e.colors.purple};

    font-style: italic;

    &::after {
      content: "";

      position: absolute;

      left: 3%;
      right: 12%;
      bottom: -8px;

      height: 2px;

      border-radius: 999px;

      background:
        linear-gradient(
          90deg,
          transparent,
          ${({theme:e})=>e.colors.champagne},
          transparent
        );

      opacity: 0.65;
    }
  }

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.8rem,
        11vw,
        4.8rem
      );

    line-height: 0.98;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.45rem,
        12vw,
        3.9rem
      );
  }
`,Ps=M.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  width: 76px;
  height: 76px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.32
    );

  border-radius: 50%;

  background:
    rgba(
      255,
      255,
      255,
      0.3
    );

  box-shadow:
    inset
      0 0 0 7px
      rgba(
        255,
        255,
        255,
        0.12
      );

  @media (max-width: 1100px) {
    display: none;
  }
`,Fs=M.span`
  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 20px;

  font-weight: 600;

  line-height: 1;
`,Is=M.span`
  margin-top: 5px;

  color:
    ${({theme:e})=>e.colors.champagne};

  font-size: 5px;

  font-weight: 800;

  letter-spacing: 0.16em;

  line-height: 1.3;

  text-align: center;
`,Ls=M.p`
  max-width: 520px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 15px;

  line-height: 1.82;

  @media (max-width: 900px) {
    max-width: 650px;
  }

  @media (max-width: 768px) {
    font-size: 14.5px;

    line-height: 1.72;
  }
`,Rs=M.div`
  display: grid;

  grid-template-columns:
    minmax(260px, 0.7fr)
    minmax(0, 1.3fr);

  gap: 72px;

  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    gap: 46px;
  }
`,zs=M.div`
  position: sticky;

  top: 120px;

  @media (max-width: 1000px) {
    position: static;
  }
`,Bs=M.p`
  margin:
    0 0
    19px;

  color:
    ${({theme:e})=>e.colors.champagne};

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.18em;

  line-height: 1.4;

  text-transform: uppercase;
`,Vs=M.h3`
  max-width: 470px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      2.35rem,
      4vw,
      3.8rem
    );

  font-weight: 500;

  line-height: 1.01;

  letter-spacing: -0.04em;

  span {
    color:
      ${({theme:e})=>e.colors.purple};

    font-style: italic;
  }
`,Hs=M.p`
  max-width: 450px;

  margin:
    26px
    0
    0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 14.5px;

  line-height: 1.82;
`,Us=M.div`
  position: relative;

  width: 120px;
  height: 1px;

  margin-top: 38px;

  overflow: hidden;

  background:
    rgba(
      91,
      33,
      182,
      0.12
    );

  &::after {
    content: "";

    position: absolute;

    inset: 0;

    width: 50%;

    background:
      linear-gradient(
        90deg,
        ${({theme:e})=>e.colors.champagne},
        ${({theme:e})=>e.colors.purple}
      );

    animation:
      ${Ts}
      4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`,Ws=M.div`
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 1px;

  overflow: hidden;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.12
    );

  border-radius: 24px;

  background:
    rgba(
      69,
      35,
      105,
      0.12
    );

  box-shadow:
    0 28px 70px
    rgba(
      39,
      17,
      61,
      0.07
    );

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    border-radius: 20px;
  }
`,Gs=M.article`
  position: relative;

  min-height: 258px;

  padding: 32px;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      rgba(
        255,
        255,
        255,
        0.95
      ),
      rgba(
        250,
        248,
        243,
        0.92
      )
    );

  transition:
    transform 0.4s
      cubic-bezier(
        0.2,
        0.8,
        0.2,
        1
      ),
    background 0.4s ease,
    box-shadow 0.4s ease;

  &::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 2px;

    background:
      linear-gradient(
        90deg,
        transparent,
        ${({theme:e})=>e.colors.champagne},
        ${({theme:e})=>e.colors.purple},
        transparent
      );

    opacity: 0;

    transform: scaleX(0.4);

    transition:
      opacity 0.4s ease,
      transform 0.45s ease;
  }

  &::after {
    content: "";

    position: absolute;

    width: 190px;
    height: 190px;

    right: -100px;
    bottom: -100px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(
          91,
          33,
          182,
          0.11
        ),
        transparent 68%
      );

    opacity: 0;

    transition:
      opacity 0.45s ease;

    pointer-events: none;
  }

  &:hover {
    z-index: 2;

    transform:
      translateY(-4px);

    background:
      linear-gradient(
        145deg,
        ${({theme:e})=>e.colors.white},
        rgba(
          250,
          248,
          243,
          0.98
        )
      );

    box-shadow:
      0
      24px
      55px
      rgba(
        39,
        17,
        61,
        0.11
      );

    &::before {
      opacity: 1;

      transform:
        scaleX(1);
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-height: 235px;

    padding: 28px;
  }

  @media (max-width: 480px) {
    min-height: 220px;

    padding:
      27px
      24px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`,Ks=M.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 29px;
`,qs=M.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 40px;
  height: 40px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.35
    );

  border-radius: 50%;

  background:
    rgba(
      201,
      169,
      110,
      0.06
    );

  color:
    ${({theme:e})=>e.colors.champagne};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 13px;

  font-weight: 600;
`,Js=M.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 40px;
  height: 40px;

  border:
    1px solid
    rgba(
      91,
      33,
      182,
      0.14
    );

  border-radius: 50%;

  background:
    rgba(
      91,
      33,
      182,
      0.035
    );

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 17px;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;

  ${Gs}:hover & {
    background:
      ${({theme:e})=>e.colors.purple};

    color:
      ${({theme:e})=>e.colors.white};

    transform:
      rotate(8deg);
  }
`,Ys=M.h4`
  max-width: 360px;

  margin:
    0
    0
    12px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 1.5rem;

  font-weight: 600;

  line-height: 1.08;

  letter-spacing: -0.025em;
`,Xs=M.p`
  max-width: 400px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 13.5px;

  line-height: 1.72;
`,Zs=M.span`
  position: absolute;

  right: 30px;
  bottom: 25px;

  color:
    rgba(
      91,
      33,
      182,
      0.3
    );

  font-size: 17px;

  opacity: 0;

  transform:
    translate(
      -7px,
      7px
    );

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${Gs}:hover & {
    opacity: 1;

    transform:
      translate(
        0,
        0
      );

    color:
      ${({theme:e})=>e.colors.purple};
  }

  @media (max-width: 768px) {
    display: none;
  }
`,Qs=M.section`
  margin-top: 120px;

  padding-top: 92px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.13
    );

  @media (max-width: 768px) {
    margin-top: 82px;

    padding-top: 65px;
  }

  @media (max-width: 480px) {
    margin-top: 68px;

    padding-top: 55px;
  }
`,$s=M.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(280px, 0.62fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 58px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 24px;

    margin-bottom: 40px;
  }
`,ec=M.div`
  min-width: 0;
`,tc=M.h3`
  max-width: 650px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      2.7rem,
      5vw,
      4.8rem
    );

  font-weight: 500;

  line-height: 0.96;

  letter-spacing: -0.045em;

  span {
    color:
      ${({theme:e})=>e.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.5rem,
        10vw,
        4rem
      );
  }
`,nc=M.p`
  max-width: 500px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 14.5px;

  line-height: 1.82;
`,rc=M.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 1px;

  overflow: hidden;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.12
    );

  border-radius: 22px;

  background:
    rgba(
      69,
      35,
      105,
      0.12
    );

  box-shadow:
    0
    25px
    60px
    rgba(
      39,
      17,
      61,
      0.06
    );

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    border-radius: 19px;
  }
`,ic=M.article`
  position: relative;

  min-height: 220px;

  padding: 32px;

  background:
    rgba(
      255,
      255,
      255,
      0.94
    );

  overflow: hidden;

  transition:
    background 0.3s ease,
    transform 0.35s ease;

  &::before {
    content: "";

    position: absolute;

    left: 0;
    bottom: 0;

    width: 100%;
    height: 3px;

    background:
      linear-gradient(
        90deg,
        ${({theme:e})=>e.colors.purple},
        ${({theme:e})=>e.colors.champagne}
      );

    transform:
      scaleX(0);

    transform-origin: left;

    transition:
      transform 0.4s
      cubic-bezier(
        0.2,
        0.8,
        0.2,
        1
      );
  }

  &:hover {
    z-index: 2;

    background:
      ${({theme:e})=>e.colors.ivory};

    transform:
      translateY(-3px);

    &::before {
      transform:
        scaleX(1);
    }
  }

  @media (max-width: 768px) {
    min-height: auto;

    padding: 28px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`,ac=M.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 38px;
  height: 38px;

  margin-bottom: 31px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.32
    );

  border-radius: 50%;

  background:
    rgba(
      201,
      169,
      110,
      0.055
    );

  color:
    ${({theme:e})=>e.colors.champagne};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 13px;

  font-weight: 600;
`,oc=M.div`
  strong {
    display: block;

    margin-bottom: 10px;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size: 1.4rem;

    font-weight: 600;

    line-height: 1.1;

    letter-spacing: -0.02em;
  }

  p {
    max-width: 350px;

    margin: 0;

    color:
      ${({theme:e})=>e.colors.textMuted};

    font-size: 13.5px;

    line-height: 1.7;
  }
`,sc=M.span`
  position: absolute;

  right: 28px;
  top: 32px;

  color:
    rgba(
      91,
      33,
      182,
      0.25
    );

  font-size: 18px;

  opacity: 0;

  transform:
    translateX(-6px);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${ic}:hover & {
    opacity: 1;

    transform:
      translateX(0);

    color:
      ${({theme:e})=>e.colors.purple};
  }

  @media (max-width: 768px) {
    display: none;
  }
`,cc=M.div`
  display: flex;

  align-items: center;

  gap: 28px;

  margin-top: 82px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  > div {
    display: flex;

    align-items: center;

    justify-content: center;

    flex-wrap: wrap;

    gap: 22px;
  }

  span {
    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        1.45rem,
        3vw,
        2.25rem
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing: -0.025em;

    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color:
        ${({theme:e})=>e.colors.champagne};

      font-family:
        ${({theme:e})=>e.fonts.body};

      font-size: 0.55em;

      vertical-align: middle;
    }
  }

  @media (max-width: 768px) {
    margin-top: 58px;

    gap: 15px;

    > div {
      gap: 8px 15px;
    }

    span {
      font-size: 1.65rem;

      &:not(:last-child)::after {
        display: none;
      }
    }
  }

  @media (max-width: 480px) {
    margin-top: 48px;

    > div {
      flex-direction: column;

      gap: 9px;
    }

    span {
      font-size: 1.5rem;
    }
  }
`,lc=M.span`
  display: block;

  flex: 1;

  max-width: 160px;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(
        201,
        169,
        110,
        0.55
      )
    );

  &:last-child {
    background:
      linear-gradient(
        90deg,
        rgba(
          201,
          169,
          110,
          0.55
        ),
        transparent
      );
  }

  @media (max-width: 768px) {
    display: none;
  }
`,uc=Zn`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`,dc=Zn`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(0, -18px, 0)
      scale(1.06);
  }
`,fc=Zn`
  0% {
    transform:
      translateX(-140%)
      skewX(-18deg);
  }

  100% {
    transform:
      translateX(220%)
      skewX(-18deg);
  }
`,pc=Zn`
  0%,
  100% {
    opacity: 0.88;
  }

  50% {
    opacity: 1;
  }
`,mc=`/regal-affluence-community/`.endsWith(`/`)?`/regal-affluence-community/`:`/regal-affluence-community//`,hc=()=>{let e=new Date().getFullYear();return(0,I.jsxs)(gc,{children:[(0,I.jsx)(_c,{$position:`left`,"aria-hidden":`true`}),(0,I.jsx)(_c,{$position:`right`,"aria-hidden":`true`}),(0,I.jsx)(vc,{"aria-hidden":`true`}),(0,I.jsxs)(yc,{children:[(0,I.jsxs)(bc,{children:[(0,I.jsxs)(xc,{children:[(0,I.jsx)(Sc,{src:`${mc}images/regal-affluence-logo.png`,alt:`Regal Affluence`,draggable:!1}),(0,I.jsx)(Cc,{children:`THE REGAL AFFLUENCE GROUP`}),(0,I.jsxs)(wc,{children:[`Build relationships.`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`Build wealth.`})]}),(0,I.jsx)(Tc,{children:`A professional community built around relationships, knowledge, opportunities, real estate, and long-term growth.`}),(0,I.jsxs)(Ec,{href:`${mc}join`,"aria-label":`Apply to join the Regal Affluence community`,children:[(0,I.jsx)(`span`,{children:`Apply to Join`}),(0,I.jsx)(Dc,{"aria-hidden":`true`,children:`↗`})]})]}),(0,I.jsxs)(Oc,{children:[(0,I.jsxs)(kc,{children:[(0,I.jsx)(Ac,{children:`Explore`}),(0,I.jsxs)(jc,{children:[(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`${mc}#about`,children:[(0,I.jsx)(`span`,{children:`About`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})}),(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`${mc}#community`,children:[(0,I.jsx)(`span`,{children:`Community`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})}),(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`${mc}benefits`,children:[(0,I.jsx)(`span`,{children:`Why Join`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})}),(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`${mc}how-it-works`,children:[(0,I.jsx)(`span`,{children:`How It Works`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})}),(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`${mc}who-its-for`,children:[(0,I.jsx)(`span`,{children:`Who It's For`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})})]})]}),(0,I.jsxs)(kc,{children:[(0,I.jsx)(Ac,{children:`Connect`}),(0,I.jsxs)(jc,{children:[(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`${mc}join`,children:[(0,I.jsx)(`span`,{children:`Apply to Join`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})}),(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`https://www.instagram.com/regal_affluence_group`,target:`_blank`,rel:`noopener noreferrer`,children:[(0,I.jsx)(`span`,{children:`Instagram`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})}),(0,I.jsx)(`li`,{children:(0,I.jsxs)(Mc,{href:`https://regalaffluencerealty.com`,target:`_blank`,rel:`noopener noreferrer`,children:[(0,I.jsx)(`span`,{children:`Regal Affluence Realty`}),(0,I.jsx)(Nc,{"aria-hidden":`true`,children:`↗`})]})})]})]})]})]}),(0,I.jsxs)(Pc,{"aria-hidden":`true`,children:[(0,I.jsx)(`span`,{className:`word`,children:`REGAL`}),(0,I.jsx)(`span`,{className:`dot`,children:`•`}),(0,I.jsx)(`span`,{className:`word`,children:`AFFLUENCE`})]}),(0,I.jsxs)(Fc,{children:[(0,I.jsxs)(Ic,{children:[`© `,e,` Regal Affluence. All rights reserved.`]}),(0,I.jsxs)(Lc,{children:[(0,I.jsx)(Rc,{href:`${mc}privacy`,children:`Privacy Policy`}),(0,I.jsx)(Rc,{href:`${mc}terms`,children:`Terms & Conditions`})]})]})]})]})},gc=M.footer`
  position: relative;

  width: 100%;

  overflow: hidden;

  isolation: isolate;

  padding:
    105px 0 30px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  /*
   * RICH LUXURY GRADIENT
   *
   * Lavender
   * Warm champagne
   * Ivory
   * Muted lilac
   * Soft purple
   */

  background:
    radial-gradient(
      circle at 8% 18%,
      rgba(
        116,
        76,
        164,
        0.18
      ),
      transparent 30%
    ),
    radial-gradient(
      circle at 92% 78%,
      rgba(
        201,
        169,
        110,
        0.16
      ),
      transparent 28%
    ),
    linear-gradient(
      115deg,
      #d2bfe2 0%,
      #e4d1ca 23%,
      #f0e3d2 43%,
      #ebe0ee 61%,
      #d7c4e4 80%,
      #c3acd5 100%
    );

  background-size:
    auto,
    auto,
    180% 180%;

  background-position:
    center,
    center,
    0% 50%;

  animation:
    ${uc}
    20s
    ease-in-out
    infinite;

  /*
   * Architectural grid.
   */

  &::before {
    content: "";

    position: absolute;

    inset: 0;

    z-index: -2;

    pointer-events: none;

    opacity: 0.28;

    background-image:
      linear-gradient(
        rgba(
          69,
          35,
          105,
          0.045
        ) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(
          69,
          35,
          105,
          0.045
        ) 1px,
        transparent 1px
      );

    background-size:
      85px 85px;

    mask-image:
      linear-gradient(
        to bottom,
        transparent 0%,
        black 16%,
        black 84%,
        transparent 100%
      );
  }

  /*
   * Soft central highlight.
   */

  &::after {
    content: "";

    position: absolute;

    left: 50%;

    top: 48%;

    width: 55vw;

    height: 55vw;

    max-width: 720px;

    max-height: 720px;

    transform:
      translate(
        -50%,
        -50%
      );

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(
          255,
          250,
          240,
          0.18
        ),
        transparent 68%
      );

    pointer-events: none;

    z-index: -1;
  }

  @media (max-width: 768px) {
    padding:
      80px 0 26px;
  }

  @media (max-width: 480px) {
    padding:
      68px 0 24px;
  }

  @media (
    prefers-reduced-motion:
      reduce
  ) {
    animation: none;
  }
`,_c=M.div`
    position: absolute;

    z-index: -1;

    width: 460px;
    height: 460px;

    border-radius: 50%;

    pointer-events: none;

    filter:
      blur(115px);

    background:
      ${({$position:e})=>e===`left`?`rgba(94, 54, 140, 0.12)`:`rgba(201, 169, 110, 0.13)`};

    animation:
      ${dc}
      11s
      ease-in-out
      infinite;

    ${({$position:e})=>e===`left`?`
          left: -280px;
          top: -150px;
        `:`
          right: -280px;
          bottom: -180px;
          animation-delay: -4s;
        `}

    @media (max-width: 768px) {
      width: 300px;
      height: 300px;

      filter:
        blur(85px);
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      animation: none;
    }
  `,vc=M.div`
    position: absolute;

    top: 0;

    left: 50%;

    width:
      min(
        calc(100% - 80px),
        1220px
      );

    height: 1px;

    transform:
      translateX(-50%);

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(
          91,
          33,
          182,
          0.16
        ),
        rgba(
          201,
          169,
          110,
          0.62
        ),
        rgba(
          91,
          33,
          182,
          0.16
        ),
        transparent
      );

    pointer-events: none;

    @media (max-width: 768px) {
      width:
        calc(
          100% - 40px
        );
    }
  `,yc=M.div`
  position: relative;

  width:
    min(
      calc(100% - 64px),
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        calc(100% - 36px),
        1320px
      );
  }

  @media (max-width: 480px) {
    width:
      min(
        calc(100% - 28px),
        1320px
      );
  }
`,bc=M.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.25fr)
    minmax(300px, 0.75fr);

  gap:
    clamp(
      70px,
      9vw,
      120px
    );

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns:
      1fr;

    gap: 65px;
  }

  @media (max-width: 768px) {
    gap: 52px;
  }
`,xc=M.div`
  position: relative;

  max-width: 700px;
`,Sc=M.img`
    display: block;

    width: 190px;

    height: auto;

    margin-bottom: 28px;

    object-fit: contain;

    opacity: 0.96;

    filter:
      drop-shadow(
        0
        8px
        22px
        rgba(
          61,
          30,
          94,
          0.13
        )
      );

    animation:
      ${pc}
      4s
      ease-in-out
      infinite;

    @media (max-width: 480px) {
      width: 155px;

      margin-bottom: 23px;
    }
  `,Cc=M.p`
    display: inline-flex;

    align-items: center;

    gap: 10px;

    margin:
      0 0 20px;

    color:
      ${({theme:e})=>e.colors.purple};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.2em;

    line-height:
      1.4;

    text-transform:
      uppercase;

    &::before {
      content: "";

      width: 30px;

      height: 1px;

      flex-shrink: 0;

      background:
        ${({theme:e})=>e.colors.champagne};
    }

    @media (max-width: 480px) {
      font-size: 8px;

      letter-spacing:
        0.16em;
    }
  `,wc=M.h2`
    max-width: 680px;

    margin: 0;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        3.2rem,
        6vw,
        5.8rem
      );

    font-weight: 500;

    line-height:
      0.92;

    letter-spacing:
      -0.05em;

    text-wrap:
      balance;

    span {
      color:
        ${({theme:e})=>e.colors.purple};

      font-style:
        italic;
    }

    @media (max-width: 768px) {
      font-size:
        clamp(
          2.8rem,
          11vw,
          4.6rem
        );

      line-height:
        0.96;
    }

    @media (max-width: 480px) {
      font-size:
        clamp(
          2.5rem,
          12vw,
          3.9rem
        );
    }
  `,Tc=M.p`
    max-width: 560px;

    margin:
      28px 0 0;

    color:
      rgba(
        53,
        40,
        65,
        0.68
      );

    font-size: 15px;

    line-height:
      1.82;

    @media (max-width: 768px) {
      margin-top: 22px;

      font-size: 14px;

      line-height:
        1.72;
    }

    @media (max-width: 480px) {
      font-size:
        13.5px;
    }
  `,Ec=M.a`
    position: relative;

    display: inline-flex;

    align-items: center;

    justify-content:
      center;

    gap: 12px;

    min-height: 53px;

    margin-top: 28px;

    padding:
      0 22px;

    overflow: hidden;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.17
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({theme:e})=>e.colors.purple},
        #7956a8
      );

    color:
      ${({theme:e})=>e.colors.white};

    font-size: 10px;

    font-weight: 800;

    letter-spacing:
      0.08em;

    text-transform:
      uppercase;

    text-decoration:
      none;

    box-shadow:
      0
      12px
      32px
      rgba(
        91,
        33,
        182,
        0.16
      );

    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &::before {
      content: "";

      position: absolute;

      top: -40%;

      left: -100%;

      width: 45%;

      height: 180%;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(
            255,
            255,
            255,
            0.5
          ),
          transparent
        );

      transform:
        skewX(-18deg);

      pointer-events: none;
    }

    &:hover {
      transform:
        translateY(-3px);

      box-shadow:
        0
        18px
        42px
        rgba(
          91,
          33,
          182,
          0.24
        );

      &::before {
        animation:
          ${fc}
          0.75s
          ease
          forwards;
      }
    }

    &:active {
      transform:
        translateY(-1px);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.purple};

      outline-offset:
        5px;
    }

    @media (max-width: 480px) {
      width: 100%;
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;

      &:hover,
      &:active {
        transform: none;
      }

      &:hover::before {
        animation: none;
      }
    }
  `,Dc=M.span`
    position: relative;

    z-index: 2;

    font-size: 15px;

    line-height: 1;

    transition:
      transform 0.25s ease;

    ${Ec}:hover & {
      transform:
        translate(
          2px,
          -2px
        );
    }
  `,Oc=M.div`
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap: 58px;

  padding-top: 4px;

  @media (max-width: 500px) {
    gap: 32px;
  }
`,kc=M.div`
    min-width: 0;
  `,Ac=M.h3`
    display: flex;

    align-items: center;

    gap: 10px;

    margin:
      0 0 20px;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.18em;

    text-transform:
      uppercase;

    &::before {
      content: "";

      width: 23px;

      height: 1px;

      background:
        ${({theme:e})=>e.colors.champagne};
    }
  `,jc=M.ul`
    display: flex;

    flex-direction:
      column;

    gap: 13px;

    margin: 0;

    padding: 0;

    list-style:
      none;
  `,Mc=M.a`
    display: inline-flex;

    align-items: center;

    gap: 8px;

    color:
      rgba(
        53,
        38,
        68,
        0.66
      );

    font-size: 12px;

    font-weight: 500;

    line-height:
      1.45;

    text-decoration:
      none;

    transition:
      color 0.25s ease,
      transform 0.25s ease;

    &:hover {
      color:
        ${({theme:e})=>e.colors.purpleDeep};

      transform:
        translateX(3px);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.purple};

      outline-offset:
        4px;

      border-radius:
        4px;
    }

    @media (max-width: 480px) {
      font-size:
        11.5px;
    }
  `,Nc=M.span`
    color:
      ${({theme:e})=>e.colors.champagne};

    font-size: 13px;

    line-height: 1;

    opacity: 0.82;

    transition:
      transform 0.25s ease,
      opacity 0.25s ease;

    ${Mc}:hover & {
      opacity: 1;

      transform:
        translate(
          2px,
          -2px
        );
    }
  `,Pc=M.div`
    display: flex;

    align-items: center;

    justify-content:
      center;

    gap: 14px;

    margin:
      82px 0 24px;

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        2.3rem,
        6vw,
        5rem
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;

    user-select:
      none;

    .word {
      color:
        rgba(
          69,
          35,
          105,
          0.17
        );
    }

    .dot {
      color:
        ${({theme:e})=>e.colors.champagne};

      font-family:
        ${({theme:e})=>e.fonts.body};

      font-size:
        0.22em;
    }

    @media (max-width: 768px) {
      margin-top:
        62px;

      font-size:
        clamp(
          2rem,
          8vw,
          4rem
        );
    }

    @media (max-width: 480px) {
      margin-top:
        52px;

      font-size:
        2rem;
    }
  `,Fc=M.div`
  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 24px;

  padding-top: 19px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.14
    );

  @media (max-width: 700px) {
    flex-direction:
      column;

    align-items:
      flex-start;

    gap: 14px;
  }
`,Ic=M.p`
    margin: 0;

    color:
      rgba(
        53,
        38,
        68,
        0.45
      );

    font-size: 9px;

    font-weight: 600;

    letter-spacing:
      0.06em;

    line-height:
      1.5;
  `,Lc=M.div`
    display: flex;

    align-items: center;

    gap: 22px;

    @media (max-width: 480px) {
      gap: 16px;

      flex-wrap: wrap;
    }
  `,Rc=M.a`
    color:
      rgba(
        53,
        38,
        68,
        0.52
      );

    font-size: 9px;

    font-weight: 700;

    letter-spacing:
      0.03em;

    line-height:
      1.4;

    text-decoration:
      none;

    transition:
      color 0.25s ease;

    &:hover {
      color:
        ${({theme:e})=>e.colors.purpleDeep};
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.purple};

      outline-offset:
        4px;

      border-radius:
        4px;
    }
  `,zc=`https://script.google.com/macros/s/AKfycbzNHL0mcmPqJ15NAiRM1io3ilwUXlulo8vrV7qdSgy9qYxyjkzk5O5VjNgpvxaeeCSh/exec`,Bc=`https://chat.whatsapp.com/LXNSKWf1E8JCxECrBxpm6f?mode=gi_t`,V=()=>{let[e,t]=(0,j.useState)(!1),[n,r]=(0,j.useState)(!1),[i,a]=(0,j.useState)(``),[o,s]=(0,j.useState)(!1),[c,l]=(0,j.useState)(!1),u=(0,j.useRef)(null);return(0,j.useEffect)(()=>{let e=u.current;e&&e.scrollHeight<=e.clientHeight+8&&s(!0)},[]),n?(0,I.jsx)(Hc,{children:(0,I.jsx)(Uc,{children:(0,I.jsxs)(Ol,{children:[(0,I.jsx)(Gc,{children:`Application Received`}),(0,I.jsxs)(Kc,{children:[`Welcome to`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`Regal Affluence.`})]}),(0,I.jsxs)(qc,{children:[`Your application has been submitted successfully.`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`br`,{}),`You can now join the Regal Affluence community on WhatsApp.`]}),(0,I.jsxs)(Tl,{as:`a`,href:Bc,target:`_blank`,rel:`noopener noreferrer`,children:[`Join the community`,(0,I.jsx)(El,{"aria-hidden":`true`,children:`→`})]})]})})}):(0,I.jsx)(Hc,{children:(0,I.jsxs)(Uc,{children:[(0,I.jsxs)(Wc,{children:[(0,I.jsx)(Gc,{children:`Join Regal Affluence`}),(0,I.jsxs)(Kc,{children:[`Your next chapter`,(0,I.jsx)(`br`,{}),`starts`,` `,(0,I.jsx)(`span`,{children:`here.`})]}),(0,I.jsxs)(qc,{children:[`Tell us a little about yourself and why you want to be part of the Regal Affluence community.`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`br`,{}),`There are no membership requirements — we are looking for ambitious people who are ready to learn, grow, connect, and create long-term wealth.`]})]}),(0,I.jsxs)(Jc,{onSubmit:async e=>{if(e.preventDefault(),!o){a(`Please read the Terms & Conditions to the end before submitting your application.`);return}if(!c){a(`Please confirm that you have read and agree to the Terms & Conditions.`);return}t(!0),a(``);let n=e.currentTarget,i=new FormData(n),u={fullName:String(i.get(`fullName`)||``).trim(),email:String(i.get(`email`)||``).trim(),phone:String(i.get(`phone`)||``).trim(),occupation:String(i.get(`occupation`)||``).trim(),businessName:String(i.get(`businessName`)||``).trim(),location:String(i.get(`location`)||``).trim(),socialMedia:String(i.get(`socialMedia`)||``).trim(),referralSource:String(i.get(`referralSource`)||``).trim(),whyJoin:String(i.get(`whyJoin`)||``).trim(),skills:String(i.get(`skills`)||``).trim(),termsAccepted:!0};try{let e=await fetch(zc,{method:`POST`,headers:{"Content-Type":`text/plain;charset=utf-8`},body:JSON.stringify(u)});if(!e.ok)throw Error(`Unable to submit application.`);let t=await e.json();if(!t.success)throw Error(t.message||`Application submission failed.`);r(!0),n.reset(),l(!1),s(!1)}catch(e){console.error(`Application submission error:`,e),a(`Something went wrong while submitting your application. Please try again.`)}finally{t(!1)}},children:[(0,I.jsxs)(Yc,{children:[(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`fullName`,children:[`Full Name`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(tl,{id:`fullName`,name:`fullName`,type:`text`,placeholder:`Your full name`,required:!0,autoComplete:`name`})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`email`,children:[`Email Address`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(tl,{id:`email`,name:`email`,type:`email`,placeholder:`you@example.com`,required:!0,autoComplete:`email`})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`phone`,children:[`Phone Number`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(tl,{id:`phone`,name:`phone`,type:`tel`,placeholder:`+234...`,required:!0,autoComplete:`tel`})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`occupation`,children:[`Occupation`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(tl,{id:`occupation`,name:`occupation`,type:`text`,placeholder:`What do you do?`,required:!0})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`businessName`,children:[`Business Name`,` `,(0,I.jsx)(el,{children:`(Optional)`})]}),(0,I.jsx)(tl,{id:`businessName`,name:`businessName`,type:`text`,placeholder:`Your business name`})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`location`,children:[`Location`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(tl,{id:`location`,name:`location`,type:`text`,placeholder:`City / Country`,required:!0,autoComplete:`address-level2`})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`socialMedia`,children:[`Social Media Handles`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(tl,{id:`socialMedia`,name:`socialMedia`,type:`text`,placeholder:`@username or links`,required:!0})]}),(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`referralSource`,children:[`How did you hear about us?`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsxs)(nl,{id:`referralSource`,name:`referralSource`,defaultValue:``,required:!0,children:[(0,I.jsx)(`option`,{value:``,disabled:!0,children:`Select an option`}),(0,I.jsx)(`option`,{value:`instagram`,children:`Instagram`}),(0,I.jsx)(`option`,{value:`whatsapp`,children:`WhatsApp`}),(0,I.jsx)(`option`,{value:`referral`,children:`Friend / Referral`}),(0,I.jsx)(`option`,{value:`event`,children:`Event`}),(0,I.jsx)(`option`,{value:`google`,children:`Google / Search`}),(0,I.jsx)(`option`,{value:`other`,children:`Other`})]})]}),(0,I.jsx)(Xc,{children:(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`whyJoin`,children:[`Why do you want to join Regal Affluence?`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(rl,{id:`whyJoin`,name:`whyJoin`,placeholder:`Tell us what you hope to learn, build, or achieve...`,rows:6,required:!0})]})}),(0,I.jsx)(Xc,{children:(0,I.jsxs)(Zc,{children:[(0,I.jsxs)(Qc,{htmlFor:`skills`,children:[`Skills / Expertise`,` `,(0,I.jsx)($c,{children:`*`})]}),(0,I.jsx)(rl,{id:`skills`,name:`skills`,placeholder:`Tell us about your skills, experience, or areas of expertise...`,rows:5,required:!0})]})})]}),(0,I.jsxs)(il,{children:[(0,I.jsxs)(al,{children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(ol,{children:`Before You Submit`}),(0,I.jsx)(sl,{children:`Terms & Conditions`})]}),(0,I.jsxs)(cl,{$read:o,children:[(0,I.jsx)(ll,{$read:o}),o?`Read`:`Please read`]})]}),(0,I.jsx)(ul,{children:`Please read the following temporary Terms & Conditions carefully. You must scroll to the end before you can accept them.`}),(0,I.jsxs)(H,{ref:u,onScroll:()=>{let e=u.current;!e||o||e.scrollTop+e.clientHeight>=e.scrollHeight-8&&s(!0)},tabIndex:0,"aria-label":`Regal Affluence Terms and Conditions`,children:[(0,I.jsx)(dl,{children:`TEMPORARY DOCUMENT — DRAFT`}),(0,I.jsxs)(fl,{children:[`REGAL AFFLUENCE`,(0,I.jsx)(`br`,{}),`COMMUNITY TERMS & CONDITIONS`]}),(0,I.jsx)(pl,{children:`Working Draft`}),(0,I.jsx)(ml,{}),(0,I.jsx)(hl,{children:`1. Purpose of the Community`}),(0,I.jsx)(gl,{children:`Regal Affluence is a professional community created to bring together ambitious individuals interested in learning, building meaningful relationships, discovering opportunities, and pursuing long-term personal and professional growth.`}),(0,I.jsx)(gl,{children:`Membership is intended for individuals who are willing to contribute positively to the community and conduct themselves with professionalism, integrity, and respect.`}),(0,I.jsx)(hl,{children:`2. Application & Membership`}),(0,I.jsx)(gl,{children:`Submission of an application does not automatically guarantee membership. Regal Affluence reserves the right to review applications and determine whether an applicant is a suitable fit for the community.`}),(0,I.jsx)(gl,{children:`Applicants are expected to provide truthful and accurate information during the application process. Providing misleading, fraudulent, or intentionally false information may result in rejection of an application or removal from the community.`}),(0,I.jsx)(hl,{children:`3. Professional Conduct`}),(0,I.jsx)(gl,{children:`Members are expected to communicate respectfully with other members and representatives of Regal Affluence.`}),(0,I.jsx)(gl,{children:`Harassment, discrimination, abusive communication, deliberate disruption, impersonation, scams, fraudulent activity, and other conduct that may negatively affect the community are not permitted.`}),(0,I.jsx)(hl,{children:`4. Opportunities & Information`}),(0,I.jsx)(gl,{children:`Regal Affluence may share information relating to property, business, networking, investment, training, partnerships, and other opportunities.`}),(0,I.jsx)(gl,{children:`Members are responsible for conducting their own research and due diligence before making decisions based on information or opportunities shared within the community.`}),(0,I.jsx)(gl,{children:`Participation in the community does not constitute a guarantee of financial returns, business success, investment performance, employment, partnership, or any specific outcome.`}),(0,I.jsx)(hl,{children:`5. Confidentiality & Respect`}),(0,I.jsx)(gl,{children:`Members should respect the privacy of other members and avoid sharing private conversations, personal information, or confidential community materials without appropriate permission.`}),(0,I.jsx)(hl,{children:`6. Community Access`}),(0,I.jsx)(gl,{children:`Access to private community channels, groups, events, resources, or opportunities may be subject to membership approval and additional requirements communicated by Regal Affluence.`}),(0,I.jsx)(gl,{children:`Community access may be suspended or withdrawn where there is a reasonable basis to believe that a member has violated community standards or otherwise acted against the interests of the community.`}),(0,I.jsx)(hl,{children:`7. Content & Communication`}),(0,I.jsx)(gl,{children:`Members are responsible for the content they contribute to community discussions, events, and communication channels.`}),(0,I.jsx)(gl,{children:`Members should not knowingly publish misleading, illegal, harmful, defamatory, or inappropriate content within the community.`}),(0,I.jsx)(hl,{children:`8. Changes to These Terms`}),(0,I.jsx)(gl,{children:`Regal Affluence may update these Terms & Conditions from time to time as the community develops.`}),(0,I.jsx)(gl,{children:`Updated terms may replace this temporary draft and members may be required to review and accept the updated version where appropriate.`}),(0,I.jsx)(hl,{children:`9. Acceptance`}),(0,I.jsx)(gl,{children:`By accepting these terms, you confirm that you have read the document and agree to respect the standards, principles, and expectations described above.`}),(0,I.jsx)(gl,{children:`This document is currently a temporary working draft and may be replaced by the final Regal Affluence Terms & Conditions before or after community launch.`}),(0,I.jsx)(ml,{}),(0,I.jsx)(_l,{children:`END OF TEMPORARY TERMS & CONDITIONS`})]}),(0,I.jsxs)(vl,{$read:o,children:[(0,I.jsx)(yl,{$read:o,children:o?`✓`:`↓`}),(0,I.jsx)(`span`,{children:o?`You have reached the end of the document.`:`Read to the very end of the document to unlock the agreement.`})]}),(0,I.jsxs)(bl,{$enabled:o,onClick:()=>{o&&l(e=>!e)},role:`checkbox`,"aria-checked":c,"aria-disabled":!o,tabIndex:o?0:-1,onKeyDown:e=>{o&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),l(e=>!e))},children:[(0,I.jsx)(xl,{$enabled:o,children:(0,I.jsx)(Sl,{$checked:c,$enabled:o,"aria-hidden":`true`,children:c&&`✓`})}),(0,I.jsx)(Cl,{$enabled:o,children:`I have read the Terms & Conditions and agree to abide by the standards of the Regal Affluence community.`})]})]}),i&&(0,I.jsx)(Dl,{children:i}),(0,I.jsx)(wl,{children:`By submitting this application, you agree to provide accurate information and uphold the professional and ethical standards of the Regal Affluence community.`}),(0,I.jsxs)(Tl,{type:`submit`,disabled:e||!o||!c,title:o?c?`Submit your application`:`Accept the Terms & Conditions first`:`Read the Terms & Conditions first`,children:[e?`Submitting...`:`Submit Application`,!e&&(0,I.jsx)(El,{"aria-hidden":`true`,children:`→`})]})]})]})})},Vc=Zn`
    from {
      opacity: 0;

      transform:
        translateY(20px);
    }

    to {
      opacity: 1;

      transform:
        translateY(0);
    }
  `,Hc=M.section`
    position: relative;

    width: 100%;

    min-height: 100svh;

    padding:
      150px 0 100px;

    overflow: hidden;

    background:
      linear-gradient(
        135deg,
        ${({theme:e})=>e.colors.ivory}
          0%,
        ${({theme:e})=>e.colors.cream}
          52%,
        #eee4f6
          100%
      );

    color:
      ${({theme:e})=>e.colors.text};

    isolation: isolate;

    &::before {
      content: "";

      position: absolute;

      top: -180px;

      right: -180px;

      width: 480px;

      height: 480px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(
            91,
            33,
            182,
            0.08
          ),
          transparent 68%
        );

      filter:
        blur(40px);

      pointer-events:
        none;

      z-index: -1;
    }

    &::after {
      content: "";

      position: absolute;

      bottom: -220px;

      left: -180px;

      width: 460px;

      height: 460px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(
            201,
            169,
            110,
            0.09
          ),
          transparent 68%
        );

      filter:
        blur(45px);

      pointer-events:
        none;

      z-index: -1;
    }

    @media (max-width: 768px) {
      padding:
        120px 0 80px;
    }

    @media (max-width: 480px) {
      padding:
        105px 0 64px;
    }
  `,Uc=M.div`
    position: relative;

    width:
      min(
        calc(100% - 48px),
        1120px
      );

    margin: 0 auto;

    @media (max-width: 768px) {
      width:
        min(
          calc(100% - 32px),
          1120px
        );
    }
  `,Wc=M.header`
    max-width: 820px;

    margin-bottom: 64px;

    @media (max-width: 768px) {
      margin-bottom: 48px;
    }
  `,Gc=M.p`
    display: inline-flex;

    align-items: center;

    gap: 10px;

    margin:
      0 0 22px;

    color:
      ${({theme:e})=>e.colors.purple};

    font-size: 11px;

    font-weight: 700;

    letter-spacing:
      0.2em;

    line-height:
      1.4;

    text-transform:
      uppercase;

    &::before {
      content: "";

      width: 34px;

      height: 1px;

      flex-shrink: 0;

      background:
        ${({theme:e})=>e.colors.champagne};
    }

    @media (max-width: 768px) {
      margin-bottom:
        18px;

      font-size: 10px;

      letter-spacing:
        0.16em;
    }
  `,Kc=M.h1`
    max-width: 900px;

    margin: 0;

    color:
      ${({theme:e})=>e.colors.text};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        3.2rem,
        6.5vw,
        6rem
      );

    font-weight: 500;

    line-height:
      0.96;

    letter-spacing:
      -0.045em;

    text-wrap:
      balance;

    span {
      color:
        ${({theme:e})=>e.colors.purple};

      font-style:
        italic;
    }

    @media (max-width: 768px) {
      font-size:
        clamp(
          2.8rem,
          12vw,
          4.8rem
        );

      line-height:
        0.98;
    }

    @media (max-width: 480px) {
      font-size:
        clamp(
          2.55rem,
          12vw,
          4rem
        );
    }
  `,qc=M.p`
    max-width: 720px;

    margin:
      28px 0 0;

    color:
      ${({theme:e})=>e.colors.textMuted};

    font-size: 17px;

    line-height:
      1.8;

    @media (max-width: 768px) {
      margin-top:
        22px;

      font-size: 15px;

      line-height:
        1.7;
    }
  `,Jc=M.form`
    position: relative;

    width: 100%;

    padding: 52px;

    background:
      rgba(
        255,
        255,
        255,
        0.86
      );

    border:
      1px solid
      rgba(
        69,
        35,
        105,
        0.12
      );

    border-radius:
      ${({theme:e})=>e.radius.lg};

    box-shadow:
      0
      25px
      70px
      rgba(
        60,
        35,
        82,
        0.08
      );

    backdrop-filter:
      blur(12px);

    -webkit-backdrop-filter:
      blur(12px);

    @media (max-width: 768px) {
      padding:
        36px 28px;
    }

    @media (max-width: 480px) {
      padding:
        28px 20px;
    }
  `,Yc=M.div`
    display: grid;

    grid-template-columns:
      repeat(
        2,
        minmax(
          0,
          1fr
        )
      );

    gap:
      28px 24px;

    @media (max-width: 680px) {
      grid-template-columns:
        1fr;

      gap: 24px;
    }
  `,Xc=M.div`
    grid-column:
      1 / -1;
  `,Zc=M.div`
    display: flex;

    flex-direction:
      column;

    gap: 9px;
  `,Qc=M.label`
    color:
      ${({theme:e})=>e.colors.text};

    font-size: 12px;

    font-weight: 700;

    letter-spacing:
      0.04em;
  `,$c=M.span`
    color:
      ${({theme:e})=>e.colors.purple};
  `,el=M.span`
    color:
      ${({theme:e})=>e.colors.textMuted};

    font-weight: 500;
  `,tl=M.input`
    width: 100%;

    min-height: 52px;

    padding:
      0 16px;

    border:
      1px solid
      ${({theme:e})=>e.colors.border};

    border-radius:
      ${({theme:e})=>e.radius.sm};

    background:
      rgba(
        250,
        248,
        243,
        0.9
      );

    color:
      ${({theme:e})=>e.colors.text};

    font-size: 15px;

    outline: none;

    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color:
        ${({theme:e})=>e.colors.textMuted};

      opacity:
        0.65;
    }

    &:hover {
      border-color:
        rgba(
          91,
          33,
          182,
          0.3
        );
    }

    &:focus {
      border-color:
        ${({theme:e})=>e.colors.purple};

      background:
        ${({theme:e})=>e.colors.white};

      box-shadow:
        0
        0
        0 3px
        rgba(
          91,
          33,
          182,
          0.08
        );
    }
  `,nl=M.select`
    width: 100%;

    min-height: 52px;

    padding:
      0 16px;

    border:
      1px solid
      ${({theme:e})=>e.colors.border};

    border-radius:
      ${({theme:e})=>e.radius.sm};

    background:
      rgba(
        250,
        248,
        243,
        0.9
      );

    color:
      ${({theme:e})=>e.colors.text};

    font-size: 15px;

    outline: none;

    cursor:
      pointer;

    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      border-color:
        rgba(
          91,
          33,
          182,
          0.3
        );
    }

    &:focus {
      border-color:
        ${({theme:e})=>e.colors.purple};

      background:
        ${({theme:e})=>e.colors.white};

      box-shadow:
        0
        0
        0 3px
        rgba(
          91,
          33,
          182,
          0.08
        );
    }
  `,rl=M.textarea`
    width: 100%;

    min-height: 140px;

    padding:
      15px 16px;

    border:
      1px solid
      ${({theme:e})=>e.colors.border};

    border-radius:
      ${({theme:e})=>e.radius.sm};

    background:
      rgba(
        250,
        248,
        243,
        0.9
      );

    color:
      ${({theme:e})=>e.colors.text};

    font-size: 15px;

    line-height:
      1.65;

    outline: none;

    resize:
      vertical;

    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color:
        ${({theme:e})=>e.colors.textMuted};

      opacity:
        0.65;
    }

    &:hover {
      border-color:
        rgba(
          91,
          33,
          182,
          0.3
        );
    }

    &:focus {
      border-color:
        ${({theme:e})=>e.colors.purple};

      background:
        ${({theme:e})=>e.colors.white};

      box-shadow:
        0
        0
        0 3px
        rgba(
          91,
          33,
          182,
          0.08
        );
    }
  `,il=M.section`
    margin-top:
      52px;

    padding-top:
      44px;

    border-top:
      1px solid
      rgba(
        69,
        35,
        105,
        0.12
      );

    @media (max-width: 768px) {
      margin-top:
        42px;

      padding-top:
        36px;
    }
  `,al=M.div`
    display: flex;

    align-items:
      flex-end;

    justify-content:
      space-between;

    gap: 24px;

    margin-bottom:
      16px;

    @media (max-width: 600px) {
      align-items:
        flex-start;

      flex-direction:
        column;

      gap: 14px;
    }
  `,ol=M.p`
    margin:
      0 0 8px;

    color:
      ${({theme:e})=>e.colors.champagne};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.18em;

    text-transform:
      uppercase;
  `,sl=M.h2`
    margin: 0;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        2rem,
        4vw,
        3rem
      );

    font-weight: 500;

    line-height:
      1;

    letter-spacing:
      -0.035em;
  `,cl=M.div`
    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding:
      8px 12px;

    border:
      1px solid
      ${({$read:e})=>e?`rgba(73, 137, 92, 0.24)`:`rgba(201, 169, 110, 0.25)`};

    border-radius:
      999px;

    background:
      ${({$read:e})=>e?`rgba(73, 137, 92, 0.055)`:`rgba(201, 169, 110, 0.055)`};

    color:
      ${({$read:e,theme:t})=>e?`#39734b`:t.colors.textMuted};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.08em;

    text-transform:
      uppercase;

    white-space:
      nowrap;
  `,ll=M.span`
    width: 6px;

    height: 6px;

    border-radius:
      50%;

    background:
      ${({$read:e,theme:t})=>e?`#4c985f`:t.colors.champagne};

    box-shadow:
      ${({$read:e})=>e?`0 0 10px rgba(76, 152, 95, 0.3)`:`none`};
  `,ul=M.p`
    max-width: 680px;

    margin:
      0 0 20px;

    color:
      ${({theme:e})=>e.colors.textMuted};

    font-size: 13px;

    line-height:
      1.7;
  `,H=M.div`
    position: relative;

    width: 100%;

    height:
      clamp(
        360px,
        50vw,
        500px
      );

    padding:
      34px 36px;

    overflow-y:
      auto;

    overflow-x:
      hidden;

    border:
      1px solid
      rgba(
        69,
        35,
        105,
        0.13
      );

    border-radius:
      ${({theme:e})=>e.radius.md||e.radius.lg};

    background:
      linear-gradient(
        145deg,
        rgba(
          248,
          244,
          237,
          0.96
        ),
        rgba(
          240,
          232,
          245,
          0.72
        )
      );

    box-shadow:
      inset
      0 1px 0
      rgba(
        255,
        255,
        255,
        0.75
      );

    scrollbar-width:
      thin;

    scrollbar-color:
      rgba(
        91,
        33,
        182,
        0.32
      )
      transparent;

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.purple};

      outline-offset:
        3px;
    }

    &::-webkit-scrollbar {
      width:
        8px;
    }

    &::-webkit-scrollbar-track {
      background:
        transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius:
        999px;

      background:
        rgba(
          91,
          33,
          182,
          0.28
        );
    }

    &::-webkit-scrollbar-thumb:hover {
      background:
        rgba(
          91,
          33,
          182,
          0.42
        );
    }

    @media (max-width: 768px) {
      height:
        400px;

      padding:
        28px 24px;
    }

    @media (max-width: 480px) {
      height:
        380px;

      padding:
        25px 20px;
    }
  `,dl=M.div`
    display: inline-flex;

    align-items: center;

    margin-bottom:
      22px;

    padding:
      7px 10px;

    border:
      1px solid
      rgba(
        201,
        169,
        110,
        0.38
      );

    border-radius:
      999px;

    background:
      rgba(
        201,
        169,
        110,
        0.08
      );

    color:
      ${({theme:e})=>e.colors.champagne};

    font-size: 8px;

    font-weight: 800;

    letter-spacing:
      0.16em;

    text-transform:
      uppercase;
  `,fl=M.h3`
    margin:
      0;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      clamp(
        2rem,
        4vw,
        3rem
      );

    font-weight:
      600;

    line-height:
      0.98;

    letter-spacing:
      -0.04em;
  `,pl=M.p`
    margin:
      12px 0 0;

    color:
      ${({theme:e})=>e.colors.textMuted};

    font-size:
      10px;

    font-weight:
      700;

    letter-spacing:
      0.12em;

    text-transform:
      uppercase;
  `,ml=M.div`
    width:
      70px;

    height:
      1px;

    margin:
      28px 0;

    background:
      linear-gradient(
        90deg,
        ${({theme:e})=>e.colors.champagne},
        transparent
      );
  `,hl=M.h4`
    margin:
      28px 0 10px;

    color:
      ${({theme:e})=>e.colors.purpleDeep};

    font-family:
      ${({theme:e})=>e.fonts.display};

    font-size:
      1.25rem;

    font-weight:
      600;

    line-height:
      1.15;

    letter-spacing:
      -0.02em;
  `,gl=M.p`
    margin:
      0 0 14px;

    color:
      rgba(
        55,
        42,
        65,
        0.7
      );

    font-size:
      13px;

    line-height:
      1.78;
  `,_l=M.p`
    margin:
      0;

    color:
      ${({theme:e})=>e.colors.champagne};

    font-size:
      9px;

    font-weight:
      800;

    letter-spacing:
      0.16em;

    text-transform:
      uppercase;

    text-align:
      center;
  `,vl=M.div`
    display: flex;

    align-items: center;

    gap: 10px;

    margin-top:
      14px;

    color:
      ${({$read:e,theme:t})=>e?`#39734b`:t.colors.textMuted};

    font-size:
      11px;

    line-height:
      1.5;

    transition:
      color 0.25s ease;
  `,yl=M.span`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 22px;

    height: 22px;

    flex-shrink: 0;

    border:
      1px solid
      ${({$read:e,theme:t})=>e?`rgba(73, 137, 92, 0.25)`:t.colors.border};

    border-radius:
      50%;

    background:
      ${({$read:e})=>e?`rgba(73, 137, 92, 0.07)`:`rgba(255,255,255,0.45)`};

    color:
      ${({$read:e,theme:t})=>e?`#39734b`:t.colors.champagne};

    font-size:
      12px;

    font-weight:
      800;
  `,bl=M.div`
    display: flex;

    align-items:
      flex-start;

    gap: 13px;

    margin-top:
      21px;

    padding:
      17px 18px;

    border:
      1px solid
      ${({$enabled:e})=>e?`rgba(91, 33, 182, 0.18)`:`rgba(69, 35, 105, 0.08)`};

    border-radius:
      ${({theme:e})=>e.radius.sm};

    background:
      ${({$enabled:e})=>e?`rgba(255,255,255,0.72)`:`rgba(255,255,255,0.38)`};

    cursor:
      ${({$enabled:e})=>e?`pointer`:`not-allowed`};

    user-select: none;

    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.2s ease,
      box-shadow 0.25s ease;

    ${({$enabled:e})=>e&&`
        &:hover {
          border-color:
            rgba(91, 33, 182, 0.28);

          background:
            rgba(255,255,255,0.92);

          box-shadow:
            0 8px 24px
            rgba(69, 35, 105, 0.06);

          transform:
            translateY(-1px);
        }

        &:focus-visible {
          outline:
            2px solid
            rgba(91, 33, 182, 0.4);

          outline-offset: 3px;
        }
      `}

    @media (max-width: 480px) {
      padding:
        15px;
    }
  `,xl=M.div`
    position: relative;

    width: 20px;

    height: 20px;

    flex-shrink: 0;

    margin-top:
      1px;

    opacity:
      ${({$enabled:e})=>e?1:.45};
  `,Sl=M.span`
    display: flex;

    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;

    border:
      1px solid
      ${({$checked:e,$enabled:t,theme:n})=>e?n.colors.purple:t?`rgba(91, 33, 182, 0.3)`:n.colors.border};

    border-radius:
      5px;

    background:
      ${({$checked:e,theme:t})=>e?t.colors.purple:`rgba(255,255,255,0.65)`};

    color:
      ${({theme:e})=>e.colors.white};

    font-size:
      12px;

    font-weight:
      900;

    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;

    ${({$enabled:e})=>e&&`
        box-shadow:
          0 0 0 3px
          rgba(91, 33, 182, 0.05);
      `}

    ${({$checked:e})=>e&&`
        transform:
          scale(1.04);
      `}
  `,Cl=M.span`
    color:
      ${({$enabled:e,theme:t})=>e?t.colors.text:t.colors.textMuted};

    font-size:
      12px;

    line-height:
      1.65;

    cursor:
      ${({$enabled:e})=>e?`pointer`:`not-allowed`};

    transition:
      color 0.25s ease;
  `,wl=M.p`
    max-width:
      700px;

    margin:
      32px 0 0;

    color:
      ${({theme:e})=>e.colors.textMuted};

    font-size:
      12px;

    line-height:
      1.7;
  `,Tl=M.button`
    display: inline-flex;

    align-items:
      center;

    justify-content:
      center;

    gap:
      12px;

    min-height:
      56px;

    margin-top:
      24px;

    padding:
      0 28px;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.16
      );

    border-radius:
      ${({theme:e})=>e.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({theme:e})=>e.colors.purple},
        #7956a8
      );

    color:
      ${({theme:e})=>e.colors.white};

    font-size:
      12px;

    font-weight:
      800;

    letter-spacing:
      0.08em;

    text-transform:
      uppercase;

    text-decoration:
      none;

    cursor:
      pointer;

    box-shadow:
      0
      12px
      30px
      rgba(
        91,
        33,
        182,
        0.14
      );

    transition:
      transform 0.25s ease,
      background 0.25s ease,
      box-shadow 0.25s ease,
      opacity 0.25s ease;

    &:hover:not(:disabled) {
      transform:
        translateY(-2px);

      background:
        linear-gradient(
          135deg,
          ${({theme:e})=>e.colors.purpleDark},
          ${({theme:e})=>e.colors.purple}
        );

      box-shadow:
        0
        16px
        36px
        rgba(
          91,
          33,
          182,
          0.22
        );
    }

    &:focus-visible {
      outline:
        2px solid
        ${({theme:e})=>e.colors.champagne};

      outline-offset:
        4px;
    }

    &:disabled {
      opacity:
        0.42;

      cursor:
        not-allowed;

      box-shadow:
        none;
    }

    @media (max-width: 520px) {
      width: 100%;
    }
  `,El=M.span`
    font-size:
      18px;

    line-height:
      1;
  `,Dl=M.p`
    margin-top:
      24px;

    padding:
      14px 16px;

    border:
      1px solid
      rgba(
        192,
        57,
        43,
        0.2
      );

    border-radius:
      ${({theme:e})=>e.radius.sm};

    background:
      rgba(
        192,
        57,
        43,
        0.06
      );

    color:
      ${({theme:e})=>e.colors.error};

    font-size:
      13px;

    line-height:
      1.5;
  `,Ol=M.div`
    max-width:
      760px;

    margin:
      0 auto;

    padding:
      80px 0;

    text-align:
      center;

    animation:
      ${Vc}
      0.6s
      ease
      both;

    ${Gc} {
      justify-content:
        center;
    }

    ${qc} {
      margin-left:
        auto;

      margin-right:
        auto;
    }

    @media (max-width: 768px) {
      padding:
        50px 0;
    }
  `,kl=[{number:`01`,icon:`↗`,title:`Learn & Develop`,description:`Grow your knowledge through training, mentorship, personal development, and exposure to experienced professionals.`},{number:`02`,icon:`◎`,title:`Build Relationships`,description:`Connect with ambitious people, build meaningful relationships, and become part of a growing professional community.`},{number:`03`,icon:`◇`,title:`Access Opportunities`,description:`Discover business, partnership, investment, and real estate opportunities through a network built around access.`},{number:`04`,icon:`↗`,title:`Grow Your Career`,description:`Develop the confidence, skills, relationships, and professional mindset needed to build a successful career in real estate.`},{number:`05`,icon:`∞`,title:`Create Long-Term Wealth`,description:`Position yourself to make informed property decisions and pursue long-term wealth creation through real estate.`},{number:`06`,icon:`✦`,title:`Grow With Purpose`,description:`Be part of a community committed to excellence, ethical standards, professional growth, and creating real results.`}],Al=()=>(0,I.jsx)(jl,{children:(0,I.jsxs)(Ml,{children:[(0,I.jsxs)(Nl,{children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(Pl,{children:`Why Join Regal Affluence`}),(0,I.jsxs)(Fl,{children:[`A community designed`,(0,I.jsx)(`br`,{}),`for `,(0,I.jsx)(`span`,{children:`ambition.`})]})]}),(0,I.jsx)(Il,{children:`Regal Affluence offers more than a place to work in real estate. It provides a platform to learn, grow, build relationships, access opportunities, and create long-term wealth.`})]}),(0,I.jsx)(Ll,{children:kl.map(e=>(0,I.jsxs)(Rl,{children:[(0,I.jsx)(zl,{children:e.number}),(0,I.jsx)(Bl,{"aria-hidden":`true`,children:e.icon}),(0,I.jsx)(Vl,{children:e.title}),(0,I.jsx)(U,{children:e.description})]},e.number))}),(0,I.jsxs)(W,{children:[(0,I.jsx)(`span`,{children:`Learn`}),(0,I.jsx)(`span`,{children:`Connect`}),(0,I.jsx)(`span`,{children:`Access`}),(0,I.jsx)(`span`,{children:`Grow`}),(0,I.jsx)(`span`,{children:`Build Wealth`})]})]})}),jl=M.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background:
    ${({theme:e})=>e.colors.purpleDeep};

  color:
    ${({theme:e})=>e.colors.white};

  overflow: hidden;

  @media (max-width: 768px) {
    padding: 90px 0;
  }

  @media (max-width: 480px) {
    padding: 72px 0;
  }
`,Ml=M.div`
  width:
    min(
      100% - 48px,
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        100% - 32px,
        1320px
      );
  }
`,Nl=M.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.35fr)
    minmax(280px, 0.65fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 72px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

    margin-bottom: 56px;
  }
`,Pl=M.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0 0
    24px;

  color:
    ${({theme:e})=>e.colors.champagneLight};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background: currentColor;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`,Fl=M.h1`
  max-width: 800px;

  margin: 0;

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      3rem,
      6vw,
      5.8rem
    );

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -0.045em;

  color:
    ${({theme:e})=>e.colors.white};

  span {
    color:
      ${({theme:e})=>e.colors.champagneLight};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.7rem,
        11vw,
        4.5rem
      );

    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.5rem,
        12vw,
        3.6rem
      );
  }
`,Il=M.p`
  max-width: 500px;

  justify-self: end;

  margin: 0;

  color:
    rgba(
      255,
      255,
      255,
      0.68
    );

  font-size: 16px;

  line-height: 1.8;

  @media (max-width: 900px) {
    justify-self: start;

    max-width: 650px;
  }

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.7;
  }
`,Ll=M.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  border-left:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  @media (max-width: 900px) {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,Rl=M.article`
  position: relative;

  min-height: 300px;

  padding: 36px;

  border-right:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  background:
    transparent;

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background:
      rgba(
        255,
        255,
        255,
        0.045
      );
  }

  @media (max-width: 768px) {
    min-height: 270px;

    padding: 30px;
  }
`,zl=M.span`
  position: absolute;

  top: 30px;
  right: 32px;

  color:
    rgba(
      255,
      255,
      255,
      0.3
    );

  font-size: 10px;

  font-weight: 600;

  letter-spacing: 0.12em;
`,Bl=M.div`
  display: grid;

  place-items: center;

  width: 46px;
  height: 46px;

  margin-bottom: 30px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.55
    );

  border-radius: 50%;

  color:
    ${({theme:e})=>e.colors.champagneLight};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 20px;

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  ${Rl}:hover & {
    background:
      rgba(
        201,
        169,
        110,
        0.1
      );

    transform:
      rotate(8deg);
  }
`,Vl=M.h2`
  margin:
    0 0
    14px;

  color:
    ${({theme:e})=>e.colors.white};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 25px;

  font-weight: 500;

  line-height: 1.15;

  letter-spacing: -0.02em;
`,U=M.p`
  max-width: 360px;

  margin: 0;

  color:
    rgba(
      255,
      255,
      255,
      0.58
    );

  font-size: 14px;

  line-height: 1.75;
`,W=M.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-wrap: wrap;

  gap:
    12px 24px;

  margin-top: 64px;

  color:
    rgba(
      255,
      255,
      255,
      0.42
    );

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 24px;

      color:
        ${({theme:e})=>e.colors.champagne};
    }
  }

  @media (max-width: 600px) {
    gap:
      8px 16px;

    line-height: 1.8;

    span:not(:last-child)::after {
      margin-left: 16px;
    }
  }
`,G=[{number:`01`,icon:`↗`,title:`Submit Your Application`,description:`Tell us a little about yourself, what you do, and why you want to be part of the Regal Affluence community.`},{number:`02`,icon:`◎`,title:`Get Reviewed`,description:`Your application goes through an automated review process designed to help us understand your application and community fit.`},{number:`03`,icon:`◇`,title:`Join the Community`,description:`Once your application is approved, you receive an invitation to join the Regal Affluence WhatsApp community.`},{number:`04`,icon:`✦`,title:`Connect & Grow`,description:`Get involved, build relationships, learn, access opportunities, and grow alongside other ambitious professionals.`}],K=()=>(0,I.jsx)(q,{children:(0,I.jsxs)(Hl,{children:[(0,I.jsxs)(Ul,{children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(Wl,{children:`How It Works`}),(0,I.jsxs)(Gl,{children:[`Getting started is`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`simple.`})]})]}),(0,I.jsx)(Kl,{children:`Joining Regal Affluence is designed to be straightforward. Apply, get reviewed, join the community, and start building relationships and opportunities that support your growth.`})]}),(0,I.jsx)(J,{children:G.map((e,t)=>(0,I.jsxs)(ql,{children:[(0,I.jsxs)(Jl,{children:[(0,I.jsx)(Yl,{children:e.number}),(0,I.jsx)(Xl,{"aria-hidden":`true`,children:e.icon})]}),(0,I.jsxs)(Zl,{children:[(0,I.jsx)(Ql,{children:e.title}),(0,I.jsx)($l,{children:e.description})]}),t!==G.length-1&&(0,I.jsx)(eu,{"aria-hidden":`true`})]},e.number))}),(0,I.jsxs)(tu,{children:[(0,I.jsx)(`span`,{children:`Apply.`}),(0,I.jsx)(`span`,{children:`Connect.`}),(0,I.jsx)(`span`,{children:`Grow.`})]})]})}),q=M.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background:
    ${({theme:e})=>e.colors.ivory};

  color:
    ${({theme:e})=>e.colors.text};

  overflow: hidden;

  @media (max-width: 768px) {
    padding: 90px 0;
  }

  @media (max-width: 480px) {
    padding: 72px 0;
  }
`,Hl=M.div`
  width:
    min(
      100% - 48px,
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        100% - 32px,
        1320px
      );
  }
`,Ul=M.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(280px, 0.8fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 90px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

    margin-bottom: 64px;
  }
`,Wl=M.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0
    0
    24px;

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background:
      ${({theme:e})=>e.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`,Gl=M.h1`
  max-width: 850px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.text};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      3rem,
      6vw,
      5.8rem
    );

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -0.045em;

  span {
    color:
      ${({theme:e})=>e.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.7rem,
        11vw,
        4.5rem
      );

    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.5rem,
        12vw,
        3.6rem
      );
  }
`,Kl=M.p`
  max-width: 520px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 16px;

  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.7;
  }
`,J=M.div`
  position: relative;

  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  border:
    1px solid
    ${({theme:e})=>e.colors.border};

  border-radius:
    ${({theme:e})=>e.radius.lg};

  overflow: hidden;

  background:
    ${({theme:e})=>e.colors.border};

  gap: 1px;

  @media (max-width: 1000px) {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,ql=M.article`
  position: relative;

  min-height: 330px;

  padding: 36px;

  background:
    ${({theme:e})=>e.colors.white};

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background:
      ${({theme:e})=>e.colors.cream};
  }

  @media (max-width: 1000px) {
    min-height: 300px;
  }

  @media (max-width: 768px) {
    min-height: 260px;

    padding: 30px;
  }

  @media (max-width: 600px) {
    min-height: auto;

    padding:
      30px
      28px;
  }
`,Jl=M.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 70px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`,Yl=M.span`
  color:
    ${({theme:e})=>e.colors.champagne};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 18px;

  font-weight: 600;

  letter-spacing: 0.04em;
`,Xl=M.span`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  border:
    1px solid
    ${({theme:e})=>e.colors.border};

  border-radius:
    ${({theme:e})=>e.radius.pill};

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 16px;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  ${ql}:hover & {
    background:
      ${({theme:e})=>e.colors.purple};

    border-color:
      ${({theme:e})=>e.colors.purple};

    color:
      ${({theme:e})=>e.colors.white};
  }
`,Zl=M.div`
  max-width: 300px;
`,Ql=M.h2`
  margin:
    0
    0
    14px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      1.55rem,
      2.5vw,
      2rem
    );

  font-weight: 600;

  line-height: 1.1;

  letter-spacing: -0.025em;
`,$l=M.p`
  margin: 0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 14px;

  line-height: 1.75;
`,eu=M.span`
  position: absolute;

  top: 56px;

  right: -1px;

  width: 1px;

  height: 54px;

  background:
    ${({theme:e})=>e.colors.champagne};

  opacity: 0.35;

  @media (max-width: 1000px) {
    display: none;
  }
`,tu=M.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-wrap: wrap;

  gap: 22px;

  margin-top: 72px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      1.5rem,
      3vw,
      2.3rem
    );

  font-weight: 500;

  letter-spacing: -0.02em;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color:
        ${({theme:e})=>e.colors.champagne};

      font-family:
        ${({theme:e})=>e.fonts.body};

      font-size: 0.6em;

      vertical-align: middle;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;

    gap: 8px;

    margin-top: 52px;

    font-size: 1.7rem;

    span:not(:last-child)::after {
      display: none;
    }
  }
`,nu=[{number:`01`,icon:`◆`,title:`Ambitious`,description:`You have a strong desire to achieve more and are willing to put in the work required to build something meaningful.`},{number:`02`,icon:`↗`,title:`Growth-Minded`,description:`You are committed to learning, improving yourself, and becoming better personally, professionally, and financially.`},{number:`03`,icon:`◎`,title:`Relationship-Driven`,description:`You understand the value of meaningful relationships and want to connect with people who share your ambition.`},{number:`04`,icon:`✦`,title:`Professional`,description:`You value excellence, professionalism, integrity, and the standards required to build a respected career.`},{number:`05`,icon:`◇`,title:`Teachable`,description:`You are open to learning from others, developing new skills, and applying what you learn to your growth.`},{number:`06`,icon:`∞`,title:`Future-Focused`,description:`You are interested in creating long-term value, building wealth, and positioning yourself for greater opportunities.`}],ru=()=>(0,I.jsx)(iu,{children:(0,I.jsxs)(au,{children:[(0,I.jsxs)(ou,{children:[(0,I.jsx)(su,{children:`Who Regal Affluence Is For`}),(0,I.jsxs)(cu,{children:[`Built for people`,(0,I.jsx)(`br`,{}),`who want to`,` `,(0,I.jsx)(lu,{children:`grow.`})]}),(0,I.jsx)(uu,{children:`Regal Affluence is for ambitious, growth-minded people who want to build meaningful relationships, develop professionally, access opportunities, and create long-term wealth through real estate.`})]}),(0,I.jsx)(du,{children:nu.map(e=>(0,I.jsxs)(fu,{children:[(0,I.jsx)(pu,{children:e.number}),(0,I.jsx)(mu,{"aria-hidden":`true`,children:e.icon}),(0,I.jsx)(hu,{children:e.title}),(0,I.jsx)(gu,{children:e.description})]},e.number))}),(0,I.jsxs)(_u,{children:[(0,I.jsx)(`span`,{children:`Learn.`}),(0,I.jsx)(`span`,{children:`Connect.`}),(0,I.jsx)(`span`,{children:`Grow.`}),(0,I.jsx)(`span`,{children:`Create Wealth.`})]})]})}),iu=M.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background:
    ${({theme:e})=>e.colors.cream};

  color:
    ${({theme:e})=>e.colors.text};

  overflow: hidden;

  @media (max-width: 768px) {
    padding: 90px 0;
  }

  @media (max-width: 480px) {
    padding: 72px 0;
  }
`,au=M.div`
  width:
    min(
      100% - 48px,
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        100% - 32px,
        1320px
      );
  }
`,ou=M.div`
  max-width: 980px;

  margin-bottom: 76px;

  @media (max-width: 768px) {
    margin-bottom: 56px;
  }
`,su=M.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0
    0
    24px;

  color:
    ${({theme:e})=>e.colors.purple};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background:
      ${({theme:e})=>e.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`,cu=M.h1`
  max-width: 900px;

  margin: 0;

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      3rem,
      6vw,
      5.8rem
    );

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -0.045em;

  color:
    ${({theme:e})=>e.colors.text};

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.7rem,
        11vw,
        4.5rem
      );

    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.5rem,
        12vw,
        3.6rem
      );
  }
`,lu=M.span`
  color:
    ${({theme:e})=>e.colors.purple};

  font-style: italic;
`,uu=M.p`
  max-width: 720px;

  margin:
    30px
    0
    0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 17px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 22px;

    font-size: 15px;

    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: 14.5px;
  }
`,du=M.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 1px;

  background:
    ${({theme:e})=>e.colors.border};

  border:
    1px solid
    ${({theme:e})=>e.colors.border};

  border-radius:
    ${({theme:e})=>e.radius.lg};

  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,fu=M.article`
  position: relative;

  min-height: 290px;

  padding: 38px;

  background:
    ${({theme:e})=>e.colors.ivory};

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background:
      ${({theme:e})=>e.colors.white};
  }

  @media (max-width: 900px) {
    min-height: 270px;

    padding: 34px;
  }

  @media (max-width: 600px) {
    min-height: auto;

    padding:
      32px
      28px;
  }
`,pu=M.span`
  display: block;

  margin-bottom: 34px;

  color:
    ${({theme:e})=>e.colors.champagne};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 17px;

  font-weight: 600;

  letter-spacing: 0.04em;
`,mu=M.span`
  position: absolute;

  top: 34px;
  right: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  color:
    ${({theme:e})=>e.colors.purple};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size: 20px;

  opacity: 0.75;

  @media (max-width: 600px) {
    top: 30px;
    right: 28px;
  }
`,hu=M.h2`
  margin:
    0
    0
    14px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      1.7rem,
      2.5vw,
      2.2rem
    );

  font-weight: 600;

  line-height: 1.1;

  letter-spacing: -0.025em;
`,gu=M.p`
  max-width: 420px;

  margin: 0;

  color:
    ${({theme:e})=>e.colors.textMuted};

  font-size: 14px;

  line-height: 1.75;
`,_u=M.div`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 22px;

  margin-top: 68px;

  color:
    ${({theme:e})=>e.colors.purpleDeep};

  font-family:
    ${({theme:e})=>e.fonts.display};

  font-size:
    clamp(
      1.4rem,
      2.8vw,
      2.2rem
    );

  font-weight: 500;

  letter-spacing: -0.02em;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color:
        ${({theme:e})=>e.colors.champagne};

      font-family:
        ${({theme:e})=>e.fonts.body};

      font-size: 0.6em;

      vertical-align: middle;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    gap:
      8px
      18px;

    margin-top: 52px;

    font-size: 1.6rem;

    span:not(:last-child)::after {
      margin-left: 18px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    gap: 6px;

    font-size: 1.5rem;

    span:not(:last-child)::after {
      display: none;
    }
  }
`,vu=M.section`
  width: 100%;

  padding: 150px 0 120px;

  background: ${({theme:e})=>e.colors.ivory};

  color: ${({theme:e})=>e.colors.text};

  @media (max-width: 768px) {
    padding: 120px 0 90px;
  }

  @media (max-width: 480px) {
    padding: 105px 0 72px;
  }
`,yu=M.div`
  width: min(100% - 48px, 1100px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 32px, 1100px);
  }
`,bu=M.header`
  max-width: 850px;

  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
`,xu=M.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 24px;

  color: ${({theme:e})=>e.colors.purple};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background: ${({theme:e})=>e.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`,Su=M.h1`
  max-width: 900px;

  font-family: ${({theme:e})=>e.fonts.display};

  font-size: clamp(4rem, 8vw, 7rem);

  font-weight: 500;

  line-height: 0.92;

  letter-spacing: -0.05em;

  color: ${({theme:e})=>e.colors.text};

  span {
    color: ${({theme:e})=>e.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(3.2rem, 15vw, 5.5rem);

    line-height: 0.96;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.9rem, 14vw, 4.2rem);
  }
`,Cu=M.p`
  max-width: 760px;

  margin-top: 34px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 18px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 26px;

    font-size: 16px;

    line-height: 1.7;
  }
`,wu=M.p`
  margin-top: 28px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;
`,Tu=M.div`
  max-width: 850px;
`,Eu=M.article`
  max-width: 800px;
`,Du=M.h2`
  margin-bottom: 22px;

  color: ${({theme:e})=>e.colors.purpleDeep};

  font-family: ${({theme:e})=>e.fonts.display};

  font-size: clamp(1.7rem, 3vw, 2.35rem);

  font-weight: 600;

  line-height: 1.15;

  letter-spacing: -0.025em;
`,Y=M.p`
  max-width: 780px;

  margin-top: 18px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 16px;

  line-height: 1.85;

  &:first-of-type {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.75;
  }
`,Ou=M.ul`
  margin: 22px 0 0;

  padding-left: 22px;
`,ku=M.li`
  margin-bottom: 12px;

  padding-left: 6px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 16px;

  line-height: 1.7;

  &::marker {
    color: ${({theme:e})=>e.colors.champagne};
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`,Au=M.div`
  width: 100%;

  height: 1px;

  margin: 64px 0;

  background: ${({theme:e})=>e.colors.border};

  @media (max-width: 768px) {
    margin: 48px 0;
  }
`,ju=M.div`
  margin-top: 30px;

  padding: 32px;

  border: 1px solid ${({theme:e})=>e.colors.border};

  border-radius: ${({theme:e})=>e.radius.lg};

  background: ${({theme:e})=>e.colors.white};

  @media (max-width: 768px) {
    padding: 24px;
  }
`,Mu=M.h3`
  margin-bottom: 12px;

  color: ${({theme:e})=>e.colors.purpleDeep};

  font-family: ${({theme:e})=>e.fonts.display};

  font-size: 1.5rem;

  font-weight: 600;
`,Nu=()=>(0,I.jsx)(vu,{children:(0,I.jsxs)(yu,{children:[(0,I.jsxs)(bu,{children:[(0,I.jsx)(xu,{children:`Regal Affluence`}),(0,I.jsxs)(Su,{children:[`Privacy`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`Policy.`})]}),(0,I.jsx)(Cu,{children:`We respect your privacy and are committed to protecting the personal information you provide when you interact with Regal Affluence, apply to join our community, or use our website and services.`}),(0,I.jsx)(wu,{children:`Last updated: August 20, 2026`})]}),(0,I.jsxs)(Tu,{children:[(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`1. About This Privacy Policy`}),(0,I.jsx)(Y,{children:`This Privacy Policy explains how Regal Affluence collects, uses, stores, and protects information provided by visitors, applicants, community members, clients, and other individuals who interact with us.`}),(0,I.jsx)(Y,{children:`By using this website or submitting an application, you acknowledge that you have read and understood this Privacy Policy.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`2. Information We Collect`}),(0,I.jsx)(Y,{children:`When you apply to join the Regal Affluence community, we may collect information such as:`}),(0,I.jsxs)(Ou,{children:[(0,I.jsx)(ku,{children:`Full name`}),(0,I.jsx)(ku,{children:`Email address`}),(0,I.jsx)(ku,{children:`Phone number`}),(0,I.jsx)(ku,{children:`Occupation`}),(0,I.jsx)(ku,{children:`Business name`}),(0,I.jsx)(ku,{children:`Location`}),(0,I.jsx)(ku,{children:`Social media handles or links`}),(0,I.jsx)(ku,{children:`How you heard about us`}),(0,I.jsx)(ku,{children:`Your reason for wanting to join`}),(0,I.jsx)(ku,{children:`Skills and areas of expertise`})]}),(0,I.jsx)(Y,{children:`We may also collect information you voluntarily provide when you contact us, communicate with us, participate in our community, or interact with our services.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`3. How We Use Your Information`}),(0,I.jsx)(Y,{children:`Information provided to Regal Affluence may be used to:`}),(0,I.jsxs)(Ou,{children:[(0,I.jsx)(ku,{children:`Process and review community applications.`}),(0,I.jsx)(ku,{children:`Communicate with applicants and community members.`}),(0,I.jsx)(ku,{children:`Provide information about our community, opportunities, events, and services.`}),(0,I.jsx)(ku,{children:`Understand the professional backgrounds and interests of our community members.`}),(0,I.jsx)(ku,{children:`Improve our website, services, and community experience.`}),(0,I.jsx)(ku,{children:`Maintain the security and integrity of our services.`}),(0,I.jsx)(ku,{children:`Comply with applicable legal and regulatory obligations.`})]})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`4. Community Applications`}),(0,I.jsx)(Y,{children:`Information submitted through our application form is used to process your request to join the Regal Affluence community.`}),(0,I.jsx)(Y,{children:`Submission of an application does not automatically guarantee membership or access to every Regal Affluence activity, service, or opportunity.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`5. Information Sharing`}),(0,I.jsx)(Y,{children:`We do not sell your personal information.`}),(0,I.jsx)(Y,{children:`We may share information with trusted service providers where reasonably necessary to operate our website, process applications, communicate with users, or provide our services.`}),(0,I.jsx)(Y,{children:`We may also disclose information where required by law, legal process, or to protect the rights, property, security, or legitimate interests of Regal Affluence and others.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`6. Google Sheets and Third-Party Services`}),(0,I.jsx)(Y,{children:`Community application information is currently processed through third-party services used to receive and store application submissions.`}),(0,I.jsx)(Y,{children:`These services may process information according to their own privacy policies and terms. We encourage users to review the privacy practices of any third-party service they interact with through our website.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`7. WhatsApp Community`}),(0,I.jsx)(Y,{children:`After successfully submitting an application, users may be provided with access to the Regal Affluence WhatsApp community.`}),(0,I.jsx)(Y,{children:`WhatsApp is a third-party platform. Any information you provide or make visible through WhatsApp is subject to WhatsApp's own terms and privacy practices.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`8. Data Security`}),(0,I.jsx)(Y,{children:`We take reasonable steps to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.`}),(0,I.jsx)(Y,{children:`However, no method of transmitting or storing information electronically can be guaranteed to be completely secure.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`9. Data Retention`}),(0,I.jsx)(Y,{children:`We may retain personal information for as long as reasonably necessary to fulfil the purposes described in this Privacy Policy, maintain appropriate business records, resolve disputes, enforce agreements, or comply with applicable legal obligations.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`10. Your Privacy Rights`}),(0,I.jsx)(Y,{children:`Depending on applicable law, you may have rights relating to your personal information, including the right to request access to, correction of, or deletion of certain information we hold about you.`}),(0,I.jsx)(Y,{children:`You may contact us if you would like to make a privacy-related request.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`11. Children's Privacy`}),(0,I.jsx)(Y,{children:`Our services and community are intended for individuals who are legally able to participate in them. We do not knowingly collect personal information from children without appropriate authorization.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`12. Changes to This Policy`}),(0,I.jsx)(Y,{children:`We may update this Privacy Policy from time to time to reflect changes to our services, practices, or legal obligations.`}),(0,I.jsx)(Y,{children:`When changes are made, the updated version will be published on this page with a revised effective date.`})]}),(0,I.jsx)(Au,{}),(0,I.jsxs)(Eu,{children:[(0,I.jsx)(Du,{children:`13. Contact Us`}),(0,I.jsx)(Y,{children:`If you have questions, concerns, or requests regarding this Privacy Policy or the way we handle personal information, please contact Regal Affluence through our official communication channels.`}),(0,I.jsxs)(ju,{children:[(0,I.jsx)(Mu,{children:`Regal Affluence`}),(0,I.jsx)(Y,{children:`For privacy-related enquiries, please contact the Regal Affluence team through the official contact information provided on our website.`})]})]})]})]})}),Pu=M.section`
  width: 100%;

  padding: 150px 0 120px;

  background: ${({theme:e})=>e.colors.ivory};

  color: ${({theme:e})=>e.colors.text};

  @media (max-width: 768px) {
    padding: 120px 0 90px;
  }

  @media (max-width: 480px) {
    padding: 105px 0 72px;
  }
`,Fu=M.div`
  width: min(100% - 48px, 1100px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 32px, 1100px);
  }
`,Iu=M.header`
  max-width: 850px;

  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
`,Lu=M.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 24px;

  color: ${({theme:e})=>e.colors.purple};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background: ${({theme:e})=>e.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`,Ru=M.h1`
  max-width: 900px;

  font-family: ${({theme:e})=>e.fonts.display};

  font-size: clamp(4rem, 8vw, 7rem);

  font-weight: 500;

  line-height: 0.92;

  letter-spacing: -0.05em;

  color: ${({theme:e})=>e.colors.text};

  span {
    color: ${({theme:e})=>e.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(3.2rem, 15vw, 5.5rem);

    line-height: 0.96;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.9rem, 14vw, 4.2rem);
  }
`,zu=M.p`
  max-width: 760px;

  margin-top: 34px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 18px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 26px;

    font-size: 16px;

    line-height: 1.7;
  }
`,Bu=M.p`
  margin-top: 28px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;
`,Vu=M.div`
  max-width: 850px;
`,Hu=M.article`
  max-width: 800px;
`,Uu=M.h2`
  margin-bottom: 22px;

  color: ${({theme:e})=>e.colors.purpleDeep};

  font-family: ${({theme:e})=>e.fonts.display};

  font-size: clamp(1.7rem, 3vw, 2.35rem);

  font-weight: 600;

  line-height: 1.15;

  letter-spacing: -0.025em;
`,X=M.p`
  max-width: 780px;

  margin-top: 18px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 16px;

  line-height: 1.85;

  &:first-of-type {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.75;
  }
`,Wu=M.ul`
  margin: 22px 0 0;

  padding-left: 22px;
`,Z=M.li`
  margin-bottom: 12px;

  padding-left: 6px;

  color: ${({theme:e})=>e.colors.textMuted};

  font-size: 16px;

  line-height: 1.7;

  &::marker {
    color: ${({theme:e})=>e.colors.champagne};
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`,Gu=M.div`
  width: 100%;

  height: 1px;

  margin: 64px 0;

  background: ${({theme:e})=>e.colors.border};

  @media (max-width: 768px) {
    margin: 48px 0;
  }
`,Ku=M.div`
  margin-top: 30px;

  padding: 32px;

  border: 1px solid ${({theme:e})=>e.colors.border};

  border-radius: ${({theme:e})=>e.radius.lg};

  background: ${({theme:e})=>e.colors.white};

  @media (max-width: 768px) {
    padding: 24px;
  }
`,qu=M.h3`
  margin-bottom: 12px;

  color: ${({theme:e})=>e.colors.purpleDeep};

  font-family: ${({theme:e})=>e.fonts.display};

  font-size: 1.5rem;

  font-weight: 600;
`,Ju=()=>(0,I.jsx)(Pu,{children:(0,I.jsxs)(Fu,{children:[(0,I.jsxs)(Iu,{children:[(0,I.jsx)(Lu,{children:`Regal Affluence`}),(0,I.jsxs)(Ru,{children:[`Terms &`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`span`,{children:`Conditions.`})]}),(0,I.jsx)(zu,{children:`These Terms & Conditions govern your use of the Regal Affluence website, participation in our community, and interaction with our services.`}),(0,I.jsx)(Bu,{children:`Last updated: August 20, 2026`})]}),(0,I.jsxs)(Vu,{children:[(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`1. Acceptance of These Terms`}),(0,I.jsx)(X,{children:`By accessing or using the Regal Affluence website, submitting an application, joining our community, or interacting with our services, you agree to be bound by these Terms & Conditions.`}),(0,I.jsx)(X,{children:`If you do not agree with these terms, please do not use the website or participate in the Regal Affluence community.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`2. About Regal Affluence`}),(0,I.jsx)(X,{children:`Regal Affluence is a real estate-focused company and professional community built around relationships, opportunities, professional development, property, and long-term wealth creation.`}),(0,I.jsx)(X,{children:`Our activities may include community development, real estate services, property opportunities, professional networking, educational activities, advisory services, and related business activities.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`3. Use of the Website`}),(0,I.jsx)(X,{children:`You agree to use this website responsibly and only for lawful purposes.`}),(0,I.jsx)(X,{children:`You must not:`}),(0,I.jsxs)(Wu,{children:[(0,I.jsx)(Z,{children:`Use the website for fraudulent, unlawful, or malicious purposes.`}),(0,I.jsx)(Z,{children:`Attempt to gain unauthorized access to the website, its systems, or another user's information.`}),(0,I.jsx)(Z,{children:`Submit false, misleading, or intentionally inaccurate information.`}),(0,I.jsx)(Z,{children:`Interfere with the operation, security, or availability of the website.`}),(0,I.jsx)(Z,{children:`Copy, reproduce, distribute, or exploit website content without appropriate permission.`})]})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`4. Community Applications`}),(0,I.jsx)(X,{children:`Individuals may apply to join the Regal Affluence community by completing the application form provided on the website.`}),(0,I.jsx)(X,{children:`Applicants agree to provide information that is accurate, complete, and not misleading.`}),(0,I.jsx)(X,{children:`Submission of an application does not guarantee acceptance into the community. Regal Affluence reserves the right to review applications and determine eligibility for participation.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`5. Community Conduct`}),(0,I.jsx)(X,{children:`Members of the Regal Affluence community are expected to conduct themselves professionally, respectfully, and ethically.`}),(0,I.jsx)(X,{children:`Members must not use the community to:`}),(0,I.jsxs)(Wu,{children:[(0,I.jsx)(Z,{children:`Harass, threaten, intimidate, or abuse another member.`}),(0,I.jsx)(Z,{children:`Distribute fraudulent, deceptive, or misleading information.`}),(0,I.jsx)(Z,{children:`Engage in unlawful activities.`}),(0,I.jsx)(Z,{children:`Misrepresent Regal Affluence or claim unauthorized association with the organization.`}),(0,I.jsx)(Z,{children:`Spam members or use community access for inappropriate solicitation.`})]}),(0,I.jsx)(X,{children:`We reserve the right to restrict or terminate community access where a member violates these terms or conduct standards.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`6. Real Estate Information`}),(0,I.jsx)(X,{children:`Information presented on the Regal Affluence website or through our community may include information relating to real estate opportunities, properties, markets, investments, or other business activities.`}),(0,I.jsx)(X,{children:`Such information is provided for general informational purposes and should not automatically be interpreted as a guarantee of financial return, investment performance, appreciation, or profitability.`}),(0,I.jsx)(X,{children:`You should conduct your own research and obtain appropriate professional advice before making significant financial, property, or investment decisions.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`7. No Guarantee of Opportunities`}),(0,I.jsx)(X,{children:`Participation in the Regal Affluence community does not guarantee access to a particular property, investment, business opportunity, partnership, employment opportunity, client, transaction, or financial outcome.`}),(0,I.jsx)(X,{children:`Opportunities may depend on availability, eligibility, market conditions, third-party decisions, and other circumstances outside our control.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`8. Third-Party Services and Links`}),(0,I.jsx)(X,{children:`Our website or community may contain links to third-party websites, platforms, services, or resources.`}),(0,I.jsx)(X,{children:`These third-party services operate independently from Regal Affluence. We are not responsible for their content, availability, policies, security, or practices.`}),(0,I.jsx)(X,{children:`Your use of third-party platforms, including WhatsApp, is subject to the terms and policies of those respective platforms.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`9. Intellectual Property`}),(0,I.jsx)(X,{children:`Unless otherwise stated, content appearing on the Regal Affluence website, including text, branding, graphics, design elements, logos, and other materials, belongs to or is used by Regal Affluence and is protected by applicable intellectual property laws.`}),(0,I.jsx)(X,{children:`You may not reproduce, modify, distribute, publish, sell, or commercially exploit our content without appropriate authorization.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`10. User-Submitted Information`}),(0,I.jsx)(X,{children:`When you submit information through our website or community application, you confirm that you have the right to provide that information.`}),(0,I.jsx)(X,{children:`You remain responsible for the accuracy and appropriateness of information you submit.`}),(0,I.jsx)(X,{children:`Our handling of personal information is described in our Privacy Policy.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`11. Disclaimer`}),(0,I.jsx)(X,{children:`The website and its content are provided on an "as available" basis. While we make reasonable efforts to maintain accurate and useful information, we do not guarantee that all information will always be complete, current, accurate, or free from errors.`}),(0,I.jsx)(X,{children:`We do not guarantee uninterrupted or error-free operation of the website.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`12. Limitation of Liability`}),(0,I.jsx)(X,{children:`To the extent permitted by applicable law, Regal Affluence will not be responsible for losses or damages arising from your use of the website, participation in the community, reliance on informational content, or interaction with third-party services.`}),(0,I.jsx)(X,{children:`Nothing in these Terms is intended to exclude or limit liability that cannot lawfully be excluded or limited under applicable law.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`13. Suspension or Termination`}),(0,I.jsx)(X,{children:`We may suspend, restrict, or terminate access to the website or Regal Affluence community where we reasonably believe that a user has violated these Terms, applicable law, or community standards.`}),(0,I.jsx)(X,{children:`We may also modify, suspend, or discontinue parts of the website or community where reasonably necessary.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`14. Changes to These Terms`}),(0,I.jsx)(X,{children:`We may update these Terms & Conditions from time to time to reflect changes in our services, business practices, or legal requirements.`}),(0,I.jsx)(X,{children:`Updated terms will be published on this page together with a revised effective date.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`15. Governing Law`}),(0,I.jsx)(X,{children:`These Terms & Conditions shall be interpreted and applied in accordance with applicable laws and regulations governing Regal Affluence and its activities.`}),(0,I.jsx)(X,{children:`Any dispute arising in connection with these Terms should, where reasonably possible, first be addressed through good-faith communication between the parties.`})]}),(0,I.jsx)(Gu,{}),(0,I.jsxs)(Hu,{children:[(0,I.jsx)(Uu,{children:`16. Contact Us`}),(0,I.jsx)(X,{children:`If you have questions regarding these Terms & Conditions, please contact the Regal Affluence team through the official contact information provided on our website.`}),(0,I.jsxs)(Ku,{children:[(0,I.jsx)(qu,{children:`Regal Affluence`}),(0,I.jsx)(X,{children:`For enquiries concerning these Terms & Conditions, please contact the Regal Affluence team through our official communication channels.`})]})]})]})]})});function Yu(){return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsxs)(`main`,{children:[(0,I.jsx)(Eo,{}),(0,I.jsx)($o,{}),(0,I.jsx)(Cs,{})]}),(0,I.jsx)(hc,{})]})}function Xu(){return(0,I.jsxs)(In,{theme:Ga,children:[(0,I.jsx)(Wa,{}),(0,I.jsx)(Ma,{basename:`/regal-affluence-community`,children:(0,I.jsxs)(Ji,{children:[(0,I.jsx)(Ki,{path:`/`,element:(0,I.jsx)(Yu,{})}),(0,I.jsx)(Ki,{path:`/join`,element:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsx)(`main`,{children:(0,I.jsx)(V,{})})]})}),(0,I.jsx)(Ki,{path:`/benefits`,element:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsx)(`main`,{children:(0,I.jsx)(Al,{})}),(0,I.jsx)(hc,{})]})}),(0,I.jsx)(Ki,{path:`/how-it-works`,element:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsx)(`main`,{children:(0,I.jsx)(K,{})}),(0,I.jsx)(hc,{})]})}),(0,I.jsx)(Ki,{path:`/who-its-for`,element:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsx)(`main`,{children:(0,I.jsx)(ru,{})}),(0,I.jsx)(hc,{})]})}),(0,I.jsx)(Ki,{path:`/privacy`,element:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsx)(`main`,{children:(0,I.jsx)(Nu,{})}),(0,I.jsx)(hc,{})]})}),(0,I.jsx)(Ki,{path:`/terms`,element:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(oo,{}),(0,I.jsx)(`main`,{children:(0,I.jsx)(Ju,{})}),(0,I.jsx)(hc,{})]})})]})})]})}(0,Ke.createRoot)(document.getElementById(`root`)).render((0,I.jsx)(j.StrictMode,{children:(0,I.jsxs)(In,{theme:Ga,children:[(0,I.jsx)(Wa,{}),(0,I.jsx)(Xu,{})]})}));