import {
  require_froala_editor_min
} from "./chunk-NIYVL2AX.js";
import {
  __commonJS
} from "./chunk-SNAQBZPT.js";

// node_modules/froala-editor/js/plugins/file.min.js
var require_file_min = __commonJS({
  "node_modules/froala-editor/js/plugins/file.min.js"(exports, module) {
    !(function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(require_froala_editor_min()) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor);
    })(exports, function(m) {
      "use strict";
      m = m && m.hasOwnProperty("default") ? m["default"] : m, Object.assign(m.POPUP_TEMPLATES, { "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]" }), Object.assign(m.DEFAULTS, { fileUpload: true, fileUploadURL: null, fileUploadParam: "file", fileUploadParams: {}, fileUploadToS3: false, fileUploadToAzure: false, fileUploadMethod: "POST", fileMaxSize: 10485760, fileAllowedTypes: ["*"], fileInsertButtons: ["fileBack", "|"], fileUseSelectedText: false }), m.PLUGINS.file = function(T) {
        var i, u = T.$, A = "https://i.froala.com/upload", c = 2, v = 3, g = 4, S = 5, P = 6, o = {};
        function w() {
          var e = T.popups.get("file.insert");
          e || (e = l()), e.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), e.find(".fr-file-progress-bar-layer").addClass("fr-active"), e.find(".fr-buttons").hide(), r(T.language.translate("Uploading"), 0);
        }
        function a(e) {
          var t2 = T.popups.get("file.insert");
          t2 && (t2.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t2.find(".fr-file-progress-bar-layer").removeClass("fr-active"), t2.find(".fr-buttons").show(), e && (T.events.focus(), T.popups.hide("file.insert")));
        }
        function r(e, t2) {
          var o2 = T.popups.get("file.insert");
          if (o2) {
            var i2 = o2.find(".fr-file-progress-bar-layer");
            i2.find("h3").text(e + (t2 ? " ".concat(t2, "%") : "")), i2.removeClass("fr-error"), t2 ? (i2.find("div").removeClass("fr-indeterminate"), i2.find("div > span").css("width", "".concat(t2, "%"))) : i2.find("div").addClass("fr-indeterminate");
          }
        }
        function h(e, t2, o2, i2) {
          var r2;
          T.edit.on(), T.events.focus(true), T.selection.restore(), T.opts.fileUseSelectedText && T.selection.text().length && (t2 = T.selection.text());
          var a2 = '<a href="'.concat(e, '" id="fr-inserted-file" ');
          if (void 0 !== i2) for (r2 in i2) i2.hasOwnProperty(r2) && "link" != r2 && (a2 += "".concat(r2, '="').concat(i2[r2], '" '));
          -1 == a2.indexOf(' class="') && (a2 += 'class="fr-file" '), a2 += ">".concat(t2, "</a>"), T.html.insert(a2);
          var n2 = T.$el.find("#fr-inserted-file");
          n2.removeAttr("id"), T.popups.hide("file.insert"), T.undo.saveStep(), f(), T.events.trigger("file.inserted", [n2, o2]);
        }
        function k(e, t2, o2) {
          var i2 = this.status, r2 = this.response, a2 = this.responseXML, n2 = this.responseText;
          try {
            if (T.opts.fileUploadToS3 || T.opts.fileUploadToAzure) if (201 === i2) {
              var s2;
              if (T.opts.fileUploadToAzure) {
                if (false === T.events.trigger("file.uploadedToAzure", [this.responseURL, o2, r2], true)) return T.edit.on(), false;
                s2 = t2;
              } else s2 = (function p2(e2) {
                try {
                  var t3 = u(e2).find("Location").text(), o3 = u(e2).find("Key").text();
                  return false === T.events.trigger("file.uploadedToS3", [t3, o3, e2], true) ? (T.edit.on(), false) : t3;
                } catch (i3) {
                  return x(g, e2), false;
                }
              })(a2);
              s2 && h(s2, e, r2 || a2);
            } else x(g, r2 || a2);
            else if (200 <= i2 && i2 < 300) {
              var l2 = (function f2(e2) {
                try {
                  if (false === T.events.trigger("file.uploaded", [e2], true)) return T.edit.on(), false;
                  var t3 = JSON.parse(e2);
                  return t3.link ? t3 : (x(c, e2), false);
                } catch (o3) {
                  return x(g, e2), false;
                }
              })(n2);
              l2 && h(l2.link, e, r2 || n2, l2);
            } else x(v, r2 || n2);
          } catch (d) {
            x(g, r2 || n2);
          }
        }
        function R() {
          x(g, this.response || this.responseText || this.responseXML);
        }
        function C(e) {
          if (e.lengthComputable) {
            var t2 = e.loaded / e.total * 100 | 0;
            r(T.language.translate("Uploading"), t2);
          }
        }
        function x(e, t2) {
          T.edit.on(), (function i2(e2) {
            w();
            var t3 = T.popups.get("file.insert").find(".fr-file-progress-bar-layer");
            t3.addClass("fr-error");
            var o2 = t3.find("h3");
            o2.text(e2), T.events.disableBlur(), o2.focus();
          })(T.language.translate("Something went wrong. Please try again.")), T.events.trigger("file.error", [{ code: e, message: o[e] }, t2]);
        }
        function z() {
          T.edit.on(), a(true);
        }
        function n(e) {
          if (void 0 !== e && 0 < e.length) {
            var t2 = e[0].type;
            if (e[0].name && e[0].name.endsWith(".msg") && (t2 = "application/vnd.ms-outlook"), false === T.events.trigger("file.beforeUpload", [e])) return false;
            var o2, i2 = e[0];
            if (!(null !== T.opts.fileUploadURL && T.opts.fileUploadURL !== A || T.opts.fileUploadToS3 || T.opts.fileUploadToAzure)) return (function y(a3) {
              var n3 = new FileReader();
              n3.onload = function() {
                for (var e2 = n3.result, t3 = atob(n3.result.split(",")[1]), o3 = [], i3 = 0; i3 < t3.length; i3++) o3.push(t3.charCodeAt(i3));
                var r3 = a3.type;
                a3.name && a3.name.endsWith(".msg") && (r3 = "application/vnd.ms-outlook"), e2 = window.URL.createObjectURL(new Blob([new Uint8Array(o3)], { type: r3 })), T.file.insert(e2, a3.name, null);
              }, w(), n3.readAsDataURL(a3);
            })(i2), false;
            if (i2.size > T.opts.fileMaxSize) return x(S), false;
            if (T.opts.fileAllowedTypes.indexOf("*") < 0 && T.opts.fileAllowedTypes.indexOf(t2.replace(/file\//g, "")) < 0) return x(P), false;
            if (T.drag_support.formdata && (o2 = T.drag_support.formdata ? new FormData() : null), o2) {
              var r2;
              if (false !== T.opts.fileUploadToS3) for (r2 in o2.append("key", T.opts.fileUploadToS3.keyStart + (/* @__PURE__ */ new Date()).getTime() + "-" + (i2.name || "untitled")), o2.append("success_action_status", "201"), o2.append("X-Requested-With", "xhr"), o2.append("Content-Type", t2), T.opts.fileUploadToS3.params) T.opts.fileUploadToS3.params.hasOwnProperty(r2) && o2.append(r2, T.opts.fileUploadToS3.params[r2]);
              for (r2 in T.opts.fileUploadParams) T.opts.fileUploadParams.hasOwnProperty(r2) && o2.append(r2, T.opts.fileUploadParams[r2]);
              o2.append(T.opts.fileUploadParam, i2);
              var a2, n2, s2 = T.opts.fileUploadURL;
              T.opts.fileUploadToS3 && (s2 = T.opts.fileUploadToS3.uploadURL ? T.opts.fileUploadToS3.uploadURL : "https://".concat(T.opts.fileUploadToS3.region, ".amazonaws.com/").concat(T.opts.fileUploadToS3.bucket));
              var l2 = T.opts.fileUploadMethod;
              T.opts.fileUploadToAzure && (s2 = T.opts.fileUploadToAzure.uploadURL ? "".concat(T.opts.fileUploadToAzure.uploadURL, "/").concat(i2.name) : encodeURI("https://".concat(T.opts.fileUploadToAzure.account, ".blob.core.windows.net/").concat(T.opts.fileUploadToAzure.container, "/").concat(i2.name)), a2 = s2, T.opts.fileUploadToAzure.SASToken && (s2 += T.opts.fileUploadToAzure.SASToken), l2 = "PUT");
              var p2 = T.core.getXHR(s2, l2);
              if (T.opts.fileUploadToAzure) {
                var f2 = (/* @__PURE__ */ new Date()).toUTCString();
                if (!T.opts.fileUploadToAzure.SASToken && T.opts.fileUploadToAzure.accessKey) {
                  var d = T.opts.fileUploadToAzure.account, u2 = T.opts.fileUploadToAzure.container;
                  if (T.opts.fileUploadToAzure.uploadURL) {
                    var c2 = T.opts.fileUploadToAzure.uploadURL.split("/");
                    u2 = c2.pop(), d = c2.pop().split(".")[0];
                  }
                  var v2 = "x-ms-blob-type:BlockBlob\nx-ms-date:".concat(f2, "\nx-ms-version:2019-07-07"), g2 = encodeURI("/" + d + "/" + u2 + "/" + i2.name), h2 = l2 + "\n\n\n" + i2.size + "\n\n" + t2 + "\n\n\n\n\n\n\n" + v2 + "\n" + g2, U = T.cryptoJSPlugin.cryptoJS.HmacSHA256(h2, T.cryptoJSPlugin.cryptoJS.enc.Base64.parse(T.opts.fileUploadToAzure.accessKey)).toString(T.cryptoJSPlugin.cryptoJS.enc.Base64), m2 = "SharedKey " + d + ":" + U;
                  n2 = U, p2.setRequestHeader("Authorization", m2);
                }
                for (r2 in p2.setRequestHeader("x-ms-version", "2019-07-07"), p2.setRequestHeader("x-ms-date", f2), p2.setRequestHeader("Content-Type", t2), p2.setRequestHeader("x-ms-blob-type", "BlockBlob"), T.opts.fileUploadParams) T.opts.fileUploadParams.hasOwnProperty(r2) && p2.setRequestHeader(r2, T.opts.fileUploadParams[r2]);
                for (r2 in T.opts.fileUploadToAzure.params) T.opts.fileUploadToAzure.params.hasOwnProperty(r2) && p2.setRequestHeader(r2, T.opts.fileUploadToAzure.params[r2]);
              }
              p2.onload = function() {
                k.call(p2, i2.name, a2, n2);
              }, p2.onerror = R, p2.upload.onprogress = C, p2.onabort = z, w();
              var b = T.popups.get("file.insert");
              b && (b.off("abortUpload"), b.on("abortUpload", function() {
                4 !== p2.readyState && p2.abort();
              })), p2.send(T.opts.fileUploadToAzure ? i2 : o2);
            }
          }
        }
        function s() {
          a();
        }
        function l(e) {
          if (e) return T.popups.onHide("file.insert", s), true;
          var t2;
          T.opts.fileUpload || T.opts.fileInsertButtons.splice(T.opts.fileInsertButtons.indexOf("fileUpload"), 1), t2 = '<div class="fr-buttons fr-tabs">'.concat(T.button.buildList(T.opts.fileInsertButtons), "</div>");
          var o2 = "";
          T.opts.fileUpload && (o2 = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-'.concat(T.id, '"><strong>').concat(T.language.translate("Drop file"), "</strong><br>(").concat(T.language.translate("or click"), ')<div class="fr-form"><input type="file" name="').concat(T.opts.fileUploadParam, '" accept="').concat(0 <= T.opts.fileAllowedTypes.indexOf("*") ? "/" : "").concat(T.opts.fileAllowedTypes.join(", ").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-file-upload-layer-').concat(T.id, '" role="button"></div></div>'));
          var i2 = { buttons: t2, upload_layer: o2, progress_bar: '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>' }, r2 = T.popups.create("file.insert", i2);
          return (function a2(o3) {
            T.events.$on(o3, "dragover dragenter", ".fr-file-upload-layer", function() {
              return u(this).addClass("fr-drop"), false;
            }, true), T.events.$on(o3, "dragleave dragend", ".fr-file-upload-layer", function() {
              return u(this).removeClass("fr-drop"), false;
            }, true), T.events.$on(o3, "drop", ".fr-file-upload-layer", function(e2) {
              e2.preventDefault(), e2.stopPropagation(), u(this).removeClass("fr-drop");
              var t3 = e2.originalEvent.dataTransfer;
              t3 && t3.files && (o3.data("instance") || T).file.upload(t3.files);
            }, true), T.helpers.isIOS() && T.events.$on(o3, "touchstart", '.fr-file-upload-layer input[type="file"]', function() {
              u(this).trigger("click");
            }), T.events.$on(o3, "change", '.fr-file-upload-layer input[type="file"]', function() {
              if (this.files) {
                var e2 = o3.data("instance") || T;
                e2.events.disableBlur(), o3.find("input:focus").blur(), e2.events.enableBlur(), e2.file.upload(this.files);
              }
              u(this).val("");
            }, true);
          })(r2), r2;
        }
        function t(e) {
          T.node.hasClass(e, "fr-file");
        }
        function p(e) {
          var t2 = e.originalEvent.dataTransfer;
          if (t2 && t2.files && t2.files.length) {
            var o2 = t2.files[0];
            if (o2 && "undefined" != typeof o2.type) {
              if (o2.type.indexOf("image") < 0) {
                if (!T.opts.fileUpload) return e.preventDefault(), e.stopPropagation(), false;
                T.markers.remove(), T.markers.insertAtPoint(e.originalEvent), T.$el.find(".fr-marker").replaceWith(m.MARKERS), T.popups.hideAll();
                var i2 = T.popups.get("file.insert");
                return i2 || (i2 = l()), T.popups.setContainer("file.insert", T.$sc), T.popups.show("file.insert", e.originalEvent.pageX, e.originalEvent.pageY), w(), n(t2.files), e.preventDefault(), e.stopPropagation(), false;
              }
            } else o2.type.indexOf("image") < 0 && (e.preventDefault(), e.stopPropagation());
          }
        }
        function f() {
          var e, t2 = Array.prototype.slice.call(T.el.querySelectorAll("a.fr-file")), o2 = [];
          for (e = 0; e < t2.length; e++) o2.push(t2[e].getAttribute("href"));
          if (i) for (e = 0; e < i.length; e++) o2.indexOf(i[e].getAttribute("href")) < 0 && T.events.trigger("file.unlink", [i[e]]);
          i = t2;
        }
        return o[1] = "File cannot be loaded from the passed link.", o[c] = "No link in upload response.", o[v] = "Error during file upload.", o[g] = "Parsing response failed.", o[S] = "File is too large.", o[P] = "File file type is invalid.", o[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", { _init: function d() {
          !(function e() {
            T.events.on("drop", p), T.events.$on(T.$win, "keydown", function(e2) {
              var t2 = e2.which, o2 = T.popups.get("file.insert");
              o2 && t2 === m.KEYCODE.ESC && o2.trigger("abortUpload");
            }), T.events.on("destroy", function() {
              var e2 = T.popups.get("file.insert");
              e2 && e2.trigger("abortUpload");
            });
          })(), T.events.on("link.beforeRemove", t), T.$wp && (f(), T.events.on("contentChanged", f)), l(true);
        }, showInsertPopup: function U() {
          var e = T.$tb.find('.fr-command[data-cmd="insertFile"]'), t2 = T.popups.get("file.insert");
          if (t2 || (t2 = l()), a(), !t2.hasClass("fr-active")) if (T.popups.refresh("file.insert"), T.popups.setContainer("file.insert", T.$tb), e.isVisible) {
            var o2 = T.button.getPosition(e), i2 = o2.left, r2 = o2.top;
            T.popups.show("file.insert", i2, r2, e.outerHeight());
          } else T.position.forSelection(t2), T.popups.show("file.insert");
        }, upload: n, insert: h, back: function e() {
          T.events.disableBlur(), T.selection.restore(), T.events.enableBlur(), T.popups.hide("file.insert"), T.toolbar.showInline();
        }, hideProgressBar: a };
      }, m.DefineIcon("insertFile", { NAME: "file-o", FA5NAME: "file", SVG_KEY: "insertFile" }), m.RegisterCommand("insertFile", { title: "Upload File", undo: false, focus: true, refreshAfterCallback: false, popup: true, callback: function() {
        this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("file.insert")) : this.file.showInsertPopup();
      }, plugin: "file" }), m.DefineIcon("fileBack", { NAME: "arrow-left", SVG_KEY: "back" }), m.RegisterCommand("fileBack", { title: "Back", undo: false, focus: false, back: true, refreshAfterCallback: false, callback: function() {
        this.file.back();
      }, refresh: function(e) {
        this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
      } }), m.RegisterCommand("fileDismissError", { title: "OK", callback: function() {
        this.file.hideProgressBar(true);
      } });
    });
  }
});
export default require_file_min();
/*! Bundled license information:

froala-editor/js/plugins/file.min.js:
  (*!
   * froala_editor v4.7.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2025 Froala Labs
   *)
*/
//# sourceMappingURL=froala-editor_js_plugins_file__min__js.js.map
