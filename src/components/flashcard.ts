import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

interface Flashcard {
  question: string;
  answer: string;
}

@customElement('component-flashcard')
export class FlashcardComponent extends LitElement {
  @property({ type: Object }) flashcard: Flashcard = {question: "", answer: ""};

  static get styles() {
    return css`
      div {
        padding: 10px;
        margin: 10px;
        border: 1px solid black;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>Question: ${this.flashcard.question}</div>
      <div>Answer: ${this.flashcard.answer}</div>
    `;
  }
}
