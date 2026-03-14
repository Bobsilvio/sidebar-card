// src/SidebarCardEditor.ts
// ------------------------------------------------------------------------------------------
//  SIDEBAR-CARD EDITOR – Pannello impostazioni grafiche
//  Apre un dialog overlay per configurare sidebar e header senza editare il YAML
// ------------------------------------------------------------------------------------------

import { css, html, LitElement, CSSResult, TemplateResult } from "lit-element";
import { saveLovelaceConfig } from "./helpers";
import * as YAML from "yaml";

// -------------------------------------------------------
//  YAML helpers
// -------------------------------------------------------
function objToYaml(obj: any): string {
  return YAML.stringify(obj, { lineWidth: 0 }) ?? "";
}

function yamlToObj(text: string): any {
  return YAML.parse(text);
}

// -------------------------------------------------------
//  Tipi
// -------------------------------------------------------
type TabId = "sidebar" | "header" | "yaml";

interface MenuItem {
  action?: string;
  name?: string;
  icon?: string;
  navigation_path?: string;
  entity?: string;
  service?: string;
  service_data?: any;
  url_path?: string;
  background_color?: string;
  icon_color?: string;
  text_color?: string;
  state?: string;
  conditional?: string;
  [key: string]: any;
}

// -------------------------------------------------------
//  Costanti
// -------------------------------------------------------
const ACTION_OPTIONS = [
  { value: "navigate", label: "Navigate" },
  { value: "toggle", label: "Toggle" },
  { value: "more-info", label: "More Info" },
  { value: "call-service", label: "Call Service" },
  { value: "service-js", label: "JavaScript" },
  { value: "url", label: "URL" },
  { value: "toggle-sidebar", label: "Toggle Sidebar" },
  { value: "toggle-topmenu", label: "Toggle Top Menu" },
];

const MENU_STYLE_OPTIONS = [
  { value: "list", label: "List" },
  { value: "wide", label: "Wide" },
  { value: "buttons", label: "Buttons" },
  { value: "grid", label: "Grid" },
];

const TOP_MENU_MODE_OPTIONS = [
  { value: "overlay", label: "Overlay" },
  { value: "push", label: "Push" },
  { value: "flip", label: "Flip" },
];

const HEADER_MENU_POS_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

// -------------------------------------------------------
//  Helpers per determinare a quale config appartiene un menuKey
// -------------------------------------------------------
function menuKeyIsHeader(menuKey: string): boolean {
  return menuKey !== "sidebarMenu";
}

// -------------------------------------------------------
//  Component
// -------------------------------------------------------
export class SidebarCardEditor extends LitElement {
  // -- reactive properties --------------------------------
  hass: any = null;
  _open = false;
  _activeTab: TabId = "sidebar";
  _sidebarConfig: any = {};
  _headerConfig: any = {};
  _dirty = false;
  _saving = false;
  _saveError: string | null = null;

  // Indici espansi per tutti i menu: { sidebarMenu: -1, headerMenu: -1, leftMenu: -1, rightMenu: -1 }
  _expandedIndices: Record<string, number> = {};

  _yamlSidebarText = "";
  _yamlHeaderText = "";
  _yamlError: string | null = null;

  _isYamlMode = false;          // true se il dashboard è in modalità file YAML
  _yamlOutput: string | null = null;  // config generata da copiare (solo yaml mode)
  _copyDone = false;            // feedback visivo copia riuscita

  static get properties() {
    return {
      hass: { type: Object },
      _open: { type: Boolean },
      _activeTab: { type: String },
      _sidebarConfig: { type: Object },
      _headerConfig: { type: Object },
      _dirty: { type: Boolean },
      _saving: { type: Boolean },
      _saveError: { type: String },
      _expandedIndices: { type: Object },
      _yamlSidebarText: { type: String },
      _yamlHeaderText: { type: String },
      _yamlError: { type: String },
      _isYamlMode: { type: Boolean },
      _yamlOutput: { type: String },
      _copyDone: { type: Boolean },
    };
  }

  // =======================================================
  //  PUBLIC API
  // =======================================================

  open(sidebarConfig: any, headerConfig: any, hassObj: any) {
    this._sidebarConfig = JSON.parse(JSON.stringify(sidebarConfig || {}));
    this._headerConfig = JSON.parse(JSON.stringify(headerConfig || {}));
    this.hass = hassObj;
    this._dirty = false;
    this._saving = false;
    this._saveError = null;
    this._expandedIndices = {};
    this._yamlSidebarText = objToYaml(this._sidebarConfig);
    this._yamlHeaderText = objToYaml(this._headerConfig);
    this._yamlError = null;
    this._yamlOutput = null;
    this._copyDone = false;

    // Rileva modalità YAML (dashboard da file, non modificabile via WS)
    const lovelace = (window as any).__sidebarCardLovelace;
    this._isYamlMode = lovelace?.mode === "yaml";

    this._open = true;
  }

  close() {
    this._open = false;
  }

  // =======================================================
  //  SAVE
  // =======================================================

  async _save() {
    // Sync dal tab YAML se attivo
    if (this._activeTab === "yaml") {
      try {
        this._sidebarConfig = yamlToObj(this._yamlSidebarText) ?? {};
        this._headerConfig = yamlToObj(this._yamlHeaderText) ?? {};
        this._yamlError = null;
      } catch (e: any) {
        this._yamlError = "YAML non valido: " + e.message;
        return;
      }
    }

    // YAML mode: genera la config da copiare nel file, non salva via WS
    if (this._isYamlMode) {
      this._yamlOutput = this._buildYamlOutput();
      return;
    }

    // Storage mode: salva direttamente tramite HA WebSocket
    this._saving = true;
    this._saveError = null;
    try {
      await saveLovelaceConfig(this.hass, this._sidebarConfig, this._headerConfig);
      this._dirty = false;
      this.close();
      window.location.reload();
    } catch (err: any) {
      console.error("sidebar-card-editor: save failed", err);
      this._saveError = "Errore nel salvataggio: " + (err.message || String(err));
    } finally {
      this._saving = false;
    }
  }

  // =======================================================
  //  YAML MODE – genera config da incollare nel file
  // =======================================================

