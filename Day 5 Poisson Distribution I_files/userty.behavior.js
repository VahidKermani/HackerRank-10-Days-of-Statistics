/***************************************
* @license
* Built December 02, 17 23:37:02
* Version: 0.1.9
* Minor version: jssdk-rc-0.1.8.151
***************************************/
("undefined"!=typeof _aurycDefine?_aurycDefine:define)(["require","_auryc","aurycConfig",_aurycNormalizeUrl("core/userty.utils.js"),_aurycNormalizeUrl("core/userty.m.js")],function(e,t,aurycConfig,r,i){function n(){var e=r.getConfig("uba_api_uri","base");return e=location.protocol+"//"+e}function s(){var e=r.getConfig("token_uri","base");return e=location.protocol+"//"+e}function o(){var e=r.getSiteid();return"DE_"+e}function a(e,t,i){if(t){var n={"Content-Type":"application/json","X-Authorized-Identity":r.getSiteid(),"X-Authorized-Token":JSON.parse(t).siteToken};d(i,n,"GET",e)}}function l(e,t){var i=g.sessStg.get(r.SYMBOLS.APITOKEN+"_"+r.getSiteid());if(i)a(t,i,e);else{var n=s()+"/"+r.getSiteid()+"/token",o=function(r){return a(t,r,e)},l={uri:n,type:"TOKEN",callback:o};d(l,null,"GET",t)}}function u(e){if(!e||!r.isArray(e)||0===e.length)return!1;var t=(typeof e[0]).toLowerCase();if("string"!==t&&"number"!==t&&"boolean"!==t)return!1;for(var i=0;i<e.length;i++)if(null===e[i]||typeof e[i]!==t||t.length>1024)return!1;return!0}function c(e){return!!e&&"undefined"!==e&&e.length<=1024}function S(e){for(var t in e){if(!c(t))return!1;if(r.isArray(e[t]))return u(e[t]);if(null===e[t]||"undefined"==typeof e[t]||e[t].length>1024||"string"!=typeof e[t]&&"number"!=typeof e[t]&&"boolean"!=typeof e[t])return!1}return!0}function p(e){for(var t in e)if(r.isArray(e[t])){e[t].length>20&&(e[t]=e[t].slice(0,20));for(var i=0;i<e[t].length;i++)"string"===(typeof e[t][i]).toLowerCase()?e[t][i]=e[t][i].toLowerCase():e[t][i]=e[t][i];e[t]=JSON.stringify(e[t])}return e}function d(e,t,i,n){try{var s=window.XMLHttpRequest?new window.XMLHttpRequest:window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):null;s.open(i,e.uri,!0);var a=this;s.onreadystatechange=function(){if(4==this.readyState&&200==this.status)if("TOKEN"===e.type){if(s.responseText&&s.responseText.length>1){var t={siteToken:JSON.parse(s.responseText).siteToken};g.sessStg.setSession(r.SYMBOLS.APITOKEN+"_"+r.getSiteid(),JSON.stringify(t),r.SYMBOLS.STORAGE.SCOPE.SESSION.BROWSER),e.callback&&"function"==typeof e.callback&&e.callback.call(a,s.responseText)}}else if("EVENTGROUP"===e.type&&s.responseText&&s.responseText.length>1){var i=JSON.parse(s.responseText);i=i.data.map(function(e,t){return{id:e.id,eventName:e.name,eventType:e.eventType,snapshotProperties:e.snapshotProperties,jsCriteria:e.jsCriteria}}),g.sessStg.setTab(o(),i),r._.console.log(o(),i),e.callback&&"function"==typeof e.callback&&e.callback.call(a,i)}"USERIDENTIFY"===e.type&&(4==this.readyState&&200==this.status?s.responseText&&s.responseText.length>1&&e.callback&&"function"==typeof e.callback&&e.callback.call(a,s.responseText):4==this.readyState&&226==this.status&&e.callback&&"function"==typeof e.callback&&e.callback.call(a,226))};for(var l in t)s.setRequestHeader(l,t[l]);n?s.send(JSON.stringify(n)):s.send()}catch(u){r._.console.log(u)}}function f(){return location.href}var g={};g.PublicAPI={exposePublicAPI:function(e,t){t&&(e.auryc||(e.aurycBehaviorAPI={}),e.userty||(e.userty={}),r.ext(e.aurycBehaviorAPI,t,!1),r.ext(e.userty,t,!1))}},g.IdentifyAPI=function(e){this.product=e||"auryc"},g.loadEventGroups=function(e){var t=g.sessStg.get(o());if(t)e(t);else{var i=n()+"/eventgroup/?projectId="+r.getSiteid();l({uri:i,type:"EVENTGROUP",callback:e})}};var h={badProp:"The property key or values are invalid",dupName:"The name has already been used. Please choose a different name",badIdentity:"The identity value is invalid"};g.IdentifyAPI.prototype={isBehaviorTrackingEnabled:function(){return!0},identify:function(e){if(e&&e.length>0&&e.length<256&&0!==e&&1!==e&&e!==-1&&"nan"!==e&&"n/a"!==e&&"undefined"!==e&&"null"!==e&&"nil"!==e){var t=function(t){var i=g.persStg.get(r.SYMBOLS.EVENT.IDENTITYVALUE);if(i===e)return void r._.console.warn("identity already set. Return");var n=g.persStg.get(r.SYMBOLS.EVENT.USERID);226===t?r.SubPub.publish(r.SYMBOLS.EVENT.USERIDENTIFY,{userIdentify:e}):n!==t&&(g.persStg.setSession(r.SYMBOLS.EVENT.USERID,t),r.SubPub.publish(r.SYMBOLS.EVENT.USERIDENTIFY,{sessionMerge:n})),g.persStg.setSession(r.SYMBOLS.EVENT.IDENTITYVALUE,e)},i=g.persStg.get(r.SYMBOLS.EVENT.IDENTITYVALUE);if(i===e)return;var s=n()+"/user/identify?siteId="+encodeURIComponent(r.getSiteid())+"&identity="+encodeURIComponent(e);l({uri:s,type:"USERIDENTIFY",callback:t})}else console.error(h.badIdentity)},addSessionProperties:function(e){var t=!0;if("object"==typeof e)if(t=S(e)){e=p(e);var i=g.sessStg.get(r.SYMBOLS.STORAGE.GLOBALSESSIONID),n=i+r.SYMBOLS.EVENT.SESSIONPROP,s=g.sessStg.get(n);if(s&&JSON.stringify(e)===s)return void r._.console.log("session properties already set and identical to the new one. skip");var o=JSON.stringify(e),a=g.sessStg.getSize();a+o.length<1024&&(r._.console.log("session properties not identical to the new one. call API"),g.sessStg.setSession(n,o)),r.SubPub.publish(r.SYMBOLS.EVENT.USERIDENTIFY,{sessionProperties:e})}else console.error(h.badProp);else console.error(h.badProp)},addInternalSessionProperties:function(e){var t=!0;if("object"==typeof e)if(t=S(e)){e=p(e);var i=g.sessStg.get(r.SYMBOLS.STORAGE.GLOBALSESSIONID),n=i+r.SYMBOLS.EVENT.INTERNALSESSIONPROP,s=g.sessStg.get(n);if(s&&JSON.stringify(e)===s)return void r._.console.log("session properties already set and identical to the new one. skip");var o=JSON.stringify(e),a=g.sessStg.getSize();a+o.length<1024&&(r._.console.log("session properties not identical to the new one. call API"),g.sessStg.setSession(n,o)),r.SubPub.publish(r.SYMBOLS.EVENT.USERIDENTIFY,{internalSessionProperties:e})}else console.error(h.badProp);else console.error(h.badProp)},addUserProperties:function(e){var t=!0,i=g.persStg.get(r.SYMBOLS.EVENT.USERID);if("object"==typeof e&&i)if(t=S(e)){e=p(e);var n=null,s={};try{s=JSON.parse(g.persStg.get(r.SYMBOLS.EVENT.USERPROP)),n=s[i]}catch(o){}if(s[i]=e,n&&JSON.stringify(e)===JSON.stringify(n))return void r._.console.log("user properties already set and identical to the new one. skip");r._.console.log("user properties not identical to the new one. call API");var a=g.persStg.getSize(),l=JSON.stringify(s),u=JSON.stringify(e);if(a+l.length<1024)g.persStg.setSession(r.SYMBOLS.EVENT.USERPROP,l);else if(u.length<1024){for(var c=Object.keys(s),d=0;d<c.length;d++)c[d]!==i&&delete s[c[d]];l=JSON.stringify(s),g.persStg.setSession(r.SYMBOLS.EVENT.USERPROP,l)}r.SubPub.publish(r.SYMBOLS.EVENT.USERIDENTIFY,{userProperties:e})}else console.error(h.badProp);else console.error(h.badProp)},track:function(e,t){var i=!0,s=!r._.isEmptyObject(t);!e||e.length>1024?(i=!1,console.error(e)):s&&(i=S(t));var a=function(i){for(var n=!0,s=0;s<i.length;s++)if(i[s].eventName===e&&"CUSTOM"!==i[s].eventType){n=!1;break}n?r.SubPub.publish(r.SYMBOLS.EVENT.TRACKCUSTOMEVENT,{eventType:r.SYMBOLS.UBAEVENTTYPE.CUSTOM_EVENT,eventName:e,eventProperties:t||{},currentTime:r.now()}):console.error(h.dupName)};if(i){t=p(t);var u=r.getSiteid(),c=g.sessStg.get(o());if(c)a(c);else{var d=n()+"/eventgroup/?projectId="+u;l({uri:d,type:"EVENTGROUP",callback:a})}}else console.error(h.badProp)},clearUserCookie:function(e){var t=!0;e&&!g.persStg.get(r.SYMBOLS.EVENT.IDENTITYVALUE)&&(r._.console.log("called clear user cookie but identity is null. skip"),t=!1),t&&(r._.console.log("clear user cookie"),r.globalSessionTracker.removeUser())}};var E=function(){};return E.prototype.init=function(e){history.pushState&&window.addEventListener&&(this.tracker=e,this.path=f(),this.updateTrackerData=this.updateTrackerData.bind(this),this.originalPushState=history.pushState,history.pushState=function(e,t){e&&r.isObject(e)&&t&&(e.title=t),this.originalPushState.apply(history,arguments),this.updateTrackerData()}.bind(this),this.originalReplaceState=history.replaceState,history.replaceState=function(e,t){e&&r.isObject(e)&&t&&(e.title=t),this.originalReplaceState.apply(history,arguments),this.updateTrackerData()}.bind(this),window.addEventListener("popstate",this.updateTrackerData))},E.prototype.updateTrackerData=function(e){e=e!==!1,setTimeout(function(){var t=this.path,i=f();if(t!=i&&this.shouldTrackUrlChange.call(this,i,t)){this.path=i;var n=r.isObject(history.state)&&history.state&&history.state.title||document.title;this.tracker&&this.tracker.setPage(this.path,n),e&&(r.globalSessionTracker.incPV(),r.SubPub.publish(r.SYMBOLS.EVENT.URLCHANGETRIGGER,{path:this.path}))}}.bind(this),0)},E.prototype.shouldTrackUrlChange=function(e,t){return e&&t},E.prototype.remove=function(){window.removeEventListener("popstate",this.updateTrackerData),history.replaceState=this.originalReplaceState,history.pushState=this.originalPushState,this.tracker=null,this.path=null,this.updateTrackerData=null,this.originalReplaceState=null,this.originalPushState=null},t.domReady(function(){function e(){return!!r.parameter("previewmode")||!!r.parameter("previewbadgemode")}function t(e){r.EventManager.setup(n,document);var t=r.SYMBOLS.EVENT.AUTOTRACKINGFLAG;n.setSession(t,!0),r.globalSessionTracker.initSessionOrPV();var i=setInterval(function(){var e=r.SubPub.publish(r.SYMBOLS.EVENT.UBTINIT);e&&clearInterval(i)},200);g.PublicAPI.exposePublicAPI(window,e),r.setupCutomDataCollection(r)}function i(){r.abtest.setup(),r.extIntegration.setup(),r.sessionPropsAutoCapture.setup();var e=new g.IdentifyAPI;r.snapshotProperties.isEnabled()?g.loadEventGroups(function(i){r.snapshotProperties.setEventGroups(i),t(e)}):t(e)}r.moduleStatus.isVisualEditorMode()&&r._.console.warn("at: product disabled");var n=r.StorageFactory.getInstance(r.SYMBOLS.SESSION),s=r.StorageFactory.getInstance(r.SYMBOLS.PERMANENT);if(g.sessStg=n,g.persStg=s,!r.isProductEnabled("behavior")||e()||r.moduleStatus.isVisualEditorMode()){var o={};return o.isBehaviorTrackingEnabled=function(){return!1},g.PublicAPI.exposePublicAPI(window,o),void r._.console.warn("ubt: product disabled")}r._.console.log("ubt: product enabled"),r._.console.log("ubt: domReady"),i()}),g});