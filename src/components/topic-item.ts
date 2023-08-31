import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('topic-item')
export class TopicItem extends LitElement {
  @property() label: string = '';
  @property() color: string | undefined = undefined;

  static styles = css`
    .topic-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      border-radius: 10px;
      margin: 4px;
      font-size: 1.2em;
      transition: background-color 0.3s ease;
      height: 84px;
      text-align: center;
      background-color: var(--sl-color-neutral-200);
    }
    .topic-container:hover {
      transform: scale(1.05);
    }
  `;

  render() {
    return html`
      <div class="topic-container" style="background-color:${this.color}">
        ${this.label}
      </div>
    `;
  }
}

