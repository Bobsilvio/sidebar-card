// src/helpers.ts
// ------------------------------------------------------------------------------------------
//  Helper methods (extracted from original monolithic sidebar-card.ts)
//  VERSIONE OTTIMIZZATA - Performance improvements
// ------------------------------------------------------------------------------------------

export const SIDEBAR_CARD_TITLE = "SIDEBAR-CARD";

// =============================================================================
// CACHE DOM - OTTIMIZZAZIONE CRITICA (ES2017 compatible)
// =============================================================================

const domCache = new Map<string, { element: Element; timestamp: number }>();
let huiRootCache: { root: ShadowRoot | null; timestamp: number } | null = null;
const HUI_CACHE_TTL = 5000; // 5 secondi
const DOM_CACHE_TTL = 10000; // 10 secondi per altri elementi

function getCached<T extends Element>(
  key: string,
  finder: () => T | null
): T | null {
  const cached = domCache.get(key);
  const now = Date.now();

  // Verifica se cache è valida e elemento esiste ancora nel DOM
  if (
    cached &&
    now - cached.timestamp < DOM_CACHE_TTL &&
    document.contains(cached.element)
  ) {
    return cached.element as T;
  }

  // Cache non valida o elemento rimosso, cerca di nuovo
  const element = finder();
  if (element) {
    domCache.set(key, { element, timestamp: now });
  } else {
    domCache.delete(key); // Rimuovi cache se elemento non trovato
  }
  return element;
}

// Invalida cache su navigazione
if (typeof window !== "undefined") {
  window.addEventListener("location-changed", () => {
    domCache.clear();
    huiRootCache = null;
  });
}

// =============================================================================
// DEBOUNCE UTILITY
// =============================================================================

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// OTTIMIZZATO: Limit traversal depth and use early exit
export function findHuiRootShadow(startNode?: Node | null): ShadowRoot | null {
  const stack: Array<Node | ShadowRoot> = [];
  const visited = new WeakSet();
  const MAX_DEPTH = 15; // Previne loop infiniti

  if (startNode) stack.push(startNode);
  else stack.push(document.body);

  while (stack.length) {
    const node = stack.pop();
    if (!node || visited.has(node)) continue;
    visited.add(node);

    let root: DocumentFragment | Element | null = null;

    if (node instanceof ShadowRoot) {
      root = node;
    } else if (node instanceof HTMLElement && node.shadowRoot) {
      root = node.shadowRoot;
    } else if (
      node instanceof HTMLElement ||
      node instanceof DocumentFragment
    ) {
      root = node;
    } else {
      continue;
    }

    const huiRoot = root.querySelector("hui-root") as HTMLElement | null;
    if (huiRoot?.shadowRoot) {
      return huiRoot.shadowRoot;
    }

    // OTTIMIZZATO: Limit children traversal per depth
    const children = root.querySelectorAll("*");
    const sliceEnd = Math.min(children.length, 50); // Limit per performance
    for (let i = 0; i < sliceEnd; i++) {
      const el = children[i];
      stack.push(el);
      if ((el as HTMLElement).shadowRoot) {
        stack.push((el as HTMLElement).shadowRoot!);
      }
    }
  }

  return null;
}

export function getHuiShadowRoot(): ShadowRoot | null {
  const now = Date.now();

  // Usa cache se valida
  if (huiRootCache && now - huiRootCache.timestamp < HUI_CACHE_TTL) {
    return huiRootCache.root;
  }

  const ha = document.querySelector("home-assistant");
  const root = findHuiRootShadow(ha);

  huiRootCache = { root, timestamp: now };
  return root;
}

// hui-root element (non shadowRoot)
export function getRoot(): any | null {
  const huiShadow = getHuiShadowRoot();
  return huiShadow ? (huiShadow.host as any) : null;
}

