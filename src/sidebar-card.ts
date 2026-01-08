// src/sidebar-card.ts
// ------------------------------------------------------------------------------------------
//  SIDEBAR-CARD – ENTRY POINT
//  Build wrapper + CSS originali + inject HeaderCard separato
// ------------------------------------------------------------------------------------------

import { SidebarCard } from './SidebarCard';
import { HeaderCard } from './HeaderCard';

import { hass, provideHass } from 'card-tools/src/hass';

import {
  SIDEBAR_CARD_TITLE,
  getConfig,
  getRoot,
  getHuiShadowRoot,
  getSidebar,
  getAppDrawerLayout,
  getAppDrawer,
  getParameterByName,
  createCSS,
  updateStyling,
  subscribeEvents,
  watchLocationChange,
  log2console,
  error2console,
  getHeaderHeightPx,
  setHassSidebarVisible,
  setTopMenuVisible,
} from './helpers';

const SIDEBAR_CARD_VERSION = '1.0';

let ALREADY_BUILT = false;

// --- ResizeObserver types (in case DOM lib not enabled) ---
type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserver;
  }
}


async function buildSidebarCard(container: HTMLElement, config: any) {
  const el = document.createElement('sidebar-card') as SidebarCard;
  el.setConfig(config);
  el.hass = hass();
  container.appendChild(el);
}

async function buildHeaderCard(container: HTMLElement, config: any) {
  let headerEl = container.querySelector('header-card') as any;
  if (!headerEl) {
    headerEl = document.createElement('header-card') as any;
    container.appendChild(headerEl);
    provideHass(headerEl);
  }
  headerEl.setConfig(config);
  headerEl.hass = hass();
}

