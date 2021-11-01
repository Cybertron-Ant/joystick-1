var we=Object.create;var R=Object.defineProperty;var ve=Object.getOwnPropertyDescriptor;var be=Object.getOwnPropertyNames;var xe=Object.getPrototypeOf,Ce=Object.prototype.hasOwnProperty;var Se=t=>R(t,"__esModule",{value:!0});var je=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var _e=(t,e,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of be(e))!Ce.call(t,r)&&r!=="default"&&R(t,r,{get:()=>e[r],enumerable:!(n=ve(e,r))||n.enumerable});return t},ke=t=>_e(Se(R(t!=null?we(xe(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var V=je((T,I)=>{var P=[].slice;(function(t,e){return typeof define=="function"&&define.amd!=null?define([],e):typeof T!="undefined"&&T!==null?I.exports=e():t.UrlPattern=e()})(T,function(){var t,e,n,r,o,a,u,d,p,v,x,O,L,k,S;return p=function(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},u=function(s,i){var c,l,f;for(f=[],c=-1,l=s.length;++c<l;)f=f.concat(i(s[c]));return f},k=function(s,i){var c,l,f;for(f="",c=-1,l=s.length;++c<l;)f+=i(s[c]);return f},L=function(s){return new RegExp(s.toString()+"|").exec("").length-1},x=function(s,i){var c,l,f,h,m;for(h={},c=-1,f=s.length;++c<f;)l=s[c],m=i[c],m!=null&&(h[l]!=null?(Array.isArray(h[l])||(h[l]=[h[l]]),h[l].push(m)):h[l]=m);return h},t={},t.Result=function(s,i){this.value=s,this.rest=i},t.Tagged=function(s,i){this.tag=s,this.value=i},t.tag=function(s,i){return function(c){var l,f;if(l=i(c),l!=null)return f=new t.Tagged(s,l.value),new t.Result(f,l.rest)}},t.regex=function(s){return function(i){var c,l;if(c=s.exec(i),c!=null)return l=c[0],new t.Result(l,i.slice(l.length))}},t.sequence=function(){var s;return s=1<=arguments.length?P.call(arguments,0):[],function(i){var c,l,f,h,m,y;for(c=-1,l=s.length,y=[],h=i;++c<l;){if(f=s[c],m=f(h),m==null)return;y.push(m.value),h=m.rest}return new t.Result(y,h)}},t.pick=function(){var s,i;return s=arguments[0],i=2<=arguments.length?P.call(arguments,1):[],function(c){var l,f;if(f=t.sequence.apply(t,i)(c),f!=null)return l=f.value,f.value=l[s],f}},t.string=function(s){var i;return i=s.length,function(c){if(c.slice(0,i)===s)return new t.Result(s,c.slice(i))}},t.lazy=function(s){var i;return i=null,function(c){return i==null&&(i=s()),i(c)}},t.baseMany=function(s,i,c,l,f){var h,m,y,j;for(y=f,j=c?"":[];!(i!=null&&(h=i(y),h!=null)||(m=s(y),m==null));)c?j+=m.value:j.push(m.value),y=m.rest;if(!(l&&j.length===0))return new t.Result(j,y)},t.many1=function(s){return function(i){return t.baseMany(s,null,!1,!0,i)}},t.concatMany1Till=function(s,i){return function(c){return t.baseMany(s,i,!0,!0,c)}},t.firstChoice=function(){var s;return s=1<=arguments.length?P.call(arguments,0):[],function(i){var c,l,f,h;for(c=-1,l=s.length;++c<l;)if(f=s[c],h=f(i),h!=null)return h}},O=function(s){var i;return i={},i.wildcard=t.tag("wildcard",t.string(s.wildcardChar)),i.optional=t.tag("optional",t.pick(1,t.string(s.optionalSegmentStartChar),t.lazy(function(){return i.pattern}),t.string(s.optionalSegmentEndChar))),i.name=t.regex(new RegExp("^["+s.segmentNameCharset+"]+")),i.named=t.tag("named",t.pick(1,t.string(s.segmentNameStartChar),t.lazy(function(){return i.name}))),i.escapedChar=t.pick(1,t.string(s.escapeChar),t.regex(/^./)),i.static=t.tag("static",t.concatMany1Till(t.firstChoice(t.lazy(function(){return i.escapedChar}),t.regex(/^./)),t.firstChoice(t.string(s.segmentNameStartChar),t.string(s.optionalSegmentStartChar),t.string(s.optionalSegmentEndChar),i.wildcard))),i.token=t.lazy(function(){return t.firstChoice(i.wildcard,i.optional,i.named,i.static)}),i.pattern=t.many1(t.lazy(function(){return i.token})),i},d={escapeChar:"\\",segmentNameStartChar:":",segmentValueCharset:"a-zA-Z0-9-_~ %",segmentNameCharset:"a-zA-Z0-9",optionalSegmentStartChar:"(",optionalSegmentEndChar:")",wildcardChar:"*"},a=function(s,i){if(Array.isArray(s))return k(s,function(c){return a(c,i)});switch(s.tag){case"wildcard":return"(.*?)";case"named":return"(["+i+"]+)";case"static":return p(s.value);case"optional":return"(?:"+a(s.value,i)+")?"}},o=function(s,i){return i==null&&(i=d.segmentValueCharset),"^"+a(s,i)+"$"},r=function(s){if(Array.isArray(s))return u(s,r);switch(s.tag){case"wildcard":return["_"];case"named":return[s.value];case"static":return[];case"optional":return r(s.value)}},v=function(s,i,c,l){var f,h,m,y;if(l==null&&(l=!1),y=s[i],y==null){if(l)throw new Error("no values provided for key `"+i+"`");return}if(f=c[i]||0,h=Array.isArray(y)?y.length-1:0,f>h){if(l)throw new Error("too few values provided for key `"+i+"`");return}return m=Array.isArray(y)?y[f]:y,l&&(c[i]=f+1),m},n=function(s,i,c){var l,f;if(Array.isArray(s)){for(l=-1,f=s.length;++l<f;)if(n(s[l],i,c))return!0;return!1}switch(s.tag){case"wildcard":return v(i,"_",c,!1)!=null;case"named":return v(i,s.value,c,!1)!=null;case"static":return!1;case"optional":return n(s.value,i,c)}},S=function(s,i,c){if(Array.isArray(s))return k(s,function(l){return S(l,i,c)});switch(s.tag){case"wildcard":return v(i,"_",c,!0);case"named":return v(i,s.value,c,!0);case"static":return s.value;case"optional":return n(s.value,i,c)?S(s.value,i,c):""}},e=function(s,i){var c,l,f,h,m;if(s instanceof e){this.isRegex=s.isRegex,this.regex=s.regex,this.ast=s.ast,this.names=s.names;return}if(this.isRegex=s instanceof RegExp,!(typeof s=="string"||this.isRegex))throw new TypeError("argument must be a regex or a string");if(this.isRegex){if(this.regex=s,i!=null){if(!Array.isArray(i))throw new Error("if first argument is a regex the second argument may be an array of group names but you provided something else");if(c=L(this.regex),i.length!==c)throw new Error("regex contains "+c+" groups but array of group names contains "+i.length);this.names=i}return}if(s==="")throw new Error("argument must not be the empty string");if(m=s.replace(/\s+/g,""),m!==s)throw new Error("argument must not contain whitespace");if(l={escapeChar:(i!=null?i.escapeChar:void 0)||d.escapeChar,segmentNameStartChar:(i!=null?i.segmentNameStartChar:void 0)||d.segmentNameStartChar,segmentNameCharset:(i!=null?i.segmentNameCharset:void 0)||d.segmentNameCharset,segmentValueCharset:(i!=null?i.segmentValueCharset:void 0)||d.segmentValueCharset,optionalSegmentStartChar:(i!=null?i.optionalSegmentStartChar:void 0)||d.optionalSegmentStartChar,optionalSegmentEndChar:(i!=null?i.optionalSegmentEndChar:void 0)||d.optionalSegmentEndChar,wildcardChar:(i!=null?i.wildcardChar:void 0)||d.wildcardChar},h=O(l),f=h.pattern(s),f==null)throw new Error("couldn't parse pattern");if(f.rest!=="")throw new Error("could only partially parse pattern");this.ast=f.value,this.regex=new RegExp(o(this.ast,l.segmentValueCharset)),this.names=r(this.ast)},e.prototype.match=function(s){var i,c;return c=this.regex.exec(s),c==null?null:(i=c.slice(1),this.names?x(this.names,i):i)},e.prototype.stringify=function(s){if(s==null&&(s={}),this.isRegex)throw new Error("can't stringify patterns generated from a regex");if(s!==Object(s))throw new Error("argument must be an object or undefined");return S(this.ast,s,{})},e.escapeForRegex=p,e.concatMap=u,e.stringConcatMap=k,e.regexGroupCount=L,e.keysAndValuesToObject=x,e.P=t,e.newParser=O,e.defaultOptions=d,e.astNodeToRegexString=o,e.astNodeToNames=r,e.getParam=v,e.astNodeContainsSegmentsForProvidedParams=n,e.stringify=S,e})});var z=ke(V());var g=(t="")=>{throw new Error(`[joystick] ${t}`)};var $={events:["readystatechange","pointerlockchange","pointerlockerror","beforecopy","beforecut","beforepaste","freeze","resume","search","securitypolicyviolation","visibilitychange","fullscreenchange","fullscreenerror","webkitfullscreenchange","webkitfullscreenerror","beforexrselect","abort","blur","cancel","canplay","canplaythrough","change","click","close","contextmenu","cuechange","dblclick","drag","dragend","dragenter","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","error","focus","formdata","input","invalid","keydown","keypress","keyup","load","loadeddata","loadedmetadata","loadstart","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","pause","play","playing","progress","ratechange","reset","resize","scroll","seeked","seeking","select","stalled","submit","suspend","timeupdate","toggle","volumechange","waiting","webkitanimationend","webkitanimationiteration","webkitanimationstart","webkittransitionend","wheel","auxclick","gotpointercapture","lostpointercapture","pointerdown","pointermove","pointerup","pointercancel","pointerover","pointerout","pointerenter","pointerleave","selectstart","selectionchange","animationend","animationiteration","animationstart","transitionrun","transitionstart","transitionend","transitioncancel","copy","cut","paste","pointerrawupdate"],lifecycle:["onBeforeMount","onMount","onBeforeUnmount"],options:["name","props","state","lifecycle","methods","events","css","render"]},B={options:["render"]},Te={name:t=>{typeof t!="string"&&g("options.name must be a string.")},lifecycle:t=>{t instanceof Object||g("options.lifecycle must be an object.");for(let[e,n]of Object.entries(t))$.lifecycle.includes(e)||g(`options.lifecycle.${e} is not supported.`),typeof n!="function"&&g(`options.lifecycle.${e} must be assigned a function.`)},methods:t=>{t instanceof Object||g("options.methods must be an object.");for(let[e,n]of Object.entries(t))typeof n!="function"&&g(`options.methods.${e} must be assigned a function.`)},events:t=>{t instanceof Object||g("options.events must be an object.");for(let e of Object.keys(t)){let[n]=e.split(" ");$.events.includes(n)||g(`${n} is not a supported JavaScript event type.`)}for(let[e,n]of Object.entries(t))typeof n!="function"&&g(`options.events.${e} must be assigned a function.`)},css:t=>{typeof t!="string"&&typeof t!="function"&&g("options.css must be a string or function returning a string.")},render:t=>{typeof t!="function"&&g("options.render must be a function returning a string.")}},H=(t={})=>{B.options.every(e=>Object.keys(t).includes(e))||g(`component options must include ${B.options.join(",")}.`);for(let[e,n]of Object.entries(t)){$.options.includes(e)||g(`${e} is not supported by joystick.component.`);let r=Te[e];r&&typeof r=="function"&&r(n)}};var F=(t={})=>Object.entries(t).map(([e,n])=>{let[r,o]=e.split(" ");return{type:r.toLowerCase(),selector:o,handler:n}});var M=(t="")=>{let e=[],n=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];for(let r=0;r<t;r++)e.push(n[Math.floor(Math.random()*16)]);return e.join("")};var D=({joystickInstance:t,id:e,parentId:n,element:r,eventType:o,eventListener:a})=>{r||g("Must pass an element to addEventListener."),o||g("Must pass an eventType to addEventListener."),a||g("Must pass an eventListener to addEventListener."),r.addEventListener(o,a),t._internal.eventListeners.attached.push({id:e,eventId:M(8),parentId:n,element:r,eventType:o,eventListener:a})};var A=(t=[])=>{for(let e of t)e.element&&e.eventType&&e.eventListener&&e.element.removeEventListener(e.eventType,e.eventListener)};var Me=(t={})=>Object.entries(t).reduce((e={},[n,r])=>(e[r.name]=r.value,e),{}),G=(t=null)=>{if(t){let e=t.tagName&&t.tagName.toLowerCase()||"text",n={tagName:e,attributes:Me(t.attributes),children:[].map.call(t.childNodes,r=>G(r))};return e==="text"&&(n=t.textContent),n}},J=G;var Ae=(t="",e="")=>{if(t&&typeof t=="string"){let n=document.createElement("div");return n.setAttribute("js-c",e),n.innerHTML=t,n}return null},K=Ae;var Ee=({tagName:t,attributes:e,children:n})=>{let r=document.createElement(t);for(let[o,a]of Object.entries(e))r.setAttribute(o,a);for(let o of n){let a=U(o);r.appendChild(a)}return r},U=t=>typeof t=="string"?document.createTextNode(t):Ee(t),C=U;var Oe=(t,e)=>{let n=[];for(let r=0;r<Math.max(t.length,e.length);r++)n.push([t[r],e[r]]);return n},Le=(t,e)=>{let n=[];for(let[r,o]of Object.entries(e))n.push(a=>(a&&a.setAttribute(r,o),a));for(let r in t)r in e||n.push(o=>(o&&o.removeAttribute(r),o));return r=>{for(let o of n)o&&typeof o=="function"&&o(r)}},Re=(t,e)=>{let n=[];t.forEach((o,a)=>{n.push(W(o,e[a]))});let r=[];for(let o of e.slice(t.length))r.push(a=>(a.appendChild(C(o)),a));return o=>{if(o){for(let[a,u]of Oe(n,o.childNodes))a&&typeof a=="function"&&a(u);for(let a of r)a&&typeof a=="function"&&a(o)}return o}},W=(t,e)=>{if(e===void 0)return o=>{o.remove()};if(typeof t=="string"||typeof e=="string")return t!==e?o=>{let a=C(e);return o.replaceWith(a),a}:o=>{};if(t.tagName!==e.tagName)return o=>{let a=C(e);return o.replaceWith(a),a};let n=Le(t.attributes,e.attributes),r=Re(t.children,e.children);return o=>(n(o),r(o),o)},X=W;var Y=(t,e)=>e?(e.innerHTML="",e.appendChild(t),t):null;var Pe=()=>{let t=document.querySelector("style[js-css-ssr]"),e=document.querySelectorAll("style[js-css]");t&&t.parentNode.removeChild(t),e&&[].forEach.call(e,n=>{n.parentNode.removeChild(n)})},Z=(t,e={},n)=>{let r=t(e);w._internal.tree={id:r.id,instance:r,children:[]},w.mountedInstance=!0,typeof window!="undefined"&&(window.__joystick__=w,window.__joystick__.utils={removeEventListeners:A}),r.handleSetProps(e),r.handleOnBeforeMount(),Pe();let o=r.render({mounting:!0});return w._internal.lifecycle.onBeforeMount.process(),Y(o,n),r.handleAttachCSS(),r.handleAttachEvents(),w._internal.eventListeners.queue.process(),r.handleOnMount(),w._internal.lifecycle.onMount.process(),r};var Q=class{constructor(e=[]){this.array=[...e],this.array.push=function(){Array.prototype.push.apply(this,arguments)}}async process(){if(this.array.length>0){let e=this.array.shift();e&&e.callback&&(await e.callback(),this.process())}}},E=Q;var N=(t="",e={})=>{if(fetch)return new Promise((n,r)=>{let o=JSON.stringify(e.input||{}),a=JSON.stringify(e.output||{}),u={method:"GET",mode:"cors",credentials:"include"};e?.headers&&(u.headers=e?.headers),fetch(`${window.location.origin}/api/_getters/${t}?input=${o}&output=${a}`,u).then(async d=>{let p=await d.json();return p&&p.errors?(console.log("%c\u274C get request failed with the following errors:",'background-color: #ffcc00; padding: 7px; font-family: "inherit"; font-size: 11px; line-height: 10px; color: #000;'),p.errors.forEach(v=>{console.log(v.message),v.stack&&console.log(v.stack)}),r(p)):(n(p),p)}).catch(d=>(console.log("%c\u274C get request failed with the following network error:",'background-color: #ffcc00; padding: 7px; font-family: "inherit"; font-size: 11px; line-height: 10px; color: #000;'),console.log(d),r(d),d))})};var ee=(t="",e={})=>{if(fetch)return new Promise((n,r)=>fetch(`${window.location.origin}/api/_setters/${t}`,{method:"POST",mode:"cors",headers:{...e?.headers||{},"Content-Type":"application/json"},body:JSON.stringify(e),credentials:"include"}).then(async o=>{let a=await o.json();return a&&a.errors?(console.log("%c\u274C set request failed with the following errors:",'background-color: #ffcc00; padding: 7px; font-family: "inherit"; font-size: 11px; line-height: 10px; color: #000;'),a.errors.forEach(u=>{console.log(u.message),u.stack&&console.log(u.stack)}),r(a)):(n(a),a)}).catch(o=>(console.log("%c\u274C set request failed with the following network error:",'background-color: #ffcc00; padding: 7px; font-family: "inherit"; font-size: 11px; line-height: 10px; color: #000;'),console.log(o),r(o),o)))};var _={get:N,set:ee};var b=(t="",e={})=>{if(fetch)return new Promise((n,r)=>{let o={signup:"signup",login:"login",logout:"logout",recoverPassword:"recover-password",resetPassword:"reset-password"}[t];return fetch(`${window.location.origin}/api/_accounts/${o}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e,origin:window?.location?.origin}),credentials:"include"}).then(async a=>{let u=await a.json();return u&&u.errors?(console.log(`%c\u274C accounts.${t} request failed with the following errors:`,'background-color: #ffcc00; padding: 7px; font-family: "inherit"; font-size: 11px; line-height: 10px; color: #000;'),u.errors.forEach(d=>{console.log(d.message),d.stack&&console.log(d.stack)}),r(u)):(n(u),u)}).catch(a=>(console.log(`%c\u274C accounts.${t} request failed with the following network error:`,'background-color: #ffcc00; padding: 7px; font-family: "inherit"; font-size: 11px; line-height: 10px; color: #000;'),console.log(a),r(a),a))})};var te=(t={})=>b("signup",t);var ne=(t={})=>b("login",t);var re=()=>b("logout");var oe=(t={})=>b("recoverPassword",t);var ie=(t={})=>b("resetPassword",t);var se={signup:te,login:ne,logout:re,recoverPassword:oe,resetPassword:ie};var q={_internal:{eventListeners:{attached:[],queue:new E([])},timers:[],lifecycle:{onBeforeMount:new E([]),onMount:new E([])},tree:{}},component:ae,mount:Z,get:_.get,set:_.set,accounts:se};typeof window!="undefined"&&(window.joystick=window.joystick?{...window.joystick,settings:window.__joystick_settings__}:{settings:window.__joystick_settings__});if(typeof window!="undefined"){let t=window.setTimeout,e=window.setInterval;window.setTimeout._tainted||(window.setTimeout=(n=null,r=null)=>{if(n&&r>=0){let o=t(n,r);return q._internal.timers.push({type:"timeout",id:o}),o}},window.setTimeout._tainted=!0),window.setInterval._tainted||(window.setInterval=(n=null,r=null)=>{if(n&&r>=0){let o=e(n,r);return q._internal.timers.push({type:"interval",id:o}),o}},window.setInterval._tainted=!0)}var Ot=_.get,Lt=_.set;var w=q;var $e=t=>!!(t&&typeof t=="object"&&!Array.isArray(t)),ce=(t={},e="",n={})=>{let r=t&&t.id;if($e(t)&&r){let o=Object.entries(t);for(let a=0;a<o.length;a+=1){let[u,d]=o[a];if(u==="id"&&d===e)return t;if(u==="children"&&Array.isArray(d))for(let p=0;p<d.length;p+=1){let v=d[p],x=ce(v,e,n);if(x!==null)return x}}}return null},le=ce;var qe=()=>typeof window!="undefined"?w&&w.mountedInstance?w:window.__joystick__:w,ue=function(e,n){try{let r=qe(),o=e(n,this.url,this.translations);e.instance&&(o.id=e.instance.id),o.parent=this,o.options&&o.options.lifecycle&&(o.options.lifecycle.onBeforeMount&&r._internal.lifecycle.onBeforeMount.array.push({callback:()=>{o.options.lifecycle.onBeforeMount(o)}}),o.options.lifecycle.onMount&&r._internal.lifecycle.onMount.array.push({callback:()=>{o.options.lifecycle.onMount(o)}}));let a=le(o.parent.ssrTree||r._internal.tree,o.parent.id);if(a&&a.children&&a.children.push({id:o.id,instance:o,children:[]}),o.parent&&o.parent.ssrTree)return o.renderToHTML(o.parent.ssrTree).wrapped;let u=o.renderToDOM({includeActual:!0}),d=o.renderToHTML();return o.dom=u,o.handleAttachCSS(),o.handleAttachEvents(o.parent),e.instance=o,d.wrapped}catch(r){console.log(r)}},fe=function(e,n){return e.map(r=>n(r)).join(`
`)},de=function(e="",n={}){let r=typeof window!="undefined"?window.__joystick_i18n__:this.translations;return r&&r[e]?Object.entries(n).length>0?Object.entries(n).reduce((o,[a,u])=>o.replace(`{{${a}}}`,u),r[e]):r[e]:""},he=function(e=!1,n=""){return e?n:""},pe={c:ue,component:ue,e:fe,each:fe,i:de,i18n:de,w:he,when:he};var me=new RegExp(/\<\!\-\-(?:.|\n|\r)*?-->/g);var ge=class{constructor(e={},n={},r=null){H(e),this.id=M(8),this.dom={virtual:{},actual:{}},this.options=e||{},this.name="",this.props=e.props||{},this.state={},this.lifecycle={onBeforeMount:()=>null,onMount:()=>null,onBeforeUnmount:()=>null},this.methods={},this.events={},this.css="",this.children=[],this.translations=r,this.handleAttachOptionsToInstance(),typeof window=="undefined"&&(this.url={...n,isActive:o=>n.route!=="*"?!!new z.default(n.route).match(o):!1}),typeof window!="undefined"&&window.__joystick_url__&&(this.url={...window.__joystick_url__,isActive:o=>n.route!=="*"?!!new z.default(window.__joystick_url__.route).match(o):!1})}handleGetJoystickInstance(){return typeof window!="undefined"?w&&w.mountedInstance?w:window.__joystick__:w}handleSetProps(e){this.props=e}handleAttachOptionsToInstance(){this.handleAttachState(this.options?.state),this.handleAttachLifecycleMethods(this.options?.lifecycle),this.handleAttachMethods(this.options?.methods)}handleAttachState(e={}){if(typeof e=="function"){let n=e(this);if(n&&typeof n=="object"&&!Array.isArray(n)){this.state=Object.assign({},n);return}}this.state=Object.assign({},e)}handleAttachLifecycleMethods(e={}){this.lifecycle=Object.entries(e).reduce((n={},[r,o])=>(n[r]=()=>o(this),n),{})}handleAttachMethods(e={}){this.methods=Object.entries(e).reduce((n={},[r,o])=>(n[r]=(...a)=>o(...a,this),n),{})}handleAttachEvents(e=null){let n=F(this.options?.events),r=this;if(this.lifecycle&&this.lifecycle.onBeforeUnmount&&typeof this.lifecycle.onBeforeUnmount=="function"){let a=function(){r.lifecycle.onBeforeUnmount(r)};window.removeEventListener("beforeunload",a),window.addEventListener("beforeunload",a)}let o=this.handleGetJoystickInstance();n.forEach(a=>{o._internal.eventListeners.queue.array.push({callback:()=>{let u=document.querySelector(`[js-c="${this.id}"] ${a.selector}`);u&&D({joystickInstance:o,id:this.id,parentId:e?.id,element:u,eventType:a.type,eventListener:function(p){Object.defineProperty(p,"target",{value:p.composedPath()[0]}),a.handler(p,r)}})}})})}handleDetachEvents(){let e=this.handleGetJoystickInstance(),n=e._internal.eventListeners.attached.filter(({id:o,parentId:a})=>o===this.id||a===this.id),r=n.map(({eventId:o})=>o);A(n),e._internal.eventListeners.attached=e._internal.eventListeners.attached.filter(({eventId:o})=>!r.includes(o))}handleAttachCSS(){let e=this.handleCompileCSS();if(e){let n=btoa(e.trim()).substring(0,8),r=document.head.querySelector(`[js-c-id="${this.id}"]`),o=document.head.querySelector(`[js-css="${n}"]`);if(r&&!o&&document.head.removeChild(r),!o){let u=document.createElement("style");u.innerHTML=this.handlePrefixCSS(this.options.css,this.id),u.setAttribute("js-c-id",this.id),u.setAttribute("js-css",n),document.head.appendChild(u)}}}handleCompileCSS(){return this.options?.css&&typeof this.options?.css=="string"?this.options.css:this.options?.css&&typeof this.options?.css=="function"?this.options.css(this):""}handlePrefixCSS(e="",n=""){let r=this.handleGetCSSRules(e);return Object.entries(r).map(([u,d])=>d).map(u=>{if(u.type===1)return`[js-c="${n}"] ${u.cssText}`;if(u.type===4)return`
          @media ${u.conditionText} {
            ${Object.entries(u.cssRules).map(([d,p])=>`[js-c="${n}"] ${p.cssText}`).join(`
`)}
          }
        `}).join(`
`)}handleGetCSSRules(e=""){let n=document.implementation.createHTMLDocument(""),r=document.createElement("style");return r.textContent=e,n.body.appendChild(r),r.sheet.cssRules}handleOnBeforeMount(){this.options.lifecycle&&this.options.lifecycle.onBeforeMount&&this.options.lifecycle.onBeforeMount(this)}handleOnMount(){this.options.lifecycle&&this.options.lifecycle.onMount&&this.options.lifecycle.onMount(this)}handleWrapHTMLForRender(e=""){return`<div js-c="${this.id}">${e}</div>`}getDOMNodeToPatch=(e={})=>e?document.querySelector(`[js-c="${e?.attributes["js-c"]}"]`):null;render(e={}){if(e&&e.mounting){let o=this.renderToDOM({includeActual:!0});return this.dom=o,o.actual}let n=this.renderToDOM({includeActual:!0}),r=X(this.dom.virtual,n.virtual);r&&typeof r=="function"&&(this.handleDetachEvents(),this.dom.actual=r(this.getDOMNodeToPatch(this.dom.virtual)),this.dom.virtual=n.virtual,this.handleAttachCSS(),this.handleAttachEvents(),this.handleGetJoystickInstance()._internal.eventListeners.queue.process())}handleSanitizeHTML(e=""){let n=`${e}`;return(n.match(me)||[]).forEach(o=>{n=n.replace(o,"")}),n}handleGetSanitizedThis(){let e=this,n=typeof e.state=="function"?e.state(this):e.state;return e.state=n,e}renderToHTML(e=null,n=null){let r=this.handleGetSanitizedThis(),o=this.options.render({...r,...Object.entries(pe).reduce((d,[p,v])=>(d[p]=v.bind({...r,ssrTree:e,translations:n||this.translations||{}}),d),{})}),a=this.handleSanitizeHTML(o),u=this.handleWrapHTMLForRender(a);return{unwrapped:a,wrapped:u}}renderToDOM(e={}){let n=this.renderToHTML(),r=J(K(n.unwrapped,this.id)),o=e.includeActual?C(r):null;return{virtual:r,actual:o}}setState(e={},n=null){this.state=Object.assign(this.state,e),this.render(),n&&typeof n=="function"&&n()}},ye=ge;var ae=(t={})=>(e,n={},r={})=>new ye({...t,props:e},n,r);export{ae as default};
