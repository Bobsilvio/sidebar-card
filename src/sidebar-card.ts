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

    __silvioFlipActive?: boolean;

    silvioFlipTopMenu?: () => void;
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
      if (sidebarConfig.hideTopMenu === true && offParam == null) {
        setTopMenuVisible(false);
      } else {
        setTopMenuVisible(true);
      }

      if (sidebarConfig.hideHassSidebar === true && offParam == null) {
        setHassSidebarVisible(false);
      } else {
        setHassSidebarVisible(true);
      }

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
      const sidebarWrapper = appLayout.querySelector('#customSidebarWrapper') as HTMLElement | null;
      const targetContent = sidebarWrapper ?? viewEl;

      let headerWrapper = appLayout.querySelector('#customHeaderWrapper') as HTMLElement | null;
      if (!headerWrapper) {
        headerWrapper = document.createElement('div');
        headerWrapper.id = 'customHeaderWrapper';
        headerWrapper.style.display = 'flex';
        headerWrapper.style.flexDirection = 'column';
        headerWrapper.style.width = '100%';
        headerWrapper.style.minWidth = '0';
        headerWrapper.style.boxSizing = 'border-box';

        if (targetContent.parentNode) {
          targetContent.parentNode.insertBefore(headerWrapper, targetContent);
        } else {
          appLayout.insertBefore(headerWrapper, appLayout.firstChild);
        }
        headerWrapper.appendChild(targetContent);
      } else {
        if (targetContent.parentElement !== headerWrapper) {
          headerWrapper.appendChild(targetContent);
        }
      }

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

      await buildHeaderCard(headerHost, headerConfig);
      
      function ensureFlipStage(headerHost: HTMLElement) {
        let stage = headerHost.querySelector('#headerFlipStage') as HTMLElement | null;

        if (!stage) {
          stage = document.createElement('div');
          stage.id = 'headerFlipStage';
          stage.style.position = 'relative';
          stage.style.width = '100%';
          stage.style.boxSizing = 'border-box';
          stage.style.perspective = '1600px';
          stage.style.overflow = 'hidden';

          const rot = document.createElement('div');
          rot.id = 'headerFlipRotator';
          rot.style.position = 'relative';
          rot.style.width = '100%';
          rot.style.height = '100%';
          rot.style.transformStyle = 'preserve-3d';
          rot.style.willChange = 'transform';
          rot.style.transformOrigin = '50% 50%';
          rot.style.transform = 'rotateX(0deg) translateZ(0px)';

          const front = document.createElement('div');
          front.id = 'headerFlipFront';
          front.style.position = 'absolute';
          front.style.inset = '0';
          front.style.backfaceVisibility = 'hidden';
          front.style.transform = 'rotateX(0deg)';
          front.style.zIndex = '2';

          const back = document.createElement('div');
          back.id = 'headerFlipBack';
          back.style.position = 'absolute';
          back.style.inset = '0';
          back.style.backfaceVisibility = 'hidden';
          back.style.transform = 'rotateX(180deg)';
          back.style.overflow = 'hidden';
          back.style.pointerEvents = 'none';
          back.style.opacity = '0';
          back.style.zIndex = '1';

          rot.appendChild(front);
          rot.appendChild(back);
          stage.appendChild(rot);

          headerHost.appendChild(stage);
        }

        const front = stage.querySelector('#headerFlipFront') as HTMLElement;
        const headerCardEl = headerHost.querySelector('header-card') as HTMLElement | null;
        if (headerCardEl && headerCardEl.parentElement !== front) {
          front.appendChild(headerCardEl);
        }

        const h = Math.round(front.getBoundingClientRect().height || 0);
        stage.style.height = `${Math.max(h, 72)}px`;

        return stage;
      }

      function triggerHeaderFlip(
        headerHost: HTMLElement,
        appLayout: HTMLElement,
        headerWrapper: HTMLElement,
        viewEl: HTMLElement,
        pauseMs = flipPauseMs
      ) {
        const savedHostHeight = headerHost.style.height;
        const savedHostMinHeight = headerHost.style.minHeight;

        const initialHostH = Math.max(72, Math.round(headerHost.getBoundingClientRect().height || 0));

        headerHost.style.height = `${initialHostH}px`;
        headerHost.style.minHeight = `${initialHostH}px`;

        const stage = ensureFlipStage(headerHost);
        const rot = stage.querySelector('#headerFlipRotator') as HTMLElement;
        const back = stage.querySelector('#headerFlipBack') as HTMLElement;
        const front = stage.querySelector('#headerFlipFront') as HTMLElement;

        stage.style.height = `${Math.max(initialHostH, 72)}px`;

        if ((rot as any).__flipping) {
          headerHost.style.height = savedHostHeight;
          headerHost.style.minHeight = savedHostMinHeight;
          return;
        }
        (rot as any).__flipping = true;

        const huiShadow = getHuiShadowRoot?.() ?? null;
        const haHeaderEl =
          (huiShadow?.querySelector('div.header') as HTMLElement | null) ??
          (appLayout.querySelector('div.header') as HTMLElement | null);

        if (!haHeaderEl) {
          headerHost.style.height = savedHostHeight;
          headerHost.style.minHeight = savedHostMinHeight;
          (rot as any).__flipping = false;
          return;
        }

        const wait = (ms: number) => new Promise<void>(res => window.setTimeout(res, ms));

        const originallyVisible = window.getComputedStyle(haHeaderEl).display !== 'none';

        const savedWrapperPaddingTop = headerWrapper.style.paddingTop;
        const savedViewPaddingTop = viewEl.style.paddingTop;
        const savedViewPaddingTopProp = viewEl.style.getPropertyValue('padding-top');

        const freezeLayout = () => {
          (window as any).__silvioFlipActive = true;
          headerWrapper.style.paddingTop = window.getComputedStyle(headerWrapper).paddingTop;
          viewEl.style.paddingTop = window.getComputedStyle(viewEl).paddingTop;
        };

        const restoreLayout = () => {
          headerWrapper.style.paddingTop = savedWrapperPaddingTop;

          if (savedViewPaddingTopProp) {
            viewEl.style.setProperty('padding-top', savedViewPaddingTopProp);
          } else {
            viewEl.style.paddingTop = savedViewPaddingTop;
          }

          (window as any).__silvioFlipActive = false;
        };

        const obsKey = '__sidebarCardHaHeaderObserver';
        const prevObs = (window as any)[obsKey] as MutationObserver | undefined;
        if (prevObs) prevObs.disconnect();
        delete (window as any)[obsKey];

        const overlayKey = '__silvioHaOverlayRestore';
        const showHaOverlay = (on: boolean) => {
          const restore = (window as any)[overlayKey] as (() => void) | undefined;

          if (!on) {
            if (restore) restore();
            delete (window as any)[overlayKey];

            // torna come prima
            if (!originallyVisible) haHeaderEl.style.display = 'none';
            return;
          }

          if (restore) return;

          const prev = {
            display: haHeaderEl.style.display,
            position: haHeaderEl.style.position,
            top: haHeaderEl.style.top,
            left: haHeaderEl.style.left,
            right: haHeaderEl.style.right,
            width: haHeaderEl.style.width,
            zIndex: haHeaderEl.style.zIndex,
            pointerEvents: haHeaderEl.style.pointerEvents,
            margin: haHeaderEl.style.margin,
            transform: haHeaderEl.style.transform,
          };

          (window as any)[overlayKey] = () => {
            haHeaderEl.style.display = prev.display;
            haHeaderEl.style.position = prev.position;
            haHeaderEl.style.top = prev.top;
            haHeaderEl.style.left = prev.left;
            haHeaderEl.style.right = prev.right;
            haHeaderEl.style.width = prev.width;
            haHeaderEl.style.zIndex = prev.zIndex;
            haHeaderEl.style.pointerEvents = prev.pointerEvents;
            haHeaderEl.style.margin = prev.margin;
            haHeaderEl.style.transform = prev.transform;
          };

          haHeaderEl.style.display = 'flex';
          haHeaderEl.style.position = 'fixed';
          haHeaderEl.style.top = '0px';
          haHeaderEl.style.left = '0px';
          haHeaderEl.style.right = '0px';
          haHeaderEl.style.width = '100%';
          haHeaderEl.style.zIndex = '3000';
          haHeaderEl.style.pointerEvents = 'auto';
          haHeaderEl.style.margin = '0';
          haHeaderEl.style.transform = 'translateZ(0)';
        };

        const buildBackCloneAndFixHeight = () => {
          back.innerHTML = '';

          const raw = getHeaderHeightPx();
          const haH = Math.max(typeof raw === 'string' ? (Number.parseInt(raw, 10) || 0) : 0, 56);

          const clone = haHeaderEl.cloneNode(true) as HTMLElement;
          clone.style.display = 'flex';
          clone.style.position = 'relative';
          clone.style.width = '100%';
          clone.style.height = `${haH}px`;
          clone.style.minHeight = `${haH}px`;
          clone.style.visibility = 'visible';
          clone.style.opacity = '1';
          back.appendChild(clone);

          const frontH = Math.round(front.getBoundingClientRect().height || 0);
          const backH = Math.round(back.getBoundingClientRect().height || 0);

          const h = Math.max(frontH, backH, haH, initialHostH, 72);

          // blocco coerente: stage + host sempre >= initialHostH
          stage.style.height = `${h}px`;
          headerHost.style.height = `${Math.max(h, initialHostH)}px`;
          headerHost.style.minHeight = `${Math.max(h, initialHostH)}px`;

          return h;
        };

        const rollMs = 800;
        const mid = 89;

        const hardResetVisual = () => {
          rot.getAnimations().forEach(a => a.cancel());
          front.getAnimations().forEach(a => a.cancel());
          back.getAnimations().forEach(a => a.cancel());

          rot.style.transformOrigin = '50% 50%';
          rot.style.transform = 'rotateX(0deg) translateZ(0px)';

          front.style.opacity = '1';
          back.style.opacity = '0';
          back.innerHTML = '';
        };

        const animateToBack = async () => {
          freezeLayout();

          const h = buildBackCloneAndFixHeight();

          front.style.opacity = '1';
          back.style.opacity = '0';

          rot.getAnimations().forEach(a => a.cancel());
          front.getAnimations().forEach(a => a.cancel());
          back.getAnimations().forEach(a => a.cancel());

          rot.style.transformOrigin = '50% 50%';
          rot.style.transform = 'rotateX(0deg) translateZ(0px)';

          const z = Math.max(10, Math.min(30, Math.round(h / 6)));

          await new Promise<void>(resolve => {
            const aRot = rot.animate(
              [
                { transform: 'rotateX(0deg) translateZ(0px)' },
                { transform: `rotateX(${mid}deg) translateZ(${z}px)` },
                { transform: 'rotateX(180deg) translateZ(0px)' },
              ],
              { duration: rollMs, easing: 'ease-in-out', fill: 'forwards' }
            );

            front.animate([{ opacity: 1 }, { opacity: 0 }], { duration: rollMs, easing: 'ease-in-out', fill: 'forwards' });
            back.animate([{ opacity: 0 }, { opacity: 1 }], { duration: rollMs, easing: 'ease-in-out', fill: 'forwards' });

            aRot.onfinish = () => resolve();
          });

          showHaOverlay(true);

          back.style.opacity = '0';
          back.innerHTML = '';
        };

        const animateToFront = async () => {
          showHaOverlay(false);

          const h = buildBackCloneAndFixHeight();

          front.style.opacity = '0';
          back.style.opacity = '1';

          rot.getAnimations().forEach(a => a.cancel());
          front.getAnimations().forEach(a => a.cancel());
          back.getAnimations().forEach(a => a.cancel());

          rot.style.transformOrigin = '50% 50%';
          rot.style.transform = 'rotateX(180deg) translateZ(0px)';

          const z = Math.max(10, Math.min(30, Math.round(h / 6)));

          await new Promise<void>(resolve => {
            const aRot = rot.animate(
              [
                { transform: 'rotateX(180deg) translateZ(0px)' },
                { transform: `rotateX(${180 - mid}deg) translateZ(${z}px)` },
                { transform: 'rotateX(0deg) translateZ(0px)' },
              ],
              { duration: rollMs, easing: 'ease-in-out', fill: 'forwards' }
            );

            back.animate([{ opacity: 1 }, { opacity: 0 }], { duration: rollMs, easing: 'ease-in-out', fill: 'forwards' });
            front.animate([{ opacity: 0 }, { opacity: 1 }], { duration: rollMs, easing: 'ease-in-out', fill: 'forwards' });

            aRot.onfinish = () => resolve();
          });

          hardResetVisual();
          restoreLayout();

          headerHost.style.height = savedHostHeight;
          headerHost.style.minHeight = savedHostMinHeight;

          const fh = Math.round(front.getBoundingClientRect().height || 0);
          stage.style.height = `${Math.max(fh, 72)}px`;
        };

        (async () => {
          try {
            await animateToBack();
            await wait(pauseMs);
            await animateToFront();
          } catch (_e) {
            showHaOverlay(false);
            hardResetVisual();
            restoreLayout();

            headerHost.style.height = savedHostHeight;
            headerHost.style.minHeight = savedHostMinHeight;
          } finally {
            // riattacca observer + riallineo
            try {
              const mo = new MutationObserver(() => {
                // @ts-ignore
                applyHeaderLayout();
                requestAnimationFrame(() => {
                  // @ts-ignore
                  applyHeaderLayout();
                });
              });
              mo.observe(haHeaderEl, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
              (window as any)[obsKey] = mo;
            } catch {}

            try {
              // @ts-ignore
              applyHeaderLayout();
              requestAnimationFrame(() => {
                // @ts-ignore
                applyHeaderLayout();
              });
            } catch {}

            (rot as any).__flipping = false;
          }
        })();
      }

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

      const topMenuMode: 'overlay' | 'push' | 'flip' =
        headerConfig.topMenuMode === 'overlay'
          ? 'overlay'
          : headerConfig.topMenuMode === 'flip'
            ? 'flip'
            : 'push';

      let flipPlayed = false;
      
      // durata flip (secondi → ms)
      const flipPauseMs = (() => {
        const v = headerConfig.flipDuration;
        if (v === undefined || v === null) return 5000;
        const n = Number(v);
        if (!Number.isFinite(n) || n <= 0) return 5000;
        return Math.round(n * 1000);
      })();
      

      // --- helper: trova topbar HA ---
      const getHaHeaderEl = () => {
        const huiShadow = getHuiShadowRoot?.() ?? null;
        return (
          (huiShadow?.querySelector('div.header') as HTMLElement | null) ??
          (appLayout.querySelector('div.header') as HTMLElement | null)
        );
      };

      const obsKey = '__sidebarCardHaHeaderObserver';

      const detachHaHeaderObserver = () => {
        const prevObs = (window as any)[obsKey] as MutationObserver | undefined;
        if (prevObs) prevObs.disconnect();
        delete (window as any)[obsKey];
      };

      const attachHaHeaderObserver = () => {
        detachHaHeaderObserver();
        const haHeaderEl = getHaHeaderEl();
        if (!haHeaderEl) return;

        const mo = new MutationObserver(() => {
          applyHeaderLayout();
          requestAnimationFrame(() => applyHeaderLayout());
        });

        mo.observe(haHeaderEl, { attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
        (window as any)[obsKey] = mo;
      };

      const applyHeaderLayout = () => {
        // 4) sticky / non-sticky
        if (sticky) {
          headerHost!.style.position = 'sticky';
          headerHost!.style.top = '0px';
          headerHost!.style.zIndex = '1000';
        } else {
          headerHost!.style.position = 'relative';
          headerHost!.style.top = '0px';
          headerHost!.style.zIndex = '1';
        }

        (window as any).silvioFlipTopMenu = () => {
          try {
            triggerHeaderFlip(headerHost!, appLayout, headerWrapper!, viewEl!, flipPauseMs);
          } catch (_e) {
            // ignore
          }
        };

        if ((window as any).__silvioFlipActive === true) return;

        const haHeaderEl = getHaHeaderEl();
        const haHeaderVisible =
          !!haHeaderEl && window.getComputedStyle(haHeaderEl).display !== 'none';

        const haHeaderHeight =
          haHeaderVisible ? Math.round(haHeaderEl!.getBoundingClientRect().height) : 0;

          const basePaddingTop = haHeaderVisible ? 50 : 0;

        if ((topMenuMode === 'push' || topMenuMode === 'flip') && haHeaderHeight > 0) {
          headerWrapper!.style.paddingTop = `${haHeaderHeight}px`;
          viewEl.style.paddingTop = '0px';
        } else {
          headerWrapper!.style.paddingTop = `${basePaddingTop}px`;
          viewEl.style.removeProperty('padding-top');
        }
      };

      applyHeaderLayout();
      requestAnimationFrame(() => applyHeaderLayout());

      attachHaHeaderObserver();

      const key = '__sidebarCardHeaderResizeHandler';
      const prev = (window as any)[key] as ((...args: any[]) => void) | undefined;
      if (prev) window.removeEventListener('resize', prev);

      const onResize = () => applyHeaderLayout();
      (window as any)[key] = onResize;
      window.addEventListener('resize', onResize);
      
    }
  } else {
    const headerWrapper = appLayout.querySelector('#customHeaderWrapper') as HTMLElement | null;
    const headerHost = appLayout.querySelector('#customHeaderContainer') as HTMLElement | null;

    if (headerHost) headerHost.remove();

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
