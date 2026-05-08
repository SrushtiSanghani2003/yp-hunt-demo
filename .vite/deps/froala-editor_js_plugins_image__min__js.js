import {
  require_froala_editor_min
} from "./chunk-NIYVL2AX.js";
import {
  __commonJS
} from "./chunk-SNAQBZPT.js";

// node_modules/froala-editor/js/plugins/image.min.js
var require_image_min = __commonJS({
  "node_modules/froala-editor/js/plugins/image.min.js"(exports, module) {
    !(function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(require_froala_editor_min()) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor);
    })(exports, function(Me) {
      "use strict";
      function r(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, i = Array(t); a < t; a++) i[a] = e[a];
        return i;
      }
      function Ke(e, t) {
        var a = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!a) {
          if (Array.isArray(e) || (a = l(e)) || t && e && "number" == typeof e.length) {
            a && (e = a);
            var i = 0, r2 = function() {
            };
            return { s: r2, n: function() {
              return i >= e.length ? { done: true } : { done: false, value: e[i++] };
            }, e: function(e2) {
              throw e2;
            }, f: r2 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var n, o = true, s = false;
        return { s: function() {
          a = a.call(e);
        }, n: function() {
          var e2 = a.next();
          return o = e2.done, e2;
        }, e: function(e2) {
          s = true, n = e2;
        }, f: function() {
          try {
            o || null == a["return"] || a["return"]();
          } finally {
            if (s) throw n;
          }
        } };
      }
      function Ye(e) {
        return (function t(e2) {
          if (Array.isArray(e2)) return r(e2);
        })(e) || (function a(e2) {
          if ("undefined" != typeof Symbol && null != e2[Symbol.iterator] || null != e2["@@iterator"]) return Array.from(e2);
        })(e) || l(e) || (function i() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
      }
      function We(e) {
        return (We = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
          return typeof e2;
        } : function(e2) {
          return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
        })(e);
      }
      function l(e, t) {
        if (e) {
          if ("string" == typeof e) return r(e, t);
          var a = {}.toString.call(e).slice(8, -1);
          return "Object" === a && e.constructor && (a = e.constructor.name), "Map" === a || "Set" === a ? Array.from(e) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? r(e, t) : void 0;
        }
      }
      Me = Me && Me.hasOwnProperty("default") ? Me["default"] : Me, Object.assign(Me.POPUP_TEMPLATES, { "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]", "image.edit": "[_BUTTONS_]", "image.alt": "[_BUTTONS_][_ALT_LAYER_]", "image.size": "[_BUTTONS_][_SIZE_LAYER_]" }), Object.assign(Me.DEFAULTS, { imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"], imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"], imageAltButtons: ["imageBack", "|"], imageSizeButtons: ["imageBack", "|"], imageUpload: true, imageUploadURL: null, imageCORSProxy: "https://cors-anywhere.froala.com", imageUploadRemoteUrls: true, imageUploadParam: "file", imageUploadParams: {}, imageUploadToS3: false, imageUploadToAzure: false, imageUploadMethod: "POST", imageMaxSize: 10485760, imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"], imageResize: true, imageResizeWithPercent: false, imageRoundPercent: false, imageDefaultWidth: 300, imageDefaultAlign: "center", imageDefaultDisplay: "block", imageSplitHTML: false, imageStyles: { "fr-rounded": "Rounded", "fr-bordered": "Bordered", "fr-shadow": "Shadow" }, imageMove: true, imageMultipleStyles: true, imageTextNear: true, imagePaste: true, imagePasteProcess: false, imageMinWidth: 16, imageOutputSize: false, imageDefaultMargin: 5, imageAddNewLine: false }), Me.IMAGE_ALLOW_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, Me.PLUGINS.image = function(R) {
        var U, p, f, g, c, a, A = R.$, C = "https://i.froala.com/upload", t = false, i = 1, d = 2, u = 3, m = 4, S = 5, E = 6, r2 = {};
        function h() {
          var e = R.popups.get("image.insert").find(".fr-image-by-url-layer input");
          e.val(""), U && e.val(U.attr("src")), e.trigger("change");
        }
        function o(e) {
          return window.pageYOffset + e.get(0).getBoundingClientRect().top;
        }
        function n() {
          var e = R.popups.get("image.edit");
          if (e || (e = N()), e) {
            var t2 = U;
            R.popups.setContainer("image.edit", R.$wp || R.$sc), R.popups.refresh("image.edit");
            var a2 = t2.offset().left + t2.outerWidth() / 2, i2 = t2 && o(t2), r3 = R.$wp && o(R.$wp);
            r3 || (r3 = i2);
            var n2 = 0;
            R.opts.iframe ? ((n2 = R.$wp.scrollTop() + e.outerHeight()) < t2.get(0).getBoundingClientRect().top && (n2 = t2.get(0).getBoundingClientRect().top), n2 > t2.get(0).getBoundingClientRect().top + t2.height() && (n2 = t2.get(0).getBoundingClientRect().top + t2.height())) : n2 = r3 < i2 ? i2 : R.$wp && i2 + t2.height() < r3 + R.$wp.height() ? i2 + t2.height() : r3 + e.outerHeight(), U.hasClass("fr-uploading") ? P() : R.popups.show("image.edit", a2, n2, 1, true);
          }
        }
        function v() {
          k();
        }
        function s(e) {
          0 < e.parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption").first());
          var t2 = e.hasClass("fr-dib") ? "block" : e.hasClass("fr-dii") ? "inline" : null, a2 = e.hasClass("fr-fil") ? "left" : e.hasClass("fr-fir") ? "right" : ve(e);
          he(e, t2, a2), e.removeClass("fr-dib fr-dii fr-fir fr-fil");
        }
        function l2() {
          for (var e, t2 = "IMG" == R.el.tagName ? [R.el] : R.el.querySelectorAll("img"), a2 = 0; a2 < t2.length; a2++) {
            var i2 = A(t2[a2]);
            !R.opts.htmlUntouched && R.opts.useClasses ? ((R.opts.imageDefaultAlign || R.opts.imageDefaultDisplay) && (0 < (e = i2).parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption").first()), e.hasClass("fr-dii") || e.hasClass("fr-dib") || (e.addClass("fr-fi".concat(ve(e)[0])), e.addClass("fr-di".concat(be(e)[0])), e.css("margin", ""), e.css("float", ""), e.css("display", ""), e.css("z-index", ""), e.css("position", ""), e.css("overflow", ""), e.css("vertical-align", ""))), R.opts.imageTextNear || (0 < i2.parents(".fr-img-caption").length ? i2.parents(".fr-img-caption").first().removeClass("fr-dii").addClass("fr-dib") : i2.removeClass("fr-dii").addClass("fr-dib"))) : R.opts.htmlUntouched || R.opts.useClasses || (R.opts.imageDefaultAlign || R.opts.imageDefaultDisplay) && s(i2), R.opts.iframe && i2.on("load", R.size.syncIframe);
          }
        }
        function b(e) {
          void 0 === e && (e = true);
          var t2, a2 = Array.prototype.slice.call(R.el.querySelectorAll("img")), i2 = [];
          for (t2 = 0; t2 < a2.length; t2++) if (i2.push(a2[t2].getAttribute("src")), A(a2[t2]).toggleClass("fr-draggable", R.opts.imageMove), "" === a2[t2].getAttribute("class") && a2[t2].removeAttribute("class"), "" === a2[t2].getAttribute("style") && a2[t2].removeAttribute("style"), a2[t2].parentNode && a2[t2].parentNode.parentNode && R.node.hasClass(a2[t2].parentNode.parentNode, "fr-img-caption")) {
            var r3 = a2[t2].parentNode.parentNode;
            R.browser.mozilla || r3.setAttribute("contenteditable", false), r3.setAttribute("draggable", false), r3.classList.add("fr-draggable");
            var n2 = a2[t2].nextSibling;
            n2 && !R.browser.mozilla && n2.setAttribute("contenteditable", true);
          }
          if (c) for (t2 = 0; t2 < c.length; t2++) i2.indexOf(c[t2].getAttribute("src")) < 0 && R.events.trigger("image.removed", [A(c[t2])]);
          if (c && e) {
            var o2 = [];
            for (t2 = 0; t2 < c.length; t2++) o2.push(c[t2].getAttribute("src"));
            for (t2 = 0; t2 < a2.length; t2++) o2.indexOf(a2[t2].getAttribute("src")) < 0 && R.events.trigger("image.loaded", [A(a2[t2])]);
          }
          c = a2;
        }
        function x() {
          if (p || (function o2() {
            var e2;
            R.shared.$image_resizer ? (p = R.shared.$image_resizer, g = R.shared.$img_overlay, R.events.on("destroy", function() {
              A("body").first().append(p.removeClass("fr-active"));
            }, true)) : (R.shared.$image_resizer = A(document.createElement("div")).attr("class", "fr-image-resizer"), p = R.shared.$image_resizer, R.events.$on(p, "mousedown", function(e3) {
              e3.stopPropagation();
            }, true), R.opts.imageResize && (p.append(y("nw") + y("ne") + y("sw") + y("se")), R.shared.$img_overlay = A(document.createElement("div")).attr("class", "fr-image-overlay"), g = R.shared.$img_overlay, e2 = p.get(0).ownerDocument, A(e2).find("body").first().append(g)));
            R.events.on("shared.destroy", function() {
              p.html("").removeData().remove(), p = null, R.opts.imageResize && (g.remove(), g = null);
            }, true), R.helpers.isMobile() || R.events.$on(A(R.o_win), "resize", function() {
              U && !U.hasClass("fr-uploading") ? ce(true) : U && (x(), ye(), P(false));
            });
            if (R.opts.imageResize) {
              e2 = p.get(0).ownerDocument, R.events.$on(p, R._mousedown, ".fr-handler", D), R.events.$on(A(e2), R._mousemove, T), R.events.$on(A(e2.defaultView || e2.parentWindow), R._mouseup, $), R.events.$on(g, "mouseleave", $);
              var i3 = 1, r4 = null, n3 = 0;
              R.events.on("keydown", function(e3) {
                if (U) {
                  var t3 = -1 != navigator.userAgent.indexOf("Mac OS X") ? e3.metaKey : e3.ctrlKey, a3 = e3.which;
                  (a3 !== r4 || 200 < e3.timeStamp - n3) && (i3 = 1), (a3 == Me.KEYCODE.EQUALS || R.browser.mozilla && a3 == Me.KEYCODE.FF_EQUALS) && t3 && !e3.altKey ? i3 = te.call(this, e3, 1, 1, i3) : (a3 == Me.KEYCODE.HYPHEN || R.browser.mozilla && a3 == Me.KEYCODE.FF_HYPHEN) && t3 && !e3.altKey ? i3 = te.call(this, e3, 2, -1, i3) : R.keys.ctrlKey(e3) || a3 != Me.KEYCODE.ENTER || (U.before("<br>"), z(U)), r4 = a3, n3 = e3.timeStamp;
                }
              }, true), R.events.on("keyup", function() {
                i3 = 1;
              });
            }
          })(), !U) return false;
          var e = R.$wp || R.$sc;
          e.append(p), p.data("instance", R);
          var t2 = e.scrollTop() - ("static" != e.css("position") ? e.offset().top : 0), a2 = e.scrollLeft() - ("static" != e.css("position") ? e.offset().left : 0);
          a2 -= R.helpers.getPX(e.css("border-left-width")), t2 -= R.helpers.getPX(e.css("border-top-width")), R.$el.is("img") && R.$sc.is("body") && (a2 = t2 = 0);
          var i2 = Ce();
          Se() && (i2 = i2.find(".fr-img-wrap"));
          var r3 = 0, n2 = 0;
          R.opts.iframe && (r3 = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-top")), n2 = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-left"))), p.css("top", (R.opts.iframe ? i2.offset().top + r3 : i2.offset().top + t2) - 1).css("left", (R.opts.iframe ? i2.offset().left + n2 : i2.offset().left + a2) - 1).css("width", i2.get(0).getBoundingClientRect().width).css("height", i2.get(0).getBoundingClientRect().height).addClass("fr-active");
        }
        function y(e) {
          return '<div class="fr-handler fr-h'.concat(e, '"></div>');
        }
        function w(e) {
          Se() && U.parents(".fr-img-caption").css("width", e), U.css("width", e);
        }
        function D(e) {
          if (!R.core.sameInstance(p)) return true;
          if (e.preventDefault(), e.stopPropagation(), R.$el.find("img.fr-error").left) return false;
          R.undo.canDo() || R.undo.saveStep();
          var t2 = e.pageX || e.originalEvent.touches[0].pageX;
          if ("mousedown" == e.type) {
            var a2 = R.$oel.get(0), i2 = a2.ownerDocument, r3 = i2.defaultView || i2.parentWindow, n2 = false;
            try {
              n2 = r3.location != r3.parent.location && !(r3.$ && r3.$.FE);
            } catch (l3) {
            }
            n2 && r3.frameElement && (t2 += R.helpers.getPX(A(a2).offset().left) + r3.frameElement.clientLeft);
          }
          (f = A(this)).data("start-x", t2), f.data("start-width", U.width()), f.data("start-height", U.height());
          var o2 = U.width();
          if (R.opts.imageResizeWithPercent) {
            var s2 = U.parentsUntil(R.$el, R.html.blockTagsQuery()).get(0) || R.el;
            o2 = (o2 / A(s2).outerWidth() * 100).toFixed(2) + "%";
          }
          w(o2), g.show(), R.popups.hideAll(), me();
        }
        function T(e) {
          if (!R.core.sameInstance(p)) return true;
          var t2;
          if (f && U) {
            if (e.preventDefault(), R.$el.find("img.fr-error").left) return false;
            var a2 = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
            if (!a2) return false;
            var i2 = a2 - f.data("start-x"), r3 = f.data("start-width");
            if ((f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (i2 = 0 - i2), R.opts.imageResizeWithPercent) {
              var n2 = U.parentsUntil(R.$el, R.html.blockTagsQuery()).get(0) || R.el;
              r3 = ((r3 + i2) / A(n2).outerWidth() * 100).toFixed(2), R.opts.imageRoundPercent && (r3 = Math.round(r3)), w("".concat(r3, "%")), (t2 = Se() ? (R.helpers.getPX(U.parents(".fr-img-caption").css("width")) / A(n2).outerWidth() * 100).toFixed(2) : (R.helpers.getPX(U.css("width")) / A(n2).outerWidth() * 100).toFixed(2)) === r3 || R.opts.imageRoundPercent || w("".concat(t2, "%")), U.css("height", "").removeAttr("height");
            } else r3 + i2 >= R.opts.imageMinWidth && (w(r3 + i2), t2 = Se() ? R.helpers.getPX(U.parents(".fr-img-caption").css("width")) : R.helpers.getPX(U.css("width"))), t2 !== r3 + i2 && w(t2), ((U.attr("style") || "").match(/(^height:)|(; *height:)/) || U.attr("height")) && (U.css("height", f.data("start-height") * U.width() / f.data("start-width")), U.removeAttr("height"));
            x(), R.events.trigger("image.resize", [Ae()]);
          }
        }
        function $(e) {
          if (!R.core.sameInstance(p)) return true;
          if (f && U) {
            if (e && e.stopPropagation(), R.$el.find("img.fr-error").left) return false;
            f = null, g.hide(), x(), n(), R.undo.saveStep(), R.events.trigger("image.resizeEnd", [Ae()]);
          } else p.removeClass("fr-active");
        }
        function I(e, t2, a2) {
          R.edit.on(), U && U.addClass("fr-error"), r2[e] ? O(R.language.translate(r2[e])) : O(R.language.translate("Something went wrong. Please try again.")), !U && a2 && ae(a2), R.events.trigger("image.error", [{ code: e, message: r2[e] }, t2, a2]);
        }
        function N(e) {
          if (e) return R.$wp && R.events.$on(R.$wp, "scroll.image-edit", function() {
            U && R.popups.isVisible("image.edit") && (R.events.disableBlur(), n());
          }), true;
          var t2 = "";
          if (0 < R.opts.imageEditButtons.length) {
            var a2 = { buttons: t2 += '<div class="fr-buttons">\n        '.concat(R.button.buildList(R.opts.imageEditButtons), "\n        </div>") };
            return R.popups.create("image.edit", a2);
          }
          return false;
        }
        function P(e) {
          var t2 = R.popups.get("image.insert");
          if (t2 || (t2 = X()), t2.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t2.find(".fr-image-progress-bar-layer").addClass("fr-active"), t2.find(".fr-buttons").hide(), U) {
            var a2 = Ce();
            R.popups.setContainer("image.insert", R.$sc);
            var i2 = a2.offset().left, r3 = a2.offset().top + a2.height();
            R.popups.show("image.insert", i2, r3, a2.outerHeight());
          }
          void 0 === e && B(R.language.translate("Uploading"), 0);
        }
        function k(e) {
          var t2 = R.popups.get("image.insert");
          if (t2 && (t2.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t2.find(".fr-image-progress-bar-layer").removeClass("fr-active"), t2.find(".fr-buttons").show(), e || R.$el.find("img.fr-error").length)) {
            if (R.events.focus(), R.$el.find("img.fr-error").length && (R.$el.find("img.fr-error").remove(), R.undo.saveStep(), R.undo.run(), R.undo.dropRedo()), !R.$wp && U) {
              var a2 = U;
              ce(true), R.selection.setAfter(a2.get(0)), R.selection.restore();
            }
            R.popups.hide("image.insert");
          }
        }
        function B(e, t2) {
          var a2 = R.popups.get("image.insert");
          if (a2) {
            var i2 = a2.find(".fr-image-progress-bar-layer");
            i2.find("h3").text(e + (t2 ? " ".concat(t2, "%") : "")), i2.removeClass("fr-error"), t2 ? (i2.find("div").removeClass("fr-indeterminate"), i2.find("div > span").css("width", "".concat(t2, "%"))) : i2.find("div").addClass("fr-indeterminate");
          }
        }
        function O(e) {
          P();
          var t2 = R.popups.get("image.insert").find(".fr-image-progress-bar-layer");
          t2.addClass("fr-error");
          var a2 = t2.find("h3");
          a2.text(e), R.events.disableBlur(), a2.focus();
        }
        function z(e) {
          ge.call(e.get(0));
        }
        function L() {
          var e = A(this);
          R.popups.hide("image.insert"), e.removeClass("fr-uploading"), e.next().is("br") && e.next().remove(), z(e), R.events.trigger("image.loaded", [e]);
        }
        function _(s2, e, l3, p2, f2) {
          p2 && "string" == typeof p2 && (p2 = R.$(p2)), R.edit.off(), B(R.language.translate("Loading image")), e && (s2 = R.helpers.sanitizeURL(s2));
          var t2 = new Image();
          t2.onload = function() {
            var e2, t3;
            if (p2) {
              R.undo.canDo() || p2.hasClass("fr-uploading") || R.undo.saveStep();
              var a2 = p2.data("fr-old-src");
              if (p2.data("fr-image-pasted") && (a2 = null), R.$wp) {
                (e2 = p2.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), a2 && p2.attr("src", a2), !R.opts.trackChangesEnabled || p2[0].parentNode && "SPAN" === p2[0].parentNode.tagName && p2[0].parentNode.hasAttribute("data-tracking") || R.track_changes.replaceSpecialItem(p2);
                var i2 = c.indexOf(p2[0]);
                0 <= i2 && (c[i2] = e2[0]), p2.replaceWith(e2);
              } else e2 = p2;
              for (var r3 = e2.get(0).attributes, n2 = 0; n2 < r3.length; n2++) {
                var o2 = r3[n2];
                0 === o2.nodeName.indexOf("data-") && "data-pasted" !== o2.nodeName ? e2.removeAttr(o2.nodeName) : l3 && l3.hasOwnProperty(o2.nodeName) && e2.removeAttr(o2.nodeName);
              }
              if (void 0 !== l3) for (t3 in l3) l3.hasOwnProperty(t3) && "link" != t3 && e2.attr("".concat(t3), l3[t3]);
              e2.on("load", L), e2.attr("src", s2), R.edit.on(), b(false), p2[0].src != s2 && R.selection.restore(), R.undo.saveStep(), R.events.disableBlur(), R.$el.blur(), R.events.trigger(a2 ? "image.replaced" : "image.inserted", [e2, f2]);
            } else (e2 = W(s2, l3, L)) && (b(false), R.undo.saveStep(), R.events.disableBlur(), R.$el.blur(), R.events.trigger("image.inserted", [e2, f2]));
          }, t2.onerror = function() {
            I(i);
          }, P(R.language.translate("Loading image")), t2.src = s2;
        }
        function M(e, t2, a2) {
          B(R.language.translate("Loading image"));
          var i2 = this.status, r3 = this.response, n2 = this.responseXML, o2 = this.responseText;
          try {
            if (R.opts.imageUploadToS3 || R.opts.imageUploadToAzure) if (201 == i2) {
              var s2;
              if (R.opts.imageUploadToAzure) {
                if (false === R.events.trigger("image.uploadedToAzure", [this.responseURL, a2, r3], true)) return R.edit.on(), false;
                s2 = t2;
              } else s2 = (function p2(e2) {
                try {
                  var t3 = A(e2).find("Location").text(), a3 = A(e2).find("Key").text();
                  return false === R.events.trigger("image.uploadedToS3", [t3, a3, e2], true) ? (R.edit.on(), false) : t3;
                } catch (i3) {
                  return I(m, e2), false;
                }
              })(n2);
              s2 && _(s2, false, [], e, r3 || n2);
            } else I(m, r3 || n2, e);
            else if (200 <= i2 && i2 < 300) {
              var l3 = (function f2(e2) {
                try {
                  if (false === R.events.trigger("image.uploaded", [e2], true)) return R.edit.on(), false;
                  var t3 = JSON.parse(e2);
                  return t3.link ? t3 : (I(d, e2), false);
                } catch (a3) {
                  return I(m, e2), false;
                }
              })(o2);
              l3 && _(l3.link, false, l3, e, r3 || o2);
            } else I(u, r3 || o2, e);
          } catch (g2) {
            I(m, r3 || o2, e);
          }
        }
        function K() {
          I(m, this.response || this.responseText || this.responseXML);
        }
        function Y(e) {
          if (e.lengthComputable) {
            var t2 = e.loaded / e.total * 100 | 0;
            B(R.language.translate("Uploading"), t2);
          }
        }
        function W(e, t2, a2) {
          var i2, r3 = A(document.createElement("img")).attr("src", e);
          if (t2 && void 0 !== t2) for (i2 in t2) t2.hasOwnProperty(i2) && "link" != i2 && (" data-".concat(i2, '="').concat(t2[i2], '"'), r3.attr("".concat(i2), t2[i2]));
          var n2 = R.opts.imageDefaultWidth;
          n2 && "auto" != n2 && (n2 = R.opts.imageResizeWithPercent ? "100%" : "".concat(n2, "px")), r3.attr("style", n2 ? "width: ".concat(n2, ";") : ""), he(r3, R.opts.imageDefaultDisplay, R.opts.imageDefaultAlign), r3.on("load", a2), r3.on("error", a2), R.edit.on(), R.events.focus(true), R.selection.restore(), R.undo.saveStep(), R.opts.imageSplitHTML ? R.markers.split() : R.markers.insert(), R.html.wrap();
          var o2 = R.$el.find(".fr-marker");
          if (o2.length) (o2.parent().is("hr") || o2.parent().is("IMG")) && o2.parent().after(o2), R.node.isLastSibling(o2) && o2.parent().hasClass("fr-deletable") && o2.insertAfter(o2.parent()), o2.replaceWith(r3);
          else {
            if (R.opts.trackChangesEnabled) return k(true), false;
            R.$el.append(r3);
          }
          return R.selection.clear(), r3;
        }
        function G() {
          R.edit.on(), k(true);
        }
        function H(e, t2) {
          if (void 0 !== e && 0 < e.length) {
            if (false === R.events.trigger("image.beforeUpload", [e, t2])) return false;
            var a2, i2 = e[0];
            if (!(null !== R.opts.imageUploadURL && R.opts.imageUploadURL != C || R.opts.imageUploadToS3 || R.opts.imageUploadToAzure)) return (function y2(r4, n3) {
              var o3 = new FileReader();
              o3.onload = function() {
                var e2 = o3.result;
                if (o3.result.indexOf("svg+xml") < 0) {
                  for (var t3 = atob(o3.result.split(",")[1]), a3 = [], i3 = 0; i3 < t3.length; i3++) a3.push(t3.charCodeAt(i3));
                  e2 = window.URL.createObjectURL(new Blob([new Uint8Array(a3)], { type: r4.type })), n3 && n3.data("fr-old-src", n3.attr("src")), R.image.insert(e2, false, null, n3);
                } else R.image.insert(e2, null, null, R.image.get());
              }, P(), o3.readAsDataURL(r4);
            })(i2, t2 || U), false;
            if (i2.name || (i2.name = (/* @__PURE__ */ new Date()).getTime() + "." + (i2.type || "image/jpeg").replace(/image\//g, "")), i2.size > R.opts.imageMaxSize) return I(S), false;
            if (R.opts.imageAllowedTypes.indexOf(i2.type.replace(/image\//g, "")) < 0) return I(E), false;
            if (R.drag_support.formdata && (a2 = R.drag_support.formdata ? new FormData() : null), a2) {
              var r3;
              if (false !== R.opts.imageUploadToS3) for (r3 in a2.append("key", R.opts.imageUploadToS3.keyStart + (/* @__PURE__ */ new Date()).getTime() + "-" + (i2.name || "untitled")), a2.append("success_action_status", "201"), a2.append("X-Requested-With", "xhr"), a2.append("Content-Type", i2.type), R.opts.imageUploadToS3.params) R.opts.imageUploadToS3.params.hasOwnProperty(r3) && a2.append(r3, R.opts.imageUploadToS3.params[r3]);
              for (r3 in R.opts.imageUploadParams) R.opts.imageUploadParams.hasOwnProperty(r3) && a2.append(r3, R.opts.imageUploadParams[r3]);
              a2.append(R.opts.imageUploadParam, i2, i2.name);
              var n2, o2, s2 = R.opts.imageUploadURL, l3 = R.opts.imageUploadMethod;
              R.opts.imageUploadToS3 && (s2 = R.opts.imageUploadToS3.uploadURL ? R.opts.imageUploadToS3.uploadURL : "https://".concat(R.opts.imageUploadToS3.region, ".amazonaws.com/").concat(R.opts.imageUploadToS3.bucket)), R.opts.imageUploadToAzure && (n2 = s2 = R.opts.imageUploadToAzure.uploadURL ? "".concat(R.opts.imageUploadToAzure.uploadURL, "/").concat(i2.name) : encodeURI("https://".concat(R.opts.imageUploadToAzure.account, ".blob.core.windows.net/").concat(R.opts.imageUploadToAzure.container, "/").concat(i2.name)), R.opts.imageUploadToAzure.SASToken && (s2 += R.opts.imageUploadToAzure.SASToken), l3 = "PUT");
              var p2 = R.core.getXHR(s2, l3);
              if (R.opts.imageUploadToAzure) {
                var f2 = (/* @__PURE__ */ new Date()).toUTCString();
                if (!R.opts.imageUploadToAzure.SASToken && R.opts.imageUploadToAzure.accessKey) {
                  var g2 = R.opts.imageUploadToAzure.account, c2 = R.opts.imageUploadToAzure.container;
                  if (R.opts.imageUploadToAzure.uploadURL) {
                    var d2 = R.opts.imageUploadToAzure.uploadURL.split("/");
                    c2 = d2.pop(), g2 = d2.pop().split(".")[0];
                  }
                  var u2 = "x-ms-blob-type:BlockBlob\nx-ms-date:".concat(f2, "\nx-ms-version:2019-07-07"), m2 = encodeURI("/" + g2 + "/" + c2 + "/" + i2.name), h2 = l3 + "\n\n\n" + i2.size + "\n\n" + i2.type + "\n\n\n\n\n\n\n" + u2 + "\n" + m2, v2 = R.cryptoJSPlugin.cryptoJS.HmacSHA256(h2, R.cryptoJSPlugin.cryptoJS.enc.Base64.parse(R.opts.imageUploadToAzure.accessKey)).toString(R.cryptoJSPlugin.cryptoJS.enc.Base64), b2 = "SharedKey " + g2 + ":" + v2;
                  o2 = v2, p2.setRequestHeader("Authorization", b2);
                }
                for (r3 in p2.setRequestHeader("x-ms-version", "2019-07-07"), p2.setRequestHeader("x-ms-date", f2), p2.setRequestHeader("Content-Type", i2.type), p2.setRequestHeader("x-ms-blob-type", "BlockBlob"), R.opts.imageUploadParams) R.opts.imageUploadParams.hasOwnProperty(r3) && p2.setRequestHeader(r3, R.opts.imageUploadParams[r3]);
                for (r3 in R.opts.imageUploadToAzure.params) R.opts.imageUploadToAzure.params.hasOwnProperty(r3) && p2.setRequestHeader(r3, R.opts.imageUploadToAzure.params[r3]);
              }
              !(function w2(t3, a3, i3, r4, n3, o3) {
                function s3() {
                  var e2 = A(this);
                  e2.off("load"), e2.addClass("fr-uploading"), e2.next().is("br") && e2.next().remove(), R.placeholder.refresh(), z(e2), x(), P(), R.edit.off(), t3.onload = function() {
                    M.call(t3, e2, n3, o3);
                  }, t3.onerror = K, t3.upload.onprogress = Y, t3.onabort = G, A(e2.off("abortUpload")).on("abortUpload", function() {
                    4 != t3.readyState && (t3.abort(), r4 ? (r4.attr("src", r4.data("fr-old-src")), r4.removeClass("fr-uploading")) : e2.remove(), ce(true));
                  }), t3.send(R.opts.imageUploadToAzure ? i3 : a3);
                }
                var l4 = new FileReader();
                l4.onload = function() {
                  var e2 = l4.result;
                  if (l4.result.indexOf("svg+xml") < 0) {
                    for (var t4 = atob(l4.result.split(",")[1]), a4 = [], i4 = 0; i4 < t4.length; i4++) a4.push(t4.charCodeAt(i4));
                    e2 = window.URL.createObjectURL(new Blob([new Uint8Array(a4)], { type: "image/jpeg" }));
                  }
                  r4 ? (r4.on("load", s3), r4.on("error", function() {
                    s3(), A(this).off("error");
                  }), R.edit.on(), R.undo.saveStep(), r4.data("fr-old-src", r4.attr("src")), r4.attr("src", e2)) : W(e2, null, s3);
                }, l4.readAsDataURL(i3);
              })(p2, a2, i2, t2 || U, n2, o2);
            }
          }
        }
        function F(e) {
          if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption");
        }
        function V(e) {
          var t2 = e.originalEvent.dataTransfer;
          if (t2 && t2.files && t2.files.length) {
            var a2 = t2.files[0];
            if (a2 && a2.type && -1 !== a2.type.indexOf("image") && 0 <= R.opts.imageAllowedTypes.indexOf(a2.type.replace(/image\//g, ""))) {
              if (!R.opts.imageUpload) return e.preventDefault(), e.stopPropagation(), false;
              R.markers.remove(), R.markers.insertAtPoint(e.originalEvent), R.$el.find(".fr-marker").replaceWith(Me.MARKERS), 0 === R.$el.find(".fr-marker").length && R.selection.setAtEnd(R.el), R.popups.hideAll();
              var i2 = R.popups.get("image.insert");
              i2 || (i2 = X()), R.popups.setContainer("image.insert", R.$sc);
              var r3 = e.originalEvent.pageX, n2 = e.originalEvent.pageY;
              if (R.opts.iframe) {
                var o2 = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-top")), s2 = R.helpers.getPX(R.$wp.find(".fr-iframe").css("padding-left"));
                n2 += R.$iframe.offset().top + o2, r3 += R.$iframe.offset().left + s2;
              }
              return R.popups.show("image.insert", r3, n2), P(), 0 <= R.opts.imageAllowedTypes.indexOf(a2.type.replace(/image\//g, "")) ? (ce(true), H(t2.files)) : I(E), e.preventDefault(), e.stopPropagation(), false;
            }
          }
        }
        function X(e) {
          if (e) return R.popups.onRefresh("image.insert", h), R.popups.onHide("image.insert", v), true;
          var t2, a2, i2 = "";
          R.opts.imageUpload || -1 === R.opts.imageInsertButtons.indexOf("imageUpload") || R.opts.imageInsertButtons.splice(R.opts.imageInsertButtons.indexOf("imageUpload"), 1);
          var r3 = R.button.buildList(R.opts.imageInsertButtons);
          "" !== r3 && (i2 = '<div class="fr-buttons fr-tabs">'.concat(r3, "</div>"));
          var n2 = R.opts.imageInsertButtons.indexOf("imageUpload"), o2 = R.opts.imageInsertButtons.indexOf("imageByURL"), s2 = "";
          0 <= n2 && (t2 = " fr-active", 0 <= o2 && o2 < n2 && (t2 = ""), s2 = '<div class="fr-image-upload-layer'.concat(t2, ' fr-layer" id="fr-image-upload-layer-').concat(R.id, '"><strong>').concat(R.language.translate("Drop image"), "</strong><br>(").concat(R.language.translate("or click"), ')<div class="fr-form"><input type="file" accept="image/').concat(R.opts.imageAllowedTypes.join(", image/").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-').concat(R.id, '" role="button"></div></div>'));
          var l3 = "";
          0 <= o2 && (t2 = " fr-active", 0 <= n2 && n2 < o2 && (t2 = ""), l3 = '<div class="fr-image-by-url-layer'.concat(t2, ' fr-layer" id="fr-image-by-url-layer-').concat(R.id, '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-').concat(R.id, '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">').concat(R.language.translate("Insert"), "</button></div></div>"));
          var p2 = { buttons: i2, upload_layer: s2, by_url_layer: l3, progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>' };
          return 1 <= R.opts.imageInsertButtons.length && (a2 = R.popups.create("image.insert", p2)), R.$wp && R.events.$on(R.$wp, "scroll", function() {
            U && R.popups.isVisible("image.insert") && ye();
          }), (function f2(i3) {
            R.events.$on(i3, "dragover dragenter", ".fr-image-upload-layer", function(e2) {
              return A(this).addClass("fr-drop"), (R.browser.msie || R.browser.edge) && e2.preventDefault(), false;
            }, true), R.events.$on(i3, "dragleave dragend", ".fr-image-upload-layer", function(e2) {
              return A(this).removeClass("fr-drop"), (R.browser.msie || R.browser.edge) && e2.preventDefault(), false;
            }, true), R.events.$on(i3, "drop", ".fr-image-upload-layer", function(e2) {
              e2.preventDefault(), e2.stopPropagation(), A(this).removeClass("fr-drop");
              var t3 = e2.originalEvent.dataTransfer;
              if (t3 && t3.files) {
                var a3 = i3.data("instance") || R;
                a3.events.disableBlur(), a3.image.upload(t3.files), a3.events.enableBlur();
              }
            }, true), R.helpers.isIOS() && R.events.$on(i3, "touchstart", '.fr-image-upload-layer input[type="file"]', function() {
              A(this).trigger("click");
            }, true), R.events.$on(i3, "change", '.fr-image-upload-layer input[type="file"]', function() {
              if (this.files) {
                var e2 = i3.data("instance") || R;
                e2.events.disableBlur(), i3.find("input:focus").blur(), e2.events.enableBlur(), e2.image.upload(this.files, U);
              }
              A(this).val("");
            }, true);
          })(a2), a2;
        }
        function q() {
          U && R.popups.get("image.alt").find("input").val(U.attr("alt") || "").trigger("change");
        }
        function j() {
          var e = R.popups.get("image.alt");
          e || (e = J()), k(), R.popups.refresh("image.alt"), R.popups.setContainer("image.alt", R.$sc);
          var t2 = Ce(), a2 = t2.outerWidth() / 2;
          Se() && (t2 = t2.find(".fr-img-wrap"), a2 = U.outerWidth() / 2);
          var i2 = t2.offset().left + a2, r3 = t2.offset().top + t2.outerHeight(), n2 = t2.outerHeight();
          R.opts.iframe && Se() && (n2 = U ? U.outerHeight() : 0), R.popups.show("image.alt", i2, r3, n2, true);
        }
        function J(e) {
          if (e) return R.popups.onRefresh("image.alt", q), true;
          var t2 = { buttons: '<div class="fr-buttons fr-tabs">'.concat(R.button.buildList(R.opts.imageAltButtons), "</div>"), alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'.concat(R.id, '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-').concat(R.id, '" type="text" placeholder="').concat(R.language.translate("Alternative Text"), '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">').concat(R.language.translate("Update"), "</button></div></div>") }, a2 = R.popups.create("image.alt", t2);
          return R.$wp && R.events.$on(R.$wp, "scroll.image-alt", function() {
            U && R.popups.isVisible("image.alt") && j();
          }), a2;
        }
        function Q() {
          var e = R.popups.get("image.size"), t2 = U.get(0).style.height ? U.get(0).style.height : "auto", a2 = U.get(0).style.width ? U.get(0).style.width : "auto";
          if (U) if (Se()) {
            var i2 = U.parent();
            i2.get(0).style.width || (i2 = U.parent().parent()), e.find('input[name="width"]').val(a2).trigger("change"), e.find('input[name="height"]').val(t2).trigger("change");
          } else e.find('input[name="width"]').val(a2).trigger("change"), e.find('input[name="height"]').val(t2).trigger("change");
        }
        function Z() {
          var e = R.popups.get("image.size");
          e || (e = ee()), k(), R.popups.refresh("image.size"), R.popups.setContainer("image.size", R.$sc);
          var t2 = Ce(), a2 = t2.outerWidth() / 2;
          Se() && (t2 = t2.find(".fr-img-wrap"), a2 = U.outerWidth() / 2);
          var i2 = t2.outerHeight();
          R.opts.iframe && Se() && (i2 = U ? U.outerHeight() : 0);
          var r3 = t2.offset().left + a2, n2 = t2.offset().top + t2.outerHeight();
          R.popups.show("image.size", r3, n2, i2, true);
        }
        function ee(e) {
          if (e) return R.popups.onRefresh("image.size", Q), true;
          var t2 = { buttons: '<div class="fr-buttons fr-tabs">'.concat(R.button.buildList(R.opts.imageSizeButtons), "</div>"), size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'.concat(R.id, `"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-'`).concat(R.id, '" type="text" name="width" placeholder="').concat(R.language.translate("Width"), '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height').concat(R.id, '" type="text" name="height" placeholder="').concat(R.language.translate("Height"), '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">').concat(R.language.translate("Update"), "</button></div></div>") }, a2 = R.popups.create("image.size", t2);
          return R.$wp && R.events.$on(R.$wp, "scroll.image-size", function() {
            U && R.popups.isVisible("image.size") && Z();
          }), a2;
        }
        function te(e, t2, a2, i2) {
          return e.pageX = t2, D.call(this, e), e.pageX = e.pageX + a2 * Math.floor(Math.pow(1.1, i2)), T.call(this, e), $.call(this, e), ++i2;
        }
        function ae(e) {
          if (e = e || Ce(), R.opts.trackChangesEnabled && !R.helpers.isMobile() && (!e[0].parentNode || "SPAN" !== e[0].parentNode.tagName || !e[0].parentNode.hasAttribute("data-tracking"))) return R.track_changes.removeSpecialItem(e), R.popups.hideAll(), void ce(true);
          e && false !== R.events.trigger("image.beforeRemove", [e]) && (R.popups.hideAll(), we(), ce(true), R.undo.canDo() || R.undo.saveStep(), e.get(0) == R.el ? e.removeAttr("src") : (e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? (R.selection.setBefore(e.get(0).parentNode) || R.selection.setAfter(e.get(0).parentNode) || e.parent().after(Me.MARKERS), A(e.get(0).parentNode).remove()) : (R.selection.setBefore(e.get(0)) || R.selection.setAfter(e.get(0)) || e.after(Me.MARKERS), e.remove()), R.html.fillEmptyBlocks(), R.selection.restore()), R.undo.saveStep());
        }
        function ie(e) {
          var t2 = e.which, a2 = document.getElementsByClassName("fs-transforms-container"), i2 = false;
          if (a2 && a2.length) {
            var r3, n2 = Ke(a2);
            try {
              for (n2.s(); !(r3 = n2.n()).done; ) {
                var o2 = r3.value;
                o2.childNodes && o2.childNodes.length && (i2 = true);
              }
            } catch (p2) {
              n2.e(p2);
            } finally {
              n2.f();
            }
          }
          if (i2 && (U = null), U && (t2 == Me.KEYCODE.BACKSPACE || t2 == Me.KEYCODE.DELETE)) return e.preventDefault(), e.stopPropagation(), ae(), false;
          if (U && t2 == Me.KEYCODE.ESC) {
            var s2 = U;
            return ce(true), R.selection.setAfter(s2.get(0)), R.selection.restore(), e.preventDefault(), false;
          }
          if (!U || t2 != Me.KEYCODE.ARROW_LEFT && t2 != Me.KEYCODE.ARROW_RIGHT) return U && t2 === Me.KEYCODE.TAB ? (e.preventDefault(), e.stopPropagation(), ce(true), false) : U && t2 != Me.KEYCODE.F10 && !R.keys.isBrowserAction(e) ? (e.preventDefault(), e.stopPropagation(), false) : void 0;
          var l3 = U.get(0);
          return ce(true), t2 == Me.KEYCODE.ARROW_LEFT ? R.selection.setBefore(l3) : R.selection.setAfter(l3), R.selection.restore(), e.preventDefault(), false;
        }
        function re(e) {
          if (e && "IMG" == e.tagName) {
            if (R.node.hasClass(e, "fr-uploading") || R.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : R.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), e.parentNode && e.parentNode.parentNode && R.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
              var t2 = e.parentNode.parentNode;
              t2.removeAttribute("contenteditable"), t2.removeAttribute("draggable"), t2.classList.remove("fr-draggable");
              var a2 = e.nextSibling;
              a2 && a2.removeAttribute("contenteditable");
            }
          } else if (e && e.nodeType == Node.ELEMENT_NODE) for (var i2 = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), r3 = 0; r3 < i2.length; r3++) re(i2[r3]);
        }
        function ne(e) {
          if (false === R.events.trigger("image.beforePasteUpload", [e])) return A(e).removeAttr("data-fr-image-pasted"), false;
          U = A(e), x(), n(), P(), U.on("load", function() {
            var t3 = [];
            x(), A(R.popups.get("image.insert").get(0)).find("div.fr-active.fr-error").length < 1 && P(), A(this).data("events").filter(function(e2) {
              "load" === e2[0] && t3.push(e2);
            }), t3.length <= 1 && A(this).off("load");
          });
          for (var t2 = A(e).attr("src").split(","), a2 = atob(t2[1]), i2 = [], r3 = 0; r3 < a2.length; r3++) i2.push(a2.charCodeAt(r3));
          H([R.browser.safari && !R.opts.imageUploadURL ? new Blob([new Uint8Array(i2)], { type: t2[0].replace(/data\:/g, "") }) : new Blob([new Uint8Array(i2)], { type: t2[0].replace(/data\:/g, "").replace(/;base64/g, "") })], U);
        }
        function oe() {
          R.opts.imagePaste ? R.$el.find("img[data-fr-image-pasted]").each(function(e, a2) {
            if (R.opts.imagePasteProcess) {
              var t2 = R.opts.imageDefaultWidth;
              t2 && "auto" != t2 && (t2 += R.opts.imageResizeWithPercent ? "%" : "px"), A(a2).css("width", t2).removeClass("fr-dii fr-dib fr-fir fr-fil"), he(A(a2), R.opts.imageDefaultDisplay, R.opts.imageDefaultAlign);
            }
            if (0 === a2.src.indexOf("data:")) ne(a2);
            else if (0 === a2.src.indexOf("blob:") || 0 === a2.src.indexOf("http") && R.opts.imageUploadRemoteUrls && R.opts.imageCORSProxy) {
              var i2 = new Image();
              i2.crossOrigin = "Anonymous", i2.onload = function() {
                var e2 = R.o_doc.createElement("CANVAS"), t3 = e2.getContext("2d");
                e2.height = this.naturalHeight, e2.width = this.naturalWidth, t3.drawImage(this, 0, 0), setTimeout(function() {
                  ne(a2);
                }, 0), a2.src = e2.toDataURL(Me.IMAGE_TYPE);
              }, R.browser.msie && Me.IMAGE_ALLOW_REGEX.test(a2.src) && (Me.IMAGE_TYPE = "image/" + a2.src.split(Me.IMAGE_ALLOW_REGEX)[1]), i2.src = (0 === a2.src.indexOf("blob:") ? "" : "".concat(R.opts.imageCORSProxy, "/")) + a2.src, 0 !== a2.src.indexOf("blob:") && R.undo.saveStep();
            } else 0 !== a2.src.indexOf("http") || 0 === a2.src.indexOf("https://mail.google.com/mail") ? (R.selection.save(), A(a2).remove(), R.selection.restore()) : A(a2).removeAttr("data-fr-image-pasted");
          }) : R.$el.find("img[data-fr-image-pasted]").remove();
        }
        function se(e) {
          var t2 = e.target.result, a2 = R.opts.imageDefaultWidth;
          a2 && "auto" != a2 && (a2 += R.opts.imageResizeWithPercent ? "%" : "px"), R.undo.saveStep(), R.html.insert('<img data-fr-image-pasted="true" src="'.concat(t2, '"').concat(a2 ? ' style="width: '.concat(a2, ';"') : "", ">"));
          var i2 = R.$el.find('img[data-fr-image-pasted="true"]');
          i2 && he(i2, R.opts.imageDefaultDisplay, R.opts.imageDefaultAlign), R.events.trigger("paste.after");
        }
        function le(e, t2) {
          var a2 = new FileReader();
          a2.onload = (function i2(e2) {
            var t3 = R.opts.imageDefaultWidth;
            t3 && "auto" != t3 && (t3 += R.opts.imageResizeWithPercent ? "%" : "px"), R.html.insert('<img data-fr-image-pasted="true" src="'.concat(e2, '"').concat(t3 ? ' style="width: '.concat(t3, ';"') : "", ">"));
            var a3 = R.$el.find('img[data-fr-image-pasted="true"]');
            a3 && he(a3, R.opts.imageDefaultDisplay, R.opts.imageDefaultAlign), R.events.trigger("paste.after");
          })(t2), a2.readAsDataURL(e, t2);
        }
        function pe(e, t2) {
          var a2 = t2 || e && e.clipboardData;
          if (a2 && a2.items) {
            var i2 = (a2 || window.clipboardData).getData("text/html") || "";
            R.browser.mozilla && ("" === i2 || /<!--StartFragment-->([ ])<!--EndFragment-->/.test(i2)) && (i2 = R.win.localStorage.getItem("fr-copied-html"));
            var r3 = new DOMParser().parseFromString(i2, "text/html").querySelector("img");
            if (r3 && !R.opts.imageUploadURL) {
              if (!r3) return false;
              var n2 = r3.src, o2 = null;
              if (a2.types && -1 != [].indexOf.call(a2.types, "text/rtf") || a2.getData("text/rtf")) o2 = a2.items[0].getAsFile();
              else for (var s2 = 0; s2 < a2.items.length; s2++) if (o2 = a2.items[s2].getAsFile()) {
                Me.IMAGE_TYPE = o2.type;
                break;
              }
              if (o2) return le(o2, n2), false;
            } else {
              var l3 = null;
              if (a2.types && -1 != [].indexOf.call(a2.types, "text/rtf") || a2.getData("text/rtf")) l3 = a2.items[0].getAsFile();
              else for (var p2 = 0; p2 < a2.items.length && !(l3 = a2.items[p2].getAsFile()); p2++) ;
              if (l3) return (function f2(e2) {
                var t3 = new FileReader();
                t3.onload = se, t3.readAsDataURL(e2);
              })(l3), false;
            }
          }
        }
        function fe(e) {
          return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ');
        }
        function ge(e) {
          if ("false" == A(this).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return true;
          if (e && "touchend" == e.type && a) return true;
          if (e && R.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), false;
          for (var t2 = 0; t2 < Me.INSTANCES.length; t2++) Me.INSTANCES[t2] != R && Me.INSTANCES[t2].events.trigger("image.hideResizer");
          R.toolbar.disable(), e && (e.stopPropagation(), e.preventDefault()), R.helpers.isMobile() && (R.events.disableBlur(), R.$el.blur(), R.events.enableBlur()), R.opts.iframe && R.size.syncIframe(), U = A(this), we(), x(), n(), R.browser.msie ? (R.popups.areVisible() && R.events.disableBlur(), R.win.getSelection && (R.win.getSelection().removeAllRanges(), R.win.getSelection().addRange(R.doc.createRange()))) : R.selection.clear(), R.helpers.isIOS() && (R.events.disableBlur(), R.$el.blur()), R.button.bulkRefresh(), R.events.trigger("video.hideResizer");
        }
        function ce(e) {
          U && (/* @__PURE__ */ (function t2() {
            return de;
          })() || true === e) && (R.toolbar.enable(), p.removeClass("fr-active"), R.popups.hideAll(), U = null, me(), f = null, g && g.hide());
        }
        r2[i] = "Image cannot be loaded from the passed link.", r2[d] = "No link in upload response.", r2[u] = "Error during file upload.", r2[m] = "Parsing response failed.", r2[S] = "File is too large.", r2[E] = "Image file type is invalid.", r2[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
        var de = !(r2[8] = "Image file is corrupted.");
        function ue() {
          de = true;
        }
        function me() {
          de = false;
        }
        function he(e, t2, a2) {
          if (!R.opts.htmlUntouched && R.opts.useClasses) e.removeClass("fr-fil fr-fir fr-dib fr-dii"), a2 && e.addClass("fr-fi".concat(a2[0])), t2 && e.addClass("fr-di".concat(t2[0]));
          else if ("inline" == t2) if (e.css({ display: "inline-block", verticalAlign: "bottom", margin: R.opts.imageDefaultMargin }), "center" == a2) e.css({ "float": "none", marginBottom: "", marginTop: "", maxWidth: "calc(100% - ".concat(2 * R.opts.imageDefaultMargin, "px)"), textAlign: "center" });
          else if ("left" == a2) {
            var i2 = "0px", r3 = e.parent("span.fr-img-caption").get(0);
            r3 || (r3 = e.parent().get(0)), r3 && "li" === r3.tagName.toLowerCase() ? i2 = "20px" : r3 && "p" === r3.tagName.toLowerCase() && (i2 = "15px"), e.css({ "float": "left", marginLeft: 0, maxWidth: "calc(100% - ".concat(R.opts.imageDefaultMargin, "px)"), textAlign: "left", marginRight: i2 });
          } else e.css({ "float": "right", marginRight: 0, maxWidth: "calc(100% - ".concat(R.opts.imageDefaultMargin, "px)"), textAlign: "right" });
          else "block" == t2 && (e.css({ display: "block", "float": "none", verticalAlign: "top", margin: "".concat(R.opts.imageDefaultMargin, "px auto"), textAlign: "center" }), "left" == a2 ? e.css({ marginLeft: 0, textAlign: "left" }) : "right" == a2 && e.css({ marginRight: 0, textAlign: "right" }));
        }
        function ve(e) {
          if (void 0 === e && (e = Ce()), e) {
            if (e.hasClass("fr-fil")) return "left";
            if (e.hasClass("fr-fir")) return "right";
            if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center";
            var t2 = e.css("float");
            if (e.css("float", "none"), "block" == e.css("display")) {
              if (e.css("float", ""), e.css("float") != t2 && e.css("float", t2), 0 === parseInt(e.css("margin-left"), 10)) return "left";
              if (0 === parseInt(e.css("margin-right"), 10)) return "right";
            } else {
              if (e.css("float", ""), e.css("float") != t2 && e.css("float", t2), "left" == e.css("float")) return "left";
              if ("right" == e.css("float")) return "right";
            }
          }
          return "center";
        }
        function be(e) {
          void 0 === e && (e = Ce());
          var t2 = e.css("float");
          return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t2 && e.css("float", t2), "block") : (e.css("float", ""), e.css("float") != t2 && e.css("float", t2), "inline");
        }
        function ye() {
          var e = R.popups.get("image.insert");
          e || (e = X()), R.popups.isVisible("image.insert") || (k(), R.popups.refresh("image.insert"), R.popups.setContainer("image.insert", R.$sc));
          var t2 = Ce(), a2 = t2 && t2.outerWidth() / 2;
          Se() && (t2 = t2.find(".fr-img-wrap"), a2 = U.outerWidth() / 2);
          var i2, r3 = t2.offset().left + a2, n2 = t2.outerHeight(true);
          R.opts.iframe && Se() && (n2 = U ? U.outerHeight() : 0), i2 = 0 < R.$el.find("img[data-fr-image-pasted]").length ? R.$wp.offset().top - R.helpers.scrollTop() + R.$wp.height() : t2.offset().top + t2.outerHeight(), R.popups.show("image.insert", r3, i2, n2, true);
        }
        function we() {
          if (U) {
            R.events.disableBlur(), R.selection.clear();
            var e = R.doc.createRange();
            e.selectNode(U.get(0)), R.browser.msie && e.collapse(true), R.selection.get().addRange(e), R.events.enableBlur();
          }
        }
        function Ae() {
          return U;
        }
        function Ce() {
          return Se() ? U.parents(".fr-img-caption").first() : U;
        }
        function Se() {
          return !!U && 0 < U.parents(".fr-img-caption").length;
        }
        function Ee(e) {
          for (var t2 = document.createDocumentFragment(); e.firstChild; ) {
            var a2 = e.removeChild(e.firstChild);
            t2.appendChild(a2);
          }
          e.parentNode.replaceChild(t2, e);
        }
        return { _init: function Re() {
          var n2;
          (function e() {
            R.events.$on(R.$el, R._mousedown, "IMG" == R.el.tagName ? null : 'img:not([contenteditable="false"])', function(e2) {
              if ("false" == A(this).parents("contenteditable").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return true;
              R.helpers.isMobile() || R.selection.clear(), t = true, R.popups.areVisible() && R.events.disableBlur(), R.browser.msie && (R.events.disableBlur(), R.$el.attr("contenteditable", false)), R.draggable || "touchstart" == e2.type || e2.preventDefault(), e2.stopPropagation();
            }), R.events.$on(R.$el, R._mousedown, ".fr-img-caption .fr-inner", function(e2) {
              R.core.hasFocus() || R.events.focus(), e2.stopPropagation();
            }), R.events.$on(R.$el, "paste", ".fr-img-caption .fr-inner", function(e2) {
              true === R.opts.toolbarInline && (R.toolbar.hide(), e2.stopPropagation());
            }), R.events.$on(R.$el, R._mousedown, 'img:not([contenteditable="false"])', function(e2) {
              var t2 = this;
              R.browser.mozilla && 3 == e2.which && (A(this).attr("contenteditable", false), setTimeout(function() {
                A(t2).removeAttr("contenteditable");
              }, 200));
            }), R.events.$on(R.$el, R._mouseup, "IMG" == R.el.tagName ? null : 'img:not([contenteditable="false"])', function(e2) {
              if ("false" == A(this).parents("contenteditable").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return true;
              t && (t = false, e2.stopPropagation(), R.browser.msie && (R.$el.attr("contenteditable", true), R.events.enableBlur()));
            }), R.events.on("keyup", function(e2) {
              if (e2.shiftKey && "" === R.selection.text().replace(/\n/g, "") && R.keys.isArrow(e2.which)) {
                var t2 = R.selection.element(), a2 = R.selection.endElement();
                t2 && "IMG" == t2.tagName ? z(A(t2)) : a2 && "IMG" == a2.tagName && z(A(a2));
              }
            }, true), R.events.on("drop", V), R.events.on("element.beforeDrop", F), R.events.on("mousedown window.mousedown", ue), R.events.on("window.touchmove", me), R.events.on("mouseup window.mouseup", function() {
              if (U && !R.helpers.isMobile()) return ce(), false;
              me();
            }), R.events.on("touchstart touchend", function() {
              if (U && R.helpers.isMobile()) return ce(), false;
              me();
            }), R.events.on("commands.mousedown", function(e2) {
              0 < e2.parents(".fr-toolbar").length && ce();
            }), R.events.on("image.resizeEnd", function() {
              R.opts.iframe && R.size.syncIframe();
            }), R.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() {
              ce(!(t = false));
            }), R.events.on("modals.hide", function() {
              U && (we(), R.selection.clear());
            }), R.events.on("image.resizeEnd", function() {
              R.win.getSelection && z(U);
            }), R.events.on("filestack-init", function() {
              X();
            }), R.events.on("filestack-init-edit", function() {
              for (var e2 = R.$(".fr-popup:not(.fr-do-not-hide)"), t2 = e2.length - 1; 0 <= t2; t2--) e2[t2].parentElement.removeChild(e2[t2]);
              N();
            }), R.opts.imageAddNewLine && R.events.on("image.inserted", function(e2) {
              var t2 = e2.get(0);
              for (t2.nextSibling && "BR" === t2.nextSibling.tagName && (t2 = t2.nextSibling); t2 && !R.node.isElement(t2); ) t2 = R.node.isLastSibling(t2) ? t2.parentNode : null;
              R.node.isElement(t2) && (R.opts.enter === Me.ENTER_BR ? e2.after("<br>") : A(R.node.blockParent(e2.get(0))).after("<".concat(R.html.defaultTag(), "><br></").concat(R.html.defaultTag(), ">")));
            });
          })(), "IMG" == R.el.tagName && R.$el.addClass("fr-view"), R.events.$on(R.$el, R.helpers.isMobile() && !R.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == R.el.tagName ? null : 'img:not([contenteditable="false"])', ge), R.helpers.isMobile() && (R.events.$on(R.$el, "touchstart", "IMG" == R.el.tagName ? null : 'img:not([contenteditable="false"])', function() {
            a = false;
          }), R.events.$on(R.$el, "touchmove", function() {
            a = true;
          })), R.$wp ? (R.events.on("window.keydown keydown", ie, true), R.events.on("keyup", function(e) {
            if (U && e.which == Me.KEYCODE.ENTER) return false;
          }, true), R.events.$on(R.$el, "keydown", function() {
            var e = R.selection.element();
            (e.nodeType === Node.TEXT_NODE || "BR" == e.tagName && R.node.isLastSibling(e)) && (e = e.parentNode), R.node.hasClass(e, "fr-inner") || (R.node.hasClass(e, "fr-img-caption") || (e = A(e).parents(".fr-img-caption").get(0)), R.node.hasClass(e, "fr-img-caption") && (R.opts.trackChangesEnabled || A(e).after(Me.INVISIBLE_SPACE + Me.MARKERS), R.selection.restore()));
          })) : R.events.$on(R.$win, "keydown", ie), R.events.on("toolbar.esc", function() {
            if (U) {
              if (R.$wp) R.events.disableBlur(), R.events.focus();
              else {
                var e = U;
                ce(true), R.selection.setAfter(e.get(0)), R.selection.restore();
              }
              return false;
            }
          }, true), R.events.on("toolbar.focusEditor", function() {
            if (U) return false;
          }, true), R.events.on("window.cut window.copy", function(e) {
            if (U && R.popups.isVisible("image.edit") && !R.popups.get("image.edit").find(":focus").length) {
              var t2 = Ce();
              Se() ? (t2.before(Me.START_MARKER), t2.after(Me.END_MARKER), R.selection.restore(), R.paste.saveCopiedText(t2.get(0).outerHTML, t2.text())) : (we(), R.paste.saveCopiedText(U.get(0).outerHTML, U.attr("alt"))), "copy" == e.type ? setTimeout(function() {
                z(U);
              }) : (ce(true), R.undo.saveStep(), setTimeout(function() {
                R.undo.saveStep();
              }, 0));
            }
          }, true), R.browser.msie && R.events.on("keydown", function(e) {
            if (!R.selection.isCollapsed() || !U) return true;
            var t2 = e.which;
            t2 == Me.KEYCODE.C && R.keys.ctrlKey(e) ? R.events.trigger("window.copy") : t2 == Me.KEYCODE.X && R.keys.ctrlKey(e) && R.events.trigger("window.cut");
          }), R.events.$on(A(R.o_win), "keydown", function(e) {
            if (R.opts.pluginsEnabled.includes("filestack") && R.opts.iframe) {
              var t2 = document.getElementsByClassName("fs-transforms-container"), a2 = false;
              if (t2 && t2.length) {
                var i2, r3 = Ke(t2);
                try {
                  for (r3.s(); !(i2 = r3.n()).done; ) {
                    var n3 = i2.value;
                    n3.childNodes && n3.childNodes.length && (a2 = true);
                  }
                } catch (s2) {
                  r3.e(s2);
                } finally {
                  r3.f();
                }
              }
              a2 && (U = null);
            }
            var o2 = e.which;
            if (U && o2 == Me.KEYCODE.BACKSPACE) return e.preventDefault(), false;
          }), R.events.$on(R.$win, "keydown", function(e) {
            var t2 = e.which;
            U && U.hasClass("fr-uploading") && t2 == Me.KEYCODE.ESC && U.trigger("abortUpload");
          }), R.events.on("destroy", function() {
            U && U.hasClass("fr-uploading") && U.trigger("abortUpload");
          }), R.events.on("paste.before", pe), R.events.on("paste.beforeCleanup", fe), R.events.on("paste.after", oe), R.events.on("html.set", l2), R.events.on("html.inserted", l2), l2(), R.events.on("destroy", function() {
            c = [];
          }), R.events.on("html.processGet", re), R.opts.imageOutputSize && R.events.on("html.beforeGet", function() {
            n2 = R.el.querySelectorAll("img");
            for (var e = 0; e < n2.length; e++) {
              var t2 = parseFloat(A(n2[e]).css("padding-left")) + parseFloat(A(n2[e]).css("padding-right")), a2 = A(n2[e]).width() - t2, i2 = n2[e].style.width || a2, r3 = n2[e].style.height || A(n2[e]).height();
              i2 && n2[e].setAttribute("width", "".concat(i2).replace(/px/, "")), r3 && n2[e].setAttribute("height", "".concat(r3).replace(/px/, ""));
            }
          }), R.opts.iframe && R.events.on("image.loaded", R.size.syncIframe), R.$wp && (b(), R.events.on("contentChanged", b)), R.events.$on(A(R.o_win), "orientationchange.image", function() {
            setTimeout(function() {
              U && z(U);
            }, 100);
          }), N(true), X(true), ee(true), J(true), R.events.on("node.remove", function(e) {
            if ("IMG" == e.get(0).tagName) return ae(e), false;
          });
        }, showInsertPopup: function Ue() {
          var e = R.$tb.find('.fr-command[data-cmd="insertImage"]'), t2 = R.popups.get("image.insert");
          if (t2 || (t2 = X()), k(), !t2.hasClass("fr-active")) if (R.popups.refresh("image.insert"), R.popups.setContainer("image.insert", R.$tb), e.isVisible()) {
            var a2 = R.button.getPosition(e), i2 = a2.left, r3 = a2.top;
            R.popups.show("image.insert", i2, r3, e.outerHeight());
          } else R.position.forSelection(t2), R.popups.show("image.insert");
        }, showLayer: function xe(e) {
          var t2, a2, i2 = R.popups.get("image.insert");
          if (U || R.opts.toolbarInline) {
            if (U) {
              var r3 = Ce(), n2 = 0;
              Se() && (r3 = r3.find(".fr-img-wrap"), n2 = U.outerWidth() / 2), a2 = r3.offset().top + r3.outerHeight(), t2 = r3.offset().left + n2;
            }
          } else {
            var o2 = R.$tb.find('.fr-command[data-cmd="insertImage"]');
            t2 = o2.offset().left, a2 = o2.offset().top + (R.opts.toolbarBottom ? 10 : o2.outerHeight() - 10);
          }
          !U && R.opts.toolbarInline && (a2 = i2.offset().top - R.helpers.getPX(i2.css("margin-top")), i2.hasClass("fr-above") && (a2 += i2.outerHeight())), i2.find(".fr-layer").removeClass("fr-active"), i2.find(".fr-".concat(e, "-layer")).addClass("fr-active"), R.popups.show("image.insert", t2, a2, U ? U.outerHeight() : 0, Se()), R.accessibility.focusPopup(i2);
        }, refreshUploadButton: function De(e) {
          var t2 = R.popups.get("image.insert");
          t2 && t2.find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", true);
        }, refreshByURLButton: function Te(e) {
          var t2 = R.popups.get("image.insert");
          t2 && t2.find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", true);
        }, upload: H, insertByURL: function $e() {
          var e = R.popups.get("image.insert").find(".fr-image-by-url-layer input");
          if (0 < e.val().length) {
            P(), B(R.language.translate("Loading image"));
            var t2 = e.val().trim();
            if (R.opts.imageUploadRemoteUrls && R.opts.imageCORSProxy && R.opts.imageUpload) {
              var a2 = new XMLHttpRequest();
              a2.onload = function() {
                200 == this.status ? H([new Blob([this.response], { type: this.response.type || "image/png" })], U) : I(i);
              }, a2.onerror = function() {
                _(t2, true, [], U);
              }, a2.open("GET", "".concat(R.opts.imageCORSProxy, "/").concat(t2), true), a2.responseType = "blob", a2.send();
            } else _(t2, true, [], U);
            e.val(""), e.blur();
          }
        }, align: function Ie(e) {
          var t2 = Ce();
          t2.removeClass("fr-fir fr-fil"), !R.opts.htmlUntouched && R.opts.useClasses ? "left" == e ? t2.addClass("fr-fil") : "right" == e && t2.addClass("fr-fir") : he(t2, be(), e), we(), x(), n(), R.selection.clear();
        }, refreshAlign: function Ne(e) {
          U && e.find("> *").first().replaceWith(R.icon.create("image-align-".concat(ve())));
        }, refreshAlignOnShow: function Pe(e, t2) {
          U && t2.find('.fr-command[data-param1="'.concat(ve(), '"]')).addClass("fr-active").attr("aria-selected", true);
        }, display: function ke(e) {
          var t2 = Ce();
          t2.removeClass("fr-dii fr-dib"), !R.opts.htmlUntouched && R.opts.useClasses ? "inline" == e ? t2.addClass("fr-dii") : "block" == e && t2.addClass("fr-dib") : he(t2, e, ve()), we(), x(), n(), R.selection.clear();
        }, refreshDisplayOnShow: function Be(e, t2) {
          U && t2.find('.fr-command[data-param1="'.concat(be(), '"]')).addClass("fr-active").attr("aria-selected", true);
        }, replace: ye, back: function e() {
          U ? (R.events.disableBlur(), A(".fr-popup input:focus").blur(), z(U)) : (R.events.disableBlur(), R.selection.restore(), R.events.enableBlur(), R.popups.hide("image.insert"), R.toolbar.showInline());
        }, get: Ae, getEl: Ce, insert: _, showProgressBar: P, remove: ae, hideProgressBar: k, applyStyle: function Oe(e, t2, a2) {
          if (void 0 === t2 && (t2 = R.opts.imageStyles), void 0 === a2 && (a2 = R.opts.imageMultipleStyles), !U) return false;
          var i2 = Ce();
          if (!a2) {
            var r3 = Object.keys(t2);
            r3.splice(r3.indexOf(e), 1), i2.removeClass(r3.join(" "));
          }
          "object" == We(t2[e]) ? (i2.removeAttr("style"), i2.css(t2[e].style)) : (i2.toggleClass(e), Se() && U.hasClass(e) && U.removeClass(e)), z(U);
        }, showAltPopup: j, showSizePopup: Z, setAlt: function ze(e) {
          if (U) {
            var t2 = R.popups.get("image.alt");
            U.attr("alt", e || t2.find("input").val() || ""), t2.find("input:focus").blur(), z(U);
          }
        }, setSize: function Le(e, t2) {
          if (U) {
            var a2 = R.popups.get("image.size");
            e = e || a2.find('input[name="width"]').val() || "", t2 = t2 || a2.find('input[name="height"]').val() || "";
            var i2 = /^[\d]+((px)|%)*$/g;
            U.removeAttr("width").removeAttr("height"), e.match(i2) ? U.css("width", e) : U.css("width", ""), t2.match(i2) ? U.css("height", t2) : U.css("height", ""), Se() && (U.parents(".fr-img-caption").removeAttr("width").removeAttr("height"), e.match(i2) ? U.parents(".fr-img-caption").css("width", e) : U.parents(".fr-img-caption").css("width", ""), t2.match(i2) ? U.parents(".fr-img-caption").css("height", t2) : U.parents(".fr-img-caption").css("height", "")), a2 && a2.find("input:focus").blur(), z(U);
          }
        }, toggleCaption: function _e() {
          var e, t2 = R.$el.get(0), a2 = ["fr-dii", "fr-dib", "fr-fil", "fr-fir"];
          if (U && !Se()) {
            (e = U).parent().is("a") && (e = U.parent());
            var i2 = U.parents("ul") && 0 < U.parents("ul").length ? U.parents("ul") : U.parents("ol") && 0 < U.parents("ol").length ? U.parents("ol") : [];
            if (0 < i2.length) {
              var r3 = i2.find("li").length, n2 = U.parents("li"), o2 = document.createElement("li");
              r3 - 1 === n2.index() && (i2.append(o2), o2.innerHTML = "&nbsp;");
            }
            var s2, l3, p2 = (U.attr("class") || "").split(/\s+/), f2 = p2.filter(function(e2) {
              return a2.includes(e2);
            });
            U.attr("class", p2.filter(function(e2) {
              return !a2.includes(e2);
            }).join(" ")), e.attr("style") ? l3 = -1 < (s2 = e.attr("style").split(":")).indexOf("width") ? s2[s2.indexOf("width") + 1].replace(";", "") : "" : e.attr("width") && (l3 = e.attr("width"));
            var g2 = R.opts.imageResizeWithPercent ? (-1 < l3.indexOf("px") ? null : l3) || "100%" : U.width() + "px";
            e.wrap('<div class="fr-img-space-wrap"><span ' + (R.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + f2.join(" ") + '" style="' + (e.attr("style") || "") + '" draggable="false"></span></div>'), e.wrap('<span class="fr-img-wrap"></span>'), U.after('<span class="fr-inner"'.concat(R.browser.mozilla ? "" : ' contenteditable="true"', ">").concat(Me.START_MARKER).concat(R.language.translate("Image Caption")).concat(Me.END_MARKER, "</span>")), U.parents(".fr-img-caption").css("width", g2);
            var c2 = U.parents(".fr-img-space-wrap").length;
            1 == c2 ? Ee(t2.querySelector(".fr-img-space-wrap")) : 1 < c2 && (Ee(t2.querySelector(".fr-img-space-wrap")), Ee(t2.querySelector(".fr-img-space-wrap2"))), ce(true), R.selection.restore();
          } else {
            if (e = Ce(), U.insertBefore(e), null !== e[0].querySelector("a")) {
              for (var d2, u2 = e[0].querySelector("a"), m2 = document.createElement("a"), h2 = 0, v2 = u2.attributes, b2 = v2.length; h2 < b2; h2++) d2 = v2[h2], m2.setAttribute(d2.nodeName, d2.nodeValue);
              U.wrap(m2);
            }
            var y2 = (e.attr("class") || "").split(/\s+/), w2 = ["fr-img-caption"], A2 = y2.filter(function(e2) {
              return !w2.includes(e2);
            }), C2 = (U.attr("class") || "").split(/\s+/), S2 = Ye(new Set(C2.concat(A2)));
            U.attr("class", S2.join(" ")).attr("style", e.attr("style")), e.remove();
            var E2 = U.parents(".fr-img-space-wrap").length;
            1 == E2 ? Ee(t2.querySelector(".fr-img-space-wrap")) : 1 < E2 && (Ee(t2.querySelector(".fr-img-space-wrap")), Ee(t2.querySelector(".fr-img-space-wrap2"))), z(U);
          }
        }, hasCaption: Se, exitEdit: ce, edit: z };
      }, Me.DefineIcon("insertImage", { NAME: "image", SVG_KEY: "insertImage" }), Me.RegisterShortcut(Me.KEYCODE.P, "insertImage", null, "P"), Me.RegisterCommand("insertImage", { title: "Insert Image", undo: false, focus: true, refreshAfterCallback: false, popup: true, callback: function() {
        this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup();
      }, plugin: "image" }), Me.DefineIcon("imageUpload", { NAME: "upload", SVG_KEY: "upload" }), Me.RegisterCommand("imageUpload", { title: "Upload Image", undo: false, focus: false, toggle: true, callback: function() {
        this.image.showLayer("image-upload");
      }, refresh: function(e) {
        this.image.refreshUploadButton(e);
      } }), Me.DefineIcon("imageByURL", { NAME: "link", SVG_KEY: "insertLink" }), Me.RegisterCommand("imageByURL", { title: "By URL", undo: false, focus: false, toggle: true, callback: function() {
        this.image.showLayer("image-by-url");
      }, refresh: function(e) {
        this.image.refreshByURLButton(e);
      } }), Me.RegisterCommand("imageInsertByURL", { title: "Insert Image", undo: true, refreshAfterCallback: false, callback: function() {
        this.image.insertByURL();
      }, refresh: function(e) {
        this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert"));
      } }), Me.DefineIcon("imageDisplay", { NAME: "star", SVG_KEY: "imageDisplay" }), Me.RegisterCommand("imageDisplay", { title: "Display", type: "dropdown", options: { inline: "Inline", block: "Break Text" }, callback: function(e, t) {
        this.image.display(t);
      }, refresh: function(e) {
        this.opts.imageTextNear || e.addClass("fr-hidden");
      }, refreshOnShow: function(e, t) {
        this.image.refreshDisplayOnShow(e, t);
      } }), Me.DefineIcon("image-align", { NAME: "align-left", SVG_KEY: "alignLeft" }), Me.DefineIcon("image-align-left", { NAME: "align-left", SVG_KEY: "alignLeft" }), Me.DefineIcon("image-align-right", { NAME: "align-right", SVG_KEY: "alignRight" }), Me.DefineIcon("image-align-center", { NAME: "align-justify", SVG_KEY: "alignCenter" }), Me.DefineIcon("imageAlign", { NAME: "align-justify", SVG_KEY: "alignJustify" }), Me.RegisterCommand("imageAlign", { type: "dropdown", title: "Align", options: { left: "Align Left", center: "Align Center", right: "Align Right" }, html: function() {
        var e = '<ul class="fr-dropdown-list" role="presentation">', t = Me.COMMANDS.imageAlign.options;
        for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="'.concat(a, '" title="').concat(this.language.translate(t[a]), '">').concat(this.icon.create("image-align-".concat(a)), '<span class="fr-sr-only">').concat(this.language.translate(t[a]), "</span></a></li>"));
        return e += "</ul>";
      }, callback: function(e, t) {
        this.image.align(t);
      }, refresh: function(e) {
        this.image.refreshAlign(e);
      }, refreshOnShow: function(e, t) {
        this.image.refreshAlignOnShow(e, t);
      } }), Me.DefineIcon("imageReplace", { NAME: "exchange", FA5NAME: "exchange-alt", SVG_KEY: "replaceImage" }), Me.RegisterCommand("imageReplace", { title: "Replace", undo: false, focus: false, popup: true, refreshAfterCallback: false, callback: function() {
        this.image.replace();
      } }), Me.DefineIcon("imageRemove", { NAME: "trash", SVG_KEY: "remove" }), Me.RegisterCommand("imageRemove", { title: "Remove", callback: function() {
        this.image.remove();
      } }), Me.DefineIcon("imageBack", { NAME: "arrow-left", SVG_KEY: "back" }), Me.RegisterCommand("imageBack", { title: "Back", undo: false, focus: false, back: true, callback: function() {
        this.image.back();
      }, refresh: function(e) {
        this.$;
        this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
      } }), Me.RegisterCommand("imageDismissError", { title: "OK", undo: false, callback: function() {
        this.image.hideProgressBar(true);
      } }), Me.DefineIcon("imageStyle", { NAME: "magic", SVG_KEY: "imageClass" }), Me.RegisterCommand("imageStyle", { title: "Style", type: "dropdown", html: function() {
        var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.imageStyles;
        for (var a in t) if (t.hasOwnProperty(a)) {
          var i = t[a];
          "object" == We(i) && (i = i.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="'.concat(a, '">').concat(this.language.translate(i), "</a></li>");
        }
        return e += "</ul>";
      }, callback: function(e, t) {
        this.image.applyStyle(t);
      }, refreshOnShow: function(e, t) {
        var a = this.$, i = this.image.getEl();
        i && t.find(".fr-command").each(function() {
          var e2 = a(this).data("param1"), t2 = i.hasClass(e2);
          a(this).toggleClass("fr-active", t2).attr("aria-selected", t2);
        });
      } }), Me.DefineIcon("imageAlt", { NAME: "info", SVG_KEY: "imageAltText" }), Me.RegisterCommand("imageAlt", { undo: false, focus: false, popup: true, title: "Alternative Text", callback: function() {
        this.image.showAltPopup();
      } }), Me.RegisterCommand("imageSetAlt", { undo: true, focus: false, title: "Update", refreshAfterCallback: false, callback: function() {
        this.image.setAlt();
      } }), Me.DefineIcon("imageSize", { NAME: "arrows-alt", SVG_KEY: "imageSize" }), Me.RegisterCommand("imageSize", { undo: false, focus: false, popup: true, title: "Change Size", callback: function() {
        this.image.showSizePopup();
      } }), Me.RegisterCommand("imageSetSize", { undo: true, focus: false, title: "Update", refreshAfterCallback: false, callback: function() {
        this.image.setSize();
      } }), Me.DefineIcon("imageCaption", { NAME: "commenting", FA5NAME: "comment-alt", SVG_KEY: "imageCaption" }), Me.RegisterCommand("imageCaption", { undo: true, focus: false, title: "Image Caption", refreshAfterCallback: true, callback: function() {
        this.image.toggleCaption();
      }, refresh: function(e) {
        this.image.get() && e.toggleClass("fr-active", this.image.hasCaption());
      } });
    });
  }
});
export default require_image_min();
/*! Bundled license information:

froala-editor/js/plugins/image.min.js:
  (*!
   * froala_editor v4.7.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2025 Froala Labs
   *)
*/
//# sourceMappingURL=froala-editor_js_plugins_image__min__js.js.map