  _buildYamlOutput(): string {
    const toYaml = (obj: any, indent: number): string => {
      if (obj === null || obj === undefined) return "null";
      if (typeof obj === "boolean") return obj ? "true" : "false";
      if (typeof obj === "number") return String(obj);
      if (typeof obj === "string") {
        if (/[:{}\[\],&*#?|<>=!%@`\n\r]/.test(obj) || obj.trim() !== obj || obj === "")
          return JSON.stringify(obj);
        return obj;
      }
      if (Array.isArray(obj)) {
        if (obj.length === 0) return "[]";
        const pad = " ".repeat(indent);
        return obj.map(item => {
          if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            const keys = Object.keys(item);
            if (keys.length === 0) return `${pad}- {}`;
            const [first, ...rest] = keys;
            let line = `${pad}- ${first}: ${toYaml(item[first], indent + 2)}`;
            for (const k of rest) line += `\n${pad}  ${k}: ${toYaml(item[k], indent + 2)}`;
            return line;
          }
          return `${pad}- ${toYaml(item, indent + 2)}`;
        }).join("\n");
      }
      if (typeof obj === "object") {
        const keys = Object.keys(obj);
        if (keys.length === 0) return "{}";
        const pad = " ".repeat(indent);
        return keys.map(k => {
          const v = obj[k];
          if (typeof v === "object" && v !== null && Object.keys(v).length > 0)
            return `${pad}${k}:\n${toYaml(v, indent + 2)}`;
          if (Array.isArray(v) && v.length > 0)
            return `${pad}${k}:\n${toYaml(v, indent + 2)}`;
          return `${pad}${k}: ${toYaml(v, indent + 2)}`;
        }).join("\n");
      }
      return String(obj);
    };

    let out = "";
    if (Object.keys(this._sidebarConfig).length > 0)
      out += "sidebar:\n" + toYaml(this._sidebarConfig, 2) + "\n";
    if (Object.keys(this._headerConfig).length > 0) {
      if (out) out += "\n";
      out += "header:\n" + toYaml(this._headerConfig, 2) + "\n";
    }
    return out || "# nessuna configurazione";
  }

  async _copyYamlOutput() {
    if (!this._yamlOutput) return;
    try {
      await navigator.clipboard.writeText(this._yamlOutput);
    } catch {
      const ta = this.shadowRoot?.querySelector(".yaml-copy-ta") as HTMLTextAreaElement | null;
      if (ta) { ta.select(); document.execCommand("copy"); }
    }
    this._copyDone = true;
    setTimeout(() => { this._copyDone = false; }, 2500);
  }


  // =======================================================
  //  HELPERS – CONFIG MUTATION
  // =======================================================

  _setSidebar(key: string, value: any) {
    this._sidebarConfig = { ...this._sidebarConfig, [key]: value };
    this._dirty = true;
  }

  _deleteSidebar(key: string) {
    const nc = { ...this._sidebarConfig };
    delete nc[key];
    this._sidebarConfig = nc;
    this._dirty = true;
  }

  _setHeader(key: string, value: any) {
    this._headerConfig = { ...this._headerConfig, [key]: value };
    this._dirty = true;
  }

  _deleteHeader(key: string) {
    const nc = { ...this._headerConfig };
    delete nc[key];
    this._headerConfig = nc;
    this._dirty = true;
  }

  // -------------------------------------------------------
  //  MENU – accesso generico per qualsiasi menuKey
  // -------------------------------------------------------

  _getExpandedIdx(menuKey: string): number {
    return this._expandedIndices[menuKey] ?? -1;
  }

  _setExpandedIdx(menuKey: string, idx: number) {
    this._expandedIndices = { ...this._expandedIndices, [menuKey]: idx };
  }

  _getMenuItems(menuKey: string): MenuItem[] {
    const cfg = menuKeyIsHeader(menuKey) ? this._headerConfig : this._sidebarConfig;
    return [...(cfg[menuKey] || [])];
  }

  _saveMenuItems(menuKey: string, items: MenuItem[]) {
    if (menuKeyIsHeader(menuKey)) {
      this._headerConfig = { ...this._headerConfig, [menuKey]: items };
    } else {
      this._sidebarConfig = { ...this._sidebarConfig, [menuKey]: items };
    }
    this._dirty = true;
  }

  _setMenuItemField(menuKey: string, index: number, key: string, value: any) {
    const items = this._getMenuItems(menuKey);
    items[index] = { ...items[index], [key]: value };
    this._saveMenuItems(menuKey, items);
  }

  _addMenuItem(menuKey: string) {
    const items = this._getMenuItems(menuKey);
    items.push({
      action: "navigate",
      name: "Nuovo",
      icon: "mdi:home",
      navigation_path: "/lovelace/0",
    });
    this._saveMenuItems(menuKey, items);
    this._setExpandedIdx(menuKey, items.length - 1);
  }

  _removeMenuItem(menuKey: string, index: number) {
    const items = this._getMenuItems(menuKey);
    items.splice(index, 1);
    this._saveMenuItems(menuKey, items);
    this._setExpandedIdx(menuKey, -1);
  }

  _moveMenuItem(menuKey: string, fromIndex: number, direction: number) {
    const items = this._getMenuItems(menuKey);
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= items.length) return;
    const temp = items[fromIndex];
    items[fromIndex] = items[toIndex];
    items[toIndex] = temp;
    this._saveMenuItems(menuKey, items);
    this._setExpandedIdx(menuKey, toIndex);
  }

  // =======================================================
  //  RENDER
  // =======================================================

