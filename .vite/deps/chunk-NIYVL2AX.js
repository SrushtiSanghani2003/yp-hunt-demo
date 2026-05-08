import {
  __commonJS
} from "./chunk-SNAQBZPT.js";

// node_modules/froala-editor/js/froala_editor.min.js
var require_froala_editor_min = __commonJS({
  "node_modules/froala-editor/js/froala_editor.min.js"(exports, module) {
    !(function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.FroalaEditor = t();
    })(exports, function() {
      "use strict";
      function o(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r2 = Array(t); n < t; n++) r2[n] = e[n];
        return r2;
      }
      function E(e, t, n, r2, o2, i2, a2) {
        try {
          var s2 = e[i2](a2), l2 = s2.value;
        } catch (e2) {
          return void n(e2);
        }
        s2.done ? t(l2) : Promise.resolve(l2).then(r2, o2);
      }
      function L(e, t) {
        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
          if (Array.isArray(e) || (n = l(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var r2 = 0, o2 = function() {
            };
            return { s: o2, n: function() {
              return r2 >= e.length ? { done: true } : { done: false, value: e[r2++] };
            }, e: function(e2) {
              throw e2;
            }, f: o2 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var i2, a2 = true, s2 = false;
        return { s: function() {
          n = n.call(e);
        }, n: function() {
          var e2 = n.next();
          return a2 = e2.done, e2;
        }, e: function(e2) {
          s2 = true, i2 = e2;
        }, f: function() {
          try {
            a2 || null == n["return"] || n["return"]();
          } finally {
            if (s2) throw i2;
          }
        } };
      }
      function A(e, t, n) {
        return (t = (function r2(e2) {
          var t2 = (function o2(e3, t3) {
            if ("object" != typeof e3 || !e3) return e3;
            var n2 = e3[Symbol.toPrimitive];
            if (void 0 === n2) return ("string" === t3 ? String : Number)(e3);
            var r3 = n2.call(e3, t3 || "default");
            if ("object" != typeof r3) return r3;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          })(e2, "string");
          return "symbol" == typeof t2 ? t2 : t2 + "";
        })(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
      }
      function M(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r2 = Object.getOwnPropertySymbols(t);
          e && (r2 = r2.filter(function(e2) {
            return Object.getOwnPropertyDescriptor(t, e2).enumerable;
          })), n.push.apply(n, r2);
        }
        return n;
      }
      function y() {
        var h2, g2, e = "function" == typeof Symbol ? Symbol : {}, t = e.iterator || "@@iterator", n = e.toStringTag || "@@toStringTag";
        function r2(e2, t2, n2, u2) {
          var r3 = t2 && t2.prototype instanceof i2 ? t2 : i2, o3 = Object.create(r3.prototype);
          return d(o3, "_invoke", (function(r4, o4, e3) {
            var i3, a3, s3, l3 = 0, c3 = u2 || [], d2 = false, f2 = { p: 0, n: 0, v: h2, a: p2, f: p2.bind(h2, 4), d: function(e4, t3) {
              return i3 = e4, a3 = 0, s3 = h2, f2.n = t3, C2;
            } };
            function p2(e4, t3) {
              for (a3 = e4, s3 = t3, g2 = 0; !d2 && l3 && !n3 && g2 < c3.length; g2++) {
                var n3, r5 = c3[g2], o5 = f2.p, i4 = r5[2];
                3 < e4 ? (n3 = i4 === t3) && (s3 = r5[(a3 = r5[4]) ? 5 : (a3 = 3, 3)], r5[4] = r5[5] = h2) : r5[0] <= o5 && ((n3 = e4 < 2 && o5 < r5[1]) ? (a3 = 0, f2.v = t3, f2.n = r5[1]) : o5 < i4 && (n3 = e4 < 3 || r5[0] > t3 || i4 < t3) && (r5[4] = e4, r5[5] = t3, f2.n = i4, a3 = 0));
              }
              if (n3 || 1 < e4) return C2;
              throw d2 = true, t3;
            }
            return function(e4, t3, n3) {
              if (1 < l3) throw TypeError("Generator is already running");
              for (d2 && 1 === t3 && p2(t3, n3), a3 = t3, s3 = n3; (g2 = a3 < 2 ? h2 : s3) || !d2; ) {
                i3 || (a3 ? a3 < 3 ? (1 < a3 && (f2.n = -1), p2(a3, s3)) : f2.n = s3 : f2.v = s3);
                try {
                  if (l3 = 2, i3) {
                    if (a3 || (e4 = "next"), g2 = i3[e4]) {
                      if (!(g2 = g2.call(i3, s3))) throw TypeError("iterator result is not an object");
                      if (!g2.done) return g2;
                      s3 = g2.value, a3 < 2 && (a3 = 0);
                    } else 1 === a3 && (g2 = i3["return"]) && g2.call(i3), a3 < 2 && (s3 = TypeError("The iterator does not provide a '" + e4 + "' method"), a3 = 1);
                    i3 = h2;
                  } else if ((g2 = (d2 = f2.n < 0) ? s3 : r4.call(o4, f2)) !== C2) break;
                } catch (g3) {
                  i3 = h2, a3 = 1, s3 = g3;
                } finally {
                  l3 = 1;
                }
              }
              return { value: g2, done: d2 };
            };
          })(e2, n2), true), o3;
        }
        var C2 = {};
        function i2() {
        }
        function o2() {
        }
        function a2() {
        }
        g2 = Object.getPrototypeOf;
        var s2 = [][t] ? g2(g2([][t]())) : (d(g2 = {}, t, function() {
          return this;
        }), g2), l2 = a2.prototype = i2.prototype = Object.create(s2);
        function c2(e2) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e2, a2) : (e2.__proto__ = a2, d(e2, n, "GeneratorFunction")), e2.prototype = Object.create(l2), e2;
        }
        return d(l2, "constructor", o2.prototype = a2), d(a2, "constructor", o2), d(a2, n, o2.displayName = "GeneratorFunction"), d(l2), d(l2, n, "Generator"), d(l2, t, function() {
          return this;
        }), d(l2, "toString", function() {
          return "[object Generator]";
        }), (y = function() {
          return { w: r2, m: c2 };
        })();
      }
      function d(e, t, n, r2) {
        var i2 = Object.defineProperty;
        try {
          i2({}, "", {});
        } catch (e2) {
          i2 = 0;
        }
        (d = function(e2, t2, n2, r3) {
          function o2(t3, n3) {
            d(e2, t3, function(e3) {
              return this._invoke(t3, n3, e3);
            });
          }
          t2 ? i2 ? i2(e2, t2, { value: n2, enumerable: !r3, configurable: !r3, writable: !r3 }) : e2[t2] = n2 : (o2("next", 0), o2("throw", 1), o2("return", 2));
        })(e, t, n, r2);
      }
      function x(e, t) {
        return (function n(e2) {
          if (Array.isArray(e2)) return e2;
        })(e) || (function d2(e2, t2) {
          var n = null == e2 ? null : "undefined" != typeof Symbol && e2[Symbol.iterator] || e2["@@iterator"];
          if (null != n) {
            var r2, o2, i2, a2, s2 = [], l2 = true, c2 = false;
            try {
              if (i2 = (n = n.call(e2)).next, 0 === t2) {
                if (Object(n) !== n) return;
                l2 = false;
              } else for (; !(l2 = (r2 = i2.call(n)).done) && (s2.push(r2.value), s2.length !== t2); l2 = true) ;
            } catch (e3) {
              c2 = true, o2 = e3;
            } finally {
              try {
                if (!l2 && null != n["return"] && (a2 = n["return"](), Object(a2) !== a2)) return;
              } finally {
                if (c2) throw o2;
              }
            }
            return s2;
          }
        })(e, t) || l(e, t) || (function r2() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
      }
      function R(e) {
        return (function t(e2) {
          if (Array.isArray(e2)) return o(e2);
        })(e) || (function n(e2) {
          if ("undefined" != typeof Symbol && null != e2[Symbol.iterator] || null != e2["@@iterator"]) return Array.from(e2);
        })(e) || l(e) || (function r2() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
      }
      function w(e) {
        return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
          return typeof e2;
        } : function(e2) {
          return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
        })(e);
      }
      function l(e, t) {
        if (e) {
          if ("string" == typeof e) return o(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
        }
      }
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
        var t = this;
        if (!document.documentElement.contains(t)) return null;
        do {
          if (t.matches(e)) return t;
          t = t.parentElement || t.parentNode;
        } while (null !== t && 1 === t.nodeType);
        return null;
      }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) {
        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; 0 <= --n && t.item(n) !== this; ) ;
        return -1 < n;
      }), Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", { value: function(e, t) {
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        for (var n = Object(e), r2 = 1; r2 < arguments.length; r2++) {
          var o2 = arguments[r2];
          if (null != o2) for (var i2 in o2) Object.prototype.hasOwnProperty.call(o2, i2) && (n[i2] = o2[i2]);
        }
        return n;
      }, writable: true, configurable: true }), (function() {
        var a2 = /^\s*:scope/gi, s2 = /,\s*:scope/gi, l2 = document.createElement("div");
        function e(e2, t2) {
          var i2 = e2[t2];
          e2[t2] = function(e3) {
            var t3, n = false, r2 = false;
            if (!e3 || Array.isArray(e3) || !e3.match(a2) && !e3.match(s2)) return i2.call(this, e3);
            this.parentNode || (l2.appendChild(this), r2 = true);
            var o2 = this.parentNode;
            return this.id || (this.id = "rootedQuerySelector_id_".concat((/* @__PURE__ */ new Date()).getTime()), n = true), t3 = i2.call(o2, e3.replace(a2, "#".concat(this.id)).replace(s2, ",#".concat(this.id))), n && (this.id = ""), r2 && l2.removeChild(this), t3;
          };
        }
        try {
          var t = l2.querySelectorAll(":scope *");
          if (!t || Array.isArray(t)) throw "error";
        } catch (n) {
          e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll");
        }
      })(), "document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || (function(e) {
        if ("Element" in e) {
          var t = "classList", n = "prototype", r2 = e.Element[n], o2 = Object, i2 = String[n].trim || function() {
            return this.replace(/^\s+|\s+$/g, "");
          }, a2 = Array[n].indexOf || function(e2) {
            for (var t2 = 0, n2 = this.length; t2 < n2; t2++) if (t2 in this && this[t2] === e2) return t2;
            return -1;
          }, s2 = function s3(e2, t2) {
            this.name = e2, this.code = DOMException[e2], this.message = t2;
          }, l2 = function l3(e2, t2) {
            if ("" === t2) throw new s2("SYNTAX_ERR", "The token must not be empty.");
            if (/\s/.test(t2)) throw new s2("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
            return a2.call(e2, t2);
          }, c2 = function c3(e2) {
            for (var t2 = i2.call(e2.getAttribute("class") || ""), n2 = t2 ? t2.split(/\s+/) : [], r3 = 0, o3 = n2.length; r3 < o3; r3++) this.push(n2[r3]);
            this._updateClassName = function() {
              e2.setAttribute("class", this.toString());
            };
          }, d2 = c2[n] = [], f2 = function f3() {
            return new c2(this);
          };
          if (s2[n] = Error[n], d2.item = function(e2) {
            return this[e2] || null;
          }, d2.contains = function(e2) {
            return ~l2(this, e2 + "");
          }, d2.add = function() {
            for (var e2, t2 = arguments, n2 = 0, r3 = t2.length, o3 = false; e2 = t2[n2] + "", ~l2(this, e2) || (this.push(e2), o3 = true), ++n2 < r3; ) ;
            o3 && this._updateClassName();
          }, d2.remove = function() {
            var e2, t2, n2 = arguments, r3 = 0, o3 = n2.length, i3 = false;
            do {
              for (e2 = n2[r3] + "", t2 = l2(this, e2); ~t2; ) this.splice(t2, 1), i3 = true, t2 = l2(this, e2);
            } while (++r3 < o3);
            i3 && this._updateClassName();
          }, d2.toggle = function(e2, t2) {
            var n2 = this.contains(e2), r3 = n2 ? true !== t2 && "remove" : false !== t2 && "add";
            return r3 && this[r3](e2), true === t2 || false === t2 ? t2 : !n2;
          }, d2.replace = function(e2, t2) {
            var n2 = l2(e2 + "");
            ~n2 && (this.splice(n2, 1, t2), this._updateClassName());
          }, d2.toString = function() {
            return this.join(" ");
          }, o2.defineProperty) {
            var p2 = { get: f2, enumerable: true, configurable: true };
            try {
              o2.defineProperty(r2, t, p2);
            } catch (u2) {
              void 0 !== u2.number && -2146823252 !== u2.number || (p2.enumerable = false, o2.defineProperty(r2, t, p2));
            }
          } else o2[n].__defineGetter__ && r2.__defineGetter__(t, f2);
        }
      })(self), (function() {
        var e = document.createElement("_");
        if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
          var t = function pf(e2) {
            var pf2 = DOMTokenList.prototype[e2];
            DOMTokenList.prototype[e2] = function(e3) {
              var t2, n2 = arguments.length;
              for (t2 = 0; t2 < n2; t2++) e3 = arguments[t2], pf2.call(this, e3);
            };
          };
          t("add"), t("remove");
        }
        if (e.classList.toggle("c3", false), e.classList.contains("c3")) {
          var n = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(e2, t2) {
            return 1 in arguments && !this.contains(e2) == !t2 ? t2 : n.call(this, e2);
          };
        }
        "replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function(e2, t2) {
          var n2 = this.toString().split(" "), r2 = n2.indexOf(e2 + "");
          ~r2 && (n2 = n2.slice(r2), this.remove.apply(this, n2), this.add(t2), this.add.apply(this, n2.slice(1)));
        }), e = null;
      })()), (function() {
        var e, t = -1;
        if ("Microsoft Internet Explorer" === navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), !("undefined" == typeof window || "undefined" == typeof document || "undefined" == typeof HTMLElement || t < 0)) {
          var n = false;
          try {
            var r2 = document.createElement("div");
            r2.addEventListener("focus", function(e2) {
              e2.preventDefault(), e2.stopPropagation();
            }, true), r2.focus(Object.defineProperty({}, "preventScroll", { get: function() {
              if (navigator && "undefined" != typeof navigator.userAgent && navigator.userAgent && navigator.userAgent.match(/Edge\/1[7-8]/)) return n = false;
              n = true;
            } }));
          } catch (s2) {
          }
          if (HTMLElement.prototype.nativeFocus === void 0 && !n) {
            HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;
            var o2 = function o3(e2) {
              for (var t2 = e2.parentNode, n2 = [], r3 = document.scrollingElement || document.documentElement; t2 && t2 !== r3; ) (t2.offsetHeight < t2.scrollHeight || t2.offsetWidth < t2.scrollWidth) && n2.push([t2, t2.scrollTop, t2.scrollLeft]), t2 = t2.parentNode;
              return t2 = r3, n2.push([t2, t2.scrollTop, t2.scrollLeft]), n2;
            }, i2 = function i3(e2) {
              for (var t2 = 0; t2 < e2.length; t2++) e2[t2][0].scrollTop = e2[t2][1], e2[t2][0].scrollLeft = e2[t2][2];
              e2 = [];
            }, a2 = function a3(e2) {
              if (e2 && e2.preventScroll) {
                var t2 = o2(this);
                if ("function" == typeof setTimeout) {
                  var n2 = this;
                  setTimeout(function() {
                    n2.nativeFocus(), i2(t2);
                  }, 0);
                } else this.nativeFocus(), i2(t2);
              } else this.nativeFocus();
            };
            HTMLElement.prototype.focus = a2;
          }
        }
      })();
      function X(e, t, n) {
        if ("string" != typeof e) return new X.Bootstrap(e, t, n);
        var r2 = document.querySelectorAll(e);
        t && t.iframe_document && (r2 = t.iframe_document.querySelectorAll(e));
        for (var o2 = [], i2 = 0; i2 < r2.length; i2++) {
          var a2 = r2[i2]["data-froala.editor"];
          a2 ? o2.push(a2) : o2.push(new X.Bootstrap(r2[i2], t, n));
        }
        return 1 == o2.length ? o2[0] : o2;
      }
      X.RegisterPlugins = function(e) {
        for (var t = 0; t < e.length; t++) e[t].call(X);
      }, Object.assign(X, { DEFAULTS: { allowStylingOnNonEditable: false, initOnClick: false, pluginsEnabled: null, pluginsDisabled: null }, MODULES: {}, PLUGINS: {}, VERSION: "4.7.0", INSTANCES: [], OPTS_MAPPING: {}, SHARED: {}, ID: 0 }), X.MODULES.node = function(a2) {
        var n = a2.$;
        function s2(e) {
          return e && "IFRAME" !== e.tagName ? Array.prototype.slice.call(e.childNodes || []) : [];
        }
        function l2(e) {
          return !!e && (e.nodeType === Node.ELEMENT_NODE && 0 <= X.BLOCK_TAGS.indexOf(e.tagName.toLowerCase()));
        }
        function c2(e) {
          var t2 = {}, n2 = e.attributes;
          if (n2) for (var r3 = 0; r3 < n2.length; r3++) {
            var o2 = n2[r3];
            t2[o2.nodeName] = o2.value;
          }
          return t2;
        }
        function t(e) {
          for (var t2 = "", n2 = c2(e), r3 = Object.keys(n2), o2 = 0; o2 < r3.length; o2++) {
            var i2 = r3[o2], a3 = n2[i2];
            a3.indexOf("'") < 0 && 0 <= a3.indexOf('"') ? t2 += " ".concat(i2, "='").concat(a3, "'") : (0 <= a3.indexOf('"') && 0 <= a3.indexOf("'") && (a3 = a3.replace(/"/g, "&quot;")), t2 += " ".concat(i2, '="').concat(a3, '"'));
          }
          return t2;
        }
        function r2(e) {
          return e === a2.el;
        }
        return { isBlock: l2, isEmpty: function d2(e, t2) {
          if (!e) return true;
          if (e.querySelector("table")) return false;
          var n2 = s2(e);
          1 === n2.length && l2(n2[0]) && (n2 = s2(n2[0]));
          for (var r3 = false, o2 = 0; o2 < n2.length; o2++) {
            var i2 = n2[o2];
            if (!(t2 && a2.node.hasClass(i2, "fr-marker") || i2.nodeType === Node.TEXT_NODE && 0 === i2.textContent.length)) {
              if ("BR" !== i2.tagName && 0 < (i2.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return false;
              if (r3) return false;
              "BR" === i2.tagName && (r3 = true);
            }
          }
          return !(e.querySelectorAll(X.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector("".concat(a2.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || 1 < e.querySelectorAll(X.BLOCK_TAGS.join(",")).length || e.querySelector("".concat(a2.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")));
        }, blockParent: function o2(e) {
          for (; e && e.parentNode !== a2.el && (!e.parentNode || !a2.node.hasClass(e.parentNode, "fr-inner")); ) if (l2(e = e.parentNode)) return e;
          return null;
        }, deepestParent: function i2(e, t2, n2) {
          if (void 0 === t2 && (t2 = []), void 0 === n2 && (n2 = true), t2.push(a2.el), 0 <= t2.indexOf(e.parentNode) || e.parentNode && a2.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= X.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n2) return null;
          for (; t2.indexOf(e.parentNode) < 0 && e.parentNode && !a2.node.hasClass(e.parentNode, "fr-inner") && (X.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n2) && (!l2(e) || l2(e.parentNode)) && (!l2(e) || !l2(e.parentNode) || !n2); ) e = e.parentNode;
          return e;
        }, rawAttributes: c2, attributes: t, clearAttributes: function f2(e) {
          for (var t2 = e.attributes, n2 = t2.length - 1; 0 <= n2; n2--) {
            var r3 = t2[n2];
            e.removeAttribute(r3.nodeName);
          }
        }, openTagString: function p2(e) {
          return "<".concat(e.tagName.toLowerCase()).concat(t(e), ">");
        }, closeTagString: function u2(e) {
          return "</".concat(e.tagName.toLowerCase(), ">");
        }, isFirstSibling: function h2(e, t2) {
          void 0 === t2 && (t2 = true);
          for (var n2 = e.previousSibling; n2 && t2 && a2.node.hasClass(n2, "fr-marker"); ) n2 = n2.previousSibling;
          return !n2 || n2.nodeType === Node.TEXT_NODE && "" === n2.textContent && h2(n2);
        }, isLastSibling: function g2(e, t2) {
          void 0 === t2 && (t2 = true);
          for (var n2 = e.nextSibling; n2 && t2 && a2.node.hasClass(n2, "fr-marker"); ) n2 = n2.nextSibling;
          return !n2 || n2.nodeType === Node.TEXT_NODE && "" === n2.textContent && g2(n2);
        }, isList: function C2(e) {
          return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName);
        }, isLink: function m2(e) {
          return !!e && e.nodeType === Node.ELEMENT_NODE && "a" === e.tagName.toLowerCase();
        }, isElement: r2, contents: s2, isVoid: function v2(e) {
          return e && e.nodeType === Node.ELEMENT_NODE && 0 <= X.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase());
        }, hasFocus: function b2(e) {
          return e === a2.doc.activeElement && (!a2.doc.hasFocus || a2.doc.hasFocus()) && Boolean(r2(e) || e.type || e.href || ~e.tabIndex);
        }, isEditable: function E2(e) {
          return (!e.getAttribute || "false" !== e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0 && !(e.viewportElement && "svg" === e.viewportElement.tagName);
        }, isDeletable: function L2(e) {
          return e && e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable");
        }, hasClass: function y2(e, t2) {
          return e instanceof n && (e = e.get(0)), e && e.classList && e.classList.contains(t2);
        }, filter: function N2(e) {
          return a2.browser.msie ? e : { acceptNode: e };
        } };
      }, Object.assign(X.DEFAULTS, { DOMPurify: window.DOMPurify, htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"], htmlRemoveTags: ["script", "style"], htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"], htmlAllowedStyleProps: [".*"], htmlAllowComments: true, htmlUntouched: false, preserveTabSpaces: false, fullPage: false }), X.HTML5Map = { B: "STRONG", I: "EM", STRIKE: "S" }, X.MODULES.clean = function(C2) {
        var m2, v2, b2, E2, f2 = C2.$;
        function o2(e) {
          if (e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker") || ["TABLE", "TBODY", "THEAD", "TFOOT", "TR", "TD", "TH"].includes(e.nodeName)) return false;
          var t, n = C2.node.contents(e), r2 = [];
          for (t = 0; t < n.length; t++) n[t].nodeType !== Node.ELEMENT_NODE || C2.node.isVoid(n[t]) ? n[t].nodeType === Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length !== n[t].textContent.length && o2(n[t]);
          if (e.nodeType === Node.ELEMENT_NODE && !C2.node.isVoid(e) && (e.normalize(), n = C2.node.contents(e), r2 = e.querySelectorAll(".fr-marker"), n.length - r2.length == 0)) {
            for (t = 0; t < n.length; t++) if (n[t].nodeType === Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return false;
            for (t = 0; t < r2.length; t++) e.parentNode.insertBefore(r2[t].cloneNode(true), e);
            return e.parentNode.removeChild(e), false;
          }
        }
        function s2(e, t) {
          if (e.nodeType === Node.COMMENT_NODE) return "<!--".concat(e.nodeValue, "-->");
          if (e.nodeType === Node.TEXT_NODE) return t ? e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : C2.opts.preserveTabSpaces ? e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\t/g, " ".repeat(C2.opts.tabSpaces) || " ".repeat(4)) : e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\t/g, "");
          if (e.nodeType !== Node.ELEMENT_NODE) return e.outerHTML;
          if (e.nodeType === Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;
          if (e.nodeType === Node.ELEMENT_NODE && "svg" === e.tagName) {
            var n = document.createElement("div"), r2 = e.cloneNode(true);
            return n.appendChild(r2), n.innerHTML;
          }
          if ("IFRAME" === e.tagName) return e.outerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          var o3 = e.childNodes;
          if (0 === o3.length) return e.outerHTML;
          for (var i2 = "", a2 = 0; a2 < o3.length; a2++) "PRE" === e.tagName && (t = true), i2 += s2(o3[a2], t);
          return C2.node.openTagString(e) + i2 + C2.node.closeTagString(e);
        }
        var l2 = [];
        function L2(e) {
          var t = e.replace(/;;/gi, ";");
          return ";" !== (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t;
        }
        function c2(e) {
          var t;
          for (t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
            var n = t.match(b2), r2 = null;
            "style" === t && C2.opts.htmlAllowedStyleProps.length && (r2 = e[t].match(E2)), n && r2 ? e[t] = L2(r2.join(";")) : n && ("style" !== t || r2) || delete e[t];
          }
          for (var o3 = "", i2 = Object.keys(e).sort(), a2 = 0; a2 < i2.length; a2++) e[t = i2[a2]].indexOf('"') < 0 ? o3 += " ".concat(t, '="').concat(e[t], '"') : o3 += " ".concat(t, "='").concat(e[t], "'");
          return o3;
        }
        function d2(e, t) {
          var n, r2 = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV"), o3 = e.replace(/(<col[^>]*>)&nbsp;/g, "$1");
          f2(r2).append(o3);
          var i2 = "";
          if (r2) {
            var a2 = C2.node.contents(r2);
            for (n = 0; n < a2.length; n++) t(a2[n]);
            for (a2 = C2.node.contents(r2), n = 0; n < a2.length; n++) i2 += s2(a2[n]);
          }
          return i2;
        }
        function p2(e, t, n) {
          var r2 = e = (function i2(e2) {
            return l2 = [], e2 = (e2 = (e2 = (e2 = e2.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(e3) {
              return l2.push(e3), "[FROALA.EDITOR.SCRIPT ".concat(l2.length - 1, "]");
            })).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function(e3) {
              return l2.push(e3), "[FROALA.EDITOR.NOSCRIPT ".concat(l2.length - 1, "]");
            })).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="')).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="');
          })(e), o3 = null;
          return C2.opts.fullPage && (r2 = C2.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (o3 = C2.html.extractNode(e, "head") || "")), r2 = d2(r2, t), o3 && (o3 = d2(o3, t)), (function a2(e2) {
            return e2 = (e2 = (e2 = e2.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function(e3, t2) {
              return 0 <= C2.opts.htmlRemoveTags.indexOf("script") ? "" : l2[parseInt(t2, 10)];
            })).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function(e3, t2) {
              if (0 <= C2.opts.htmlRemoveTags.indexOf("noscript")) return "";
              var n2 = l2[parseInt(t2, 10)].replace(/&lt;/g, "<").replace(/&gt;/g, ">"), r3 = f2(n2);
              if (r3 && r3.length) {
                var o4 = d2(r3.html(), u2);
                r3.html(o4), n2 = r3.get(0).outerHTML;
              }
              return n2;
            })).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="');
          })((function s3(e2, t2, n2) {
            if (C2.opts.fullPage) {
              var r3 = C2.html.extractDoctype(n2), o4 = c2(C2.html.extractNodeAttrs(n2, "html"));
              t2 = null === t2 ? C2.html.extractNode(n2, "head") || "<title></title>" : t2;
              var i2 = c2(C2.html.extractNodeAttrs(n2, "head")), a2 = c2(C2.html.extractNodeAttrs(n2, "body"));
              return "".concat(r3, "<html").concat(o4, "><head").concat(i2, ">").concat(t2, "</head><body").concat(a2, ">").concat(e2, "</body></html>");
            }
            return e2;
          })(r2, o3, e));
        }
        function y2(e) {
          var t = C2.doc.createElement("DIV");
          return t.innerText = e, t.textContent;
        }
        function u2(e) {
          for (var t = C2.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && u2(t[n]);
          !(function g2(n2) {
            if ("SPAN" === n2.tagName && 0 <= (n2.getAttribute("class") || "").indexOf("fr-marker")) return false;
            if ("PRE" === n2.tagName && (function h2(e3) {
              var t3 = e3.innerHTML;
              0 <= t3.indexOf("\n") && (e3.innerHTML = t3.replace(/\n/g, "<br>"));
            })(n2), n2.nodeType === Node.ELEMENT_NODE && (n2.getAttribute("data-fr-src") && 0 !== n2.getAttribute("data-fr-src").indexOf("blob:") && n2.setAttribute("data-fr-src", C2.helpers.sanitizeURL(y2(n2.getAttribute("data-fr-src")))), n2.getAttribute("href") && n2.setAttribute("href", C2.helpers.sanitizeURL(y2(n2.getAttribute("href")))), n2.getAttribute("src") && n2.setAttribute("src", C2.helpers.sanitizeURL(y2(n2.getAttribute("src")))), n2.getAttribute("srcdoc") && n2.setAttribute("srcdoc", C2.clean.html(n2.getAttribute("srcdoc"))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(n2.tagName) && (n2.innerHTML = n2.innerHTML.trim())), !C2.opts.pasteAllowLocalImages && n2.nodeType === Node.ELEMENT_NODE && "IMG" === n2.tagName && n2.getAttribute("data-fr-src") && 0 === n2.getAttribute("data-fr-src").indexOf("file://")) return n2.parentNode.removeChild(n2), false;
            if (n2.nodeType === Node.ELEMENT_NODE && X.HTML5Map[n2.tagName] && "" === C2.node.attributes(n2)) {
              var e2 = X.HTML5Map[n2.tagName], t2 = "<".concat(e2, ">").concat(n2.innerHTML, "</").concat(e2, ">");
              n2.insertAdjacentHTML("beforebegin", t2), (n2 = n2.previousSibling).parentNode.removeChild(n2.nextSibling);
            }
            if (C2.opts.htmlAllowComments || n2.nodeType !== Node.COMMENT_NODE) if (n2.tagName && n2.tagName.match(v2)) {
              if ("STYLE" == n2.tagName && C2.helpers.isMac()) {
                var r2, o3 = n2.innerHTML.trim(), i2 = [], a2 = /{([^}]+)}/g;
                for (o3 = o3.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/, ""); r2 = a2.exec(o3); ) i2.push(r2[1]);
                for (var s3 = function s4(t3) {
                  var e3 = o3.substring(0, o3.indexOf("{")).trim();
                  0 == !/^[a-z_-][a-z\d_-]*$/i.test(e3) && n2.parentNode.querySelectorAll(e3).forEach(function(e4) {
                    e4.removeAttribute("class"), e4.setAttribute("style", i2[t3]);
                  }), o3 = o3.substring(o3.indexOf("}") + 1);
                }, l3 = 0; -1 != o3.indexOf("{"); l3++) s3(l3);
              }
              n2.parentNode.removeChild(n2);
            } else if (n2.tagName && !n2.tagName.match(m2)) "svg" === n2.tagName ? n2.parentNode.removeChild(n2) : C2.browser.safari && "path" === n2.tagName && n2.parentNode && "svg" === n2.parentNode.tagName || (n2.outerHTML = n2.innerHTML);
            else {
              var c3 = n2.attributes;
              if (c3) for (var d3 = c3.length - 1; 0 <= d3; d3--) {
                var f3 = c3[d3], p3 = f3.nodeName.match(b2), u3 = null;
                "style" === f3.nodeName && C2.opts.htmlAllowedStyleProps.length && (u3 = f3.value.match(E2)), p3 && u3 ? f3.value = L2(u3.join(";")) : p3 && ("style" !== f3.nodeName || u3) || n2.removeAttribute(f3.nodeName);
              }
            }
            else 0 !== n2.data.indexOf("[FROALA.EDITOR") && n2.parentNode.removeChild(n2);
          })(e);
        }
        return { _init: function e() {
          C2.opts.fullPage && f2.merge(C2.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"]);
        }, html: function h2(e, t, n, r2) {
          if (void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r2 && (r2 = false), 0 <= e.indexOf("<plaintext>")) {
            e = e.replace(/<plaintext>/g, "").replace(/<\/plaintext>/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\t/g, C2.opts.preserveTabSpaces ? " ".repeat(C2.opts.tabSpaces || 4) : "");
            var o3 = C2.html.defaultTag();
            C2.opts.enter != X.ENTER_BR && (e = "<".concat(o3, ">").concat(e, "</").concat(o3, ">"));
          }
          var i2, a2 = f2.merge([], C2.opts.htmlAllowedTags);
          for (i2 = 0; i2 < t.length; i2++) 0 <= a2.indexOf(t[i2]) && a2.splice(a2.indexOf(t[i2]), 1);
          var s3 = f2.merge([], C2.opts.htmlAllowedAttrs);
          for (i2 = 0; i2 < n.length; i2++) 0 <= s3.indexOf(n[i2]) && s3.splice(s3.indexOf(n[i2]), 1);
          if (s3.push("data-fr-.*"), s3.push("fr-.*"), m2 = new RegExp("^".concat(a2.join("$|^"), "$"), "gi"), b2 = new RegExp("^".concat(s3.join("$|^"), "$"), "gi"), v2 = new RegExp("^".concat(C2.opts.htmlRemoveTags.join("$|^"), "$"), "gi"), E2 = C2.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)".concat(C2.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)"), ":.+?(?=(;)|$))"), "gi") : null, e = p2(e, u2, true), "undefined" != typeof C2.opts.DOMPurify) {
            var l3 = { ALLOW_UNKNOWN_PROTOCOLS: true };
            1 === C2.opts.htmlAllowedTags.length && ".*" === C2.opts.htmlAllowedTags[0] || (l3.ALLOWED_TAGS = C2.opts.htmlAllowedTags), 1 === C2.opts.htmlAllowedAttrs.length && ".*" === C2.opts.htmlAllowedAttrs[0] || (l3.ALLOWED_ATTR = C2.opts.htmlAllowedAttrs), e = C2.opts.DOMPurify.sanitize(e, l3);
          }
          return e;
        }, toHTML5: function r2() {
          var e = C2.el.querySelectorAll(Object.keys(X.HTML5Map).join(","));
          if (e.length) {
            var t = false;
            C2.el.querySelector(".fr-marker") || (C2.selection.save(), t = true);
            for (var n = 0; n < e.length; n++) "" === C2.node.attributes(e[n]) && f2(e[n]).replaceWith("<".concat(X.HTML5Map[e[n].tagName], ">").concat(e[n].innerHTML, "</").concat(X.HTML5Map[e[n].tagName], ">"));
            t && C2.selection.restore();
          }
        }, tables: function t() {
          !(function d3() {
            for (var e = C2.el.querySelectorAll("tr"), t2 = 0, n = 0; n < e.length; n++) {
              var r2 = e[n].outerHTML.match(/rowspan="([0-9]+)"/);
              r2 && (t2 += Number(r2[1]) - 1);
              for (var o3 = e[n].children, i2 = true, a2 = 0; a2 < o3.length; a2++) if ("TH" !== o3[a2].tagName) {
                i2 = false;
                break;
              }
              if (false !== i2 && 0 !== o3.length) if (1 === o3.length && "TH" === o3[0].tagName && t2) t2--;
              else {
                var s3 = e[n], l3 = s3.closest("table");
                if (l3) {
                  var c3 = l3.querySelector("thead");
                  c3 || (c3 = C2.doc.createElement("THEAD"), l3.insertBefore(c3, l3.firstChild)), c3.contains(s3) || c3.appendChild(s3);
                }
              }
            }
          })(), (function s3() {
            for (var e = C2.$el.find("table[style]"), t2 = 0; t2 < e.length; t2++) {
              var n = f2(e[t2]);
              n.attr("style").indexOf("width") < 0 && n.css("width", "100%");
            }
            for (var r2 = C2.$el.find("td[width]"), o3 = 0; o3 < r2.length; o3++) {
              var i2 = f2(r2[o3]), a2 = i2.attr("width");
              a2 && (i2.css("width", a2), i2.removeAttr("width"));
            }
          })();
        }, lists: function g2() {
          !(function s3() {
            var e, t = [];
            do {
              if (t.length) {
                var n = t[0], r2 = C2.doc.createElement("ul");
                n.parentNode.insertBefore(r2, n);
                do {
                  var o3 = n;
                  n = n.nextSibling, r2.appendChild(o3);
                } while (n && "LI" === n.tagName);
              }
              t = [];
              for (var i2 = C2.el.querySelectorAll("li"), a2 = 0; a2 < i2.length; a2++) e = i2[a2], C2.node.isList(e.parentNode) || t.push(i2[a2]);
            } while (0 < t.length);
          })(), (function i2() {
            for (var e = C2.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
              var n = e[t];
              if (C2.node.isList(n.previousSibling) && C2.node.openTagString(n) === C2.node.openTagString(n.previousSibling)) {
                for (var r2 = C2.node.contents(n), o3 = 0; o3 < r2.length; o3++) n.previousSibling.appendChild(r2[o3]);
                n.parentNode.removeChild(n);
              }
            }
          })(), (function a2() {
            for (var e = C2.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++) for (var n = C2.node.contents(e[t]), r2 = null, o3 = n.length - 1; 0 <= o3; o3--) !n[o3].tagName && C2.opts.htmlUntouched || "LI" === n[o3].tagName || "UL" == n[o3].tagName || "OL" == n[o3].tagName ? r2 = null : "BR" == n[o3].tagName ? f2(n[o3]).remove() : (r2 || (r2 = f2(C2.doc.createElement("LI"))).insertBefore(n[o3]), r2.prepend(n[o3]));
          })(), (function l3() {
            var e, t, n;
            do {
              t = false;
              var r2 = C2.el.querySelectorAll("li:empty");
              for (e = 0; e < r2.length; e++) r2[e].parentNode.removeChild(r2[e]);
              var o3 = C2.el.querySelectorAll("ul, ol");
              for (e = 0; e < o3.length; e++) (n = o3[e]).querySelector("LI") || (t = true, n.parentNode.removeChild(n));
            } while (true === t);
          })(), (function o3() {
            for (var e = C2.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
              var n = e[t], r2 = n.previousSibling;
              r2 && ("LI" === r2.tagName ? r2.appendChild(n) : f2(n).wrap("<li></li>"));
            }
          })(), (function c3() {
            for (var e = C2.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
              var n = e[t];
              if (n.nextSibling) for (var r2 = n.nextSibling; 0 < r2.childNodes.length; ) n.append(r2.childNodes[0]);
            }
          })(), (function d3() {
            for (var e = C2.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
              var n = e[t];
              if (C2.node.isFirstSibling(n) && "none" != n.parentNode.style.listStyleType) f2(n).before("<br/>");
              else if (n.previousSibling && "BR" === n.previousSibling.tagName) {
                for (var r2 = n.previousSibling.previousSibling; r2 && C2.node.hasClass(r2, "fr-marker"); ) r2 = r2.previousSibling;
                r2 && "BR" !== r2.tagName && f2(n.previousSibling).remove();
              }
            }
          })(), (function n() {
            for (var e = C2.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) f2(e[t]).remove();
          })(), (function r2() {
            for (var e = C2.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++) for (var n = e[t], a2 = C2.node.contents(n), s3 = function s4() {
              var e2 = a2[l3], t2 = C2.node.contents(e2);
              if (e2.nodeType !== Node.ELEMENT_NODE) return 0;
              var n2 = e2.querySelectorAll("ul, ol");
              if (0 < n2.length && 1 == t2.length && t2[0].nodeType === Node.ELEMENT_NODE) {
                var r3 = n2[0], o3 = a2[l3 - 1];
                if (!o3) return 0;
                var i2 = f2(o3).data("tracking") && C2.opts.trackChangesEnabled;
                R(r3.querySelectorAll("li")).reverse().forEach(function(e3) {
                  if (i2) {
                    var t3 = "pending-".concat(C2.id, "-").concat(C2.track_changes.getPendingChanges().length), n3 = C2.opts.showChangesEnabled ? 'class="fr-highlight-change"' : "", r4 = e3.innerHTML;
                    e3.innerHTML = '<span data-tracking="true" data-track-id="'.concat(t3, '" ').concat(n3, ">").concat(r4, "</span>"), C2.track_changes.pushChange(t3);
                  }
                }), o3.append(r3), e2.remove();
              }
            }, l3 = 0; l3 < a2.length; l3++) s3();
          })();
        }, invisibleSpaces: function n(e) {
          return e.replace(/\u200b/g, "").length === e.length ? e : C2.clean.exec(e, o2);
        }, exec: p2 };
      }, X.XS = 0, X.SM = 1, X.MD = 2, X.LG = 3;
      X.LinkRegExCommon = "[".concat("a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_\\.", "]{1,}"), X.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-zA-Z0-9\\u00a1-\\uffff@\\[\\]\\(\\)\\{\\}.,:;!?%&$^=*+~#_\\-`'\"\\\\\\/|]*)|())", X.LinkRegExTLD = "((".concat(X.LinkRegExCommon, ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev|in|fr|it)))"), X.LinkRegExHTTP = "((ftp|http|https):\\/\\/".concat(X.LinkRegExCommon, ")"), X.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@".concat(X.LinkRegExCommon, ")"), X.LinkRegExWWW = "(www\\.".concat(X.LinkRegExCommon, "\\.[a-z0-9-]{2,24})"), X.LinkRegEx = "(".concat(X.LinkRegExTLD, "|").concat(X.LinkRegExHTTP, "|").concat(X.LinkRegExWWW, "|").concat(X.LinkRegExAuth, ")").concat(X.LinkRegExEnd), X.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], X.MAIL_REGEX = /.+@.+\..+/i, X.MODULES.helpers = function(i2) {
        var a2, s2 = i2.$;
        function e() {
          var e2 = {}, t2 = (function i3() {
            var e3, t3 = -1;
            return "Microsoft Internet Explorer" === navigator.appName ? (e3 = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e3) && (t3 = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e3 = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e3) && (t3 = parseFloat(RegExp.$1))), t3;
          })();
          if (0 < t2) e2.msie = true;
          else {
            var n2 = navigator.userAgent.toLowerCase(), r3 = /(edge)[ /]([\w.]+)/.exec(n2) || /(chrome)[ /]([\w.]+)/.exec(n2) || /(webkit)[ /]([\w.]+)/.exec(n2) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(n2) || /(msie) ([\w.]+)/.exec(n2) || n2.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n2) || [], o3 = r3[1] || "";
            r3[2];
            r3[1] && (e2[o3] = true), e2.chrome ? e2.webkit = true : e2.webkit && (e2.safari = true);
          }
          return e2.msie && (e2.version = t2), e2;
        }
        function t() {
          return (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || (function e2() {
            return navigator.maxTouchPoints && 2 < navigator.maxTouchPoints && /Macintosh/.test(navigator.userAgent);
          })()) && !o2();
        }
        function n() {
          return /(Android)/g.test(navigator.userAgent) && !o2();
        }
        function r2() {
          return /(Blackberry)/g.test(navigator.userAgent);
        }
        function o2() {
          return /(Windows Phone)/gi.test(navigator.userAgent);
        }
        var l2 = null;
        return { _init: function c2() {
          i2.browser = e();
        }, isIOS: t, isMac: function d2() {
          return null === l2 && (l2 = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l2;
        }, getIOSVersion: function f2() {
          if (t()) {
            var e2 = navigator.userAgent.match(/OS (\d)?\d_\d(_\d)?/i) || navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/);
            return e2 && e2.length && Math.abs(e2[0].split("_")[0].replace("OS ", "")) || NaN;
          }
          return NaN;
        }, getSafariVersion: function p2() {
          var e2 = navigator.userAgent;
          if (-1 !== e2.indexOf("Safari")) {
            var t2 = e2.match(/Version\/(\d+\.\d+)/);
            if (t2) return parseInt(t2[1]);
          }
          return null;
        }, isAndroid: n, isBlackberry: r2, isWindowsPhone: o2, isMobile: function u2() {
          return n() || t() || r2();
        }, isEmail: function h2(e2) {
          return !/^(https?:|ftps?:|)\/\//i.test(e2) && X.MAIL_REGEX.test(e2);
        }, requestAnimationFrame: function g2() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e2) {
            window.setTimeout(e2, 1e3 / 60);
          };
        }, getPX: function C2(e2) {
          return parseInt(e2, 10) || 0;
        }, screenSize: function m2(e2) {
          try {
            var t2 = 0;
            if ((t2 = e2 ? i2.$box.width() : i2.$sc.width()) < 768) return X.XS;
            if (768 <= t2 && t2 < 992) return X.SM;
            if (992 <= t2 && t2 < 1200) return X.MD;
            if (1200 <= t2) return X.LG;
          } catch (n2) {
            return X.LG;
          }
        }, isTouch: function v2() {
          return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch;
        }, sanitizeURL: function b2(e2) {
          if (i2.opts.DOMPurify) {
            var t2 = { ALLOW_UNKNOWN_PROTOCOLS: true, ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|xxx):|[^a-z]|[a-z+.]+(?:[^a-z+.\-:]|$))/i };
            1 === i2.opts.htmlAllowedTags.length && ".*" === i2.opts.htmlAllowedTags[0] || (t2.ALLOWED_TAGS = i2.opts.htmlAllowedTags), 1 === i2.opts.htmlAllowedAttrs.length && ".*" === i2.opts.htmlAllowedAttrs[0] || (t2.ALLOWED_ATTR = i2.opts.htmlAllowedAttrs), e2 = i2.opts.DOMPurify.sanitize(e2, t2);
          }
          return e2 = e2.replace(/(["'/]|\s+)on\w+=(?:"[^"]*"|'[^']*'|[^>\s]+)/gi, ""), /^(https?:|ftps?:|)\/\//i.test(e2) ? e2 : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e2) ? e2 : new RegExp("^(".concat(X.LinkProtocols.join("|"), "):"), "i").test(e2) ? e2 : e2 = encodeURIComponent(e2).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/%3A(\d)/gi, ":$1").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}").replace(/%[0-1]+[0-9]+|%[0-1]+[A-F]+/g, "");
        }, isArray: function E2(e2) {
          return e2 && !Object.prototype.propertyIsEnumerable.call(e2, "length") && "object" === w(e2) && "number" == typeof e2.length;
        }, RGBToHex: function L2(e2) {
          function t2(e3) {
            return "0".concat(parseInt(e3, 10).toString(16)).slice(-2);
          }
          try {
            if (!e2 || "transparent" === e2) return "";
            if (/^#[0-9A-F]{6}$/i.test(e2) || /^#[0-9A-F]{8}$/i.test(e2)) return e2.toUpperCase();
            var n2 = e2.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/i);
            if (n2) return "#".concat(t2(n2[1])).concat(t2(n2[2])).concat(t2(n2[3])).toUpperCase();
            if (n2 = e2.match(/^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\s*\)$/i)) return "#".concat(t2(n2[1])).concat(t2(n2[2])).concat(t2(n2[3])).concat(t2(Math.round(255 * parseFloat(n2[4])))).toUpperCase();
          } catch (r3) {
            return null;
          }
        }, HEXtoRGB: function y2(e2) {
          if (e2 = e2.replace(/^#/, ""), /^rgba?\(\d+,\s*\d+,\s*\d+(,\s*(0|1|0?\.\d+))?\)$/i.test(e2)) return e2;
          if (3 !== e2.length && 4 !== e2.length || (e2 = e2.split("").map(function(e3) {
            return e3 + e3;
          }).join("")), 6 === e2.length) {
            var t2 = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e2);
            return t2 ? "rgb(".concat(parseInt(t2[1], 16), ", ").concat(parseInt(t2[2], 16), ", ").concat(parseInt(t2[3], 16), ")") : "";
          }
          if (8 === e2.length) {
            var n2 = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e2);
            if (n2) {
              var r3 = parseInt(n2[1], 16), o3 = parseInt(n2[2], 16), i3 = parseInt(n2[3], 16), a3 = parseInt(n2[4], 16) / 255;
              return "rgba(".concat(r3, ", ").concat(o3, ", ").concat(i3, ", ").concat(a3.toFixed(2), ")");
            }
          }
          return "";
        }, isURL: function N2(e2) {
          return !!/^(https?:|ftps?:|)\/\//i.test(e2) && (e2 = String(e2).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^".concat(X.LinkRegExHTTP).concat(X.LinkRegExEnd, "$"), "gi").test(e2));
        }, getAlignment: function T2(e2) {
          e2.css || (e2 = s2(e2));
          var t2 = (e2.css("text-align") || "").replace(/-(.*)-/g, "");
          if (["left", "right", "justify", "center"].indexOf(t2) < 0) {
            if (!a2) {
              var n2 = s2('<div dir="'.concat("rtl" === i2.opts.direction ? "rtl" : "auto", '" style="text-align: ').concat(i2.$el.css("text-align"), '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>'));
              s2("body").first().append(n2);
              var r3 = n2.find("#s1").get(0).getBoundingClientRect().left, o3 = n2.find("#s2").get(0).getBoundingClientRect().left;
              n2.remove(), a2 = r3 < o3 ? "left" : "right";
            }
            t2 = a2;
          }
          return t2;
        }, scrollTop: function S2() {
          return i2.o_win.pageYOffset ? i2.o_win.pageYOffset : i2.o_doc.documentElement && i2.o_doc.documentElement.scrollTop ? i2.o_doc.documentElement.scrollTop : i2.o_doc.body.scrollTop ? i2.o_doc.body.scrollTop : 0;
        }, scrollLeft: function A2() {
          return i2.o_win.pageXOffset ? i2.o_win.pageXOffset : i2.o_doc.documentElement && i2.o_doc.documentElement.scrollLeft ? i2.o_doc.documentElement.scrollLeft : i2.o_doc.body.scrollLeft ? i2.o_doc.body.scrollLeft : 0;
        }, isInViewPort: function M2(e2) {
          var t2 = e2.getBoundingClientRect();
          return 0 <= (t2 = { top: Math.round(t2.top), bottom: Math.round(t2.bottom) }).top && t2.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t2.top <= 0 && t2.bottom >= (window.innerHeight || document.documentElement.clientHeight);
        }, isValidHexColor: function x2(e2) {
          return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(e2);
        }, isRGBColor: function O2(e2) {
          return /^rgba?\(\d+,\s*\d+,\s*\d+(,\s*\d+\.?\d*)?\)$/i.test(e2);
        } };
      }, X.MODULES.events = function(p2) {
        var e, i2 = p2.$, a2 = {};
        function s2(e2, t2, n) {
          E2(e2, t2, n);
        }
        function l2(e2) {
          if (e2.originalEvent && "insertReplacementText" === e2.originalEvent.inputType) {
            var t2 = p2.selection.get();
            if (!t2 || 0 === t2.rangeCount) return;
            for (var n = t2.getRangeAt(0), r2 = n.startContainer, o2 = n.startOffset, i3 = n.endContainer, a3 = n.endOffset; r2; ) {
              for (var s3 = r2.textContent, l3 = o2 - 1; 0 <= l3 && g2(s3[l3]); ) l3--;
              if (l3 <= o2 - 1) {
                o2 = l3 + 1;
                break;
              }
              o2 = (r2 = u2(r2)) ? r2.textContent.length : 0;
            }
            for (; i3; ) {
              for (var c3 = i3.textContent, d3 = a3; d3 < c3.length && g2(c3[d3]); ) d3++;
              if (a3 <= d3 && (d3 < c3.length || !r2.isSameNode(i3))) {
                a3 = d3;
                break;
              }
              i3 = h2(i3), a3 = 0;
            }
            if (r2 && i3) {
              var f3 = document.createRange();
              f3.setStart(r2, o2), f3.setEnd(i3, a3), t2.removeAllRanges(), t2.addRange(f3);
            }
          }
        }
        function u2(e2) {
          for (; e2; ) if ((!(e2 = e2.previousSibling) || !i2(e2).hasClass("fr-marker")) && e2 && e2.nodeType === Node.TEXT_NODE && e2.textContent.trim()) return e2;
          return null;
        }
        function h2(e2) {
          for (; e2; ) if ((!(e2 = e2.nextSibling) || !i2(e2).hasClass("fr-marker")) && e2 && e2.nodeType === Node.TEXT_NODE && e2.textContent.trim()) return e2;
          return null;
        }
        function g2(e2) {
          return /\w/.test(e2);
        }
        function c2(e2) {
          if (void 0 === e2 && (e2 = true), !p2.$wp) return false;
          if (p2.helpers.isIOS() && p2.$win.get(0).focus(), p2.core.hasFocus()) return false;
          if (!p2.core.hasFocus() && e2) {
            var t2 = p2.$win.scrollTop();
            if (p2.browser.msie && p2.$box && p2.$box.css("position", "fixed"), p2.browser.msie && p2.$wp && p2.$wp.css("overflow", "visible"), p2.browser.msie && p2.$sc && p2.$sc.css("position", "fixed"), p2.browser.msie || (C2(), p2.el.focus(), p2.events.trigger("focus"), f2()), p2.browser.msie && p2.$sc && p2.$sc.css("position", ""), p2.browser.msie && p2.$box && p2.$box.css("position", ""), p2.browser.msie && p2.$wp && p2.$wp.css("overflow", "auto"), t2 !== p2.$win.scrollTop() && p2.$win.scrollTop(t2), !p2.selection.info(p2.el).atStart) return false;
          }
          if (!p2.core.hasFocus() || 0 < p2.$el.find(".fr-marker").length) return false;
          if (p2.selection.info(p2.el).atStart && p2.selection.isCollapsed() && null !== p2.html.defaultTag()) {
            var n = p2.markers.insert();
            if (n && !p2.node.blockParent(n)) {
              i2(n).remove();
              var r2 = p2.$el.find(p2.html.blockTagsQuery()).get(0);
              r2 && (i2(r2).prepend(X.MARKERS), p2.selection.restore());
            } else n && i2(n).remove();
          }
        }
        var d2 = false;
        function f2() {
          e = true;
        }
        function C2() {
          e = false;
        }
        function m2() {
          return e;
        }
        function v2(e2, t2, n) {
          var r2, o2 = e2.split(" ");
          if (1 < o2.length) {
            for (var i3 = 0; i3 < o2.length; i3++) v2(o2[i3], t2, n);
            return true;
          }
          void 0 === n && (n = false), r2 = 0 !== e2.indexOf("shared.") ? (a2[e2] = a2[e2] || [], a2[e2]) : (p2.shared._events[e2] = p2.shared._events[e2] || [], p2.shared._events[e2]), n ? r2.unshift(t2) : r2.push(t2);
        }
        var b2 = [];
        function E2(e2, t2, n, r2, o2) {
          "function" == typeof n && (o2 = r2, r2 = n, n = false);
          var i3 = o2 ? p2.shared.$_events : b2, a3 = o2 ? p2.sid : p2.id, s3 = "".concat(t2.trim().split(" ").join(".ed".concat(a3, " ")), ".ed").concat(a3);
          n ? e2.on(s3, n, r2) : e2.on(s3, r2), i3.push([e2, s3]);
        }
        function t(e2) {
          for (var t2 = 0; t2 < e2.length; t2++) e2[t2][0].off(e2[t2][1]);
        }
        function L2(e2, t2, n) {
          if (!p2.edit.isDisabled() || n) {
            var r2, o2;
            if (0 !== e2.indexOf("shared.")) r2 = a2[e2];
            else {
              if (0 < p2.shared.count) return false;
              r2 = p2.shared._events[e2];
            }
            if (r2) {
              for (var i3 = 0; i3 < r2.length; i3++) if (false === (o2 = r2[i3].apply(p2, t2))) return false;
            }
            return (!p2.opts.events || !p2.opts.events[e2] || false !== (o2 = p2.opts.events[e2].apply(p2, t2))) && o2;
          }
        }
        function y2() {
          for (var e2 in a2) Object.prototype.hasOwnProperty.call(a2, e2) && delete a2[e2];
        }
        function N2() {
          for (var e2 in p2.shared._events) Object.prototype.hasOwnProperty.call(p2.shared._events, e2) && delete p2.shared._events[e2];
        }
        return { _init: function T2() {
          p2.shared.$_events = p2.shared.$_events || [], p2.shared._events = {}, (function e2() {
            p2.helpers.isMobile() ? (p2._mousedown = "touchstart", p2._mouseup = "touchend", p2._move = "touchmove", p2._mousemove = "touchmove") : (p2._mousedown = "mousedown", p2._mouseup = "mouseup", p2._move = "", p2._mousemove = "mousemove");
          })(), (function t2() {
            s2(p2.$el, "click mouseup mousemove mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function(e2) {
              L2(e2.type, [e2]);
            }), v2("mousedown", function() {
              for (var e2 = 0; e2 < X.INSTANCES.length; e2++) X.INSTANCES[e2] !== p2 && X.INSTANCES[e2].popups && X.INSTANCES[e2].popups.areVisible() && X.INSTANCES[e2].$el.find(".fr-marker").remove();
            });
          })(), (function n() {
            s2(p2.$win, p2._mousedown, function(e2) {
              L2("window.mousedown", [e2]), f2();
            }), s2(p2.$win, p2._mouseup, function(e2) {
              L2("window.mouseup", [e2]);
            }), s2(p2.$win, "beforeinput cut copy keydown keyup touchmove touchend", function(e2) {
              L2("window.".concat(e2.type), [e2]);
            });
          })(), (function r2() {
            s2(p2.$doc, "dragend drop", function(e2) {
              L2("document.".concat(e2.type), [e2]);
            });
          })(), (function o2() {
            s2(p2.$el, "beforeinput keydown keypress keyup input", function(e2) {
              L2(e2.type, [e2]);
            });
          })(), (function i3() {
            s2(p2.$el, "focus", function(e2) {
              m2() && (c2(false), false === d2 && (L2(e2.type, [e2]), p2.helpers.isMobile() && C2()));
            }), s2(p2.$el, "blur", function(e2) {
              m2() && true === d2 && (L2(e2.type, [e2]), p2.helpers.isMobile() && p2.opts.toolbarContainer && (p2.shared.selected_editor = p2.id), f2());
            }), E2(p2.$el, "mousedown", '[contenteditable="true"]', function() {
              C2(), p2.$el.blur();
            }), v2("focus", function() {
              d2 = true;
            }), v2("blur", function() {
              d2 = false;
            });
          })(), f2(), (function a3() {
            s2(p2.$el, "cut copy paste beforepaste", function(e2) {
              L2(e2.type, [e2]);
            });
          })(), v2("destroy", y2), v2("shared.destroy", N2), v2("beforeinput", l2);
        }, on: v2, trigger: L2, bindClick: function r2(e2, t2, n) {
          E2(e2, p2._mousedown, t2, function(e3) {
            p2.edit.isDisabled() || (function n2(e4) {
              var t3 = i2(e4.currentTarget);
              return p2.edit.isDisabled() || p2.node.hasClass(t3.get(0), "fr-disabled") ? (e4.preventDefault(), false) : "mousedown" === e4.type && 1 !== e4.which || (p2.helpers.isMobile() || e4.preventDefault(), (p2.helpers.isAndroid() || p2.helpers.isWindowsPhone()) && 0 === t3.parents(".fr-dropdown-menu").length && (e4.preventDefault(), e4.stopPropagation()), t3.addClass("fr-selected"), void p2.events.trigger("commands.mousedown", [t3]));
            })(e3);
          }, true), E2(e2, "".concat(p2._mouseup, " ").concat(p2._move), t2, function(e3) {
            p2.edit.isDisabled() || (p2.helpers.isIOS() && null !== p2.selection.get().focusNode && p2.selection.save(), (function o2(e4, t3) {
              var n2 = i2(e4.currentTarget);
              if (p2.edit.isDisabled() || p2.node.hasClass(n2.get(0), "fr-disabled")) return e4.preventDefault(), false;
              if ("mouseup" === e4.type && 1 !== e4.which) return true;
              if (p2.button.getButtons(".fr-selected", true).get(0) == n2.get(0) && !p2.node.hasClass(n2.get(0), "fr-selected")) return true;
              if ("touchmove" !== e4.type) {
                if (e4.stopPropagation(), e4.stopImmediatePropagation(), e4.preventDefault(), !p2.node.hasClass(n2.get(0), "fr-selected")) return p2.button.getButtons(".fr-selected", true).removeClass("fr-selected"), false;
                if (p2.button.getButtons(".fr-selected", true).removeClass("fr-selected"), n2.data("dragging") || n2.attr("disabled")) return n2.removeData("dragging"), false;
                var r3 = n2.data("timeout");
                r3 && (clearTimeout(r3), n2.removeData("timeout")), t3.apply(p2, [e4]);
              } else n2.data("timeout") || n2.data("timeout", setTimeout(function() {
                n2.data("dragging", true);
              }, 100));
            })(e3, n));
          }, true), E2(e2, "mousedown click mouseup", t2, function(e3) {
            p2.edit.isDisabled() || e3.stopPropagation();
          }, true), v2("window.mouseup", function() {
            p2.edit.isDisabled() || (e2.find(t2).removeClass("fr-selected"), f2());
          }), E2(e2, "mouseover", t2, function() {
            i2(this).hasClass("fr-options") && i2(this).prev(".fr-btn").addClass("fr-btn-hover"), i2(this).next(".fr-btn").hasClass("fr-options") && i2(this).next(".fr-btn").addClass("fr-btn-hover");
          }), E2(e2, "mouseout", t2, function() {
            i2(this).hasClass("fr-options") && i2(this).prev(".fr-btn").removeClass("fr-btn-hover"), i2(this).next(".fr-btn").hasClass("fr-options") && i2(this).next(".fr-btn").removeClass("fr-btn-hover");
          });
        }, disableBlur: C2, enableBlur: f2, blurActive: m2, focus: c2, chainTrigger: function S2(e2, t2, n) {
          if (!p2.edit.isDisabled() || n) {
            var r2, o2;
            if (0 !== e2.indexOf("shared.")) r2 = a2[e2];
            else {
              if (0 < p2.shared.count) return false;
              r2 = p2.shared._events[e2];
            }
            if (r2) for (var i3 = 0; i3 < r2.length; i3++) void 0 !== (o2 = r2[i3].apply(p2, [t2])) && (t2 = o2);
            return p2.opts.events && p2.opts.events[e2] && void 0 !== (o2 = p2.opts.events[e2].apply(p2, [t2])) && (t2 = o2), t2;
          }
        }, $on: E2, $off: function n() {
          t(b2), b2 = [], 0 === p2.shared.count && (t(p2.shared.$_events), p2.shared.$_events = []);
        } };
      }, Object.assign(X.DEFAULTS, { indentMargin: 20 }), X.COMMANDS = { bold: { title: "Bold", toggle: true, refresh: function(e) {
        var t = this.format.is("strong");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      } }, italic: { title: "Italic", toggle: true, refresh: function(e) {
        var t = this.format.is("em");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      } }, underline: { title: "Underline", toggle: true, refresh: function(e) {
        var t = this.format.is("u");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      } }, strikeThrough: { title: "Strikethrough", toggle: true, refresh: function(e) {
        var t = this.format.is("s");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      } }, subscript: { title: "Subscript", toggle: true, refresh: function(e) {
        var t = this.format.is("sub");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      } }, superscript: { title: "Superscript", toggle: true, refresh: function(e) {
        var t = this.format.is("sup");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      } }, outdent: { title: "Decrease Indent" }, indent: { title: "Increase Indent" }, undo: { title: "Undo", undo: false, forcedRefresh: true, disabled: true }, redo: { title: "Redo", undo: false, forcedRefresh: true, disabled: true }, insertHR: { title: "Insert Horizontal Line" }, clearFormatting: { title: "Clear Formatting" }, selectAll: { title: "Select All", undo: false }, moreText: { title: "More Text", undo: false }, moreParagraph: { title: "More Paragraph", undo: false }, moreRich: { title: "More Rich", undo: false }, moreMisc: { title: "More Misc", undo: false } }, X.RegisterCommand = function(e, t) {
        X.COMMANDS[e] = t;
      }, X.MODULES.commands = function(f2) {
        var p2 = f2.$;
        function a2(e2) {
          return f2.html.defaultTag() && (e2 = "<".concat(f2.html.defaultTag(), ">").concat(e2, "</").concat(f2.html.defaultTag(), ">")), e2;
        }
        var s2 = { bold: function() {
          e("bold", "strong");
        }, subscript: function() {
          f2.format.is("sup") && f2.format.remove("sup"), e("subscript", "sub");
        }, superscript: function() {
          f2.format.is("sub") && f2.format.remove("sub"), e("superscript", "sup");
        }, italic: function() {
          e("italic", "em");
        }, strikeThrough: function() {
          e("strikeThrough", "s");
        }, underline: function() {
          e("underline", "u");
        }, undo: function() {
          f2.undo.run();
        }, redo: function() {
          f2.undo.redo();
        }, indent: function() {
          r2(1);
        }, outdent: function() {
          r2(-1);
        }, show: function() {
          f2.opts.toolbarInline && f2.toolbar.showInline(null, true);
        }, insertHR: function() {
          f2.selection.remove();
          var e2 = "";
          f2.core.isEmpty() && (e2 = a2(e2 = "<br>"));
          var t2 = '<hr id="fr-just" class="fr-just">'.concat(e2);
          f2.opts.trackChangesEnabled && (t2 = f2.track_changes.wrapInTracking(p2(t2), "hrWrapper").get(0).outerHTML);
          f2.html.insert(t2);
          var n2, r3 = f2.$el.find("hr#fr-just").length ? f2.$el.find("hr#fr-just") : f2.$el.find(".fr-just");
          r3.removeAttr("id"), r3.removeAttr("class");
          var o3 = f2.opts.trackChangesEnabled && "SPAN" === r3[0].parentNode.tagName && "P" === r3[0].parentNode.parentNode.tagName;
          if (0 === r3.next().length) {
            var i3 = f2.html.defaultTag();
            i3 && !o3 ? r3.after(p2(f2.doc.createElement(i3)).append("<br>").get(0)) : o3 ? r3[0].parentNode.after(p2(f2.doc.createElement(i3)).append("<br>").get(0)) : r3.after("<br>");
          }
          r3.prev().is("hr") ? n2 = f2.selection.setAfter(r3.get(0), false) : r3.next().is("hr") ? n2 = f2.selection.setBefore(r3.get(0), false) : o3 || f2.selection.setAfter(r3.get(0), false) ? f2.selection.setAfter(r3[0].parentNode, false) : f2.selection.setBefore(r3.get(0), false), n2 || void 0 === n2 || (e2 = a2(e2 = "".concat(X.MARKERS, "<br>")), r3.after(e2)), f2.selection.restore();
        }, clearFormatting: function() {
          f2.format.remove();
        }, selectAll: function() {
          f2.doc.execCommand("selectAll", false, false), (function d2() {
            var e2 = null, t2 = null, n2 = null, r3 = null, o3 = true === f2.opts.iframe, i3 = p2(".fr-iframe")[0], a3 = o3 ? p2(i3.contentWindow.document.body) : f2.$el;
            if (o3 && i3) {
              var s3 = i3.contentWindow;
              n2 = s3.document.createRange.bind(s3.document), r3 = s3.getSelection();
            } else n2 = document.createRange.bind(document), r3 = window.getSelection();
            if (f2.selection.isCollapsed()) {
              r3.removeAllRanges();
              var l3 = a3.contents();
              if (e2 = l3.first()[0], t2 = l3.last()[0], e2 && t2) {
                var c2 = n2();
                c2.setStart(e2, 0), c2.setEnd(t2, t2.nodeType === Node.TEXT_NODE ? t2.textContent.length : t2.childNodes.length), r3.addRange(c2), f2.selection.save();
              }
            }
          })();
        }, moreText: function(e2) {
          t(e2);
        }, moreParagraph: function(e2) {
          t(e2);
        }, moreRich: function(e2) {
          t(e2);
        }, moreMisc: function(e2) {
          t(e2);
        }, moreTrackChanges: function() {
          t("trackChanges");
        } };
        function t(e2) {
          var t2 = f2.$tb.find("[data-cmd=".concat(e2, "]")), n2 = f2.$tb.find("[data-cmd=html]");
          f2.opts.trackChangesEnabled || f2.markdown && f2.markdown.isEnabled() ? n2 && n2.addClass("fr-disabled") : n2 && n2.removeClass("fr-disabled"), (function r3(n3) {
            f2.helpers.isMobile() && f2.opts.toolbarInline && f2.events.disableBlur();
            var e3 = f2.$tb.find('.fr-more-toolbar[data-name="'.concat(n3.attr("data-group-name"), '"]'));
            "trackChanges" === n3.data("cmd") && (e3 = f2.$tb.find('.fr-more-toolbar[data-name="'.concat(n3.attr("id"), '"]')));
            if (f2.$tb.find(".fr-open").not(n3).not('[data-cmd="trackChanges"]').removeClass("fr-open").attr("aria-expanded", false), n3.toggleClass("fr-open"), n3.attr("aria-expanded", n3.hasClass("fr-open")), f2.$tb.find(".fr-more-toolbar").removeClass("fr-overflow-visible"), f2.$tb.find(".fr-expanded").not(e3).length) {
              var t3 = f2.$tb.find(".fr-expanded").not(e3);
              t3.each(function(e4, t4) {
                0 != p2(t4).data("name").indexOf("trackChanges-") && 0 != p2(t4).data("name").indexOf("moreRich-") ? p2(t4).toggleClass("fr-expanded") : n3.parents('[data-name^="moreRich-"]').length || 0 == p2(t4).data("name").indexOf("trackChanges-") || p2(t4).find('[id^="trackChanges-"]').length && f2.opts.trackChangesEnabled || p2(t4).toggleClass("fr-expanded");
              }), e3.toggleClass("fr-expanded");
            } else e3.toggleClass("fr-expanded"), f2.$box.toggleClass("fr-toolbar-open"), f2.$tb.toggleClass("fr-toolbar-open");
          })(t2), f2.toolbar.setMoreToolbarsHeight();
        }
        function n(e2, t2) {
          if (!(f2.markdown && f2.markdown.isEnabled() && ("bold" === e2 || "italic" === e2 || "underline" === e2) || f2.opts.trackChangesEnabled && "markdown" === e2) && false !== f2.events.trigger("commands.before", p2.merge([e2], t2 || []))) {
            var n2 = X.COMMANDS[e2] && X.COMMANDS[e2].callback || s2[e2], r3 = true, o3 = false;
            if (X.COMMANDS[e2] && ("undefined" != typeof X.COMMANDS[e2].focus && (r3 = X.COMMANDS[e2].focus), "undefined" != typeof X.COMMANDS[e2].accessibilityFocus && (o3 = X.COMMANDS[e2].accessibilityFocus)), !f2.core.hasFocus() && r3 || !f2.core.hasFocus() && o3 && f2.accessibility.hasFocus()) {
              var i3 = f2.selection.ranges()[0];
              f2.opts.allowStylingOnNonEditable && i3 && p2(i3.startContainer).parentsUntil(f2.$el, '[contenteditable="false"]').length && f2.selection.save(), f2.el.focus({ preventScroll: true }), f2.events.trigger("focus");
            }
            X.COMMANDS[e2] && false !== X.COMMANDS[e2].undo && (f2.$el.find(".fr-marker").length && (f2.events.disableBlur(), f2.selection.restore()), f2.undo.saveStep()), n2 && n2.apply(f2, p2.merge([e2], t2 || [])), f2.events.trigger("commands.after", p2.merge([e2], t2 || [])), X.COMMANDS[e2] && false !== X.COMMANDS[e2].undo && f2.undo.saveStep();
          }
        }
        function e(e2, t2) {
          f2.format.toggle(t2);
        }
        function r2(e2) {
          f2.selection.save(), f2.html.wrap(true, true, true, true), f2.selection.restore();
          for (var t2 = f2.selection.blocks(), n2 = 0; n2 < t2.length; n2++) if ("LI" !== t2[n2].tagName && "LI" != t2[n2].parentNode.tagName && ("LI" !== t2[n2].tagName || "LI" !== t2[n2].parentNode.tagName)) {
            var r3 = p2(t2[n2]);
            "LI" != t2[n2].tagName && "LI" == t2[n2].parentNode.tagName && (r3 = p2(t2[n2].parentNode));
            var o3 = "rtl" === f2.opts.direction || "rtl" === r3.css("direction") ? "margin-right" : "margin-left", i3 = f2.helpers.getPX(r3.css(o3)), a3 = f2.helpers.getPX(r3.css("text-indent"));
            if (r3.width() < 2 * f2.opts.indentMargin && 0 < e2 || i3 + a3 <= 0 && e2 < 0) continue;
            "UL" != t2[n2].parentNode.tagName && "OL" != t2[n2].parentNode.tagName && "LI" != t2[n2].parentNode.tagName && r3.css(o3, Math.max(i3 + e2 * f2.opts.indentMargin, 0) || ""), r3.removeClass("fr-temp-div");
          }
          f2.selection.save(), f2.html.unwrap(), f2.selection.restore();
        }
        function o2(e2) {
          return function() {
            n(e2);
          };
        }
        var i2 = {};
        for (var l2 in s2) Object.prototype.hasOwnProperty.call(s2, l2) && (i2[l2] = o2(l2));
        return Object.assign(i2, { exec: n, _init: function c2() {
          f2.events.on("keydown", function(e2) {
            var t2 = f2.selection.element();
            if ((e2.ctrlKey || e2.metaKey) && "a" === e2.key && (e2.preventDefault(), n("selectAll")), t2 && "HR" === t2.tagName && !f2.keys.isArrow(e2.which)) return e2.preventDefault(), false;
          }), f2.events.on("keyup", function(e2) {
            var t2 = f2.selection.element();
            if (t2 && "HR" === t2.tagName) {
              if (e2.which === X.KEYCODE.ARROW_LEFT || e2.which === X.KEYCODE.ARROW_UP) {
                if (t2.previousSibling) return f2.node.isBlock(t2.previousSibling) ? f2.selection.setAtEnd(t2.previousSibling) : p2(t2).before(X.MARKERS), f2.selection.restore(), false;
              } else if ((e2.which === X.KEYCODE.ARROW_RIGHT || e2.which === X.KEYCODE.ARROW_DOWN) && t2.nextSibling) return f2.node.isBlock(t2.nextSibling) ? f2.selection.setAtStart(t2.nextSibling) : p2(t2).after(X.MARKERS), f2.selection.restore(), false;
            }
          }), f2.events.on("mousedown", function(e2) {
            if (e2.target && "HR" === e2.target.tagName) return e2.preventDefault(), e2.stopPropagation(), false;
          }), f2.events.on("mouseup", function() {
            var e2 = f2.selection.element();
            e2 === f2.selection.endElement() && e2 && "HR" === e2.tagName && (e2.nextSibling && (f2.node.isBlock(e2.nextSibling) ? f2.selection.setAtStart(e2.nextSibling) : p2(e2).after(X.MARKERS)), f2.selection.restore());
          });
        } });
      }, X.MODULES.cursorLists = function(v2) {
        var b2 = v2.$;
        function E2(e) {
          for (var t = e; "LI" !== t.tagName; ) t = t.parentNode;
          return t;
        }
        function L2(e) {
          for (var t = e; !v2.node.isList(t); ) t = t.parentNode;
          return t;
        }
        function y2(e) {
          for (var t = "", n = 0; n < e.length; n++) {
            var r2 = e[n];
            t += "".concat(r2.name, "='").concat(r2.value, "' ");
          }
          return t;
        }
        return { _startEnter: function N2(e) {
          var t, n = E2(e), r2 = n.nextSibling, o2 = n.previousSibling, i2 = v2.html.defaultTag();
          if (v2.node.isEmpty(n, true) && r2) {
            for (var a2 = "", s2 = "", l2 = e.parentNode; !v2.node.isList(l2) && l2.parentNode && ("LI" !== l2.parentNode.tagName || l2.parentNode === n); ) -1 < ["OL", "LI", "UL"].indexOf(l2.tagName) && (a2 = v2.node.openTagString(l2) + a2, s2 += v2.node.closeTagString(l2)), l2 = l2.parentNode;
            a2 = v2.node.openTagString(l2) + a2, s2 += v2.node.closeTagString(l2);
            var c2 = "";
            if (l2.parentNode && "LI" === l2.parentNode.tagName) if (l2.parentNode.attributes.length) {
              var d2 = y2(l2.parentNode.attributes);
              c2 = "".concat(s2, "<li ").concat(d2, ">").concat(X.MARKERS, "<br>").concat(a2);
            } else c2 = "".concat(s2, "<li>").concat(X.MARKERS, "<br>").concat(a2);
            else c2 = i2 ? "".concat(s2, "<").concat(i2, ">").concat(X.MARKERS, "<br></").concat(i2, ">").concat(a2) : "".concat(s2 + X.MARKERS, "<br>").concat(a2);
            for (; ["UL", "OL"].indexOf(l2.tagName) < 0 || l2.parentNode && "LI" === l2.parentNode.tagName; ) l2 = l2.parentNode;
            b2(n).replaceWith('<span id="fr-break"></span>');
            var f2 = v2.node.openTagString(l2) + b2(l2).html() + v2.node.closeTagString(l2);
            f2 = f2.replace(/<span id="fr-break"><\/span>/g, c2), b2(l2).replaceWith(f2), v2.$el.find("li:empty").remove(), v2.$el.find("li > p > span:empty").length && v2.$el.find("li > p > span:empty")[0].parentNode.parentNode.remove();
          } else if (o2 && r2 || !v2.node.isEmpty(n, true)) {
            var p2 = "<br>", u2 = e.parentNode;
            for (u2 && "A" === u2.tagName && (u2 = null); u2 && "LI" !== u2.tagName; ) p2 = v2.node.openTagString(u2) + p2 + v2.node.closeTagString(u2), u2 = u2.parentNode;
            if (u2 && u2.attributes.length) {
              var h2 = y2(u2.attributes);
              b2(n).before("<li ".concat(h2, ">").concat(p2, "</li>"));
            } else b2(n).before("<li>".concat(p2, "</li>"));
            b2(e).remove();
          } else if (o2) {
            t = L2(n);
            for (var g2 = "".concat(X.MARKERS, "<br>"), C2 = e.parentNode; C2 && "LI" !== C2.tagName; ) g2 = v2.node.openTagString(C2) + g2 + v2.node.closeTagString(C2), C2 = C2.parentNode;
            if (t.parentNode && "LI" === t.parentNode.tagName) if (t.parentNode.attributes.length) {
              var m2 = y2(t.parentNode.attributes);
              b2(t.parentNode).after("<li ".concat(m2, ">").concat(g2, "</li>"));
            } else b2(t.parentNode).after("<li>".concat(g2, "</li>"));
            else i2 ? b2(t).after("<".concat(i2, ">").concat(g2, "</").concat(i2, ">")) : b2(t).after(g2);
            b2(n).remove();
          } else (t = L2(n)).parentNode && "LI" === t.parentNode.tagName ? r2 ? b2(t.parentNode).before("".concat(v2.node.openTagString(n) + X.MARKERS, "<br></li>")) : b2(t.parentNode).after("".concat(v2.node.openTagString(n) + X.MARKERS, "<br></li>")) : i2 ? b2(t).before("<".concat(i2, ">").concat(X.MARKERS, "<br></").concat(i2, ">")) : b2(t).before("".concat(X.MARKERS, "<br>")), b2(n).remove();
        }, _middleEnter: function c2(e) {
          for (var t = E2(e), n = "", r2 = e, o2 = "", i2 = "", a2 = false; r2 !== t; ) {
            var s2 = "A" === (r2 = r2.parentNode).tagName && v2.cursor.isAtEnd(e, r2) ? "fr-to-remove" : "";
            a2 || r2 == t || v2.node.isBlock(r2) || (a2 = true, o2 += X.INVISIBLE_SPACE), o2 = v2.node.openTagString(b2(r2).clone().addClass(s2).get(0)) + o2, i2 += v2.node.closeTagString(r2);
          }
          n = i2 + n + o2 + X.MARKERS + (v2.opts.keepFormatOnDelete ? X.INVISIBLE_SPACE : ""), b2(e).replaceWith('<span id="fr-break"></span>');
          var l2 = v2.node.openTagString(t) + b2(t).html() + v2.node.closeTagString(t);
          l2 = l2.replace(/<span id="fr-break"><\/span>/g, n), b2(t).replaceWith(l2);
        }, _endEnter: function l2(e) {
          for (var t = E2(e), n = X.MARKERS, r2 = "", o2 = e, i2 = false; o2 !== t; ) if (!(o2 = o2.parentNode).classList.contains("fr-img-space-wrap") && !o2.classList.contains("fr-img-space-wrap2")) {
            var a2 = "A" === o2.tagName && v2.cursor.isAtEnd(e, o2) ? "fr-to-remove" : "";
            i2 || o2 === t || v2.node.isBlock(o2) || (i2 = true, r2 += X.INVISIBLE_SPACE), r2 = v2.node.openTagString(b2(o2).clone().addClass(a2).get(0)) + r2, n += v2.node.closeTagString(o2);
          }
          var s2 = r2 + n;
          b2(e).remove(), b2(t).after(s2);
        }, _backspace: function u2(e) {
          var t = E2(e), n = t.previousSibling;
          if (n) {
            var r2 = b2(n).children().last(), o2 = r2[0] && r2[0].tagName ? r2[0].tagName : "", i2 = "P" === o2, a2 = 0 < b2(n).find("table").length;
            ["TABLE", "TBODY", "TR", "TD", "TH"].includes(o2) || a2 && i2 || (n = b2(n).find(v2.html.blockTagsQuery()).get(-1) || n), b2(e).replaceWith(X.MARKERS);
            var s2 = v2.node.contents(n);
            s2.length && "BR" === s2[s2.length - 1].tagName && b2(s2[s2.length - 1]).remove(), b2(t).find(v2.html.blockTagsQuery()).not("ol, ul, table").each(function() {
              this.parentNode === t && b2(this).replaceWith(b2(this).html() + (v2.node.isEmpty(this) ? "" : "<br>"));
            });
            for (var l2, c2 = v2.node.contents(t)[0]; c2 && !v2.node.isList(c2); ) l2 = c2.nextSibling, b2(n).append(c2), c2 = l2;
            for (n = t.previousSibling; c2; ) l2 = c2.nextSibling, b2(n).append(c2), c2 = l2;
            1 < (s2 = v2.node.contents(n)).length && "BR" === s2[s2.length - 1].tagName && b2(s2[s2.length - 1]).remove(), b2(t).remove();
          } else {
            var d2 = L2(t);
            if (b2(e).replaceWith(X.MARKERS), d2.parentNode && "LI" === d2.parentNode.tagName) {
              var f2 = d2.previousSibling;
              v2.node.isBlock(f2) ? (b2(t).find(v2.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                this.parentNode === t && b2(this).replaceWith(b2(this).html() + (v2.node.isEmpty(this) ? "" : "<br>"));
              }), b2(f2).append(b2(t).html())) : b2(d2).before(b2(t).html());
            } else {
              var p2 = v2.html.defaultTag();
              p2 && 0 === b2(t).find(v2.html.blockTagsQuery()).length ? b2(d2).before("<".concat(p2, ">").concat(b2(t).html(), "</").concat(p2, ">")) : b2(d2).before(b2(t).html());
            }
            b2(t).remove(), v2.html.wrap(), 0 === b2(d2).find("li").length && b2(d2).remove();
          }
        }, _del: function d2(e) {
          var t, n = E2(e), r2 = n.nextSibling;
          if (r2) {
            (t = v2.node.contents(r2)).length && "BR" === t[0].tagName && b2(t[0]).remove(), b2(r2).find(v2.html.blockTagsQuery()).not("ol, ul, table").each(function() {
              this.parentNode === r2 && b2(this).replaceWith(b2(this).html() + (v2.node.isEmpty(this) ? "" : "<br>"));
            });
            for (var o2, i2 = e, a2 = v2.node.contents(r2)[0]; a2 && !v2.node.isList(a2); ) o2 = a2.nextSibling, b2(i2).after(a2), i2 = a2, a2 = o2;
            for (; a2; ) o2 = a2.nextSibling, b2(n).append(a2), a2 = o2;
            b2(e).replaceWith(X.MARKERS), b2(r2).remove();
          } else {
            for (var s2 = n; !s2.nextSibling && s2 !== v2.el; ) s2 = s2.parentNode;
            if (s2 === v2.el) return false;
            if (s2 = s2.nextSibling, v2.node.isBlock(s2)) {
              if (X.NO_DELETE_TAGS.indexOf(s2.tagName) < 0) {
                if (b2(e).replaceWith(X.MARKERS), (t = v2.node.contents(n)).length && "BR" === t[t.length - 1].tagName && b2(t[t.length - 1]).remove(), s2.isContentEditable && "DIV" === s2.tagName && (!v2.node.isBlock(s2.previousSibling) || "DIV" === s2.previousSibling.tagName)) return;
                b2(n).append(b2(s2).html()), b2(s2).remove();
              }
            } else {
              for ((t = v2.node.contents(n)).length && "BR" === t[t.length - 1].tagName && b2(t[t.length - 1]).remove(), b2(e).replaceWith(X.MARKERS); s2 && !v2.node.isBlock(s2) && "BR" !== s2.tagName; ) b2(n).append(b2(s2)), s2 = s2.nextSibling;
              b2(s2).remove();
            }
          }
        } };
      }, X.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], X.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], X.MODULES.cursor = function(b2) {
        var E2 = b2.$, L2 = function L3(e) {
          var t = null;
          e && e.nodeType === Node.TEXT_NODE && e.nodeValue.trim() && (t = e);
          var n2 = function(e2) {
            E2(e2).contents().each(function() {
              this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() ? t = this : this.nodeType === Node.ELEMENT_NODE && n2(this);
            });
          };
          return n2(e), t;
        };
        function u2(e) {
          return !!e && (b2.node.isBlock(e) ? "P" !== e.tagName || !e.nextElementSibling || !e.parentElement || "OL" !== e.nextElementSibling.tagName || "LI" !== e.parentElement.tagName : e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? u2(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && u2(e.parentNode));
        }
        function h2(e) {
          return !!e && (!!b2.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? h2(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !b2.node.hasClass(e.parentNode, "fr-inner")) || h2(e.parentNode))));
        }
        function g2(e, t) {
          return !!e && (e !== b2.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? g2(e.previousSibling, t) : !e.previousSibling && (e.parentNode === t || g2(e.parentNode, t))));
        }
        function C2(e, t) {
          return !!e && (e !== b2.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? C2(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode === t || C2(e.parentNode, t))));
        }
        function m2(e) {
          return 0 < E2(e).parentsUntil(b2.$el, "LI").length && 0 === E2(e).parentsUntil("LI", "TABLE").length;
        }
        function y2(e, t) {
          var n2 = new RegExp("".concat(t ? "^" : "", "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})").concat(t ? "" : "$"), "i"), r2 = e.match(n2);
          return r2 ? r2[0].length : 1;
        }
        function N2(e) {
          for (var t, n2 = e; !n2.previousSibling; ) if (n2 = n2.parentNode, b2.node.isElement(n2)) return false;
          n2 = n2.previousSibling;
          var r2 = b2.opts.htmlAllowedEmptyTags, o2 = n2.tagName && n2.tagName.toLowerCase();
          if ((!b2.node.isBlock(n2) || n2.lastChild && o2 && 0 <= r2.indexOf(o2)) && b2.node.isEditable(n2)) {
            for (t = b2.node.contents(n2); n2.nodeType !== Node.TEXT_NODE && !b2.node.isDeletable(n2) && t.length && b2.node.isEditable(n2); ) n2 = t[t.length - 1], t = b2.node.contents(n2);
            if (n2.nodeType === Node.TEXT_NODE) {
              var i3 = n2.textContent, a3 = i3.length;
              if (i3.length && "\n" === i3[i3.length - 1]) return n2.textContent = i3.substring(0, a3 - 2), 0 === n2.textContent.length && n2.parentNode.removeChild(n2), N2(e);
              if (b2.opts.tabSpaces && i3.length >= b2.opts.tabSpaces || b2.opts.preserveTabSpaces && 4 <= i3.length) {
                var s2 = b2.opts.tabSpaces ? b2.opts.tabSpaces : 4;
                0 === i3.substr(i3.length - s2, i3.length - 1).replace(/ /g, "").replace(new RegExp(X.UNICODE_NBSP, "g"), "").length && (a3 = i3.length - s2 + 1);
              }
              n2.textContent = i3.substring(0, a3 - y2(i3));
              var l2 = n2.textContent;
              (b2.opts.enter === X.ENTER_BR && 0 < l2.length && " " === l2.charAt(l2.length - 1) || 0 === l2.length && e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && "TD" !== e.parentNode.tagName && "LI" !== e.parentNode.tagName && i3 !== String.fromCharCode(8203)) && (b2.node.isBlock(E2(e).parentsUntil(b2.el).last().get(0)) && e.insertAdjacentHTML("beforebegin", X.MARKERS), e.insertAdjacentHTML("beforebegin", X.INVISIBLE_SPACE), n2 = n2.nextSibling), b2.opts.trackChangesEnabled && 0 === n2.textContent.length && E2(n2.parentElement).data("tracking") && 0 === E2(n2.parentElement).find("[data-tracking-deleted=true]").length && (E2(e).insertBefore(n2.parentElement), E2(n2.parentElement).remove(), n2 = E2(e)[0].previousSibling), b2.opts.htmlUntouched && !e.nextSibling && n2.textContent.length && " " === n2.textContent[n2.textContent.length - 1] && (n2.textContent = n2.textContent.substring(0, n2.textContent.length - 1) + X.UNICODE_NBSP);
              var c2 = i3.length !== n2.textContent.length;
              if (b2.opts.enter !== X.ENTER_BR && n2 && n2.previousSibling && n2.previousSibling.previousSibling && "BR" === n2.previousSibling.previousSibling.tagName && 0 === n2.textContent.length && n2.previousSibling.previousSibling.remove(), 0 === n2.textContent.length && "LI" === n2.parentNode.tagName && n2.previousSibling && "BR" === n2.previousSibling.tagName && n2.previousSibling.remove(), 0 === n2.textContent.length && n2.parentNode.tagName && "svg" === n2.parentNode.tagName.toLowerCase() && n2.parentElement.remove(), 0 === n2.textContent.length) if (c2 && b2.opts.keepFormatOnDelete) E2(n2).after(X.INVISIBLE_SPACE + X.MARKERS);
              else if (0 !== i3.length && b2.node.isBlock(n2.parentNode)) E2(n2).after(X.MARKERS);
              else if ((2 != n2.parentNode.childNodes.length || n2.parentNode != e.parentNode) && 1 != n2.parentNode.childNodes.length || b2.node.isBlock(n2.parentNode) || b2.node.isElement(n2.parentNode) || !b2.node.isDeletable(n2.parentNode)) {
                for (var d2, f2 = n2; !b2.node.isElement(n2.parentNode) && b2.node.isEmpty(n2.parentNode) && X.NO_DELETE_TAGS.indexOf(n2.parentNode.tagName) < 0; ) if ("A" === (n2 = n2.parentNode).tagName) {
                  var p2 = n2.childNodes[0];
                  for (E2(n2).before(p2), d2 = true; 0 < p2.childNodes.length; ) p2 = p2.childNodes[0];
                  n2.parentNode.removeChild(n2), n2 = p2;
                  break;
                }
                d2 || (n2 = f2), E2(n2).after(X.MARKERS), b2.node.isElement(n2.parentNode) && !e.nextSibling && n2.previousSibling && "BR" === n2.previousSibling.tagName && E2(e).after("<br>");
                var u3 = n2.parentNode;
                n2.parentNode.removeChild(n2), b2.node.isEmpty(u3) && E2(u3).html(X.INVISIBLE_SPACE + X.MARKERS);
              } else E2(n2.parentNode).after(X.MARKERS), E2(n2.parentNode).remove();
              else E2(n2).after(X.MARKERS);
            } else b2.node.isDeletable(n2) ? (E2(n2).after(X.MARKERS), E2(n2).remove()) : e.nextSibling && "BR" === e.nextSibling.tagName && b2.node.isVoid(n2) && "BR" !== n2.tagName ? (E2(e.nextSibling).remove(), E2(e).replaceWith(X.MARKERS)) : false !== b2.events.trigger("node.remove", [E2(n2)]) && ("BR" === n2.tagName ? E2(L2(n2.previousSibling)).after(X.MARKERS) : E2(n2).after(X.MARKERS), E2(n2).remove());
          } else if (X.NO_DELETE_TAGS.indexOf(n2.tagName) < 0 && (b2.node.isEditable(n2) || b2.node.isDeletable(n2))) if (b2.node.isDeletable(n2)) E2(e).replaceWith(X.MARKERS), E2(n2).remove();
          else if (b2.node.isEmpty(n2) && !b2.node.isList(n2)) E2(n2).remove(), E2(e).replaceWith(X.MARKERS);
          else {
            for (b2.node.isList(n2) && (n2 = E2(n2).find("li").last().get(0)), (t = b2.node.contents(n2)) && 0 < t.length && "BR" === t[t.length - 1].tagName && E2(t[t.length - 1]).remove(), t = b2.node.contents(n2); t && 0 < t.length && b2.node.isBlock(t[t.length - 1]); ) n2 = t[t.length - 1], t = b2.node.contents(n2);
            var h3 = L2(n2), g3 = h3 && 0 < E2(h3).parents("span").length;
            if (b2.opts.enter === X.ENTER_BR && g3) {
              var C3 = E2(n2).find("span").last().get(0);
              C3 ? E2(L2(C3)).after(X.MARKERS) : E2(n2).append(X.MARKERS);
            } else E2(n2).append(X.MARKERS);
            for (var m3 = e; !m3.previousSibling; ) m3 = m3.parentNode;
            for (; m3 && "BR" !== m3.tagName && !b2.node.isBlock(m3); ) {
              var v3 = m3;
              m3 = m3.nextSibling, E2(n2).append(v3);
            }
            m3 && "BR" === m3.tagName && E2(m3).remove(), E2(e).remove();
          }
          else e.nextSibling && "BR" === e.nextSibling.tagName && E2(e.nextSibling).remove();
          return true;
        }
        function i2(e) {
          var t = 0 < E2(e).parentsUntil(b2.$el, "BLOCKQUOTE").length, n2 = b2.node.deepestParent(e, [], !t);
          if (n2 && "BLOCKQUOTE" === n2.tagName) {
            var r2 = b2.node.deepestParent(e, [E2(e).parentsUntil(b2.$el, "BLOCKQUOTE").get(0)]);
            r2 && r2.nextSibling && (n2 = r2);
          }
          if (null !== n2) {
            var o2, i3 = n2.nextSibling;
            if (b2.node.isBlock(n2) && (b2.node.isEditable(n2) || b2.node.isDeletable(n2)) && i3 && X.NO_DELETE_TAGS.indexOf(i3.tagName) < 0) if (b2.node.isDeletable(i3)) E2(i3).remove(), E2(e).replaceWith(X.MARKERS);
            else if (b2.node.isBlock(i3) && b2.node.isEditable(i3)) if (b2.node.isList(i3)) if (b2.node.isEmpty(n2, true)) E2(n2).remove(), E2(i3).find("li").first().prepend(X.MARKERS);
            else {
              var a3 = E2(i3).find("li").first();
              "BLOCKQUOTE" === n2.tagName && (o2 = b2.node.contents(n2)).length && b2.node.isBlock(o2[o2.length - 1]) && (n2 = o2[o2.length - 1]), 0 === a3.find("ul, ol").length && (E2(e).replaceWith(X.MARKERS), a3.find(b2.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                this.parentNode === a3.get(0) && E2(this).replaceWith(E2(this).html() + (b2.node.isEmpty(this) ? "" : "<br>"));
              }), E2(n2).append(b2.node.contents(a3.get(0))), a3.remove(), 0 === E2(i3).find("li").length && E2(i3).remove());
            }
            else {
              if ((o2 = b2.node.contents(i3)).length && "BR" === o2[0].tagName && E2(o2[0]).remove(), "BLOCKQUOTE" !== i3.tagName && "BLOCKQUOTE" === n2.tagName) for (o2 = b2.node.contents(n2); o2.length && b2.node.isBlock(o2[o2.length - 1]); ) n2 = o2[o2.length - 1], o2 = b2.node.contents(n2);
              else if ("BLOCKQUOTE" === i3.tagName && "BLOCKQUOTE" !== n2.tagName) for (o2 = b2.node.contents(i3); o2.length && b2.node.isBlock(o2[0]); ) i3 = o2[0], o2 = b2.node.contents(i3);
              E2(e).replaceWith(X.MARKERS), E2(n2).append(i3.innerHTML), E2(i3).remove();
            }
            else {
              for (E2(e).replaceWith(X.MARKERS); i3 && "BR" !== i3.tagName && !b2.node.isBlock(i3) && b2.node.isEditable(i3); ) {
                var s2 = i3;
                i3 = i3.nextSibling, E2(n2).append(s2);
              }
              i3 && "BR" === i3.tagName && b2.node.isEditable(i3) && E2(i3).remove();
            }
          }
        }
        function n(e) {
          for (var t, n2 = e; !n2.nextSibling; ) if (n2 = n2.parentNode, b2.node.isElement(n2)) return false;
          if ("BR" === (n2 = n2.nextSibling).tagName && b2.node.isEditable(n2)) {
            if (n2.nextSibling) {
              if (b2.node.isBlock(n2.nextSibling) && b2.node.isEditable(n2.nextSibling)) {
                if (!(X.NO_DELETE_TAGS.indexOf(n2.nextSibling.tagName) < 0)) return void E2(n2).remove();
                n2 = n2.nextSibling, E2(n2.previousSibling).remove();
              }
            } else if (u2(n2)) {
              if (m2(e)) b2.cursorLists._del(e);
              else b2.node.deepestParent(n2) && ((!b2.node.isEmpty(b2.node.blockParent(n2)) || (b2.node.blockParent(n2).nextSibling && X.NO_DELETE_TAGS.indexOf(b2.node.blockParent(n2).nextSibling.tagName)) < 0) && E2(n2).remove(), n2 && n2.parentNode && 8203 === n2.parentNode.textContent.charCodeAt() && n2.parentNode.childNodes[1] && "BR" === n2.parentNode.childNodes[1].tagName && n2.parentNode.tagName.toLowerCase() === b2.html.defaultTag() && n2.parentNode.nextSibling && "TABLE" === n2.parentNode.nextSibling.tagName && E2(n2.parentNode).remove(), i2(e));
              return;
            }
          }
          if (!b2.node.isBlock(n2) && b2.node.isEditable(n2)) {
            for (t = b2.node.contents(n2); n2.nodeType !== Node.TEXT_NODE && t.length && !b2.node.isDeletable(n2) && b2.node.isEditable(n2); ) n2 = t[0], t = b2.node.contents(n2);
            n2.nodeType === Node.TEXT_NODE ? (E2(n2).before(X.MARKERS), n2.textContent.length && (n2.textContent = n2.textContent.substring(y2(n2.textContent, true), n2.textContent.length))) : b2.node.isDeletable(n2) ? (E2(n2).before(X.MARKERS), E2(n2).remove()) : false !== b2.events.trigger("node.remove", [E2(n2)]) && (E2(n2).before(X.MARKERS), E2(n2).remove()), E2(e).remove();
          } else if (X.NO_DELETE_TAGS.indexOf(n2.tagName) < 0 && (b2.node.isEditable(n2) || b2.node.isDeletable(n2))) if (b2.node.isDeletable(n2)) E2(e).replaceWith(X.MARKERS), E2(n2).remove();
          else if (b2.node.isList(n2)) e.previousSibling ? (E2(n2).find("li").first().prepend(e), b2.cursorLists._backspace(e)) : (E2(n2).find("li").first().prepend(X.MARKERS), E2(e).remove());
          else if ((t = b2.node.contents(n2)) && 0 < t.length && "BR" === t[0].tagName && E2(t[0]).remove(), t && 0 < t.length && "BLOCKQUOTE" === n2.tagName) {
            var r2 = t[0];
            for (E2(e).before(X.MARKERS); r2 && "BR" !== r2.tagName; ) {
              var o2 = r2;
              r2 = r2.nextSibling, E2(e).before(o2);
            }
            r2 && "BR" === r2.tagName && E2(r2).remove();
          } else E2(e).after(E2(n2).html()).after(X.MARKERS), E2(n2).remove();
        }
        function a2() {
          for (var e = b2.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t]);
        }
        function v2(e, t, n2) {
          var r2, o2 = b2.node.deepestParent(e, [], !n2);
          if (o2 && "BLOCKQUOTE" === o2.tagName) return C2(e, o2) ? (r2 = b2.html.defaultTag(), t ? E2(e).replaceWith("<br>" + X.MARKERS) : r2 ? E2(o2).after("<".concat(r2, ">").concat(X.MARKERS, "<br></").concat(r2, ">")) : E2(o2).after("".concat(X.MARKERS, "<br>")), E2(e).remove()) : T2(e, t, n2), false;
          if (null === o2) (r2 = b2.html.defaultTag()) && b2.node.isElement(e.parentNode) ? E2(e).replaceWith("<".concat(r2, ">").concat(X.MARKERS, "<br></").concat(r2, ">")) : !e.previousSibling || E2(e.previousSibling).is("br") || e.nextSibling ? E2(e).replaceWith("<br>".concat(X.MARKERS)) : E2(e).replaceWith("<br>".concat(X.MARKERS, "<br>"));
          else {
            var i3 = e, a3 = "";
            "PRE" != o2.tagName || e.nextSibling || (t = true), b2.node.isBlock(o2) && !t || (a3 = "<br/>");
            var s2, l2 = "", c2 = "", d2 = "", f2 = "";
            (r2 = b2.html.defaultTag()) && b2.node.isBlock(o2) && (d2 = "<".concat(r2, ">"), f2 = "</".concat(r2, ">"), o2.tagName === r2.toUpperCase() && (d2 = b2.node.openTagString(E2(o2).clone().removeAttr("id").removeAttr("data-pasted").get(0))));
            do {
              if (i3 = i3.parentNode, !t || i3 !== o2 || t && !b2.node.isBlock(o2)) if (l2 += b2.node.closeTagString(i3), i3 === o2 && b2.node.isBlock(o2)) c2 = d2 + c2;
              else {
                var p2 = ("A" === i3.tagName || b2.node.hasClass(i3, "fa")) && C2(e, i3) ? "fr-to-remove" : "";
                c2 = i3.getAttribute("data-pasted") ? b2.node.openTagString(E2(i3).clone().attr("style", "").addClass(p2).get(0)) + c2 : b2.node.openTagString(E2(i3).clone().addClass(p2).get(0)) + c2;
              }
            } while (i3 !== o2);
            a3 = l2 + a3 + c2 + (e.parentNode === o2 && b2.node.isBlock(o2) ? "" : X.INVISIBLE_SPACE) + X.MARKERS, b2.node.isBlock(o2) && !E2(o2).find("*").last().is("br") && E2(o2).append("<br/>"), E2(e).after('<span id="fr-break"></span>'), E2(e).remove(), o2.nextSibling && !b2.node.isBlock(o2.nextSibling) || b2.node.isBlock(o2) || E2(o2).after("<br>"), s2 = (s2 = !t && b2.node.isBlock(o2) ? b2.node.openTagString(o2) + E2(o2).html() + f2 : b2.node.openTagString(o2) + E2(o2).html() + b2.node.closeTagString(o2)).replace(/<span id="fr-break"><\/span>/g, a3), E2(o2).replaceWith(s2);
          }
        }
        function T2(e, t, n2) {
          var r2 = b2.node.deepestParent(e, [], !n2);
          if (null === r2) b2.html.defaultTag() && e.parentNode === b2.el ? E2(e).replaceWith("<".concat(b2.html.defaultTag(), ">").concat(X.MARKERS, "<br></").concat(b2.html.defaultTag(), ">")) : (e.nextSibling && !b2.node.isBlock(e.nextSibling) || E2(e).after("<br>"), E2(e).replaceWith("<br>".concat(X.MARKERS)));
          else if (e.previousSibling && "IMG" == e.previousSibling.tagName || e.nextSibling && "IMG" == e.nextSibling.tagName) E2(e).replaceWith("<" + b2.html.defaultTag() + ">" + X.MARKERS + "<br></" + b2.html.defaultTag() + ">");
          else {
            var o2 = e, i3 = "";
            "PRE" === r2.tagName && (t = true), b2.node.isBlock(r2) && !t || (i3 = "<br>");
            var a3 = "", s2 = "";
            do {
              var l2 = o2;
              if (o2 = o2.parentNode, "BLOCKQUOTE" === r2.tagName && b2.node.isEmpty(l2) && !b2.node.hasClass(l2, "fr-marker") && E2(l2).contains(e) && E2(l2).after(e), "BLOCKQUOTE" !== r2.tagName || !C2(e, o2) && !g2(e, o2)) if (!t || o2 !== r2 || t && !b2.node.isBlock(r2)) {
                a3 += b2.node.closeTagString(o2);
                var c2 = "A" == o2.tagName && C2(e, o2) || b2.node.hasClass(o2, "fa") ? "fr-to-remove" : "";
                s2 = b2.node.openTagString(E2(o2).clone().addClass(c2).removeAttr("id").removeAttr("data-pasted").get(0)) + s2, b2.opts.enter !== X.ENTER_DIV && o2 === r2 && "DIV" === r2.tagName && (a3 = "<br>", s2 = "");
              } else "BLOCKQUOTE" == r2.tagName && t && (s2 = a3 = "");
            } while (o2 !== r2);
            var d2 = r2 === e.parentNode && b2.node.isBlock(r2) || e.nextSibling;
            if ("BLOCKQUOTE" === r2.tagName) if (e.previousSibling && b2.node.isBlock(e.previousSibling) && e.nextSibling && "BR" === e.nextSibling.tagName && (E2(e.nextSibling).after(e), e.nextSibling && "BR" === e.nextSibling.tagName && E2(e.nextSibling).remove()), t) i3 = a3 + i3 + X.MARKERS + s2;
            else {
              var f2 = b2.html.defaultTag();
              i3 = "".concat(a3 + i3 + (f2 ? "<".concat(f2, ">") : "") + X.MARKERS, "<br>").concat(f2 ? "</".concat(f2, ">") : "").concat(s2);
            }
            else i3 = a3 + i3 + s2 + (d2 ? "" : X.INVISIBLE_SPACE) + X.MARKERS;
            E2(e).replaceWith('<span id="fr-break"></span>');
            var p2 = b2.node.openTagString(r2) + E2(r2).html() + b2.node.closeTagString(r2);
            p2 = p2.replace(/<span id="fr-break"><\/span>/g, i3), E2(r2).replaceWith(p2);
          }
        }
        function S2(e) {
          var t = e.getBoundingClientRect(), n2 = window.pageXOffset || document.documentElement.scrollLeft, r2 = window.pageYOffset || document.documentElement.scrollTop;
          return b2.opts.iframe ? { top: t.top + b2.$wp.offset().top, left: t.left + n2 } : { top: t.top + r2, left: t.left + n2 };
        }
        function A2() {
          var e = b2.selection.get(), t = null;
          if (b2.selection.inEditor() && e.rangeCount) for (var n2 = b2.selection.ranges(), r2 = 0; r2 < n2.length; r2++) {
            var o2 = n2[r2];
            t = b2.selection.rangeElement(o2.startContainer, o2.startOffset);
            break;
          }
          return t;
        }
        return { enter: function M2(e) {
          var t = b2.markers.insert();
          if (!t) return true;
          for (var n2 = t.parentNode; n2 && !b2.node.isElement(n2); ) {
            if ("false" === n2.getAttribute("contenteditable")) return E2(t).replaceWith(X.MARKERS), b2.selection.restore(), false;
            if ("true" === n2.getAttribute("contenteditable")) break;
            n2 = n2.parentNode;
          }
          b2.el.normalize();
          var r2 = false;
          0 < E2(t).parentsUntil(b2.$el, "BLOCKQUOTE").length && (r2 = true), E2(t).parentsUntil(b2.$el, "TD, TH").length && (r2 = false), u2(t) ? !m2(t) || e || r2 ? v2(t, e, r2) : b2.cursorLists._endEnter(t) : h2(t) ? !m2(t) || e || r2 ? (function f2(e2, t2, n3) {
            var r3, o3 = b2.node.deepestParent(e2, [], !n3);
            if (o3 && "TABLE" === o3.tagName) return E2(o3).find("td, th").first().prepend(e2), f2(e2, t2, n3);
            if (o3 && "BLOCKQUOTE" === o3.tagName) if (g2(e2, o3)) {
              if (!t2) return (r3 = b2.html.defaultTag()) ? E2(o3).before("<".concat(r3, ">").concat(X.MARKERS, "<br></").concat(r3, ">")) : E2(o3).before("".concat(X.MARKERS, "<br>")), E2(e2).remove(), false;
            } else C2(e2, o3) ? v2(e2, t2, true) : T2(e2, t2, true);
            if (null === o3) (r3 = b2.html.defaultTag()) && b2.node.isElement(e2.parentNode) ? E2(e2).replaceWith("<".concat(r3, ">").concat(X.MARKERS, "<br></").concat(r3, ">")) : E2(e2).replaceWith("<br>".concat(X.MARKERS));
            else {
              if (r3 = b2.html.defaultTag(), b2.node.isBlock(o3)) if ("PRE" === o3.tagName && (t2 = true), t2) E2(e2).remove(), E2(o3).prepend("<br>".concat(X.MARKERS));
              else if (e2.nextSibling && "IMG" == e2.nextSibling.tagName || e2.nextSibling && e2.nextSibling.nextElementSibling && "IMG" == e2.nextSibling.nextElementSibling) E2(e2).replaceWith("<" + b2.html.defaultTag() + ">" + X.MARKERS + "<br></" + b2.html.defaultTag() + ">");
              else {
                if (b2.node.isEmpty(o3, true)) return v2(e2, t2, n3);
                if (b2.opts.keepFormatOnDelete || "DIV" === o3.tagName || "div" === b2.html.defaultTag()) if (!b2.opts.keepFormatOnDelete && "DIV" === o3.tagName || "div" === b2.html.defaultTag()) E2(o3).before("<" + b2.html.defaultTag() + "><br></" + b2.html.defaultTag() + ">");
                else if (b2.opts.keepFormatOnDelete && !b2.opts.htmlUntouched && "DIV" !== o3.tagName && "div" !== b2.html.defaultTag() && h2(b2.selection.get().focusNode)) E2(o3).before("".concat(b2.node.openTagString(E2(o3).clone().removeAttr("id").removeAttr("data-pasted").get(0)), "<br>").concat(b2.node.closeTagString(o3)));
                else {
                  for (var i4 = e2, a4 = X.INVISIBLE_SPACE; i4 !== o3 && !b2.node.isElement(i4); ) i4 = i4.parentNode, a4 = b2.node.openTagString(i4) + a4 + b2.node.closeTagString(i4);
                  E2(o3).before(a4);
                }
                else E2(o3).before("".concat(b2.node.openTagString(E2(o3).clone().removeAttr("id").removeAttr("data-pasted").get(0)), "<br>").concat(b2.node.closeTagString(o3)));
              }
              else E2(o3).before("<br>");
              E2(e2).remove();
            }
          })(t, e, r2) : b2.cursorLists._startEnter(t) : !m2(t) || e || r2 ? T2(t, e, r2) : b2.cursorLists._middleEnter(t), (function p2() {
            b2.$el.find(".fr-to-remove").each(function() {
              for (var e2 = b2.node.contents(this), t2 = 0; t2 < e2.length; t2++) e2[t2].nodeType === Node.TEXT_NODE && (e2[t2].textContent = e2[t2].textContent.replace(/\u200B/g, ""));
              E2(this).replaceWith(this.innerHTML);
            });
          })(), b2.html.fillEmptyBlocks(true), b2.opts.htmlUntouched || (b2.html.cleanEmptyTags(), b2.clean.lists(), b2.spaces.normalizeAroundCursor()), b2.selection.restore();
          var o2 = b2.o_win.innerHeight;
          if (b2.$oel[0].offsetHeight > o2) {
            var i3 = A2();
            if (i3) {
              var a3 = S2(i3);
              a3 = a3.top;
              var s2 = i3.getBoundingClientRect().top;
              b2.opts.iframe && (s2 = s2 + b2.$wp.offset().top - b2.helpers.scrollTop()), b2.opts.scrollableContainer && b2.opts.enter !== X.ENTER_BR && "BR" === i3.tagName && s2 + 20 === o2 && (s2 = a3 = i3.parentNode.offsetTop), i3.parentNode && "TD" === i3.parentNode.tagName && o2 < s2 ? b2.o_win.scroll(0, s2 - 50) : "BR" === i3.tagName && s2 < 0 ? b2.o_win.scroll(0, a3 - 80) : b2.opts.scrollableContainer && o2 < s2 + 20 ? b2.o_win.scroll(0, a3 - o2 + 50) : b2.opts.scrollableContainer && s2 + 2 * b2.$tb.height() > b2.$sc[0].scrollTop + E2(b2.$sc).height() && b2.$sc[0].scroll(0, a3 - E2(b2.$sc).height() + 2 * b2.$tb.height());
            }
          } else if (b2.opts.scrollableContainer && b2.opts.toolbarSticky) {
            var l2 = A2();
            if (l2) {
              var c2 = S2(l2);
              c2 = c2.top;
              var d2 = l2.getBoundingClientRect().top;
              b2.opts.enter !== X.ENTER_BR && "BR" === l2.tagName && (d2 = c2 = l2.parentNode.offsetTop), (b2.opts.iframe && d2 + 2 * b2.$tb.height() > b2.$sc[0].scrollTop + E2(b2.$sc).height() || d2 + 2 * b2.$tb.height() > E2(b2.$sc).height()) && b2.$sc[0].scroll(0, c2 - E2(b2.$sc).height() + 2 * b2.$tb.height());
            }
          }
        }, backspace: function s2() {
          var e = false, t = b2.markers.insert();
          if (!t) return true;
          for (var n2 = t.parentNode; n2 && !b2.node.isElement(n2); ) {
            if ("false" === n2.getAttribute("contenteditable")) return E2(t).replaceWith(X.MARKERS), b2.selection.restore(), false;
            if (n2.innerText.length && "true" === n2.getAttribute("contenteditable")) break;
            n2 = n2.parentNode;
          }
          b2.el.normalize();
          var r2 = t.previousSibling;
          if (r2) {
            var o2 = r2.textContent;
            o2 && o2.length && 8203 === o2.charCodeAt(o2.length - 1) && (1 === o2.length ? E2(r2).remove() : r2.textContent = r2.textContent.substr(0, o2.length - y2(o2)));
          }
          return u2(t) ? m2(t) && g2(t, E2(t).parents("li").first().get(0)) ? b2.cursorLists._backspace(t) : e = N2(t) : h2(t) ? m2(t) && g2(t, E2(t).parents("li").first().get(0)) ? b2.cursorLists._backspace(t) : (function c2(e2) {
            for (var t2 = 0 < E2(e2).parentsUntil(b2.$el, "BLOCKQUOTE").length, n3 = b2.node.deepestParent(e2, [], !t2), r3 = n3; n3 && !n3.previousSibling && "BLOCKQUOTE" !== n3.tagName && n3.parentElement !== b2.el && !b2.node.hasClass(n3.parentElement, "fr-inner") && X.SIMPLE_ENTER_TAGS.indexOf(n3.parentElement.tagName) < 0; ) n3 = n3.parentElement;
            if (n3 && "BLOCKQUOTE" === n3.tagName) {
              var o3 = b2.node.deepestParent(e2, [E2(e2).parentsUntil(b2.$el, "BLOCKQUOTE").get(0)]);
              o3 && o3.previousSibling && (r3 = n3 = o3);
            }
            if (null !== n3) {
              var i3, a3 = n3.previousSibling;
              if (b2.node.isBlock(n3) && b2.node.isEditable(n3)) if (a3 && X.NO_DELETE_TAGS.indexOf(a3.tagName) < 0) {
                if (b2.node.isDeletable(a3)) E2(a3).remove(), E2(e2).replaceWith(X.MARKERS);
                else if (b2.node.isEditable(a3)) if (b2.node.isBlock(a3)) if (b2.node.isEmpty(a3) && !b2.node.isList(a3)) E2(a3).remove(), E2(e2).after(b2.opts.keepFormatOnDelete ? X.INVISIBLE_SPACE : "");
                else {
                  if (b2.node.isList(a3) && (a3 = E2(a3).find("li").last().get(0)), (i3 = b2.node.contents(a3)).length && "BR" === i3[i3.length - 1].tagName && E2(i3[i3.length - 1]).remove(), "BLOCKQUOTE" === a3.tagName && "BLOCKQUOTE" !== n3.tagName) for (i3 = b2.node.contents(a3); i3.length && b2.node.isBlock(i3[i3.length - 1]); ) a3 = i3[i3.length - 1], i3 = b2.node.contents(a3);
                  else if ("BLOCKQUOTE" !== a3.tagName && "BLOCKQUOTE" === r3.tagName) for (i3 = b2.node.contents(r3); i3.length && b2.node.isBlock(i3[0]); ) r3 = i3[0], i3 = b2.node.contents(r3);
                  if (b2.node.isEmpty(n3)) E2(e2).remove(), b2.selection.setAtEnd(a3, true);
                  else {
                    E2(e2).replaceWith(X.MARKERS);
                    var s3 = a3.childNodes;
                    b2.node.isBlock(s3[s3.length - 1]) ? E2(s3[s3.length - 1]).append(r3.innerHTML) : E2(a3).append(r3.innerHTML);
                  }
                  E2(r3).remove(), b2.node.isEmpty(n3) && E2(n3).remove();
                }
                else E2(e2).replaceWith(X.MARKERS), "BLOCKQUOTE" === n3.tagName && a3.nodeType === Node.ELEMENT_NODE ? E2(a3).remove() : (E2(a3).after(b2.node.isEmpty(n3) ? "" : E2(n3).html()), E2(n3).remove(), "BR" === a3.tagName && E2(a3).remove());
              } else if (a3) 8203 === n3.textContent.charCodeAt() && n3.childNodes[1] && "BR" === n3.childNodes[1].tagName && n3.tagName.toLowerCase() === b2.html.defaultTag() && n3.previousSibling && "TABLE" === n3.previousSibling.tagName && E2(n3).remove();
              else if (n3 && "BLOCKQUOTE" === n3.tagName && 0 === E2(n3).text().replace(/\u200B/g, "").length) E2(n3).remove();
              else {
                var l2 = n3.nextSibling;
                b2.node.isEmpty(n3) && n3.parentNode && b2.node.isEditable(n3.parentNode) && !l2 && (n3.parentNode != b2.el && "TD" !== n3.parentNode.tagName ? E2(n3.parentNode).remove() : n3.parentNode != b2.el && "TD" === n3.parentNode.tagName && E2(n3).remove());
              }
            }
          })(t) : e = N2(t), E2(t).remove(), a2(), b2.html.fillEmptyBlocks(true), b2.opts.htmlUntouched || (b2.html.cleanEmptyTags(), b2.clean.lists(), b2.spaces.normalizeAroundCursor()), b2.selection.restore(), e;
        }, del: function r2() {
          var e = b2.markers.insert();
          if (!e) return false;
          if (b2.el.normalize(), u2(e)) if (m2(e)) if (0 === E2(e).parents("li").first().find("ul, ol").length) b2.cursorLists._del(e);
          else {
            var t = E2(e).parents("li").first().find("ul, ol").first().find("li").first();
            (t = t.find(b2.html.blockTagsQuery()).get(-1) || t).prepend(e), b2.cursorLists._backspace(e);
          }
          else i2(e);
          else h2(e), n(e);
          E2(e).remove(), a2(), b2.html.fillEmptyBlocks(true), b2.opts.htmlUntouched || (b2.html.cleanEmptyTags(), b2.clean.lists()), b2.spaces.normalizeAroundCursor(), b2.selection.restore();
        }, isAtEnd: C2, isAtStart: g2 };
      }, X.MODULES.data = function(f2) {
        function p2(e2) {
          return e2;
        }
        function u2(e2) {
          if (!e2) return e2;
          for (var t = "", n2 = p2("charCodeAt"), r3 = p2("fromCharCode"), o3 = N2.indexOf(e2[0]), i2 = 1; i2 < e2.length - 2; i2++) {
            for (var a2 = c2(++o3), s2 = e2[n2](i2), l2 = ""; /[0-9-]/.test(e2[i2 + 1]); ) l2 += e2[++i2];
            s2 = d2(s2, a2, l2 = parseInt(l2, 10) || 0), s2 ^= o3 - 1 & 31, t += String[r3](s2);
          }
          return t;
        }
        function c2(e2) {
          for (var t = e2.toString(), n2 = 0, r3 = 0; r3 < t.length; r3++) n2 += parseInt(t.charAt(r3), 10);
          return 10 < n2 ? n2 % 9 + 1 : n2;
        }
        function d2(e2, t, n2) {
          for (var r3 = Math.abs(n2); 0 < r3--; ) e2 -= t;
          return n2 < 0 && (e2 += 123), e2;
        }
        function h2(e2) {
          return e2 && "block" !== e2.css("display") ? (e2.remove(), true) : e2 && 0 === f2.helpers.getPX(e2.css("height")) ? (e2.remove(), true) : !(!e2 || "absolute" !== e2.css("position") && "fixed" !== e2.css("position") || (e2.remove(), 0));
        }
        function g2(e2) {
          return e2 && 0 === f2.$box.find(e2).length;
        }
        function C2() {
          if (10 < e && (f2[p2($("0ppecjvc=="))](), setTimeout(function() {
            y2.FE = null;
          }, 10)), !f2.$box) return false;
          f2.$wp.prepend(x2 ? M2 : $(p2($(M2)))), E2 = f2.$wp.find("> div").first(), L2 = E2.find("> a"), "rtl" === f2.opts.direction && E2.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++;
        }
        function m2(e2) {
          for (var t = [$("9qqG-7amjlwq=="), $("KA3B3C2A6D1D5H5H1A3=="), $("3B9B3B5F3C4G3E3=="), $("QzbzvxyB2yA-9m=="), $("ji1kacwmgG5bc=="), $("nmA-13aogi1A3c1jd=="), $("BA9ggq=="), $("emznbjbH3fij=="), $("tkC-22d1qC-13sD1wzF-7=="), $("tA3jjf=="), $("1D1brkm==")], n2 = 0; n2 < t.length; n2++) if (String.prototype.endsWith || (String.prototype.endsWith = function(e3, t2) {
            return (void 0 === t2 || t2 > this.length) && (t2 = this.length), this.substring(t2 - e3.length, t2) === e3;
          }), e2.endsWith(t[n2])) return true;
          return false;
        }
        function v2(e2) {
          if (null === e2) return false;
          if (0 == e2.indexOf("TRIAL") && (e2 = new Date(e2.replace(/TRIAL/, "")), new Date(e2) > /* @__PURE__ */ new Date())) {
            var t = e2 - /* @__PURE__ */ new Date(), n2 = Math.ceil(t / 864e5);
            return M2 = $(p2($(r2))) + n2 + $(p2($(o2))), true;
          }
          return false;
        }
        function b2() {
          var e2 = $(p2(n)), t = $(p2("tzgatD-13eD1dtdrvmF3c1nrC-7saQcdav==")).split(".");
          try {
            return window.parent.document.querySelector(e2) && window[t[1]][t[2]];
          } catch (e3) {
            return false;
          }
        }
        var E2, L2, y2 = f2.$, N2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", T2 = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2FC1A3NB2IF1HE1TH4WB8eB-11zVG2F3I3yYB5ZG4CB2DA15CC5AD3F1A1KG1oLA10B1A6wQF1H3vgale2C4F4XA2qc2A5D5B3pepmriKB3OE1HD1fUC10pjD-11E-11TB4YJ3bC-16zE-11yc1B2CE2BC3jhjKC1pdA-21OA6C1D5B-8vF4QA11pD6sqf1C3lldA-16BD4A2H3qoEA7bB-16rmNH5H1F1vSB7RE2A3TH4YC5A5b1A4d1B3whepyAC3AA2zknC3mbgf1SC4WH4PD8TC5ZB2C3H3jb2A5ZA2EF2aoFC5qqHC4B1H1zeGA7UA5RF4TA29TA6ZC4d1C3hyWA10A3rBB2E3decorationRD3QC10UD3E6E6ZD2F3F3fme2E5uxxrEC9C3E4fB-11azhHB1LD7D6VF4VVTPC6b1C4TYG3qzDD6B3B3AH4I2H2kxbHE1JD1yihfd1QD6WB1D4mhrc1B5rvFG3A14A7cDA2OC1AA1JB5zC-16KA6WB4C-8wvlTB5A5lkZB2C2C7zynBD2D2bI-7C-21d1HE2cubyvPC8A6VB3aroxxZE4C4F4e1I2BE1WjdifH1H4A14NA1GB1YG-10tWA3A14A9sVA2C5XH2A29b2A6gsleGG2jaED2D-13fhE1OA8NjwytyTD4e1sc1D-16ZC3B5C-9e1C2FB6EFF5B2C2JH4E1C2tdLE5A3UG4G-7b2D3B4fA-9oh1G3kqvB4AG3ibnjcAC6D2B1cDA9KC2QA6bRC4VA30RB8hYB2A4A-8h1A21A2B2==", S2 = "7D4YH4fkhHB3pqDC3H2E1fkMD1IB1NF1D3QD9wB5rxqlh1A8c2B4ZA3FD2AA6FB5EB3jJG4D2J-7aC-21GB6PC5RE4TC11QD6XC4XE3XH3mlvnqjbaOA2OC2BE6A1fmI-7ujwbc1G5f1F3e1C11mXF4owBG3E1yD1E4F1D2D-8B-8C-7yC-22HD1MF5UE4cWA3D8D6a1B2C3H3a3I3sZA4B3A2akfwEB3xHD5D1F1wIC11pA-16xdxtVI2C9A6YC4a1A2F3B2GA6B4C3lsjyJB1eMA1D-11MF5PE4ja1D3D7byrf1C3e1C7D-16lwqAF3H2A1B-21wNE1MA1OG1HB2A-16tSE5UD4RB3icRA4F-10wtwzBB3E1C3CC2DA8LA2LA1EB1kdH-8uVB7decorg1J2B7B6qjrqGI2J1C6ijehIB1hkemC-13hqkrH4H-7QD6XF5XF3HLNAC3CB2aD2CD2KB10B4ycg1A-8KA4H4B11jVB5TC4yqpB-21pd1E4pedzGB6MD5B3ncB-7MA4LD2JB6PD5uH-8TB9C7YD5XD2E3I3jmiDB3zeimhLD8E2F2JC1H-9ivkPC5lG-10SB1D3H3A-21rc1A3d1E3fsdqwfGA2KA1OrC-22LA6D1B4afUB16SC7AitC-8qYA11fsxcajGA15avjNE2A-9h1hDB16B9tPC1C5F5UC1G3B8d2A5d1D4RnHJ3C3JB5D3ucMG1yzD-17hafjC-8VD3yWC6e1YD2H3ZE2C8C5oBA3H3D2vFA4WzJC4C2i1A-65fNB8afWA1H4A26mvkC-13ZB3E3h1A21BC4eFB2GD2AA5ghqND2A2B2==", r2 = "ykUH5bTC3D9zPA4xqH-8B2vDC4D3C2AC2I1C1mLC2ebhiWF1A10C8RB5PC4h1C3i1A8b1D5c1G4DG2A1A19A6C5bmF1G5C2sEB2OB2RA4PE4WH4WC10d2C5a1F4uhvjivrmG1D2GH2B3xkbkB-9oLG1C9B-16WE5SG5VD4vYB5dE-11ijDD2CA5FA5F3D2kecbHD3MC1TC4H-8H-8cVC8sirC-8qzf1B9uegCF2B-7rOB12B6plf1xHE1J-7bRC1D5xcC-8SH4nb1A5vYD3WG2style1C2FA1HH1sdcajsxSI4QB7c1F6e1B3ywg1A8ZE6ED2jbEE2B-21tyxgOG1HB1KA7RD6UF4TA26C3YC6ivmYE2A19A7EC3klhlH2jylqNC7E1E1VE1A3A10PB7d1C5nonXC6D6A5ZB2GG3D2I2FC6C1IB5G3h1jH-7bC-16A-13sVE5d1E4SB10TTRYF3c1G3VGA3wKE4E1lH2lpB-16eIF2IF1hfaQC2E5C4bZA18A-32upjZA3vnA1B10A4C4kBB1OG1IA2EC1NB1D5dPE4QA10d1a1C3C4F4e1B2E3wA4E1E3srpvqjKC1eOC5A1B-7cPA7brczD-8D3PC7ZB4F5c1B2E2E2izomC-11G1C1KA9EC-22NA6C1D5dVA3A14C11UD2A4F4c1D3a3A12VB5uolBG2oknoB2dLH2ebjrwhB-13WB4f1C1H4A-21xxXA4jucCA6C2cvEA2yB-7LB3A4D4==", o2 = "9D4d1B2zHC4F3A-9wCD2IB2ZaJG2jhwRB1B8E7wtosg1G3B-21C-16d1E3B3B2CA18A15B8vGD3F-11AG4D2xOB1HB1D5PF1A3B3TC3A6C4spqxla1A4D3CB3B2qodnKE6D2C1aLE1XB2B6jVD2A4F4uI-7kykd1A3jIE2xAA6A2C2CE4H2F1IB11D2B1B-11xhTF4lxyA-13c1C3vjkf1B7hzeA2jfglAA2JE6B1A-9H-9yMA10SC1E7C5rRI4lnmufXA2F3E2hGB4Hdkg1xKF1HB1LF2iVC4WI4c2A8yrc1B2C3G3XA8C8E7==", n = "MekC-11nB-8tIzpD7pewxvzC6mD-16xerg1==", A2 = "iH3E2J2B6C6B3B2B5F2C2XG1B3A3B6B5F5C5B4D1J4B10A5C==", M2 = "GAFB1jkJA8E2E1MA4G4jkc1wB-13RG4d1C3sa1A6c1A3D3E3FI3I2A5tuoD2IG1KC1DC2SC7F6QE4I4WA11ppF-11mwUA2f1A4CE4F1E2DB2CE1snHE6A1juvTB1B8E6PB1F4F3h1C2zmdiG-10qnDA19A6C5CD3MC1KH1OB17B3FD7yatqRB10TD6wic1A2E3gfEA3CB2AH3nEC10A4ID6A1A-9LF4J4A11d1WD5comQI3txthtxxfG2gbovmA-8JH1gjOA6C2uH-9G4qF-7B-21RD6c1F4e1C3tJ3wB5lB-11pBE2A1B7mrqsC-11A-9jMG1UA9VC7VC4cUI2C7c1D7d1F4ZE3zrAA4jdeME4G1iOC2IF2c1CAVH4xRE2D6zvg1A2ea2C4B4B3FG3B2F2judE-13dg1cHE1hitE-13QC4H-9zzQA4D7C5muD3WA15B5c1D1B4B2E2tFA5HA2hA1iE1FC4PA3C8RB7UD6c1A4B-7smnvA-13BA3A2D2EC4lbmamMG1edB1RB1C5E5qVE3rA6b1C2F4E3rmWB5FE4AC1oeBH1KC7D2C1G-10D-8H-8ZJ4vqC-13yG-10UG2A33XA8fvB-11b1E3B2A13B1B5AD5B2G2chsxHD2LC6pevWB1A6PD3A5B4ue1I3VC7BE1A3D3G3vghaHC1HD1c1h1aQB2C8C7UD5uoh1H3vqA4b1D4zEG3G2B6AA5C2D2rB-7zshLA6C1D5SH1A31B16QD8zavwmsrb2C7lcCG2vjkFA2E2FroalaXB8FenqG4mG-7b2D7b1F4PkZC2hlBB5F3C2CA1i1J-7ID3bomwzvcVA8UB5QD2F4zwsB-16kGG3EI3A12I2pfE-13KC4A1F1A-65MC2RA1A5E5VH4A-64VA4A8hmxd1A3qjfjA3lqkEA16KB2YouHD1I-8a1XA1C8TA5viB-8yiwpa1C4zEH3jhsgjIA1C1dakmfVB1F5C4xPC3B-21me2E4ZA2G3A25uwycdubEA23B4A3sNE6C1E1LA31dgWC6C-11g1me1A33a2kpxwxED2AB10B4D4joplsa1IB3DA1QC5aRA33SA10VB5kYD2D4se1A7A1A1==", x2 = false, O2 = false, w2 = true, k = (function() {
          for (var e2 = 0, t = document.domain, n2 = t.split("."), r3 = "_gd".concat((/* @__PURE__ */ new Date()).getTime()); e2 < n2.length - 1 && -1 === document.cookie.indexOf("".concat(r3, "=").concat(r3)); ) t = n2.slice(-1 - ++e2).join("."), document.cookie = "".concat(r3, "=").concat(r3, ";domain=").concat(t, ";");
          return document.cookie = "".concat(r3, "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=").concat(t, ";"), (t || "").replace(/(^\.*)|(\.*$)/g, "");
        })(), $ = p2(u2), e = 0;
        return { _init: function D() {
          var e2 = f2.opts.key || [""], t = $(p2("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
          "string" == typeof e2 && (e2 = [e2]);
          for (var n2, r3, o3, s2 = !(f2.ul = true), i2 = 0, a2 = 0; a2 < e2.length; a2++) {
            var l2 = (r3 = e2[a2], 4 === (o3 = ($(r3) || "").split("|")).length && "V3" === o3[0] ? [o3[1], o3[3], o3[2]] : [null, null, ""]), c3 = l2[2];
            if (c3 === $(p2($("LGnD1KNZf1CPBYCAZB-8F3UDSLLSG1VFf1A3C2=="))) || 0 <= c3.indexOf(k, c3.length - k.length) || m2(k) || b2()) if (w2 = false, (null === (n2 = l2[1]) || (0 == n2.indexOf("TRIAL") ? (O2 = true, n2 = new Date(n2.replace(/TRIAL/, "")), new Date(n2) < /* @__PURE__ */ new Date() && (T2 = S2, 1)) : new Date(n2) < new Date($(A2)))) && 0 < (k || "").length && !m2(k) && !b2()) s2 = true, M2 = T2, i2 = l2[0] || -1;
            else {
              if (!(v2(l2[1]) && 0 < (k || "").length) || m2(k) || b2()) {
                f2.ul = false;
                break;
              }
              O2 = x2 = true, i2 = l2[0] || -1;
            }
          }
          var d3 = new Image();
          true === f2.ul && (C2(), d3.src = s2 ? "".concat(p2($(t)), "e=").concat(i2) : "".concat(p2($(t)), "u")), true === f2.ul && (f2.events.on("contentChanged", function() {
            (function e3() {
              return h2(E2) || h2(L2) || g2(E2) || g2(L2);
            })() && C2();
          }), f2.events.on("html.get", function(e3) {
            return e3 + $("qD2H-9G3ioD-17qA1tE1B-8qI3A4hA-13C-11E2C1njfldD1E6pg1C-8sC3hfbkcD2G3stC-22gqgB3G2B-7vtoA4nweeD1A31A15B9uC-16A1F5dkykdc1B8dE-11bA3F2D3A9gd1E7F2tlI-8H-7vtxB2A5B2C3B2F2B5A6ldbyC4iqC-22D-17E-13mA3D2dywiB3oxlvfC1H4C2TjqbzlnI3ntB4E3qA2zaqsC6D3pmnkoE3C6D5wvuE3bwifdhB6hch1E4xibD-17dmrC1rG-7pntnF6nB-8F1D2A11C8plrkmF2F3MC-16bocqA2WwA-21ayeA1C4d1isC-22rD-13D6DfjpjtC2E6hB2G2G4A-7D2==");
          })), f2.events.on("html.set", function() {
            var e3 = f2.el.querySelector('[data-f-id="pbf"]');
            e3 && y2(e3).remove();
          }), f2.events.on("destroy", function() {
            E2 && E2.length && E2.remove();
          }, true), X.POPUP_TEMPLATES["license.popup"] = "[_LICENSE_LAYER_]", f2.events.on("commands.before", function(e3) {
            var t2 = X.COMMANDS[e3], n3 = u2("zD3pI-8j1C4D-17uB-11hoH5E1yrD6njgg1htmC8B6omyoB4A-7I-7gd1qpxcA-7kA1B-21jxpkE3rgwA4B9ruD-11lH4G2XegA-16D4wwri1j1drD3piB1rrjB1awcjhddkmA6ceD4yfjD2tjcD-11gssA1mhrC-13qE1iesqjkkF5C4d1fE3I-7baalF-10A2sC-7xA4prymoiynA1C-16neE5fI-8ujhzlC5dyD-8I3J-7btD-16zaxF2xI-7C-21D-16iusylG3I4roadubH4jeexlmB-11E3C-8gaC5fwB-11A-9jB1oyC-22sD1auB4G1eC3numoE2A3algcdD-13F5G1uysdXD-16htA-9qC-7A16cnoA1wpdmmjB-21B4b1hF-11zubfB4B7A7pxjD1C3I3PtC-13znrgA3J2A4BbC-11hcgC-7I3obe1B4pG-10plI3b1qA1F5G4ZoqI-7ld1E6C3B2QcfeC10C5E2MD4F1NYH2A11C8uxA2E4C3ptoyoB-11ltdfB14B4A3oiB3C1C1A-62baalA-13xG-10tC2E3A9gjB-13wripE1B7D5ggbpptbB-22C7C4E2C1d1bjqbwE3D5A4fewosD-16yD2A3G3ddvbmiuE5B1B1kicxzB4E5A4B-7zwpxdqwB-8G1A19A10qothmmwA22A15C4IE5F2JXeoaB-22bB3E4B4C2UxvmD-17xhC1Xmoj1nbB6VgkmzB3C4C8lB3VD-8dD2puD-17E3vtjuD1jtmvtD5vkaC3vfolF4jxA20B8nD5yf1vrC3A13B-31lmjhB4B2C2yrncoeG4eheB14A-21rE-13dyvwA5wwB-16ayeE2A-8bzqmrzsC3H5G4pdte1mA-9G2A3SobnD-13zE3E3RgyvtxD5B2B-8G4A3koA8pfrlcpB13hfgD4yfjA17wwre1f1drkA10B14C5xthD5=="), r4 = u2("mB2caF-11F4hi1lA-21A-16A4B3taA1yJ-7tB-16wiE-11E1E1zI-7td1C4nkpubmgC-16nE-11C5kyuJ-7fB1gpbB3C1mhnyD1D6KhhqA30bc1gsD-11F-10oF3eA-31C7aE-13eG3rbtC-21B-22yA-13vB-9D1tpB1tigA5qkjnkldxiiF3yucazB-11B-11F2G2LvC3nrqqG-10kE4cohC6f1biB-8C-7yiC-16B4nB-9uD2vlezxjG-10B1tioA1ordojqhB14hnooyeciG-7B2C6bE-13qterB1zuuhC-11A-9kD4nwqB6vgkmzH3C-21ilcA3qeD2C2uA3D-13eA-9C-9G4B1qC-22wstnH2PeictHoxdmaoB11sD-13F-11A3gi1tH-7A-21znD5NxojervD6B2C2h1hzB11A3A2D1dmjC-8bwB4B7A7RrlxswoC2E-13rpA1h1lj1C-22C2OaD4F2C1JJ-7anB-13pE2D5D4AsvuD3E1G4e1H2I3h1ID8D4E3ehG4G2B1c1dE-13iC-9kI-8dtvB3D6C5C-9yF1A22B12nrqqG-10khldB11C3E3wzlgbyc1C6A1C7wwri1j1drkA2E1E4D3MrzargD5D2E2vugD-16coiD4D1H1ttfrD-11yeB2E3G3B-22yshjB1D2C2njge1htagmB2A1A1aF-11dxA-7A-63gA2C4E6YC1B3ZHuC-21qkrF5A4C1A28EhfC-13khxH3HB-32C-21pD-13rF3FwH-8H-7jD4E6E3C-11C5FotC11d1ekB4fdzeC8zdD-11fdA2fF-7qA3fvC-9A-8C1zhC2B8D-13D6ipfbB1B10oB-13D-11zxH2A31A16ibD-13sC-9uD1uxuB3mbotifgA7ggmqiuA26lrjaD-11bjcA3B9B5d1tdpA-9mB3C1CD-16rE-11njH5F1BwifdhF2D4mG2C7D-17E-13C3g1vbI-8sc1D3xvwD1ivzA11ggbpptbB-33B9B3B6hdxC2=="), o4 = w2 || s2 && O2;
            if (t2 && (t2.plugin && !["fontAwesome", "embedly", "imageTUI", "spellChecker", "filestack", "wirisEditor", "wirisChemistry"].includes(t2.plugin) || !t2.plugin && !["Bold", "Italic", "Underline", "More Text"].includes(t2.title)) && o4) {
              var i3 = f2.popups.get("license.popup");
              if (!i3) {
                var a3 = { buttons: "", license_layer: s2 ? n3 : r4 };
                i3 = f2.popups.create("license.popup", a3);
              }
              return f2.popups.setContainer("license.popup", f2.$tb), f2.popups.show("license.popup"), false;
            }
          });
        } };
      }, X.MODULES.edit = function(t) {
        function e() {
          if (t.browser.mozilla) try {
            t.doc.execCommand("enableObjectResizing", false, "false"), t.doc.execCommand("enableInlineTableEditing", false, "false");
          } catch (e2) {
          }
          if (t.browser.msie) try {
            t.doc.body.addEventListener("mscontrolselect", function(e2) {
              return e2.srcElement.focus(), false;
            });
          } catch (e2) {
          }
        }
        var n = false;
        function r2() {
          return n;
        }
        return { _init: function o2() {
          t.events.on("focus", function() {
            r2() ? t.edit.off() : t.edit.on();
          });
        }, on: function i2() {
          t.$wp ? (t.$el.attr("contenteditable", true), t.$el.removeClass("fr-disabled").attr("aria-disabled", false), e()) : t.$el.is("a") && t.$el.attr("contenteditable", true), t.events.trigger("edit.on", [], true), n = false;
        }, off: function a2() {
          t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", false), t.$el.addClass("fr-disabled").attr("aria-disabled", true)) : t.$el.is("a") && t.$el.attr("contenteditable", false), t.events.trigger("edit.off"), t.events.enableBlur(), n = true;
        }, disableDesign: e, isDisabled: r2 };
      }, X.MODULES.format = function(k) {
        var $ = k.$, D = { strong: { prop: "font-weight", val: "bold" }, em: { prop: "font-style", val: "italic" } };
        function B(e, t2) {
          var n = e;
          for (var r2 in t2) Object.prototype.hasOwnProperty.call(t2, r2) && (n += "id" === r2 ? "#".concat(t2[r2]) : "class" === r2 ? ".".concat(t2[r2]) : "[".concat(r2, '="').concat(t2[r2], '"]'));
          return n;
        }
        function H(e, t2) {
          return !(!e || e.nodeType !== Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t2);
        }
        function N2(l3, c3, d3) {
          var f2, n, r2, p2 = (function L2(t3) {
            for (var e2 = 1; e2 < arguments.length; e2++) {
              var n2 = null != arguments[e2] ? arguments[e2] : {};
              e2 % 2 ? M(Object(n2), true).forEach(function(e3) {
                A(t3, e3, n2[e3]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(n2)) : M(Object(n2)).forEach(function(e3) {
                Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(n2, e3));
              });
            }
            return t3;
          })({}, d3 || {});
          if (l3) {
            S2(l3) && (l3 = l3.nextSibling);
            var e = "LI" === l3.tagName ? l3 : $(l3).parentsUntil(k.$el, "li").get(0), t2 = $(e).find(".fr-marker[data-type=false]").get(0);
            if ("LI" !== l3.parentNode.parentNode.tagName || !t2 || null != t2.previousSibling) {
              if (k.node.isBlock(l3) && l3.hasAttribute("contenteditable") && "false" === l3.getAttribute("contenteditable") && !k.opts.allowStylingOnNonEditable || l3.parentNode && l3.parentNode.hasAttribute("contenteditable") && "false" === l3.parentNode.getAttribute("contenteditable") && !k.opts.allowStylingOnNonEditable) {
                if (l3.nextSibling && $(l3.nextSibling).hasClass("fr-marker")) return;
                if (l3.nextSibling) return void N2(l3.nextSibling, c3, d3);
                if (l3.parentNode) return void N2(l3.parentNode, c3, d3);
              }
              for (; l3 && l3.nodeType === Node.COMMENT_NODE; ) l3 = l3.nextSibling;
              if (l3) {
                if (k.node.isBlock(l3) && "HR" !== l3.tagName && "LI" !== l3.tagName) return k.node.hasClass(l3.firstChild, "fr-marker") ? N2(l3.firstChild.nextSibling, c3, d3) : N2(l3.firstChild, c3, d3), false;
                if (p2.style) {
                  var o2 = p2.style.split(";").map(function(e2) {
                    return e2.trim();
                  }).filter(function(e2) {
                    var t3 = x(e2.split(":").map(function(e3) {
                      return e3 && e3.trim();
                    }), 2), n2 = t3[0], r3 = t3[1];
                    return n2 && r3;
                  }).join("; ");
                  o2 ? p2.style = o2 + ";" : delete p2.style;
                }
                var u2 = $(k.doc.createElement(c3));
                if (u2.attr(p2), !("span" === c3 && l3.parentNode && "span" === l3.parentNode.tagName.toLowerCase()) && l3.parentNode && l3.parentNode.hasAttribute("contenteditable") && "false" === l3.parentNode.getAttribute("contenteditable") && k.opts.allowStylingOnNonEditable) {
                  for (var i2 = l3.parentNode, a2 = $(k.doc.createElement(c3)).attr(d3); i2.firstChild; ) a2.append(i2.firstChild);
                  return $(i2).append(a2), void ($(i2.lastChild.lastChild).hasClass("fr-marker") || N2(i2.nextSibling, c3, d3));
                }
                if (u2.insertBefore(l3), (f2 = T2(l3)) && (0 <= ["strong", "em"].indexOf(c3) || "span" === c3 && d3.hasOwnProperty("style"))) {
                  if ("span" === c3) {
                    var s2 = d3.style.replace(/;$/, "").split(":");
                    n = s2[0].trim(), r2 = s2[1].trim();
                  } else n = D[c3].prop, r2 = D[c3].val;
                  if ("background-color" !== n) {
                    var h2 = $(f2);
                    h2.css(n, r2), h2.find("a").each(function() {
                      var e2 = $(this), t3 = this.style;
                      "" === r2 ? t3.getPropertyValue(n) && (t3.removeProperty(n), t3.length || this.removeAttribute("style")) : e2.css(n, r2);
                    }), (function y2(e2, t3) {
                      var n2, r3 = e2.childNodes;
                      for (n2 = 0; n2 < r3.length; n2++) 0 <= ["UL", "OL", "LI"].indexOf(r3[n2].tagName) && "" === r3[n2].style[t3] && $(r3[n2]).css(t3, "initial");
                    })(f2, n);
                  }
                }
                for (var g3, C3 = l3, m2 = false, v2 = function v3() {
                  var t3 = C3;
                  if ("SPAN" === C3.tagName && $(C3).hasClass("fr-tracking-deleted")) return C3 = C3.nextSibling, 0;
                  if (k.node.isBlock(C3) && "HR" !== l3.tagName) return N2(C3.firstChild, c3, d3), { v: false };
                  if ("SPAN" === C3.tagName && k.node.isEditable(C3)) return u2.is(":empty") && u2.remove(), N2(C3.firstChild, c3, d3), { v: false };
                  if (C3.tagName && C3.hasAttribute("contenteditable") && "false" === C3.getAttribute("contenteditable") && !k.opts.allowStylingOnNonEditable && !C3.classList.contains("fr-anchor")) {
                    var e2 = u2.get(0).parentNode, n2 = C3.nextSibling;
                    return "P" === C3.parentNode.tagName && null == C3.nextSibling ? n2 = C3.parentNode.nextSibling : !n2 && e2 && e2.nextSibling && "DIV" === e2.nextSibling.tagName && (n2 = e2.nextSibling), N2(n2, c3, d3), { v: void 0 };
                  }
                  if (!k.node.isEditable(C3.parentNode) && !k.opts.allowStylingOnNonEditable) return k.selection.restore(), k.toolbar.disable(), { v: void 0 };
                  if (C3 = C3.nextSibling, "span" != c3 || f2) D[c3] && f2 || u2.append(t3);
                  else {
                    var r3 = t3;
                    ["u", "s"].forEach(function(e3) {
                      0 < $(t3).parents(e3).length && (r3 = $(r3).wrap("<".concat(e3, "></").concat(e3, ">")).get(0).parentNode, m2 = true);
                    });
                    var o3 = (function a3(t4) {
                      return [].filter.call(t4.parentNode.childNodes, function(e3) {
                        return e3.nodeType === Node.TEXT_NODE && e3 !== t4;
                      });
                    })(r3);
                    0 < o3.length && 0 < $(r3).parents("u, s").length && (o3.forEach(function(e3) {
                      var t4 = null, n3 = null;
                      0 < $(r3).parents("u").length && (n3 = t4 = document.createElement("u")), 0 < $(r3).parents("s").length && (n3 = n3 ? (t4.appendChild(document.createElement("s")), t4.firstChild) : t4 = document.createElement("s")), n3.appendChild(e3.cloneNode()), e3.replaceWith(t4);
                    }), k.selection.restore(), k.selection.save());
                    var i3 = "A" === r3.tagName ? r3 : r3.parentNode && "A" === r3.parentNode.tagName ? r3.parentNode : null;
                    i3 && (!p2.style && i3.hasAttribute("style") ? i3.removeAttribute("style") : p2.style && $(i3).attr("style", p2.style)), u2.append(r3);
                  }
                  k.browser.mozilla && 0 < u2.length && (function s3(e3) {
                    if ($(e3).parentsUntil(k.$el, "TABLE").length) {
                      for (var t4 = null, n3 = e3.nextSibling; n3; ) "BR" === n3.nodeName && (t4 = n3), n3 = n3.nextSibling;
                      t4 && !t4.nextSibling && "TD" != t4.parentNode.nodeName && t4.parentNode.textContent && t4.remove();
                    }
                  })(u2[0]);
                }; C3 && !$(C3).hasClass("fr-marker") && 0 === $(C3).find(".fr-marker").length && "UL" !== C3.tagName && "OL" !== C3.tagName; ) if (0 !== (g3 = v2()) && g3) return g3.v;
                if (C3) ($(C3).find(".fr-marker").length || "UL" === C3.tagName || "OL" === C3.tagName) && N2(C3.firstChild, c3, d3);
                else {
                  for (var b2 = u2.get(0).parentNode; b2 && !b2.nextSibling && !k.node.isElement(b2); ) b2 = b2.parentNode;
                  if (b2) {
                    var E2 = b2.nextSibling;
                    "font-weight" === n && "LI" === b2.tagName && $(b2).find("strong").each(function() {
                      var e2 = $(this);
                      e2[0].outerHTML = e2[0].innerHTML;
                    }), E2 && (k.node.isBlock(E2) ? "HR" === E2.tagName ? N2(E2.nextSibling, c3, d3) : N2(E2.firstChild, c3, d3) : N2(E2, c3, d3));
                  }
                }
                u2.is(":empty") ? u2.remove() : m2 && (u2.parents("u, s").get().forEach(function(e2) {
                  var t3 = e2.parentNode;
                  if (t3) {
                    var n2 = document.createDocumentFragment();
                    e2.childNodes.forEach(function(e3) {
                      n2.appendChild(e3.cloneNode(true));
                    }), t3.replaceChild(n2, e2);
                  }
                }), k.selection.restore(), k.selection.save());
              }
            }
          }
        }
        function l2(e, t2) {
          var n;
          if (void 0 === t2 && (t2 = {}), t2.style && delete t2.style, k.selection.isCollapsed()) {
            k.markers.insert();
            var r2 = k.$el.find(".fr-marker");
            r2.get(0).nextSibling && k.node.isBlock(r2.get(0).nextSibling) && !r2.get(0).previousSibling && "LI" === r2.get(0).parentNode.tagName && r2.get(0).nextSibling.prepend(r2.get(0)), r2[0].previousSibling && "BR" === r2[0].previousSibling.tagName && (r2[0].previousSibling.remove(), r2[0].after($("<br>")[0])), r2.replaceWith((function l3(e2, t3) {
              var n2 = "<".concat(e2);
              for (var r3 in t3) Object.prototype.hasOwnProperty.call(t3, r3) && (n2 += " ".concat(r3, '="').concat(t3[r3], '"'));
              return n2 += ">";
            })(e, t2) + X.INVISIBLE_SPACE + X.MARKERS + (function c3(e2) {
              return "</".concat(e2, ">");
            })(e)), k.selection.restore();
          } else {
            k.selection.save();
            var o2, i2 = k.$el.find('.fr-marker[data-type="true"]').length && k.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling;
            N2(i2, e, t2), $(i2).parent().find("a:empty").not(".fr-anchor").remove();
            do {
              for (o2 = k.$el.find("".concat(B(e, t2), " > ").concat(B(e, t2))), n = 0; n < o2.length; n++) o2[n].outerHTML = o2[n].innerHTML;
            } while (o2.length);
            k.el.normalize();
            var a2 = k.el.querySelectorAll(".fr-marker");
            for (n = 0; n < a2.length; n++) {
              var s2 = $(a2[n]);
              true === s2.data("type") ? H(s2.get(0).nextSibling, B(e, t2)) && s2.next().prepend(s2) : H(s2.get(0).previousSibling, B(e, t2)) && s2.prev().append(s2);
            }
            k.selection.restore();
          }
        }
        function R2(e, t2, n, r2) {
          if (!r2) {
            var o2 = false;
            if (true === e.data("type")) for (; k.node.isFirstSibling(e.get(0)) && !e.parent().is(k.$el) && !e.parent().is("ol") && !e.parent().is("ul"); ) e.parent().before(e), o2 = true;
            else if (false === e.data("type")) for (; k.node.isLastSibling(e.get(0)) && !e.parent().is(k.$el) && !e.parent().is("ol") && !e.parent().is("ul"); ) e.parent().after(e), o2 = true;
            if (o2) return true;
          }
          if (e.parents(t2).length || void 0 === t2) {
            var i2, a2 = "", s2 = "", l3 = e.parent();
            if ("A" === l3[0].tagName && (l3 = l3.parent()), l3.is(k.$el) || k.node.isBlock(l3.get(0))) return false;
            for (; !(k.node.isBlock(l3.parent().get(0)) || void 0 !== t2 && H(l3.get(0), B(t2, n)) || ["#document", "HTML", "BODY"].includes(l3.parent().get(0).nodeName.toUpperCase())); ) a2 += k.node.closeTagString(l3.get(0)), s2 = k.node.openTagString(l3.get(0)) + s2, l3 = l3.parent();
            var c3 = e.get(0).outerHTML;
            return e.replaceWith('<span id="mark"></span>'), i2 = l3.html().replace(/<span id="mark"><\/span>/, a2 + k.node.closeTagString(l3.get(0)) + s2 + c3 + a2 + k.node.openTagString(l3.get(0)) + s2), l3.replaceWith(k.node.openTagString(l3.get(0)) + i2 + k.node.closeTagString(l3.get(0))), true;
          }
          return false;
        }
        function c2(e, t2) {
          void 0 === t2 && (t2 = {}), t2.style && delete t2.style;
          var n = k.selection.isCollapsed(), r2 = k.selection.element(), o2 = D[e];
          if (r2 && "LI" === r2.tagName && o2 && r2.style.getPropertyValue(o2.prop) === o2.val) {
            k.selection.save();
            var i2 = k.$el.find(".fr-marker");
            i2.last().parent().is(r2) || _(i2.last().parent().get(0), e), _(r2, e), k.selection.restore();
          }
          k.selection.save();
          var a2 = k.$el.find(".fr-marker");
          if (e && a2.length && (a2[0].parentNode && a2[0].parentNode.tagName === e.toUpperCase() || a2[1].parentNode.tagName === e.toUpperCase())) {
            var s2 = a2[0];
            a2[0].parentNode.tagName !== e.toUpperCase() && (s2 = a2[1]);
            for (var l3 = s2.parentNode.previousSibling; null != l3; ) l3.nodeType === Node.TEXT_NODE && (l3.textContent = l3.textContent.replace(/\u200B/g, "")), l3 = l3.previousSibling;
            for (var c3 = s2.parentNode.nextSibling; null != c3; ) c3.nodeType === Node.TEXT_NODE && (c3.textContent = c3.textContent.replace(/\u200B/g, "")), c3 = c3.nextSibling;
          }
          for (var d3 = true; d3; ) {
            d3 = false;
            for (var f2 = k.$el.find(".fr-marker"), p2 = 0; p2 < f2.length; p2++) {
              var u2 = $(f2[p2]), h2 = null;
              if (u2.attr("data-cloned") || n || (h2 = u2.clone().removeClass("fr-marker").addClass("fr-clone"), u2.data("type") && "true" === u2.data("type").toString() ? u2.attr("data-cloned", true).after(h2) : u2.attr("data-cloned", true).before(h2)), R2(u2, e, t2, n)) {
                d3 = true;
                break;
              }
            }
          }
          !(function O2(e2, t3, n2, r3) {
            var o3, i3 = k.node.contents(e2.get(0));
            i3 = i3.filter(function(e3) {
              return !$(e3).hasClass("fr-page-break");
            });
            for (var a3 = 0; a3 < i3.length; a3++) {
              var s3 = i3[a3];
              if (s3.innerHTML && 8203 == s3.innerHTML.charCodeAt() && s3.tagName.toLocaleLowerCase() == n2 && s3.childNodes.length < 2 && !k.helpers.isMobile() && (s3.outerHTML = s3.innerHTML), k.node.hasClass(s3, "fr-marker")) t3 = (t3 + 1) % 2;
              else if (t3) if (0 < $(s3).find(".fr-marker").length) t3 = O2($(s3), t3, n2, r3);
              else {
                (o3 = "LI" === s3.tagName ? s3 : $(s3).parentsUntil(k.$el, "li").get(0)) && (void 0 === n2 || 0 <= ["strong", "em"].indexOf(n2)) && (n2 ? $(o3).css(D[n2].prop, "") : o3.style = ""), (o3 = s3.parentNode !== k.el ? s3.parentNode : null) && 1 === o3.nodeType && ["p", "strong", "u", "em", "s", "sub", "sup", "a"].indexOf(n2) < 0 && o3.hasAttribute("style") && "SPAN" !== o3.tagName && "LI" !== o3.tagName ? o3.style = "" : s3 && 1 === s3.nodeType && s3.hasAttribute("style") && ["p", "strong", "u", "em", "s", "sub", "sup", "a"].indexOf(n2) < 0 && (k.browser.msie ? $(s3).attr("style", "") : s3.style = "");
                var l4 = D[n2], c4 = n2;
                l4 && (c4 += ', [style*="'.concat(l4.prop, ": ").concat(l4.val, '"]'));
                for (var d4 = $(s3).find(c4 || "*:not(br)"), f3 = d4.length - 1; 0 <= f3; f3--) {
                  var p3 = d4[f3];
                  if ((o3 = "LI" === p3.tagName ? p3 : $(p3).parentsUntil(k.$el, "li").get(0)) && (!n2 || 0 <= ["strong", "em"].indexOf(n2)) && (n2 ? $(o3).css(D[n2].prop, "") : o3.style = ""), "A" === p3.tagName || k.node.isBlock(p3) || k.node.isVoid(p3) || void 0 !== n2 && !H(p3, B(n2, r3))) k.node.isBlock(p3) && void 0 === n2 && "TABLE" !== s3.tagName && "VIDEO" !== p3.tagName && k.node.clearAttributes(p3);
                  else {
                    var u3 = "IFRAME" === p3.tagName && p3.parentNode && "SPAN" === p3.parentNode.tagName && k.node.hasClass(p3.parentNode, "fr-video") || "SPAN" === p3.tagName && k.node.hasClass(p3, "fr-video");
                    k.node.hasClass(p3, "fr-clone") || u3 || k.node.hasClass(p3, "fr-tracking-deleted") || $(p3).data("tracking") || (p3.outerHTML = p3.innerHTML);
                  }
                }
                "A" !== s3.tagName && void 0 === n2 && s3.nodeType === Node.ELEMENT_NODE && !k.node.isVoid(s3) || H(s3, B(n2, r3)) ? k.node.isBlock(s3) ? s3.style = "" : k.node.hasClass(s3, "fr-clone") || k.node.hasClass(s3, "fr-video") || k.opts.trackChangesEnabled ? !k.node.hasClass(s3, "fr-clone") && !k.node.hasClass(s3, "fr-video") && k.opts.trackChangesEnabled && s3.parentNode && (s3.outerHTML = s3.innerHTML) : s3.outerHTML = s3.innerHTML : void 0 === n2 && s3.nodeType === Node.ELEMENT_NODE && k.node.isBlock(s3) && !["TABLE", "VIDEO"].includes(s3.tagName) && k.node.clearAttributes(s3);
              }
              else 0 < $(s3).find(".fr-marker").length && (t3 = O2($(s3), t3, n2, r3));
            }
            return t3;
          })(k.$el, 0, e, t2), n || (k.$el.find(".fr-marker").remove(), k.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), n && k.$el.find(".fr-marker").before(X.INVISIBLE_SPACE).after(X.INVISIBLE_SPACE), k.html.cleanEmptyTags(), k.el.normalize(), k.selection.restore();
          var g3 = k.win.getSelection() && k.win.getSelection().anchorNode;
          if (g3) {
            var C3 = k.node.blockParent(g3), m2 = !!g3.textContent.replace(/\u200B/g, "").length, v2 = k.win.getSelection().getRangeAt(0), b2 = v2.startOffset, E2 = v2.endOffset;
            k.selection.text().replace(/\u200B/g, "").length || (function w2(e2, t3) {
              if (e2 && t3) {
                if (e2.isSameNode(t3) ? e2.textContent = e2.textContent.replace(/\u200B(?=.*\u200B)/g, "") : e2.nodeType === Node.TEXT_NODE && (e2.textContent = e2.textContent.replace(/\u200B/g, "")), !e2.childNodes.length) return false;
                Array.isArray(e2.childNodes) && e2.childNodes.forEach(function(e3) {
                  w2(e3, t3);
                });
              }
            })(C3, g3);
            var L2 = k.win.getSelection().getRangeAt(0);
            if (g3.nodeType === Node.TEXT_NODE) {
              if (!m2 || !k.selection.text().length && b2 === E2) {
                var y2 = g3.textContent.search(/\u200B/g) + 1;
                if (k.browser.msie) {
                  var N3 = k.doc.createRange();
                  k.selection.get().removeAllRanges(), N3.setStart(g3, y2), N3.setEnd(g3, y2), k.selection.get().addRange(N3);
                } else "a" !== e && (L2.setStart(g3, y2), L2.setEnd(g3, y2));
              }
            } else {
              var T3, S3, A2 = 0, M2 = $(g3).contents();
              if (k.browser.msie) {
                for (; S3 = M2[A2]; ) S3.nodeType === Node.TEXT_NODE && 0 <= S3.textContent.search(/\u200B/g) && (T3 = S3), A2++;
                T3 = $(T3);
              } else T3 = M2.filter(function(e2) {
                return e2.nodeType === Node.TEXT_NODE && 0 <= e2.textContent.search(/\u200B/g);
              });
              if (T3.length && !k.opts.trackChangesEnabled) {
                var x2 = T3.text().search(/\u200B/g) + 1;
                L2.setStart(T3.get(0), x2), L2.setEnd(T3.get(0), x2);
              }
            }
          }
        }
        function g2(e, t2) {
          var n = $(e);
          n.css(t2, "");
          var r2 = ["fr-find-replace-highlight", "fr-find-replace-current-highlight"].some(function(e2) {
            return n.hasClass(e2);
          });
          "" !== n.attr("style") || r2 || n.replaceWith(n.html());
        }
        function t(e, t2) {
          var n, r2, o2, i2, a2 = null;
          if (k.selection.isCollapsed()) {
            k.markers.insert();
            var s2 = (r2 = k.$el.find(".fr-marker")).parent();
            if (k.node.openTagString(s2.get(0)) === '<span style="'.concat(e, ": ").concat(s2.css(e), ';">')) {
              if (k.node.isEmpty(s2.get(0))) a2 = $(k.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t2, ";")).html("".concat(X.INVISIBLE_SPACE).concat(X.MARKERS)), s2.replaceWith(a2);
              else {
                var l3 = {};
                l3["style*"] = "".concat(e, ":"), R2(r2, "span", l3, true), r2 = k.$el.find(".fr-marker"), t2 ? (a2 = $(k.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t2, ";")).html("".concat(X.INVISIBLE_SPACE).concat(X.MARKERS)), r2.replaceWith(a2)) : r2.replaceWith(X.INVISIBLE_SPACE + X.MARKERS);
              }
              k.html.cleanEmptyTags();
            } else k.node.isEmpty(s2.get(0)) && s2.is("span") ? (r2.replaceWith(X.MARKERS), s2.css(e, t2)) : (r2.get(0).nextSibling && k.node.isBlock(r2.get(0).nextSibling) && !r2.get(0).previousSibling && "LI" === r2.get(0).parentNode.tagName && r2.get(0).nextSibling.prepend(r2.get(0)), a2 = $(t2 ? '<span style="'.concat(e, ": ").concat(t2, ';">').concat(X.INVISIBLE_SPACE).concat(X.MARKERS, "</span>") : "<span>".concat(X.INVISIBLE_SPACE).concat(X.MARKERS, "</span>")), r2.replaceWith(a2));
            a2 && C2(a2, e, t2);
          } else {
            if (k.selection.save(), null === t2 || "color" === e && 0 < k.$el.find(".fr-marker").parents("u, a").length) {
              var c3 = k.$el.find(".fr-marker");
              for (n = 0; n < c3.length; n++) if (true === (r2 = $(c3[n])).data("type") || "true" === r2.data("type")) for (; k.node.isFirstSibling(r2.get(0)) && !r2.parent().is(k.$el) && !k.node.isElement(r2.parent().get(0)) && !k.node.isBlock(r2.parent().get(0)); ) r2.parent().before(r2);
              else for (; k.node.isLastSibling(r2.get(0)) && !r2.parent().is(k.$el) && !k.node.isElement(r2.parent().get(0)) && !k.node.isBlock(r2.parent().get(0)); ) r2.parent().after(r2);
            }
            var d3 = k.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling;
            for (S2(d3) && (d3 = d3.nextSibling); d3.firstChild; ) S2(d3 = d3.firstChild) && (d3 = d3.nextSibling);
            var f2 = { "class": "fr-unprocessed" };
            for ((t2 || e) && (f2.style = "".concat(e, ": ").concat(t2 || "", ";")), N2(d3, "span", f2), k.$el.find(".fr-marker + .fr-unprocessed").each(function() {
              $(this).prepend($(this).prev());
            }), k.$el.find(".fr-unprocessed + .fr-marker").each(function() {
              $(this).prev().append($(this));
            }), (t2 || "").match(/\dem$/) && k.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < k.$el.find("span.fr-unprocessed").length; ) {
              if (o2 = T2(a2 = k.$el.find("span.fr-unprocessed").first().removeClass("fr-unprocessed")), a2.parent().get(0).normalize(), a2.parent().is("span") && 1 === a2.parent().get(0).childNodes.length) {
                var p2 = t2;
                k.browser.msie && !t2 && (p2 = ""), a2.parent().css(e, p2);
                var u2 = a2;
                a2 = a2.parent(), u2.replaceWith(u2.html()), 1 !== a2.parent().get(0).childNodes.length || t2 || "background-color" !== e || a2.parents("span").css(e, t2);
              }
              for (i2 = a2.find("span"), o2 && "background-color" !== e && (o2.normalize(), i2 = $(o2).find("span:not(.fr-unprocessed)")), n = i2.length - 1; 0 <= n; n--) g2(i2[n], e);
              C2(a2, e, t2);
            }
          }
          !(function h2() {
            var e2;
            for (; 0 < k.$el.find(".fr-split:empty").length; ) k.$el.find(".fr-split:empty").remove();
            k.$el.find(".fr-split").removeClass("fr-split"), k.$el.find('[style=""]').removeAttr("style"), k.$el.find('[class=""]').removeAttr("class"), k.html.cleanEmptyTags();
            for (var t3 = k.$el.find("span"), n2 = t3.length - 1; 0 <= n2; n2--) {
              var r3 = t3[n2];
              r3.attributes && 0 !== r3.attributes.length || $(r3).replaceWith(r3.innerHTML);
            }
            k.el.normalize();
            var o3 = k.$el.find("span[style] + span[style]");
            for (e2 = 0; e2 < o3.length; e2++) {
              var i3 = $(o3[e2]), a3 = $(o3[e2]).prev();
              i3.get(0).previousSibling === a3.get(0) && k.node.openTagString(i3.get(0)) === k.node.openTagString(a3.get(0)) && (i3.prepend(a3.html()), a3.remove());
            }
            k.$el.find("span[style] span[style]").each(function() {
              if (0 <= $(this).attr("style").indexOf("font-size")) {
                var e3 = $(this).parents("span[style]");
                e3.attr("style") && 0 <= e3.attr("style").indexOf("background-color") && ($(this).attr("style", (function o4(e4, t4) {
                  var n3 = function n4(e5) {
                    return e5.split(";").reduce(function(e6, t5) {
                      var n5 = t5.split(":"), r5 = x(n5, 2), o5 = r5[0], i4 = r5[1];
                      return o5 && i4 && (e6[o5.trim()] = i4.trim()), e6;
                    }, {});
                  }, r4 = Object.assign(n3(t4), n3(e4));
                  return Object.entries(r4).map(function(e5) {
                    var t5 = x(e5, 2), n4 = t5[0], r5 = t5[1];
                    return "".concat(n4, ": ").concat(r5);
                  }).join("; ");
                })($(this).attr("style"), e3.attr("style"))), R2($(this), "span[style]", {}, false));
              }
            }), k.el.normalize(), k.selection.restore();
          })();
        }
        function T2(e) {
          var t2, n, r2, o2, i2, a2;
          if (t2 = "LI" === e.tagName ? e : $(e).parentsUntil(k.$el, "li").get(0)) {
            if ((a2 = k.selection.info(t2)).atStart && a2.atEnd) return t2;
            if (a2.atStart && !a2.atEnd && (n = $(t2).find(".fr-marker[data-type=false]").get(0), r2 = $(n).parentsUntil(k.$el, "li").get(0), o2 = $(n).parentsUntil(r2).get(-1), (i2 = n.nextSibling) && 0 <= ["UL", "OL"].indexOf(i2.tagName) || !r2.isSameNode(t2) || !i2 && o2 && ("LI" === o2.tagName || !o2.nextSibling || 0 <= ["UL", "OL"].indexOf(o2.nextSibling.tagName) || k.node.isVoid(o2.nextSibling)))) return t2;
          }
        }
        function C2(e, t2, n) {
          var r2, o2, i2, a2 = e.parentsUntil(k.$el, "span[style]"), s2 = [];
          for (r2 = a2.length - 1; 0 <= r2; r2--) o2 = a2[r2], i2 = t2, 0 === $(o2).attr("style").indexOf("".concat(i2, ":")) || 0 <= $(o2).attr("style").indexOf(";".concat(i2, ":")) || 0 <= $(o2).attr("style").indexOf("; ".concat(i2, ":")) || s2.push(a2[r2]);
          if ((a2 = a2.not(s2)).length) {
            var l3 = "", c3 = "", d3 = "", f2 = "", p2 = e.get(0);
            do {
              if (p2 = p2.parentNode, ["TABLE", "TD", "TR"].includes(p2.tagName)) break;
              $(p2).addClass("fr-split"), l3 += k.node.closeTagString(p2), c3 = k.node.openTagString($(p2).clone().addClass("fr-split").get(0)) + c3, a2.get(0) !== p2 && (d3 += k.node.closeTagString(p2), f2 = k.node.openTagString($(p2).clone().addClass("fr-split").get(0)) + f2);
            } while (a2.get(0) !== p2);
            var u2 = "".concat(l3 + k.node.openTagString($(a2.get(0)).clone().css(t2, n || "").get(0)) + f2 + e.css(t2, "").get(0).outerHTML + d3, "</span>").concat(c3);
            e.replaceWith('<span id="fr-break"></span>');
            var h2 = a2.get(0).outerHTML;
            $(a2.get(0)).replaceWith(h2.replace(/<span id="fr-break"><\/span>/g, function() {
              return u2;
            }));
          }
        }
        function d2(e, t2) {
          void 0 === t2 && (t2 = {}), t2.style && delete t2.style;
          var n = B(e, t2), r2 = D[e];
          r2 && (n += ', [style*="'.concat(r2.prop, ": ").concat(r2.val, '"]'));
          var o2 = k.selection.ranges(0), i2 = o2.startContainer;
          if (i2.nodeType === Node.ELEMENT_NODE && 0 < i2.childNodes.length && i2.childNodes[o2.startOffset] && (i2 = i2.childNodes[o2.startOffset]), S2(i2) && (i2 = i2.nextSibling), !o2.collapsed && i2.nodeType === Node.TEXT_NODE && o2.startOffset === (i2.textContent || "").length) {
            for (; !k.node.isBlock(i2.parentNode) && !i2.nextSibling; ) i2 = i2.parentNode;
            i2.nextSibling && (i2 = i2.nextSibling);
          }
          for (var a2 = i2; a2 && a2.nodeType === Node.ELEMENT_NODE && !H(a2, n); ) S2(a2 = a2.firstChild) && (a2 = a2.nextSibling);
          if (a2 && a2.nodeType === Node.ELEMENT_NODE && H(a2, n)) return true;
          var s2 = i2;
          for (s2 && s2.nodeType !== Node.ELEMENT_NODE && (s2 = s2.parentNode); s2 && s2.nodeType === Node.ELEMENT_NODE && s2 !== k.el && !H(s2, n); ) s2 = s2.parentNode;
          return !(!s2 || s2.nodeType !== Node.ELEMENT_NODE || s2 === k.el || !H(s2, n));
        }
        function S2(e) {
          return e && e.nodeType === Node.ELEMENT_NODE && "COLGROUP" === e.tagName;
        }
        function _(e, t2) {
          var n = e.querySelector("ol, ul");
          if (n) {
            var r2 = n.cloneNode(true);
            n.remove();
            var o2 = k.doc.createElement(t2);
            o2.innerHTML = e.innerHTML.trim(), e.innerHTML = "", e.appendChild(o2), e.appendChild(r2);
          } else {
            var i2 = k.doc.createElement(t2);
            i2.innerHTML = e.innerHTML, e.innerHTML = i2.outerHTML;
          }
        }
        return { is: d2, toggle: function f2(e, t2) {
          if (k.browser.safari && k.shared.safariSelection) {
            var n = k.shared.safariSelection, r2 = n.startContainer, o2 = n.endContainer, i2 = n.startOffset, a2 = n.endOffset, s2 = k.doc.createRange();
            s2.setStart(r2, i2), s2.setEnd(o2, a2), k.selection.get().removeAllRanges(), k.selection.get().addRange(s2), k.shared.safariSelection = null;
          }
          d2(e, t2) ? c2(e, t2) : l2(e, t2);
        }, apply: l2, remove: c2, applyStyle: t, removeStyle: function n(e) {
          t(e, null);
        } };
      }, X.MODULES.spaces = function(p2) {
        var u2 = p2.$;
        function r2(e, t) {
          var n = e.previousSibling, r3 = e.nextSibling, o2 = e.textContent, i2 = e.parentNode, a2 = [X.ENTER_P, X.ENTER_DIV, X.ENTER_BR];
          if (!p2.html.isPreformatted(i2)) {
            t && (o2 = p2.opts.preserveTabSpaces ? o2.replace(/[\f\n\r\v]{2,}/g, " ") : o2.replace(/[\f\n\r\t\v ]{2,}/g, " "), r3 && "BR" !== r3.tagName && !p2.node.isBlock(r3) || !(p2.node.isBlock(i2) || p2.node.isLink(i2) && !i2.nextSibling || p2.node.isElement(i2)) || (o2 = o2.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !p2.node.isBlock(n) || !(p2.node.isBlock(i2) || p2.node.isLink(i2) && !i2.previousSibling || p2.node.isElement(i2)) || (o2 = o2.replace(/^[\f\n\r\t\v ]{1,}/g, "")), (p2.node.isBlock(r3) || p2.node.isBlock(n)) && (!n || n && "A" !== n.tagName) && (o2 = o2.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " === o2 && (n && p2.node.isVoid(n) || r3 && p2.node.isVoid(r3)) && !(n && r3 && p2.node.isVoid(n) || r3 && n && p2.node.isVoid(r3)) && (o2 = "")), (!n && p2.node.isBlock(r3) || !r3 && p2.node.isBlock(n)) && p2.node.isBlock(i2) && i2 !== p2.el && (o2 = o2.replace(/^[\f\n\r\t\v ]{1,}/g, "")), t || (o2 = o2.replace(new RegExp(X.UNICODE_NBSP, "g"), " "));
            var s2 = i2.nextSibling && i2.nextSibling.tagName, l3 = i2.previousSibling && i2.previousSibling.tagName, c2 = ["SPAN", "STRONG", "U", "EM"];
            s2 || u2(i2).parent().each(function() {
              return -1 !== c2.indexOf(this.tagName) && (this.nextSibling ? (s2 = this.nextSibling && this.nextSibling.tagName, false) : void 0);
            }), l3 || u2(i2).parent().each(function() {
              return -1 !== c2.indexOf(this.tagName) && (this.previousSibling ? (l3 = this.previousSibling && this.previousSibling.tagName, false) : void 0);
            });
            for (var d2 = "", f2 = 0; f2 < o2.length; f2++) 32 != o2.charCodeAt(f2) || 0 !== f2 && 32 != d2.charCodeAt(f2 - 1) || e.nodeType === Node.TEXT_NODE && "SPAN" === i2.tagName && i2.parentNode && 0 <= c2.indexOf(i2.parentNode.tagName) && (0 <= c2.indexOf(s2) || 0 <= c2.indexOf(l3)) || !((p2.opts.enter === X.ENTER_BR || p2.opts.enter === X.ENTER_DIV) && (n && "BR" === n.tagName || r3 && "BR" === r3.tagName) || n && r3 && n.tagName === r3.tagName || !(n && r3 && p2.node.isVoid(n) || n && r3 && p2.node.isVoid(r3)) || n && r3 && 0 <= ["STRONG", "U", "EM"].indexOf(n.tagName) && "BR" === r3.tagName) ? d2 += o2[f2] : d2 += X.UNICODE_NBSP;
            p2.browser.chrome && 1 < d2.length && 32 === d2.charCodeAt(d2.length - 1) && (r3 && r3.nextSibling && r3.nextSibling.nextSibling && "BR" === r3.nextSibling.nextSibling.tagName || r3 && "BR" === r3.tagName) && (d2 = d2.substring(0, d2.length - 1) + X.UNICODE_NBSP), !(!r3 || r3 && p2.node.isBlock(r3) || r3 && r3.nodeType === Node.ELEMENT_NODE && p2.win.getComputedStyle(r3) && "block" === p2.win.getComputedStyle(r3).display) || e.nodeType === Node.TEXT_NODE && "SPAN" === i2.tagName && i2.parentNode && 0 <= c2.indexOf(i2.parentNode.tagName) && (0 <= c2.indexOf(s2) || 0 <= c2.indexOf(l3)) || (!p2.node.isVoid(n) || n && -1 !== ["P", "DIV", "BR"].indexOf(n.tagName) && -1 !== a2.indexOf(p2.opts.enter)) && (d2 = d2.replace(/ $/, X.UNICODE_NBSP)), !n || p2.node.isVoid(n) || p2.node.isBlock(n) || 1 !== (d2 = d2.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== d2.charCodeAt(0) || !r3 || p2.node.isVoid(r3) || p2.node.isBlock(r3) || p2.node.hasClass(n, "fr-marker") && p2.node.hasClass(r3, "fr-marker") || (d2 = " "), t || (d2 = d2.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), e.textContent !== d2 && (e.textContent = d2);
          }
        }
        function l2(e, t) {
          if (void 0 !== e && e || (e = p2.el), void 0 === t && (t = false), !e.getAttribute || "false" !== e.getAttribute("contenteditable")) {
            if (e.nodeType === Node.TEXT_NODE) r2(e, t);
            else if (e.nodeType === Node.ELEMENT_NODE) for (var n = p2.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, p2.node.filter(function(e2) {
              for (var t2 = e2.parentNode; t2 && t2 !== p2.el; ) {
                if ("STYLE" === t2.tagName || "IFRAME" === t2.tagName) return false;
                if ("PRE" === t2.tagName) return false;
                t2 = t2.parentNode;
              }
              return null !== e2.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !p2.node.hasClass(e2.parentNode, "fr-marker");
            }), false); n.nextNode(); ) r2(n.currentNode, t);
          }
        }
        return { normalize: l2, normalizeAroundCursor: function c2() {
          for (var e = [], t = p2.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
            for (var r3 = null, o2 = p2.node.blockParent(t[n]), i2 = (r3 = o2 || t[n]).nextSibling, a2 = r3.previousSibling; i2 && "BR" === i2.tagName; ) i2 = i2.nextSibling;
            for (; a2 && "BR" === a2.tagName; ) a2 = a2.previousSibling;
            r3 && e.indexOf(r3) < 0 && e.push(r3), a2 && e.indexOf(a2) < 0 && e.push(a2), i2 && e.indexOf(i2) < 0 && e.push(i2);
          }
          for (var s2 = 0; s2 < e.length; s2++) l2(e[s2]);
        } };
      }, X.INVISIBLE_SPACE = "&#8203;", X.HAIR_SPACE = "&#8202;", X.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'.concat(X.INVISIBLE_SPACE, "</span>"), X.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'.concat(X.INVISIBLE_SPACE, "</span>"), X.MARKERS = X.START_MARKER + X.END_MARKER, X.MODULES.markers = function(d2) {
        var f2 = d2.$;
        function l2() {
          if (!d2.$wp) return null;
          try {
            var e = d2.selection.ranges(0), t = e.commonAncestorContainer;
            if (t !== d2.el && !d2.$el.contains(t)) return null;
            var n = e.cloneRange(), r2 = e.cloneRange();
            n.collapse(true);
            var o2 = f2(d2.doc.createElement("SPAN")).addClass("fr-marker").attr("style", "display: none; line-height: 0;").html(X.INVISIBLE_SPACE).get(0);
            if (n.insertNode(o2), o2 = d2.$el.find("span.fr-marker").get(0)) {
              for (var i2 = o2.nextSibling; i2 && i2.nodeType === Node.TEXT_NODE && 0 === i2.textContent.length; ) f2(i2).remove(), i2 = d2.$el.find("span.fr-marker").get(0).nextSibling;
              return d2.selection.clear(), d2.selection.get().addRange(r2), o2;
            }
            return null;
          } catch (a2) {
          }
        }
        function c2() {
          d2.$el.find(".fr-marker").remove();
        }
        return { place: function p2(e, t, n) {
          var r2, o2, i2;
          try {
            var a2 = e.cloneRange();
            if (a2.collapse(t), a2.insertNode((function l3(e2, t2) {
              var n2 = f2(d2.doc.createElement("SPAN"));
              return n2.addClass("fr-marker").attr("data-id", t2).attr("data-type", e2).attr("style", "display: ".concat(d2.browser.safari ? "none" : "inline-block", "; line-height: 0;")).html(X.INVISIBLE_SPACE), n2.get(0);
            })(t, n)), true === t) for (i2 = (r2 = d2.$el.find('span.fr-marker[data-type="true"][data-id="'.concat(n, '"]')).get(0)).nextSibling; i2 && i2.nodeType === Node.TEXT_NODE && 0 === i2.textContent.length; ) f2(i2).remove(), i2 = r2.nextSibling;
            if (true === t && !e.collapsed) {
              for (; !d2.node.isElement(r2.parentNode) && !i2; ) -1 < /\bfa\b/g.test(r2.parentNode.className) && "I" === r2.parentNode.tagName ? f2(r2.parentNode).before(r2) : f2(r2.parentNode).after(r2), i2 = r2.nextSibling;
              if (i2 && i2.nodeType === Node.ELEMENT_NODE && d2.node.isBlock(i2) && "HR" !== i2.tagName && !f2(i2).hasClass("fr-page-break")) {
                for (o2 = [i2]; i2 = o2[0], (o2 = d2.node.contents(i2))[0] && d2.node.isBlock(o2[0]); ) ;
                f2(i2).prepend(f2(r2));
              }
            }
            if (false === t && !e.collapsed) {
              if ((i2 = (r2 = d2.$el.find('span.fr-marker[data-type="false"][data-id="'.concat(n, '"]')).get(0)).previousSibling) && i2.nodeType === Node.ELEMENT_NODE && d2.node.isBlock(i2) && !["TABLE", "HR"].includes(i2.tagName) && !f2(i2).hasClass("fr-page-break")) {
                for (o2 = [i2]; i2 = o2[o2.length - 1], (o2 = d2.node.contents(i2))[o2.length - 1] && d2.node.isBlock(o2[o2.length - 1]); ) ;
                f2(i2).append(f2(r2));
              }
              (r2.parentNode && 0 <= ["TD", "TH"].indexOf(r2.parentNode.tagName) || !r2.previousSibling && d2.node.isBlock(r2.parentElement)) && (!r2.parentNode.previousSibling || f2(r2.parentNode.previousSibling).hasClass("fr-page-break") || r2.previousSibling ? 0 <= ["TD", "TH"].indexOf(r2.parentNode.tagName) && r2.parentNode.firstChild === r2 && (r2.parentNode.previousSibling ? f2(r2.parentNode.previousSibling).append(r2) : r2.parentNode.parentNode && r2.parentNode.parentNode.previousSibling && f2(r2.parentNode.parentNode.previousSibling).append(r2)) : f2(r2.parentNode.previousSibling).append(r2));
            }
            var s2 = d2.$el.find('span.fr-marker[data-type="'.concat(t, '"][data-id="').concat(n, '"]')).get(0);
            return s2 && (s2.style.display = "none"), s2;
          } catch (c3) {
            return null;
          }
        }, insert: l2, split: function a2() {
          d2.selection.isCollapsed() || d2.selection.remove();
          var e = d2.$el.find(".fr-marker").get(0);
          if (e || (e = l2()), !e) return null;
          var t = d2.node.deepestParent(e);
          if (t || (t = d2.node.blockParent(e)) && "LI" !== t.tagName && (t = null), t) {
            if (d2.node.isBlock(t) && d2.node.isEmpty(t)) "LI" !== t.tagName || t.parentNode.firstElementChild !== t || d2.node.isEmpty(t.parentNode) ? f2(t).replaceWith('<span class="fr-marker"></span>') : f2(t).append('<span class="fr-marker"></span>');
            else if (d2.cursor.isAtStart(e, t)) f2(t).before('<span class="fr-marker"></span>'), f2(e).remove();
            else if (d2.cursor.isAtEnd(e, t)) f2(t).after('<span class="fr-marker"></span>'), f2(e).remove();
            else if ("true" !== t.contentEditable) {
              for (var n = e, r2 = "", o2 = ""; n = n.parentNode, r2 += d2.node.closeTagString(n), o2 = d2.node.openTagString(n) + o2, n !== t; ) ;
              f2(e).replaceWith('<span id="fr-break"></span>');
              var i2 = d2.node.openTagString(t) + f2(t).html() + d2.node.closeTagString(t);
              i2 = i2.replace(/<span id="fr-break"><\/span>/g, "".concat(r2, '<span class="fr-marker"></span>').concat(o2)), f2(t).replaceWith(i2);
            }
          }
          return d2.$el.find(".fr-marker").get(0);
        }, insertAtPoint: function u2(e) {
          var t, n = e.clientX, r2 = e.clientY;
          c2();
          var o2 = null;
          if ("undefined" != typeof d2.doc.caretPositionFromPoint ? (t = d2.doc.caretPositionFromPoint(n, r2), (o2 = d2.doc.createRange()).setStart(t.offsetNode, t.offset), o2.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d2.doc.caretRangeFromPoint && (t = d2.doc.caretRangeFromPoint(n, r2), (o2 = d2.doc.createRange()).setStart(t.startContainer, t.startOffset), o2.setEnd(t.startContainer, t.startOffset)), null !== o2 && "undefined" != typeof d2.win.getSelection) {
            var i2 = d2.win.getSelection();
            i2.removeAllRanges(), i2.addRange(o2);
          } else if ("undefined" != typeof d2.doc.body.createTextRange) try {
            (o2 = d2.doc.body.createTextRange()).moveToPoint(n, r2);
            var a2 = o2.duplicate();
            a2.moveToPoint(n, r2), o2.setEndPoint("EndToEnd", a2), o2.select();
          } catch (s2) {
            return false;
          }
          l2();
        }, remove: c2 };
      }, X.MODULES.selection = function(L2) {
        var y2 = L2.$;
        function l2() {
          var e = "";
          return L2.win.getSelection ? e = L2.win.getSelection() : L2.doc.getSelection ? e = L2.doc.getSelection() : L2.doc.selection && (e = L2.doc.selection.createRange().text), e.toString();
        }
        function E2() {
          return L2.win.getSelection ? L2.win.getSelection() : L2.doc.getSelection ? L2.doc.getSelection() : L2.doc.selection.createRange();
        }
        function p2(e) {
          var t = E2(), n = [];
          if (t && t.getRangeAt && t.rangeCount) {
            n = [];
            for (var r3 = 0; r3 < t.rangeCount; r3++) n.push(t.getRangeAt(r3));
          } else n = L2.doc.createRange ? [L2.doc.createRange()] : [];
          return void 0 !== e ? n[e] : n;
        }
        function N2() {
          var e = E2();
          try {
            e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear();
          } catch (t) {
          }
        }
        function u2(e, t) {
          var n = e;
          return n.nodeType === Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), n.nodeType === Node.TEXT_NODE && (n = n.parentNode), n;
        }
        function T2() {
          if (L2.$wp) {
            L2.markers.remove();
            var e, t, n = p2(), r3 = [];
            for (t = 0; t < n.length; t++) if (n[t].startContainer !== L2.doc || L2.browser.msie) {
              var o3 = (e = n[t]).collapsed, i3 = L2.markers.place(e, true, t), a3 = L2.markers.place(e, false, t);
              if (void 0 !== i3 && i3 || !o3 || (y2(".fr-marker").remove(), L2.selection.setAtEnd(L2.el)), L2.el.normalize(), L2.browser.safari && !o3) try {
                (e = L2.doc.createRange()).setStartAfter(i3), e.setEndBefore(a3), r3.push(e);
              } catch (s2) {
              }
            }
            if (L2.browser.safari && r3.length) for (L2.selection.clear(), t = 0; t < r3.length; t++) L2.selection.get().addRange(r3[t]);
          }
        }
        function S2() {
          var e, t = L2.el.querySelectorAll('.fr-marker[data-type="true"]');
          if (!L2.$wp) return L2.markers.remove(), false;
          if (0 === t.length) return false;
          if (L2.browser.msie || L2.browser.edge) for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
          L2.core.hasFocus() || L2.browser.msie || L2.browser.webkit || L2.$el.focus(), N2();
          var n = E2();
          for (e = 0; e < t.length; e++) {
            var r3 = y2(t[e]).data("id"), o3 = t[e], i3 = L2.doc.createRange(), a3 = L2.$el.find('.fr-marker[data-type="false"][data-id="'.concat(r3, '"]'));
            (L2.browser.msie || L2.browser.edge) && a3.css("display", "inline-block");
            var s2 = null;
            if (0 < a3.length) {
              a3 = a3[0];
              try {
                for (var l3 = false, c2 = o3.nextSibling, d2 = null; c2 && c2.nodeType === Node.TEXT_NODE && 0 === c2.textContent.length; ) c2 = (d2 = c2).nextSibling, y2(d2).remove();
                for (var f2 = a3.nextSibling; f2 && f2.nodeType === Node.TEXT_NODE && 0 === f2.textContent.length; ) f2 = (d2 = f2).nextSibling, y2(d2).remove();
                if (o3.nextSibling === a3 || a3.nextSibling === o3) {
                  for (var p3 = o3.nextSibling === a3 ? o3 : a3, u3 = p3 === o3 ? a3 : o3, h3 = p3.previousSibling; h3 && h3.nodeType === Node.TEXT_NODE && 0 === h3.length; ) h3 = (d2 = h3).previousSibling, y2(d2).remove();
                  if (h3 && h3.nodeType === Node.TEXT_NODE) for (; h3 && h3.previousSibling && h3.previousSibling.nodeType === Node.TEXT_NODE; ) h3.previousSibling.textContent += h3.textContent, h3 = h3.previousSibling, y2(h3.nextSibling).remove();
                  for (var g2 = u3.nextSibling; g2 && g2.nodeType === Node.TEXT_NODE && 0 === g2.length; ) g2 = (d2 = g2).nextSibling, y2(d2).remove();
                  if (g2 && g2.nodeType === Node.TEXT_NODE) for (; g2 && g2.nextSibling && g2.nextSibling.nodeType === Node.TEXT_NODE; ) g2.nextSibling.textContent = g2.textContent + g2.nextSibling.textContent, g2 = g2.nextSibling, y2(g2.previousSibling).remove();
                  if (h3 && (L2.node.isVoid(h3) || L2.node.isBlock(h3)) && (h3 = null), g2 && (L2.node.isVoid(g2) || L2.node.isBlock(g2)) && (g2 = null), h3 && g2 && h3.nodeType === Node.TEXT_NODE && g2.nodeType === Node.TEXT_NODE) {
                    y2(o3).remove(), y2(a3).remove();
                    var C2 = h3.textContent.length;
                    h3.textContent += g2.textContent, y2(g2).remove(), L2.spaces.normalize(h3), i3.setStart(h3, C2), i3.setEnd(h3, C2), l3 = true;
                  } else !h3 && g2 && g2.nodeType === Node.TEXT_NODE ? (y2(o3).remove(), y2(a3).remove(), L2.opts.htmlUntouched || L2.spaces.normalize(g2), s2 = y2(L2.doc.createTextNode("​")).get(0), y2(g2).before(s2), i3.setStart(g2, 0), i3.setEnd(g2, 0), l3 = true) : !g2 && h3 && h3.nodeType === Node.TEXT_NODE && (y2(o3).remove(), y2(a3).remove(), L2.opts.htmlUntouched || L2.spaces.normalize(h3), s2 = y2(L2.doc.createTextNode("​")).get(0), y2(h3).after(s2), i3.setStart(h3, h3.textContent.length), i3.setEnd(h3, h3.textContent.length), l3 = true);
                }
                if (!l3) {
                  var m2 = void 0, v2 = void 0;
                  v2 = (L2.browser.chrome || L2.browser.edge || L2.helpers.isIOS()) && o3.nextSibling === a3 ? (m2 = A2(a3, i3, true) || i3.setStartAfter(a3), A2(o3, i3, false) || i3.setEndBefore(o3)) : (o3.previousSibling === a3 && (a3 = (o3 = a3).nextSibling), a3.nextSibling && "BR" === a3.nextSibling.tagName || !a3.nextSibling && L2.node.isBlock(o3.previousSibling) || o3.previousSibling && "BR" === o3.previousSibling.tagName || (o3.style.display = "inline", a3.style.display = "inline", s2 = y2(L2.doc.createTextNode("​")).get(0)), m2 = A2(o3, i3, true) || y2(o3).before(s2) && i3.setStartBefore(o3), A2(a3, i3, false) || y2(a3).after(s2) && i3.setEndAfter(a3)), "function" == typeof m2 && m2(), "function" == typeof v2 && v2();
                }
              } catch (b2) {
              }
            }
            s2 && y2(s2).remove();
            try {
              n.addRange(i3);
            } catch (b2) {
            }
          }
          L2.markers.remove();
        }
        function A2(e, t, n) {
          var r3, o3 = e.previousSibling, i3 = e.nextSibling;
          return o3 && i3 && o3.nodeType === Node.TEXT_NODE && i3.nodeType === Node.TEXT_NODE ? (r3 = o3.textContent.length, n ? (i3.textContent = o3.textContent + i3.textContent, y2(o3).remove(), y2(e).remove(), L2.opts.htmlUntouched || L2.spaces.normalize(i3), function() {
            t.setStart(i3, r3);
          }) : (o3.textContent += i3.textContent, y2(i3).remove(), y2(e).remove(), L2.opts.htmlUntouched || L2.spaces.normalize(o3), function() {
            t.setEnd(o3, r3);
          })) : o3 && !i3 && o3.nodeType === Node.TEXT_NODE ? (r3 = o3.textContent.length, n ? (L2.opts.htmlUntouched || L2.spaces.normalize(o3), function() {
            t.setStart(o3, r3);
          }) : (L2.opts.htmlUntouched || L2.spaces.normalize(o3), function() {
            t.setEnd(o3, r3);
          })) : !(!i3 || o3 || i3.nodeType !== Node.TEXT_NODE) && (n ? (L2.opts.htmlUntouched || L2.spaces.normalize(i3), function() {
            t.setStart(i3, 0);
          }) : (L2.opts.htmlUntouched || L2.spaces.normalize(i3), function() {
            t.setEnd(i3, 0);
          }));
        }
        function M2() {
          for (var e = p2(), t = 0; t < e.length; t++) if (!e[t].collapsed) return false;
          return true;
        }
        function o2(e) {
          var t, n, r3 = false, o3 = false;
          if (L2.win.getSelection) {
            var i3 = L2.win.getSelection();
            i3.rangeCount && ((n = (t = i3.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), r3 = a2(n), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), o3 = a2(n));
          } else L2.doc.selection && "Control" !== L2.doc.selection.type && ((n = (t = L2.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), r3 = a2(n), n.moveToElementText(e), n.setEndPoint("StartToEnd", t), o3 = a2(n));
          return { atStart: r3, atEnd: o3 };
        }
        function a2(e) {
          return "" === e.toString().replace(/[\u200B-\u200D\uFEFF]/g, "");
        }
        function x2(e, t) {
          void 0 === t && (t = true);
          var n = y2(e).html();
          n && n.replace(/\u200b/g, "").length !== n.length && y2(e).html(n.replace(/\u200b/g, ""));
          for (var r3 = L2.node.contents(e), o3 = 0; o3 < r3.length; o3++) r3[o3].nodeType !== Node.ELEMENT_NODE ? y2(r3[o3]).remove() : (x2(r3[o3], 0 === o3), 0 === o3 && (t = false));
          if (e.nodeType === Node.TEXT_NODE) {
            var i3 = y2(document.createElement("span")).attr("data-first", "true").attr("data-text", "true");
            y2(e)[0].replaceWith(i3[0]);
          } else t && y2(e).attr("data-first", true);
        }
        function O2() {
          return 0 === y2(this).find("fr-inner").length;
        }
        function w2(e) {
          var t = L2.selection ? L2.selection.get() : window.getSelection();
          if (!t || 0 === t.rangeCount) return false;
          var n = t.getRangeAt(0);
          if (n.collapsed) return false;
          var r3 = e.querySelectorAll("td, th");
          return 0 !== r3.length && Array.from(r3).every(function(e2) {
            var t2 = document.createRange();
            return t2.selectNodeContents(e2), n.compareBoundaryPoints(Range.START_TO_START, t2) <= 0 && 0 <= n.compareBoundaryPoints(Range.END_TO_END, t2);
          });
        }
        function h2() {
          try {
            if (!L2.$wp) return false;
            for (var e = p2(0).commonAncestorContainer; e && !L2.node.isElement(e); ) e = e.parentNode;
            return !!L2.node.isElement(e);
          } catch (t) {
            return false;
          }
        }
        function r2(e, t) {
          if (!e || 0 < e.getElementsByClassName("fr-marker").length) return false;
          for (var n = e.firstChild; n && (L2.node.isBlock(n) || t && !L2.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE); ) n = (e = n).firstChild;
          e.innerHTML = X.MARKERS + e.innerHTML;
        }
        function i2(e, t) {
          if (!e || 0 < e.getElementsByClassName("fr-marker").length) return false;
          for (var n = e.lastChild; n && (L2.node.isBlock(n) || t && !L2.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE); ) n = (e = n).lastChild;
          var r3 = L2.doc.createElement("SPAN");
          for (r3.setAttribute("id", "fr-sel-markers"), r3.innerHTML = X.MARKERS; e.parentNode && L2.opts.htmlAllowedEmptyTags && 0 <= L2.opts.htmlAllowedEmptyTags.indexOf(e.tagName.toLowerCase()); ) e = e.parentNode;
          e.appendChild(r3);
          var o3 = e.querySelector("#fr-sel-markers");
          o3.outerHTML = o3.innerHTML;
        }
        return { text: l2, get: E2, ranges: p2, clear: N2, element: function c2() {
          var e = E2();
          try {
            if (e.rangeCount) {
              var t, n = p2(0), r3 = n.startContainer;
              if (L2.node.isElement(r3) && 0 === n.startOffset && r3.childNodes.length) for (; r3.childNodes.length && r3.childNodes[0].nodeType === Node.ELEMENT_NODE; ) r3 = r3.childNodes[0];
              if (r3.nodeType === Node.TEXT_NODE && n.startOffset === (r3.textContent || "").length && r3.nextSibling && (r3 = r3.nextSibling), r3.nodeType === Node.ELEMENT_NODE) {
                var o3 = false;
                if (L2.node.isElement(r3) && "" == r3.textContent && "IMG" == r3.childNodes[0].tagName && r3.childNodes.length) for (; r3.childNodes.length && r3.childNodes[0].nodeType === Node.ELEMENT_NODE; ) r3 = r3.childNodes[0];
                if (0 < r3.childNodes.length && r3.childNodes[n.startOffset]) {
                  for (t = r3.childNodes[n.startOffset]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length; ) t = t.nextSibling;
                  if (t && t.textContent.replace(/\u200B/g, "") === l2().replace(/\u200B/g, "") && (r3 = t, o3 = true), !o3 && 1 < r3.childNodes.length && 0 < n.startOffset && r3.childNodes[n.startOffset - 1]) {
                    for (t = r3.childNodes[n.startOffset - 1]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length; ) t = t.nextSibling;
                    t && t.textContent.replace(/\u200B/g, "") === l2().replace(/\u200B/g, "") && (r3 = t, o3 = true);
                  }
                } else !n.collapsed && r3.nextSibling && r3.nextSibling.nodeType === Node.ELEMENT_NODE && (t = r3.nextSibling) && t.textContent.replace(/\u200B/g, "") === l2().replace(/\u200B/g, "") && (r3 = t, o3 = true);
                !o3 && 0 < r3.childNodes.length && y2(r3.childNodes[0]).text().replace(/\u200B/g, "") === l2().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(r3.childNodes[0].tagName) < 0 && (r3 = r3.childNodes[0]);
              }
              for (; r3.nodeType !== Node.ELEMENT_NODE && r3.parentNode; ) r3 = r3.parentNode;
              var i3 = y2(r3).parentsUntil(L2.$el, ".fr-img-wrap .fr-inner");
              0 < i3.length && (r3 = i3.get(0));
              for (var a3 = r3; a3 && "HTML" !== a3.tagName; ) {
                if (a3 === L2.el) return r3;
                a3 = y2(a3).parent()[0];
              }
            }
          } catch (s2) {
          }
          return L2.el;
        }, endElement: function s2() {
          var e = E2();
          try {
            if (e.rangeCount) {
              var t, n = p2(0), r3 = n.endContainer;
              if (r3.nodeType === Node.ELEMENT_NODE) {
                var o3 = false;
                0 < r3.childNodes.length && r3.childNodes[n.endOffset] && y2(r3.childNodes[n.endOffset]).text() === l2() ? (r3 = r3.childNodes[n.endOffset], o3 = true) : !n.collapsed && r3.previousSibling && r3.previousSibling.nodeType === Node.ELEMENT_NODE ? (t = r3.previousSibling) && t.textContent.replace(/\u200B/g, "") === l2().replace(/\u200B/g, "") && (r3 = t, o3 = true) : !n.collapsed && 0 < r3.childNodes.length && r3.childNodes[n.endOffset] && (t = r3.childNodes[n.endOffset].previousSibling).nodeType === Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === l2().replace(/\u200B/g, "") && (r3 = t, o3 = true), !o3 && 0 < r3.childNodes.length && y2(r3.childNodes[r3.childNodes.length - 1]).text() === l2() && ["BR", "IMG", "HR"].indexOf(r3.childNodes[r3.childNodes.length - 1].tagName) < 0 && (r3 = r3.childNodes[r3.childNodes.length - 1]);
              }
              for (r3.nodeType === Node.TEXT_NODE && 0 === n.endOffset && r3.previousSibling && r3.previousSibling.nodeType === Node.ELEMENT_NODE && (r3 = r3.previousSibling); r3.nodeType !== Node.ELEMENT_NODE && r3.parentNode; ) r3 = r3.parentNode;
              for (var i3 = r3; i3 && "HTML" !== i3.tagName; ) {
                if (i3 === L2.el) return r3;
                i3 = y2(i3).parent()[0];
              }
            }
          } catch (a3) {
          }
          return L2.el;
        }, save: T2, restore: S2, isCollapsed: M2, isFull: function d2() {
          if (M2()) return false;
          L2.selection.save();
          var e, t = L2.el.querySelectorAll("td, th, img, br, iframe");
          for (e = 0; e < t.length; e++) (t[e].nextSibling || "IMG" === t[e].tagName || "IFRAME" === t[e].tagName) && (t[e].innerHTML = '<span class="fr-mk" style="display: none;">&nbsp;</span>'.concat(t[e].innerHTML));
          var n = false, r3 = o2(L2.el);
          for (r3.atStart && r3.atEnd && (n = true), t = L2.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
          return L2.selection.restore(), n;
        }, inEditor: h2, remove: function k() {
          if (M2()) return true;
          var e;
          function t(e2) {
            for (var t2 = e2.previousSibling; t2 && t2.nodeType === Node.TEXT_NODE && 0 === t2.textContent.length; ) {
              var n2 = t2;
              t2 = t2.previousSibling, y2(n2).remove();
            }
            return t2;
          }
          function n(e2) {
            for (var t2 = e2.nextSibling; t2 && t2.nodeType === Node.TEXT_NODE && 0 === t2.textContent.length; ) {
              var n2 = t2;
              t2 = t2.nextSibling, y2(n2).remove();
            }
            return t2;
          }
          T2();
          var r3 = L2.$el.find('.fr-marker[data-type="true"]');
          for (e = 0; e < r3.length; e++) for (var o3 = r3[e]; !(t(o3) || L2.node.isBlock(o3.parentNode) || L2.$el.is(o3.parentNode) || L2.node.hasClass(o3.parentNode, "fr-inner")); ) y2(o3.parentNode).before(o3);
          var i3 = L2.$el.find('.fr-marker[data-type="false"]');
          for (e = 0; e < i3.length; e++) {
            for (var a3 = i3[e]; !(n(a3) || L2.node.isBlock(a3.parentNode) || L2.$el.is(a3.parentNode) || L2.node.hasClass(a3.parentNode, "fr-inner")); ) y2(a3.parentNode).after(a3);
            a3.parentNode && L2.node.isBlock(a3.parentNode) && L2.node.isEmpty(a3.parentNode) && !L2.$el.is(a3.parentNode) && !L2.node.hasClass(a3.parentNode, "fr-inner") && L2.opts.keepFormatOnDelete && y2(a3.parentNode).after(a3);
          }
          if ((function b2() {
            for (var e2 = L2.$el.find(".fr-marker"), t2 = 0; t2 < e2.length; t2++) if (y2(e2[t2]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return false;
            return true;
          })()) {
            !(function E3(e2, t2) {
              var n2 = L2.node.contents(e2.get(0));
              0 <= ["TD", "TH"].indexOf(e2.get(0).tagName) && 1 === e2.find(".fr-marker").length && (L2.node.hasClass(n2[0], "fr-marker") || "BR" == n2[0].tagName && L2.node.hasClass(n2[0].nextElementSibling, "fr-marker")) && e2.attr("data-del-cell", true);
              for (var r4 = 0; r4 < n2.length; r4++) {
                var o4 = n2[r4];
                if ("TABLE" === o4.tagName && w2(o4) && "TABLE" === n2[0].tagName) {
                  var i4 = y2(document.createElement("span")).attr("data-first", "true").attr("data-text", "true");
                  y2(o4)[0].replaceWith(i4[0]);
                }
                L2.node.hasClass(o4, "fr-marker") ? t2 = (t2 + 1) % 2 : t2 ? 0 < y2(o4).find(".fr-marker").length ? t2 = E3(y2(o4), t2) : ["TD", "TH"].indexOf(o4.tagName) < 0 && !L2.node.hasClass(o4, "fr-inner") ? !L2.opts.keepFormatOnDelete || 0 < L2.$el.find("[data-first]").length || L2.node.isVoid(o4) ? y2(o4).remove() : x2(o4) : L2.node.hasClass(o4, "fr-inner") ? 0 === y2(o4).find(".fr-inner").length ? y2(o4).html("<br>") : y2(o4).find(".fr-inner").filter(O2).html("<br>") : (y2(o4).empty(), y2(o4).attr("data-del-cell", true)) : 0 < y2(o4).find(".fr-marker").length && (t2 = E3(y2(o4), t2));
              }
              return t2;
            })(L2.$el, 0);
            var s2 = L2.$el.find('[data-first="true"]');
            if (s2.length) L2.$el.find(".fr-marker").remove(), s2.append(X.INVISIBLE_SPACE + X.MARKERS).removeAttr("data-first"), s2.attr("data-text") && s2.replaceWith(s2.html());
            else for (L2.$el.find("table").filter(function() {
              return 0 < y2(this).find("[data-del-cell]").length && y2(this).find("[data-del-cell]").length === y2(this).find("td, th").length;
            }).remove(), L2.$el.find("[data-del-cell]").removeAttr("data-del-cell"), r3 = L2.$el.find('.fr-marker[data-type="true"]'), e = 0; e < r3.length; e++) {
              var l3 = r3[e], c2 = l3.nextSibling, d2 = L2.$el.find('.fr-marker[data-type="false"][data-id="'.concat(y2(l3).data("id"), '"]')).get(0);
              if (d2) {
                if (l3 && (!c2 || c2 !== d2)) {
                  var f2 = L2.node.blockParent(l3), p3 = L2.node.blockParent(d2), u3 = false, h3 = false;
                  if (f2 && 0 <= ["UL", "OL"].indexOf(f2.tagName) && (u3 = !(f2 = null)), p3 && 0 <= ["UL", "OL"].indexOf(p3.tagName) && (h3 = !(p3 = null)), y2(l3).after(d2), f2 !== p3) if (null !== f2 || u3) if (null !== p3 || h3 || 0 !== y2(f2).parentsUntil(L2.$el, "table").length) f2 && p3 && 0 === y2(f2).parentsUntil(L2.$el, "table").length && 0 === y2(p3).parentsUntil(L2.$el, "table").length && !y2(f2).contains(p3) && !y2(p3).contains(f2) && (y2(f2).append(y2(p3).html()), y2(p3).remove());
                  else {
                    for (c2 = f2; !c2.nextSibling && c2.parentNode !== L2.el; ) c2 = c2.parentNode;
                    for (c2 = c2.nextSibling; c2 && "BR" !== c2.tagName; ) {
                      var g2 = c2.nextSibling;
                      y2(f2).append(c2), c2 = g2;
                    }
                    c2 && "BR" === c2.tagName && y2(c2).remove();
                  }
                  else {
                    var C2 = L2.node.deepestParent(l3);
                    C2 ? (y2(C2).after(y2(p3).html()), y2(p3).remove()) : 0 === y2(p3).parentsUntil(L2.$el, "table").length && (y2(l3).next().after(y2(p3).html()), y2(p3).remove());
                  }
                }
              } else d2 = y2(l3).clone().attr("data-type", false), y2(l3).after(d2);
            }
          }
          L2.$el.find("li:empty").remove(), L2.opts.keepFormatOnDelete || L2.html.fillEmptyBlocks(), L2.html.cleanEmptyTags(true), L2.opts.htmlUntouched || (L2.clean.lists(), L2.$el.find("li:empty").append("<br>"), L2.spaces.normalize());
          var m2 = L2.$el.find(".fr-marker").last().get(0), v2 = L2.$el.find(".fr-marker").first().get(0);
          void 0 !== m2 && void 0 !== v2 && !m2.nextSibling && v2.previousSibling && "BR" === v2.previousSibling.tagName && L2.node.isElement(m2.parentNode) && L2.node.isElement(v2.parentNode) && L2.$el.append("<br>"), S2();
        }, blocks: function g2(e, t) {
          var n, r3, o3 = [], i3 = E2();
          if (h2() && i3.rangeCount) {
            var a3 = p2();
            for (n = 0; n < a3.length; n++) {
              var s2 = a3[n], l3 = u2(s2.startContainer, s2.startOffset), c2 = u2(s2.endContainer, s2.endOffset);
              (r3 = L2.node.blockParent(l3)) && o3.indexOf(r3) < 0 && o3.push(r3), (L2.node.isBlock(l3) || L2.node.hasClass(l3, "fr-inner")) && o3.indexOf(l3) < 0 && o3.push(l3);
              for (var d2 = [], f2 = l3; f2 !== c2 && f2 !== L2.el; ) d2.indexOf(f2) < 0 && f2.children && f2.children.length ? (d2.push(f2), f2 = f2.children[0]) : f2.nextSibling ? f2 = f2.nextSibling : f2.parentNode && (f2 = f2.parentNode, d2.push(f2)), L2.node.isBlock(f2) && d2.indexOf(f2) < 0 && o3.indexOf(f2) < 0 && (f2 !== c2 || 0 < s2.endOffset) && o3.push(f2);
              L2.node.isBlock(c2) && o3.indexOf(c2) < 0 && 0 < s2.endOffset && o3.push(c2), (r3 = L2.node.blockParent(c2)) && o3.indexOf(r3) < 0 && o3.push(r3);
            }
          }
          for (n = o3.length - 1; 0 < n; n--) if (y2(o3[n - 1]).contains(o3[n])) {
            if (e && y2(o3[n]).find("ul, ol").length) continue;
            if (t && "LI" == o3[n - 1].tagName) continue;
            o3.splice(n - 1, 1);
          } else if (y2(o3[n]).contains(o3[n - 1])) {
            if (e && y2(o3[n]).find("ul, ol").length) continue;
            o3.splice(n, 1);
          }
          return o3;
        }, info: o2, setAtEnd: i2, setAtStart: r2, setBefore: function f2(e, t) {
          void 0 === t && (t = true);
          for (var n = e.previousSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length; ) n = n.previousSibling;
          return n ? (L2.node.isBlock(n) ? i2(n) : "BR" === n.tagName ? y2(n).before(X.MARKERS) : y2(n).after(X.MARKERS), true) : !!t && (L2.node.isBlock(e) ? r2(e) : y2(e).before(X.MARKERS), true);
        }, setAfter: function C2(e, t) {
          void 0 === t && (t = true);
          for (var n = e.nextSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length; ) n = n.nextSibling;
          return n ? (L2.node.isBlock(n) ? r2(n) : y2(n).before(X.MARKERS), true) : !!t && (L2.node.isBlock(e) ? i2(e) : y2(e).after(X.MARKERS), true);
        }, rangeElement: u2 };
      }, Object.assign(X.DEFAULTS, { language: null }), X.LANGUAGE = {}, X.MODULES.language = function(e) {
        var t;
        return { _init: function n() {
          X.LANGUAGE && (t = X.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction);
        }, translate: function r2(e2) {
          return t && t.translation[e2] && t.translation[e2].length ? t.translation[e2] : e2;
        } };
      }, Object.assign(X.DEFAULTS, { placeholderText: "Type something" }), X.MODULES.placeholder = function(h2) {
        var g2 = h2.$;
        function e() {
          h2.$placeholder || (function u2() {
            h2.$placeholder = g2(h2.doc.createElement("SPAN")).addClass("fr-placeholder"), h2.$wp.append(h2.$placeholder);
          })();
          var e2 = h2.opts.iframe ? h2.$iframe.prev().outerHeight(true) : h2.$el.prev().outerHeight(true), t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = h2.node.contents(h2.el), l2 = h2.selection.element(), c2 = g2(l2).css("text-align");
          if (s2.length && s2[0].nodeType === Node.ELEMENT_NODE) {
            var d2 = g2(s2[0]);
            (0 < h2.$wp.prev().length || 0 < h2.$el.prev().length) && h2.ready && (t2 = h2.helpers.getPX(d2.css("margin-top")), o2 = h2.helpers.getPX(d2.css("padding-top")), n2 = h2.helpers.getPX(d2.css("margin-left")), r2 = h2.helpers.getPX(d2.css("margin-right")), i2 = h2.helpers.getPX(d2.css("padding-left")), a2 = h2.helpers.getPX(d2.css("padding-right")));
            var f2 = d2.children().first(), p2 = l2 === h2.el ? f2.length ? f2 : d2 : g2(l2);
            h2.$placeholder.css("font-size", p2.css("font-size")), h2.$placeholder.css("line-height", p2.css("line-height")), h2.$placeholder.css("font-family", p2.css("font-family"));
          } else h2.$placeholder.css("font-size", h2.$el.css("font-size")), h2.$placeholder.css("line-height", h2.$el.css("line-height")), h2.$placeholder.css("font-family", h2.$el.css("font-family"));
          h2.$wp.addClass("show-placeholder"), h2.$placeholder.css({ marginTop: Math.max(h2.helpers.getPX(h2.$el.css("margin-top")), t2) + (e2 || 0), paddingTop: Math.max(h2.helpers.getPX(h2.$el.css("padding-top")), o2), paddingLeft: Math.max(h2.helpers.getPX(h2.$el.css("padding-left")), i2), marginLeft: Math.max(h2.helpers.getPX(h2.$el.css("margin-left")), n2), paddingRight: Math.max(h2.helpers.getPX(h2.$el.css("padding-right")), a2), marginRight: Math.max(h2.helpers.getPX(h2.$el.css("margin-right")), r2), textAlign: c2 }).text(h2.language.translate(h2.opts.placeholderText || h2.$oel.attr("placeholder") || "")), h2.$placeholder.html(h2.$placeholder.text().replace(/\n/g, "<br>"));
        }
        function t() {
          h2.$wp.removeClass("show-placeholder");
        }
        function n() {
          if (!h2.$wp) return false;
          h2.core.isEmpty() ? e() : t();
        }
        return { _init: function r2() {
          if (!h2.$wp) return false;
          h2.events.on("init input keydown keyup contentChanged initialized", n);
        }, show: e, hide: t, refresh: n, isVisible: function o2() {
          return !h2.$wp || h2.node.hasClass(h2.$wp.get(0), "show-placeholder");
        } };
      }, X.UNICODE_NBSP = String.fromCharCode(160), X.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], X.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], Object.assign(X.DEFAULTS, { htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line", "hr"], htmlDoNotWrapTags: ["script", "style"], htmlSimpleAmpersand: false, htmlIgnoreCSSProperties: [], htmlExecuteScripts: true }), X.MODULES.html = function(w2) {
        var b2 = w2.$;
        function E2() {
          return w2.opts.enter === X.ENTER_P ? "p" : w2.opts.enter === X.ENTER_DIV ? "div" : w2.opts.enter === X.ENTER_BR ? null : void 0;
        }
        function s2(e2, t2) {
          return !(!e2 || e2 === w2.el) && (t2 ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e2.tagName) || s2(e2.parentNode, t2) : -1 !== ["PRE", "SCRIPT", "STYLE"].indexOf(e2.tagName));
        }
        function i2(e2) {
          var t2, n2 = [], r3 = [];
          if (e2) {
            var o3 = w2.el.querySelectorAll(".fr-marker");
            for (t2 = 0; t2 < o3.length; t2++) {
              var i3 = w2.node.blockParent(o3[t2]) || o3[t2];
              if (i3) {
                var a3 = i3.nextSibling, s3 = i3.previousSibling;
                i3 && r3.indexOf(i3) < 0 && w2.node.isBlock(i3) && r3.push(i3), s3 && w2.node.isBlock(s3) && r3.indexOf(s3) < 0 && r3.push(s3), a3 && w2.node.isBlock(a3) && r3.indexOf(a3) < 0 && r3.push(a3);
              }
            }
          } else r3 = w2.el.querySelectorAll(p2());
          var l3 = p2();
          for (l3 += ",".concat(X.VOID_ELEMENTS.join(",")), l3 += ", .fr-inner", l3 += ",".concat(w2.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)"), t2 = r3.length - 1; 0 <= t2; t2--) if (!(r3[t2].textContent && 0 < r3[t2].textContent.replace(/\u200B|\n/g, "").length || 0 < r3[t2].querySelectorAll(l3).length)) {
            for (var c3 = w2.node.contents(r3[t2]), d3 = false, f3 = 0; f3 < c3.length; f3++) if (c3[f3].nodeType !== Node.COMMENT_NODE && c3[f3].textContent && 0 < c3[f3].textContent.replace(/\u200B|\n/g, "").length) {
              d3 = true;
              break;
            }
            d3 || n2.push(r3[t2]);
          }
          return n2;
        }
        function p2() {
          return X.BLOCK_TAGS.join(", ");
        }
        function e(e2) {
          var t2, n2, r3 = b2.merge([], X.VOID_ELEMENTS);
          r3 = b2.merge(r3, w2.opts.htmlAllowedEmptyTags), r3 = void 0 === e2 ? b2.merge(r3, X.BLOCK_TAGS) : b2.merge(r3, X.NO_DELETE_TAGS), t2 = w2.el.querySelectorAll("*:empty:not(".concat(r3.join("):not("), "):not(.fr-marker):not(template)"));
          do {
            n2 = false;
            for (var o3 = 0; o3 < t2.length; o3++) 0 !== t2[o3].attributes.length && void 0 === t2[o3].getAttribute("href") || (t2[o3].parentNode.removeChild(t2[o3]), n2 = true);
            (t2 = w2.el.querySelectorAll("*:empty:not(".concat(r3.join("):not("), "):not(.fr-marker):not(template)"))).length || (t2 = w2.el.querySelectorAll("a[href]:not([name]):empty"));
          } while (t2.length && n2);
        }
        function a2(e2, t2) {
          var n2 = E2();
          if (t2 && (n2 = "div"), n2) {
            var r3 = w2.doc.createDocumentFragment(), o3 = null, i3 = false, a3 = e2.firstChild, s3 = false, l3 = null, c3 = w2.selection.ranges(), d3 = null, f3 = null, p3 = null;
            if (c3.length) {
              d3 = c3[0].endContainer, f3 = c3[0].startOffset, p3 = c3[0].endOffset;
              var u3 = c3[0].startContainer;
              u3.nodeType === Node.ELEMENT_NODE && ("TD" === u3.tagName || "TH" === u3.tagName) && u3.childNodes && u3.childNodes.length > f3 + 1 && u3.childNodes[f3 + 1] === d3 && (f3 = 0);
            }
            for (var h3 = false, g3 = function g4(e3, t3) {
              e3 === d3 ? (h3 = true, l3 = t3.lastChild) : 0 <= Array.from(e3.childNodes).indexOf(d3) && (h3 = true, l3 = t3.lastChild.childNodes[Array.from(e3.childNodes).indexOf(d3)]);
            }; a3; ) {
              var C3 = a3.nextSibling;
              if (a3.nodeType === Node.ELEMENT_NODE && (w2.node.isBlock(a3) || 0 <= w2.opts.htmlDoNotWrapTags.indexOf(a3.tagName.toLowerCase()) && !w2.node.hasClass(a3, "fr-marker"))) o3 = null, r3.appendChild(a3.cloneNode(true));
              else if (a3.nodeType !== Node.ELEMENT_NODE && a3.nodeType !== Node.TEXT_NODE) o3 = null, r3.appendChild(a3.cloneNode(true));
              else if ("BR" === a3.tagName) null === o3 ? (o3 = w2.doc.createElement(n2), s3 = true, t2 && (o3.setAttribute("class", "fr-temp-div"), o3.setAttribute("data-empty", true)), o3.appendChild(a3.cloneNode(true)), a3 && a3.parentNode && ["TD", "TH"].indexOf(a3.parentNode.tagName) < 0 && r3.appendChild(o3)) : false === i3 && (o3.appendChild(w2.doc.createElement("br")), t2 && (o3.setAttribute("class", "fr-temp-div"), o3.setAttribute("data-empty", true))), o3 = null;
              else {
                var m3 = a3.textContent;
                if (a3.nodeType !== Node.TEXT_NODE || 0 < m3.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || m3.replace(/(^ *)|( *$)/g, "").length && m3.indexOf("\n") < 0) {
                  if ("SPAN" === a3.tagName && b2(a3).hasClass("fr-marker") && !a3.previousSibling && (a3.nextSibling && "TABLE" == a3.nextSibling.tagName || a3.nextSibling && a3.nextSibling.nextSibling && "TABLE" == a3.nextSibling.nextSibling.tagName)) {
                    r3.appendChild(a3), g3(a3, r3), a3 = C3;
                    continue;
                  }
                  if ("SPAN" === a3.tagName && b2(a3).hasClass("fr-marker") && a3.previousSibling && a3.previousSibling.nodeType === Node.ELEMENT_NODE && (a3.nextSibling && "TABLE" == a3.nextSibling.tagName || a3.nextSibling && a3.nextSibling.nextSibling && "TABLE" == a3.nextSibling.nextSibling.tagName)) {
                    r3.appendChild(a3), s3 = true, g3(a3, r3), a3 = C3;
                    continue;
                  }
                  null === o3 && (o3 = w2.doc.createElement(n2), s3 = true, t2 && o3.setAttribute("class", "fr-temp-div"), r3.appendChild(o3), i3 = false), o3.appendChild(a3.cloneNode(true)), i3 || w2.node.hasClass(a3, "fr-marker") || a3.nodeType === Node.TEXT_NODE && 0 === m3.replace(/ /g, "").length || (i3 = true), g3(a3, o3);
                } else s3 = true;
              }
              a3 = C3;
            }
            if (s3 && (e2.innerHTML = "", e2.appendChild(r3), h3)) {
              var v3 = w2.doc.createRange();
              w2.selection.get().removeAllRanges(), v3.setStart(l3, f3), v3.setEnd(l3, p3), w2.selection.get().addRange(v3);
            }
          }
        }
        function l2(e2, t2) {
          for (var n2 = e2.length - 1; 0 <= n2; n2--) a2(e2[n2], t2);
        }
        function t(e2, t2, n2, r3, o3) {
          if (!w2.$wp) return false;
          void 0 === e2 && (e2 = false), void 0 === t2 && (t2 = false), void 0 === n2 && (n2 = false), void 0 === r3 && (r3 = false), void 0 === o3 && (o3 = false);
          var i3 = w2.$wp.scrollTop();
          a2(w2.el, e2), r3 && l2(w2.el.querySelectorAll(".fr-inner"), e2), t2 && l2(w2.el.querySelectorAll("td, th"), e2), n2 && l2(w2.el.querySelectorAll("blockquote"), e2), o3 && l2(w2.el.querySelectorAll("li"), e2), i3 !== w2.$wp.scrollTop() && w2.$wp.scrollTop(i3);
        }
        function n(e2) {
          if (void 0 === e2 && (e2 = w2.el), e2 && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e2.tagName)) return false;
          for (var t2 = w2.doc.createTreeWalker(e2, NodeFilter.SHOW_TEXT, w2.node.filter(function(e3) {
            return null !== e3.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g);
          }), false); t2.nextNode(); ) {
            var n2 = t2.currentNode;
            if (!s2(n2.parentNode, true)) {
              var r3 = w2.node.isBlock(n2.parentNode) || w2.node.isElement(n2.parentNode), o3 = void 0;
              if (o3 = w2.opts.preserveTabSpaces ? n2.textContent.replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ") : n2.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " "), r3) {
                var i3 = n2.previousSibling, a3 = n2.nextSibling;
                i3 && a3 && " " === o3 ? o3 = w2.node.isBlock(i3) && w2.node.isBlock(a3) ? "" : " " : (i3 || (o3 = o3.replace(/^ */, "")), a3 || (o3 = o3.replace(/ *$/, "")));
              }
              n2.textContent = o3;
            }
          }
        }
        function r2(e2, t2, n2) {
          var r3 = new RegExp(t2, "gi").exec(e2);
          return r3 ? r3[n2] : null;
        }
        function k(e2) {
          var t2 = e2.doctype, n2 = "<!DOCTYPE html>";
          return t2 && (n2 = "<!DOCTYPE ".concat(t2.name).concat(t2.publicId ? ' PUBLIC "'.concat(t2.publicId, '"') : "").concat(!t2.publicId && t2.systemId ? " SYSTEM" : "").concat(t2.systemId ? ' "'.concat(t2.systemId, '"') : "", ">")), n2;
        }
        function c2(e2) {
          var t2 = e2.parentNode;
          if (t2 && (w2.node.isBlock(t2) || w2.node.isElement(t2)) && ["TD", "TH"].indexOf(t2.tagName) < 0) {
            for (var n2 = e2.previousSibling, r3 = e2.nextSibling; n2 && (n2.nodeType === Node.TEXT_NODE && 0 === n2.textContent.replace(/\n|\r/g, "").length || w2.node.hasClass(n2, "fr-tmp")); ) n2 = n2.previousSibling;
            if (r3) return false;
            n2 && t2 && "BR" !== n2.tagName && !w2.node.isBlock(n2) && !r3 && 0 < t2.textContent.replace(/\u200B/g, "").length && 0 < n2.textContent.length && !w2.node.hasClass(n2, "fr-marker") && (w2.el === t2 && !r3 && w2.opts.enter === X.ENTER_BR && w2.browser.msie || e2.parentNode.removeChild(e2));
          } else !t2 || w2.node.isBlock(t2) || w2.node.isElement(t2) || e2.previousSibling || e2.nextSibling || !w2.node.isDeletable(e2.parentNode) || c2(e2.parentNode);
        }
        function h2() {
          w2.opts.htmlUntouched || (e(), t(), n(), w2.spaces.normalize(null, true), w2.html.fillEmptyBlocks(), w2.clean.lists(), w2.clean.tables(), w2.clean.toHTML5(), w2.html.cleanBRs()), (function s3(e2) {
            if (e2 && e2.isContentEditable && !w2.node.isEmpty(e2)) {
              var t2 = document.createTreeWalker(e2, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: function(e3) {
                if (e3.nodeType === Node.TEXT_NODE) return e3.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                if (e3.nodeType !== Node.ELEMENT_NODE) return NodeFilter.FILTER_SKIP;
                var t3 = window.getComputedStyle(e3);
                return "none" !== t3.display && "hidden" !== t3.visibility ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
              } }), n2 = null, r3 = true, o3 = t2.nextNode();
              if (o3 && o3.nodeType !== Node.TEXT_NODE) {
                do {
                  if (o3.nodeType === Node.ELEMENT_NODE && o3.isContentEditable && (o3.textContent.trim().length || ["IMG", "BR", "HR"].includes(o3.tagName) || b2(o3).find("img, br, hr").length)) {
                    if (r3) break;
                    n2 = o3;
                    break;
                  }
                  r3 = false;
                } while (o3 = t2.nextNode());
                if (!r3) {
                  var i3 = w2.doc.createRange(), a3 = w2.selection.get();
                  n2 ? i3.selectNodeContents(n2) : (n2 = document.createTextNode("​"), e2.appendChild(n2), i3.setStart(n2, 0)), i3.collapse(true), a3.removeAllRanges(), a3.addRange(i3);
                }
              }
            }
          })(w2.el), w2.selection.restore(), o2(), w2.placeholder.refresh();
        }
        function o2() {
          w2.node.isEmpty(w2.el) && (null !== E2() ? w2.el.querySelector(p2()) || w2.el.querySelector("".concat(w2.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || (w2.core.hasFocus() ? (w2.$el.html("<".concat(E2(), ">").concat(X.MARKERS, "<br/></").concat(E2(), ">")), w2.selection.restore()) : w2.$el.html("<".concat(E2(), "><br/></").concat(E2(), ">"))) : w2.el.querySelector("*:not(.fr-marker):not(br)") || (w2.core.hasFocus() ? (w2.$el.html("".concat(X.MARKERS, "<br/>")), w2.selection.restore()) : w2.$el.html("<br/>")));
        }
        function g2(e2, t2) {
          return r2(e2, "<".concat(t2, "[^>]*?>([\\w\\W]*)</").concat(t2, ">"), 1);
        }
        function C2(e2, t2) {
          var n2 = b2("<div ".concat(r2(e2, "<".concat(t2, "([^>]*?)>"), 1) || "", ">"));
          return w2.node.rawAttributes(n2.get(0));
        }
        function m2(e2) {
          return (r2(e2, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ");
        }
        function v2(e2, t2) {
          w2.opts.htmlExecuteScripts ? e2.html(t2) : e2.get(0).innerHTML = t2;
        }
        function $(e2) {
          var t2;
          (t2 = /:not\(([^)]*)\)/g).test(e2) && (e2 = e2.replace(t2, "     $1 "));
          var n2 = 100 * (e2.match(/(#[^\s+>~.[:]+)/g) || []).length + 10 * (e2.match(/(\[[^]]+\])/g) || []).length + 10 * (e2.match(/(\.[^\s+>~.[:]+)/g) || []).length + 10 * (e2.match(/(:[\w-]+\([^)]*\))/gi) || []).length + 10 * (e2.match(/(:[^\s+>~.[:]+)/g) || []).length + (e2.match(/(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
          return n2 += ((e2 = (e2 = e2.replace(/[*\s+>~]/g, " ")).replace(/[#.]/g, " ")).match(/([^\s+>~.[:]+)/g) || []).length;
        }
        function D(e2) {
          if (w2.events.trigger("html.processGet", [e2]), e2 && e2.getAttribute && "" === e2.getAttribute("class") && e2.removeAttribute("class"), e2 && e2.getAttribute && "" === e2.getAttribute("style") && e2.removeAttribute("style"), e2 && e2.nodeType === Node.ELEMENT_NODE) {
            var t2, n2 = e2.querySelectorAll('[class=""],[style=""]');
            for (t2 = 0; t2 < n2.length; t2++) {
              var r3 = n2[t2];
              "" === r3.getAttribute("class") && r3.removeAttribute("class"), "" === r3.getAttribute("style") && r3.removeAttribute("style");
            }
            if ("BR" === e2.tagName) c2(e2);
            else {
              var o3 = e2.querySelectorAll("br");
              for (t2 = 0; t2 < o3.length; t2++) c2(o3[t2]);
            }
          }
        }
        function B(e2, t2) {
          return e2[3] - t2[3];
        }
        function H() {
          for (var e2 = w2.el.querySelectorAll("input, textarea"), t2 = 0; t2 < e2.length; t2++) "checkbox" !== e2[t2].type && "radio" !== e2[t2].type || (e2[t2].checked ? e2[t2].setAttribute("checked", e2[t2].checked) : w2.$(e2[t2]).removeAttr("checked")), e2[t2].getAttribute("value") && e2[t2].setAttribute("value", e2[t2].value);
        }
        function u2(e2) {
          var t2 = w2.doc.createElement("div");
          return t2.innerHTML = e2, null !== t2.querySelector(p2());
        }
        function d2(e2) {
          var t2 = null;
          if (void 0 === e2 && (t2 = w2.selection.element()), w2.opts.keepFormatOnDelete) return false;
          var n2, r3, o3 = t2 ? (t2.textContent.match(/\u200B/g) || []).length - t2.querySelectorAll(".fr-marker").length : 0;
          if ((w2.el.textContent.match(/\u200B/g) || []).length - w2.el.querySelectorAll(".fr-marker").length === o3) return false;
          do {
            r3 = false, n2 = w2.el.querySelectorAll("*:not(.fr-marker)");
            for (var i3 = 0; i3 < n2.length; i3++) {
              var a3 = n2[i3];
              if (t2 !== a3) {
                var s3 = a3.textContent;
                0 === a3.children.length && 1 === s3.length && 8203 === s3.charCodeAt(0) && ["TD", "STRONG", "SPAN", "EM", "U", "S", "SUB", "SUP"].indexOf(a3.tagName) < 0 && (b2(a3).remove(), r3 = true);
              }
            }
          } while (r3);
        }
        function f2() {
          d2(), w2.placeholder && setTimeout(w2.placeholder.refresh, 0);
        }
        function L2() {
          return w2.opts.fontSizeDefaultSelection && w2.opts.fontSizeUnit && "Font Size" != w2.opts.fontSizeDefaultSelection;
        }
        function y2() {
          return w2.opts.fontFamilyDefaultSelection && "Font Family" != w2.opts.fontFamilyDefaultSelection;
        }
        function N2(e2) {
          var t2 = w2.selection.element(), n2 = t2.getAttribute("style") || "";
          !w2.node.isEmpty(t2) && !e2 || w2.markdown && w2.markdown.isEnabled() || t2 == w2.el && w2.opts.enter != X.ENTER_BR || (L2() && !n2.includes("font-size") && w2.fontSize && w2.fontSize.apply(w2.opts.fontSizeDefaultSelection + w2.opts.fontSizeUnit), y2() && !n2.includes("font-family") && w2.fontFamily && w2.fontFamily.apply(w2.opts.fontFamilyDefaultSelection), w2.placeholder.refresh());
        }
        function T2(e2) {
          var t2 = e2.which;
          if (w2.keys.ctrlKey(e2) || 37 <= t2 && t2 <= 40 || !w2.keys.isCharacter(t2) && t2 !== X.KEYCODE.DELETE && t2 !== X.KEYCODE.BACKSPACE && t2 !== X.KEYCODE.ENTER && t2 !== X.KEYCODE.IME) return true;
          var n2 = w2.selection.element();
          if (!(0 <= ["UL", "OL"].indexOf(n2.tagName))) {
            var r3 = "LI" === n2.tagName ? b2(n2) : b2(n2).parents("li").first();
            if (r3.length) {
              var o3 = r3.get(0), i3 = w2.node.isEmpty(o3), a3 = !r3.siblings().last().length, s3 = r3.parents("ul, ol"), l3 = s3.first().get(0) === s3.last().get(0);
              if (i3 && a3 && l3) {
                if (t2 === X.KEYCODE.BACKSPACE) return void requestAnimationFrame(function() {
                  w2.cursor.backspace(), N2();
                });
                L2() && r3.css("font-size", w2.opts.fontSizeDefaultSelection + w2.opts.fontSizeUnit), y2() && r3.css("font-family", w2.opts.fontFamilyDefaultSelection);
              }
            } else if (t2 !== X.KEYCODE.BACKSPACE && t2 !== X.KEYCODE.DELETE) {
              var c3 = w2.selection.get();
              if (c3.baseOffset !== c3.focusOffset && !w2.keys.ctrlKey(e2) && w2.keys.isCharacter(e2.which) && !w2.selection.isCollapsed() && !e2.ctrlKey && !e2.altKey) return w2.selection.remove(), void N2();
              var d3 = ["TD", "TH"].includes(n2.tagName) || n2.parentElement && ["TD", "TH"].includes(n2.parentElement.tagName);
              (u2(n2) || d3 || "BR" == n2.tagName) && N2();
            } else {
              var f3 = w2.selection.isFull();
              requestAnimationFrame(function() {
                var e3 = w2.node.deepestParent(n2);
                (e3 && w2.node.isEmpty(e3) || f3) && N2();
              });
            }
          }
        }
        function S2() {
          w2.node.isEmpty(w2.el) && (w2.selection.setAtStart(w2.el), N2(), w2.markers.remove(), w2.placeholder.refresh());
        }
        function A2() {
          var e2 = b2(w2.selection.element());
          w2.selection.text() && !e2.attr("style") && (N2(true), x2(w2.selection.ranges(0).endContainer));
        }
        function M2() {
          0 < b2(w2.selection.element()).filter("td, tr").length && N2(true), x2(w2.selection.ranges(0).endContainer);
        }
        function x2(e2) {
          var t2 = w2.doc.createRange();
          t2.selectNodeContents(e2), t2.collapse(false);
          var n2 = w2.selection.get();
          n2.removeAllRanges(), n2.addRange(t2);
        }
        function O2(e2) {
          var t2 = new DOMParser().parseFromString(e2, "text/html");
          return Array.from(t2.body.childNodes).some(function(e3) {
            return 1 === e3.nodeType;
          });
        }
        function R2(e2) {
          var t2 = /^<([a-z1-6]+)(\s[^>]*)?>[\s\S]*<\/\1>$|^<([a-z1-6]+)(\s[^>]*)?\/?>$/.test(e2.trim()), n2 = !(!e2 || 0 === e2.trim().length) && O2(e2) && t2 && u2(e2), r3 = w2.selection.element();
          if (e2 && !/<[^>]+style=["'][^"']*(font-(size|family))[^"']*["']/.test(e2) && (w2.node.isEmpty(r3) || w2.selection.isFull()) && !b2(r3).parents("ol, ul").length) return n2 ? e2.replace(/^<([^>]+)>/, "<$1>".concat(X.START_MARKER)).replace(/<\/([^>]+)>$/, "".concat(X.END_MARKER, "</$1>")) : X.START_MARKER + e2 + X.END_MARKER;
        }
        function _() {
          setTimeout(N2, 0);
        }
        return { defaultTag: E2, isPreformatted: s2, emptyBlocks: i2, emptyBlockTagsQuery: function V() {
          return "".concat(X.BLOCK_TAGS.join(":empty, "), ":empty");
        }, blockTagsQuery: p2, fillEmptyBlocks: function I(e2) {
          var t2 = i2(e2);
          w2.node.isEmpty(w2.el) && w2.opts.enter === X.ENTER_BR && t2.push(w2.el);
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r3 = t2[n2];
            "false" === r3.getAttribute("contenteditable") || r3.querySelector("".concat(w2.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || w2.node.isVoid(r3) || "TABLE" === r3.tagName || "TBODY" === r3.tagName || "TR" === r3.tagName || "UL" === r3.tagName || "OL" === r3.tagName || r3.querySelector("br") || r3.appendChild(w2.doc.createElement("br"));
          }
          if (w2.browser.msie && w2.opts.enter === X.ENTER_BR) {
            var o3 = w2.node.contents(w2.el);
            o3.length && o3[o3.length - 1].nodeType === Node.TEXT_NODE && w2.$el.append("<br>");
          }
        }, cleanEmptyTags: e, cleanWhiteTags: d2, cleanBlankSpaces: n, blocks: function P() {
          return w2.$el.get(0).querySelectorAll(p2());
        }, getDoctype: k, set: function z(e2) {
          var t2 = w2.clean.html((e2 || "").trim(), [], [], w2.opts.fullPage);
          !y2() && !L2() || O2(t2) || (t2 = X.START_MARKER + t2 + X.END_MARKER);
          var n2 = new RegExp("%3A//", "g"), r3 = t2.replace(n2, "://");
          if (w2.opts.fullPage) {
            var o3 = g2(r3, "body") || (0 <= r3.indexOf("<body") ? "" : r3), i3 = C2(r3, "body"), a3 = g2(r3, "head") || "<title></title>", s3 = C2(r3, "head"), l3 = b2("<div>");
            l3.append(a3).contents().each(function() {
              (this.nodeType === Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this);
            });
            var c3 = l3.html().trim();
            a3 = b2("<div>").append(a3).contents().map(function() {
              return this.nodeType === Node.COMMENT_NODE ? "<!--".concat(this.nodeValue, "-->") : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : "";
            }).toArray().join("");
            var d3 = m2(r3), f3 = C2(r3, "html");
            v2(w2.$el, "".concat(c3, "\n").concat(o3)), w2.node.clearAttributes(w2.el), w2.$el.attr(i3), w2.$el.addClass("fr-view"), w2.$el.attr("spellcheck", w2.opts.spellcheck), w2.$el.attr("dir", w2.opts.direction), v2(w2.$head, a3), w2.node.clearAttributes(w2.$head.get(0)), w2.$head.attr(s3), w2.node.clearAttributes(w2.$html.get(0)), w2.$html.attr(f3), w2.iframe_document.doctype.parentNode.replaceChild((function u3(e3, t3) {
              var n3 = e3.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
              return n3 ? t3.implementation.createDocumentType(n3[1], n3[3], n3[4]) : t3.implementation.createDocumentType("html");
            })(d3, w2.iframe_document), w2.iframe_document.doctype);
          } else v2(w2.$el, r3);
          var p3 = w2.edit.isDisabled();
          w2.edit.on(), w2.core.injectStyle(w2.opts.iframeDefaultStyle + w2.opts.iframeStyle), h2(), w2.opts.useClasses || (w2.$el.find("[fr-original-class]").each(function() {
            this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class");
          }), w2.$el.find("[fr-original-style]").each(function() {
            this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style");
          })), p3 && w2.edit.off(), w2.events.trigger("html.set"), w2.events.trigger("charCounter.update"), w2.events.trigger("wordCounter.update");
        }, syncInputs: H, get: function Z(e2, t2) {
          if (!w2.$wp) return w2.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
          var n2 = "";
          w2.events.trigger("html.beforeGet");
          var r3, o3, i3 = [], a3 = {}, s3 = [];
          if (H(), !w2.opts.useClasses && !t2) {
            var l3 = new RegExp("^".concat(w2.opts.htmlIgnoreCSSProperties.join("$|^"), "$"), "gi");
            for (r3 = 0; r3 < w2.doc.styleSheets.length; r3++) {
              var c3 = void 0, d3 = 0;
              try {
                c3 = w2.doc.styleSheets[r3].cssRules, w2.doc.styleSheets[r3].ownerNode && "STYLE" === w2.doc.styleSheets[r3].ownerNode.nodeType && (d3 = 1);
              } catch (O3) {
              }
              if (c3) {
                for (var f3 = 0, p3 = c3.length; f3 < p3; f3++) if (c3[f3].selectorText && 0 < c3[f3].style.cssText.length) {
                  var u3 = c3[f3].selectorText.replace(/body \s tbody \.fr-view /g, "").replace(/::/g, ":"), h3 = void 0;
                  try {
                    h3 = w2.el.querySelectorAll(u3);
                  } catch (O3) {
                    h3 = [];
                  }
                  for (o3 = 0; o3 < h3.length; o3++) {
                    !h3[o3].getAttribute("fr-original-style") && h3[o3].getAttribute("style") ? (h3[o3].setAttribute("fr-original-style", h3[o3].getAttribute("style")), i3.push(h3[o3])) : h3[o3].getAttribute("fr-original-style") || (h3[o3].setAttribute("fr-original-style", ""), i3.push(h3[o3])), a3[h3[o3]] || (a3[h3[o3]] = {});
                    for (var g3 = 1e3 * d3 + $(c3[f3].selectorText), C3 = c3[f3].style.cssText.split(";"), m3 = 0; m3 < C3.length; m3++) {
                      var v3 = C3[m3].trim().split(":")[0];
                      if (v3 && !v3.match(l3) && ((!a3[h3[o3]][v3] || a3[h3[o3]][v3] && "" == h3[o3].getAttribute("fr-original-style")) && (a3[h3[o3]][v3] = 0) <= (h3[o3].getAttribute("fr-original-style") || "").indexOf("".concat(v3, ":")) && (a3[h3[o3]][v3] = 1e4), g3 >= a3[h3[o3]][v3] && (a3[h3[o3]][v3] = g3, C3[m3].trim().length))) {
                        var b3 = C3[m3].trim().split(":");
                        b3.splice(0, 1);
                        var E3 = b3.join(":").trim();
                        -1 < E3.indexOf("!important") && (g3 += 1), s3.push([h3[o3], v3.trim(), E3, g3]);
                      }
                    }
                  }
                }
              }
            }
            for (s3.sort(B), r3 = 0; r3 < s3.length; r3++) {
              var L3 = s3[r3];
              L3[0].style[L3[1]] = L3[2].replace(/!important/, "");
            }
            for (r3 = 0; r3 < i3.length; r3++) if (i3[r3].getAttribute("class") && (i3[r3].setAttribute("fr-original-class", i3[r3].getAttribute("class")), i3[r3].removeAttribute("class")), 0 < (i3[r3].getAttribute("fr-original-style") || "").trim().length) {
              var y3 = i3[r3].getAttribute("fr-original-style").split(";");
              for (o3 = 0; o3 < y3.length; o3++) if (0 < y3[o3].indexOf(":")) {
                var N3 = y3[o3].split(":"), T3 = N3[0];
                N3.splice(0, 1), i3[r3].style[T3.trim()] = N3.join(":").trim();
              }
            }
          }
          if (w2.node.isEmpty(w2.el)) w2.opts.fullPage && (n2 = k(w2.iframe_document), n2 += "<html".concat(w2.node.attributes(w2.$html.get(0)), ">").concat(w2.$html.find("head").get(0).outerHTML, "<body></body></html>"));
          else if (void 0 === e2 && (e2 = false), w2.opts.fullPage) {
            n2 = k(w2.iframe_document), w2.$el.removeClass("fr-view");
            var S3 = w2.opts.heightMin, A3 = w2.opts.height, M3 = w2.opts.heightMax;
            w2.opts.heightMin = null, w2.opts.height = null, w2.opts.heightMax = null, w2.size.refresh(), n2 += "<html".concat(w2.node.attributes(w2.$html.get(0)), ">").concat(w2.$html.html(), "</html>"), w2.opts.iframe && w2.$html && 0 < w2.$html.find(".fr-element").length && (n2 = w2.$html.find(".fr-element").html()), w2.opts.heightMin = S3, w2.opts.height = A3, w2.opts.heightMax = M3, w2.size.refresh(), w2.$el.addClass("fr-view");
          } else n2 = w2.$el.html(), w2.opts.iframe && w2.$html && 0 < w2.$html.find(".fr-element").length && (n2 = w2.$html.find(".fr-element").html());
          if (!w2.opts.useClasses && !t2) for (r3 = 0; r3 < i3.length; r3++) i3[r3].getAttribute("fr-original-class") && (i3[r3].setAttribute("class", i3[r3].getAttribute("fr-original-class")), i3[r3].removeAttribute("fr-original-class")), null !== i3[r3].getAttribute("fr-original-style") && void 0 !== i3[r3].getAttribute("fr-original-style") ? (0 !== i3[r3].getAttribute("fr-original-style").length ? i3[r3].setAttribute("style", i3[r3].getAttribute("fr-original-style")) : i3[r3].removeAttribute("style"), i3[r3].removeAttribute("fr-original-style")) : i3[r3].removeAttribute("style");
          w2.opts.fullPage && (n2 = (n2 = (n2 = (n2 = (n2 = (n2 = (n2 = (n2 = n2.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), w2.opts.htmlSimpleAmpersand && (n2 = n2.replace(/&amp;/gi, "&")), w2.events.trigger("html.afterGet"), e2 || (n2 = n2.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n2 = w2.clean.invisibleSpaces(n2), n2 = w2.clean.exec(n2, D);
          var x3 = w2.events.chainTrigger("html.get", n2);
          return "string" == typeof x3 && (n2 = x3), n2 = (n2 = n2.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(e3) {
            return e3.replace(/<br>/g, "\n");
          })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="');
        }, getSelected: function F() {
          function e2(e3, t3) {
            for (; t3 && (t3.nodeType === Node.TEXT_NODE || !w2.node.isBlock(t3)) && !w2.node.isElement(t3) && !w2.node.hasClass(t3, "fr-inner") && (w2.opts.enter !== X.ENTER_BR || t3 !== w2.$el[0]); ) t3 && t3.nodeType !== Node.TEXT_NODE && b2(e3).wrapContent(t3), t3 = t3.parentNode;
            t3 && e3.innerHTML === t3.innerHTML ? e3.innerHTML = t3.outerHTML : t3 && "DIV" !== t3.tagName && "LI" !== t3.tagName && t3.innerText && -1 != t3.innerText.indexOf(e3.innerHTML) && t3 !== w2.$el.get(0) && (e3.innerHTML = w2.node.openTagString(t3) + e3.innerHTML + w2.node.closeTagString(t3));
          }
          var t2, n2, r3 = "";
          if ("undefined" != typeof w2.win.getSelection) {
            w2.browser.mozilla && (w2.selection.save(), 1 < w2.$el.find('.fr-marker[data-type="false"]').length && (w2.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), w2.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), w2.$el.find(".fr-marker").not('[data-id="0"]').remove()), w2.selection.restore());
            for (var o3 = w2.selection.ranges(), i3 = 0; i3 < o3.length; i3++) {
              var a3 = document.createElement("div");
              a3.appendChild(o3[i3].cloneContents()), e2(a3, (n2 = t2 = void 0, n2 = null, w2.win.getSelection ? (t2 = w2.win.getSelection()) && t2.rangeCount && ((n2 = t2.getRangeAt(0).commonAncestorContainer).nodeType === Node.ELEMENT_NODE || w2.opts.enter === X.ENTER_BR && n2.parentNode === w2.$el[0] || (n2 = n2.parentNode)) : (t2 = w2.doc.selection) && "Control" !== t2.type && (n2 = t2.createRange().parentElement()), null !== n2 && (0 <= b2(n2).parents().toArray().indexOf(w2.el) || n2 === w2.el) ? n2 : null)), 0 < b2(a3).find(".fr-element").length && (a3 = w2.el), r3 += a3.innerHTML;
            }
          } else "undefined" != typeof w2.doc.selection && "Text" === w2.doc.selection.type && (r3 = w2.doc.selection.createRange().htmlText);
          return r3;
        }, insert: function K(e2, t2, n2) {
          if (false === w2.events.trigger("html.beforeInsert", [e2, t2, n2])) return false;
          var r3, o3 = w2.selection.element();
          if (!y2() && !L2() || O2(e2) || !w2.node.isEmpty(o3) || b2(o3).parents("ol, ul").length || (e2 = X.START_MARKER + e2 + X.END_MARKER), w2.selection.isCollapsed() || w2.selection.remove(), r3 = t2 ? e2 : w2.clean.html(e2), 0 === e2.indexOf('<i class="fa ') && (r3 = "<span>&nbsp;".concat(r3, "</span>")), e2.indexOf('class="fr-marker"') < 0 && (r3 = (function l3(e3) {
            var t3 = w2.doc.createElement("div");
            return t3.innerHTML = e3, w2.selection.setAtEnd(t3, true), t3.innerHTML;
          })(r3)), w2.node.isEmpty(w2.el) && !w2.opts.keepFormatOnDelete && u2(r3)) w2.opts.trackChangesEnabled ? w2.track_changes.pasteInEmptyEdior(r3) : w2.el.innerHTML = r3;
          else {
            (function c3() {
              var e3 = w2.selection.ranges(0).commonAncestorContainer;
              return e3 !== w2.el && !w2.$el.contains(e3);
            })() && w2.selection.restore();
            var i3 = w2.markers.insert();
            if (i3) if (w2.opts.trackChangesEnabled) w2.track_changes.pasteInEdior(r3);
            else {
              w2.node.isLastSibling(i3) && b2(i3).parent().hasClass("fr-deletable") && b2(i3).insertAfter(b2(i3).parent());
              var a3 = w2.node.blockParent(i3);
              if ((u2(r3) || n2) && (w2.node.deepestParent(i3) || a3 && "LI" === a3.tagName)) {
                a3 && "LI" === a3.tagName && (r3 = (function d3(e3) {
                  if (!w2.html.defaultTag()) return e3;
                  var t3 = w2.doc.createElement("div");
                  t3.innerHTML = e3;
                  for (var n3 = t3.querySelectorAll(":scope > ".concat(w2.html.defaultTag())), r4 = n3.length - 1; 0 <= r4; r4--) {
                    var o4 = n3[r4];
                    w2.node.isBlock(o4.previousSibling) || (o4.previousSibling && !w2.node.isEmpty(o4) && b2("<br>").insertAfter(o4.previousSibling), o4.outerHTML = o4.innerHTML);
                  }
                  return t3.innerHTML;
                })(r3));
                var s3 = w2.selection.element();
                if (s3 && b2(s3).parentsUntil(w2.el, "ul, ol").length && "LI" != i3.parentNode.tagName && ("DIV" == b2(r3).get(0).tagName && 1 == b2(r3).length && "UL" == b2(r3).get(0).firstChild.tagName ? r3 = b2(r3).get(0).firstChild.innerHTML : "UL" == b2(r3).get(0).tagName && (r3 = b2(r3).get(0).innerHTML), i3 = w2.markers.split()), !(i3 = w2.markers.split())) return false;
                i3.outerHTML = r3;
              } else i3.outerHTML = r3;
            }
            else w2.el.innerHTML += r3;
          }
          h2(), w2.keys.positionCaret(), w2.events.trigger("html.inserted");
        }, wrap: t, unwrap: function U() {
          w2.$el.find("div.fr-temp-div").each(function() {
            this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && b2(this).before("<br>"), b2(this).attr("data-empty") || !this.nextSibling || w2.node.isBlock(this.nextSibling) && !b2(this.nextSibling).hasClass("fr-temp-div") ? b2(this).replaceWith(b2(this).html()) : b2(this).replaceWith("".concat(b2(this).html(), "<br>"));
          }), w2.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() {
            return "" === b2(this).attr("class");
          }).removeAttr("class");
        }, escapeEntities: function j(e2) {
          return e2.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;");
        }, checkIfEmpty: o2, extractNode: g2, extractNodeAttrs: C2, extractDoctype: m2, cleanBRs: function W() {
          for (var e2 = w2.el.getElementsByTagName("br"), t2 = 0; t2 < e2.length; t2++) c2(e2[t2]);
        }, _init: function G() {
          w2.events.$on(w2.$el, "mousemove", "span.fr-word-select", function(e2) {
            var t2 = window.getSelection();
            t2 = window.getSelection();
            var n2 = document.createRange();
            n2.selectNodeContents(e2.target), t2.removeAllRanges(), t2.addRange(n2);
          }), w2.$wp && (w2.events.on("mouseup", f2), w2.events.on("keydown", f2), w2.events.on("contentChanged", o2), (L2() || y2()) && (w2.events.on("keydown", T2), w2.events.on("initialized", S2), w2.events.on("html.inserted html.set", A2), w2.events.on("paste.afterCleanup", R2), w2.events.on("paste.after", M2), w2.events.on("window.cut", _), w2.events.on("commands.after", function(e2) {
            "clearFormatting" != e2 && "markdown" !== e2 || N2(true);
          })));
        }, _setHtml: v2 };
      }, X.ENTER_P = 0, X.ENTER_DIV = 1, X.ENTER_BR = 2, X.KEYCODE = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, DELETE: 46, ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57, FF_SEMICOLON: 59, FF_EQUALS: 61, QUESTION_MARK: 63, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, META: 91, NUM_ZERO: 96, NUM_ONE: 97, NUM_TWO: 98, NUM_THREE: 99, NUM_FOUR: 100, NUM_FIVE: 101, NUM_SIX: 102, NUM_SEVEN: 103, NUM_EIGHT: 104, NUM_NINE: 105, NUM_MULTIPLY: 106, NUM_PLUS: 107, NUM_MINUS: 109, NUM_PERIOD: 110, NUM_DIVISION: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, FF_HYPHEN: 173, SEMICOLON: 186, DASH: 189, EQUALS: 187, COMMA: 188, HYPHEN: 189, PERIOD: 190, SLASH: 191, APOSTROPHE: 192, TILDE: 192, SINGLE_QUOTE: 222, OPEN_SQUARE_BRACKET: 219, BACKSLASH: 220, CLOSE_SQUARE_BRACKET: 221, IME: 229 }, Object.assign(X.DEFAULTS, { enter: X.ENTER_P, multiLine: true, tabSpaces: 0 }), X.MODULES.keys = function(N2) {
        var T2, n, r2, S2 = N2.$, A2 = false, M2 = false;
        function x2(e2) {
          if (N2.selection.isCollapsed()) if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(e2.target && e2.target.tagName) < 0 && N2.cursor.backspace(), N2.helpers.isIOS()) {
            var t2 = N2.selection.ranges(0);
            t2.deleteContents(), t2.insertNode(document.createTextNode("​")), N2.selection.get().modify("move", "forward", "character");
          } else ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e2.target && e2.target.tagName) < 0 && e2.preventDefault(), e2.stopPropagation();
          else e2.preventDefault(), e2.stopPropagation(), N2.selection.remove();
          N2.placeholder.refresh();
        }
        function O2(e2) {
          ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e2.target && e2.target.tagName) < 0 && e2.preventDefault(), e2.stopPropagation(), "" !== N2.selection.text() || N2.selection.element().hasAttribute("contenteditable") && "false" === N2.selection.element().getAttribute("contenteditable") || !N2.selection.isCollapsed() && "IMG" == N2.selection.element().tagName ? N2.selection.remove() : N2.cursor.del(), N2.placeholder.refresh();
        }
        function e() {
          if (N2.browser.mozilla && N2.selection.isCollapsed() && !A2) {
            var e2 = N2.selection.ranges(0), t2 = e2.startContainer, n2 = e2.startOffset;
            t2 && t2.nodeType === Node.TEXT_NODE && n2 <= t2.textContent.length && 0 < n2 && 32 === t2.textContent.charCodeAt(n2 - 1) && (N2.selection.save(), N2.spaces.normalize(), N2.selection.restore());
          }
        }
        function t() {
          N2.selection.isFull() && setTimeout(function() {
            var e2 = N2.html.defaultTag();
            e2 ? N2.$el.html("<".concat(e2, ">").concat(X.MARKERS, "<br/></").concat(e2, ">")) : N2.$el.html("".concat(X.MARKERS, "<br/>")), N2.selection.restore(), N2.placeholder.refresh(), N2.button.bulkRefresh(), N2.undo.saveStep();
          }, 0);
        }
        function o2() {
          A2 = false;
        }
        function i2() {
          A2 = false;
        }
        function w2() {
          var e2 = N2.html.defaultTag();
          e2 ? N2.$el.html("<".concat(e2, ">").concat(X.MARKERS, "<br/></").concat(e2, ">")) : N2.$el.html("".concat(X.MARKERS, "<br/>")), N2.selection.restore();
        }
        function k(e2, t2) {
          if (!e2 || !e2.parentElement) return false;
          var n2 = (e2 && e2.parentElement).parentElement;
          if (e2.parentElement && (-1 < e2.innerHTML.indexOf("<span") || -1 < e2.parentElement.innerHTML.indexOf("<span") || n2 && -1 < e2.parentElement.parentElement.innerHTML.indexOf("<span")) && (e2.classList.contains("fr-img-space-wrap") || e2.parentElement.classList.contains("fr-img-space-wrap") || n2 && e2.parentElement.parentElement.classList.contains("fr-img-space-wrap"))) {
            if (S2(e2.parentElement).is("p")) {
              var r3 = e2.parentElement.innerHTML;
              return (r3 = r3.replace(/<br>/g, "")).length < 1 ? e2.parentElement.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != r3 && " " != r3 && "Backspace" == t2.key ? x2(t2) : "&nbsp;" != r3 && " " != r3 && "Delete" == t2.key && O2(t2), true;
            }
            if (S2(e2).is("p")) {
              var o3 = e2.innerHTML.replace(/<br>/g, "");
              return o3.length < 1 ? e2.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != o3 && " " != o3 && "Backspace" == t2.key ? x2(t2) : "&nbsp;" != o3 && " " != o3 && "Delete" == t2.key && O2(t2), true;
            }
          }
          return false;
        }
        function a2(e2) {
          var t2 = N2.selection.element();
          if (t2 && 0 <= ["INPUT", "TEXTAREA"].indexOf(t2.tagName)) return true;
          if (e2 && B(e2.which)) {
            var n2 = N2.selection.element(), r3 = N2.selection.get(), o3 = r3.anchorNode, i3 = r3.anchorOffset;
            if (o3.nodeType === Node.TEXT_NODE && 0 < i3 && 1 < o3.textContent.length && 8203 === o3.textContent.charCodeAt(i3)) {
              $(n2);
              var a3 = N2.doc.createRange();
              N2.selection.get().removeAllRanges();
              var s3 = Math.max(0, Math.min(i3 - 1, o3.textContent.length - 1));
              a3.setStart(o3, s3), a3.setEnd(o3, s3), N2.selection.get().addRange(a3);
            }
            return true;
          }
          N2.events.disableBlur();
          var l3 = e2.which;
          if (16 === l3) return true;
          if ((T2 = l3) === X.KEYCODE.IME) return A2 = true;
          if (A2 = false, l3 === X.KEYCODE.BACKSPACE && (e2.metaKey || e2.ctrlKey)) {
            var c3 = N2.selection.element(), d3 = ["strong", "u", "em", "s", "sub", "sup", "span"], f3 = S2(c3).find(d3.join()).length || -1 < d3.indexOf(c3.tagName.toLowerCase());
            if (N2.opts.keepFormatOnDelete && !N2.node.isEmpty(c3) && f3) {
              var p3 = true;
              N2.selection.isCollapsed() && (N2.helpers.isMac() ? p3 = (function C2() {
                var e3 = N2.markers.insert();
                S2(e3).removeClass("fr-marker").addClass("fr-marker-placeholder");
                var t3 = N2.selection.ranges(0).getBoundingClientRect(), n3 = N2.selection.blocks()[0];
                if (!n3) return false;
                var r4 = N2.selection.rangeElement(n3).getBoundingClientRect();
                return N2.markers.insertAtPoint({ clientX: r4.x, clientY: t3.y }), N2.$el.find(".fr-marker").replaceWith(X.START_MARKER), N2.$el.find(".fr-marker-placeholder").replaceWith(X.END_MARKER), N2.selection.restore(), true;
              })() : (function m2() {
                var e3 = N2.selection.get();
                if (0 === e3.rangeCount) return;
                var t3 = e3.getRangeAt(0), n3 = t3.startContainer, r4 = t3.startOffset;
                if (n3.nodeType === Node.TEXT_NODE) {
                  for (var o4 = n3.textContent, i4 = r4; 0 < i4 && /[\s\u200B\u200C\u200D\uFEFF]/.test(o4[i4 - 1]); ) i4--;
                  for (; 0 < i4 && !/[\s\u200B\u200C\u200D\uFEFF]/.test(o4[i4 - 1]); ) i4--;
                  var a4 = N2.doc.createRange();
                  a4.setStart(n3, i4), a4.setEnd(n3, r4), e3.removeAllRanges(), e3.addRange(a4);
                }
              })());
              var u3 = N2.selection.ranges(0).startContainer.previousSibling;
              !p3 || u3 && u3.nodeType !== Node.TEXT_NODE && "BR" == u3.tagName || x2(e2);
            }
            N2.helpers.isMac() && (M2 = true);
          }
          if (D(e2)) return true;
          var h2 = H(l3) && !D(e2) && !e2.altKey, g2 = l3 === X.KEYCODE.BACKSPACE || l3 === X.KEYCODE.DELETE;
          if ((N2.selection.isFull() && !N2.opts.keepFormatOnDelete && !N2.placeholder.isVisible() || g2 && N2.placeholder.isVisible() && N2.opts.keepFormatOnDelete) && (h2 || g2) && (w2(), !H(l3))) return e2.preventDefault(), true;
          if (l3 === X.KEYCODE.ENTER) !N2.helpers.isIOS() && e2.shiftKey || t2.classList.contains("fr-inner") || t2.parentElement && t2.parentElement.classList.contains("fr-inner") ? (function v2(e3) {
            e3.preventDefault(), e3.stopPropagation(), N2.opts.multiLine && (N2.selection.isCollapsed() || N2.selection.remove(), N2.cursor.enter(true));
          })(e2) : (function b2(e3) {
            N2.opts.multiLine ? (N2.helpers.isIOS() || (e3.preventDefault(), e3.stopPropagation()), N2.selection.isCollapsed() || N2.selection.remove(), N2.cursor.enter()) : (e3.preventDefault(), e3.stopPropagation());
          })(e2);
          else if (l3 === X.KEYCODE.BACKSPACE && (e2.metaKey || e2.ctrlKey)) !(function E2() {
            setTimeout(function() {
              N2.events.disableBlur(), N2.events.focus();
            }, 0);
          })();
          else if (l3 !== X.KEYCODE.BACKSPACE || D(e2) || e2.altKey) if (l3 !== X.KEYCODE.DELETE || D(e2) || e2.altKey || e2.shiftKey) l3 === X.KEYCODE.SPACE ? (function L2(e3) {
            var t3 = N2.selection.element();
            if (!N2.helpers.isMobile() && t3 && "A" === t3.tagName) {
              e3.preventDefault(), e3.stopPropagation(), N2.selection.isCollapsed() || N2.selection.remove();
              var n3 = N2.markers.insert();
              if (n3) {
                var r4 = n3.previousSibling;
                !n3.nextSibling && n3.parentNode && "A" === n3.parentNode.tagName ? (n3.parentNode.insertAdjacentHTML("afterend", "&nbsp;".concat(X.MARKERS)), n3.parentNode.removeChild(n3)) : (r4 && r4.nodeType === Node.TEXT_NODE && 1 === r4.textContent.length && 160 === r4.textContent.charCodeAt(0) ? r4.textContent += " " : n3.insertAdjacentHTML("beforebegin", "&nbsp;"), n3.outerHTML = X.MARKERS), N2.selection.restore();
              }
            }
          })(e2) : l3 === X.KEYCODE.TAB ? (function y2(e3) {
            if (0 < N2.opts.tabSpaces) if (N2.selection.isCollapsed()) {
              N2.undo.saveStep(), e3.preventDefault(), e3.stopPropagation();
              for (var t3 = "", n3 = 0; n3 < N2.opts.tabSpaces; n3++) t3 += "&nbsp;";
              N2.html.insert(t3), N2.placeholder.refresh(), N2.undo.saveStep();
            } else e3.preventDefault(), e3.stopPropagation(), e3.shiftKey ? N2.commands.outdent() : N2.commands.indent();
          })(e2) : D(e2) || !H(e2.which) || N2.selection.isCollapsed() || e2.ctrlKey || e2.altKey || N2.browser.mozilla || N2.selection.remove();
          else {
            if (k(t2, e2)) return e2.preventDefault(), void e2.stopPropagation();
            N2.placeholder.isVisible() ? (N2.opts.keepFormatOnDelete || w2(), e2.preventDefault(), e2.stopPropagation()) : O2(e2);
          }
          else {
            if (k(t2, e2)) return e2.preventDefault(), void e2.stopPropagation();
            N2.placeholder.isVisible() ? (N2.opts.keepFormatOnDelete || w2(), e2.preventDefault(), e2.stopPropagation()) : x2(e2);
          }
          N2.events.enableBlur();
        }
        function $(e2) {
          var t2 = e2;
          -1 < ["STRONG", "U", "EM"].indexOf(e2.nodeName) && e2.parentNode && (t2 = e2.parentNode);
          for (var n2 = N2.doc.createTreeWalker(t2, NodeFilter.SHOW_TEXT, N2.node.filter(function(e3) {
            return /\u200B/gi.test(e3.textContent);
          }), false); n2.nextNode(); ) {
            var r3 = n2.currentNode;
            r3.textContent = r3.textContent.replace(/\u200B/gi, "");
          }
        }
        function l2() {
          if (!N2.$wp) return true;
          var e2;
          if (N2.opts.height || N2.opts.heightMax) {
            e2 = N2.position.getBoundingRect().top, (N2.helpers.isIOS() || N2.helpers.isAndroid()) && (e2 -= N2.helpers.scrollTop()), N2.opts.iframe && (e2 += N2.$iframe.offset().top);
            var t2 = N2.selection.blocks(), n2 = null;
            if (t2 && 0 < t2.length && t2[0].offsetTop && (n2 = t2[0].getBoundingClientRect().top, 3 === N2.selection.get().anchorNode.nodeType)) {
              var r3 = N2.doc.createRange(), o3 = N2.selection.get().anchorNode, i3 = N2.selection.get().anchorOffset;
              r3.selectNode(o3), r3.setStart(o3, i3), n2 = r3.getBoundingClientRect().top;
            }
            if (!N2.opts.iframe && e2 > N2.$wp.offset().top - N2.helpers.scrollTop() + N2.$wp.height() - 20) N2.$wp.scrollTop(e2 + N2.$wp.scrollTop() - (N2.$wp.height() + N2.$wp.offset().top) + N2.helpers.scrollTop() + 20);
            else if (N2.opts.iframe && n2) {
              if (N2.$wp.scrollTop() > n2) N2.$wp.scrollTop(n2 - 20);
              else if (n2 + 20 > N2.$wp.scrollTop() + N2.$wp.height()) {
                var a3 = n2 - N2.$wp.height() + 50;
                N2.$wp.scrollTop(a3);
              }
            }
          } else e2 = N2.position.getBoundingRect().top, N2.opts.toolbarBottom && (e2 += N2.opts.toolbarStickyOffset), (N2.helpers.isIOS() || N2.helpers.isAndroid()) && (e2 -= N2.helpers.scrollTop()), N2.opts.iframe && (e2 += N2.$iframe.offset().top, e2 -= N2.helpers.scrollTop()), (e2 += N2.opts.toolbarStickyOffset) > N2.o_win.innerHeight - 20 && S2(N2.o_win).scrollTop(e2 + N2.helpers.scrollTop() - N2.o_win.innerHeight + 20), e2 = N2.position.getBoundingRect().top, N2.opts.toolbarBottom || (e2 -= N2.opts.toolbarStickyOffset), (N2.helpers.isIOS() || N2.helpers.isAndroid()) && (e2 -= N2.helpers.scrollTop()), N2.opts.iframe && (e2 += N2.$iframe.offset().top, e2 -= N2.helpers.scrollTop()), e2 < 100 && S2(N2.o_win).scrollTop(e2 + N2.helpers.scrollTop() - 100);
        }
        function s2(e2) {
          var t2 = N2.selection.element();
          if (t2 && 0 <= ["INPUT", "TEXTAREA"].indexOf(t2.tagName)) return true;
          if (e2 && 0 === e2.which && T2 && (e2.which = T2), N2.helpers.isAndroid() && N2.browser.mozilla) return true;
          if (A2) return false;
          if (e2 && N2.helpers.isIOS() && e2.which === X.KEYCODE.ENTER && N2.doc.execCommand("undo"), !N2.selection.isCollapsed()) return true;
          if (e2 && (e2.which === X.KEYCODE.META || e2.which === X.KEYCODE.CTRL) && !M2) return true;
          if (e2 && B(e2.which)) return true;
          if (e2 && !N2.helpers.isIOS() && (e2.which === X.KEYCODE.ENTER || e2.which === X.KEYCODE.BACKSPACE || M2 || 37 <= e2.which && e2.which <= 40 && !N2.browser.msie)) try {
            l2(), M2 = false;
          } catch (i3) {
          }
          var n2 = N2.selection.element();
          if ((function a3(e3) {
            if (!e3) return false;
            var t3 = e3.innerHTML;
            return !!((t3 = t3.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t3) && 0 < t3.replace(/\u200B/gi, "").length);
          })(n2) && !N2.node.hasClass(n2, "fr-marker") && "IFRAME" !== n2.tagName && (function s3(e3) {
            return !N2.helpers.isIOS() || 0 === ((e3.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length;
          })(n2)) {
            N2.selection.save();
            var r3 = N2.$el.find(".fr-marker")[1], o3 = (e2 || "").which;
            N2.opts.enter === X.ENTER_BR && n2 === N2.$el.get(0) && 8 === o3 && null == r3.nextSibling || $(n2), N2.selection.restore();
          }
        }
        function D(e2) {
          if (-1 !== navigator.userAgent.indexOf("Mac OS X")) {
            if (e2.metaKey && !e2.altKey) return true;
          } else if (e2.ctrlKey && !e2.altKey) return true;
          return false;
        }
        function B(e2) {
          if (e2 >= X.KEYCODE.ARROW_LEFT && e2 <= X.KEYCODE.ARROW_DOWN) return true;
        }
        function H(e2) {
          if (e2 >= X.KEYCODE.ZERO && e2 <= X.KEYCODE.NINE) return true;
          if (e2 >= X.KEYCODE.NUM_ZERO && e2 <= X.KEYCODE.NUM_MULTIPLY) return true;
          if (e2 >= X.KEYCODE.A && e2 <= X.KEYCODE.Z) return true;
          if (N2.browser.webkit && 0 === e2) return true;
          switch (e2) {
            case X.KEYCODE.SPACE:
            case X.KEYCODE.QUESTION_MARK:
            case X.KEYCODE.NUM_PLUS:
            case X.KEYCODE.NUM_MINUS:
            case X.KEYCODE.NUM_PERIOD:
            case X.KEYCODE.NUM_DIVISION:
            case X.KEYCODE.SEMICOLON:
            case X.KEYCODE.FF_SEMICOLON:
            case X.KEYCODE.DASH:
            case X.KEYCODE.EQUALS:
            case X.KEYCODE.FF_EQUALS:
            case X.KEYCODE.COMMA:
            case X.KEYCODE.PERIOD:
            case X.KEYCODE.SLASH:
            case X.KEYCODE.APOSTROPHE:
            case X.KEYCODE.SINGLE_QUOTE:
            case X.KEYCODE.OPEN_SQUARE_BRACKET:
            case X.KEYCODE.BACKSLASH:
            case X.KEYCODE.CLOSE_SQUARE_BRACKET:
              return true;
            default:
              return false;
          }
        }
        function c2(e2) {
          var t2 = e2.which;
          if (D(e2) || 37 <= t2 && t2 <= 40 || !H(t2) && t2 !== X.KEYCODE.DELETE && t2 !== X.KEYCODE.BACKSPACE && t2 !== X.KEYCODE.ENTER && t2 !== X.KEYCODE.IME) return true;
          n || (r2 = N2.snapshot.get(), N2.undo.canDo() || N2.undo.saveStep()), clearTimeout(n), n = setTimeout(function() {
            n = null, N2.undo.saveStep();
          }, Math.max(250, N2.opts.typingTimer));
        }
        function d2(e2) {
          var t2 = e2.which;
          if (D(e2) || 37 <= t2 && t2 <= 40) return true;
          r2 && n ? (N2.undo.saveStep(r2), r2 = null) : void 0 !== t2 && 0 !== t2 || r2 || n || N2.undo.saveStep();
        }
        function f2(e2) {
          if (e2 && e2.nodeType === Node.ELEMENT_NODE && 0 <= X.VOID_ELEMENTS.indexOf(e2.tagName.toLowerCase()) || e2.lastChild && e2.lastChild.nodeType === Node.ELEMENT_NODE && 0 <= X.VOID_ELEMENTS.indexOf(e2.lastChild.tagName.toLowerCase())) return false;
          try {
            return 0 === (e2.textContent || "").length && e2.querySelector && !e2.querySelector(":scope > br") || e2.childNodes && 1 === e2.childNodes.length && e2.childNodes[0].getAttribute && ("false" === e2.childNodes[0].getAttribute("contenteditable") || N2.node.hasClass(e2.childNodes[0], "fr-img-caption"));
          } catch (t2) {
            return false;
          }
        }
        function p2(e2) {
          var t2 = N2.el.childNodes, n2 = N2.html.defaultTag(), r3 = N2.node.blockParent(N2.selection.blocks()[0]);
          function o3(e3) {
            return !!S2(e3).parentsUntil(N2.$el, '[contenteditable="false"]').length;
          }
          r3 && "TR" == r3.tagName && r3.getAttribute("contenteditable") == void 0 && (r3 = r3.closest("table"));
          var i3 = window.getSelection(), a3 = 0 < i3.rangeCount && (o3(i3.getRangeAt(0).startContainer) || o3(i3.getRangeAt(0).endContainer));
          return !N2.node.isEditable(e2.target) || o3(e2.target) || a3 ? N2.toolbar.disable() : N2.toolbar.enable(), !(!e2.target || e2.target === N2.el) || (0 === t2.length || void (t2[0].offsetHeight + t2[0].offsetTop <= e2.offsetY ? f2(t2[t2.length - 1]) && (n2 ? N2.$el.append("<".concat(n2, ">").concat(X.MARKERS, "<br></").concat(n2, ">")) : N2.$el.append("".concat(X.MARKERS, "<br>")), N2.selection.restore(), l2()) : e2.offsetY <= 10 && f2(t2[0]) && (n2 ? N2.$el.prepend("<".concat(n2, ">").concat(X.MARKERS, "<br></").concat(n2, ">")) : N2.$el.prepend("".concat(X.MARKERS, "<br>")), N2.selection.restore(), l2())));
        }
        function u2() {
          n && clearTimeout(n);
        }
        return { _init: function h2() {
          N2.events.on("keydown", c2), N2.events.on("input", e), N2.events.on("mousedown", i2), N2.events.on("keyup input", d2), N2.events.on("keypress", o2), N2.events.on("keydown", a2), N2.events.on("keyup", s2), N2.events.on("destroy", u2), N2.events.on("html.inserted", s2), N2.events.on("cut", t), N2.opts.multiLine && N2.events.on("click", p2), N2.events.on("initialized", function() {
            N2.el.addEventListener("compositionstart", function() {
              if (N2.selection.isCollapsed()) {
                var e2 = N2.selection.ranges(0), t2 = e2.startContainer, n2 = e2.startOffset;
                if (t2 && t2.nodeType === Node.TEXT_NODE && n2 <= t2.textContent.length && 0 < n2 && 8203 === t2.textContent.charCodeAt(n2 - 1)) {
                  N2.selection.save();
                  var r3 = N2.$el.find(".fr-marker");
                  S2(r3.get(0).previousSibling).before(X.HAIR_SPACE), r3.get(0).previousSibling.textContent = r3.get(0).previousSibling.textContent.replace(/\u200B/gi, ""), N2.selection.restore();
                }
              }
            }), N2.el.addEventListener("compositionend", function() {
              if (N2.selection.isCollapsed()) {
                var e2 = N2.selection.ranges(0), t2 = e2.startContainer, n2 = e2.startOffset;
                if (t2 && t2.nodeType === Node.TEXT_NODE && n2 <= t2.textContent.length && 0 < n2 && 8202 === t2.textContent.charCodeAt(0)) {
                  N2.selection.save();
                  var r3 = N2.$el.find(".fr-marker");
                  r3.get(0).previousSibling.textContent = r3.get(0).previousSibling.textContent.replace(/\u200A/gi, ""), N2.selection.restore();
                }
              }
            });
          });
        }, ctrlKey: D, isCharacter: H, isArrow: B, forceUndo: function g2() {
          n && (clearTimeout(n), N2.undo.saveStep(), r2 = null);
        }, isIME: function C2() {
          return A2;
        }, isBrowserAction: function m2(e2) {
          var t2 = e2.which;
          return D(e2) || t2 === X.KEYCODE.F5;
        }, positionCaret: l2 };
      }, Object.assign(X.DEFAULTS, { pastePlain: false, pasteDeniedTags: ["colgroup", "col", "meta"], pasteDeniedAttrs: ["class", "id"], pasteAllowedStyleProps: [".*"], pasteAllowLocalImages: false }), X.MODULES.paste = function(x2) {
        var O2, f2, w2, k, l2, $, i2, D = x2.$;
        function a2(e2, t2) {
          var n2 = 2 < arguments.length && arguments[2] !== void 0 && arguments[2];
          i2 = n2;
          try {
            x2.win.localStorage.setItem("fr-copied-html", e2), x2.win.localStorage.setItem("fr-copied-text", t2);
          } catch (r3) {
          }
        }
        function e(e2) {
          var t2, n2;
          if (i2 ? (t2 = x2.win.localStorage.getItem("fr-copied-html"), n2 = x2.win.localStorage.getItem("fr-copied-text"), i2 = false) : a2(t2 = x2.html.getSelected(), n2 = D(x2.doc.createElement("div")).html(t2).text()), "cut" === e2.type) {
            var r3 = x2.$el.find("table.fr-selection-handle-selected"), o3 = x2.$el.find(".fr-page-break.fr-selection-handle-selected");
            !r3.length && !o3.length || x2.opts.trackChangesEnabled || (r3.length && x2.table.remove(), o3.length && x2.pageBreak.remove(), e2.preventDefault()), e2.clipboardData.setData("text/plain", n2), e2.clipboardData.setData("text/html", t2), setTimeout(function() {
              x2.selection.save(), x2.html.wrap(), x2.selection.restore(), x2.events.focus(), x2.undo.saveStep();
            }, 0);
          }
        }
        var c2, t = false;
        function n(p3) {
          return "INPUT" === (c2 = p3).target.nodeName && "text" === p3.target.type || !x2.edit.isDisabled() && (!h2(p3.target) && (!t && (p3.originalEvent && (p3 = p3.originalEvent), m2() && navigator.clipboard ? (navigator.clipboard.read({ unsanitized: ["text/html"] }).then((function() {
            var t2 = /* @__PURE__ */ (function e2(s3) {
              return function() {
                var e3 = this, a3 = arguments;
                return new Promise(function(t3, n2) {
                  var r3 = s3.apply(e3, a3);
                  function o3(e4) {
                    E(r3, t3, n2, o3, i3, "next", e4);
                  }
                  function i3(e4) {
                    E(r3, t3, n2, o3, i3, "throw", e4);
                  }
                  o3(void 0);
                });
              };
            })(y().m(function f3(t3) {
              var n2, r3, o3, i3, a3, s3, l3, c3, d3;
              return y().w(function(e2) {
                for (; ; ) switch (e2.p = e2.n) {
                  case 0:
                    n2 = t3[0].types, r3 = new DataTransfer(), o3 = L(n2), e2.p = 1, o3.s();
                  case 2:
                    if ((i3 = o3.n()).done) {
                      e2.n = 8;
                      break;
                    }
                    return a3 = i3.value, e2.n = 3, t3[0].getType(a3);
                  case 3:
                    if (s3 = e2.v, a3.startsWith("text")) return e2.n = 4, s3.text();
                    e2.n = 5;
                    break;
                  case 4:
                    c3 = e2.v, e2.n = 6;
                    break;
                  case 5:
                    c3 = s3;
                  case 6:
                    l3 = c3, a3.startsWith("text") ? r3.setData(a3, l3) : r3.items.add(new File([l3], "file"));
                  case 7:
                    e2.n = 2;
                    break;
                  case 8:
                    e2.n = 10;
                    break;
                  case 9:
                    e2.p = 9, d3 = e2.v, o3.e(d3);
                  case 10:
                    return e2.p = 10, o3.f(), e2.f(10);
                  case 11:
                    return e2.a(2, u2(p3, r3));
                }
              }, f3, null, [[1, 9, 10, 11]]);
            }));
            return function(e2) {
              return t2.apply(this, arguments);
            };
          })()), p3.preventDefault(), false) : u2(p3))));
        }
        function u2(e2, t2) {
          var n2 = t2 || e2 && e2.clipboardData;
          if (n2 && n2.getData) {
            var r3 = (n2 || window.clipboardData).getData("text/html") || "";
            if (r3.match('content="Microsoft OneNote')) {
              var o3 = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(r3)[1];
              return x2.html.insert(x2.clean.html(o3)), e2.preventDefault && (e2.stopPropagation(), e2.preventDefault()), false;
            }
          }
          if (false === x2.events.trigger("paste.before", [e2, t2])) return e2.preventDefault(), false;
          if (n2 && n2.getData) {
            var i3 = "";
            if (k = n2.types, x2.helpers.isArray(k)) for (var a3 = 0; a3 < k.length; a3++) i3 += "".concat(k[a3], ";");
            else i3 = k;
            if (O2 = "", /text\/rtf/.test(i3) && (f2 = n2.getData("text/rtf")), /text\/html/.test(i3) ? (O2 = n2.getData("text/html"), x2.browser.mozilla && ("<p></p>" === O2 || "" === O2 || /<!--StartFragment-->([ ])<!--EndFragment-->/.test(O2) || /<!--StartFragment-->([<p></p>]*)<!--EndFragment-->/.test(O2)) && (O2 = x2.win.localStorage.getItem("fr-copied-html"))) : /text\/uri-list/.test(i3) && x2.browser.safari ? O2 = n2.getData("text/uri-list") : /text\/rtf/.test(i3) && x2.browser.safari ? O2 = f2 : /public.rtf/.test(i3) && x2.browser.safari && (O2 = n2.getData("text/rtf")), w2 = n2.getData("text"), "" !== O2) return g2(), e2.preventDefault && (e2.stopPropagation(), e2.preventDefault()), false;
            O2 = null;
          }
          return (function s3() {
            if (x2.selection.save(), x2.events.disableBlur(), O2 = null, l2) {
              l2.html("");
              var e3 = d2(x2.selection.get().anchorNode) + x2.$wp.offset().top;
              l2.css("top", e3), x2.browser.edge && x2.opts.iframe && x2.$el.append(l2);
            } else {
              var t3 = document.getElementsByTagName("BODY")[0], n3 = window.getComputedStyle(t3).transform;
              if ("none" !== n3) {
                var r4 = d2(x2.selection.get().anchorNode) + x2.$wp.offset().top;
                l2 = D('<div contenteditable="true" style="position: fixed; top: ' + r4 + 'px; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>');
              } else l2 = D('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>');
              x2.browser.webkit || x2.browser.mozilla ? ("none" === n3 && l2.css("top", x2.$sc.scrollTop()), x2.$el.after(l2)) : x2.browser.edge && x2.opts.iframe ? x2.$el.append(l2) : x2.$box.after(l2), x2.events.on("destroy", function() {
                l2.remove();
              });
            }
            var o4;
            x2.helpers.isIOS() && x2.$sc && (o4 = x2.$sc.scrollTop());
            x2.opts.iframe && x2.$el.attr("contenteditable", "false");
            x2.helpers.isIOS() && x2.$sc && x2.$sc.scrollTop(o4);
            var i4 = c2.clipboardData.getData("Text");
            if (4e5 < i4.length || m2() && navigator.clipboard) {
              c2.preventDefault();
              var a4 = p2(i4 || w2);
              l2.get(0).innerText = "", l2.get(0).appendChild(a4);
            } else l2.focus();
            x2.win.setTimeout(g2, 1);
          })(), false;
        }
        function h2(e2) {
          return e2 && "false" === e2.contentEditable;
        }
        function r2(e2) {
          if (e2.originalEvent && (e2 = e2.originalEvent), h2(e2.target)) return false;
          if (e2 && e2.dataTransfer && e2.dataTransfer.getData) {
            var t2 = "";
            if (k = e2.dataTransfer.types, x2.helpers.isArray(k)) for (var n2 = 0; n2 < k.length; n2++) t2 += "".concat(k[n2], ";");
            else t2 = k;
            O2 = "", /text\/rtf/.test(t2) && (f2 = e2.dataTransfer.getData("text/rtf")), /text\/html/.test(t2) ? O2 = e2.dataTransfer.getData("text/html") : /text\/rtf/.test(t2) && x2.browser.safari ? O2 = f2 : /text\/plain/.test(t2) && !this.browser.mozilla && (O2 = x2.html.escapeEntities(e2.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>"));
            var r3 = x2.$el.find(".fr-element-draggable");
            if (r3.length) {
              var o3 = x2.$box.find(".fr-selection-drop-indicator");
              if (o3 && !o3.isVisible()) return true;
              var i3 = o3.attr("data-position"), a3 = o3.data("target-element");
              if ($ = x2.snapshot.get(), "above" === i3 ? x2.selection.setAtStart(a3) : x2.selection.setAtEnd(a3), r3.hasClass("fr-page-break")) return true;
              r3.removeClass("fr-element-draggable"), r3.remove();
              var s3 = x2.el.querySelector(".fr-marker");
              return D(s3).replaceWith(X.MARKERS), x2.selection.restore(), (function d3() {
                x2.win.localStorage.removeItem("fr-copied-text"), x2.win.localStorage.removeItem("fr-copied-html");
              })(), g2(), void (e2.preventDefault && (e2.stopPropagation(), e2.preventDefault()));
            }
            if ("" !== O2) {
              x2.keys.forceUndo(), $ = x2.snapshot.get(), x2.selection.save(), x2.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
              var l3 = x2.markers.insertAtPoint(e2);
              if (x2.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), x2.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), x2.selection.restore(), x2.selection.remove(), x2.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), false !== l3) {
                var c3 = x2.el.querySelector(".fr-marker");
                return D(c3).replaceWith(X.MARKERS), x2.selection.restore(), g2(), e2.preventDefault && (e2.stopPropagation(), e2.preventDefault()), false;
              }
            } else O2 = null;
          }
        }
        function d2(e2) {
          return e2.nodeType === Node.TEXT_NODE ? e2.parentNode.offsetTop : e2.offsetTop;
        }
        function p2(e2) {
          var n2 = x2.html.defaultTag() || "p", t2 = e2.split(/\n/g), r3 = document.createDocumentFragment();
          return t2.forEach(function(e3) {
            var t3 = document.createElement(n2);
            t3.appendChild("" === e3 ? document.createElement("br") : document.createTextNode(e3)), r3.appendChild(t3);
          }), r3;
        }
        function g2() {
          x2.opts.iframe && x2.$el.attr("contenteditable", "true"), x2.browser.edge && x2.opts.iframe && x2.$box.after(l2), $ || (x2.keys.forceUndo(), $ = x2.snapshot.get()), O2 || (O2 = l2.get(0).innerHTML, w2 = l2.text(), x2.$el[0].setAttribute("plainpaste", true), x2.selection.restore(), x2.events.enableBlur());
          var e2 = O2.match(/(MSFontService|class="?Mso|class='?Mso|class="?Xl|class='?Xl|class=Xl|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument|LibreOffice)/gi), t2 = x2.events.chainTrigger("paste.beforeCleanup", O2);
          if (t2 && "string" == typeof t2) {
            O2 = t2;
            var n2 = new DOMParser().parseFromString(t2, "text/html");
            w2 = n2.body.innerText;
          }
          (!e2 || e2 && false !== x2.events.trigger("paste.wordPaste", [O2])) && o2(O2, e2);
        }
        function B(e2) {
          for (var t2 = "", n2 = 0; n2++ < e2; ) t2 += "&nbsp;";
          return t2;
        }
        function o2(e2, t2, n2) {
          var r3, o3 = null, i3 = null;
          if (0 <= e2.toLowerCase().indexOf("<body")) {
            var a3 = "";
            0 <= e2.indexOf("<style") && (a3 = e2.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), e2 = (e2 = (e2 = a3 + e2.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(e3) {
              return e3.replace(/\n/g, "<br />");
            })).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2");
          }
          var s3 = false;
          0 <= e2.indexOf('id="docs-internal-guid') && (e2 = e2.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), s3 = true), (0 <= e2.indexOf('content="Sheets"') || 0 <= e2.indexOf("google-sheets-html-origin")) && (e2 = e2.replace(/width:0px;/g, ""));
          var l3 = false;
          if (!t2) if ((l3 = (function N2() {
            var e3 = null, t3 = null;
            try {
              e3 = x2.win.localStorage.getItem("fr-copied-text"), t3 = x2.win.localStorage.getItem("fr-copied-html");
            } catch (s4) {
            }
            var n3 = new DOMParser().parseFromString(t3, "text/html").querySelector("table"), r4 = x2.node.hasClass(n3, "fr-selection-handle-selected"), o4 = new DOMParser().parseFromString(O2, "text/html").querySelector("table"), i4 = x2.node.hasClass(o4, "fr-selection-handle-selected"), a4 = n3 && o4 && r4 === i4;
            return !(!e3 || !w2 || k && -1 === k.indexOf("text/html") || w2.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") !== e3.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") && w2.replace(/\s/g, "") !== e3.replace(/\s/g, "")) || !(!(t3 && O2 && a4) || k && -1 === k.indexOf("text/html"));
          })()) && (e2 = x2.win.localStorage.getItem("fr-copied-html")), l3) e2 = x2.clean.html(e2, x2.opts.pasteDeniedTags, x2.opts.pasteDeniedAttrs);
          else {
            var c3 = x2.opts.htmlAllowedStyleProps;
            x2.opts.htmlAllowedStyleProps = x2.opts.pasteAllowedStyleProps, x2.opts.htmlAllowComments = false, e2 = (e2 = (e2 = e2.replace(/<span class="Apple-tab-span">\s*<\/span>/g, B(x2.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function(e3, t3) {
              return B(t3.length * (x2.opts.tabSpaces || 4));
            })).replace(/\t/g, B(x2.opts.tabSpaces || 4)), e2 = x2.clean.html(e2, x2.opts.pasteDeniedTags, x2.opts.pasteDeniedAttrs), x2.opts.htmlAllowedStyleProps = c3, x2.opts.htmlAllowComments = true, x2.html.defaultTag() && "div" === x2.html.defaultTag() || (e2 = H(e2)), e2 = (e2 = e2.replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "");
          }
          !t2 || x2.wordPaste && n2 || (0 === (e2 = e2.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (e2 = "<table>".concat(e2, "</table>")), e2 = H(e2 = (function T2(e3) {
            var t3;
            e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = (e3 = e3.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if !supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if !supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
            var n3, r4 = ["style", "script", "applet", "embed", "noframes", "noscript"];
            for (t3 = 0; t3 < r4.length; t3++) {
              var o4 = new RegExp("<".concat(r4[t3], ".*?").concat(r4[t3], "(.*?)>"), "gi");
              e3 = e3.replace(o4, "");
            }
            for (e3 = (e3 = (e3 = e3.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>"); (e3 = (n3 = e3).replace(/<[^/>][^>]*><\/[^>]+>/gi, "")) !== n3; ) ;
            e3 = (e3 = e3.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e3 = (e3 = (e3 = x2.clean.html(e3, x2.opts.pasteDeniedTags, x2.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
            var i4 = x2.o_doc.createElement("div");
            i4.innerHTML = e3;
            var a4 = i4.querySelectorAll("li[data-indent]");
            for (t3 = 0; t3 < a4.length; t3++) {
              var s4 = a4[t3], l4 = s4.previousElementSibling;
              if (l4 && "LI" === l4.tagName) {
                var c4 = l4.querySelector(":scope > ul, :scope > ol");
                c4 || (c4 = document.createElement("ul"), l4.appendChild(c4)), c4.appendChild(s4);
              } else s4.removeAttribute("data-indent");
            }
            return x2.html.cleanBlankSpaces(i4), e3 = i4.innerHTML;
          })(e2))), x2.opts.pastePlain && (e2 = (function S2(e3) {
            var t3, n3 = null, r4 = x2.doc.createElement("div");
            r4.innerHTML = e3;
            var o4 = r4.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
            for (t3 = 0; t3 < o4.length; t3++) if ((n3 = o4[t3]).innerHTML) {
              var i4 = x2.clean.html("<".concat(x2.html.defaultTag() || "DIV", ">").concat(n3.innerHTML, "</").concat(x2.html.defaultTag() || "DIV", ">"));
              n3.outerHTML = i4;
            }
            for (o4 = r4.querySelectorAll("table, tbody, thead, th, tr, td, ul, ol, li"), t3 = 0; t3 < o4.length; t3++) {
              var a4 = (n3 = o4[t3]).tagName.toLowerCase();
              if (["table", "td", "tr", "th", "thead", "tbody"].includes(a4)) {
                var s4 = n3.getAttribute("style") || "", l4 = [];
                if (n3.hasAttribute("style") && s4) {
                  var c4 = s4.match(/border[^:]*\s*:\s*[^;]+/gi);
                  if (c4 && l4.push.apply(l4, R(c4)), "table" === a4) {
                    var d4 = s4.match(/border-collapse\s*:\s*[^;]+/i);
                    d4 && l4.push(d4[0]);
                  }
                }
                0 < l4.length && n3.setAttribute("style", l4.join("; "));
              } else n3.removeAttribute("style");
            }
            for (t3 = (o4 = r4.querySelectorAll("*:not(".concat("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, th, br, img".split(",").join("):not("), ")"))).length - 1; 0 <= t3; t3--) (n3 = o4[t3]).outerHTML = n3.innerHTML;
            return (function f4(e4) {
              for (var t4 = x2.node.contents(e4), n4 = 0; n4 < t4.length; n4++) t4[n4].nodeType !== Node.TEXT_NODE && t4[n4].nodeType !== Node.ELEMENT_NODE ? t4[n4].parentNode.removeChild(t4[n4]) : f4(t4[n4]);
            })(r4), r4.innerHTML;
          })(e2));
          var d3 = x2.events.chainTrigger("paste.afterCleanup", e2);
          if (x2.$el[0].removeAttribute("plainpaste", true), "string" == typeof d3 && (e2 = d3), "" !== e2) {
            var f3 = x2.o_doc.createElement("div");
            0 <= (f3.innerHTML = e2).indexOf("<body>") ? (x2.html.cleanBlankSpaces(f3), x2.spaces.normalize(f3, true)) : x2.spaces.normalize(f3);
            var p3 = f3.getElementsByTagName("span");
            for (r3 = p3.length - 1; 0 <= r3; r3--) {
              var u3 = p3[r3];
              0 === u3.attributes.length && (u3.outerHTML = u3.innerHTML);
            }
            if (true === x2.opts.linkAlwaysBlank) {
              var h3 = f3.getElementsByTagName("a");
              for (r3 = h3.length - 1; 0 <= r3; r3--) {
                var g3 = h3[r3];
                g3.getAttribute("target") || g3.setAttribute("target", "_blank");
              }
            }
            var C3 = x2.selection.element(), m3 = false;
            if (C3 && D(C3).parentsUntil(x2.el, "ul, ol").length && (m3 = true), m3) {
              var v2 = f3.children;
              1 === v2.length && 0 <= ["OL", "UL"].indexOf(v2[0].tagName) && (v2[0].outerHTML = v2[0].innerHTML);
            }
            if (!s3) {
              var b2 = f3.getElementsByTagName("br");
              for (r3 = b2.length - 1; 0 <= r3; r3--) {
                var E2 = b2[r3];
                x2.node.isBlock(E2.previousSibling) && E2.parentNode.removeChild(E2);
              }
            }
            if (x2.opts.enter === X.ENTER_BR) for (r3 = (o3 = f3.querySelectorAll("p, div")).length - 1; 0 <= r3; r3--) 0 === (i3 = o3[r3]).attributes.length && (i3.outerHTML = i3.innerHTML + (i3.nextSibling && !x2.node.isEmpty(i3) ? "<br>" : ""));
            else if (x2.opts.enter === X.ENTER_DIV) for (r3 = (o3 = f3.getElementsByTagName("p")).length - 1; 0 <= r3; r3--) 0 === (i3 = o3[r3]).attributes.length && (i3.outerHTML = "<div>".concat(i3.innerHTML, "</div>"));
            else x2.opts.enter === X.ENTER_P && 1 === f3.childNodes.length && "P" === f3.childNodes[0].tagName && 0 === f3.childNodes[0].attributes.length && (f3.childNodes[0].outerHTML = f3.childNodes[0].innerHTML);
            if (f3.childNodes[0] instanceof HTMLHeadingElement && x2.selection.element().tagName === f3.childNodes[0].tagName && (f3.childNodes[0].outerHTML = f3.childNodes[0].innerHTML), f3.children && 0 < f3.children.length) if (x2.opts.trackChangesEnabled) for (var L2 = 0; L2 < f3.children.length; L2++) f3.children[L2].setAttribute("data-pasted", "true");
            else f3.children[0].setAttribute("data-pasted", "true");
            var y2 = D(f3).find('[style*="page-break-before"], [style*="page-break-after"], [style*="break-before"], [style*="break-after"], [data-title="PageBreak"]');
            y2.length && y2.each(function(e3, t3) {
              x2.pageBreak.insert(t3);
            }), e2 = (e2 = f3.innerHTML).replace(/\n/g, ""), l3 && (e2 = (function A2(e3) {
              var t3, n3 = x2.o_doc.createElement("div");
              n3.innerHTML = e3;
              var r4 = n3.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(X.VOID_ELEMENTS.join("):not("), "):not(").concat(x2.opts.htmlAllowedEmptyTags.join("):not("), ")"));
              for (; r4.length; ) {
                for (t3 = 0; t3 < r4.length; t3++) r4[t3].parentNode.removeChild(r4[t3]);
                r4 = n3.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat(X.VOID_ELEMENTS.join("):not("), "):not(").concat(x2.opts.htmlAllowedEmptyTags.join("):not("), ")"));
              }
              return n3.innerHTML;
            })(e2)), x2.html.insert(e2, true);
          }
          !(function M2() {
            x2.events.trigger("paste.after");
          })(), x2.undo.saveStep($), $ = null, x2.undo.saveStep();
        }
        function C2(e2) {
          for (var t2 = e2.length - 1; 0 <= t2; t2--) e2[t2].attributes && e2[t2].attributes.length && e2.splice(t2, 1);
          return e2;
        }
        function H(e2) {
          var t2, n2 = x2.o_doc.createElement("div");
          n2.innerHTML = e2;
          for (var r3 = C2(Array.prototype.slice.call(n2.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); r3.length; ) {
            var o3 = r3[r3.length - 1];
            if (x2.html.defaultTag() && "div" !== x2.html.defaultTag()) o3.querySelector(x2.html.blockTagsQuery()) ? o3.outerHTML = o3.innerHTML : o3.outerHTML = "<".concat(x2.html.defaultTag(), ">").concat(o3.innerHTML, "</").concat(x2.html.defaultTag(), ">");
            else {
              var i3 = o3.querySelectorAll("*");
              !i3.length || "BR" !== i3[i3.length - 1].tagName && 0 === o3.innerText.length ? o3.outerHTML = o3.innerHTML + (o3.nextSibling ? "<br>" : "") : !i3.length || "BR" !== i3[i3.length - 1].tagName || i3[i3.length - 1].nextSibling ? o3.outerHTML = o3.innerHTML + (o3.nextSibling ? "<br>" : "") : o3.outerHTML = o3.innerHTML;
            }
            r3 = C2(Array.prototype.slice.call(n2.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")));
          }
          for (r3 = C2(Array.prototype.slice.call(n2.querySelectorAll("div:not([style])"))); r3.length; ) {
            for (t2 = 0; t2 < r3.length; t2++) {
              var a3 = r3[t2], s3 = a3.innerHTML.replace(/\u0009/gi, "").trim();
              a3.outerHTML = s3;
            }
            r3 = C2(Array.prototype.slice.call(n2.querySelectorAll("div:not([style])")));
          }
          return n2.innerHTML;
        }
        function s2() {
          x2.el.removeEventListener("copy", e), x2.el.removeEventListener("cut", e), x2.el.removeEventListener("paste", n);
        }
        function m2() {
          var e2 = navigator.userAgent.match(/chrome\/(\d+)/i), t2 = e2 ? parseInt(e2[1], 10) : 0;
          return x2.helpers.isAndroid() && x2.browser.chrome && 99 < t2;
        }
        return { _init: function v2() {
          x2.el.addEventListener("copy", e), x2.el.addEventListener("cut", e), x2.el.addEventListener("paste", n, { capture: true }), x2.events.on("drop", r2), x2.browser.msie && x2.browser.version < 11 && (x2.events.on("mouseup", function(e2) {
            2 === e2.button && (setTimeout(function() {
              t = false;
            }, 50), t = true);
          }, true), x2.events.on("beforepaste", n)), x2.events.on("destroy", s2);
        }, cleanEmptyTagsAndDivs: H, getRtfClipboard: function b2() {
          return f2;
        }, saveCopiedText: a2, clean: o2, replaceNewLines: p2 };
      }, Object.assign(X.DEFAULTS, { shortcutsEnabled: [], shortcutsHint: true }), X.SHORTCUTS_MAP = {}, X.RegisterShortcut = function(e, t, n, r2, o2, i2) {
        X.SHORTCUTS_MAP[(o2 ? "^" : "") + (i2 ? "@" : "") + e] = { cmd: t, val: n, letter: r2, shift: o2, option: i2 }, X.DEFAULTS.shortcutsEnabled.push(t);
      }, X.RegisterShortcut(X.KEYCODE.E, "show", null, "E", false, false), X.RegisterShortcut(X.KEYCODE.B, "bold", null, "B", false, false), X.RegisterShortcut(X.KEYCODE.I, "italic", null, "I", false, false), X.RegisterShortcut(X.KEYCODE.U, "underline", null, "U", false, false), X.RegisterShortcut(X.KEYCODE.S, "strikeThrough", null, "S", false, false), X.RegisterShortcut(X.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", false, false), X.RegisterShortcut(X.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", false, false), X.RegisterShortcut(X.KEYCODE.Z, "undo", null, "Z", false, false), X.RegisterShortcut(X.KEYCODE.Z, "redo", null, "Z", true, false), X.RegisterShortcut(X.KEYCODE.Y, "redo", null, "Y", false, false), X.MODULES.shortcuts = function(s2) {
        var r2 = null;
        var l2 = false;
        function e(e2) {
          if (!s2.core.hasFocus()) return true;
          var t = e2.which, n = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e2.metaKey : e2.ctrlKey;
          if ("keyup" === e2.type && l2 && t !== X.KEYCODE.META) return l2 = false;
          "keydown" === e2.type && (l2 = false);
          var r3 = (e2.shiftKey ? "^" : "") + (e2.altKey ? "@" : "") + t, o2 = s2.node.blockParent(s2.selection.blocks()[0]);
          if (o2 && "TR" == o2.tagName && o2.getAttribute("contenteditable") == void 0 && (o2 = o2.closest("table")), n && X.SHORTCUTS_MAP[r3] && (!o2 || "false" !== o2.getAttribute("contenteditable"))) {
            var i2 = X.SHORTCUTS_MAP[r3].cmd;
            if (i2 && 0 <= s2.opts.shortcutsEnabled.indexOf(i2)) {
              var a2 = X.SHORTCUTS_MAP[r3].val;
              if (false === s2.events.trigger("shortcut", [e2, i2, a2])) return !(l2 = true);
              if (i2 && (s2.commands[i2] || X.COMMANDS[i2] && X.COMMANDS[i2].callback)) return e2.preventDefault(), e2.stopPropagation(), "keydown" === e2.type && ((s2.commands[i2] || X.COMMANDS[i2].callback)(), l2 = true), false;
            }
          }
        }
        return { _init: function t() {
          s2.events.on("keydown", e, true), s2.events.on("keyup", e, true);
        }, get: function o2(e2) {
          if (!s2.opts.shortcutsHint) return null;
          if (!r2) for (var t in r2 = {}, X.SHORTCUTS_MAP) Object.prototype.hasOwnProperty.call(X.SHORTCUTS_MAP, t) && 0 <= s2.opts.shortcutsEnabled.indexOf(X.SHORTCUTS_MAP[t].cmd) && (r2["".concat(X.SHORTCUTS_MAP[t].cmd, ".").concat(X.SHORTCUTS_MAP[t].val || "")] = { shift: X.SHORTCUTS_MAP[t].shift, option: X.SHORTCUTS_MAP[t].option, letter: X.SHORTCUTS_MAP[t].letter });
          var n = r2[e2];
          return n ? (s2.helpers.isMac() ? String.fromCharCode(8984) : "".concat(s2.language.translate("Ctrl"), "+")) + (n.shift ? s2.helpers.isMac() ? String.fromCharCode(8679) : "".concat(s2.language.translate("Shift"), "+") : "") + (n.option ? s2.helpers.isMac() ? String.fromCharCode(8997) : "".concat(s2.language.translate("Alt"), "+") : "") + n.letter : null;
        } };
      }, X.MODULES.snapshot = function(l2) {
        function n(e) {
          for (var t = e.parentNode.childNodes, n2 = 0, r3 = null, o3 = 0; o3 < t.length; o3++) {
            if (r3) {
              var i3 = t[o3].nodeType === Node.TEXT_NODE && "" === t[o3].textContent, a2 = r3.nodeType === Node.TEXT_NODE && t[o3].nodeType === Node.TEXT_NODE, s2 = r3.nodeType === Node.TEXT_NODE && "" === r3.textContent;
              i3 || a2 || s2 || n2++;
            }
            if (t[o3] === e) return n2;
            r3 = t[o3];
          }
        }
        function o2(e) {
          var t = [];
          if (!e.parentNode) return [];
          for (; !l2.node.isElement(e); ) t.push(n(e)), e = e.parentNode;
          return t.reverse();
        }
        function i2(e, t) {
          for (; e && e.nodeType === Node.TEXT_NODE; ) {
            var n2 = e.previousSibling;
            n2 && n2.nodeType === Node.TEXT_NODE && (t += n2.textContent.length), e = n2;
          }
          return t;
        }
        function c2(e) {
          for (var t = l2.el, n2 = 0; n2 < e.length; n2++) t = t.childNodes[e[n2]];
          return t;
        }
        function r2(e, t) {
          try {
            var n2 = c2(t.scLoc), r3 = t.scOffset, o3 = c2(t.ecLoc), i3 = t.ecOffset, a2 = l2.doc.createRange();
            a2.setStart(n2, r3), a2.setEnd(o3, i3), e.addRange(a2);
          } catch (s2) {
          }
        }
        return { get: function a2() {
          var e, t = {};
          if (l2.events.trigger("snapshot.before"), t.html = (l2.$wp ? l2.$el.html() : l2.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l2.$wp && l2.selection.inEditor() && l2.core.hasFocus()) for (var n2 = l2.selection.ranges(), r3 = 0; r3 < n2.length; r3++) t.ranges.push({ scLoc: o2((e = n2[r3]).startContainer), scOffset: i2(e.startContainer, e.startOffset), ecLoc: o2(e.endContainer), ecOffset: i2(e.endContainer, e.endOffset) });
          return l2.events.trigger("snapshot.after", [t]), t;
        }, restore: function s2(e) {
          l2.$el.html() !== e.html && (l2.opts.htmlExecuteScripts ? l2.$el.html(e.html) : l2.el.innerHTML = e.html);
          var t = l2.selection.get();
          l2.selection.clear(), l2.events.focus(true);
          for (var n2 = 0; n2 < e.ranges.length; n2++) r2(t, e.ranges[n2]);
        }, equal: function d2(e, t) {
          return e.html === t.html && (!l2.core.hasFocus() || JSON.stringify(e.ranges) === JSON.stringify(t.ranges));
        } };
      }, X.MODULES.undo = function(n) {
        function e(e2) {
          var t2 = e2.which;
          n.keys.ctrlKey(e2) && (t2 === X.KEYCODE.Z && e2.shiftKey && e2.preventDefault(), t2 === X.KEYCODE.Z && e2.preventDefault());
        }
        var t = null;
        function r2() {
          if (n.undo_stack && !n.undoing) for (; n.undo_stack.length > n.undo_index; ) n.undo_stack.pop();
        }
        function o2() {
          n.undo_index = 0, n.undo_stack = [];
        }
        function i2() {
          n.undo_stack = [];
        }
        return { _init: function a2() {
          o2(), n.events.on("initialized", function() {
            t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "");
          }), n.events.on("blur", function() {
            n.el.querySelector(".fr-dragging") || n.undo.saveStep();
          }), n.events.on("keydown", e), n.events.on("destroy", i2);
        }, run: function s2() {
          if (1 < n.undo_index) {
            n.undoing = true;
            var e2 = n.undo_stack[--n.undo_index - 1];
            clearTimeout(n._content_changed_timer), n.snapshot.restore(e2), t = e2.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.undo"), n.undoing = false, n.selection.restore();
          }
        }, redo: function l2() {
          if (n.undo_index < n.undo_stack.length) {
            n.undoing = true;
            var e2 = n.undo_stack[n.undo_index++];
            clearTimeout(n._content_changed_timer), n.snapshot.restore(e2), t = e2.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.redo"), n.undoing = false;
          }
        }, canDo: function c2() {
          return !(0 === n.undo_stack.length || n.undo_index <= 1);
        }, canRedo: function d2() {
          return n.undo_index !== n.undo_stack.length;
        }, dropRedo: r2, reset: o2, saveStep: function f2(e2) {
          if (!(!n.undo_stack || n.undoing || n.el.querySelector(".fr-marker") || n.el.querySelector(".fr-marker") && n.opts.iframe && n.markdown && !n.markdown.isEnabled())) if (void 0 === e2) {
            if ((e2 = n.snapshot.get()) && e2.html && n.undo_stack[n.undo_index - 1] && e2.html === n.undo_stack[n.undo_index - 1].html) return;
            n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e2) || (r2(), n.undo_stack.push(e2), n.undo_index++, (function o3(e3, t2) {
              var n2 = t2.split("fr-selected-cell").join("");
              n2 = n2.split(' class=""').join("");
              var r3 = e3.split("fr-selected-cell").join("");
              return n2 === (r3 = r3.split(' class=""').join(""));
            })(t, e2.html) || (n.events.trigger("contentChanged"), t = e2.html));
          } else r2(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e2 : (n.undo_stack.push(e2), n.undo_index++);
        } };
      }, X.ICON_TEMPLATES = { font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>', font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>', font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>', font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>', font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>', text: '<span style="text-align: center;">[NAME]</span>', image: "<img src=[SRC] alt=[ALT] />", svg: '<svg class="fr-svg" focusable="false" viewBox="[VIEWBOX]" xmlns="http://www.w3.org/2000/svg"><path d="[PATH]"/></svg>', svgMultiplePath: '<svg class="fr-svg" focusable="false" viewBox="[VIEWBOX]" xmlns="http://www.w3.org/2000/svg">[PATHS]</svg>', empty: " " }, X.ICONS = { bold: { NAME: "bold", SVG_KEY: "bold" }, italic: { NAME: "italic", SVG_KEY: "italic" }, underline: { NAME: "underline", SVG_KEY: "underline" }, strikeThrough: { NAME: "strikethrough", SVG_KEY: "strikeThrough" }, subscript: { NAME: "subscript", SVG_KEY: "subscript" }, superscript: { NAME: "superscript", SVG_KEY: "superscript" }, cancel: { NAME: "cancel", SVG_KEY: "cancel" }, color: { NAME: "tint", SVG_KEY: "textColor" }, outdent: { NAME: "outdent", SVG_KEY: "outdent" }, indent: { NAME: "indent", SVG_KEY: "indent" }, undo: { NAME: "rotate-left", FA5NAME: "undo", SVG_KEY: "undo" }, redo: { NAME: "rotate-right", FA5NAME: "redo", SVG_KEY: "redo" }, insert: { NAME: "insert", SVG_KEY: "insert" }, insertAll: { NAME: "insertAll", SVG_KEY: "insertAll" }, insertHR: { NAME: "minus", SVG_KEY: "horizontalLine" }, clearFormatting: { NAME: "eraser", SVG_KEY: "clearFormatting" }, selectAll: { NAME: "mouse-pointer", SVG_KEY: "selectAll" }, minimize: { NAME: "minimize", SVG_KEY: "minimize" }, moreText: { NAME: "ellipsis-v", SVG_KEY: "textMore" }, moreParagraph: { NAME: "ellipsis-v", SVG_KEY: "paragraphMore" }, moreRich: { NAME: "ellipsis-v", SVG_KEY: "insertMore" }, moreMisc: { NAME: "ellipsis-v", SVG_KEY: "more" } }, X.DefineIconTemplate = function(e, t) {
        X.ICON_TEMPLATES[e] = t;
      }, X.DefineIcon = function(e, t) {
        X.ICONS[e] = t;
      }, Object.assign(X.DEFAULTS, { iconsTemplate: "svg" }), X.MODULES.icon = function(o2) {
        return { create: function i2(n) {
          var e = null, r2 = X.ICONS[n];
          if (void 0 !== r2) {
            var t = r2.template || X.ICON_DEFAULT_TEMPLATE || o2.opts.iconsTemplate;
            t && t.apply && (t = t.apply(o2)), r2.FA5NAME || (r2.FA5NAME = r2.NAME), "svg" !== t || r2.PATH || (r2.PATH = X.SVG[r2.SVG_KEY] || ""), t && (t = X.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function(e2, t2) {
              return "NAME" === t2 ? r2[t2] || n : "VIEWBOX" === t2 ? r2[t2] || "0 0 24 24" : r2[t2];
            }));
          }
          return e || n;
        }, getTemplate: function r2(e) {
          var t = X.ICONS[e], n = o2.opts.iconsTemplate;
          return void 0 !== t ? n = t.template || X.ICON_DEFAULT_TEMPLATE || o2.opts.iconsTemplate : n;
        }, getFileIcon: function n(e) {
          var t = X.FILEICONS[e];
          return void 0 !== t ? t : e;
        } };
      }, X.SVG = { imageTransformations: "M3 5.8h2.8V3H3v2.8Zm0 7.6h2.8v-2.8H3v2.8Zm15.2 0H21v-2.8h-2.8v2.8Zm-7.6-7.6h2.8V3h-2.8v2.8Zm0 14.2h2.8v-2.8h-2.8V20ZM3 20h2.8v-2.8H3V20ZM18.2 5.8H21V3h-2.8v2.8Zm0 14.2H21v-2.8h-2.8V20ZM6.8 4.9h2.8V4H6.8v.9Zm0 14.2h2.8v-.9H6.8v.9Zm7.6-14.2h2.8V4h-2.8v.9Zm0 14.2h2.8v-.9h-2.8v.9ZM3.9 9.6h.9V6.8h-.9v2.8Zm15.2 0h.9V6.8h-.9v2.8ZM3.9 16.2h.9v-1.9h-.9v1.9Zm15.2 0h.9v-1.9h-.9v1.9ZM15.8 14l-2.2 2.3V14h2.2Zm0-6.8v6.2H15V8H9v7.3h4.1v.9H8.2v-9h7.6Zm-4.3 5.3v.8h-.8v-.8h.8Zm1.3-1.4v.8h-2.2v-.8h2.2Zm.6-1.5v.8h-2.7v-.8h2.7Z", filestackIcon: "M19 16.5 15 21v-4.5h4Zm0-1.125h-1.5V4.687h-11v14.625l7.5.001V21H5V3h14v12.375Zm-8-1.687v1.687H9.5v-1.687H11Zm2.5-2.813v1.687h-4v-1.687h4Zm1-2.813v1.687h-5V8.062h5Z", add: "M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z", advancedImageEditor: "M3,17v2h6v-2H3z M3,5v2h10V5H3z M13,21v-2h8v-2h-8v-2h-2v6H13z M7,9v2H3v2h4v2h2V9H7z M21,13v-2H11v2H21z M15,9h2V7h4V5h-4  V3h-2V9z", alignCenter: "M9,18h6v-2H9V18z M6,11v2h12v-2H6z M3,6v2h18V6H3z", alignJustify: "M3,18h18v-2H3V18z M3,11v2h18v-2H3z M3,6v2h18V6H3z", alignLeft: "M3,18h6v-2H3V18z M3,11v2h12v-2H3z M3,6v2h18V6H3z", alignRight: "M15,18h6v-2h-6V18z M9,11v2h12v-2H9z M3,6v2h18V6H3z", anchors: "M16,4h-4H8C6.9,4,6,4.9,6,6v4v10l6-2.6l6,2.6V10V6C18,4.9,17.1,4,16,4z M16,17l-4-1.8L8,17v-7V6h4h4v4V17z", autoplay: "M 7.570312 0.292969 C 7.542969 0.292969 7.515625 0.292969 7.488281 0.296875 C 7.203125 0.324219 6.984375 0.539062 6.980469 0.792969 L 6.925781 3.535156 C 2.796875 3.808594 -0.0078125 6.425781 -0.0859375 10.09375 C -0.121094 11.96875 0.710938 13.6875 2.265625 14.921875 C 3.769531 16.117188 5.839844 16.796875 8.097656 16.828125 C 8.140625 16.828125 12.835938 16.898438 13.035156 16.886719 C 15.171875 16.796875 17.136719 16.128906 18.558594 15.003906 C 20.066406 13.816406 20.882812 12.226562 20.917969 10.40625 C 20.960938 8.410156 20.023438 6.605469 18.289062 5.335938 C 18.214844 5.277344 18.128906 5.230469 18.035156 5.203125 C 17.636719 5.074219 17.222656 5.199219 17 5.476562 L 15.546875 7.308594 C 15.304688 7.609375 15.363281 8.007812 15.664062 8.265625 C 16.351562 8.851562 16.707031 9.625 16.6875 10.5 C 16.652344 12.25 15.070312 13.390625 12.757812 13.535156 C 12.59375 13.539062 8.527344 13.472656 8.164062 13.464844 C 5.703125 13.429688 4.101562 12.191406 4.140625 10.3125 C 4.175781 8.570312 5.132812 7.46875 6.847656 7.199219 L 6.796875 9.738281 C 6.792969 9.992188 7 10.214844 7.285156 10.253906 C 7.3125 10.257812 7.339844 10.257812 7.367188 10.257812 C 7.503906 10.261719 7.632812 10.222656 7.738281 10.148438 L 14.039062 5.785156 C 14.171875 5.691406 14.253906 5.558594 14.253906 5.410156 C 14.257812 5.261719 14.1875 5.125 14.058594 5.027344 L 7.941406 0.414062 C 7.835938 0.335938 7.707031 0.292969 7.570312 0.292969 ", back: "M20 11L7.83 11 11.425 7.405 10.01 5.991 5.416 10.586 5.414 10.584 4 11.998 4.002 12 4 12.002 5.414 13.416 5.416 13.414 10.01 18.009 11.425 16.595 7.83 13 20 13 20 13 20 11 20 11Z", backgroundColor: "M9.91752,12.24082l7.74791-5.39017,1.17942,1.29591-6.094,7.20747L9.91752,12.24082M7.58741,12.652l4.53533,4.98327a.93412.93412,0,0,0,1.39531-.0909L20.96943,8.7314A.90827.90827,0,0,0,20.99075,7.533l-2.513-2.76116a.90827.90827,0,0,0-1.19509-.09132L7.809,11.27135A.93412.93412,0,0,0,7.58741,12.652ZM2.7939,18.52772,8.41126,19.5l1.47913-1.34617-3.02889-3.328Z", blockquote: "M10.31788,5l.93817,1.3226A12.88271,12.88271,0,0,0,8.1653,9.40125a5.54242,5.54242,0,0,0-.998,3.07866v.33733q.36089-.04773.66067-.084a4.75723,4.75723,0,0,1,.56519-.03691,2.87044,2.87044,0,0,1,2.11693.8427,2.8416,2.8416,0,0,1,.8427,2.09274,3.37183,3.37183,0,0,1-.8898,2.453A3.143,3.143,0,0,1,8.10547,19,3.40532,3.40532,0,0,1,5.375,17.7245,4.91156,4.91156,0,0,1,4.30442,14.453,9.3672,9.3672,0,0,1,5.82051,9.32933,14.75716,14.75716,0,0,1,10.31788,5Zm8.39243,0,.9369,1.3226a12.88289,12.88289,0,0,0-3.09075,3.07865,5.54241,5.54241,0,0,0-.998,3.07866v.33733q.33606-.04773.63775-.084a4.91773,4.91773,0,0,1,.58938-.03691,2.8043,2.8043,0,0,1,2.1042.83,2.89952,2.89952,0,0,1,.80578,2.10547,3.42336,3.42336,0,0,1-.86561,2.453A3.06291,3.06291,0,0,1,16.49664,19,3.47924,3.47924,0,0,1,13.742,17.7245,4.846,4.846,0,0,1,12.64721,14.453,9.25867,9.25867,0,0,1,14.17476,9.3898,15.26076,15.26076,0,0,1,18.71031,5Z", bold: "M15.25,11.8h0A3.68,3.68,0,0,0,17,9a3.93,3.93,0,0,0-3.86-4H6.65V19h7a3.74,3.74,0,0,0,3.7-3.78V15.1A3.64,3.64,0,0,0,15.25,11.8ZM8.65,7h4.2a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61,2.23,2.23,0,0,1-.63.09H8.65Zm4.6,10H8.65V13h4.6a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61A2.23,2.23,0,0,1,13.25,17Z", cancel: "M13.4,12l5.6,5.6L17.6,19L12,13.4L6.4,19L5,17.6l5.6-5.6L5,6.4L6.4,5l5.6,5.6L17.6,5L19,6.4L13.4,12z", cellBackground: "M16.6,12.4L7.6,3.5L6.2,4.9l2.4,2.4l-5.2,5.2c-0.6,0.6-0.6,1.5,0,2.1l5.5,5.5c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4  l5.5-5.5C17.2,14,17.2,13,16.6,12.4z M5.2,13.5L10,8.7l4.8,4.8H5.2z M19,15c0,0-2,2.2-2,3.5c0,1.1,0.9,2,2,2s2-0.9,2-2  C21,17.2,19,15,19,15z", cellBorderColor: "M22,22H2v2h20V22z", cellOptions: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M9.5,6.5h5V9h-5V6.5z M8,17.5H4  c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z   M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4  c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0V9z", cellStyle: "M20,19.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L12.3,17h3.8l1.7-3.5l1.4,3.5H23L20,19.9z M20,5H4C2.9,5,2,5.9,2,7v10  c0,1.1,0.9,2,2,2h7.5l-0.6-0.6L10,17.5H9.5V15h5.4l1.1-2.3v-2.2h4.5v3H20l0.6,1.5H22V7C22,5.9,21.1,5,20,5z M3.5,7  c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0.1,0h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M4,17.5c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0-0.1v-2H8v2.5H4  z M14.5,9h-5V6.5h5V9z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0.1V9z", clearFormatting: "M11.48,10.09l-1.2-1.21L8.8,7.41,6.43,5,5.37,6.1,8.25,9,4.66,19h2l1.43-4h5.14l1.43,4h2l-.89-2.51L18.27,19l1.07-1.06L14.59,13.2ZM8.8,13l.92-2.56L12.27,13Zm.56-7.15L9.66,5h2l1.75,4.9Z", close: "M13.4,12l5.6,5.6L17.6,19L12,13.4L6.4,19L5,17.6l5.6-5.6L5,6.4L6.4,5l5.6,5.6L17.6,5L19,6.4L13.4,12z", codeView: "M9.4,16.6,4.8,12,9.4,7.4,8,6,2,12l6,6Zm5.2,0L19.2,12,14.6,7.4,16,6l6,6-6,6Z", cogs: "M18.877 12.907a6.459 6.459 0 0 0 0 -1.814l1.952 -1.526a0.468 0.468 0 0 0 0.111 -0.593l-1.851 -3.2a0.461 0.461 0 0 0 -0.407 -0.231 0.421 0.421 0 0 0 -0.157 0.028l-2.3 0.925a6.755 6.755 0 0 0 -1.563 -0.907l-0.352 -2.452a0.451 0.451 0 0 0 -0.453 -0.388h-3.7a0.451 0.451 0 0 0 -0.454 0.388L9.347 5.588A7.077 7.077 0 0 0 7.783 6.5l-2.3 -0.925a0.508 0.508 0 0 0 -0.166 -0.028 0.457 0.457 0 0 0 -0.4 0.231l-1.851 3.2a0.457 0.457 0 0 0 0.111 0.593l1.952 1.526A7.348 7.348 0 0 0 5.063 12a7.348 7.348 0 0 0 0.064 0.907L3.175 14.433a0.468 0.468 0 0 0 -0.111 0.593l1.851 3.2a0.461 0.461 0 0 0 0.407 0.231 0.421 0.421 0 0 0 0.157 -0.028l2.3 -0.925a6.74 6.74 0 0 0 1.564 0.907L9.7 20.864a0.451 0.451 0 0 0 0.454 0.388h3.7a0.451 0.451 0 0 0 0.453 -0.388l0.352 -2.452a7.093 7.093 0 0 0 1.563 -0.907l2.3 0.925a0.513 0.513 0 0 0 0.167 0.028 0.457 0.457 0 0 0 0.4 -0.231l1.851 -3.2a0.468 0.468 0 0 0 -0.111 -0.593Zm-0.09 2.029l-0.854 1.476 -2.117 -0.852 -0.673 0.508a5.426 5.426 0 0 1 -1.164 0.679l-0.795 0.323 -0.33 2.269h-1.7l-0.32 -2.269 -0.793 -0.322a5.3 5.3 0 0 1 -1.147 -0.662L8.2 15.56l-2.133 0.86 -0.854 -1.475 1.806 -1.411 -0.1 -0.847c-0.028 -0.292 -0.046 -0.5 -0.046 -0.687s0.018 -0.4 0.045 -0.672l0.106 -0.854L5.217 9.064l0.854 -1.475 2.117 0.851 0.673 -0.508a5.426 5.426 0 0 1 1.164 -0.679l0.8 -0.323 0.331 -2.269h1.7l0.321 2.269 0.792 0.322a5.3 5.3 0 0 1 1.148 0.661l0.684 0.526 2.133 -0.859 0.853 1.473 -1.8 1.421 0.1 0.847a5 5 0 0 1 0.046 0.679c0 0.193 -0.018 0.4 -0.045 0.672l-0.106 0.853ZM12 14.544A2.544 2.544 0 1 1 14.546 12 2.552 2.552 0 0 1 12 14.544Z", columns: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z M20.5,17  c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0  V9z", edit: "M17,11.2L12.8,7L5,14.8V19h4.2L17,11.2z M7,16.8v-1.5l5.6-5.6l1.4,1.5l-5.6,5.6H7z M13.5,6.3l0.7-0.7c0.8-0.8,2.1-0.8,2.8,0  c0,0,0,0,0,0L18.4,7c0.8,0.8,0.8,2,0,2.8l-0.7,0.7L13.5,6.3z", exitFullscreen: "M5,16H8v3h2V14H5ZM8,8H5v2h5V5H8Zm6,11h2V16h3V14H14ZM16,8V5H14v5h5V8Z", fileInsert: "M 8.09375 12.75 L 5.90625 12.75 C 5.542969 12.75 5.25 12.394531 5.25 11.953125 L 5.25 6.375 L 2.851562 6.375 C 2.367188 6.375 2.121094 5.660156 2.464844 5.242188 L 6.625 0.1875 C 6.832031 -0.0585938 7.167969 -0.0585938 7.371094 0.1875 L 11.535156 5.242188 C 11.878906 5.660156 11.632812 6.375 11.148438 6.375 L 8.75 6.375 L 8.75 11.953125 C 8.75 12.394531 8.457031 12.75 8.09375 12.75 Z M 14 12.484375 L 14 16.203125 C 14 16.644531 13.707031 17 13.34375 17 L 0.65625 17 C 0.292969 17 0 16.644531 0 16.203125 L 0 12.484375 C 0 12.042969 0.292969 11.6875 0.65625 11.6875 L 4.375 11.6875 L 4.375 11.953125 C 4.375 12.980469 5.0625 13.8125 5.90625 13.8125 L 8.09375 13.8125 C 8.9375 13.8125 9.625 12.980469 9.625 11.953125 L 9.625 11.6875 L 13.34375 11.6875 C 13.707031 11.6875 14 12.042969 14 12.484375 Z M 10.609375 15.40625 C 10.609375 15.039062 10.363281 14.742188 10.0625 14.742188 C 9.761719 14.742188 9.515625 15.039062 9.515625 15.40625 C 9.515625 15.773438 9.761719 16.070312 10.0625 16.070312 C 10.363281 16.070312 10.609375 15.773438 10.609375 15.40625 Z M 12.359375 15.40625 C 12.359375 15.039062 12.113281 14.742188 11.8125 14.742188 C 11.511719 14.742188 11.265625 15.039062 11.265625 15.40625 C 11.265625 15.773438 11.511719 16.070312 11.8125 16.070312 C 12.113281 16.070312 12.359375 15.773438 12.359375 15.40625 Z M 12.359375 15.40625 ", fileManager: "M 0 5.625 L 20.996094 5.625 L 21 15.75 C 21 16.371094 20.410156 16.875 19.6875 16.875 L 1.3125 16.875 C 0.585938 16.875 0 16.371094 0 15.75 Z M 0 5.625 M 21 4.5 L 0 4.5 L 0 2.25 C 0 1.628906 0.585938 1.125 1.3125 1.125 L 6.921875 1.125 C 7.480469 1.125 8.015625 1.316406 8.40625 1.652344 L 9.800781 2.847656 C 10.195312 3.183594 10.730469 3.375 11.289062 3.375 L 19.6875 3.375 C 20.414062 3.375 21 3.878906 21 4.5 Z M 21 4.5", markdown: "M5.55006 17.75V7.35L8.96006 16.89H10.7101L14.2301 7.37V14.0729C14.3951 14.1551 14.5499 14.265 14.6875 14.4026L14.7001 14.4151V11.64C14.7001 10.8583 15.2127 10.1963 15.9201 9.97171V5H13.6801L10.0401 14.86L6.51006 5H4.00006V17.75H5.55006ZM17.2001 11.64C17.2001 11.2258 16.8643 10.89 16.4501 10.89C16.0359 10.89 15.7001 11.2258 15.7001 11.64V16.8294L13.9804 15.1097C13.6875 14.8168 13.2126 14.8168 12.9197 15.1097C12.6269 15.4026 12.6269 15.8775 12.9197 16.1703L15.9197 19.1703C16.2126 19.4632 16.6875 19.4632 16.9804 19.1703L19.9804 16.1703C20.2733 15.8775 20.2733 15.4026 19.9804 15.1097C19.6875 14.8168 19.2126 14.8168 18.9197 15.1097L17.2001 16.8294V11.64Z", fontAwesome: "M18.99018,13.98212V7.52679c-.08038-1.21875-1.33929-.683-1.33929-.683-2.933,1.39282-4.36274.61938-5.85938.15625a6.23272,6.23272,0,0,0-2.79376-.20062l-.00946.004A1.98777,1.98777,0,0,0,7.62189,5.106a.984.984,0,0,0-.17517-.05432c-.02447-.0055-.04882-.01032-.0736-.0149A.9565.9565,0,0,0,7.1908,5H6.82539a.9565.9565,0,0,0-.18232.0368c-.02472.00458-.04907.0094-.07348.01484a.985.985,0,0,0-.17523.05438,1.98585,1.98585,0,0,0-.573,3.49585v9.394A1.004,1.004,0,0,0,6.82539,19H7.1908a1.00406,1.00406,0,0,0,1.00409-1.00409V15.52234c3.64221-1.09827,5.19709.64282,7.09888.57587a5.57291,5.57291,0,0,0,3.25446-1.05805A1.2458,1.2458,0,0,0,18.99018,13.98212Z", fontFamily: "M16,19h2L13,5H11L6,19H8l1.43-4h5.14Zm-5.86-6L12,7.8,13.86,13Z", fontSize: "M20.75,19h1.5l-3-10h-1.5l-3,10h1.5L17,16.5h3Zm-3.3-4,1.05-3.5L19.55,15Zm-5.7,4h2l-5-14h-2l-5,14h2l1.43-4h5.14ZM5.89,13,7.75,7.8,9.61,13Z", fullscreen: "M7,14H5v5h5V17H7ZM5,10H7V7h3V5H5Zm12,7H14v2h5V14H17ZM14,5V7h3v3h2V5Z", help: "M11,17h2v2h-2V17z M12,5C9.8,5,8,6.8,8,9h2c0-1.1,0.9-2,2-2s2,0.9,2,2c0,2-3,1.7-3,5v1h2v-1c0-2.2,3-2.5,3-5  C16,6.8,14.2,5,12,5z", horizontalLine: "M5,12h14 M19,11H5v2h14V11z", imageAltText: "M19,7h-6v12h-2V7H5V5h6h2h6V7z", imageCaption: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z M22,22H2v2h20V22z", imageClass: "M9.5,13.4l-2.9-2.9h3.8L12.2,7l1.4,3.5h3.8l-3,2.9l0.9,3.6L12,15.1L8.8,17L9.5,13.4z M22,6v12c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,6H4v12h16V8.8V6z", imageDisplay: "M3,5h18v2H3V5z M13,9h8v2h-8V9z M13,13h8v2h-8V13z M3,17h18v2H3V17z M3,9h8v6H3V9z", imageManager: "M20,6h-7l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V6h6.2l2,2H20V18z   M18,16l-3.8-5H14l-2.9,3.8L9,12.1L6,16H18z M10,9.5C10,8.7,9.3,8,8.5,8S7,8.7,7,9.5S7.7,11,8.5,11S10,10.3,10,9.5z", imageSize: "M16.9,4c-0.3,0-0.5,0.2-0.8,0.3L3.3,13c-0.9,0.6-1.1,1.9-0.5,2.8l2.2,3.3c0.4,0.7,1.2,1,2,0.8c0.3,0,0.5-0.2,0.8-0.3  L20.7,11c0.9-0.6,1.1-1.9,0.5-2.8l-2.2-3.3C18.5,4.2,17.7,3.9,16.9,4L16.9,4z M16.9,9.9L18.1,9l-2-2.9L17,5.6c0.1,0,0.1-0.1,0.2-0.1  c0.2,0,0.4,0,0.5,0.2L19.9,9c0.2,0.2,0.1,0.5-0.1,0.7L7,18.4c-0.1,0-0.1,0.1-0.2,0.1c-0.2,0-0.4,0-0.5-0.2L4.1,15  c-0.2-0.2-0.1-0.5,0.1-0.7L5,13.7l2,2.9l1.2-0.8l-2-2.9L7.5,12l1.1,1.7l1.2-0.8l-1.1-1.7l1.2-0.8l2,2.9l1.2-0.8l-2-2.9l1.2-0.8  l1.1,1.7l1.2-0.8l-1.1-1.7L14.9,7L16.9,9.9z", indent: "M3,9v6l3-3L3,9z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z", inlineClass: "M9.9,13.313A1.2,1.2,0,0,1,9.968,13H6.277l1.86-5.2,1.841,5.148A1.291,1.291,0,0,1,11.212,12h.426l-2.5-7h-2l-5,14h2l1.43-4H9.9Zm2.651,6.727a2.884,2.884,0,0,1-.655-2.018v-2.71A1.309,1.309,0,0,1,13.208,14h3.113a3.039,3.039,0,0,1,2,1.092s1.728,1.818,2.964,2.928a1.383,1.383,0,0,1,.318,1.931,1.44,1.44,0,0,1-.19.215l-3.347,3.31a1.309,1.309,0,0,1-1.832.258h0a1.282,1.282,0,0,1-.258-.257l-1.71-1.728Zm2.48-3.96a.773.773,0,1,0,.008,0Z", inlineStyle: "M11.88,15h.7l.7-1.7-3-8.3h-2l-5,14h2l1.4-4Zm-4.4-2,1.9-5.2,1.9,5.2ZM15.4,21.545l3.246,1.949-.909-3.637L20.72,17H16.954l-1.429-3.506L13.837,17H10.071l2.857,2.857-.779,3.637Z", insert: "M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10", insertEmbed: "M20.73889,15.45929a3.4768,3.4768,0,0,0-5.45965-.28662L9.5661,12.50861a3.49811,3.49811,0,0,0-.00873-1.01331l5.72174-2.66809a3.55783,3.55783,0,1,0-.84527-1.81262L8.70966,9.6839a3.50851,3.50851,0,1,0,.0111,4.63727l5.7132,2.66412a3.49763,3.49763,0,1,0,6.30493-1.526ZM18.00745,5.01056A1.49993,1.49993,0,1,1,16.39551,6.3894,1.49994,1.49994,0,0,1,18.00745,5.01056ZM5.99237,13.49536a1.49989,1.49989,0,1,1,1.61194-1.37878A1.49982,1.49982,0,0,1,5.99237,13.49536Zm11.78211,5.494a1.49993,1.49993,0,1,1,1.61193-1.37885A1.49987,1.49987,0,0,1,17.77448,18.98932Z", insertFile: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z", insertImage: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z", insertLink: "M11,17H7A5,5,0,0,1,7,7h4V9H7a3,3,0,0,0,0,6h4ZM17,7H13V9h4a3,3,0,0,1,0,6H13v2h4A5,5,0,0,0,17,7Zm-1,4H8v2h8Z", insertMore: "M16.5,13h-6v6h-2V13h-6V11h6V5h2v6h6Zm5,4.5A1.5,1.5,0,1,1,20,16,1.5,1.5,0,0,1,21.5,17.5Zm0-4A1.5,1.5,0,1,1,20,12,1.5,1.5,0,0,1,21.5,13.5Zm0-4A1.5,1.5,0,1,1,20,8,1.5,1.5,0,0,1,21.5,9.5Z", insertTable: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M9.5,13.5v-3  h5v3H9.5z M14.5,15v2.5h-5V15H14.5z M9.5,9V6.5h5V9H9.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M3.5,17  v-2H8v2.5H4C3.7,17.5,3.5,17.3,3.5,17z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M16,9V6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16z", insertVideo: "M15,8v8H5V8H15m2,2.5V7a1,1,0,0,0-1-1H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V13.5l2.29,2.29A1,1,0,0,0,21,15.08V8.91a1,1,0,0,0-1.71-.71Z", upload: "M12 6.66667a4.87654 4.87654 0 0 1 4.77525 3.92342l0.29618 1.50268 1.52794 0.10578a2.57021 2.57021 0 0 1 -0.1827 5.13478H6.5a3.49774 3.49774 0 0 1 -0.3844 -6.97454l1.06682 -0.11341L7.678 9.29387A4.86024 4.86024 0 0 1 12 6.66667m0 -2A6.871 6.871 0 0 0 5.90417 8.37 5.49773 5.49773 0 0 0 6.5 19.33333H18.41667a4.57019 4.57019 0 0 0 0.32083 -9.13A6.86567 6.86567 0 0 0 12 4.66667Zm0.99976 7.2469h1.91406L11.99976 9 9.08618 11.91357h1.91358v3H11V16h2V14h-0.00024Z", uploadFiles: "M12 6.66667a4.87654 4.87654 0 0 1 4.77525 3.92342l0.29618 1.50268 1.52794 0.10578a2.57021 2.57021 0 0 1 -0.1827 5.13478H6.5a3.49774 3.49774 0 0 1 -0.3844 -6.97454l1.06682 -0.11341L7.678 9.29387A4.86024 4.86024 0 0 1 12 6.66667m0 -2A6.871 6.871 0 0 0 5.90417 8.37 5.49773 5.49773 0 0 0 6.5 19.33333H18.41667a4.57019 4.57019 0 0 0 0.32083 -9.13A6.86567 6.86567 0 0 0 12 4.66667Zm0.99976 7.2469h1.91406L11.99976 9 9.08618 11.91357h1.91358v3H11V16h2V14h-0.00024Z", italic: "M11.76,9h2l-2.2,10h-2Zm1.68-4a1,1,0,1,0,1,1,1,1,0,0,0-1-1Z", search: "M15.5 14h-0.79l-0.28 -0.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09 -0.59 4.23 -1.57l0.27 0.28v0.79l5 4.99L20.49 19l-4.99 -5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z", lineHeight: "M6.25,7h2.5L5.25,3.5,1.75,7h2.5V17H1.75l3.5,3.5L8.75,17H6.25Zm4-2V7h12V5Zm0,14h12V17h-12Zm0-6h12V11h-12Z", linkStyles: "M19,17.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L11.3,15h3.8l1.7-3.5l1.4,3.5H22L19,17.9z M20,12c0,0.3-0.1,0.7-0.2,1h2.1  c0.1-0.3,0.1-0.6,0.1-1c0-2.8-2.2-5-5-5h-4v2h4C18.7,9,20,10.3,20,12z M14.8,11H8v2h3.3h2.5L14.8,11z M9.9,16.4L8.5,15H7  c-1.7,0-3-1.3-3-3s1.3-3,3-3h4V7H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h3.5L9.9,16.4z", mention: "M12.4,5c-4.1,0-7.5,3.4-7.5,7.5S8.3,20,12.4,20h3.8v-1.5h-3.8c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6v1.1  c0,0.6-0.5,1.2-1.1,1.2s-1.1-0.6-1.1-1.2v-1.1c0-2.1-1.7-3.8-3.8-3.8s-3.7,1.7-3.7,3.8s1.7,3.8,3.8,3.8c1,0,2-0.4,2.7-1.1  c0.5,0.7,1.3,1.1,2.2,1.1c1.5,0,2.6-1.2,2.6-2.7v-1.1C19.9,8.4,16.6,5,12.4,5z M12.4,14.7c-1.2,0-2.3-1-2.3-2.2s1-2.3,2.3-2.3  s2.3,1,2.3,2.3S13.6,14.7,12.4,14.7z", minimize: "M5,12h14 M19,11H5v2h14V11z", more: "M13.5,17c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,16.2,13.5,17z M13.5,12c0,0.8-0.7,1.5-1.5,1.5 s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,11.2,13.5,12z M13.5,7c0,0.8-0.7,1.5-1.5,1.5S10.5,7.8,10.5,7s0.7-1.5,1.5-1.5 S13.5,6.2,13.5,7z", openLink: "M17,17H7V7h3V5H7C6,5,5,6,5,7v10c0,1,1,2,2,2h10c1,0,2-1,2-2v-3h-2V17z M14,5v2h1.6l-5.8,5.8l1.4,1.4L17,8.4V10h2V5H14z", orderedList: "M2.5,16h2v.5h-1v1h1V18h-2v1h3V15h-3Zm1-7h1V5h-2V6h1Zm-1,2H4.3L2.5,13.1V14h3V13H3.7l1.8-2.1V10h-3Zm5-5V8h14V6Zm0,12h14V16H7.5Zm0-5h14V11H7.5Z", outdent: "M3,12l3,3V9L3,12z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z", pageBreaker: "M3,9v6l3-3L3,9z M21,9H8V4h2v3h9V4h2V9z M21,20h-2v-3h-9v3H8v-5h13V20z M11,13H8v-2h3V13z M16,13h-3v-2h3V13z M21,13h-3v-2  h3V13z", paragraphFormat: "M10.15,5A4.11,4.11,0,0,0,6.08,8.18,4,4,0,0,0,10,13v6h2V7h2V19h2V7h2V5ZM8,9a2,2,0,0,1,2-2v4A2,2,0,0,1,8,9Z", paragraphMore: "M7.682,5a4.11,4.11,0,0,0-4.07,3.18,4,4,0,0,0,3.11,4.725h0l.027.005a3.766,3.766,0,0,0,.82.09v6h2V7h2V19h2V7h2V5ZM5.532,9a2,2,0,0,1,2-2v4A2,2,0,0,1,5.532,9Zm14.94,8.491a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,17.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,13.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,9.491Z", paragraphStyle: "M4,9c0-1.1,0.9-2,2-2v4C4.9,11,4,10.1,4,9z M16.7,20.5l3.2,1.9L19,18.8l3-2.9h-3.7l-1.4-3.5L15.3,16h-3.8l2.9,2.9l-0.9,3.6  L16.7,20.5z M10,17.4V19h1.6L10,17.4z M6.1,5c-1.9,0-3.6,1.3-4,3.2c-0.5,2.1,0.8,4.2,2.9,4.7c0,0,0,0,0,0h0.2C5.5,13,5.8,13,6,13v6  h2V7h2v7h2V7h2V5H6.1z", pdfExport: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z M16.3,13.5  c-0.2-0.6-1.1-0.8-2.6-0.8c-0.1,0-0.1,0-0.2,0c-0.3-0.3-0.8-0.9-1-1.2c-0.2-0.2-0.3-0.3-0.4-0.6c0.2-0.7,0.2-1,0.3-1.5  c0.1-0.9,0-1.6-0.2-1.8c-0.4-0.2-0.7-0.2-0.9-0.2c-0.1,0-0.3,0.2-0.7,0.7c-0.2,0.7-0.1,1.8,0.6,2.8c-0.2,0.8-0.7,1.6-1,2.4  c-0.8,0.2-1.5,0.7-1.9,1.1c-0.7,0.7-0.9,1.1-0.7,1.6c0,0.3,0.2,0.6,0.7,0.6c0.3-0.1,0.3-0.2,0.7-0.3c0.6-0.3,1.2-1.7,1.7-2.4  c0.8-0.2,1.7-0.3,2-0.3c0.1,0,0.3,0,0.6,0c0.8,0.8,1.2,1.1,1.8,1.2c0.1,0,0.2,0,0.3,0c0.3,0,0.8-0.1,1-0.6  C16.4,14.1,16.4,13.9,16.3,13.5z M8.3,15.7c-0.1,0.1-0.2,0.1-0.2,0.1c0-0.1,0-0.3,0.6-0.8c0.2-0.2,0.6-0.3,0.9-0.7  C9,15,8.6,15.5,8.3,15.7z M11.3,9c0-0.1,0.1-0.2,0.1-0.2S11.6,9,11.5,10c0,0.1,0,0.3-0.1,0.7C11.3,10.1,11,9.5,11.3,9z M10.9,13.1  c0.2-0.6,0.6-1,0.7-1.5c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.2,0.3,0.7,0.7,0.9C12.2,12.8,11.6,13,10.9,13.1z M15.2,14.1  c-0.1,0-0.1,0-0.2,0c-0.2,0-0.7-0.2-1-0.7c1.1,0,1.6,0.2,1.6,0.6C15.5,14.1,15.4,14.1,15.2,14.1z", print: "M16.1,17c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1s-0.4,1-1,1C16.5,18,16.1,17.6,16.1,17z M22,15v4c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h1V5c0-1.1,0.9-2,2-2h7.4L19,7.6V13h1C21.1,13,22,13.9,22,15z M7,13h10V9h-4V5H7V13z M20,15H4  v4h16V15z", redo: "M13.6,9.4c1.7,0.3,3.2,0.9,4.6,2L21,8.5v7h-7l2.7-2.7C13,10.1,7.9,11,5.3,14.7c-0.2,0.3-0.4,0.5-0.5,0.8L3,14.6  C5.1,10.8,9.3,8.7,13.6,9.4z", removeTable: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z", insertAll: "M 9.25 12 L 6.75 12 C 6.335938 12 6 11.664062 6 11.25 L 6 6 L 3.257812 6 C 2.703125 6 2.425781 5.328125 2.820312 4.933594 L 7.570312 0.179688 C 7.804688 -0.0546875 8.191406 -0.0546875 8.425781 0.179688 L 13.179688 4.933594 C 13.574219 5.328125 13.296875 6 12.742188 6 L 10 6 L 10 11.25 C 10 11.664062 9.664062 12 9.25 12 Z M 16 11.75 L 16 15.25 C 16 15.664062 15.664062 16 15.25 16 L 0.75 16 C 0.335938 16 0 15.664062 0 15.25 L 0 11.75 C 0 11.335938 0.335938 11 0.75 11 L 5 11 L 5 11.25 C 5 12.214844 5.785156 13 6.75 13 L 9.25 13 C 10.214844 13 11 12.214844 11 11.25 L 11 11 L 15.25 11 C 15.664062 11 16 11.335938 16 11.75 Z M 12.125 14.5 C 12.125 14.15625 11.84375 13.875 11.5 13.875 C 11.15625 13.875 10.875 14.15625 10.875 14.5 C 10.875 14.84375 11.15625 15.125 11.5 15.125 C 11.84375 15.125 12.125 14.84375 12.125 14.5 Z M 14.125 14.5 C 14.125 14.15625 13.84375 13.875 13.5 13.875 C 13.15625 13.875 12.875 14.15625 12.875 14.5 C 12.875 14.84375 13.15625 15.125 13.5 15.125 C 13.84375 15.125 14.125 14.84375 14.125 14.5 Z M 14.125 14.5 ", remove: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z", replaceImage: "M16,5v3H4v2h12v3l4-4L16,5z M8,19v-3h12v-2H8v-3l-4,4L8,19z", row: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M16,6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16V6.5z M9.5,6.5h5V9h-5V6.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.5  v-2H8V17.5z M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z", selectAll: "M5,7h2V5C5.9,5,5,5.9,5,7z M5,11h2V9H5V11z M9,19h2v-2H9V19z M5,11h2V9H5V11z M15,5h-2v2h2V5z M17,5v2h2C19,5.9,18.1,5,17,5  z M7,19v-2H5C5,18.1,5.9,19,7,19z M5,15h2v-2H5V15z M11,5H9v2h2V5z M13,19h2v-2h-2V19z M17,11h2V9h-2V11z M17,19c1.1,0,2-0.9,2-2h-2  V19z M17,11h2V9h-2V11z M17,15h2v-2h-2V15z M13,19h2v-2h-2V19z M13,7h2V5h-2V7z M9,15h6V9H9V15z M11,11h2v2h-2V11z", smile: "M11.991,3A9,9,0,1,0,21,12,8.99557,8.99557,0,0,0,11.991,3ZM12,19a7,7,0,1,1,7-7A6.99808,6.99808,0,0,1,12,19Zm3.105-5.2h1.503a4.94542,4.94542,0,0,1-9.216,0H8.895a3.57808,3.57808,0,0,0,6.21,0ZM7.5,9.75A1.35,1.35,0,1,1,8.85,11.1,1.35,1.35,0,0,1,7.5,9.75Zm6.3,0a1.35,1.35,0,1,1,1.35,1.35A1.35,1.35,0,0,1,13.8,9.75Z", spellcheck: "M19.1,13.6l-5.6,5.6l-2.7-2.7l-1.4,1.4l4.1,4.1l7-7L19.1,13.6z M10.8,13.7l2.7,2.7l0.8-0.8L10.5,5h-2l-5,14h2l1.4-4h2.6  L10.8,13.7z M9.5,7.8l1.9,5.2H7.6L9.5,7.8z", star: "M12.1,7.7l1,2.5l0.4,0.9h1h2.4l-2.1,2l-0.6,0.6l0.2,0.9l0.6,2.3l-2.2-1.3L12,15.2l-0.8,0.5L9,17l0.5-2.5l0.1-0.8L9,13.1  l-2-2h2.5h0.9l0.4-0.8L12.1,7.7 M12.2,4L9.5,9.6H3.4L8,14.2L6.9,20l5.1-3.1l5.3,3.1l-1.5-5.8l4.8-4.6h-6.1L12.2,4L12.2,4z", strikeThrough: "M3,12.20294H21v1.5H16.63422a3.59782,3.59782,0,0,1,.34942,1.5929,3.252,3.252,0,0,1-1.31427,2.6997A5.55082,5.55082,0,0,1,12.20251,19a6.4421,6.4421,0,0,1-2.62335-.539,4.46335,4.46335,0,0,1-1.89264-1.48816,3.668,3.668,0,0,1-.67016-2.15546V14.704h.28723v-.0011h.34149v.0011H9.02v.11334a2.18275,2.18275,0,0,0,.85413,1.83069,3.69,3.69,0,0,0,2.32836.67926,3.38778,3.38778,0,0,0,2.07666-.5462,1.73346,1.73346,0,0,0,.7013-1.46655,1.69749,1.69749,0,0,0-.647-1.43439,3.00525,3.00525,0,0,0-.27491-.17725H3ZM16.34473,7.05981A4.18163,4.18163,0,0,0,14.6236,5.5462,5.627,5.627,0,0,0,12.11072,5,5.16083,5.16083,0,0,0,8.74719,6.06213,3.36315,3.36315,0,0,0,7.44006,8.76855a3.22923,3.22923,0,0,0,.3216,1.42786h2.59668c-.08338-.05365-.18537-.10577-.25269-.16064a1.60652,1.60652,0,0,1-.65283-1.30036,1.79843,1.79843,0,0,1,.68842-1.5108,3.12971,3.12971,0,0,1,1.96948-.55243,3.04779,3.04779,0,0,1,2.106.6687,2.35066,2.35066,0,0,1,.736,1.83258v.11341h2.00317V9.17346A3.90013,3.90013,0,0,0,16.34473,7.05981Z", subscript: "M10.4,12l3.6,3.6L12.6,17L9,13.4L5.4,17L4,15.6L7.6,12L4,8.4L5.4,7L9,10.6L12.6,7L14,8.4L10.4,12z M18.31234,19.674  l1.06812-1.1465c0.196-0.20141,0.37093-0.40739,0.5368-0.6088c0.15975-0.19418,0.30419-0.40046,0.432-0.617  c0.11969-0.20017,0.21776-0.41249,0.29255-0.6334c0.07103-0.21492,0.10703-0.43986,0.10662-0.66621  c0.00297-0.28137-0.04904-0.56062-0.1531-0.82206c-0.09855-0.24575-0.25264-0.46534-0.45022-0.6416  c-0.20984-0.18355-0.45523-0.32191-0.72089-0.40646c-0.63808-0.19005-1.3198-0.17443-1.94851,0.04465  c-0.28703,0.10845-0.54746,0.2772-0.76372,0.49487c-0.20881,0.20858-0.37069,0.45932-0.47483,0.73548  c-0.10002,0.26648-0.15276,0.54838-0.15585,0.833l-0.00364,0.237H17.617l0.00638-0.22692  c0.00158-0.12667,0.01966-0.25258,0.05377-0.37458c0.03337-0.10708,0.08655-0.20693,0.15679-0.29437  c0.07105-0.08037,0.15959-0.14335,0.25882-0.1841c0.22459-0.08899,0.47371-0.09417,0.7018-0.01458  c0.0822,0.03608,0.15559,0.08957,0.21509,0.15679c0.06076,0.07174,0.10745,0.15429,0.13761,0.24333  c0.03567,0.10824,0.05412,0.22141,0.05469,0.33538c-0.00111,0.08959-0.0118,0.17881-0.0319,0.26612  c-0.02913,0.10428-0.07076,0.20465-0.124,0.29893c-0.07733,0.13621-0.1654,0.26603-0.26338,0.38823  c-0.13438,0.17465-0.27767,0.34226-0.42929,0.50217l-2.15634,2.35315V21H21v-1.326H18.31234z", superscript: "M10.4,12,14,15.6,12.6,17,9,13.4,5.4,17,4,15.6,7.6,12,4,8.4,5.4,7,9,10.6,12.6,7,14,8.4Zm8.91234-3.326,1.06812-1.1465c.196-.20141.37093-.40739.5368-.6088a4.85745,4.85745,0,0,0,.432-.617,3.29,3.29,0,0,0,.29255-.6334,2.11079,2.11079,0,0,0,.10662-.66621,2.16127,2.16127,0,0,0-.1531-.82206,1.7154,1.7154,0,0,0-.45022-.6416,2.03,2.03,0,0,0-.72089-.40646,3.17085,3.17085,0,0,0-1.94851.04465,2.14555,2.14555,0,0,0-.76372.49487,2.07379,2.07379,0,0,0-.47483.73548,2.446,2.446,0,0,0-.15585.833l-.00364.237H18.617L18.62338,5.25a1.45865,1.45865,0,0,1,.05377-.37458.89552.89552,0,0,1,.15679-.29437.70083.70083,0,0,1,.25882-.1841,1.00569,1.00569,0,0,1,.7018-.01458.62014.62014,0,0,1,.21509.15679.74752.74752,0,0,1,.13761.24333,1.08893,1.08893,0,0,1,.05469.33538,1.25556,1.25556,0,0,1-.0319.26612,1.34227,1.34227,0,0,1-.124.29893,2.94367,2.94367,0,0,1-.26338.38823,6.41629,6.41629,0,0,1-.42929.50217L17.19709,8.92642V10H22V8.674Z", symbols: "M15.77493,16.98885a8.21343,8.21343,0,0,0,1.96753-2.57651,7.34824,7.34824,0,0,0,.6034-3.07618A6.09092,6.09092,0,0,0,11.99515,5a6.13347,6.13347,0,0,0-4.585,1.79187,6.417,6.417,0,0,0-1.756,4.69207,6.93955,6.93955,0,0,0,.622,2.97415,8.06587,8.06587,0,0,0,1.949,2.53076H5.41452V19h5.54114v-.04331h-.00147V16.84107a5.82825,5.82825,0,0,1-2.2052-2.2352A6.40513,6.40513,0,0,1,7.97672,11.447,4.68548,4.68548,0,0,1,9.07785,8.19191a3.73232,3.73232,0,0,1,2.9173-1.22462,3.76839,3.76839,0,0,1,2.91241,1.21489,4.482,4.482,0,0,1,1.11572,3.154,6.71141,6.71141,0,0,1-.75384,3.24732,5.83562,5.83562,0,0,1-2.22357,2.25759v2.11562H13.0444V19h5.54108V16.98885Z", tags: "M8.9749 7.47489a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8.9749 7.47489Zm3.78866 -3.12713L16.5362 8.12041l0.33565 0.33564 2.77038 2.77038a2.01988 2.01988 0 0 1 0.59 1.42 1.95518 1.95518 0 0 1 -0.5854 1.40455l0.00044 0.00043 -5.59583 5.59583 -0.00043 -0.00044a1.95518 1.95518 0 0 1 -1.40455 0.5854 1.98762 1.98762 0 0 1 -1.41 -0.58L8.45605 16.87185l-0.33564 -0.33565L4.35777 12.77357a1.99576 1.99576 0 0 1 -0.59 -1.42V9.36358l0 -3.59582a2.00579 2.00579 0 0 1 2 -2l3.59582 0h1.98995A1.98762 1.98762 0 0 1 12.76356 4.34776ZM15.46186 9.866l-0.33564 -0.33564L11.36359 5.76776H5.76776v5.59583L9.866 15.46186l2.7794 2.7794 5.5878 -5.60385 -0.001 -0.001Z", tableHeader: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  l0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M14.5,17.5h-5V15h5V17.5z M14.5,13.5h-5v-3h5V13.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5l0,0  H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9h-4.4H16h-1.5h-5H8H7.9H3.5V7c0-0.3,0.2-0.5,0.4-0.5l0,0h4l0,0h8.2l0,0H20  c0.3,0,0.5,0.2,0.5,0.4l0,0V9z", tableFooter: "M20,19H4a2.006,2.006,0,0,1-2-2V7A2.006,2.006,0,0,1,4,5H20a2.006,2.006,0,0,1,2,2V17A2.006,2.006,0,0,1,20,19ZM8,6.5H4a.458.458,0,0,0-.5.4h0V9H8Zm0,4H3.5v3H8Zm6.5-4h-5V9h5Zm0,4h-5v3h5Zm6-3.5a.458.458,0,0,0-.4-.5H16V9h4.5Zm0,3.5H16v3h4.5Zm0,4.5H3.5v2a.458.458,0,0,0,.4.5H20a.458.458,0,0,0,.5-.4h0Z", tableStyle: "M20.0171,19.89752l.9,3.6-3.2-1.9-3.3,1.9.8-3.6-2.9-2.9h3.8l1.7-3.5,1.4,3.5h3.8ZM20,5H4A2.00591,2.00591,0,0,0,2,7V17a2.00591,2.00591,0,0,0,2,2h7.49115l-.58826-.58826L9.99115,17.5H9.5V14.9975h5.36511L16,12.66089V10.5h4.5v3h-.52783l.599,1.4975H22V7A2.00591,2.00591,0,0,0,20,5ZM3.5,7A.4724.4724,0,0,1,4,6.5H8V9H3.5Zm0,3.5H8v3H3.5Zm.5,7a.4724.4724,0,0,1-.5-.5V15H8v2.5Zm10.5-4h-5v-3h5Zm0-4.5h-5V6.5h5Zm6,0H16V6.5h4a.4724.4724,0,0,1,.5.5Z", textColor: "M15.2,13.494s-3.6,3.9-3.6,6.3a3.65,3.65,0,0,0,7.3.1v-.1C18.9,17.394,15.2,13.494,15.2,13.494Zm-1.47-1.357.669-.724L12.1,5h-2l-5,14h2l1.43-4h2.943A24.426,24.426,0,0,1,13.726,12.137ZM11.1,7.8l1.86,5.2H9.244Z", textMore: "M13.55,19h2l-5-14h-2l-5,14h2l1.4-4h5.1Zm-5.9-6,1.9-5.2,1.9,5.2Zm12.8,4.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,17.5Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,13.5Zm0-4A1.5,1.5,0,1,1,18.95,8,1.5,1.5,0,0,1,20.45,9.5Z", underline: "M19,20v2H5V20Zm-3-6.785a4,4,0,0,1-5.74,3.4A3.75,3.75,0,0,1,8,13.085V5.005H6v8.21a6,6,0,0,0,8,5.44,5.851,5.851,0,0,0,4-5.65v-8H16ZM16,5v0h2V5ZM8,5H6v0H8Z", undo: "M10.4,9.4c-1.7,0.3-3.2,0.9-4.6,2L3,8.5v7h7l-2.7-2.7c3.7-2.6,8.8-1.8,11.5,1.9c0.2,0.3,0.4,0.5,0.5,0.8l1.8-0.9  C18.9,10.8,14.7,8.7,10.4,9.4z", unlink: "M14.4,11l1.6,1.6V11H14.4z M17,7h-4v1.9h4c1.7,0,3.1,1.4,3.1,3.1c0,1.3-0.8,2.4-1.9,2.8l1.4,1.4C21,15.4,22,13.8,22,12  C22,9.2,19.8,7,17,7z M2,4.3l3.1,3.1C3.3,8.1,2,9.9,2,12c0,2.8,2.2,5,5,5h4v-1.9H7c-1.7,0-3.1-1.4-3.1-3.1c0-1.6,1.2-2.9,2.8-3.1  L8.7,11H8v2h2.7l2.3,2.3V17h1.7l4,4l1.4-1.4L3.4,2.9L2,4.3z", unorderedList: "M4,10.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,10.5,4,10.5z M4,5.5C3.2,5.5,2.5,6.2,2.5,7  S3.2,8.5,4,8.5S5.5,7.8,5.5,7S4.8,5.5,4,5.5z M4,15.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,15.5,4,15.5z   M7.5,6v2h14V6H7.5z M7.5,18h14v-2h-14V18z M7.5,13h14v-2h-14V13z", verticalAlignBottom: "M16,13h-3V3h-2v10H8l4,4L16,13z M3,19v2h18v-2H3z", verticalAlignMiddle: "M3,11v2h18v-2H3z M8,18h3v3h2v-3h3l-4-4L8,18z M16,6h-3V3h-2v3H8l4,4L16,6z", verticalAlignTop: "M8,11h3v10h2V11h3l-4-4L8,11z M21,5V3H3v2H21z", filestackIconAdd: "M21 16.75 16.985 21v-4.25H21ZM7.154 12.5c2.294 0 4.154 1.902 4.154 4.25S9.448 21 7.154 21C4.86 21 3 19.097 3 16.75s1.86-4.25 4.154-4.25Zm8.862 6.8V21H10.24a5.283 5.283 0 0 0 1.441-1.7h4.334ZM7.46 14.093h-.614a.215.215 0 0 0-.212.218v1.907H4.77a.215.215 0 0 0-.212.218v.628c0 .12.094.217.212.217h1.865v1.908c0 .12.095.217.212.217h.614a.214.214 0 0 0 .212-.217V17.28h1.865a.214.214 0 0 0 .212-.217v-.628a.215.215 0 0 0-.212-.218H7.673v-1.907a.215.215 0 0 0-.212-.218Zm5.647-.035v1.558h-.886a5.324 5.324 0 0 0-.615-1.558h1.501ZM21 4v11.616h-1.522V5.559H8.538v6.094a5.018 5.018 0 0 0-1.384-.216V4H21Zm-5.4 7.366v1.559h-4.015v-1.559h4.016Zm.97-2.691v1.559h-4.985v-1.56h4.985Z", trackChanges: "M17.2 20H12.4599L13.9938 19.2076L14.0305 19.1886L14.0616 19.1612C14.1036 19.1242 14.1373 19.0786 14.1603 19.0275C14.1806 18.9825 14.1923 18.9342 14.1948 18.885H14.2H14.3384L14.4364 18.7874L14.7049 18.52H15.45C15.5747 18.52 15.6942 18.4705 15.7823 18.3823C15.8705 18.2942 15.92 18.1746 15.92 18.05C15.92 17.9253 15.8705 17.8058 15.7823 17.7176C15.7351 17.6704 15.6789 17.6343 15.6177 17.6109L17.33 15.9056V19.87C17.33 19.8871 17.3266 19.904 17.3201 19.9197C17.3136 19.9355 17.304 19.9499 17.2919 19.9619C17.2799 19.974 17.2655 19.9836 17.2497 19.9901C17.234 19.9966 17.2171 20 17.2 20ZM4.13 20H11.2508C11.2396 19.9629 11.2337 19.9242 11.2337 19.885C11.2337 19.8133 11.2533 19.7431 11.29 19.6819L11.2739 19.6734L11.8838 18.52H5C4.87535 18.52 4.7558 18.4705 4.66766 18.3823C4.57952 18.2942 4.53 18.1746 4.53 18.05C4.53 17.9253 4.57952 17.8058 4.66766 17.7176C4.7558 17.6295 4.87535 17.58 5 17.58H12.3809L12.3925 17.5582L12.4187 17.5284C12.4558 17.4864 12.5014 17.4527 12.5525 17.4297C12.5836 17.4156 12.6163 17.4057 12.6498 17.4001C12.6522 17.3065 12.6877 17.2166 12.7503 17.1467L13 17.37C12.9902 17.381 12.9847 17.3952 12.9847 17.41C12.9847 17.4247 12.9902 17.439 13 17.45L14.13 18.55H14.2L19.09 13.68V13.6L17.99 12.5C17.979 12.4902 17.9647 12.4847 17.95 12.4847C17.9352 12.4847 17.921 12.4902 17.91 12.5L13 17.37L12.7641 17.1322L15.1759 14.74H5C4.87535 14.74 4.7558 14.6905 4.66766 14.6023C4.57952 14.5142 4.53 14.3946 4.53 14.27C4.53 14.1453 4.57952 14.0258 4.66766 13.9376C4.7558 13.8495 4.87535 13.8 5 13.8H15.45C15.5747 13.8 15.6942 13.8495 15.7823 13.9376C15.8169 13.9722 15.8454 14.0115 15.8675 14.0541L17.33 12.6034V9.3H13.28C13.207 9.30976 13.133 9.30976 13.06 9.3C12.7697 9.22119 12.5113 9.05343 12.3212 8.82027C12.1311 8.58711 12.0187 8.30026 12 8V4H4.13C4.09552 4 4.06246 4.0137 4.03808 4.03808C4.0137 4.06246 4 4.09552 4 4.13V19.87C4 19.9045 4.0137 19.9375 4.03808 19.9619C4.06246 19.9863 4.09552 20 4.13 20ZM11.7889 20H11.8785C11.8902 19.9746 11.898 19.9475 11.9015 19.9197L11.8661 19.9866L11.8117 19.9578L13.84 18.91C13.8464 18.9044 13.8515 18.8974 13.855 18.8897C13.8585 18.8819 13.8603 18.8735 13.8603 18.865C13.8603 18.8565 13.8585 18.8481 13.855 18.8403C13.8515 18.8325 13.8464 18.8256 13.84 18.82L12.76 17.75C12.7544 17.7436 12.7474 17.7385 12.7397 17.735C12.7319 17.7315 12.7235 17.7297 12.715 17.7297C12.7065 17.7297 12.6981 17.7315 12.6903 17.735C12.6825 17.7385 12.6756 17.7436 12.67 17.75L11.57 19.83L11.5023 19.7942L11.58 19.85C11.5727 19.8602 11.5687 19.8724 11.5687 19.885C11.5687 19.8975 11.5727 19.9098 11.58 19.92L11.67 20H11.73L11.7642 19.9823L11.7889 20ZM13.1 4.65L16.6 8.15C16.6212 8.17232 16.6355 8.20028 16.6412 8.23051C16.6469 8.26075 16.6437 8.29199 16.6321 8.32048C16.6205 8.34898 16.6009 8.37352 16.5757 8.39117C16.5505 8.40882 16.5207 8.41883 16.49 8.42H13.06L12.83 8.19V4.76C12.8312 4.72925 12.8412 4.6995 12.8588 4.67429C12.8765 4.64909 12.901 4.62951 12.9295 4.6179C12.958 4.6063 12.9893 4.60315 13.0195 4.60884C13.0497 4.61453 13.0777 4.62882 13.1 4.65ZM11 6.72C11.0027 6.66089 10.9937 6.60183 10.9735 6.54621C10.9534 6.49058 10.9224 6.43948 10.8825 6.39582C10.8425 6.35216 10.7944 6.31681 10.7408 6.29179C10.6871 6.26677 10.6291 6.25257 10.57 6.25H5C4.88239 6.25773 4.77251 6.3113 4.69397 6.39918C4.61543 6.48707 4.57451 6.60226 4.58 6.72C4.57451 6.83774 4.61543 6.95293 4.69397 7.04082C4.77251 7.12871 4.88239 7.18227 5 7.19H10.6C10.714 7.1774 10.8189 7.12173 10.8933 7.03438C10.9676 6.94702 11.0058 6.83457 11 6.72ZM11.1 8.14001H5C4.87535 8.14001 4.7558 8.18953 4.66766 8.27767C4.57952 8.36582 4.53 8.48536 4.53 8.61001C4.53 8.73467 4.57952 8.85421 4.66766 8.94236C4.7558 9.0305 4.87535 9.08001 5 9.08001H11.1C11.2247 9.08001 11.3442 9.0305 11.4323 8.94236C11.5205 8.85421 11.57 8.73467 11.57 8.61001C11.57 8.48536 11.5205 8.36582 11.4323 8.27767C11.3442 8.18953 11.2247 8.14001 11.1 8.14001ZM5 11H15.45C15.5826 11 15.7098 10.9473 15.8036 10.8536C15.8973 10.7598 15.95 10.6326 15.95 10.5C15.95 10.3674 15.8973 10.2402 15.8036 10.1464C15.7098 10.0527 15.5826 10 15.45 10H5C4.86739 10 4.74021 10.0527 4.64645 10.1464C4.55268 10.2402 4.5 10.3674 4.5 10.5C4.5 10.6326 4.55268 10.7598 4.64645 10.8536C4.74021 10.9473 4.86739 11 5 11ZM5 12.86H11.1C11.2211 12.8523 11.3346 12.798 11.4166 12.7085C11.4986 12.6191 11.5428 12.5013 11.54 12.38C11.5427 12.2597 11.4982 12.1431 11.4159 12.0552C11.3337 11.9673 11.2202 11.9152 11.1 11.91H5C4.94089 11.9126 4.88286 11.9268 4.82924 11.9518C4.77562 11.9768 4.72746 12.0122 4.68752 12.0558C4.64758 12.0995 4.61664 12.1506 4.59648 12.2062C4.57631 12.2618 4.56731 12.3209 4.57 12.38C4.56451 12.5004 4.60649 12.6181 4.6869 12.7079C4.76731 12.7976 4.87974 12.8523 5 12.86ZM11.1 16.63H5C4.87535 16.63 4.7558 16.5805 4.66766 16.4923C4.57952 16.4042 4.53 16.2846 4.53 16.16C4.53 16.0353 4.57952 15.9158 4.66766 15.8276C4.7558 15.7395 4.87535 15.69 5 15.69H11.1C11.2247 15.69 11.3442 15.7395 11.4323 15.8276C11.5205 15.9158 11.57 16.0353 11.57 16.16C11.57 16.2846 11.5205 16.4042 11.4323 16.4923C11.3442 16.5805 11.2247 16.63 11.1 16.63ZM18.8503 11.592C18.7991 11.6175 18.7545 11.6544 18.72 11.7L18.26 12.14C18.2501 12.151 18.2447 12.1652 18.2447 12.18C18.2447 12.1947 18.2501 12.209 18.26 12.22L19.37 13.32C19.381 13.3298 19.3952 13.3353 19.41 13.3353C19.4247 13.3353 19.439 13.3298 19.45 13.32L19.86 12.91C19.9057 12.867 19.9421 12.8151 19.967 12.7575C19.9919 12.6998 20.0047 12.6377 20.0047 12.575C20.0047 12.5122 19.9919 12.4501 19.967 12.3925C19.9421 12.3349 19.9057 12.283 19.86 12.24L19.31 11.7C19.2755 11.6544 19.2309 11.6175 19.1797 11.592C19.1285 11.5666 19.0721 11.5533 19.015 11.5533C18.9578 11.5533 18.9014 11.5666 18.8503 11.592Z", showTrackChanges: "M17.2421 13.6048C17.2631 13.6136 17.2841 13.6226 17.305 13.6317V9.29505H13.2626C13.1897 9.30481 13.1159 9.30481 13.043 9.29505C12.7532 9.21632 12.4953 9.04872 12.3056 8.81577C12.1158 8.58283 12.0037 8.29625 11.985 7.99627V4H4.12976C4.09534 4 4.06234 4.01368 4.038 4.03804C4.01367 4.0624 4 4.09543 4 4.12988V19.8552C4 19.8896 4.01367 19.9227 4.038 19.947C4.06234 19.9714 4.09534 19.9851 4.12976 19.9851H13.4875C13.0501 19.8216 12.6281 19.6155 12.2277 19.3686C11.8529 19.1551 11.4911 18.9196 11.1442 18.6632C11.0697 18.6152 10.9982 18.5628 10.9302 18.5065H4.99812C4.87371 18.5065 4.75438 18.457 4.66641 18.3689C4.57843 18.2809 4.529 18.1614 4.529 18.0369C4.529 17.9124 4.57843 17.7929 4.66641 17.7049C4.75438 17.6168 4.87371 17.5673 4.99812 17.5673H10.4396C10.4472 17.4488 10.4756 17.3324 10.5235 17.2235C10.5939 17.017 10.6761 16.8149 10.7694 16.6182H4.99812C4.87371 16.6182 4.75438 16.5687 4.66641 16.4807C4.57843 16.3926 4.529 16.2732 4.529 16.1487C4.529 16.0241 4.57843 15.9047 4.66641 15.8166C4.75438 15.7286 4.87371 15.6791 4.99812 15.6791H11.0867C11.1576 15.6791 11.2268 15.6952 11.2895 15.7253C11.5204 15.361 11.7938 15.027 12.1033 14.73H4.99812C4.87371 14.73 4.75438 14.6805 4.66641 14.5924C4.57843 14.5044 4.529 14.385 4.529 14.2604C4.529 14.1359 4.57843 14.0164 4.66641 13.9284C4.75438 13.8403 4.87371 13.7909 4.99812 13.7909H13.4434C13.9833 13.525 14.5656 13.3516 15.166 13.2795L15.1923 13.2763H15.2189H15.4925C16.0923 13.2609 16.6886 13.3728 17.2421 13.6048ZM13.0829 4.64939L16.5764 8.14613C16.5975 8.16843 16.6118 8.19636 16.6174 8.22657C16.6231 8.25677 16.62 8.28798 16.6084 8.31645C16.5968 8.34492 16.5773 8.36944 16.5521 8.38707C16.527 8.40471 16.4973 8.41471 16.4666 8.41587H13.043L12.8134 8.18609V4.75929C12.8146 4.72857 12.8246 4.69884 12.8422 4.67366C12.8598 4.64849 12.8843 4.62893 12.9128 4.61733C12.9412 4.60573 12.9724 4.60259 13.0026 4.60827C13.0328 4.61396 13.0607 4.62824 13.0829 4.64939ZM10.9869 6.71746C10.9896 6.65841 10.9806 6.59941 10.9604 6.54383C10.9403 6.48825 10.9094 6.4372 10.8696 6.39358C10.8297 6.34997 10.7816 6.31465 10.7281 6.28965C10.6746 6.26466 10.6167 6.25047 10.5577 6.2479H4.99813C4.88074 6.25562 4.77106 6.30914 4.69267 6.39694C4.61428 6.48475 4.57343 6.59983 4.57891 6.71746C4.57343 6.83509 4.61428 6.95017 4.69267 7.03798C4.77106 7.12579 4.88074 7.1793 4.99813 7.18702H10.5876C10.7014 7.17444 10.8061 7.11882 10.8803 7.03154C10.9545 6.94427 10.9927 6.83192 10.9869 6.71746ZM11.0867 8.13614H4.99812C4.87371 8.13614 4.75438 8.18561 4.66641 8.27367C4.57843 8.36173 4.529 8.48116 4.529 8.6057C4.529 8.73023 4.57843 8.84967 4.66641 8.93773C4.75438 9.02579 4.87371 9.07526 4.99812 9.07526H11.0867C11.2111 9.07526 11.3304 9.02579 11.4184 8.93773C11.5064 8.84967 11.5558 8.73023 11.5558 8.6057C11.5558 8.48116 11.5064 8.36173 11.4184 8.27367C11.3304 8.18561 11.2111 8.13614 11.0867 8.13614ZM4.99812 10.9935H15.4285C15.5609 10.9935 15.6878 10.9408 15.7814 10.8472C15.875 10.7535 15.9276 10.6264 15.9276 10.4939C15.9276 10.3614 15.875 10.2344 15.7814 10.1407C15.6878 10.047 15.5609 9.9944 15.4285 9.9944H4.99812C4.86576 9.9944 4.73883 10.047 4.64523 10.1407C4.55164 10.2344 4.49906 10.3614 4.49906 10.4939C4.49906 10.6264 4.55164 10.7535 4.64523 10.8472C4.73883 10.9408 4.86576 10.9935 4.99812 10.9935ZM4.99812 12.8517H11.0867C11.2076 12.844 11.3208 12.7898 11.4027 12.7004C11.4845 12.611 11.5287 12.4934 11.5259 12.3722C11.5286 12.252 11.4841 12.1355 11.402 12.0477C11.3199 11.9599 11.2067 11.9078 11.0867 11.9026H4.99812C4.93912 11.9052 4.8812 11.9194 4.82769 11.9444C4.77417 11.9694 4.7261 12.0047 4.68623 12.0483C4.64637 12.0919 4.61549 12.143 4.59536 12.1985C4.57523 12.2541 4.56625 12.3131 4.56893 12.3722C4.56345 12.4925 4.60535 12.6101 4.68561 12.6998C4.76587 12.7894 4.87809 12.844 4.99812 12.8517ZM19.97 17.4974C19.5787 16.5636 19.0431 15.6971 18.383 14.9298C18.0152 14.5351 17.5679 14.2233 17.0706 14.0148C16.5732 13.8064 16.0373 13.7062 15.4984 13.7209H15.2189C14.4787 13.8098 13.7684 14.0666 13.1423 14.4717C12.5162 14.8769 11.9906 15.4196 11.6057 16.0587C11.3211 16.4677 11.0959 16.9151 10.937 17.3875C10.9006 17.464 10.8817 17.5476 10.8817 17.6323C10.8817 17.717 10.9006 17.8006 10.937 17.877C11.0642 18.0428 11.2196 18.1849 11.3961 18.2967C11.7346 18.5476 12.0879 18.7778 12.4541 18.986C13.4096 19.5767 14.497 19.92 15.6182 19.9851C16.4392 20.0504 17.2632 19.9005 18.0088 19.5501C18.7544 19.1998 19.3959 18.661 19.8702 17.9869C19.9311 17.923 19.9729 17.8432 19.9905 17.7566C20.0082 17.67 20.0011 17.5801 19.97 17.4974ZM15.9775 19.1758C14.3849 19.068 12.8507 18.5331 11.5358 17.6273C11.5788 17.5678 11.6255 17.5111 11.6756 17.4574C12.3061 16.569 13.1295 15.8359 14.0832 15.3126C13.8003 15.7406 13.6785 16.2566 13.7417 16.7681C13.7676 17.0339 13.8465 17.2918 13.9737 17.5265C14.1009 17.7613 14.2739 17.9681 14.4823 18.1348C14.6907 18.3016 14.9304 18.4248 15.1872 18.4972C15.4441 18.5696 15.7128 18.5897 15.9775 18.5564C16.305 18.4971 16.6137 18.3609 16.8785 18.159C17.1432 17.9572 17.3564 17.6954 17.5005 17.3951C17.6446 17.0949 17.7156 16.7647 17.7077 16.4317C17.6997 16.0987 17.613 15.7723 17.4547 15.4793C17.2614 15.3391 17.0533 15.2235 16.8351 15.1339C17.0715 15.226 17.2966 15.3485 17.5046 15.4993C18.0049 15.8976 18.4424 16.3691 18.8022 16.898L18.8927 17.0137L18.8927 17.0137C19.0823 17.2564 19.2729 17.5004 19.4709 17.7072C18.5404 18.6311 17.288 19.1576 15.9775 19.1758ZM16.3168 15.769C16.2085 15.8106 16.1171 15.8873 16.0574 15.9869C15.9977 16.0865 15.9731 16.2032 15.9875 16.3185C15.9949 16.3856 16.0156 16.4505 16.0483 16.5096C16.081 16.5686 16.1251 16.6206 16.178 16.6624C16.2309 16.7042 16.2916 16.7351 16.3566 16.7532C16.4216 16.7714 16.4895 16.7764 16.5564 16.7681H16.6063C16.5618 16.9495 16.4637 17.1132 16.3248 17.238C16.186 17.3627 16.0127 17.4427 15.8278 17.4674H15.6481C15.4335 17.4396 15.2337 17.3427 15.0789 17.1913C14.924 17.04 14.8226 16.8423 14.7897 16.6282C14.7628 16.3782 14.8311 16.1271 14.981 15.9253C15.1305 15.7238 15.3504 15.5861 15.5968 15.5395C15.3446 15.5862 15.12 15.7284 14.9697 15.9364C14.8191 16.1448 14.7547 16.4034 14.7897 16.6582C14.8226 16.8723 14.924 17.0699 15.0789 17.2213C15.2337 17.3727 15.4335 17.4696 15.6481 17.4974H15.8377C16.0209 17.4708 16.1919 17.39 16.3289 17.2654C16.4658 17.1408 16.5625 16.978 16.6063 16.7981C16.7293 16.7633 16.8359 16.686 16.9072 16.5799C16.9785 16.4737 17.0098 16.3457 16.9956 16.2186C16.9882 16.1515 16.9675 16.0865 16.9348 16.0275C16.9021 15.9685 16.858 15.9165 16.805 15.8747C16.7521 15.8329 16.6914 15.802 16.6264 15.7838C16.5615 15.7657 16.4936 15.7607 16.4266 15.769H16.3168Z", acceptAllChanges: "M9.36499 16.7348C9.38499 16.7547 9.41212 16.7659 9.44041 16.7659H10.9881C10.9028 16.6008 10.9289 16.3933 11.0663 16.2541L11.7266 15.585H10.1444C10.0549 15.5701 9.97363 15.5238 9.91498 15.4547C9.85639 15.3856 9.82422 15.298 9.82422 15.2074C9.82422 15.1169 9.85639 15.0292 9.91498 14.9601C9.97363 14.891 10.0549 14.8448 10.1444 14.8298H12.4879C12.5584 14.785 12.6407 14.7607 12.7257 14.7607C12.8106 14.7607 12.893 14.785 12.9635 14.8298H16.5295L18.3303 13.0091C18.4135 12.925 18.5271 12.8776 18.6456 12.8777C18.7642 12.8777 18.8777 12.9252 18.9609 13.0094L20 14.0621V8.25532H16.8001C16.7301 8.27288 16.6568 8.27288 16.5868 8.25532C16.3485 8.1935 16.1367 8.0565 15.9829 7.86478C15.8292 7.67306 15.7416 7.43688 15.7335 7.19149V4H9.44041C9.41293 4.0024 9.38718 4.01437 9.36767 4.03383C9.34816 4.05329 9.33615 4.07897 9.33375 4.10638V16.6596C9.33375 16.6878 9.34499 16.7148 9.36499 16.7348ZM10.0744 17.2979H11.4803L12.259 18.0957H5.06727C5.01734 18.0957 4.96838 18.1057 4.9232 18.1246C4.8788 18.1431 4.83798 18.1702 4.80335 18.2048C4.7333 18.2746 4.69398 18.3693 4.69398 18.468C4.69398 18.5668 4.7333 18.6615 4.80335 18.7313C4.87333 18.8011 4.96832 18.8404 5.06727 18.8404H12.9857L13.7947 19.6693L14.0836 19.9574H4.10733C4.09291 19.9591 4.07829 19.9576 4.06457 19.9528C4.05085 19.9481 4.03838 19.9403 4.02812 19.9301C4.01785 19.9198 4.01004 19.9074 4.00529 19.8937C4.00054 19.88 3.99896 19.8654 4.00067 19.8511V7.29787C4.00067 7.26966 4.01191 7.2426 4.03191 7.22265C4.05192 7.2027 4.07905 7.19149 4.10733 7.19149H8.70447V9.05319H5.06727C4.97294 9.05867 4.88453 9.10069 4.8208 9.17019C4.757 9.23973 4.72302 9.33135 4.72594 9.42553C4.72289 9.52082 4.75654 9.61364 4.82002 9.6849C4.88356 9.75613 4.97203 9.80038 5.06727 9.8085H8.70447V10.5638H5.06727C5.01968 10.5652 4.97274 10.5759 4.92932 10.5954C4.88583 10.6148 4.84664 10.6426 4.8139 10.6772C4.78122 10.7118 4.7557 10.7525 4.73877 10.7969C4.72184 10.8413 4.7139 10.8887 4.71527 10.9361C4.7139 10.9837 4.72184 11.031 4.73877 11.0754C4.74424 11.0897 4.75055 11.1037 4.75778 11.1171C4.76162 11.1243 4.76566 11.1313 4.76995 11.1382C4.78265 11.1585 4.79736 11.1776 4.8139 11.1951C4.84664 11.2297 4.88583 11.2575 4.92932 11.2769C4.95491 11.2884 4.98173 11.2968 5.0092 11.3021C5.02834 11.3058 5.04774 11.3079 5.06727 11.3085H8.70447V12.0638H5.06734C4.97782 12.0789 4.89651 12.1251 4.83792 12.1942C4.77926 12.2633 4.7471 12.351 4.7471 12.4415C4.7471 12.5321 4.77926 12.6197 4.83792 12.6888C4.89651 12.758 4.97782 12.8041 5.06734 12.8192H8.70447V13.5745H5.06734C4.97782 13.5895 4.89651 13.6357 4.83792 13.7048C4.81383 13.7332 4.79424 13.7647 4.77946 13.7983C4.7583 13.8465 4.7471 13.8988 4.7471 13.9522C4.7471 14.0427 4.77926 14.1303 4.83792 14.1994C4.89651 14.2686 4.97782 14.3147 5.06734 14.3298H8.70447V15.0744H5.06727C4.97776 15.0895 4.89651 15.1357 4.83785 15.2048C4.77926 15.2739 4.7471 15.3616 4.7471 15.4521C4.7471 15.5043 4.75778 15.5556 4.77809 15.6029C4.793 15.6376 4.81305 15.6701 4.83785 15.6994C4.89651 15.7685 4.97776 15.8147 5.06727 15.8298H8.70447V16.5851H5.06727C4.97776 16.6001 4.89651 16.6463 4.83785 16.7154C4.79489 16.7661 4.76618 16.8267 4.75387 16.8912C4.74938 16.9146 4.7471 16.9386 4.7471 16.9628C4.7471 17.0533 4.77926 17.1409 4.83785 17.21C4.89651 17.2792 4.97776 17.3253 5.06727 17.3404H9.95241C9.99552 17.3331 10.0367 17.3187 10.0744 17.2979ZM20 15.3204L18.5709 16.7659H19.8933C19.9216 16.7659 19.9487 16.7547 19.9687 16.7348C19.9887 16.7148 20 16.6878 20 16.6596V15.3204ZM14.7526 16.6264L13.7248 15.585H15.7825L14.7526 16.6264ZM14.9498 6.08721C14.9465 6.06854 14.9416 6.05023 14.9353 6.03244C14.9202 5.98939 14.897 5.94929 14.8665 5.91442C14.8145 5.85488 14.7444 5.81394 14.6669 5.79787H10.1337C10.0348 5.79787 9.93978 5.83709 9.8698 5.90693C9.79975 5.97676 9.76043 6.07146 9.76043 6.17022C9.76043 6.19463 9.76283 6.21879 9.76752 6.24239C9.77462 6.2782 9.78692 6.31268 9.80398 6.34479C9.82123 6.37716 9.8433 6.40709 9.8698 6.43348C9.93978 6.50332 10.0348 6.54257 10.1337 6.54257H14.6669C14.6811 6.54023 14.6951 6.53702 14.7088 6.53299C14.7206 6.52955 14.7322 6.52549 14.7436 6.52082C14.7624 6.51309 14.7806 6.50371 14.7979 6.4928C14.8378 6.46764 14.8722 6.43468 14.8991 6.39599C14.9259 6.35729 14.9447 6.31359 14.9543 6.26749C14.9554 6.26232 14.9563 6.25716 14.9571 6.25197C14.9579 6.24739 14.9586 6.24281 14.9591 6.23824C14.9612 6.22129 14.962 6.20424 14.9616 6.18723C14.961 6.16727 14.9588 6.14733 14.9549 6.12766C14.9539 6.11406 14.9523 6.10055 14.9498 6.08721ZM15.0189 7.29788H10.1445C10.0549 7.31291 9.97363 7.35911 9.91504 7.42823C9.85639 7.49738 9.82422 7.585 9.82422 7.67555C9.82422 7.76609 9.85639 7.85369 9.91504 7.92284C9.97363 7.99196 10.0549 8.03815 10.1445 8.05319H15.0189C15.0321 8.05241 15.0451 8.05095 15.058 8.04877C15.0745 8.04601 15.0906 8.04212 15.1064 8.03718C15.1669 8.01822 15.2219 7.98361 15.2654 7.93618C15.3291 7.86664 15.3632 7.77502 15.3602 7.68084C15.3606 7.67392 15.3608 7.66701 15.3608 7.66009C15.3609 7.65087 15.3606 7.64165 15.3599 7.63247C15.3592 7.62263 15.358 7.61279 15.3565 7.60302C15.3532 7.58188 15.3479 7.56104 15.3409 7.54072C15.3254 7.49575 15.301 7.45426 15.2693 7.41868C15.2492 7.39621 15.2265 7.37638 15.2017 7.35959C15.1872 7.34979 15.172 7.34102 15.1562 7.33339C15.1132 7.31265 15.0665 7.3006 15.0189 7.29788ZM10.1445 9.56381H18.496C18.5856 9.54877 18.6669 9.50258 18.7255 9.43346C18.7841 9.3643 18.8163 9.27671 18.8163 9.18617C18.8163 9.09562 18.7841 9.008 18.7255 8.93884C18.6669 8.86973 18.5856 8.82353 18.496 8.8085H10.1445C10.0549 8.82353 9.97363 8.86973 9.91504 8.93884C9.85639 9.008 9.82422 9.09562 9.82422 9.18617C9.82422 9.24412 9.83738 9.30087 9.86224 9.35236C9.87624 9.38132 9.89395 9.40859 9.91504 9.43346C9.97363 9.50258 10.0549 9.54877 10.1445 9.56381ZM10.1445 11.0638H15.0189C15.1084 11.0488 15.1897 11.0026 15.2483 10.9335C15.2854 10.8898 15.3118 10.8387 15.3263 10.7842C15.3347 10.7525 15.3391 10.7195 15.3391 10.6861C15.3391 10.5956 15.3069 10.508 15.2483 10.4389C15.1897 10.3697 15.1084 10.3235 15.0189 10.3085H10.1445C10.0549 10.3235 9.97363 10.3697 9.91504 10.4389C9.85639 10.508 9.82422 10.5956 9.82422 10.6861C9.82422 10.7424 9.83666 10.7976 9.8601 10.8478C9.87442 10.8785 9.89284 10.9073 9.91504 10.9335C9.97363 11.0026 10.0549 11.0488 10.1445 11.0638ZM18.496 12.5745H10.1444C10.0549 12.5594 9.97363 12.5132 9.91498 12.4441C9.85639 12.3749 9.82422 12.2873 9.82422 12.1968C9.82422 12.1062 9.85639 12.0186 9.91498 11.9495C9.97363 11.8803 10.0549 11.8342 10.1444 11.8191H18.496C18.5856 11.8342 18.6669 11.8803 18.7255 11.9495C18.7841 12.0186 18.8163 12.1062 18.8163 12.1968C18.8163 12.2873 18.7841 12.3749 18.7255 12.4441C18.6971 12.4776 18.6633 12.5058 18.6259 12.5276C18.5861 12.5507 18.5421 12.5667 18.496 12.5745ZM15.0189 14.0744H10.1444C10.0968 14.0731 10.0499 14.0624 10.0064 14.0429C9.96296 14.0234 9.92376 13.9956 9.89102 13.961C9.85834 13.9265 9.83282 13.8857 9.81589 13.8413C9.79897 13.7969 9.79102 13.7496 9.79239 13.7021C9.79102 13.6546 9.79897 13.6073 9.81589 13.5628C9.83282 13.5184 9.85834 13.4778 9.89102 13.4432C9.92376 13.4086 9.96296 13.3808 10.0064 13.3613C10.0499 13.3419 10.0968 13.3311 10.1444 13.3297H15.0189C15.0661 13.3311 15.1125 13.3419 15.1554 13.3615C15.1983 13.381 15.2368 13.4091 15.2686 13.4438C15.3005 13.4785 15.325 13.5193 15.3407 13.5637C15.3564 13.608 15.363 13.6551 15.3602 13.7021C15.3631 13.7963 15.3291 13.8879 15.2653 13.9574C15.2016 14.027 15.1132 14.0689 15.0189 14.0744ZM16.6188 4.52128L19.4133 7.30852C19.4293 7.32624 19.4401 7.34808 19.4443 7.37157C19.4485 7.39506 19.446 7.41925 19.4371 7.4414C19.4282 7.46356 19.4133 7.48278 19.394 7.4969C19.3747 7.51102 19.3518 7.51947 19.328 7.52128H16.5868L16.4054 7.34043V4.60639C16.4073 4.5826 16.4157 4.55979 16.4299 4.54056C16.444 4.52133 16.4633 4.50644 16.4855 4.49757C16.5077 4.48871 16.532 4.48624 16.5556 4.49043C16.5791 4.49462 16.601 4.50531 16.6188 4.52128ZM18.6454 13.3192L20 14.6915L14.7522 20L14.7416 19.9894L14.1123 19.3617L13.3976 18.6277L11.3817 16.5638L12.7257 15.2021L14.7522 17.2553L18.6454 13.3192Z", rejectAllChanges: "M9.54637 16.5847H8.96997V15.8295H12.786C12.8024 15.8265 12.8186 15.8223 12.8343 15.817C12.8535 15.8105 12.8719 15.8023 12.8897 15.7926C12.9315 15.7697 12.969 15.738 12.9997 15.6991C13.0268 15.6649 13.0478 15.6261 13.0621 15.5847H13.571V16.7656H9.79386C9.78396 16.7479 9.77269 16.731 9.76011 16.7151C9.70552 16.6459 9.62976 16.5998 9.54637 16.5847ZM13.4717 12.9573V13.3295H9.72523C9.6809 13.3309 9.63716 13.3416 9.59671 13.361C9.57578 13.3711 9.55595 13.3834 9.53745 13.3977C9.5201 13.411 9.50391 13.4262 9.48917 13.4429C9.45872 13.4775 9.43494 13.5182 9.41917 13.5626C9.41778 13.5664 9.41644 13.5703 9.41523 13.5742H8.96997V12.8189H12.786C12.8694 12.8039 12.9452 12.7577 12.9997 12.6886C13.0078 12.6784 13.0153 12.6677 13.0223 12.6568L13.029 12.6458L13.033 12.6389L13.0397 12.6266C13.0452 12.6157 13.0503 12.6046 13.055 12.5931C13.0576 12.5869 13.0599 12.5806 13.0621 12.5742H13.6872C13.6453 12.5965 13.607 12.6269 13.5746 12.6644C13.5059 12.7439 13.469 12.849 13.4717 12.9573ZM9.82598 14.0742H13.4758C13.4809 14.0932 13.4904 14.1108 13.5037 14.1251C13.5242 14.147 13.552 14.1593 13.581 14.1593H13.6008L13.571 14.1912V14.8295H9.72523C9.64183 14.8445 9.56614 14.8907 9.51149 14.9598C9.4845 14.994 9.46351 15.0328 9.4492 15.0741H8.96997V14.3295H9.54637C9.62976 14.3145 9.70552 14.2683 9.76011 14.1992C9.78947 14.162 9.81166 14.1195 9.82598 14.0742ZM18.9075 8.2552V12.5317H17.7846V12.323C17.7978 12.2827 17.8047 12.2399 17.8047 12.1965C17.8047 12.106 17.7747 12.0184 17.7201 11.9493C17.6655 11.8801 17.5897 11.834 17.5063 11.8189H9.72523C9.64183 11.834 9.56614 11.8801 9.51149 11.9493C9.48444 11.9835 9.46351 12.0222 9.4492 12.0636H8.96997V11.3083H9.54637C9.63425 11.3028 9.71662 11.2608 9.776 11.1913C9.80687 11.1551 9.83029 11.113 9.84527 11.0676L9.84654 11.0637H14.2667C14.3501 11.0486 14.4258 11.0024 14.4805 10.9333C14.5231 10.8794 14.5507 10.8142 14.5607 10.7452C14.5636 10.7258 14.565 10.706 14.565 10.686C14.565 10.6658 14.5635 10.6458 14.5606 10.626C14.5572 10.6026 14.5516 10.5796 14.5442 10.5573C14.5299 10.5144 14.5084 10.4741 14.4805 10.4387C14.4258 10.3696 14.3501 10.3234 14.2667 10.3083H9.72529C9.6832 10.3159 9.64299 10.3314 9.60653 10.3538C9.57081 10.3759 9.5386 10.4045 9.51155 10.4387C9.49639 10.4579 9.4831 10.4785 9.47182 10.5002C9.46133 10.5205 9.45259 10.5417 9.44568 10.5636H8.96997V9.80838H9.16873C9.25656 9.80286 9.33899 9.76085 9.39837 9.69131C9.45775 9.62177 9.48947 9.53022 9.48674 9.43601C9.48711 9.42951 9.48735 9.42302 9.48741 9.41653C9.48741 9.41049 9.48729 9.40445 9.48705 9.39848C9.49457 9.41055 9.50269 9.42218 9.51155 9.43334C9.56614 9.50249 9.64189 9.54866 9.72529 9.56372H17.5063C17.5897 9.54866 17.6655 9.50249 17.7201 9.43334C17.7747 9.36419 17.8047 9.2766 17.8047 9.18603C17.8047 9.09552 17.7747 9.00786 17.7201 8.93878C17.6655 8.86963 17.5897 8.82346 17.5063 8.8084H9.72529C9.64189 8.82346 9.56614 8.86963 9.51155 8.93878C9.4569 9.00786 9.42694 9.09552 9.42694 9.18603L9.427 9.19707L9.42754 9.20875C9.41972 9.19661 9.41123 9.18499 9.40201 9.17389C9.38478 9.15311 9.36537 9.1346 9.34427 9.11863C9.33735 9.11344 9.33026 9.1085 9.32298 9.10383C9.31855 9.10097 9.31406 9.09824 9.30951 9.09565L9.30424 9.09266L9.29659 9.08857C9.28792 9.08402 9.27906 9.07993 9.27009 9.07623C9.2616 9.07279 9.25298 9.06974 9.24431 9.06701C9.21974 9.05935 9.19439 9.05461 9.16873 9.05305H8.96997V4.10638C8.97221 4.07897 8.9834 4.05328 9.00157 4.03383C9.01975 4.01437 9.04374 4.0024 9.06935 4H14.9325V7.1914C14.9401 7.43679 15.0216 7.67296 15.1649 7.86468C15.3082 8.0564 15.5055 8.19338 15.7275 8.2552C15.7927 8.27277 15.861 8.27277 15.9262 8.2552H18.9075ZM13.571 17.2975V19.4251L13.5722 19.4615C13.5835 19.6376 13.6323 19.8068 13.7133 19.957H4.10061C4.08718 19.9587 4.07355 19.9571 4.06077 19.9524C4.04799 19.9477 4.03637 19.9399 4.02681 19.9296C4.01724 19.9194 4.00997 19.907 4.00554 19.8933C4.00111 19.8796 3.99964 19.865 4.00124 19.8506V7.29778C4.00124 7.26957 4.01171 7.24251 4.03034 7.22256C4.04898 7.20261 4.07426 7.1914 4.10061 7.1914H8.38368V9.05305H4.99497C4.90708 9.05857 4.82471 9.10052 4.76533 9.17006C4.70589 9.2396 4.67423 9.33121 4.67696 9.42536C4.67411 9.52067 4.70547 9.61346 4.76461 9.68475C4.8238 9.75598 4.90623 9.80026 4.99497 9.80838H8.38368V10.5636H4.99497C4.96682 10.5645 4.93898 10.5692 4.91199 10.5774C4.89647 10.5821 4.88124 10.588 4.86644 10.5952C4.8494 10.6034 4.83308 10.613 4.81762 10.6241C4.79627 10.6393 4.77655 10.657 4.7589 10.6771C4.72846 10.7116 4.70468 10.7523 4.68891 10.7967C4.67314 10.8411 4.66574 10.8885 4.66701 10.9359C4.66641 10.9597 4.66792 10.9834 4.67156 11.0067C4.6752 11.03 4.68102 11.053 4.68891 11.0752C4.70468 11.1196 4.72846 11.1603 4.7589 11.1949C4.7731 11.211 4.78862 11.2256 4.80524 11.2386C4.81452 11.2459 4.82417 11.2527 4.83417 11.259C4.84461 11.2655 4.85534 11.2714 4.86644 11.2767C4.9069 11.2962 4.95063 11.3069 4.99497 11.3083H8.38368V12.0636H4.99503C4.91163 12.0787 4.83587 12.1249 4.78128 12.194C4.7526 12.2303 4.7307 12.2717 4.71639 12.3159C4.70347 12.3559 4.69667 12.3983 4.69667 12.4413C4.69667 12.5318 4.72664 12.6194 4.78128 12.6886C4.809 12.7237 4.84218 12.7529 4.87906 12.7751C4.89416 12.7842 4.90993 12.7921 4.92619 12.7988C4.94833 12.8079 4.97137 12.8147 4.99503 12.8189H8.38368V13.5742H4.99503C4.95275 13.5819 4.91242 13.5975 4.87584 13.62C4.8403 13.642 4.80822 13.6705 4.78128 13.7046C4.72664 13.7737 4.69667 13.8613 4.69667 13.9519C4.69667 14.0424 4.72664 14.13 4.78128 14.1992C4.83587 14.2683 4.91163 14.3145 4.99503 14.3295H8.38368V15.0741H4.99497C4.94644 15.0829 4.90047 15.1022 4.85977 15.1304C4.83878 15.145 4.81919 15.162 4.80136 15.1811C4.79439 15.1885 4.78765 15.1964 4.78122 15.2045C4.77188 15.2163 4.76327 15.2287 4.75539 15.2416C4.74441 15.2594 4.73495 15.2781 4.727 15.2975C4.71924 15.3163 4.71293 15.3358 4.70808 15.3558C4.70407 15.3723 4.7011 15.389 4.69922 15.4061C4.69752 15.4212 4.69667 15.4364 4.69667 15.4518C4.69667 15.5423 4.72664 15.6299 4.78122 15.6991C4.83587 15.7682 4.91157 15.8144 4.99497 15.8295H8.38368V16.5847H4.99497C4.91157 16.5998 4.83587 16.6459 4.78122 16.7151C4.72664 16.7842 4.69667 16.8718 4.69667 16.9624C4.69667 17.0529 4.72664 17.1405 4.78122 17.2097C4.83587 17.2788 4.91157 17.325 4.99497 17.34H9.54637C9.58655 17.3328 9.62496 17.3183 9.66008 17.2975H13.571ZM15.7573 4.52124L18.3609 7.30839C18.3758 7.32612 18.3858 7.34796 18.3897 7.37145C18.3937 7.39493 18.3914 7.41913 18.3831 7.44128C18.3748 7.46343 18.3609 7.48266 18.3429 7.49678C18.325 7.51089 18.3036 7.51934 18.2814 7.52115H15.7275L15.5585 7.34031V4.60634C15.5602 4.58255 15.5681 4.55975 15.5813 4.54051C15.5945 4.52128 15.6125 4.50639 15.6332 4.49753C15.6539 4.48867 15.6765 4.48619 15.6984 4.49038C15.7203 4.49457 15.7407 4.50526 15.7573 4.52124ZM14.1248 5.91437C14.1732 5.97391 14.2021 6.04884 14.2071 6.1276C14.2157 6.17377 14.2155 6.22129 14.2065 6.26739C14.2045 6.27778 14.2021 6.28804 14.1992 6.29817L14.1944 6.31388C14.1847 6.34291 14.1715 6.3705 14.1551 6.39595C14.13 6.43465 14.098 6.46757 14.0608 6.49276C14.0354 6.5099 14.008 6.52328 13.9794 6.53244C13.9661 6.53672 13.9525 6.5401 13.9387 6.5425H9.71529C9.62309 6.5425 9.5346 6.50328 9.4694 6.43342C9.40413 6.36362 9.3675 6.26889 9.3675 6.17013C9.3675 6.07144 9.40413 5.97671 9.4694 5.90691C9.5346 5.83704 9.62309 5.79783 9.71529 5.79783H13.9387C13.9718 5.80516 14.0034 5.81769 14.0326 5.83484C14.0672 5.85522 14.0984 5.88204 14.1248 5.91437ZM14.2667 7.29776H9.72529C9.69606 7.30302 9.66773 7.31211 9.64092 7.3247C9.62612 7.33171 9.61175 7.33977 9.59798 7.34879C9.56565 7.36996 9.53642 7.39664 9.51155 7.42813C9.4569 7.49722 9.42694 7.58487 9.42694 7.67538C9.42694 7.70155 9.42942 7.72752 9.43434 7.75285C9.44635 7.81505 9.47273 7.87355 9.51155 7.9227C9.55292 7.9751 9.60647 8.01432 9.66628 8.03678C9.67762 8.04107 9.6892 8.04477 9.70097 8.04775C9.70898 8.04983 9.71711 8.05158 9.72529 8.05308H14.2667C14.3546 8.04756 14.437 8.00555 14.4964 7.93601C14.5558 7.86647 14.5875 7.77492 14.5847 7.68071C14.5874 7.63318 14.5813 7.58559 14.5667 7.54059C14.5522 7.4956 14.5296 7.45417 14.5 7.41859C14.4704 7.38301 14.4346 7.35398 14.3946 7.33327C14.3546 7.31256 14.3111 7.30048 14.2667 7.29776ZM4.99497 18.84H12.786C12.8783 18.84 12.9667 18.8008 13.032 18.731C13.0972 18.6611 13.1338 18.5664 13.1338 18.4677C13.1338 18.3689 13.0972 18.2742 13.032 18.2044C12.9667 18.1346 12.8783 18.0954 12.786 18.0954H4.99497C4.90277 18.0954 4.81428 18.1346 4.74908 18.2044C4.68381 18.2742 4.64718 18.3689 4.64718 18.4677C4.64718 18.5664 4.68381 18.6611 4.74908 18.731C4.81428 18.8008 4.90277 18.84 4.99497 18.84ZM17.5858 12.7444H19.5733H19.623C19.7249 12.7499 19.821 12.7971 19.8913 12.8764C19.9616 12.9556 20.0007 13.0607 20.0006 13.17V13.8295C20.0007 13.8458 19.9976 13.862 19.9914 13.8769C19.9853 13.8918 19.9764 13.9052 19.9652 13.9163C19.9539 13.9273 19.9407 13.9357 19.9262 13.9409C19.9118 13.9461 19.8965 13.948 19.8814 13.9465H13.7797C13.7507 13.9465 13.7229 13.9342 13.7024 13.9123C13.6819 13.8903 13.6704 13.8606 13.6704 13.8295V13.17C13.6677 13.0617 13.7046 12.9566 13.7733 12.8771C13.842 12.7976 13.9371 12.75 14.0381 12.7444H16.0256V12.5104C16.0352 12.439 16.0687 12.3737 16.1199 12.3268C16.1711 12.2798 16.2365 12.2544 16.3039 12.2551H17.2976C17.3667 12.2517 17.4345 12.276 17.4878 12.3232C17.541 12.3704 17.576 12.4371 17.5858 12.5104V12.7444ZM14.0679 19.4251V14.1912H19.5037V19.4251C19.4935 19.585 19.4256 19.7344 19.3143 19.8416C19.203 19.9488 19.0571 20.0055 18.9075 19.9996H14.6642C14.5146 20.0055 14.3687 19.9488 14.2574 19.8416C14.1461 19.7344 14.0781 19.585 14.0679 19.4251ZM15.5983 15.1593H15.2505C15.0969 15.1593 14.9723 15.2926 14.9723 15.4572V18.7336C14.9723 18.8981 15.0969 19.0315 15.2505 19.0315H15.5983C15.752 19.0315 15.8766 18.8981 15.8766 18.7336V15.4572C15.8766 15.2926 15.752 15.1593 15.5983 15.1593ZM16.9598 15.1593H16.612C16.4583 15.1593 16.3337 15.2926 16.3337 15.4572V18.7336C16.3337 18.8981 16.4583 19.0315 16.612 19.0315H16.9598C17.1135 19.0315 17.238 18.8981 17.238 18.7336V15.4572C17.238 15.2926 17.1135 15.1593 16.9598 15.1593ZM17.9635 15.1593H18.3113C18.465 15.1593 18.5895 15.2926 18.5895 15.4572V18.7336C18.5895 18.8981 18.465 19.0315 18.3113 19.0315H17.9635C17.8098 19.0315 17.6852 18.8981 17.6852 18.7336V15.4572C17.6852 15.2926 17.8098 15.1593 17.9635 15.1593Z", acceptSingleChange: "M17.2 20H15.6628L17.33 18.3091V19.87C17.33 19.8871 17.3266 19.904 17.3201 19.9197C17.3136 19.9355 17.304 19.9499 17.2919 19.9619C17.2799 19.974 17.2655 19.9836 17.2497 19.9901C17.234 19.9966 17.2171 20 17.2 20ZM4.13 20H14.4978L14.1823 19.6791L13.5135 18.9904L13.5123 18.9891L13.0529 18.52H5C4.87537 18.52 4.75586 18.4705 4.66766 18.3823C4.57953 18.2942 4.53003 18.1747 4.53003 18.05C4.53003 17.9253 4.57953 17.8058 4.66766 17.7177C4.75586 17.6295 4.87537 17.58 5 17.58H12.1323L11.6235 17.0604L11.6231 16.48L12.8831 15.19L13.4765 15.1896L15.0807 16.8276L17.33 14.5413V9.3H13.28C13.207 9.30976 13.133 9.30976 13.06 9.3C12.7697 9.22119 12.5113 9.05343 12.3212 8.82027C12.1311 8.58711 12.0187 8.30026 12 8V4H4.13C4.09552 4 4.06246 4.0137 4.03808 4.03808C4.0137 4.06246 4 4.09552 4 4.13V19.87C4 19.9045 4.0137 19.9375 4.03808 19.9619C4.06246 19.9863 4.09552 20 4.13 20ZM13.1 4.65L16.6 8.15C16.6212 8.17232 16.6355 8.20028 16.6412 8.23051C16.6469 8.26075 16.6437 8.29199 16.6321 8.32048C16.6205 8.34898 16.6009 8.37352 16.5757 8.39117C16.5505 8.40882 16.5208 8.41883 16.49 8.42H13.06L12.83 8.19V4.76C12.8312 4.72925 12.8412 4.6995 12.8588 4.67429C12.8765 4.64909 12.901 4.62951 12.9295 4.6179C12.958 4.6063 12.9893 4.60315 13.0195 4.60884C13.0497 4.61453 13.0777 4.62882 13.1 4.65ZM11 6.72C11.0027 6.66089 10.9937 6.60184 10.9735 6.5462C10.9534 6.49057 10.9224 6.43948 10.8825 6.39581C10.8425 6.35217 10.7944 6.3168 10.7408 6.29178C10.6871 6.26678 10.6292 6.25256 10.57 6.25H5C4.88239 6.25772 4.77252 6.31131 4.69397 6.39917C4.61542 6.48706 4.57452 6.60226 4.58002 6.72C4.57452 6.83774 4.61542 6.95294 4.69397 7.04083C4.77252 7.12869 4.88239 7.18228 5 7.19H10.6C10.7141 7.1774 10.8189 7.12173 10.8933 7.03436C10.9677 6.94702 11.0058 6.83456 11 6.72ZM11.1 8.14001H5C4.87537 8.14001 4.75586 8.18954 4.66766 8.27768C4.57953 8.36581 4.53003 8.48535 4.53003 8.61002C4.53003 8.73468 4.57953 8.85422 4.66766 8.94235C4.71558 8.99023 4.77277 9.02673 4.83496 9.05008C4.86932 9.06296 4.90521 9.07184 4.94189 9.07642C4.96106 9.0788 4.98047 9.08002 5 9.08002H11.1C11.2247 9.08002 11.3442 9.03049 11.4324 8.94235C11.5205 8.85422 11.57 8.73468 11.57 8.61002C11.57 8.48535 11.5205 8.36581 11.4324 8.27768C11.3442 8.18954 11.2247 8.14001 11.1 8.14001ZM5 11H15.45C15.5826 11 15.7098 10.9473 15.8035 10.8535C15.8973 10.7598 15.95 10.6326 15.95 10.5C15.95 10.3674 15.8973 10.2402 15.8035 10.1465C15.7098 10.0527 15.5826 10 15.45 10H5C4.86737 10 4.74023 10.0527 4.64642 10.1465C4.55267 10.2402 4.5 10.3674 4.5 10.5C4.5 10.6326 4.55267 10.7598 4.64642 10.8535C4.74023 10.9473 4.86737 11 5 11ZM5 12.86H11.1C11.2211 12.8523 11.3346 12.798 11.4166 12.7085C11.4986 12.6191 11.5428 12.5013 11.54 12.38C11.5427 12.2597 11.4982 12.1431 11.416 12.0552C11.3337 11.9673 11.2203 11.9152 11.1 11.91H5C4.94086 11.9126 4.88287 11.9268 4.82922 11.9518C4.77563 11.9768 4.72748 12.0122 4.6875 12.0558C4.65833 12.0878 4.63391 12.1237 4.61505 12.1624C4.60809 12.1767 4.60193 12.1913 4.5965 12.2062C4.58264 12.2443 4.5741 12.2841 4.57092 12.3243C4.56946 12.3428 4.56915 12.3614 4.57001 12.38C4.56451 12.5004 4.60651 12.6181 4.68689 12.7079C4.76733 12.7976 4.87976 12.8523 5 12.86ZM15.45 14.74H5C4.87537 14.74 4.75586 14.6905 4.66766 14.6023C4.57953 14.5142 4.53003 14.3947 4.53003 14.27C4.53003 14.1453 4.57953 14.0258 4.66766 13.9377C4.75586 13.8495 4.87537 13.8 5 13.8H15.45C15.5747 13.8 15.6942 13.8495 15.7823 13.9377C15.8705 14.0258 15.92 14.1453 15.92 14.27C15.92 14.3947 15.8705 14.5142 15.7823 14.6023C15.6942 14.6905 15.5747 14.74 15.45 14.74ZM11.1 16.63H5C4.87537 16.63 4.75586 16.5805 4.66766 16.4923C4.57953 16.4042 4.53003 16.2846 4.53003 16.16C4.53003 16.0353 4.57953 15.9158 4.66766 15.8276C4.75586 15.7395 4.87537 15.69 5 15.69H11.1C11.2247 15.69 11.3442 15.7395 11.4324 15.8276C11.5205 15.9158 11.57 16.0353 11.57 16.16C11.57 16.2846 11.5205 16.4042 11.4324 16.4923C11.3442 16.5805 11.2247 16.63 11.1 16.63ZM18.73 13.71L20 15.01L15.08 20L15.07 19.99L14.48 19.39L13.81 18.7L11.92 16.77L13.18 15.48L15.08 17.42L18.73 13.71Z", rejectSingleChange: "M17.0495 11.5C17.1461 11.5 17.241 11.5173 17.33 11.5501V9.3H13.28C13.207 9.30976 13.133 9.30976 13.06 9.3C12.7697 9.22119 12.5113 9.05343 12.3212 8.82027C12.1311 8.58711 12.0187 8.30026 12 8V4H4.13C4.09552 4 4.06246 4.0137 4.03808 4.03808C4.0137 4.06246 4 4.09552 4 4.13V19.87C4 19.9045 4.0137 19.9375 4.03808 19.9619C4.06246 19.9863 4.09552 20 4.13 20H13.2305C13.1075 19.8287 13.0338 19.6249 13.0205 19.4112L13.0195 19.3956V18.52H5C4.87537 18.52 4.75586 18.4705 4.66772 18.3823C4.57959 18.2942 4.53003 18.1747 4.53003 18.05C4.53003 18.0119 4.53467 17.9742 4.54358 17.9378C4.56396 17.8552 4.60657 17.7788 4.66772 17.7177C4.75586 17.6295 4.87537 17.58 5 17.58H13.0195V14.74H5C4.87537 14.74 4.75586 14.6905 4.66772 14.6023C4.57959 14.5142 4.53003 14.3947 4.53003 14.27C4.53003 14.1453 4.57959 14.0258 4.66772 13.9377C4.75586 13.8495 4.87537 13.8 5 13.8H12.8393C12.6229 13.6377 12.4998 13.3897 12.4998 13.1032C12.4997 12.8414 12.6008 12.5847 12.7513 12.3911C12.9 12.1998 13.1561 12 13.4994 12L15.2519 12C15.2928 11.8972 15.3589 11.7915 15.4649 11.6992C15.6135 11.5698 15.8041 11.499 16.0011 11.5H17.0495ZM13.1 4.65L16.6 8.15C16.6211 8.17232 16.6354 8.20028 16.6411 8.23051C16.6468 8.26075 16.6437 8.29199 16.6321 8.32048C16.6204 8.34898 16.6009 8.37352 16.5757 8.39117C16.5505 8.40882 16.5207 8.41883 16.49 8.42H13.06L12.83 8.19V4.76C12.8311 4.72925 12.8411 4.6995 12.8588 4.67429C12.8764 4.64909 12.901 4.62951 12.9295 4.6179C12.958 4.6063 12.9892 4.60315 13.0194 4.60884C13.0497 4.61453 13.0776 4.62882 13.1 4.65ZM11 6.72C11.0027 6.66089 10.9937 6.60184 10.9735 6.5462C10.9716 6.5408 10.9695 6.53543 10.9673 6.53012C10.9626 6.51852 10.9575 6.50717 10.9518 6.49603C10.9406 6.47391 10.9275 6.45273 10.9127 6.43274C10.9033 6.41992 10.8932 6.40759 10.8824 6.39581C10.8425 6.35217 10.7943 6.3168 10.7407 6.29178C10.6871 6.26678 10.629 6.25256 10.5699 6.25H5C4.88232 6.25772 4.77246 6.31131 4.69397 6.39917C4.61536 6.48706 4.57446 6.60226 4.57996 6.72C4.57715 6.7811 4.58679 6.84152 4.60767 6.8978C4.61523 6.91803 4.62415 6.93771 4.63452 6.9567C4.65088 6.98669 4.67078 7.01495 4.69397 7.04083C4.77246 7.12869 4.88232 7.18228 5 7.19H10.6C10.714 7.1774 10.8188 7.12173 10.8932 7.03436C10.922 7.00049 10.9454 6.96283 10.9629 6.92273C10.9725 6.9006 10.9805 6.87775 10.9865 6.8544C10.9933 6.82791 10.9977 6.80075 10.9995 6.77325C11.0001 6.76453 11.0004 6.75574 11.0005 6.74695C11.0006 6.73798 11.0005 6.729 11 6.72ZM11.1 8.14001H5C4.97534 8.14001 4.95081 8.14194 4.92676 8.14575C4.89587 8.15063 4.8656 8.15857 4.83643 8.1694C4.77368 8.19272 4.71606 8.2294 4.66772 8.27768C4.57959 8.36581 4.53003 8.48535 4.53003 8.61002C4.53003 8.73468 4.57959 8.85422 4.66772 8.94235C4.75586 9.03049 4.87537 9.08002 5 9.08002H11.1C11.2247 9.08002 11.3442 9.03049 11.4324 8.94235C11.4617 8.91306 11.4867 8.88028 11.5071 8.845C11.5349 8.79691 11.554 8.74414 11.5634 8.68915C11.5677 8.66318 11.5701 8.63672 11.5701 8.61002C11.5701 8.48535 11.5205 8.36581 11.4324 8.27768C11.3929 8.23831 11.3474 8.20663 11.2979 8.18365C11.2365 8.15518 11.1689 8.14001 11.1 8.14001ZM5 11H15.45C15.5826 11 15.7098 10.9473 15.8036 10.8535C15.8973 10.7598 15.95 10.6326 15.95 10.5C15.95 10.3674 15.8973 10.2402 15.8036 10.1465C15.7098 10.0527 15.5826 10 15.45 10H5C4.86743 10 4.74023 10.0527 4.64648 10.1465C4.55273 10.2402 4.5 10.3674 4.5 10.5C4.5 10.6326 4.55273 10.7598 4.64648 10.8535C4.74023 10.9473 4.86743 11 5 11ZM5 12.86H11.1C11.2211 12.8523 11.3346 12.798 11.4166 12.7085C11.4987 12.6191 11.5428 12.5013 11.54 12.38C11.5427 12.2597 11.4982 12.1431 11.4159 12.0552C11.3336 11.9673 11.2202 11.9152 11.1 11.91H5C4.94092 11.9126 4.88281 11.9268 4.82922 11.9518C4.77563 11.9768 4.72742 12.0122 4.6875 12.0558C4.64758 12.0995 4.6167 12.1506 4.59644 12.2062C4.58899 12.2266 4.58313 12.2475 4.57874 12.2687C4.57129 12.3052 4.56824 12.3426 4.56995 12.38C4.56445 12.5004 4.60645 12.6181 4.68689 12.7079C4.76733 12.7976 4.87976 12.8523 5 12.86ZM11.1 16.63H5C4.87537 16.63 4.75586 16.5805 4.66772 16.4923C4.57959 16.4042 4.53003 16.2846 4.53003 16.16C4.53003 16.0353 4.57959 15.9158 4.66772 15.8276C4.75586 15.7395 4.87537 15.69 5 15.69H11.1C11.2247 15.69 11.3442 15.7395 11.4324 15.8276C11.5205 15.9158 11.5701 16.0353 11.5701 16.16C11.5701 16.2846 11.5205 16.4042 11.4324 16.4923C11.3442 16.5805 11.2247 16.63 11.1 16.63ZM19.59 12.53H17.36V12.3C17.3574 12.2195 17.3236 12.1432 17.2657 12.0872C17.2078 12.0313 17.1305 12 17.05 12H16C15.9242 11.9994 15.8509 12.0265 15.7938 12.0762C15.7367 12.126 15.6997 12.1949 15.69 12.27V12.5H13.44C13.3768 12.4994 13.3142 12.5125 13.2565 12.5382C13.1988 12.564 13.1473 12.6019 13.1055 12.6493C13.0638 12.6968 13.0327 12.7526 13.0145 12.8132C12.9963 12.8737 12.9913 12.9374 13 13V13.67C13 13.6871 13.0033 13.704 13.0099 13.7198C13.0164 13.7355 13.026 13.7499 13.038 13.7619C13.0501 13.774 13.0644 13.7836 13.0802 13.7901C13.096 13.7966 13.1129 13.8 13.13 13.8H19.84C19.8611 13.8054 19.8834 13.8054 19.9045 13.8C19.9257 13.7946 19.9452 13.7839 19.9611 13.7689C19.9771 13.754 19.989 13.7352 19.9958 13.7144C20.0026 13.6937 20.004 13.6715 20 13.65V13C20.0028 12.8866 19.9617 12.7765 19.8853 12.6927C19.809 12.6088 19.7031 12.5577 19.59 12.55V12.53ZM13.52 14V19.38C13.5303 19.5454 13.6054 19.7 13.7289 19.8105C13.8525 19.9209 14.0145 19.9782 14.18 19.97H18.84C19.0055 19.9782 19.1676 19.9209 19.2911 19.8105C19.4146 19.7 19.4897 19.5454 19.5 19.38V14H13.52ZM15.52 18.67C15.52 18.7522 15.4874 18.8311 15.4292 18.8892C15.3711 18.9473 15.2922 18.98 15.21 18.98H14.83C14.7478 18.98 14.669 18.9473 14.6108 18.8892C14.5527 18.8311 14.52 18.7522 14.52 18.67V15.33C14.52 15.2893 14.528 15.249 14.5436 15.2114C14.5592 15.1738 14.582 15.1396 14.6108 15.1108C14.6396 15.082 14.6738 15.0592 14.7114 15.0436C14.749 15.028 14.7893 15.02 14.83 15.02H15.21C15.2507 15.02 15.291 15.028 15.3287 15.0436C15.3663 15.0592 15.4004 15.082 15.4292 15.1108C15.458 15.1396 15.4808 15.1738 15.4964 15.2114C15.512 15.249 15.52 15.2893 15.52 15.33V18.67ZM17.01 18.67C17.01 18.7522 16.9774 18.8311 16.9192 18.8892C16.8611 18.9473 16.7822 18.98 16.7 18.98H16.32C16.2798 18.98 16.2399 18.9719 16.2029 18.9562C16.1658 18.9405 16.1323 18.9176 16.1043 18.8886C16.0763 18.8597 16.0544 18.8254 16.0399 18.7879C16.0254 18.7503 16.0187 18.7102 16.02 18.67V15.33C16.0187 15.2898 16.0254 15.2497 16.0399 15.2121C16.0544 15.1746 16.0763 15.1403 16.1043 15.1114C16.1323 15.0824 16.1658 15.0595 16.2029 15.0438C16.2399 15.0281 16.2798 15.02 16.32 15.02H16.7C16.7407 15.02 16.781 15.028 16.8187 15.0436C16.8563 15.0592 16.8904 15.082 16.9192 15.1108C16.948 15.1396 16.9708 15.1738 16.9864 15.2114C17.002 15.249 17.01 15.2893 17.01 15.33V18.67ZM18.51 18.67C18.51 18.7107 18.502 18.751 18.4864 18.7886C18.4708 18.8262 18.448 18.8604 18.4192 18.8892C18.3904 18.918 18.3563 18.9408 18.3187 18.9564C18.281 18.972 18.2407 18.98 18.2 18.98H17.82C17.7378 18.98 17.659 18.9473 17.6008 18.8892C17.5427 18.8311 17.51 18.7522 17.51 18.67V15.33C17.51 15.2893 17.518 15.249 17.5336 15.2114C17.5492 15.1738 17.572 15.1396 17.6008 15.1108C17.6296 15.082 17.6638 15.0592 17.7014 15.0436C17.739 15.028 17.7793 15.02 17.82 15.02H18.2C18.2407 15.02 18.281 15.028 18.3187 15.0436C18.3563 15.0592 18.3904 15.082 18.4192 15.1108C18.448 15.1396 18.4708 15.1738 18.4864 15.2114C18.502 15.249 18.51 15.2893 18.51 15.33V18.67Z", chevronDown: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z", chevronUp: "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z", bookmark: "M0.499939 18V2C0.499939 1.45 0.695772 0.979167 1.08744 0.5875C1.47911 0.195833 1.94994 0 2.49994 0H12.4999C13.0499 0 13.5208 0.195833 13.9124 0.5875C14.3041 0.979167 14.4999 1.45 14.4999 2V18L7.49994 15L0.499939 18ZM2.49994 14.95L7.49994 12.8L12.4999 14.95V2H2.49994V14.95Z" }, X.FILEICONS = { docIcon: { extension: ".doc", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.617188 46.875 C 13.234375 46.875 16.160156 43.929688 16.160156 40.292969 C 16.160156 36.695312 13.234375 33.75 9.617188 33.75 L 7.402344 33.75 C 6.820312 33.75 6.371094 34.199219 6.371094 34.78125 L 6.371094 45.84375 C 6.371094 46.335938 6.714844 46.757812 7.191406 46.855469 L 7.402344 46.875 Z M 9.617188 44.792969 L 8.453125 44.792969 L 8.453125 35.832031 L 9.617188 35.832031 C 12.089844 35.832031 14.078125 37.835938 14.078125 40.292969 C 14.078125 42.789062 12.089844 44.773438 9.617188 44.792969 Z M 24.816406 46.875 C 26.539062 46.875 28.191406 46.085938 29.296875 44.867188 C 30.460938 43.648438 31.191406 41.980469 31.191406 40.125 C 31.191406 38.269531 30.460938 36.617188 29.296875 35.382812 C 28.191406 34.144531 26.539062 33.375 24.816406 33.375 C 23.015625 33.375 21.367188 34.144531 20.222656 35.382812 C 19.058594 36.617188 18.367188 38.269531 18.367188 40.125 C 18.367188 41.980469 19.058594 43.648438 20.222656 44.867188 C 21.367188 46.085938 23.015625 46.875 24.816406 46.875 Z M 24.816406 44.738281 C 23.617188 44.738281 22.566406 44.230469 21.777344 43.386719 C 20.992188 42.582031 20.503906 41.398438 20.503906 40.125 C 20.503906 38.851562 20.992188 37.667969 21.777344 36.84375 C 22.566406 36 23.617188 35.511719 24.816406 35.511719 C 25.941406 35.511719 26.992188 36 27.777344 36.84375 C 28.546875 37.667969 29.054688 38.851562 29.054688 40.125 C 29.054688 41.398438 28.546875 42.582031 27.777344 43.386719 C 26.992188 44.230469 25.941406 44.738281 24.816406 44.738281 Z M 39.996094 46.875 C 41.648438 46.875 43.148438 46.332031 44.328125 45.414062 C 44.777344 45.054688 44.851562 44.382812 44.515625 43.914062 C 44.140625 43.460938 43.445312 43.386719 43.015625 43.707031 C 42.171875 44.382812 41.160156 44.738281 39.996094 44.738281 C 38.703125 44.738281 37.503906 44.210938 36.621094 43.386719 C 35.777344 42.5625 35.253906 41.398438 35.253906 40.125 C 35.253906 38.851562 35.777344 37.726562 36.621094 36.863281 C 37.503906 36.039062 38.703125 35.511719 39.996094 35.511719 C 41.160156 35.511719 42.191406 35.867188 43.015625 36.542969 C 43.445312 36.882812 44.140625 36.804688 44.515625 36.335938 C 44.851562 35.867188 44.777344 35.210938 44.328125 34.835938 C 43.148438 33.917969 41.648438 33.375 39.996094 33.375 C 36.246094 33.394531 33.132812 36.414062 33.117188 40.125 C 33.132812 43.855469 36.246094 46.875 39.996094 46.875 Z M 39.996094 46.875 "/>\n      </g>' }, gifIcon: { extension: ".gif", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 17.394531 46.875 C 18.988281 46.875 20.46875 46.332031 21.648438 45.414062 C 21.835938 45.28125 21.949219 45.132812 22.003906 44.960938 L 22.003906 44.945312 C 22.023438 44.90625 22.023438 44.886719 22.042969 44.851562 C 22.0625 44.738281 22.097656 44.664062 22.097656 44.53125 L 22.097656 40.386719 C 22.097656 39.789062 21.613281 39.335938 21.011719 39.335938 L 17.28125 39.335938 C 16.699219 39.335938 16.210938 39.789062 16.210938 40.386719 C 16.210938 40.96875 16.699219 41.457031 17.28125 41.457031 L 19.960938 41.457031 L 19.960938 44.023438 C 19.210938 44.457031 18.332031 44.738281 17.394531 44.738281 C 16.042969 44.738281 14.863281 44.230469 14.019531 43.367188 C 13.136719 42.523438 12.613281 41.382812 12.613281 40.144531 C 12.613281 38.867188 13.136719 37.726562 14.019531 36.882812 C 14.863281 36.019531 16.042969 35.511719 17.394531 35.511719 C 18.519531 35.511719 19.550781 35.90625 20.355469 36.523438 C 20.824219 36.898438 21.519531 36.804688 21.875 36.355469 C 22.230469 35.886719 22.15625 35.195312 21.667969 34.835938 C 20.503906 33.917969 18.988281 33.375 17.394531 33.375 C 13.585938 33.375 10.472656 36.375 10.472656 40.144531 C 10.472656 43.894531 13.585938 46.875 17.394531 46.875 Z M 26.945312 46.875 C 27.507812 46.875 27.996094 46.425781 27.996094 45.84375 L 27.996094 34.78125 C 27.996094 34.199219 27.507812 33.75 26.945312 33.75 C 26.363281 33.75 25.914062 34.199219 25.914062 34.78125 L 25.914062 45.84375 C 25.914062 46.425781 26.363281 46.875 26.945312 46.875 Z M 33.066406 46.875 C 33.648438 46.875 34.117188 46.40625 34.117188 45.84375 L 34.117188 41.34375 L 38.488281 41.34375 C 39.050781 41.34375 39.519531 40.875 39.519531 40.292969 C 39.519531 39.75 39.050781 39.261719 38.488281 39.261719 L 34.117188 39.261719 L 34.117188 35.832031 L 39.199219 35.832031 C 39.742188 35.832031 40.230469 35.363281 40.230469 34.78125 C 40.230469 34.21875 39.742188 33.75 39.199219 33.75 L 33.066406 33.75 C 32.488281 33.75 32.035156 34.21875 32.035156 34.78125 L 32.035156 45.84375 C 32.035156 46.40625 32.488281 46.875 33.066406 46.875 Z M 33.066406 46.875 "/>\n      </g>' }, jpegIcon: { extension: ".jpeg", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9 43.75 C 11.140625 43.75 12.890625 42.015625 12.890625 39.875 L 12.890625 33.671875 C 12.890625 33.1875 12.5 32.8125 12.03125 32.8125 C 11.546875 32.8125 11.15625 33.1875 11.15625 33.671875 L 11.15625 39.875 C 11.15625 41.046875 10.1875 42.015625 9 42.015625 C 8.046875 42.015625 7.234375 41.390625 6.953125 40.53125 C 6.8125 40.078125 6.328125 39.828125 5.859375 39.984375 C 5.421875 40.109375 5.15625 40.59375 5.3125 41.0625 C 5.8125 42.625 7.28125 43.75 9 43.75 Z M 15.640625 43.75 C 16.125 43.75 16.515625 43.359375 16.515625 42.890625 L 16.515625 39.5 L 18.4375 39.5 C 20.296875 39.5 21.796875 38 21.796875 36.171875 C 21.796875 34.3125 20.296875 32.8125 18.4375 32.8125 L 15.640625 32.8125 C 15.171875 32.8125 14.78125 33.1875 14.78125 33.671875 L 14.78125 42.890625 C 14.78125 43.359375 15.171875 43.75 15.640625 43.75 Z M 18.4375 37.765625 L 16.515625 37.765625 L 16.515625 34.546875 L 18.4375 34.546875 C 19.34375 34.546875 20.046875 35.265625 20.0625 36.171875 C 20.046875 37.046875 19.34375 37.765625 18.4375 37.765625 Z M 29.234375 43.75 C 29.6875 43.75 30.09375 43.359375 30.09375 42.890625 C 30.09375 42.40625 29.6875 42.015625 29.234375 42.015625 L 25 42.015625 L 25 39.140625 L 28.640625 39.140625 C 29.109375 39.140625 29.5 38.75 29.5 38.265625 C 29.5 37.8125 29.109375 37.40625 28.640625 37.40625 L 25 37.40625 L 25 34.546875 L 29.234375 34.546875 C 29.6875 34.546875 30.09375 34.15625 30.09375 33.671875 C 30.09375 33.1875 29.6875 32.8125 29.234375 32.8125 L 24.125 32.8125 C 23.640625 32.8125 23.265625 33.1875 23.265625 33.671875 L 23.265625 42.890625 C 23.265625 43.359375 23.640625 43.75 24.125 43.75 C 24.125 43.75 24.140625 43.734375 24.140625 43.734375 C 24.140625 43.734375 24.140625 43.75 24.171875 43.75 Z M 37.1875 43.75 C 38.515625 43.75 39.75 43.296875 40.734375 42.53125 C 40.890625 42.421875 40.984375 42.296875 41.03125 42.15625 L 41.03125 42.140625 C 41.046875 42.109375 41.046875 42.09375 41.0625 42.0625 C 41.078125 41.96875 41.109375 41.90625 41.109375 41.796875 L 41.109375 38.34375 C 41.109375 37.914062 40.8125 37.578125 40.410156 37.492188 L 40.203125 37.46875 L 37.09375 37.46875 C 36.609375 37.46875 36.203125 37.84375 36.203125 38.34375 C 36.203125 38.828125 36.609375 39.234375 37.09375 39.234375 L 39.328125 39.234375 L 39.328125 41.375 C 38.703125 41.734375 37.96875 41.96875 37.1875 41.96875 C 36.0625 41.96875 35.078125 41.546875 34.375 40.828125 C 33.640625 40.125 33.203125 39.171875 33.203125 38.140625 C 33.203125 37.078125 33.640625 36.125 34.375 35.421875 C 35.078125 34.703125 36.0625 34.28125 37.1875 34.28125 C 38.125 34.28125 38.984375 34.609375 39.65625 35.125 C 40.046875 35.4375 40.625 35.359375 40.921875 34.984375 C 41.21875 34.59375 41.15625 34.015625 40.75 33.71875 C 39.78125 32.953125 38.515625 32.5 37.1875 32.5 C 34.015625 32.5 31.421875 35 31.421875 38.140625 C 31.421875 41.265625 34.015625 43.75 37.1875 43.75 Z M 37.1875 43.75 "/>\n      </g>' }, logIcon: { extension: ".log", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 13.542969 46.875 C 14.085938 46.875 14.574219 46.40625 14.574219 45.84375 C 14.574219 45.261719 14.085938 44.792969 13.542969 44.792969 L 8.460938 44.792969 L 8.460938 34.78125 C 8.460938 34.21875 7.992188 33.75 7.410156 33.75 C 6.828125 33.75 6.378906 34.21875 6.378906 34.78125 L 6.378906 45.84375 C 6.378906 46.40625 6.828125 46.875 7.410156 46.875 Z M 21.742188 46.875 C 23.46875 46.875 25.117188 46.085938 26.222656 44.867188 C 27.386719 43.648438 28.117188 41.980469 28.117188 40.125 C 28.117188 38.269531 27.386719 36.617188 26.222656 35.382812 C 25.117188 34.144531 23.46875 33.375 21.742188 33.375 C 19.941406 33.375 18.292969 34.144531 17.148438 35.382812 C 15.984375 36.617188 15.292969 38.269531 15.292969 40.125 C 15.292969 41.980469 15.984375 43.648438 17.148438 44.867188 C 18.292969 46.085938 19.941406 46.875 21.742188 46.875 Z M 21.742188 44.738281 C 20.542969 44.738281 19.492188 44.230469 18.703125 43.386719 C 17.917969 42.582031 17.429688 41.398438 17.429688 40.125 C 17.429688 38.851562 17.917969 37.667969 18.703125 36.84375 C 19.492188 36 20.542969 35.511719 21.742188 35.511719 C 22.867188 35.511719 23.917969 36 24.703125 36.84375 C 25.472656 37.667969 25.980469 38.851562 25.980469 40.125 C 25.980469 41.398438 25.472656 42.582031 24.703125 43.386719 C 23.917969 44.230469 22.867188 44.738281 21.742188 44.738281 Z M 37.300781 46.875 C 38.894531 46.875 40.375 46.332031 41.558594 45.414062 C 41.746094 45.28125 41.855469 45.132812 41.914062 44.960938 L 41.914062 44.945312 L 41.949219 44.851562 C 41.96875 44.738281 42.007812 44.664062 42.007812 44.53125 L 42.007812 40.386719 C 42.007812 39.789062 41.519531 39.335938 40.917969 39.335938 L 37.1875 39.335938 C 36.605469 39.335938 36.121094 39.789062 36.121094 40.386719 C 36.121094 40.96875 36.605469 41.457031 37.1875 41.457031 L 39.871094 41.457031 L 39.871094 44.023438 C 39.121094 44.457031 38.238281 44.738281 37.300781 44.738281 C 35.949219 44.738281 34.769531 44.230469 33.925781 43.367188 C 33.042969 42.523438 32.519531 41.382812 32.519531 40.144531 C 32.519531 38.867188 33.042969 37.726562 33.925781 36.882812 C 34.769531 36.019531 35.949219 35.511719 37.300781 35.511719 C 38.425781 35.511719 39.457031 35.90625 40.261719 36.523438 C 40.730469 36.898438 41.425781 36.804688 41.78125 36.355469 C 42.136719 35.886719 42.0625 35.195312 41.574219 34.835938 C 40.414062 33.917969 38.894531 33.375 37.300781 33.375 C 33.496094 33.375 30.382812 36.375 30.382812 40.144531 C 30.382812 43.894531 33.496094 46.875 37.300781 46.875 Z M 37.300781 46.875 "/>\n      </g>' }, movIcon: { extension: ".mov", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 15.472656 46.875 C 16.035156 46.875 16.523438 46.40625 16.523438 45.84375 L 16.523438 34.78125 C 16.523438 34.289062 16.152344 33.882812 15.679688 33.777344 L 15.472656 33.75 L 15.453125 33.75 C 15.117188 33.75 14.816406 33.898438 14.609375 34.179688 L 10.878906 39.355469 L 7.148438 34.179688 C 6.960938 33.898438 6.625 33.75 6.324219 33.75 L 6.265625 33.75 C 5.703125 33.75 5.234375 34.21875 5.234375 34.78125 L 5.234375 45.84375 C 5.234375 46.40625 5.703125 46.875 6.265625 46.875 C 6.847656 46.875 7.316406 46.40625 7.316406 45.84375 L 7.316406 37.949219 L 10 41.699219 C 10.203125 41.980469 10.523438 42.132812 10.859375 42.132812 L 10.898438 42.132812 C 11.234375 42.132812 11.535156 41.980469 11.742188 41.699219 L 14.441406 37.949219 L 14.441406 45.84375 C 14.441406 46.40625 14.890625 46.875 15.472656 46.875 Z M 25.460938 46.875 C 27.1875 46.875 28.835938 46.085938 29.941406 44.867188 C 31.105469 43.648438 31.835938 41.980469 31.835938 40.125 C 31.835938 38.269531 31.105469 36.617188 29.941406 35.382812 C 28.835938 34.144531 27.1875 33.375 25.460938 33.375 C 23.660156 33.375 22.011719 34.144531 20.867188 35.382812 C 19.703125 36.617188 19.011719 38.269531 19.011719 40.125 C 19.011719 41.980469 19.703125 43.648438 20.867188 44.867188 C 22.011719 46.085938 23.660156 46.875 25.460938 46.875 Z M 25.460938 44.738281 C 24.261719 44.738281 23.210938 44.230469 22.421875 43.386719 C 21.636719 42.582031 21.148438 41.398438 21.148438 40.125 C 21.148438 38.851562 21.636719 37.667969 22.421875 36.84375 C 23.210938 36 24.261719 35.511719 25.460938 35.511719 C 26.585938 35.511719 27.636719 36 28.421875 36.84375 C 29.191406 37.667969 29.699219 38.851562 29.699219 40.125 C 29.699219 41.398438 29.191406 42.582031 28.421875 43.386719 C 27.636719 44.230469 26.585938 44.738281 25.460938 44.738281 Z M 38.683594 46.855469 L 38.71875 46.855469 C 38.777344 46.835938 38.8125 46.820312 38.871094 46.820312 C 38.886719 46.800781 38.886719 46.800781 38.90625 46.800781 C 38.964844 46.78125 39.019531 46.726562 39.058594 46.707031 L 39.09375 46.6875 L 39.207031 46.59375 C 39.226562 46.574219 39.226562 46.574219 39.246094 46.539062 L 39.339844 46.425781 C 39.355469 46.425781 39.355469 46.425781 39.355469 46.40625 C 39.394531 46.367188 39.414062 46.292969 39.433594 46.257812 L 44.0625 35.304688 C 44.269531 34.800781 44.027344 34.179688 43.5 33.976562 C 42.996094 33.75 42.375 33.992188 42.152344 34.519531 L 38.496094 43.199219 L 34.839844 34.519531 C 34.613281 33.992188 34.011719 33.75 33.507812 33.976562 C 32.964844 34.179688 32.71875 34.800781 32.945312 35.304688 L 37.539062 46.257812 C 37.574219 46.292969 37.613281 46.367188 37.632812 46.40625 C 37.632812 46.425781 37.652344 46.425781 37.652344 46.425781 C 37.667969 46.460938 37.707031 46.5 37.746094 46.539062 C 37.746094 46.574219 37.761719 46.574219 37.761719 46.59375 C 37.820312 46.632812 37.855469 46.648438 37.894531 46.6875 L 37.914062 46.6875 C 37.96875 46.726562 38.042969 46.78125 38.082031 46.800781 L 38.101562 46.800781 C 38.101562 46.800781 38.121094 46.800781 38.121094 46.820312 C 38.15625 46.820312 38.230469 46.835938 38.269531 46.855469 L 38.308594 46.855469 L 38.402344 46.871094 L 38.496094 46.875 C 38.550781 46.875 38.605469 46.875 38.683594 46.855469 Z M 38.683594 46.855469 "/>\n      </g>' }, ogvIcon: { extension: ".ogv", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 11.511719 46.875 C 13.238281 46.875 14.886719 46.085938 15.996094 44.867188 C 17.15625 43.648438 17.886719 41.980469 17.886719 40.125 C 17.886719 38.269531 17.15625 36.617188 15.996094 35.382812 C 14.886719 34.144531 13.238281 33.375 11.511719 33.375 C 9.714844 33.375 8.0625 34.144531 6.917969 35.382812 C 5.757812 36.617188 5.0625 38.269531 5.0625 40.125 C 5.0625 41.980469 5.757812 43.648438 6.917969 44.867188 C 8.0625 46.085938 9.714844 46.875 11.511719 46.875 Z M 11.511719 44.738281 C 10.3125 44.738281 9.261719 44.230469 8.476562 43.386719 C 7.6875 42.582031 7.199219 41.398438 7.199219 40.125 C 7.199219 38.851562 7.6875 37.667969 8.476562 36.84375 C 9.261719 36 10.3125 35.511719 11.511719 35.511719 C 12.636719 35.511719 13.6875 36 14.476562 36.84375 C 15.246094 37.667969 15.75 38.851562 15.75 40.125 C 15.75 41.398438 15.246094 42.582031 14.476562 43.386719 C 13.6875 44.230469 12.636719 44.738281 11.511719 44.738281 Z M 27.25 46.875 C 28.84375 46.875 30.324219 46.332031 31.507812 45.414062 C 31.695312 45.28125 31.804688 45.132812 31.863281 44.960938 L 31.863281 44.945312 C 31.882812 44.90625 31.882812 44.886719 31.898438 44.851562 C 31.917969 44.738281 31.957031 44.664062 31.957031 44.53125 L 31.957031 40.386719 C 31.957031 39.789062 31.46875 39.335938 30.867188 39.335938 L 27.136719 39.335938 C 26.554688 39.335938 26.070312 39.789062 26.070312 40.386719 C 26.070312 40.96875 26.554688 41.457031 27.136719 41.457031 L 29.820312 41.457031 L 29.820312 44.023438 C 29.070312 44.457031 28.1875 44.738281 27.25 44.738281 C 25.898438 44.738281 24.71875 44.230469 23.875 43.367188 C 22.992188 42.523438 22.46875 41.382812 22.46875 40.144531 C 22.46875 38.867188 22.992188 37.726562 23.875 36.882812 C 24.71875 36.019531 25.898438 35.511719 27.25 35.511719 C 28.375 35.511719 29.40625 35.90625 30.210938 36.523438 C 30.679688 36.898438 31.375 36.804688 31.730469 36.355469 C 32.085938 35.886719 32.011719 35.195312 31.523438 34.835938 C 30.363281 33.917969 28.84375 33.375 27.25 33.375 C 23.445312 33.375 20.332031 36.375 20.332031 40.144531 C 20.332031 43.894531 23.445312 46.875 27.25 46.875 Z M 40.191406 46.855469 L 40.230469 46.855469 C 40.285156 46.835938 40.324219 46.820312 40.378906 46.820312 C 40.398438 46.800781 40.398438 46.800781 40.417969 46.800781 C 40.472656 46.78125 40.53125 46.726562 40.566406 46.707031 C 40.605469 46.6875 40.605469 46.6875 40.605469 46.6875 L 40.71875 46.59375 C 40.738281 46.574219 40.738281 46.574219 40.753906 46.539062 L 40.847656 46.425781 C 40.867188 46.425781 40.867188 46.425781 40.867188 46.40625 C 40.90625 46.367188 40.925781 46.292969 40.941406 46.257812 L 45.574219 35.304688 C 45.78125 34.800781 45.535156 34.179688 45.011719 33.976562 C 44.503906 33.75 43.886719 33.992188 43.660156 34.519531 L 40.003906 43.199219 L 36.347656 34.519531 C 36.125 33.992188 35.523438 33.75 35.019531 33.976562 C 34.472656 34.179688 34.230469 34.800781 34.457031 35.304688 L 39.050781 46.257812 C 39.085938 46.292969 39.125 46.367188 39.144531 46.40625 C 39.144531 46.425781 39.160156 46.425781 39.160156 46.425781 C 39.179688 46.460938 39.21875 46.5 39.253906 46.539062 C 39.253906 46.574219 39.273438 46.574219 39.273438 46.59375 C 39.332031 46.632812 39.367188 46.648438 39.40625 46.6875 L 39.425781 46.6875 C 39.480469 46.726562 39.554688 46.78125 39.59375 46.800781 L 39.613281 46.800781 C 39.613281 46.800781 39.628906 46.800781 39.628906 46.820312 C 39.667969 46.820312 39.742188 46.835938 39.78125 46.855469 L 39.816406 46.855469 L 39.910156 46.871094 L 40.003906 46.875 C 40.0625 46.875 40.117188 46.875 40.191406 46.855469 Z M 40.191406 46.855469 "/>\n      </g>' }, pngIcon: { extension: ".png", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.523438 46.875 C 8.105469 46.875 8.574219 46.40625 8.574219 45.84375 L 8.574219 41.773438 L 10.878906 41.773438 C 13.109375 41.773438 14.910156 39.976562 14.910156 37.78125 C 14.910156 35.550781 13.109375 33.75 10.878906 33.75 L 7.523438 33.75 C 6.960938 33.75 6.492188 34.199219 6.492188 34.78125 L 6.492188 45.84375 C 6.492188 46.40625 6.960938 46.875 7.523438 46.875 Z M 10.878906 39.695312 L 8.574219 39.695312 L 8.574219 35.832031 L 10.878906 35.832031 C 11.964844 35.832031 12.808594 36.695312 12.828125 37.78125 C 12.808594 38.832031 11.964844 39.695312 10.878906 39.695312 Z M 26.75 46.875 C 27.3125 46.875 27.78125 46.40625 27.78125 45.84375 L 27.78125 34.949219 C 27.78125 34.40625 27.3125 33.9375 26.75 33.9375 C 26.1875 33.9375 25.738281 34.40625 25.738281 34.949219 L 25.738281 42.675781 L 19.679688 34.292969 C 19.363281 33.84375 18.722656 33.75 18.253906 34.070312 C 17.972656 34.273438 17.824219 34.613281 17.84375 34.929688 L 17.84375 45.84375 C 17.84375 46.40625 18.292969 46.875 18.875 46.875 C 19.417969 46.875 19.886719 46.40625 19.886719 45.84375 L 19.886719 38.0625 L 25.886719 46.386719 C 25.90625 46.425781 25.941406 46.460938 25.980469 46.5 C 26.167969 46.726562 26.449219 46.875 26.75 46.875 Z M 38.082031 46.875 C 39.675781 46.875 41.15625 46.332031 42.339844 45.414062 C 42.527344 45.28125 42.636719 45.132812 42.695312 44.960938 L 42.695312 44.945312 C 42.714844 44.90625 42.714844 44.886719 42.730469 44.851562 C 42.75 44.738281 42.789062 44.664062 42.789062 44.53125 L 42.789062 40.386719 C 42.789062 39.789062 42.300781 39.335938 41.699219 39.335938 L 37.96875 39.335938 C 37.386719 39.335938 36.902344 39.789062 36.902344 40.386719 C 36.902344 40.96875 37.386719 41.457031 37.96875 41.457031 L 40.652344 41.457031 L 40.652344 44.023438 C 39.902344 44.457031 39.019531 44.738281 38.082031 44.738281 C 36.730469 44.738281 35.550781 44.230469 34.707031 43.367188 C 33.824219 42.523438 33.300781 41.382812 33.300781 40.144531 C 33.300781 38.867188 33.824219 37.726562 34.707031 36.882812 C 35.550781 36.019531 36.730469 35.511719 38.082031 35.511719 C 39.207031 35.511719 40.238281 35.90625 41.042969 36.523438 C 41.511719 36.898438 42.207031 36.804688 42.5625 36.355469 C 42.917969 35.886719 42.84375 35.195312 42.355469 34.835938 C 41.195312 33.917969 39.675781 33.375 38.082031 33.375 C 34.277344 33.375 31.164062 36.375 31.164062 40.144531 C 31.164062 43.894531 34.277344 46.875 38.082031 46.875 Z M 38.082031 46.875 "/>\n      </g>' }, txtIcon: { extension: ".txt", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 12.847656 46.875 C 13.429688 46.875 13.878906 46.425781 13.878906 45.84375 L 13.878906 35.832031 L 16.859375 35.832031 C 17.421875 35.832031 17.890625 35.34375 17.890625 34.78125 C 17.890625 34.199219 17.421875 33.75 16.859375 33.75 L 8.855469 33.75 C 8.273438 33.75 7.824219 34.199219 7.824219 34.78125 C 7.824219 35.34375 8.273438 35.832031 8.855469 35.832031 L 11.816406 35.832031 L 11.816406 45.84375 C 11.816406 46.425781 12.285156 46.875 12.847656 46.875 Z M 29.019531 46.875 C 29.222656 46.875 29.429688 46.800781 29.617188 46.667969 C 30.085938 46.351562 30.160156 45.695312 29.84375 45.242188 L 26.28125 40.367188 L 29.84375 35.53125 C 30.160156 35.0625 30.085938 34.425781 29.617188 34.105469 C 29.148438 33.75 28.53125 33.84375 28.175781 34.332031 L 25.023438 38.644531 L 21.855469 34.332031 C 21.535156 33.84375 20.878906 33.75 20.429688 34.105469 C 19.960938 34.425781 19.867188 35.0625 20.1875 35.53125 L 23.75 40.367188 L 20.1875 45.242188 C 19.867188 45.695312 19.960938 46.351562 20.429688 46.667969 C 20.597656 46.800781 20.804688 46.875 21.03125 46.875 C 21.347656 46.875 21.648438 46.707031 21.855469 46.445312 L 25.023438 42.113281 L 28.175781 46.445312 C 28.378906 46.707031 28.679688 46.875 29.019531 46.875 Z M 37.464844 46.875 C 38.042969 46.875 38.496094 46.425781 38.496094 45.84375 L 38.496094 35.832031 L 41.476562 35.832031 C 42.039062 35.832031 42.507812 35.34375 42.507812 34.78125 C 42.507812 34.199219 42.039062 33.75 41.476562 33.75 L 33.46875 33.75 C 32.886719 33.75 32.4375 34.199219 32.4375 34.78125 C 32.4375 35.34375 32.886719 35.832031 33.46875 35.832031 L 36.433594 35.832031 L 36.433594 45.84375 C 36.433594 46.425781 36.902344 46.875 37.464844 46.875 Z M 37.464844 46.875 "/>\n      </g>' }, webmIcon: { extension: ".webm", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.195312 43.734375 L 7.242188 43.734375 C 7.273438 43.71875 7.304688 43.703125 7.367188 43.703125 C 7.367188 43.6875 7.382812 43.6875 7.382812 43.6875 L 7.398438 43.6875 C 7.429688 43.671875 7.476562 43.625 7.523438 43.59375 L 7.554688 43.59375 C 7.585938 43.5625 7.617188 43.53125 7.648438 43.515625 C 7.648438 43.5 7.664062 43.5 7.664062 43.46875 L 7.757812 43.375 C 7.757812 43.375 7.757812 43.359375 7.773438 43.359375 C 7.789062 43.328125 7.820312 43.265625 7.835938 43.21875 L 9.882812 38.375 L 11.929688 43.21875 C 11.945312 43.265625 11.960938 43.328125 11.992188 43.359375 C 11.992188 43.359375 11.992188 43.375 12.023438 43.375 L 12.085938 43.46875 C 12.101562 43.5 12.101562 43.5 12.117188 43.515625 C 12.148438 43.53125 12.179688 43.5625 12.226562 43.59375 L 12.242188 43.59375 C 12.273438 43.625 12.320312 43.671875 12.382812 43.6875 C 12.398438 43.6875 12.398438 43.6875 12.414062 43.703125 C 12.445312 43.703125 12.476562 43.71875 12.523438 43.734375 L 12.570312 43.734375 L 12.640625 43.746094 L 12.710938 43.75 C 12.773438 43.75 12.820312 43.75 12.867188 43.734375 L 12.898438 43.734375 C 12.945312 43.71875 12.992188 43.703125 13.023438 43.703125 C 13.023438 43.6875 13.039062 43.6875 13.039062 43.6875 L 13.054688 43.6875 C 13.117188 43.671875 13.148438 43.625 13.195312 43.59375 L 13.210938 43.59375 C 13.242188 43.5625 13.289062 43.53125 13.320312 43.515625 C 13.320312 43.5 13.335938 43.5 13.335938 43.46875 C 13.367188 43.4375 13.398438 43.40625 13.414062 43.375 C 13.414062 43.375 13.429688 43.359375 13.429688 43.359375 C 13.460938 43.328125 13.492188 43.265625 13.507812 43.21875 L 17.335938 34.109375 C 17.523438 33.6875 17.320312 33.171875 16.898438 33 C 16.445312 32.8125 15.945312 33.015625 15.757812 33.453125 L 12.710938 40.6875 L 10.695312 35.890625 C 10.539062 35.546875 10.210938 35.359375 9.882812 35.359375 C 9.539062 35.359375 9.210938 35.546875 9.070312 35.890625 L 7.054688 40.6875 L 3.992188 33.453125 C 3.820312 33.015625 3.304688 32.8125 2.882812 33 C 2.429688 33.171875 2.242188 33.6875 2.414062 34.109375 L 6.257812 43.21875 C 6.289062 43.265625 6.304688 43.328125 6.335938 43.359375 L 6.335938 43.375 C 6.367188 43.40625 6.382812 43.4375 6.414062 43.46875 C 6.429688 43.5 6.429688 43.5 6.445312 43.515625 C 6.492188 43.53125 6.507812 43.5625 6.554688 43.59375 L 6.570312 43.59375 C 6.601562 43.625 6.664062 43.671875 6.710938 43.6875 C 6.726562 43.6875 6.726562 43.6875 6.742188 43.703125 C 6.773438 43.703125 6.804688 43.71875 6.851562 43.734375 L 6.898438 43.734375 L 6.976562 43.746094 L 7.054688 43.75 C 7.101562 43.75 7.148438 43.75 7.195312 43.734375 Z M 25.179688 43.75 C 25.632812 43.75 26.039062 43.359375 26.039062 42.890625 C 26.039062 42.40625 25.632812 42.015625 25.179688 42.015625 L 20.945312 42.015625 L 20.945312 39.140625 L 24.585938 39.140625 C 25.054688 39.140625 25.445312 38.75 25.445312 38.265625 C 25.445312 37.8125 25.054688 37.40625 24.585938 37.40625 L 20.945312 37.40625 L 20.945312 34.546875 L 25.179688 34.546875 C 25.632812 34.546875 26.039062 34.15625 26.039062 33.671875 C 26.039062 33.1875 25.632812 32.8125 25.179688 32.8125 L 20.070312 32.8125 C 19.585938 32.8125 19.210938 33.1875 19.210938 33.671875 L 19.210938 42.890625 C 19.210938 43.359375 19.585938 43.75 20.070312 43.75 C 20.070312 43.75 20.085938 43.734375 20.085938 43.734375 C 20.085938 43.734375 20.085938 43.75 20.117188 43.75 Z M 31.539062 43.75 C 33.382812 43.75 34.882812 42.25 34.882812 40.390625 C 34.882812 39.203125 34.242188 38.15625 33.304688 37.5625 C 33.679688 37.0625 33.898438 36.453125 33.898438 35.78125 C 33.898438 34.140625 32.570312 32.8125 30.929688 32.8125 L 28.710938 32.8125 C 28.242188 32.8125 27.851562 33.1875 27.851562 33.671875 L 27.851562 42.890625 C 27.851562 43.359375 28.242188 43.75 28.710938 43.75 L 28.757812 43.734375 C 28.757812 43.734375 28.757812 43.75 28.773438 43.75 Z M 30.929688 37.046875 L 29.585938 37.046875 L 29.585938 34.546875 L 30.929688 34.546875 C 31.617188 34.546875 32.164062 35.09375 32.164062 35.78125 C 32.164062 36.46875 31.617188 37.046875 30.929688 37.046875 Z M 31.539062 42.015625 L 29.585938 42.015625 L 29.585938 38.78125 L 31.539062 38.78125 C 32.429688 38.796875 33.148438 39.5 33.148438 40.390625 C 33.148438 41.296875 32.429688 42 31.539062 42.015625 Z M 45.664062 43.75 C 46.132812 43.75 46.539062 43.359375 46.539062 42.890625 L 46.539062 33.671875 C 46.539062 33.269531 46.242188 32.9375 45.859375 32.839844 L 45.664062 32.8125 L 45.648438 32.8125 C 45.367188 32.8125 45.117188 32.9375 44.945312 33.171875 L 41.835938 37.484375 L 38.726562 33.171875 C 38.570312 32.9375 38.289062 32.8125 38.039062 32.8125 L 37.992188 32.8125 C 37.523438 32.8125 37.132812 33.203125 37.132812 33.671875 L 37.132812 42.890625 C 37.132812 43.359375 37.523438 43.75 37.992188 43.75 C 38.476562 43.75 38.867188 43.359375 38.867188 42.890625 L 38.867188 36.3125 L 41.101562 39.4375 C 41.273438 39.671875 41.539062 39.796875 41.820312 39.796875 L 41.851562 39.796875 C 42.132812 39.796875 42.382812 39.671875 42.554688 39.4375 L 44.804688 36.3125 L 44.804688 42.890625 C 44.804688 43.359375 45.179688 43.75 45.664062 43.75 Z M 45.664062 43.75 "/>\n      </g>' }, webpIcon: { extension: ".webp", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.234375 43.734375 L 9.28125 43.734375 C 9.3125 43.71875 9.34375 43.703125 9.40625 43.703125 L 9.414062 43.6875 C 9.421875 43.6875 9.421875 43.6875 9.4375 43.6875 C 9.46875 43.671875 9.515625 43.625 9.5625 43.59375 L 9.59375 43.59375 C 9.625 43.5625 9.65625 43.53125 9.6875 43.515625 C 9.6875 43.5 9.703125 43.5 9.703125 43.46875 L 9.796875 43.375 C 9.796875 43.375 9.796875 43.359375 9.8125 43.359375 C 9.828125 43.328125 9.859375 43.265625 9.875 43.21875 L 11.921875 38.375 L 13.96875 43.21875 C 13.984375 43.265625 14 43.328125 14.03125 43.359375 C 14.03125 43.359375 14.03125 43.375 14.0625 43.375 L 14.125 43.46875 C 14.140625 43.5 14.140625 43.5 14.15625 43.515625 L 14.203125 43.546875 L 14.265625 43.59375 C 14.265625 43.59375 14.265625 43.59375 14.28125 43.59375 C 14.3125 43.625 14.359375 43.671875 14.421875 43.6875 C 14.4375 43.6875 14.4375 43.6875 14.453125 43.703125 C 14.484375 43.703125 14.515625 43.71875 14.5625 43.734375 L 14.609375 43.734375 L 14.679688 43.746094 L 14.75 43.75 C 14.8125 43.75 14.859375 43.75 14.90625 43.734375 L 14.9375 43.734375 C 14.984375 43.71875 15.03125 43.703125 15.0625 43.703125 C 15.0625 43.6875 15.078125 43.6875 15.078125 43.6875 L 15.09375 43.6875 C 15.15625 43.671875 15.1875 43.625 15.234375 43.59375 L 15.25 43.59375 C 15.28125 43.5625 15.328125 43.53125 15.359375 43.515625 C 15.359375 43.5 15.375 43.5 15.375 43.46875 C 15.40625 43.4375 15.4375 43.40625 15.453125 43.375 L 15.46875 43.359375 C 15.5 43.328125 15.53125 43.265625 15.546875 43.21875 L 19.375 34.109375 C 19.5625 33.6875 19.359375 33.171875 18.9375 33 C 18.484375 32.8125 17.984375 33.015625 17.796875 33.453125 L 14.75 40.6875 L 12.734375 35.890625 C 12.578125 35.546875 12.25 35.359375 11.921875 35.359375 C 11.578125 35.359375 11.25 35.546875 11.109375 35.890625 L 9.09375 40.6875 L 6.03125 33.453125 C 5.859375 33.015625 5.34375 32.8125 4.921875 33 C 4.46875 33.171875 4.28125 33.6875 4.453125 34.109375 L 8.296875 43.21875 C 8.328125 43.265625 8.34375 43.328125 8.375 43.359375 L 8.375 43.375 C 8.40625 43.40625 8.421875 43.4375 8.453125 43.46875 C 8.46875 43.5 8.46875 43.5 8.484375 43.515625 L 8.539062 43.546875 L 8.59375 43.59375 C 8.59375 43.59375 8.59375 43.59375 8.609375 43.59375 C 8.640625 43.625 8.703125 43.671875 8.75 43.6875 C 8.765625 43.6875 8.765625 43.6875 8.78125 43.703125 C 8.8125 43.703125 8.84375 43.71875 8.890625 43.734375 L 8.9375 43.734375 L 9.015625 43.746094 L 9.09375 43.75 C 9.140625 43.75 9.1875 43.75 9.234375 43.734375 Z M 27.21875 43.75 C 27.671875 43.75 28.078125 43.359375 28.078125 42.890625 C 28.078125 42.40625 27.671875 42.015625 27.21875 42.015625 L 22.984375 42.015625 L 22.984375 39.140625 L 26.625 39.140625 C 27.09375 39.140625 27.484375 38.75 27.484375 38.265625 C 27.484375 37.8125 27.09375 37.40625 26.625 37.40625 L 22.984375 37.40625 L 22.984375 34.546875 L 27.21875 34.546875 C 27.671875 34.546875 28.078125 34.15625 28.078125 33.671875 C 28.078125 33.1875 27.671875 32.8125 27.21875 32.8125 L 22.109375 32.8125 C 21.625 32.8125 21.25 33.1875 21.25 33.671875 L 21.25 42.890625 C 21.25 43.359375 21.625 43.75 22.109375 43.75 L 22.125 43.734375 C 22.125 43.734375 22.125 43.75 22.15625 43.75 Z M 33.578125 43.75 C 35.421875 43.75 36.921875 42.25 36.921875 40.390625 C 36.921875 39.203125 36.28125 38.15625 35.34375 37.5625 C 35.71875 37.0625 35.9375 36.453125 35.9375 35.78125 C 35.9375 34.140625 34.609375 32.8125 32.96875 32.8125 L 30.75 32.8125 C 30.28125 32.8125 29.890625 33.1875 29.890625 33.671875 L 29.890625 42.890625 C 29.890625 43.359375 30.28125 43.75 30.75 43.75 C 30.765625 43.75 30.765625 43.734375 30.796875 43.734375 C 30.796875 43.734375 30.796875 43.75 30.8125 43.75 Z M 32.96875 37.046875 L 31.625 37.046875 L 31.625 34.546875 L 32.96875 34.546875 C 33.65625 34.546875 34.203125 35.09375 34.203125 35.78125 C 34.203125 36.46875 33.65625 37.046875 32.96875 37.046875 Z M 33.578125 42.015625 L 31.625 42.015625 L 31.625 38.78125 L 33.578125 38.78125 C 34.46875 38.796875 35.1875 39.5 35.1875 40.390625 C 35.1875 41.296875 34.46875 42 33.578125 42.015625 Z M 40.03125 43.75 C 40.515625 43.75 40.90625 43.359375 40.90625 42.890625 L 40.90625 39.5 L 42.828125 39.5 C 44.6875 39.5 46.1875 38 46.1875 36.171875 C 46.1875 34.3125 44.6875 32.8125 42.828125 32.8125 L 40.03125 32.8125 C 39.5625 32.8125 39.171875 33.1875 39.171875 33.671875 L 39.171875 42.890625 C 39.171875 43.359375 39.5625 43.75 40.03125 43.75 Z M 42.828125 37.765625 L 40.90625 37.765625 L 40.90625 34.546875 L 42.828125 34.546875 C 43.734375 34.546875 44.4375 35.265625 44.453125 36.171875 C 44.4375 37.046875 43.734375 37.765625 42.828125 37.765625 Z M 42.828125 37.765625 "/>\n      </g>' }, wmvIcon: { extension: ".wmv", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.484375 43.734375 L 8.53125 43.734375 C 8.5625 43.71875 8.59375 43.703125 8.65625 43.703125 L 8.664062 43.6875 C 8.671875 43.6875 8.671875 43.6875 8.6875 43.6875 C 8.71875 43.671875 8.765625 43.625 8.8125 43.59375 L 8.84375 43.59375 C 8.875 43.5625 8.90625 43.53125 8.9375 43.515625 C 8.9375 43.5 8.953125 43.5 8.953125 43.46875 L 9.046875 43.375 C 9.046875 43.375 9.046875 43.359375 9.0625 43.359375 C 9.078125 43.328125 9.109375 43.265625 9.125 43.21875 L 11.171875 38.375 L 13.21875 43.21875 C 13.234375 43.265625 13.25 43.328125 13.28125 43.359375 C 13.28125 43.359375 13.28125 43.375 13.3125 43.375 L 13.375 43.46875 C 13.390625 43.5 13.390625 43.5 13.40625 43.515625 L 13.453125 43.546875 L 13.515625 43.59375 C 13.515625 43.59375 13.515625 43.59375 13.53125 43.59375 C 13.5625 43.625 13.609375 43.671875 13.671875 43.6875 C 13.6875 43.6875 13.6875 43.6875 13.703125 43.703125 C 13.734375 43.703125 13.765625 43.71875 13.8125 43.734375 L 13.859375 43.734375 L 13.929688 43.746094 L 14 43.75 C 14.0625 43.75 14.109375 43.75 14.15625 43.734375 L 14.1875 43.734375 C 14.234375 43.71875 14.28125 43.703125 14.3125 43.703125 C 14.3125 43.6875 14.328125 43.6875 14.328125 43.6875 L 14.34375 43.6875 C 14.40625 43.671875 14.4375 43.625 14.484375 43.59375 L 14.5 43.59375 C 14.53125 43.5625 14.578125 43.53125 14.609375 43.515625 C 14.609375 43.5 14.625 43.5 14.625 43.46875 C 14.65625 43.4375 14.6875 43.40625 14.703125 43.375 L 14.71875 43.359375 C 14.75 43.328125 14.78125 43.265625 14.796875 43.21875 L 18.625 34.109375 C 18.8125 33.6875 18.609375 33.171875 18.1875 33 C 17.734375 32.8125 17.234375 33.015625 17.046875 33.453125 L 14 40.6875 L 11.984375 35.890625 C 11.828125 35.546875 11.5 35.359375 11.171875 35.359375 C 10.828125 35.359375 10.5 35.546875 10.359375 35.890625 L 8.34375 40.6875 L 5.28125 33.453125 C 5.109375 33.015625 4.59375 32.8125 4.171875 33 C 3.71875 33.171875 3.53125 33.6875 3.703125 34.109375 L 7.546875 43.21875 C 7.578125 43.265625 7.59375 43.328125 7.625 43.359375 L 7.625 43.375 C 7.65625 43.40625 7.671875 43.4375 7.703125 43.46875 C 7.71875 43.5 7.71875 43.5 7.734375 43.515625 L 7.789062 43.546875 L 7.84375 43.59375 C 7.84375 43.59375 7.84375 43.59375 7.859375 43.59375 C 7.890625 43.625 7.953125 43.671875 8 43.6875 C 8.015625 43.6875 8.015625 43.6875 8.03125 43.703125 C 8.0625 43.703125 8.09375 43.71875 8.140625 43.734375 L 8.1875 43.734375 L 8.265625 43.746094 L 8.34375 43.75 C 8.390625 43.75 8.4375 43.75 8.484375 43.734375 Z M 29.03125 43.75 C 29.5 43.75 29.90625 43.359375 29.90625 42.890625 L 29.90625 33.671875 C 29.90625 33.269531 29.609375 32.9375 29.226562 32.839844 L 29.03125 32.8125 L 29.015625 32.8125 C 28.734375 32.8125 28.484375 32.9375 28.3125 33.171875 L 25.203125 37.484375 L 22.09375 33.171875 C 21.9375 32.9375 21.65625 32.8125 21.40625 32.8125 L 21.359375 32.8125 C 20.890625 32.8125 20.5 33.203125 20.5 33.671875 L 20.5 42.890625 C 20.5 43.359375 20.890625 43.75 21.359375 43.75 C 21.84375 43.75 22.234375 43.359375 22.234375 42.890625 L 22.234375 36.3125 L 24.46875 39.4375 C 24.640625 39.671875 24.90625 39.796875 25.1875 39.796875 L 25.21875 39.796875 C 25.5 39.796875 25.75 39.671875 25.921875 39.4375 L 28.171875 36.3125 L 28.171875 42.890625 C 28.171875 43.359375 28.546875 43.75 29.03125 43.75 Z M 37.015625 43.734375 L 37.0625 43.734375 C 37.09375 43.71875 37.125 43.703125 37.1875 43.703125 L 37.195312 43.6875 C 37.203125 43.6875 37.203125 43.6875 37.21875 43.6875 C 37.25 43.671875 37.296875 43.625 37.34375 43.59375 L 37.375 43.59375 C 37.40625 43.5625 37.4375 43.53125 37.46875 43.515625 C 37.46875 43.5 37.484375 43.5 37.484375 43.46875 L 37.578125 43.375 C 37.578125 43.375 37.578125 43.359375 37.59375 43.359375 C 37.609375 43.328125 37.640625 43.265625 37.65625 43.21875 L 39.703125 38.375 L 41.75 43.21875 C 41.765625 43.265625 41.78125 43.328125 41.8125 43.359375 C 41.8125 43.359375 41.8125 43.375 41.84375 43.375 L 41.90625 43.46875 C 41.921875 43.5 41.921875 43.5 41.9375 43.515625 L 41.984375 43.546875 L 42.046875 43.59375 C 42.046875 43.59375 42.046875 43.59375 42.0625 43.59375 C 42.09375 43.625 42.140625 43.671875 42.203125 43.6875 C 42.21875 43.6875 42.21875 43.6875 42.234375 43.703125 C 42.265625 43.703125 42.296875 43.71875 42.34375 43.734375 L 42.390625 43.734375 L 42.460938 43.746094 L 42.53125 43.75 C 42.59375 43.75 42.640625 43.75 42.6875 43.734375 L 42.71875 43.734375 C 42.765625 43.71875 42.8125 43.703125 42.84375 43.703125 C 42.84375 43.6875 42.859375 43.6875 42.859375 43.6875 L 42.875 43.6875 C 42.9375 43.671875 42.96875 43.625 43.015625 43.59375 L 43.03125 43.59375 C 43.0625 43.5625 43.109375 43.53125 43.140625 43.515625 C 43.140625 43.5 43.15625 43.5 43.15625 43.46875 C 43.1875 43.4375 43.21875 43.40625 43.234375 43.375 L 43.25 43.359375 C 43.28125 43.328125 43.3125 43.265625 43.328125 43.21875 L 47.15625 34.109375 C 47.34375 33.6875 47.140625 33.171875 46.71875 33 C 46.265625 32.8125 45.765625 33.015625 45.578125 33.453125 L 42.53125 40.6875 L 40.515625 35.890625 C 40.359375 35.546875 40.03125 35.359375 39.703125 35.359375 C 39.359375 35.359375 39.03125 35.546875 38.890625 35.890625 L 36.875 40.6875 L 33.8125 33.453125 C 33.640625 33.015625 33.125 32.8125 32.703125 33 C 32.25 33.171875 32.0625 33.6875 32.234375 34.109375 L 36.078125 43.21875 C 36.109375 43.265625 36.125 43.328125 36.15625 43.359375 L 36.15625 43.375 C 36.1875 43.40625 36.203125 43.4375 36.234375 43.46875 C 36.25 43.5 36.25 43.5 36.265625 43.515625 L 36.320312 43.546875 L 36.375 43.59375 C 36.375 43.59375 36.375 43.59375 36.390625 43.59375 C 36.421875 43.625 36.484375 43.671875 36.53125 43.6875 C 36.546875 43.6875 36.546875 43.6875 36.5625 43.703125 C 36.59375 43.703125 36.625 43.71875 36.671875 43.734375 L 36.71875 43.734375 L 36.796875 43.746094 L 36.875 43.75 C 36.921875 43.75 36.96875 43.75 37.015625 43.734375 Z M 37.015625 43.734375 "/>\n      </g>' }, xlsIcon: { extension: ".xls", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 17.21875 46.875 C 17.425781 46.875 17.632812 46.800781 17.820312 46.667969 C 18.289062 46.351562 18.363281 45.695312 18.042969 45.242188 L 14.480469 40.367188 L 18.042969 35.53125 C 18.363281 35.0625 18.289062 34.425781 17.820312 34.105469 C 17.351562 33.75 16.730469 33.84375 16.375 34.332031 L 13.226562 38.644531 L 10.054688 34.332031 C 9.738281 33.84375 9.082031 33.75 8.632812 34.105469 C 8.164062 34.425781 8.070312 35.0625 8.386719 35.53125 L 11.949219 40.367188 L 8.386719 45.242188 C 8.070312 45.695312 8.164062 46.351562 8.632812 46.667969 C 8.800781 46.800781 9.007812 46.875 9.230469 46.875 C 9.550781 46.875 9.851562 46.707031 10.054688 46.445312 L 13.226562 42.113281 L 16.375 46.445312 C 16.582031 46.707031 16.882812 46.875 17.21875 46.875 Z M 29.351562 46.875 C 29.894531 46.875 30.382812 46.40625 30.382812 45.84375 C 30.382812 45.261719 29.894531 44.792969 29.351562 44.792969 L 24.269531 44.792969 L 24.269531 34.78125 C 24.269531 34.21875 23.800781 33.75 23.21875 33.75 C 22.636719 33.75 22.1875 34.21875 22.1875 34.78125 L 22.1875 45.84375 C 22.1875 46.335938 22.53125 46.757812 23.007812 46.855469 L 23.222656 46.875 Z M 37.28125 46.855469 C 38.613281 46.855469 39.832031 46.460938 40.75 45.789062 C 41.6875 45.113281 42.363281 44.082031 42.363281 42.882812 C 42.363281 42.300781 42.195312 41.738281 41.914062 41.289062 C 41.480469 40.59375 40.804688 40.105469 40.039062 39.730469 C 39.289062 39.375 38.40625 39.132812 37.449219 38.945312 L 37.414062 38.945312 C 36.398438 38.757812 35.554688 38.457031 35.070312 38.117188 C 34.824219 37.949219 34.65625 37.78125 34.5625 37.632812 C 34.46875 37.480469 34.429688 37.332031 34.429688 37.105469 C 34.429688 36.710938 34.636719 36.300781 35.144531 35.925781 C 35.648438 35.550781 36.398438 35.289062 37.242188 35.289062 C 38.386719 35.289062 39.304688 35.851562 40.261719 36.488281 C 40.710938 36.789062 41.3125 36.65625 41.59375 36.207031 C 41.894531 35.773438 41.761719 35.175781 41.332031 34.875 C 40.375 34.257812 39.042969 33.375 37.242188 33.375 C 36.023438 33.375 34.882812 33.730469 34 34.367188 C 33.136719 35.007812 32.5 35.980469 32.5 37.105469 C 32.5 37.667969 32.648438 38.195312 32.929688 38.644531 C 33.34375 39.300781 33.960938 39.769531 34.675781 40.105469 C 35.386719 40.445312 36.210938 40.667969 37.09375 40.835938 L 37.132812 40.835938 C 38.238281 41.042969 39.15625 41.363281 39.699219 41.71875 C 39.980469 41.90625 40.148438 42.09375 40.261719 42.28125 C 40.375 42.46875 40.429688 42.636719 40.429688 42.882812 C 40.429688 43.351562 40.1875 43.820312 39.625 44.230469 C 39.0625 44.644531 38.21875 44.925781 37.28125 44.925781 C 35.949219 44.945312 34.523438 44.15625 33.699219 43.480469 C 33.289062 43.144531 32.667969 43.199219 32.332031 43.613281 C 32.011719 44.023438 32.070312 44.644531 32.480469 44.980469 C 33.550781 45.824219 35.257812 46.835938 37.28125 46.855469 Z M 37.28125 46.855469 "/>\n      </g>' }, xlsxIcon: { extension: ".xlsx", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 13.070312 43.75 C 13.242188 43.75 13.414062 43.6875 13.570312 43.578125 C 13.960938 43.3125 14.023438 42.765625 13.757812 42.390625 L 10.789062 38.328125 L 13.757812 34.296875 C 14.023438 33.90625 13.960938 33.375 13.570312 33.109375 C 13.179688 32.8125 12.664062 32.890625 12.367188 33.296875 L 9.742188 36.890625 L 7.101562 33.296875 C 6.835938 32.890625 6.289062 32.8125 5.914062 33.109375 C 5.523438 33.375 5.445312 33.90625 5.710938 34.296875 L 8.679688 38.328125 L 5.710938 42.390625 C 5.445312 42.765625 5.523438 43.3125 5.914062 43.578125 C 6.054688 43.6875 6.226562 43.75 6.414062 43.75 C 6.679688 43.75 6.929688 43.609375 7.101562 43.390625 L 9.742188 39.78125 L 12.367188 43.390625 C 12.539062 43.609375 12.789062 43.75 13.070312 43.75 Z M 23.179688 43.75 C 23.632812 43.75 24.039062 43.359375 24.039062 42.890625 C 24.039062 42.40625 23.632812 42.015625 23.179688 42.015625 L 18.945312 42.015625 L 18.945312 33.671875 C 18.945312 33.203125 18.554688 32.8125 18.070312 32.8125 C 17.585938 32.8125 17.210938 33.203125 17.210938 33.671875 L 17.210938 42.890625 C 17.210938 43.359375 17.585938 43.75 18.070312 43.75 Z M 29.789062 43.734375 C 30.898438 43.734375 31.914062 43.40625 32.679688 42.84375 C 33.460938 42.28125 34.023438 41.421875 34.023438 40.421875 C 34.023438 39.9375 33.882812 39.46875 33.648438 39.09375 C 33.289062 38.515625 32.726562 38.109375 32.085938 37.796875 C 31.460938 37.5 30.726562 37.296875 29.929688 37.140625 L 29.898438 37.140625 C 29.054688 36.984375 28.351562 36.734375 27.945312 36.453125 C 27.742188 36.3125 27.601562 36.171875 27.523438 36.046875 C 27.445312 35.921875 27.414062 35.796875 27.414062 35.609375 C 27.414062 35.28125 27.585938 34.9375 28.007812 34.625 C 28.429688 34.3125 29.054688 34.09375 29.757812 34.09375 C 30.710938 34.09375 31.476562 34.5625 32.273438 35.09375 C 32.648438 35.34375 33.148438 35.234375 33.382812 34.859375 C 33.632812 34.5 33.523438 34 33.164062 33.75 C 32.367188 33.234375 31.257812 32.5 29.757812 32.5 C 28.742188 32.5 27.789062 32.796875 27.054688 33.328125 C 26.335938 33.859375 25.804688 34.671875 25.804688 35.609375 C 25.804688 36.078125 25.929688 36.515625 26.164062 36.890625 C 26.507812 37.4375 27.023438 37.828125 27.617188 38.109375 C 28.210938 38.390625 28.898438 38.578125 29.632812 38.71875 L 29.664062 38.71875 C 30.585938 38.890625 31.351562 39.15625 31.804688 39.453125 C 32.039062 39.609375 32.179688 39.765625 32.273438 39.921875 C 32.367188 40.078125 32.414062 40.21875 32.414062 40.421875 C 32.414062 40.8125 32.210938 41.203125 31.742188 41.546875 C 31.273438 41.890625 30.570312 42.125 29.789062 42.125 C 28.679688 42.140625 27.492188 41.484375 26.804688 40.921875 C 26.460938 40.640625 25.945312 40.6875 25.664062 41.03125 C 25.398438 41.375 25.445312 41.890625 25.789062 42.171875 C 26.679688 42.875 28.101562 43.71875 29.789062 43.734375 Z M 43.179688 43.75 C 43.351562 43.75 43.523438 43.6875 43.679688 43.578125 C 44.070312 43.3125 44.132812 42.765625 43.867188 42.390625 L 40.898438 38.328125 L 43.867188 34.296875 C 44.132812 33.90625 44.070312 33.375 43.679688 33.109375 C 43.289062 32.8125 42.773438 32.890625 42.476562 33.296875 L 39.851562 36.890625 L 37.210938 33.296875 C 36.945312 32.890625 36.398438 32.8125 36.023438 33.109375 C 35.632812 33.375 35.554688 33.90625 35.820312 34.296875 L 38.789062 38.328125 L 35.820312 42.390625 C 35.554688 42.765625 35.632812 43.3125 36.023438 43.578125 C 36.164062 43.6875 36.335938 43.75 36.523438 43.75 C 36.789062 43.75 37.039062 43.609375 37.210938 43.390625 L 39.851562 39.78125 L 42.476562 43.390625 C 42.648438 43.609375 42.898438 43.75 43.179688 43.75 Z M 43.179688 43.75 "/>\n      </g>' }, zipIcon: { extension: ".zip", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 20.175781 46.875 C 20.855469 46.875 21.402344 46.351562 21.402344 45.671875 C 21.402344 44.992188 20.855469 44.445312 20.175781 44.445312 L 13.132812 44.445312 L 21.183594 33.488281 L 21.183594 33.445312 C 21.203125 33.421875 21.226562 33.378906 21.25 33.335938 C 21.269531 33.3125 21.269531 33.289062 21.292969 33.269531 C 21.3125 33.203125 21.3125 33.179688 21.335938 33.136719 C 21.335938 33.09375 21.378906 33.070312 21.378906 33.007812 C 21.378906 32.984375 21.378906 32.960938 21.402344 32.917969 L 21.402344 32.679688 C 21.402344 32.632812 21.402344 32.613281 21.378906 32.546875 C 21.378906 32.503906 21.378906 32.480469 21.335938 32.4375 C 21.335938 32.414062 21.3125 32.371094 21.3125 32.304688 C 21.292969 32.285156 21.269531 32.242188 21.269531 32.21875 C 21.25 32.195312 21.226562 32.152344 21.203125 32.109375 C 21.183594 32.066406 21.160156 32.042969 21.117188 32.023438 C 21.09375 32 21.074219 31.957031 21.050781 31.933594 C 21.03125 31.914062 21.007812 31.867188 20.964844 31.847656 C 20.941406 31.824219 20.941406 31.804688 20.898438 31.78125 L 20.875 31.78125 C 20.832031 31.757812 20.8125 31.738281 20.765625 31.714844 C 20.746094 31.695312 20.722656 31.648438 20.65625 31.648438 L 20.570312 31.605469 L 20.4375 31.585938 C 20.417969 31.585938 20.375 31.5625 20.351562 31.5625 L 10.75 31.5625 C 10.070312 31.5625 9.546875 32.085938 9.546875 32.765625 C 9.546875 33.421875 10.070312 33.992188 10.75 33.992188 L 17.8125 33.992188 L 9.785156 44.972656 L 9.765625 44.972656 C 9.742188 45.015625 9.71875 45.058594 9.699219 45.082031 C 9.699219 45.101562 9.675781 45.148438 9.632812 45.167969 C 9.632812 45.210938 9.609375 45.257812 9.609375 45.277344 C 9.589844 45.320312 9.589844 45.367188 9.566406 45.386719 L 9.566406 45.496094 C 9.546875 45.539062 9.546875 45.585938 9.546875 45.648438 L 9.546875 45.738281 C 9.546875 45.78125 9.566406 45.824219 9.566406 45.890625 C 9.566406 45.933594 9.589844 45.957031 9.589844 45.976562 L 9.632812 46.109375 C 9.632812 46.152344 9.675781 46.175781 9.699219 46.21875 C 9.699219 46.242188 9.71875 46.261719 9.742188 46.328125 C 9.765625 46.351562 9.785156 46.394531 9.808594 46.414062 C 9.828125 46.4375 9.851562 46.460938 9.894531 46.480469 L 9.9375 46.542969 L 9.984375 46.589844 C 10.003906 46.613281 10.027344 46.632812 10.046875 46.632812 L 10.046875 46.65625 C 10.070312 46.679688 10.09375 46.679688 10.136719 46.699219 C 10.179688 46.722656 10.222656 46.742188 10.246094 46.742188 C 10.265625 46.789062 10.289062 46.789062 10.3125 46.808594 C 10.375 46.808594 10.421875 46.832031 10.464844 46.832031 C 10.484375 46.851562 10.507812 46.851562 10.53125 46.851562 L 10.648438 46.871094 Z M 26.214844 46.875 C 26.871094 46.875 27.4375 46.351562 27.4375 45.671875 L 27.4375 32.765625 C 27.4375 32.085938 26.871094 31.5625 26.214844 31.5625 C 25.535156 31.5625 25.011719 32.085938 25.011719 32.765625 L 25.011719 45.671875 C 25.011719 46.351562 25.535156 46.875 26.214844 46.875 Z M 32.734375 46.875 C 33.410156 46.875 33.957031 46.328125 33.957031 45.671875 L 33.957031 40.925781 L 36.648438 40.925781 C 39.25 40.925781 41.351562 38.824219 41.351562 36.265625 C 41.351562 33.664062 39.25 31.5625 36.648438 31.5625 L 32.734375 31.5625 C 32.078125 31.5625 31.53125 32.085938 31.53125 32.765625 L 31.53125 45.671875 C 31.53125 46.328125 32.078125 46.875 32.734375 46.875 Z M 36.648438 38.496094 L 33.957031 38.496094 L 33.957031 33.992188 L 36.648438 33.992188 C 37.917969 33.992188 38.902344 34.996094 38.921875 36.265625 C 38.902344 37.492188 37.917969 38.496094 36.648438 38.496094 Z M 36.648438 38.496094 "/>\n      </g>' }, docxIcon: { extension: ".docx", path: '<g id="surface9" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.789062 43.75 C 9.589844 43.75 10.988281 43.269531 11.984375 42.304688 C 12.980469 41.339844 13.476562 39.984375 13.476562 38.234375 C 13.476562 36.496094 12.980469 35.144531 11.984375 34.179688 C 10.988281 33.214844 9.589844 32.734375 7.789062 32.734375 L 4.695312 32.734375 C 4.394531 32.734375 4.15625 32.816406 3.984375 32.984375 C 3.8125 33.152344 3.726562 33.386719 3.726562 33.6875 L 3.726562 42.796875 C 3.726562 43.097656 3.8125 43.332031 3.984375 43.5 C 4.15625 43.667969 4.394531 43.75 4.695312 43.75 Z M 7.664062 42.109375 L 5.742188 42.109375 L 5.742188 34.375 L 7.664062 34.375 C 10.195312 34.375 11.460938 35.660156 11.460938 38.234375 C 11.460938 40.816406 10.195312 42.109375 7.664062 42.109375 Z M 20.414062 43.890625 C 21.476562 43.890625 22.402344 43.660156 23.1875 43.203125 C 23.972656 42.746094 24.582031 42.089844 25.007812 41.234375 C 25.433594 40.378906 25.648438 39.378906 25.648438 38.234375 C 25.648438 37.089844 25.4375 36.089844 25.015625 35.242188 C 24.59375 34.394531 23.988281 33.738281 23.203125 33.28125 C 22.417969 32.824219 21.488281 32.59375 20.414062 32.59375 C 19.339844 32.59375 18.410156 32.824219 17.617188 33.28125 C 16.824219 33.738281 16.21875 34.394531 15.796875 35.242188 C 15.375 36.089844 15.164062 37.089844 15.164062 38.234375 C 15.164062 39.378906 15.378906 40.378906 15.804688 41.234375 C 16.230469 42.089844 16.839844 42.746094 17.625 43.203125 C 18.410156 43.660156 19.339844 43.890625 20.414062 43.890625 Z M 20.414062 42.28125 C 19.394531 42.28125 18.597656 41.933594 18.03125 41.234375 C 17.464844 40.535156 17.179688 39.535156 17.179688 38.234375 C 17.179688 36.933594 17.464844 35.933594 18.03125 35.242188 C 18.597656 34.550781 19.394531 34.203125 20.414062 34.203125 C 21.425781 34.203125 22.214844 34.550781 22.78125 35.242188 C 23.347656 35.933594 23.632812 36.933594 23.632812 38.234375 C 23.632812 39.535156 23.347656 40.535156 22.78125 41.234375 C 22.214844 41.933594 21.425781 42.28125 20.414062 42.28125 Z M 32.601562 43.890625 C 33.289062 43.890625 33.933594 43.789062 34.539062 43.585938 C 35.144531 43.382812 35.679688 43.089844 36.148438 42.703125 C 36.285156 42.597656 36.378906 42.488281 36.429688 42.367188 C 36.480469 42.246094 36.507812 42.109375 36.507812 41.953125 C 36.507812 41.722656 36.445312 41.53125 36.320312 41.375 C 36.195312 41.21875 36.042969 41.140625 35.867188 41.140625 C 35.753906 41.140625 35.644531 41.160156 35.539062 41.203125 C 35.433594 41.246094 35.332031 41.296875 35.226562 41.359375 C 34.746094 41.683594 34.316406 41.910156 33.9375 42.046875 C 33.558594 42.183594 33.144531 42.25 32.695312 42.25 C 31.613281 42.25 30.792969 41.910156 30.234375 41.234375 C 29.675781 40.558594 29.398438 39.558594 29.398438 38.234375 C 29.398438 36.921875 29.675781 35.925781 30.234375 35.25 C 30.792969 34.574219 31.613281 34.234375 32.695312 34.234375 C 33.164062 34.234375 33.589844 34.300781 33.976562 34.429688 C 34.363281 34.558594 34.777344 34.792969 35.226562 35.125 C 35.445312 35.269531 35.660156 35.34375 35.867188 35.34375 C 36.042969 35.34375 36.195312 35.265625 36.320312 35.109375 C 36.445312 34.953125 36.507812 34.761719 36.507812 34.53125 C 36.507812 34.363281 36.480469 34.222656 36.429688 34.109375 C 36.378906 33.996094 36.285156 33.886719 36.148438 33.78125 C 35.679688 33.394531 35.144531 33.101562 34.539062 32.898438 C 33.933594 32.695312 33.289062 32.59375 32.601562 32.59375 C 31.539062 32.59375 30.609375 32.824219 29.8125 33.28125 C 29.015625 33.738281 28.402344 34.394531 27.976562 35.242188 C 27.550781 36.089844 27.335938 37.089844 27.335938 38.234375 C 27.335938 39.378906 27.550781 40.378906 27.976562 41.234375 C 28.402344 42.089844 29.015625 42.746094 29.8125 43.203125 C 30.609375 43.660156 31.539062 43.890625 32.601562 43.890625 Z M 46.132812 43.84375 C 46.382812 43.84375 46.605469 43.75 46.796875 43.5625 C 46.988281 43.375 47.085938 43.15625 47.085938 42.90625 C 47.085938 42.707031 47.003906 42.511719 46.835938 42.3125 L 43.445312 38.15625 L 46.710938 34.171875 C 46.867188 34.003906 46.945312 33.808594 46.945312 33.578125 C 46.945312 33.328125 46.847656 33.113281 46.65625 32.929688 C 46.464844 32.746094 46.242188 32.65625 45.992188 32.65625 C 45.730469 32.65625 45.507812 32.769531 45.320312 33 L 42.273438 36.765625 L 39.226562 33 C 39.027344 32.769531 38.800781 32.65625 38.539062 32.65625 C 38.289062 32.65625 38.070312 32.746094 37.882812 32.929688 C 37.695312 33.113281 37.601562 33.328125 37.601562 33.578125 C 37.601562 33.808594 37.679688 34.003906 37.835938 34.171875 L 41.101562 38.15625 L 37.695312 42.3125 C 37.539062 42.5 37.460938 42.699219 37.460938 42.90625 C 37.460938 43.15625 37.558594 43.371094 37.75 43.554688 C 37.941406 43.738281 38.164062 43.828125 38.414062 43.828125 C 38.675781 43.828125 38.898438 43.71875 39.085938 43.5 L 42.273438 39.5625 L 45.445312 43.5 C 45.644531 43.730469 45.871094 43.84375 46.132812 43.84375 Z M 46.132812 43.84375 "/>\n      </g>' }, jpgIcon: { extension: ".jpg", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.789062 47.007812 L 9.488281 46.960938 C 12.214844 46.757812 13.578125 45.277344 13.578125 42.523438 L 13.578125 32.742188 C 13.578125 32.320312 13.453125 31.980469 13.195312 31.726562 C 12.941406 31.472656 12.59375 31.34375 12.15625 31.34375 C 11.734375 31.34375 11.394531 31.472656 11.140625 31.726562 C 10.886719 31.980469 10.757812 32.320312 10.757812 32.742188 L 10.757812 42.523438 C 10.757812 43.238281 10.605469 43.769531 10.296875 44.117188 C 9.992188 44.46875 9.539062 44.660156 8.941406 44.6875 L 8.242188 44.730469 C 7.847656 44.761719 7.558594 44.867188 7.378906 45.046875 C 7.195312 45.230469 7.105469 45.496094 7.105469 45.847656 C 7.105469 46.664062 7.667969 47.050781 8.789062 47.007812 Z M 18.304688 47.007812 C 18.742188 47.007812 19.089844 46.878906 19.34375 46.625 C 19.597656 46.367188 19.726562 46.023438 19.726562 45.585938 L 19.726562 40.882812 L 23.640625 40.882812 C 25.289062 40.882812 26.574219 40.464844 27.492188 39.632812 C 28.410156 38.804688 28.871094 37.644531 28.871094 36.15625 C 28.871094 34.667969 28.410156 33.511719 27.492188 32.6875 C 26.574219 31.863281 25.289062 31.453125 23.640625 31.453125 L 18.261719 31.453125 C 17.839844 31.453125 17.507812 31.570312 17.265625 31.804688 C 17.023438 32.035156 16.90625 32.363281 16.90625 32.789062 L 16.90625 45.585938 C 16.90625 46.023438 17.03125 46.367188 17.289062 46.625 C 17.542969 46.878906 17.882812 47.007812 18.304688 47.007812 Z M 23.292969 38.714844 L 19.726562 38.714844 L 19.726562 33.640625 L 23.292969 33.640625 C 25.230469 33.640625 26.203125 34.488281 26.203125 36.179688 C 26.203125 37.871094 25.230469 38.714844 23.292969 38.714844 Z M 38.605469 47.070312 C 39.320312 47.070312 40.0625 47.011719 40.835938 46.898438 C 41.609375 46.78125 42.285156 46.621094 42.871094 46.414062 C 43.410156 46.242188 43.765625 46.015625 43.941406 45.738281 C 44.117188 45.460938 44.203125 44.988281 44.203125 44.316406 L 44.203125 39.613281 C 44.203125 39.292969 44.101562 39.03125 43.898438 38.835938 C 43.695312 38.640625 43.425781 38.539062 43.089844 38.539062 L 39.21875 38.539062 C 38.867188 38.539062 38.59375 38.628906 38.398438 38.804688 C 38.199219 38.976562 38.101562 39.226562 38.101562 39.546875 C 38.101562 39.867188 38.199219 40.117188 38.398438 40.289062 C 38.59375 40.464844 38.867188 40.554688 39.21875 40.554688 L 41.6875 40.554688 L 41.6875 44.425781 C 40.699219 44.703125 39.707031 44.839844 38.714844 44.839844 C 35.390625 44.839844 33.726562 42.945312 33.726562 39.152344 C 33.726562 37.300781 34.132812 35.90625 34.941406 34.964844 C 35.75 34.023438 36.949219 33.554688 38.539062 33.554688 C 39.238281 33.554688 39.867188 33.644531 40.421875 33.828125 C 40.972656 34.007812 41.574219 34.324219 42.214844 34.777344 C 42.390625 34.894531 42.542969 34.980469 42.671875 35.03125 C 42.804688 35.082031 42.949219 35.105469 43.109375 35.105469 C 43.359375 35.105469 43.570312 34.996094 43.746094 34.777344 C 43.921875 34.558594 44.007812 34.289062 44.007812 33.96875 C 44.007812 33.75 43.96875 33.558594 43.886719 33.398438 C 43.808594 33.238281 43.679688 33.078125 43.503906 32.917969 C 42.191406 31.808594 40.507812 31.257812 38.453125 31.257812 C 36.90625 31.257812 35.5625 31.574219 34.425781 32.207031 C 33.289062 32.84375 32.410156 33.753906 31.789062 34.941406 C 31.171875 36.128906 30.859375 37.535156 30.859375 39.152344 C 30.859375 40.800781 31.171875 42.21875 31.789062 43.40625 C 32.410156 44.597656 33.304688 45.503906 34.46875 46.132812 C 35.636719 46.757812 37.015625 47.070312 38.605469 47.070312 Z M 38.605469 47.070312 "/>\n      </g>' }, mp3Icon: { extension: ".mp3", path: '<g id="surface9" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 43.828125 43.710938 C 43.605469 44.28125 43.273438 44.804688 42.84375 45.265625 C 42.40625 45.730469 41.867188 46.113281 41.242188 46.398438 C 40.597656 46.699219 39.851562 46.855469 39.027344 46.855469 C 38.328125 46.855469 37.703125 46.757812 37.160156 46.570312 C 36.609375 46.378906 36.160156 46.136719 35.769531 45.839844 C 35.386719 45.550781 35.050781 45.210938 34.796875 44.832031 C 34.570312 44.507812 34.394531 44.195312 34.265625 43.890625 C 34.140625 43.59375 34.054688 43.335938 33.996094 43.101562 C 33.792969 42.261719 34.304688 41.417969 35.140625 41.210938 C 35.980469 41.007812 36.828125 41.519531 37.03125 42.355469 C 37.039062 42.390625 37.066406 42.488281 37.144531 42.671875 C 37.191406 42.777344 37.265625 42.914062 37.371094 43.0625 C 37.4375 43.160156 37.53125 43.257812 37.65625 43.351562 C 37.792969 43.453125 37.972656 43.542969 38.195312 43.625 C 38.332031 43.667969 38.59375 43.730469 39.027344 43.730469 C 39.390625 43.730469 39.695312 43.675781 39.925781 43.566406 C 40.1875 43.445312 40.398438 43.300781 40.558594 43.132812 C 40.71875 42.957031 40.839844 42.773438 40.914062 42.578125 C 40.996094 42.371094 41.03125 42.195312 41.03125 42.023438 C 41.03125 41.789062 41 41.585938 40.921875 41.398438 C 40.871094 41.257812 40.785156 41.148438 40.660156 41.039062 C 40.515625 40.910156 40.296875 40.792969 40.011719 40.699219 C 39.6875 40.59375 39.253906 40.539062 38.738281 40.535156 C 37.882812 40.527344 37.1875 39.832031 37.1875 38.972656 L 37.1875 38.832031 C 37.1875 37.984375 37.859375 37.292969 38.699219 37.265625 C 39.070312 37.257812 39.398438 37.195312 39.679688 37.101562 C 39.921875 37.011719 40.121094 36.902344 40.273438 36.773438 C 40.40625 36.652344 40.507812 36.519531 40.582031 36.359375 C 40.652344 36.210938 40.6875 36.027344 40.6875 35.8125 C 40.6875 35.523438 40.644531 35.289062 40.574219 35.125 C 40.5 34.96875 40.414062 34.847656 40.304688 34.757812 C 40.1875 34.660156 40.042969 34.582031 39.867188 34.53125 C 39.402344 34.386719 38.878906 34.398438 38.480469 34.542969 C 38.289062 34.617188 38.121094 34.714844 37.976562 34.84375 C 37.820312 34.984375 37.695312 35.148438 37.59375 35.339844 C 37.484375 35.550781 37.40625 35.773438 37.367188 36.039062 C 37.230469 36.890625 36.429688 37.472656 35.574219 37.335938 C 34.722656 37.195312 34.140625 36.398438 34.28125 35.542969 C 34.378906 34.9375 34.5625 34.378906 34.835938 33.871094 C 35.109375 33.355469 35.464844 32.898438 35.890625 32.519531 C 36.320312 32.132812 36.824219 31.828125 37.382812 31.617188 C 38.433594 31.226562 39.667969 31.199219 40.78125 31.539062 C 41.351562 31.714844 41.863281 31.992188 42.308594 32.355469 C 42.777344 32.753906 43.148438 33.242188 43.414062 33.824219 C 43.679688 34.402344 43.8125 35.070312 43.8125 35.8125 C 43.8125 36.476562 43.679688 37.097656 43.421875 37.660156 C 43.25 38.046875 43.023438 38.394531 42.746094 38.707031 C 43.242188 39.148438 43.609375 39.671875 43.835938 40.261719 C 44.046875 40.804688 44.15625 41.398438 44.15625 42.023438 C 44.15625 42.578125 44.046875 43.148438 43.828125 43.710938 Z M 31.445312 38.492188 C 31.148438 39.140625 30.734375 39.703125 30.199219 40.164062 C 29.6875 40.605469 29.078125 40.957031 28.390625 41.199219 C 27.71875 41.4375 26.976562 41.5625 26.191406 41.5625 L 25 41.5625 L 25 45 C 25 45.859375 24.296875 46.5625 23.4375 46.5625 C 22.578125 46.5625 21.875 45.859375 21.875 45 L 21.875 32.8125 C 21.875 31.945312 22.578125 31.25 23.4375 31.25 L 26.191406 31.25 C 27.890625 31.25 29.257812 31.667969 30.253906 32.5 C 31.339844 33.398438 31.886719 34.714844 31.886719 36.40625 C 31.886719 37.148438 31.738281 37.851562 31.445312 38.492188 Z M 18.730469 45.210938 C 18.730469 46.070312 18.03125 46.773438 17.167969 46.773438 C 16.300781 46.773438 15.605469 46.070312 15.605469 45.210938 L 15.605469 39.28125 L 14.015625 43.140625 C 14.007812 43.164062 13.996094 43.191406 13.984375 43.214844 C 13.71875 43.777344 13.15625 44.117188 12.566406 44.117188 L 12.53125 44.117188 C 11.9375 44.117188 11.375 43.777344 11.109375 43.214844 L 11.082031 43.160156 L 9.339844 39.101562 L 9.339844 45.210938 C 9.339844 46.070312 8.640625 46.773438 7.777344 46.773438 C 6.910156 46.773438 6.214844 46.070312 6.214844 45.210938 L 6.214844 32.824219 C 6.214844 31.960938 6.910156 31.261719 7.777344 31.261719 L 7.835938 31.261719 C 8.472656 31.261719 9.046875 31.617188 9.335938 32.1875 L 12.527344 39.09375 L 15.59375 32.207031 C 15.894531 31.617188 16.46875 31.261719 17.105469 31.261719 L 17.167969 31.261719 C 18.03125 31.261719 18.730469 31.960938 18.730469 32.824219 Z M 41.382812 28.125 L 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.136719 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.136719 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 41.382812 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 28.257812 34.902344 C 27.835938 34.550781 27.140625 34.375 26.191406 34.375 L 25 34.375 L 25 38.4375 L 26.191406 38.4375 C 26.621094 38.4375 27.007812 38.375 27.34375 38.253906 C 27.667969 38.140625 27.929688 37.992188 28.148438 37.804688 C 28.34375 37.632812 28.492188 37.4375 28.601562 37.195312 C 28.710938 36.964844 28.757812 36.703125 28.757812 36.40625 C 28.757812 35.324219 28.382812 35.003906 28.257812 34.902344 "/>\n      <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(99.607843%,99.607843%,99.607843%);stroke-opacity:1;stroke-miterlimit:4;" d="M 11.34125 13.57875 C 11.345 13.5925 11.3525 13.62375 11.36375 13.67375 C 11.3775 13.7225 11.3975 13.78125 11.42625 13.85 C 11.45375 13.9175 11.49375 13.9875 11.54625 14.0625 C 11.5975 14.13875 11.66625 14.20875 11.75 14.27125 C 11.83375 14.33625 11.9375 14.38875 12.0575 14.43125 C 12.1775 14.4725 12.32 14.49375 12.4875 14.49375 C 12.67875 14.49375 12.845 14.46125 12.9875 14.39375 C 13.13 14.32875 13.24875 14.245 13.34375 14.1425 C 13.43875 14.0425 13.51125 13.93 13.55875 13.8075 C 13.6075 13.6825 13.63125 13.56375 13.63125 13.4475 C 13.63125 13.31125 13.6075 13.1825 13.5625 13.065 C 13.515 12.9475 13.4425 12.845 13.3425 12.7575 C 13.2425 12.67 13.115 12.6 12.96 12.55 C 12.805 12.49875 12.6175 12.4725 12.4 12.4725 L 12.4 12.42625 C 12.57 12.42 12.72375 12.3925 12.8625 12.34375 C 13.0025 12.29625 13.11875 12.2275 13.21625 12.14375 C 13.31375 12.05875 13.3875 11.96 13.44125 11.845 C 13.4925 11.7275 13.52 11.60125 13.52 11.46 C 13.52 11.29375 13.4925 11.1525 13.43875 11.0325 C 13.38375 10.91375 13.31125 10.81625 13.21875 10.74 C 13.1275 10.66375 13.0225 10.6075 12.90375 10.5725 C 12.78625 10.535 12.66375 10.5175 12.5375 10.5175 C 12.395 10.5175 12.26125 10.54 12.14 10.58625 C 12.0175 10.6325 11.91 10.69625 11.81875 10.77875 C 11.72625 10.8625 11.64875 10.96 11.5875 11.07375 C 11.5275 11.18875 11.48625 11.315 11.4625 11.45375 M 7.5 14.4 L 7.5 10.5 L 8.3825 10.5 C 8.8075 10.5 9.13375 10.595 9.3625 10.78375 C 9.59 10.975 9.7025 11.2625 9.7025 11.65 C 9.7025 11.81625 9.6725 11.97125 9.6075 12.11125 C 9.5425 12.2525 9.4525 12.37375 9.335 12.475 C 9.21875 12.5775 9.0775 12.65625 8.9175 12.71375 C 8.75625 12.77125 8.5775 12.8 8.3825 12.8 L 7.6 12.8 M 2.4875 14.4675 L 2.4875 10.50375 L 2.5075 10.50375 C 2.5225 10.50375 2.53375 10.5125 2.5425 10.52625 L 3.9925 13.58625 C 3.99875 13.5975 4.005 13.6075 4.00875 13.6175 M 4.02125 13.6175 C 4.02625 13.6075 4.03125 13.5975 4.0375 13.58625 L 5.44 10.52625 C 5.4475 10.5125 5.45875 10.50375 5.4725 10.50375 L 5.4925 10.50375 L 5.4925 14.4675 " transform="matrix(3.125,0,0,3.125,0,0)"/>\n      </g>' }, mp4Icon: { extension: ".mp4", path: '<g id="surface6" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 36.898438 40.625 L 40.625 35.480469 L 40.625 40.625 Z M 28.761719 36.40625 C 28.761719 36.703125 28.707031 36.964844 28.605469 37.195312 C 28.496094 37.433594 28.347656 37.632812 28.148438 37.804688 C 27.929688 37.992188 27.667969 38.144531 27.34375 38.257812 C 27.003906 38.375 26.621094 38.4375 26.191406 38.4375 L 25 38.4375 L 25 34.375 L 26.191406 34.375 C 27.140625 34.375 27.835938 34.554688 28.253906 34.902344 C 28.378906 35.007812 28.761719 35.324219 28.761719 36.40625 Z M 44.6875 43.75 L 43.75 43.75 L 43.75 45.3125 C 43.75 46.175781 43.050781 46.875 42.1875 46.875 C 41.324219 46.875 40.625 46.175781 40.625 45.3125 L 40.625 43.75 L 34.066406 43.75 C 33.199219 43.75 32.503906 43.050781 32.503906 42.1875 L 32.503906 41.875 C 32.503906 41.546875 32.605469 41.226562 32.800781 40.957031 L 39.363281 31.898438 C 39.660156 31.492188 40.128906 31.25 40.628906 31.25 L 42.1875 31.25 C 43.050781 31.25 43.75 31.949219 43.75 32.8125 L 43.75 40.625 L 44.6875 40.625 C 45.550781 40.625 46.25 41.324219 46.25 42.1875 C 46.25 43.050781 45.550781 43.75 44.6875 43.75 Z M 31.445312 38.492188 C 31.148438 39.140625 30.730469 39.703125 30.195312 40.167969 C 29.6875 40.605469 29.082031 40.957031 28.390625 41.203125 C 27.71875 41.441406 26.976562 41.5625 26.191406 41.5625 L 25 41.5625 L 25 45 C 25 45.863281 24.300781 46.5625 23.4375 46.5625 C 22.578125 46.5625 21.875 45.863281 21.875 45 L 21.875 32.8125 C 21.875 31.949219 22.578125 31.25 23.4375 31.25 L 26.191406 31.25 C 27.890625 31.25 29.257812 31.671875 30.253906 32.5 C 31.339844 33.398438 31.886719 34.714844 31.886719 36.40625 C 31.886719 37.148438 31.738281 37.851562 31.445312 38.492188 Z M 18.730469 45.210938 C 18.730469 46.070312 18.027344 46.773438 17.167969 46.773438 C 16.300781 46.773438 15.605469 46.070312 15.605469 45.210938 L 15.605469 39.6875 L 14.035156 43.105469 C 14.019531 43.144531 14.003906 43.179688 13.984375 43.214844 C 13.71875 43.78125 13.15625 44.117188 12.566406 44.117188 L 12.53125 44.117188 C 11.941406 44.117188 11.378906 43.78125 11.113281 43.214844 C 11.097656 43.183594 11.078125 43.152344 11.066406 43.125 L 9.339844 39.484375 L 9.339844 45.210938 C 9.339844 46.070312 8.640625 46.773438 7.777344 46.773438 C 6.910156 46.773438 6.214844 46.070312 6.214844 45.210938 L 6.214844 32.824219 C 6.214844 31.960938 6.910156 31.261719 7.777344 31.261719 L 7.835938 31.261719 C 8.472656 31.261719 9.046875 31.617188 9.335938 32.191406 L 9.355469 32.226562 L 12.523438 38.90625 L 15.578125 32.242188 C 15.585938 32.226562 15.597656 32.210938 15.605469 32.191406 C 15.894531 31.617188 16.46875 31.261719 17.105469 31.261719 L 17.164062 31.261719 C 18.027344 31.261719 18.726562 31.960938 18.726562 32.824219 L 18.726562 45.210938 Z M 41.382812 28.125 L 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 41.382812 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface6" mask="url(#mask0)"/>\n      <path style="fill:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(99.607843%,99.607843%,99.607843%);stroke-opacity:1;stroke-miterlimit:4;" d="M 14.3 13.5 L 10.90125 13.5 L 10.90125 13.4 L 13.00125 10.5 L 13.5 10.5 L 13.5 14.5 M 7.5 14.4 L 7.5 10.5 L 8.3825 10.5 C 8.8075 10.5 9.13375 10.595 9.3625 10.78375 C 9.59 10.975 9.7025 11.2625 9.7025 11.65 C 9.7025 11.81625 9.6725 11.97125 9.6075 12.11125 C 9.5425 12.2525 9.4525 12.37375 9.335 12.47625 C 9.21875 12.5775 9.0775 12.65625 8.9175 12.71375 C 8.75625 12.77125 8.5775 12.8 8.3825 12.8 L 7.6 12.8 M 2.4875 14.4675 L 2.4875 10.50375 L 2.5075 10.50375 C 2.5225 10.50375 2.53375 10.5125 2.5425 10.52625 L 3.9925 13.58625 C 3.99875 13.5975 4.005 13.6075 4.00875 13.6175 M 4.02125 13.6175 C 4.02625 13.6075 4.03125 13.5975 4.0375 13.58625 L 5.44 10.52625 C 5.4475 10.5125 5.45875 10.50375 5.4725 10.50375 L 5.4925 10.50375 L 5.4925 14.4675 " transform="matrix(3.125,0,0,3.125,0,0)"/>\n      </g>' }, oggIcon: { extension: ".ogg", path: '<g id="surface9" clip-path="url(#clip1)">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.621094 28.125 C 3.859375 28.125 0 31.984375 0 36.742188 L 0 41.378906 C 0 46.140625 3.859375 50 8.621094 50 L 41.378906 50 C 46.140625 50 50 46.140625 50 41.382812 L 50 36.746094 C 50 31.984375 46.140625 28.125 41.382812 28.125 Z M 8.621094 28.125 "/>\n      </g>\n      </defs>\n      <g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.578125 25 L 39.421875 25 C 41.53125 25 43.527344 25.492188 45.3125 26.367188 L 45.3125 15.367188 C 45.3125 13.90625 44.976562 13.097656 43.984375 12.109375 C 42.996094 11.121094 35.105469 3.226562 34.503906 2.628906 C 33.90625 2.027344 33.070312 1.5625 31.617188 1.5625 L 6.5625 1.5625 C 5.527344 1.5625 4.6875 2.402344 4.6875 3.4375 L 4.6875 26.367188 C 6.476562 25.492188 8.472656 25 10.578125 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.710938 L 42.164062 12.5 L 34.515625 12.5 C 34.464844 12.46875 34.414062 12.425781 34.375 12.390625 Z M 6.25 25.722656 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.25 13.980469 32.496094 15.210938 33.742188 15.539062 C 33.902344 15.59375 34.074219 15.625 34.257812 15.625 L 43.75 15.625 L 43.75 25.722656 C 44.859375 26.105469 45.910156 26.625 46.875 27.269531 L 46.875 15.363281 C 46.875 13.511719 46.375 12.289062 45.089844 11.003906 L 35.609375 1.523438 C 34.582031 0.496094 33.273438 0 31.617188 0 L 6.5625 0 C 4.667969 0 3.125 1.542969 3.125 3.4375 L 3.125 27.269531 C 4.089844 26.625 5.140625 26.105469 6.25 25.722656 Z M 6.25 25.722656 "/>\n      <use xlink:href="#surface9" mask="url(#mask0)"/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.976562 47.070312 C 10.464844 47.070312 11.757812 46.75 12.859375 46.109375 C 13.960938 45.46875 14.808594 44.550781 15.40625 43.351562 C 16.003906 42.15625 16.304688 40.757812 16.304688 39.152344 C 16.304688 37.550781 16.007812 36.152344 15.417969 34.964844 C 14.828125 33.777344 13.980469 32.859375 12.882812 32.21875 C 11.78125 31.578125 10.480469 31.257812 8.976562 31.257812 C 7.472656 31.257812 6.167969 31.578125 5.0625 32.21875 C 3.953125 32.859375 3.101562 33.777344 2.511719 34.964844 C 1.921875 36.152344 1.625 37.550781 1.625 39.152344 C 1.625 40.757812 1.925781 42.15625 2.523438 43.351562 C 3.121094 44.550781 3.972656 45.46875 5.070312 46.109375 C 6.171875 46.75 7.472656 47.070312 8.976562 47.070312 Z M 8.976562 44.820312 C 7.546875 44.820312 6.433594 44.332031 5.640625 43.351562 C 4.847656 42.375 4.449219 40.976562 4.449219 39.152344 C 4.449219 37.332031 4.847656 35.933594 5.640625 34.964844 C 6.433594 33.996094 7.546875 33.507812 8.976562 33.507812 C 10.390625 33.507812 11.496094 33.996094 12.289062 34.964844 C 13.085938 35.933594 13.484375 37.332031 13.484375 39.152344 C 13.484375 40.976562 13.085938 42.375 12.289062 43.351562 C 11.496094 44.332031 10.390625 44.820312 8.976562 44.820312 Z M 26.410156 47.070312 C 27.125 47.070312 27.871094 47.011719 28.640625 46.898438 C 29.414062 46.78125 30.09375 46.621094 30.675781 46.414062 C 31.214844 46.242188 31.574219 46.015625 31.75 45.738281 C 31.921875 45.460938 32.011719 44.988281 32.011719 44.316406 L 32.011719 39.613281 C 32.011719 39.292969 31.910156 39.03125 31.703125 38.835938 C 31.5 38.640625 31.230469 38.539062 30.894531 38.539062 L 27.023438 38.539062 C 26.671875 38.539062 26.398438 38.628906 26.203125 38.804688 C 26.007812 38.976562 25.90625 39.226562 25.90625 39.546875 C 25.90625 39.867188 26.007812 40.117188 26.203125 40.289062 C 26.398438 40.464844 26.671875 40.554688 27.023438 40.554688 L 29.496094 40.554688 L 29.496094 44.425781 C 28.503906 44.703125 27.511719 44.839844 26.519531 44.839844 C 23.195312 44.839844 21.53125 42.945312 21.53125 39.152344 C 21.53125 37.300781 21.9375 35.90625 22.746094 34.964844 C 23.554688 34.023438 24.753906 33.554688 26.34375 33.554688 C 27.046875 33.554688 27.671875 33.644531 28.226562 33.828125 C 28.78125 34.007812 29.378906 34.324219 30.019531 34.777344 C 30.195312 34.894531 30.347656 34.980469 30.480469 35.03125 C 30.609375 35.082031 30.757812 35.105469 30.917969 35.105469 C 31.164062 35.105469 31.375 34.996094 31.550781 34.777344 C 31.726562 34.558594 31.8125 34.289062 31.8125 33.96875 C 31.8125 33.75 31.773438 33.558594 31.695312 33.398438 C 31.613281 33.238281 31.484375 33.078125 31.3125 32.917969 C 30 31.808594 28.3125 31.257812 26.257812 31.257812 C 24.710938 31.257812 23.371094 31.574219 22.234375 32.207031 C 21.09375 32.84375 20.214844 33.753906 19.597656 34.941406 C 18.976562 36.128906 18.667969 37.535156 18.667969 39.152344 C 18.667969 40.800781 18.976562 42.21875 19.597656 43.40625 C 20.214844 44.597656 21.109375 45.503906 22.277344 46.132812 C 23.441406 46.757812 24.820312 47.070312 26.410156 47.070312 Z M 42.445312 47.070312 C 43.160156 47.070312 43.902344 47.011719 44.675781 46.898438 C 45.449219 46.78125 46.128906 46.621094 46.710938 46.414062 C 47.25 46.242188 47.609375 46.015625 47.78125 45.738281 C 47.957031 45.460938 48.046875 44.988281 48.046875 44.316406 L 48.046875 39.613281 C 48.046875 39.292969 47.941406 39.03125 47.738281 38.835938 C 47.535156 38.640625 47.265625 38.539062 46.929688 38.539062 L 43.058594 38.539062 C 42.707031 38.539062 42.433594 38.628906 42.238281 38.804688 C 42.039062 38.976562 41.941406 39.226562 41.941406 39.546875 C 41.941406 39.867188 42.039062 40.117188 42.238281 40.289062 C 42.433594 40.464844 42.707031 40.554688 43.058594 40.554688 L 45.53125 40.554688 L 45.53125 44.425781 C 44.539062 44.703125 43.546875 44.839844 42.554688 44.839844 C 39.230469 44.839844 37.566406 42.945312 37.566406 39.152344 C 37.566406 37.300781 37.972656 35.90625 38.78125 34.964844 C 39.589844 34.023438 40.789062 33.554688 42.378906 33.554688 C 43.078125 33.554688 43.707031 33.644531 44.261719 33.828125 C 44.816406 34.007812 45.414062 34.324219 46.054688 34.777344 C 46.230469 34.894531 46.382812 34.980469 46.515625 35.03125 C 46.644531 35.082031 46.792969 35.105469 46.953125 35.105469 C 47.199219 35.105469 47.410156 34.996094 47.585938 34.777344 C 47.761719 34.558594 47.847656 34.289062 47.847656 33.96875 C 47.847656 33.75 47.808594 33.558594 47.726562 33.398438 C 47.648438 33.238281 47.519531 33.078125 47.34375 32.917969 C 46.03125 31.808594 44.347656 31.257812 42.292969 31.257812 C 40.746094 31.257812 39.40625 31.574219 38.265625 32.207031 C 37.128906 32.84375 36.25 33.753906 35.632812 34.941406 C 35.011719 36.128906 34.703125 37.535156 34.703125 39.152344 C 34.703125 40.800781 35.011719 42.21875 35.632812 43.40625 C 36.25 44.597656 37.144531 45.503906 38.3125 46.132812 C 39.476562 46.757812 40.855469 47.070312 42.445312 47.070312 Z M 42.445312 47.070312 "/>\n      </g>' }, pdfIcon: { extension: ".pdf", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(99.607843%,99.607843%,99.607843%);fill-opacity:1;" d="M 10.59375 25 L 39.4375 25 C 41.476562 25.003906 43.484375 25.472656 45.3125 26.375 L 45.3125 15.375 C 45.347656 14.191406 44.867188 13.054688 44 12.25 L 34.625 2.875 C 33.875 2.003906 32.773438 1.523438 31.625 1.5625 L 6.625 1.5625 C 5.589844 1.5625 4.75 2.402344 4.75 3.4375 L 4.75 26.375 C 6.566406 25.480469 8.566406 25.007812 10.59375 25 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 34.375 4.71875 L 42.15625 12.5 L 34.53125 12.5 C 34.480469 12.511719 34.425781 12.511719 34.375 12.5 Z M 6.25 25.71875 L 6.25 3.4375 C 6.25 3.265625 6.390625 3.125 6.5625 3.125 L 31.25 3.125 L 31.25 12.5 C 31.300781 13.980469 32.316406 15.253906 33.75 15.625 C 33.957031 15.675781 34.167969 15.675781 34.375 15.625 L 43.75 15.625 L 43.75 25.71875 C 44.859375 26.09375 45.910156 26.621094 46.875 27.28125 L 46.875 15.375 C 46.964844 13.722656 46.3125 12.117188 45.09375 11 L 35.71875 1.625 C 34.648438 0.523438 33.160156 -0.0664062 31.625 0 L 6.625 0 C 5.703125 -0.015625 4.8125 0.339844 4.152344 0.984375 C 3.496094 1.632812 3.125 2.515625 3.125 3.4375 L 3.125 27.28125 C 4.09375 26.625 5.144531 26.101562 6.25 25.71875 Z M 6.25 25.71875 "/>\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.625 28.125 C 6.335938 28.117188 4.136719 29.023438 2.515625 30.640625 C 0.898438 32.261719 -0.0078125 34.460938 0 36.75 L 0 41.375 C 0 46.136719 3.863281 50 8.625 50 L 41.375 50 C 46.132812 49.984375 49.984375 46.132812 50 41.375 L 50 36.75 C 50 31.988281 46.136719 28.125 41.375 28.125 Z M 8.625 28.125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 14.40625 41.78125 L 12.09375 41.78125 L 12.09375 45.84375 C 12.003906 46.351562 11.5625 46.726562 11.046875 46.726562 C 10.53125 46.726562 10.089844 46.351562 10 45.84375 L 10 34.78125 C 10 34.210938 10.460938 33.75 11.03125 33.75 L 14.40625 33.75 C 15.925781 33.617188 17.390625 34.351562 18.191406 35.648438 C 18.992188 36.945312 18.992188 38.585938 18.191406 39.882812 C 17.390625 41.179688 15.925781 41.914062 14.40625 41.78125 Z M 12.09375 39.6875 L 14.40625 39.6875 C 15.152344 39.78125 15.882812 39.4375 16.289062 38.804688 C 16.691406 38.171875 16.691406 37.359375 16.289062 36.726562 C 15.882812 36.09375 15.152344 35.75 14.40625 35.84375 L 12.09375 35.84375 Z M 12.09375 39.6875 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 20.3125 45.84375 L 20.3125 34.78125 C 20.3125 34.210938 20.773438 33.75 21.34375 33.75 L 23.5625 33.75 C 27.1875 33.75 30.125 36.6875 30.125 40.3125 C 30.125 43.9375 27.1875 46.875 23.5625 46.875 L 21.34375 46.875 C 20.773438 46.875 20.3125 46.414062 20.3125 45.84375 Z M 22.40625 44.78125 L 23.5625 44.78125 C 26.03125 44.78125 28.03125 42.78125 28.03125 40.3125 C 28.03125 37.84375 26.03125 35.84375 23.5625 35.84375 L 22.40625 35.84375 Z M 22.40625 44.78125 "/>\n      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 33.1875 45.84375 L 33.1875 34.78125 C 33.183594 34.476562 33.3125 34.1875 33.542969 33.992188 C 33.769531 33.792969 34.074219 33.703125 34.375 33.75 L 40.625 33.75 C 41.132812 33.839844 41.507812 34.28125 41.507812 34.796875 C 41.507812 35.3125 41.132812 35.753906 40.625 35.84375 L 35.25 35.84375 L 35.25 39.28125 L 39.625 39.28125 C 40.195312 39.28125 40.65625 39.742188 40.65625 40.3125 C 40.65625 40.882812 40.195312 41.34375 39.625 41.34375 L 35.25 41.34375 L 35.25 45.84375 C 35.257812 46.359375 34.882812 46.796875 34.375 46.875 C 34.074219 46.921875 33.769531 46.832031 33.542969 46.632812 C 33.3125 46.4375 33.183594 46.148438 33.1875 45.84375 Z M 33.1875 45.84375 "/>\n      </g>' }, defaultIcon: { extension: ".default", path: '<g id="surface1">\n      <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 3.117188 44.777344 C 1.394531 44.777344 0 43.386719 0 41.671875 L 0 3.484375 C 0 1.769531 1.394531 0.378906 3.117188 0.378906 L 25.792969 0.378906 C 27.164062 0.304688 28.5 0.808594 29.480469 1.765625 L 37.980469 10.230469 C 39.144531 11.242188 39.769531 12.730469 39.683594 14.265625 L 39.683594 41.671875 C 39.683594 43.386719 38.289062 44.777344 36.5625 44.777344 Z M 25.511719 3.203125 L 3.117188 3.203125 C 2.960938 3.203125 2.832031 3.328125 2.832031 3.484375 L 2.832031 41.671875 C 2.832031 41.828125 2.960938 41.957031 3.117188 41.957031 L 36.5625 41.957031 C 36.679688 41.949219 36.785156 41.867188 36.820312 41.757812 L 36.820312 14.492188 L 28.34375 14.492188 C 28.160156 14.539062 27.964844 14.539062 27.777344 14.492188 C 26.480469 14.15625 25.554688 13.007812 25.511719 11.671875 Z M 28.34375 4.640625 L 28.34375 11.671875 C 28.390625 11.683594 28.441406 11.683594 28.488281 11.671875 L 35.402344 11.671875 Z M 28.34375 4.640625 "/>\n      </g>' } }, Object.assign(X.DEFAULTS, { draggableElement: ["table", ".fr-page-break"] }), X.MODULES.dragSelectControls = function(b2) {
        var E2, L2 = b2.$, l2 = {}, r2 = {}, c2 = b2.opts.draggableElement.join(", "), s2 = false;
        function i2(e2) {
          var t = (function v3(e3) {
            var t2 = e3.target, r4 = e3.clientY;
            if ("OL" === t2.tagName || "UL" === t2.tagName) {
              var n3 = L2(t2).find("li"), o4 = null, i4 = Infinity;
              return n3.each(function() {
                var e4 = this.getBoundingClientRect(), t3 = e4.top + e4.height / 2, n4 = Math.abs(r4 - t3);
                n4 < i4 && (i4 = n4, o4 = this);
              }), o4 || t2;
            }
            var a4 = L2(t2).closest("li")[0];
            if (a4) return a4;
            return b2.opts.enter !== X.ENTER_BR ? y2(t2) : t2;
          })(e2), n2 = N2(e2);
          if (b2.opts.enter === X.ENTER_BR && n2) {
            for (var r3 = n2 && n2.previousSibling, o3 = n2 && n2.parentElement; r3 && r3.ELEMENT_NODE !== Node.ELEMENT_NODE; ) r3 = r3.previousSibling;
            (t = r3 || o3) && "BR" !== t.tagName && (t = y2(t));
          }
          if (n2 && b2.el.firstChild.nodeType === Node.TEXT_NODE && b2.el.firstChild === n2 && (b2.el.firstChild.before(b2.doc.createElement("div")), t = b2.el.firstChild), t) {
            var i3 = t.getBoundingClientRect(), a3 = e2.clientY, s3 = parseFloat(L2(t).css("margin-top")) || 0, l3 = parseFloat(L2(t).css("margin-bottom")) || 0, c3 = a3 < i3.top + i3.height / 2, d3 = c3 ? i3.top : i3.bottom, f3 = c3 ? -s3 : l3, p3 = L2(t).is("td, th") ? L2(t) : L2(t).parents("td, th"), u3 = p3.length ? p3 : b2.$el, h3 = parseInt(u3.css("padding")), g3 = d3 - b2.$box.offset().top + b2.helpers.scrollTop() + f3 / 2, C3 = u3.offset().left - b2.$wp.offset().left + h3, m3 = u3.width() - 2 * h3;
            E2 || (E2 = L2(b2.doc.createElement("div")).addClass("fr-selection-drop-indicator").html('<div class="fr-selection-drop-indicator-line"></div>'), b2.$box.append(E2)), b2.opts.iframe && (g3 += b2.$iframe.offset().top - b2.helpers.scrollTop(), C3 += b2.$iframe.offset().left), E2.css({ top: g3 + "px", left: C3, width: m3 + "px" }).attr("data-position", c3 ? "above" : "below").data("target-element", t), E2.show();
          }
        }
        function y2(e2) {
          for (var t = e2; t && t !== b2.$el[0]; ) {
            if (b2.node.isBlock(t)) return t;
            t = t.parentElement;
          }
          return null;
        }
        function d2() {
          l2[b2.id] && !s2 && (l2[b2.id].addClass("fr-selection-handle-inactive"), u2(b2.$el.find(".fr-selection-handle-hover"), "fr-selection-handle-hover"));
        }
        function e() {
          r2[b2.id] && !s2 && (r2[b2.id].addClass("fr-selection-handle-inactive"), (function e2() {
            E2 && (s2 = false, E2.hide(), E2.removeAttr("data-position"), E2.removeData("target-element"));
          })());
        }
        function o2() {
          u2(b2.$el.find(".fr-selection-handle-selected"), "fr-selection-handle-selected fr-selection-handle-hover"), r2[b2.id].addClass("fr-selection-handle-inactive"), d2(), e(), b2.toolbar.enable();
        }
        function f2(e2, t) {
          t.data("instance", b2);
          var n2 = e2.offset().left - b2.$box.offset().left + 16, r3 = e2.offset().top - b2.$box.offset().top - t.outerHeight();
          if (b2.opts.iframe) {
            var o3 = b2.helpers.getPX(b2.$wp.find(".fr-iframe").css("padding-top")), i3 = b2.helpers.getPX(b2.$wp.find(".fr-iframe").css("padding-left"));
            n2 += b2.$iframe.offset().left - b2.helpers.scrollLeft() + i3, r3 += b2.$iframe.offset().top + o3;
          }
          t.css("top", r3), t.css("left", n2);
        }
        function n(e2) {
          if (b2.$el.find(c2).length) {
            var t = b2.doc.elementFromPoint(e2.pageX - b2.win.pageXOffset, e2.pageY - b2.win.pageYOffset), n2 = L2(t);
            !b2.opts.enableTableSelection && n2.closest("table").length || (function s3(e3, t2) {
              var n3 = L2(t2), r3 = b2.$el.find(".fr-selection-handle-hover"), o3 = b2.$el.find(".fr-selection-handle-selected"), i3 = l2[b2.id];
              if (b2.node.isElement(t2) || b2.node.isElement(n3.parents(".fr-view").first().get(0)) || b2.core.sameInstance(n3) || b2.core.sameInstance(n3.parents("div.fr-selection-handle"))) {
                if (!n3.parents(".fr-selection-handle").length) {
                  var a3 = n3.closest(c2).filter(function() {
                    return !(!b2.$el || !b2.$el.length) && b2.$el.get(0).contains(this);
                  });
                  a3.length ? (f2(a3, i3), i3.addClass("fr-selection-handle-active"), u2(i3, "fr-selection-handle-inactive"), u2(r3, "fr-selection-handle-hover"), a3.addClass("fr-selection-handle-hover")) : r3.length && Math.abs(r3.offset().top - e3.pageY) < 5 || i3.hasClass("fr-selection-handle-inactive") || d2();
                }
              } else o3.length || d2();
            })(e2, t);
          }
        }
        function a2() {
          var e2 = b2.$el.find(".fr-selection-handle-selected"), t = r2[b2.id], n2 = "0.01" === t.css("opacity");
          if (e2.length) {
            if (!(function i3(e3) {
              var t2 = b2.$wp.get(0).getBoundingClientRect(), n3 = e3.getBoundingClientRect(), r3 = n3.top, o3 = n3.left;
              b2.opts.iframe && (r3 += b2.$iframe.offset().top, o3 += b2.$iframe.offset().left);
              return r3 >= t2.top && r3 <= t2.bottom && o3 >= t2.left && o3 <= t2.right;
            })(e2.get(0))) return void (n2 || t.css("opacity", 0.01));
            n2 && t.css("opacity", 1), f2(e2, t), d2();
          } else o2();
        }
        function p2(e2) {
          var t, n2, r3 = L2(e2.target);
          n2 = r3.attr("draggable") ? (t = b2.$el.find(".fr-selection-handle-selected"), "Drag ") : (t = b2.$el.find(".fr-selection-handle-hover"), "Select ");
          var o3 = t.length ? t.get(0).tagName.toLowerCase().replace(/\b\w/g, function(e3) {
            return e3.toUpperCase();
          }) : "Element";
          n2 += t.attr("data-title") ? t.attr("data-title") : o3, r3.find("a").attr("title", b2.language.translate(n2));
        }
        function u2(e2, t) {
          var n2 = L2(e2);
          n2.removeClass(t), n2.length && n2.get(0).hasAttribute("class") && !n2.attr("class").trim() && n2.removeAttr("class");
        }
        function h2() {
          var e2 = b2.$el.find(".fr-selection-handle-selected");
          if (e2.length) {
            var t = b2.doc.createRange();
            b2.selection.get().removeAllRanges();
            var n2 = e2.get(0);
            t.selectNode(n2);
            var r3 = n2.previousSibling, o3 = n2.nextSibling;
            if (r3 && r3.nodeType == Node.ELEMENT_NODE && !r3.hasAttribute("contenteditable") && L2(n2).hasClass("fr-page-break")) {
              r3.setAttribute("contenteditable", "false"), n2.setAttribute("contenteditable", "true");
              var i3 = o3 && b2.node.isEmpty(o3);
              i3 && o3.setAttribute("contenteditable", "false"), b2.selection.get().addRange(t), r3.removeAttribute("contenteditable"), i3 && o3.removeAttribute("contenteditable"), n2.setAttribute("contenteditable", "false");
            } else b2.selection.get().addRange(t);
          }
        }
        function g2() {
          var e2 = b2.$el.find(".fr-selection-handle-hover"), t = b2.$el.find(".fr-selection-handle-selected");
          e2.length && (u2(t, "fr-selection-handle-selected"), l2[b2.id].addClass("fr-selection-handle-inactive"), r2[b2.id].removeClass("fr-selection-handle-inactive"), f2(e2, r2[b2.id]), e2.addClass("fr-selection-handle-selected"), u2(e2, "fr-selection-handle-hover"), t = e2), h2(), a2(), p2({ target: r2[b2.id].get(0) }), t.hasClass("fr-page-break") && b2.toolbar.disable();
        }
        function C2(e2) {
          var t = b2.$el.find(".fr-selection-handle-selected");
          if (b2.$el.find(".fr-element-draggable").removeClass("fr-element-draggable"), t && t.length) {
            s2 = true;
            var n2 = t.clone(true).removeClass("fr-selection-handle-selected fr-element-draggable"), r3 = n2[0].outerHTML, o3 = n2.text().trim();
            e2.originalEvent.dataTransfer.setDragImage(t[0], 10, 10), e2.originalEvent.dataTransfer.setData("text/html", r3), e2.originalEvent.dataTransfer.setData("text/plain", o3);
            var i3 = new Blob([r3], { type: "text/html" }), a3 = URL.createObjectURL(i3);
            e2.originalEvent.dataTransfer.setData("text/uri-list", a3), e2.originalEvent.dataTransfer.setData("DownloadURL", "text/html:el.html:".concat(a3)), e2.originalEvent.dataTransfer.effectAllowed = "Move", t.addClass("fr-element-draggable"), setTimeout(function() {
              return URL.revokeObjectURL(a3);
            }, 5e3);
          }
        }
        function N2(e2) {
          if ("undefined" != typeof b2.doc.caretRangeFromPoint) {
            var t = b2.doc.caretRangeFromPoint(e2.clientX, e2.clientY);
            return t && t.commonAncestorContainer;
          }
          if ("undefined" != typeof b2.doc.caretPositionFromPoint) {
            var n2 = b2.doc.caretPositionFromPoint(e2.clientX, e2.clientY);
            return n2 && n2.offsetNode;
          }
        }
        function m2(e2) {
          if (s2) {
            e2.preventDefault(), e2.stopPropagation();
            var t = b2.$el.find(".fr-selection-handle-selected"), n2 = e2.target, r3 = N2(e2);
            r3 && b2.el.firstChild === r3 && i2(e2.originalEvent);
            var o3 = y2(r3);
            if (t.is(n2) || t.contains(n2) || o3 && t.hasClass("fr-page-break") && L2(o3).parents("table").length || o3 && L2(o3).hasClass("fr-page-break") || L2(o3).parents(".fr-page-break").length) return E2 && E2.hide(), void t.addClass("fr-not-dropzone");
            b2.opts.enter !== X.ENTER_BR && r3 && (r3.nodeType === Node.TEXT_NODE && r3.parentElement === b2.el || r3.nodeType === Node.ELEMENT_NODE && r3 === b2.el) ? t.addClass("fr-not-dropzone") : t.removeClass("fr-not-dropzone"), i2(e2.originalEvent);
          }
        }
        function v2(e2) {
          var t = b2.$el.find(".fr-element-draggable"), n2 = t.hasClass("fr-not-dropzone");
          if (e2 = e2.originalEvent, s2 = false, o2(), t.hasClass("fr-page-break")) return true;
          e2 && e2.dataTransfer && "none" !== e2.dataTransfer.dropEffect && !n2 ? t.remove() : t.removeClass("fr-element-draggable");
        }
        function T2(e2) {
          var t = e2.which, n2 = e2.ctrlKey || e2.metaKey || t === X.KEYCODE.SHIFT;
          if (!b2.$el.find(".fr-page-break.fr-selection-handle-selected").length || b2.keys.isArrow(e2.which) || n2) {
            var r3 = t === X.KEYCODE.DELETE || t === X.KEYCODE.BACKSPACE;
            n2 && !r3 || o2();
          }
        }
        return { _init: function S2() {
          if (!b2.$wp || l2[b2.id] && r2[b2.id]) return false;
          l2[b2.id] = L2(document.createElement("div")).attr("class", "fr-selection-handle fr-selection-handle-active fr-selection-handle-inactive").html('<a role="button" tabIndex="-1">'.concat(b2.icon.create("selectorHoverIcon"), "</a>")), b2.$box.append(l2[b2.id]), r2[b2.id] = L2(document.createElement("div")).attr("class", "fr-selection-handle fr-selection-handle-active-selected fr-selection-handle-inactive").attr("draggable", true).html('<a role="button" tabIndex="-1">'.concat(b2.icon.create("selectedDragIcon"), "</a>")), b2.$box.append(r2[b2.id]), b2.events.$on(b2.$win, "mouseup", n), b2.helpers.isMobile() || b2.events.$on(b2.$win, "mousemove", n), b2.events.$on(l2[b2.id], "mouseover", p2), b2.events.$on(r2[b2.id], "mouseover", p2), b2.events.$on(l2[b2.id], "click", g2), b2.events.$on(r2[b2.id], "click", function() {
            b2.$el.find(".fr-page-break.fr-selection-handle-selected").length && b2.toolbar.disable(), h2();
          }), b2.events.$on(L2(b2.o_win), "resize scroll", a2), b2.events.$on(b2.$wp, "resize scroll", a2), b2.events.$on(b2.$wp, "keydown", T2), b2.events.on("keydown", T2), b2.events.on("drop, contentChanged, mousedown, cut, mouseup", o2), b2.events.$on(r2[b2.id], "dragstart", C2), b2.events.$on(r2[b2.id], "dragend", v2), b2.events.on("dragover", m2), b2.events.on("commands.undo commands.redo commands.before paste.after", function(e3) {
            var t2 = b2.$el.find(".fr-selection-handle-selected");
            t2.length && "TABLE" === t2[0].tagName && b2.table.placeCursorInFirstCell(t2), /^(align|html)/.test(e3) || o2();
          });
          var e2 = null, t = null;
          b2.events.on("snapshot.before", function() {
            t = b2.$el.find(".fr-selection-handle-hover"), e2 = b2.$el.find(".fr-selection-handle-selected"), u2(t, "fr-selection-handle-hover"), u2(e2, "fr-selection-handle-selected");
          }), b2.events.on("snapshot.after", function() {
            e2 && e2.addClass("fr-selection-handle-selected"), t && t.addClass("fr-selection-handle-hover");
          }), b2.events.on("destroy", function() {
            o2(), l2[b2.id] = null, r2[b2.id] = null, E2 && E2.remove();
          });
        } };
      }, X.DefineIcon("selectorHoverIcon", { template: "svgMultiplePath", VIEWBOX: "1 1 14 14", PATHS: '<mask id="mask0_85_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16"><rect width="16" height="16" fill="white"/></mask>\n          <g mask="url(#mask0_85_21)"><path d="M3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V10H3.33333V12.6667H6V14H3.33333ZM10 \n          14V12.6667H12.6667V10H14V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H10ZM2 6V3.33333C2 2.96667 2.13056 2.65278 2.39167 \n          2.39167C2.65278 2.13056 2.96667 2 3.33333 2H6V3.33333H3.33333V6H2ZM12.6667 6V3.33333H10V2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 \n          14 3.33333V6H12.6667Z" fill="white"/> <rect opacity="0.4" x="4" y="4" width="8" height="8" fill="white"/></g>' }), X.DefineIcon("selectedDragIcon", { template: "svgMultiplePath", VIEWBOX: "1 1 14 14", PATHS: '<mask id="mask0_85_22" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16"><rect width="16" height="16" fill="white"/></mask>\n          <g mask="url(#mask0_85_22)"><path d="M3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V10H3.33333V12.6667H6V14H3.33333ZM10 \n          14V12.6667H12.6667V10H14V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H10ZM2 6V3.33333C2 2.96667 2.13056 2.65278 2.39167 \n          2.39167C2.65278 2.13056 2.96667 2 3.33333 2H6V3.33333H3.33333V6H2ZM12.6667 6V3.33333H10V2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 \n          14 3.33333V6H12.6667Z" fill="white"/> <rect opacity="0.4" x="4" y="4" width="8" height="8" fill="white"/></g>' }), Object.assign(X.DEFAULTS, { height: null, heightMax: null, heightMin: null, width: null }), X.MODULES.size = function(r2) {
        function e() {
          o2(), r2.opts.height && r2.$el.css("minHeight", r2.opts.height - r2.helpers.getPX(r2.$el.css("padding-top")) - r2.helpers.getPX(r2.$el.css("padding-bottom")));
          var e2 = false;
          if (r2.opts.fullPage) {
            for (var t = r2.$el.find("span,p,div"), n = 0; n < t.length; n++) if (t[n].style.height && t[n].style.height.includes("vh")) {
              e2 = true;
              break;
            }
          }
          r2.opts.fullPage && e2 && (r2.opts.heightMin && r2.$iframe.css("minHeight", r2.opts.heightMin), r2.opts.heightMax && r2.$iframe.css("maxHeight", r2.opts.heightMax), r2.$el.css("overflow-y", "auto")), r2.opts.iframe && r2.markdown && r2.markdown.isEnabled() ? r2.$iframe.height(r2.$wp.parent().outerHeight(true)) : r2.$iframe.height(r2.$el.outerHeight(true));
        }
        function o2() {
          r2.opts.heightMin ? r2.$el.css("minHeight", r2.opts.heightMin) : r2.$el.css("minHeight", ""), r2.opts.heightMax ? (r2.$wp.css("maxHeight", r2.opts.heightMax), r2.$wp.css("overflow", "auto")) : (r2.$wp.css("maxHeight", ""), r2.$wp.css("overflow", "")), r2.opts.height ? (r2.$wp.css("height", r2.opts.height), r2.$wp.css("overflow", "auto"), r2.$el.css("minHeight", r2.opts.height - r2.helpers.getPX(r2.$el.css("padding-top")) - r2.helpers.getPX(r2.$el.css("padding-bottom")))) : (r2.$wp.css("height", ""), r2.opts.heightMin || r2.$el.css("minHeight", ""), r2.opts.heightMax || r2.$wp.css("overflow", "")), r2.opts.width && r2.$box.width(r2.opts.width);
        }
        return { _init: function t() {
          if (!r2.$wp) return false;
          o2(), r2.$iframe && (r2.events.on("keyup keydown", function() {
            setTimeout(e, 0);
          }, true), r2.events.on("commands.after html.set init initialized paste.after", e));
        }, syncIframe: e, refresh: o2 };
      }, Object.assign(X.DEFAULTS, { documentReady: false, editorClass: null, typingTimer: 500, iframe: false, requestWithCORS: true, requestWithCredentials: false, requestHeaders: {}, useClasses: true, spellcheck: true, iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:20px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}', iframeStyle: "", iframeStyleFiles: [], direction: "auto", zIndex: 1, tabIndex: null, disableRightClick: false, scrollableContainer: "body", keepFormatOnDelete: false, theme: null }), X.MODULES.core = function(l2) {
        var c2 = l2.$;
        function n() {
          if (l2.$box.addClass("fr-box".concat(l2.opts.editorClass ? " ".concat(l2.opts.editorClass) : "")), l2.$box.attr("role", "application"), l2.$wp.addClass("fr-wrapper"), l2.opts.documentReady && l2.$box.addClass("fr-document"), (function a2() {
            l2.opts.iframe || l2.$el.addClass("fr-element fr-view"), (l2.opts.height && l2.opts.height < window.innerHeight || l2.opts.heightMax && l2.opts.heightMax < window.innerHeight) && l2.$el.addClass("fr-element-scroll-visible");
          })(), l2.opts.iframe) {
            l2.$iframe.addClass("fr-iframe"), l2.$el.addClass("fr-view");
            for (var e = 0; e < l2.o_doc.styleSheets.length; e++) {
              var t = void 0, n2 = false;
              try {
                t = l2.o_doc.styleSheets[e].cssRules;
              } catch (s2) {
              }
              if (l2.o_doc.styleSheets[e].href && (-1 < l2.o_doc.styleSheets[e].href.indexOf("codemirror") || -1 < l2.o_doc.styleSheets[e].href.indexOf("font-awesome")) && (n2 = !(t = null)), t) for (var r2 = 0, o2 = t.length; r2 < o2; r2++) if (!t[r2].selectorText || 0 !== t[r2].selectorText.indexOf(".fr-view") && 0 !== t[r2].selectorText.indexOf(".fr-element") && 0 !== t[r2].selectorText.indexOf(".fr-box.fr-basic .fr-element") && 0 !== t[r2].selectorText.indexOf(".fr-markdown-view") && 0 !== t[r2].selectorText.indexOf(".fr-markdown-editor") && 0 !== t[r2].selectorText.indexOf(".fr-wrapper-markdown") && 0 !== t[r2].selectorText.indexOf(".gutter-horizontal") && 0 !== t[r2].selectorText.indexOf(".e-resize-handler") && 0 !== t[r2].selectorText.indexOf(".fr-find-replace-highlight") && 0 !== t[r2].selectorText.indexOf(".fr-find-replace-current-highlight")) try {
                n2 && l2.o_doc.styleSheets[e].href && t[r2].selectorText && (l2.opts.iframeStyle += "".concat(t[r2].selectorText, "{").concat(t[r2].style.cssText, "}"), n2 = false);
              } catch (s2) {
              }
              else 0 < t[r2].style.cssText.length && (0 === t[r2].selectorText.indexOf(".fr-box.fr-basic .fr-element") && (l2.opts.iframeStyle += "".concat(t[r2].selectorText, "{").concat(t[r2].style.cssText, "}")), 0 === t[r2].selectorText.indexOf(".fr-view") ? l2.opts.iframeStyle += "".concat(t[r2].selectorText.replace(/\.fr-view/g, "body"), "{").concat(t[r2].style.cssText, "}") : l2.opts.iframeStyle += "".concat(t[r2].selectorText.replace(/\.fr-element/g, "body"), "{").concat(t[r2].style.cssText, "}"));
              else if (l2.o_doc.styleSheets[e].href && (-1 < l2.o_doc.styleSheets[e].href.indexOf("codemirror") || -1 < l2.o_doc.styleSheets[e].href.indexOf("font-awesome") || -1 < l2.o_doc.styleSheets[e].href.indexOf("froala-editor"))) {
                var i2 = c2("<link rel='stylesheet' type='text/css' href='".concat(l2.o_doc.styleSheets[e].href, "'>"));
                l2.$head.append(i2);
              }
            }
          }
          "auto" !== l2.opts.direction && l2.$box.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(l2.opts.direction)), l2.$el.attr("dir", l2.opts.direction), l2.$wp.attr("dir", l2.opts.direction), 1 < l2.opts.zIndex && l2.$box.css("z-index", l2.opts.zIndex), l2.opts.theme && l2.$box.addClass("".concat(l2.opts.theme, "-theme")), l2.opts.tabIndex = l2.opts.tabIndex || l2.$oel.attr("tabIndex"), l2.opts.tabIndex && l2.$el.attr("tabIndex", l2.opts.tabIndex);
        }
        return { _init: function r2() {
          if (X.INSTANCES.push(l2), (function e() {
            l2.drag_support = { filereader: "undefined" != typeof FileReader, formdata: Boolean(l2.win.FormData), progress: "upload" in new XMLHttpRequest() };
          })(), l2.$wp) {
            n(), l2.html.set(l2._original_html), l2.$el.attr("spellcheck", l2.opts.spellcheck), l2.helpers.isMobile() && (l2.$el.attr("autocomplete", l2.opts.spellcheck ? "on" : "off"), l2.$el.attr("autocorrect", l2.opts.spellcheck ? "on" : "off"), l2.$el.attr("autocapitalize", l2.opts.spellcheck ? "on" : "off")), l2.opts.disableRightClick && l2.events.$on(l2.$el, "contextmenu", function(e) {
              if (2 === e.button) return e.preventDefault(), e.stopPropagation(), false;
            });
            try {
              l2.doc.execCommand("styleWithCSS", false, false);
            } catch (t) {
            }
          }
          "TEXTAREA" === l2.$oel.get(0).tagName && (l2.events.on("contentChanged", function() {
            l2.$oel.val(l2.html.get());
          }), l2.events.on("form.submit", function() {
            l2.$oel.val(l2.html.get());
          }), l2.events.on("form.reset", function() {
            l2.html.set(l2._original_html);
          }), l2.$oel.val(l2.html.get())), l2.helpers.isIOS() && l2.events.$on(l2.$doc, "selectionchange", function() {
            l2.$doc.get(0).hasFocus() || l2.$win.get(0).focus();
          }), l2.events.trigger("init"), l2.opts.autofocus && !l2.opts.initOnClick && l2.$wp && l2.events.on("initialized", function() {
            l2.events.focus(true);
          });
        }, destroy: function t(e) {
          "TEXTAREA" === l2.$oel.get(0).tagName && l2.$oel.val(e), l2.$box && l2.$box.removeAttr("role"), l2.$wp && ("TEXTAREA" === l2.$oel.get(0).tagName ? (l2.$el.html(""), l2.$wp.html(""), l2.$box.replaceWith(l2.$oel), l2.$oel.show()) : (l2.$wp.replaceWith(e), l2.$el.html(""), l2.$box.removeClass("fr-view fr-ltr fr-box ".concat(l2.opts.editorClass || "")), l2.opts.theme && l2.$box.addClass("".concat(l2.opts.theme, "-theme")))), this.$wp = null, this.$el = null, this.el = null, this.$box = null;
        }, isEmpty: function e() {
          return l2.node.isEmpty(l2.el);
        }, getXHR: function o2(e, t) {
          var n2 = new XMLHttpRequest();
          for (var r2 in n2.open(t, e, true), l2.opts.requestWithCredentials && (n2.withCredentials = true), l2.opts.requestHeaders) Object.prototype.hasOwnProperty.call(l2.opts.requestHeaders, r2) && n2.setRequestHeader(r2, l2.opts.requestHeaders[r2]);
          return n2;
        }, injectStyle: function i2(e) {
          if (l2.opts.iframe) {
            l2.$head.find("style[data-fr-style], link[data-fr-style]").remove(), l2.$head.append('<style data-fr-style="true">'.concat(e, "</style>"));
            for (var t = 0; t < l2.opts.iframeStyleFiles.length; t++) {
              var n2 = c2('<link data-fr-style="true" rel="stylesheet" href="'.concat(l2.opts.iframeStyleFiles[t], '">'));
              n2.get(0).addEventListener("load", l2.size.syncIframe), l2.$head.append(n2);
            }
          }
        }, hasFocus: function a2() {
          return l2.browser.mozilla && l2.helpers.isMobile() ? l2.selection.inEditor() : l2.node.hasFocus(l2.el) || 0 < l2.$el.find("*:focus").length;
        }, sameInstance: function s2(e) {
          if (!e) return false;
          var t = e.data("instance");
          return !!t && t.id === l2.id;
        } };
      }, X.POPUP_TEMPLATES = { "text.edit": "[_EDIT_]" }, X.RegisterTemplate = function(e, t) {
        X.POPUP_TEMPLATES[e] = t;
      }, X.MODULES.popups = function(u2) {
        var r2, d2 = u2.$;
        u2.shared.popups || (u2.shared.popups = {});
        var h2, g2 = u2.shared.popups;
        function C2(e2, t2) {
          t2.isVisible() || (t2 = u2.$sc), t2.is(g2[e2].data("container")) || (g2[e2].data("container", t2), t2.append(g2[e2]));
        }
        function o2(e2) {
          var t2;
          e2.find(".fr-upload-progress").addClass("fr-height-set"), e2.find(".fr-upload-progress").removeClass("fr-height-auto"), u2.popups.get("filesManager.insert").removeClass("fr-height-auto"), e2.find(".fr-files-upload-layer").hasClass("fr-active") && (t2 = 1), e2.find(".fr-files-by-url-layer").hasClass("fr-active") && (t2 = 2), e2.find(".fr-files-embed-layer").hasClass("fr-active") && (t2 = 3), e2.find(".fr-upload-progress-layer").get(0).clientHeight + 10 < e2.find(".fr-upload-progress").get(0).clientHeight && e2.find(".fr-upload-progress").addClass("fr-height-auto"), 400 < e2[0].clientHeight && (e2[0].childNodes[4].style.height = "".concat(e2[0].clientHeight - (e2[0].childNodes[0].clientHeight + e2[0].childNodes[t2].clientHeight) - 80, "px"));
        }
        var i2 = 2e3;
        function a2() {
          d2(this).toggleClass("fr-not-empty", true);
        }
        function s2() {
          var e2 = d2(this);
          e2.toggleClass("fr-not-empty", "" !== e2.val());
        }
        function m2(e2) {
          return g2[e2] && u2.node.hasClass(g2[e2], "fr-active") && u2.core.sameInstance(g2[e2]) || false;
        }
        function v2(e2) {
          for (var t2 in g2) if (Object.prototype.hasOwnProperty.call(g2, t2) && m2(t2) && (void 0 === e2 || g2[t2].data("instance") === e2)) return g2[t2];
          return false;
        }
        function n(e2) {
          var t2 = null;
          if ((t2 = "string" != typeof e2 ? e2 : g2[e2]) && u2.node.hasClass(t2, "fr-do-not-hide") || "filesManager.insert" === e2 && u2.filesManager && u2.filesManager.isChildWindowOpen()) return false;
          if (t2 && u2.node.hasClass(t2, "fr-active") && (t2.removeClass("fr-active fr-above"), u2.events.trigger("popups.hide.".concat(e2)), u2.$tb && (1 < u2.opts.zIndex ? u2.$tb.css("zIndex", u2.opts.zIndex + 1) : u2.$tb.css("zIndex", "")), u2.events.disableBlur(), t2.find("input, textarea, button").each(function() {
            this === this.ownerDocument.activeElement && this.blur();
          }), t2.find("input, textarea").attr("disabled", "disabled"), h2)) for (var n2 = 0; n2 < h2.length; n2++) d2(h2[n2]).removeClass("fr-btn-active-popup");
        }
        function b2(e2) {
          for (var t2 in void 0 === e2 && (e2 = []), g2) Object.prototype.hasOwnProperty.call(g2, t2) && e2.indexOf(t2) < 0 && n(t2);
        }
        function t() {
          u2.shared.exit_flag = true;
        }
        function E2() {
          u2.shared.exit_flag = false;
        }
        function l2() {
          return u2.shared.exit_flag;
        }
        function c2(e2, t2) {
          var n2, r3 = (function c3(e3, t3) {
            var n3 = X.POPUP_TEMPLATES[e3];
            if (!n3) return null;
            for (var r4 in "function" == typeof n3 && (n3 = n3.apply(u2)), t3) Object.prototype.hasOwnProperty.call(t3, r4) && (n3 = n3.replace("[_".concat(r4.toUpperCase(), "_]"), t3[r4]));
            return n3;
          })(e2, t2), o3 = d2(u2.doc.createElement("DIV"));
          if (!r3) return "filesManager.insert" === e2 ? o3.addClass("fr-popup fr-files-manager fr-empty") : o3.addClass("fr-popup fr-empty"), (n2 = d2("body").first()).append(o3), o3.data("container", n2), g2[e2] = o3;
          "filesManager.insert" === e2 ? o3.addClass("fr-popup fr-files-manager".concat(u2.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(u2.opts.toolbarInline ? " fr-inline" : "")) : o3.addClass("fr-popup".concat(u2.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(u2.opts.toolbarInline ? " fr-inline" : "")), o3.html(r3), u2.opts.theme && o3.addClass("".concat(u2.opts.theme, "-theme")), 1 < u2.opts.zIndex && (!u2.opts.editInPopup && u2.$tb ? u2.$tb.css("z-index", u2.opts.zIndex + 2) : o3.css("z-index", u2.opts.zIndex + 2)), "auto" !== u2.opts.direction && o3.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(u2.opts.direction)), o3.find("input, textarea").attr("dir", u2.opts.direction).attr("disabled", "disabled"), (n2 = d2("body").first()).append(o3), o3.data("container", n2);
          var i3 = (g2[e2] = o3).find(".fr-color-hex-layer");
          if (0 < i3.length) {
            var a3 = u2.helpers.getPX(o3.find(".fr-color-set > span").css("width")), s3 = u2.helpers.getPX(i3.css("paddingLeft")), l3 = u2.helpers.getPX(i3.css("paddingRight"));
            i3.css("width", a3 * u2.opts.colorsStep + s3 + l3);
          }
          return u2.button.bindCommands(o3, false), o3;
        }
        function L2(a3) {
          var s3 = g2[a3];
          return { _windowResize: function() {
            var e2 = s3.data("instance") || u2;
            if (!e2.helpers.isMobile() && s3.isVisible()) {
              var t2 = s3.find(".fr-file-progress-bar-layer");
              if ("file.insert" === a3 && 0 < t2.length && t2.hasClass("fr-active")) {
                var n2 = u2.$tb.find('.fr-command[data-cmd="insertFile"]');
                e2.events.disableBlur();
                var r3 = u2.button.getPosition(n2), o3 = r3.left, i3 = r3.top;
                u2.position.at(o3, i3, g2[a3], 0), e2.events.enableBlur();
              } else e2.events.disableBlur(), e2.popups.hide(a3), e2.events.enableBlur();
            }
          }, _inputFocus: function(e2) {
            var t2 = s3.data("instance") || u2, n2 = d2(e2.currentTarget);
            if (n2.is("input:file") && n2.closest(".fr-layer").addClass("fr-input-focus"), e2.preventDefault(), e2.stopPropagation(), setTimeout(function() {
              t2.events.enableBlur();
            }, 100), t2.helpers.isMobile()) {
              var r3 = d2(t2.o_win).scrollTop();
              setTimeout(function() {
                d2(t2.o_win).scrollTop(r3);
              }, 0);
            }
          }, _inputBlur: function(e2) {
            var t2 = s3.data("instance") || u2, n2 = d2(e2.currentTarget);
            n2.is("input:file") && n2.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement !== this && d2(this).isVisible() && (t2.events.blurActive() && t2.events.trigger("blur"), t2.events.enableBlur());
          }, _editorKeydown: function(e2) {
            var t2 = s3.data("instance") || u2;
            t2.keys.ctrlKey(e2) || e2.which === X.KEYCODE.ALT || e2.which === X.KEYCODE.ESC || (m2(a3) && s3.findVisible(".fr-back").length ? t2.button.exec(s3.findVisible(".fr-back").first()) : e2.which !== X.KEYCODE.ALT && t2.popups.hide(a3));
          }, _preventFocus: function(e2) {
            var t2 = s3.data("instance") || u2, n2 = e2.originalEvent ? e2.originalEvent.target || e2.originalEvent.originalTarget : null;
            "mouseup" === e2.type || d2(n2).is(":focus") || t2.events.disableBlur(), "mouseup" !== e2.type || d2(n2).hasClass("fr-command") || 0 < d2(n2).parents(".fr-command").length || d2(n2).hasClass("fr-dropdown-content") || d2(n2).hasClass("fr-dropdown-menu") || u2.button.hideActiveDropdowns(s3), (u2.browser.safari || u2.browser.mozilla) && "mousedown" === e2.type && d2(n2).is("input[type=file]") && t2.events.disableBlur();
            var r3 = "input, textarea, button, select, label, .fr-command";
            if (n2 && !d2(n2).is(r3) && 0 === d2(n2).parents(r3).length) return e2.stopPropagation(), false;
            n2 && d2(n2).is(r3) && e2.stopPropagation(), E2();
          }, _editorMouseup: function() {
            s3.isVisible() && l2() && 0 < s3.findVisible("input:focus, textarea:focus, button:focus, select:focus").length && u2.events.disableBlur();
          }, _windowMouseup: function(e2) {
            if (!u2.core.sameInstance(s3)) return true;
            var t2 = s3.data("instance") || u2;
            s3.isVisible() && l2() && (e2.stopPropagation(), t2.markers.remove(), t2.popups.hide(a3), E2());
          }, _windowKeydown: function(e2) {
            if (!u2.core.sameInstance(s3)) return true;
            var t2 = s3.data("instance") || u2, n2 = e2.which;
            if (X.KEYCODE.ESC === n2) {
              if (t2.popups.isVisible(a3) && t2.opts.toolbarInline) return e2.stopPropagation(), t2.popups.isVisible(a3) && (s3.findVisible(".fr-back").length ? (t2.button.exec(s3.findVisible(".fr-back").first()), t2.accessibility.focusPopupButton(s3)) : s3.findVisible(".fr-dismiss").length ? t2.button.exec(s3.findVisible(".fr-dismiss").first()) : (t2.popups.hide(a3), t2.toolbar.showInline(null, true), t2.accessibility.focusPopupButton(s3))), false;
              if (t2.popups.isVisible(a3)) return s3.findVisible(".fr-back").length ? (t2.button.exec(s3.findVisible(".fr-back").first), t2.accessibility.focusPopupButton(s3)) : s3.findVisible(".fr-dismiss").length ? t2.button.exec(s3.findVisible(".fr-dismiss").first()) : (t2.popups.hide(a3), t2.accessibility.focusPopupButton(s3)), false;
            }
          }, _repositionPopup: function() {
            if (!u2.opts.height && !u2.opts.heightMax || u2.opts.toolbarInline) return true;
            if (u2.$wp && m2(a3) && s3.parent().get(0) === u2.$sc.get(0)) {
              var e2 = s3.offset().top - u2.$wp.offset().top, t2 = u2.$wp.outerHeight();
              u2.node.hasClass(s3.get(0), "fr-above") && (e2 += s3.outerHeight()), t2 < e2 || e2 < 0 ? s3.addClass("fr-hidden") : s3.removeClass("fr-hidden");
            }
          }, handleWindowClick: function(e2) {
            if (!u2.core.sameInstance(s3)) return true;
            var t2 = s3.data("instance") || u2;
            s3.isVisible() && e2.target && (0 < d2(e2.target).find("body").length || "BODY" === d2(e2.target)[0].tagName) && (e2.stopPropagation(), t2.popups.hide(a3));
          } };
        }
        function f2(e2, t2) {
          u2.events.on("mouseup", e2._editorMouseup, true), u2.$wp && u2.events.on("keydown", e2._editorKeydown), u2.events.on("focus", function() {
            g2[t2].removeClass("focused");
          }), u2.events.on("blur", function() {
            v2() && u2.markers.remove(), u2.helpers.isMobile() ? g2[t2].hasClass("focused") ? (b2(), g2[t2].removeClass("focused")) : g2[t2].addClass("focused") : g2[t2].find("iframe").length || b2();
          }), u2.$wp && !u2.helpers.isMobile() && u2.events.$on(u2.$wp, "scroll.popup".concat(t2), e2._repositionPopup), u2.events.on("window.mouseup", e2._windowMouseup, true), u2.events.on("window.keydown", e2._windowKeydown, true), u2.opts.iframe && window.addEventListener("click", e2.handleWindowClick), g2[t2].data("inst".concat(u2.id), true), u2.events.on("destroy", function() {
            u2.core.sameInstance(g2[t2]) && (d2("body").first().append(g2[t2]), g2[t2].removeClass("fr-active"));
          }, true);
        }
        function p2() {
          var e2 = d2(this).prev().children().first();
          e2.attr("checked", !e2.attr("checked"));
        }
        function e() {
          for (var e2 in g2) if (Object.prototype.hasOwnProperty.call(g2, e2)) {
            var t2 = g2[e2];
            t2 && (t2.html("").removeData().remove(), g2[e2] = null);
          }
          g2 = [];
        }
        return u2.shared.exit_flag = false, { _init: function y2() {
          r2 = window.innerHeight, u2.events.on("shared.destroy", e, true), u2.events.on("window.mousedown", t), u2.events.on("window.touchmove", E2), u2.events.$on(d2(u2.o_win), "scroll", E2), u2.events.on("mousedown", function(e2) {
            v2() && (e2.stopPropagation(), u2.$el.find(".fr-marker").remove(), t(), u2.events.disableBlur());
          });
        }, create: function N2(e2, t2) {
          var n2 = c2(e2, t2), r3 = L2(e2);
          f2(r3, e2), u2.events.$on(n2, "mousedown mouseup touchstart touchend touch", "*", r3._preventFocus, true), u2.events.$on(n2, "focus", "input, textarea, button, select", r3._inputFocus, true), u2.events.$on(n2, "blur", "input, textarea, button, select", r3._inputBlur, true);
          var o3 = n2.find("input, textarea");
          return (function i3(e3) {
            for (var t3 = 0; t3 < e3.length; t3++) {
              var n3 = e3[t3], r4 = d2(n3);
              0 === r4.next().length && r4.attr("placeholder") && (r4.after('<label for="'.concat(r4.attr("id"), '">').concat(r4.attr("placeholder"), "</label>")), r4.attr("placeholder", ""));
            }
          })(o3), u2.events.$on(o3, "focus", a2), u2.events.$on(o3, "blur change", s2), u2.events.$on(n2, "click", ".fr-checkbox + label", p2), u2.accessibility.registerPopup(e2), u2.helpers.isIOS() && u2.events.$on(n2, "touchend", "label", function() {
            d2("#".concat(d2(this).attr("for"))).prop("checked", function(e3, t3) {
              return !t3;
            });
          }, true), u2.events.$on(d2(u2.o_win), "resize", r3._windowResize, true), "filesManager.insert" === e2 && g2["filesManager.insert"].css("zIndex", 2147483641), n2;
        }, get: function T2(e2) {
          var t2 = g2[e2];
          return t2 && !t2.data("inst".concat(u2.id)) && f2(L2(e2), e2), t2;
        }, show: function S2(e2, t2, n2, r3, o3) {
          if (m2(e2) || (v2() && 0 < u2.$el.find(".fr-marker").length ? (u2.events.disableBlur(), u2.selection.restore()) : v2() || (u2.events.disableBlur(), u2.events.focus(), u2.events.enableBlur())), b2([e2]), !g2[e2]) return false;
          var i3 = u2.button.getButtons(".fr-dropdown.fr-active");
          i3.removeClass("fr-active").attr("aria-expanded", false).parents(".fr-toolbar").css("zIndex", "").find("> .fr-dropdown-wrapper").css("height", ""), i3.next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), g2[e2].data("instance", u2), u2.$tb && u2.$tb.data("instance", u2);
          var a3 = m2(e2);
          g2[e2].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
          var s3 = g2[e2].data("container");
          if ((function p3(e3, t3) {
            t3.isVisible() || (t3 = u2.$sc), t3.contains([g2[e3].get(0)]) || t3.append(g2[e3]);
          })(e2, s3), u2.opts.toolbarInline && s3 && u2.$tb && s3.get(0) === u2.$tb.get(0) && (C2(e2, u2.$sc), n2 = u2.$tb.offset().top - u2.helpers.getPX(u2.$tb.css("margin-top")), t2 = u2.$tb.offset().left + u2.$tb.outerWidth() / 2, u2.node.hasClass(u2.$tb.get(0), "fr-above") && n2 && (n2 += u2.$tb.outerHeight()), r3 = 0), s3 = g2[e2].data("container"), u2.opts.iframe && !r3 && !a3) {
            var l3 = u2.helpers.getPX(u2.$wp.find(".fr-iframe").css("padding-top")), c3 = u2.helpers.getPX(u2.$wp.find(".fr-iframe").css("padding-left"));
            t2 && (t2 -= u2.$iframe.offset().left + c3), n2 && (n2 -= u2.$iframe.offset().top + l3);
          }
          s3.is(u2.$tb) ? u2.$tb.css("zIndex", (u2.opts.zIndex || 1) + 4) : g2[e2].css("zIndex", (u2.opts.zIndex || 1) + 3), u2.opts.toolbarBottom && s3 && u2.$tb && s3.get(0) === u2.$tb.get(0) && (g2[e2].addClass("fr-above"), n2 && (n2 -= g2[e2].outerHeight())), o3 && (t2 -= g2[e2].width() / 2), t2 + g2[e2].outerWidth() > u2.$sc.offset().left + u2.$sc.width() && (t2 -= t2 + g2[e2].outerWidth() - u2.$sc.offset().left - u2.$sc.width()), t2 < u2.$sc.offset().left && "rtl" === u2.opts.direction && (t2 = u2.$sc.offset().left), g2[e2].removeClass("fr-active"), u2.position.at(t2, n2, g2[e2], r3 || 0);
          var d3 = u2.node.blockParent(u2.selection.blocks()[0]);
          if (d3 && "false" === d3.getAttribute("contenteditable")) g2[e2].removeClass("fr-active");
          else {
            var f3 = u2.selection.element().parentElement.getAttribute("contenteditable");
            f3 && "false" === f3 ? g2[e2].removeClass("fr-active") : g2[e2].addClass("fr-active");
          }
          a3 || u2.accessibility.focusPopup(g2[e2]), u2.opts.toolbarInline && u2.toolbar.hide(), u2.$tb && (h2 = u2.$tb.find(".fr-btn-active-popup")), u2.events.trigger("popups.show.".concat(e2)), L2(e2)._repositionPopup(), E2();
        }, hide: n, onHide: function A2(e2, t2) {
          u2.events.on("popups.hide.".concat(e2), t2);
        }, hideAll: b2, setContainer: C2, refresh: function M2(e2) {
          g2[e2].data("instance", u2), u2.events.trigger("popups.refresh.".concat(e2));
          for (var t2 = g2[e2].find(".fr-command"), n2 = 0; n2 < t2.length; n2++) {
            var r3 = d2(t2[n2]);
            0 === r3.parents(".fr-dropdown-menu").length && u2.button.refresh(r3);
          }
        }, onRefresh: function x2(e2, t2) {
          u2.events.on("popups.refresh.".concat(e2), t2);
        }, onShow: function O2(e2, t2) {
          u2.events.on("popups.show.".concat(e2), t2);
        }, isVisible: m2, setFileListHeight: o2, areVisible: v2, setPopupDimensions: function w2(e2, t2) {
          t2 && e2.find(".fr-upload-progress-layer").get(0).clientHeight < i2 && (e2.find(".fr-upload-progress").addClass("fr-height-auto"), u2.popups.get("filesManager.insert").addClass("fr-height-auto"), e2.find(".fr-upload-progress").removeClass("fr-height-set"), i2 = 2e3), e2.get(0).clientHeight > window.innerHeight / 2 && (window.innerWidth < 500 ? e2.get(0).clientHeight > 0.6 * r2 && o2(e2) : 400 < e2.get(0).clientHeight && o2(e2), i2 = e2.find(".fr-upload-progress-layer").get(0).clientHeight);
          var n2 = window.innerWidth;
          switch (true) {
            case n2 <= 320:
              e2.width(200);
              break;
            case n2 <= 420:
              e2.width(250);
              break;
            case n2 <= 520:
              e2.width(300);
              break;
            case n2 <= 720:
              e2.width(400);
              break;
            case 720 < n2:
              e2.width(530);
          }
        } };
      }, X.MODULES.accessibility = function(p2) {
        var l2, u2 = p2.$, i2 = true;
        function c2(t2) {
          for (var e2 = p2.$el.find('[contenteditable="true"]'), n2 = false, r2 = 0; e2.get(r2); ) u2(e2.get(r2)).is(":focus") && (n2 = true), r2++;
          if (t2 && t2.length && !n2) {
            t2.data("blur-event-set") || t2.parents(".fr-popup").length || (p2.events.$on(t2, "blur", function() {
              var e3 = t2.parents(".fr-toolbar, .fr-popup").data("instance") || p2;
              e3.events.blurActive() && !p2.core.hasFocus() && e3.events.trigger("blur"), setTimeout(function() {
                e3.events.enableBlur();
              }, 100);
            }, true), t2.data("blur-event-set", true));
            var o3 = t2.parents(".fr-toolbar, .fr-popup").data("instance") || p2;
            if (p2.browser.safari && (!l2 || null == p2.shared.safariSelection)) {
              var i3 = p2.selection.get();
              i3 && 0 < i3.rangeCount ? p2.shared.safariSelection = i3.getRangeAt(0).cloneRange() : p2.shared.safariSelection = null;
            }
            o3.events.disableBlur(), t2.get(0).focus(), p2.shared.$f_el = t2;
          }
        }
        function h2(e2, t2) {
          var n2 = t2 ? "last" : "first", r2 = s2(C2(e2))[n2]();
          if (r2.length) return c2(r2), true;
        }
        function a2(e2) {
          return e2.is("input, textarea, select") && t(), p2.events.disableBlur(), e2.get(0).focus(), true;
        }
        function g2(e2, t2) {
          var n2 = e2.find("input, textarea, button, select, span").filter(function() {
            return u2(this).isVisible();
          }).not(":disabled"), r2 = n2.first();
          if ((n2 = r2.parents(".fr-color-set").get(0) && r2.parents(".fr-popup").get(0) ? n2.filter("input") : t2 ? n2.last() : n2.first()).length) return a2(n2);
          if (p2.shared.with_kb) {
            var o3 = e2.findVisible(".fr-active-item").first();
            if (o3.length) return a2(o3);
            var i3 = e2.findVisible("[tabIndex]").first();
            if (i3.length) return a2(i3);
          }
        }
        function t() {
          0 === p2.$el.find(".fr-marker").length && p2.core.hasFocus() && p2.selection.save();
        }
        function d2() {
          var e2 = p2.popups.areVisible();
          if (e2) {
            var t2 = e2.find(".fr-buttons");
            return t2.find("button:focus, .fr-group span:focus").length ? !h2(e2.data("instance").$tb) : !h2(t2);
          }
          return !h2(p2.$tb);
        }
        function f2() {
          var e2 = null;
          return p2.shared.$f_el.is(".fr-dropdown.fr-active") ? e2 = p2.shared.$f_el : p2.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e2 = p2.shared.$f_el.closest(".fr-dropdown-menu").prev()), e2;
        }
        function s2(e2) {
          for (var t2 = -1, n2 = 0; n2 < e2.length; n2++) u2(e2[n2]).hasClass("fr-open") && (t2 = n2);
          var r2 = e2.index(p2.$tb.find(".fr-more-toolbar.fr-expanded > button.fr-command").first());
          if (0 < r2 && -1 !== t2) {
            var o3 = e2.slice(r2, e2.length), i3 = (e2 = e2.slice(0, r2)).slice(0, t2 + 1), a3 = e2.slice(t2 + 1, e2.length);
            e2 = i3;
            for (var s3 = 0; s3 < o3.length; s3++) e2.push(o3[s3]);
            for (var l3 = 0; l3 < a3.length; l3++) e2.push(a3[l3]);
          }
          return e2;
        }
        function C2(e2) {
          return e2.findVisible("button:not(.fr-disabled), .fr-group span.fr-command").filter(function(e3) {
            var t2 = u2(e3).parents(".fr-more-toolbar");
            return 0 === t2.length || 0 < t2.length && t2.hasClass("fr-expanded");
          });
        }
        function n(e2, t2, n2) {
          if (p2.shared.$f_el) {
            var r2 = f2();
            r2 && (p2.button.click(r2), p2.shared.$f_el = r2);
            var o3 = s2(C2(e2)), i3 = o3.index(p2.shared.$f_el);
            if (0 === i3 && !n2 || i3 === o3.length - 1 && n2) {
              var a3;
              if (t2) {
                if (e2.parent().is(".fr-popup")) a3 = !g2(e2.parent().children().not(".fr-buttons"), !n2);
                false === a3 && (p2.shared.$f_el = null);
              }
              t2 && false === a3 || h2(e2, !n2);
            } else c2(u2(o3.get(i3 + (n2 ? 1 : -1))));
            return false;
          }
        }
        function m2(e2, t2) {
          return n(e2, t2, true);
        }
        function v2(e2, t2) {
          return n(e2, t2);
        }
        function b2(e2) {
          if (p2.shared.$f_el) {
            var t2;
            if (p2.shared.$f_el.is(".fr-dropdown.fr-active")) return c2(t2 = e2 ? p2.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : p2.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), false;
            if (p2.shared.$f_el.is("a.fr-command")) return (t2 = e2 ? p2.shared.$f_el.closest("li").nextAllVisible().first().find(".fr-command:not(.fr-disabled)").first() : p2.shared.$f_el.closest("li").prevAllVisible().first().find(".fr-command:not(.fr-disabled)").first()).length || (t2 = e2 ? p2.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : p2.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), c2(t2), false;
          }
        }
        function E2() {
          if (p2.shared.$f_el) {
            if (p2.shared.$f_el.hasClass("fr-dropdown")) p2.button.click(p2.shared.$f_el);
            else if (p2.shared.$f_el.is("button.fr-back")) {
              p2.opts.toolbarInline && (p2.events.disableBlur(), p2.events.focus());
              var e2 = p2.popups.areVisible(p2);
              e2 && (p2.shared.with_kb = false), p2.button.click(p2.shared.$f_el), y2(e2);
            } else {
              if (p2.events.disableBlur(), p2.button.click(p2.shared.$f_el), p2.shared.$f_el.attr("data-group-name")) {
                var t2 = p2.$tb.find('.fr-more-toolbar[data-name="'.concat(p2.shared.$f_el.attr("data-group-name"), '"]')), n2 = p2.shared.$f_el;
                t2.hasClass("fr-expanded") && (n2 = t2.findVisible("button:not(.fr-disabled)").first()), n2 && c2(n2);
              } else if (p2.shared.$f_el.attr("data-popup")) {
                var r2 = p2.popups.areVisible(p2);
                r2 && r2.data("popup-button", p2.shared.$f_el);
              } else if (p2.shared.$f_el.attr("data-modal")) {
                var o3 = p2.modals.areVisible(p2);
                o3 && o3.data("modal-button", p2.shared.$f_el);
              }
              p2.shared.$f_el = null;
            }
            return false;
          }
        }
        function L2() {
          if (p2.shared.$f_el && (p2.events.disableBlur(), p2.shared.$f_el.blur(), p2.shared.$f_el = null), false !== p2.events.trigger("toolbar.focusEditor") && (p2.events.disableBlur(), p2.$el.get(0).focus(), p2.events.focus(), p2.browser.safari && p2.shared.safariSelection)) {
            var e2 = p2.shared.safariSelection, t2 = e2.startContainer, n2 = e2.endContainer, r2 = e2.startOffset, o3 = e2.endOffset, i3 = p2.doc.createRange();
            i3.setStart(t2, r2), i3.setEnd(n2, o3), p2.selection.get().removeAllRanges(), p2.selection.get().addRange(i3), p2.shared.safariSelection = null;
          }
        }
        function o2(r2) {
          r2 && r2.length && (p2.events.$on(r2, "keydown", function(e2) {
            if (!u2(e2.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return true;
            var t2 = r2.parents(".fr-popup").data("instance") || r2.data("instance") || p2;
            p2.shared.with_kb = true;
            var n2 = t2.accessibility.exec(e2, r2);
            return p2.shared.with_kb = false, n2;
          }, true), p2.events.$on(r2, "mouseenter", "[tabIndex]", function(e2) {
            var t2 = r2.parents(".fr-popup").data("instance") || r2.data("instance") || p2;
            if (!i2) return e2.stopPropagation(), void e2.preventDefault();
            var n2 = u2(e2.currentTarget);
            t2.shared.$f_el && t2.shared.$f_el.not(n2) && t2.accessibility.focusEditor();
          }, true), p2.$tb && p2.events.$on(p2.$tb, "transitionend", ".fr-more-toolbar", function() {
            p2.shared.$f_el = u2(document.activeElement);
          }));
        }
        function y2(e2) {
          var t2 = e2.data("popup-button");
          t2 && setTimeout(function() {
            c2(t2), e2.data("popup-button", null);
          }, 0);
        }
        function N2(e2) {
          var t2 = p2.popups.areVisible(e2);
          t2 && t2.data("popup-button", null);
        }
        function e(e2) {
          var t2 = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e2.metaKey : e2.ctrlKey;
          if (e2.which !== X.KEYCODE.F10 || t2 || e2.shiftKey || !e2.altKey) return true;
          p2.shared.with_kb = true;
          var n2 = p2.popups.areVisible(p2), r2 = false;
          return n2 && (r2 = g2(n2.children().not(".fr-buttons"))), r2 || d2(), p2.shared.with_kb = false, e2.preventDefault(), e2.stopPropagation(), false;
        }
        return { _init: function r2() {
          p2.$wp ? p2.events.on("keydown", e, true) : p2.events.$on(p2.$win, "keydown", e, true), p2.events.on("mousedown", function(e2) {
            N2(p2), p2.shared.$f_el && p2.el.isSameNode(p2.shared.$f_el[0]) && (p2.accessibility.restoreSelection(), e2.stopPropagation(), p2.events.disableBlur(), p2.shared.$f_el = null);
          }, true), p2.events.on("blur", function() {
            p2.shared.$f_el = null, N2(p2);
          }, true);
        }, registerPopup: function T2(e2) {
          var t2 = p2.popups.get(e2), n2 = (function r2(d3) {
            var f3 = p2.popups.get(d3);
            return { _tiKeydown: function(e3) {
              var t3 = f3.data("instance") || p2;
              if (false === t3.events.trigger("popup.tab", [e3])) return false;
              var n3 = e3.which, r3 = f3.find(":focus").first();
              if (X.KEYCODE.TAB === n3) {
                e3.preventDefault();
                var o3 = f3.children().not(".fr-buttons"), i3 = o3.findVisible("input, textarea, button, select").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(), a3 = i3.indexOf(this) + (e3.shiftKey ? -1 : 1);
                if (0 <= a3 && a3 < i3.length) return t3.events.disableBlur(), u2(i3[a3]).focus(), e3.stopPropagation(), false;
                var s3 = f3.find(".fr-buttons");
                if (s3.length && h2(s3, Boolean(e3.shiftKey))) return e3.stopPropagation(), false;
                if (g2(o3)) return e3.stopPropagation(), false;
              } else {
                if (X.KEYCODE.ENTER !== n3 || !e3.target || "TEXTAREA" === e3.target.tagName) return X.KEYCODE.ESC === n3 ? (e3.preventDefault(), e3.stopPropagation(), t3.accessibility.restoreSelection(), t3.popups.isVisible(d3) && f3.findVisible(".fr-back").length ? (t3.opts.toolbarInline && (t3.events.disableBlur(), t3.events.focus()), t3.button.exec(f3.findVisible(".fr-back").first()), y2(f3)) : t3.popups.isVisible(d3) && f3.findVisible(".fr-dismiss").length ? t3.button.exec(f3.findVisible(".fr-dismiss").first()) : (t3.popups.hide(d3), t3.opts.toolbarInline && t3.toolbar.showInline(null, true), y2(f3)), false) : X.KEYCODE.SPACE === n3 && (r3.is(".fr-submit") || r3.is(".fr-dismiss") || r3.is(".fr-enable-accessibility")) ? (e3.preventDefault(), e3.stopPropagation(), t3.events.disableBlur(), t3.button.exec(r3), true) : t3.keys.isBrowserAction(e3) ? void e3.stopPropagation() : r3.is("input[type=text], textarea") ? void e3.stopPropagation() : X.KEYCODE.SPACE === n3 && (r3.is(".fr-link-attr") || r3.is("input[type=file]")) ? void e3.stopPropagation() : (e3.stopPropagation(), e3.preventDefault(), false);
                var l3 = null;
                if (0 < f3.findVisible(".fr-submit").length ? l3 = f3.findVisible(".fr-submit").first() : f3.findVisible(".fr-dismiss").length && (l3 = f3.findVisible(".fr-dismiss").first()), !l3 && 0 < f3.findVisible(".fr-enable-accessibility").length) {
                  var c3 = f3.findVisible(".fr-enable-accessibility:focus");
                  0 < c3.length && (l3 = c3);
                }
                l3 && (e3.preventDefault(), e3.stopPropagation(), t3.events.disableBlur(), t3.button.exec(l3));
              }
            }, _tiMouseenter: function() {
              var e3 = f3.data("instance") || p2;
              N2(e3);
            } };
          })(e2);
          o2(t2.find(".fr-buttons")), p2.events.$on(t2, "mouseenter", "tabIndex", n2._tiMouseenter, true), p2.events.$on(t2.children().not(".fr-buttons"), "keydown", "[tabIndex]", n2._tiKeydown, true), p2.popups.onHide(e2, function() {
            (t2.data("instance") || p2).accessibility.restoreSelection();
          }), p2.popups.onShow(e2, function() {
            i2 = false, setTimeout(function() {
              i2 = true;
            }, 0);
          });
        }, registerToolbar: o2, focusToolbarElement: c2, focusToolbar: h2, focusContent: g2, focusPopup: function S2(r2) {
          var o3 = r2.children().not(".fr-buttons");
          o3.data("mouseenter-event-set") || (p2.events.$on(o3, "mouseenter", "[tabIndex]", function(e2) {
            var t2 = r2.data("instance") || p2;
            if (!i2) return e2.stopPropagation(), void e2.preventDefault();
            var n2 = o3.find(":focus").first();
            n2.length && !n2.is("input, button, textarea, select") && (t2.events.disableBlur(), n2.blur(), t2.events.disableBlur(), t2.events.focus());
          }), o3.data("mouseenter-event-set", true)), !g2(o3) && p2.shared.with_kb && h2(r2.find(".fr-buttons"));
        }, focusModal: function A2(e2) {
          p2.core.hasFocus() || (p2.events.disableBlur(), p2.events.focus()), p2.accessibility.saveSelection(), p2.events.disableBlur(), p2.el.blur(), p2.selection.clear(), p2.events.disableBlur(), p2.shared.with_kb ? e2.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e2.find("[tabIndex]").first().focus();
        }, focusEditor: L2, focusPopupButton: y2, focusModalButton: function M2(e2) {
          var t2 = e2.data("modal-button");
          t2 && setTimeout(function() {
            c2(t2), e2.data("modal-button", null);
          }, 0);
        }, hasFocus: function x2() {
          return null !== p2.shared.$f_el;
        }, exec: function O2(e2, t2) {
          var n2 = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e2.metaKey : e2.ctrlKey, r2 = e2.which, o3 = false;
          return r2 !== X.KEYCODE.TAB || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.ARROW_RIGHT || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.TAB || n2 || !e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.ARROW_LEFT || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.ARROW_UP || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.ARROW_DOWN || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.ENTER && r2 !== X.KEYCODE.SPACE || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.ESC || n2 || e2.shiftKey || e2.altKey ? r2 !== X.KEYCODE.F10 || n2 || e2.shiftKey || !e2.altKey || (o3 = d2()) : o3 = (function i3(e3) {
            if (p2.shared.$f_el) {
              var t3 = f2();
              return t3 ? (p2.button.click(t3), c2(t3)) : e3.parent().findVisible(".fr-back").length ? (p2.shared.with_kb = false, p2.opts.toolbarInline && (p2.events.disableBlur(), p2.events.focus()), p2.button.exec(e3.parent().findVisible(".fr-back")).first(), y2(e3.parent())) : p2.shared.$f_el.is("button, .fr-group span") && (e3.parent().is(".fr-popup") ? (p2.accessibility.restoreSelection(), p2.shared.$f_el = null, false !== p2.events.trigger("toolbar.esc") && (p2.popups.hide(e3.parent()), p2.opts.toolbarInline && p2.toolbar.showInline(null, true), y2(e3.parent()))) : L2()), false;
            }
          })(t2) : o3 = E2() : o3 = (function a3() {
            return p2.shared.$f_el && p2.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? E2() : b2(true);
          })() : o3 = (function s3() {
            return b2();
          })() : o3 = v2(t2) : o3 = v2(t2, true) : o3 = m2(t2) : (l2 = r2, o3 = m2(t2, true)), p2.shared.$f_el || void 0 !== o3 || (o3 = true), !o3 && p2.keys.isBrowserAction(e2) && (o3 = true), !!o3 || (e2.preventDefault(), e2.stopPropagation(), false);
        }, saveSelection: t, restoreSelection: function w2() {
          p2.$el.find(".fr-marker").length && (p2.events.disableBlur(), p2.selection.restore(), p2.events.enableBlur());
        } };
      }, Object.assign(X.DEFAULTS, { tooltips: true }), X.MODULES.tooltip = function(p2) {
        var u2 = p2.$;
        function r2() {
          p2.helpers.isMobile() || p2.$tooltip && p2.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed");
        }
        function o2(e, t) {
          if (!p2.helpers.isMobile()) {
            var n = e.attr("id") && e.attr("id").split("-")[0], r3 = e.attr("title"), o3 = p2.opts.trackChangesEnabled, i2 = p2.opts.showChangesEnabled;
            if (p2.opts.toolbarContainer) {
              for (var a2 = false, s2 = 0; s2 < X.INSTANCES.length; s2++) if (X.INSTANCES[s2].core.hasFocus()) {
                o3 = X.INSTANCES[s2].opts.trackChangesEnabled, i2 = X.INSTANCES[s2].opts.showChangesEnabled, a2 = true;
                break;
              }
              a2 || (i2 = o3 = e.hasClass("fr-active"));
            }
            if ("trackChanges" === n) r3 = o3 ? "Disable Track Changes" : "Enable Track Changes";
            else if ("showChanges" === n) r3 = i2 ? "Hide Changes" : "Show Changes";
            else if (("applyAll" === n || "removeAll" === n || "applyLast" === n || "removeLast" === n) && 0 === p2.track_changes.getPendingChanges().length) return;
            if (e.data("title", r3), e.data("title")) {
              p2.$tooltip || (function f2() {
                if (p2.opts.tooltips && !p2.helpers.isMobile()) {
                  if (p2.shared.$tooltip) p2.$tooltip = p2.shared.$tooltip;
                  else {
                    p2.shared.$tooltip = u2(p2.doc.createElement("DIV")).addClass("fr-tooltip"), p2.$tooltip = p2.shared.$tooltip, p2.opts.theme && p2.$tooltip.addClass("".concat(p2.opts.theme, "-theme"));
                    var e2 = {};
                    if (p2.$wp && 0 < p2.$wp.length && (e2 = p2.$wp.closest("dialog")), 0 < e2.length) e2.first().append(p2.$tooltip);
                    else if (p2.$box && 0 < p2.$box.length && p2.$box[0]) {
                      var t2 = p2.$box[0].getRootNode();
                      t2 instanceof ShadowRoot ? u2(t2).append(p2.$tooltip) : u2(p2.o_doc).find("body").first().append(p2.$tooltip);
                    } else u2(p2.o_doc).find("body").first().append(p2.$tooltip);
                  }
                  p2.events.on("shared.destroy", function() {
                    p2.$tooltip.html("").removeData().remove(), p2.$tooltip = null;
                  }, true);
                }
              })(), e.removeAttr("title"), p2.$tooltip.text(p2.language.translate(e.data("title"))), p2.$tooltip.addClass("fr-visible");
              var l2 = e.offset().left + (e.outerWidth() - p2.$tooltip.outerWidth()) / 2;
              l2 < 0 && (l2 = 0), l2 + p2.$tooltip.outerWidth() > u2(p2.o_win).width() && (l2 = u2(p2.o_win).width() - p2.$tooltip.outerWidth()), void 0 === t && (t = p2.opts.toolbarBottom), e.offset().top - u2(window).scrollTop() + e.outerHeight() + 10 >= u2(window).height() && (t = true);
              var c2 = t ? e.offset().top - p2.$tooltip.height() : e.offset().top + e.outerHeight();
              p2.$tooltip.css("position", ""), p2.$tooltip.css("left", l2), p2.$tooltip.css("top", Math.ceil(c2));
              var d2 = {};
              p2.$wp && 0 < p2.$wp.length && (d2 = p2.$wp.closest("dialog")), 0 < d2.length ? (p2.$tooltip.css("margin-left", -d2.first().offset().left), p2.$tooltip.css("margin-top", -d2.first().offset().top)) : "static" !== u2(p2.o_doc).find("body").first().css("position") ? (p2.$tooltip.css("margin-left", -u2(p2.o_doc).find("body").first().offset().left), p2.$tooltip.css("margin-top", -u2(p2.o_doc).find("body").first().offset().top)) : (p2.$tooltip.css("margin-left", ""), p2.$tooltip.css("margin-top", ""));
            }
          }
        }
        return { hide: r2, to: o2, bind: function i2(e, t, n) {
          p2.opts.tooltips && !p2.helpers.isMobile() && (p2.events.$on(e, "mouseover", t, function(e2) {
            p2.node.hasClass(e2.currentTarget, "fr-disabled") || p2.edit.isDisabled() || o2(u2(e2.currentTarget), n);
          }, true), p2.events.$on(e, "mouseout ".concat(p2._mousedown, " ").concat(p2._mouseup), t, function() {
            r2();
          }, true));
        } };
      }, X.TOOLBAR_VISIBLE_BUTTONS = 3, X.MODULES.button = function(g2) {
        var h2 = g2.$, a2 = [];
        (g2.opts.toolbarInline || g2.opts.toolbarContainer) && (g2.shared.buttons || (g2.shared.buttons = []), a2 = g2.shared.buttons);
        var s2 = [];
        function l2(e2, t2, n2) {
          for (var r3 = h2(), o3 = 0; o3 < e2.length; o3++) {
            var i3 = h2(e2[o3]);
            if (i3.is(t2) && (r3 = r3.add(i3)), n2 && i3.is(".fr-dropdown")) {
              var a3 = i3.next().find(t2);
              r3 = r3.add(a3);
            }
          }
          return r3;
        }
        function C2(e2, t2) {
          var n2, r3 = h2();
          if (!e2) return r3;
          for (n2 in r3 = (r3 = r3.add(l2(a2, e2, t2))).add(l2(s2, e2, t2)), g2.shared.popups) if (Object.prototype.hasOwnProperty.call(g2.shared.popups, n2)) {
            var o3 = g2.shared.popups[n2].children().find(e2);
            r3 = r3.add(o3);
          }
          for (n2 in g2.shared.modals) if (Object.prototype.hasOwnProperty.call(g2.shared.modals, n2)) {
            var i3 = g2.shared.modals[n2].$modal.find(e2);
            r3 = r3.add(i3);
          }
          return r3;
        }
        function i2(e2) {
          var t2 = e2.next(), n2 = g2.node.hasClass(e2.get(0), "fr-active"), r3 = C2(".fr-dropdown.fr-active").not(e2), o3 = e2.parents(".fr-toolbar, .fr-popup").data("instance") || g2;
          o3.helpers.isIOS() && !o3.el.querySelector(".fr-marker") && (o3.selection.save(), o3.selection.clear(), o3.selection.restore()), t2.parents(".fr-more-toolbar").addClass("fr-overflow-visible");
          var i3 = 0, a3 = 0, s3 = t2.find("> .fr-dropdown-wrapper");
          if (!n2) {
            var l3 = e2.data("cmd");
            t2.find(".fr-command").removeClass("fr-active").attr("aria-selected", false), X.COMMANDS[l3] && X.COMMANDS[l3].refreshOnShow && X.COMMANDS[l3].refreshOnShow.apply(o3, [e2, t2]), t2.css("left", e2.offset().left - e2.parents(".fr-btn-wrap, .fr-toolbar, .fr-buttons").offset().left - ("rtl" === g2.opts.direction ? t2.width() - e2.outerWidth() : 0)), t2.addClass("test-height"), i3 = t2.outerHeight(), a3 = g2.helpers.getPX(s3.css("max-height")), t2.removeClass("test-height"), t2.css("top", "").css("bottom", "");
            var c3 = e2.outerHeight() / 10;
            if (!g2.opts.toolbarBottom && t2.offset().top + e2.outerHeight() + i3 < h2(g2.o_doc).height()) t2.css("top", e2.position().top + e2.outerHeight() - c3);
            else {
              var d3 = 0, f3 = e2.parents(".fr-more-toolbar");
              0 < f3.length && (d3 = f3.first().height()), t2.css("bottom", e2.parents(".fr-popup, .fr-toolbar").first().height() - d3 - e2.position().top);
            }
          }
          (e2.addClass("fr-blink").toggleClass("fr-active"), e2.hasClass("fr-options")) && e2.prev().toggleClass("fr-expanded");
          e2.hasClass("fr-active") ? (t2.attr("aria-hidden", false), e2.attr("aria-expanded", true), (function u3(e3, t3, n3) {
            n3 <= t3 && (e3.parent().css("overflow", "auto"), e3.parent().css("overflow-x", "hidden")), e3.css("height", Math.min(t3, n3));
          })(s3, i3, a3)) : (t2.attr("aria-hidden", true).css("overflow", ""), e2.attr("aria-expanded", false), s3.css("height", "")), setTimeout(function() {
            e2.removeClass("fr-blink");
          }, 300), t2.css("margin-left", ""), t2.offset().left + t2.outerWidth() > g2.$sc.offset().left + g2.$sc.width() && t2.css("margin-left", -(t2.offset().left + t2.outerWidth() - g2.$sc.offset().left - g2.$sc.width())), t2.offset().left < g2.$sc.offset().left && "rtl" === g2.opts.direction && t2.css("margin-left", g2.$sc.offset().left), r3.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), r3.prev(".fr-expanded").removeClass("fr-expanded"), r3.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e2.parents(".fr-popup").length || g2.opts.toolbarInline || (g2.node.hasClass(e2.get(0), "fr-active") ? g2.$tb.css("zIndex", (g2.opts.zIndex || 1) + 4) : g2.$tb.css("zIndex", ""));
          var p3 = t2.find("a.fr-command.fr-active").first();
          g2.helpers.isMobile() || (p3.length ? (g2.accessibility.focusToolbarElement(p3), s3.scrollTop(Math.abs(p3.parents(".fr-dropdown-content").offset().top - p3.offset().top) - p3.offset().top)) : (g2.accessibility.focusToolbarElement(e2), s3.scrollTop(0)));
        }
        function c2(e2) {
          e2.addClass("fr-blink"), setTimeout(function() {
            e2.removeClass("fr-blink");
          }, 500);
          for (var t2 = e2.data("cmd"), n2 = []; void 0 !== e2.data("param".concat(n2.length + 1)); ) n2.push(e2.data("param".concat(n2.length + 1)));
          var r3 = C2(".fr-dropdown.fr-active");
          r3.length && (r3.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), r3.prev(".fr-expanded").removeClass("fr-expanded"), r3.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e2.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t2, n2);
        }
        function t(e2) {
          var t2 = e2.parents(".fr-popup, .fr-toolbar").data("instance"), n2 = g2.popups.get("link.insert");
          if (0 === e2.parents(".fr-popup").length && e2.data("popup") && !e2.hasClass("fr-btn-active-popup") && (e2.attr("id") === "insertLink-".concat(g2.id) && n2 && n2.hasClass("fr-active") || e2.addClass("fr-btn-active-popup")), 0 !== e2.parents(".fr-popup").length || e2.data("popup") || t2.popups.hideAll(), t2.popups.areVisible() && !t2.popups.areVisible(t2)) {
            for (var r3 = 0; r3 < X.INSTANCES.length; r3++) X.INSTANCES[r3] !== t2 && X.INSTANCES[r3].popups && X.INSTANCES[r3].popups.areVisible() && X.INSTANCES[r3].$el.find(".fr-marker").remove();
            t2.popups.hideAll();
          }
          g2.node.hasClass(e2.get(0), "fr-dropdown") ? i2(e2) : (!(function o3(e3) {
            c2(e3);
          })(e2), X.COMMANDS[e2.data("cmd")] && false !== X.COMMANDS[e2.data("cmd")].refreshAfterCallback && t2.button.bulkRefresh());
        }
        function d2(e2) {
          t(h2(e2.currentTarget));
        }
        function f2(e2) {
          var t2 = e2.find(".fr-dropdown.fr-active");
          t2.length && (t2.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), t2.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t2.prev().removeClass("fr-expanded"));
        }
        function p2(e2) {
          e2.preventDefault(), e2.stopPropagation();
        }
        function u2(e2) {
          if (e2.stopPropagation(), !g2.helpers.isMobile()) return false;
        }
        function m2(e2) {
          var t2 = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {}, n2 = 2 < arguments.length ? arguments[2] : void 0;
          if (g2.helpers.isMobile() && false === t2.showOnMobile) return "";
          var r3 = t2.displaySelection;
          "function" == typeof r3 && (r3 = r3(g2));
          var o3 = "";
          if ("options" !== t2.type) if (r3) {
            var i3 = "function" == typeof t2.defaultSelection ? t2.defaultSelection(g2) : t2.defaultSelection;
            o3 = '<span style="width:'.concat(t2.displaySelectionWidth || 100, 'px">').concat(g2.language.translate(i3 || t2.title), "</span>");
          } else o3 = g2.icon.create(t2.icon || e2), o3 += '<span class="fr-sr-only">'.concat(g2.language.translate(t2.title) || "", "</span>");
          var a3 = t2.popup ? ' data-popup="true"' : "", s3 = t2.modal ? ' data-modal="true"' : "", l3 = g2.shortcuts.get("".concat(e2, "."));
          l3 = l3 ? " (".concat(l3, ")") : "";
          var c3 = "".concat(e2, "-").concat(g2.id), d3 = "dropdown-menu-".concat(c3), f3 = '<button id="'.concat(c3, '"').concat(t2.more_btn ? ' data-group-name="'.concat(c3, '" aria-expanded="false" ') : " ", 'type="button" tabIndex="-1" role="button"').concat(t2.toggle ? ' aria-pressed="false"' : "").concat("dropdown" === t2.type || "options" === t2.type ? ' aria-controls="'.concat(d3, '" aria-expanded="false" aria-haspopup="true"') : "").concat(t2.disabled ? ' aria-disabled="true"' : "", ' title="').concat(g2.language.translate(t2.title) || "").concat(l3, '" class="fr-command fr-btn').concat("dropdown" === t2.type || "options" == t2.type ? " fr-dropdown" : "").concat("options" == t2.type ? " fr-options" : "").concat("more" == t2.type ? " fr-more" : "").concat(t2.displaySelection ? " fr-selection" : "").concat(t2.back ? " fr-back" : "").concat(t2.disabled ? " fr-disabled" : "").concat(n2 ? "" : " fr-hidden", '" data-cmd="').concat(e2, '"').concat(a3).concat(s3, ">").concat(o3, "</button>");
          if ("dropdown" === t2.type || "options" === t2.type) {
            var p3 = '<div id="'.concat(d3, '" class="fr-dropdown-menu" role="listbox" aria-labelledby="').concat(c3, '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">');
            p3 += (function u3(e3, t3) {
              var n3 = "";
              if (t3.html) "function" == typeof t3.html ? n3 += t3.html.call(g2) : n3 += t3.html;
              else {
                var r4 = t3.options;
                for (var o4 in "function" == typeof r4 && (r4 = r4()), n3 += '<ul class="fr-dropdown-list" role="presentation">', r4) if (Object.prototype.hasOwnProperty.call(r4, o4)) {
                  var i4 = g2.shortcuts.get("".concat(e3, ".").concat(o4));
                  i4 = i4 ? '<span class="fr-shortcut">'.concat(i4, "</span>") : "", n3 += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'.concat("options" === t3.type ? e3.replace(/Options/g, "") : e3, '" data-param1="').concat(o4, '" title="').concat(r4[o4], '">').concat(g2.language.translate(r4[o4]), "</a></li>");
                }
                n3 += "</ul>";
              }
              return n3;
            })(e2, t2), f3 += p3 += "</div></div></div>";
          }
          return t2.hasOptions && t2.hasOptions.apply(g2) && (f3 = '<div class="fr-btn-wrap">'.concat(f3, " ").concat(m2(e2 + "Options", Object.assign({}, t2, { type: "options", hasOptions: false }), n2), "  </div>")), f3;
        }
        function e(o3) {
          var i3 = g2.$tb && g2.$tb.data("instance") || g2;
          if (false === g2.events.trigger("buttons.refresh")) return true;
          setTimeout(function() {
            for (var e2 = i3.selection.inEditor() && i3.core.hasFocus(), t2 = 0; t2 < o3.length; t2++) {
              var n2 = h2(o3[t2]), r3 = n2.data("cmd");
              0 === n2.parents(".fr-popup").length ? e2 || X.COMMANDS[r3] && X.COMMANDS[r3].forcedRefresh ? i3.button.refresh(n2) : g2.node.hasClass(n2.get(0), "fr-dropdown") || (n2.removeClass("fr-active"), n2.attr("aria-pressed") && n2.attr("aria-pressed", false)) : n2.parents(".fr-popup").isVisible() && i3.button.refresh(n2);
            }
          }, 0);
        }
        function n() {
          e(a2), e(s2);
        }
        function r2() {
          a2 = [], s2 = [];
        }
        g2.shared.popup_buttons || (g2.shared.popup_buttons = []), s2 = g2.shared.popup_buttons;
        var o2 = null;
        function v2() {
          clearTimeout(o2), o2 = setTimeout(n, 50);
        }
        return { _init: function b2() {
          g2.opts.toolbarInline ? g2.events.on("toolbar.show", n) : (g2.events.on("mouseup", v2), g2.events.on("keyup", v2), g2.events.on("blur", v2), g2.events.on("focus", v2), g2.events.on("contentChanged", v2), g2.helpers.isMobile() && g2.events.$on(g2.$doc, "selectionchange", n)), g2.events.on("shared.destroy", r2);
        }, build: m2, buildList: function E2(e2, t2) {
          for (var n2 = "", r3 = 0; r3 < e2.length; r3++) {
            var o3 = e2[r3], i3 = X.COMMANDS[o3];
            i3 && "undefined" != typeof i3.plugin && g2.opts.pluginsEnabled.indexOf(i3.plugin) < 0 || (i3 ? n2 += m2(o3, i3, void 0 === t2 || 0 <= t2.indexOf(o3)) : "|" === o3 ? n2 += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" === o3 && (n2 += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'));
          }
          return n2;
        }, buildGroup: function L2(e2) {
          var t2 = "", n2 = "";
          for (var r3 in e2) {
            var o3 = e2[r3];
            if (o3.buttons) {
              for (var i3 = "", a3 = "", s3 = 0, l3 = "left", c3 = X.TOOLBAR_VISIBLE_BUTTONS, d3 = 0; d3 < o3.buttons.length; d3++) {
                var f3 = o3.buttons[d3], p3 = X.COMMANDS[f3];
                p3 || ("|" == f3 ? i3 += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == f3 && (i3 += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')), !p3 || p3 && "undefined" != typeof p3.plugin && g2.opts.pluginsEnabled.indexOf(p3.plugin) < 0 || (e2[r3].align !== void 0 && (l3 = e2[r3].align), e2[r3].buttonsVisible !== void 0 && (c3 = e2[r3].buttonsVisible), e2.showMoreButtons && c3 <= s3 ? a3 += m2(f3, p3, true) : i3 += m2(f3, p3, true), s3++);
              }
              if (e2.showMoreButtons && c3 < s3) {
                var u3 = r3, h3 = X.COMMANDS[u3];
                h3.more_btn = true, i3 += m2(u3, h3, true);
              }
              "trackChanges" !== r3 && (t2 += '<div class="fr-btn-grp fr-float-'.concat(l3, '">').concat(i3, "</div>")), e2.showMoreButtons && 0 < a3.length && (n2 += '<div class="fr-more-toolbar" data-name="'.concat(r3 + "-" + g2.id, '">').concat(a3, "</div>"));
            }
          }
          return g2.opts.toolbarBottom ? g2.helpers.isMobile() ? '<div class="fr-bottom-extended">'.concat(n2, "</div><div>").concat(t2, "</div>") : "".concat(n2, '<div class="fr-newline"></div>').concat(t2) : "".concat(t2, '<div class="fr-newline"></div>').concat(n2);
        }, bindCommands: function y2(t2, e2) {
          g2.events.bindClick(t2, ".fr-command:not(.fr-disabled)", d2), g2.events.$on(t2, "".concat(g2._mousedown, " ").concat(g2._mouseup, " ").concat(g2._move), ".fr-dropdown-menu", p2, true), g2.events.$on(t2, "".concat(g2._mousedown, " ").concat(g2._mouseup, " ").concat(g2._move), ".fr-dropdown-menu .fr-dropdown-wrapper", u2, true);
          var n2 = t2.get(0).ownerDocument, r3 = "defaultView" in n2 ? n2.defaultView : n2.parentWindow;
          function o3(e3) {
            (!e3 || e3.type === g2._mouseup && e3.target !== h2("html").get(0) || "keydown" === e3.type && (g2.keys.isCharacter(e3.which) && !g2.keys.ctrlKey(e3) || e3.which === X.KEYCODE.ESC)) && (f2(t2), g2.opts.iframe && (function r4(e4) {
              var t3 = e4.find(".fr-popup.fr-active");
              if (t3.length) {
                t3.removeClass("fr-active").attr("aria-expanded", false).next().attr("aria-hidden", true).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), t3.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t3.prev().removeClass("fr-expanded");
                var n3 = g2.$tb.find(".fr-btn-active-popup");
                h2(n3[0]).removeClass("fr-btn-active-popup");
              }
            })(t2));
          }
          g2.events.$on(h2(r3), "".concat(g2._mouseup, " resize keydown"), o3, true), g2.opts.iframe && g2.events.$on(g2.$win, g2._mouseup, o3, true), g2.node.hasClass(t2.get(0), "fr-popup") ? h2.merge(s2, t2.find(".fr-btn").toArray()) : h2.merge(a2, t2.find(".fr-btn").toArray()), g2.tooltip.bind(t2, ".fr-btn, .fr-title", e2);
        }, refresh: function N2(e2) {
          var t2, n2 = e2.parents(".fr-popup, .fr-toolbar").data("instance") || g2, r3 = e2.data("cmd");
          g2.node.hasClass(e2.get(0), "fr-dropdown") ? t2 = e2.next() : (e2.removeClass("fr-active"), e2.attr("aria-pressed") && !e2.hasClass("fr-active-tab") && e2.attr("aria-pressed", false)), X.COMMANDS[r3] && X.COMMANDS[r3].refresh ? X.COMMANDS[r3].refresh.apply(n2, [e2, t2]) : g2.refresh[r3] && n2.refresh[r3](e2, t2);
        }, bulkRefresh: n, exec: c2, click: t, hideActiveDropdowns: f2, addButtons: function T2(e2) {
          for (var t2 = 0; t2 < e2.length; t2++) a2.push(e2[t2]);
        }, getButtons: C2, getPosition: function S2(e2) {
          var t2 = e2.offset().left, n2 = g2.opts.toolbarBottom ? 10 : e2.outerHeight() - 10;
          return { left: t2, top: e2.offset().top + n2 };
        } };
      }, X.MODULES.modals = function(l2) {
        var a2 = l2.$;
        l2.shared.modals || (l2.shared.modals = {});
        var o2, c2 = l2.shared.modals;
        function e() {
          for (var e2 in c2) if (Object.prototype.hasOwnProperty.call(c2, e2)) {
            var t = c2[e2];
            t && t.$modal && t.$modal.removeData().remove();
          }
          o2 && o2.removeData().remove(), c2 = {};
        }
        function s2(e2, t) {
          if (c2[e2]) {
            var n2 = c2[e2].$modal, r2 = n2.data("instance") || l2;
            r2.events.enableBlur(), n2.hide(), o2.hide(), a2(r2.o_doc).find("body").first().removeClass("fr-prevent-scroll fr-mobile"), n2.removeClass("fr-active"), t || (r2.accessibility.restoreSelection(), r2.events.trigger("modals.hide"));
          }
        }
        function n(e2) {
          var t;
          if ("string" == typeof e2) {
            if (!c2[e2]) return;
            t = c2[e2].$modal;
          } else t = e2;
          return t && l2.node.hasClass(t, "fr-active") && l2.core.sameInstance(t) || false;
        }
        return { _init: function t() {
          l2.events.on("shared.destroy", e, true);
        }, get: function r2(e2) {
          return c2[e2];
        }, create: function d2(n2, e2, t) {
          if (e2 = '<div class="fr-modal-head-line">'.concat(e2, "</div>"), l2.shared.$overlay || (l2.shared.$overlay = a2(l2.doc.createElement("DIV")).addClass("fr-overlay"), a2("body").first().append(l2.shared.$overlay)), o2 = l2.shared.$overlay, l2.opts.theme && o2.addClass("".concat(l2.opts.theme, "-theme")), !c2[n2]) {
            var r2 = (function i2(e3, t2) {
              var n3 = '<div tabIndex="-1" class="fr-modal'.concat(l2.opts.theme ? " ".concat(l2.opts.theme, "-theme") : "", '"><div class="fr-modal-wrapper">'), r3 = '<button title="'.concat(l2.language.translate("Cancel"), '" class="fr-command fr-btn fr-modal-close"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="').concat(X.SVG.close, '"/></svg></button>');
              n3 += '<div class="fr-modal-head">'.concat(e3).concat(r3, "</div>"), n3 += '<div tabIndex="-1" class="fr-modal-body">'.concat(t2, "</div>"), n3 += "</div></div>";
              var o3 = a2(l2.doc.createElement("DIV"));
              return o3.html(n3), o3.find("> .fr-modal");
            })(e2, t);
            c2[n2] = { $modal: r2, $head: r2.find(".fr-modal-head"), $body: r2.find(".fr-modal-body") }, l2.helpers.isMobile() || r2.addClass("fr-desktop"), a2("body").first().append(r2), l2.events.$on(r2, "click", ".fr-modal-close", function() {
              s2(n2);
            }, true), c2[n2].$body.css("margin-top", c2[n2].$head.outerHeight()), l2.events.$on(r2, "keydown", function(e3) {
              var t2 = e3.which;
              return t2 === X.KEYCODE.ESC ? (s2(n2), l2.accessibility.focusModalButton(r2), false) : !(!a2(e3.currentTarget).is("input[type=text], textarea") && t2 !== X.KEYCODE.ARROW_UP && t2 !== X.KEYCODE.ARROW_DOWN && !l2.keys.isBrowserAction(e3) && (e3.preventDefault(), e3.stopPropagation(), 1));
            }, true), s2(n2, true);
          }
          return c2[n2];
        }, show: function i2(e2) {
          if (c2[e2]) {
            var t = c2[e2].$modal;
            t.data("instance", l2), t.show(), o2.show(), a2(l2.o_doc).find("body").first().addClass("fr-prevent-scroll"), l2.helpers.isMobile() && a2(l2.o_doc).find("body").first().addClass("fr-mobile"), t.addClass("fr-active"), l2.accessibility.focusModal(t);
          }
        }, hide: s2, resize: function f2(e2) {
          if (c2[e2]) {
            var t = c2[e2], n2 = t.$modal, r2 = t.$body, o3 = l2.o_win.innerHeight, i2 = n2.find(".fr-modal-wrapper"), a3 = o3 - i2.outerHeight(true) + (i2.height() - (r2.outerHeight(true) - r2.height())), s3 = "auto";
            a3 < r2.get(0).scrollHeight && (s3 = a3), r2.height(s3);
          }
        }, isVisible: n, areVisible: function p2(e2) {
          for (var t in c2) if (Object.prototype.hasOwnProperty.call(c2, t) && n(t) && (void 0 === e2 || c2[t].$modal.data("instance") === e2)) return c2[t].$modal;
          return false;
        } };
      }, X.MODULES.position = function(y2) {
        var N2 = y2.$;
        function o2() {
          var e = y2.selection.ranges(0), t2 = e.getBoundingClientRect();
          if (0 === t2.top && 0 === t2.left && 0 === t2.width || 0 === t2.height) {
            var n2 = false, r2 = y2.opts.toolbarInline && e.startContainer && e.startContainer.firstChild && "BR" === e.startContainer.firstChild.tagName;
            0 === y2.$el.find(".fr-marker").length && (r2 ? N2(e.startContainer.firstChild).after(X.MARKERS) : y2.selection.save(), n2 = true);
            var o3 = y2.$el.find(".fr-marker").first();
            o3.css("display", "inline"), o3.css("line-height", "");
            var i3 = o3.offset(), a3 = o3.outerHeight();
            o3.css("display", "none"), o3.css("line-height", 0), (t2 = {}).left = i3 && i3.left, t2.width = 0, t2.height = a3, t2.top = i3 && i3.top - (y2.helpers.isMobile() && !y2.helpers.isIOS() || y2.opts.iframe ? 0 : y2.helpers.scrollTop()), t2.right = 1, t2.bottom = 1, t2.ok = true, n2 && (r2 ? y2.$el.find(".fr-marker").remove() : y2.selection.restore());
          }
          return t2;
        }
        function i2(e, t2, n2, r2) {
          var o3 = n2.data("container");
          if (!o3 || "BODY" === o3.get(0).tagName && "static" === o3.css("position") || (e && (e -= o3.offset().left), t2 && (t2 -= o3.offset().top), "BODY" !== o3.get(0).tagName ? (e && (e += o3.get(0).scrollLeft), t2 && (t2 += o3.get(0).scrollTop)) : "absolute" === o3.css("position") && (e && (e += o3.position().left), t2 && (t2 += o3.position().top))), y2.opts.iframe && o3 && y2.$tb && o3.get(0) !== y2.$tb.get(0)) {
            var i3 = y2.helpers.getPX(y2.$wp.find(".fr-iframe").css("padding-top")), a3 = y2.helpers.getPX(y2.$wp.find(".fr-iframe").css("padding-left"));
            e && (e += y2.$iframe.offset().left + a3), t2 && (t2 += y2.$iframe.offset().top + i3);
          }
          var s3 = (function l2(e2, t3) {
            var n3 = e2.outerWidth(true);
            return t3 + n3 > y2.$sc.get(0).clientWidth - 10 && (t3 = y2.$sc.get(0).clientWidth - n3 - 10), t3 < 0 && (t3 = 10), t3;
          })(n2, e);
          e && n2.css("left", s3), t2 && n2.css("top", (function c2(e2, t3, n3) {
            var r3 = e2.outerHeight(true);
            if (!y2.helpers.isMobile() && y2.$tb && e2.parent().get(0) !== y2.$tb.get(0)) {
              var o4 = e2.parent().offset().top, i4 = t3 - r3 - (n3 || 0);
              e2.parent().get(0) === y2.$sc.get(0) && (o4 -= e2.parent().position().top);
              var a4 = y2.$sc.get(0).clientHeight;
              o4 + t3 + r3 > y2.$sc.offset().top + a4 && 0 < e2.parent().offset().top + i4 && 0 < i4 ? i4 > y2.$wp.scrollTop() && (t3 = i4, e2.addClass("fr-above")) : e2.removeClass("fr-above");
            }
            return t3;
          })(n2, t2, r2));
        }
        function a2(e) {
          var n2 = N2(e), t2 = n2.is(".fr-sticky-on"), r2 = n2.data("sticky-top"), o3 = n2.data("sticky-scheduled");
          if (void 0 === r2) {
            n2.data("sticky-top", 0);
            var i3 = N2('<div class="fr-sticky-dummy" style="height: '.concat(n2.outerHeight(), 'px;"></div>'));
            y2.$box.prepend(i3);
          } else y2.$box.find(".fr-sticky-dummy").css("height", n2.outerHeight());
          if (y2.core.hasFocus() || 0 < y2.$tb.findVisible("input:focus").length) {
            var a3 = y2.helpers.scrollTop(), s3 = Math.min(Math.max(a3 - y2.$tb.parent().offset().top, 0), y2.$tb.parent().outerHeight() - n2.outerHeight());
            if (s3 !== r2 && s3 !== o3 && (clearTimeout(n2.data("sticky-timeout")), n2.data("sticky-scheduled", s3), n2.outerHeight() < a3 - y2.$tb.parent().offset().top && n2.addClass("fr-opacity-0"), n2.data("sticky-timeout", setTimeout(function() {
              var e2 = y2.helpers.scrollTop(), t3 = Math.min(Math.max(e2 - y2.$tb.parent().offset().top, 0), y2.$tb.parent().outerHeight() - n2.outerHeight());
              0 < t3 && "BODY" === y2.$tb.parent().get(0).tagName && (t3 += y2.$tb.parent().position().top), t3 !== r2 && (n2.css("top", Math.max(t3, 0)), n2.data("sticky-top", t3), n2.data("sticky-scheduled", t3)), n2.removeClass("fr-opacity-0");
            }, 100))), !t2) {
              var l2 = y2.$tb.parent(), c2 = l2.get(0).offsetWidth - l2.get(0).clientWidth;
              n2.css("top", "0"), n2.width(l2.width() - c2), n2.addClass("fr-sticky-on"), y2.$box.addClass("fr-sticky-box");
            }
          } else clearTimeout(N2(e).css("sticky-timeout")), n2.css("top", "0"), n2.css("position", ""), n2.css("width", ""), n2.data("sticky-top", 0), n2.removeClass("fr-sticky-on"), y2.$box.removeClass("fr-sticky-box");
        }
        function t(e) {
          if (e.offsetWidth) {
            var t2 = N2(e), n2 = t2.outerHeight(), r2 = t2.data("sticky-position"), o3 = N2("body" === y2.opts.scrollableContainer ? y2.o_win : y2.opts.scrollableContainer).outerHeight(), i3 = 0, a3 = 0;
            "body" !== y2.opts.scrollableContainer && (i3 = y2.$sc.offset().top, a3 = N2(y2.o_win).outerHeight() - i3 - o3);
            var s3 = "body" === y2.opts.scrollableContainer ? y2.helpers.scrollTop() : i3, l2 = t2.is(".fr-sticky-on");
            t2.data("sticky-parent") || t2.data("sticky-parent", t2.parent());
            var c2 = t2.data("sticky-parent"), d2 = c2.offset().top, f2 = c2.outerHeight();
            if (t2.data("sticky-offset") ? y2.$box.find(".fr-sticky-dummy").css("height", "".concat(n2, "px")) : (t2.data("sticky-offset", true), t2.after('<div class="fr-sticky-dummy" style="height: '.concat(n2, 'px;"></div>'))), !r2) {
              var p2 = "auto" !== t2.css("top") || "auto" !== t2.css("bottom");
              p2 || t2.css("position", "fixed"), r2 = { top: y2.node.hasClass(t2.get(0), "fr-top"), bottom: y2.node.hasClass(t2.get(0), "fr-bottom") }, p2 || t2.css("position", ""), t2.data("sticky-position", r2), t2.data("top", y2.node.hasClass(t2.get(0), "fr-top") ? t2.css("top") : "auto"), t2.data("bottom", y2.node.hasClass(t2.get(0), "fr-bottom") ? t2.css("bottom") : "auto");
            }
            var u2 = y2.helpers.getPX(t2.data("top")), h2 = y2.helpers.getPX(t2.data("bottom")), g2 = r2.top && (function E2() {
              return d2 < s3 + u2 && s3 + u2 <= d2 + f2 - n2;
            })(), C2 = r2.bottom && (function L2() {
              return d2 + n2 < s3 + o3 - h2 && s3 + o3 - h2 < d2 + f2;
            })();
            if (g2 || C2) {
              var m2 = c2.get(0).offsetWidth - c2.get(0).clientWidth;
              if (t2.css("width", "".concat(c2.get(0).getBoundingClientRect().width - m2, "px")), l2) "body" !== y2.opts.scrollableContainer && (t2.css("top") && "auto" !== t2.data("top") && t2.css("top", y2.helpers.getPX(t2.data("top")) + i3 - window.scrollY), t2.css("bottom") && "auto" !== t2.data("bottom") && t2.css("bottom", y2.helpers.getPX(t2.data("bottom")) + a3 + window.scrollY));
              else {
                if (t2.addClass("fr-sticky-on"), t2.removeClass("fr-sticky-off"), t2.css("top")) if ("auto" !== t2.data("top")) {
                  var v2 = "body" === y2.opts.scrollableContainer ? i3 : i3 - window.scrollY;
                  t2.css("top", y2.helpers.getPX(t2.data("top")) + v2);
                } else t2.data("top", "auto");
                if (t2.css("bottom")) if ("auto" !== t2.data("bottom")) {
                  var b2 = "body" === y2.opts.scrollableContainer ? a3 : a3 + window.scrollY;
                  t2.css("bottom", y2.helpers.getPX(t2.data("bottom")) + b2);
                } else t2.css("bottom", "auto");
              }
            } else y2.node.hasClass(t2.get(0), "fr-sticky-off") || (t2.css("width", ""), t2.removeClass("fr-sticky-on"), t2.addClass("fr-sticky-off"), t2.css("top") && "auto" !== t2.data("top") && r2.top && t2.css("top", 0), t2.css("bottom") && "auto" !== t2.data("bottom") && r2.bottom && t2.css("bottom", 0));
          }
        }
        function s2() {
          if (y2.helpers.requestAnimationFrame()(s2), false !== y2.events.trigger("position.refresh")) for (var e = 0; e < y2._stickyElements.length; e++) if (y2.opts.toolbarBottom) {
            var t2 = y2.$tb.parent(), n2 = t2.get(0).offsetWidth - t2.get(0).clientWidth, r2 = N2(y2._stickyElements[e]);
            r2.width(t2.width() - n2), r2.addClass("fr-sticky-on"), y2.$box.addClass("fr-sticky-box");
          } else a2(y2._stickyElements[e]);
        }
        function n() {
          if (y2._stickyElements) for (var e = 0; e < y2._stickyElements.length; e++) t(y2._stickyElements[e]);
        }
        return { _init: function e() {
          !(function t2() {
            if (y2._stickyElements = [], y2.helpers.getIOSVersion() <= 8) s2(), y2.events.$on(N2(y2.o_win), "scroll", function() {
              if (y2.core.hasFocus()) for (var e3 = 0; e3 < y2._stickyElements.length; e3++) {
                var t3 = N2(y2._stickyElements[e3]), n2 = t3.parent(), r2 = y2.helpers.scrollTop();
                t3.outerHeight() < r2 - n2.offset().top && (y2.opts.toolbarBottom && y2.helpers.isIOS() || (t3.addClass("fr-opacity-0"), t3.data("sticky-top", -1), t3.data("sticky-scheduled", -1)));
              }
            }, true);
            else {
              "body" !== y2.opts.scrollableContainer && y2.events.$on(N2(y2.opts.scrollableContainer), "scroll", n, true), y2.events.$on(N2(y2.o_win), "scroll", n, true), y2.events.$on(N2(y2.o_win), "resize", n, true), y2.events.on("initialized", n), y2.events.on("focus", n), y2.events.$on(N2(y2.o_win), "resize", "textarea", n, true);
              var e2 = N2(y2.el).parents(".modal");
              e2.get(0) && y2.events.$on(e2, "scroll", n, true);
            }
            y2.events.on("destroy", function() {
              y2._stickyElements = [];
            });
          })();
        }, forSelection: function l2(e) {
          var t2 = o2();
          if (t2.top != void 0) {
            e.css({ top: 0, left: 0 });
            var n2 = t2.top + t2.height, r2 = t2.left + t2.width / 2 - e.get(0).offsetWidth / 2 + y2.helpers.scrollLeft();
            y2.opts.iframe || (n2 += y2.helpers.scrollTop()), i2(r2, n2, e, t2.height);
          }
        }, addSticky: function r2(e) {
          e.addClass("fr-sticky"), y2.helpers.isIOS() && !y2.opts.toolbarBottom && e.addClass("fr-sticky-ios"), e.removeClass("fr-sticky"), y2._stickyElements.push(e.get(0));
        }, refresh: n, at: i2, getBoundingRect: o2 };
      }, X.MODULES.refresh = function(l2) {
        var c2 = l2.$;
        function i2(e2, t) {
          e2.toggleClass("fr-disabled", t).attr("aria-disabled", t);
        }
        function e(e2) {
          var t = l2.$tb.find('.fr-more-toolbar[data-name="'.concat(e2.attr("data-group-name"), '"]')), n = (function s2(e3, t2) {
            var n2 = 0, r2 = t2.find("> .fr-command, > .fr-btn-wrap");
            r2.each(function(e4, t3) {
              n2 += c2(t3).outerWidth();
            });
            var o2, i3 = l2.helpers.getPX(c2(r2[0]).css("margin-left")), a2 = l2.helpers.getPX(c2(r2[0]).css("margin-right"));
            o2 = "rtl" === l2.opts.direction ? l2.$tb.outerWidth() - e3.offset().left + l2.$tb.offset().left - (n2 + e3.outerWidth() + r2.length * (i3 + a2)) / 2 : e3.offset().left - l2.$tb.offset().left - (n2 - e3.outerWidth() + r2.length * (i3 + a2)) / 2;
            o2 + n2 + r2.length * (i3 + a2) > l2.$tb.outerWidth() && (o2 -= (n2 + r2.length * (i3 + a2) - e3.outerWidth()) / 2);
            o2 < 0 && (o2 = 0);
            return o2;
          })(e2, t);
          "rtl" === l2.opts.direction ? t.css("padding-right", n) : t.css("padding-left", n);
        }
        return { undo: function t(e2) {
          i2(e2, !l2.undo.canDo());
        }, redo: function n(e2) {
          i2(e2, !l2.undo.canRedo());
        }, outdent: function a2(e2) {
          if (l2.node.hasClass(e2.get(0), "fr-no-refresh")) return false;
          if (c2("button#markdown-".concat(l2.id, ".fr-active")).length) return false;
          for (var t = l2.selection.blocks(), n = 0; n < t.length; n++) {
            var r2 = "rtl" === l2.opts.direction || "rtl" === c2(t[n]).css("direction") ? "margin-right" : "margin-left", o2 = t[0].parentElement;
            if (["HTML", "P", "DIV", "UL", "OL", "LI", "TR", "BLOCKQUOTE", "BODY"].indexOf(o2.parentNode.tagName) < 0) return i2(e2, true), true;
            if (t[0].previousSibling && "none" == o2.parentNode.style.listStyleType) return i2(e2, true), true;
            if ("LI" === t[n].tagName || "LI" === t[n].parentNode.tagName) return i2(e2, false), true;
            if (0 < l2.helpers.getPX(c2(t[n]).css(r2)) + l2.helpers.getPX(c2(t[n]).css("text-indent"))) return i2(e2, false), true;
          }
          i2(e2, true);
        }, indent: function o2(e2) {
          if (l2.node.hasClass(e2.get(0), "fr-no-refresh")) return false;
          if (c2("button#markdown-".concat(l2.id, ".fr-active")).length) return false;
          for (var t = l2.selection.blocks(), n = 0; n < t.length; n++) {
            for (var r2 = t[n].previousSibling; r2 && r2.nodeType === Node.TEXT_NODE && 0 === r2.textContent.length; ) r2 = r2.previousSibling;
            if ("LI" !== t[n].tagName || r2) return i2(e2, false), true;
            i2(e2, true);
          }
        }, moreText: e, moreParagraph: e, moreMisc: e, moreRich: e };
      }, Object.assign(X.DEFAULTS, { attribution: true, toolbarBottom: false, toolbarButtons: null, toolbarButtonsXS: null, toolbarButtonsSM: null, toolbarButtonsMD: null, toolbarContainer: null, toolbarInline: false, toolbarSticky: true, toolbarStickyOffset: 0, toolbarVisibleWithoutSelection: false, toolbarResponsiveToEditor: false }), X.TOOLBAR_BUTTONS = { moreText: { buttons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "textColor", "backgroundColor", "inlineClass", "inlineStyle", "clearFormatting"] }, moreParagraph: { buttons: ["alignLeft", "alignCenter", "formatOLSimple", "alignRight", "alignJustify", "formatOL", "formatUL", "paragraphFormat", "paragraphStyle", "lineHeight", "outdent", "indent", "quote"] }, exportImport: { buttons: ["export_to_word"] }, moreRich: { buttons: ["trackChanges", "markdown", "insertAnchor", "insertLink", "insertFiles", "insertImage", "insertVideo", "pageBreak", "insertTable", "emoticons", "fontAwesome", "specialCharacters", "embedly", "insertFile", "insertHR", "openFilePicker"], buttonsVisible: 4 }, moreMisc: { buttons: ["undo", "redo", "fullscreen", "print", "getPDF", "spellChecker", "selectAll", "html", "help", "findReplaceButton"], align: "right", buttonsVisible: 2 }, trackChanges: { buttons: ["showChanges", "applyAll", "removeAll", "applyLast", "removeLast"], buttonsVisible: 0 } }, X.TOOLBAR_BUTTONS_MD = null, (X.TOOLBAR_BUTTONS_SM = {}).moreText = Object.assign({}, X.TOOLBAR_BUTTONS.moreText, { buttonsVisible: 2 }), X.TOOLBAR_BUTTONS_SM.moreParagraph = Object.assign({}, X.TOOLBAR_BUTTONS.moreParagraph, { buttonsVisible: 2 }), X.TOOLBAR_BUTTONS_SM.exportImport = Object.assign({}, X.TOOLBAR_BUTTONS.exportImport, { buttonsVisible: 1 }), X.TOOLBAR_BUTTONS_SM.moreRich = Object.assign({}, X.TOOLBAR_BUTTONS.moreRich, { buttonsVisible: 2 }), X.TOOLBAR_BUTTONS_SM.moreMisc = Object.assign({}, X.TOOLBAR_BUTTONS.moreMisc, { buttonsVisible: 2 }), X.TOOLBAR_BUTTONS_SM.trackChanges = Object.assign({}, X.TOOLBAR_BUTTONS.trackChanges, { buttonsVisible: 0 }), (X.TOOLBAR_BUTTONS_XS = {}).moreText = Object.assign({}, X.TOOLBAR_BUTTONS.moreText, { buttonsVisible: 0 }), X.TOOLBAR_BUTTONS_XS.moreParagraph = Object.assign({}, X.TOOLBAR_BUTTONS.moreParagraph, { buttonsVisible: 0 }), X.TOOLBAR_BUTTONS_XS.exportImport = Object.assign({}, X.TOOLBAR_BUTTONS.exportImport, { buttonsVisible: 1 }), X.TOOLBAR_BUTTONS_XS.moreRich = Object.assign({}, X.TOOLBAR_BUTTONS.moreRich, { buttonsVisible: 0 }), X.TOOLBAR_BUTTONS_XS.moreMisc = Object.assign({}, X.TOOLBAR_BUTTONS.moreMisc, { buttonsVisible: 2 }), X.TOOLBAR_BUTTONS_XS.trackChanges = Object.assign({}, X.TOOLBAR_BUTTONS.trackChanges, { buttonsVisible: 0 }), X.POWERED_BY = '<a id="fr-logo" href="https://froala.com/wysiwyg-editor" target="_blank" title="Froala WYSIWYG HTML Editor"><span>Powered by</span><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 822.8 355.33"><defs><style>.fr-logo{fill:#b1b2b7;}</style></defs><title>Froala</title><path class="fr-logo" d="M123.58,78.65A16.16,16.16,0,0,0,111.13,73H16.6C7.6,73,0,80.78,0,89.94V128.3a16.45,16.45,0,0,0,32.9,0V104.14h78.5A15.63,15.63,0,0,0,126.87,91.2,15.14,15.14,0,0,0,123.58,78.65Z"/><path class="fr-logo" d="M103.54,170a16.05,16.05,0,0,0-11.44-4.85H15.79A15.81,15.81,0,0,0,0,180.93v88.69a16.88,16.88,0,0,0,5,11.92,16,16,0,0,0,11.35,4.7h.17a16.45,16.45,0,0,0,16.41-16.6v-73.4H92.2A15.61,15.61,0,0,0,107.89,181,15.1,15.1,0,0,0,103.54,170Z"/><path class="fr-logo" d="M233,144.17c-5.29-6.22-16-7.52-24.14-7.52-16.68,0-28.72,7.71-36.5,23.47v-5.67a16.15,16.15,0,1,0-32.3,0v115.5a16.15,16.15,0,1,0,32.3,0v-38.7c0-19.09,3.5-63.5,35.9-63.5a44.73,44.73,0,0,1,5.95.27h.12c12.79,1.2,20.06-2.73,21.6-11.69C236.76,151.48,235.78,147.39,233,144.17Z"/><path class="fr-logo" d="M371.83,157c-13.93-13.11-32.9-20.33-53.43-20.33S279,143.86,265.12,157c-14.67,13.88-22.42,32.82-22.42,54.77,0,21.68,8,41.28,22.4,55.2,13.92,13.41,32.85,20.8,53.3,20.8s39.44-7.38,53.44-20.79c14.55-13.94,22.56-33.54,22.56-55.21S386.39,170.67,371.83,157Zm-9.73,54.77c0,25.84-18.38,44.6-43.7,44.6s-43.7-18.76-43.7-44.6c0-25.15,18.38-43.4,43.7-43.4S362.1,186.59,362.1,211.74Z"/><path class="fr-logo" d="M552.7,138.14a16.17,16.17,0,0,0-16,16.3v1C526.41,143.85,509,136.64,490,136.64c-19.83,0-38.19,7.24-51.69,20.4C424,171,416.4,190,416.4,212c0,21.61,7.78,41.16,21.9,55,13.56,13.33,31.92,20.67,51.7,20.67,18.83,0,36.29-7.41,46.7-19.37v1.57a16.15,16.15,0,1,0,32.3,0V154.44A16.32,16.32,0,0,0,552.7,138.14Zm-16.3,73.6c0,30.44-22.81,44.3-44,44.3-24.57,0-43.1-19-43.1-44.3s18.13-43.4,43.1-43.4C513.73,168.34,536.4,183.55,536.4,211.74Z"/><path class="fr-logo" d="M623.5,61.94a16.17,16.17,0,0,0-16,16.3v191.7a16.15,16.15,0,1,0,32.3,0V78.24A16.32,16.32,0,0,0,623.5,61.94Z"/><path class="fr-logo" d="M806.5,138.14a16.17,16.17,0,0,0-16,16.3v1c-10.29-11.63-27.74-18.84-46.7-18.84-19.83,0-38.19,7.24-51.69,20.4-14.33,14-21.91,33-21.91,55,0,21.61,7.78,41.16,21.9,55,13.56,13.33,31.92,20.67,51.7,20.67,18.83,0,36.29-7.41,46.7-19.37v1.57a16.15,16.15,0,1,0,32.3,0V154.44A16.32,16.32,0,0,0,806.5,138.14Zm-16.3,73.6c0,30.44-22.81,44.3-44,44.3-24.57,0-43.1-19-43.1-44.3s18.13-43.4,43.1-43.4C767.53,168.34,790.2,183.55,790.2,211.74Z"/></svg></a>', X.MODULES.toolbar = function(L2) {
        var y2 = L2.$;
        function e(e2) {
          if (-1 < L2.opts.pluginsEnabled.indexOf("filestack") && L2.opts.filestackOptions && L2.opts.filestackOptions.uploadToFilestackOnly) {
            var t2, n2 = JSON.parse(JSON.stringify(e2)), r3 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.includes("openFilePicker"), o3 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.includes("insertFile"), i3 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.includes("insertFiles");
            r3 ? (-1 !== (t2 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.findIndex(function(e3) {
              return "insertFile" === e3;
            })) && n2.moreRich.buttons.splice(t2, 1), -1 !== (t2 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.findIndex(function(e3) {
              return "insertFiles" === e3;
            })) && n2.moreRich.buttons.splice(t2, 1)) : o3 && i3 && -1 !== (t2 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.findIndex(function(e3) {
              return "insertFiles" === e3;
            })) && n2.moreRich.buttons.splice(t2, 1);
            var a3 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.findIndex(function(e3) {
              return "insertImage" === e3;
            });
            -1 < a3 && null !== a3 && (n2.moreRich.buttons[a3] = "openFilePickerImageOnly");
            var s3 = n2.moreRich && n2.moreRich.buttons && n2.moreRich.buttons.findIndex(function(e3) {
              return "insertVideo" === e3;
            });
            return -1 < s3 && null !== s3 && (n2.moreRich.buttons[s3] = "openFilePickerVideoOnly"), n2;
          }
          return e2;
        }
        var N2, t = [];
        function n(e2) {
          var n2 = {};
          if (Array.isArray(e2)) {
            if (!Array.isArray(e2[0])) {
              for (var t2 = [], r3 = [], o3 = 0; o3 < e2.length; o3++) "|" === e2[o3] || "-" === e2[o3] ? (0 < r3.length && t2.push(r3), r3 = []) : r3.push(e2[o3]);
              0 < r3.length && t2.push(r3), e2 = t2;
            }
            e2.forEach(function(e3, t3) {
              n2["group".concat(t3 + 1)] = { buttons: e3 };
            }), n2.showMoreButtons = false;
          } else "object" !== w(e2) || Array.isArray(e2) || ((n2 = e2).showMoreButtons = true);
          return n2;
        }
        function T2() {
          var e2 = L2.helpers.screenSize(L2.opts.toolbarResponsiveToEditor);
          return t[N2 = e2];
        }
        function S2() {
          for (var d3 = L2.$tb.find(".fr-more-toolbar"), f3 = function f4() {
            var e2 = y2(d3[p3]);
            if (e2.hasClass("fr-expanded")) {
              var n2 = L2.helpers.getPX(e2.css("padding-left")), t2 = e2.find("> .fr-command, > .fr-btn-wrap"), r3 = y2(t2[0]), o3 = L2.helpers.getPX(r3.css("margin-left")), i3 = L2.helpers.getPX(r3.css("margin-right")), a3 = L2.helpers.getPX(r3.css("margin-top")), s3 = L2.helpers.getPX(r3.css("margin-bottom"));
              if (t2.each(function(e3, t3) {
                n2 += y2(t3).outerWidth() + o3 + i3;
              }), L2.$tb.outerWidth() < n2) {
                var l3 = Math.floor(n2 / L2.$tb.outerWidth());
                n2 += l3 * (n2 / e2[0].childElementCount), l3 = Math.ceil(n2 / L2.$tb.outerWidth());
                var c3 = (L2.helpers.getPX(r3.css("height")) + a3 + s3) * l3;
                e2.css("height", c3);
              }
            } else e2.css("height", "");
          }, p3 = 0; p3 < d3.length; p3++) f3();
          !L2.helpers.isMobile() && L2.opts.toolbarBottom ? L2.$tb.find(".fr-toolbar .fr-more-toolbar").removeClass("position-relative") : L2.$tb.find(".fr-toolbar .fr-more-toolbar").addClass("position-relative");
        }
        function o2() {
          if (0 == L2.$tb.find("[data-name='trackChanges-".concat(L2.id, "']")).length && -1 < L2.opts.pluginsEnabled.indexOf("track_changes")) {
            L2.$tb.append(y2('<div class="fr-more-toolbar"></div>').data("name", "trackChanges-".concat(L2.id)));
            for (var e2 = 0, t2 = ["showChanges", "applyAll", "removeAll", "applyLast", "removeLast"]; e2 < t2.length; e2++) {
              var n2 = t2[e2], r3 = X.COMMANDS[n2];
              if (r3) {
                r3.more_btn = true;
                var o3 = y2(L2.button.build(n2, r3, true));
                L2.button.addButtons(o3), L2.$tb.find("[data-name='trackChanges-".concat(L2.id, "']")).append(o3);
              }
            }
          }
          if (N2 !== L2.helpers.screenSize(L2.opts.toolbarResponsiveToEditor)) {
            var i3 = T2(), a3 = y2(), s3 = y2();
            for (var l3 in L2.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").addClass("fr-hidden"), (function E2() {
              for (var e3 = L2.$tb.find(".fr-btn-grp, .fr-more-toolbar"), t3 = function t4() {
                var n3 = y2(e3[r4]);
                n3.children().each(function(e4, t5) {
                  n3.before(t5);
                }), n3.remove();
              }, r4 = 0; r4 < e3.length; r4++) t3();
            })(), L2.$tb.find(".fr-separator.fr-vs, .fr-separator.fr-hs").remove(), i3) {
              var c3 = i3[l3];
              if (c3.buttons && ("trackChanges" !== l3 || -1 !== L2.opts.pluginsEnabled.indexOf("track_changes"))) {
                var d3 = void 0, f3 = 0, p3 = 3, u2 = void 0;
                "trackChanges" !== l3 && (u2 = y2('<div class="fr-btn-grp fr-float-'.concat(i3[l3].align ? i3[l3].align : "left", '"></div>'))), i3.showMoreButtons && (d3 = y2('<div class="fr-more-toolbar"></div>').data("name", "".concat(l3, "-").concat(L2.id)), "trackChanges" !== l3 && "moreRich" !== l3 || !L2.opts.trackChangesEnabled || d3.addClass("fr-expanded"));
                for (var h2 = 0; h2 < c3.buttons.length; h2++) {
                  c3.buttonsVisible !== void 0 && (p3 = c3.buttonsVisible);
                  var g2 = L2.$tb.find('> .fr-command[data-cmd="' + c3.buttons[h2] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + c3.buttons[h2] + '"]'), C2 = null;
                  L2.node.hasClass(g2.next().get(0), "fr-dropdown-menu") && (C2 = g2.next()), L2.node.hasClass(g2.next().get(0), "fr-options") && (g2.removeClass("fr-hidden"), g2.next().removeClass("fr-hidden"), g2 = g2.parent()), g2.removeClass("fr-hidden"), i3.showMoreButtons && p3 <= f3 ? (d3.append(g2), C2 && d3.append(C2)) : (u2.append(g2), "|" === c3.buttons[h2] ? u2.append(y2('<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>')) : "-" === c3.buttons[h2] && u2.append(y2('<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')), C2 && u2.append(C2)), f3++;
                }
                if (i3.showMoreButtons && p3 < f3) {
                  var m2 = L2.$tb.find('.fr-command[data-cmd="'.concat(l3, '"]'));
                  if (0 < m2.length) m2.removeClass("fr-hidden fr-open");
                  else {
                    var v2 = l3, b2 = X.COMMANDS[v2];
                    b2 && (b2.more_btn = true, m2 = y2(L2.button.build(v2, b2, true)), L2.button.addButtons(m2));
                  }
                  u2 && u2.append(m2);
                }
                u2 && a3.push(u2), i3.showMoreButtons && s3.push(d3);
              }
            }
            L2.opts.toolbarBottom ? (L2.$tb.append(s3), L2.$tb.find(".fr-newline").remove(), L2.$tb.append('<div class="fr-newline"></div>'), L2.$tb.append(a3)) : (L2.$tb.append(a3), L2.$tb.find(".fr-newline").remove(), L2.$tb.append('<div class="fr-newline"></div>'), L2.$tb.append(s3)), L2.$tb.removeClass("fr-toolbar-open"), L2.$box.removeClass("fr-toolbar-open"), L2.events.trigger("codeView.toggle");
          }
          S2();
        }
        function r2(t2, n2) {
          setTimeout(function() {
            var e2;
            L2.opts.iframe ? e2 = L2.$iframe.get(0).contentWindow.document.activeElement : e2 = document.activeElement;
            if ((!t2 || t2.which != X.KEYCODE.ESC) && L2.selection.inEditor() && L2.core.hasFocus() && !L2.popups.areVisible() && "false" != y2(L2.selection.blocks()[0]).closest("table").attr("contenteditable") && "INPUT" !== e2.tagName && "TEXTAREA" !== e2.tagName && (L2.opts.toolbarVisibleWithoutSelection || !L2.selection.isCollapsed() && !L2.keys.isIME() || n2)) {
              if (L2.$tb.data("instance", L2), false === L2.events.trigger("toolbar.show", [t2])) return;
              if (t2 && L2.helpers.isMobile() && !(function r3(e3, t3) {
                var n3 = e3.target;
                for (; n3; ) {
                  if (n3 === t3) return true;
                  n3 = n3.parentElement;
                }
                return false;
              })(t2, L2.$box)) return;
              L2.$tb.show(), L2.opts.toolbarContainer || L2.position.forSelection(L2.$tb), 1 < L2.opts.zIndex ? L2.$tb.css("z-index", L2.opts.zIndex + 1) : L2.$tb.css("z-index", null);
            }
          }, 0);
        }
        function i2(e2) {
          return (!e2 || "blur" !== e2.type || document.activeElement !== L2.el) && ((!e2 || "blur" !== e2.type || !L2.helpers.isMobile()) && (!(!e2 || "keydown" !== e2.type || !L2.keys.ctrlKey(e2)) || (!!L2.button.getButtons(".fr-dropdown.fr-active").next().find(L2.o_doc.activeElement).length || (L2.helpers.isMobile() && L2.opts.toolbarInline && (L2.$tb.find(".fr-expanded").toggleClass("fr-expanded"), L2.$tb.find(".fr-open").removeClass("fr-open"), L2.$tb.removeClass("fr-toolbar-open"), S2()), void (false !== L2.events.trigger("toolbar.hide") && L2.$tb.hide())))));
        }
        t[X.XS] = n(e(L2.opts.toolbarButtonsXS || L2.opts.toolbarButtons || X.TOOLBAR_BUTTONS_XS || X.TOOLBAR_BUTTONS || [])), t[X.SM] = n(e(L2.opts.toolbarButtonsSM || L2.opts.toolbarButtons || X.TOOLBAR_BUTTONS_SM || X.TOOLBAR_BUTTONS || [])), t[X.MD] = n(e(L2.opts.toolbarButtonsMD || L2.opts.toolbarButtons || X.TOOLBAR_BUTTONS_MD || X.TOOLBAR_BUTTONS || [])), t[X.LG] = n(e(L2.opts.toolbarButtons || X.TOOLBAR_BUTTONS || []));
        var a2 = null;
        function s2(e2) {
          clearTimeout(a2), e2 && e2.which === X.KEYCODE.ESC || (a2 = setTimeout(r2, L2.opts.typingTimer));
        }
        function l2() {
          L2.events.on("window.mousedown", i2), L2.events.on("keydown", i2), L2.events.on("blur", i2), L2.events.$on(L2.$tb, "transitionend", ".fr-more-toolbar", function() {
            L2.position.forSelection(L2.$tb);
          }), L2.helpers.isMobile() || L2.events.on("window.mouseup", r2), L2.helpers.isMobile() ? L2.helpers.isIOS() || (L2.events.on("window.touchend", r2), L2.browser.mozilla && setInterval(r2, 200)) : L2.events.on("window.keyup", s2), L2.events.on("keydown", function(e2) {
            e2 && e2.which === X.KEYCODE.ESC && L2.events.trigger("toolbar.esc");
          }), L2.events.on("keydown", function(e2) {
            if (e2.which === X.KEYCODE.ALT) return e2.stopPropagation(), false;
          }, true), L2.events.$on(L2.$wp, "scroll.toolbar", r2), L2.events.on("commands.after", r2), L2.helpers.isMobile() && (L2.events.$on(L2.$doc, "selectionchange", s2), L2.events.$on(L2.$doc, "orientationchange", r2));
        }
        function c2() {
          L2.$tb && (L2.$tb.html("").removeData().remove(), L2.$tb = null), L2.$second_tb && (L2.$second_tb.html("").removeData().remove(), L2.$second_tb = null);
        }
        function d2() {
          L2.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), L2.$box.find(".fr-sticky-dummy").remove();
        }
        function f2() {
          L2.opts.theme && L2.$tb.addClass("".concat(L2.opts.theme, "-theme")), 1 < L2.opts.zIndex && L2.$tb.css("z-index", L2.opts.zIndex + 1), "auto" !== L2.opts.direction && L2.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(L2.opts.direction)), L2.helpers.isMobile() ? L2.$tb.addClass("fr-mobile") : L2.$tb.addClass("fr-desktop"), L2.opts.toolbarContainer ? (L2.opts.toolbarInline && (l2(), i2()), L2.opts.toolbarBottom ? L2.$tb.addClass("fr-bottom") : L2.$tb.addClass("fr-top")) : (function e2() {
            L2.opts.toolbarInline ? (L2.$sc.append(L2.$tb), L2.$tb.data("container", L2.$sc), L2.$tb.addClass("fr-inline"), l2(), L2.opts.toolbarBottom = false) : (L2.opts.toolbarBottom ? (L2.$box.append(L2.$tb), L2.$tb.addClass("fr-bottom"), L2.$box.addClass("fr-bottom")) : (L2.opts.toolbarBottom = false, L2.$box.prepend(L2.$tb), L2.$tb.addClass("fr-top"), L2.$box.addClass("fr-top")), L2.$tb.addClass("fr-basic"), L2.opts.toolbarSticky && (L2.opts.toolbarStickyOffset && (L2.opts.toolbarBottom ? L2.$tb.css("bottom", L2.opts.toolbarStickyOffset) : L2.$tb.css("top", L2.opts.toolbarStickyOffset)), L2.position.addSticky(L2.$tb)));
          })(), (function t2() {
            var e2 = L2.button.buildGroup(T2());
            L2.$tb.append(e2), S2(), L2.button.bindCommands(L2.$tb);
          })(), (function r3() {
            L2.events.$on(y2(L2.o_win), "resize", o2), L2.events.$on(y2(L2.o_win), "orientationchange", o2), L2.opts.toolbarButtons && -1 < JSON.stringify(L2.opts.toolbarButtons).indexOf("trackChanges") && o2();
            var e2 = L2.$tb.find(".fr-more-toolbar[data-name=trackChanges-".concat(L2.id, "]")), t2 = 0 !== e2.length && e2.hasClass("fr-expanded");
            if (L2.opts.trackChangesEnabled && !t2) {
              var n2 = L2.$tb.find(".fr-command.fr-btn[data-cmd=trackChanges");
              e2.addClass("fr-expanded"), n2.toggleClass("fr-open"), L2.toolbar.enable();
            }
          })(), L2.accessibility.registerToolbar(L2.$tb), L2.events.$on(L2.$tb, "".concat(L2._mousedown, " ").concat(L2._mouseup), function(e2) {
            var t2 = e2.originalEvent ? e2.originalEvent.target || e2.originalEvent.originalTarget : null;
            if (t2 && "INPUT" !== t2.tagName && !L2.edit.isDisabled()) return e2.stopPropagation(), e2.preventDefault(), false;
          }, true), L2.helpers.isMobile() && L2.events.$on(L2.$tb, "click", function() {
            L2.popups.areVisible().length || L2.id !== L2.shared.selected_editor && L2.shared.selected_editor || L2.$el.focus();
          }), L2.events.$on(L2.$tb, "transitionend", ".fr-more-toolbar", function() {
            L2.$box.hasClass("fr-fullscreen") && (L2.opts.height = L2.o_win.innerHeight - (L2.opts.toolbarInline ? 0 : L2.$tb.outerHeight() + (L2.$second_tb ? L2.$second_tb.outerHeight() : 0)), L2.size.refresh());
          });
        }
        var p2 = false;
        return { _init: function u2() {
          if (L2.$sc = y2(L2.opts.scrollableContainer).first(), !L2.$wp) return false;
          L2.opts.toolbarInline || L2.opts.toolbarBottom || (L2.$second_tb = y2(L2.doc.createElement("div")).attr("class", "fr-second-toolbar"), L2.$box.append(L2.$second_tb), (false !== L2.ul || L2.opts.attribution) && L2.$second_tb.prepend(X.POWERED_BY)), L2.opts.toolbarContainer ? (L2.shared.$tb ? (L2.$tb = L2.shared.$tb, L2.opts.toolbarInline && l2()) : (L2.shared.$tb = y2(L2.doc.createElement("DIV")), L2.shared.$tb.addClass("fr-toolbar"), L2.$tb = L2.shared.$tb, y2(L2.opts.toolbarContainer).append(L2.$tb), f2(), L2.$tb.data("instance", L2)), L2.opts.toolbarInline ? L2.$box.addClass("fr-inline") : L2.$box.addClass("fr-basic"), L2.events.on("focus", function() {
            L2.$tb.data("instance", L2);
          }, true), L2.opts.toolbarInline = false) : L2.opts.toolbarInline ? (L2.$box.addClass("fr-inline"), L2.shared.$tb ? (L2.$tb = L2.shared.$tb, l2()) : (L2.shared.$tb = y2(L2.doc.createElement("DIV")), L2.shared.$tb.addClass("fr-toolbar"), L2.$tb = L2.shared.$tb, f2())) : (L2.$box.addClass("fr-basic"), L2.$tb = y2(L2.doc.createElement("DIV")), L2.$tb.addClass("fr-toolbar"), f2(), L2.$tb.data("instance", L2)), L2.events.on("destroy", d2, true), L2.events.on(L2.opts.toolbarInline || L2.opts.toolbarContainer ? "shared.destroy" : "destroy", c2, true), L2.events.on("edit.on", function() {
            L2.$tb.removeClass("fr-disabled").removeAttr("aria-disabled");
          }), L2.events.on("edit.off", function() {
            L2.$tb.addClass("fr-disabled").attr("aria-disabled", true);
          }), (function e2() {
            L2.events.on("shortcut", function(e3, t2, n2) {
              var r3;
              if (t2 && !n2 ? r3 = L2.$tb.find('.fr-command[data-cmd="'.concat(t2, '"]')) : t2 && n2 && (r3 = L2.$tb.find('.fr-command[data-cmd="'.concat(t2, '"][data-param1="').concat(n2, '"]'))), r3.length && (e3.preventDefault(), e3.stopPropagation(), r3.parents(".fr-toolbar").data("instance", L2), "keydown" === e3.type)) return L2.button.exec(r3), false;
            });
          })();
        }, hide: i2, show: function h2() {
          if (false === L2.events.trigger("toolbar.show")) return false;
          L2.$tb.show();
        }, showInline: r2, disable: function g2() {
          !p2 && L2.$tb && (L2.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-wrap > .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", true), p2 = true);
        }, enable: function C2() {
          p2 && L2.$tb && (L2.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-wrap > .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", false), p2 = false), L2.button.bulkRefresh();
        }, setMoreToolbarsHeight: S2 };
      };
      var c = ["scroll", "wheel", "touchmove", "touchstart", "touchend"], f = ["webkit", "moz", "ms", "o"], p = ["transitionend"], i = document.createElement("div").style, a = ["Webkit", "Moz", "ms", "O", "css", "style"], s = { visibility: "hidden", display: "block" }, r = ["focus", "blur", "click"], u = {}, h = function h2(e, t) {
        return { altKey: e.altKey, bubbles: e.bubbles, cancelable: e.cancelable, changedTouches: e.changedTouches, ctrlKey: e.ctrlKey, detail: e.detail, eventPhase: e.eventPhase, metaKey: e.metaKey, pageX: e.pageX, pageY: e.pageY, shiftKey: e.shiftKey, view: e.view, "char": e["char"], key: e.key, keyCode: e.keyCode, button: e.button, buttons: e.buttons, clientX: e.clientX, clientY: e.clientY, offsetX: e.offsetX, offsetY: e.offsetY, pointerId: e.pointerId, pointerType: e.pointerType, screenX: e.screenX, screenY: e.screenY, targetTouches: e.targetTouches, toElement: e.toElement, touches: e.touches, type: e.type, which: e.which, target: e.target, currentTarget: t, originalEvent: e, stopPropagation: function() {
          e.stopPropagation();
        }, stopImmediatePropagation: function() {
          e.stopImmediatePropagation();
        }, preventDefault: function() {
          (/Android/i.test(navigator.userAgent) && "touchend" === e.type || -1 === c.indexOf(e.type)) && e.preventDefault();
        } };
      }, g = function g2(e) {
        if (e.ownerDocument && e.ownerDocument.body && e.ownerDocument.body.contains(e) || "#document" === e.nodeName || "HTML" === e.nodeName || e === window) return true;
        if ("function" != typeof e.getRootNode) return false;
        var t = e.getRootNode();
        return t && t.host && g2(t.host);
      }, C = function C2(n, r2) {
        return function(e) {
          var t = e.target;
          if (r2) for (r2 = v(r2); t && t !== this; ) Element.prototype.matches.call(t, v(r2)) && n.call(t, h(e, t)), t = t.parentNode;
          else g(t) && n.call(t, h(e, t));
        };
      }, m = function m2(e, t) {
        return new T(e, t);
      }, v = function v2(e) {
        return e && "string" == typeof e ? e.replace(/^\s*>/g, ":scope >").replace(/,\s*>/g, ", :scope >") : e;
      }, b = function b2(e) {
        return "function" == typeof e && "number" != typeof e.nodeType;
      }, N = m;
      m.fn = m.prototype = { constructor: m, length: 0, contains: function(e) {
        if (!e) return false;
        if (Array.isArray(e)) {
          for (var t = 0; t < e.length; t++) if (this.contains(e[t]) && this != e[t]) return true;
          return false;
        }
        for (var n = 0; n < this.length; n++) for (var r2 = e; r2; ) {
          if (r2 == this[n] || r2[0] && r2[0].isEqualNode(this[n])) return true;
          r2 = r2.parentNode;
        }
        return false;
      }, findVisible: function(e) {
        for (var t = this.find(e), n = t.length - 1; 0 <= n; n--) N(t[n]).isVisible() || t.splice(n, 1);
        return t;
      }, formatParams: function(t) {
        var e = "".concat(Object.keys(t).map(function(e2) {
          return "".concat(e2, "=").concat(encodeURIComponent(t[e2]));
        }).join("&"));
        return e || "";
      }, ajax: function(t) {
        var n = new XMLHttpRequest(), e = this.formatParams(t.data);
        for (var r2 in "GET" === t.method.toUpperCase() && (t.url = e ? t.url + "?" + e : t.url), n.open(t.method, t.url, true), t.withCredentials && (n.withCredentials = true), t.crossDomain && n.setRequestHeader("Access-Control-Allow-Origin", "*"), t.headers) Object.prototype.hasOwnProperty.call(t.headers, r2) && n.setRequestHeader(r2, t.headers[r2]);
        Object.prototype.hasOwnProperty.call(t.headers, "Content-Type") || ("json" === t.dataType ? n.setRequestHeader("Content-Type", "application/json") : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), n.onload = function() {
          if (200 == n.status) {
            var e2 = n.responseText;
            "json" === t.dataType && (e2 = JSON.parse(e2)), t.done(e2, n.status, n);
          } else t.fail(n);
        }, n.send(e);
      }, prevAll: function() {
        var e = N();
        if (!this[0]) return e;
        for (var t = this[0]; t && t.previousSibling; ) t = t.previousSibling, e.push(t);
        return e;
      }, index: function(e) {
        return e ? "string" == typeof e ? [].indexOf.call(N(e), this[0]) : [].indexOf.call(this, e.length ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }, isVisible: function() {
        return !!this[0] && !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
      }, toArray: function() {
        return [].slice.call(this);
      }, get: function(e) {
        return null == e ? [].slice.call(this) : e < 0 ? this[e + this.length] : this[e];
      }, pushStack: function(e) {
        var t = m.merge(this.constructor(), e);
        return t.prevObject = this, t;
      }, wrapAll: function(e) {
        var t;
        return this[0] && (b(e) && (e = e.call(this[0])), t = m(e, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
          for (var e2 = this; e2.firstElementChild; ) e2 = e2.firstElementChild;
          return e2;
        }).append(this)), this;
      }, wrapInner: function(e) {
        if ("string" == typeof e) {
          for (var t = e.split(" "), n = 0; n < t.length && 0 === t[n].trim().length; ) n++;
          if (n < t.length && (N(e).length && t[n].trim() === N(e)[0].tagName && (e = document.createElement(t[n].trim())), n++), "string" != typeof e) for (var r2 = N(e); n < t.length; n++) {
            t[n] = t[n].trim();
            var o2 = t[n].split("=");
            r2.attr(o2[0], o2[1].replace('"', ""));
          }
        }
        for (; this[0].firstChild && this[0].firstChild !== e && "string" != typeof e; ) e.appendChild(this[0].firstChild);
      }, wrapContent: function(e) {
        for (var t = document.createElement(e.tagName), n = 0; n < e.attributes.length; n++) N(t).attr(e.attributes[n].nodeName, e.attributes[n].value);
        N(this[0]).contents().wrapAll(t);
      }, wrap: function(t) {
        var n = b(t);
        return this.each(function(e) {
          N(this).wrapAll(n ? t.call(this, e) : t);
        });
      }, unwrap: function() {
        return this.parent().each(function() {
          this.nodeName && this.nodeName.toLowerCase() === name.toLowerCase() || m(this).replaceWith(this.childNodes);
        });
      }, grep: function(e, t, n) {
        for (var r2 = [], o2 = 0, i2 = e.length, a2 = !n; o2 < i2; o2++) !t(e[o2], o2) !== a2 && r2.push(e[o2]);
        return r2;
      }, map: function(n) {
        return this.pushStack(m.map(this, function(e, t) {
          return n.call(e, t, e);
        }));
      }, slice: function() {
        return this.pushStack([].slice.apply(this, arguments));
      }, each: function(e) {
        if (this.length) for (var t = 0; t < this.length && false !== e.call(this[t], t, this[t]); t++) ;
        return this;
      }, first: function() {
        return this.eq(0);
      }, last: function() {
        return this.eq(-1);
      }, eq: function(e) {
        var t = this.length, n = +e + (e < 0 ? t : 0);
        return this.pushStack(0 <= n && n < t ? [this[n]] : []);
      }, empty: function() {
        for (var e = 0; e < this.length; e++) this[e].innerHTML = "";
      }, contents: function() {
        for (var e = N(), t = 0; t < this.length; t++) for (var n = this[t].childNodes, r2 = 0; r2 < n.length; r2++) e.push(n[r2]);
        return e;
      }, attr: function(e, t) {
        if ("object" === w(e)) {
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && null !== e[n] && this.attr(n, e[n]);
          return this;
        }
        if (void 0 === t) return 0 === this.length || !this[0].getAttribute && "checked" !== e ? void 0 : "checked" === e ? this[0].checked : "tagName" === e ? this[0].tagName : this[0].getAttribute(e);
        if ("checked" === e) for (var r2 = 0; r2 < this.length; r2++) this[r2].checked = t;
        else if ("tagName" === e) for (var o2 = 0; o2 < this.length; o2++) this[o2].tagName = t;
        else for (var i2 = 0; i2 < this.length; i2++) this[i2].setAttribute(e, t);
        return this;
      }, removeAttr: function(e) {
        for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute(e);
        return this;
      }, hide: function() {
        return this.css("display", "none"), this;
      }, show: function() {
        return this.css("display", "block"), this;
      }, focus: function() {
        return this.length && this[0].focus(), this;
      }, blur: function() {
        return this.length && this[0].blur(), this;
      }, data: function(e, t) {
        if (void 0 !== t) {
          for (var n = 0; n < this.length; n++) "object" !== w(this[n]["data-" + e] = t) && "function" != typeof t && this[n].setAttribute && this[n].setAttribute("data-" + e, t);
          return this;
        }
        if (void 0 !== t) return this.attr("data-" + e, t);
        if (0 === this.length) return void 0;
        for (var r2 = 0; r2 < this.length; r2++) {
          var o2 = this[r2]["data-" + e];
          if (null == o2 && this[r2].getAttribute && (o2 = this[r2].getAttribute("data-" + e)), void 0 !== o2 && null != o2) return o2;
        }
        return void 0;
      }, removeData: function(e) {
        for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute("data-" + e), this[t]["data-" + e] = null;
        return this;
      }, getCorrectStyleName: function(e) {
        if (!u[e]) {
          var t;
          e in i && (t = e);
          for (var n = e[0].toUpperCase() + e.slice(1), r2 = a.length; r2--; ) (e = a[r2] + n) in i && (t = e);
          u[e] = t;
        }
        return u[e];
      }, css: function(e, t) {
        if (void 0 !== t) {
          if (0 === this.length) return this;
          ("string" != typeof t || "" === t.trim() || isNaN(t)) && "number" != typeof t || !/(margin)|(padding)|(height)|(width)|(top)|(left)|(right)|(bottom)/gi.test(e) || /(line-height)/gi.test(e) || (t += "px");
          for (var n = 0; n < this.length; n++) e = N(this).getCorrectStyleName(e), this[n].style[e] = t;
          return this;
        }
        if ("string" == typeof e) {
          if (0 === this.length) return void 0;
          var r2 = this[0].ownerDocument || document, o2 = r2.defaultView || r2.parentWindow;
          return e = N(this).getCorrectStyleName(e), o2.getComputedStyle(this[0])[e];
        }
        for (var i2 in e) Object.prototype.hasOwnProperty.call(e, i2) && this.css(i2, e[i2]);
        return this;
      }, toggleClass: function(e, t) {
        if (1 < e.split(" ").length) {
          for (var n = e.split(" "), r2 = 0; r2 < n.length; r2++) this.toggleClass(n[r2], t);
          return this;
        }
        for (var o2 = 0; o2 < this.length; o2++) void 0 === t ? this[o2].classList.contains(e) ? this[o2].classList.remove(e) : this[o2].classList.add(e) : t ? this[o2].classList.contains(e) || this[o2].classList.add(e) : this[o2].classList.contains(e) && this[o2].classList.remove(e);
        return this;
      }, addClass: function(e) {
        if (0 === e.length) return this;
        if (1 < e.split(" ").length) {
          for (var t = e.split(" "), n = 0; n < t.length; n++) this.addClass(t[n]);
          return this;
        }
        for (var r2 = 0; r2 < this.length; r2++) this[r2].classList.add(e);
        return this;
      }, removeClass: function(e) {
        if (1 < e.split(" ").length) {
          for (var t = e.split(" "), n = 0; n < t.length; n++) t[n] = t[n].trim(), t[n].length && this.removeClass(t[n]);
          return this;
        }
        for (var r2 = 0; r2 < this.length; r2++) e.length && this[r2].classList.remove(e);
        return this;
      }, getClass: function(e) {
        return e.getAttribute && e.getAttribute("class") || "";
      }, stripAndCollapse: function(e) {
        return (e.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      }, hasClass: function(e) {
        var t, n, r2 = 0;
        for (t = " " + e + " "; n = this[r2++]; ) if (1 === n.nodeType && -1 < (" " + N(this).stripAndCollapse(N(this).getClass(n)) + " ").indexOf(t)) return true;
        return false;
      }, scrollTop: function(e) {
        if (void 0 === e) return 0 === this.length ? void 0 : this[0] === document ? document.documentElement.scrollTop : this[0].scrollTop;
        for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(document.documentElement.scrollLeft, e) : this[t].scrollTop = e;
      }, scrollLeft: function(e) {
        if (void 0 === e) return 0 === this.length ? void 0 : this[0] === document ? document.documentElement.scrollLeft : this[0].scrollLeft;
        for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(e, document.documentElement.scrollTop) : this[t].scrollLeft = e;
      }, on: function(e, t, n) {
        if (1 < e.split(" ").length) {
          for (var r2 = e.split(" "), o2 = 0; o2 < r2.length; o2++) if (-1 !== p.indexOf(e)) for (var i2 = 0; i2 < f.length; i2++) this.on(f[i2] + e[0].toUpperCase() + e.slice(1), t, n);
          else this.on(r2[o2], t, n);
          return this;
        }
        n = "function" == typeof t ? C(t, null) : C(n, t);
        for (var a2 = 0; a2 < this.length; a2++) {
          var s2 = N(this[a2]);
          s2.data("events") || s2.data("events", []), s2.data("events").push([e, n]);
          var l2 = e.split(".");
          l2 = l2[0], /Android/i.test(navigator.userAgent) && e.includes("touchend") || !(0 <= c.indexOf(l2)) ? s2.get(0).addEventListener(l2, n) : s2.get(0).addEventListener(l2, n, { passive: true });
        }
      }, off: function(e) {
        if (1 < e.split(" ").length) {
          for (var t = e.split(" "), n = 0; n < t.length; n++) this.off(t[n]);
          return this;
        }
        for (var r2 = 0; r2 < this.length; r2++) {
          var o2 = N(this[r2]);
          if (o2.data("events")) {
            var i2 = e.split(".");
            i2 = i2[0];
            for (var a2 = o2.data("events") || [], s2 = a2.length - 1; 0 <= s2; s2--) {
              var l2 = a2[s2];
              l2[0] == e && (o2.get(0).removeEventListener(i2, l2[1]), a2.splice(s2, 1));
            }
          }
        }
      }, trigger: function(e) {
        for (var t = 0; t < this.length; t++) {
          var n = void 0;
          "function" == typeof Event ? n = 0 <= e.search(/^mouse/g) ? new MouseEvent(e, { view: window, cancelable: true, bubbles: true }) : new Event(e) : 0 <= e.search(/^mouse/g) ? (n = document.createEvent("MouseEvents")).initMouseEvent(e, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null) : (n = document.createEvent("Event")).initEvent(e, true, true), 0 <= r.indexOf(e) && "function" == typeof this[t][e] ? this[t][e]() : this[t].dispatchEvent(n);
        }
      }, triggerHandler: function() {
      }, val: function(e) {
        if (void 0 === e) return this[0].value;
        for (var t = 0; t < this.length; t++) this[t].value = e;
        return this;
      }, siblings: function() {
        return N(this[0]).parent().children().not(this);
      }, find: function(e) {
        var t = N();
        if ("string" != typeof e) {
          for (var n = 0; n < e.length; n++) for (var r2 = 0; r2 < this.length; r2++) if (this[r2] !== e[n] && N(this[r2]).contains(e[n])) {
            t.push(e[n]);
            break;
          }
          return t;
        }
        var o2 = function o3(e2) {
          return "object" === ("undefined" == typeof HTMLElement ? "undefined" : w(HTMLElement)) ? e2 instanceof HTMLElement : e2 && "object" === w(e2) && null !== e2 && 1 === e2.nodeType && "string" == typeof e2.nodeName;
        };
        e = v(e);
        for (var i2 = 0; i2 < this.length; i2++) if (this[i2].querySelectorAll) {
          var a2 = [];
          if (e && "string" == typeof e) try {
            a2 = this[i2].querySelectorAll(e);
          } catch (l2) {
            a2 = this[i2].children;
          }
          else o2(e) && (a2 = [e]);
          for (var s2 = 0; s2 < a2.length; s2++) t.push(a2[s2]);
        }
        return t;
      }, children: function() {
        for (var e = N(), t = 0; t < this.length; t++) for (var n = this[t].children, r2 = 0; r2 < n.length; r2++) e.push(n[r2]);
        return e;
      }, not: function(e) {
        if ("string" == typeof e) for (var t = this.length - 1; 0 <= t; t--) Element.prototype.matches.call(this[t], e) && this.splice(t, 1);
        else if (e instanceof m) {
          for (var n = this.length - 1; 0 <= n; n--) for (var r2 = 0; r2 < e.length; r2++) if (this[n] === e[r2]) {
            this.splice(n, 1);
            break;
          }
        } else for (var o2 = this.length - 1; 0 <= o2; o2--) this[o2] === e[0] && this.splice(o2, 1);
        return this;
      }, add: function(e) {
        for (var t = 0; t < e.length; t++) this.push(e[t]);
        return this;
      }, closest: function(e) {
        for (var t = 0; t < this.length; t++) {
          var n = Element.prototype.closest.call(this[t], e);
          if (n) return N(n);
        }
        return N();
      }, html: function(e) {
        if (void 0 === e) return 0 === this.length ? void 0 : this[0].innerHTML;
        if ("string" == typeof e) for (var t = 0; t < this.length; t++) {
          this[t].innerHTML = e;
          for (var n = this[t].children, r2 = this[t].ownerDocument || document, o2 = 0; o2 < n.length; o2++) if ("SCRIPT" === n[o2].tagName) {
            var i2 = r2.createElement("script");
            i2.innerHTML = n[o2].innerHTML, n[o2].hasAttribute("async") && i2.setAttribute("async", ""), i2.src = n[o2].src, n[o2].hasAttribute("defer") && i2.setAttribute("defer", ""), r2.head.appendChild(i2).parentNode.removeChild(i2);
          }
        }
        else {
          this[0].innerHTML = "", this.append(e[0]);
          var a2 = this[0].ownerDocument || document;
          if ("SCRIPT" === e[0].tagName) {
            var s2 = a2.createElement("script");
            s2.innerHTML = e[0].innerHTML, a2.head.appendChild(s2).parentNode.removeChild(s2);
          }
        }
        return this;
      }, text: function(e) {
        if (!e) return this.length ? this[0].textContent : "";
        for (var t = 0; t < this.length; t++) this[t].textContent = e;
      }, after: function e(t) {
        if (t) if ("string" == typeof t) for (var n = 0; n < this.length; n++) {
          var e2 = this[n];
          if (e2.nodeType != Node.ELEMENT_NODE) {
            var r2 = e2.ownerDocument.createElement("SPAN");
            N(e2).after(r2), N(r2).after(t).remove();
          } else e2.insertAdjacentHTML("afterend", t);
        }
        else {
          var o2 = this[0];
          if (o2.nextSibling) if (t instanceof m) for (var i2 = 0; i2 < t.length; i2++) o2.nextSibling.parentNode.insertBefore(t[i2], o2.nextSibling);
          else o2.nextSibling.parentNode.insertBefore(t, o2.nextSibling);
          else N(o2.parentNode).append(t);
        }
        return this;
      }, clone: function(e) {
        for (var t = N(), n = 0; n < this.length; n++) t.push(this[n].cloneNode(e));
        return t;
      }, replaceWith: function(e) {
        if ("string" == typeof e) for (var t = 0; t < this.length; t++) this[t].parentNode && (this[t].outerHTML = e);
        else if (e && e.length) for (var n = 0; n < this.length; n++) this.replaceWith(e[n]);
        else this.after(e).remove();
      }, insertBefore: function(e) {
        return N(e).before(this[0]), this;
      }, before: function e(t) {
        if (t instanceof m) {
          for (var n = 0; n < t.length; n++) this.before(t[n]);
          return this;
        }
        if (t) if ("string" == typeof t) for (var r2 = 0; r2 < this.length; r2++) {
          var e2 = this[r2];
          if (e2.nodeType != Node.ELEMENT_NODE) {
            var o2 = e2.ownerDocument.createElement("SPAN");
            N(e2).before(o2), N(o2).before(t).remove();
          } else e2.parentNode && e2.insertAdjacentHTML("beforebegin", t);
        }
        else {
          var i2 = this[0];
          if (i2.parentNode) if (t instanceof m) for (var a2 = 0; a2 < t.length; a2++) i2.parentNode.insertBefore(t[a2], i2);
          else i2.parentNode.insertBefore(t, i2);
        }
        return this;
      }, append: function(e) {
        if (0 == this.length) return this;
        if ("string" == typeof e) for (var t = 0; t < this.length; t++) {
          var n = this[t], r2 = n.ownerDocument.createElement("SPAN");
          N(n).append(r2), N(r2).after(e).remove();
        }
        else if (e instanceof m || Array.isArray(e)) for (var o2 = 0; o2 < e.length; o2++) this.append(e[o2]);
        else "function" != typeof e && this[0].appendChild(e);
        return this;
      }, prepend: function(e) {
        if (0 == this.length) return this;
        if ("string" == typeof e) for (var t = 0; t < this.length; t++) {
          var n = this[t], r2 = n.ownerDocument.createElement("SPAN");
          N(n).prepend(r2), N(r2).before(e).remove();
        }
        else if (e instanceof m) for (var o2 = 0; o2 < e.length; o2++) this.prepend(e[o2]);
        else {
          var i2 = this[0];
          i2.firstChild ? i2.firstChild ? i2.insertBefore(e, i2.firstChild) : i2.appendChild(e) : N(i2).append(e);
        }
        return this;
      }, remove: function() {
        for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      }, prev: function() {
        return this.length && this[0].previousElementSibling ? N(this[0].previousElementSibling) : N();
      }, next: function() {
        return this.length && this[0].nextElementSibling ? N(this[0].nextElementSibling) : N();
      }, nextAllVisible: function() {
        return this.next();
      }, prevAllVisible: function() {
        return this.prev();
      }, outerHeight: function(e) {
        if (0 === this.length) return void 0;
        var t = this[0];
        if (t === t.window) return t.innerHeight;
        var n = {}, r2 = this.isVisible();
        if (!r2) for (var o2 in s) n[o2] = t.style[o2], t.style[o2] = s[o2];
        var i2 = t.offsetHeight;
        if (e && (i2 += parseInt(N(t).css("marginTop")) + parseInt(N(t).css("marginBottom"))), !r2) for (var a2 in s) t.style[a2] = n[a2];
        return i2;
      }, outerWidth: function(e) {
        if (0 === this.length) return void 0;
        var t = this[0];
        if (t === t.window) return t.outerWidth;
        var n = {}, r2 = this.isVisible();
        if (!r2) for (var o2 in s) n[o2] = t.style[o2], t.style[o2] = s[o2];
        var i2 = t.offsetWidth;
        if (e && (i2 += parseInt(N(t).css("marginLeft")) + parseInt(N(t).css("marginRight"))), !r2) for (var a2 in s) t.style[a2] = n[a2];
        return i2;
      }, width: function(e) {
        if (e === void 0) {
          if (this[0] instanceof HTMLDocument) return this[0].body.offsetWidth;
          if (this[0]) return this[0].offsetWidth;
        } else this[0].style.width = e + "px";
      }, height: function(e) {
        var t = this[0];
        if (e === void 0) {
          if (t instanceof HTMLDocument) {
            var n = t.documentElement;
            return Math.max(t.body.scrollHeight, n.scrollHeight, t.body.offsetHeight, n.offsetHeight, n.clientHeight);
          }
          return t.offsetHeight;
        }
        t.style.height = e + "px";
      }, is: function(e) {
        return 0 !== this.length && ("string" == typeof e && this[0].matches ? this[0].matches(e) : e instanceof m ? this[0] == e[0] : this[0] == e);
      }, parent: function() {
        return 0 === this.length ? N() : N(this[0].parentNode);
      }, _matches: function(e, t) {
        var n = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector;
        return e && !t ? n : n.call(e, t);
      }, parents: function(e) {
        for (var t = N(), n = 0; n < this.length; n++) for (var r2 = this[n].parentNode; r2 && r2 != document && this._matches(r2); ) e ? this._matches(r2, e) && t.push(r2) : t.push(r2), r2 = r2.parentNode;
        return t;
      }, parentsUntil: function(e, t) {
        var n = N();
        e instanceof m && 0 < e.length && (e = e[0]);
        for (var r2 = 0; r2 < this.length; r2++) for (var o2 = this[r2].parentNode; o2 && o2 != document && o2 != e && this[r2] != e && ("string" != typeof e || !Element.prototype.matches.call(o2, e)); ) t ? Element.prototype.matches.call(o2, t) && n.push(o2) : n.push(o2), o2 = o2.parentNode;
        return n;
      }, insertAfter: function(e) {
        var t = e.parent()[0];
        t && t.insertBefore(this[0], e[0].nextElementSibling);
      }, filter: function(e) {
        var t = N();
        if ("function" == typeof e) for (var n = 0; n < this.length; n++) e.call(this[n], this[n]) && t.push(this[n]);
        else if ("string" == typeof e) for (var r2 = 0; r2 < this.length; r2++) this[r2].matches(e) && t.push(this[r2]);
        return t;
      }, offset: function() {
        if (0 === this.length) return void 0;
        var e = this[0].getBoundingClientRect(), t = this[0].ownerDocument.defaultView;
        return { top: e.top + t.pageYOffset, left: e.left + t.pageXOffset };
      }, position: function() {
        return { left: this[0].offsetLeft, top: this[0].offsetTop };
      }, push: [].push, splice: [].splice }, m.extend = function(e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++) if (arguments[t]) for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
        return e;
      }, m.merge = function(e, t) {
        for (var n = +t.length, r2 = 0, o2 = e.length; r2 < n; r2++) e[o2++] = t[r2];
        return e.length = o2, e;
      }, m.map = function(e, t, n) {
        var r2, o2, i2 = 0, a2 = [];
        if (Array.isArray(e)) for (r2 = e.length; i2 < r2; i2++) null != (o2 = t(e[i2], i2, n)) && a2.push(o2);
        else for (i2 in e) null != (o2 = t(e[i2], i2, n)) && a2.push(o2);
        return [].concat.apply([], a2);
      };
      var T = function T2(e, t) {
        if (!e) return this;
        if ("string" == typeof e && "<" === e[0]) {
          var n = document.createElement("DIV");
          return n.innerHTML = e, N(n.firstElementChild);
        }
        if (t = t instanceof m ? t[0] : t, "string" != typeof e) return e instanceof m ? e : (this[0] = e, this.length = 1, this);
        e = v(e);
        for (var r2 = (t || document).querySelectorAll(e), o2 = 0; o2 < r2.length; o2++) this[o2] = r2[o2];
        return this.length = r2.length, this;
      };
      T.prototype = m.prototype;
      var S = X;
      function O() {
        var t = this;
        this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = m(this.doc), this.$win = m(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(S.PLUGINS)), this.opts.pluginsDisabled && (this.opts.pluginsDisabled = Array.isArray(this.opts.pluginsDisabled) ? this.opts.pluginsDisabled : [this.opts.pluginsDisabled], this.opts.pluginsEnabled = this.opts.pluginsEnabled.filter(function(e) {
          return !t.opts.pluginsDisabled.includes(e);
        })), this.opts.initOnClick ? (this.load(S.MODULES), this.$el.on("touchstart.init", function() {
          m(this).data("touched", true);
        }), this.$el.on("touchmove.init", function() {
          m(this).removeData("touched");
        }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", (function r2(e) {
          if ("false" !== this.$el.attr("contentEditable") || !this.opts.initOnClick) {
            if ("touchend" === e.type && !this.$el.data("touched")) return true;
            if (1 === e.which || !e.which) {
              this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(S.MODULES), this.load(S.PLUGINS);
              var t2 = e.originalEvent && e.originalEvent.originalTarget;
              if (t2 && "IMG" === t2.tagName && m(t2).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" === e.type && this.image && e.originalEvent && e.originalEvent.target && m(e.originalEvent.target).is("img")) {
                var n = this;
                setTimeout(function() {
                  n.image.edit(m(e.originalEvent.target));
                }, 100);
              }
              this.ready = true, this.events.trigger("initialized");
            }
          }
        }).bind(this)), this.events.trigger("initializationDelayed")) : (this.load(S.MODULES), this.load(S.PLUGINS), m(this.o_win).scrollTop(this.c_scroll), "undefined" == typeof this.ul && this.destroy(), this.ready = true, this.events.trigger("initialized"));
      }
      return S.Bootstrap = function(e, t, n) {
        this.id = ++S.ID, this.$ = m;
        var r2 = {};
        "function" == typeof t && (n = t, t = {}), n && (t.events || (t.events = {}), t.events.initialized = n), t && t.documentReady && (r2.toolbarButtons = [["fullscreen", "undo", "redo", "getPDF", "print", "export_to_word"], ["bold", "italic", "underline", "textColor", "backgroundColor", "clearFormatting"], ["alignLeft", "alignCenter", "alignRight", "alignJustify"], ["formatOL", "formatUL", "indent", "outdent"], ["paragraphFormat"], ["fontFamily"], ["fontSize"], ["insertLink", "insertImage", "quote", "pageBreak"]], r2.paragraphFormatSelection = true, r2.fontFamilySelection = true, r2.fontSizeSelection = true, r2.placeholderText = "", r2.quickInsertEnabled = false, r2.charCounterCount = false), this.opts = Object.assign({}, Object.assign({}, S.DEFAULTS, r2, "object" === w(t) && t));
        var o2 = JSON.stringify(this.opts);
        S.OPTS_MAPPING[o2] = S.OPTS_MAPPING[o2] || this.id, this.sid = S.OPTS_MAPPING[o2], S.SHARED[this.sid] = S.SHARED[this.sid] || {}, this.shared = S.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = m(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow, this.c_scroll = m(this.o_win).scrollTop(), this._init();
      }, S.Bootstrap.prototype._init = function() {
        var e = this.$oel.get(0).tagName;
        this.$oel.closest("label").length;
        var t = (function() {
          "TEXTAREA" !== e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = true), this.opts.iframe ? (this.$iframe = m('<iframe src="about:blank" frameBorder="0">'), this.$wp = m("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.iframe_document = this.$iframe.get(0).contentWindow.document, this.$el = m(this.iframe_document.querySelector("body")), this.el = this.$el.get(0), this.$head = m(this.iframe_document.querySelector("head")), this.$html = m(this.iframe_document.querySelector("html"))) : (this.$el = m(this.o_doc.createElement("DIV")), this.el = this.$el.get(0), this.$wp = m(this.o_doc.createElement("DIV")).append(this.$el), this.$box.html(this.$wp)), setTimeout(O.bind(this), 0);
        }).bind(this), n = (function() {
          this.$box = m("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val();
          var e2 = this;
          this.$oel.parents("form").on("submit.".concat(this.id), function() {
            e2.events.trigger("form.submit");
          }), this.$oel.parents("form").on("reset.".concat(this.id), function() {
            e2.events.trigger("form.reset");
          }), t();
        }).bind(this), r2 = (function() {
          this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", true).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = false, this.opts.toolbarInline = false, setTimeout(O.bind(this), 0);
        }).bind(this), o2 = (function() {
          this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = false, setTimeout(O.bind(this), 0);
        }).bind(this), i2 = (function() {
          this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = false, this.$oel.on("click.popup", function(e2) {
            e2.preventDefault();
          }), setTimeout(O.bind(this), 0);
        }).bind(this);
        this.opts.editInPopup ? i2() : "TEXTAREA" === e ? n() : "A" === e ? r2() : "IMG" === e ? o2() : "BUTTON" === e || "INPUT" === e ? (this.opts.editInPopup = true, this.opts.toolbarInline = false, i2()) : t();
      }, S.Bootstrap.prototype.load = function(e) {
        for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
          if (this[t]) continue;
          if (S.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue;
          if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" === t)) return false;
        }
      }, S.Bootstrap.prototype.destroy = function() {
        this.destrying = true, this.shared.count--, this.events && this.events.$off();
        var e = this.html && this.html.get();
        if (this.events && (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events.trigger("destroy", [], true), this.events.trigger("shared.destroy", [], true)), 0 === this.shared.count) {
          for (var t in this.shared) Object.prototype.hasOwnProperty.call(this.shared, t) && (this.shared[t] = null, S.SHARED[this.sid][t] = null);
          delete S.SHARED[this.sid];
        }
        this.$oel.parents("form").off(".".concat(this.id)), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core && this.core.destroy(e), S.INSTANCES.splice(S.INSTANCES.indexOf(this), 1);
      }, X;
    });
  }
});

export {
  require_froala_editor_min
};
/*! Bundled license information:

froala-editor/js/froala_editor.min.js:
  (*!
   * froala_editor v4.7.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2025 Froala Labs
   *)
*/
//# sourceMappingURL=chunk-NIYVL2AX.js.map
