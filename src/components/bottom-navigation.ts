import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { resolveRouterPath, router } from '../router';

@customElement('bottom-navigation')
export class BottomNavigation extends LitElement {
  @property({ type: String }) activeRoute = ''; // you can use this to highlight the active route

  static get styles() {
    return css`
      .navbar {
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        background-color: #f9f9f9;
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #d9d9d9;
      }

      .nav-item {
        text-align: center;
        padding: 10px;
      }

      .nav-item[active] sl-button {
        color: var(--app-color-primary);
      }
    `;
  }

  render() {
    return html`
      <div class="navbar">
        <div class="nav-item" ?active="${this.activeRoute === 'home'}">
          <sl-button
            @click="${() => router.navigate(resolveRouterPath('home'))}"
          >
            <sl-icon name="house"></sl-icon>
            Home
          </sl-button>
        </div>
        <div class="nav-item" ?active="${this.activeRoute === 'flash'}">
          <sl-button
            @click="${() => router.navigate(resolveRouterPath('flash'))}"
          >
            <sl-icon name="layers"></sl-icon>
            Flashcards
          </sl-button>
        </div>
        <div class="nav-item" ?active="${this.activeRoute === 'profile'}">
          <sl-button
            @click="${() => router.navigate(resolveRouterPath('profile'))}"
          >
            <sl-icon name="person"></sl-icon>
            Profile
          </sl-button>
        </div>
      </div>
    `;
  }
}