  render(): TemplateResult {
    if (!this._open) return html``;

    return html`
      <div class="overlay" @click="${this._onOverlayClick}">
        <div class="dialog" @click="${(e: Event) => e.stopPropagation()}">
          <!-- Header -->
          <div class="dialog-header">
            <ha-icon-button
              .label=${"Chiudi"}
              @click="${this.close}"
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
            <span class="dialog-title">Sidebar Card Settings</span>
            <button
              class="save-btn ${this._dirty ? "dirty" : ""}"
              @click="${this._save}"
              ?disabled="${this._saving || !this._dirty}"
            >
              ${this._isYamlMode ? "Genera config" : (this._saving ? "Salvataggio…" : "Salva")}
            </button>
          </div>

          ${this._saveError
            ? html`<div class="error-banner">${this._saveError}</div>`
            : ""}

          ${this._yamlOutput !== null
            ? html`
                <div class="yaml-output-panel">
                  <div class="yaml-output-header">
                    <span>Incolla questo YAML in <code>ui-lovelace.yaml</code></span>
                    <button
                      class="copy-btn ${this._copyDone ? "copied" : ""}"
                      @click="${this._copyYamlOutput}"
                    >
                      <ha-icon icon="${this._copyDone ? "mdi:check" : "mdi:content-copy"}"></ha-icon>
                      ${this._copyDone ? "Copiato!" : "Copia"}
                    </button>
                  </div>
                  <textarea
                    class="yaml-editor yaml-copy-ta"
                    readonly
                    .value="${this._yamlOutput}"
                  ></textarea>
                  <div class="yaml-output-hint">
                    Sostituisci (o aggiungi) le sezioni <code>sidebar:</code> e <code>header:</code>
                    nel tuo file di configurazione Lovelace.
                  </div>
                </div>
              `
            : ""}

          <!-- Tabs -->
          <div class="tabs">
            ${(["sidebar", "header", "yaml"] as TabId[]).map(
              (tab) => html`
                <button
                  class="tab ${this._activeTab === tab ? "active" : ""}"
                  @click="${() => {
                    this._activeTab = tab;
                    if (tab === "yaml") {
                      this._yamlSidebarText = objToYaml(this._sidebarConfig);
                      this._yamlHeaderText = objToYaml(this._headerConfig);
                      this._yamlError = null;
                    }
                  }}"
                >
                  ${tab === "sidebar" ? "Sidebar" : tab === "header" ? "Header" : "YAML"}
                </button>
              `
            )}
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            ${this._activeTab === "sidebar"
              ? this._renderSidebarTab()
              : this._activeTab === "header"
              ? this._renderHeaderTab()
              : this._renderYamlTab()}
          </div>
        </div>
      </div>
    `;
  }

  _onOverlayClick() {
    if (this._dirty) {
      if (confirm("Hai modifiche non salvate. Chiudere senza salvare?")) {
        this.close();
      }
    } else {
      this.close();
    }
  }

  // =======================================================
  //  TAB: SIDEBAR
  // =======================================================

  _renderSidebarTab(): TemplateResult {
    const c = this._sidebarConfig;
    return html`
      <!-- Sezione: Generale -->
      <details open>
        <summary>Generale</summary>
        <div class="section">
          ${this._renderToggle("Abilitato", c.enabled !== false, (v: boolean) =>
            this._setSidebar("enabled", v)
          )}
          ${this._renderText("Titolo", c.title || "", (v: string) =>
            this._setSidebar("title", v)
          )}
          ${this._renderWidthField(c)}
        </div>
      </details>

      <!-- Sezione: Orologio & Data -->
      <details>
        <summary>Orologio & Data</summary>
        <div class="section">
          ${this._renderToggle("Orologio analogico", !!c.clock, (v: boolean) =>
            this._setSidebar("clock", v)
          )}
          ${this._renderToggle("Orologio digitale", !!c.digitalClock, (v: boolean) =>
            this._setSidebar("digitalClock", v)
          )}
          ${c.digitalClock
            ? this._renderToggle("Con secondi", !!c.digitalClockWithSeconds, (v: boolean) =>
                this._setSidebar("digitalClockWithSeconds", v)
              )
            : ""}
          ${this._renderToggle("Formato 12 ore", !!c.twelveHourVersion, (v: boolean) =>
            this._setSidebar("twelveHourVersion", v)
          )}
          ${c.twelveHourVersion
            ? this._renderToggle("Mostra AM/PM", !!c.period, (v: boolean) =>
                this._setSidebar("period", v)
              )
            : ""}
          ${this._renderToggle("Mostra data", c.date !== false, (v: boolean) =>
            this._setSidebar("date", v)
          )}
          ${c.date !== false
            ? this._renderText("Formato data", c.dateFormat || "DD MMMM", (v: string) =>
                this._setSidebar("dateFormat", v)
              )
            : ""}
        </div>
      </details>

      <!-- Sezione: Layout -->
      <details>
        <summary>Layout</summary>
        <div class="section">
          ${this._renderToggle("Nascondi sidebar HA", !!c.hideHassSidebar, (v: boolean) =>
            this._setSidebar("hideHassSidebar", v)
          )}
          ${this._renderToggle("Nascondi top menu", !!c.hideTopMenu, (v: boolean) =>
            this._setSidebar("hideTopMenu", v)
          )}
          ${c.hideTopMenu
            ? this._renderToggle("Mostra top menu su mobile", c.showTopMenuOnMobile !== false, (v: boolean) =>
                this._setSidebar("showTopMenuOnMobile", v)
              )
            : ""}
          ${this._renderSelect("Stile menu", c.menuStyle || "list", MENU_STYLE_OPTIONS, (v: string) =>
            this._setSidebar("menuStyle", v)
          )}
          ${this._renderToggle("Mostra etichette", c.showLabel !== false, (v: boolean) =>
            this._setSidebar("showLabel", v)
          )}
          ${this._renderToggle("Aggiorna menu attivo", c.updateMenu !== false, (v: boolean) =>
            this._setSidebar("updateMenu", v)
          )}
        </div>
      </details>

      <!-- Sezione: Menu Items -->
      <details>
        <summary>Voci del Menu (${(c.sidebarMenu || []).length})</summary>
        <div class="section">
          ${this._renderMenuItems(c.sidebarMenu || [], "sidebarMenu")}
          <button class="add-btn" @click="${() => this._addMenuItem("sidebarMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi voce
          </button>
        </div>
      </details>

      <!-- Sezione: Card in fondo alla sidebar -->
      <details>
        <summary>
          Card in basso (bottomCard)
          ${c.bottomCard ? html`<span class="slot-badge">${c.bottomCard.type || "?"}</span>` : ""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(
            c.bottomCard ?? null,
            (v) => v ? this._setSidebar("bottomCard", v) : this._deleteSidebar("bottomCard"),
            "vertical-stack"
          )}
        </div>
      </details>

      <!-- Sezione: CSS personalizzato -->
      <details>
        <summary>Stile CSS personalizzato</summary>
        <div class="section">
          <div class="css-hint">Inserisci CSS che verrà iniettato nella sidebar.</div>
          <textarea
            class="yaml-editor css-editor"
            .value="${c.style || ""}"
            @input="${(e: Event) => {
              const v = (e.target as HTMLTextAreaElement).value;
              if (v.trim()) this._setSidebar("style", v);
              else this._deleteSidebar("style");
            }}"
            spellcheck="false"
            placeholder="/* es: .sidebar-inner { background: #1a1a2e; } */"
          ></textarea>
        </div>
      </details>
    `;
  }

  // =======================================================
  //  TAB: HEADER
  // =======================================================

  _renderHeaderTab(): TemplateResult {
    const c = this._headerConfig;
    return html`
      <!-- Sezione: Generale -->
      <details open>
        <summary>Generale</summary>
        <div class="section">
          ${this._renderToggle("Abilitato", c.enabled !== false, (v: boolean) =>
            this._setHeader("enabled", v)
          )}
          ${this._renderToggle("Sticky", c.sticky !== false, (v: boolean) =>
            this._setHeader("sticky", v)
          )}
          ${this._renderNumber("Altezza minima (px)", c.height || 72, (v: number) =>
            this._setHeader("height", v)
          )}
          ${this._renderText("Titolo", c.title || "", (v: string) =>
            this._setHeader("title", v)
          )}
        </div>
      </details>

      <!-- Sezione: Top Menu Mode -->
      <details>
        <summary>Modalità Top Menu</summary>
        <div class="section">
          ${this._renderSelect("Modalità", c.topMenuMode || "overlay", TOP_MENU_MODE_OPTIONS, (v: string) =>
            this._setHeader("topMenuMode", v)
          )}
          ${c.topMenuMode === "flip"
            ? this._renderNumber("Durata flip (sec)", c.flipDuration || 5, (v: number) =>
                this._setHeader("flipDuration", v)
              )
            : ""}
        </div>
      </details>

      <!-- Sezione: Card Slot Sinistra -->
      <details>
        <summary>
          Card Sinistra (leftCard)
          ${c.leftCard ? html`<span class="slot-badge">${c.leftCard.type || "?"}</span>` : ""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(
            c.leftCard ?? null,
            (v) => v ? this._setHeader("leftCard", v) : this._deleteHeader("leftCard"),
            "horizontal-stack"
          )}
        </div>
      </details>

      <!-- Sezione: Card Slot Centro -->
      <details>
        <summary>
          Card Centro (centerCard)
          ${c.centerCard ? html`<span class="slot-badge">${c.centerCard.type || "?"}</span>` : ""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(
            c.centerCard ?? null,
            (v) => v ? this._setHeader("centerCard", v) : this._deleteHeader("centerCard"),
            "horizontal-stack"
          )}
        </div>
      </details>

      <!-- Sezione: Card Slot Destra -->
      <details>
        <summary>
          Card Destra (rightCard)
          ${c.rightCard ? html`<span class="slot-badge">${c.rightCard.type || "?"}</span>` : ""}
        </summary>
        <div class="section">
          ${this._renderCardSlot(
            c.rightCard ?? null,
            (v) => v ? this._setHeader("rightCard", v) : this._deleteHeader("rightCard"),
            "horizontal-stack"
          )}
        </div>
      </details>

      <!-- Sezione: Menu Header Centrale -->
      <details>
        <summary>Menu Header (${(c.headerMenu || []).length} voci)</summary>
        <div class="section">
          ${this._renderSelect("Stile menu", c.headerMenuStyle || "wide", MENU_STYLE_OPTIONS, (v: string) =>
            this._setHeader("headerMenuStyle", v)
          )}
          ${this._renderToggle("Mostra etichette", c.headerMenuShowLabel !== false, (v: boolean) =>
            this._setHeader("headerMenuShowLabel", v)
          )}
          ${this._renderSelect("Posizione", c.headerMenuPosition || "right", HEADER_MENU_POS_OPTIONS, (v: string) =>
            this._setHeader("headerMenuPosition", v)
          )}
          <div class="menu-subsection-label">Voci</div>
          ${this._renderMenuItems(c.headerMenu || [], "headerMenu")}
          <button class="add-btn" @click="${() => this._addMenuItem("headerMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi voce
          </button>
        </div>
      </details>

      <!-- Sezione: Menu icone a sinistra -->
      <details>
        <summary>Menu Icone Sinistra (leftMenu – ${(c.leftMenu || []).length} voci)</summary>
        <div class="section">
          <div class="css-hint">Bottoni icona visualizzati nell'area sinistra dell'header.</div>
          ${this._renderMenuItems(c.leftMenu || [], "leftMenu")}
          <button class="add-btn" @click="${() => this._addMenuItem("leftMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi icona
          </button>
        </div>
      </details>

      <!-- Sezione: Menu icone a destra -->
      <details>
        <summary>Menu Icone Destra (rightMenu – ${(c.rightMenu || []).length} voci)</summary>
        <div class="section">
          <div class="css-hint">Bottoni icona visualizzati nell'area destra dell'header.</div>
          ${this._renderMenuItems(c.rightMenu || [], "rightMenu")}
          <button class="add-btn" @click="${() => this._addMenuItem("rightMenu")}">
            <ha-icon icon="mdi:plus"></ha-icon> Aggiungi icona
          </button>
        </div>
      </details>

      <!-- Sezione: CSS personalizzato -->
      <details>
        <summary>Stile CSS personalizzato</summary>
        <div class="section">
          <div class="css-hint">Inserisci CSS che verrà iniettato nell'header.</div>
          <textarea
            class="yaml-editor css-editor"
            .value="${c.style || ""}"
            @input="${(e: Event) => {
              const v = (e.target as HTMLTextAreaElement).value;
              if (v.trim()) this._setHeader("style", v);
              else this._deleteHeader("style");
            }}"
            spellcheck="false"
            placeholder="/* es: .header-inner { background: linear-gradient(...); } */"
          ></textarea>
        </div>
      </details>
    `;
  }

  // =======================================================
  //  TAB: YAML
  // =======================================================

  _renderYamlTab(): TemplateResult {
    return html`
      ${this._yamlError
        ? html`<div class="error-banner">${this._yamlError}</div>`
        : ""}

      <details open>
        <summary>Sidebar (YAML)</summary>
        <div class="section">
          <textarea
            class="yaml-editor"
            .value="${this._yamlSidebarText}"
            @input="${(e: Event) => {
              this._yamlSidebarText = (e.target as HTMLTextAreaElement).value;
              this._dirty = true;
              this._yamlError = null;
            }}"
            spellcheck="false"
          ></textarea>
        </div>
      </details>

      <details open>
        <summary>Header (YAML)</summary>
        <div class="section">
          <textarea
            class="yaml-editor"
            .value="${this._yamlHeaderText}"
            @input="${(e: Event) => {
              this._yamlHeaderText = (e.target as HTMLTextAreaElement).value;
              this._dirty = true;
              this._yamlError = null;
            }}"
            spellcheck="false"
          ></textarea>
        </div>
      </details>
    `;
  }

  // =======================================================
  //  CARD SLOT RENDERER
  // =======================================================

  _renderCardSlot(
    cardConfig: any | null,
    onSet: (v: any | null) => void,
    fixedType?: string
  ): TemplateResult {
    const currentType = cardConfig?.type;
    const isExistingStack =
      currentType === "horizontal-stack" || currentType === "vertical-stack";
    const useStackEditor = isExistingStack || (!!fixedType && !cardConfig);
    const stackType: string =
      isExistingStack ? currentType : (fixedType ?? "horizontal-stack");

    // ── Stack editor (horizontal-stack / vertical-stack) ──────────────────
    if (useStackEditor) {
      const cards: any[] = cardConfig?.cards ?? [];

      const doAddCard = () => {
        const newCards = [
          ...cards,
          { type: "custom:button-card", show_name: false, show_icon: true },
        ];
        onSet({ type: stackType, cards: newCards });
      };

      const doRemoveCard = (idx: number) => {
        const newCards = cards.filter((_: any, i: number) => i !== idx);
        onSet({ type: stackType, cards: newCards });
      };

      const doMoveCard = (idx: number, dir: number) => {
        const newCards = [...cards];
        const to = idx + dir;
        if (to < 0 || to >= newCards.length) return;
        [newCards[idx], newCards[to]] = [newCards[to], newCards[idx]];
        onSet({ type: stackType, cards: newCards });
      };

      const doUpdateCard = (idx: number, yamlStr: string) => {
        try {
          const parsed = yamlToObj(yamlStr);
          if (!parsed || typeof parsed !== "object") return;
          const newCards = [...cards];
          newCards[idx] = parsed;
          onSet({ type: stackType, cards: newCards });
        } catch { /* YAML non valido — ignora */ }
      };

      return html`
        <div class="card-slot">

          <!-- ── Intestazione slot ── -->
          <div class="stack-slot-header">
            <ha-icon icon="mdi:layers-outline" class="stack-slot-icon"></ha-icon>
            <div class="stack-slot-info">
              <span class="stack-type-badge">${stackType}</span>
              <span class="stack-card-count">${cards.length} card</span>
            </div>
            ${cardConfig
              ? html`
                  <button class="stack-remove-slot-btn" @click="${() => onSet(null)}">
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                    Rimuovi slot
                  </button>
                `
              : ""}
          </div>

          <!-- ── Stato vuoto ── -->
          ${cards.length === 0 ? html`
            <div class="stack-empty-state">
              <ha-icon icon="mdi:card-plus-outline"></ha-icon>
              <span>Stack vuota — clicca <strong>Aggiungi card</strong> per iniziare</span>
            </div>
          ` : ""}

          <!-- ── Card collassabili ── -->
          ${cards.map((card: any, idx: number) => html`
            <details class="stack-card-details">
              <summary class="stack-card-summary" @click="${(e: Event) => e.stopPropagation()}">

                <!-- Numero circolare -->
                <span class="stack-card-num">${idx + 1}</span>

                <!-- Tipo card -->
                <span class="stack-card-type-label">${card.type || "(tipo mancante)"}</span>

                <!-- Frecce riordina -->
                <div class="stack-card-move" @click="${(e: Event) => e.stopPropagation()}">
                  <button
                    class="stack-move-btn"
                    @click="${(e: Event) => { e.preventDefault(); doMoveCard(idx, -1); }}"
                    ?disabled="${idx === 0}"
                    title="Sposta su"
                  >▲</button>
                  <button
                    class="stack-move-btn"
                    @click="${(e: Event) => { e.preventDefault(); doMoveCard(idx, 1); }}"
                    ?disabled="${idx === cards.length - 1}"
                    title="Sposta giù"
                  >▼</button>
                </div>

                <!-- Elimina -->
                <button
                  class="stack-delete-btn"
                  @click="${(e: Event) => { e.preventDefault(); doRemoveCard(idx); }}"
                  title="Elimina card"
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                  Elimina
                </button>

                <!-- Chevron expand -->
                <ha-icon class="stack-chevron" icon="mdi:chevron-down"></ha-icon>
              </summary>

              <!-- Corpo: editor YAML -->
              <div class="stack-card-body">
                <div class="stack-card-body-hint">
                  YAML della card · modifica e clicca fuori (Tab/click) per applicare
                </div>
                <textarea
                  class="stack-card-editor"
                  .value="${objToYaml(card)}"
                  @change="${(e: Event) =>
                    doUpdateCard(idx, (e.target as HTMLTextAreaElement).value)}"
                  spellcheck="false"
                ></textarea>
              </div>
            </details>
          `)}

          <!-- ── Aggiungi card ── -->
          <button class="stack-add-btn" @click="${doAddCard}">
            <ha-icon icon="mdi:plus"></ha-icon>
            Aggiungi card
          </button>

        </div>
      `;
    }

    // ── Fallback: YAML editor per card singola (tipo non-stack) ───────────
    const hasCard = cardConfig && typeof cardConfig === "object" && cardConfig.type;
    const yamlStr = hasCard
      ? objToYaml(cardConfig)
      : "type: custom:my-card\n";

    return html`
      <div class="card-slot">
        ${hasCard
          ? html`
              <div class="card-slot-active">
                <div class="card-slot-type-row">
                  <ha-icon icon="mdi:card-outline" class="card-slot-icon"></ha-icon>
                  <span class="card-slot-type">${cardConfig.type}</span>
                  <button
                    class="small-btn danger-btn"
                    @click="${() => onSet(null)}"
                    title="Rimuovi card"
                  >
                    <ha-icon icon="mdi:delete"></ha-icon> Rimuovi
                  </button>
                </div>
                <textarea
                  class="yaml-editor card-json-editor"
                  .value="${yamlStr}"
                  @change="${(e: Event) => {
                    try {
                      const parsed = yamlToObj((e.target as HTMLTextAreaElement).value);
                      if (parsed && typeof parsed === "object") onSet(parsed);
                    } catch {
                      // YAML invalido — non aggiornare
                    }
                  }}"
                  spellcheck="false"
                  rows="6"
                ></textarea>
                <div class="card-slot-hint">Modifica il YAML e premi Tab/click fuori per applicare.</div>
              </div>
            `
          : html`
              <div class="card-slot-empty">
                <ha-icon icon="mdi:card-plus-outline" class="card-slot-empty-icon"></ha-icon>
                <span>Nessuna card configurata</span>
                <button
                  class="small-btn"
                  @click="${() => onSet({ type: fixedType ?? "custom:my-card" })}"
                >
                  <ha-icon icon="mdi:plus"></ha-icon> Aggiungi card
                </button>
              </div>
            `}
      </div>
    `;
  }

  // =======================================================
  //  MENU ITEMS RENDERER (generico per tutti i menu)
  // =======================================================

  _renderMenuItems(items: MenuItem[], menuKey: string): TemplateResult {
    const expandedIdx = this._getExpandedIdx(menuKey);

    return html`
      <div class="menu-items-list">
        ${items.map((item, idx) => {
          const isExpanded = expandedIdx === idx;
          return html`
            <div class="menu-item-row ${isExpanded ? "expanded" : ""}">
              <!-- Header row -->
              <div class="menu-item-header" @click="${() => {
                this._setExpandedIdx(menuKey, isExpanded ? -1 : idx);
              }}">
                <div class="menu-item-arrows">
                  <ha-icon-button
                    .label=${"Su"}
                    @click="${(e: Event) => { e.stopPropagation(); this._moveMenuItem(menuKey, idx, -1); }}"
                    ?disabled="${idx === 0}"
                  >
                    <ha-icon icon="mdi:arrow-up"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    .label=${"Giù"}
                    @click="${(e: Event) => { e.stopPropagation(); this._moveMenuItem(menuKey, idx, 1); }}"
                    ?disabled="${idx === items.length - 1}"
                  >
                    <ha-icon icon="mdi:arrow-down"></ha-icon>
                  </ha-icon-button>
                </div>
                <ha-icon
                  class="menu-item-icon"
                  icon="${item.icon || "mdi:help-circle"}"
                ></ha-icon>
                <span class="menu-item-name">${item.name || "(senza nome)"}</span>
                <span class="menu-item-action-badge">${item.action || "navigate"}</span>
                <ha-icon-button
                  .label=${"Elimina"}
                  class="delete-btn"
                  @click="${(e: Event) => { e.stopPropagation(); this._removeMenuItem(menuKey, idx); }}"
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
                <ha-icon
                  class="expand-chevron"
                  icon="${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}"
                ></ha-icon>
              </div>

              <!-- Expanded detail -->
              ${isExpanded ? this._renderMenuItemDetail(item, idx, menuKey) : ""}
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderMenuItemDetail(item: MenuItem, index: number, menuKey: string): TemplateResult {
    const action = item.action || "navigate";
    const set = (key: string, v: any) => this._setMenuItemField(menuKey, index, key, v);

    return html`
      <div class="menu-item-detail">
        ${this._renderText("Nome", item.name || "", (v: string) => set("name", v))}

        <div class="field-row">
          <label>Icona</label>
          <div class="icon-picker-row">
            <ha-icon icon="${item.icon || "mdi:home"}"></ha-icon>
            <input
              type="text"
              .value="${item.icon || ""}"
              placeholder="mdi:home"
              @change="${(e: Event) =>
                set("icon", (e.target as HTMLInputElement).value)}"
            />
          </div>
        </div>

        ${this._renderSelect("Azione", action, ACTION_OPTIONS, (v: string) => set("action", v))}

        ${action === "navigate"
          ? this._renderText("Percorso", item.navigation_path || "", (v: string) =>
              set("navigation_path", v)
            )
          : ""}

        ${action === "toggle" || action === "more-info"
          ? this._renderText("Entità", item.entity || "", (v: string) =>
              set("entity", v)
            )
          : ""}

        ${action === "call-service"
          ? html`
              ${this._renderText("Servizio", item.service || "", (v: string) =>
                set("service", v)
              )}
              <div class="field-row">
                <label>Service Data (YAML)</label>
                <textarea
                  class="service-data-editor"
                  .value="${objToYaml(item.service_data || {})}"
                  @change="${(e: Event) => {
                    try {
                      const parsed = yamlToObj((e.target as HTMLTextAreaElement).value);
                      if (parsed !== null && parsed !== undefined) set("service_data", parsed);
                    } catch {}
                  }}"
                  spellcheck="false"
                ></textarea>
              </div>
            `
          : ""}

        ${action === "service-js"
          ? html`
              <div class="field-row">
                <label>Codice JS</label>
                <textarea
                  class="service-data-editor"
                  .value="${item.service || ""}"
                  placeholder="// es: navigate(window, '/lovelace/0')"
                  @change="${(e: Event) =>
                    set("service", (e.target as HTMLTextAreaElement).value)}"
                  spellcheck="false"
                ></textarea>
              </div>
            `
          : ""}

        ${action === "url"
          ? this._renderText("URL", item.url_path || "", (v: string) =>
              set("url_path", v)
            )
          : ""}

        <!-- Colori -->
        <details class="color-section">
          <summary>Colori (opzionale)</summary>
          <div class="color-fields">
            ${this._renderColor("Sfondo", item.background_color || "", (v: string) =>
              set("background_color", v || undefined)
            )}
            ${this._renderColor("Icona", item.icon_color || "", (v: string) =>
              set("icon_color", v || undefined)
            )}
            ${this._renderColor("Testo", item.text_color || "", (v: string) =>
              set("text_color", v || undefined)
            )}
          </div>
        </details>

        <!-- Stato & Condizionale (avanzato) -->
        <details class="advanced-section">
          <summary>Avanzato</summary>
          <div class="section">
            ${this._renderText("State entity", item.state || "", (v: string) =>
              set("state", v)
            )}
            ${this._renderText("Condizione (template)", item.conditional || "", (v: string) =>
              set("conditional", v)
            )}
          </div>
        </details>
      </div>
    `;
  }

  // =======================================================
  //  FIELD RENDERERS
  // =======================================================

  _renderToggle(label: string, checked: boolean, onChange: (v: boolean) => void): TemplateResult {
    return html`
      <div class="field-row">
        <label>${label}</label>
        <ha-switch
          .checked="${checked}"
          @change="${(e: Event) => onChange((e.target as any).checked)}"
        ></ha-switch>
      </div>
    `;
  }

  _renderText(label: string, value: string, onChange: (v: string) => void): TemplateResult {
    return html`
      <div class="field-row">
        <label>${label}</label>
        <input
          type="text"
          .value="${value}"
          @change="${(e: Event) => onChange((e.target as HTMLInputElement).value)}"
        />
      </div>
    `;
  }

  _renderNumber(label: string, value: number, onChange: (v: number) => void): TemplateResult {
    return html`
      <div class="field-row">
        <label>${label}</label>
        <input
          type="number"
          .value="${String(value)}"
          @change="${(e: Event) => onChange(Number((e.target as HTMLInputElement).value))}"
        />
      </div>
    `;
  }

  _renderSelect(
    label: string,
    value: string,
    options: Array<{ value: string; label: string }>,
    onChange: (v: string) => void
  ): TemplateResult {
    return html`
      <div class="field-row">
        <label>${label}</label>
        <select
          .value="${value}"
          @change="${(e: Event) => onChange((e.target as HTMLSelectElement).value)}"
        >
          ${options.map(
            (opt) =>
              html`<option value="${opt.value}" ?selected="${opt.value === value}">${opt.label}</option>`
          )}
        </select>
      </div>
    `;
  }

  _renderColor(label: string, value: string, onChange: (v: string) => void): TemplateResult {
    return html`
      <div class="color-field">
        <label>${label}</label>
        <div class="color-input-wrap">
          <input
            type="color"
            .value="${value || "#000000"}"
            @input="${(e: Event) => onChange((e.target as HTMLInputElement).value)}"
          />
          <input
            type="text"
            class="color-text"
            .value="${value}"
            placeholder="nessuno"
            @change="${(e: Event) => onChange((e.target as HTMLInputElement).value)}"
          />
          ${value
            ? html`<button class="color-clear" @click="${() => onChange("")}" title="Rimuovi">✕</button>`
            : ""}
        </div>
      </div>
    `;
  }

  _renderWidthField(c: any): TemplateResult {
    const width = c.width;
    const isResponsive = typeof width === "object" && width !== null;

    return html`
      <div class="field-row">
        <label>Larghezza (%)</label>
        <div class="width-control">
          ${isResponsive
            ? html`
                <div class="width-responsive">
                  <div class="width-responsive-row">
                    <span>Mobile:</span>
                    <input type="number" .value="${String(width.mobile ?? 0)}"
                      @change="${(e: Event) => {
                        const val = Number((e.target as HTMLInputElement).value);
                        this._setSidebar("width", { ...width, mobile: val });
                      }}" />
                  </div>
                  <div class="width-responsive-row">
                    <span>Tablet:</span>
                    <input type="number" .value="${String(width.tablet ?? 16)}"
                      @change="${(e: Event) => {
                        const val = Number((e.target as HTMLInputElement).value);
                        this._setSidebar("width", { ...width, tablet: val });
                      }}" />
                  </div>
                  <div class="width-responsive-row">
                    <span>Desktop:</span>
                    <input type="number" .value="${String(width.desktop ?? 18)}"
                      @change="${(e: Event) => {
                        const val = Number((e.target as HTMLInputElement).value);
                        this._setSidebar("width", { ...width, desktop: val });
                      }}" />
                  </div>
                  <button class="small-btn" @click="${() => this._setSidebar("width", width.desktop ?? 18)}">
                    Usa valore fisso
                  </button>
                </div>
              `
            : html`
                <input type="number" .value="${String(width ?? 18)}"
                  @change="${(e: Event) =>
                    this._setSidebar("width", Number((e.target as HTMLInputElement).value))}" />
                <button class="small-btn" @click="${() =>
                  this._setSidebar("width", { mobile: 0, tablet: width ?? 16, desktop: width ?? 18 })}">
                  Responsive
                </button>
              `}
        </div>
      </div>
    `;
  }

  // =======================================================
  //  STYLES
  // =======================================================

  static get styles(): CSSResult {
    return css`
      /* ══ Variabili tema ══════════════════════════════════════════ */
      :host {
        --editor-bg:       var(--card-background-color, #ffffff);
        --editor-page-bg:  var(--secondary-background-color, #f0f4f8);
        --editor-text:     var(--primary-text-color, #1a202c);
        --editor-secondary:var(--secondary-text-color, #64748b);
        --editor-primary:  var(--primary-color, #0288d1);
        --editor-divider:  var(--divider-color, rgba(0,0,0,0.09));
        --editor-surface:  var(--ha-card-background, var(--card-background-color, #fff));
        --editor-error:    var(--error-color, #e53e3e);
        --editor-success:  #38a169;
        --editor-shadow:   0 2px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06);
        --editor-radius:   12px;
      }

      /* ══ Overlay ═════════════════════════════════════════════════ */
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
      }

      /* ══ Dialog ══════════════════════════════════════════════════ */
      .dialog {
        background: var(--editor-page-bg);
        color: var(--editor-text);
        border-radius: var(--editor-radius);
        width: 95vw;
        max-width: 860px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.15);
      }
      @media (max-width: 500px) {
        .dialog { width:100vw; height:100vh; max-height:100vh; border-radius:0; }
      }

      /* ══ Dialog header (gradiente blu) ═══════════════════════════ */
      .dialog-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 18px;
        background: linear-gradient(135deg, #1565c0 0%, #0288d1 100%);
        flex-shrink: 0;
      }
      .dialog-header ha-icon-button {
        --mdc-icon-button-size: 36px;
        --mdc-icon-size: 20px;
        color: rgba(255,255,255,0.85);
      }
      .dialog-header ha-icon-button:hover {
        --mdc-icon-button-color: rgba(255,255,255,1);
      }
      .dialog-title {
        flex: 1;
        font-size: 17px;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.2px;
      }
      .save-btn {
        border: 2px solid rgba(255,255,255,0.45);
        background: rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.6);
        padding: 7px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: not-allowed;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .save-btn.dirty {
        background: #fff;
        border-color: #fff;
        color: #1565c0;
        cursor: pointer;
        box-shadow: 0 3px 12px rgba(0,0,0,0.25);
      }
      .save-btn:disabled {
        cursor: not-allowed;
      }

      /* ══ Error banner ════════════════════════════════════════════ */
      .error-banner {
        background: var(--editor-error);
        color: #fff;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 500;
        flex-shrink: 0;
      }

      /* ══ Tabs (pill style su sfondo grigio) ══════════════════════ */
      .tabs {
        display: flex;
        gap: 6px;
        padding: 10px 18px;
        background: var(--editor-page-bg);
        flex-shrink: 0;
      }
      .tab {
        flex: 1;
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        background: rgba(0,0,0,0.06);
        font-size: 13px;
        font-weight: 600;
        color: var(--editor-secondary);
        cursor: pointer;
        transition: all 0.18s;
        letter-spacing: 0.2px;
      }
      .tab:hover { background: rgba(0,0,0,0.10); }
      .tab.active {
        background: var(--editor-bg);
        color: var(--editor-primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.14);
      }

      /* ══ Tab content ═════════════════════════════════════════════ */
      .tab-content {
        overflow-y: auto;
        flex: 1;
        padding: 4px 14px 20px;
        background: var(--editor-page-bg);
      }

      /* ══ Sezioni come card (details principali) ══════════════════ */
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) {
        background: var(--editor-bg);
        border-radius: var(--editor-radius);
        margin-top: 10px;
        border: none;
        box-shadow: var(--editor-shadow);
        overflow: hidden;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary {
        padding: 14px 18px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        color: var(--editor-text);
        user-select: none;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 2px solid transparent;
        transition: background 0.15s;
        list-style: none;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary::marker,
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary::-webkit-details-marker {
        display: none;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary:hover {
        background: rgba(2,136,209,0.04);
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details)[open] > summary {
        border-bottom-color: var(--editor-divider);
        color: var(--editor-primary);
      }
      /* Chevron auto nella summary */
      details:not(.advanced-section):not(.color-section):not(.stack-card-details) > summary::after {
        content: "›";
        font-size: 20px;
        font-weight: 400;
        color: var(--editor-secondary);
        margin-left: auto;
        transition: transform 0.18s;
        line-height: 1;
      }
      details:not(.advanced-section):not(.color-section):not(.stack-card-details)[open] > summary::after {
        transform: rotate(90deg);
      }

      /* Badge tipo card nella summary */
      .slot-badge {
        font-size: 10px;
        font-weight: 700;
        color: var(--editor-primary);
        background: rgba(2,136,209,0.12);
        padding: 2px 8px;
        border-radius: 10px;
        letter-spacing: 0.3px;
      }

      /* ══ Section (contenuto delle card) ══════════════════════════ */
      .section {
        padding: 4px 0 12px;
      }

      /* ══ Field rows ══════════════════════════════════════════════ */
      .field-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 18px;
        gap: 14px;
        min-height: 44px;
        border-bottom: 1px solid var(--editor-divider);
      }
      .field-row:last-child { border-bottom: none; }
      .field-row label {
        font-size: 13px;
        font-weight: 500;
        color: var(--editor-text);
        flex-shrink: 0;
        min-width: 130px;
      }
      .field-row input[type="text"],
      .field-row input[type="number"] {
        flex: 1;
        min-width: 0;
        padding: 7px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .field-row input[type="text"]:focus,
      .field-row input[type="number"]:focus {
        border-color: var(--editor-primary);
        background: var(--editor-bg);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }
      .field-row select {
        flex: 1;
        min-width: 0;
        padding: 7px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
        transition: border-color 0.15s;
        cursor: pointer;
      }
      .field-row select:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }
      .field-row ha-switch {
        --mdc-theme-secondary: var(--editor-primary);
      }

      /* ══ Icon picker ═════════════════════════════════════════════ */
      .icon-picker-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
      }
      .icon-picker-row ha-icon { --mdc-icon-size: 22px; color: var(--editor-secondary); }
      .icon-picker-row input {
        flex: 1;
        padding: 7px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
      }
      .icon-picker-row input:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }

      /* ══ Width controls ══════════════════════════════════════════ */
      .width-control { flex:1; display:flex; align-items:center; gap:8px; }
      .width-control input[type="number"] {
        width: 72px;
        padding: 7px 10px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
      }
      .width-responsive { display:flex; flex-direction:column; gap:4px; flex:1; }
      .width-responsive-row { display:flex; align-items:center; gap:8px; }
      .width-responsive-row span { font-size:12px; color:var(--editor-secondary); width:60px; }
      .width-responsive-row input {
        width: 64px;
        padding: 5px 8px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 6px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        font-size: 13px;
        outline: none;
      }

      /* ══ Pulsanti generici ═══════════════════════════════════════ */
      .small-btn {
        padding: 5px 12px;
        font-size: 12px;
        font-weight: 500;
        border: 1.5px solid var(--editor-divider);
        border-radius: 7px;
        background: var(--editor-bg);
        color: var(--editor-primary);
        cursor: pointer;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: background 0.13s, border-color 0.13s;
      }
      .small-btn:hover { background: rgba(2,136,209,0.08); border-color: var(--editor-primary); }
      .danger-btn { color: var(--editor-error) !important; border-color: rgba(229,62,62,0.45) !important; }
      .danger-btn:hover { background: rgba(229,62,62,0.08) !important; }

      /* ══ Sezioni colori e avanzate (nested) ══════════════════════ */
      .color-section,
      .advanced-section {
        border: none;
        background: none;
        box-shadow: none;
        border-radius: 0;
        margin: 0;
      }
      .color-section summary,
      .advanced-section summary {
        font-size: 12px;
        font-weight: 600;
        color: var(--editor-secondary);
        padding: 6px 0;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        gap: 6px;
        list-style: none;
      }
      .color-section summary::after,
      .advanced-section summary::after { display: none; }
      .color-fields { display:flex; gap:12px; flex-wrap:wrap; padding-bottom:8px; }
      .color-field { display:flex; flex-direction:column; gap:4px; }
      .color-field label { font-size:11px; color:var(--editor-secondary); }
      .color-input-wrap { display:flex; align-items:center; gap:4px; }
      .color-input-wrap input[type="color"] {
        width:28px; height:28px;
        border: 1.5px solid var(--editor-divider);
        border-radius:6px; padding:2px;
        cursor:pointer; background:var(--editor-surface);
      }
      .color-text {
        width:76px; padding:5px 8px; font-size:12px;
        border: 1.5px solid var(--editor-divider);
        border-radius:6px;
        background: var(--editor-surface);
        color: var(--editor-text);
        outline: none;
      }
      .color-clear {
        border:none; background:none;
        color:var(--editor-secondary); cursor:pointer;
        font-size:14px; padding:0 4px;
      }

      /* ══ Aggiungi voce menu ═══════════════════════════════════════ */
      .add-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
        padding: 10px 14px;
        border: 2px dashed rgba(2,136,209,0.35);
        border-radius: 10px;
        background: none;
        color: var(--editor-primary);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        justify-content: center;
        transition: background 0.15s, border-color 0.15s;
        box-sizing: border-box;
      }
      .add-btn:hover { background: rgba(2,136,209,0.07); border-color: var(--editor-primary); }
      .add-btn ha-icon { --mdc-icon-size: 18px; }

      /* ══ Menu items list ════════════════════════════════════════ */
      .menu-items-list { display:flex; flex-direction:column; gap:6px; }
      .menu-item-row {
        border: 1.5px solid var(--editor-divider);
        border-radius: 10px;
        overflow: hidden;
        background: var(--editor-bg);
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .menu-item-row.expanded {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.10);
      }
      .menu-item-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        cursor: pointer;
        user-select: none;
        min-height: 44px;
      }
      .menu-item-header:hover { background: rgba(0,0,0,0.03); }
      .menu-item-arrows { display:flex; flex-direction:column; }
      .menu-item-arrows ha-icon-button { --mdc-icon-button-size:24px; --mdc-icon-size:14px; color:var(--editor-secondary); }
      .menu-item-icon { --mdc-icon-size:20px; color:var(--editor-secondary); flex-shrink:0; }
      .menu-item-name { flex:1; font-size:13px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .menu-item-action-badge {
        font-size: 10px;
        font-weight: 600;
        color: var(--editor-secondary);
        background: rgba(0,0,0,0.07);
        padding: 2px 8px;
        border-radius: 8px;
        flex-shrink: 0;
      }
      .delete-btn { --mdc-icon-button-size:30px; --mdc-icon-size:17px; color:var(--editor-error); }
      .expand-chevron { --mdc-icon-size:18px; color:var(--editor-secondary); flex-shrink:0; }
      .menu-item-detail {
        padding: 12px 16px 16px;
        border-top: 1px solid var(--editor-divider);
        background: var(--editor-page-bg);
      }
      .menu-subsection-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--editor-secondary);
        text-transform: uppercase;
        letter-spacing: 0.7px;
        margin: 12px 0 8px;
      }

      /* ══ Service data / codice JS ═══════════════════════════════ */
      .service-data-editor {
        width: 100%;
        min-height: 70px;
        padding: 8px 12px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        font-family: "Roboto Mono","Consolas",monospace;
        font-size: 12px;
        background: var(--editor-page-bg);
        color: var(--editor-text);
        resize: vertical;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s;
      }
      .service-data-editor:focus { border-color: var(--editor-primary); }

      /* ══ YAML / JSON editor (tab YAML) ══════════════════════════ */
      .yaml-editor {
        width: 100%;
        min-height: 300px;
        padding: 14px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 10px;
        font-family: "Roboto Mono","Consolas",monospace;
        font-size: 13px;
        line-height: 1.55;
        background: var(--editor-bg);
        color: var(--editor-text);
        resize: vertical;
        tab-size: 2;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .yaml-editor:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(2,136,209,0.12);
      }
      .css-editor { min-height: 130px; font-size: 12px; }
      .css-hint {
        font-size: 12px;
        color: var(--editor-secondary);
        margin-bottom: 8px;
        font-style: italic;
      }

      /* ══ Card slot (non-stack) ══════════════════════════════════ */
      .card-slot { margin: 6px 0 4px; }
      .card-slot-active { display:flex; flex-direction:column; gap:10px; }
      .card-slot-type-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: rgba(2,136,209,0.07);
        border-radius: 8px;
        border: 1.5px solid rgba(2,136,209,0.20);
      }
      .card-slot-icon { --mdc-icon-size:20px; color:var(--editor-primary); flex-shrink:0; }
      .card-slot-type { flex:1; font-size:13px; font-weight:600; color:var(--editor-primary); font-family:"Roboto Mono",monospace; }
      .card-json-editor { min-height:130px; font-size:12px; }
      .card-slot-hint { font-size:11px; color:var(--editor-secondary); font-style:italic; }
      .card-slot-empty {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border: 2px dashed var(--editor-divider);
        border-radius: 10px;
        color: var(--editor-secondary);
        font-size: 13px;
      }
      .card-slot-empty-icon { --mdc-icon-size:24px; color:var(--editor-divider); }

      /* ══════════════════════════════════════════════════
         STACK SLOT  (horizontal-stack / vertical-stack)
         ══════════════════════════════════════════════════ */

      /* Intestazione slot ------------------------------------------ */
      .stack-slot-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        background: linear-gradient(135deg, rgba(3,169,244,0.10) 0%, rgba(3,169,244,0.04) 100%);
        border-radius: 10px;
        border: 1.5px solid rgba(3, 169, 244, 0.28);
        margin-bottom: 12px;
      }
      .stack-slot-icon {
        --mdc-icon-size: 22px;
        color: var(--editor-primary);
        flex-shrink: 0;
      }
      .stack-slot-info {
        flex: 1;
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .stack-type-badge {
        font-family: "Roboto Mono", monospace;
        font-size: 13px;
        font-weight: 700;
        color: var(--editor-primary);
      }
      .stack-card-count {
        font-size: 12px;
        color: var(--editor-secondary);
        background: rgba(0,0,0,0.06);
        padding: 1px 7px;
        border-radius: 10px;
      }
      .stack-remove-slot-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        font-size: 12px;
        font-weight: 500;
        border: 1.5px solid rgba(219, 68, 55, 0.45);
        border-radius: 7px;
        background: none;
        color: var(--editor-error);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        transition: background 0.15s;
      }
      .stack-remove-slot-btn:hover {
        background: rgba(219, 68, 55, 0.10);
      }
      .stack-remove-slot-btn ha-icon { --mdc-icon-size: 15px; }

      /* Stato vuoto ------------------------------------------------- */
      .stack-empty-state {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 16px;
        border: 2px dashed var(--editor-divider);
        border-radius: 10px;
        color: var(--editor-secondary);
        font-size: 13px;
        margin-bottom: 10px;
      }
      .stack-empty-state ha-icon {
        --mdc-icon-size: 28px;
        color: rgba(3,169,244,0.35);
        flex-shrink: 0;
      }

      /* Card collassabile ------------------------------------------- */
      .stack-card-details {
        border: 1.5px solid var(--editor-divider);
        border-radius: 10px;
        margin-bottom: 8px;
        overflow: hidden;
        background: var(--editor-surface);
        transition: border-color 0.15s;
      }
      .stack-card-details[open] {
        border-color: var(--editor-primary);
      }
      .stack-card-details summary { list-style: none; }
      .stack-card-details summary::-webkit-details-marker { display: none; }

      .stack-card-summary {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        cursor: pointer;
        user-select: none;
        background: rgba(0,0,0,0.025);
        min-height: 48px;
      }
      .stack-card-details[open] .stack-card-summary {
        background: rgba(3,169,244,0.06);
        border-bottom: 1px solid var(--editor-divider);
      }

      /* Numero circolare */
      .stack-card-num {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: var(--editor-primary);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      /* Tipo card */
      .stack-card-type-label {
        flex: 1;
        font-family: "Roboto Mono", "Consolas", monospace;
        font-size: 13px;
        font-weight: 600;
        color: var(--editor-text);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }

      /* Pulsanti riordina */
      .stack-card-move {
        display: flex;
        gap: 2px;
        flex-shrink: 0;
      }
      .stack-move-btn {
        width: 28px;
        height: 28px;
        border: 1px solid var(--editor-divider);
        border-radius: 5px;
        background: var(--editor-surface);
        color: var(--editor-secondary);
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: background 0.12s, color 0.12s;
      }
      .stack-move-btn:hover:not([disabled]) {
        background: rgba(3,169,244,0.12);
        color: var(--editor-primary);
        border-color: var(--editor-primary);
      }
      .stack-move-btn[disabled] {
        opacity: 0.25;
        cursor: not-allowed;
      }

      /* Pulsante elimina (rosso, testo visibile) */
      .stack-delete-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 10px;
        border: 1.5px solid rgba(219,68,55,0.45);
        border-radius: 7px;
        background: none;
        color: var(--editor-error);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.12s;
      }
      .stack-delete-btn:hover {
        background: rgba(219,68,55,0.10);
      }
      .stack-delete-btn ha-icon { --mdc-icon-size: 15px; }

      /* Chevron espansione */
      .stack-chevron {
        --mdc-icon-size: 20px;
        color: var(--editor-secondary);
        flex-shrink: 0;
        transition: transform 0.18s;
      }
      .stack-card-details[open] .stack-chevron {
        transform: rotate(180deg);
      }

      /* Corpo espanso: editor JSON ---------------------------------- */
      .stack-card-body {
        padding: 12px 14px 14px;
        background: var(--editor-surface);
      }
      .stack-card-body-hint {
        font-size: 11px;
        color: var(--editor-secondary);
        font-style: italic;
        margin-bottom: 8px;
      }
      .stack-card-editor {
        display: block;
        width: 100%;
        min-height: 280px;
        padding: 12px 14px;
        border: 1.5px solid var(--editor-divider);
        border-radius: 8px;
        font-family: "Roboto Mono", "Consolas", monospace;
        font-size: 12.5px;
        line-height: 1.6;
        background: rgba(0,0,0,0.025);
        color: var(--editor-text);
        resize: vertical;
        tab-size: 2;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s, background 0.15s;
      }
      .stack-card-editor:focus {
        border-color: var(--editor-primary);
        background: var(--editor-surface);
        box-shadow: 0 0 0 3px rgba(3,169,244,0.10);
      }

      /* Aggiungi card ----------------------------------------------- */
      .stack-add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 12px 0;
        margin-top: 4px;
        border: 2px dashed rgba(3, 169, 244, 0.45);
        border-radius: 10px;
        background: rgba(3, 169, 244, 0.05);
        color: var(--editor-primary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-sizing: border-box;
        transition: background 0.15s, border-color 0.15s;
      }
      .stack-add-btn:hover {
        background: rgba(3, 169, 244, 0.13);
        border-color: var(--editor-primary);
      }
      .stack-add-btn ha-icon { --mdc-icon-size: 20px; }
      .card-slot-active {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .card-slot-type-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: rgba(3, 169, 244, 0.07);
        border-radius: 6px;
        border: 1px solid rgba(3, 169, 244, 0.2);
      }
      .card-slot-icon {
        --mdc-icon-size: 18px;
        color: var(--editor-primary);
        flex-shrink: 0;
      }
      .card-slot-type {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        color: var(--editor-primary);
        font-family: "Roboto Mono", monospace;
      }
      .card-json-editor {
        min-height: 120px;
        font-size: 12px;
      }
      .card-slot-hint {
        font-size: 11px;
        color: var(--editor-secondary);
        font-style: italic;
      }
      .card-slot-empty {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px dashed var(--editor-divider);
        border-radius: 8px;
        color: var(--editor-secondary);
        font-size: 13px;
      }
      .card-slot-empty-icon {
        --mdc-icon-size: 22px;
        color: var(--editor-divider);
      }

      /* Hint / note */
      .css-hint {
        font-size: 12px;
        color: var(--editor-secondary);
        margin-bottom: 6px;
        font-style: italic;
      }

      /* Separatore sezione menu */
      .menu-subsection-label {
        font-size: 11px;
        font-weight: 600;
        color: var(--editor-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 10px 0 6px;
      }

      /* ---- YAML output panel (modalità file YAML) ---- */
      .yaml-output-panel {
        flex-shrink: 0;
        background: rgba(3, 169, 244, 0.06);
        border: 1px solid var(--editor-primary);
        border-radius: 8px;
        padding: 10px 14px;
        margin: 6px 0 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .yaml-output-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 12px;
        font-weight: 500;
        color: var(--editor-primary);
      }
      .yaml-output-header code {
        font-family: "Roboto Mono", monospace;
        font-style: normal;
        background: rgba(3, 169, 244, 0.12);
        padding: 1px 4px;
        border-radius: 3px;
      }
      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 12px;
        border: 1px solid var(--editor-primary);
        border-radius: 6px;
        background: none;
        color: var(--editor-primary);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }
      .copy-btn ha-icon {
        --mdc-icon-size: 16px;
      }
      .copy-btn:hover {
        background: rgba(3, 169, 244, 0.12);
      }
      .copy-btn.copied {
        background: var(--editor-success);
        border-color: var(--editor-success);
        color: #fff;
      }
      .yaml-copy-ta {
        min-height: 160px;
        max-height: 320px;
        font-size: 12px;
      }
      .yaml-output-hint {
        font-size: 11px;
        color: var(--editor-secondary);
        font-style: italic;
      }
      .yaml-output-hint code {
        font-family: "Roboto Mono", monospace;
        font-style: normal;
        background: rgba(0, 0, 0, 0.07);
        padding: 1px 4px;
        border-radius: 3px;
      }
    `;
  }
}
