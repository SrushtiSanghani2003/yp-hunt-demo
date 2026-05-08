import {
  require_froala_editor_min
} from "./chunk-NIYVL2AX.js";
import {
  require_react
} from "./chunk-JRZFYVZ4.js";
import {
  __commonJS
} from "./chunk-SNAQBZPT.js";

// node_modules/react-froala-wysiwyg/index.js
var require_react_froala_wysiwyg = __commonJS({
  "node_modules/react-froala-wysiwyg/index.js"(exports, module) {
    !(function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e(require_react(), require_froala_editor_min()) : "function" == typeof define && define.amd ? define(["react", "froala-editor"], e) : "object" == typeof exports ? exports.index = e(require_react(), require_froala_editor_min()) : t.index = e(t.React, t["froala-editor"]);
    })(exports, (t, e) => (() => {
      "use strict";
      var n = { 442: (e2) => {
        e2.exports = t;
      }, 587: (t2) => {
        t2.exports = e;
      } }, r = {};
      function o(t2) {
        var e2 = r[t2];
        if (void 0 !== e2) return e2.exports;
        var i2 = r[t2] = { exports: {} };
        return n[t2](i2, i2.exports, o), i2.exports;
      }
      o.n = (t2) => {
        var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
        return o.d(e2, { a: e2 }), e2;
      }, o.d = (t2, e2) => {
        for (var n2 in e2) o.o(e2, n2) && !o.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: e2[n2] });
      }, o.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), o.r = (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      };
      var i = {};
      o.r(i), o.d(i, { default: () => T });
      var s = o(442), a = o.n(s), c = o(587), l = o.n(c);
      function u(t2, e2) {
        var n2 = Object.keys(t2);
        if (Object.getOwnPropertySymbols) {
          var r2 = Object.getOwnPropertySymbols(t2);
          e2 && (r2 = r2.filter(function(e3) {
            return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
          })), n2.push.apply(n2, r2);
        }
        return n2;
      }
      function f(t2, e2, n2) {
        return (e2 = h(e2)) in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
      }
      function p(t2) {
        return p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        }, p(t2);
      }
      function d(t2, e2) {
        for (var n2 = 0; n2 < e2.length; n2++) {
          var r2 = e2[n2];
          r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, h(r2.key), r2);
        }
      }
      function h(t2) {
        var e2 = (function(t3) {
          if ("object" != p(t3) || !t3) return t3;
          var e3 = t3[Symbol.toPrimitive];
          if (void 0 !== e3) {
            var n2 = e3.call(t3, "string");
            if ("object" != p(n2)) return n2;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t3);
        })(t2);
        return "symbol" == p(e2) ? e2 : e2 + "";
      }
      function y() {
        try {
          var t2 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch (t3) {
        }
        return (y = function() {
          return !!t2;
        })();
      }
      function v(t2) {
        return v = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
          return t3.__proto__ || Object.getPrototypeOf(t3);
        }, v(t2);
      }
      function b(t2, e2) {
        return b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
          return t3.__proto__ = e3, t3;
        }, b(t2, e2);
      }
      function g(t2) {
        return g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        }, g(t2);
      }
      function m(t2, e2) {
        for (var n2 = 0; n2 < e2.length; n2++) {
          var r2 = e2[n2];
          r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, O(r2.key), r2);
        }
      }
      function O(t2) {
        var e2 = (function(t3) {
          if ("object" != g(t3) || !t3) return t3;
          var e3 = t3[Symbol.toPrimitive];
          if (void 0 !== e3) {
            var n2 = e3.call(t3, "string");
            if ("object" != g(n2)) return n2;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t3);
        })(t2);
        return "symbol" == g(e2) ? e2 : e2 + "";
      }
      function j() {
        try {
          var t2 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch (t3) {
        }
        return (j = function() {
          return !!t2;
        })();
      }
      function E(t2) {
        return E = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
          return t3.__proto__ || Object.getPrototypeOf(t3);
        }, E(t2);
      }
      function w(t2, e2) {
        return w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
          return t3.__proto__ = e3, t3;
        }, w(t2, e2);
      }
      var T = (function(t2) {
        function e2() {
          return (function(t3, e3) {
            if (!(t3 instanceof e3)) throw new TypeError("Cannot call a class as a function");
          })(this, e2), (function(t3, e3, n3) {
            return e3 = E(e3), (function(t4, e4) {
              if (e4 && ("object" == g(e4) || "function" == typeof e4)) return e4;
              if (void 0 !== e4) throw new TypeError("Derived constructors may only return object or undefined");
              return (function(t5) {
                if (void 0 === t5) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t5;
              })(t4);
            })(t3, j() ? Reflect.construct(e3, n3 || [], E(t3).constructor) : e3.apply(t3, n3));
          })(this, e2, arguments);
        }
        return (function(t3, e3) {
          if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
          t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && w(t3, e3);
        })(e2, t2), n2 = e2, (r2 = [{ key: "render", value: function() {
          var t3 = this;
          return a().createElement(this.tag, { ref: function(e3) {
            return t3.el = e3;
          } }, this.props.children);
        } }]) && m(n2.prototype, r2), Object.defineProperty(n2, "prototype", { writable: false }), n2;
        var n2, r2;
      })((function(t2) {
        function e2(t3) {
          var n3;
          return (function(t4, e3) {
            if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
          })(this, e2), (n3 = (function(t4, e3, n4) {
            return e3 = v(e3), (function(t5, e4) {
              if (e4 && ("object" == p(e4) || "function" == typeof e4)) return e4;
              if (void 0 !== e4) throw new TypeError("Derived constructors may only return object or undefined");
              return (function(t6) {
                if (void 0 === t6) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t6;
              })(t5);
            })(t4, y() ? Reflect.construct(e3, n4 || [], v(t4).constructor) : e3.apply(t4, n4));
          })(this, e2, [t3])).defaultTag = "div", n3.tag = t3.tag || n3.defaultTag, n3.listeningEvents = [], n3.element = null, n3.editor = null, n3.config = { immediateReactModelUpdate: false, reactIgnoreAttrs: null }, n3.editorInitialized = false, n3.editorCreated = false, n3.SPECIAL_TAGS = ["img", "button", "input", "a"], n3.INNER_HTML_ATTR = "innerHTML", n3.hasSpecialTag = false, n3.oldModel = null, n3;
        }
        return (function(t3, e3) {
          if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
          t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && b(t3, e3);
        })(e2, t2), n2 = e2, r2 = [{ key: "componentDidMount", value: function() {
          var t3 = this.el.tagName.toLowerCase();
          -1 != this.SPECIAL_TAGS.indexOf(t3) && (this.tag = t3, this.hasSpecialTag = true), this.props.onManualControllerReady ? this.generateManualController() : this.createEditor();
        } }, { key: "componentWillUnmount", value: function() {
          this.destroyEditor();
        } }, { key: "componentDidUpdate", value: function() {
          JSON.stringify(this.oldModel) != JSON.stringify(this.props.model) && this.setContent();
        } }, { key: "clone", value: function(t3) {
          var e3, n3 = this;
          if (!t3) return t3;
          if ([Number, String, Boolean].forEach(function(n4) {
            t3 instanceof n4 && (e3 = n4(t3));
          }), void 0 === e3) if ("[object Array]" === Object.prototype.toString.call(t3)) e3 = [], t3.forEach(function(t4, r4, o2) {
            e3[r4] = n3.clone(t4);
          });
          else if ("object" == p(t3)) if (t3.nodeType && "function" == typeof t3.cloneNode) e3 = t3.cloneNode(true);
          else if (t3.prototype) e3 = t3;
          else if (t3 instanceof Date) e3 = new Date(t3);
          else for (var r3 in e3 = {}, t3) e3[r3] = n3.clone(t3[r3]);
          else e3 = t3;
          return e3;
        } }, { key: "createEditor", value: function() {
          var t3 = this;
          this.editorInitialized || this.editorCreated || (this.config = this.clone(this.props.config || this.config), this.config = (function(t4) {
            for (var e3 = 1; e3 < arguments.length; e3++) {
              var n3 = null != arguments[e3] ? arguments[e3] : {};
              e3 % 2 ? u(Object(n3), true).forEach(function(e4) {
                f(t4, e4, n3[e4]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t4, Object.getOwnPropertyDescriptors(n3)) : u(Object(n3)).forEach(function(e4) {
                Object.defineProperty(t4, e4, Object.getOwnPropertyDescriptor(n3, e4));
              });
            }
            return t4;
          })({}, this.config), this.element = this.el, this.setContent(true), this.registerEvent("initialized", this.config.events && this.config.events.initialized), this.config.events || (this.config.events = {}), this.config.events.initialized = function() {
            return t3.initListeners();
          }, this.editor = new (l())(this.element, this.config), this.editorCreated = true);
        } }, { key: "setContent", value: function(t3) {
          (this.props.model || "" == this.props.model) && (this.oldModel = this.props.model, this.hasSpecialTag ? this.setSpecialTagContent() : this.setNormalTagContent(t3));
        } }, { key: "setNormalTagContent", value: function(t3) {
          var e3 = this, n3 = this;
          function r3() {
            n3.editor.html && n3.editor.html.set(n3.props.model || ""), n3.editorInitialized && n3.editor.undo && (n3.props.skipReset || n3.editor.undo.reset(), n3.editor.undo.saveStep());
          }
          t3 ? this.config.initOnClick ? (this.registerEvent("initializationDelayed", function() {
            r3();
          }), this.registerEvent("initialized", function() {
            e3.editorInitialized = true;
          })) : this.registerEvent("initialized", function() {
            e3.editorInitialized = true, r3();
          }) : r3();
        } }, { key: "setSpecialTagContent", value: function() {
          var t3 = this.props.model;
          if (t3) {
            for (var e3 in t3) t3.hasOwnProperty(e3) && e3 != this.INNER_HTML_ATTR && this.element.setAttribute(e3, t3[e3]);
            t3.hasOwnProperty(this.INNER_HTML_ATTR) && (this.element.innerHTML = t3[this.INNER_HTML_ATTR]);
          }
        } }, { key: "destroyEditor", value: function() {
          if (this.element) {
            this.editor.destroy && this.editor.destroy(), this.listeningEvents.length = 0, this.element = null, this.editorInitialized = false, this.editorCreated = false, this.config = { immediateReactModelUpdate: false, reactIgnoreAttrs: null };
            var t3 = this.el.tagName.toLowerCase();
            -1 == this.SPECIAL_TAGS.indexOf(t3) && this.editor && this.editor.destrying && !this.props.onManualControllerReady && "textarea" == this.tag && this.editor.$box.remove(), "textarea" != this.tag && (this.editor.$wp = "");
          }
        } }, { key: "getEditor", value: function() {
          return this.element ? this.editor : null;
        } }, { key: "generateManualController", value: function() {
          var t3 = this, e3 = { initialize: function() {
            return t3.createEditor.call(t3);
          }, destroy: function() {
            return t3.destroyEditor.call(t3);
          }, getEditor: function() {
            return t3.getEditor.call(t3);
          } };
          this.props.onManualControllerReady(e3);
        } }, { key: "updateModel", value: function() {
          if (this.props.onModelChange) {
            var t3 = "";
            if (this.hasSpecialTag) {
              for (var e3 = this.element.attributes, n3 = {}, r3 = 0; r3 < e3.length; r3++) {
                var o2 = e3[r3].name;
                this.config.reactIgnoreAttrs && -1 != this.config.reactIgnoreAttrs.indexOf(o2) || (n3[o2] = e3[r3].value);
              }
              this.element.innerHTML && (n3[this.INNER_HTML_ATTR] = this.element.innerHTML), t3 = n3;
            } else {
              var i2 = this.editor.html.get();
              "string" == typeof i2 && (t3 = i2);
            }
            this.oldModel = t3, this.props.onModelChange(t3);
          }
        } }, { key: "initListeners", value: function() {
          var t3 = this;
          if (this.editor && this.editor.events && this.editor.events.on("contentChanged", function() {
            t3.updateModel();
          }), this.config.immediateReactModelUpdate && this.editor.events.on("keyup", function() {
            t3.updateModel();
          }), this._initEvents) for (var e3 = 0; e3 < this._initEvents.length; e3++) this._initEvents[e3].call(this.editor);
        } }, { key: "registerEvent", value: function(t3, e3) {
          t3 && e3 && ("initialized" == t3 ? (this._initEvents || (this._initEvents = []), this._initEvents.push(e3)) : (this.config.events || (this.config.events = {}), this.config.events[t3] = e3));
        } }], r2 && d(n2.prototype, r2), Object.defineProperty(n2, "prototype", { writable: false }), n2;
        var n2, r2;
      })(a().Component));
      return i;
    })());
  }
});
export default require_react_froala_wysiwyg();
//# sourceMappingURL=react-froala-wysiwyg.js.map
