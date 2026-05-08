/**
 * Converts Craft.js serialized node tree to clean HTML string.
 * Used to generate the rendered_html that gets stored in the content field.
 *
 * Now includes responsive CSS via media queries when components have
 * device-specific overrides (mobileFlexDirection, tabletFontSize, etc.)
 */

/** Resolve overlay preset names to CSS rgba values */
function resolveOverlay(value: string): string {
  const presets: Record<string, string> = {
    light: "rgba(0,0,0,0.2)",
    medium: "rgba(0,0,0,0.4)",
    dark: "rgba(0,0,0,0.6)",
    "extra-dark": "rgba(0,0,0,0.75)",
    "light-warm": "rgba(30,20,0,0.25)",
    "dark-blue": "rgba(10,20,50,0.6)",
  };
  if (!value) return "";
  return presets[value] || value;
}

interface SerializedNode {
  type: { resolvedName: string };
  props: Record<string, any>;
  nodes: string[];
  linkedNodes?: Record<string, string>;
  displayName?: string;
  custom?: Record<string, any>;
  parent?: string | null;
  isCanvas?: boolean;
}

type SerializedNodes = Record<string, SerializedNode>;

/** Collects responsive CSS rules during serialization */
interface ResponsiveRule {
  className: string;
  tablet?: Record<string, string>;
  mobile?: Record<string, string>;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

let responsiveRules: ResponsiveRule[] = [];
let classCounter = 0;

function buildStyleString(styles: Record<string, any>): string {
  return Object.entries(styles)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");
}

function sanitizeCustomHtml(html: string): string {
  if (!html) return "";

  if (typeof document === "undefined") {
    return html
      .replace(/<script\b[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
      .replace(/\s(srcdoc|href|src|action)\s*=\s*(['"])\s*(javascript:|data:text\/html)[\s\S]*?\2/gi, "");
  }

  const div = document.createElement("div");
  div.innerHTML = html;

  div.querySelectorAll("script, object, embed, link, meta, noscript").forEach((el) => el.remove());

  div.querySelectorAll("*").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value.trim().toLowerCase();
      if (
        attrName.startsWith("on") ||
        attrName === "srcdoc" ||
        ((attrName === "href" || attrName === "src" || attrName === "action") &&
          (attrValue.startsWith("javascript:") || attrValue.startsWith("data:text/html")))
      ) {
        el.removeAttribute(attr.name);
      }
    });

    if (el.tagName.toLowerCase() === "iframe") {
      const src = el.getAttribute("src") || "";
      if (!/^https?:\/\//i.test(src)) {
        el.remove();
        return;
      }
      el.setAttribute("loading", el.getAttribute("loading") || "lazy");
      el.setAttribute("referrerpolicy", el.getAttribute("referrerpolicy") || "no-referrer-when-downgrade");
    }
  });

  return div.innerHTML;
}

/**
 * Check if a node has any responsive overrides and generate a class + rules.
 * Returns the class name or empty string.
 */
function collectResponsive(props: Record<string, any>): string {
  const rule: ResponsiveRule = {
    className: "",
    tablet: {},
    mobile: {},
    hideOnMobile: !!props.hideOnMobile,
    hideOnTablet: !!props.hideOnTablet,
    hideOnDesktop: !!props.hideOnDesktop,
  };

  // Container responsive
  if (props.tabletFlexDirection) rule.tablet!["flex-direction"] = props.tabletFlexDirection;
  if (props.mobileFlexDirection) rule.mobile!["flex-direction"] = props.mobileFlexDirection;
  if (props.tabletPadding !== undefined && props.tabletPadding !== "") rule.tablet!["padding"] = `${props.tabletPadding}px`;
  if (props.mobilePadding !== undefined && props.mobilePadding !== "") rule.mobile!["padding"] = `${props.mobilePadding}px`;
  if (props.tabletGap !== undefined && props.tabletGap !== "") rule.tablet!["gap"] = `${props.tabletGap}px`;
  if (props.mobileGap !== undefined && props.mobileGap !== "") rule.mobile!["gap"] = `${props.mobileGap}px`;

  // Text responsive
  if (props.tabletFontSize !== undefined && props.tabletFontSize !== "") rule.tablet!["font-size"] = `${props.tabletFontSize}px`;
  if (props.mobileFontSize !== undefined && props.mobileFontSize !== "") rule.mobile!["font-size"] = `${props.mobileFontSize}px`;
  if (props.tabletTextAlign) rule.tablet!["text-align"] = props.tabletTextAlign;
  if (props.mobileTextAlign) rule.mobile!["text-align"] = props.mobileTextAlign;

  // Image / Video / Divider responsive (width, height)
  if (props.tabletWidth) rule.tablet!["width"] = props.tabletWidth;
  if (props.mobileWidth) rule.mobile!["width"] = props.mobileWidth;
  if (props.tabletHeight) rule.tablet!["height"] = props.tabletHeight;
  if (props.mobileHeight) rule.mobile!["height"] = props.mobileHeight;

  // Button responsive (padding as string like "8px 16px")
  if (props.tabletPadding && typeof props.tabletPadding === "string") rule.tablet!["padding"] = props.tabletPadding;
  if (props.mobilePadding && typeof props.mobilePadding === "string") rule.mobile!["padding"] = props.mobilePadding;

  // Spacer responsive (height as number → px)
  if (props.tabletHeight !== undefined && props.tabletHeight !== "" && typeof props.tabletHeight === "number") rule.tablet!["height"] = `${props.tabletHeight}px`;
  if (props.mobileHeight !== undefined && props.mobileHeight !== "" && typeof props.mobileHeight === "number") rule.mobile!["height"] = `${props.mobileHeight}px`;

  // Divider responsive (marginY)
  if (props.tabletMarginY !== undefined && props.tabletMarginY !== "") rule.tablet!["margin"] = `${props.tabletMarginY}px 0`;
  if (props.mobileMarginY !== undefined && props.mobileMarginY !== "") rule.mobile!["margin"] = `${props.mobileMarginY}px 0`;

  // Grid-based blocks responsive (columns)
  if (props.tabletColumns !== undefined && props.tabletColumns !== "") rule.tablet!["grid-template-columns"] = `repeat(${props.tabletColumns}, minmax(0, 1fr))`;
  if (props.mobileColumns !== undefined && props.mobileColumns !== "") rule.mobile!["grid-template-columns"] = `repeat(${props.mobileColumns}, minmax(0, 1fr))`;

  const hasTablet = Object.keys(rule.tablet!).length > 0;
  const hasMobile = Object.keys(rule.mobile!).length > 0;
  const hasVisibility = rule.hideOnMobile || rule.hideOnTablet || rule.hideOnDesktop;

  if (!hasTablet && !hasMobile && !hasVisibility) return "";

  classCounter++;
  rule.className = `vb-r${classCounter}`;
  responsiveRules.push(rule);
  return rule.className;
}

function renderNode(nodeId: string, nodes: SerializedNodes): string {
  const node = nodes[nodeId];
  if (!node) return "";

  const { type, props, nodes: childIds } = node;
  const resolvedName = type.resolvedName;

  // Render children recursively
  const childrenHtml = (childIds || []).map((id) => renderNode(id, nodes)).join("");

  switch (resolvedName) {
    case "CraftContainer": {
      const layoutMode = props.layoutMode || "flex";
      const style: Record<string, any> = {
        display: layoutMode === "freeform" ? "block" : "flex",
        flexDirection: layoutMode === "freeform" ? undefined : (props.flexDirection || "column"),
        justifyContent: layoutMode === "freeform" ? undefined : (props.justifyContent || undefined),
        alignItems: layoutMode === "freeform" ? undefined : (props.alignItems || undefined),
        flexWrap: layoutMode === "freeform" ? undefined : (props.flexWrap || undefined),
        gap: layoutMode === "freeform" ? undefined : (props.gap ? `${props.gap}px` : undefined),
        padding: props.padding ? `${props.padding}px` : undefined,
        margin: props.margin ? `${props.margin}px` : undefined,
        backgroundColor: props.backgroundColor && props.backgroundColor !== "transparent" ? props.backgroundColor : undefined,
        backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
        backgroundSize: props.backgroundImage ? (props.backgroundSize || "cover") : undefined,
        backgroundPosition: props.backgroundImage ? (props.backgroundPosition || "center") : undefined,
        backgroundRepeat: props.backgroundImage ? (props.backgroundRepeat || "no-repeat") : undefined,
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || "#e5e7eb"}` : undefined,
        width: props.width || "100%",
        maxWidth: props.maxWidth || undefined,
        minHeight: layoutMode === "freeform" ? undefined : (props.minHeight || undefined),
        height: layoutMode === "freeform" ? (props.height || props.minHeight || undefined) : (props.height || "auto"),
        overflow: layoutMode === "freeform" ? (props.overflow && props.overflow !== "visible" ? props.overflow : "visible") : "visible",
        opacity: props.opacity !== undefined && props.opacity !== 1 ? props.opacity : undefined,
        position: props.position && props.position !== "static" ? props.position : "relative",
        top: props.top || undefined,
        left: props.left || undefined,
        right: props.right || undefined,
        bottom: props.bottom || undefined,
        zIndex: props.zIndex && props.zIndex !== 0 ? props.zIndex : undefined,
        boxSizing: "border-box",
        transition: "all 0.3s ease-in-out",
      };
      const styleStr = buildStyleString(style);
      const rClass = collectResponsive(props);
      const classes = [props.className, rClass].filter(Boolean).join(" ");
      let overlayHtml = "";
      const resolvedOv = props.backgroundOverlay ? resolveOverlay(props.backgroundOverlay) : "";
      if (props.backgroundImage && resolvedOv) {
        const ovStyle = buildStyleString({
          position: "absolute", inset: "0", backgroundColor: resolvedOv,
          borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
          pointerEvents: "none", zIndex: "0",
        });
        overlayHtml = `<div style="${ovStyle}"></div>`;
      }
      const contentWrapper = overlayHtml
        ? `${overlayHtml}<div style="position:relative;z-index:1;display:contents">${childrenHtml}</div>`
        : childrenHtml;
      return `<div${styleStr ? ` style="${styleStr}"` : ""}${classes ? ` class="${classes}"` : ""}>${contentWrapper}</div>`;
    }

    case "CraftText": {
      const tag = props.tagName || "p";
      const style: Record<string, any> = {
        fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
        fontWeight: props.fontWeight || undefined,
        color: props.color || undefined,
        textAlign: props.textAlign || undefined,
        lineHeight: props.lineHeight || undefined,
        letterSpacing: props.letterSpacing && props.letterSpacing !== "normal" ? props.letterSpacing : undefined,
        fontFamily: props.fontFamily || undefined,
        textDecoration: props.textDecoration && props.textDecoration !== "none" ? props.textDecoration : undefined,
        textTransform: props.textTransform && props.textTransform !== "none" ? props.textTransform : undefined,
        margin: props.margin ? `${props.margin}px` : undefined,
        padding: props.padding ? `${props.padding}px` : undefined,
        backgroundColor: props.backgroundColor && props.backgroundColor !== "transparent" ? props.backgroundColor : undefined,
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
        opacity: props.opacity !== undefined && props.opacity !== 1 ? props.opacity : undefined,
        width: props.width && props.width !== "100%" ? props.width : undefined,
        minHeight: props.minHeight || undefined,
        position: props.position && props.position !== "static" ? props.position : undefined,
        top: props.top || undefined,
        left: props.left || undefined,
        right: props.right || undefined,
        bottom: props.bottom || undefined,
        zIndex: props.zIndex && props.zIndex !== 0 ? props.zIndex : undefined,
      };
      const styleStr = buildStyleString(style);
      const rClass = collectResponsive(props);
      const textClasses = [props.richText ? "fr-view" : "", rClass].filter(Boolean).join(" ");
      const classAttr = textClasses ? ` class="${textClasses}"` : "";
      const text = props.text || "";
      if (props.richText && text.includes("<")) {
        return `<div${styleStr ? ` style="${styleStr}"` : ""}${classAttr}>${text}</div>`;
      }
      return `<${tag}${styleStr ? ` style="${styleStr}"` : ""}${classAttr}>${text}</${tag}>`;
    }

    case "CraftImage": {
      const style: Record<string, any> = {
        width: props.width || "100%",
        height: props.height || "auto",
        objectFit: props.objectFit || "cover",
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
        margin: props.margin ? `${props.margin}px` : undefined,
        opacity: props.opacity !== undefined && props.opacity !== 1 ? props.opacity : undefined,
        boxShadow: props.boxShadow && props.boxShadow !== "none" ? props.boxShadow : undefined,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || "#e5e7eb"}` : undefined,
        maxWidth: "100%",
        position: props.position && props.position !== "static" ? props.position : undefined,
        top: props.top || undefined,
        left: props.left || undefined,
        right: props.right || undefined,
        bottom: props.bottom || undefined,
        zIndex: props.zIndex && props.zIndex !== 0 ? props.zIndex : undefined,
      };
      const styleStr = buildStyleString(style);
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      return `<img src="${props.src || ""}" alt="${props.alt || ""}"${styleStr ? ` style="${styleStr}"` : ""}${classAttr} />`;
    }

    case "CraftButton": {
      const style: Record<string, any> = {
        backgroundColor: props.backgroundColor || "#000000",
        color: props.color || "#ffffff",
        padding: props.padding || "10px 24px",
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : "8px",
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || "transparent"}` : "none",
        fontSize: props.fontSize ? `${props.fontSize}px` : "16px",
        fontWeight: props.fontWeight || "600",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        textAlign: "center" as any,
        maxWidth: "100%",
        boxSizing: "border-box",
        position: props.position && props.position !== "static" ? props.position : undefined,
        top: props.top || undefined,
        left: props.left || undefined,
        right: props.right || undefined,
        bottom: props.bottom || undefined,
        zIndex: props.zIndex && props.zIndex !== 0 ? props.zIndex : undefined,
      };
      const styleStr = buildStyleString(style);
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      if (props.href) {
        return `<a href="${props.href}"${props.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : ""}${styleStr ? ` style="${styleStr}"` : ""}${classAttr}>${props.text || "Button"}</a>`;
      }
      return `<button${styleStr ? ` style="${styleStr}"` : ""}${classAttr}>${props.text || "Button"}</button>`;
    }

    case "CraftVideo": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      if (props.videoType === "youtube" && props.videoId) {
        const style: Record<string, any> = {
          width: props.width || "100%",
          height: props.height || "315px",
          borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
          maxWidth: "100%",
        };
        const styleStr = buildStyleString(style);
        return `<iframe src="https://www.youtube.com/embed/${props.videoId}" frameborder="0" allowfullscreen${styleStr ? ` style="${styleStr}"` : ""}${classAttr}></iframe>`;
      }
      const style: Record<string, any> = {
        width: props.width || "100%",
        height: props.height || "auto",
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
        maxWidth: "100%",
      };
      const styleStr = buildStyleString(style);
      return `<video src="${props.src || ""}" controls${props.autoplay ? " autoplay" : ""}${props.muted ? " muted" : ""}${props.loop ? " loop" : ""}${styleStr ? ` style="${styleStr}"` : ""}${classAttr}></video>`;
    }

    case "CraftHtml": {
      const style: Record<string, any> = {
        width: props.width || "100%",
        height: props.height || "auto",
        maxWidth: props.maxWidth || "100%",
        minHeight: props.minHeight || undefined,
        padding: props.padding !== undefined ? `${props.padding}px` : undefined,
        margin: props.margin ? `${props.margin}px` : undefined,
        backgroundColor: props.backgroundColor && props.backgroundColor !== "transparent" ? props.backgroundColor : undefined,
        borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || "rgba(0,0,0,0.1)"}` : undefined,
        overflow: props.overflow && props.overflow !== "visible" ? props.overflow : undefined,
        opacity: props.opacity !== undefined && props.opacity !== 1 ? props.opacity : undefined,
        position: props.position && props.position !== "static" ? props.position : undefined,
        top: props.top || undefined,
        left: props.left || undefined,
        right: props.right || undefined,
        bottom: props.bottom || undefined,
        zIndex: props.zIndex && props.zIndex !== 0 ? props.zIndex : undefined,
        boxSizing: "border-box",
      };
      const styleStr = buildStyleString(style);
      const rClass = collectResponsive(props);
      const classes = [props.className, rClass].filter(Boolean).join(" ");
      const classAttr = classes ? ` class="${classes}"` : "";
      const cssHtml = props.customCss ? `<style>${props.customCss}</style>` : "";
      return `<div${styleStr ? ` style="${styleStr}"` : ""}${classAttr}>${cssHtml}${sanitizeCustomHtml(props.html || "")}</div>`;
    }

    case "CraftSpacer": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      return `<div style="height: ${props.height || 20}px;"${classAttr}></div>`;
    }

