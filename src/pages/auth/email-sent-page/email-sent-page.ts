import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('email-sent-page')
export class EmailSentPage extends LitElement {
  static styles = css`
    /* Add your styles here */
  `;

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>
      <main>
        <h2>Check your email for the magic link to sign in.</h2>
      </main>
    `;
  }
}

