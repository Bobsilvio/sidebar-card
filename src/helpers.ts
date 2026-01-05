// src/helpers.ts
// ------------------------------------------------------------------------------------------
//  Helper methods (extracted from original monolithic sidebar-card.ts)
// ------------------------------------------------------------------------------------------

export const SIDEBAR_CARD_TITLE = 'SIDEBAR-CARD';

//
// LOVELACE / ROOT
//

// 🔹 Usa il nuovo finder ricorsivo per trovare hui-root in modo robusto
export function findHuiRootShadow(startNode?: Node | null): ShadowRoot | null {
  const stack: Array<Node | ShadowRoot> = [];

  if (startNode) stack.push(startNode);
  else stack.push(document.body);

  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;

    let root: DocumentFragment | Element | null = null;

    if (node instanceof ShadowRoot) {
      root = node;
    } else if (node instanceof HTMLElement && node.shadowRoot) {
      root = node.shadowRoot;
    } else if (node instanceof HTMLElement || node instanceof DocumentFragment) {
      root = node;
    } else {
      continue;
    }

    const huiRoot = root.querySelector('hui-root') as HTMLElement | null;
    if (huiRoot?.shadowRoot) {
      return huiRoot.shadowRoot;
    }

    const children = root.querySelectorAll('*');
    children.forEach(el => {
      stack.push(el);
      if ((el as HTMLElement).shadowRoot) stack.push((el as HTMLElement).shadowRoot!);
    });
  }

  return null;
}