// lovelace object
export function getLovelace() {
  const root = getRoot();
  if (root && root.lovelace) {
    const ll = root.lovelace;
    ll.current_view = root.___curView;
    return ll;
  }
  return null;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getConfig() {
  let lovelace: any;
  while (!lovelace) {
    lovelace = getLovelace();
    if (!lovelace) {
      await sleep(500);
    }
  }
  return lovelace;
}

export async function log2console(
  method: string,
  message: string,
  object?: any
) {
  const lovelace = await getConfig();
  if (lovelace?.config?.sidebar) {
    const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
    if (sidebarConfig.debug === true) {
      // eslint-disable-next-line no-console
      console.info(
        `%c${SIDEBAR_CARD_TITLE}: %c ${method.padEnd(24)} -> %c ${message}`,
        "color: chartreuse; background: black; font-weight: 700;",
        "color: yellow; background: black; font-weight: 700;",
        "",
        object
      );
    }
  }
}

export async function error2console(
  method: string,
  message: string,
  object?: any
) {
  const lovelace = await getConfig();
  if (lovelace?.config?.sidebar) {
    const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
    if (sidebarConfig.debug === true) {
      // eslint-disable-next-line no-console
      console.error(
        `%c${SIDEBAR_CARD_TITLE}: %c ${method.padEnd(24)} -> %c ${message}`,
        "color: red; background: black; font-weight: 700;",
        "color: white; background: black; font-weight: 700;",
        "color:red",
        object
      );
    }
  }
}

//
// SIDEBAR / LAYOUT ORIGINALE HA
//

// OTTIMIZZATO: Cache header height per evitare getComputedStyle ripetuti
let cachedHeaderHeight: { value: string; timestamp: number } | null = null;
const HEADER_CACHE_TTL = 2000; // 2 secondi

export function getHeaderHeightPx() {
  const now = Date.now();

  // Usa cache se valida
  if (
    cachedHeaderHeight &&
    now - cachedHeaderHeight.timestamp < HEADER_CACHE_TTL
  ) {
    return cachedHeaderHeight.value;
  }

  let headerHeightPx = "0px";
  const root = getRoot();
  const shadow = root?.shadowRoot as ShadowRoot | null;

  if (!shadow) {
    cachedHeaderHeight = { value: headerHeightPx, timestamp: now };
    return headerHeightPx;
  }

  const view = shadow.getElementById("view") as HTMLElement | null;
  if (view) {
    try {
      const computed = window.getComputedStyle(view);
      if (computed !== undefined) {
        headerHeightPx = computed.paddingTop;
      }
    } catch (e) {
      // Fallback in caso di errore
      headerHeightPx = "0px";
    }
  }

  cachedHeaderHeight = { value: headerHeightPx, timestamp: now };
  return headerHeightPx;
}

export function getSidebar() {
  return getCached("sidebar", () => {
    let sidebar: any = document.querySelector("home-assistant");
    sidebar = sidebar && sidebar.shadowRoot;
    sidebar = sidebar && sidebar.querySelector("home-assistant-main");
    sidebar = sidebar && sidebar.shadowRoot;
    sidebar = sidebar && sidebar.querySelector("ha-drawer ha-sidebar");
    return sidebar;
  });
}

export function getAppDrawerLayout() {
  return getCached("appDrawerLayout", () => {
    let appDrawerLayout: any = document.querySelector("home-assistant");
    appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
    appDrawerLayout =
      appDrawerLayout && appDrawerLayout.querySelector("home-assistant-main");
    appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
    appDrawerLayout =
      appDrawerLayout && appDrawerLayout.querySelector("ha-drawer");
    appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
    appDrawerLayout =
      appDrawerLayout &&
      appDrawerLayout.querySelector(".mdc-drawer-app-content");
    return appDrawerLayout;
  });
}

export function getAppDrawer() {
  return getCached("appDrawer", () => {
    let appDrawer: any = document.querySelector("home-assistant");
    appDrawer = appDrawer && appDrawer.shadowRoot;
    appDrawer = appDrawer && appDrawer.querySelector("home-assistant-main");
    appDrawer = appDrawer && appDrawer.shadowRoot;
    appDrawer = appDrawer && appDrawer.querySelector("ha-drawer");
    appDrawer = appDrawer && appDrawer.shadowRoot;
    appDrawer = appDrawer && appDrawer.querySelector(".mdc-drawer");
    return appDrawer;
  });
}

export function getParameterByName(name: string, url = window.location.href) {
  const parameterName = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + parameterName + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function createElementFromHTML(htmlString: string) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function createCSS(sidebarConfig: any, width: number) {
  let sidebarWidth = 25;
  let contentWidth = 75;
  let sidebarResponsive = false;
  const headerHeightPx = getHeaderHeightPx();

  if (sidebarConfig.width) {
    if (typeof sidebarConfig.width === "number") {
      sidebarWidth = sidebarConfig.width;
      contentWidth = 100 - sidebarWidth;
    } else if (typeof sidebarConfig.width === "object") {
      sidebarWidth = sidebarConfig.desktop;
      contentWidth = 100 - sidebarWidth;
      sidebarResponsive = true;
    }
  }

  let css = `
    #customSidebarWrapper { 
      display:flex;
      flex-direction:row;
      overflow:hidden;
    }
    #customSidebar.hide {
      display:none!important;
      width:0!important;
    }
    #view.hideSidebar {
      width:100%!important;
    }
  `;

  if (sidebarResponsive) {
    if (width <= sidebarConfig.breakpoints.mobile) {
      css += `
        #customSidebar {
          width:${sidebarConfig.width.mobile}%;
          overflow:hidden;
          ${sidebarConfig.width.mobile === 0 ? "display:none;" : ""}
          ${
            sidebarConfig.hideTopMenu
              ? ""
              : "margin-top: calc(" +
                headerHeightPx +
                " + env(safe-area-inset-top));"
          }
        } 
        #view {
          width:${100 - sidebarConfig.width.mobile}%;
          ${
            sidebarConfig.hideTopMenu
              ? "padding-top:0!important;margin-top:0!important;"
              : ""
          }
        }
      `;
    } else if (width <= sidebarConfig.breakpoints.tablet) {
      css += `
        #customSidebar {
          width:${sidebarConfig.width.tablet}%;
          overflow:hidden;
          ${sidebarConfig.width.tablet === 0 ? "display:none;" : ""}
          ${
            sidebarConfig.hideTopMenu
              ? ""
              : "margin-top: calc(" +
                headerHeightPx +
                " + env(safe-area-inset-top));"
          }
        } 
        #view {
          width:${100 - sidebarConfig.width.tablet}%;
          ${
            sidebarConfig.hideTopMenu
              ? "padding-top:0!important;margin-top:0!important;"
              : ""
          }
        }
      `;
    } else {
      css += `
        #customSidebar {
          width:${sidebarConfig.width.desktop}%;
          overflow:hidden;
          ${sidebarConfig.width.desktop === 0 ? "display:none;" : ""}
          ${
            sidebarConfig.hideTopMenu
              ? ""
              : "margin-top: calc(" +
                headerHeightPx +
                " + env(safe-area-inset-top));"
          }
        } 
        #view {
          width:${100 - sidebarConfig.width.desktop}%;
          ${
            sidebarConfig.hideTopMenu
              ? "padding-top:0!important;margin-top:0!important;"
              : ""
          }
        }
      `;
    }
  } else {
    css += `
      #customSidebar {
        width:${sidebarWidth}%;
        overflow:hidden;
        ${
          sidebarConfig.hideTopMenu
            ? ""
            : "margin-top: calc(" +
              headerHeightPx +
              " + env(safe-area-inset-top));"
        }
      } 
      #view {
        width:${contentWidth}%;
        ${
          sidebarConfig.hideTopMenu
            ? "padding-top:0!important;margin-top:0!important;"
            : ""
        }
      }
    `;
  }

  return css;
}

export function updateStyling(appLayout: any, sidebarConfig: any) {
  if (!appLayout) return;

  const styleEl = appLayout.querySelector("#customSidebarStyle");
  if (!styleEl) return;

  const width = document.body.clientWidth;
  styleEl.textContent = createCSS(sidebarConfig, width);

  const root = getRoot();
  const shadow = root?.shadowRoot as ShadowRoot | null;

  if (!shadow) {
    log2console(
      "updateStyling",
      "Root/shadowRoot non pronto, skip header/footer"
    );
    return;
  }

  const hassHeader = shadow.querySelector(".header") as HTMLElement | null;
  const hassFooter = (shadow.querySelector("ch-footer") ||
    shadow.querySelector("app-footer")) as HTMLElement | null;
  const offParam = getParameterByName("sidebarOff");
  const view = shadow.getElementById("view") as HTMLElement | null;
  const headerHeightPx = getHeaderHeightPx();
  const widthPx = document.body.clientWidth;

  if (
    sidebarConfig.hideTopMenu === true &&
    sidebarConfig.showTopMenuOnMobile === true &&
    widthPx <= sidebarConfig.breakpoints.mobile &&
    offParam == null
  ) {
    if (hassHeader) hassHeader.style.display = "block";
    if (view) view.style.minHeight = "calc(100vh - " + headerHeightPx + ")";
    if (hassFooter) hassFooter.style.display = "flex";
  } else if (sidebarConfig.hideTopMenu === true && offParam == null) {
    if (hassHeader) hassHeader.style.display = "none";
    if (hassFooter) hassFooter.style.display = "none";
    if (view) view.style.minHeight = "calc(100vh)";
  }
}

export function subscribeEvents(
  appLayout: any,
  sidebarConfig: any,
  contentContainer: any,
  sidebar: any
) {
  // OTTIMIZZATO: Debounce su resize per evitare lag
  const debouncedUpdate = debounce(
    () => updateStyling(appLayout, sidebarConfig),
    150 // 150ms di debounce
  );

  window.addEventListener("resize", debouncedUpdate, { passive: true });

  if ("hideOnPath" in sidebarConfig) {
    window.addEventListener("location-changed", () => {
      if (sidebarConfig.hideOnPath.includes(window.location.pathname)) {
        contentContainer.classList.add("hideSidebar");
        sidebar.classList.add("hide");
      } else {
        contentContainer.classList.remove("hideSidebar");
        sidebar.classList.remove("hide");
      }
    });

    if (sidebarConfig.hideOnPath.includes(window.location.pathname)) {
      log2console("subscribeEvents", "Disable sidebar for this path");
      contentContainer.classList.add("hideSidebar");
      sidebar.classList.add("hide");
    }
  }
}

// IMPORTANT: in split version, we pass the builder callback.
export function watchLocationChange(buildFn: () => void) {
  setTimeout(() => {
    window.addEventListener("location-changed", () => {
      const root = getRoot();
      const shadow = root?.shadowRoot as ShadowRoot | null;
      if (!shadow) return;

      const appLayout = shadow.querySelector("div");
      if (!appLayout) return;

      const customSidebarWrapper = appLayout.querySelector(
        "#customSidebarWrapper"
      ) as HTMLElement | null;
      if (!customSidebarWrapper) {
        buildFn();
      } else {
        const customSidebar = customSidebarWrapper.querySelector(
          "#customSidebar"
        ) as HTMLElement | null;
        const customHeader = customSidebarWrapper.querySelector(
          "#customHeaderContainer"
        ) as HTMLElement | null;
        if (!customSidebar && !customHeader) {
          buildFn();
        }
      }
    });
  }, 1000);
}

// ------------------------------------------------------------------
//  SIDEBAR ORIGINALE DI HOME ASSISTANT (ha-sidebar)
// ------------------------------------------------------------------

export function setHassSidebarVisible(visible: boolean) {
  const hassSidebar = getSidebar();
  const appDrawerLayout = getAppDrawerLayout();
  const appDrawer = getAppDrawer();

  if (!hassSidebar || !appDrawerLayout || !appDrawer) {
    return;
  }

  if (visible) {
    // Ripristino: lascio che sia il CSS di HA a fare il suo lavoro
    hassSidebar.style.removeProperty("display");
    appDrawer.style.removeProperty("display");
    appDrawerLayout.style.removeProperty("margin-left");
    appDrawerLayout.style.removeProperty("padding-left");
  } else {
    // Nascondo completamente la sidebar e recupero tutto lo spazio
    hassSidebar.style.display = "none";
    appDrawer.style.display = "none";
    appDrawerLayout.style.marginLeft = "0";
    appDrawerLayout.style.paddingLeft = "0";
  }
}

export function isHassSidebarHidden(): boolean {
  const hassSidebar = getSidebar();
  if (!hassSidebar) return false;

  const inline = hassSidebar.style.display;
  const computed = window.getComputedStyle(hassSidebar).display;

  return inline === "none" || computed === "none";
}

export function toggleHassSidebar() {
  const currentlyHidden = isHassSidebarHidden();
  setHassSidebarVisible(currentlyHidden);
}

// ------------------------------------------------------------------
//  MOSTRA / NASCONDI TOP MENU + PUSH MODE
// ------------------------------------------------------------------

function getHeaderTopMenuOptions() {
  const ll = getLovelace();
  const cfg = ll?.config?.header ?? {};

  const mode: "overlay" | "push" =
    cfg.topMenuMode === "push" ? "push" : "overlay";

  return { mode };
}

function applyTopMenuPushMode(enabled: boolean) {
  const shadow = getHuiShadowRoot();
  if (!shadow) return;

  const haHeader = shadow.querySelector("div.header") as HTMLElement | null;
  const headerHost = shadow.querySelector(
    "#customHeaderContainer"
  ) as HTMLElement | null;

  const view = shadow.getElementById("view") as HTMLElement | null;
  const customSidebarInner = document.querySelector(
    "#customSidebar .sidebar-inner"
  ) as HTMLElement | null;

  if (!view && !customSidebarInner) return;

  if (enabled) {
    const hHa = haHeader?.getBoundingClientRect().height || 0;
    const hCustom = headerHost?.getBoundingClientRect().height || 0;
    const total = hHa + hCustom;

    if (view) view.style.paddingTop = `${total}px`;
    if (customSidebarInner) customSidebarInner.style.paddingTop = `${total}px`;
  } else {
    if (view) view.style.removeProperty("padding-top");
    if (customSidebarInner)
      customSidebarInner.style.removeProperty("padding-top");
  }
}

export function setTopMenuVisible(visible: boolean) {
  const shadow = getHuiShadowRoot();
  if (!shadow) return;

  const haHeader = shadow.querySelector("div.header") as HTMLElement | null;
  if (!haHeader) return;

  const { mode } = getHeaderTopMenuOptions();

  if (visible) {
    haHeader.style.display = "flex";
  } else {
    haHeader.style.display = "none";
  }

  // PUSH: sposta in basso tutta la view (sidebar + card)
  if (mode === "push") {
    applyTopMenuPushMode(visible);
  } else {
    // overlay → niente padding extra
    applyTopMenuPushMode(false);
  }
}

export function isTopMenuHidden(): boolean {
  const shadow = getHuiShadowRoot();
  if (!shadow) return false;

  const haHeader = shadow.querySelector("div.header") as HTMLElement | null;
  if (!haHeader) return false;

  const inline = haHeader.style.display;
  const computed = window.getComputedStyle(haHeader).display;
  return inline === "none" || computed === "none";
}

// OTTIMIZZATO: Performance monitoring per debug Firefox
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private lastTime: Map<string, number> = new Map();

  start(key: string) {
    this.lastTime.set(key, performance.now());
  }

  end(key: string) {
    const start = this.lastTime.get(key);
    if (!start) return;

    const duration = performance.now() - start;
    const times = this.metrics.get(key) || [];
    times.push(duration);

    // Keep only last 50 measurements
    if (times.length > 50) times.shift();
    this.metrics.set(key, times);

    // Warn se troppo lento (solo in debug)
    if (duration > 16 && Math.random() < 0.1) {
      // 10% sampling
      console.warn(
        `[SIDEBAR-CARD] Slow operation: ${key} took ${duration.toFixed(2)}ms`
      );
    }
  }

  getAverage(key: string): number {
    const times = this.metrics.get(key);
    if (!times || times.length === 0) return 0;
    return times.reduce((a, b) => a + b, 0) / times.length;
  }

  // Debug utility per Firefox
  report() {
    console.group("[SIDEBAR-CARD] Performance Report");
    for (const [key, times] of this.metrics) {
      const avg = this.getAverage(key);
      const max = Math.max(...times);
      console.log(
        `${key}: avg=${avg.toFixed(2)}ms max=${max.toFixed(2)}ms count=${
          times.length
        }`
      );
    }
    console.groupEnd();
  }
}

export const perfMonitor = new PerformanceMonitor();

// Esponi globalmente per debug
if (typeof window !== "undefined") {
  (window as any).__sidebarPerfMonitor = perfMonitor;
  console.log("[SIDEBAR-CARD] Performance monitor loaded:", perfMonitor);
}

export function toggleTopMenuRuntime() {
  const hidden = isTopMenuHidden();
  setTopMenuVisible(hidden);
}

// ------------------------------------------------------------------
//  GLOBAL WINDOW HELPERS (per HeaderCard, debug, ecc.)
// ------------------------------------------------------------------

if (typeof window !== "undefined") {
  (window as any).silvioToggleHaSidebar = () => {
    try {
      toggleHassSidebar();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("silvioToggleHaSidebar error", e);
    }
  };

  (window as any).silvioToggleTopMenu = () => {
    try {
      toggleTopMenuRuntime();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("silvioToggleTopMenu error", e);
    }
  };

  // opzionale ma utile per debug da console:
  (window as any).setTopMenuVisible = (visible: boolean) =>
    setTopMenuVisible(visible);
}

// ------------------------------------------------------------------
//  SAVE LOVELACE CONFIG (per SidebarCardEditor)
// ------------------------------------------------------------------

export async function saveLovelaceConfig(
  hassObj: any,
  sidebarConfig: any,
  headerConfig: any
): Promise<void> {
  // Usa SEMPRE il riferimento lovelace di sidebar-card (il dashboard dove è configurata),
  // NON getLovelace() che legge il dashboard attualmente visibile (potrebbe essere diverso).
  const lovelace = (window as any).__sidebarCardLovelace ?? getLovelace();
  if (!lovelace || !lovelace.config) {
    throw new Error("sidebar-card: impossibile leggere la configurazione Lovelace corrente");
  }

  // Controlla se Lovelace è in modalità YAML (non modificabile via WS)
  if (lovelace.mode === "yaml") {
    throw new Error(
      "La configurazione Lovelace è in modalità YAML (ui-lovelace.yaml). " +
      "Il salvataggio automatico non è supportato: modifica il file manualmente."
    );
  }

  const srcConfig = JSON.parse(JSON.stringify(lovelace.config));

  // Ricostruisce il config rispettando l'ordine delle chiavi:
  //   1. metadati generali (title, icon, background, …)
  //   2. sidebar  ← aggiunto/sovrascritto qui
  //   3. header   ← aggiunto/sovrascritto qui
  //   4. views    ← sempre in fondo
  // Questo garantisce che sidebar/header appaiano PRIMA di views nel YAML.
  const fullConfig: Record<string, any> = {};

  // Copia tutto tranne sidebar, header e views
  for (const key of Object.keys(srcConfig)) {
    if (key !== "sidebar" && key !== "header" && key !== "views") {
      fullConfig[key] = srcConfig[key];
    }
  }

  // Inserisci sidebar (nuovo o esistente)
  const newSidebar = sidebarConfig !== undefined ? sidebarConfig : srcConfig.sidebar;
  if (newSidebar && Object.keys(newSidebar).length > 0) {
    fullConfig.sidebar = newSidebar;
  }

  // Inserisci header (nuovo o esistente)
  const newHeader = headerConfig !== undefined ? headerConfig : srcConfig.header;
  if (newHeader && Object.keys(newHeader).length > 0) {
    fullConfig.header = newHeader;
  }

  // Ripristina views in fondo
  if (srcConfig.views !== undefined) {
    fullConfig.views = srcConfig.views;
  }

  // url_path: null = dashboard predefinito, stringa = dashboard personalizzato
  await hassObj.callWS({
    type: "lovelace/config/save",
    url_path: lovelace.urlPath ?? null,
    config: fullConfig,
  });
}
