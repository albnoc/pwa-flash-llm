// flashcards-page.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../components/flashcard';
import { styles as sharedStyles } from '../../styles/shared-styles';
import { styles } from './flash-styles';
import Hammer from 'hammerjs';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-flash')
export class FlashcardsPage extends LitElement {
  static styles = [sharedStyles, styles];

  @property({ type: String })
  topic: string = 'Topic';

  @property({ type: Array })
  cards: Array<any> = [];

  @property({ type: Number })
  currentCardIndex: number = 0;

  async updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('topic')) {
      this.cards = [
        { cardId: 1, question: 'Question 1', answer: 'Answer 1' },
        { cardId: 2, question: 'Question 2', answer: 'Answer 2' },
      ];
    }
  }
  firstUpdated() {
    const hammer = new Hammer(this);
    hammer.on('swipeleft', () => this.nextCard());
    hammer.on('swiperight', () => this.prevCard());
  }

  nextCard() {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
    }
  }

  prevCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }

  render() {
    return html`
      <app-header ?enableBack="${true}" title="${'Flashcards'}"></app-header>

      <main>
        <h2>Topic: ${this.topic}</h2>
        <div
          style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
        >
          <component-flashcard
            .flashcard=${this.cards[this.currentCardIndex]}
          ></component-flashcard>

          <div style="display: flex; gap: 20px; margin-top: 20px;">
            <sl-button @click="${this.prevCard}">Previous</sl-button>
            <sl-button @click="${this.nextCard}">Next</sl-button>
          </div>
        </div>
      </main>
      <bottom-navigation activeRoute="flash"></bottom-navigation>
    `;
  }
}