export function getHuiShadowRoot(): ShadowRoot | null {
  const ha = document.querySelector('home-assistant');
  return findHuiRootShadow(ha);
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
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export async function log2console(method: string, message: string, object?: any) {
  const lovelace = await getConfig();
  if (lovelace?.config?.sidebar) {
    const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
    if (sidebarConfig.debug === true) {
      // eslint-disable-next-line no-console
      console.info(
        `%c${SIDEBAR_CARD_TITLE}: %c ${method.padEnd(24)} -> %c ${message}`,
        'color: chartreuse; background: black; font-weight: 700;',
        'color: yellow; background: black; font-weight: 700;',
        '',
        object,
      );
    }
  }
}

export async function error2console(method: string, message: string, object?: any) {
  const lovelace = await getConfig();
  if (lovelace?.config?.sidebar) {
    const sidebarConfig = Object.assign({}, lovelace.config.sidebar);
    if (sidebarConfig.debug === true) {
      // eslint-disable-next-line no-console
      console.error(
        `%c${SIDEBAR_CARD_TITLE}: %c ${method.padEnd(24)} -> %c ${message}`,
        'color: red; background: black; font-weight: 700;',
        'color: white; background: black; font-weight: 700;',
        'color:red',
        object,
      );
    }
  }
}

//
// SIDEBAR / LAYOUT ORIGINALE HA
//

export function getHeaderHeightPx() {
  let headerHeightPx = '0px';
  const root = getRoot();
  const shadow = root?.shadowRoot as ShadowRoot | null;

  if (!shadow) return headerHeightPx;

  const view = shadow.getElementById('view') as HTMLElement | null;
  if (view && window.getComputedStyle(view) !== undefined) {
    headerHeightPx = window.getComputedStyle(view).paddingTop;
  }
  return headerHeightPx;
}

export function getSidebar() {
  let sidebar: any = document.querySelector('home-assistant');
  sidebar = sidebar && sidebar.shadowRoot;
  sidebar = sidebar && sidebar.querySelector('home-assistant-main');
  sidebar = sidebar && sidebar.shadowRoot;
  sidebar = sidebar && sidebar.querySelector('ha-drawer ha-sidebar');
  return sidebar;
}

export function getAppDrawerLayout() {
  let appDrawerLayout: any = document.querySelector('home-assistant');
  appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
  appDrawerLayout = appDrawerLayout && appDrawerLayout.querySelector('home-assistant-main');
  appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
  appDrawerLayout = appDrawerLayout && appDrawerLayout.querySelector('ha-drawer');
  appDrawerLayout = appDrawerLayout && appDrawerLayout.shadowRoot;
  appDrawerLayout = appDrawerLayout && appDrawerLayout.querySelector('.mdc-drawer-app-content');
  return appDrawerLayout;
}

export function getAppDrawer() {
  let appDrawer: any = document.querySelector('home-assistant');
  appDrawer = appDrawer && appDrawer.shadowRoot;
  appDrawer = appDrawer && appDrawer.querySelector('home-assistant-main');
  appDrawer = appDrawer && appDrawer.shadowRoot;
  appDrawer = appDrawer && appDrawer.querySelector('ha-drawer');
  appDrawer = appDrawer && appDrawer.shadowRoot;
  appDrawer = appDrawer && appDrawer.querySelector('.mdc-drawer');
  return appDrawer;
}

export function getParameterByName(name: string, url = window.location.href) {
  const parameterName = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + parameterName + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function createElementFromHTML(htmlString: string) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function createCSS(sidebarConfig: any, width: number) {
  let sidebarWidth = 25;
  let contentWidth = 75;
  let sidebarResponsive = false;
  const headerHeightPx = getHeaderHeightPx();

  if (sidebarConfig.width) {
    if (typeof sidebarConfig.width === 'number') {
      sidebarWidth = sidebarConfig.width;
      contentWidth = 100 - sidebarWidth;
    } else if (typeof sidebarConfig.width === 'object') {
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
          ${sidebarConfig.width.mobile === 0 ? 'display:none;' : ''}
          ${sidebarConfig.hideTopMenu ? '' : 'margin-top: calc(' + headerHeightPx + ' + env(safe-area-inset-top));'}
        } 
        #view {
          width:${100 - sidebarConfig.width.mobile}%;
          ${sidebarConfig.hideTopMenu ? 'padding-top:0!important;margin-top:0!important;' : ''}
        }
      `;
    } else if (width <= sidebarConfig.breakpoints.tablet) {
      css += `
        #customSidebar {
          width:${sidebarConfig.width.tablet}%;
          overflow:hidden;
          ${sidebarConfig.width.tablet === 0 ? 'display:none;' : ''}
          ${sidebarConfig.hideTopMenu ? '' : 'margin-top: calc(' + headerHeightPx + ' + env(safe-area-inset-top));'}
        } 
        #view {
          width:${100 - sidebarConfig.width.tablet}%;
          ${sidebarConfig.hideTopMenu ? 'padding-top:0!important;margin-top:0!important;' : ''}
        }
      `;
    } else {
      css += `
        #customSidebar {
          width:${sidebarConfig.width.desktop}%;
          overflow:hidden;
          ${sidebarConfig.width.desktop === 0 ? 'display:none;' : ''}
          ${sidebarConfig.hideTopMenu ? '' : 'margin-top: calc(' + headerHeightPx + ' + env(safe-area-inset-top));'}
        } 
        #view {
          width:${100 - sidebarConfig.width.desktop}%;
          ${sidebarConfig.hideTopMenu ? 'padding-top:0!important;margin-top:0!important;' : ''}
        }
      `;
    }
  } else {
    css += `
      #customSidebar {
        width:${sidebarWidth}%;
        overflow:hidden;
        ${sidebarConfig.hideTopMenu ? '' : 'margin-top: calc(' + headerHeightPx + ' + env(safe-area-inset-top));'}
      } 
      #view {
        width:${contentWidth}%;
        ${sidebarConfig.hideTopMenu ? 'padding-top:0!important;margin-top:0!important;' : ''}
      }
    `;
  }

  return css;
}

export function updateStyling(appLayout: any, sidebarConfig: any) {
  if (!appLayout) return;

  const styleEl = appLayout.querySelector('#customSidebarStyle');
  if (!styleEl) return;

  const width = document.body.clientWidth;
  styleEl.textContent = createCSS(sidebarConfig, width);

  const root = getRoot();
  const shadow = root?.shadowRoot as ShadowRoot | null;

  if (!shadow) {
    log2console('updateStyling', 'Root/shadowRoot non pronto, skip header/footer');
    return;
  }

  const hassHeader = shadow.querySelector('.header') as HTMLElement | null;
  const hassFooter = (shadow.querySelector('ch-footer') ||
    shadow.querySelector('app-footer')) as HTMLElement | null;
  const offParam = getParameterByName('sidebarOff');
  const view = shadow.getElementById('view') as HTMLElement | null;
  const headerHeightPx = getHeaderHeightPx();
  const widthPx = document.body.clientWidth;

  if (
    sidebarConfig.hideTopMenu === true &&
    sidebarConfig.showTopMenuOnMobile === true &&
    widthPx <= sidebarConfig.breakpoints.mobile &&
    offParam == null
  ) {
    if (hassHeader) hassHeader.style.display = 'block';
    if (view) view.style.minHeight = 'calc(100vh - ' + headerHeightPx + ')';
    if (hassFooter) hassFooter.style.display = 'flex';
  } else if (sidebarConfig.hideTopMenu === true && offParam == null) {
    if (hassHeader) hassHeader.style.display = 'none';
    if (hassFooter) hassFooter.style.display = 'none';
    if (view) view.style.minHeight = 'calc(100vh)';
  }
}

export function subscribeEvents(appLayout: any, sidebarConfig: any, contentContainer: any, sidebar: any) {
  window.addEventListener(
    'resize',
    () => {
      updateStyling(appLayout, sidebarConfig);
    },
    true,
  );

  if ('hideOnPath' in sidebarConfig) {
    window.addEventListener('location-changed', () => {
      if (sidebarConfig.hideOnPath.includes(window.location.pathname)) {
        contentContainer.classList.add('hideSidebar');
        sidebar.classList.add('hide');
      } else {
        contentContainer.classList.remove('hideSidebar');
        sidebar.classList.remove('hide');
      }
    });

    if (sidebarConfig.hideOnPath.includes(window.location.pathname)) {
      log2console('subscribeEvents', 'Disable sidebar for this path');
      contentContainer.classList.add('hideSidebar');
      sidebar.classList.add('hide');
    }
  }
}

// IMPORTANT: in split version, we pass the builder callback.
export function watchLocationChange(buildFn: () => void) {
  setTimeout(() => {
    window.addEventListener('location-changed', () => {
      const root = getRoot();
      const shadow = root?.shadowRoot as ShadowRoot | null;
      if (!shadow) return;

      const appLayout = shadow.querySelector('div');
      if (!appLayout) return;

      const customSidebarWrapper = appLayout.querySelector('#customSidebarWrapper') as HTMLElement | null;
      if (!customSidebarWrapper) {
        buildFn();
      } else {
        const customSidebar = customSidebarWrapper.querySelector('#customSidebar') as HTMLElement | null;
        const customHeader = customSidebarWrapper.querySelector('#customHeaderContainer') as HTMLElement | null;
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
    hassSidebar.style.removeProperty('display');
    appDrawer.style.removeProperty('display');
    appDrawerLayout.style.removeProperty('margin-left');
    appDrawerLayout.style.removeProperty('padding-left');
  } else {
    // Nascondo completamente la sidebar e recupero tutto lo spazio
    hassSidebar.style.display = 'none';
    appDrawer.style.display = 'none';
    appDrawerLayout.style.marginLeft = '0';
    appDrawerLayout.style.paddingLeft = '0';
  }
}

export function isHassSidebarHidden(): boolean {
  const hassSidebar = getSidebar();
  if (!hassSidebar) return false;

  const inline = hassSidebar.style.display;
  const computed = window.getComputedStyle(hassSidebar).display;

  return inline === 'none' || computed === 'none';
}

export function toggleHassSidebar() {
  const currentlyHidden = isHassSidebarHidden();
  setHassSidebarVisible(currentlyHidden);
}

// ------------------------------------------------------------------
//  MOSTRA / NASCONDI TOP MENU
// ------------------------------------------------------------------

export function setTopMenuVisible(visible: boolean) {
  const shadow = getHuiShadowRoot();
  if (!shadow) return;

  const headerEl = shadow.querySelector('div.header') as HTMLElement | null;
  const viewEl   = shadow.querySelector('#view') as HTMLElement | null;
  const headerHost = shadow.querySelector('#customHeaderContainer') as HTMLElement | null;

  if (!headerEl) return;

  if (visible) {
    headerEl.style.display = 'flex';

    if (viewEl) viewEl.style.removeProperty('min-height');

    const h = headerEl.getBoundingClientRect().height || 0;
    if (headerHost) {
      if (!headerHost.style.position) headerHost.style.position = 'sticky';
      headerHost.style.top = `${h}px`;
    }
  } else {
    headerEl.style.display = 'none';

    if (viewEl) viewEl.style.minHeight = 'calc(100vh)';

    if (headerHost) headerHost.style.top = '0px';
  }
}

export function isTopMenuHidden(): boolean {
  const shadow = getHuiShadowRoot();
  if (!shadow) return false;

  const headerEl = shadow.querySelector('div.header') as HTMLElement | null;
  if (!headerEl) return false;

  const inline = headerEl.style.display;
  const computed = window.getComputedStyle(headerEl).display;
  return inline === 'none' || computed === 'none';
}

export function toggleTopMenuRuntime() {
  const hidden = isTopMenuHidden();
  setTopMenuVisible(hidden);
}

// ------------------------------------------------------------------
//  GLOBAL WINDOW HELPERS (per HeaderCard, debug, ecc.)
// ------------------------------------------------------------------

if (typeof window !== 'undefined') {
  (window as any).silvioToggleHaSidebar = () => {
    try {
      toggleHassSidebar();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('silvioToggleHaSidebar error', e);
    }
  };

  (window as any).silvioToggleTopMenu = () => {
    try {
      toggleTopMenuRuntime();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('silvioToggleTopMenu error', e);
    }
  };

  // opzionale ma utile per debug da console:
  (window as any).setTopMenuVisible = (visible: boolean) => setTopMenuVisible(visible);
}
