import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { styles as sharedStyles } from '../../../styles/shared-styles';
@customElement('email-sent-page')
export class EmailSentPage extends LitElement {
  static styles = [sharedStyles];

  render() {
    return html`
      <app-header ?enableBack="${false}"></app-header>
      <main>
        <sl-card>
          <h2>Check your email for the magic link to sign in.</h2>
        </sl-card>
      </main>
    `;
  }
}

