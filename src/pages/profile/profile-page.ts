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
      <app-header ?enableBack="${false}" title="${'Profile'}"></app-header>

      <main>
        <sl-button @click="${this.handleLogout}">Logout</sl-button>
      </main>
      <bottom-navigation activeRoute="profile"></bottom-navigation>
    `;
  }
}

