import {
  require_froala_editor_min
} from "./chunk-NIYVL2AX.js";
import {
  __commonJS
} from "./chunk-SNAQBZPT.js";

// node_modules/froala-editor/js/plugins/video.min.js
var require_video_min = __commonJS({
  "node_modules/froala-editor/js/plugins/video.min.js"(exports, module) {
    !(function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(require_froala_editor_min()) : "function" == typeof define && define.amd ? define(["froala-editor"], t) : t(e.FroalaEditor);
    })(exports, function(we) {
      "use strict";
      we = we && we.hasOwnProperty("default") ? we["default"] : we, Object.assign(we.POPUP_TEMPLATES, { "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]", "video.edit": "[_BUTTONS_]", "video.size": "[_BUTTONS_][_SIZE_LAYER_]" }), Object.assign(we.DEFAULTS, { videoAllowedTypes: ["mp4", "webm", "ogg", "mp3", "mpeg", "url"], videoAllowedProviders: [".*"], videoDefaultAlign: "center", videoDefaultDisplay: "block", videoDefaultWidth: 600, videoEditButtons: ["videoReplace", "videoRemove", "videoDisplay", "videoAlign", "videoSize", "autoplay"], videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed", "videoUpload"], videoMaxSize: 52428800, videoMove: true, videoResize: true, videoResponsive: false, videoSizeButtons: ["videoBack", "|"], videoSplitHTML: false, videoTextNear: true, videoUpload: true, videoUploadMethod: "POST", videoUploadParam: "file", videoUploadParams: {}, videoUploadToS3: false, videoUploadToAzure: false, videoUploadURL: null }), we.VIDEO_PROVIDERS = [{ test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\/?((shorts\/)|(v=))?([^#\&\?]*).*/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/)?([0-9a-zA-Z_\-]+)(.*)?/g, url_text: "https://www.youtube.com/embed/$1?$2", html: '<iframe width="640" height="360" src="{url}&wmode=opaque&rel=0" frameborder="0" allowfullscreen></iframe>', provider: "youtube" }, { test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/, url_regex: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?(\/[a-zA-Z0-9_\-]+)?/i, url_text: "https://player.vimeo.com/video/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "vimeo" }, { test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g, url_text: "https://www.dailymotion.com/embed/video/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "dailymotion" }, { test_regex: /^.+(screen.yahoo.com)\/[^_&]+/, url_regex: "", url_text: "", html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>', provider: "yahoo" }, { test_regex: /^.+(rutube.ru)\/[^_&]+/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g, url_text: "https://rutube.ru/play/embed/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>', provider: "rutube" }, { test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/, url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/g, url_text: "https://play.vidyard.com/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "vidyard" }], we.VIDEO_EMBED_REGEX = /^\W*(<div[^>]*>\s*<iframe[^>]*>.*?<\/iframe>\s*<\/div>(\s*<script[^>]*>.*?<\/script>)?|<iframe[^>]*>.*?<\/iframe>|<embed(.|\n)*>)\W*$/i, we.PLUGINS.video = function(w) {
        var s, f, p, E, i, o, A = w.$, C = "https://i.froala.com/upload", c = 2, v = 3, u = 4, S = 5, U = 6, a = {};
        function g() {
          var e = w.popups.get("video.insert");
          e.find(".fr-video-by-url-layer input").val("").trigger("change");
          var t2 = e.find(".fr-video-embed-layer textarea");
          t2.val("").trigger("change"), (t2 = e.find(".fr-video-upload-layer input")).val("").trigger("change");
        }
        function r() {
          var e = w.popups.get("video.edit");
          if (e || (e = (function n2() {
            var e2 = "";
            if (0 < w.opts.videoEditButtons.length) {
              w.opts.videoResponsive && (-1 < w.opts.videoEditButtons.indexOf("videoSize") && w.opts.videoEditButtons.splice(w.opts.videoEditButtons.indexOf("videoSize"), 1), -1 < w.opts.videoEditButtons.indexOf("videoDisplay") && w.opts.videoEditButtons.splice(w.opts.videoEditButtons.indexOf("videoDisplay"), 1), -1 < w.opts.videoEditButtons.indexOf("videoAlign") && w.opts.videoEditButtons.splice(w.opts.videoEditButtons.indexOf("videoAlign"), 1));
              var t3 = { buttons: e2 += '<div class="fr-buttons"> \n      '.concat(w.button.buildList(w.opts.videoEditButtons), " \n      </div>") }, o3 = w.popups.create("video.edit", t3);
              return w.events.$on(w.$wp, "scroll.video-edit", function() {
                E && w.popups.isVisible("video.edit") && (w.events.disableBlur(), l(E));
              }), o3;
            }
            return false;
          })()), e) {
            w.popups.setContainer("video.edit", w.$sc), w.popups.refresh("video.edit");
            var t2 = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video")), o2 = t2.offset().left + t2.outerWidth() / 2, i2 = t2.offset().top + t2.outerHeight(), a2 = t2.get(0).src ? t2.get(0).src : t2.get(0).currentSrc, r2 = !(!(a2 = (a2 = a2.split("."))[a2.length - 1]).includes("pdf") && !a2.includes("txt"));
            t2.hasClass("fr-file") || r2 || E.find("audio").get(0) ? (document.getElementById("autoplay-".concat(w.id)) && (document.getElementById("autoplay-".concat(w.id)).style.display = "none"), document.getElementById("videoReplace-".concat(w.id)) && (document.getElementById("videoReplace-".concat(w.id)).style.display = "none")) : (document.getElementById("autoplay-".concat(w.id)) && (document.getElementById("autoplay-".concat(w.id)).style.display = ""), document.getElementById("videoReplace-".concat(w.id)) && (document.getElementById("videoReplace-".concat(w.id)).style.display = "")), w.popups.show("video.edit", o2, i2, t2.outerHeight(), true);
          }
        }
        function n(e) {
          if (e) return w.popups.onRefresh("video.insert", g), w.popups.onHide("video.insert", J), true;
          var t2 = "";
          w.opts.videoUpload || -1 === w.opts.videoInsertButtons.indexOf("videoUpload") || w.opts.videoInsertButtons.splice(w.opts.videoInsertButtons.indexOf("videoUpload"), 1);
          var o2 = w.button.buildList(w.opts.videoInsertButtons);
          "" !== o2 && (t2 = '<div class="fr-buttons">' + o2 + "</div>");
          var i2, a2 = "", r2 = w.opts.videoInsertButtons.indexOf("videoUpload"), n2 = w.opts.videoInsertButtons.indexOf("videoByURL"), s2 = w.opts.videoInsertButtons.indexOf("videoEmbed");
          if (0 <= n2) {
            i2 = " fr-active", (r2 < n2 && 0 <= r2 || s2 < n2 && 0 <= s2) && (i2 = "");
            a2 = '<div class="fr-video-by-url-layer fr-layer'.concat(i2, '" id="fr-video-by-url-layer-').concat(w.id, '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-').concat(w.id, '" type="text" placeholder="').concat(w.language.translate("Paste in a video URL"), `" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><span style='float:left'><div class="fr-checkbox-line fr-autoplay-margin"><span class="fr-checkbox"> <input id='videoPluginAutoplay' data-checked="_blank" type="checkbox" aria-label="`).concat(w.language.translate("Autoplay"), '"><span>').concat('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>', '</span></span> <label id="fr-label-target-').concat(w.id, '">').concat(w.language.translate("Autoplay"), '</label></div> </span><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">').concat(w.language.translate("Insert"), "</button></div></div>");
          }
          var d2 = "";
          0 <= s2 && (i2 = " fr-active", (r2 < s2 && 0 <= r2 || n2 < s2 && 0 <= n2) && (i2 = ""), d2 = '<div class="fr-video-embed-layer fr-layer'.concat(i2, '" id="fr-video-embed-layer-').concat(w.id, '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text').concat(w.id, '" type="text" placeholder="').concat(w.language.translate("Embedded Code"), '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">').concat(w.language.translate("Insert"), "</button></div></div>"));
          var l2 = "";
          0 <= r2 && (i2 = " fr-active", (s2 < r2 && 0 <= s2 || n2 < r2 && 0 <= n2) && (i2 = ""), l2 = '<div class="fr-video-upload-layer fr-layer'.concat(i2, '" id="fr-video-upload-layer-').concat(w.id, '"><strong>').concat(w.language.translate("Drop video"), "</strong><br>(").concat(w.language.translate("or click"), ')<div class="fr-form"><input type="file" accept="video/').concat(w.opts.videoAllowedTypes.join(", video/").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-').concat(w.id, '" role="button"></div></div>'));
          var f2 = { buttons: t2, by_url_layer: a2, embed_layer: d2, upload_layer: l2, progress_bar: '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>' }, p2 = w.popups.create("video.insert", f2);
          return (function c2(i3) {
            w.events.$on(i3, "dragover dragenter", ".fr-video-upload-layer", function() {
              return A(this).addClass("fr-drop"), false;
            }, true), w.events.$on(i3, "dragleave dragend", ".fr-video-upload-layer", function() {
              return A(this).removeClass("fr-drop"), false;
            }, true), w.events.$on(i3, "drop", ".fr-video-upload-layer", function(e2) {
              e2.preventDefault(), e2.stopPropagation(), A(this).removeClass("fr-drop");
              var t3 = e2.originalEvent.dataTransfer;
              if (t3 && t3.files) {
                var o3 = i3.data("instance") || w;
                o3.events.disableBlur(), o3.video.upload(t3.files), o3.events.enableBlur();
              }
            }, true), w.helpers.isIOS() && w.events.$on(i3, "touchstart", '.fr-video-upload-layer input[type="file"]', function() {
              A(this).trigger("click");
            }, true);
            w.events.$on(i3, "change", '.fr-video-upload-layer input[type="file"]', function() {
              if (this.files) {
                var e2 = i3.data("instance") || w;
                e2.events.disableBlur(), i3.find("input:focus").blur(), e2.events.enableBlur(), e2.video.upload(this.files);
              }
              A(this).val("");
            }, true);
          })(p2), p2;
        }
        function h(e) {
          w.events.focus(true), w.selection.restore();
          var t2 = false;
          if (E && (q(), t2 = true), w.opts.trackChangesEnabled) {
            w.edit.on(), w.events.focus(true), w.selection.restore(), w.undo.saveStep(), w.markers.insert(), w.html.wrap();
            var o2 = w.$el.find(".fr-marker");
            w.node.isLastSibling(o2) && o2.parent().hasClass("fr-deletable") && o2.insertAfter(o2.parent()), o2.replaceWith('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-deletable">'.concat(e, "</span>")), w.selection.clear();
          } else w.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-deletable">'.concat(e, "</span>"), false, w.opts.videoSplitHTML);
          w.popups.hide("video.insert");
          var i2 = w.$el.find(".fr-jiv");
          i2.removeClass("fr-jiv"), i2.toggleClass("fr-rv", w.opts.videoResponsive), Z(i2, w.opts.videoDefaultDisplay, w.opts.videoDefaultAlign), i2.toggleClass("fr-draggable", w.opts.videoMove), w.events.trigger(t2 ? "video.replaced" : "video.inserted", [i2]);
        }
        function m() {
          var e = A(this);
          w.popups.hide("video.insert"), e.removeClass("fr-uploading"), e.parent().next().is("br") && e.parent().next().remove(), l(e.parent()), w.events.trigger("video.loaded", [e.parent()]);
        }
        function x(s2, e, d2, l2, f2, p2) {
          w.edit.off(), b("Loading video"), e && (s2 = w.helpers.sanitizeURL(s2));
          var c2 = function c3() {
            var e2, t2;
            if (l2) {
              w.undo.canDo() || l2.find("video").hasClass("fr-uploading") || w.undo.saveStep();
              var o2 = l2.find("video").data("fr-old-src"), i2 = l2.data("fr-replaced");
              if (l2.data("fr-replaced", false), 0 < l2.find("iframe").length) l2.remove(), e2 = I(s2, d2, m);
              else {
                w.$wp ? ((e2 = l2.clone(true)).find("video").removeData("fr-old-src").removeClass("fr-uploading"), e2.find("video").off("canplay"), o2 && l2.find("video").attr("src", o2), l2.replaceWith(e2)) : e2 = l2;
                for (var a2 = e2.find("video").get(0).attributes, r2 = 0; r2 < a2.length; r2++) {
                  var n2 = a2[r2];
                  0 === n2.nodeName.indexOf("data-") && e2.find("video").removeAttr(n2.nodeName);
                }
                if (void 0 !== d2) for (t2 in d2) d2.hasOwnProperty(t2) && "link" != t2 && e2.find("video").attr("data-".concat(t2), d2[t2]);
                e2.find("video").on("canplay", m), e2.find("video").attr("src", s2);
              }
              w.edit.on(), O(), w.undo.saveStep(), w.$el.blur(), w.events.trigger(i2 ? "video.replaced" : "video.inserted", [e2, f2]);
            } else e2 = I(s2, d2, m, p2), O(), w.undo.saveStep(), w.events.trigger("video.inserted", [e2, f2]);
          };
          R("Loading video"), c2();
        }
        function R(e) {
          var t2 = w.popups.get("video.insert");
          if (t2 || (t2 = n()), t2.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t2.find(".fr-video-progress-bar-layer").addClass("fr-active"), t2.find(".fr-buttons").hide(), E) {
            var o2 = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video"));
            w.popups.setContainer("video.insert", w.$sc);
            var i2 = o2.offset().left, a2 = o2.offset().top + o2.height();
            w.popups.show("video.insert", i2, a2, o2.outerHeight());
          }
          void 0 === e && b(w.language.translate("Uploading"), 0);
        }
        function d(e) {
          var t2 = w.popups.get("video.insert");
          if (t2 && (t2.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t2.find(".fr-video-progress-bar-layer").removeClass("fr-active"), t2.find(".fr-buttons").show(), e || w.$el.find("video.fr-error").length)) {
            if (w.events.focus(), w.$el.find("video.fr-error").length && (w.$el.find("video.fr-error").parent().remove(), w.undo.saveStep(), w.undo.run(), w.undo.dropRedo()), !w.$wp && E) {
              var o2 = E;
              V(true), w.selection.setAfter(o2.find("video").get(0)), w.selection.restore();
            }
            w.popups.hide("video.insert");
          }
        }
        function b(e, t2) {
          var o2 = w.popups.get("video.insert");
          if (o2) {
            var i2 = o2.find(".fr-video-progress-bar-layer");
            i2.find("h3").text(e + (t2 ? " ".concat(t2, "%") : "")), i2.removeClass("fr-error"), t2 ? (i2.find("div").removeClass("fr-indeterminate"), i2.find("div > span").css("width", "".concat(t2, "%"))) : i2.find("div").addClass("fr-indeterminate");
          }
        }
        function y(e) {
          R();
          var t2 = w.popups.get("video.insert").find(".fr-video-progress-bar-layer");
          t2.addClass("fr-error");
          var o2 = t2.find("h3");
          o2.text(e), w.events.disableBlur(), o2.focus();
        }
        function l(e) {
          t.call(e.get(0));
        }
        function _(e, t2, o2) {
          b("Loading video");
          var i2 = this.status, a2 = this.response, r2 = this.responseXML, n2 = this.responseText;
          try {
            if (w.opts.videoUploadToS3 || w.opts.videoUploadToAzure) if (201 == i2) {
              var s2;
              if (w.opts.videoUploadToAzure) {
                if (false === w.events.trigger("video.uploadedToAzure", [this.responseURL, o2, a2], true)) return w.edit.on(), false;
                s2 = t2;
              } else s2 = (function l2(e2) {
                try {
                  var t3 = A(e2).find("Location").text(), o3 = A(e2).find("Key").text();
                  return false === w.events.trigger("video.uploadedToS3", [t3, o3, e2], true) ? (w.edit.on(), false) : t3;
                } catch (i3) {
                  return F(u, e2), false;
                }
              })(r2);
              s2 && x(s2, false, [], e, a2 || r2);
            } else F(u, a2 || r2);
            else if (200 <= i2 && i2 < 300) {
              var d2 = (function f2(e2) {
                try {
                  if (false === w.events.trigger("video.uploaded", [e2], true)) return w.edit.on(), false;
                  var t3 = JSON.parse(e2);
                  return t3.link ? t3 : (F(c, e2), false);
                } catch (o3) {
                  return F(u, e2), false;
                }
              })(n2);
              d2 && x(d2.link, false, d2, e, a2 || n2);
            } else F(v, a2 || n2);
          } catch (p2) {
            F(u, a2 || n2);
          }
        }
        function B() {
          F(u, this.response || this.responseText || this.responseXML);
        }
        function D(e) {
          if (e.lengthComputable) {
            var t2 = e.loaded / e.total * 100 | 0;
            b(w.language.translate("Uploading"), t2);
          }
        }
        function k() {
          w.edit.on(), d(true);
        }
        function I(e, t2, o2, i2) {
          var a2, r2, n2 = "";
          if (t2 && void 0 !== t2) for (a2 in t2) t2.hasOwnProperty(a2) && "link" != a2 && (n2 += " ".concat(a2, '="').concat(t2[a2], '"'));
          var s2 = w.opts.videoDefaultWidth;
          s2 && "auto" != s2 && (s2 = "".concat(s2, "px")), w.helpers.isMobile() && w.browser.safari && (n2 += " autoplay playsinline"), (r2 = "audio" == i2 ? A(document.createElement("span")).attr("contenteditable", "false").attr("draggable", "true").attr("class", "fr-video fr-dv" + w.opts.videoDefaultDisplay[0] + ("center" != w.opts.videoDefaultAlign ? " fr-fv" + w.opts.videoDefaultAlign[0] : "")).html('<audio src="' + e + '" ' + n2 + " controls>" + w.language.translate("Your browser does not support HTML5 video.") + "</audio>") : A(document.createElement("span")).attr("contenteditable", "false").attr("draggable", "true").attr("class", "fr-video fr-dv" + w.opts.videoDefaultDisplay[0] + ("center" != w.opts.videoDefaultAlign ? " fr-fv" + w.opts.videoDefaultAlign[0] : "")).html('<video src="' + e + '" ' + n2 + (s2 ? ' style="width: ' + s2 + ';" ' : "") + " controls>" + w.language.translate("Your browser does not support HTML5 video.") + "</video>")).toggleClass("fr-draggable", w.opts.videoMove), w.edit.on(), w.events.focus(true), w.selection.restore(), w.undo.saveStep(), w.opts.videoSplitHTML ? w.markers.split() : (w.cursor.enter(), w.markers.insert()), w.html.wrap();
          var d2 = w.$el.find(".fr-marker");
          return w.node.isLastSibling(d2) && d2.parent().hasClass("fr-deletable") && d2.insertAfter(d2.parent()), d2.replaceWith(r2), w.selection.clear(), "audio" !== i2 && (r2.find("video").get(0).readyState > r2.find("video").get(0).HAVE_FUTURE_DATA || w.helpers.isIOS() ? o2.call(r2.find("video").get(0)) : r2.find("video").on("canplaythrough load", o2)), r2;
        }
        function T(e) {
          if (!w.core.sameInstance(p)) return true;
          e.preventDefault(), e.stopPropagation();
          var t2 = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null), o2 = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
          if (!t2 || !o2) return false;
          if ("mousedown" == e.type) {
            var i2 = w.$oel.get(0).ownerDocument, a2 = i2.defaultView || i2.parentWindow, r2 = false;
            try {
              r2 = a2.location != a2.parent.location && !(a2.$ && a2.$.FE);
            } catch (n2) {
            }
            r2 && a2.frameElement && (t2 += w.helpers.getPX(A(a2.frameElement).offset().left) + a2.frameElement.clientLeft, o2 = e.clientY + w.helpers.getPX(A(a2.frameElement).offset().top) + a2.frameElement.clientTop);
          }
          w.undo.canDo() || w.undo.saveStep(), (f = A(this)).data("start-x", t2), f.data("start-y", o2), s.show(), w.popups.hideAll(), Y();
        }
        function z(e) {
          if (!w.core.sameInstance(p)) return true;
          if (f) {
            e.preventDefault();
            var t2 = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null), o2 = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
            if (!t2 || !o2) return false;
            var i2 = f.data("start-x"), a2 = f.data("start-y");
            f.data("start-x", t2), f.data("start-y", o2);
            var r2 = t2 - i2, n2 = o2 - a2, s2 = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video")), d2 = s2.width(), l2 = s2.height();
            (f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (r2 = 0 - r2), (f.hasClass("fr-hnw") || f.hasClass("fr-hne")) && (n2 = 0 - n2), s2.css("width", d2 + r2), s2.css("height", l2 + n2), s2.removeAttr("width"), s2.removeAttr("height"), M();
          }
        }
        function P(e) {
          if (!w.core.sameInstance(p)) return true;
          f && E && (e && e.stopPropagation(), f = null, s.hide(), M(), r(), w.undo.saveStep());
        }
        function $(e) {
          return '<div class="fr-handler fr-h'.concat(e, '"></div>');
        }
        function L(e, t2, o2, i2) {
          return e.pageX = t2, e.pageY = t2, T.call(this, e), e.pageX = e.pageX + o2 * Math.floor(Math.pow(1.1, i2)), e.pageY = e.pageY + o2 * Math.floor(Math.pow(1.1, i2)), z.call(this, e), P.call(this, e), ++i2;
        }
        function O() {
          var e, t2 = Array.prototype.slice.call(w.el.querySelectorAll("video, .fr-video > *")), o2 = [];
          for (e = 0; e < t2.length; e++) o2.push(t2[e].getAttribute("src")), A(t2[e]).toggleClass("fr-draggable", w.opts.videoMove), "" === t2[e].getAttribute("class") && t2[e].removeAttribute("class"), "" === t2[e].getAttribute("style") && t2[e].removeAttribute("style");
          if (i) for (e = 0; e < i.length; e++) o2.indexOf(i[e].getAttribute("src")) < 0 && w.events.trigger("video.removed", [A(i[e])]);
          i = t2;
        }
        function M() {
          p || (function n2() {
            var e2;
            if (w.shared.$video_resizer ? (p = w.shared.$video_resizer, s = w.shared.$vid_overlay, w.events.on("destroy", function() {
              A("body").first().append(p.removeClass("fr-active"));
            }, true)) : (w.shared.$video_resizer = A(document.createElement("div")).attr("class", "fr-video-resizer"), p = w.shared.$video_resizer, w.events.$on(p, "mousedown", function(e3) {
              e3.stopPropagation();
            }, true), w.opts.videoResize && (p.append($("nw") + $("ne") + $("sw") + $("se")), w.shared.$vid_overlay = A(document.createElement("div")).attr("class", "fr-video-overlay"), s = w.shared.$vid_overlay, e2 = p.get(0).ownerDocument, A(e2).find("body").first().append(s))), w.events.on("shared.destroy", function() {
              p.html("").removeData().remove(), p = null, w.opts.videoResize && (s.remove(), s = null);
            }, true), w.helpers.isMobile() || w.events.$on(A(w.o_win), "resize.video", function() {
              V(true);
            }), w.opts.videoResize) {
              e2 = p.get(0).ownerDocument, w.events.$on(p, w._mousedown, ".fr-handler", T), w.events.$on(A(e2), w._mousemove, z), w.events.$on(A(e2.defaultView || e2.parentWindow), w._mouseup, P), w.events.$on(s, "mouseleave", P);
              var i2 = 1, a2 = null, r2 = 0;
              w.events.on("keydown", function(e3) {
                if (E) {
                  var t3 = -1 != navigator.userAgent.indexOf("Mac OS X") ? e3.metaKey : e3.ctrlKey, o3 = e3.which;
                  (o3 !== a2 || 200 < e3.timeStamp - r2) && (i2 = 1), (o3 == we.KEYCODE.EQUALS || w.browser.mozilla && o3 == we.KEYCODE.FF_EQUALS) && t3 && !e3.altKey ? i2 = L.call(this, e3, 1, 1, i2) : (o3 == we.KEYCODE.HYPHEN || w.browser.mozilla && o3 == we.KEYCODE.FF_HYPHEN) && t3 && !e3.altKey && (i2 = L.call(this, e3, 2, -1, i2)), a2 = o3, r2 = e3.timeStamp;
                }
              }), w.events.on("keyup", function() {
                i2 = 1;
              });
            }
          })(), (w.$wp || w.$sc).append(p), p.data("instance", w);
          var e = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video")), t2 = 0, o2 = 0;
          w.opts.iframe && (o2 = w.helpers.getPX(w.$wp.find(".fr-iframe").css("padding-top")), t2 = w.helpers.getPX(w.$wp.find(".fr-iframe").css("padding-left"))), p.css("top", (w.opts.iframe ? e.offset().top + o2 - 1 : e.offset().top - w.$wp.offset().top - 1) + w.$wp.scrollTop()).css("left", (w.opts.iframe ? e.offset().left + t2 - 1 : e.offset().left - w.$wp.offset().left - 1) + w.$wp.scrollLeft()).css("width", e.get(0).getBoundingClientRect().width).css("height", e.get(0).getBoundingClientRect().height).addClass("fr-active");
        }
        function t(e) {
          if (e && "touchend" == e.type && o) return true;
          if (e && w.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), false;
          if (w.edit.isDisabled()) return false;
          for (var t2 = 0; t2 < we.INSTANCES.length; t2++) we.INSTANCES[t2] != w && we.INSTANCES[t2].events.trigger("video.hideResizer");
          w.toolbar.disable(), w.helpers.isMobile() && (w.events.disableBlur(), w.$el.blur(), w.events.enableBlur()), w.$el.find(".fr-video.fr-active").removeClass("fr-active"), (E = A(this)).addClass("fr-active"), w.opts.iframe && w.size.syncIframe(), te(), M(), r(), w.selection.clear(), w.button.bulkRefresh(), w.events.trigger("image.hideResizer");
        }
        function V(e) {
          E && ((function t2() {
            return w.shared.vid_exit_flag;
          })() || true === e) && (p.removeClass("fr-active"), w.toolbar.enable(), E.removeClass("fr-active"), E = null, Y());
        }
        function N() {
          w.shared.vid_exit_flag = true;
        }
        function Y() {
          w.shared.vid_exit_flag = false;
        }
        function H(e) {
          var t2 = e.originalEvent.dataTransfer;
          if (t2 && t2.files && t2.files.length) {
            var o2 = t2.files[0];
            if (o2 && o2.type && -1 !== o2.type.indexOf("video")) {
              if (!w.opts.videoUpload) return e.preventDefault(), e.stopPropagation(), false;
              w.markers.remove(), w.markers.insertAtPoint(e.originalEvent), w.$el.find(".fr-marker").replaceWith(we.MARKERS), w.popups.hideAll();
              var i2 = w.popups.get("video.insert");
              return i2 || (i2 = n()), w.popups.setContainer("video.insert", w.$sc), w.popups.show("video.insert", e.originalEvent.pageX, e.originalEvent.pageY), R(), 0 <= w.opts.videoAllowedTypes.indexOf(o2.type.replace(/video\//g, "")) ? K(t2.files) : F(U), e.preventDefault(), e.stopPropagation(), false;
            }
          }
        }
        function K(e) {
          if (void 0 !== e && 0 < e.length) {
            if (false === w.events.trigger("video.beforeUpload", [e])) return false;
            var t2, o2 = e[0];
            if (!(null !== w.opts.videoUploadURL && w.opts.videoUploadURL != C || w.opts.videoUploadToS3 || w.opts.videoUploadToAzure)) return (function y2(i3) {
              E && E.find("iframe") && E.find("iframe").length && q();
              var a3 = new FileReader();
              a3.onload = function() {
                a3.result;
                for (var e2 = atob(a3.result.split(",")[1]), t3 = [], o3 = 0; o3 < e2.length; o3++) t3.push(e2.charCodeAt(o3));
                x(window.URL.createObjectURL(new Blob([new Uint8Array(t3)], { type: i3.type })), false, null, E);
              }, R(), a3.readAsDataURL(i3);
            })(o2), false;
            if (o2.size > w.opts.videoMaxSize) return F(S), false;
            if (w.opts.videoAllowedTypes.indexOf(o2.type.replace(/video\//g, "")) < 0) return F(U), false;
            if (w.drag_support.formdata && (t2 = w.drag_support.formdata ? new FormData() : null), t2) {
              var i2;
              if (false !== w.opts.videoUploadToS3) for (i2 in t2.append("key", w.opts.videoUploadToS3.keyStart + (/* @__PURE__ */ new Date()).getTime() + "-" + (o2.name || "untitled")), t2.append("success_action_status", "201"), t2.append("X-Requested-With", "xhr"), t2.append("Content-Type", o2.type), w.opts.videoUploadToS3.params) w.opts.videoUploadToS3.params.hasOwnProperty(i2) && t2.append(i2, w.opts.videoUploadToS3.params[i2]);
              for (i2 in w.opts.videoUploadParams) w.opts.videoUploadParams.hasOwnProperty(i2) && t2.append(i2, w.opts.videoUploadParams[i2]);
              t2.append(w.opts.videoUploadParam, o2);
              var a2, r2, n2 = w.opts.videoUploadURL;
              w.opts.videoUploadToS3 && (n2 = w.opts.videoUploadToS3.uploadURL ? w.opts.videoUploadToS3.uploadURL : "https://".concat(w.opts.videoUploadToS3.region, ".amazonaws.com/").concat(w.opts.videoUploadToS3.bucket));
              var s2 = w.opts.videoUploadMethod;
              w.opts.videoUploadToAzure && (n2 = w.opts.videoUploadToAzure.uploadURL ? "".concat(w.opts.videoUploadToAzure.uploadURL, "/").concat(o2.name) : encodeURI("https://".concat(w.opts.videoUploadToAzure.account, ".blob.core.windows.net/").concat(w.opts.videoUploadToAzure.container, "/").concat(o2.name)), a2 = n2, w.opts.videoUploadToAzure.SASToken && (n2 += w.opts.videoUploadToAzure.SASToken), s2 = "PUT");
              var d2 = w.core.getXHR(n2, s2);
              if (w.opts.videoUploadToAzure) {
                var l2 = (/* @__PURE__ */ new Date()).toUTCString();
                if (!w.opts.videoUploadToAzure.SASToken && w.opts.videoUploadToAzure.accessKey) {
                  var f2 = w.opts.videoUploadToAzure.account, p2 = w.opts.videoUploadToAzure.container;
                  if (w.opts.videoUploadToAzure.uploadURL) {
                    var c2 = w.opts.videoUploadToAzure.uploadURL.split("/");
                    p2 = c2.pop(), f2 = c2.pop().split(".")[0];
                  }
                  var v2 = "x-ms-blob-type:BlockBlob\nx-ms-date:".concat(l2, "\nx-ms-version:2019-07-07"), u2 = encodeURI("/" + f2 + "/" + p2 + "/" + o2.name), g2 = s2 + "\n\n\n" + o2.size + "\n\n" + o2.type + "\n\n\n\n\n\n\n" + v2 + "\n" + u2, h2 = w.cryptoJSPlugin.cryptoJS.HmacSHA256(g2, w.cryptoJSPlugin.cryptoJS.enc.Base64.parse(w.opts.videoUploadToAzure.accessKey)).toString(w.cryptoJSPlugin.cryptoJS.enc.Base64), m2 = "SharedKey " + f2 + ":" + h2;
                  r2 = h2, d2.setRequestHeader("Authorization", m2);
                }
                for (i2 in d2.setRequestHeader("x-ms-version", "2019-07-07"), d2.setRequestHeader("x-ms-date", l2), d2.setRequestHeader("Content-Type", o2.type), d2.setRequestHeader("x-ms-blob-type", "BlockBlob"), w.opts.videoUploadParams) w.opts.videoUploadParams.hasOwnProperty(i2) && d2.setRequestHeader(i2, w.opts.videoUploadParams[i2]);
                for (i2 in w.opts.videoUploadToAzure.params) w.opts.videoUploadToAzure.params.hasOwnProperty(i2) && d2.setRequestHeader(i2, w.opts.videoUploadToAzure.params[i2]);
              }
              d2.onload = function() {
                _.call(d2, E, a2, r2);
              }, d2.onerror = B, d2.upload.onprogress = D, d2.onabort = k, R(), w.events.disableBlur(), w.edit.off(), w.events.enableBlur();
              var b2 = w.popups.get("video.insert");
              b2 && A(b2.off("abortUpload")).on("abortUpload", function() {
                4 != d2.readyState && d2.abort();
              }), d2.send(w.opts.videoUploadToAzure ? o2 : t2);
            }
          }
        }
        function F(e, t2) {
          w.edit.on(), E && E.find("video").addClass("fr-error"), y(w.language.translate("Something went wrong. Please try again.")), w.events.trigger("video.error", [{ code: e, message: a[e] }, t2]);
        }
        function X() {
          if (E) {
            var e = w.popups.get("video.size"), t2 = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video"));
            e.find('input[name="width"]').val(t2.get(0).style.width || t2.attr("width")).trigger("change"), e.find('input[name="height"]').val(t2.get(0).style.height || t2.attr("height")).trigger("change");
          }
        }
        function G(e) {
          if (e) return w.popups.onRefresh("video.size", X), true;
          var t2 = { buttons: '<div class="fr-buttons fr-tabs">'.concat(w.button.buildList(w.opts.videoSizeButtons), "</div>"), size_layer: '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-'.concat(w.id, '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-').concat(w.id, '" type="text" name="width" placeholder="').concat(w.language.translate("Width"), '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-').concat(w.id, '" type="text" name="height" placeholder="').concat(w.language.translate("Height"), '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">').concat(w.language.translate("Update"), "</button></div></div>") }, o2 = w.popups.create("video.size", t2);
          return w.events.$on(w.$wp, "scroll", function() {
            E && w.popups.isVisible("video.size") && (w.events.disableBlur(), l(E));
          }), o2;
        }
        function j(e) {
          if (void 0 === e && (e = E), e) {
            if (e.hasClass("fr-fvl")) return "left";
            if (e.hasClass("fr-fvr")) return "right";
            if (e.hasClass("fr-dvb") || e.hasClass("fr-dvi")) return "center";
            if ("block" == e.css("display")) {
              if ("left" == e.css("text-algin")) return "left";
              if ("right" == e.css("text-align")) return "right";
            } else {
              if ("left" == e.css("float")) return "left";
              if ("right" == e.css("float")) return "right";
            }
          }
          return "center";
        }
        function W(e) {
          void 0 === e && (e = E);
          var t2 = e.css("float");
          return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t2 && e.css("float", t2), "block") : (e.css("float", ""), e.css("float") != t2 && e.css("float", t2), "inline");
        }
        function q() {
          if (E && false !== w.events.trigger("video.beforeRemove", [E])) {
            var e = E;
            if (w.popups.hideAll(), V(true), w.opts.trackChangesEnabled && (!e[0].parentNode || "SPAN" !== e[0].parentNode.tagName || !e[0].parentNode.hasAttribute("data-tracking"))) return void w.track_changes.removeSpecialItem(e);
            w.selection.setBefore(e.get(0)) || w.selection.setAfter(e.get(0)), e.remove(), w.selection.restore(), w.html.fillEmptyBlocks();
          }
        }
        function J() {
          d();
        }
        function Z(e, t2, o2) {
          !w.opts.htmlUntouched && w.opts.useClasses ? (e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"), e.addClass("fr-fv".concat(o2[0], " fr-dv").concat(t2[0]))) : "inline" == t2 ? (e.css({ display: "inline-block" }), "center" == o2 ? e.css({ "float": "none" }) : "left" == o2 ? e.css({ "float": "left" }) : e.css({ "float": "right" })) : (e.css({ display: "block", clear: "both" }), "left" == o2 ? e.css({ textAlign: "left" }) : "right" == o2 ? e.css({ textAlign: "right" }) : e.css({ textAlign: "center" }));
        }
        function Q() {
          var e = w.$el.find("video").filter(function() {
            return 0 === A(this).parents("span.fr-video").length;
          });
          if (0 != e.length) {
            e.wrap(A(document.createElement("span")).attr("class", "fr-video fr-deletable").attr("contenteditable", "false")), w.$el.find("embed, iframe").filter(function() {
              if (w.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src), 0 < A(this).parents("span.fr-video").length) return false;
              for (var e2 = A(this).attr("src"), t3 = 0; t3 < we.VIDEO_PROVIDERS.length; t3++) {
                var o3 = we.VIDEO_PROVIDERS[t3];
                if (o3.test_regex.test(e2) && new RegExp(w.opts.videoAllowedProviders.join("|")).test(o3.provider)) return true;
              }
              return false;
            }).map(function() {
              return 0 === A(this).parents("object").length ? this : A(this).parents("object").get(0);
            }).wrap(A(document.createElement("span")).attr("class", "fr-video").attr("contenteditable", "false"));
            for (var t2, o2, i2, a2, r2 = w.$el.find("span.fr-video, video"), n2 = 0; n2 < r2.length; n2++) {
              var s2 = A(r2[n2]);
              !w.opts.htmlUntouched && w.opts.useClasses ? ((a2 = s2).hasClass("fr-dvi") || a2.hasClass("fr-dvb") || (a2.addClass("fr-fv".concat(j(a2)[0])), a2.addClass("fr-dv".concat(W(a2)[0]))), w.opts.videoTextNear || s2.removeClass("fr-dvi").addClass("fr-dvb")) : w.opts.htmlUntouched || w.opts.useClasses || (void 0, o2 = (t2 = s2).hasClass("fr-dvb") ? "block" : t2.hasClass("fr-dvi") ? "inline" : null, i2 = t2.hasClass("fr-fvl") ? "left" : t2.hasClass("fr-fvr") ? "right" : j(t2), Z(t2, o2, i2), t2.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl"));
            }
            r2.toggleClass("fr-draggable", w.opts.videoMove);
          }
        }
        function ee(e) {
          document.getElementById("autoplay-".concat(w.id)).style.cssText = "background:".concat(e);
        }
        function te() {
          if (E) {
            w.selection.clear();
            var e = w.doc.createRange();
            e.selectNode(E.get(0)), w.selection.get().addRange(e);
          }
        }
        return a[1] = "Video cannot be loaded from the passed link.", a[c] = "No link in upload response.", a[v] = "Error during file upload.", a[u] = "Parsing response failed.", a[S] = "File is too large.", a[U] = "Video file type is invalid.", a[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", w.shared.vid_exit_flag = false, { _init: function oe() {
          w.opts.videoResponsive && (w.opts.videoResize = false), (function e() {
            w.events.on("drop", H, true), w.events.on("mousedown window.mousedown", N), w.events.on("window.touchmove", Y), w.events.on("mouseup window.mouseup", V), w.events.on("commands.mousedown", function(e2) {
              0 < e2.parents(".fr-toolbar").length && V();
            }), w.events.on("video.hideResizer commands.undo commands.redo element.dropped", function() {
              V(true);
            }), w.events.on("filestack-init-video", function() {
              n();
            });
          })(), w.helpers.isMobile() && (w.events.$on(w.$el, "touchstart", "span.fr-video", function() {
            o = false;
          }), w.events.$on(w.$el, "touchmove", function() {
            o = true;
          })), w.events.on("html.set", Q), Q(), w.events.$on(w.$el, "mousedown", "span.fr-video", function(e) {
            e.stopPropagation(), (w.browser.msie || w.browser.edge) && (e.target.innerText || (e.target.dragDrop(), t.call(this, e)));
          }), w.events.$on(w.$el, "click touchend", "span.fr-video", function(e) {
            if (e.target.innerText.length || "false" == A(this).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return true;
            t.call(this, e);
          }), w.events.on("keydown", function(e) {
            var t2 = e.which;
            return !E || t2 != we.KEYCODE.BACKSPACE && t2 != we.KEYCODE.DELETE ? E && t2 == we.KEYCODE.ESC ? (V(true), e.preventDefault(), false) : E && t2 != we.KEYCODE.F10 && !w.keys.isBrowserAction(e) ? (e.preventDefault(), false) : void 0 : (e.preventDefault(), q(), w.undo.saveStep(), false);
          }, true), w.events.on("toolbar.esc", function() {
            if (E) return w.events.disableBlur(), w.events.focus(), false;
          }, true), w.events.on("toolbar.focusEditor", function() {
            if (E) return false;
          }, true), w.events.on("keydown", function() {
            w.$el.find("span.fr-video:empty").remove();
          }), w.$wp && (O(), w.events.on("contentChanged", O)), n(true), G(true);
        }, showInsertPopup: function ie() {
          var e = w.$tb.find('.fr-command[data-cmd="insertVideo"]'), t2 = w.popups.get("video.insert");
          if (t2 || (t2 = n()), d(), !t2.hasClass("fr-active")) if (w.popups.refresh("video.insert"), w.popups.setContainer("video.insert", w.$tb), e.isVisible()) {
            var o2 = w.button.getPosition(e), i2 = o2.left, a2 = o2.top;
            w.popups.show("video.insert", i2, a2, e.outerHeight());
          } else w.position.forSelection(t2), w.popups.show("video.insert");
        }, showLayer: function ae(e) {
          var t2, o2, i2 = w.popups.get("video.insert");
          if (!E && !w.opts.toolbarInline) {
            var a2 = w.$tb.find('.fr-command[data-cmd="insertVideo"]');
            t2 = a2.offset().left, o2 = a2.offset().top + (w.opts.toolbarBottom ? 10 : a2.outerHeight() - 10);
          }
          w.opts.toolbarInline && (o2 = i2.offset().top - w.helpers.getPX(i2.css("margin-top")), i2.hasClass("fr-above") && (o2 += i2.outerHeight())), i2.find(".fr-layer").removeClass("fr-active"), i2.find(".fr-".concat(e, "-layer")).addClass("fr-active"), w.popups.show("video.insert", t2, o2, 0), w.accessibility.focusPopup(i2);
        }, refreshByURLButton: function re(e) {
          var t2 = w.popups.get("video.insert");
          t2 && t2.find(".fr-video-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", true);
        }, refreshEmbedButton: function ne(e) {
          var t2 = w.popups.get("video.insert");
          t2 && t2.find(".fr-video-embed-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", true);
        }, refreshUploadButton: function se(e) {
          var t2 = w.popups.get("video.insert");
          t2 && t2.find(".fr-video-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", true);
        }, upload: K, insertByURL: function de(e) {
          var t2 = !!document.getElementById("videoPluginAutoplay") && document.getElementById("videoPluginAutoplay").checked;
          if (void 0 === e) {
            var o2 = (e = (w.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "").trim()).match(/(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/);
            if (o2 && 7 == o2.length) {
              var i2 = o2[6], a2 = e.substring(0, e.lastIndexOf("/")), r2 = e.substring(e.lastIndexOf("/") + 1, e.length);
              e = r2.includes("?h=") || r2.includes("?v=") || i2 === r2 ? ("".concat(a2, "/").concat(r2) || "").trim() : ("".concat(a2, "?h=").concat(r2) || "").trim();
            }
          }
          var n2 = null;
          if (/^http/.test(e) || (e = "https://".concat(e)), w.helpers.isURL(e)) for (var s2 = 0; s2 < we.VIDEO_PROVIDERS.length; s2++) {
            var d2 = we.VIDEO_PROVIDERS[s2], l2 = "autoplay=1&mute=1";
            if (d2.html.includes("autoplay=1") && document.getElementById("videoPluginAutoplay").checked) d2.html = d2.html, document.getElementById("videoPluginAutoplay").checked = false;
            else if (t2) {
              var f2 = d2.html.indexOf("{url}") + 5;
              d2.html = [d2.html.slice(0, f2), l2, d2.html.slice(f2)].join(""), t2 = false, document.getElementById("videoPluginAutoplay").checked = false;
            } else (d2 = we.VIDEO_PROVIDERS[s2]).html = d2.html.replace(l2, "");
            if (d2.test_regex.test(e) && new RegExp(w.opts.videoAllowedProviders.join("|")).test(d2.provider)) {
              n2 = e.replace(d2.url_regex, d2.url_text), n2 = d2.html.replace(/\{url\}/, n2);
              break;
            }
          }
          n2 ? h(n2) : (y(w.language.translate("Something went wrong. Please try again.")), w.events.trigger("video.linkError", [e]));
        }, insertEmbed: function le(e) {
          void 0 === e && (e = w.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || ""), 0 !== e.length && we.VIDEO_EMBED_REGEX.test(e) ? h(e) : (y(w.language.translate("Something went wrong. Please try again.")), w.events.trigger("video.codeError", [e]));
        }, insert: h, align: function fe(e) {
          E.removeClass("fr-fvr fr-fvl"), !w.opts.htmlUntouched && w.opts.useClasses ? "left" == e ? E.addClass("fr-fvl") : "right" == e && E.addClass("fr-fvr") : Z(E, W(), e), te(), M(), r(), w.selection.clear();
        }, refreshAlign: function pe(e) {
          if (!E) return false;
          e.find(">*").first().replaceWith(w.icon.create("video-align-".concat(j())));
        }, refreshAlignOnShow: function ce(e, t2) {
          E && t2.find('.fr-command[data-param1="'.concat(j(), '"]')).addClass("fr-active").attr("aria-selected", true);
        }, display: function ve(e) {
          E.removeClass("fr-dvi fr-dvb"), !w.opts.htmlUntouched && w.opts.useClasses ? "inline" == e ? E.addClass("fr-dvi") : "block" == e && E.addClass("fr-dvb") : Z(E, e, j()), te(), M(), r(), w.selection.clear();
        }, refreshDisplayOnShow: function ue(e, t2) {
          E && t2.find('.fr-command[data-param1="'.concat(W(), '"]')).addClass("fr-active").attr("aria-selected", true);
        }, remove: q, hideProgressBar: d, showSizePopup: function ge() {
          var e = w.popups.get("video.size");
          e || (e = G()), d(), w.popups.refresh("video.size"), w.popups.setContainer("video.size", w.$sc);
          var t2 = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video")), o2 = t2.offset().left + t2.outerWidth() / 2, i2 = t2.offset().top + t2.height();
          w.popups.show("video.size", o2, i2, t2.height(), true);
        }, replace: function he() {
          var e = w.popups.get("video.insert");
          e || (e = n()), w.popups.isVisible("video.insert") || (d(), w.popups.refresh("video.insert"), w.popups.setContainer("video.insert", w.$sc));
          var t2 = E.offset().left + E.outerWidth() / 2, o2 = E.offset().top + E.height();
          w.popups.show("video.insert", t2, o2, E.outerHeight(), true);
        }, back: function e() {
          E ? (w.events.disableBlur(), E[0].click()) : (w.events.disableBlur(), w.selection.restore(), w.events.enableBlur(), w.popups.hide("video.insert"), w.toolbar.showInline());
        }, setSize: function me(e, t2) {
          if (E) {
            var o2 = w.popups.get("video.size"), i2 = E.find("iframe, embed, ".concat(E.find("iframe, embed, audio").get(0) ? "audio" : "video"));
            i2.css("width", e || o2.find('input[name="width"]').val()), i2.css("height", t2 || o2.find('input[name="height"]').val()), i2.get(0).style.width && i2.removeAttr("width"), i2.get(0).style.height && i2.removeAttr("height"), o2.find("input:focus").blur(), setTimeout(function() {
              E.trigger("click");
            }, w.helpers.isAndroid() ? 50 : 0);
          }
        }, get: function be() {
          return E;
        }, showProgressBar: R, _editVideo: l, setAutoplay: function ye() {
          var e;
          if (E.find("iframe, embed, audio").get(0)) (e = E.find("iframe, embed, audio")).get(0).src.includes("autoplay=1") ? (ee("#FFFFFF"), e.get(0).src = e.get(0).src.replace("&autoplay=1", "")) : (ee("#D6D6D6"), e.get(0).src = e.get(0).src + "&autoplay=1");
          else if ((e = E.find("iframe, embed, video")).get(0).outerHTML.includes("autoplay")) ee("#FFFFFF"), e.get(0).outerHTML = e.get(0).outerHTML.replace("autoplay", "");
          else {
            ee("#D6D6D6");
            var t2 = e.get(0).outerHTML.indexOf("class") - 1;
            e.get(0).outerHTML = [e.get(0).outerHTML.slice(0, t2), "autoplay", e.get(0).outerHTML.slice(t2)].join("");
          }
        }, insertHtmlVideo: x };
      }, we.RegisterCommand("insertVideo", { title: "Insert Video", undo: false, focus: true, refreshAfterCallback: false, popup: true, callback: function() {
        this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup();
      }, plugin: "video" }), we.DefineIcon("insertVideo", { NAME: "video-camera", FA5NAME: "camera", SVG_KEY: "insertVideo" }), we.DefineIcon("videoByURL", { NAME: "link", SVG_KEY: "insertLink" }), we.RegisterCommand("videoByURL", { title: "By URL", undo: false, focus: false, toggle: true, callback: function() {
        this.video.showLayer("video-by-url");
      }, refresh: function(e) {
        this.video.refreshByURLButton(e);
      } }), we.DefineIcon("videoEmbed", { NAME: "code", SVG_KEY: "codeView" }), we.RegisterCommand("videoEmbed", { title: "Embedded Code", undo: false, focus: false, toggle: true, callback: function() {
        this.video.showLayer("video-embed");
      }, refresh: function(e) {
        this.video.refreshEmbedButton(e);
      } }), we.DefineIcon("videoUpload", { NAME: "upload", SVG_KEY: "upload" }), we.RegisterCommand("videoUpload", { title: "Upload Video", undo: false, focus: false, toggle: true, callback: function() {
        this.video.showLayer("video-upload");
      }, refresh: function(e) {
        this.video.refreshUploadButton(e);
      } }), we.RegisterCommand("videoInsertByURL", { undo: true, focus: true, callback: function() {
        this.video.insertByURL();
      } }), we.RegisterCommand("videoInsertEmbed", { undo: true, focus: true, callback: function() {
        this.video.insertEmbed();
      } }), we.DefineIcon("videoDisplay", { NAME: "star", SVG_KEY: "star" }), we.RegisterCommand("videoDisplay", { title: "Display", type: "dropdown", options: { inline: "Inline", block: "Break Text" }, callback: function(e, t) {
        this.video.display(t);
      }, refresh: function(e) {
        this.opts.videoTextNear || e.addClass("fr-hidden");
      }, refreshOnShow: function(e, t) {
        this.video.refreshDisplayOnShow(e, t);
      } }), we.DefineIcon("video-align", { NAME: "align-left", SVG_KEY: "align Left" }), we.DefineIcon("video-align-left", { NAME: "align-left", SVG_KEY: "alignLeft" }), we.DefineIcon("video-align-right", { NAME: "align-right", SVG_KEY: "alignRight" }), we.DefineIcon("video-align-center", { NAME: "align-justify", SVG_KEY: "alignJustify" }), we.DefineIcon("videoAlign", { NAME: "align-center", SVG_KEY: "alignCenter" }), we.RegisterCommand("videoAlign", { type: "dropdown", title: "Align", options: { left: "Align Left", center: "None", right: "Align Right" }, html: function() {
        var e = '<ul class="fr-dropdown-list" role="presentation">', t = we.COMMANDS.videoAlign.options;
        for (var o in t) t.hasOwnProperty(o) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="'.concat(o, '" title="').concat(this.language.translate(t[o]), '">').concat(this.icon.create("video-align-".concat(o)), '<span class="fr-sr-only">').concat(this.language.translate(t[o]), "</span></a></li>"));
        return e += "</ul>";
      }, callback: function(e, t) {
        this.video.align(t);
      }, refresh: function(e) {
        this.video.refreshAlign(e);
      }, refreshOnShow: function(e, t) {
        this.video.refreshAlignOnShow(e, t);
      } }), we.DefineIcon("videoReplace", { NAME: "exchange", FA5NAME: "exchange-alt", SVG_KEY: "replaceImage" }), we.RegisterCommand("videoReplace", { title: "Replace", undo: false, focus: false, popup: true, refreshAfterCallback: false, callback: function() {
        this.video.replace();
      } }), we.DefineIcon("videoRemove", { NAME: "trash", SVG_KEY: "remove" }), we.RegisterCommand("videoRemove", { title: "Remove", callback: function() {
        this.video.remove();
      } }), we.DefineIcon("autoplay", { NAME: "autoplay", SVG_KEY: "autoplay" }), we.RegisterCommand("autoplay", { undo: false, focus: false, popup: true, title: "Autoplay", callback: function() {
        this.video.setAutoplay();
      } }), we.DefineIcon("videoSize", { NAME: "arrows-alt", SVG_KEY: "imageSize" }), we.RegisterCommand("videoSize", { undo: false, focus: false, popup: true, title: "Change Size", callback: function() {
        this.video.showSizePopup();
      } }), we.DefineIcon("videoBack", { NAME: "arrow-left", SVG_KEY: "back" }), we.RegisterCommand("videoBack", { title: "Back", undo: false, focus: false, back: true, callback: function() {
        this.video.back();
      }, refresh: function(e) {
        this.video.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next().hasClass("fr-separator") && e.next().removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next().hasClass("fr-separator") && e.next().addClass("fr-hidden"));
      } }), we.RegisterCommand("videoDismissError", { title: "OK", undo: false, callback: function() {
        this.video.hideProgressBar(true);
      } }), we.RegisterCommand("videoSetSize", { undo: true, focus: false, title: "Update", refreshAfterCallback: false, callback: function() {
        this.video.setSize();
      } });
    });
  }
});
export default require_video_min();
/*! Bundled license information:

froala-editor/js/plugins/video.min.js:
  (*!
   * froala_editor v4.7.0 (https://www.froala.com/wysiwyg-editor)
   * License https://froala.com/wysiwyg-editor/terms/
   * Copyright 2014-2025 Froala Labs
   *)
*/
//# sourceMappingURL=froala-editor_js_plugins_video__min__js.js.map