    case "CraftDivider": {
      const style: Record<string, any> = {
        borderTop: `${props.thickness || 1}px ${props.lineStyle || "solid"} ${props.color || "#e5e7eb"}`,
        margin: `${props.marginY || 16}px 0`,
        width: props.width || "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      };
      const styleStr = buildStyleString(style);
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      return `<hr style="${styleStr}"${classAttr} />`;
    }

    case "CraftSection": {
      // Sections output a data-bound placeholder with attributes for the frontend renderer
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      const style: Record<string, any> = {
        padding: props.padding ? `${props.padding}px` : undefined,
        backgroundColor: props.backgroundColor && props.backgroundColor !== "transparent" ? props.backgroundColor : undefined,
        boxSizing: "border-box",
        width: "100%",
      };
      const styleStr = buildStyleString(style);
      const serializedPartnerTiers =
        Array.isArray(props.partnerTiers) && props.partnerTiers.length > 0
          ? encodeURIComponent(JSON.stringify(props.partnerTiers))
          : "";
      const parsedBentoItems = (() => {
        if (Array.isArray(props.bentoItems)) return props.bentoItems;
        if (typeof props.bentoItems === "string" && props.bentoItems.trim()) {
          try {
            const parsed = JSON.parse(props.bentoItems);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        }
        return [];
      })();
      const serializedBentoItems =
        parsedBentoItems.length > 0
          ? encodeURIComponent(JSON.stringify(parsedBentoItems))
          : "";
      // The section outputs a semantic div that the frontend can hydrate with live data
      return `<div data-section-module="${props.moduleType || "article"}" data-section-category="${props.categoryName || ""}" data-section-limit="${props.limit || 6}" data-section-display="${props.displayStyle || "grid"}" data-section-bento-style="${props.bentoStyle || "1V2H"}" data-section-bento-row-height="${props.bentoRowHeight || 160}" data-section-columns="${props.columns || 3}" data-section-gap="${props.gap || 16}" data-section-show-image="${props.showImage !== false}" data-section-show-title="${props.showTitle !== false}" data-section-show-date="${props.showDate !== false}" data-section-show-author="${props.showAuthor !== false}" data-section-title="${props.sectionTitle || ""}" data-section-show-section-title="${props.showSectionTitle !== false}" data-section-card-radius="${props.cardBorderRadius || 8}" data-section-partner-tiers="${serializedPartnerTiers}" data-section-bento-items="${serializedBentoItems}"${styleStr ? ` style="${styleStr}"` : ""}${classAttr}></div>`;
    }

    case "CraftTestimonial": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      const bgColor = props.backgroundColor || "#ffffff";
      const textColor = props.textColor || "#333333";
      const stars = props.rating || 5;
      const starHtml = "&#9733;".repeat(stars) + "&#9734;".repeat(5 - stars);
      const avatarHtml = props.avatarUrl
        ? `<img src="${props.avatarUrl}" alt="${props.author || ""}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;" />`
        : `<div style="width:48px;height:48px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-weight:600;color:#6b7280;">${(props.author || "A").charAt(0).toUpperCase()}</div>`;
      const style = buildStyleString({
        backgroundColor: bgColor,
        color: textColor,
        padding: `${props.padding || 24}px`,
        borderRadius: `${props.borderRadius || 12}px`,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || "#e5e7eb"}` : undefined,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      return `<div style="${style}"${classAttr}>
        ${props.showRating !== false ? `<div style="color:#f59e0b;font-size:16px;margin-bottom:8px;">${starHtml}</div>` : ""}
        <blockquote style="font-style:italic;margin:0 0 16px 0;font-size:${props.fontSize || 16}px;line-height:1.6;">"${props.quote || ""}"</blockquote>
        <div style="display:flex;align-items:center;gap:12px;">
          ${avatarHtml}
          <div>
            <div style="font-weight:600;">${props.author || "Author Name"}</div>
            ${props.role ? `<div style="font-size:13px;opacity:0.7;">${props.role}</div>` : ""}
          </div>
        </div>
      </div>`;
    }

    case "CraftFAQ": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let items: Array<{ question: string; answer: string }> = [];
      try { items = typeof props.items === "string" ? JSON.parse(props.items) : (props.items || []); } catch { items = []; }
      const style = buildStyleString({
        padding: `${props.padding || 16}px`,
        backgroundColor: props.backgroundColor || undefined,
        borderRadius: `${props.borderRadius || 8}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const itemsHtml = items.map((item) => `
        <details style="border:1px solid ${props.borderColor || "#e5e7eb"};border-radius:${props.itemBorderRadius || 8}px;margin-bottom:${props.gap || 8}px;overflow:hidden;">
          <summary style="padding:12px 16px;font-weight:600;font-size:${props.questionFontSize || 15}px;cursor:pointer;background:${props.questionBgColor || "#f9fafb"};">${item.question}</summary>
          <div style="padding:12px 16px;font-size:${props.answerFontSize || 14}px;line-height:1.6;color:${props.answerColor || "#4b5563"};">${item.answer}</div>
        </details>
      `).join("");
      return `<div style="${style}"${classAttr}>${props.title ? `<h3 style="font-size:${props.titleFontSize || 20}px;font-weight:700;margin:0 0 16px 0;">${props.title}</h3>` : ""}${itemsHtml}</div>`;
    }

    case "CraftGallery": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let images: Array<{ src: string; alt?: string; caption?: string }> = [];
      try { images = typeof props.images === "string" ? JSON.parse(props.images) : (props.images || []); } catch { images = []; }
      const columns = props.columns || 3;
      const gap = props.gap || 8;
      const style = buildStyleString({
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        padding: `${props.padding || 0}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const imagesHtml = images.map((img) => `
        <div style="overflow:hidden;border-radius:${props.imageBorderRadius || 8}px;">
          <img src="${img.src}" alt="${img.alt || ""}" style="width:100%;height:${props.imageHeight || 200}px;object-fit:cover;display:block;" />
          ${props.showCaptions !== false && img.caption ? `<p style="font-size:12px;color:#6b7280;margin:6px 0 0 0;text-align:center;">${img.caption}</p>` : ""}
        </div>
      `).join("");
      return `<div style="${style}"${classAttr}>${imagesHtml}</div>`;
    }

    case "CraftTeam": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let members: Array<{ name: string; role?: string; avatar?: string; bio?: string }> = [];
      try { members = typeof props.members === "string" ? JSON.parse(props.members) : (props.members || []); } catch { members = []; }
      const columns = props.columns || 3;
      const gap = props.gap || 16;
      const style = buildStyleString({
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        padding: `${props.padding || 16}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const membersHtml = members.map((m) => {
        const avatarHtml = m.avatar
          ? `<img src="${m.avatar}" alt="${m.name}" style="width:${props.avatarSize || 80}px;height:${props.avatarSize || 80}px;border-radius:50%;object-fit:cover;" />`
          : `<div style="width:${props.avatarSize || 80}px;height:${props.avatarSize || 80}px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600;color:#6b7280;">${(m.name || "?").charAt(0).toUpperCase()}</div>`;
        return `<div style="text-align:center;">
          ${avatarHtml}
          <div style="font-weight:600;margin-top:8px;font-size:${props.nameFontSize || 15}px;">${m.name}</div>
          ${m.role ? `<div style="font-size:13px;color:#6b7280;">${m.role}</div>` : ""}
          ${props.showBio !== false && m.bio ? `<p style="font-size:13px;color:#4b5563;margin-top:4px;">${m.bio}</p>` : ""}
        </div>`;
      }).join("");
      return `<div style="${style}"${classAttr}>${membersHtml}</div>`;
    }

    case "CraftContact": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      const style = buildStyleString({
        padding: `${props.padding || 24}px`,
        backgroundColor: props.backgroundColor || "#ffffff",
        borderRadius: `${props.borderRadius || 12}px`,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || "#e5e7eb"}` : undefined,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const lines: string[] = [];
      if (props.title) lines.push(`<h3 style="font-size:${props.titleFontSize || 20}px;font-weight:700;margin:0 0 16px 0;">${props.title}</h3>`);
      if (props.phone) lines.push(`<p style="margin:4px 0;">Phone: ${props.phone}</p>`);
      if (props.email) lines.push(`<p style="margin:4px 0;">Email: <a href="mailto:${props.email}">${props.email}</a></p>`);
      if (props.address) lines.push(`<p style="margin:4px 0;">Address: ${props.address}</p>`);
      if (props.showMap && props.mapEmbedUrl) lines.push(`<iframe src="${props.mapEmbedUrl}" style="width:100%;height:${props.mapHeight || 200}px;border:0;border-radius:8px;margin-top:12px;" allowfullscreen loading="lazy"></iframe>`);
      return `<div style="${style}"${classAttr}>${lines.join("")}</div>`;
    }

    case "CraftQuote": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      const accentColor = props.accentColor || "#f59e0b";
      const accentStyle = props.accentStyle || "left-bar";
      let borderStyle = "";
      if (accentStyle === "left-bar") borderStyle = `border-left:4px solid ${accentColor};padding-left:20px;`;
      else if (accentStyle === "top-bottom-bar") borderStyle = `border-top:3px solid ${accentColor};border-bottom:3px solid ${accentColor};padding:16px 0;`;
      const style = buildStyleString({
        padding: `${props.padding || 24}px`,
        backgroundColor: props.backgroundColor || "#fffbeb",
        borderRadius: `${props.borderRadius || 8}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      return `<blockquote style="${style};${borderStyle}"${classAttr}>
        ${accentStyle === "quote-marks" ? `<span style="font-size:48px;line-height:1;color:${accentColor};font-family:Georgia,serif;">&ldquo;</span>` : ""}
        <p style="font-size:${props.fontSize || 18}px;font-style:italic;color:${props.textColor || "#92400e"};margin:0 0 8px 0;line-height:1.6;">${props.text || ""}</p>
        ${props.author ? `<footer style="font-size:14px;font-weight:600;color:${props.authorColor || "#b45309"};">— ${props.author}</footer>` : ""}
      </blockquote>`;
    }

    case "CraftTimeline": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let items: Array<{ title: string; description?: string; date?: string }> = [];
      try { items = typeof props.items === "string" ? JSON.parse(props.items) : (props.items || []); } catch { items = []; }
      const lineColor = props.lineColor || "#e5e7eb";
      const dotColor = props.dotColor || "#f59e0b";
      const dotSize = props.dotSize || 12;
      const style = buildStyleString({
        padding: `${props.padding || 16}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const itemsHtml = items.map((item, i) => `
        <div style="display:flex;gap:16px;position:relative;padding-bottom:${i < items.length - 1 ? 24 : 0}px;">
          <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">
            <div style="width:${dotSize}px;height:${dotSize}px;border-radius:50%;background:${dotColor};flex-shrink:0;"></div>
            ${i < items.length - 1 ? `<div style="width:2px;flex:1;background:${lineColor};"></div>` : ""}
          </div>
          <div style="padding-bottom:8px;">
            ${item.date ? `<div style="font-size:12px;color:#9ca3af;margin-bottom:2px;">${item.date}</div>` : ""}
            <div style="font-weight:600;font-size:${props.titleFontSize || 15}px;">${item.title}</div>
            ${item.description ? `<p style="font-size:${props.descriptionFontSize || 13}px;color:#6b7280;margin:4px 0 0 0;">${item.description}</p>` : ""}
          </div>
        </div>
      `).join("");
      return `<div style="${style}"${classAttr}>${itemsHtml}</div>`;
    }

    case "CraftSocialWall": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let links: Array<{ platform: string; url: string; label?: string }> = [];
      try { links = typeof props.links === "string" ? JSON.parse(props.links) : (props.links || []); } catch { links = []; }
      const iconSize = props.iconSize || 40;
      const gap = props.gap || 12;
      const layout = props.layout || "row";
      const style = buildStyleString({
        display: "flex",
        flexDirection: layout === "grid" ? undefined : "row",
        flexWrap: "wrap",
        gap: `${gap}px`,
        justifyContent: "center",
        padding: `${props.padding || 16}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const linksHtml = links.map((link) => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;width:${iconSize}px;height:${iconSize}px;border-radius:50%;background:${props.iconBgColor || "#f3f4f6"};color:${props.iconColor || "#374151"};text-decoration:none;font-size:14px;font-weight:600;" title="${link.label || link.platform}">${(link.platform || "?").charAt(0).toUpperCase()}</a>
      `).join("");
      return `<div style="${style}"${classAttr}>${linksHtml}</div>`;
    }

    case "CraftAdvertisement": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      const style = buildStyleString({
        position: "relative",
        overflow: "hidden",
        borderRadius: `${props.borderRadius || 8}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const imgHtml = props.imageUrl ? `<img src="${props.imageUrl}" alt="${props.altText || "Advertisement"}" style="width:100%;height:${props.height || 250}px;object-fit:cover;display:block;" />` : `<div style="width:100%;height:${props.height || 250}px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#9ca3af;">Ad Space</div>`;
      const labelHtml = props.showLabel !== false ? `<div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.6);color:#fff;font-size:10px;padding:2px 8px;border-radius:4px;">Sponsored</div>` : "";
      const inner = props.linkUrl ? `<a href="${props.linkUrl}" target="_blank" rel="noopener noreferrer" style="display:block;">${imgHtml}${labelHtml}</a>` : `${imgHtml}${labelHtml}`;
      return `<div style="${style}"${classAttr}>${inner}</div>`;
    }

    case "CraftPromotion": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      const overlayColor = props.overlayColor || "rgba(0,0,0,0.5)";
      const style = buildStyleString({
        position: "relative",
        overflow: "hidden",
        borderRadius: `${props.borderRadius || 12}px`,
        padding: `${props.padding || 40}px`,
        backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: props.backgroundColor || "#1f2937",
        color: props.textColor || "#ffffff",
        textAlign: props.textAlign || "center",
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const ctaHtml = props.ctaText ? `<a href="${props.ctaUrl || "#"}" style="display:inline-block;padding:12px 28px;background:${props.ctaColor || "#f59e0b"};color:${props.ctaTextColor || "#000000"};border-radius:8px;font-weight:600;text-decoration:none;margin-top:16px;">${props.ctaText}</a>` : "";
      return `<div style="${style}"${classAttr}>
        ${props.backgroundImage ? `<div style="position:absolute;inset:0;background:${overlayColor};"></div>` : ""}
        <div style="position:relative;z-index:1;">
          ${props.title ? `<h2 style="font-size:${props.titleFontSize || 28}px;font-weight:700;margin:0 0 8px 0;">${props.title}</h2>` : ""}
          ${props.subtitle ? `<p style="font-size:${props.subtitleFontSize || 16}px;margin:0 0 8px 0;opacity:0.9;">${props.subtitle}</p>` : ""}
          ${ctaHtml}
        </div>
      </div>`;
    }

    case "CraftTCard": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let cards: Array<{ title: string; description?: string; image?: string; icon?: string }> = [];
      try { cards = typeof props.cards === "string" ? JSON.parse(props.cards) : (props.cards || []); } catch { cards = []; }
      const columns = props.columns || 3;
      const gap = props.gap || 16;
      const style = buildStyleString({
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        padding: `${props.padding || 0}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const cardsHtml = cards.map((card) => `
        <div style="background:${props.cardBgColor || "#ffffff"};border-radius:${props.cardBorderRadius || 12}px;overflow:hidden;border:1px solid ${props.cardBorderColor || "#e5e7eb"};">
          ${card.image ? `<img src="${card.image}" alt="${card.title}" style="width:100%;height:${props.imageHeight || 160}px;object-fit:cover;display:block;" />` : ""}
          <div style="padding:${props.cardPadding || 16}px;">
            <h4 style="font-size:${props.titleFontSize || 16}px;font-weight:600;margin:0 0 6px 0;">${card.title}</h4>
            ${card.description ? `<p style="font-size:${props.descriptionFontSize || 14}px;color:#6b7280;margin:0;">${card.description}</p>` : ""}
          </div>
        </div>
      `).join("");
      return `<div style="${style}"${classAttr}>${cardsHtml}</div>`;
    }

    case "CraftDocuments": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let parsedDocuments: unknown = [];
      try {
        parsedDocuments = typeof props.documents === "string"
          ? JSON.parse(props.documents)
          : (props.documents || []);
      } catch {
        parsedDocuments = [];
      }
      const documents = Array.isArray(parsedDocuments)
        ? parsedDocuments.map((doc, index) => ({
          title: typeof doc?.title === "string" && doc.title.trim() ? doc.title : `Document ${index + 1}`,
          url: typeof doc?.url === "string"
            ? doc.url
            : (typeof doc?.document_url === "string" ? doc.document_url : ""),
          fileType: typeof doc?.type === "string"
            ? doc.type
            : (typeof doc?.fileType === "string" ? doc.fileType : "file"),
          fileSize: typeof doc?.size === "string"
            ? doc.size
            : (typeof doc?.fileSize === "string" ? doc.fileSize : ""),
        }))
        : [];

      const showFileSize = props.showFileSize !== false;
      const showDownloadButton = props.showDownloadButton !== false;
      const itemBorderColor = props.itemBorderColor || props.borderColor || "#e5e7eb";

      const style = buildStyleString({
        padding: `${props.padding || 16}px`,
        backgroundColor: props.backgroundColor || undefined,
        borderRadius: `${props.borderRadius || 8}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const docsHtml = documents.map((doc, index) => {
        const safeType = (doc.fileType || "FILE").toUpperCase().slice(0, 4);
        const hasUrl = typeof doc.url === "string" && doc.url.trim().length > 0;
        const wrapperStart = hasUrl
          ? `<a href="${doc.url}" download style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid ${itemBorderColor};border-radius:8px;margin-bottom:${index === documents.length - 1 ? 0 : (props.gap || 8)}px;text-decoration:none;color:inherit;">`
          : `<div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid ${itemBorderColor};border-radius:8px;margin-bottom:${index === documents.length - 1 ? 0 : (props.gap || 8)}px;">`;
        const wrapperEnd = hasUrl ? "</a>" : "</div>";
        const downloadHtml = showDownloadButton
          ? (
            hasUrl
              ? `<span style="font-size:12px;font-weight:600;color:${props.accentColor || "#f59e0b"};">Download</span>`
              : `<span style="font-size:12px;font-weight:600;color:#9ca3af;">Download</span>`
          )
          : "";

        return `
          ${wrapperStart}
            <div style="width:40px;height:40px;border-radius:8px;background:${props.accentColor ? `${props.accentColor}20` : "#f3f4f6"};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${props.accentColor || "#6b7280"};flex-shrink:0;">${safeType}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:${props.titleFontSize || 14}px;color:${props.titleColor || "#1f2937"};">${doc.title}</div>
              ${showFileSize && doc.fileSize ? `<div style="font-size:12px;color:${props.metaColor || "#9ca3af"};">${doc.fileSize}</div>` : ""}
            </div>
            ${downloadHtml}
          ${wrapperEnd}
        `;
      }).join("");

      const emptyStateHtml = `<div style="color:${props.metaColor || "#6b7280"};text-align:center;padding:20px 0;">No documents added</div>`;
      return `<div style="${style}"${classAttr}>${props.title ? `<h3 style="font-size:${props.headingFontSize || 18}px;font-weight:700;margin:0 0 12px 0;">${props.title}</h3>` : ""}${docsHtml || emptyStateHtml}</div>`;
    }

    case "CraftMeetings": {
      const rClass = collectResponsive(props);
      const classAttr = rClass ? ` class="${rClass}"` : "";
      let parsedMeetings: unknown = [];
      try {
        parsedMeetings = typeof props.meetings === "string"
          ? JSON.parse(props.meetings)
          : (props.meetings || []);
      } catch {
        parsedMeetings = [];
      }
      const meetings = Array.isArray(parsedMeetings)
        ? parsedMeetings.map((meeting, index) => ({
          title: typeof meeting?.title === "string" && meeting.title.trim() ? meeting.title : `Meeting ${index + 1}`,
          datetime: typeof meeting?.datetime === "string" ? meeting.datetime : "",
          date: typeof meeting?.date === "string" ? meeting.date : "",
          time: typeof meeting?.time === "string" ? meeting.time : "",
          location: typeof meeting?.location === "string" ? meeting.location : "",
          description: typeof meeting?.description === "string" ? meeting.description : "",
        }))
        : [];

      const toMeetingDate = (meeting: { datetime?: string; date?: string; time?: string }): Date | null => {
        if (meeting.datetime) {
          const fromDateTime = new Date(meeting.datetime);
          if (!Number.isNaN(fromDateTime.getTime())) return fromDateTime;
        }
        if (meeting.date) {
          const fromDate = new Date(`${meeting.date}T${meeting.time || "00:00"}`);
          if (!Number.isNaN(fromDate.getTime())) return fromDate;
        }
        return null;
      };

      const badgeBackground = props.accentColor || props.dateBadgeColor || "#f59e0b";
      const badgeTextColor = props.dateBadgeTextColor || "#ffffff";
      const itemBorderColor = props.itemBorderColor || props.borderColor || "#e5e7eb";
      const showLocation = props.showLocation !== false;
      const showDescription = props.showDescription !== false;

      const style = buildStyleString({
        display: props.layout === "cards" ? "grid" : undefined,
        gridTemplateColumns: props.layout === "cards" ? "repeat(auto-fit, minmax(280px, 1fr))" : undefined,
        gap: props.layout === "cards" ? `${props.gap || 12}px` : undefined,
        padding: `${props.padding || 16}px`,
        backgroundColor: props.backgroundColor || undefined,
        borderRadius: `${props.borderRadius || 8}px`,
        maxWidth: "100%",
        boxSizing: "border-box",
      });
      const meetingsHtml = meetings.map((m, index) => {
        const dateObj = toMeetingDate(m);
        const monthStr = dateObj
          ? dateObj.toLocaleString("en", { month: "short" }).toUpperCase()
          : "TBD";
        const dayStr = dateObj
          ? String(dateObj.getDate()).padStart(2, "0")
          : "--";
        const formattedTime = dateObj
          ? dateObj.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
          : "";
        const timeValue = m.time || formattedTime;
        const itemMarginBottom = props.layout === "cards" || index === meetings.length - 1 ? 0 : (props.gap || 8);

        return `<div style="display:flex;gap:16px;padding:12px;border:1px solid ${itemBorderColor};border-radius:8px;margin-bottom:${itemMarginBottom}px;background:${props.layout === "cards" ? "#f9fafb" : "transparent"};">
          <div style="width:52px;flex-shrink:0;text-align:center;background:${badgeBackground};border-radius:8px;padding:8px 4px;">
            <div style="font-size:11px;font-weight:600;color:${badgeTextColor};">${monthStr}</div>
            <div style="font-size:20px;font-weight:700;color:${badgeTextColor};">${dayStr}</div>
          </div>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:${props.titleFontSize || 15}px;color:${props.titleColor || "#1f2937"};">${m.title}</div>
            ${timeValue ? `<div style="font-size:13px;color:${props.timeColor || "#6b7280"};">${timeValue}</div>` : ""}
            ${showLocation && m.location ? `<div style="font-size:13px;color:${props.locationColor || "#9ca3af"};">Location: ${m.location}</div>` : ""}
            ${showDescription && m.description ? `<p style="font-size:13px;color:#4b5563;margin:4px 0 0 0;">${m.description}</p>` : ""}
          </div>
        </div>`;
      }).join("");

      const emptyStateHtml = `<div style="color:${props.timeColor || "#6b7280"};text-align:center;padding:20px 0;">No meetings added</div>`;
      return `<div style="${style}"${classAttr}>${props.title ? `<h3 style="font-size:${props.headingFontSize || 18}px;font-weight:700;margin:0 0 12px 0;">${props.title}</h3>` : ""}${meetingsHtml || emptyStateHtml}</div>`;
    }

    case "Canvas":
    case "Element":
    default: {
      return childrenHtml ? `<div>${childrenHtml}</div>` : "";
    }
  }
}

/**
 * Build a <style> block with responsive media queries from collected rules.
 */
function buildResponsiveStyles(): string {
  if (responsiveRules.length === 0) return "";

  const desktopHide: string[] = [];
  const tabletRules: string[] = [];
  const mobileRules: string[] = [];
  const tabletHide: string[] = [];
  const mobileHide: string[] = [];

  for (const rule of responsiveRules) {
    const cls = rule.className;

    if (rule.hideOnDesktop) desktopHide.push(`.${cls}`);
    if (rule.hideOnTablet) tabletHide.push(`.${cls}`);
    if (rule.hideOnMobile) mobileHide.push(`.${cls}`);

    if (rule.tablet && Object.keys(rule.tablet).length > 0) {
      const props = Object.entries(rule.tablet).map(([k, v]) => `${k}:${v}`).join(";");
      tabletRules.push(`.${cls}{${props}}`);
    }

    if (rule.mobile && Object.keys(rule.mobile).length > 0) {
      const props = Object.entries(rule.mobile).map(([k, v]) => `${k}:${v}`).join(";");
      mobileRules.push(`.${cls}{${props}}`);
    }
  }

  let css = "";

  // Desktop-only hide
  if (desktopHide.length > 0) {
    css += `@media(min-width:769px){${desktopHide.join(",")}{display:none!important}}`;
  }

  // Tablet breakpoint: <= 768px
  if (tabletRules.length > 0 || tabletHide.length > 0) {
    let block = tabletRules.join("");
    if (tabletHide.length > 0) block += `${tabletHide.join(",")}{display:none!important}`;
    css += `@media(max-width:768px){${block}}`;
  }

  // Mobile breakpoint: <= 480px
  if (mobileRules.length > 0 || mobileHide.length > 0) {
    let block = mobileRules.join("");
    if (mobileHide.length > 0) block += `${mobileHide.join(",")}{display:none!important}`;
    css += `@media(max-width:480px){${block}}`;
  }

  return css ? `<style>${css}</style>` : "";
}

export function serializeToHtml(serializedNodes: SerializedNodes): string {
  // Reset responsive collection
  responsiveRules = [];
  classCounter = 0;

  // Find the ROOT node
  const rootId = "ROOT";
  let html = "";

  if (!serializedNodes[rootId]) {
    const rootEntry = Object.entries(serializedNodes).find(
      ([, node]) => !node.parent
    );
    if (rootEntry) {
      html = renderNode(rootEntry[0], serializedNodes);
    }
  } else {
    html = renderNode(rootId, serializedNodes);
  }

  // Append responsive <style> block if any responsive rules were collected
  const responsiveCss = buildResponsiveStyles();
  return responsiveCss + html;
}
