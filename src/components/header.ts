import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/button/button.js';
@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'Flash';

  @property({ type: Boolean }) enableBack: boolean = false;

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--app-color-primary);
        color: white;
        height: 4em;
        padding-left: 16px;
        padding-top: 12px;

        position: fixed;
        left: env(titlebar-area-x, 0);
        top: env(titlebar-area-y, 0);
        height: env(titlebar-area-height, 50px);
        width: env(titlebar-area-width, 100%);
        -webkit-app-region: drag;
      }

      header h1 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        flex-grow: 1; /* Allow h1 to grow and take available space */
        text-align: left; /* Align text to left */
      }

      nav a {
        margin-left: 10px;
      }

      #back-button-block {
        display: flex;
        align-items: center;
        flex-grow: 1; /* Allow this div to grow and take available space */
        padding-right: 16px; /* Add padding to the right side, if necessary */
      }

      @media (prefers-color-scheme: light) {
        header {
          color: black;
        }

        nav a {
          color: initial;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <div id="back-button-block">
          ${this.enableBack
            ? html`<sl-button href="${resolveRouterPath()}"> Back </sl-button>`
            : null}

          <h1 style=${this.enableBack ? 'margin-left: 16px;' : ''}>
            ${this.title}
          </h1>
        </div>
      </header>
    `;
  }
}

