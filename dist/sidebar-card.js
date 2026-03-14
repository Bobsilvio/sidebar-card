const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,s=new RegExp(`${i}|${n}`),o="$lit$";class r{constructor(e,t){this.parts=[],this.element=t;const n=[],r=[],l=document.createTreeWalker(t.content,133,null,!1);let u=0,h=-1,p=0;const{strings:f,values:{length:m}}=e;for(;p<m;){const e=l.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)a(t[e].name,o)&&n++;for(;n-- >0;){const t=f[p],i=d.exec(t)[2],n=i.toLowerCase()+o,r=e.getAttribute(n);e.removeAttribute(n);const a=r.split(s);this.parts.push({type:"attribute",index:h,name:i,strings:a}),p+=a.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,r=t.split(s),l=r.length-1;for(let t=0;t<l;t++){let n,s=r[t];if(""===s)n=c();else{const e=d.exec(s);null!==e&&a(e[2],o)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),n=document.createTextNode(s)}i.insertBefore(n,e),this.parts.push({type:"node",index:++h})}""===r[l]?(i.insertBefore(c(),e),n.push(e)):e.data=r[l],p+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&h!==u||(h++,t.insertBefore(c(),e)),u=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(n.push(e),h--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),p++}}else l.currentNode=r.pop()}for(const e of n)e.parentNode.removeChild(e)}}const a=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:i},parts:n}=e,s=document.createTreeWalker(i,133,null,!1);let o=p(n),r=n[o],a=-1,l=0;const c=[];let d=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,o=p(n,o),r=n[o]}c.forEach(e=>e.parentNode.removeChild(e))}const h=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},p=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1};const f=new WeakMap,m=e=>"function"==typeof e&&f.has(e),g={},b={};class y{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],n=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,c=s.nextNode();for(;r<n.length;)if(o=n[r],l(o)){for(;a<o.index;)a++,"TEMPLATE"===c.nodeName&&(i.push(c),s.currentNode=c.content),null===(c=s.nextNode())&&(s.currentNode=i.pop(),c=s.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${i} `;class x{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let r=0;r<e;r++){const e=this.strings[r],a=e.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===e.indexOf("--\x3e",a+1);const l=d.exec(e);t+=null===l?e+(s?w:n):e.substr(0,l.index)+l[1]+l[2]+o+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const k=e=>null===e||!("object"==typeof e||"function"==typeof e),_=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new $(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!_(e))return e}let n="";for(let s=0;s<t;s++){n+=e[s];const t=i[s];if(void 0!==t){const e=t.value;if(k(e)||!_(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(e){this.value=void 0,this.committer=e}setValue(e){e===g||k(e)&&e===this.value||(this.value=e,m(e)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const e=this.value;this.value=g,e(this)}this.value!==g&&this.committer.commit()}}class C{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}const e=this.__pendingValue;e!==g&&(k(e)?e!==this.value&&this.__commitText(e):e instanceof x?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):_(e)?this.__commitIterable(e):e===b?(this.value=b,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const i=new y(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const s of e)i=t[n],void 0===i&&(i=new C(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(s),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=g}}class T extends S{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends ${}let N=!1;(()=>{try{const e={get capture(){return N=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class O{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;m(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=g,e(this)}if(this.__pendingValue===g)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=g}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(N?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function I(e){let t=L.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},L.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const s=e.strings.join(i);return n=t.keyString.get(s),void 0===n&&(n=new r(e,e.getTemplateElement()),t.keyString.set(s,n)),t.stringsArray.set(e.strings,n),n}const L=new Map,z=new WeakMap;const P=new class{handleAttributeExpressions(e,t,i,n){const s=t[0];if("."===s){return new T(e,t.slice(1),i).parts}if("@"===s)return[new O(e,t.slice(1),n.eventContext)];if("?"===s)return[new E(e,t.slice(1),i)];return new S(e,t,i).parts}handleTextExpression(e){return new C(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const R=(e,...t)=>new x(e,t,"html",P),j=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const D=e=>t=>{const n=j(t.type,e);let s=L.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},L.set(n,s));let o=s.stringsArray.get(t.strings);if(void 0!==o)return o;const a=t.strings.join(i);if(o=s.keyString.get(a),void 0===o){const i=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,e),o=new r(t,i),s.keyString.set(a,o)}return s.stringsArray.set(t.strings,o),o},B=["html","svg"],H=new Set,F=(e,t,i)=>{H.add(e);const n=i?i.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:o}=s;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(n,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=s[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{B.forEach(t=>{const i=L.get(j(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),u(e,i)})})})(e);const a=n.content;i?function(e,t,i=null){const{element:{content:n},parts:s}=e;if(null==i)return void n.appendChild(t);const o=document.createTreeWalker(n,133,null,!1);let r=p(s),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=h(t),i.parentNode.insertBefore(t,i));-1!==r&&s[r].index===l;){if(a>0){for(;-1!==r;)s[r].index+=a,r=p(s,r);return}r=p(s,r)}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(r,a.firstChild);const e=new Set;e.add(r),u(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const U={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},K=(e,t)=>t!==e&&(t==t||e==e),V={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:K},J="finalized";class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=V){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const s=this[e];this[t]=n,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||V}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(J)||e.finalize(),this[J]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=K){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||U,s="function"==typeof n?n:n.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||U.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=V){const n=this.constructor,s=n._attributeNameForProperty(e,i);if(void 0!==s){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let n=!0;if(void 0!==e){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}W[J]=!0;const Y=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol();class X{constructor(e,t){if(t!==G)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Y?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Q=(e,...t)=>{const i=t.reduce((t,i,n)=>t+(e=>{if(e instanceof X)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[n+1],e[0]);return new X(i,G)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const Z={};class ee extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),n=[];i.forEach(e=>n.unshift(e)),this._styles=n}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Y){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new X(String(t),G)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Y?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Z&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return Z}}function te(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}function ie(e){return document.querySelector("hc-main")?document.querySelector("hc-main").provideHass(e):document.querySelector("home-assistant")?document.querySelector("home-assistant").provideHass(e):void 0}function ne(e,t,i=null){if((e=new Event(e,{bubbles:!0,cancelable:!1,composed:!0})).detail=t||{},i)i.dispatchEvent(e);else{var n=function(){var e=document.querySelector("hc-main");return e?(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("hc-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-view")||e.querySelector("hui-panel-view"):(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=document.querySelector("home-assistant"))&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))&&e.shadowRoot)&&e.querySelector("ha-app-layout"))&&e.querySelector("#view"))&&e.firstElementChild}();n&&n.dispatchEvent(e)}}async function se(e,t,i=!1){let n=e;"string"==typeof t&&(t=t.split(/(\$| )/)),""===t[t.length-1]&&t.pop();for(const[e,s]of t.entries())if(s.trim().length){if(!n)return null;n.localName&&n.localName.includes("-")&&await customElements.whenDefined(n.localName),n.updateComplete&&await n.updateComplete,n="$"===s?i&&e==t.length-1?[n.shadowRoot]:n.shadowRoot:i&&e==t.length-1?n.querySelectorAll(s):n.querySelector(s)}return n}async function oe(e,t=!1){const i=document.querySelector("hc-main")||document.querySelector("home-assistant");ne("hass-more-info",{entityId:e},i);const n=await async function(e,t,i=!1,n=1e4){return Promise.race([se(e,t,i),new Promise((e,t)=>setTimeout(()=>t(new Error("timeout")),n))]).catch(e=>{if(!e.message||"timeout"!==e.message)throw e;return null})}(i,"$ ha-more-info-dialog");return n&&(n.large=t),n}ee.finalized=!0,ee.render=(e,i,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const s=n.scopeName,o=z.has(i),r=q&&11===i.nodeType&&!!i.host,a=r&&!H.has(s),l=a?document.createDocumentFragment():i;if(((e,i,n)=>{let s=z.get(i);void 0===s&&(t(i,i.firstChild),z.set(i,s=new C(Object.assign({templateFactory:I},n))),s.appendInto(i)),s.setValue(e),s.commit()})(e,l,Object.assign({templateFactory:D(s)},n)),a){const e=z.get(l);z.delete(l);const n=e.value instanceof y?e.value.template:void 0;F(s,l,n),t(i,i.firstChild),i.appendChild(l),z.set(i,e)}!o&&r&&window.ShadyCSS.styleElement(i.host)},ee.shadowRootOptions={mode:"open"};const re="lovelace-player-device-id";function ae(){if(!localStorage[re]){const e=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[re]=fully.getDeviceId():localStorage[re]=`${e()}${e()}-${e()}${e()}`}return localStorage[re]}let le=ae();const ce=new URLSearchParams(window.location.search);var de,ue,he,pe;ce.get("deviceID")&&null!==(de=ce.get("deviceID"))&&("clear"===de?localStorage.removeItem(re):localStorage[re]=de,le=ae()),(pe=ue||(ue={})).language="language",pe.system="system",pe.comma_decimal="comma_decimal",pe.decimal_comma="decimal_comma",pe.space_comma="space_comma",pe.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(he||(he={}));var fe=["closed","locked","off"],me=function(e,t,i,n){n=n||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,e.dispatchEvent(s),s},ge=function(e){me(window,"haptic",e)},be=function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),me(window,"location-changed",{replace:i})},ye=function(e,t){return function(e,t,i){void 0===i&&(i=!0);var n,s=function(e){return e.substr(0,e.indexOf("."))}(t),o="group"===s?"homeassistant":s;switch(s){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return e.callService(o,n,{entity_id:t})}(e,t,fe.includes(e.states[t].state))};const ve="SIDEBAR-CARD",we=new Map;let xe=null;function ke(e,t){const i=we.get(e),n=Date.now();if(i&&n-i.timestamp<1e4&&document.contains(i.element))return i.element;const s=t();return s?we.set(e,{element:s,timestamp:n}):we.delete(e),s}function _e(){const e=Date.now();if(xe&&e-xe.timestamp<5e3)return xe.root;const t=function(e){const t=[],i=new WeakSet;for(e?t.push(e):t.push(document.body);t.length;){const e=t.pop();if(!e||i.has(e))continue;i.add(e);let n=null;if(e instanceof ShadowRoot)n=e;else if(e instanceof HTMLElement&&e.shadowRoot)n=e.shadowRoot;else{if(!(e instanceof HTMLElement||e instanceof DocumentFragment))continue;n=e}const s=n.querySelector("hui-root");if(null==s?void 0:s.shadowRoot)return s.shadowRoot;const o=n.querySelectorAll("*"),r=Math.min(o.length,50);for(let e=0;e<r;e++){const i=o[e];t.push(i),i.shadowRoot&&t.push(i.shadowRoot)}}return null}(document.querySelector("home-assistant"));return xe={root:t,timestamp:e},t}function Se(){const e=_e();return e?e.host:null}function $e(){const e=Se();if(e&&e.lovelace){const t=e.lovelace;return t.current_view=e.___curView,t}return null}function Ce(e){return new Promise(t=>setTimeout(t,e))}async function Ee(){let e;for(;!e;)e=$e(),e||await Ce(500);return e}async function Te(e,t,i){var n;const s=await Ee();if(null===(n=null==s?void 0:s.config)||void 0===n?void 0:n.sidebar){!0===Object.assign({},s.config.sidebar).debug&&console.info(`%c${ve}: %c ${e.padEnd(24)} -> %c ${t}`,"color: chartreuse; background: black; font-weight: 700;","color: yellow; background: black; font-weight: 700;","",i)}}async function Me(e,t,i){var n;const s=await Ee();if(null===(n=null==s?void 0:s.config)||void 0===n?void 0:n.sidebar){!0===Object.assign({},s.config.sidebar).debug&&console.error(`%c${ve}: %c ${e.padEnd(24)} -> %c ${t}`,"color: red; background: black; font-weight: 700;","color: white; background: black; font-weight: 700;","color:red",i)}}"undefined"!=typeof window&&window.addEventListener("location-changed",()=>{we.clear(),xe=null});let Ne=null;function Oe(){const e=Date.now();if(Ne&&e-Ne.timestamp<2e3)return Ne.value;let t="0px";const i=Se(),n=null==i?void 0:i.shadowRoot;if(!n)return Ne={value:t,timestamp:e},t;const s=n.getElementById("view");if(s)try{const e=window.getComputedStyle(s);void 0!==e&&(t=e.paddingTop)}catch(e){t="0px"}return Ne={value:t,timestamp:e},t}function Ae(){return ke("sidebar",()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer ha-sidebar"),e})}function Ie(){return ke("appDrawerLayout",()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer"),e=e&&e.shadowRoot,e=e&&e.querySelector(".mdc-drawer-app-content"),e})}function Le(){return ke("appDrawer",()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("ha-drawer"),e=e&&e.shadowRoot,e=e&&e.querySelector(".mdc-drawer"),e})}function ze(e,t=window.location.href){const i=e.replace(/[\[\]]/g,"\\$&"),n=new RegExp("[?&]"+i+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function Pe(e,t){let i=25,n=75,s=!1;const o=Oe();e.width&&("number"==typeof e.width?(i=e.width,n=100-i):"object"==typeof e.width&&(i=e.desktop,n=100-i,s=!0));let r="\n    #customSidebarWrapper { \n      display:flex;\n      flex-direction:row;\n      overflow:hidden;\n    }\n    #customSidebar.hide {\n      display:none!important;\n      width:0!important;\n    }\n    #view.hideSidebar {\n      width:100%!important;\n    }\n  ";return s?t<=e.breakpoints.mobile?r+=`\n        #customSidebar {\n          width:${e.width.mobile}%;\n          overflow:hidden;\n          ${0===e.width.mobile?"display:none;":""}\n          ${e.hideTopMenu?"":"margin-top: calc("+o+" + env(safe-area-inset-top));"}\n        } \n        #view {\n          width:${100-e.width.mobile}%;\n          ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n        }\n      `:t<=e.breakpoints.tablet?r+=`\n        #customSidebar {\n          width:${e.width.tablet}%;\n          overflow:hidden;\n          ${0===e.width.tablet?"display:none;":""}\n          ${e.hideTopMenu?"":"margin-top: calc("+o+" + env(safe-area-inset-top));"}\n        } \n        #view {\n          width:${100-e.width.tablet}%;\n          ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n        }\n      `:r+=`\n        #customSidebar {\n          width:${e.width.desktop}%;\n          overflow:hidden;\n          ${0===e.width.desktop?"display:none;":""}\n          ${e.hideTopMenu?"":"margin-top: calc("+o+" + env(safe-area-inset-top));"}\n        } \n        #view {\n          width:${100-e.width.desktop}%;\n          ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n        }\n      `:r+=`\n      #customSidebar {\n        width:${i}%;\n        overflow:hidden;\n        ${e.hideTopMenu?"":"margin-top: calc("+o+" + env(safe-area-inset-top));"}\n      } \n      #view {\n        width:${n}%;\n        ${e.hideTopMenu?"padding-top:0!important;margin-top:0!important;":""}\n      }\n    `,r}function Re(e,t){if(!e)return;const i=e.querySelector("#customSidebarStyle");if(!i)return;const n=document.body.clientWidth;i.textContent=Pe(t,n);const s=Se(),o=null==s?void 0:s.shadowRoot;if(!o)return void Te("updateStyling","Root/shadowRoot non pronto, skip header/footer");const r=o.querySelector(".header"),a=o.querySelector("ch-footer")||o.querySelector("app-footer"),l=ze("sidebarOff"),c=o.getElementById("view"),d=Oe(),u=document.body.clientWidth;!0===t.hideTopMenu&&!0===t.showTopMenuOnMobile&&u<=t.breakpoints.mobile&&null==l?(r&&(r.style.display="block"),c&&(c.style.minHeight="calc(100vh - "+d+")"),a&&(a.style.display="flex")):!0===t.hideTopMenu&&null==l&&(r&&(r.style.display="none"),a&&(a.style.display="none"),c&&(c.style.minHeight="calc(100vh)"))}function je(e,t,i,n){const s=function(e,t){let i=null;return function(...n){i&&clearTimeout(i),i=setTimeout(()=>e(...n),t)}}(()=>Re(e,t),150);window.addEventListener("resize",s,{passive:!0}),"hideOnPath"in t&&(window.addEventListener("location-changed",()=>{t.hideOnPath.includes(window.location.pathname)?(i.classList.add("hideSidebar"),n.classList.add("hide")):(i.classList.remove("hideSidebar"),n.classList.remove("hide"))}),t.hideOnPath.includes(window.location.pathname)&&(Te("subscribeEvents","Disable sidebar for this path"),i.classList.add("hideSidebar"),n.classList.add("hide")))}function qe(e){const t=Ae(),i=Ie(),n=Le();t&&i&&n&&(e?(t.style.removeProperty("display"),n.style.removeProperty("display"),i.style.removeProperty("margin-left"),i.style.removeProperty("padding-left")):(t.style.display="none",n.style.display="none",i.style.marginLeft="0",i.style.paddingLeft="0"))}function De(){qe(function(){const e=Ae();if(!e)return!1;const t=e.style.display,i=window.getComputedStyle(e).display;return"none"===t||"none"===i}())}function Be(e){const t=_e();if(!t)return;const i=t.querySelector("div.header"),n=t.querySelector("#customHeaderContainer"),s=t.getElementById("view"),o=document.querySelector("#customSidebar .sidebar-inner");if(s||o)if(e){const e=((null==i?void 0:i.getBoundingClientRect().height)||0)+((null==n?void 0:n.getBoundingClientRect().height)||0);s&&(s.style.paddingTop=`${e}px`),o&&(o.style.paddingTop=`${e}px`)}else s&&s.style.removeProperty("padding-top"),o&&o.style.removeProperty("padding-top")}function He(e){const t=_e();if(!t)return;const i=t.querySelector("div.header");if(!i)return;const{mode:n}=function(){var e,t;const i=$e();return{mode:"push"===(null!==(t=null===(e=null==i?void 0:i.config)||void 0===e?void 0:e.header)&&void 0!==t?t:{}).topMenuMode?"push":"overlay"}}();i.style.display=e?"flex":"none",Be("push"===n&&e)}const Fe=new class{constructor(){this.metrics=new Map,this.lastTime=new Map}start(e){this.lastTime.set(e,performance.now())}end(e){const t=this.lastTime.get(e);if(!t)return;const i=performance.now()-t,n=this.metrics.get(e)||[];n.push(i),n.length>50&&n.shift(),this.metrics.set(e,n),i>16&&Math.random()<.1&&console.warn(`[SIDEBAR-CARD] Slow operation: ${e} took ${i.toFixed(2)}ms`)}getAverage(e){const t=this.metrics.get(e);return t&&0!==t.length?t.reduce((e,t)=>e+t,0)/t.length:0}report(){console.group("[SIDEBAR-CARD] Performance Report");for(const[e,t]of this.metrics){const i=this.getAverage(e),n=Math.max(...t);console.log(`${e}: avg=${i.toFixed(2)}ms max=${n.toFixed(2)}ms count=${t.length}`)}console.groupEnd()}};function Ue(){He(function(){const e=_e();if(!e)return!1;const t=e.querySelector("div.header");if(!t)return!1;const i=t.style.display,n=window.getComputedStyle(t).display;return"none"===i||"none"===n}())}"undefined"!=typeof window&&(window.__sidebarPerfMonitor=Fe,console.log("[SIDEBAR-CARD] Performance monitor loaded:",Fe)),"undefined"!=typeof window&&(window.silvioToggleHaSidebar=()=>{try{De()}catch(e){console.error("silvioToggleHaSidebar error",e)}},window.silvioToggleTopMenu=()=>{try{Ue()}catch(e){console.error("silvioToggleTopMenu error",e)}},window.setTopMenuVisible=e=>He(e));const Ke=Symbol.for("yaml.alias"),Ve=Symbol.for("yaml.document"),Je=Symbol.for("yaml.map"),We=Symbol.for("yaml.pair"),Ye=Symbol.for("yaml.scalar"),Ge=Symbol.for("yaml.seq"),Xe=Symbol.for("yaml.node.type"),Qe=e=>!!e&&"object"==typeof e&&e[Xe]===Ke,Ze=e=>!!e&&"object"==typeof e&&e[Xe]===Ve,et=e=>!!e&&"object"==typeof e&&e[Xe]===Je,tt=e=>!!e&&"object"==typeof e&&e[Xe]===We,it=e=>!!e&&"object"==typeof e&&e[Xe]===Ye,nt=e=>!!e&&"object"==typeof e&&e[Xe]===Ge;function st(e){if(e&&"object"==typeof e)switch(e[Xe]){case Je:case Ge:return!0}return!1}function ot(e){if(e&&"object"==typeof e)switch(e[Xe]){case Ke:case Je:case Ye:case Ge:return!0}return!1}const rt=e=>(it(e)||st(e))&&!!e.anchor,at=Symbol("break visit"),lt=Symbol("skip children"),ct=Symbol("remove node");function dt(e,t){const i=function(e){if("object"==typeof e&&(e.Collection||e.Node||e.Value))return Object.assign({Alias:e.Node,Map:e.Node,Scalar:e.Node,Seq:e.Node},e.Value&&{Map:e.Value,Scalar:e.Value,Seq:e.Value},e.Collection&&{Map:e.Collection,Seq:e.Collection},e);return e}(t);if(Ze(e)){ut(null,e.contents,i,Object.freeze([e]))===ct&&(e.contents=null)}else ut(null,e,i,Object.freeze([]))}function ut(e,t,i,n){const s=function(e,t,i,n){return"function"==typeof i?i(e,t,n):et(t)?i.Map?.(e,t,n):nt(t)?i.Seq?.(e,t,n):tt(t)?i.Pair?.(e,t,n):it(t)?i.Scalar?.(e,t,n):Qe(t)?i.Alias?.(e,t,n):void 0}(e,t,i,n);if(ot(s)||tt(s))return function(e,t,i){const n=t[t.length-1];if(st(n))n.items[e]=i;else if(tt(n))"key"===e?n.key=i:n.value=i;else{if(!Ze(n)){const e=Qe(n)?"alias":"scalar";throw new Error(`Cannot replace node with ${e} parent`)}n.contents=i}}(e,n,s),ut(e,s,i,n);if("symbol"!=typeof s)if(st(t)){n=Object.freeze(n.concat(t));for(let e=0;e<t.items.length;++e){const s=ut(e,t.items[e],i,n);if("number"==typeof s)e=s-1;else{if(s===at)return at;s===ct&&(t.items.splice(e,1),e-=1)}}}else if(tt(t)){n=Object.freeze(n.concat(t));const e=ut("key",t.key,i,n);if(e===at)return at;e===ct&&(t.key=null);const s=ut("value",t.value,i,n);if(s===at)return at;s===ct&&(t.value=null)}return s}dt.BREAK=at,dt.SKIP=lt,dt.REMOVE=ct;const ht={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},pt=e=>e.replace(/[!,[\]{}]/g,e=>ht[e]);class ft{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},ft.defaultYaml,e),this.tags=Object.assign({},ft.defaultTags,t)}clone(){const e=new ft(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new ft(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:ft.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},ft.defaultTags)}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:ft.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},ft.defaultTags),this.atNextDocument=!1);const i=e.trim().split(/[ \t]+/),n=i.shift();switch(n){case"%TAG":{if(2!==i.length&&(t(0,"%TAG directive should contain exactly two parts"),i.length<2))return!1;const[e,n]=i;return this.tags[e]=n,!0}case"%YAML":{if(this.yaml.explicit=!0,1!==i.length)return t(0,"%YAML directive should contain exactly one part"),!1;const[e]=i;if("1.1"===e||"1.2"===e)return this.yaml.version=e,!0;return t(6,`Unsupported YAML version ${e}`,/^\d+\.\d+$/.test(e)),!1}default:return t(0,`Unknown directive ${n}`,!0),!1}}tagName(e,t){if("!"===e)return"!";if("!"!==e[0])return t(`Not a valid tag: ${e}`),null;if("<"===e[1]){const i=e.slice(2,-1);return"!"===i||"!!"===i?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(">"!==e[e.length-1]&&t("Verbatim tags must end with a >"),i)}const[,i,n]=e.match(/^(.*!)([^!]*)$/s);n||t(`The ${e} tag has no suffix`);const s=this.tags[i];if(s)try{return s+decodeURIComponent(n)}catch(e){return t(String(e)),null}return"!"===i?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,i]of Object.entries(this.tags))if(e.startsWith(i))return t+pt(e.substring(i.length));return"!"===e[0]?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],i=Object.entries(this.tags);let n;if(e&&i.length>0&&ot(e.contents)){const t={};dt(e.contents,(e,i)=>{ot(i)&&i.tag&&(t[i.tag]=!0)}),n=Object.keys(t)}else n=[];for(const[s,o]of i)"!!"===s&&"tag:yaml.org,2002:"===o||e&&!n.some(e=>e.startsWith(o))||t.push(`%TAG ${s} ${o}`);return t.join("\n")}}function mt(e){if(/[\x00-\x19\s,[\]{}]/.test(e)){const t=JSON.stringify(e);throw new Error(`Anchor must not contain whitespace or control characters: ${t}`)}return!0}function gt(e){const t=new Set;return dt(e,{Value(e,i){i.anchor&&t.add(i.anchor)}}),t}function bt(e,t){for(let i=1;;++i){const n=`${e}${i}`;if(!t.has(n))return n}}function yt(e,t,i,n){if(n&&"object"==typeof n)if(Array.isArray(n))for(let t=0,i=n.length;t<i;++t){const i=n[t],s=yt(e,n,String(t),i);void 0===s?delete n[t]:s!==i&&(n[t]=s)}else if(n instanceof Map)for(const t of Array.from(n.keys())){const i=n.get(t),s=yt(e,n,t,i);void 0===s?n.delete(t):s!==i&&n.set(t,s)}else if(n instanceof Set)for(const t of Array.from(n)){const i=yt(e,n,t,t);void 0===i?n.delete(t):i!==t&&(n.delete(t),n.add(i))}else for(const[t,i]of Object.entries(n)){const s=yt(e,n,t,i);void 0===s?delete n[t]:s!==i&&(n[t]=s)}return e.call(t,i,n)}function vt(e,t,i){if(Array.isArray(e))return e.map((e,t)=>vt(e,String(t),i));if(e&&"function"==typeof e.toJSON){if(!i||!rt(e))return e.toJSON(t,i);const n={aliasCount:0,count:1,res:void 0};i.anchors.set(e,n),i.onCreate=e=>{n.res=e,delete i.onCreate};const s=e.toJSON(t,i);return i.onCreate&&i.onCreate(s),s}return"bigint"!=typeof e||i?.keep?e:Number(e)}ft.defaultYaml={explicit:!1,version:"1.2"},ft.defaultTags={"!!":"tag:yaml.org,2002:"};class wt{constructor(e){Object.defineProperty(this,Xe,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:i,onAnchor:n,reviver:s}={}){if(!Ze(e))throw new TypeError("A document argument is required");const o={anchors:new Map,doc:e,keep:!0,mapAsMap:!0===t,mapKeyWarned:!1,maxAliasCount:"number"==typeof i?i:100},r=vt(this,"",o);if("function"==typeof n)for(const{count:e,res:t}of o.anchors.values())n(t,e);return"function"==typeof s?yt(s,{"":r},"",r):r}}class xt extends wt{constructor(e){super(Ke),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let i,n;t?.aliasResolveCache?i=t.aliasResolveCache:(i=[],dt(e,{Node:(e,t)=>{(Qe(t)||rt(t))&&i.push(t)}}),t&&(t.aliasResolveCache=i));for(const e of i){if(e===this)break;e.anchor===this.source&&(n=e)}return n}toJSON(e,t){if(!t)return{source:this.source};const{anchors:i,doc:n,maxAliasCount:s}=t,o=this.resolve(n,t);if(!o){const e=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(e)}let r=i.get(o);if(r||(vt(o,null,t),r=i.get(o)),void 0===r?.res){throw new ReferenceError("This should not happen: Alias anchor was not resolved?")}if(s>=0&&(r.count+=1,0===r.aliasCount&&(r.aliasCount=kt(n,o,i)),r.count*r.aliasCount>s)){throw new ReferenceError("Excessive alias count indicates a resource exhaustion attack")}return r.res}toString(e,t,i){const n=`*${this.source}`;if(e){if(mt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const e=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(e)}if(e.implicitKey)return`${n} `}return n}}function kt(e,t,i){if(Qe(t)){const n=t.resolve(e),s=i&&n&&i.get(n);return s?s.count*s.aliasCount:0}if(st(t)){let n=0;for(const s of t.items){const t=kt(e,s,i);t>n&&(n=t)}return n}if(tt(t)){const n=kt(e,t.key,i),s=kt(e,t.value,i);return Math.max(n,s)}return 1}const _t=e=>!e||"function"!=typeof e&&"object"!=typeof e;class St extends wt{constructor(e){super(Ye),this.value=e}toJSON(e,t){return t?.keep?this.value:vt(this.value,e,t)}toString(){return String(this.value)}}St.BLOCK_FOLDED="BLOCK_FOLDED",St.BLOCK_LITERAL="BLOCK_LITERAL",St.PLAIN="PLAIN",St.QUOTE_DOUBLE="QUOTE_DOUBLE",St.QUOTE_SINGLE="QUOTE_SINGLE";function $t(e,t,i){if(Ze(e)&&(e=e.contents),ot(e))return e;if(tt(e)){const t=i.schema[Je].createNode?.(i.schema,null,i);return t.items.push(e),t}(e instanceof String||e instanceof Number||e instanceof Boolean||"undefined"!=typeof BigInt&&e instanceof BigInt)&&(e=e.valueOf());const{aliasDuplicateObjects:n,onAnchor:s,onTagObj:o,schema:r,sourceObjects:a}=i;let l;if(n&&e&&"object"==typeof e){if(l=a.get(e),l)return l.anchor??(l.anchor=s(e)),new xt(l.anchor);l={anchor:null,node:null},a.set(e,l)}t?.startsWith("!!")&&(t="tag:yaml.org,2002:"+t.slice(2));let c=function(e,t,i){if(t){const e=i.filter(e=>e.tag===t),n=e.find(e=>!e.format)??e[0];if(!n)throw new Error(`Tag ${t} not found`);return n}return i.find(t=>t.identify?.(e)&&!t.format)}(e,t,r.tags);if(!c){if(e&&"function"==typeof e.toJSON&&(e=e.toJSON()),!e||"object"!=typeof e){const t=new St(e);return l&&(l.node=t),t}c=e instanceof Map?r[Je]:Symbol.iterator in Object(e)?r[Ge]:r[Je]}o&&(o(c),delete i.onTagObj);const d=c?.createNode?c.createNode(i.schema,e,i):"function"==typeof c?.nodeClass?.from?c.nodeClass.from(i.schema,e,i):new St(e);return t?d.tag=t:c.default||(d.tag=c.tag),l&&(l.node=d),d}function Ct(e,t,i){let n=i;for(let e=t.length-1;e>=0;--e){const i=t[e];if("number"==typeof i&&Number.isInteger(i)&&i>=0){const e=[];e[i]=n,n=e}else n=new Map([[i,n]])}return $t(n,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:e,sourceObjects:new Map})}const Et=e=>null==e||"object"==typeof e&&!!e[Symbol.iterator]().next().done;class Tt extends wt{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(t=>ot(t)||tt(t)?t.clone(e):t),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Et(e))this.add(t);else{const[i,...n]=e,s=this.get(i,!0);if(st(s))s.addIn(n,t);else{if(void 0!==s||!this.schema)throw new Error(`Expected YAML collection at ${i}. Remaining path: ${n}`);this.set(i,Ct(this.schema,n,t))}}}deleteIn(e){const[t,...i]=e;if(0===i.length)return this.delete(t);const n=this.get(t,!0);if(st(n))return n.deleteIn(i);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${i}`)}getIn(e,t){const[i,...n]=e,s=this.get(i,!0);return 0===n.length?!t&&it(s)?s.value:s:st(s)?s.getIn(n,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!tt(t))return!1;const i=t.value;return null==i||e&&it(i)&&null==i.value&&!i.commentBefore&&!i.comment&&!i.tag})}hasIn(e){const[t,...i]=e;if(0===i.length)return this.has(t);const n=this.get(t,!0);return!!st(n)&&n.hasIn(i)}setIn(e,t){const[i,...n]=e;if(0===n.length)this.set(i,t);else{const e=this.get(i,!0);if(st(e))e.setIn(n,t);else{if(void 0!==e||!this.schema)throw new Error(`Expected YAML collection at ${i}. Remaining path: ${n}`);this.set(i,Ct(this.schema,n,t))}}}}const Mt=e=>e.replace(/^(?!$)(?: $)?/gm,"#");function Nt(e,t){return/^\n+$/.test(e)?e.substring(1):t?e.replace(/^(?! *$)/gm,t):e}const Ot=(e,t,i)=>e.endsWith("\n")?Nt(i,t):i.includes("\n")?"\n"+Nt(i,t):(e.endsWith(" ")?"":" ")+i,At="flow",It="block",Lt="quoted";function zt(e,t,i="flow",{indentAtStart:n,lineWidth:s=80,minContentWidth:o=20,onFold:r,onOverflow:a}={}){if(!s||s<0)return e;s<o&&(o=0);const l=Math.max(1+o,1+s-t.length);if(e.length<=l)return e;const c=[],d={};let u,h,p=s-t.length;"number"==typeof n&&(n>s-Math.max(2,o)?c.push(0):p=s-n);let f=!1,m=-1,g=-1,b=-1;i===It&&(m=Pt(e,m,t.length),-1!==m&&(p=m+l));for(let n;n=e[m+=1];){if(i===Lt&&"\\"===n){switch(g=m,e[m+1]){case"x":m+=3;break;case"u":m+=5;break;case"U":m+=9;break;default:m+=1}b=m}if("\n"===n)i===It&&(m=Pt(e,m,t.length)),p=m+t.length+l,u=void 0;else{if(" "===n&&h&&" "!==h&&"\n"!==h&&"\t"!==h){const t=e[m+1];t&&" "!==t&&"\n"!==t&&"\t"!==t&&(u=m)}if(m>=p)if(u)c.push(u),p=u+l,u=void 0;else if(i===Lt){for(;" "===h||"\t"===h;)h=n,n=e[m+=1],f=!0;const t=m>b+1?m-2:g-1;if(d[t])return e;c.push(t),d[t]=!0,p=t+l,u=void 0}else f=!0}h=n}if(f&&a&&a(),0===c.length)return e;r&&r();let y=e.slice(0,c[0]);for(let n=0;n<c.length;++n){const s=c[n],o=c[n+1]||e.length;0===s?y=`\n${t}${e.slice(0,o)}`:(i===Lt&&d[s]&&(y+=`${e[s]}\\`),y+=`\n${t}${e.slice(s+1,o)}`)}return y}function Pt(e,t,i){let n=t,s=t+1,o=e[s];for(;" "===o||"\t"===o;)if(t<s+i)o=e[++t];else{do{o=e[++t]}while(o&&"\n"!==o);n=t,s=t+1,o=e[s]}return n}const Rt=(e,t)=>({indentAtStart:t?e.indent.length:e.indentAtStart,lineWidth:e.options.lineWidth,minContentWidth:e.options.minContentWidth}),jt=e=>/^(%|---|\.\.\.)/m.test(e);function qt(e,t){const i=JSON.stringify(e);if(t.options.doubleQuotedAsJSON)return i;const{implicitKey:n}=t,s=t.options.doubleQuotedMinMultiLineLength,o=t.indent||(jt(e)?"  ":"");let r="",a=0;for(let e=0,t=i[e];t;t=i[++e])if(" "===t&&"\\"===i[e+1]&&"n"===i[e+2]&&(r+=i.slice(a,e)+"\\ ",e+=1,a=e,t="\\"),"\\"===t)switch(i[e+1]){case"u":{r+=i.slice(a,e);const t=i.substr(e+2,4);switch(t){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:"00"===t.substr(0,2)?r+="\\x"+t.substr(2):r+=i.substr(e,6)}e+=5,a=e+1}break;case"n":if(n||'"'===i[e+2]||i.length<s)e+=1;else{for(r+=i.slice(a,e)+"\n\n";"\\"===i[e+2]&&"n"===i[e+3]&&'"'!==i[e+4];)r+="\n",e+=2;r+=o," "===i[e+2]&&(r+="\\"),e+=1,a=e+1}break;default:e+=1}return r=a?r+i.slice(a):i,n?r:zt(r,o,Lt,Rt(t,!1))}function Dt(e,t){if(!1===t.options.singleQuote||t.implicitKey&&e.includes("\n")||/[ \t]\n|\n[ \t]/.test(e))return qt(e,t);const i=t.indent||(jt(e)?"  ":""),n="'"+e.replace(/'/g,"''").replace(/\n+/g,`$&\n${i}`)+"'";return t.implicitKey?n:zt(n,i,At,Rt(t,!1))}function Bt(e,t){const{singleQuote:i}=t.options;let n;if(!1===i)n=qt;else{const t=e.includes('"'),s=e.includes("'");n=t&&!s?Dt:s&&!t?qt:i?Dt:qt}return n(e,t)}let Ht;try{Ht=new RegExp("(^|(?<!\n))\n+(?!\n|$)","g")}catch{Ht=/\n+(?!\n|$)/g}function Ft({comment:e,type:t,value:i},n,s,o){const{blockQuote:r,commentString:a,lineWidth:l}=n.options;if(!r||/\n[\t ]+$/.test(i))return Bt(i,n);const c=n.indent||(n.forceBlockIndent||jt(i)?"  ":""),d="literal"===r||"folded"!==r&&t!==St.BLOCK_FOLDED&&(t===St.BLOCK_LITERAL||!function(e,t,i){if(!t||t<0)return!1;const n=t-i,s=e.length;if(s<=n)return!1;for(let t=0,i=0;t<s;++t)if("\n"===e[t]){if(t-i>n)return!0;if(i=t+1,s-i<=n)return!1}return!0}(i,l,c.length));if(!i)return d?"|\n":">\n";let u,h;for(h=i.length;h>0;--h){const e=i[h-1];if("\n"!==e&&"\t"!==e&&" "!==e)break}let p=i.substring(h);const f=p.indexOf("\n");-1===f?u="-":i===p||f!==p.length-1?(u="+",o&&o()):u="",p&&(i=i.slice(0,-p.length),"\n"===p[p.length-1]&&(p=p.slice(0,-1)),p=p.replace(Ht,`$&${c}`));let m,g=!1,b=-1;for(m=0;m<i.length;++m){const e=i[m];if(" "===e)g=!0;else{if("\n"!==e)break;b=m}}let y=i.substring(0,b<m?b+1:m);y&&(i=i.substring(y.length),y=y.replace(/\n+/g,`$&${c}`));let v=(g?c?"2":"1":"")+u;if(e&&(v+=" "+a(e.replace(/ ?[\r\n]+/g," ")),s&&s()),!d){const e=i.replace(/\n+/g,"\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let s=!1;const o=Rt(n,!0);"folded"!==r&&t!==St.BLOCK_FOLDED&&(o.onOverflow=()=>{s=!0});const a=zt(`${y}${e}${p}`,c,It,o);if(!s)return`>${v}\n${c}${a}`}return`|${v}\n${c}${y}${i=i.replace(/\n+/g,`$&${c}`)}${p}`}function Ut(e,t,i,n){const{implicitKey:s,inFlow:o}=t,r="string"==typeof e.value?e:Object.assign({},e,{value:String(e.value)});let{type:a}=e;a!==St.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(a=St.QUOTE_DOUBLE);const l=e=>{switch(e){case St.BLOCK_FOLDED:case St.BLOCK_LITERAL:return s||o?Bt(r.value,t):Ft(r,t,i,n);case St.QUOTE_DOUBLE:return qt(r.value,t);case St.QUOTE_SINGLE:return Dt(r.value,t);case St.PLAIN:return function(e,t,i,n){const{type:s,value:o}=e,{actualString:r,implicitKey:a,indent:l,indentStep:c,inFlow:d}=t;if(a&&o.includes("\n")||d&&/[[\]{},]/.test(o))return Bt(o,t);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o))return a||d||!o.includes("\n")?Bt(o,t):Ft(e,t,i,n);if(!a&&!d&&s!==St.PLAIN&&o.includes("\n"))return Ft(e,t,i,n);if(jt(o)){if(""===l)return t.forceBlockIndent=!0,Ft(e,t,i,n);if(a&&l===c)return Bt(o,t)}const u=o.replace(/\n+/g,`$&\n${l}`);if(r){const e=e=>e.default&&"tag:yaml.org,2002:str"!==e.tag&&e.test?.test(u),{compat:i,tags:n}=t.doc.schema;if(n.some(e)||i?.some(e))return Bt(o,t)}return a?u:zt(u,l,At,Rt(t,!1))}(r,t,i,n);default:return null}};let c=l(a);if(null===c){const{defaultKeyType:e,defaultStringType:i}=t.options,n=s&&e||i;if(c=l(n),null===c)throw new Error(`Unsupported default string type ${n}`)}return c}function Kt(e,t){const i=Object.assign({blockQuote:!0,commentString:Mt,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},e.schema.toStringOptions,t);let n;switch(i.collectionStyle){case"block":n=!1;break;case"flow":n=!0;break;default:n=null}return{anchors:new Set,doc:e,flowCollectionPadding:i.flowCollectionPadding?" ":"",indent:"",indentStep:"number"==typeof i.indent?" ".repeat(i.indent):"  ",inFlow:n,options:i}}function Vt(e,t,i,n){if(tt(e))return e.toString(t,i,n);if(Qe(e)){if(t.doc.directives)return e.toString(t);if(t.resolvedAliases?.has(e))throw new TypeError("Cannot stringify circular structure without alias nodes");t.resolvedAliases?t.resolvedAliases.add(e):t.resolvedAliases=new Set([e]),e=e.resolve(t.doc)}let s;const o=ot(e)?e:t.doc.createNode(e,{onTagObj:e=>s=e});s??(s=function(e,t){if(t.tag){const i=e.filter(e=>e.tag===t.tag);if(i.length>0)return i.find(e=>e.format===t.format)??i[0]}let i,n;if(it(t)){n=t.value;let s=e.filter(e=>e.identify?.(n));if(s.length>1){const e=s.filter(e=>e.test);e.length>0&&(s=e)}i=s.find(e=>e.format===t.format)??s.find(e=>!e.format)}else n=t,i=e.find(e=>e.nodeClass&&n instanceof e.nodeClass);if(!i)throw new Error(`Tag not resolved for ${n?.constructor?.name??(null===n?"null":typeof n)} value`);return i}(t.doc.schema.tags,o));const r=function(e,t,{anchors:i,doc:n}){if(!n.directives)return"";const s=[],o=(it(e)||st(e))&&e.anchor;o&&mt(o)&&(i.add(o),s.push(`&${o}`));const r=e.tag??(t.default?null:t.tag);return r&&s.push(n.directives.tagString(r)),s.join(" ")}(o,s,t);r.length>0&&(t.indentAtStart=(t.indentAtStart??0)+r.length+1);const a="function"==typeof s.stringify?s.stringify(o,t,i,n):it(o)?Ut(o,t,i,n):o.toString(t,i,n);return r?it(o)||"{"===a[0]||"["===a[0]?`${r} ${a}`:`${r}\n${t.indent}${a}`:a}function Jt(e,t){"debug"!==e&&"warn"!==e||console.warn(t)}const Wt="<<",Yt={identify:e=>e===Wt||"symbol"==typeof e&&e.description===Wt,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new St(Symbol(Wt)),{addToJSMap:Gt}),stringify:()=>Wt};function Gt(e,t,i){if(i=e&&Qe(i)?i.resolve(e.doc):i,nt(i))for(const n of i.items)Xt(e,t,n);else if(Array.isArray(i))for(const n of i)Xt(e,t,n);else Xt(e,t,i)}function Xt(e,t,i){const n=e&&Qe(i)?i.resolve(e.doc):i;if(!et(n))throw new Error("Merge sources must be maps or map aliases");const s=n.toJSON(null,e,Map);for(const[e,i]of s)t instanceof Map?t.has(e)||t.set(e,i):t instanceof Set?t.add(e):Object.prototype.hasOwnProperty.call(t,e)||Object.defineProperty(t,e,{value:i,writable:!0,enumerable:!0,configurable:!0});return t}function Qt(e,t,{key:i,value:n}){if(ot(i)&&i.addToJSMap)i.addToJSMap(e,t,n);else if(((e,t)=>(Yt.identify(t)||it(t)&&(!t.type||t.type===St.PLAIN)&&Yt.identify(t.value))&&e?.doc.schema.tags.some(e=>e.tag===Yt.tag&&e.default))(e,i))Gt(e,t,n);else{const s=vt(i,"",e);if(t instanceof Map)t.set(s,vt(n,s,e));else if(t instanceof Set)t.add(s);else{const o=function(e,t,i){if(null===t)return"";if("object"!=typeof t)return String(t);if(ot(e)&&i?.doc){const t=Kt(i.doc,{});t.anchors=new Set;for(const e of i.anchors.keys())t.anchors.add(e.anchor);t.inFlow=!0,t.inStringifyKey=!0;const n=e.toString(t);if(!i.mapKeyWarned){let e=JSON.stringify(n);e.length>40&&(e=e.substring(0,36)+'..."'),Jt(i.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${e}. Set mapAsMap: true to use object keys.`),i.mapKeyWarned=!0}return n}return JSON.stringify(t)}(i,s,e),r=vt(n,o,e);o in t?Object.defineProperty(t,o,{value:r,writable:!0,enumerable:!0,configurable:!0}):t[o]=r}}return t}function Zt(e,t,i){const n=$t(e,void 0,i),s=$t(t,void 0,i);return new ei(n,s)}class ei{constructor(e,t=null){Object.defineProperty(this,Xe,{value:We}),this.key=e,this.value=t}clone(e){let{key:t,value:i}=this;return ot(t)&&(t=t.clone(e)),ot(i)&&(i=i.clone(e)),new ei(t,i)}toJSON(e,t){return Qt(t,t?.mapAsMap?new Map:{},this)}toString(e,t,i){return e?.doc?function({key:e,value:t},i,n,s){const{allNullValues:o,doc:r,indent:a,indentStep:l,options:{commentString:c,indentSeq:d,simpleKeys:u}}=i;let h=ot(e)&&e.comment||null;if(u){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(st(e)||!ot(e)&&"object"==typeof e)throw new Error("With simple keys, collection cannot be used as a key value")}let p=!u&&(!e||h&&null==t&&!i.inFlow||st(e)||(it(e)?e.type===St.BLOCK_FOLDED||e.type===St.BLOCK_LITERAL:"object"==typeof e));i=Object.assign({},i,{allNullValues:!1,implicitKey:!p&&(u||!o),indent:a+l});let f,m,g,b=!1,y=!1,v=Vt(e,i,()=>b=!0,()=>y=!0);if(!p&&!i.inFlow&&v.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");p=!0}if(i.inFlow){if(o||null==t)return b&&n&&n(),""===v?"?":p?`? ${v}`:v}else if(o&&!u||null==t&&p)return v=`? ${v}`,h&&!b?v+=Ot(v,i.indent,c(h)):y&&s&&s(),v;b&&(h=null),p?(h&&(v+=Ot(v,i.indent,c(h))),v=`? ${v}\n${a}:`):(v=`${v}:`,h&&(v+=Ot(v,i.indent,c(h)))),ot(t)?(f=!!t.spaceBefore,m=t.commentBefore,g=t.comment):(f=!1,m=null,g=null,t&&"object"==typeof t&&(t=r.createNode(t))),i.implicitKey=!1,p||h||!it(t)||(i.indentAtStart=v.length+1),y=!1,d||!(l.length>=2)||i.inFlow||p||!nt(t)||t.flow||t.tag||t.anchor||(i.indent=i.indent.substring(2));let w=!1;const x=Vt(t,i,()=>w=!0,()=>y=!0);let k=" ";if(h||f||m)k=f?"\n":"",m&&(k+=`\n${Nt(c(m),i.indent)}`),""!==x||i.inFlow?k+=`\n${i.indent}`:"\n"===k&&g&&(k="\n\n");else if(!p&&st(t)){const e=x[0],n=x.indexOf("\n"),s=-1!==n,o=i.inFlow??t.flow??0===t.items.length;if(s||!o){let t=!1;if(s&&("&"===e||"!"===e)){let i=x.indexOf(" ");"&"===e&&-1!==i&&i<n&&"!"===x[i+1]&&(i=x.indexOf(" ",i+1)),(-1===i||n<i)&&(t=!0)}t||(k=`\n${i.indent}`)}}else""!==x&&"\n"!==x[0]||(k="");return v+=k+x,i.inFlow?w&&n&&n():g&&!w?v+=Ot(v,i.indent,c(g)):y&&s&&s(),v}(this,e,t,i):JSON.stringify(this)}}function ti(e,t,i){return(t.inFlow??e.flow?ni:ii)(e,t,i)}function ii({comment:e,items:t},i,{blockItemPrefix:n,flowChars:s,itemIndent:o,onChompKeep:r,onComment:a}){const{indent:l,options:{commentString:c}}=i,d=Object.assign({},i,{indent:o,type:null});let u=!1;const h=[];for(let e=0;e<t.length;++e){const s=t[e];let r=null;if(ot(s))!u&&s.spaceBefore&&h.push(""),si(i,h,s.commentBefore,u),s.comment&&(r=s.comment);else if(tt(s)){const e=ot(s.key)?s.key:null;e&&(!u&&e.spaceBefore&&h.push(""),si(i,h,e.commentBefore,u))}u=!1;let a=Vt(s,d,()=>r=null,()=>u=!0);r&&(a+=Ot(a,o,c(r))),u&&r&&(u=!1),h.push(n+a)}let p;if(0===h.length)p=s.start+s.end;else{p=h[0];for(let e=1;e<h.length;++e){const t=h[e];p+=t?`\n${l}${t}`:"\n"}}return e?(p+="\n"+Nt(c(e),l),a&&a()):u&&r&&r(),p}function ni({items:e},t,{flowChars:i,itemIndent:n}){const{indent:s,indentStep:o,flowCollectionPadding:r,options:{commentString:a}}=t;n+=o;const l=Object.assign({},t,{indent:n,inFlow:!0,type:null});let c=!1,d=0;const u=[];for(let i=0;i<e.length;++i){const s=e[i];let o=null;if(ot(s))s.spaceBefore&&u.push(""),si(t,u,s.commentBefore,!1),s.comment&&(o=s.comment);else if(tt(s)){const e=ot(s.key)?s.key:null;e&&(e.spaceBefore&&u.push(""),si(t,u,e.commentBefore,!1),e.comment&&(c=!0));const i=ot(s.value)?s.value:null;i?(i.comment&&(o=i.comment),i.commentBefore&&(c=!0)):null==s.value&&e?.comment&&(o=e.comment)}o&&(c=!0);let r=Vt(s,l,()=>o=null);i<e.length-1&&(r+=","),o&&(r+=Ot(r,n,a(o))),!c&&(u.length>d||r.includes("\n"))&&(c=!0),u.push(r),d=u.length}const{start:h,end:p}=i;if(0===u.length)return h+p;if(!c){const e=u.reduce((e,t)=>e+t.length+2,2);c=t.options.lineWidth>0&&e>t.options.lineWidth}if(c){let e=h;for(const t of u)e+=t?`\n${o}${s}${t}`:"\n";return`${e}\n${s}${p}`}return`${h}${r}${u.join(" ")}${r}${p}`}function si({indent:e,options:{commentString:t}},i,n,s){if(n&&s&&(n=n.replace(/^\n+/,"")),n){const s=Nt(t(n),e);i.push(s.trimStart())}}function oi(e,t){const i=it(t)?t.value:t;for(const n of e)if(tt(n)){if(n.key===t||n.key===i)return n;if(it(n.key)&&n.key.value===i)return n}}class ri extends Tt{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Je,e),this.items=[]}static from(e,t,i){const{keepUndefined:n,replacer:s}=i,o=new this(e),r=(e,r)=>{if("function"==typeof s)r=s.call(t,e,r);else if(Array.isArray(s)&&!s.includes(e))return;(void 0!==r||n)&&o.items.push(Zt(e,r,i))};if(t instanceof Map)for(const[e,i]of t)r(e,i);else if(t&&"object"==typeof t)for(const e of Object.keys(t))r(e,t[e]);return"function"==typeof e.sortMapEntries&&o.items.sort(e.sortMapEntries),o}add(e,t){let i;i=tt(e)?e:e&&"object"==typeof e&&"key"in e?new ei(e.key,e.value):new ei(e,e?.value);const n=oi(this.items,i.key),s=this.schema?.sortMapEntries;if(n){if(!t)throw new Error(`Key ${i.key} already set`);it(n.value)&&_t(i.value)?n.value.value=i.value:n.value=i.value}else if(s){const e=this.items.findIndex(e=>s(i,e)<0);-1===e?this.items.push(i):this.items.splice(e,0,i)}else this.items.push(i)}delete(e){const t=oi(this.items,e);if(!t)return!1;return this.items.splice(this.items.indexOf(t),1).length>0}get(e,t){const i=oi(this.items,e),n=i?.value;return(!t&&it(n)?n.value:n)??void 0}has(e){return!!oi(this.items,e)}set(e,t){this.add(new ei(e,t),!0)}toJSON(e,t,i){const n=i?new i:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(n);for(const e of this.items)Qt(t,n,e);return n}toString(e,t,i){if(!e)return JSON.stringify(this);for(const e of this.items)if(!tt(e))throw new Error(`Map items must all be pairs; found ${JSON.stringify(e)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),ti(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:i,onComment:t})}}const ai={collection:"map",default:!0,nodeClass:ri,tag:"tag:yaml.org,2002:map",resolve:(e,t)=>(et(e)||t("Expected a mapping for this tag"),e),createNode:(e,t,i)=>ri.from(e,t,i)};class li extends Tt{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Ge,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=ci(e);if("number"!=typeof t)return!1;return this.items.splice(t,1).length>0}get(e,t){const i=ci(e);if("number"!=typeof i)return;const n=this.items[i];return!t&&it(n)?n.value:n}has(e){const t=ci(e);return"number"==typeof t&&t<this.items.length}set(e,t){const i=ci(e);if("number"!=typeof i)throw new Error(`Expected a valid index, not ${e}.`);const n=this.items[i];it(n)&&_t(t)?n.value=t:this.items[i]=t}toJSON(e,t){const i=[];t?.onCreate&&t.onCreate(i);let n=0;for(const e of this.items)i.push(vt(e,String(n++),t));return i}toString(e,t,i){return e?ti(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:i,onComment:t}):JSON.stringify(this)}static from(e,t,i){const{replacer:n}=i,s=new this(e);if(t&&Symbol.iterator in Object(t)){let e=0;for(let o of t){if("function"==typeof n){const i=t instanceof Set?o:String(e++);o=n.call(t,i,o)}s.items.push($t(o,void 0,i))}}return s}}function ci(e){let t=it(e)?e.value:e;return t&&"string"==typeof t&&(t=Number(t)),"number"==typeof t&&Number.isInteger(t)&&t>=0?t:null}const di={collection:"seq",default:!0,nodeClass:li,tag:"tag:yaml.org,2002:seq",resolve:(e,t)=>(nt(e)||t("Expected a sequence for this tag"),e),createNode:(e,t,i)=>li.from(e,t,i)},ui={identify:e=>"string"==typeof e,default:!0,tag:"tag:yaml.org,2002:str",resolve:e=>e,stringify:(e,t,i,n)=>Ut(e,t=Object.assign({actualString:!0},t),i,n)},hi={identify:e=>null==e,createNode:()=>new St(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new St(null),stringify:({source:e},t)=>"string"==typeof e&&hi.test.test(e)?e:t.options.nullStr},pi={identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:e=>new St("t"===e[0]||"T"===e[0]),stringify({source:e,value:t},i){if(e&&pi.test.test(e)){if(t===("t"===e[0]||"T"===e[0]))return e}return t?i.options.trueStr:i.options.falseStr}};function fi({format:e,minFractionDigits:t,tag:i,value:n}){if("bigint"==typeof n)return String(n);const s="number"==typeof n?n:Number(n);if(!isFinite(s))return isNaN(s)?".nan":s<0?"-.inf":".inf";let o=Object.is(n,-0)?"-0":JSON.stringify(n);if(!e&&t&&(!i||"tag:yaml.org,2002:float"===i)&&/^\d/.test(o)){let e=o.indexOf(".");e<0&&(e=o.length,o+=".");let i=t-(o.length-e-1);for(;i-- >0;)o+="0"}return o}const mi={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:e=>"nan"===e.slice(-3).toLowerCase()?NaN:"-"===e[0]?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:fi},gi={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:e=>parseFloat(e),stringify(e){const t=Number(e.value);return isFinite(t)?t.toExponential():fi(e)}},bi={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(e){const t=new St(parseFloat(e)),i=e.indexOf(".");return-1!==i&&"0"===e[e.length-1]&&(t.minFractionDigits=e.length-i-1),t},stringify:fi},yi=e=>"bigint"==typeof e||Number.isInteger(e),vi=(e,t,i,{intAsBigInt:n})=>n?BigInt(e):parseInt(e.substring(t),i);function wi(e,t,i){const{value:n}=e;return yi(n)&&n>=0?i+n.toString(t):fi(e)}const xi={identify:e=>yi(e)&&e>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(e,t,i)=>vi(e,2,8,i),stringify:e=>wi(e,8,"0o")},ki={identify:yi,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(e,t,i)=>vi(e,0,10,i),stringify:fi},_i={identify:e=>yi(e)&&e>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(e,t,i)=>vi(e,2,16,i),stringify:e=>wi(e,16,"0x")},Si=[ai,di,ui,hi,pi,xi,ki,_i,mi,gi,bi];function $i(e){return"bigint"==typeof e||Number.isInteger(e)}const Ci=({value:e})=>JSON.stringify(e),Ei=[ai,di].concat([{identify:e=>"string"==typeof e,default:!0,tag:"tag:yaml.org,2002:str",resolve:e=>e,stringify:Ci},{identify:e=>null==e,createNode:()=>new St(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Ci},{identify:e=>"boolean"==typeof e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:e=>"true"===e,stringify:Ci},{identify:$i,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(e,t,{intAsBigInt:i})=>i?BigInt(e):parseInt(e,10),stringify:({value:e})=>$i(e)?e.toString():JSON.stringify(e)},{identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:e=>parseFloat(e),stringify:Ci}],{default:!0,tag:"",test:/^/,resolve:(e,t)=>(t(`Unresolved plain scalar ${JSON.stringify(e)}`),e)}),Ti={identify:e=>e instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(e,t){if("function"==typeof atob){const t=atob(e.replace(/[\n\r]/g,"")),i=new Uint8Array(t.length);for(let e=0;e<t.length;++e)i[e]=t.charCodeAt(e);return i}return t("This environment does not support reading binary tags; either Buffer or atob is required"),e},stringify({comment:e,type:t,value:i},n,s,o){if(!i)return"";const r=i;let a;if("function"!=typeof btoa)throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");{let e="";for(let t=0;t<r.length;++t)e+=String.fromCharCode(r[t]);a=btoa(e)}if(t??(t=St.BLOCK_LITERAL),t!==St.QUOTE_DOUBLE){const e=Math.max(n.options.lineWidth-n.indent.length,n.options.minContentWidth),i=Math.ceil(a.length/e),s=new Array(i);for(let t=0,n=0;t<i;++t,n+=e)s[t]=a.substr(n,e);a=s.join(t===St.BLOCK_LITERAL?"\n":" ")}return Ut({comment:e,type:t,value:a},n,s,o)}};function Mi(e,t){if(nt(e))for(let i=0;i<e.items.length;++i){let n=e.items[i];if(!tt(n)){if(et(n)){n.items.length>1&&t("Each pair must have its own sequence indicator");const e=n.items[0]||new ei(new St(null));if(n.commentBefore&&(e.key.commentBefore=e.key.commentBefore?`${n.commentBefore}\n${e.key.commentBefore}`:n.commentBefore),n.comment){const t=e.value??e.key;t.comment=t.comment?`${n.comment}\n${t.comment}`:n.comment}n=e}e.items[i]=tt(n)?n:new ei(n)}}else t("Expected a sequence for this tag");return e}function Ni(e,t,i){const{replacer:n}=i,s=new li(e);s.tag="tag:yaml.org,2002:pairs";let o=0;if(t&&Symbol.iterator in Object(t))for(let e of t){let r,a;if("function"==typeof n&&(e=n.call(t,String(o++),e)),Array.isArray(e)){if(2!==e.length)throw new TypeError(`Expected [key, value] tuple: ${e}`);r=e[0],a=e[1]}else if(e&&e instanceof Object){const t=Object.keys(e);if(1!==t.length)throw new TypeError(`Expected tuple with one key, not ${t.length} keys`);r=t[0],a=e[r]}else r=e;s.items.push(Zt(r,a,i))}return s}const Oi={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Mi,createNode:Ni};class Ai extends li{constructor(){super(),this.add=ri.prototype.add.bind(this),this.delete=ri.prototype.delete.bind(this),this.get=ri.prototype.get.bind(this),this.has=ri.prototype.has.bind(this),this.set=ri.prototype.set.bind(this),this.tag=Ai.tag}toJSON(e,t){if(!t)return super.toJSON(e);const i=new Map;t?.onCreate&&t.onCreate(i);for(const e of this.items){let n,s;if(tt(e)?(n=vt(e.key,"",t),s=vt(e.value,n,t)):n=vt(e,"",t),i.has(n))throw new Error("Ordered maps must not include duplicate keys");i.set(n,s)}return i}static from(e,t,i){const n=Ni(e,t,i),s=new this;return s.items=n.items,s}}Ai.tag="tag:yaml.org,2002:omap";const Ii={collection:"seq",identify:e=>e instanceof Map,nodeClass:Ai,default:!1,tag:"tag:yaml.org,2002:omap",resolve(e,t){const i=Mi(e,t),n=[];for(const{key:e}of i.items)it(e)&&(n.includes(e.value)?t(`Ordered maps must not include duplicate keys: ${e.value}`):n.push(e.value));return Object.assign(new Ai,i)},createNode:(e,t,i)=>Ai.from(e,t,i)};function Li({value:e,source:t},i){return t&&(e?zi:Pi).test.test(t)?t:e?i.options.trueStr:i.options.falseStr}const zi={identify:e=>!0===e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new St(!0),stringify:Li},Pi={identify:e=>!1===e,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new St(!1),stringify:Li},Ri={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:e=>"nan"===e.slice(-3).toLowerCase()?NaN:"-"===e[0]?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:fi},ji={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:e=>parseFloat(e.replace(/_/g,"")),stringify(e){const t=Number(e.value);return isFinite(t)?t.toExponential():fi(e)}},qi={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(e){const t=new St(parseFloat(e.replace(/_/g,""))),i=e.indexOf(".");if(-1!==i){const n=e.substring(i+1).replace(/_/g,"");"0"===n[n.length-1]&&(t.minFractionDigits=n.length)}return t},stringify:fi},Di=e=>"bigint"==typeof e||Number.isInteger(e);function Bi(e,t,i,{intAsBigInt:n}){const s=e[0];if("-"!==s&&"+"!==s||(t+=1),e=e.substring(t).replace(/_/g,""),n){switch(i){case 2:e=`0b${e}`;break;case 8:e=`0o${e}`;break;case 16:e=`0x${e}`}const t=BigInt(e);return"-"===s?BigInt(-1)*t:t}const o=parseInt(e,i);return"-"===s?-1*o:o}function Hi(e,t,i){const{value:n}=e;if(Di(n)){const e=n.toString(t);return n<0?"-"+i+e.substr(1):i+e}return fi(e)}const Fi={identify:Di,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(e,t,i)=>Bi(e,2,2,i),stringify:e=>Hi(e,2,"0b")},Ui={identify:Di,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(e,t,i)=>Bi(e,1,8,i),stringify:e=>Hi(e,8,"0")},Ki={identify:Di,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(e,t,i)=>Bi(e,0,10,i),stringify:fi},Vi={identify:Di,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(e,t,i)=>Bi(e,2,16,i),stringify:e=>Hi(e,16,"0x")};class Ji extends ri{constructor(e){super(e),this.tag=Ji.tag}add(e){let t;t=tt(e)?e:e&&"object"==typeof e&&"key"in e&&"value"in e&&null===e.value?new ei(e.key,null):new ei(e,null);oi(this.items,t.key)||this.items.push(t)}get(e,t){const i=oi(this.items,e);return!t&&tt(i)?it(i.key)?i.key.value:i.key:i}set(e,t){if("boolean"!=typeof t)throw new Error("Expected boolean value for set(key, value) in a YAML set, not "+typeof t);const i=oi(this.items,e);i&&!t?this.items.splice(this.items.indexOf(i),1):!i&&t&&this.items.push(new ei(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,i){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,i);throw new Error("Set items must all have null values")}static from(e,t,i){const{replacer:n}=i,s=new this(e);if(t&&Symbol.iterator in Object(t))for(let e of t)"function"==typeof n&&(e=n.call(t,e,e)),s.items.push(Zt(e,null,i));return s}}Ji.tag="tag:yaml.org,2002:set";const Wi={collection:"map",identify:e=>e instanceof Set,nodeClass:Ji,default:!1,tag:"tag:yaml.org,2002:set",createNode:(e,t,i)=>Ji.from(e,t,i),resolve(e,t){if(et(e)){if(e.hasAllNullValues(!0))return Object.assign(new Ji,e);t("Set items must all have null values")}else t("Expected a mapping for this tag");return e}};function Yi(e,t){const i=e[0],n="-"===i||"+"===i?e.substring(1):e,s=e=>t?BigInt(e):Number(e),o=n.replace(/_/g,"").split(":").reduce((e,t)=>e*s(60)+s(t),s(0));return"-"===i?s(-1)*o:o}function Gi(e){let{value:t}=e,i=e=>e;if("bigint"==typeof t)i=e=>BigInt(e);else if(isNaN(t)||!isFinite(t))return fi(e);let n="";t<0&&(n="-",t*=i(-1));const s=i(60),o=[t%s];return t<60?o.unshift(0):(t=(t-o[0])/s,o.unshift(t%s),t>=60&&(t=(t-o[0])/s,o.unshift(t))),n+o.map(e=>String(e).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Xi={identify:e=>"bigint"==typeof e||Number.isInteger(e),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(e,t,{intAsBigInt:i})=>Yi(e,i),stringify:Gi},Qi={identify:e=>"number"==typeof e,default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:e=>Yi(e,!1),stringify:Gi},Zi={identify:e=>e instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(e){const t=e.match(Zi.test);if(!t)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,i,n,s,o,r,a]=t.map(Number),l=t[7]?Number((t[7]+"00").substr(1,3)):0;let c=Date.UTC(i,n-1,s,o||0,r||0,a||0,l);const d=t[8];if(d&&"Z"!==d){let e=Yi(d,!1);Math.abs(e)<30&&(e*=60),c-=6e4*e}return new Date(c)},stringify:({value:e})=>e?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""},en=[ai,di,ui,hi,zi,Pi,Fi,Ui,Ki,Vi,Ri,ji,qi,Ti,Yt,Ii,Oi,Wi,Xi,Qi,Zi],tn=new Map([["core",Si],["failsafe",[ai,di,ui]],["json",Ei],["yaml11",en],["yaml-1.1",en]]),nn={binary:Ti,bool:pi,float:bi,floatExp:gi,floatNaN:mi,floatTime:Qi,int:ki,intHex:_i,intOct:xi,intTime:Xi,map:ai,merge:Yt,null:hi,omap:Ii,pairs:Oi,seq:di,set:Wi,timestamp:Zi},sn={"tag:yaml.org,2002:binary":Ti,"tag:yaml.org,2002:merge":Yt,"tag:yaml.org,2002:omap":Ii,"tag:yaml.org,2002:pairs":Oi,"tag:yaml.org,2002:set":Wi,"tag:yaml.org,2002:timestamp":Zi};function on(e,t,i){const n=tn.get(t);if(n&&!e)return i&&!n.includes(Yt)?n.concat(Yt):n.slice();let s=n;if(!s){if(!Array.isArray(e)){const e=Array.from(tn.keys()).filter(e=>"yaml11"!==e).map(e=>JSON.stringify(e)).join(", ");throw new Error(`Unknown schema "${t}"; use one of ${e} or define customTags array`)}s=[]}if(Array.isArray(e))for(const t of e)s=s.concat(t);else"function"==typeof e&&(s=e(s.slice()));return i&&(s=s.concat(Yt)),s.reduce((e,t)=>{const i="string"==typeof t?nn[t]:t;if(!i){const e=JSON.stringify(t),i=Object.keys(nn).map(e=>JSON.stringify(e)).join(", ");throw new Error(`Unknown custom tag ${e}; use one of ${i}`)}return e.includes(i)||e.push(i),e},[])}const rn=(e,t)=>e.key<t.key?-1:e.key>t.key?1:0;class an{constructor({compat:e,customTags:t,merge:i,resolveKnownTags:n,schema:s,sortMapEntries:o,toStringDefaults:r}){this.compat=Array.isArray(e)?on(e,"compat"):e?on(null,e):null,this.name="string"==typeof s&&s||"core",this.knownTags=n?sn:{},this.tags=on(t,this.name,i),this.toStringOptions=r??null,Object.defineProperty(this,Je,{value:ai}),Object.defineProperty(this,Ye,{value:ui}),Object.defineProperty(this,Ge,{value:di}),this.sortMapEntries="function"==typeof o?o:!0===o?rn:null}clone(){const e=Object.create(an.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}class ln{constructor(e,t,i){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Xe,{value:Ve});let n=null;"function"==typeof t||Array.isArray(t)?n=t:void 0===i&&t&&(i=t,t=void 0);const s=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},i);this.options=s;let{version:o}=s;i?._directives?(this.directives=i._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new ft({version:o}),this.setSchema(o,i),this.contents=void 0===e?null:this.createNode(e,n,i)}clone(){const e=Object.create(ln.prototype,{[Xe]:{value:Ve}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=ot(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){cn(this.contents)&&this.contents.add(e)}addIn(e,t){cn(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const i=gt(this);e.anchor=!t||i.has(t)?bt(t||"a",i):t}return new xt(e.anchor)}createNode(e,t,i){let n;if("function"==typeof t)e=t.call({"":e},"",e),n=t;else if(Array.isArray(t)){const e=e=>"number"==typeof e||e instanceof String||e instanceof Number,i=t.filter(e).map(String);i.length>0&&(t=t.concat(i)),n=t}else void 0===i&&t&&(i=t,t=void 0);const{aliasDuplicateObjects:s,anchorPrefix:o,flow:r,keepUndefined:a,onTagObj:l,tag:c}=i??{},{onAnchor:d,setAnchors:u,sourceObjects:h}=function(e,t){const i=[],n=new Map;let s=null;return{onAnchor:n=>{i.push(n),s??(s=gt(e));const o=bt(t,s);return s.add(o),o},setAnchors:()=>{for(const e of i){const t=n.get(e);if("object"!=typeof t||!t.anchor||!it(t.node)&&!st(t.node)){const t=new Error("Failed to resolve repeated object (this should not happen)");throw t.source=e,t}t.node.anchor=t.anchor}},sourceObjects:n}}(this,o||"a"),p=$t(e,c,{aliasDuplicateObjects:s??!0,keepUndefined:a??!1,onAnchor:d,onTagObj:l,replacer:n,schema:this.schema,sourceObjects:h});return r&&st(p)&&(p.flow=!0),u(),p}createPair(e,t,i={}){const n=this.createNode(e,null,i),s=this.createNode(t,null,i);return new ei(n,s)}delete(e){return!!cn(this.contents)&&this.contents.delete(e)}deleteIn(e){return Et(e)?null!=this.contents&&(this.contents=null,!0):!!cn(this.contents)&&this.contents.deleteIn(e)}get(e,t){return st(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Et(e)?!t&&it(this.contents)?this.contents.value:this.contents:st(this.contents)?this.contents.getIn(e,t):void 0}has(e){return!!st(this.contents)&&this.contents.has(e)}hasIn(e){return Et(e)?void 0!==this.contents:!!st(this.contents)&&this.contents.hasIn(e)}set(e,t){null==this.contents?this.contents=Ct(this.schema,[e],t):cn(this.contents)&&this.contents.set(e,t)}setIn(e,t){Et(e)?this.contents=t:null==this.contents?this.contents=Ct(this.schema,Array.from(e),t):cn(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){let i;switch("number"==typeof e&&(e=String(e)),e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new ft({version:"1.1"}),i={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new ft({version:e}),i={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,i=null;break;default:{const t=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${t}`)}}if(t.schema instanceof Object)this.schema=t.schema;else{if(!i)throw new Error("With a null YAML version, the { schema: Schema } option is required");this.schema=new an(Object.assign(i,t))}}toJS({json:e,jsonArg:t,mapAsMap:i,maxAliasCount:n,onAnchor:s,reviver:o}={}){const r={anchors:new Map,doc:this,keep:!e,mapAsMap:!0===i,mapKeyWarned:!1,maxAliasCount:"number"==typeof n?n:100},a=vt(this.contents,t??"",r);if("function"==typeof s)for(const{count:e,res:t}of r.anchors.values())s(t,e);return"function"==typeof o?yt(o,{"":a},"",a):a}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return function(e,t){const i=[];let n=!0===t.directives;if(!1!==t.directives&&e.directives){const t=e.directives.toString(e);t?(i.push(t),n=!0):e.directives.docStart&&(n=!0)}n&&i.push("---");const s=Kt(e,t),{commentString:o}=s.options;if(e.commentBefore){1!==i.length&&i.unshift("");const t=o(e.commentBefore);i.unshift(Nt(t,""))}let r=!1,a=null;if(e.contents){if(ot(e.contents)){if(e.contents.spaceBefore&&n&&i.push(""),e.contents.commentBefore){const t=o(e.contents.commentBefore);i.push(Nt(t,""))}s.forceBlockIndent=!!e.comment,a=e.contents.comment}const t=a?void 0:()=>r=!0;let l=Vt(e.contents,s,()=>a=null,t);a&&(l+=Ot(l,"",o(a))),"|"!==l[0]&&">"!==l[0]||"---"!==i[i.length-1]?i.push(l):i[i.length-1]=`--- ${l}`}else i.push(Vt(e.contents,s));if(e.directives?.docEnd)if(e.comment){const t=o(e.comment);t.includes("\n")?(i.push("..."),i.push(Nt(t,""))):i.push(`... ${t}`)}else i.push("...");else{let t=e.comment;t&&r&&(t=t.replace(/^\n+/,"")),t&&(r&&!a||""===i[i.length-1]||i.push(""),i.push(Nt(o(t),"")))}return i.join("\n")+"\n"}(this,e)}}function cn(e){if(st(e))return!0;throw new Error("Expected a YAML collection as document contents")}class dn extends Error{constructor(e,t,i,n){super(),this.name=e,this.code=i,this.message=n,this.pos=t}}class un extends dn{constructor(e,t,i){super("YAMLParseError",e,t,i)}}class hn extends dn{constructor(e,t,i){super("YAMLWarning",e,t,i)}}const pn=(e,t)=>i=>{if(-1===i.pos[0])return;i.linePos=i.pos.map(e=>t.linePos(e));const{line:n,col:s}=i.linePos[0];i.message+=` at line ${n}, column ${s}`;let o=s-1,r=e.substring(t.lineStarts[n-1],t.lineStarts[n]).replace(/[\n\r]+$/,"");if(o>=60&&r.length>80){const e=Math.min(o-39,r.length-79);r="…"+r.substring(e),o-=e-1}if(r.length>80&&(r=r.substring(0,79)+"…"),n>1&&/^ *$/.test(r.substring(0,o))){let i=e.substring(t.lineStarts[n-2],t.lineStarts[n-1]);i.length>80&&(i=i.substring(0,79)+"…\n"),r=i+r}if(/[^ ]/.test(r)){let e=1;const t=i.linePos[1];t?.line===n&&t.col>s&&(e=Math.max(1,Math.min(t.col-s,80-o)));const a=" ".repeat(o)+"^".repeat(e);i.message+=`:\n\n${r}\n${a}\n`}};function fn(e,{flow:t,indicator:i,next:n,offset:s,onError:o,parentIndent:r,startOnNewline:a}){let l=!1,c=a,d=a,u="",h="",p=!1,f=!1,m=null,g=null,b=null,y=null,v=null,w=null,x=null;for(const s of e)switch(f&&("space"!==s.type&&"newline"!==s.type&&"comma"!==s.type&&o(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),f=!1),m&&(c&&"comment"!==s.type&&"newline"!==s.type&&o(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),m=null),s.type){case"space":t||"doc-start"===i&&"flow-collection"===n?.type||!s.source.includes("\t")||(m=s),d=!0;break;case"comment":{d||o(s,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const e=s.source.substring(1)||" ";u?u+=h+e:u=e,h="",c=!1;break}case"newline":c?u?u+=s.source:w&&"seq-item-ind"===i||(l=!0):h+=s.source,c=!0,p=!0,(g||b)&&(y=s),d=!0;break;case"anchor":g&&o(s,"MULTIPLE_ANCHORS","A node can have at most one anchor"),s.source.endsWith(":")&&o(s.offset+s.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=s,x??(x=s.offset),c=!1,d=!1,f=!0;break;case"tag":b&&o(s,"MULTIPLE_TAGS","A node can have at most one tag"),b=s,x??(x=s.offset),c=!1,d=!1,f=!0;break;case i:(g||b)&&o(s,"BAD_PROP_ORDER",`Anchors and tags must be after the ${s.source} indicator`),w&&o(s,"UNEXPECTED_TOKEN",`Unexpected ${s.source} in ${t??"collection"}`),w=s,c="seq-item-ind"===i||"explicit-key-ind"===i,d=!1;break;case"comma":if(t){v&&o(s,"UNEXPECTED_TOKEN",`Unexpected , in ${t}`),v=s,c=!1,d=!1;break}default:o(s,"UNEXPECTED_TOKEN",`Unexpected ${s.type} token`),c=!1,d=!1}const k=e[e.length-1],_=k?k.offset+k.source.length:s;return f&&n&&"space"!==n.type&&"newline"!==n.type&&"comma"!==n.type&&("scalar"!==n.type||""!==n.source)&&o(n.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m&&(c&&m.indent<=r||"block-map"===n?.type||"block-seq"===n?.type)&&o(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:v,found:w,spaceBefore:l,comment:u,hasNewline:p,anchor:g,tag:b,newlineAfterProp:y,end:_,start:x??_}}function mn(e){if(!e)return null;switch(e.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(e.source.includes("\n"))return!0;if(e.end)for(const t of e.end)if("newline"===t.type)return!0;return!1;case"flow-collection":for(const t of e.items){for(const e of t.start)if("newline"===e.type)return!0;if(t.sep)for(const e of t.sep)if("newline"===e.type)return!0;if(mn(t.key)||mn(t.value))return!0}return!1;default:return!0}}function gn(e,t,i){if("flow-collection"===t?.type){const n=t.end[0];if(n.indent===e&&("]"===n.source||"}"===n.source)&&mn(t)){i(n,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}}function bn(e,t,i){const{uniqueKeys:n}=e.options;if(!1===n)return!1;const s="function"==typeof n?n:(e,t)=>e===t||it(e)&&it(t)&&e.value===t.value;return t.some(e=>s(e.key,i))}const yn="All mapping items must start at the same column";function vn(e,t,i,n){let s="";if(e){let o=!1,r="";for(const a of e){const{source:e,type:l}=a;switch(l){case"space":o=!0;break;case"comment":{i&&!o&&n(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const t=e.substring(1)||" ";s?s+=r+t:s=t,r="";break}case"newline":s&&(r+=e),o=!0;break;default:n(a,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}t+=e.length}}return{comment:s,offset:t}}const wn="Block collections are not allowed within flow collections",xn=e=>e&&("block-map"===e.type||"block-seq"===e.type);function kn(e,t,i,n,s,o){const r="block-map"===i.type?function({composeNode:e,composeEmptyNode:t},i,n,s,o){const r=new(o?.nodeClass??ri)(i.schema);i.atRoot&&(i.atRoot=!1);let a=n.offset,l=null;for(const o of n.items){const{start:c,key:d,sep:u,value:h}=o,p=fn(c,{indicator:"explicit-key-ind",next:d??u?.[0],offset:a,onError:s,parentIndent:n.indent,startOnNewline:!0}),f=!p.found;if(f){if(d&&("block-seq"===d.type?s(a,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in d&&d.indent!==n.indent&&s(a,"BAD_INDENT",yn)),!p.anchor&&!p.tag&&!u){l=p.end,p.comment&&(r.comment?r.comment+="\n"+p.comment:r.comment=p.comment);continue}(p.newlineAfterProp||mn(d))&&s(d??c[c.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else p.found?.indent!==n.indent&&s(a,"BAD_INDENT",yn);i.atKey=!0;const m=p.end,g=d?e(i,d,p,s):t(i,m,c,null,p,s);i.schema.compat&&gn(n.indent,d,s),i.atKey=!1,bn(i,r.items,g)&&s(m,"DUPLICATE_KEY","Map keys must be unique");const b=fn(u??[],{indicator:"map-value-ind",next:h,offset:g.range[2],onError:s,parentIndent:n.indent,startOnNewline:!d||"block-scalar"===d.type});if(a=b.end,b.found){f&&("block-map"!==h?.type||b.hasNewline||s(a,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),i.options.strict&&p.start<b.found.offset-1024&&s(g.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const l=h?e(i,h,b,s):t(i,a,u,null,b,s);i.schema.compat&&gn(n.indent,h,s),a=l.range[2];const c=new ei(g,l);i.options.keepSourceTokens&&(c.srcToken=o),r.items.push(c)}else{f&&s(g.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),b.comment&&(g.comment?g.comment+="\n"+b.comment:g.comment=b.comment);const e=new ei(g);i.options.keepSourceTokens&&(e.srcToken=o),r.items.push(e)}}return l&&l<a&&s(l,"IMPOSSIBLE","Map comment with trailing content"),r.range=[n.offset,a,l??a],r}(e,t,i,n,o):"block-seq"===i.type?function({composeNode:e,composeEmptyNode:t},i,n,s,o){const r=new(o?.nodeClass??li)(i.schema);i.atRoot&&(i.atRoot=!1),i.atKey&&(i.atKey=!1);let a=n.offset,l=null;for(const{start:o,value:c}of n.items){const d=fn(o,{indicator:"seq-item-ind",next:c,offset:a,onError:s,parentIndent:n.indent,startOnNewline:!0});if(!d.found){if(!(d.anchor||d.tag||c)){l=d.end,d.comment&&(r.comment=d.comment);continue}"block-seq"===c?.type?s(d.end,"BAD_INDENT","All sequence items must start at the same column"):s(a,"MISSING_CHAR","Sequence item without - indicator")}const u=c?e(i,c,d,s):t(i,d.end,o,null,d,s);i.schema.compat&&gn(n.indent,c,s),a=u.range[2],r.items.push(u)}return r.range=[n.offset,a,l??a],r}(e,t,i,n,o):function({composeNode:e,composeEmptyNode:t},i,n,s,o){const r="{"===n.start.source,a=r?"flow map":"flow sequence",l=new(o?.nodeClass??(r?ri:li))(i.schema);l.flow=!0;const c=i.atRoot;c&&(i.atRoot=!1),i.atKey&&(i.atKey=!1);let d=n.offset+n.start.source.length;for(let o=0;o<n.items.length;++o){const c=n.items[o],{start:u,key:h,sep:p,value:f}=c,m=fn(u,{flow:a,indicator:"explicit-key-ind",next:h??p?.[0],offset:d,onError:s,parentIndent:n.indent,startOnNewline:!1});if(!m.found){if(!(m.anchor||m.tag||p||f)){0===o&&m.comma?s(m.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):o<n.items.length-1&&s(m.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),m.comment&&(l.comment?l.comment+="\n"+m.comment:l.comment=m.comment),d=m.end;continue}!r&&i.options.strict&&mn(h)&&s(h,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(0===o)m.comma&&s(m.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(m.comma||s(m.start,"MISSING_CHAR",`Missing , between ${a} items`),m.comment){let e="";e:for(const t of u)switch(t.type){case"comma":case"space":break;case"comment":e=t.source.substring(1);break e;default:break e}if(e){let t=l.items[l.items.length-1];tt(t)&&(t=t.value??t.key),t.comment?t.comment+="\n"+e:t.comment=e,m.comment=m.comment.substring(e.length+1)}}if(r||p||m.found){i.atKey=!0;const o=m.end,g=h?e(i,h,m,s):t(i,o,u,null,m,s);xn(h)&&s(g.range,"BLOCK_IN_FLOW",wn),i.atKey=!1;const b=fn(p??[],{flow:a,indicator:"map-value-ind",next:f,offset:g.range[2],onError:s,parentIndent:n.indent,startOnNewline:!1});if(b.found){if(!r&&!m.found&&i.options.strict){if(p)for(const e of p){if(e===b.found)break;if("newline"===e.type){s(e,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}m.start<b.found.offset-1024&&s(b.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else f&&("source"in f&&":"===f.source?.[0]?s(f,"MISSING_CHAR",`Missing space after : in ${a}`):s(b.start,"MISSING_CHAR",`Missing , or : between ${a} items`));const y=f?e(i,f,b,s):b.found?t(i,b.end,p,null,b,s):null;y?xn(f)&&s(y.range,"BLOCK_IN_FLOW",wn):b.comment&&(g.comment?g.comment+="\n"+b.comment:g.comment=b.comment);const v=new ei(g,y);if(i.options.keepSourceTokens&&(v.srcToken=c),r){const e=l;bn(i,e.items,g)&&s(o,"DUPLICATE_KEY","Map keys must be unique"),e.items.push(v)}else{const e=new ri(i.schema);e.flow=!0,e.items.push(v);const t=(y??g).range;e.range=[g.range[0],t[1],t[2]],l.items.push(e)}d=y?y.range[2]:b.end}else{const n=f?e(i,f,m,s):t(i,m.end,p,null,m,s);l.items.push(n),d=n.range[2],xn(f)&&s(n.range,"BLOCK_IN_FLOW",wn)}}const u=r?"}":"]",[h,...p]=n.end;let f=d;if(h?.source===u)f=h.offset+h.source.length;else{const e=a[0].toUpperCase()+a.substring(1);s(d,c?"MISSING_CHAR":"BAD_INDENT",c?`${e} must end with a ${u}`:`${e} in block collection must be sufficiently indented and end with a ${u}`),h&&1!==h.source.length&&p.unshift(h)}if(p.length>0){const e=vn(p,f,i.options.strict,s);e.comment&&(l.comment?l.comment+="\n"+e.comment:l.comment=e.comment),l.range=[n.offset,f,e.offset]}else l.range=[n.offset,f,f];return l}(e,t,i,n,o),a=r.constructor;return"!"===s||s===a.tagName?(r.tag=a.tagName,r):(s&&(r.tag=s),r)}function _n(e,t,i){const n=t.offset,s=function({offset:e,props:t},i,n){if("block-scalar-header"!==t[0].type)return n(t[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:s}=t[0],o=s[0];let r=0,a="",l=-1;for(let t=1;t<s.length;++t){const i=s[t];if(a||"-"!==i&&"+"!==i){const n=Number(i);!r&&n?r=n:-1===l&&(l=e+t)}else a=i}-1!==l&&n(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${s}`);let c=!1,d="",u=s.length;for(let e=1;e<t.length;++e){const s=t[e];switch(s.type){case"space":c=!0;case"newline":u+=s.source.length;break;case"comment":if(i&&!c){n(s,"MISSING_CHAR","Comments must be separated from other tokens by white space characters")}u+=s.source.length,d=s.source.substring(1);break;case"error":n(s,"UNEXPECTED_TOKEN",s.message),u+=s.source.length;break;default:{n(s,"UNEXPECTED_TOKEN",`Unexpected token in block scalar header: ${s.type}`);const e=s.source;e&&"string"==typeof e&&(u+=e.length)}}}return{mode:o,indent:r,chomp:a,comment:d,length:u}}(t,e.options.strict,i);if(!s)return{value:"",type:null,comment:"",range:[n,n,n]};const o=">"===s.mode?St.BLOCK_FOLDED:St.BLOCK_LITERAL,r=t.source?function(e){const t=e.split(/\n( *)/),i=t[0],n=i.match(/^( *)/),s=[n?.[1]?[n[1],i.slice(n[1].length)]:["",i]];for(let e=1;e<t.length;e+=2)s.push([t[e],t[e+1]]);return s}(t.source):[];let a=r.length;for(let e=r.length-1;e>=0;--e){const t=r[e][1];if(""!==t&&"\r"!==t)break;a=e}if(0===a){const e="+"===s.chomp&&r.length>0?"\n".repeat(Math.max(1,r.length-1)):"";let i=n+s.length;return t.source&&(i+=t.source.length),{value:e,type:o,comment:s.comment,range:[n,i,i]}}let l=t.indent+s.indent,c=t.offset+s.length,d=0;for(let t=0;t<a;++t){const[n,o]=r[t];if(""!==o&&"\r"!==o){if(n.length<l){const e="Block scalars with more-indented leading empty lines must use an explicit indentation indicator";i(c+n.length,"MISSING_CHAR",e)}if(0===s.indent&&(l=n.length),d=t,0===l&&!e.atRoot){i(c,"BAD_INDENT","Block scalar values in collections must be indented")}break}0===s.indent&&n.length>l&&(l=n.length),c+=n.length+o.length+1}for(let e=r.length-1;e>=a;--e)r[e][0].length>l&&(a=e+1);let u="",h="",p=!1;for(let e=0;e<d;++e)u+=r[e][0].slice(l)+"\n";for(let e=d;e<a;++e){let[t,n]=r[e];c+=t.length+n.length+1;const a="\r"===n[n.length-1];if(a&&(n=n.slice(0,-1)),n&&t.length<l){const e=`Block scalar lines must not be less indented than their ${s.indent?"explicit indentation indicator":"first line"}`;i(c-n.length-(a?2:1),"BAD_INDENT",e),t=""}o===St.BLOCK_LITERAL?(u+=h+t.slice(l)+n,h="\n"):t.length>l||"\t"===n[0]?(" "===h?h="\n":p||"\n"!==h||(h="\n\n"),u+=h+t.slice(l)+n,h="\n",p=!0):""===n?"\n"===h?u+="\n":h="\n":(u+=h+n,h=" ",p=!1)}switch(s.chomp){case"-":break;case"+":for(let e=a;e<r.length;++e)u+="\n"+r[e][0].slice(l);"\n"!==u[u.length-1]&&(u+="\n");break;default:u+="\n"}const f=n+s.length+t.source.length;return{value:u,type:o,comment:s.comment,range:[n,f,f]}}function Sn(e,t,i){const{offset:n,type:s,source:o,end:r}=e;let a,l;const c=(e,t,s)=>i(n+e,t,s);switch(s){case"scalar":a=St.PLAIN,l=function(e,t){let i="";switch(e[0]){case"\t":i="a tab character";break;case",":i="flow indicator character ,";break;case"%":i="directive indicator character %";break;case"|":case">":i=`block scalar indicator ${e[0]}`;break;case"@":case"`":i=`reserved character ${e[0]}`}i&&t(0,"BAD_SCALAR_START",`Plain value cannot start with ${i}`);return $n(e)}(o,c);break;case"single-quoted-scalar":a=St.QUOTE_SINGLE,l=function(e,t){"'"===e[e.length-1]&&1!==e.length||t(e.length,"MISSING_CHAR","Missing closing 'quote");return $n(e.slice(1,-1)).replace(/''/g,"'")}(o,c);break;case"double-quoted-scalar":a=St.QUOTE_DOUBLE,l=function(e,t){let i="";for(let n=1;n<e.length-1;++n){const s=e[n];if("\r"!==s||"\n"!==e[n+1])if("\n"===s){const{fold:t,offset:s}=Cn(e,n);i+=t,n=s}else if("\\"===s){let s=e[++n];const o=En[s];if(o)i+=o;else if("\n"===s)for(s=e[n+1];" "===s||"\t"===s;)s=e[1+ ++n];else if("\r"===s&&"\n"===e[n+1])for(s=e[1+ ++n];" "===s||"\t"===s;)s=e[1+ ++n];else if("x"===s||"u"===s||"U"===s){const o={x:2,u:4,U:8}[s];i+=Tn(e,n+1,o,t),n+=o}else{const s=e.substr(n-1,2);t(n-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${s}`),i+=s}}else if(" "===s||"\t"===s){const t=n;let o=e[n+1];for(;" "===o||"\t"===o;)o=e[1+ ++n];"\n"===o||"\r"===o&&"\n"===e[n+2]||(i+=n>t?e.slice(t,n+1):s)}else i+=s}'"'===e[e.length-1]&&1!==e.length||t(e.length,"MISSING_CHAR",'Missing closing "quote');return i}(o,c);break;default:return i(e,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${s}`),{value:"",type:null,comment:"",range:[n,n+o.length,n+o.length]}}const d=n+o.length,u=vn(r,d,t,i);return{value:l,type:a,comment:u.comment,range:[n,d,u.offset]}}function $n(e){let t,i;try{t=new RegExp("(.*?)(?<![ \t])[ \t]*\r?\n","sy"),i=new RegExp("[ \t]*(.*?)(?:(?<![ \t])[ \t]*)?\r?\n","sy")}catch{t=/(.*?)[ \t]*\r?\n/sy,i=/[ \t]*(.*?)[ \t]*\r?\n/sy}let n=t.exec(e);if(!n)return e;let s=n[1],o=" ",r=t.lastIndex;for(i.lastIndex=r;n=i.exec(e);)""===n[1]?"\n"===o?s+=o:o="\n":(s+=o+n[1],o=" "),r=i.lastIndex;const a=/[ \t]*(.*)/sy;return a.lastIndex=r,n=a.exec(e),s+o+(n?.[1]??"")}function Cn(e,t){let i="",n=e[t+1];for(;!(" "!==n&&"\t"!==n&&"\n"!==n&&"\r"!==n||"\r"===n&&"\n"!==e[t+2]);)"\n"===n&&(i+="\n"),n=e[(t+=1)+1];return i||(i=" "),{fold:i,offset:t}}const En={0:"\0",a:"",b:"\b",e:"",f:"\f",n:"\n",r:"\r",t:"\t",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","\t":"\t"};function Tn(e,t,i,n){const s=e.substr(t,i),o=s.length===i&&/^[0-9a-fA-F]+$/.test(s)?parseInt(s,16):NaN;if(isNaN(o)){const s=e.substr(t-2,i+2);return n(t-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${s}`),s}return String.fromCodePoint(o)}function Mn(e,t,i,n){const{value:s,type:o,comment:r,range:a}="block-scalar"===t.type?_n(e,t,n):Sn(t,e.options.strict,n),l=i?e.directives.tagName(i.source,e=>n(i,"TAG_RESOLVE_FAILED",e)):null;let c,d;c=e.options.stringKeys&&e.atKey?e.schema[Ye]:l?function(e,t,i,n,s){if("!"===i)return e[Ye];const o=[];for(const t of e.tags)if(!t.collection&&t.tag===i){if(!t.default||!t.test)return t;o.push(t)}for(const e of o)if(e.test?.test(t))return e;const r=e.knownTags[i];if(r&&!r.collection)return e.tags.push(Object.assign({},r,{default:!1,test:void 0})),r;return s(n,"TAG_RESOLVE_FAILED",`Unresolved tag: ${i}`,"tag:yaml.org,2002:str"!==i),e[Ye]}(e.schema,s,l,i,n):"scalar"===t.type?function({atKey:e,directives:t,schema:i},n,s,o){const r=i.tags.find(t=>(!0===t.default||e&&"key"===t.default)&&t.test?.test(n))||i[Ye];if(i.compat){const e=i.compat.find(e=>e.default&&e.test?.test(n))??i[Ye];if(r.tag!==e.tag){o(s,"TAG_RESOLVE_FAILED",`Value may be parsed as either ${t.tagString(r.tag)} or ${t.tagString(e.tag)}`,!0)}}return r}(e,s,t,n):e.schema[Ye];try{const o=c.resolve(s,e=>n(i??t,"TAG_RESOLVE_FAILED",e),e.options);d=it(o)?o:new St(o)}catch(e){const o=e instanceof Error?e.message:String(e);n(i??t,"TAG_RESOLVE_FAILED",o),d=new St(s)}return d.range=a,d.source=s,o&&(d.type=o),l&&(d.tag=l),c.format&&(d.format=c.format),r&&(d.comment=r),d}function Nn(e,t,i){if(t){i??(i=t.length);for(let n=i-1;n>=0;--n){let i=t[n];switch(i.type){case"space":case"comment":case"newline":e-=i.source.length;continue}for(i=t[++n];"space"===i?.type;)e+=i.source.length,i=t[++n];break}}return e}const On={composeNode:An,composeEmptyNode:In};function An(e,t,i,n){const s=e.atKey,{spaceBefore:o,comment:r,anchor:a,tag:l}=i;let c,d=!0;switch(t.type){case"alias":c=function({options:e},{offset:t,source:i,end:n},s){const o=new xt(i.substring(1));""===o.source&&s(t,"BAD_ALIAS","Alias cannot be an empty string");o.source.endsWith(":")&&s(t+i.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=t+i.length,a=vn(n,r,e.strict,s);o.range=[t,r,a.offset],a.comment&&(o.comment=a.comment);return o}(e,t,n),(a||l)&&n(t,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Mn(e,t,l,n),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":c=function(e,t,i,n,s){const o=n.tag,r=o?t.directives.tagName(o.source,e=>s(o,"TAG_RESOLVE_FAILED",e)):null;if("block-seq"===i.type){const{anchor:e,newlineAfterProp:t}=n,i=e&&o?e.offset>o.offset?e:o:e??o;i&&(!t||t.offset<i.offset)&&s(i,"MISSING_CHAR","Missing newline after block sequence props")}const a="block-map"===i.type?"map":"block-seq"===i.type?"seq":"{"===i.start.source?"map":"seq";if(!o||!r||"!"===r||r===ri.tagName&&"map"===a||r===li.tagName&&"seq"===a)return kn(e,t,i,s,r);let l=t.schema.tags.find(e=>e.tag===r&&e.collection===a);if(!l){const n=t.schema.knownTags[r];if(n?.collection!==a)return n?s(o,"BAD_COLLECTION_TYPE",`${n.tag} used for ${a} collection, but expects ${n.collection??"scalar"}`,!0):s(o,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),kn(e,t,i,s,r);t.schema.tags.push(Object.assign({},n,{default:!1})),l=n}const c=kn(e,t,i,s,r,l),d=l.resolve?.(c,e=>s(o,"TAG_RESOLVE_FAILED",e),t.options)??c,u=ot(d)?d:new St(d);return u.range=c.range,u.tag=r,l?.format&&(u.format=l.format),u}(On,e,t,i,n),a&&(c.anchor=a.source.substring(1));break;default:n(t,"UNEXPECTED_TOKEN","error"===t.type?t.message:`Unsupported token (type: ${t.type})`),c=In(e,t.offset,void 0,null,i,n),d=!1}if(a&&""===c.anchor&&n(a,"BAD_ALIAS","Anchor cannot be an empty string"),s&&e.options.stringKeys&&(!it(c)||"string"!=typeof c.value||c.tag&&"tag:yaml.org,2002:str"!==c.tag)){n(l??t,"NON_STRING_KEY","With stringKeys, all keys must be strings")}return o&&(c.spaceBefore=!0),r&&("scalar"===t.type&&""===t.source?c.comment=r:c.commentBefore=r),e.options.keepSourceTokens&&d&&(c.srcToken=t),c}function In(e,t,i,n,{spaceBefore:s,comment:o,anchor:r,tag:a,end:l},c){const d=Mn(e,{type:"scalar",offset:Nn(t,i,n),indent:-1,source:""},a,c);return r&&(d.anchor=r.source.substring(1),""===d.anchor&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),s&&(d.spaceBefore=!0),o&&(d.comment=o,d.range[2]=l),d}function Ln(e){if("number"==typeof e)return[e,e+1];if(Array.isArray(e))return 2===e.length?e:[e[0],e[1]];const{offset:t,source:i}=e;return[t,t+("string"==typeof i?i.length:1)]}function zn(e){let t="",i=!1,n=!1;for(let s=0;s<e.length;++s){const o=e[s];switch(o[0]){case"#":t+=(""===t?"":n?"\n\n":"\n")+(o.substring(1)||" "),i=!0,n=!1;break;case"%":"#"!==e[s+1]?.[0]&&(s+=1),i=!1;break;default:i||(n=!0),i=!1}}return{comment:t,afterEmptyLine:n}}class Pn{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(e,t,i,n)=>{const s=Ln(e);n?this.warnings.push(new hn(s,t,i)):this.errors.push(new un(s,t,i))},this.directives=new ft({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:i,afterEmptyLine:n}=zn(this.prelude);if(i){const s=e.contents;if(t)e.comment=e.comment?`${e.comment}\n${i}`:i;else if(n||e.directives.docStart||!s)e.commentBefore=i;else if(st(s)&&!s.flow&&s.items.length>0){let e=s.items[0];tt(e)&&(e=e.key);const t=e.commentBefore;e.commentBefore=t?`${i}\n${t}`:i}else{const e=s.commentBefore;s.commentBefore=e?`${i}\n${e}`:i}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:zn(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,i=-1){for(const t of e)yield*this.next(t);yield*this.end(t,i)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,i,n)=>{const s=Ln(e);s[0]+=t,this.onError(s,"BAD_DIRECTIVE",i,n)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=function(e,t,{offset:i,start:n,value:s,end:o},r){const a=Object.assign({_directives:t},e),l=new ln(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},d=fn(n,{indicator:"doc-start",next:s??o?.[0],offset:i,onError:r,parentIndent:0,startOnNewline:!0});d.found&&(l.directives.docStart=!0,!s||"block-map"!==s.type&&"block-seq"!==s.type||d.hasNewline||r(d.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=s?An(c,s,d,r):In(c,d.end,n,null,d,r);const u=l.contents.range[2],h=vn(o,u,!1,r);return h.comment&&(l.comment=h.comment),l.range=[i,u,h.offset],l}(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,i=new un(Ln(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(i):this.doc.errors.push(i);break}case"doc-end":{if(!this.doc){const t="Unexpected doc-end without preceding document";this.errors.push(new un(Ln(e),"UNEXPECTED_TOKEN",t));break}this.doc.directives.docEnd=!0;const t=vn(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const e=this.doc.comment;this.doc.comment=e?`${e}\n${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new un(Ln(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const e=Object.assign({_directives:this.directives},this.options),i=new ln(void 0,e);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}function Rn(e){switch(e){case void 0:case" ":case"\n":case"\r":case"\t":return!0;default:return!1}}const jn=new Set("0123456789ABCDEFabcdef"),qn=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Dn=new Set(",[]{}"),Bn=new Set(" ,[]{}\n\r\t"),Hn=e=>!e||Bn.has(e);class Fn{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if("string"!=typeof e)throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let i=this.next??"stream";for(;i&&(t||this.hasChars(1));)i=yield*this.parseNext(i)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;" "===t||"\t"===t;)t=this.buffer[++e];return!t||"#"===t||"\n"===t||"\r"===t&&"\n"===this.buffer[e+1]}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let i=0;for(;" "===t;)t=this.buffer[++i+e];if("\r"===t){const t=this.buffer[i+e+1];if("\n"===t||!t&&!this.atEnd)return e+i+1}return"\n"===t||i>=this.indentNext||!t&&!this.atEnd?e+i:-1}if("-"===t||"."===t){const t=this.buffer.substr(e,3);if(("---"===t||"..."===t)&&Rn(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return("number"!=typeof e||-1!==e&&e<this.pos)&&(e=this.buffer.indexOf("\n",this.pos),this.lineEndPos=e),-1===e?this.atEnd?this.buffer.substring(this.pos):null:("\r"===this.buffer[e-1]&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(null===e)return this.setNext("stream");if("\ufeff"===e[0]&&(yield*this.pushCount(1),e=e.substring(1)),"%"===e[0]){let t=e.length,i=e.indexOf("#");for(;-1!==i;){const n=e[i-1];if(" "===n||"\t"===n){t=i-1;break}i=e.indexOf("#",i+1)}for(;;){const i=e[t-1];if(" "!==i&&"\t"!==i)break;t-=1}const n=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-n),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield"",yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if("-"===e||"."===e){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const e=this.peek(3);if(("---"===e||"..."===e)&&Rn(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,"---"===e?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Rn(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if(("-"===e||"?"===e||":"===e)&&Rn(t)){const e=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=e,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(null===e)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Hn),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=(yield*this.parseBlockScalarHeader()),t+=(yield*this.pushSpaces(!0)),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,i=-1;do{e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=i=t):t=0,t+=(yield*this.pushSpaces(!0))}while(e+t>0);const n=this.getLine();if(null===n)return this.setNext("flow");if(-1!==i&&i<this.indentNext&&"#"!==n[0]||0===i&&(n.startsWith("---")||n.startsWith("..."))&&Rn(n[3])){if(!(i===this.indentNext-1&&1===this.flowLevel&&("]"===n[0]||"}"===n[0])))return this.flowLevel=0,yield"",yield*this.parseLineStart()}let s=0;for(;","===n[s];)s+=(yield*this.pushCount(1)),s+=(yield*this.pushSpaces(!0)),this.flowKey=!1;switch(s+=(yield*this.pushIndicators()),n[s]){case void 0:return"flow";case"#":return yield*this.pushCount(n.length-s),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Hn),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const e=this.charAt(1);if(this.flowKey||Rn(e)||","===e)return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if("'"===e)for(;-1!==t&&"'"===this.buffer[t+1];)t=this.buffer.indexOf("'",t+2);else for(;-1!==t;){let e=0;for(;"\\"===this.buffer[t-1-e];)e+=1;if(e%2==0)break;t=this.buffer.indexOf('"',t+1)}const i=this.buffer.substring(0,t);let n=i.indexOf("\n",this.pos);if(-1!==n){for(;-1!==n;){const e=this.continueScalar(n+1);if(-1===e)break;n=i.indexOf("\n",e)}-1!==n&&(t=n-("\r"===i[n-1]?2:1))}if(-1===t){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if("+"===t)this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if("-"!==t)break}return yield*this.pushUntil(e=>Rn(e)||"#"===e)}*parseBlockScalar(){let e,t=this.pos-1,i=0;e:for(let n=this.pos;e=this.buffer[n];++n)switch(e){case" ":i+=1;break;case"\n":t=n,i=0;break;case"\r":{const e=this.buffer[n+1];if(!e&&!this.atEnd)return this.setNext("block-scalar");if("\n"===e)break}default:break e}if(!e&&!this.atEnd)return this.setNext("block-scalar");if(i>=this.indentNext){-1===this.blockScalarIndent?this.indentNext=i:this.indentNext=this.blockScalarIndent+(0===this.indentNext?1:this.indentNext);do{const e=this.continueScalar(t+1);if(-1===e)break;t=this.buffer.indexOf("\n",e)}while(-1!==t);if(-1===t){if(!this.atEnd)return this.setNext("block-scalar");t=this.buffer.length}}let n=t+1;for(e=this.buffer[n];" "===e;)e=this.buffer[++n];if("\t"===e){for(;"\t"===e||" "===e||"\r"===e||"\n"===e;)e=this.buffer[++n];t=n-1}else if(!this.blockScalarKeep)for(;;){let e=t-1,n=this.buffer[e];"\r"===n&&(n=this.buffer[--e]);const s=e;for(;" "===n;)n=this.buffer[--e];if(!("\n"===n&&e>=this.pos&&e+1+i>s))break;t=e}return yield"",yield*this.pushToIndex(t+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t,i=this.pos-1,n=this.pos-1;for(;t=this.buffer[++n];)if(":"===t){const t=this.buffer[n+1];if(Rn(t)||e&&Dn.has(t))break;i=n}else if(Rn(t)){let s=this.buffer[n+1];if("\r"===t&&("\n"===s?(n+=1,t="\n",s=this.buffer[n+1]):i=n),"#"===s||e&&Dn.has(s))break;if("\n"===t){const e=this.continueScalar(n+1);if(-1===e)break;n=Math.max(n,e-2)}}else{if(e&&Dn.has(t))break;i=n}return t||this.atEnd?(yield"",yield*this.pushToIndex(i+1,!0),e?"flow":"doc"):this.setNext("plain-scalar")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const i=this.buffer.slice(this.pos,e);return i?(yield i,this.pos+=i.length,i.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Hn))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{const e=this.flowLevel>0,t=this.charAt(1);if(Rn(t)||e&&Dn.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if("<"===this.charAt(1)){let e=this.pos+2,t=this.buffer[e];for(;!Rn(t)&&">"!==t;)t=this.buffer[++e];return yield*this.pushToIndex(">"===t?e+1:e,!1)}{let e=this.pos+1,t=this.buffer[e];for(;t;)if(qn.has(t))t=this.buffer[++e];else{if("%"!==t||!jn.has(this.buffer[e+1])||!jn.has(this.buffer[e+2]))break;t=this.buffer[e+=3]}return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return"\n"===e?yield*this.pushCount(1):"\r"===e&&"\n"===this.charAt(1)?yield*this.pushCount(2):0}*pushSpaces(e){let t,i=this.pos-1;do{t=this.buffer[++i]}while(" "===t||e&&"\t"===t);const n=i-this.pos;return n>0&&(yield this.buffer.substr(this.pos,n),this.pos=i),n}*pushUntil(e){let t=this.pos,i=this.buffer[t];for(;!e(i);)i=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Un{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,i=this.lineStarts.length;for(;t<i;){const n=t+i>>1;this.lineStarts[n]<e?t=n+1:i=n}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(0===t)return{line:0,col:e};return{line:t,col:e-this.lineStarts[t-1]+1}}}}function Kn(e,t){for(let i=0;i<e.length;++i)if(e[i].type===t)return!0;return!1}function Vn(e){for(let t=0;t<e.length;++t)switch(e[t].type){case"space":case"comment":case"newline":break;default:return t}return-1}function Jn(e){switch(e?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Wn(e){switch(e.type){case"document":return e.start;case"block-map":{const t=e.items[e.items.length-1];return t.sep??t.start}case"block-seq":return e.items[e.items.length-1].start;default:return[]}}function Yn(e){if(0===e.length)return[];let t=e.length;e:for(;--t>=0;)switch(e[t].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;"space"===e[++t]?.type;);return e.splice(t,e.length)}function Gn(e){if("flow-seq-start"===e.start.type)for(const t of e.items)!t.sep||t.value||Kn(t.start,"explicit-key-ind")||Kn(t.sep,"map-value-ind")||(t.key&&(t.value=t.key),delete t.key,Jn(t.value)?t.value.end?Array.prototype.push.apply(t.value.end,t.sep):t.value.end=t.sep:Array.prototype.push.apply(t.start,t.sep),delete t.sep)}class Xn{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Fn,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&0===this.offset&&this.onNewLine(0);for(const i of this.lexer.lex(e,t))yield*this.next(i);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar)return this.atScalar=!1,yield*this.step(),void(this.offset+=e.length);const t=function(e){switch(e){case"\ufeff":return"byte-order-mark";case"":return"doc-mode";case"":return"flow-error-end";case"":return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case"\n":case"\r\n":return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(e[0]){case" ":case"\t":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}(e);if(t)if("scalar"===t)this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&" "===e[0]&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const t=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:t,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if("doc-end"!==this.type||"doc-end"===e?.type){if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}else{for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source})}}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(t)if(0===this.stack.length)yield t;else{const e=this.peek(1);switch("block-scalar"===t.type?t.indent="indent"in e?e.indent:0:"flow-collection"===t.type&&"document"===e.type&&(t.indent=0),"flow-collection"===t.type&&Gn(t),e.type){case"document":e.value=t;break;case"block-scalar":e.props.push(t);break;case"block-map":{const i=e.items[e.items.length-1];if(i.value)return e.items.push({start:[],key:t,sep:[]}),void(this.onKeyLine=!0);if(!i.sep)return Object.assign(i,{key:t,sep:[]}),void(this.onKeyLine=!i.explicitKey);i.value=t;break}case"block-seq":{const i=e.items[e.items.length-1];i.value?e.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=e.items[e.items.length-1];return void(!i||i.value?e.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]}))}default:yield*this.pop(),yield*this.pop(t)}if(!("document"!==e.type&&"block-map"!==e.type&&"block-seq"!==e.type||"block-map"!==t.type&&"block-seq"!==t.type)){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&-1===Vn(i.start)&&(0===t.indent||i.start.every(e=>"comment"!==e.type||e.indent<t.indent))&&("document"===e.type?e.end=i.start:e.items.push({start:i.start}),t.items.splice(-1,1))}}else{const e="Tried to pop an empty stack";yield{type:"error",offset:this.offset,source:"",message:e}}}*stream(){switch(this.type){case"directive-line":return void(yield{type:"directive",offset:this.offset,source:this.source});case"byte-order-mark":case"space":case"comment":case"newline":return void(yield this.sourceToken);case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};return"doc-start"===this.type&&e.start.push(this.sourceToken),void this.stack.push(e)}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":return void(-1!==Vn(e.start)?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken));case"anchor":case"tag":case"space":case"comment":case"newline":return void e.start.push(this.sourceToken)}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if("map-value-ind"===this.type){const t=Yn(Wn(this.peek(2)));let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const n={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:t,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=n}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":return void e.props.push(this.sourceToken);case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let e=this.source.indexOf("\n")+1;for(;0!==e;)this.onNewLine(this.offset+e),e=this.source.indexOf("\n",e)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const i="end"in t.value?t.value.end:void 0,n=Array.isArray(i)?i[i.length-1]:void 0;"comment"===n?.type?i?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],n=i?.value?.end;if(Array.isArray(n))return Array.prototype.push.apply(n,t.start),n.push(this.sourceToken),void e.items.pop()}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const i=!this.onKeyLine&&this.indent===e.indent,n=i&&(t.sep||t.explicitKey)&&"seq-item-ind"!==this.type;let s=[];if(n&&t.sep&&!t.value){const i=[];for(let n=0;n<t.sep.length;++n){const s=t.sep[n];switch(s.type){case"newline":i.push(n);break;case"space":break;case"comment":s.indent>e.indent&&(i.length=0);break;default:i.length=0}}i.length>=2&&(s=t.sep.splice(i[1]))}switch(this.type){case"anchor":case"tag":return void(n||t.value?(s.push(this.sourceToken),e.items.push({start:s}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken));case"explicit-key-ind":return t.sep||t.explicitKey?n||t.value?(s.push(this.sourceToken),e.items.push({start:s,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}):(t.start.push(this.sourceToken),t.explicitKey=!0),void(this.onKeyLine=!0);case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Kn(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]});else if(Jn(t.key)&&!Kn(t.sep,"newline")){const e=Yn(t.start),i=t.key,n=t.sep;n.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:e,key:i,sep:n}]})}else s.length>0?t.sep=t.sep.concat(s,this.sourceToken):t.sep.push(this.sourceToken);else if(Kn(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const e=Yn(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:e,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||n?e.items.push({start:s,key:null,sep:[this.sourceToken]}):Kn(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return void(this.onKeyLine=!0);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);return void(n||t.value?(e.items.push({start:s,key:i,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(i):(Object.assign(t,{key:i,sep:[]}),this.onKeyLine=!0))}default:{const n=this.startBlockValue(e);if(n){if("block-seq"===n.type){if(!t.explicitKey&&t.sep&&!Kn(t.sep,"newline"))return void(yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source}))}else i&&e.items.push({start:s});return void this.stack.push(n)}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const i="end"in t.value?t.value.end:void 0,n=Array.isArray(i)?i[i.length-1]:void 0;"comment"===n?.type?i?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2],n=i?.value?.end;if(Array.isArray(n))return Array.prototype.push.apply(n,t.start),n.push(this.sourceToken),void e.items.pop()}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;return void t.start.push(this.sourceToken);case"seq-item-ind":if(this.indent!==e.indent)break;return void(t.value||Kn(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken))}if(this.indent>e.indent){const t=this.startBlockValue(e);if(t)return void this.stack.push(t)}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if("flow-error-end"===this.type){let e;do{yield*this.pop(),e=this.peek(1)}while("flow-collection"===e?.type)}else if(0===e.end.length){switch(this.type){case"comma":case"explicit-key-ind":return void(!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken));case"map-value-ind":return void(!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]}));case"space":case"comment":case"newline":case"anchor":case"tag":return void(!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken));case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);return void(!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]}))}case"flow-map-end":case"flow-seq-end":return void e.end.push(this.sourceToken)}const i=this.startBlockValue(e);i?this.stack.push(i):(yield*this.pop(),yield*this.step())}else{const t=this.peek(2);if("block-map"===t.type&&("map-value-ind"===this.type&&t.indent===e.indent||"newline"===this.type&&!t.items[t.items.length-1].sep))yield*this.pop(),yield*this.step();else if("map-value-ind"===this.type&&"flow-collection"!==t.type){const i=Yn(Wn(t));Gn(e);const n=e.end.splice(1,e.end.length);n.push(this.sourceToken);const s={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:i,key:e,sep:n}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=s}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let e=this.source.indexOf("\n")+1;for(;0!==e;)this.onNewLine(this.offset+e),e=this.source.indexOf("\n",e)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Yn(Wn(e));return t.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:t,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Yn(Wn(e));return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:t,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return"comment"===this.type&&(!(this.indent<=t)&&e.every(e=>"newline"===e.type||"space"===e.type))}*documentEnd(e){"doc-mode"!==this.type&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],"newline"===this.type&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],"newline"===this.type&&(yield*this.pop())}}}function Qn(e,t={}){const{lineCounter:i,prettyErrors:n}=function(e){const t=!1!==e.prettyErrors;return{lineCounter:e.lineCounter||t&&new Un||null,prettyErrors:t}}(t),s=new Xn(i?.addNewLine),o=new Pn(t);let r=null;for(const t of o.compose(s.parse(e),!0,e.length))if(r){if("silent"!==r.options.logLevel){r.errors.push(new un(t.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}}else r=t;return n&&i&&(r.errors.forEach(pn(e,i)),r.warnings.forEach(pn(e,i))),r}function Zn(e){var t;return null!==(t=function(e,t,i){let n=null;if("function"==typeof t||Array.isArray(t)?n=t:void 0===i&&t&&(i=t),"string"==typeof i&&(i=i.length),"number"==typeof i){const e=Math.round(i);i=e<1?void 0:e>8?{indent:8}:{indent:e}}if(void 0===e){const{keepUndefined:e}=i??t??{};if(!e)return}return Ze(e)&&!n?e.toString(i):new ln(e,n,i).toString(i)}(e,{lineWidth:0}))&&void 0!==t?t:""}function es(e){return function(e,t,i){let n;"function"==typeof t?n=t:void 0===i&&t&&"object"==typeof t&&(i=t);const s=Qn(e,i);if(!s)return null;if(s.warnings.forEach(e=>Jt(s.options.logLevel,e)),s.errors.length>0){if("silent"!==s.options.logLevel)throw s.errors[0];s.errors=[]}return s.toJS(Object.assign({reviver:n},i))}(e)}const ts=[{value:"navigate",label:"Navigate"},{value:"toggle",label:"Toggle"},{value:"more-info",label:"More Info"},{value:"call-service",label:"Call Service"},{value:"service-js",label:"JavaScript"},{value:"url",label:"URL"},{value:"toggle-sidebar",label:"Toggle Sidebar"},{value:"toggle-topmenu",label:"Toggle Top Menu"}],is=[{value:"list",label:"List"},{value:"wide",label:"Wide"},{value:"buttons",label:"Buttons"},{value:"grid",label:"Grid"}],ns=[{value:"overlay",label:"Overlay"},{value:"push",label:"Push"},{value:"flip",label:"Flip"}],ss=[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}];function os(e){return"sidebarMenu"!==e}let rs=!1;const as="sidebar-card-settings-btn";async function ls(){var e,t,i,n;if(rs)return;const s=await Ee();window.__sidebarCardLovelace=s;const o=null!==(t=null===(e=null==s?void 0:s.config)||void 0===e?void 0:e.sidebar)&&void 0!==t?t:null,r=null!==(n=null===(i=null==s?void 0:s.config)||void 0===i?void 0:i.header)&&void 0!==n?n:null;if(function(e){var t;const i=te();if(!(null===(t=null==i?void 0:i.user)||void 0===t?void 0:t.is_admin))return;const n=_e();if(!n)return void Te("injectToolbarButton","hui-root shadowRoot non trovato");const s=n.querySelector(".toolbar .action-items");if(!s)return void Te("injectToolbarButton",".action-items non trovato nella toolbar");if(s.querySelector(`#${as}`))return;const o=document.createElement("ha-icon-button");o.id=as,o.setAttribute("slot","actionItems"),o.setAttribute("label","Sidebar Card Settings"),o.setAttribute("title","Sidebar Card Settings");const r=document.createElement("ha-svg-icon");r.setAttribute("path","M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H11V19.9L12.1 18.8L12.2 18.7C12.1 18.5 12 18.3 12 18V14C12 13.2 12.3 12.5 12.9 12L17 7.9V7C17 5.9 17.9 5 19 5H21V3M5 7H11V13H5V7M5 15H11V19H5V15M19 5V9H13V5H19Z"),o.appendChild(r),o.addEventListener("click",t=>{var n,s,o,r;t.stopPropagation();let a=document.querySelector("sidebar-card-editor");a||(a=document.createElement("sidebar-card-editor"),document.body.appendChild(a));const l=JSON.parse(JSON.stringify(null!==(s=null===(n=null==e?void 0:e.config)||void 0===n?void 0:n.sidebar)&&void 0!==s?s:{})),c=JSON.parse(JSON.stringify(null!==(r=null===(o=null==e?void 0:e.config)||void 0===o?void 0:o.header)&&void 0!==r?r:{}));a.open(l,c,i)}),s.insertBefore(o,s.firstChild),Te("injectToolbarButton","Bottone settings iniettato nella toolbar HA")}(s),!o&&!r)return Te("build","No sidebar/header config found"),void(rs=!0);const a=Se();if(!a||!a.shadowRoot)return void Me("build","Root element or shadowRoot not found!");Ae(),Ie(),Le();const l=ze("sidebarOff"),c=a.shadowRoot.querySelector("div");if(c){if(o&&!1!==o.enabled&&(!o.width||"number"==typeof o.width&&o.width>0&&o.width<100||"object"==typeof o.width)){if(!c.querySelector("#customSidebarWrapper")){!0===o.hideTopMenu&&null==l?He(!1):He(!0),!0===o.hideHassSidebar&&null==l?qe(!1):qe(!0);const d=JSON.parse(JSON.stringify(o));d.breakpoints?(d.breakpoints.mobile||(d.breakpoints.mobile=768),d.breakpoints.tablet||(d.breakpoints.tablet=1024)):d.breakpoints={tablet:1024,mobile:768};const u=Pe(d,document.body.clientWidth),h=document.createElement("style");h.id="customSidebarStyle",h.type="text/css",h.appendChild(document.createTextNode(u)),c.appendChild(h);const p=c.querySelector("#view");if(!p||!p.parentNode)return void Me("build","View element not found");const f=document.createElement("div");f.id="customSidebarWrapper",p.parentNode.insertBefore(f,p);const m=document.createElement("div");m.id="customSidebar",f.appendChild(m),f.appendChild(p),await async function(e,t){const i=document.createElement("sidebar-card");i.setConfig(t),i.hass=te(),e.appendChild(i)}(m,d),je(c,d,p,m),setTimeout(()=>Re(c,d),1)}}else o&&Me("build","Error in sidebar width config!");if(r&&!1!==r.enabled){const g=c.querySelector("#view");if(g){const b=c.querySelector("#customSidebarWrapper"),y=null!=b?b:g;let v=c.querySelector("#customHeaderWrapper");v?y.parentElement!==v&&v.appendChild(y):(v=document.createElement("div"),v.id="customHeaderWrapper",v.style.display="flex",v.style.flexDirection="column",v.style.width="100%",v.style.minWidth="0",v.style.boxSizing="border-box",y.parentNode?y.parentNode.insertBefore(v,y):c.insertBefore(v,c.firstChild),v.appendChild(y));let w=v.querySelector("#customHeaderContainer");function x(e){let t=e.querySelector("#headerFlipStage");if(!t){t=document.createElement("div"),t.id="headerFlipStage",t.style.position="relative",t.style.width="100%",t.style.boxSizing="border-box",t.style.perspective="1600px",t.style.overflow="hidden";const i=document.createElement("div");i.id="headerFlipRotator",i.style.position="relative",i.style.width="100%",i.style.height="100%",i.style.transformStyle="preserve-3d",i.style.willChange="transform",i.style.transformOrigin="50% 50%",i.style.transform="rotateX(0deg) translateZ(0px)";const n=document.createElement("div");n.id="headerFlipFront",n.style.position="absolute",n.style.inset="0",n.style.backfaceVisibility="hidden",n.style.transform="rotateX(0deg)",n.style.zIndex="2";const s=document.createElement("div");s.id="headerFlipBack",s.style.position="absolute",s.style.inset="0",s.style.backfaceVisibility="hidden",s.style.transform="rotateX(180deg)",s.style.overflow="hidden",s.style.pointerEvents="none",s.style.opacity="0",s.style.zIndex="1",i.appendChild(n),i.appendChild(s),t.appendChild(i),e.appendChild(t)}const i=t.querySelector("#headerFlipFront"),n=e.querySelector("header-card");n&&n.parentElement!==i&&i.appendChild(n);const s=Math.round(i.getBoundingClientRect().height||0);return t.style.height=`${Math.max(s,72)}px`,t}function k(e,t,i,n,s=$){var o,r;const a=e.style.height,l=e.style.minHeight,c=Math.max(72,Math.round(e.getBoundingClientRect().height||0));e.style.height=`${c}px`,e.style.minHeight=`${c}px`;const d=x(e),u=d.querySelector("#headerFlipRotator"),h=d.querySelector("#headerFlipBack"),p=d.querySelector("#headerFlipFront");if(d.style.height=`${Math.max(c,72)}px`,u.__flipping)return e.style.height=a,void(e.style.minHeight=l);u.__flipping=!0;const f=null!==(o=null==_e?void 0:_e())&&void 0!==o?o:null,m=null!==(r=null==f?void 0:f.querySelector("div.header"))&&void 0!==r?r:t.querySelector("div.header");if(!m)return e.style.height=a,e.style.minHeight=l,void(u.__flipping=!1);const g="none"!==window.getComputedStyle(m).display,b=i.style.paddingTop,y=n.style.paddingTop,v=n.style.getPropertyValue("padding-top"),w=()=>{i.style.paddingTop=b,v?n.style.setProperty("padding-top",v):n.style.paddingTop=y,window.__silvioFlipActive=!1},k="__sidebarCardHaHeaderObserver",_=window[k];_&&_.disconnect(),delete window[k];const S="__silvioHaOverlayRestore",C=e=>{const t=window[S];if(!e)return t&&t(),delete window[S],void(g||(m.style.display="none"));if(t)return;const i={display:m.style.display,position:m.style.position,top:m.style.top,left:m.style.left,right:m.style.right,width:m.style.width,zIndex:m.style.zIndex,pointerEvents:m.style.pointerEvents,margin:m.style.margin,transform:m.style.transform};window[S]=()=>{m.style.display=i.display,m.style.position=i.position,m.style.top=i.top,m.style.left=i.left,m.style.right=i.right,m.style.width=i.width,m.style.zIndex=i.zIndex,m.style.pointerEvents=i.pointerEvents,m.style.margin=i.margin,m.style.transform=i.transform},m.style.display="flex",m.style.position="fixed",m.style.top="0px",m.style.left="0px",m.style.right="0px",m.style.width="100%",m.style.zIndex="3000",m.style.pointerEvents="auto",m.style.margin="0",m.style.transform="translateZ(0)"},E=()=>{h.innerHTML="";const t=Oe(),i=Math.max("string"==typeof t&&Number.parseInt(t,10)||0,56),n=m.cloneNode(!0);n.style.display="flex",n.style.position="relative",n.style.width="100%",n.style.height=`${i}px`,n.style.minHeight=`${i}px`,n.style.visibility="visible",n.style.opacity="1",h.appendChild(n);const s=Math.round(p.getBoundingClientRect().height||0),o=Math.round(h.getBoundingClientRect().height||0),r=Math.max(s,o,i,c,72);return d.style.height=`${r}px`,e.style.height=`${Math.max(r,c)}px`,e.style.minHeight=`${Math.max(r,c)}px`,r},T=800,M=()=>{u.getAnimations().forEach(e=>e.cancel()),p.getAnimations().forEach(e=>e.cancel()),h.getAnimations().forEach(e=>e.cancel()),u.style.transformOrigin="50% 50%",u.style.transform="rotateX(0deg) translateZ(0px)",p.style.opacity="1",h.style.opacity="0",h.innerHTML=""},N=async()=>{window.__silvioFlipActive=!0,i.style.paddingTop=window.getComputedStyle(i).paddingTop,n.style.paddingTop=window.getComputedStyle(n).paddingTop;const e=E();p.style.opacity="1",h.style.opacity="0",u.getAnimations().forEach(e=>e.cancel()),p.getAnimations().forEach(e=>e.cancel()),h.getAnimations().forEach(e=>e.cancel()),u.style.transformOrigin="50% 50%",u.style.transform="rotateX(0deg) translateZ(0px)";const t=Math.max(10,Math.min(30,Math.round(e/6)));await new Promise(e=>{const i=u.animate([{transform:"rotateX(0deg) translateZ(0px)"},{transform:`rotateX(89deg) translateZ(${t}px)`},{transform:"rotateX(180deg) translateZ(0px)"}],{duration:T,easing:"ease-in-out",fill:"forwards"});p.animate([{opacity:1},{opacity:0}],{duration:T,easing:"ease-in-out",fill:"forwards"}),h.animate([{opacity:0},{opacity:1}],{duration:T,easing:"ease-in-out",fill:"forwards"}),i.onfinish=()=>e()}),C(!0),h.style.opacity="0",h.innerHTML=""};(async()=>{try{await N(),await(t=s,new Promise(e=>window.setTimeout(e,t))),await(async()=>{C(!1);const t=E();p.style.opacity="0",h.style.opacity="1",u.getAnimations().forEach(e=>e.cancel()),p.getAnimations().forEach(e=>e.cancel()),h.getAnimations().forEach(e=>e.cancel()),u.style.transformOrigin="50% 50%",u.style.transform="rotateX(180deg) translateZ(0px)";const i=Math.max(10,Math.min(30,Math.round(t/6)));await new Promise(e=>{const t=u.animate([{transform:"rotateX(180deg) translateZ(0px)"},{transform:`rotateX(91deg) translateZ(${i}px)`},{transform:"rotateX(0deg) translateZ(0px)"}],{duration:T,easing:"ease-in-out",fill:"forwards"});h.animate([{opacity:1},{opacity:0}],{duration:T,easing:"ease-in-out",fill:"forwards"}),p.animate([{opacity:0},{opacity:1}],{duration:T,easing:"ease-in-out",fill:"forwards"}),t.onfinish=()=>e()}),M(),w(),e.style.height=a,e.style.minHeight=l;const n=Math.round(p.getBoundingClientRect().height||0);d.style.height=`${Math.max(n,72)}px`})()}catch(t){C(!1),M(),w(),e.style.height=a,e.style.minHeight=l}finally{try{const e=new MutationObserver(()=>{A(),requestAnimationFrame(()=>{A()})});e.observe(m,{attributes:!0,attributeFilter:["style","class","hidden"]}),window[k]=e}catch(e){}try{A(),requestAnimationFrame(()=>{A()})}catch(e){}u.__flipping=!1}var t})()}w?w!==v.firstChild&&v.insertBefore(w,v.firstChild):(w=document.createElement("div"),w.id="customHeaderContainer",w.style.width="100%",w.style.boxSizing="border-box",v.insertBefore(w,v.firstChild)),await async function(e,t){let i=e.querySelector("header-card");i||(i=document.createElement("header-card"),e.appendChild(i),ie(i)),i.setConfig(t),i.hass=te()}(w,r);const _=(()=>{const e=r.sticky;if(null==e)return!0;if("boolean"==typeof e)return e;if("string"==typeof e){const t=e.toLowerCase().trim();return!("false"===t||"off"===t||"0"===t||"no"===t)}return"number"!=typeof e||0!==e})(),S="overlay"===r.topMenuMode?"overlay":"flip"===r.topMenuMode?"flip":"push",$=(()=>{const e=r.flipDuration;if(null==e)return 5e3;const t=Number(e);return!Number.isFinite(t)||t<=0?5e3:Math.round(1e3*t)})(),C=()=>{var e,t;const i=null!==(e=null==_e?void 0:_e())&&void 0!==e?e:null;return null!==(t=null==i?void 0:i.querySelector("div.header"))&&void 0!==t?t:c.querySelector("div.header")},E="__sidebarCardHaHeaderObserver",T=()=>{const e=window[E];e&&e.disconnect(),delete window[E];const t=E+"_resize",i=window[t];i&&i.disconnect(),delete window[t]},M=()=>{T();const e=C();if(!e)return;let t=!1,i=0;const n=()=>{const e=Date.now();t||e-i<100||(t=!0,i=e,requestAnimationFrame(()=>{A(),t=!1}))};let s=null;const o=new MutationObserver(()=>{s&&clearTimeout(s),s=setTimeout(n,30)});if(o.observe(e,{attributes:!0,attributeFilter:["style","class","hidden"],subtree:!1}),window[E]=o,"undefined"!=typeof ResizeObserver){const t=E+"_resize",i=window[t];i&&i.disconnect();const s=new ResizeObserver(()=>{n()});s.observe(e),window[t]=s}window[E+"_schedule"]=n};let N=0,O=!1;const A=()=>{if(_?"sticky"!==w.style.position&&(w.style.position="sticky",w.style.top="0px",w.style.zIndex="push"===S?"1":"1000"):"relative"!==w.style.position&&(w.style.position="relative",w.style.top="0px",w.style.zIndex="1"),"flip"!==S||window.silvioFlipTopMenu?"flip"!==S&&window.silvioFlipTopMenu&&delete window.silvioFlipTopMenu:window.silvioFlipTopMenu=()=>{try{k(w,c,v,g,$)}catch(e){}},!0===window.__silvioFlipActive)return;const e=C();if(!e)return void("0px"!==v.style.paddingTop&&(v.style.paddingTop="0px",g.style.removeProperty("padding-top")));const t=e.style.display;let i="none"!==t&&("flex"===t||"block"===t||""===t);if(!i&&"none"!==t)try{i="none"!==window.getComputedStyle(e).display}catch(e){i=!1}let n=0;i&&(i!==O?(n=Math.round(e.getBoundingClientRect().height),N=n):n=N),O=i;const s=i?50:0;let o;("push"===S||"flip"===S)&&n>0?(o=`${n}px`,v.style.paddingTop!==o&&(v.style.paddingTop=o,g.style.paddingTop="0px")):(o=`${s}px`,v.style.paddingTop!==o&&(v.style.paddingTop=o,g.style.removeProperty("padding-top")))},I=window[E+"_schedule"];I?I():A(),M();const L="__sidebarCardHeaderResizeHandler",z=window[L];z&&window.removeEventListener("resize",z);let P=null;const R=()=>{P&&clearTimeout(P),P=setTimeout(()=>{const e=window[E+"_schedule"];e?e():A()},150)};window[L]=R,window.addEventListener("resize",R,{passive:!0});const j="__sidebarCardHeaderScrollHandler",q=window[j];q&&window.removeEventListener("scroll",q,{passive:!0});let D=null;const B=()=>{D&&clearTimeout(D),D=setTimeout(()=>{const e=window[E+"_schedule"];e?e():A()},100)};window[j]=B,window.addEventListener("scroll",B,{passive:!0})}else Me("build","View element (#view) not found for header")}else{const H=c.querySelector("#customHeaderWrapper"),F=c.querySelector("#customHeaderContainer");if(F&&F.remove(),H){const Q=H.querySelector("#customSidebarWrapper"),Z=H.querySelector("#view"),ee=null!=Q?Q:Z;ee&&H.parentNode&&H.parentNode.insertBefore(ee,H),H.remove()}const U="__sidebarCardHeaderResizeHandler",K=window[U];K&&window.removeEventListener("resize",K),delete window[U];const V="__sidebarCardHeaderScrollHandler",J=window[V];J&&window.removeEventListener("scroll",J,{passive:!0}),delete window[V];const W="__sidebarCardHaHeaderObserver",Y=window[W];Y&&Y.disconnect(),delete window[W];const G=W+"_resize",X=window[G];X&&X.disconnect(),delete window[G]}rs=!0}else Me("build","App layout not found")}var cs;customElements.get("sidebar-card")||customElements.define("sidebar-card",class extends ee{static get properties(){return{hass:{},config:{},active:{}}}constructor(){super(),this.templateLines=[],this.clock=!1,this.updateMenu=!0,this.digitalClock=!1,this.twelveHourVersion=!1,this.digitalClockWithSeconds=!1,this.period=!1,this.date=!1,this.dateFormat="DD MMMM",this.bottomCard=null,this.CUSTOM_TYPE_PREFIX="custom:",this._clockInterval=null,this._dateInterval=null,this._intersectionObserver=null,this._updateMenuTimeout=null,this._lastActivePath="",this._boundLocationChange=()=>{this._updateMenuTimeout&&clearTimeout(this._updateMenuTimeout),this._updateMenuTimeout=setTimeout(()=>this._updateActiveMenu(),100)}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this._boundLocationChange),this.config&&(this._setupVisibilityObserver(),this._stopClock(),this._stopDate(),this._updateActiveMenu())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this._boundLocationChange),this._stopClock(),this._stopDate(),this._intersectionObserver&&(this._intersectionObserver.disconnect(),this._intersectionObserver=null)}_setupVisibilityObserver(){(this.config.clock||this.config.digitalClock||this.config.date)&&(this._intersectionObserver=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?((this.config.clock||this.config.digitalClock)&&this._startClock(),this.config.date&&this._startDate()):(this._stopClock(),this._stopDate())})},{threshold:.1}),this._intersectionObserver.observe(this))}_startClock(){this._clockInterval&&clearInterval(this._clockInterval);const e=this;e._runClock(),this._clockInterval=setInterval(()=>{e.isConnected?e._runClock():e._stopClock()},997)}_stopClock(){this._clockInterval&&(clearInterval(this._clockInterval),this._clockInterval=null)}_startDate(){this._dateInterval&&clearInterval(this._dateInterval);const e=this;e._runDate();this._dateInterval=setInterval(()=>{e.isConnected?e._runDate():e._stopDate()},36e5)}_stopDate(){this._dateInterval&&(clearInterval(this._dateInterval),this._dateInterval=null)}render(){var e,t;Fe.start("sidebar-render");const i=this.config.sidebarMenu,n="title"in this.config&&this.config.title,s="style"in this.config,o=this.config.menuStyle||"list";return this.clock=!!this.config.clock&&this.config.clock,this.digitalClock=!!this.config.digitalClock&&this.config.digitalClock,this.digitalClockWithSeconds=!!this.config.digitalClockWithSeconds&&this.config.digitalClockWithSeconds,this.twelveHourVersion=!!this.config.twelveHourVersion&&this.config.twelveHourVersion,this.period=!!this.config.period&&this.config.period,this.date=!!this.config.date&&this.config.date,this.dateFormat=this.config.dateFormat?this.config.dateFormat:"DD MMMM",this.bottomCard=this.config.bottomCard?this.config.bottomCard:null,this.updateMenu=!this.config.hasOwnProperty("updateMenu")||this.config.updateMenu,R`
      ${s?R`
            <style>
              ${this.config.style}
            </style>
          `:R``}

      <div class="sidebar-inner">
        ${this.digitalClock?R`
              <h1
                class="digitalClock${n?" with-title":""}${this.digitalClockWithSeconds?" with-seconds":""}"
              ></h1>
            `:R``}
        ${this.clock?R`
              <div class="clock">
                <div class="wrap">
                  <span class="hour"></span>
                  <span class="minute"></span>
                  <span class="second"></span>
                  <span class="dot"></span>
                </div>
              </div>
            `:R``}
        ${n?R`
              <h1 class="title">${n}</h1>
            `:R``}
        ${this.date?R`
              <h2 class="date"></h2>
            `:R``}
        ${i&&i.length>0?R`
              <ul
                class="sidebarMenu
                ${"buttons"===o?"sidebarMenu--buttons":""}
                ${"wide"===o?"sidebarMenu--wide":""}
                ${"grid"===o?"sidebarMenu--grid":""}"
              >
                ${(i||[]).filter(e=>this._evaluateVisibleCondition(e.conditional,this.hass)).map(e=>{const t=e.state&&this.hass.states[e.state]&&"off"!=this.hass.states[e.state].state&&"unavailable"!=this.hass.states[e.state].state,i=e.background_color||"",n=e.icon_color||"",s=`\n                      ${i?`--sidebar-button-bg:${i};--sidebar-wide-bg:${i};--sidebar-grid-bg:${i};`:""}\n                      ${n?`--sidebar-button-icon-color:${n};--sidebar-wide-icon-color:${n};--sidebar-grid-icon-color:${n};`:""}\n                    `;if("buttons"===o){const i=!0===this.config.showLabel;return R`
                        <li
                          @click="${e=>this._menuAction(e)}"
                          class="sidebar-item-button ${i?"sidebar-item-button--with-label":""} ${t?"active":""}"
                          data-type="${e.action}"
                          data-path="${e.navigation_path?e.navigation_path:""}"
                          data-menuitem="${JSON.stringify(e)}"
                          style="${s}"
                        >
                          <div class="sidebar-icon-wrapper">
                            ${e.icon?R`
                                  <ha-icon
                                    class="sidebar-icon"
                                    icon="${e.icon}"
                                  ></ha-icon>
                                `:R``}
                          </div>
                          ${i?R`
                                <span class="sidebar-label"
                                  >${e.name}</span
                                >
                              `:R``}
                        </li>
                      `}return"wide"===o?R`
                        <li
                          @click="${e=>this._menuAction(e)}"
                          class="sidebar-item-wide ${t?"active":""}"
                          data-type="${e.action}"
                          data-path="${e.navigation_path?e.navigation_path:""}"
                          data-menuitem="${JSON.stringify(e)}"
                          style="${s}"
                        >
                          ${e.icon?R`
                                <ha-icon
                                  class="sidebar-icon"
                                  icon="${e.icon}"
                                ></ha-icon>
                              `:R``}
                          <span class="sidebar-label"
                            >${e.name}</span
                          >
                        </li>
                      `:"grid"===o?R`
                        <li
                          @click="${e=>this._menuAction(e)}"
                          class="sidebar-item-grid ${t?"active":""}"
                          data-type="${e.action}"
                          data-path="${e.navigation_path?e.navigation_path:""}"
                          data-menuitem="${JSON.stringify(e)}"
                          style="${s}"
                        >
                          <div
                            class="sidebar-icon-wrapper sidebar-icon-wrapper-grid"
                          >
                            ${e.icon?R`
                                  <ha-icon
                                    class="sidebar-icon"
                                    icon="${e.icon}"
                                  ></ha-icon>
                                `:R``}
                          </div>
                          <span class="sidebar-label"
                            >${e.name}</span
                          >
                        </li>
                      `:R`
                      <li
                        @click="${e=>this._menuAction(e)}"
                        class="${t?"active":""}"
                        data-type="${e.action}"
                        data-path="${e.navigation_path?e.navigation_path:""}"
                        data-menuitem="${JSON.stringify(e)}"
                      >
                        <span>${e.name}</span>
                        ${e.icon?R`
                              <ha-icon
                                @click="${e=>this._menuAction(e)}"
                                icon="${e.icon}"
                              ></ha-icon>
                            `:R``}
                      </li>
                    `})}
              </ul>
            `:R``}
        ${this.config.template?R`
              <ul class="template">
                ${this.templateLines.map(e=>R`
                    ${function(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}(e)}
                  `)}
              </ul>
            `:R``}
        ${(null===(t=null===(e=this.hass)||void 0===e?void 0:e.user)||void 0===t?void 0:t.is_admin)?R`
              <div class="settings-gear" @click="${this._openSettings}">
                <ha-icon icon="mdi:cog"></ha-icon>
              </div>
            `:R``}
        ${this.bottomCard?R`
              <div class="bottom"></div>
            `:R``}
      </div>
    `}_openSettings(e){var t,i,n,s;e.stopPropagation();let o=document.querySelector("sidebar-card-editor");o||(o=document.createElement("sidebar-card-editor"),document.body.appendChild(o));const r=window.__sidebarCardLovelace,a=JSON.parse(JSON.stringify(null!==(i=null===(t=null==r?void 0:r.config)||void 0===t?void 0:t.sidebar)&&void 0!==i?i:{})),l=JSON.parse(JSON.stringify(null!==(s=null===(n=null==r?void 0:r.config)||void 0===n?void 0:n.header)&&void 0!==s?s:{}));o.open(a,l,this.hass)}_runClock(){Fe.start("clock-update");const e=new Date,t=e.getHours(),i=e.getMinutes(),n=e.getSeconds();if(this.clock){const e=t%12*30+.5*i,s=6*i,o=6*n,r=this.shadowRoot.querySelector(".hour"),a=this.shadowRoot.querySelector(".minute"),l=this.shadowRoot.querySelector(".second");r&&(r.style.transform=`rotate(${e}deg)`),a&&(a.style.transform=`rotate(${s}deg)`),l&&(l.style.transform=`rotate(${o}deg)`)}if(this.digitalClock){const i=this.hass&&this.hass.language||navigator.language||"en",n={hour:"2-digit",minute:"2-digit",hour12:this.twelveHourVersion};this.digitalClockWithSeconds&&(n.second="2-digit");let s=new Intl.DateTimeFormat(i,n).format(e);if(this.twelveHourVersion&&this.period){const e=t>=12?"pm":"am";s.toLowerCase().includes("am")||s.toLowerCase().includes("pm")||(s+=" "+e)}const o=this.shadowRoot.querySelector(".digitalClock");o&&(o.textContent=s)}Fe.end("clock-update")}_runDate(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".date");if(!e)return;const t=new Date,i=this.hass&&this.hass.language||navigator.language||"en",n={};this.dateFormat.includes("DD")?n.day="2-digit":this.dateFormat.includes("D")&&(n.day="numeric"),this.dateFormat.includes("MMMM")?n.month="long":this.dateFormat.includes("MMM")?n.month="short":this.dateFormat.includes("MM")?n.month="2-digit":this.dateFormat.includes("M")&&(n.month="numeric"),this.dateFormat.includes("YYYY")?n.year="numeric":this.dateFormat.includes("YY")&&(n.year="2-digit");const s=new Intl.DateTimeFormat(i,n);e.textContent=s.format(t)}updateSidebarSize(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".sidebar-inner");if(!t||!this.config)return;const i=Oe();t.style.width=this.offsetWidth+"px",this.config.hideTopMenu?(He(!1),t.style.height=`${window.innerHeight}px`,t.style.top="0px"):(He(!0),t.style.height=`calc(${window.innerHeight}px - ${i})`,t.style.top=i)}firstUpdated(){ie(this);const e=this;setTimeout(()=>{e.updateSidebarSize(),e._updateActiveMenu()},50),setTimeout(()=>{e.updateSidebarSize()},350);let t=null;window.addEventListener("resize",()=>{t&&clearTimeout(t),t=setTimeout(()=>{e.updateSidebarSize()},100)},!0),this.bottomCard&&setTimeout(()=>{let e;if(this.bottomCard.cardOptions?(e={type:this.bottomCard.type},e=Object.assign({},e,this.bottomCard.cardOptions)):e=this.bottomCard,Te("firstUpdated","Bottom card: ",e),!e||"object"!=typeof e||!e.type)return void Me("firstUpdated","Bottom card config error!");let t=e.type;t=t.startsWith(this.CUSTOM_TYPE_PREFIX)?t.substr(this.CUSTOM_TYPE_PREFIX.length):`hui-${t}-card`;const i=this.shadowRoot.querySelector(".bottom");if(!i)return void Me("firstUpdated","Bottom section not found");const n=()=>{const n=document.createElement(t);if("function"==typeof n.setConfig){if(n.setConfig(e),n.hass=te(),i.appendChild(n),ie(n),this.bottomCard.cardStyle&&""!==this.bottomCard.cardStyle){const e=this.bottomCard.cardStyle;let t=0;const i=setInterval(()=>{if(n&&n.shadowRoot){window.clearInterval(i);const t=document.createElement("style");t.innerHTML=e,n.shadowRoot.appendChild(t)}else 10===++t&&window.clearInterval(i)},100)}}else Me("firstUpdated",`Element "${t}" for bottomCard does not implement setConfig(). Check type "${e.type}".`)};customElements.get(t)?n():customElements.whenDefined(t).then(n).catch(e=>{Me("firstUpdated",`Error waiting for "${t}" definition`,e)})},2)}_updateActiveMenu(){if(!this.updateMenu)return;const e=document.location.pathname;if(e===this._lastActivePath)return;const t=this.shadowRoot.querySelectorAll('ul.sidebarMenu li[data-type="navigate"]');for(let e=0;e<t.length;e++)t[e].classList.remove("active");const i=this.shadowRoot.querySelector(`ul.sidebarMenu li[data-path="${e}"]`);i&&i.classList.add("active"),this._lastActivePath=e}_menuAction(e){const t=e.target;if(!t)return;const i=t.closest("li[data-menuitem]");if(!i)return;const n=i.getAttribute("data-menuitem");if(!n)return;const s=JSON.parse(n);this._customAction(s)}_evaluateVisibleCondition(e,t){var i,n,s,o,r;if(!e)return!0;const a=e.trim().replace(/^{{\s*|\s*}}$/g,"").trim();try{const e=a.match(/is_state\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);if(e){const[,n,s]=e;return(null===(i=t.states[n])||void 0===i?void 0:i.state)===s}const l=a.match(/is_state_attr\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);if(l){const[,e,i,o]=l;return(null===(s=null===(n=t.states[e])||void 0===n?void 0:n.attributes)||void 0===s?void 0:s[i])===o}const c=a.match(/states\[['"]([^'"]+)['"]\]\s*==\s*['"]([^'"]+)['"]/);if(c){const[,e,i]=c;return(null===(o=t.states[e])||void 0===o?void 0:o.state)===i}const d=a.match(/states\[['"]([^'"]+)['"]\]\s*\|\s*(int|float)\s*([<>]=?|==)\s*([\d.]+)/);if(d){const[,e,i,n,s]=d,o=null===(r=t.states[e])||void 0===r?void 0:r.state;if(void 0===o)return!1;const a="float"===i?parseFloat(o):parseInt(o,10),l=parseFloat(s);switch(n){case">":return a>l;case"<":return a<l;case">=":return a>=l;case"<=":return a<=l;case"==":return a==l;default:return!1}}return console.warn("sidebar-card: could not parse visible template:",a),!0}catch(e){return console.error("sidebar-card: visible template evaluation error:",e),!0}}_customAction(e){switch(e.action){case"more-info":(e.entity||e.camera_image)&&oe(e.entity?e.entity:e.camera_image);break;case"navigate":e.navigation_path&&be(window,e.navigation_path);break;case"url":e.url_path&&window.open(e.url_path);break;case"toggle":e.entity&&(ye(this.hass,e.entity),ge("success"));break;case"call-service":{if(!e.service)return void ge("failure");const[t,i]=e.service.split(".",2);this.hass.callService(t,i,e.service_data),ge("success");break}case"service-js":if(null==e?void 0:e.service)try{const t=String(e.service).replace(/^\[\[\[\s*|\s*\]\]\]$/g,"");new Function(t).call(this),ge("success")}catch(e){ge("failure")}else ge("failure");break;case"toggle-sidebar":try{const e=window;e&&"function"==typeof e.silvioToggleHaSidebar?(e.silvioToggleHaSidebar(),ge("success")):ge("failure")}catch(e){ge("failure")}break;case"toggle-topmenu":try{const e=window;e&&"function"==typeof e.silvioFlipTopMenu&&e.silvioFlipTopMenu(),e&&"function"==typeof e.silvioToggleTopMenu?(e.silvioToggleTopMenu(),ge("success")):ge("failure")}catch(e){ge("failure")}}}setConfig(e){this.config=e,this.config.template&&function(e,t,i,n=!0){e||(e=te().connection);let s={user:te().user.name,browser:le,hash:location.hash.substr(1)||" ",...i.variables},o=i.template,r=i.entity_ids;e.subscribeMessage(e=>{if(n){let i=String(e.result);const n=/_\([^)]*\)/g;i=i.replace(n,e=>te().localize(e.substring(2,e.length-1))||e),t(i)}else t(e.result)},{type:"render_template",template:o,variables:s,entity_ids:r})}(null,e=>{this.templateLines=e.match(/<(?:li|div)(?:\s+(?:class|id)\s*=\s*"([^"]*)")*\s*>([\s\S]*?)<\/(?:li|div)>/g).map(e=>e),this.requestUpdate()},{template:this.config.template,variables:{config:this.config},entity_ids:this.config.entity_ids})}getCardSize(){return 1}static get styles(){return Q`
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
        height: 100vh;
        overflow: visible;
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

      /* Settings gear icon */
      .settings-gear {
        margin-top: auto;
        padding: 12px 0;
        cursor: pointer;
        opacity: 0.4;
        transition: opacity 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .settings-gear:hover {
        opacity: 1;
      }
      .settings-gear ha-icon {
        color: var(--sidebar-icon-color, var(--secondary-text-color, #727272));
        --mdc-icon-size: 22px;
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
    `}}),customElements.get("header-card")||customElements.define("header-card",class extends ee{constructor(){super(...arguments),this._builtOnce=!1,this._lastCardConfigKey=""}static get properties(){return{hass:{},config:{}}}setConfig(e){this.config=e}firstUpdated(){ie(this),this._applyHeight(),this._ensureAllCards(),this._builtOnce=!0}updated(e){e.has("config")&&(this._applyHeight(),this._ensureAllCards()),e.has("hass")&&this._builtOnce&&this._pushHassToBuiltCards()}_applyHeight(){var e;const t=Number(null===(e=this.config)||void 0===e?void 0:e.height);Number.isFinite(t)&&t>0?this.style.setProperty("--header-height",`${t}px`):this.style.removeProperty("--header-height")}_pushHassToBuiltCards(){var e;const t=this.renderRoot.querySelectorAll("#slotLeft > *, #slotCenter > *, #slotRight > *"),i=null!==(e=this.hass)&&void 0!==e?e:te();t.forEach(e=>{try{e.hass=i}catch(e){}})}async _buildCardInto(e,t){const i=Symbol("headerBuild");if(e.__headerBuildToken=i,e.innerHTML="",!t||"object"!=typeof t||!t.type)return;let n=String(t.type);n=n.startsWith("custom:")?n.substring(7):`hui-${n}-card`;const s=()=>{var s,o;if(e.__headerBuildToken!==i)return;const r=document.createElement(n);"function"==typeof r.setConfig&&(r.hass=null!==(s=this.hass)&&void 0!==s?s:te(),r.setConfig(t),r.hass=null!==(o=this.hass)&&void 0!==o?o:te(),e.appendChild(r),ie(r))};if(customElements.get(n))s();else try{await customElements.whenDefined(n),s()}catch(e){}}_ensureAllCards(){var e,t,i,n,s,o;const r=this.renderRoot,a=this.config||{},l=JSON.stringify({left:null!==(e=a.leftCard)&&void 0!==e?e:null,center:null!==(t=a.centerCard)&&void 0!==t?t:null,right:null!==(i=a.rightCard)&&void 0!==i?i:null});if(l===this._lastCardConfigKey&&this._builtOnce)return;this._lastCardConfigKey=l;const c=r.querySelector("#slotLeft"),d=r.querySelector("#slotCenter"),u=r.querySelector("#slotRight");c&&this._buildCardInto(c,null!==(n=a.leftCard)&&void 0!==n?n:null),d&&this._buildCardInto(d,null!==(s=a.centerCard)&&void 0!==s?s:null),u&&this._buildCardInto(u,null!==(o=a.rightCard)&&void 0!==o?o:null)}_runAction(e,t){var i,n;e&&(e.preventDefault(),e.stopPropagation());switch(null==t?void 0:t.action){case"navigate":(null==t?void 0:t.navigation_path)&&(be(window,t.navigation_path),ge("success"));break;case"toggle":if(null==t?void 0:t.entity){const e=null!==(i=this.hass)&&void 0!==i?i:te();ye(e,t.entity),ge("success")}break;case"more-info":(null==t?void 0:t.entity)&&(oe(t.entity),ge("success"));break;case"call-service":{if(!(null==t?void 0:t.service))return void ge("failure");const[e,i]=String(t.service).split(".",2);(null!==(n=this.hass)&&void 0!==n?n:te()).callService(e,i,t.service_data),ge("success");break}case"service-js":if(null==t?void 0:t.service)try{const e=String(t.service).replace(/^\[\[\[\s*|\s*\]\]\]$/g,"");new Function(e).call(this),ge("success")}catch(e){ge("failure")}else ge("failure");break;case"toggle-sidebar":try{const e=window;e&&"function"==typeof e.silvioToggleHaSidebar?(e.silvioToggleHaSidebar(),ge("success")):ge("failure")}catch(e){ge("failure")}break;case"toggle-topmenu":try{const e=window;e&&"function"==typeof e.silvioFlipTopMenu&&e.silvioFlipTopMenu(),e&&"function"==typeof e.silvioToggleTopMenu?(e.silvioToggleTopMenu(),ge("success")):ge("failure")}catch(e){ge("failure")}}}_renderHeaderMenuItem(e,t){const i=(null==e?void 0:e.background_color)||"",n=(null==e?void 0:e.icon_color)||"",s=(null==e?void 0:e.text_color)||"";return R`
      <button
        class="header-item"
        style="${`\n      ${i?`--header-item-bg:${i};`:""}\n      ${n?`--header-item-icon-color:${n};`:""}\n      ${s?`--header-item-text-color:${s};`:""}\n    `}"
        title="${(null==e?void 0:e.name)||""}"
        aria-label="${(null==e?void 0:e.name)||""}"
        @click=${t=>this._runAction(t,e)}
      >
        ${(null==e?void 0:e.icon)?R`
              <ha-icon class="header-icon" icon="${e.icon}"></ha-icon>
            `:R``}
        ${t&&(null==e?void 0:e.name)?R`<span class="header-label">${e.name}</span>`:R``}
      </button>
    `}render(){const e=this.config||{},t="string"==typeof e.style&&e.style.trim().length>0,i="title"in e?e.title:"",n=Array.isArray(e.leftMenu)?e.leftMenu:[],s=Array.isArray(e.rightMenu)?e.rightMenu:[],o=Array.isArray(e.headerMenu)?e.headerMenu:[],r=e.headerMenuStyle||"wide",a=!1!==e.headerMenuShowLabel,l=e.headerMenuPosition||"right",c=o.length?R`
            <div class="headerMenuWrap">
              <div
                class="headerMenu
                ${"wide"===r?"headerMenu--wide":""}
                ${a?"with-label":"no-label"}"
              >
                ${o.map(e=>this._renderHeaderMenuItem(e,a))}
              </div>
            </div>
          `:R``;return R`
      ${t?R`
            <style>
              ${e.style}
            </style>
          `:R``}

      <div class="header-inner">
        <!-- LEFT AREA (sempre visibile) -->
        <div class="area area-left">
          ${n.length?R`
                <div class="iconMenu iconMenu-left">
                  ${n.map(e=>R`
                      <button
                        class="iconBtn"
                        title="${(null==e?void 0:e.name)||""}"
                        aria-label="${(null==e?void 0:e.name)||""}"
                        @click=${t=>this._runAction(t,e)}
                      >
                        ${(null==e?void 0:e.icon)?R`<ha-icon icon="${e.icon}"></ha-icon>`:R``}
                      </button>
                    `)}
                </div>
              `:R``}

          ${"left"===l?c:R``}

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

            ${"center"===l?c:R``}

            ${i?R`<div class="title">${i}</div>`:R``}
          </div>
        </div>

        <!-- RIGHT AREA (sempre visibile) -->
        <div class="area area-right">
          <div class="header-card-slot header-slot-right">
            <div id="slotRight"></div>
          </div>

          ${"right"===l?c:R``}

          ${s.length?R`
                <div class="iconMenu iconMenu-right">
                  ${s.map(e=>R`
                      <button
                        class="iconBtn"
                        title="${(null==e?void 0:e.name)||""}"
                        aria-label="${(null==e?void 0:e.name)||""}"
                        @click=${t=>this._runAction(t,e)}
                      >
                        ${(null==e?void 0:e.icon)?R`<ha-icon icon="${e.icon}"></ha-icon>`:R``}
                      </button>
                    `)}
                </div>
              `:R``}
        </div>
      </div>
    `}static get styles(){return Q`
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
    `}}),customElements.get("sidebar-card-editor")||customElements.define("sidebar-card-editor",class extends ee{constructor(){super(...arguments),this.hass=null,this._open=!1,this._activeTab="sidebar",this._sidebarConfig={},this._headerConfig={},this._dirty=!1,this._saving=!1,this._saveError=null,this._expandedIndices={},this._yamlSidebarText="",this._yamlHeaderText="",this._yamlError=null,this._isYamlMode=!1,this._yamlOutput=null,this._copyDone=!1}static get properties(){return{hass:{type:Object},_open:{type:Boolean},_activeTab:{type:String},_sidebarConfig:{type:Object},_headerConfig:{type:Object},_dirty:{type:Boolean},_saving:{type:Boolean},_saveError:{type:String},_expandedIndices:{type:Object},_yamlSidebarText:{type:String},_yamlHeaderText:{type:String},_yamlError:{type:String},_isYamlMode:{type:Boolean},_yamlOutput:{type:String},_copyDone:{type:Boolean}}}open(e,t,i){this._sidebarConfig=JSON.parse(JSON.stringify(e||{})),this._headerConfig=JSON.parse(JSON.stringify(t||{})),this.hass=i,this._dirty=!1,this._saving=!1,this._saveError=null,this._expandedIndices={},this._yamlSidebarText=Zn(this._sidebarConfig),this._yamlHeaderText=Zn(this._headerConfig),this._yamlError=null,this._yamlOutput=null,this._copyDone=!1;const n=window.__sidebarCardLovelace;this._isYamlMode="yaml"===(null==n?void 0:n.mode),this._open=!0}close(){this._open=!1}async _save(){var e,t;if("yaml"===this._activeTab)try{this._sidebarConfig=null!==(e=es(this._yamlSidebarText))&&void 0!==e?e:{},this._headerConfig=null!==(t=es(this._yamlHeaderText))&&void 0!==t?t:{},this._yamlError=null}catch(e){return void(this._yamlError="YAML non valido: "+e.message)}if(this._isYamlMode)this._yamlOutput=this._buildYamlOutput();else{this._saving=!0,this._saveError=null;try{await async function(e,t,i){var n,s;const o=null!==(n=window.__sidebarCardLovelace)&&void 0!==n?n:$e();if(!o||!o.config)throw new Error("sidebar-card: impossibile leggere la configurazione Lovelace corrente");if("yaml"===o.mode)throw new Error("La configurazione Lovelace è in modalità YAML (ui-lovelace.yaml). Il salvataggio automatico non è supportato: modifica il file manualmente.");const r=JSON.parse(JSON.stringify(o.config)),a={};for(const e of Object.keys(r))"sidebar"!==e&&"header"!==e&&"views"!==e&&(a[e]=r[e]);const l=void 0!==t?t:r.sidebar;l&&Object.keys(l).length>0&&(a.sidebar=l);const c=void 0!==i?i:r.header;c&&Object.keys(c).length>0&&(a.header=c),void 0!==r.views&&(a.views=r.views),await e.callWS({type:"lovelace/config/save",url_path:null!==(s=o.urlPath)&&void 0!==s?s:null,config:a})}(this.hass,this._sidebarConfig,this._headerConfig),this._dirty=!1,this.close(),window.location.reload()}catch(e){console.error("sidebar-card-editor: save failed",e),this._saveError="Errore nel salvataggio: "+(e.message||String(e))}finally{this._saving=!1}}}_buildYamlOutput(){const e=(t,i)=>{if(null==t)return"null";if("boolean"==typeof t)return t?"true":"false";if("number"==typeof t)return String(t);if("string"==typeof t)return/[:{}\[\],&*#?|<>=!%@`\n\r]/.test(t)||t.trim()!==t||""===t?JSON.stringify(t):t;if(Array.isArray(t)){if(0===t.length)return"[]";const n=" ".repeat(i);return t.map(t=>{if("object"==typeof t&&null!==t&&!Array.isArray(t)){const s=Object.keys(t);if(0===s.length)return`${n}- {}`;const[o,...r]=s;let a=`${n}- ${o}: ${e(t[o],i+2)}`;for(const s of r)a+=`\n${n}  ${s}: ${e(t[s],i+2)}`;return a}return`${n}- ${e(t,i+2)}`}).join("\n")}if("object"==typeof t){const n=Object.keys(t);if(0===n.length)return"{}";const s=" ".repeat(i);return n.map(n=>{const o=t[n];return"object"==typeof o&&null!==o&&Object.keys(o).length>0||Array.isArray(o)&&o.length>0?`${s}${n}:\n${e(o,i+2)}`:`${s}${n}: ${e(o,i+2)}`}).join("\n")}return String(t)};let t="";return Object.keys(this._sidebarConfig).length>0&&(t+="sidebar:\n"+e(this._sidebarConfig,2)+"\n"),Object.keys(this._headerConfig).length>0&&(t&&(t+="\n"),t+="header:\n"+e(this._headerConfig,2)+"\n"),t||"# nessuna configurazione"}async _copyYamlOutput(){var e;if(this._yamlOutput){try{await navigator.clipboard.writeText(this._yamlOutput)}catch(t){const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".yaml-copy-ta");i&&(i.select(),document.execCommand("copy"))}this._copyDone=!0,setTimeout(()=>{this._copyDone=!1},2500)}}_setSidebar(e,t){this._sidebarConfig=Object.assign(Object.assign({},this._sidebarConfig),{[e]:t}),this._dirty=!0}_deleteSidebar(e){const t=Object.assign({},this._sidebarConfig);delete t[e],this._sidebarConfig=t,this._dirty=!0}_setHeader(e,t){this._headerConfig=Object.assign(Object.assign({},this._headerConfig),{[e]:t}),this._dirty=!0}_deleteHeader(e){const t=Object.assign({},this._headerConfig);delete t[e],this._headerConfig=t,this._dirty=!0}_getExpandedIdx(e){var t;return null!==(t=this._expandedIndices[e])&&void 0!==t?t:-1}_setExpandedIdx(e,t){this._expandedIndices=Object.assign(Object.assign({},this._expandedIndices),{[e]:t})}_getMenuItems(e){return[...(os(e)?this._headerConfig:this._sidebarConfig)[e]||[]]}_saveMenuItems(e,t){os(e)?this._headerConfig=Object.assign(Object.assign({},this._headerConfig),{[e]:t}):this._sidebarConfig=Object.assign(Object.assign({},this._sidebarConfig),{[e]:t}),this._dirty=!0}_setMenuItemField(e,t,i,n){const s=this._getMenuItems(e);s[t]=Object.assign(Object.assign({},s[t]),{[i]:n}),this._saveMenuItems(e,s)}_addMenuItem(e){const t=this._getMenuItems(e);t.push({action:"navigate",name:"Nuovo",icon:"mdi:home",navigation_path:"/lovelace/0"}),this._saveMenuItems(e,t),this._setExpandedIdx(e,t.length-1)}_removeMenuItem(e,t){const i=this._getMenuItems(e);i.splice(t,1),this._saveMenuItems(e,i),this._setExpandedIdx(e,-1)}_moveMenuItem(e,t,i){const n=this._getMenuItems(e),s=t+i;if(s<0||s>=n.length)return;const o=n[t];n[t]=n[s],n[s]=o,this._saveMenuItems(e,n),this._setExpandedIdx(e,s)}render(){return this._open?R`
      <div class="overlay" @click="${this._onOverlayClick}">
        <div class="dialog" @click="${e=>e.stopPropagation()}">
          <!-- Header -->
          <div class="dialog-header">
            <ha-icon-button
              .label=${"Chiudi"}
              @click="${this.close}"
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
            <span class="dialog-title">Sidebar Card Settings</span>
            <button
              class="save-btn ${this._dirty?"dirty":""}"
              @click="${this._save}"
              ?disabled="${this._saving||!this._dirty}"
            >
              ${this._isYamlMode?"Genera config":this._saving?"Salvataggio…":"Salva"}
            </button>
          </div>

          ${this._saveError?R`<div class="error-banner">${this._saveError}</div>`:""}

          ${null!==this._yamlOutput?R`
                <div class="yaml-output-panel">
                  <div class="yaml-output-header">
                    <span>Incolla questo YAML in <code>ui-lovelace.yaml</code></span>
                    <button
                      class="copy-btn ${this._copyDone?"copied":""}"
                      @click="${this._copyYamlOutput}"
                    >
                      <ha-icon icon="${this._copyDone?"mdi:check":"mdi:content-copy"}"></ha-icon>
                      ${this._copyDone?"Copiato!":"Copia"}
                    </button>
                  </div>
                  <textarea
                    class="yaml-editor yaml-copy-ta"
                    readonly
                    .value="${this._yamlOutput}"
                  ></textarea>
                  <div class="yaml-output-hint">
                    Sostituisci (o aggiungi) le sezioni <code>sidebar:</code> e <code>header:</code>
                    nel tuo file di configurazione Lovelace.
                  </div>
                </div>
              `:""}

          <!-- Tabs -->
          <div class="tabs">
            ${["sidebar","header","yaml"].map(e=>R`
                <button
                  class="tab ${this._activeTab===e?"active":""}"
                  @click="${()=>{this._activeTab=e,"yaml"===e&&(this._yamlSidebarText=Zn(this._sidebarConfig),this._yamlHeaderText=Zn(this._headerConfig),this._yamlError=null)}}"
                >
                  ${"sidebar"===e?"Sidebar":"header"===e?"Header":"YAML"}
                </button>
              `)}
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            ${"sidebar"===this._activeTab?this._renderSidebarTab():"header"===this._activeTab?this._renderHeaderTab():this._renderYamlTab()}
          </div>
        </div>
      </div>
    `:R``}_onOverlayClick(){this._dirty?confirm("Hai modifiche non salvate. Chiudere senza salvare?")&&this.close():this.close()}_renderSidebarTab(){var e;const t=this._sidebarConfig;return R`
      <!-- Sezione: Generale -->
      <details open>
        <summary>Generale</summary>
        <div class="section">
          ${this._renderToggle("Abilitato",!1!==t.enabled,e=>this._setSidebar("enabled",e))}
          ${this._renderText("Titolo",t.title||"",e=>this._setSidebar("title",e))}
          ${this._renderWidthField(t)}
        </div>
      </details>

      <!-- Sezione: Orologio & Data -->
      <details>
        <summary>Orologio & Data</summary>
        <div class="section">
          ${this._renderToggle("Orologio analogico",!!t.clock,e=>this._setSidebar("clock",e))}
          ${this._renderToggle("Orologio digitale",!!t.digitalClock,e=>this._setSidebar("digitalClock",e))}
          ${t.digitalClock?this._renderToggle("Con secondi",!!t.digitalClockWithSeconds,e=>this._setSidebar("digitalClockWithSeconds",e)):""}
          ${this._renderToggle("Formato 12 ore",!!t.twelveHourVersion,e=>this._setSidebar("twelveHourVersion",e))}
          ${t.twelveHourVersion?this._renderToggle("Mostra AM/PM",!!t.period,e=>this._setSidebar("period",e)):""}
          ${this._renderToggle("Mostra data",!1!==t.date,e=>this._setSidebar("date",e))}
          ${!1!==t.date?this._renderText("Formato data",t.dateFormat||"DD MMMM",e=>this._setSidebar("dateFormat",e)):""}
        </div>
      </details>

      <!-- Sezione: Layout -->
      <details>
        <summary>Layout</summary>
        <div class="section">
          ${this._renderToggle("Nascondi sidebar HA",!!t.hideHassSidebar,e=>this._setSidebar("hideHassSidebar",e))}
          ${this._renderToggle("Nascondi top menu",!!t.hideTopMenu,e=>this._setSidebar("hideTopMenu",e))}
          ${t.hideTopMenu?this._renderToggle("Mostra top menu su mobile",!1!==t.showTopMenuOnMobile,e=>this._setSidebar("showTopMenuOnMobile",e)):""}
          ${this._renderSelect("Stile menu",t.menuStyle||"list",is,e=>this._setSidebar("menuStyle",e))}
          ${this._renderToggle("Mostra etichette",!1!==t.showLabel,e=>this._setSidebar("showLabel",e))}
          ${this._renderToggle("Aggiorna menu attivo",!1!==t.updateMenu,e=>this._setSidebar("updateMenu",e))}
        </div>
      </details>

      <!-- Sezione: Menu Items -->
      <details>
        <summary>Voci del Menu (${(t.sidebarMenu||[]).length})</summary>
        <div class="section">
          ${this._renderMenuItems(t.sidebarMenu||[],"sidebarMenu")}
          <button class="add-btn" @click="${()=>this._addMenuItem("sidebarMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi voce
          </button>
        </div>
      </details>

      <!-- Sezione: Card in fondo alla sidebar -->
      <details>
        <summary>
          Card in basso (bottomCard)
          ${t.bottomCard?R`<span class="slot-badge">${t.bottomCard.type||"?"}</span>`:""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(null!==(e=t.bottomCard)&&void 0!==e?e:null,e=>e?this._setSidebar("bottomCard",e):this._deleteSidebar("bottomCard"),"vertical-stack")}
        </div>
      </details>

      <!-- Sezione: CSS personalizzato -->
      <details>
        <summary>Stile CSS personalizzato</summary>
        <div class="section">
          <div class="css-hint">Inserisci CSS che verrà iniettato nella sidebar.</div>
          <textarea
            class="yaml-editor css-editor"
            .value="${t.style||""}"
            @input="${e=>{const t=e.target.value;t.trim()?this._setSidebar("style",t):this._deleteSidebar("style")}}"
            spellcheck="false"
            placeholder="/* es: .sidebar-inner { background: #1a1a2e; } */"
          ></textarea>
        </div>
      </details>
    `}_renderHeaderTab(){var e,t,i;const n=this._headerConfig;return R`
      <!-- Sezione: Generale -->
      <details open>
        <summary>Generale</summary>
        <div class="section">
          ${this._renderToggle("Abilitato",!1!==n.enabled,e=>this._setHeader("enabled",e))}
          ${this._renderToggle("Sticky",!1!==n.sticky,e=>this._setHeader("sticky",e))}
          ${this._renderNumber("Altezza minima (px)",n.height||72,e=>this._setHeader("height",e))}
          ${this._renderText("Titolo",n.title||"",e=>this._setHeader("title",e))}
        </div>
      </details>

      <!-- Sezione: Top Menu Mode -->
      <details>
        <summary>Modalità Top Menu</summary>
        <div class="section">
          ${this._renderSelect("Modalità",n.topMenuMode||"overlay",ns,e=>this._setHeader("topMenuMode",e))}
          ${"flip"===n.topMenuMode?this._renderNumber("Durata flip (sec)",n.flipDuration||5,e=>this._setHeader("flipDuration",e)):""}
        </div>
      </details>

      <!-- Sezione: Card Slot Sinistra -->
      <details>
        <summary>
          Card Sinistra (leftCard)
          ${n.leftCard?R`<span class="slot-badge">${n.leftCard.type||"?"}</span>`:""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(null!==(e=n.leftCard)&&void 0!==e?e:null,e=>e?this._setHeader("leftCard",e):this._deleteHeader("leftCard"),"horizontal-stack")}
        </div>
      </details>

      <!-- Sezione: Card Slot Centro -->
      <details>
        <summary>
          Card Centro (centerCard)
          ${n.centerCard?R`<span class="slot-badge">${n.centerCard.type||"?"}</span>`:""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(null!==(t=n.centerCard)&&void 0!==t?t:null,e=>e?this._setHeader("centerCard",e):this._deleteHeader("centerCard"),"horizontal-stack")}
        </div>
      </details>

      <!-- Sezione: Card Slot Destra -->
      <details>
        <summary>
          Card Destra (rightCard)
          ${n.rightCard?R`<span class="slot-badge">${n.rightCard.type||"?"}</span>`:""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(null!==(i=n.rightCard)&&void 0!==i?i:null,e=>e?this._setHeader("rightCard",e):this._deleteHeader("rightCard"),"horizontal-stack")}
        </div>
      </details>

      <!-- Sezione: Menu Header Centrale -->
      <details>
        <summary>Menu Header (${(n.headerMenu||[]).length} voci)</summary>
        <div class="section">
          ${this._renderSelect("Stile menu",n.headerMenuStyle||"wide",is,e=>this._setHeader("headerMenuStyle",e))}
          ${this._renderToggle("Mostra etichette",!1!==n.headerMenuShowLabel,e=>this._setHeader("headerMenuShowLabel",e))}
          ${this._renderSelect("Posizione",n.headerMenuPosition||"right",ss,e=>this._setHeader("headerMenuPosition",e))}
          <div class="menu-subsection-label">Voci</div>
          ${this._renderMenuItems(n.headerMenu||[],"headerMenu")}
          <button class="add-btn" @click="${()=>this._addMenuItem("headerMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi voce
          </button>
        </div>
      </details>

      <!-- Sezione: Menu icone a sinistra -->
      <details>
        <summary>Menu Icone Sinistra (leftMenu – ${(n.leftMenu||[]).length} voci)</summary>
        <div class="section">
          <div class="css-hint">Bottoni icona visualizzati nell'area sinistra dell'header.</div>
          ${this._renderMenuItems(n.leftMenu||[],"leftMenu")}
          <button class="add-btn" @click="${()=>this._addMenuItem("leftMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi icona
          </button>
        </div>
      </details>

      <!-- Sezione: Menu icone a destra -->
      <details>
        <summary>Menu Icone Destra (rightMenu – ${(n.rightMenu||[]).length} voci)</summary>
        <div class="section">
          <div class="css-hint">Bottoni icona visualizzati nell'area destra dell'header.</div>
          ${this._renderMenuItems(n.rightMenu||[],"rightMenu")}
          <button class="add-btn" @click="${()=>this._addMenuItem("rightMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi icona
          </button>
        </div>
      </details>

      <!-- Sezione: CSS personalizzato -->
      <details>
        <summary>Stile CSS personalizzato</summary>
        <div class="section">
          <div class="css-hint">Inserisci CSS che verrà iniettato nell'header.</div>
          <textarea
            class="yaml-editor css-editor"
            .value="${n.style||""}"
            @input="${e=>{const t=e.target.value;t.trim()?this._setHeader("style",t):this._deleteHeader("style")}}"
            spellcheck="false"
            placeholder="/* es: .header-inner { background: linear-gradient(...); } */"
          ></textarea>
        </div>
      </details>
    `}_renderYamlTab(){return R`
      ${this._yamlError?R`<div class="error-banner">${this._yamlError}</div>`:""}

      <details open>
        <summary>Sidebar (YAML)</summary>
        <div class="section">
          <textarea
            class="yaml-editor"
            .value="${this._yamlSidebarText}"
            @input="${e=>{this._yamlSidebarText=e.target.value,this._dirty=!0,this._yamlError=null}}"
            spellcheck="false"
          ></textarea>
        </div>
      </details>

      <details open>
        <summary>Header (YAML)</summary>
        <div class="section">
          <textarea
            class="yaml-editor"
            .value="${this._yamlHeaderText}"
            @input="${e=>{this._yamlHeaderText=e.target.value,this._dirty=!0,this._yamlError=null}}"
            spellcheck="false"
          ></textarea>
        </div>
      </details>
    `}_renderCardSlot(e,t,i){var n;const s=null==e?void 0:e.type,o="horizontal-stack"===s||"vertical-stack"===s,r=o?s:null!=i?i:"horizontal-stack";if(o||!!i&&!e){const i=null!==(n=null==e?void 0:e.cards)&&void 0!==n?n:[],s=()=>{const e=[...i,{type:"custom:button-card",show_name:!1,show_icon:!0}];t({type:r,cards:e})},o=e=>{const n=i.filter((t,i)=>i!==e);t({type:r,cards:n})},a=(e,n)=>{const s=[...i],o=e+n;o<0||o>=s.length||([s[e],s[o]]=[s[o],s[e]],t({type:r,cards:s}))},l=(e,n)=>{try{const s=es(n);if(!s||"object"!=typeof s)return;const o=[...i];o[e]=s,t({type:r,cards:o})}catch(e){}};return R`
        <div class="card-slot">

          <!-- ── Intestazione slot ── -->
          <div class="stack-slot-header">
            <ha-icon icon="mdi:layers-outline" class="stack-slot-icon"></ha-icon>
            <div class="stack-slot-info">
              <span class="stack-type-badge">${r}</span>
              <span class="stack-card-count">${i.length} card</span>
            </div>
            ${e?R`
                  <button class="stack-remove-slot-btn" @click="${()=>t(null)}">
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                    Rimuovi slot
                  </button>
                `:""}
          </div>

          <!-- ── Stato vuoto ── -->
          ${0===i.length?R`
            <div class="stack-empty-state">
              <ha-icon icon="mdi:card-plus-outline"></ha-icon>
              <span>Stack vuota — clicca <strong>Aggiungi card</strong> per iniziare</span>
            </div>
          `:""}

          <!-- ── Card collassabili ── -->
          ${i.map((e,t)=>R`
            <details class="stack-card-details">
              <summary class="stack-card-summary" @click="${e=>e.stopPropagation()}">

                <!-- Numero circolare -->
                <span class="stack-card-num">${t+1}</span>

                <!-- Tipo card -->
                <span class="stack-card-type-label">${e.type||"(tipo mancante)"}</span>

                <!-- Frecce riordina -->
                <div class="stack-card-move" @click="${e=>e.stopPropagation()}">
                  <button
                    class="stack-move-btn"
                    @click="${e=>{e.preventDefault(),a(t,-1)}}"
                    ?disabled="${0===t}"
                    title="Sposta su"
                  >▲</button>
                  <button
                    class="stack-move-btn"
                    @click="${e=>{e.preventDefault(),a(t,1)}}"
                    ?disabled="${t===i.length-1}"
                    title="Sposta giù"
                  >▼</button>
                </div>

                <!-- Elimina -->
                <button
                  class="stack-delete-btn"
                  @click="${e=>{e.preventDefault(),o(t)}}"
                  title="Elimina card"
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                  Elimina
                </button>

                <!-- Chevron expand -->
                <ha-icon class="stack-chevron" icon="mdi:chevron-down"></ha-icon>
              </summary>

              <!-- Corpo: editor YAML -->
              <div class="stack-card-body">
                <div class="stack-card-body-hint">
                  YAML della card · modifica e clicca fuori (Tab/click) per applicare
                </div>
                <textarea
                  class="stack-card-editor"
                  .value="${Zn(e)}"
                  @change="${e=>l(t,e.target.value)}"
                  spellcheck="false"
                ></textarea>
              </div>
            </details>
          `)}

          <!-- ── Aggiungi card ── -->
          <button class="stack-add-btn" @click="${s}">
            <ha-icon icon="mdi:plus"></ha-icon>
            Aggiungi card
          </button>

        </div>
      `}const a=e&&"object"==typeof e&&e.type,l=a?Zn(e):"type: custom:my-card\n";return R`
      <div class="card-slot">
        ${a?R`
              <div class="card-slot-active">
                <div class="card-slot-type-row">
                  <ha-icon icon="mdi:card-outline" class="card-slot-icon"></ha-icon>
                  <span class="card-slot-type">${e.type}</span>
                  <button
                    class="small-btn danger-btn"
                    @click="${()=>t(null)}"
                    title="Rimuovi card"
                  >
                    <ha-icon icon="mdi:delete"></ha-icon> Rimuovi
                  </button>
                </div>
                <textarea
                  class="yaml-editor card-json-editor"
                  .value="${l}"
                  @change="${e=>{try{const i=es(e.target.value);i&&"object"==typeof i&&t(i)}catch(e){}}}"
                  spellcheck="false"
                  rows="6"
                ></textarea>
                <div class="card-slot-hint">Modifica il YAML e premi Tab/click fuori per applicare.</div>
              </div>
            `:R`
              <div class="card-slot-empty">
                <ha-icon icon="mdi:card-plus-outline" class="card-slot-empty-icon"></ha-icon>
                <span>Nessuna card configurata</span>
                <button
                  class="small-btn"
                  @click="${()=>t({type:null!=i?i:"custom:my-card"})}"
                >
                  <ha-icon icon="mdi:plus"></ha-icon> Aggiungi card
                </button>
              </div>
            `}
      </div>
    `}_renderMenuItems(e,t){const i=this._getExpandedIdx(t);return R`
      <div class="menu-items-list">
        ${e.map((n,s)=>{const o=i===s;return R`
            <div class="menu-item-row ${o?"expanded":""}">
              <!-- Header row -->
              <div class="menu-item-header" @click="${()=>{this._setExpandedIdx(t,o?-1:s)}}">
                <div class="menu-item-arrows">
                  <ha-icon-button
                    .label=${"Su"}
                    @click="${e=>{e.stopPropagation(),this._moveMenuItem(t,s,-1)}}"
                    ?disabled="${0===s}"
                  >
                    <ha-icon icon="mdi:arrow-up"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    .label=${"Giù"}
                    @click="${e=>{e.stopPropagation(),this._moveMenuItem(t,s,1)}}"
                    ?disabled="${s===e.length-1}"
                  >
                    <ha-icon icon="mdi:arrow-down"></ha-icon>
                  </ha-icon-button>
                </div>
                <ha-icon
                  class="menu-item-icon"
                  icon="${n.icon||"mdi:help-circle"}"
                ></ha-icon>
                <span class="menu-item-name">${n.name||"(senza nome)"}</span>
                <span class="menu-item-action-badge">${n.action||"navigate"}</span>
                <ha-icon-button
                  .label=${"Elimina"}
                  class="delete-btn"
                  @click="${e=>{e.stopPropagation(),this._removeMenuItem(t,s)}}"
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
                <ha-icon
                  class="expand-chevron"
                  icon="${o?"mdi:chevron-up":"mdi:chevron-down"}"
                ></ha-icon>
              </div>

              <!-- Expanded detail -->
              ${o?this._renderMenuItemDetail(n,s,t):""}
            </div>
          `})}
      </div>
    `}_renderMenuItemDetail(e,t,i){const n=e.action||"navigate",s=(e,n)=>this._setMenuItemField(i,t,e,n);return R`
      <div class="menu-item-detail">
        ${this._renderText("Nome",e.name||"",e=>s("name",e))}

        <div class="field-row">
          <label>Icona</label>
          <div class="icon-picker-row">
            <ha-icon icon="${e.icon||"mdi:home"}"></ha-icon>
            <input
              type="text"
              .value="${e.icon||""}"
              placeholder="mdi:home"
              @change="${e=>s("icon",e.target.value)}"
            />
          </div>
        </div>

        ${this._renderSelect("Azione",n,ts,e=>s("action",e))}

        ${"navigate"===n?this._renderText("Percorso",e.navigation_path||"",e=>s("navigation_path",e)):""}

        ${"toggle"===n||"more-info"===n?this._renderText("Entità",e.entity||"",e=>s("entity",e)):""}

        ${"call-service"===n?R`
              ${this._renderText("Servizio",e.service||"",e=>s("service",e))}
              <div class="field-row">
                <label>Service Data (YAML)</label>
                <textarea
                  class="service-data-editor"
                  .value="${Zn(e.service_data||{})}"
                  @change="${e=>{try{const t=es(e.target.value);null!=t&&s("service_data",t)}catch(e){}}}"
                  spellcheck="false"
                ></textarea>
              </div>
            `:""}

        ${"service-js"===n?R`
              <div class="field-row">
                <label>Codice JS</label>
                <textarea
                  class="service-data-editor"
                  .value="${e.service||""}"
                  placeholder="// es: navigate(window, '/lovelace/0')"
                  @change="${e=>s("service",e.target.value)}"
                  spellcheck="false"
                ></textarea>
              </div>
            `:""}

        ${"url"===n?this._renderText("URL",e.url_path||"",e=>s("url_path",e)):""}

        <!-- Colori -->
        <details class="color-section">
          <summary>Colori (opzionale)</summary>
          <div class="color-fields">
            ${this._renderColor("Sfondo",e.background_color||"",e=>s("background_color",e||void 0))}
            ${this._renderColor("Icona",e.icon_color||"",e=>s("icon_color",e||void 0))}
            ${this._renderColor("Testo",e.text_color||"",e=>s("text_color",e||void 0))}
          </div>
        </details>

        <!-- Stato & Condizionale (avanzato) -->
        <details class="advanced-section">
          <summary>Avanzato</summary>
          <div class="section">
            ${this._renderText("State entity",e.state||"",e=>s("state",e))}
            ${this._renderText("Condizione (template)",e.conditional||"",e=>s("conditional",e))}
          </div>
        </details>
      </div>
    `}_renderToggle(e,t,i){return R`
      <div class="field-row">
        <label>${e}</label>
        <ha-switch
          .checked="${t}"
          @change="${e=>i(e.target.checked)}"
        ></ha-switch>
      </div>
    `}_renderText(e,t,i){return R`
      <div class="field-row">
        <label>${e}</label>
        <input
          type="text"
          .value="${t}"
          @change="${e=>i(e.target.value)}"
        />
      </div>
    `}_renderNumber(e,t,i){return R`
      <div class="field-row">
        <label>${e}</label>
        <input
          type="number"
          .value="${String(t)}"
          @change="${e=>i(Number(e.target.value))}"
        />
      </div>
    `}_renderSelect(e,t,i,n){return R`
      <div class="field-row">
        <label>${e}</label>
        <select
          .value="${t}"
          @change="${e=>n(e.target.value)}"
        >
          ${i.map(e=>R`<option value="${e.value}" ?selected="${e.value===t}">${e.label}</option>`)}
        </select>
      </div>
    `}_renderColor(e,t,i){return R`
      <div class="color-field">
        <label>${e}</label>
        <div class="color-input-wrap">
          <input
            type="color"
            .value="${t||"#000000"}"
            @input="${e=>i(e.target.value)}"
          />
          <input
            type="text"
            class="color-text"
            .value="${t}"
            placeholder="nessuno"
            @change="${e=>i(e.target.value)}"
          />
          ${t?R`<button class="color-clear" @click="${()=>i("")}" title="Rimuovi">✕</button>`:""}
        </div>
      </div>
    `}_renderWidthField(e){var t,i,n;const s=e.width;return R`
      <div class="field-row">
        <label>Larghezza (%)</label>
        <div class="width-control">
          ${"object"==typeof s&&null!==s?R`
                <div class="width-responsive">
                  <div class="width-responsive-row">
                    <span>Mobile:</span>
                    <input type="number" .value="${String(null!==(t=s.mobile)&&void 0!==t?t:0)}"
                      @change="${e=>{const t=Number(e.target.value);this._setSidebar("width",Object.assign(Object.assign({},s),{mobile:t}))}}" />
                  </div>
                  <div class="width-responsive-row">
                    <span>Tablet:</span>
                    <input type="number" .value="${String(null!==(i=s.tablet)&&void 0!==i?i:16)}"
                      @change="${e=>{const t=Number(e.target.value);this._setSidebar("width",Object.assign(Object.assign({},s),{tablet:t}))}}" />
                  </div>
                  <div class="width-responsive-row">
                    <span>Desktop:</span>
                    <input type="number" .value="${String(null!==(n=s.desktop)&&void 0!==n?n:18)}"
                      @change="${e=>{const t=Number(e.target.value);this._setSidebar("width",Object.assign(Object.assign({},s),{desktop:t}))}}" />
                  </div>
                  <button class="small-btn" @click="${()=>{var e;return this._setSidebar("width",null!==(e=s.desktop)&&void 0!==e?e:18)}}">
                    Usa valore fisso
                  </button>
                </div>
              `:R`
                <input type="number" .value="${String(null!=s?s:18)}"
                  @change="${e=>this._setSidebar("width",Number(e.target.value))}" />
                <button class="small-btn" @click="${()=>this._setSidebar("width",{mobile:0,tablet:null!=s?s:16,desktop:null!=s?s:18})}">
                  Responsive
                </button>
              `}
        </div>
      </div>
    `}static get styles(){return Q`
      /* ══ Variabili tema ══════════════════════════════════════════ */
      :host {
        --editor-bg:       var(--card-background-color, #ffffff);
        --editor-page-bg:  var(--secondary-background-color, #f0f4f8);
        --editor-text:     var(--primary-text-color, #1a202c);
        --editor-secondary:var(--secondary-text-color, #64748b);
        --editor-primary:  var(--primary-color, #0288d1);
        --editor-divider:  var(--divider-color, rgba(0,0,0,0.09));
        --editor-surface:  var(--ha-card-background, var(--card-background-color, #fff));
        --editor-error:    var(--error-color, #e53e3e);
        --editor-success:  #38a169;
        --editor-shadow:   0 2px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06);
        --editor-radius:   12px;
      }

      /* ══ Overlay ═════════════════════════════════════════════════ */
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
      }

      /* ══ Dialog ══════════════════════════════════════════════════ */
      .dialog {
        background: var(--editor-page-bg);
        color: var(--editor-text);
        border-radius: var(--editor-radius);
        width: 95vw;
        max-width: 860px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.15);
      }
      @media (max-width: 500px) {
        .dialog { width:100vw; height:100vh; max-height:100vh; border-radius:0; }
      }

      /* ══ Dialog header (gradiente blu) ═══════════════════════════ */
      .dialog-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 18px;
        background: linear-gradient(135deg, #1565c0 0%, #0288d1 100%);
        flex-shrink: 0;
      }
      .dialog-header ha-icon-button {
        --mdc-icon-button-size: 36px;
        --mdc-icon-size: 20px;
        color: rgba(255,255,255,0.85);
      }
      .dialog-header ha-icon-button:hover {
        --mdc-icon-button-color: rgba(255,255,255,1);
      }
      .dialog-title {
        flex: 1;
        font-size: 17px;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.2px;
      }
      .save-btn {
        border: 2px solid rgba(255,255,255,0.45);
        background: rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.6);
        padding: 7px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: not-allowed;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .save-btn.dirty {
        background: #fff;
        border-color: #fff;
        color: #1565c0;
        cursor: pointer;
        box-shadow: 0 3px 12px rgba(0,0,0,0.25);
      }
      .save-btn:disabled {
        cursor: not-allowed;
      }

      /* ══ Error banner ════════════════════════════════════════════ */
      .error-banner {
        background: var(--editor-error);
        color: #fff;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 500;
        flex-shrink: 0;
      }

      /* ══ Tabs (pill style su sfondo grigio) ══════════════════════ */
      .tabs {
        display: flex;
        gap: 6px;
        padding: 10px 18px;
        background: var(--editor-page-bg);
        flex-shrink: 0;
      }
      .tab {
        flex: 1;
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        background: rgba(0,0,0,0.06);
        font-size: 13px;
        font-weight: 600;
        color: var(--editor-secondary);
        cursor: pointer;
        transition: all 0.18s;
        letter-spacing: 0.2px;
      }
      .tab:hover { background: rgba(0,0,0,0.10); }
      .tab.active {
        background: var(--editor-bg);
        color: var(--editor-primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.14);
      }

      /* ══ Tab content ═════════════════════════════════════════════ */
      .tab-content {
        overflow-y: auto;
        flex: 1;
        padding: 4px 14px 20px;
        background: var(--editor-page-bg);
      }

      /* ══ Sezioni come card (details principali) ══════════════════ */
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) {
        background: var(--editor-bg);
        border-radius: var(--editor-radius);
        margin-top: 10px;
        border: none;
        box-shadow: var(--editor-shadow);
        overflow: hidden;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary {
        padding: 14px 18px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        color: var(--editor-text);
        user-select: none;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 2px solid transparent;
        transition: background 0.15s;
        list-style: none;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary::marker,
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary::-webkit-details-marker {
        display: none;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary:hover {
        background: rgba(2,136,209,0.04);
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details)[open] > summary {
        border-bottom-color: var(--editor-divider);
        color: var(--editor-primary);
      }
      /* Chevron auto nella summary */
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary::after {
        content: "›";
        font-size: 20px;
        font-weight: 400;
        color: var(--editor-secondary);
        margin-left: auto;
        transition: transform 0.18s;
        line-height: 1;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details)[open] > summary::after {
        transform: rotate(90deg);
      }

      /* Badge tipo card nella summary */
      .slot-badge {
        font-size: 10px;
        font-weight: 700;
        color: var(--editor-primary);
        background: rgba(2,136,209,0.12);
        padding: 2px 8px;
        border-radius: 10px;
        letter-spacing: 0.3px;
      }

      /* ══ Section (contenuto delle card) ══════════════════════════ */
      .section {
        padding: 4px 0 12px;
      }

      /* ══ Field rows ══════════════════════════════════════════════ */
      .field-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 18px;
        gap: 14px;
        min-height: 44px;
        border-bottom: 1px solid var(--editor-divider);
      }
      .field-row:last-child { border-bottom: none; }
      .field-row label {
        font-size: 13px;
        font-weight: 500;
        color: var(--editor-text);
        flex-shrink: 0;
        min-width: 130px;
      }
      .field-row input[type="text"],
      .field-row input[type="number"] {
        flex: 1;
        min-width: 0;
        padding: 7px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .field-row input[type="text"]:focus,
      .field-row input[type="number"]:focus {
        border-color: var(--editor-primary);
        background: var(--editor-bg);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }
      .field-row select {
        flex: 1;
        min-width: 0;
        padding: 7px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
        transition: border-color 0.15s;
        cursor: pointer;
      }
      .field-row select:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }
      .field-row ha-switch {
        --mdc-theme-secondary: var(--editor-primary);
      }

      /* ══ Icon picker ═════════════════════════════════════════════ */
      .icon-picker-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
      }
      .icon-picker-row ha-icon { --mdc-icon-size: 22px; color: var(--editor-secondary); }
      .icon-picker-row input {
        flex: 1;
        padding: 7px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
      }
      .icon-picker-row input:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }

      /* ══ Width controls ══════════════════════════════════════════ */
      .width-control { flex:1; display:flex; align-items:center; gap:8px; }
      .width-control input[type="number"] {
        width: 72px;
        padding: 7px 10px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
      }
      .width-responsive { display:flex; flex-direction:column; gap:4px; flex:1; }
      .width-responsive-row { display:flex; align-items:center; gap:8px; }
      .width-responsive-row span { font-size:12px; color:var(--editor-secondary); width:60px; }
      .width-responsive-row input {
        width: 64px;
        padding: 5px 8px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 6px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
      }

      /* ══ Pulsanti generici ═══════════════════════════════════════ */
      .small-btn {
        padding: 5px 12px;
        font-size: 12px;
        font-weight: 500;
        border: 1.5px solid var(--editor-divider);
        border-radius: 7px;
        background: var(--editor-bg);
        color: var(--editor-primary);
        cursor: pointer;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: background 0.13s, border-color 0.13s;
      }
      .small-btn:hover { background: rgba(2,136,209,0.08); border-color: var(--editor-primary); }
      .danger-btn { color: var(--editor-error) !important; border-color: rgba(229,62,62,0.45) !important; }
      .danger-btn:hover { background: rgba(229,62,62,0.08) !important; }

      /* ══ Sezioni colori e avanzate (nested) ══════════════════════ */
      .color-section,
      .advanced-section {
        border: none;
        background: none;
        box-shadow: none;
        border-radius: 0;
        margin: 0;
      }
      .color-section summary,
      .advanced-section summary {
        font-size: 12px;
        font-weight: 600;
        color: var(--editor-secondary);
        padding: 6px 0;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        gap: 6px;
        list-style: none;
      }
      .color-section summary::after,
      .advanced-section summary::after { display: none; }
      .color-fields { display:flex; gap:12px; flex-wrap:wrap; padding-bottom:8px; }
      .color-field { display:flex; flex-direction:column; gap:4px; }
      .color-field label { font-size:11px; color:var(--editor-secondary); }
      .color-input-wrap { display:flex; align-items:center; gap:4px; }
      .color-input-wrap input[type="color"] {
        width:28px; height:28px;
        border: 1.5px solid var(--editor-divider);
        border-radius:6px; padding:2px;
        cursor:pointer; background:var(--editor-surface);
      }
      .color-text {
        width:76px; padding:5px 8px; font-size:12px;
        border: 1.5px solid var(--editor-divider);
        border-radius:6px;
        background: var(--editor-surface);
        color: var(--editor-text);
        outline: none;
      }
      .color-clear {
        border:none; background:none;
        color:var(--editor-secondary); cursor:pointer;
        font-size:14px; padding:0 4px;
      }

      /* ══ Aggiungi voce menu ═══════════════════════════════════════ */
      .add-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
        padding: 10px 14px;
        border: 2px dashed rgba(2,136,209,0.35);
        border-radius: 10px;
        background: none;
        color: var(--editor-primary);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        justify-content: center;
        transition: background 0.15s, border-color 0.15s;
        box-sizing: border-box;
      }
      .add-btn:hover { background: rgba(2,136,209,0.07); border-color: var(--editor-primary); }
      .add-btn ha-icon { --mdc-icon-size: 18px; }

      /* ══ Menu items list ════════════════════════════════════════ */
      .menu-items-list { display:flex; flex-direction:column; gap:6px; }
      .menu-item-row {
        border: 1.5px solid var(--editor-divider);
        border-radius: 10px;
        overflow: hidden;
        background: var(--editor-bg);
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .menu-item-row.expanded {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.10);
      }
      .menu-item-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        cursor: pointer;
        user-select: none;
        min-height: 44px;
      }
      .menu-item-header:hover { background: rgba(0,0,0,0.03); }
      .menu-item-arrows { display:flex; flex-direction:column; }
      .menu-item-arrows ha-icon-button { --mdc-icon-button-size:24px; --mdc-icon-size:14px; color:var(--editor-secondary); }
      .menu-item-icon { --mdc-icon-size:20px; color:var(--editor-secondary); flex-shrink:0; }
      .menu-item-name { flex:1; font-size:13px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .menu-item-action-badge {
        font-size: 10px;
        font-weight: 600;
        color: var(--editor-secondary);
        background: rgba(0,0,0,0.07);
        padding: 2px 8px;
        border-radius: 8px;
        flex-shrink: 0;
      }
      .delete-btn { --mdc-icon-button-size:30px; --mdc-icon-size:17px; color:var(--editor-error); }
      .expand-chevron { --mdc-icon-size:18px; color:var(--editor-secondary); flex-shrink:0; }
      .menu-item-detail {
        padding: 12px 16px 16px;
        border-top: 1px solid var(--editor-divider);
        background: var(--editor-page-bg);
      }
      .menu-subsection-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--editor-secondary);
        text-transform: uppercase;
        letter-spacing: 0.7px;
        margin: 12px 0 8px;
      }

      /* ══ Service data / codice JS ═══════════════════════════════ */
      .service-data-editor {
        width: 100%;
        min-height: 70px;
        padding: 8px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        font-family: "Roboto Mono","Consolas",monospace;
        font-size: 12px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        resize: vertical;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s;
      }
      .service-data-editor:focus { border-color: var(--editor-primary); }

      /* ══ YAML / JSON editor (tab YAML) ══════════════════════════ */
      .yaml-editor {
        width: 100%;
        min-height: 300px;
        padding: 14px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 10px;
        font-family: "Roboto Mono","Consolas",monospace;
        font-size: 13px;
        line-height: 1.55;
        background: var(--editor-bg);
        color: var(--editor-text);
        resize: vertical;
        tab-size: 2;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .yaml-editor:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }
      .css-editor { min-height: 130px; font-size: 12px; }
      .css-hint {
        font-size: 12px;
        color: var(--editor-secondary);
        margin-bottom: 8px;
        font-style: italic;
      }

      /* ══ Card slot (non-stack) ══════════════════════════════════ */
      .card-slot { margin: 6px 0 4px; }
      .card-slot-active { display:flex; flex-direction:column; gap:10px; }
      .card-slot-type-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: rgba(2,136,209,0.07);
        border-radius: 8px;
        border: 1.5px solid rgba(2,136,209,0.20);
      }
      .card-slot-icon { --mdc-icon-size:20px; color:var(--editor-primary); flex-shrink:0; }
      .card-slot-type { flex:1; font-size:13px; font-weight:600; color:var(--editor-primary); font-family:"Roboto Mono",monospace; }
      .card-json-editor { min-height:130px; font-size:12px; }
      .card-slot-hint { font-size:11px; color:var(--editor-secondary); font-style:italic; }
      .card-slot-empty {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border: 2px dashed var(--editor-divider);
        border-radius: 10px;
        color: var(--editor-secondary);
        font-size: 13px;
      }
      .card-slot-empty-icon { --mdc-icon-size:24px; color:var(--editor-divider); }

      /* ══════════════════════════════════════════════════
         STACK SLOT  (horizontal-stack / vertical-stack)
         ══════════════════════════════════════════════════ */

      /* Intestazione slot ------------------------------------------ */
      .stack-slot-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        background: linear-gradient(135deg, rgba(3,169,244,0.10) 0%, rgba(3,169,244,0.04) 100%);
        border-radius: 10px;
        border: 1.5px solid rgba(3, 169, 244, 0.28);
        margin-bottom: 12px;
      }
      .stack-slot-icon {
        --mdc-icon-size: 22px;
        color: var(--editor-primary);
        flex-shrink: 0;
      }
      .stack-slot-info {
        flex: 1;
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .stack-type-badge {
        font-family: "Roboto Mono", monospace;
        font-size: 13px;
        font-weight: 700;
        color: var(--editor-primary);
      }
      .stack-card-count {
        font-size: 12px;
        color: var(--editor-secondary);
        background: rgba(0,0,0,0.06);
        padding: 1px 7px;
        border-radius: 10px;
      }
      .stack-remove-slot-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        font-size: 12px;
        font-weight: 500;
        border: 1.5px solid rgba(219, 68, 55, 0.45);
        border-radius: 7px;
        background: none;
        color: var(--editor-error);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        transition: background 0.15s;
      }
      .stack-remove-slot-btn:hover {
        background: rgba(219, 68, 55, 0.10);
      }
      .stack-remove-slot-btn ha-icon { --mdc-icon-size: 15px; }

      /* Stato vuoto ------------------------------------------------- */
      .stack-empty-state {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 16px;
        border: 2px dashed var(--editor-divider);
        border-radius: 10px;
        color: var(--editor-secondary);
        font-size: 13px;
        margin-bottom: 10px;
      }
      .stack-empty-state ha-icon {
        --mdc-icon-size: 28px;
        color: rgba(3,169,244,0.35);
        flex-shrink: 0;
      }

      /* Card collassabile ------------------------------------------- */
      .stack-card-details {
        border: 1.5px solid var(--editor-divider);
        border-radius: 10px;
        margin-bottom: 8px;
        overflow: hidden;
        background: var(--editor-surface);
        transition: border-color 0.15s;
      }
      .stack-card-details[open] {
        border-color: var(--editor-primary);
      }
      .stack-card-details summary { list-style: none; }
      .stack-card-details summary::-webkit-details-marker { display: none; }

      .stack-card-summary {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        cursor: pointer;
        user-select: none;
        background: rgba(0,0,0,0.025);
        min-height: 48px;
      }
      .stack-card-details[open] .stack-card-summary {
        background: rgba(3,169,244,0.06);
        border-bottom: 1px solid var(--editor-divider);
      }

      /* Numero circolare */
      .stack-card-num {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: var(--editor-primary);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      /* Tipo card */
      .stack-card-type-label {
        flex: 1;
        font-family: "Roboto Mono", "Consolas", monospace;
        font-size: 13px;
        font-weight: 600;
        color: var(--editor-text);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }

      /* Pulsanti riordina */
      .stack-card-move {
        display: flex;
        gap: 2px;
        flex-shrink: 0;
      }
      .stack-move-btn {
        width: 28px;
        height: 28px;
        border: 1px solid var(--editor-divider);
        border-radius: 5px;
        background: var(--editor-surface);
        color: var(--editor-secondary);
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: background 0.12s, color 0.12s;
      }
      .stack-move-btn:hover:not([disabled]) {
        background: rgba(3,169,244,0.12);
        color: var(--editor-primary);
        border-color: var(--editor-primary);
      }
      .stack-move-btn[disabled] {
        opacity: 0.25;
        cursor: not-allowed;
      }

      /* Pulsante elimina (rosso, testo visibile) */
      .stack-delete-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 10px;
        border: 1.5px solid rgba(219,68,55,0.45);
        border-radius: 7px;
        background: none;
        color: var(--editor-error);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.12s;
      }
      .stack-delete-btn:hover {
        background: rgba(219,68,55,0.10);
      }
      .stack-delete-btn ha-icon { --mdc-icon-size: 15px; }

      /* Chevron espansione */
      .stack-chevron {
        --mdc-icon-size: 20px;
        color: var(--editor-secondary);
        flex-shrink: 0;
        transition: transform 0.18s;
      }
      .stack-card-details[open] .stack-chevron {
        transform: rotate(180deg);
      }

      /* Corpo espanso: editor JSON ---------------------------------- */
      .stack-card-body {
        padding: 12px 14px 14px;
        background: var(--editor-surface);
      }
      .stack-card-body-hint {
        font-size: 11px;
        color: var(--editor-secondary);
        font-style: italic;
        margin-bottom: 8px;
      }
      .stack-card-editor {
        display: block;
        width: 100%;
        min-height: 280px;
        padding: 12px 14px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        font-family: "Roboto Mono", "Consolas", monospace;
        font-size: 12.5px;
        line-height: 1.6;
        background: rgba(0,0,0,0.025);
        color: var(--editor-text);
        resize: vertical;
        tab-size: 2;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s, background 0.15s;
      }
      .stack-card-editor:focus {
        border-color: var(--editor-primary);
        background: var(--editor-surface);
        box-shadow: 0 0 0 3px rgba(3,169,244,0.10);
      }

      /* Aggiungi card ----------------------------------------------- */
      .stack-add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 12px 0;
        margin-top: 4px;
        border: 2px dashed rgba(3, 169, 244, 0.45);
        border-radius: 10px;
        background: rgba(3, 169, 244, 0.05);
        color: var(--editor-primary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-sizing: border-box;
        transition: background 0.15s, border-color 0.15s;
      }
      .stack-add-btn:hover {
        background: rgba(3, 169, 244, 0.13);
        border-color: var(--editor-primary);
      }
      .stack-add-btn ha-icon { --mdc-icon-size: 20px; }
      .card-slot-active {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .card-slot-type-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: rgba(3, 169, 244, 0.07);
        border-radius: 6px;
        border: 1px solid rgba(3, 169, 244, 0.2);
      }
      .card-slot-icon {
        --mdc-icon-size: 18px;
        color: var(--editor-primary);
        flex-shrink: 0;
      }
      .card-slot-type {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        color: var(--editor-primary);
        font-family: "Roboto Mono", monospace;
      }
      .card-json-editor {
        min-height: 120px;
        font-size: 12px;
      }
      .card-slot-hint {
        font-size: 11px;
        color: var(--editor-secondary);
        font-style: italic;
      }
      .card-slot-empty {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px dashed var(--editor-divider);
        border-radius: 8px;
        color: var(--editor-secondary);
        font-size: 13px;
      }
      .card-slot-empty-icon {
        --mdc-icon-size: 22px;
        color: var(--editor-divider);
      }

      /* Hint / note */
      .css-hint {
        font-size: 12px;
        color: var(--editor-secondary);
        margin-bottom: 6px;
        font-style: italic;
      }

      /* Separatore sezione menu */
      .menu-subsection-label {
        font-size: 11px;
        font-weight: 600;
        color: var(--editor-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 10px 0 6px;
      }

      /* ---- YAML output panel (modalità file YAML) ---- */
      .yaml-output-panel {
        flex-shrink: 0;
        background: rgba(3, 169, 244, 0.06);
        border: 1px solid var(--editor-primary);
        border-radius: 8px;
        padding: 10px 14px;
        margin: 6px 0 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .yaml-output-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 12px;
        font-weight: 500;
        color: var(--editor-primary);
      }
      .yaml-output-header code {
        font-family: "Roboto Mono", monospace;
        font-style: normal;
        background: rgba(3, 169, 244, 0.12);
        padding: 1px 4px;
        border-radius: 3px;
      }
      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 12px;
        border: 1px solid var(--editor-primary);
        border-radius: 6px;
        background: none;
        color: var(--editor-primary);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }
      .copy-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .copy-btn:hover {
        background: rgba(3, 169, 244, 0.12);
      }
      .copy-btn.copied {
        background: var(--editor-success);
        border-color: var(--editor-success);
        color: #fff;
      }
      .yaml-copy-ta {
        min-height: 160px;
        max-height: 320px;
        font-size: 12px;
      }
      .yaml-output-hint {
        font-size: 11px;
        color: var(--editor-secondary);
        font-style: italic;
      }
      .yaml-output-hint code {
        font-family: "Roboto Mono", monospace;
        font-style: normal;
        background: rgba(0, 0, 0, 0.07);
        padding: 1px 4px;
        border-radius: 3px;
      }
    `}}),console.info(`%c  ${ve.padEnd(24)}%c\n  Version: ${"1.3".padEnd(9)}      `,"color: chartreuse; background: black; font-weight: 700;","color: white; background: dimgrey; font-weight: 700;"),ls(),cs=()=>{rs=!1,ls()},setTimeout(()=>{window.addEventListener("location-changed",()=>{const e=Se(),t=null==e?void 0:e.shadowRoot;if(!t)return;const i=t.querySelector("div");if(!i)return;const n=i.querySelector("#customSidebarWrapper");if(n){const e=n.querySelector("#customSidebar"),t=n.querySelector("#customHeaderContainer");e||t||cs()}else cs()})},1e3);
