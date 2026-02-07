const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${i}--\x3e`,n=new RegExp(`${i}|${o}`),r="$lit$";class s{constructor(e,t){this.parts=[],this.element=t;const o=[],s=[],l=document.createTreeWalker(t.content,133,null,!1);let u=0,h=-1,p=0;const{strings:m,values:{length:g}}=e;for(;p<g;){const e=l.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let o=0;for(let e=0;e<i;e++)a(t[e].name,r)&&o++;for(;o-- >0;){const t=m[p],i=c.exec(t)[2],o=i.toLowerCase()+r,s=e.getAttribute(o);e.removeAttribute(o);const a=s.split(n);this.parts.push({type:"attribute",index:h,name:i,strings:a}),p+=a.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,s=t.split(n),l=s.length-1;for(let t=0;t<l;t++){let o,n=s[t];if(""===n)o=d();else{const e=c.exec(n);null!==e&&a(e[2],r)&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),o=document.createTextNode(n)}i.insertBefore(o,e),this.parts.push({type:"node",index:++h})}""===s[l]?(i.insertBefore(d(),e),o.push(e)):e.data=s[l],p+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&h!==u||(h++,t.insertBefore(d(),e)),u=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(o.push(e),h--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),p++}}else l.currentNode=s.pop()}for(const e of o)e.parentNode.removeChild(e)}}const a=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:i},parts:o}=e,n=document.createTreeWalker(i,133,null,!1);let r=p(o),s=o[r],a=-1,l=0;const d=[];let c=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==s&&s.index===a;)s.index=null!==c?-1:s.index-l,r=p(o,r),s=o[r]}d.forEach(e=>e.parentNode.removeChild(e))}const h=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},p=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1};const m=new WeakMap,g=e=>"function"==typeof e&&m.has(e),b={},f={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],o=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,s=0,a=0,d=n.nextNode();for(;s<o.length;)if(r=o[s],l(r)){for(;a<r.index;)a++,"TEMPLATE"===d.nodeName&&(i.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=i.pop(),d=n.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,r.name,r.strings,this.options));s++}else this.__parts.push(void 0),s++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${i} `;class _{constructor(e,t,i,o){this.strings=e,this.values=t,this.type=i,this.processor=o}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],a=e.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===e.indexOf("--\x3e",a+1);const l=c.exec(e);t+=null===l?e+(n?w:o):e.substr(0,l.index)+l[1]+l[2]+r+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const x=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class M{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!S(e))return e}let o="";for(let n=0;n<t;n++){o+=e[n];const t=i[n];if(void 0!==t){const e=t.value;if(x(e)||!S(e))o+="string"==typeof e?e:String(e);else for(const t of e)o+="string"==typeof t?t:String(t)}}return o+=e[t],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===b||x(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=b,e(this)}this.value!==b&&this.committer.commit()}}class ${constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}const e=this.__pendingValue;e!==b&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof _?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),o=i._clone();i.update(e.values),this.__commitNode(o),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,o=0;for(const n of e)i=t[o],void 0===i&&(i=new $(this.options),t.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(t[o-1])),i.setValue(n),i.commit(),o++;o<t.length&&(t.length=o,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}if(this.__pendingValue===b)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=b}}class T extends M{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends C{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class P{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}if(this.__pendingValue===b)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=R(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=b}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const R=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function q(e){let t=N.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},N.set(e.type,t));let o=t.stringsArray.get(e.strings);if(void 0!==o)return o;const n=e.strings.join(i);return o=t.keyString.get(n),void 0===o&&(o=new s(e,e.getTemplateElement()),t.keyString.set(n,o)),t.stringsArray.set(e.strings,o),o}const N=new Map,I=new WeakMap;const z=new class{handleAttributeExpressions(e,t,i,o){const n=t[0];if("."===n){return new T(e,t.slice(1),i).parts}if("@"===n)return[new P(e,t.slice(1),o.eventContext)];if("?"===n)return[new k(e,t.slice(1),i)];return new M(e,t,i).parts}handleTextExpression(e){return new $(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const O=(e,...t)=>new _(e,t,"html",z),H=(e,t)=>`${e}--${t}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const L=e=>t=>{const o=H(t.type,e);let n=N.get(o);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},N.set(o,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const a=t.strings.join(i);if(r=n.keyString.get(a),void 0===r){const i=t.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(i,e),r=new s(t,i),n.keyString.set(a,r)}return n.stringsArray.set(t.strings,r),r},V=["html","svg"],D=new Set,U=(e,t,i)=>{D.add(e);const o=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(o,e);const s=document.createElement("style");for(let e=0;e<r;e++){const t=n[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}(e=>{V.forEach(t=>{const i=N.get(H(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),u(e,i)})})})(e);const a=o.content;i?function(e,t,i=null){const{element:{content:o},parts:n}=e;if(null==i)return void o.appendChild(t);const r=document.createTreeWalker(o,133,null,!1);let s=p(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=h(t),i.parentNode.insertBefore(t,i));-1!==s&&n[s].index===l;){if(a>0){for(;-1!==s;)n[s].index+=a,s=p(n,s);return}s=p(n,s)}}(i,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(s,a.firstChild);const e=new Set;e.add(s),u(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const B={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},W=(e,t)=>t!==e&&(t==t||e==e),j={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:W},X="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const o=this._attributeNameForProperty(i,t);void 0!==o&&(this._attributeToPropertyMap.set(o,i),e.push(o))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=j){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const n=this[e];this[t]=o,this.requestUpdateInternal(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||j}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(X)||e.finalize(),this[X]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=W){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,o=t.converter||B,n="function"==typeof o?o:o.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,o=t.converter;return(o&&o.toAttribute||B.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=j){const o=this.constructor,n=o._attributeNameForProperty(e,i);if(void 0!==n){const e=o._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(e);if(void 0!==o){const e=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let o=!0;if(void 0!==e){const n=this.constructor;i=i||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J[X]=!0;const Z=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol();class K{constructor(e,t){if(t!==Y)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Z?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const G=(e,...t)=>{const i=t.reduce((t,i,o)=>t+(e=>{if(e instanceof K)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[o+1],e[0]);return new K(i,Y)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Q={};class ee extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),o=[];i.forEach(e=>o.unshift(e)),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Z){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new K(String(t),Y)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Z?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Q&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return Q}}function te(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}function ie(e){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(e):void 0}function oe(e,t,i=null){if((e=new Event(e,{bubbles:!0,cancelable:!1,composed:!0})).detail=t||{},i)i.dispatchEvent(e);else{var o=function(){var e=document.querySelector("hc-main");return e?(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("hc-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-view")||e.querySelector("hui-panel-view"):(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=document.querySelector("home-assistant"))&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))&&e.shadowRoot)&&e.querySelector("ha-app-layout"))&&e.querySelector("#view"))&&e.firstElementChild}();o&&o.dispatchEvent(e)}}async function ne(e,t,i=!1){let o=e;"string"==typeof t&&(t=t.split(/(\$| )/)),""===t[t.length-1]&&t.pop();for(const[e,n]of t.entries())if(n.trim().length){if(!o)return null;o.localName&&o.localName.includes("-")&&await customElements.whenDefined(o.localName),o.updateComplete&&await o.updateComplete,o="$"===n?i&&e==t.length-1?[o.shadowRoot]:o.shadowRoot:i&&e==t.length-1?o.querySelectorAll(n):o.querySelector(n)}return o}async function re(e,t=!1){const i=document.querySelector("hc-main")||document.querySelector("home-assistant");oe("hass-more-info",{entityId:e},i);const o=await async function(e,t,i=!1,o=1e4){return Promise.race([ne(e,t,i),new Promise((e,t)=>setTimeout(()=>t(new Error("timeout")),o))]).catch(e=>{if(!e.message||"timeout"!==e.message)throw e;return null})}(i,"$ ha-more-info-dialog");return o&&(o.large=t),o}ee.finalized=!0,ee.render=(e,i,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const n=o.scopeName,r=I.has(i),s=F&&11===i.nodeType&&!!i.host,a=s&&!D.has(n),l=a?document.createDocumentFragment():i;if(((e,i,o)=>{let n=I.get(i);void 0===n&&(t(i,i.firstChild),I.set(i,n=new $(Object.assign({templateFactory:q},o))),n.appendInto(i)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:L(n)},o)),a){const e=I.get(l);I.delete(l);const o=e.value instanceof v?e.value.template:void 0;U(n,l,o),t(i,i.firstChild),i.appendChild(l),I.set(i,e)}!r&&s&&window.ShadyCSS.styleElement(i.host)},ee.shadowRootOptions={mode:"open"};const se="lovelace-player-device-id";function ae(){if(!localStorage[se]){const e=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[se]=fully.getDeviceId():localStorage[se]=`${e()}${e()}-${e()}${e()}`}return localStorage[se]}let le=ae();const de=new URLSearchParams(window.location.search);var ce,ue,he,pe;de.get("deviceID")&&null!==(ce=de.get("deviceID"))&&("clear"===ce?localStorage.removeItem(se):localStorage[se]=ce,le=ae()),(pe=ue||(ue={})).language="language",pe.system="system",pe.comma_decimal="comma_decimal",pe.decimal_comma="decimal_comma",pe.space_comma="space_comma",pe.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(he||(he={}));var me=["closed","locked","off"],ge=function(e,t,i,o){o=o||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n},be=function(e){ge(window,"haptic",e)},fe=function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),ge(window,"location-changed",{replace:i})},ve=function(e,t){return function(e,t,i){void 0===i&&(i=!0);var o,n=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===n?"homeassistant":n;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}return e.callService(r,o,{entity_id:t})}(e,t,me.includes(e.states[t].state))};const ye="SIDEBAR-CARD",we=new Map;let _e=null;function xe(e,t){const i=we.get(e),o=Date.now();if(i&&o-i.timestamp<1e4&&document.contains(i.element))return i.element;const n=t();return n?we.set(e,{element:n,timestamp:o}):we.delete(e),n}function Se(){const e=Date.now();if(_e&&e-_e.timestamp<5e3)return _e.root;const t=function(e){const t=[],i=new WeakSet;for(e?t.push(e):t.push(document.body);t.length;){const e=t.pop();if(!e||i.has(e))continue;i.add(e);let o=null;if(e instanceof ShadowRoot)o=e;else if(e instanceof HTMLElement&&e.shadowRoot)o=e.shadowRoot;else{if(!(e instanceof HTMLElement||e instanceof DocumentFragment))continue;o=e}const n=o.querySelector("hui-root");if(null==n?void 0:n.shadowRoot)return n.shadowRoot;const r=o.querySelectorAll("*"),s=Math.min(r.length,50);for(let e=0;e<s;e++){const i=r[e];t.push(i),i.shadowRoot&&t.push(i.shadowRoot)}}return null}(document.querySelector("home-assistant"));return _e={root:t,timestamp:e},t}function Me(){const e=Se();return e?e.host:null}function Ce(){const e=Me();if(e&&e.lovelace){const t=e.lovelace;return t.current_view=e.___curView,t}return null}function $e(e){return new Promise(t=>setTimeout(t,e))}async function ke(){let e;for(;!e;)e=Ce(),e||await $e(500);return e}async function Te(e,t,i){var o;const n=await ke();if(null===(o=null==n?void 0:n.config)||void 0===o?void 0:o.sidebar){!0===Object.assign({},n.config.sidebar).debug&&console.info(`%c${ye}: %c ${e.padEnd(24)} -> %c ${t}`,"color: chartreuse; background: black; font-weight: 700;","color: yellow; background: black; font-weight: 700;","",i)}}async function Ee(e,t,i){var o;const n=await ke();if(null===(o=null==n?void 0:n.config)||void 0===o?void 0:o.sidebar){!0===Object.assign({},n.config.sidebar).debug&&console.error(`%c${ye}: %c ${e.padEnd(24)} -> %c ${t}`,"color: red; background: black; font-weight: 700;","color: white; background: black; font-weight: 700;","color:red",i)}}"undefined"!=typeof window&&window.addEventListener("location-changed",()=>{we.clear(),_e=null});let Ae=null;function Pe(){const e=Date.now();if(Ae&&e-Ae.timestamp<2e3)return Ae.value;let t="0px";const i=Me(),o=null==i?void 0:i.shadowRoot;if(!o)return Ae={value:t,timestamp:e},t;const n=o.getElementById("view");if(n)try{const e=window.getComputedStyle(n);void 0!==e&&(t=e.paddingTop)}catch(e){t="0px"}return Ae={value:t,timestamp:e},t}function Re(){return xe("sidebar",()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer ha-sidebar"),e})}function qe(){return xe("appDrawerLayout",()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer"),e=e&&e.shadowRoot,e=e&&e.querySelector(".mdc-drawer-app-content"),e})}function Ne(){return xe("appDrawer",()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer"),e=e&&e.shadowRoot,e=e&&e.querySelector(".mdc-drawer"),e})}function Ie(e,t=window.location.href){const i=e.replace(/[\[\]]/g,"\\$&"),o=new RegExp("[?&]"+i+"(=([^&#]*)|&|#|$)").exec(t);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}function ze(e,t){let i=25,o=75,n=!1;const r=Pe();e.width&&("number"==typeof e.width?(i=e.width,o=100-i):"object"==typeof e.width&&(i=e.desktop,o=100-i,n=!0));let s="\n    #customSidebarWrapper { \n      display:flex;\n      flex-direction:row;\n      overflow:hidden;\n    }\n    #customSidebar.hide {\n      display:none!important;\n      width:0!important;\n    }\n    #view.hideSidebar {\n      width:100%!important;\n    }\n  ";return n?t<=e.breakpoints.mobile?s+=`\n        #customSidebar {\n          width:${e.width.mobile}%;\n          overflow:hidden;\n          ${0===e.width.mobile?"display:none;":""}\n          ${e.hideTopMenu?"":"margin-top: calc("+r+" + env(safe-area-inset-top));"}\n        } \n        #view {\n          width:${100-e.width.mobile}%;\n          ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n        }\n      `:t<=e.breakpoints.tablet?s+=`\n        #customSidebar {\n          width:${e.width.tablet}%;\n          overflow:hidden;\n          ${0===e.width.tablet?"display:none;":""}\n          ${e.hideTopMenu?"":"margin-top: calc("+r+" + env(safe-area-inset-top));"}\n        } \n        #view {\n          width:${100-e.width.tablet}%;\n          ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n        }\n      `:s+=`\n        #customSidebar {\n          width:${e.width.desktop}%;\n          overflow:hidden;\n          ${0===e.width.desktop?"display:none;":""}\n          ${e.hideTopMenu?"":"margin-top: calc("+r+" + env(safe-area-inset-top));"}\n        } \n        #view {\n          width:${100-e.width.desktop}%;\n          ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n        }\n      `:s+=`\n      #customSidebar {\n        width:${i}%;\n        overflow:hidden;\n        ${e.hideTopMenu?"":"margin-top: calc("+r+" + env(safe-area-inset-top));"}\n      } \n      #view {\n        width:${o}%;\n        ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n      }\n    `,s}function Oe(e,t){if(!e)return;const i=e.querySelector("#customSidebarStyle");if(!i)return;const o=document.body.clientWidth;i.textContent=ze(t,o);const n=Me(),r=null==n?void 0:n.shadowRoot;if(!r)return void Te("updateStyling","Root/shadowRoot non pronto, skip header/footer");const s=r.querySelector(".header"),a=r.querySelector("ch-footer")||r.querySelector("app-footer"),l=Ie("sidebarOff"),d=r.getElementById("view"),c=Pe(),u=document.body.clientWidth;!0===t.hideTopMenu&&!0===t.showTopMenuOnMobile&&u<=t.breakpoints.mobile&&null==l?(s&&(s.style.display="block"),d&&(d.style.minHeight="calc(100vh - "+c+")"),a&&(a.style.display="flex")):!0===t.hideTopMenu&&null==l&&(s&&(s.style.display="none"),a&&(a.style.display="none"),d&&(d.style.minHeight="calc(100vh)"))}function He(e,t,i,o){const n=function(e,t){let i=null;return function(...o){i&&clearTimeout(i),i=setTimeout(()=>e(...o),t)}}(()=>Oe(e,t),150);window.addEventListener("resize",n,{passive:!0}),"hideOnPath"in t&&(window.addEventListener("location-changed",()=>{t.hideOnPath.includes(window.location.pathname)?(i.classList.add("hideSidebar"),o.classList.add("hide")):(i.classList.remove("hideSidebar"),o.classList.remove("hide"))}),t.hideOnPath.includes(window.location.pathname)&&(Te("subscribeEvents","Disable sidebar for this path"),i.classList.add("hideSidebar"),o.classList.add("hide")))}function Fe(e){const t=Re(),i=qe(),o=Ne();t&&i&&o&&(e?(t.style.removeProperty("display"),o.style.removeProperty("display"),i.style.removeProperty("margin-left"),i.style.removeProperty("padding-left")):(t.style.display="none",o.style.display="none",i.style.marginLeft="0",i.style.paddingLeft="0"))}function Le(){Fe(function(){const e=Re();if(!e)return!1;const t=e.style.display,i=window.getComputedStyle(e).display;return"none"===t||"none"===i}())}function Ve(e){const t=Se();if(!t)return;const i=t.querySelector("div.header"),o=t.querySelector("#customHeaderContainer"),n=t.getElementById("view"),r=document.querySelector("#customSidebar .sidebar-inner");if(n||r)if(e){const e=((null==i?void 0:i.getBoundingClientRect().height)||0)+((null==o?void 0:o.getBoundingClientRect().height)||0);n&&(n.style.paddingTop=`${e}px`),r&&(r.style.paddingTop=`${e}px`)}else n&&n.style.removeProperty("padding-top"),r&&r.style.removeProperty("padding-top")}function De(e){const t=Se();if(!t)return;const i=t.querySelector("div.header");if(!i)return;const{mode:o}=function(){var e,t;const i=Ce();return{mode:"push"===(null!==(t=null===(e=null==i?void 0:i.config)||void 0===e?void 0:e.header)&&void 0!==t?t:{}).topMenuMode?"push":"overlay"}}();i.style.display=e?"flex":"none",Ve("push"===o&&e)}const Ue=new class{constructor(){this.metrics=new Map,this.lastTime=new Map}start(e){this.lastTime.set(e,performance.now())}end(e){const t=this.lastTime.get(e);if(!t)return;const i=performance.now()-t,o=this.metrics.get(e)||[];o.push(i),o.length>50&&o.shift(),this.metrics.set(e,o),i>16&&Math.random()<.1&&console.warn(`[SIDEBAR-CARD] Slow operation: ${e} took ${i.toFixed(2)}ms`)}getAverage(e){const t=this.metrics.get(e);return t&&0!==t.length?t.reduce((e,t)=>e+t,0)/t.length:0}report(){console.group("[SIDEBAR-CARD] Performance Report");for(const[e,t]of this.metrics){const i=this.getAverage(e),o=Math.max(...t);console.log(`${e}: avg=${i.toFixed(2)}ms max=${o.toFixed(2)}ms count=${t.length}`)}console.groupEnd()}};function Be(){De(function(){const e=Se();if(!e)return!1;const t=e.querySelector("div.header");if(!t)return!1;const i=t.style.display,o=window.getComputedStyle(t).display;return"none"===i||"none"===o}())}"undefined"!=typeof window&&(window.__sidebarPerfMonitor=Ue,console.log("[SIDEBAR-CARD] Performance monitor loaded:",Ue)),"undefined"!=typeof window&&(window.silvioToggleHaSidebar=()=>{try{Le()}catch(e){console.error("silvioToggleHaSidebar error",e)}},window.silvioToggleTopMenu=()=>{try{Be()}catch(e){console.error("silvioToggleTopMenu error",e)}},window.setTopMenuVisible=e=>De(e));let We=!1;async function je(){var e,t,i,o;if(We)return;const n=await ke(),r=null!==(t=null===(e=null==n?void 0:n.config)||void 0===e?void 0:e.sidebar)&&void 0!==t?t:null,s=null!==(o=null===(i=null==n?void 0:n.config)||void 0===i?void 0:i.header)&&void 0!==o?o:null;if(!r&&!s)return void Te("build","No sidebar/header config found");const a=Me();if(!a||!a.shadowRoot)return void Ee("build","Root element or shadowRoot not found!");Re(),qe(),Ne();const l=Ie("sidebarOff"),d=a.shadowRoot.querySelector("div");if(d){if(r&&!1!==r.enabled&&(!r.width||"number"==typeof r.width&&r.width>0&&r.width<100||"object"==typeof r.width)){if(!d.querySelector("#customSidebarWrapper")){!0===r.hideTopMenu&&null==l?De(!1):De(!0),!0===r.hideHassSidebar&&null==l?Fe(!1):Fe(!0),r.breakpoints?(r.breakpoints.mobile||(r.breakpoints.mobile=768),r.breakpoints.tablet||(r.breakpoints.tablet=1024)):r.breakpoints={tablet:1024,mobile:768};const c=ze(r,document.body.clientWidth),u=document.createElement("style");u.id="customSidebarStyle",u.type="text/css",u.appendChild(document.createTextNode(c)),d.appendChild(u);const h=d.querySelector("#view");if(!h||!h.parentNode)return void Ee("build","View element not found");const p=document.createElement("div");p.id="customSidebarWrapper",h.parentNode.insertBefore(p,h);const m=document.createElement("div");m.id="customSidebar",p.appendChild(m),p.appendChild(h),await async function(e,t){const i=document.createElement("sidebar-card");i.setConfig(t),i.hass=te(),e.appendChild(i)}(m,r),He(d,r,h,m),setTimeout(()=>Oe(d,r),1)}}else r&&Ee("build","Error in sidebar width config!");if(s&&!1!==s.enabled){const g=d.querySelector("#view");if(g){const b=d.querySelector("#customSidebarWrapper"),f=null!=b?b:g;let v=d.querySelector("#customHeaderWrapper");v?f.parentElement!==v&&v.appendChild(f):(v=document.createElement("div"),v.id="customHeaderWrapper",v.style.display="flex",v.style.flexDirection="column",v.style.width="100%",v.style.minWidth="0",v.style.boxSizing="border-box",f.parentNode?f.parentNode.insertBefore(v,f):d.insertBefore(v,d.firstChild),v.appendChild(f));let y=v.querySelector("#customHeaderContainer");function w(e){let t=e.querySelector("#headerFlipStage");if(!t){t=document.createElement("div"),t.id="headerFlipStage",t.style.position="relative",t.style.width="100%",t.style.boxSizing="border-box",t.style.perspective="1600px",t.style.overflow="hidden";const i=document.createElement("div");i.id="headerFlipRotator",i.style.position="relative",i.style.width="100%",i.style.height="100%",i.style.transformStyle="preserve-3d",i.style.willChange="transform",i.style.transformOrigin="50% 50%",i.style.transform="rotateX(0deg) translateZ(0px)";const o=document.createElement("div");o.id="headerFlipFront",o.style.position="absolute",o.style.inset="0",o.style.backfaceVisibility="hidden",o.style.transform="rotateX(0deg)",o.style.zIndex="2";const n=document.createElement("div");n.id="headerFlipBack",n.style.position="absolute",n.style.inset="0",n.style.backfaceVisibility="hidden",n.style.transform="rotateX(180deg)",n.style.overflow="hidden",n.style.pointerEvents="none",n.style.opacity="0",n.style.zIndex="1",i.appendChild(o),i.appendChild(n),t.appendChild(i),e.appendChild(t)}const i=t.querySelector("#headerFlipFront"),o=e.querySelector("header-card");o&&o.parentElement!==i&&i.appendChild(o);const n=Math.round(i.getBoundingClientRect().height||0);return t.style.height=`${Math.max(n,72)}px`,t}function _(e,t,i,o,n=M){var r,s;const a=e.style.height,l=e.style.minHeight,d=Math.max(72,Math.round(e.getBoundingClientRect().height||0));e.style.height=`${d}px`,e.style.minHeight=`${d}px`;const c=w(e),u=c.querySelector("#headerFlipRotator"),h=c.querySelector("#headerFlipBack"),p=c.querySelector("#headerFlipFront");if(c.style.height=`${Math.max(d,72)}px`,u.__flipping)return e.style.height=a,void(e.style.minHeight=l);u.__flipping=!0;const m=null!==(r=null==Se?void 0:Se())&&void 0!==r?r:null,g=null!==(s=null==m?void 0:m.querySelector("div.header"))&&void 0!==s?s:t.querySelector("div.header");if(!g)return e.style.height=a,e.style.minHeight=l,void(u.__flipping=!1);const b="none"!==window.getComputedStyle(g).display,f=i.style.paddingTop,v=o.style.paddingTop,y=o.style.getPropertyValue("padding-top"),_=()=>{i.style.paddingTop=f,y?o.style.setProperty("padding-top",y):o.style.paddingTop=v,window.__silvioFlipActive=!1},x="__sidebarCardHaHeaderObserver",S=window[x];S&&S.disconnect(),delete window[x];const C="__silvioHaOverlayRestore",$=e=>{const t=window[C];if(!e)return t&&t(),delete window[C],void(b||(g.style.display="none"));if(t)return;const i={display:g.style.display,position:g.style.position,top:g.style.top,left:g.style.left,right:g.style.right,width:g.style.width,zIndex:g.style.zIndex,pointerEvents:g.style.pointerEvents,margin:g.style.margin,transform:g.style.transform};window[C]=()=>{g.style.display=i.display,g.style.position=i.position,g.style.top=i.top,g.style.left=i.left,g.style.right=i.right,g.style.width=i.width,g.style.zIndex=i.zIndex,g.style.pointerEvents=i.pointerEvents,g.style.margin=i.margin,g.style.transform=i.transform},g.style.display="flex",g.style.position="fixed",g.style.top="0px",g.style.left="0px",g.style.right="0px",g.style.width="100%",g.style.zIndex="3000",g.style.pointerEvents="auto",g.style.margin="0",g.style.transform="translateZ(0)"},k=()=>{h.innerHTML="";const t=Pe(),i=Math.max("string"==typeof t&&Number.parseInt(t,10)||0,56),o=g.cloneNode(!0);o.style.display="flex",o.style.position="relative",o.style.width="100%",o.style.height=`${i}px`,o.style.minHeight=`${i}px`,o.style.visibility="visible",o.style.opacity="1",h.appendChild(o);const n=Math.round(p.getBoundingClientRect().height||0),r=Math.round(h.getBoundingClientRect().height||0),s=Math.max(n,r,i,d,72);return c.style.height=`${s}px`,e.style.height=`${Math.max(s,d)}px`,e.style.minHeight=`${Math.max(s,d)}px`,s},T=800,E=()=>{u.getAnimations().forEach(e=>e.cancel()),p.getAnimations().forEach(e=>e.cancel()),h.getAnimations().forEach(e=>e.cancel()),u.style.transformOrigin="50% 50%",u.style.transform="rotateX(0deg) translateZ(0px)",p.style.opacity="1",h.style.opacity="0",h.innerHTML=""},A=async()=>{window.__silvioFlipActive=!0,i.style.paddingTop=window.getComputedStyle(i).paddingTop,o.style.paddingTop=window.getComputedStyle(o).paddingTop;const e=k();p.style.opacity="1",h.style.opacity="0",u.getAnimations().forEach(e=>e.cancel()),p.getAnimations().forEach(e=>e.cancel()),h.getAnimations().forEach(e=>e.cancel()),u.style.transformOrigin="50% 50%",u.style.transform="rotateX(0deg) translateZ(0px)";const t=Math.max(10,Math.min(30,Math.round(e/6)));await new Promise(e=>{const i=u.animate([{transform:"rotateX(0deg) translateZ(0px)"},{transform:`rotateX(89deg) translateZ(${t}px)`},{transform:"rotateX(180deg) translateZ(0px)"}],{duration:T,easing:"ease-in-out",fill:"forwards"});p.animate([{opacity:1},{opacity:0}],{duration:T,easing:"ease-in-out",fill:"forwards"}),h.animate([{opacity:0},{opacity:1}],{duration:T,easing:"ease-in-out",fill:"forwards"}),i.onfinish=()=>e()}),$(!0),h.style.opacity="0",h.innerHTML=""};(async()=>{try{await A(),await(t=n,new Promise(e=>window.setTimeout(e,t))),await(async()=>{$(!1);const t=k();p.style.opacity="0",h.style.opacity="1",u.getAnimations().forEach(e=>e.cancel()),p.getAnimations().forEach(e=>e.cancel()),h.getAnimations().forEach(e=>e.cancel()),u.style.transformOrigin="50% 50%",u.style.transform="rotateX(180deg) translateZ(0px)";const i=Math.max(10,Math.min(30,Math.round(t/6)));await new Promise(e=>{const t=u.animate([{transform:"rotateX(180deg) translateZ(0px)"},{transform:`rotateX(91deg) translateZ(${i}px)`},{transform:"rotateX(0deg) translateZ(0px)"}],{duration:T,easing:"ease-in-out",fill:"forwards"});h.animate([{opacity:1},{opacity:0}],{duration:T,easing:"ease-in-out",fill:"forwards"}),p.animate([{opacity:0},{opacity:1}],{duration:T,easing:"ease-in-out",fill:"forwards"}),t.onfinish=()=>e()}),E(),_(),e.style.height=a,e.style.minHeight=l;const o=Math.round(p.getBoundingClientRect().height||0);c.style.height=`${Math.max(o,72)}px`})()}catch(t){$(!1),E(),_(),e.style.height=a,e.style.minHeight=l}finally{try{const e=new MutationObserver(()=>{P(),requestAnimationFrame(()=>{P()})});e.observe(g,{attributes:!0,attributeFilter:["style","class","hidden"]}),window[x]=e}catch(e){}try{P(),requestAnimationFrame(()=>{P()})}catch(e){}u.__flipping=!1}var t})()}y?y!==v.firstChild&&v.insertBefore(y,v.firstChild):(y=document.createElement("div"),y.id="customHeaderContainer",y.style.width="100%",y.style.boxSizing="border-box",v.insertBefore(y,v.firstChild)),await async function(e,t){let i=e.querySelector("header-card");i||(i=document.createElement("header-card"),e.appendChild(i),ie(i)),i.setConfig(t),i.hass=te()}(y,s);const x=(()=>{const e=s.sticky;if(null==e)return!0;if("boolean"==typeof e)return e;if("string"==typeof e){const t=e.toLowerCase().trim();return!("false"===t||"off"===t||"0"===t||"no"===t)}return"number"!=typeof e||0!==e})(),S="overlay"===s.topMenuMode?"overlay":"flip"===s.topMenuMode?"flip":"push",M=(()=>{const e=s.flipDuration;if(null==e)return 5e3;const t=Number(e);return!Number.isFinite(t)||t<=0?5e3:Math.round(1e3*t)})(),C=()=>{var e,t;const i=null!==(e=null==Se?void 0:Se())&&void 0!==e?e:null;return null!==(t=null==i?void 0:i.querySelector("div.header"))&&void 0!==t?t:d.querySelector("div.header")},$="__sidebarCardHaHeaderObserver",k=()=>{const e=window[$];e&&e.disconnect(),delete window[$]},T=()=>{k();const e=C();if(!e)return;let t=!1,i=0;const o=()=>{const e=Date.now();t||e-i<200||(t=!0,i=e,requestAnimationFrame(()=>{P(),t=!1}))};let n=null;const r=new MutationObserver(()=>{n&&clearTimeout(n),n=setTimeout(o,50)});r.observe(e,{attributes:!0,attributeFilter:["style","class","hidden"],subtree:!1}),window[$]=r,window[$+"_schedule"]=o};let E=0,A=!1;const P=()=>{if(x?"sticky"!==y.style.position&&(y.style.position="sticky",y.style.top="0px",y.style.zIndex="push"===S?"1":"1000"):"relative"!==y.style.position&&(y.style.position="relative",y.style.top="0px",y.style.zIndex="1"),"flip"!==S||window.silvioFlipTopMenu?"flip"!==S&&window.silvioFlipTopMenu&&delete window.silvioFlipTopMenu:window.silvioFlipTopMenu=()=>{try{_(y,d,v,g,M)}catch(e){}},!0===window.__silvioFlipActive)return;const e=C();if(!e)return void("0px"!==v.style.paddingTop&&(v.style.paddingTop="0px",g.style.removeProperty("padding-top")));const t=e.style.display;let i="none"!==t&&("flex"===t||"block"===t||""===t);if(!i&&"none"!==t)try{i="none"!==window.getComputedStyle(e).display}catch(e){i=!1}let o=0;i&&(i!==A?(o=Math.round(e.getBoundingClientRect().height),E=o):o=E),A=i;const n=i?50:0;let r;("push"===S||"flip"===S)&&o>0?(r=`${o}px`,v.style.paddingTop!==r&&(v.style.paddingTop=r,g.style.paddingTop="0px")):(r=`${n}px`,v.style.paddingTop!==r&&(v.style.paddingTop=r,g.style.removeProperty("padding-top")))},R=window[$+"_schedule"];R?R():P(),T();const q="__sidebarCardHeaderResizeHandler",N=window[q];N&&window.removeEventListener("resize",N);let I=null;const z=()=>{I&&clearTimeout(I),I=setTimeout(()=>{const e=window[$+"_schedule"];e?e():P()},150)};window[q]=z,window.addEventListener("resize",z,{passive:!0})}else Ee("build","View element (#view) not found for header")}else{const O=d.querySelector("#customHeaderWrapper"),H=d.querySelector("#customHeaderContainer");if(H&&H.remove(),O){const U=O.querySelector("#customSidebarWrapper"),B=O.querySelector("#view"),W=null!=U?U:B;W&&O.parentNode&&O.parentNode.insertBefore(W,O),O.remove()}const F="__sidebarCardHeaderResizeHandler",L=window[F];L&&window.removeEventListener("resize",L),delete window[F];const V="__sidebarCardHaHeaderObserver",D=window[V];D&&D.disconnect(),delete window[V]}We=!0}else Ee("build","App layout not found")}var Xe;customElements.get("sidebar-card")||customElements.define("sidebar-card",class extends ee{static get properties(){return{hass:{},config:{},active:{}}}constructor(){super(),this.templateLines=[],this.clock=!1,this.updateMenu=!0,this.digitalClock=!1,this.twelveHourVersion=!1,this.digitalClockWithSeconds=!1,this.period=!1,this.date=!1,this.dateFormat="DD MMMM",this.bottomCard=null,this.CUSTOM_TYPE_PREFIX="custom:",this._clockInterval=null,this._dateInterval=null,this._intersectionObserver=null,this._updateMenuTimeout=null,this._lastActivePath="",this._boundLocationChange=()=>{this._updateMenuTimeout&&clearTimeout(this._updateMenuTimeout),this._updateMenuTimeout=setTimeout(()=>this._updateActiveMenu(),100)}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this._boundLocationChange),this.config&&(this._setupVisibilityObserver(),this._stopClock(),this._stopDate(),this._updateActiveMenu())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this._boundLocationChange),this._stopClock(),this._stopDate(),this._intersectionObserver&&(this._intersectionObserver.disconnect(),this._intersectionObserver=null)}_setupVisibilityObserver(){(this.config.clock||this.config.digitalClock||this.config.date)&&(this._intersectionObserver=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?((this.config.clock||this.config.digitalClock)&&this._startClock(),this.config.date&&this._startDate()):(this._stopClock(),this._stopDate())})},{threshold:.1}),this._intersectionObserver.observe(this))}_startClock(){this._clockInterval&&clearInterval(this._clockInterval);const e=this;e._runClock(),this._clockInterval=setInterval(()=>{e.isConnected?e._runClock():e._stopClock()},997)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=null)}_startDate(){this._dateInterval&&clearInterval(this._dateInterval);const e=this;e._runDate();this._dateInterval=setInterval(()=>{e.isConnected?e._runDate():e._stopDate()},36e5)}_stopDate(){this._dateInterval&&(clearInterval(this._dateInterval),this._dateInterval=null)}render(){Ue.start("sidebar-render");const e=this.config.sidebarMenu,t="title"in this.config&&this.config.title,i="style"in this.config,o=this.config.menuStyle||"list";return this.clock=!!this.config.clock&&this.config.clock,this.digitalClock=!!this.config.digitalClock&&this.config.digitalClock,this.digitalClockWithSeconds=!!this.config.digitalClockWithSeconds&&this.config.digitalClockWithSeconds,this.twelveHourVersion=!!this.config.twelveHourVersion&&this.config.twelveHourVersion,this.period=!!this.config.period&&this.config.period,this.date=!!this.config.date&&this.config.date,this.dateFormat=this.config.dateFormat?this.config.dateFormat:"DD MMMM",this.bottomCard=this.config.bottomCard?this.config.bottomCard:null,this.updateMenu=!this.config.hasOwnProperty("updateMenu")||this.config.updateMenu,O`
      ${i?O`
            <style>
              ${this.config.style}
            </style>
          `:O``}

      <div class="sidebar-inner">
        ${this.digitalClock?O`
              <h1
                class="digitalClock${t?" with-title":""}${this.digitalClockWithSeconds?" with-seconds":""}"
              ></h1>
            `:O``}
        ${this.clock?O`
              <div class="clock">
                <div class="wrap">
                  <span class="hour"></span>
                  <span class="minute"></span>
                  <span class="second"></span>
                  <span class="dot"></span>
                </div>
              </div>
            `:O``}
        ${t?O`
              <h1 class="title">${t}</h1>
            `:O``}
        ${this.date?O`
              <h2 class="date"></h2>
            `:O``}
        ${e&&e.length>0?O`
              <ul
                class="sidebarMenu
                ${"buttons"===o?"sidebarMenu--buttons":""}
                ${"wide"===o?"sidebarMenu--wide":""}
                ${"grid"===o?"sidebarMenu--grid":""}"
              >
                ${(e||[]).filter(e=>this._evaluateVisibleCondition(e.conditional,this.hass)).map(e=>{const t=e.state&&this.hass.states[e.state]&&"off"!=this.hass.states[e.state].state&&"unavailable"!=this.hass.states[e.state].state,i=e.background_color||"",n=e.icon_color||"",r=`\n                      ${i?`--sidebar-button-bg:${i};--sidebar-wide-bg:${i};--sidebar-grid-bg:${i};`:""}\n                      ${n?`--sidebar-button-icon-color:${n};--sidebar-wide-icon-color:${n};--sidebar-grid-icon-color:${n};`:""}\n                    `;if("buttons"===o){const i=!0===this.config.showLabel;return O`
                        <li
                          @click="${e=>this._menuAction(e)}"
                          class="sidebar-item-button ${i?"sidebar-item-button--with-label":""} ${t?"active":""}"
                          data-type="${e.action}"
                          data-path="${e.navigation_path?e.navigation_path:""}"
                          data-menuitem="${JSON.stringify(e)}"
                          style="${r}"
                        >
                          <div class="sidebar-icon-wrapper">
                            ${e.icon?O`
                                  <ha-icon
                                    class="sidebar-icon"
                                    icon="${e.icon}"
                                  ></ha-icon>
                                `:O``}
                          </div>
                          ${i?O`
                                <span class="sidebar-label"
                                  >${e.name}</span
                                >
                              `:O``}
                        </li>
                      `}return"wide"===o?O`
                        <li
                          @click="${e=>this._menuAction(e)}"
                          class="sidebar-item-wide ${t?"active":""}"
                          data-type="${e.action}"
                          data-path="${e.navigation_path?e.navigation_path:""}"
                          data-menuitem="${JSON.stringify(e)}"
                          style="${r}"
                        >
                          ${e.icon?O`
                                <ha-icon
                                  class="sidebar-icon"
                                  icon="${e.icon}"
                                ></ha-icon>
                              `:O``}
                          <span class="sidebar-label"
                            >${e.name}</span
                          >
                        </li>
                      `:"grid"===o?O`
                        <li
                          @click="${e=>this._menuAction(e)}"
                          class="sidebar-item-grid ${t?"active":""}"
                          data-type="${e.action}"
                          data-path="${e.navigation_path?e.navigation_path:""}"
                          data-menuitem="${JSON.stringify(e)}"
                          style="${r}"
                        >
                          <div
                            class="sidebar-icon-wrapper sidebar-icon-wrapper-grid"
                          >
                            ${e.icon?O`
                                  <ha-icon
                                    class="sidebar-icon"
                                    icon="${e.icon}"
                                  ></ha-icon>
                                `:O``}
                          </div>
                          <span class="sidebar-label"
                            >${e.name}</span
                          >
                        </li>
                      `:O`
                      <li
                        @click="${e=>this._menuAction(e)}"
                        class="${t?"active":""}"
                        data-type="${e.action}"
                        data-path="${e.navigation_path?e.navigation_path:""}"
                        data-menuitem="${JSON.stringify(e)}"
                      >
                        <span>${e.name}</span>
                        ${e.icon?O`
                              <ha-icon
                                @click="${e=>this._menuAction(e)}"
                                icon="${e.icon}"
                              ></ha-icon>
                            `:O``}
                      </li>
                    `})}
              </ul>
            `:O``}
        ${this.config.template?O`
              <ul class="template">
                ${this.templateLines.map(e=>O`
                    ${function(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}(e)}
                  `)}
              </ul>
            `:O``}
        ${this.bottomCard?O`
              <div class="bottom"></div>
            `:O``}
      </div>
    `}_runClock(){Ue.start("clock-update");const e=new Date,t=e.getHours(),i=e.getMinutes(),o=e.getSeconds();if(this.clock){const e=t%12*30+.5*i,n=6*i,r=6*o,s=this.shadowRoot.querySelector(".hour"),a=this.shadowRoot.querySelector(".minute"),l=this.shadowRoot.querySelector(".second");s&&(s.style.transform=`rotate(${e}deg)`),a&&(a.style.transform=`rotate(${n}deg)`),l&&(l.style.transform=`rotate(${r}deg)`)}if(this.digitalClock){const i=this.hass&&this.hass.language||navigator.language||"en",o={hour:"2-digit",minute:"2-digit",hour12:this.twelveHourVersion};this.digitalClockWithSeconds&&(o.second="2-digit");let n=new Intl.DateTimeFormat(i,o).format(e);if(this.twelveHourVersion&&this.period){const e=t>=12?"pm":"am";n.toLowerCase().includes("am")||n.toLowerCase().includes("pm")||(n+=" "+e)}const r=this.shadowRoot.querySelector(".digitalClock");r&&(r.textContent=n)}Ue.end("clock-update")}_runDate(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".date");if(!e)return;const t=new Date,i=this.hass&&this.hass.language||navigator.language||"en",o={};this.dateFormat.includes("DD")?o.day="2-digit":this.dateFormat.includes("D")&&(o.day="numeric"),this.dateFormat.includes("MMMM")?o.month="long":this.dateFormat.includes("MMM")?o.month="short":this.dateFormat.includes("MM")?o.month="2-digit":this.dateFormat.includes("M")&&(o.month="numeric"),this.dateFormat.includes("YYYY")?o.year="numeric":this.dateFormat.includes("YY")&&(o.year="2-digit");const n=new Intl.DateTimeFormat(i,o);e.textContent=n.format(t)}updateSidebarSize(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".sidebar-inner");if(!t||!this.config)return;const i=Pe();t.style.width=this.offsetWidth+"px",this.config.hideTopMenu?(De(!1),t.style.height=`${window.innerHeight}px`,t.style.top="0px"):(De(!0),t.style.height=`calc(${window.innerHeight}px - ${i})`,t.style.top=i)}firstUpdated(){ie(this);const e=this;setTimeout(()=>{e.updateSidebarSize(),e._updateActiveMenu()},50),setTimeout(()=>{e.updateSidebarSize()},350);let t=null;window.addEventListener("resize",()=>{t&&clearTimeout(t),t=setTimeout(()=>{e.updateSidebarSize()},100)},!0),this.bottomCard&&setTimeout(()=>{let e={type:this.bottomCard.type};if(e=Object.assign({},e,this.bottomCard.cardOptions),Te("firstUpdated","Bottom card: ",e),!e||"object"!=typeof e||!e.type)return void Ee("firstUpdated","Bottom card config error!");let t=e.type;t=t.startsWith(this.CUSTOM_TYPE_PREFIX)?t.substr(this.CUSTOM_TYPE_PREFIX.length):`hui-${t}-card`;const i=this.shadowRoot.querySelector(".bottom");if(!i)return void Ee("firstUpdated","Bottom section not found");const o=()=>{const o=document.createElement(t);if("function"==typeof o.setConfig){if(o.setConfig(e),o.hass=te(),i.appendChild(o),ie(o),this.bottomCard.cardStyle&&""!==this.bottomCard.cardStyle){const e=this.bottomCard.cardStyle;let t=0;const i=setInterval(()=>{if(o&&o.shadowRoot){window.clearInterval(i);const t=document.createElement("style");t.innerHTML=e,o.shadowRoot.appendChild(t)}else 10===++t&&window.clearInterval(i)},100)}}else Ee("firstUpdated",`Element "${t}" for bottomCard does not implement setConfig(). Check type "${e.type}".`)};customElements.get(t)?o():customElements.whenDefined(t).then(o).catch(e=>{Ee("firstUpdated",`Error waiting for "${t}" definition`,e)})},2)}_updateActiveMenu(){if(!this.updateMenu)return;const e=document.location.pathname;if(e===this._lastActivePath)return;const t=this.shadowRoot.querySelectorAll('ul.sidebarMenu li[data-type="navigate"]');for(let e=0;e<t.length;e++)t[e].classList.remove("active");const i=this.shadowRoot.querySelector(`ul.sidebarMenu li[data-path="${e}"]`);i&&i.classList.add("active"),this._lastActivePath=e}_menuAction(e){const t=e.target;if(!t)return;const i=t.closest("li[data-menuitem]");if(!i)return;const o=i.getAttribute("data-menuitem");if(!o)return;const n=JSON.parse(o);this._customAction(n)}_evaluateVisibleCondition(e,t){var i,o,n,r,s;if(!e)return!0;const a=e.trim().replace(/^{{\s*|\s*}}$/g,"").trim();try{const e=a.match(/is_state\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);if(e){const[,o,n]=e;return(null===(i=t.states[o])||void 0===i?void 0:i.state)===n}const l=a.match(/is_state_attr\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);if(l){const[,e,i,r]=l;return(null===(n=null===(o=t.states[e])||void 0===o?void 0:o.attributes)||void 0===n?void 0:n[i])===r}const d=a.match(/states\[['"]([^'"]+)['"]\]\s*==\s*['"]([^'"]+)['"]/);if(d){const[,e,i]=d;return(null===(r=t.states[e])||void 0===r?void 0:r.state)===i}const c=a.match(/states\[['"]([^'"]+)['"]\]\s*\|\s*(int|float)\s*([<>]=?|==)\s*([\d.]+)/);if(c){const[,e,i,o,n]=c,r=null===(s=t.states[e])||void 0===s?void 0:s.state;if(void 0===r)return!1;const a="float"===i?parseFloat(r):parseInt(r,10),l=parseFloat(n);switch(o){case">":return a>l;case"<":return a<l;case">=":return a>=l;case"<=":return a<=l;case"==":return a==l;default:return!1}}return console.warn("sidebar-card: could not parse visible template:",a),!0}catch(e){return console.error("sidebar-card: visible template evaluation error:",e),!0}}_customAction(e){switch(e.action){case"more-info":(e.entity||e.camera_image)&&re(e.entity?e.entity:e.camera_image);break;case"navigate":e.navigation_path&&fe(window,e.navigation_path);break;case"url":e.url_path&&window.open(e.url_path);break;case"toggle":e.entity&&(ve(this.hass,e.entity),be("success"));break;case"call-service":{if(!e.service)return void be("failure");const[t,i]=e.service.split(".",2);this.hass.callService(t,i,e.service_data),be("success");break}case"service-js":if(null==e?void 0:e.service)try{const t=String(e.service).replace(/^\[\[\[\s*|\s*\]\]\]$/g,"");new Function(t).call(this),be("success")}catch(e){be("failure")}else be("failure");break;case"toggle-sidebar":try{const e=window;e&&"function"==typeof e.silvioToggleHaSidebar?(e.silvioToggleHaSidebar(),be("success")):be("failure")}catch(e){be("failure")}break;case"toggle-topmenu":try{const e=window;e&&"function"==typeof e.silvioFlipTopMenu&&e.silvioFlipTopMenu(),e&&"function"==typeof e.silvioToggleTopMenu?(e.silvioToggleTopMenu(),be("success")):be("failure")}catch(e){be("failure")}}}setConfig(e){this.config=e,this.config.template&&function(e,t,i,o=!0){e||(e=te().connection);let n={user:te().user.name,browser:le,hash:location.hash.substr(1)||" ",...i.variables},r=i.template,s=i.entity_ids;e.subscribeMessage(e=>{if(o){let i=String(e.result);const o=/_\([^)]*\)/g;i=i.replace(o,e=>te().localize(e.substring(2,e.length-1))||e),t(i)}else t(e.result)},{type:"render_template",template:r,variables:n,entity_ids:s})}(null,e=>{this.templateLines=e.match(/<(?:li|div)(?:\s+(?:class|id)\s*=\s*"([^"]*)")*\s*>([\s\S]*?)<\/(?:li|div)>/g).map(e=>e),this.requestUpdate()},{template:this.config.template,variables:{config:this.config},entity_ids:this.config.entity_ids})}getCardSize(){return 1}static get styles(){return G`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(
          --sidebar-background,
          var(
            --paper-listbox-background-color,
            var(--primary-background-color, #fff)
          )
        );
      }
      .sidebar-inner {
        padding: 20px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: fixed;
        width: var(--sidebar-effective-width, 250px);
        max-width: 100%;
        overflow: hidden auto;
        transition: width 0.25s ease;
      }

      .sidebarMenu {
        list-style: none;
        margin: 20px 0;
        padding: 20px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      .sidebarMenu li {
        color: var(--sidebar-text-color, #000);
        position: relative;
        padding: 10px 20px;
        border-radius: 12px;
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
        white-space: normal;
        display: block;
        cursor: pointer;
      }
      .sidebarMenu li ha-icon {
        float: right;
        color: var(--sidebar-icon-color, #000);
      }
      .sidebarMenu li.active {
        color: var(--sidebar-selected-text-color);
      }
      .sidebarMenu li.active ha-icon {
        color: var(--sidebar-selected-icon-color, rgb(247, 217, 89));
      }
      .sidebarMenu li.active::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--sidebar-selected-icon-color, #000);
        opacity: 0.12;
        border-radius: 12px;
      }
      h1 {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 32px;
        line-height: 32px;
        font-weight: 200;
        color: var(--sidebar-text-color, #000);
        cursor: default;
      }
      h1.digitalClock {
        font-size: 60px;
        line-height: 60px;
        cursor: default;
      }
      h1.digitalClock.with-seconds {
        font-size: 48px;
        line-height: 48px;
        cursor: default;
      }
      h1.digitalClock.with-title {
        margin-bottom: 0;
        cursor: default;
      }
      h2 {
        margin: 0;
        font-size: 26px;
        line-height: 26px;
        font-weight: 200;
        color: var(--sidebar-text-color, #000);
        cursor: default;
      }
      .template {
        margin: 0;
        padding: 0;
        list-style: none;
        color: var(--sidebar-text-color, #000);
      }

      .template li {
        display: block;
        color: inherit;
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
        white-space: normal;
      }

      .clock {
        margin: 20px 0;
        position: relative;
        padding-top: calc(100% - 10px);
        width: calc(100% - 10px);
        border-radius: 100%;
        background: var(--face-color, #fff);
        font-family: "Montserrat";
        border: 5px solid var(--face-border-color, #fff);
        box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);
      }

      .clock .wrap {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }

      .clock .minute,
      .clock .hour {
        position: absolute;
        height: 28%;
        width: 6px;
        margin: auto;
        top: -27%;
        left: 0;
        bottom: 0;
        right: 0;
        background: var(--clock-hands-color, #000);
        transform-origin: bottom center;
        transform: rotate(0deg);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
        z-index: 1;
      }

      .clock .minute {
        position: absolute;
        height: 41%;
        width: 4px;
        top: -38%;
        left: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
        transform: rotate(90deg);
      }

      .clock .second {
        position: absolute;
        top: -48%;
        height: 48%;
        width: 2px;
        margin: auto;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 4px;
        background: var(--clock-seconds-hand-color, #ff4b3e);
        transform-origin: bottom center;
        transform: rotate(180deg);
        z-index: 1;
      }

      .clock .dot {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        border-radius: 100px;
        background: var(--clock-middle-background, #fff);
        border: 2px solid var(--clock-middle-border, #000);
        border-radius: 100px;
        margin: auto;
        z-index: 1;
      }

      .bottom {
        display: flex;
        margin-top: auto;
      }

      /* === STILE MENU "WIDE" === */

      .sidebarMenu.sidebarMenu--wide {
        border-top: none;
        border-bottom: none;
        margin: var(--sidebar-wide-margin-y, 16px) 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--sidebar-wide-gap, 8px);
      }

      .sidebarMenu.sidebarMenu--wide li.sidebar-item-wide {
        padding: 0 var(--sidebar-wide-padding-x, 14px);
        margin: 0;
        width: 100%;
        height: var(--sidebar-wide-height, 48px);
        border-radius: var(--sidebar-wide-radius, 18px);
        display: flex;
        align-items: center;
        gap: var(--sidebar-wide-item-gap, 10px);
        cursor: pointer;
        background-color: var(
          --sidebar-wide-bg,
          var(--sidebar-button-bg, rgba(255, 255, 255, 0.18))
        );
        box-sizing: border-box;
        position: relative;
      }

      .sidebarMenu.sidebarMenu--wide li.sidebar-item-wide ha-icon.sidebar-icon {
        color: var(--sidebar-wide-icon-color, var(--sidebar-icon-color, #000));
        width: var(--sidebar-wide-icon-size, 22px);
        height: var(--sidebar-wide-icon-size, 22px);
        flex-shrink: 0;
      }

      .sidebarMenu.sidebarMenu--wide li.sidebar-item-wide .sidebar-label {
        font-size: var(--sidebar-wide-font-size, 14px);
        line-height: var(--sidebar-wide-line-height, 1.2);
        color: var(--sidebar-wide-text-color, #111111);
        font-weight: var(--sidebar-wide-font-weight, 500);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sidebarMenu.sidebarMenu--wide li.sidebar-item-wide.active {
        position: relative;
        border: var(--sidebar-wide-active-border-width, 0px) solid
          var(--sidebar-wide-active-border-color, transparent);
        border-radius: var(--sidebar-wide-radius, 18px);
      }

      .sidebarMenu.sidebarMenu--wide li.sidebar-item-wide.active::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-color: var(
          --sidebar-wide-active-bg,
          var(--sidebar-selected-bg, #111)
        );
        opacity: var(--sidebar-wide-active-opacity, 0.14);
        pointer-events: none;
      }

      .sidebarMenu.sidebarMenu--wide
        li.sidebar-item-wide.active
        ha-icon.sidebar-icon {
        color: var(
          --sidebar-wide-active-icon-color,
          var(--sidebar-selected-icon-color, rgb(247, 217, 89))
        );
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--sidebar-wide-active-icon-size, 26px) !important;
        height: var(--sidebar-wide-active-icon-size, 26px) !important;
        transform: none !important;
      }

      .sidebarMenu.sidebarMenu--wide
        li.sidebar-item-wide.active
        .sidebar-label {
        color: var(
          --sidebar-wide-active-text-color,
          var(--sidebar-wide-text-color, #111111)
        );
      }

      /* === STILE MENU "BUTTONS" === */

      .sidebarMenu.sidebarMenu--buttons {
        border-top: none;
        border-bottom: none;
        margin: var(--sidebar-button-margin-y, 16px) 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--sidebar-button-gap, 8px);
        align-items: stretch;
      }

      .sidebarMenu.sidebarMenu--buttons li.sidebar-item-button {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        gap: var(--sidebar-button-item-gap, 10px);
        cursor: pointer;
        box-sizing: border-box;
        position: relative;
        background: none;
        border-radius: 0;
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button:not(.sidebar-item-button--with-label) {
        width: var(--sidebar-button-size, 56px);
        height: var(--sidebar-button-size, 56px);
        justify-content: center;
        margin: 0 auto;
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button.sidebar-item-button--with-label {
        width: 100%;
        height: var(--sidebar-button-size, 56px);
        justify-content: flex-start;
        margin: 0;
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button
        .sidebar-icon-wrapper {
        width: var(--sidebar-button-box-size, 56px);
        height: var(--sidebar-button-box-size, 56px);
        border-radius: var(--sidebar-button-radius, 18px);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--sidebar-button-bg, rgba(255, 255, 255, 0.18));
        flex-shrink: 0;
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button
        ha-icon.sidebar-icon {
        color: var(
          --sidebar-button-icon-color,
          var(--sidebar-icon-color, #000)
        );
        width: var(--sidebar-button-icon-size, 28px);
        height: var(--sidebar-button-icon-size, 28px);
        line-height: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sidebarMenu.sidebarMenu--buttons li.sidebar-item-button .sidebar-label {
        font-size: var(--sidebar-button-font-size, 13px);
        line-height: var(--sidebar-button-line-height, 1.2);
        color: var(
          --sidebar-button-text-color,
          var(--primary-text-color, #000)
        );
        font-weight: var(--sidebar-button-font-weight, 500);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sidebarMenu.sidebarMenu--buttons li.sidebar-item-button.active::before {
        content: none !important;
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button.active
        .sidebar-icon-wrapper {
        border: var(--sidebar-button-active-border-width, 3px) solid
          var(--sidebar-button-active-border-color, #ffffff);
        box-sizing: border-box;
        box-shadow: 0 0 8px
          var(--sidebar-button-active-shadow-color, rgba(0, 0, 0, 0.18));
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button.active
        ha-icon.sidebar-icon {
        color: var(
          --sidebar-button-active-icon-color,
          var(--sidebar-selected-icon-color, rgb(247, 217, 89))
        );
      }

      .sidebarMenu.sidebarMenu--buttons
        li.sidebar-item-button.active
        .sidebar-label {
        color: var(
          --sidebar-button-active-text-color,
          var(--sidebar-button-text-color, var(--primary-text-color, #000))
        );
      }

      /* === STILE MENU "GRID" === */

      .sidebarMenu.sidebarMenu--grid {
        border: none;
        margin: var(--sidebar-grid-margin-y, 14px) 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(
          var(--sidebar-grid-columns, 3),
          minmax(0, 1fr)
        );
        grid-auto-rows: var(--sidebar-grid-row-height, 96px);
        gap: var(--sidebar-grid-gap, 12px);
        max-height: calc(
          var(--sidebar-grid-row-height, 96px) * var(--sidebar-grid-rows, 2)
        );
        overflow-y: auto;
      }

      .sidebarMenu.sidebarMenu--grid li.sidebar-item-grid {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        background: none;
        padding: var(--sidebar-grid-item-padding, 4px) 0 0;
        position: relative;
      }

      .sidebarMenu.sidebarMenu--grid
        li.sidebar-item-grid
        .sidebar-icon-wrapper {
        width: var(--sidebar-grid-box-size, 72px);
        height: var(--sidebar-grid-box-size, 72px);
        border-radius: var(--sidebar-grid-radius, 22px);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(
          --sidebar-grid-bg,
          var(--sidebar-button-bg, rgba(255, 255, 255, 0.15))
        );
        flex-shrink: 0;
      }

      .sidebarMenu.sidebarMenu--grid li.sidebar-item-grid ha-icon.sidebar-icon {
        --mdc-icon-size: var(--sidebar-grid-icon-size, 40px);
        width: var(--sidebar-grid-icon-size, 40px);
        height: var(--sidebar-grid-icon-size, 40px);
        line-height: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--sidebar-grid-icon-color, var(--sidebar-icon-color, #000));
      }

      .sidebarMenu.sidebarMenu--grid li.sidebar-item-grid .sidebar-label {
        margin-top: var(--sidebar-grid-label-margin-top, 6px);
        font-size: var(--sidebar-grid-font-size, 11px);
        line-height: var(--sidebar-grid-line-height, 1.2);
        text-align: center;
        color: var(--sidebar-grid-text-color, var(--primary-text-color, #000));
        font-weight: var(--sidebar-grid-font-weight, 500);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sidebarMenu.sidebarMenu--grid li.sidebar-item-grid.active::before {
        content: none !important;
      }

      .sidebarMenu.sidebarMenu--grid
        li.sidebar-item-grid.active
        .sidebar-icon-wrapper {
        box-shadow: 0 0 0 2px
          var(--sidebar-grid-active-border, rgba(255, 255, 255, 0.7));
        background-color: var(
          --sidebar-grid-active-bg,
          var(--sidebar-grid-bg, rgba(255, 255, 255, 0.25))
        );
      }

      .sidebarMenu.sidebarMenu--grid
        li.sidebar-item-grid.active
        ha-icon.sidebar-icon {
        color: var(
          --sidebar-grid-active-icon-color,
          var(--sidebar-selected-icon-color, rgb(247, 217, 89))
        );
      }

      .sidebarMenu.sidebarMenu--grid
        li.sidebar-item-grid.active
        .sidebar-label {
        color: var(
          --sidebar-grid-active-text-color,
          var(--sidebar-grid-text-color, var(--primary-text-color, #000))
        );
      }
    `}}),customElements.get("header-card")||customElements.define("header-card",class extends ee{constructor(){super(...arguments),this._builtOnce=!1,this._lastCardConfigKey=""}static get properties(){return{hass:{},config:{}}}setConfig(e){this.config=e}firstUpdated(){ie(this),this._applyHeight(),this._ensureAllCards(),this._builtOnce=!0}updated(e){e.has("config")&&(this._applyHeight(),this._ensureAllCards()),e.has("hass")&&this._builtOnce&&this._pushHassToBuiltCards()}_applyHeight(){var e;const t=Number(null===(e=this.config)||void 0===e?void 0:e.height);Number.isFinite(t)&&t>0?this.style.setProperty("--header-height",`${t}px`):this.style.removeProperty("--header-height")}_pushHassToBuiltCards(){var e;const t=this.renderRoot.querySelectorAll("#slotLeft > *, #slotCenter > *, #slotRight > *"),i=null!==(e=this.hass)&&void 0!==e?e:te();t.forEach(e=>{try{e.hass=i}catch(e){}})}async _buildCardInto(e,t){const i=Symbol("headerBuild");if(e.__headerBuildToken=i,e.innerHTML="",!t||"object"!=typeof t||!t.type)return;let o=String(t.type);o=o.startsWith("custom:")?o.substring(7):`hui-${o}-card`;const n=()=>{var n,r;if(e.__headerBuildToken!==i)return;const s=document.createElement(o);"function"==typeof s.setConfig&&(s.hass=null!==(n=this.hass)&&void 0!==n?n:te(),s.setConfig(t),s.hass=null!==(r=this.hass)&&void 0!==r?r:te(),e.appendChild(s),ie(s))};if(customElements.get(o))n();else try{await customElements.whenDefined(o),n()}catch(e){}}_ensureAllCards(){var e,t,i,o,n,r;const s=this.renderRoot,a=this.config||{},l=JSON.stringify({left:null!==(e=a.leftCard)&&void 0!==e?e:null,center:null!==(t=a.centerCard)&&void 0!==t?t:null,right:null!==(i=a.rightCard)&&void 0!==i?i:null});if(l===this._lastCardConfigKey&&this._builtOnce)return;this._lastCardConfigKey=l;const d=s.querySelector("#slotLeft"),c=s.querySelector("#slotCenter"),u=s.querySelector("#slotRight");d&&this._buildCardInto(d,null!==(o=a.leftCard)&&void 0!==o?o:null),c&&this._buildCardInto(c,null!==(n=a.centerCard)&&void 0!==n?n:null),u&&this._buildCardInto(u,null!==(r=a.rightCard)&&void 0!==r?r:null)}_runAction(e,t){var i,o;e&&(e.preventDefault(),e.stopPropagation());switch(null==t?void 0:t.action){case"navigate":(null==t?void 0:t.navigation_path)&&(fe(window,t.navigation_path),be("success"));break;case"toggle":if(null==t?void 0:t.entity){const e=null!==(i=this.hass)&&void 0!==i?i:te();ve(e,t.entity),be("success")}break;case"more-info":(null==t?void 0:t.entity)&&(re(t.entity),be("success"));break;case"call-service":{if(!(null==t?void 0:t.service))return void be("failure");const[e,i]=String(t.service).split(".",2);(null!==(o=this.hass)&&void 0!==o?o:te()).callService(e,i,t.service_data),be("success");break}case"service-js":if(null==t?void 0:t.service)try{const e=String(t.service).replace(/^\[\[\[\s*|\s*\]\]\]$/g,"");new Function(e).call(this),be("success")}catch(e){be("failure")}else be("failure");break;case"toggle-sidebar":try{const e=window;e&&"function"==typeof e.silvioToggleHaSidebar?(e.silvioToggleHaSidebar(),be("success")):be("failure")}catch(e){be("failure")}break;case"toggle-topmenu":try{const e=window;e&&"function"==typeof e.silvioFlipTopMenu&&e.silvioFlipTopMenu(),e&&"function"==typeof e.silvioToggleTopMenu?(e.silvioToggleTopMenu(),be("success")):be("failure")}catch(e){be("failure")}}}_renderHeaderMenuItem(e,t){const i=(null==e?void 0:e.background_color)||"",o=(null==e?void 0:e.icon_color)||"",n=(null==e?void 0:e.text_color)||"";return O`
      <button
        class="header-item"
        style="${`\n      ${i?`--header-item-bg:${i};`:""}\n      ${o?`--header-item-icon-color:${o};`:""}\n      ${n?`--header-item-text-color:${n};`:""}\n    `}"
        title="${(null==e?void 0:e.name)||""}"
        aria-label="${(null==e?void 0:e.name)||""}"
        @click=${t=>this._runAction(t,e)}
      >
        ${(null==e?void 0:e.icon)?O`
              <ha-icon class="header-icon" icon="${e.icon}"></ha-icon>
            `:O``}
        ${t&&(null==e?void 0:e.name)?O`<span class="header-label">${e.name}</span>`:O``}
      </button>
    `}render(){const e=this.config||{},t="string"==typeof e.style&&e.style.trim().length>0,i="title"in e?e.title:"",o=Array.isArray(e.leftMenu)?e.leftMenu:[],n=Array.isArray(e.rightMenu)?e.rightMenu:[],r=Array.isArray(e.headerMenu)?e.headerMenu:[],s=e.headerMenuStyle||"wide",a=!1!==e.headerMenuShowLabel,l=e.headerMenuPosition||"right",d=r.length?O`
            <div class="headerMenuWrap">
              <div
                class="headerMenu
                ${"wide"===s?"headerMenu--wide":""}
                ${a?"with-label":"no-label"}"
              >
                ${r.map(e=>this._renderHeaderMenuItem(e,a))}
              </div>
            </div>
          `:O``;return O`
      ${t?O`
            <style>
              ${e.style}
            </style>
          `:O``}

      <div class="header-inner">
        <!-- LEFT AREA (sempre visibile) -->
        <div class="area area-left">
          ${o.length?O`
                <div class="iconMenu iconMenu-left">
                  ${o.map(e=>O`
                      <button
                        class="iconBtn"
                        title="${(null==e?void 0:e.name)||""}"
                        aria-label="${(null==e?void 0:e.name)||""}"
                        @click=${t=>this._runAction(t,e)}
                      >
                        ${(null==e?void 0:e.icon)?O`<ha-icon icon="${e.icon}"></ha-icon>`:O``}
                      </button>
                    `)}
                </div>
              `:O``}

          ${"left"===l?d:O``}

          <div class="header-card-slot header-slot-left">
            <div id="slotLeft"></div>
          </div>
        </div>

        <!-- CENTER CORRIDOR (scroll orizzontale, niente sovrapposizioni) -->
        <div class="area area-center">
          <div class="center-scroll">
            <div class="header-card-slot header-slot-center">
              <div id="slotCenter"></div>
            </div>

            ${"center"===l?d:O``}

            ${i?O`<div class="title">${i}</div>`:O``}
          </div>
        </div>

        <!-- RIGHT AREA (sempre visibile) -->
        <div class="area area-right">
          <div class="header-card-slot header-slot-right">
            <div id="slotRight"></div>
          </div>

          ${"right"===l?d:O``}

          ${n.length?O`
                <div class="iconMenu iconMenu-right">
                  ${n.map(e=>O`
                      <button
                        class="iconBtn"
                        title="${(null==e?void 0:e.name)||""}"
                        aria-label="${(null==e?void 0:e.name)||""}"
                        @click=${t=>this._runAction(t,e)}
                      >
                        ${(null==e?void 0:e.icon)?O`<ha-icon icon="${e.icon}"></ha-icon>`:O``}
                      </button>
                    `)}
                </div>
              `:O``}
        </div>
      </div>
    `}static get styles(){return G`
      :host {
        width: 100%;
        display: block;
        box-sizing: border-box;
        background: transparent;
        color: var(--header-text-color, var(--primary-text-color));
        /* lasciamo decidere all'altezza del contenuto;
           min-height gestita via --header-height in .header-inner */
      }

      .header-inner {
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        gap: clamp(6px, 1.2vw, 12px);
        min-width: 0;
        /* Altezza minima configurabile, ma può crescere se le card sono più alte */
        min-height: var(--header-height, 72px);
      }

      .area {
        display: flex;
        align-items: center;
        min-width: 0;
        gap: clamp(6px, 1.2vw, 12px);
      }

      .area-left,
      .area-right {
        flex: 0 0 auto; /* sempre visibili */
      }

      .area-center {
        flex: 1 1 auto; /* si adatta */
        min-width: 0;
      }

      .header-card-slot {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      /* contenitori che ospitano le card */
      #slotLeft,
      #slotCenter,
      #slotRight {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      /* CENTER: un solo corridoio scrollabile */
      .center-scroll {
        display: flex;
        align-items: center;
        gap: clamp(6px, 1.2vw, 12px);
        min-width: 0;
        flex: 1 1 auto;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }

      /* icon menu */
      .iconMenu {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 0 0 auto;
      }

      .iconBtn {
        width: clamp(34px, 3.2vw, 40px);
        height: clamp(34px, 3.2vw, 40px);
        border-radius: 999px;
        border: 0;
        cursor: pointer;
        background: transparent;
        color: inherit;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
      }

      .iconBtn:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      /* HEADER MENU */
      .headerMenuWrap {
        display: flex;
        align-items: center;
        min-width: 0;
        flex: 0 0 auto;
      }

      .headerMenu {
        display: flex;
        align-items: center;
        gap: clamp(6px, 1.2vw, 10px);
        min-width: 0;
        flex: 0 0 auto;
      }

      .headerMenu.headerMenu--wide .header-item {
        height: clamp(38px, 3.8vw, 44px);
        padding: 0 clamp(10px, 1.6vw, 14px);
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 0;
        cursor: pointer;
        background: var(--header-item-bg, rgba(255, 255, 255, 0.14));
        color: var(--header-item-text-color, inherit);
        box-sizing: border-box;
        white-space: nowrap;
        flex: 0 0 auto;
      }

      .headerMenu.headerMenu--wide .header-icon {
        color: var(--header-item-icon-color, currentColor);
      }

      .headerMenu.no-label .header-label {
        display: none !important;
      }

      .header-item:hover {
        filter: brightness(1.02);
      }

      /* titolo opzionale (se lo userai in futuro) */
      .title {
        display: none;
      }
    `}}),console.info(`%c  ${ye.padEnd(24)}%c\n  Version: ${"1.2".padEnd(9)}      `,"color: chartreuse; background: black; font-weight: 700;","color: white; background: dimgrey; font-weight: 700;"),je(),Xe=je,setTimeout(()=>{window.addEventListener("location-changed",()=>{const e=Me(),t=null==e?void 0:e.shadowRoot;if(!t)return;const i=t.querySelector("div");if(!i)return;const o=i.querySelector("#customSidebarWrapper");if(o){const e=o.querySelector("#customSidebar"),t=o.querySelector("#customHeaderContainer");e||t||Xe()}else Xe()})},1e3);