async function build() {
  if (ALREADY_BUILT) return;

  const lovelace = await getConfig();
  const sidebarConfig = lovelace?.config?.sidebar ?? null;
  const headerConfig = lovelace?.config?.header ?? null;

  if (!sidebarConfig && !headerConfig) {
    log2console('build', 'No sidebar/header config found');
    return;
  }

  const root = getRoot();
  if (!root || !root.shadowRoot) {
    error2console('build', 'Root element or shadowRoot not found!');
    return;
  }

  const hassSidebar = getSidebar();
  const appDrawerLayout = getAppDrawerLayout();
  const appDrawer = getAppDrawer();
  const offParam = getParameterByName('sidebarOff');

  const appLayout = root.shadowRoot.querySelector('div') as HTMLElement | null;
  if (!appLayout) {
    error2console('build', 'App layout not found');
    return;
  }

  // ---------------------------
  // SIDEBAR (original builder)
  // ---------------------------
  if (
    sidebarConfig &&
    sidebarConfig.enabled !== false &&
    (
      !sidebarConfig.width ||
      (typeof sidebarConfig.width === 'number' &&
        sidebarConfig.width > 0 &&
        sidebarConfig.width < 100) ||
      typeof sidebarConfig.width === 'object'
    )
  ) {
    if (!appLayout.querySelector('#customSidebarWrapper')) {
      // 🔹 stato iniziale top menu
      if (sidebarConfig.hideTopMenu === true && offParam == null) {
        setTopMenuVisible(false);
      } else {
        // se non è esplicitamente nascosto (o c'è sidebarOff), lascialo visibile
        setTopMenuVisible(true);
      }

      // 🔹 stato iniziale sidebar HA
      if (sidebarConfig.hideHassSidebar === true && offParam == null) {
        setHassSidebarVisible(false);
      } else {
        setHassSidebarVisible(true);
      }

      // breakpoints & CSS come prima
      if (!sidebarConfig.breakpoints) {
        sidebarConfig.breakpoints = { tablet: 1024, mobile: 768 };
      } else {
        if (!sidebarConfig.breakpoints.mobile) sidebarConfig.breakpoints.mobile = 768;
        if (!sidebarConfig.breakpoints.tablet) sidebarConfig.breakpoints.tablet = 1024;
      }

      const css = createCSS(sidebarConfig, document.body.clientWidth);
      const style = document.createElement('style');
      style.id = 'customSidebarStyle';
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      appLayout.appendChild(style);

      const contentContainer = appLayout.querySelector('#view') as HTMLElement | null;
      if (!contentContainer || !contentContainer.parentNode) {
        error2console('build', 'View element not found');
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.id = 'customSidebarWrapper';
      contentContainer.parentNode.insertBefore(wrapper, contentContainer);

      const sidebar = document.createElement('div');
      sidebar.id = 'customSidebar';

      wrapper.appendChild(sidebar);
      wrapper.appendChild(contentContainer);

      await buildSidebarCard(sidebar, sidebarConfig);
      subscribeEvents(appLayout, sidebarConfig, contentContainer, sidebar);

      setTimeout(() => updateStyling(appLayout, sidebarConfig), 1);
    }
  } else if (sidebarConfig) {
    error2console('build', 'Error in sidebar width config!');
  }

  // ---------------------------
  // HEADER
  // ---------------------------
  if (headerConfig && headerConfig.enabled !== false) {
    const viewEl = appLayout.querySelector('#view') as HTMLElement | null;
    if (!viewEl) {
      error2console('build', 'View element (#view) not found for header');
    } else {
      // targetContent = tutto ciò che deve scendere sotto la header:
      // - se sidebar attiva: #customSidebarWrapper (contiene sidebar + view)
      // - altrimenti: #view
      const sidebarWrapper = appLayout.querySelector('#customSidebarWrapper') as HTMLElement | null;
      const targetContent = sidebarWrapper ?? viewEl;

      // 1) Wrapper verticale (colonna) che conterrà header + contenuto
      let headerWrapper = appLayout.querySelector('#customHeaderWrapper') as HTMLElement | null;
      if (!headerWrapper) {
        headerWrapper = document.createElement('div');
        headerWrapper.id = 'customHeaderWrapper';
        headerWrapper.style.display = 'flex';
        headerWrapper.style.flexDirection = 'column';
        headerWrapper.style.width = '100%';
        headerWrapper.style.minWidth = '0';
        headerWrapper.style.boxSizing = 'border-box';

        // Inseriscilo prima del targetContent
        if (targetContent.parentNode) {
          targetContent.parentNode.insertBefore(headerWrapper, targetContent);
        } else {
          appLayout.insertBefore(headerWrapper, appLayout.firstChild);
        }

        // Sposta dentro al wrapper il contenuto (sidebarWrapper o view)
        headerWrapper.appendChild(targetContent);
      } else {
        // Se esiste già, assicuriamoci che contenga il targetContent
        if (targetContent.parentElement !== headerWrapper) {
          headerWrapper.appendChild(targetContent);
        }
      }

      // 2) Host della tua header (sempre PRIMO figlio del wrapper)
      let headerHost = headerWrapper.querySelector('#customHeaderContainer') as HTMLElement | null;
      if (!headerHost) {
        headerHost = document.createElement('div');
        headerHost.id = 'customHeaderContainer';
        headerHost.style.width = '100%';
        headerHost.style.boxSizing = 'border-box';
        headerWrapper.insertBefore(headerHost, headerWrapper.firstChild);
      } else if (headerHost !== headerWrapper.firstChild) {
        headerWrapper.insertBefore(headerHost, headerWrapper.firstChild);
      }

      // 3) Crea/riusa l’elemento header-card + setConfig
      await buildHeaderCard(headerHost, headerConfig);

      // sticky: default true
      const sticky = (() => {
        const v = headerConfig.sticky;
        if (v === undefined || v === null) return true;
        if (typeof v === 'boolean') return v;
        if (typeof v === 'string') {
          const s = v.toLowerCase().trim();
          return !(s === 'false' || s === 'off' || s === '0' || s === 'no');
        }
        if (typeof v === 'number') return v !== 0;
        return true;
      })();

      // modalità topMenu (overlay|push) letta dalla config header
      const topMenuMode: 'overlay' | 'push' =
        headerConfig.topMenuMode === 'overlay' ? 'overlay' : 'push';

      const applyHeaderLayout = () => {
        // 4) La tua header: sticky o normale
        if (sticky) {
          headerHost!.style.position = 'sticky';
          headerHost!.style.top = '0px';
          headerHost!.style.zIndex = '1000';
        } else {
          headerHost!.style.position = 'relative';
          headerHost!.style.top = '0px';
          headerHost!.style.zIndex = '1';
        }

        // 5) Misuro topbar HA (div.header) e verifico se è visibile
        const huiShadow = getHuiShadowRoot?.() ?? null;
        const haHeaderEl =
          (huiShadow?.querySelector('div.header') as HTMLElement | null) ??
          (appLayout.querySelector('div.header') as HTMLElement | null);

        const haHeaderVisible =
          !!haHeaderEl && window.getComputedStyle(haHeaderEl).display !== 'none';

        const haHeaderHeight =
          haHeaderVisible ? Math.round(haHeaderEl!.getBoundingClientRect().height) : 0;

        // ✅ padding base SOLO se la topbar è visibile
        const basePaddingTop = haHeaderVisible ? 50 : 0;

        if (topMenuMode === 'push' && haHeaderHeight > 0) {
          // push: uso altezza reale della topbar HA (ha priorità)
          headerWrapper!.style.paddingTop = `${haHeaderHeight}px`;

          // in push, la view NON deve avere padding-top inline
          viewEl.style.paddingTop = '0px';
        } else {
          // overlay: padding 50 SOLO se topbar visibile, altrimenti 0
          headerWrapper!.style.paddingTop = `${basePaddingTop}px`;

          // ripristino: lascio che HA/card-mod gestiscano la view
          viewEl.style.removeProperty('padding-top');
        }
      };
      

      applyHeaderLayout();
      requestAnimationFrame(() => applyHeaderLayout());
      
      const obsKey = '__sidebarCardHaHeaderObserver';
      const prevObs = (window as any)[obsKey] as MutationObserver | undefined;
      if (prevObs) prevObs.disconnect();

      const huiShadow = getHuiShadowRoot?.() ?? null;
      const haHeaderEl =
        (huiShadow?.querySelector('div.header') as HTMLElement | null) ??
        (appLayout.querySelector('div.header') as HTMLElement | null);

      if (haHeaderEl) {
        const mo = new MutationObserver(() => {
          applyHeaderLayout();
          requestAnimationFrame(() => applyHeaderLayout());
        });

        mo.observe(haHeaderEl, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
        (window as any)[obsKey] = mo;
      }
      
      // Riesegue layout su resize
      const key = '__sidebarCardHeaderResizeHandler';
      const prev = (window as any)[key] as ((...args: any[]) => void) | undefined;
      if (prev) window.removeEventListener('resize', prev);

      const onResize = () => applyHeaderLayout();
      (window as any)[key] = onResize;
      window.addEventListener('resize', onResize);
    }
  } else {
    // header disabilitato: cleanup
    const headerWrapper = appLayout.querySelector('#customHeaderWrapper') as HTMLElement | null;
    const headerHost = appLayout.querySelector('#customHeaderContainer') as HTMLElement | null;

    if (headerHost) headerHost.remove();

    // se esiste wrapper, rimetti il contenuto al posto giusto (best effort)
    if (headerWrapper) {
      const maybeSidebarWrapper = headerWrapper.querySelector('#customSidebarWrapper') as HTMLElement | null;
      const viewEl = headerWrapper.querySelector('#view') as HTMLElement | null;

      const toRestore = maybeSidebarWrapper ?? viewEl;
      if (toRestore && headerWrapper.parentNode) {
        headerWrapper.parentNode.insertBefore(toRestore, headerWrapper);
      }
      headerWrapper.remove();
    }

    const key = '__sidebarCardHeaderResizeHandler';
    const prev = (window as any)[key] as ((...args: any[]) => void) | undefined;
    if (prev) window.removeEventListener('resize', prev);
    delete (window as any)[key];

    // cleanup MutationObserver topbar HA
    const obsKey = '__sidebarCardHaHeaderObserver';
    const prevObs = (window as any)[obsKey] as MutationObserver | undefined;
    if (prevObs) prevObs.disconnect();
    delete (window as any)[obsKey];
  }

  ALREADY_BUILT = true;
}

// Define custom elements ONCE
if (!customElements.get('sidebar-card')) customElements.define('sidebar-card', SidebarCard);
if (!customElements.get('header-card')) customElements.define('header-card', HeaderCard);

// Init banner
// eslint-disable-next-line no-console
console.info(
  `%c  ${SIDEBAR_CARD_TITLE.padEnd(24)}%c\n  Version: ${SIDEBAR_CARD_VERSION.padEnd(9)}      `,
  'color: chartreuse; background: black; font-weight: 700;',
  'color: white; background: dimgrey; font-weight: 700;',
);

build();
watchLocationChange(build);
