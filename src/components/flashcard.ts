// flashcard-component.ts
import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

interface Flashcard {
  question: string;
  answer: string;
}

@customElement('component-flashcard')
export class FlashcardComponent extends LitElement {
  @property({ type: Object }) flashcard: Flashcard = {question: "", answer: ""};
  @property({ type: Boolean }) showAnswer: boolean = false;

  static get styles() {
    return css`
      div {
        padding: 10px;
        margin: 10px;
        border: 1px solid black;
      }
    `;
  }

  toggleCard() {
    this.showAnswer = !this.showAnswer;
  }

  render() {
    if (!this.flashcard) {  // If flashcard is undefined or null, return an empty template
        return html``;
    }

    return html`
    <sl-card @click=${this.toggleCard}>
        <h2>${this.showAnswer ? `Answer: ${this.flashcard.answer}` : `Question: ${this.flashcard.question}`}</h2>
    </sl-card>
    `;
  }
}
