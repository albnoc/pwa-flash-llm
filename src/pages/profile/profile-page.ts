import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import { styles } from './profile-styles';

import { styles as sharedStyles } from '../../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import { signOut } from '../../supabase-client';

@customElement('profile-page')
export class ProfilePage extends LitElement {
  static styles = [sharedStyles, styles];

  constructor() {
    super();
  }
  async handleLogout() {
    try {
      await signOut();
    } catch (error: any) {
      console.error('Error during sign out:', error.message);
    }
  }
  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Profile Page</h2>

        <sl-card>
          <h2>Did you know?</h2>

          <p>
            PWAs have access to many useful APIs in modern browsers! These APIs
            have enabled many new types of apps that can be built as PWAs, such
            as advanced graphics editing apps, games, apps that use machine
            learning and more!
          </p>

          <p>
            Check out
            <a
              href="https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/handle-files"
              >these docs</a
            >
            to learn more about the advanced features that you can use in your
            PWA
          </p>
        </sl-card>
        <sl-button @click="${this.handleLogout}">Logout</sl-button>
      </main>
      <bottom-navigation activeRoute="profile"></bottom-navigation>
    `;
  }
}

